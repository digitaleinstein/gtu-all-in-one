export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { resolveOrCreateDbUser } from "@/lib/auth-user-helper";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const dbUser = await resolveOrCreateDbUser(session);
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = dbUser.id;

    const [resultSubs, circularSubs, user] = await Promise.all([
      prisma.resultSubscription.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.circularSubscription.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          notificationPreferences: true,
          course: true,
          branch: true,
          semester: true,
        },
      }),
    ]);

    let preferences = {
      emailAlerts: true,
      inAppAlerts: true,
      resultAlerts: true,
      circularAlerts: true,
      selectedCategories: ["Examinations", "Timetables", "Academic", "Scholarships"],
    };

    if (user?.notificationPreferences) {
      try {
        preferences = { ...preferences, ...JSON.parse(user.notificationPreferences) };
      } catch (e) {}
    }

    return NextResponse.json({
      resultSubscriptions: resultSubs,
      circularSubscriptions: circularSubs,
      preferences,
    });
  } catch (error: any) {
    console.error("User subscriptions GET error:", error);
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const dbUser = await resolveOrCreateDbUser(session);
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = dbUser.id;
    const body = await req.json();
    const { action } = body;

    // 1. Subscribe to Result Alert
    if (action === "subscribeResult") {
      const { course, branch, semester, examSession, examType, emailAlerts, pushAlerts } = body;

      const sub = await prisma.resultSubscription.create({
        data: {
          userId,
          course: course || dbUser.course || "BE",
          branch: branch || dbUser.branch || "Computer Engineering",
          semester: semester ? parseInt(semester, 10) : (dbUser.semester || 5),
          examSession: examSession || "Summer 2026",
          examType: examType || "Regular",
          emailAlerts: emailAlerts ?? true,
          pushAlerts: pushAlerts ?? true,
          isActive: true,
        },
      });

      return NextResponse.json({ success: true, subscription: sub });
    }

    // 2. Subscribe to Circular Alert
    if (action === "subscribeCircular") {
      const { category, keywords, emailAlerts, inAppAlerts } = body;

      // Check if already subscribed to this category
      const existing = await prisma.circularSubscription.findFirst({
        where: { userId, category: category || "All" },
      });

      if (existing) {
        const updated = await prisma.circularSubscription.update({
          where: { id: existing.id },
          data: {
            keywords: keywords || null,
            emailAlerts: emailAlerts ?? true,
            inAppAlerts: inAppAlerts ?? true,
            isActive: true,
          },
        });
        return NextResponse.json({ success: true, subscription: updated });
      }

      const newSub = await prisma.circularSubscription.create({
        data: {
          userId,
          category: category || "All",
          keywords: keywords || null,
          emailAlerts: emailAlerts ?? true,
          inAppAlerts: inAppAlerts ?? true,
          isActive: true,
        },
      });

      return NextResponse.json({ success: true, subscription: newSub });
    }

    // 3. Update General Notification Preferences
    if (action === "updatePreferences") {
      const { preferences } = body;
      await prisma.user.update({
        where: { id: userId },
        data: {
          notificationPreferences: JSON.stringify(preferences),
        },
      });

      return NextResponse.json({ success: true, preferences });
    }

    // 4. Toggle Subscription Active State
    if (action === "toggle") {
      const { type, id, isActive } = body;
      if (type === "result") {
        await prisma.resultSubscription.updateMany({
          where: { id, userId },
          data: { isActive },
        });
      } else if (type === "circular") {
        await prisma.circularSubscription.updateMany({
          where: { id, userId },
          data: { isActive },
        });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("User subscriptions POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to update subscription" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const dbUser = await resolveOrCreateDbUser(session);
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = dbUser.id;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type"); // "result" | "circular"

    if (!id) {
      return NextResponse.json({ error: "Missing subscription ID" }, { status: 400 });
    }

    if (type === "circular") {
      await prisma.circularSubscription.deleteMany({
        where: { id, userId },
      });
    } else {
      await prisma.resultSubscription.deleteMany({
        where: { id, userId },
      });
    }

    return NextResponse.json({ success: true, message: "Subscription removed" });
  } catch (error: any) {
    console.error("User subscriptions DELETE error:", error);
    return NextResponse.json({ error: "Failed to remove subscription" }, { status: 500 });
  }
}
