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
      return NextResponse.json({ notifications: [], unreadCount: 0 });
    }

    const userId = dbUser.id;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    return NextResponse.json({ notifications, unreadCount });
  } catch (error: any) {
    console.error("Notifications GET error:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
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
    const body = await req.json().catch(() => ({}));
    const { action, id, testNotification } = body;

    // 1. Mark All Read
    if (action === "markAllRead") {
      await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });
      return NextResponse.json({ message: "All notifications marked as read" });
    }

    // 2. Mark Single Read
    if (action === "markRead" && id) {
      await prisma.notification.updateMany({
        where: { id, userId },
        data: { isRead: true },
      });
      return NextResponse.json({ message: "Marked as read" });
    }

    // 3. Clear all read notifications
    if (action === "clearRead") {
      await prisma.notification.deleteMany({
        where: { userId, isRead: true },
      });
      return NextResponse.json({ message: "Cleared read notifications" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Notifications POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to update notification" }, { status: 500 });
  }
}
