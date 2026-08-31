export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { syncGTUDataToDatabase, scrapeLiveResults } from "@/lib/scraper";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";
import { generateGTUStudentResults } from "@/lib/gtu-results-engine";
import { resolveOrCreateDbUser } from "@/lib/auth-user-helper";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "declared";
    const session = await getServerSession(authOptions);

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
          const cLower = course.toLowerCase();
          filtered = filtered.filter(
            (r) =>
              r.course?.toLowerCase() === cLower ||
              r.examTitle?.toLowerCase().startsWith(cLower) ||
              r.examTitle?.toLowerCase().includes(cLower)
          );
        }
        if (semester && semester !== "ALL") {
          const sNum = parseInt(semester, 10);
          filtered = filtered.filter((r) => Number(r.semester) === sNum);
        }
        if (search) {
          const q = search.toLowerCase();
          filtered = filtered.filter(
            (r) =>
              r.examTitle?.toLowerCase().includes(q) ||
              r.session?.toLowerCase().includes(q) ||
              r.course?.toLowerCase().includes(q)
          );
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
      const dbUser = await resolveOrCreateDbUser(session);
      if (!dbUser) {
        return NextResponse.json({ subscriptions: [] });
      }

      const subscriptions = await prisma.resultSubscription.findMany({
        where: { userId: dbUser.id },
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
    const body = await req.json();
    const { action } = body;

    // Action 1: Create Result Subscription
    if (action === "subscribe") {
      const { course, branch, semester, examSession, examType, enrollmentNo, emailAlerts, pushAlerts } = body;

      let dbUser = await resolveOrCreateDbUser(session);

      if (!dbUser && enrollmentNo) {
        dbUser = await prisma.user.findFirst({ where: { enrollmentNo: enrollmentNo.trim() } }).catch(() => null);
        if (!dbUser) {
          const hashedPassword = await bcrypt.hash("gtu12345", 10);
          dbUser = await prisma.user.create({
            data: {
              name: `Student (${enrollmentNo.trim()})`,
              email: `${enrollmentNo.trim()}@gtu.ac.in`,
              password: hashedPassword,
              enrollmentNo: enrollmentNo.trim(),
              course: course || "BE",
              branch: branch || "Computer Engineering",
              semester: parseInt(semester, 10) || 5,
              college: "028 - L.D. College of Engineering, Ahmedabad",
            },
          }).catch(() => null);
        }
      }

      if (!dbUser) {
        dbUser = await prisma.user.findFirst().catch(() => null);
      }

      if (!dbUser) {
        const hashedPassword = await bcrypt.hash("gtu12345", 10);
        dbUser = await prisma.user.create({
          data: {
            name: "GTU Student",
            email: "student@gtu.ac.in",
            password: hashedPassword,
            enrollmentNo: enrollmentNo || "210120111001",
            course: course || "BE",
            branch: branch || "Computer Engineering",
            semester: parseInt(semester, 10) || 5,
            college: "028 - L.D. College of Engineering, Ahmedabad",
          },
        });
      }

      const subscription = await prisma.resultSubscription.create({
        data: {
          userId: dbUser.id,
          course: course || dbUser.course || "BE",
          branch: branch || dbUser.branch || "Computer Engineering",
          semester: parseInt(semester, 10) || dbUser.semester || 5,
          examSession: examSession || "Summer 2026",
          examType: examType || "Regular",
          enrollmentNo: enrollmentNo || dbUser.enrollmentNo || "210120111001",
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
    const dbUser = await resolveOrCreateDbUser(session);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing subscription ID" }, { status: 400 });
    }

    if (dbUser) {
      await prisma.resultSubscription.deleteMany({
        where: { id, userId: dbUser.id },
      });
    } else {
      await prisma.resultSubscription.delete({
        where: { id },
      }).catch(() => null);
    }

    return NextResponse.json({ success: true, message: "Alert removed" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete subscription" }, { status: 500 });
  }
}
