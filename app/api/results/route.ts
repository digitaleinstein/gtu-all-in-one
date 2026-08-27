export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { syncGTUDataToDatabase, scrapeLiveResults } from "@/lib/scraper";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";
import { generateGTUStudentResults } from "@/lib/gtu-results-engine";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "declared";
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    // 1. Fetch real-time live declared results list from GTU
    if (action === "declared") {
      const course = searchParams.get("course");
      const semester = searchParams.get("semester");
      const search = searchParams.get("search");

      let liveResults: any[] = [];
      try {
        liveResults = await scrapeLiveResults();
      } catch (e) {
        console.warn("Live GTU result fetch fallback:", e);
      }

      if (liveResults.length > 0) {
        let filtered = liveResults;
        if (course && course !== "ALL") {
          filtered = filtered.filter((r) => r.course === course);
        }
        if (semester && semester !== "ALL") {
          filtered = filtered.filter((r) => r.semester === parseInt(semester, 10));
        }
        if (search) {
          const q = search.toLowerCase();
          filtered = filtered.filter((r) => r.examTitle.toLowerCase().includes(q));
        }
        return NextResponse.json({
          liveFromGTU: true,
          results: filtered,
          totalCount: filtered.length,
        });
      }

      // DB Fallback
      const whereClause: any = {};
      if (course && course !== "ALL") whereClause.course = course;
      if (semester && semester !== "ALL") whereClause.semester = parseInt(semester, 10);
      if (search) whereClause.examTitle = { contains: search };

      const results = await prisma.liveResult.findMany({
        where: whereClause,
        orderBy: { declaredDate: "desc" },
      });

      return NextResponse.json({ liveFromGTU: false, results });
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
      const sem = parseInt(searchParams.get("semester") || "5", 10);

      const decoded = decodeGTUEnrollment(enrollmentNo);
      const allSemResults = generateGTUStudentResults(enrollmentNo, Math.max(sem, 5));
      const targetSemResult = allSemResults.find((r) => r.semester === sem) || allSemResults[allSemResults.length - 1];

      const resultData = {
        enrollmentNo,
        studentName: session?.user?.name || "GTU Student",
        institute: decoded.collegeName,
        course: `${decoded.courseName} (${decoded.branchName})`,
        semester: sem,
        examSession: targetSemResult.examSession,
        examType: targetSemResult.examType,
        declarationDate: targetSemResult.declarationDate,
        spi: targetSemResult.spi,
        cpi: targetSemResult.cpi,
        cgpa: targetSemResult.cgpa,
        totalCredits: targetSemResult.totalCredits,
        earnedCredits: targetSemResult.earnedCredits,
        resultStatus: targetSemResult.resultStatus,
        currentBacklogs: targetSemResult.currentBacklogs,
        totalBacklogs: targetSemResult.totalBacklogs,
        subjects: targetSemResult.subjects,
      };

      return NextResponse.json({ result: resultData });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Results API error:", error);
    return NextResponse.json({ error: "Failed to process results request" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const body = await req.json();
    const { action } = body;

    // Action 1: Create Result Subscription
    if (action === "subscribe") {
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { course, branch, semester, examSession, examType, enrollmentNo, emailAlerts, pushAlerts } = body;

      const subscription = await prisma.resultSubscription.create({
        data: {
          userId,
          course: course || "BE",
          branch: branch || "Computer Engineering",
          semester: parseInt(semester, 10) || 5,
          examSession: examSession || "Summer 2026",
          examType: examType || "Regular",
          enrollmentNo: enrollmentNo || (session?.user as any)?.enrollmentNo,
          emailAlerts: emailAlerts ?? true,
          pushAlerts: pushAlerts ?? true,
        },
      });

      return NextResponse.json({ subscription, message: "Result alert created successfully!" }, { status: 201 });
    }

    // Action 2: Trigger Real GTU Portal Scraper
    if (action === "checkWatcher") {
      const stats = await syncGTUDataToDatabase();
      return NextResponse.json({
        message: "Watcher triggered successfully",
        newResultsCount: stats.newResultsCount,
        newCircularsCount: stats.newCircularsCount,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Results POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to process request" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!userId || !id) {
      return NextResponse.json({ error: "Unauthorized or missing ID" }, { status: 400 });
    }

    await prisma.resultSubscription.delete({
      where: { id, userId },
    });

    return NextResponse.json({ success: true, message: "Alert removed" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete subscription" }, { status: 500 });
  }
}
