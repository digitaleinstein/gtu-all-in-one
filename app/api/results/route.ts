export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { syncGTUDataToDatabase } from "@/lib/scraper";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "declared";
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    // 1. Fetch live declared results list
    if (action === "declared") {
      const course = searchParams.get("course");
      const semester = searchParams.get("semester");
      const search = searchParams.get("search");

      const whereClause: any = {};
      if (course && course !== "ALL") whereClause.course = course;
      if (semester && semester !== "ALL") whereClause.semester = parseInt(semester, 10);
      if (search) {
        whereClause.examTitle = { contains: search };
      }

      const results = await prisma.liveResult.findMany({
        where: whereClause,
        orderBy: { declaredDate: "desc" },
      });

      return NextResponse.json({ results });
    }

    // 2. Fetch student subscriptions
    if (action === "subscriptions") {
      if (!userId) {
        return NextResponse.json({ subscriptions: [] });
      }

      const subscriptions = await prisma.resultSubscription.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ subscriptions });
    }

    // 3. Direct GTU Result Simulation / Query
    if (action === "checkResult") {
      const enrollmentNo = searchParams.get("enrollmentNo") || "210120111001";
      const examSession = searchParams.get("examSession") || "Summer 2024";
      const sem = parseInt(searchParams.get("semester") || "5", 10);

      // Generate a realistic GTU Grade Card format
      const mockResultData = {
        enrollmentNo,
        studentName: enrollmentNo.startsWith("21") ? "Aarav Mehta" : "GTU Student",
        institute: "028 - L.D. College of Engineering, Ahmedabad",
        course: "Bachelor of Engineering (Computer Engineering)",
        semester: sem,
        examSession,
        examType: "Regular",
        declarationDate: "2024-07-28",
        spi: 8.82,
        cpi: 8.64,
        cgpa: 8.71,
        totalCredits: 22,
        earnedCredits: 22,
        resultStatus: "PASS",
        currentBacklogs: 0,
        totalBacklogs: 0,
        subjects: [
          { code: "3150703", name: "Analysis and Design of Algorithms", theoryE: "58/70", theoryM: "27/30", practicalE: "45/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 5 },
          { code: "3150710", name: "Computer Networks", theoryE: "52/70", theoryM: "24/30", practicalE: "42/50", practicalM: "17/20", grade: "AB", gradePoints: 9, credits: 5 },
          { code: "3150711", name: "Software Engineering", theoryE: "56/70", theoryM: "26/30", practicalE: "46/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 4 },
          { code: "3150713", name: "Python for Data Science", theoryE: "60/70", theoryM: "28/30", practicalE: "48/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 4 },
          { code: "3150709", name: "Professional Ethics", theoryE: "50/70", theoryM: "23/30", practicalE: "--", practicalM: "16/20", grade: "AB", gradePoints: 9, credits: 3 },
          { code: "3150005", name: "Integrated Personality Development Course", theoryE: "--", theoryM: "--", practicalE: "45/50", practicalM: "44/50", grade: "AA", gradePoints: 10, credits: 1 },
        ],
      };

      return NextResponse.json({ result: mockResultData });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Results API error:", error);
    return NextResponse.json({ error: error.message || "Failed to query results" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { action } = body;

    // 1. Create / Update Result Subscription
    if (action === "subscribe" || !action) {
      const {
        course = "BE",
        branch = "Computer Engineering",
        semester = 5,
        examSession = "Winter 2024",
        examType = "Regular",
        enrollmentNo = (session.user as any).enrollmentNo,
        emailAlerts = true,
        pushAlerts = true,
      } = body;

      const subscription = await prisma.resultSubscription.create({
        data: {
          userId,
          enrollmentNo,
          course,
          branch,
          semester: parseInt(semester, 10),
          examSession,
          examType,
          emailAlerts: Boolean(emailAlerts),
          pushAlerts: Boolean(pushAlerts),
          isActive: true,
        },
      });

      // Create confirmation in-app notification
      await prisma.notification.create({
        data: {
          userId,
          title: `🔔 Result Alert Configured: ${course} Sem ${semester}`,
          message: `You will be notified immediately via ${pushAlerts ? "Push" : ""}${pushAlerts && emailAlerts ? " & " : ""}${emailAlerts ? "Email" : ""} when ${course} Semester ${semester} (${examSession}) results are declared.`,
          type: "RESULT",
          link: "/results",
        },
      });

      return NextResponse.json({
        subscription,
        message: "Result notification subscription activated successfully!",
      }, { status: 201 });
    }

    // 2. Trigger Result Watcher Check
    if (action === "checkWatcher") {
      const syncResult = await syncGTUDataToDatabase();
      return NextResponse.json({
        message: "Result portal checked for updates.",
        ...syncResult,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Subscription create error:", error);
    return NextResponse.json({ error: error.message || "Failed to create subscription" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get("id");
    const userId = (session.user as any).id;

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });
    }

    await prisma.resultSubscription.deleteMany({
      where: {
        id: subscriptionId,
        userId,
      },
    });

    return NextResponse.json({ message: "Subscription cancelled successfully" });
  } catch (error: any) {
    console.error("Subscription delete error:", error);
    return NextResponse.json({ error: "Failed to delete subscription" }, { status: 500 });
  }
}
