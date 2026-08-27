export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const queryEnrollment = searchParams.get("enrollment");

    const userId = (session?.user as any)?.id;
    let enrollmentNo = queryEnrollment || (session?.user as any)?.enrollmentNo;

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          studentResults: {
            orderBy: { semester: "asc" },
          },
        },
      });

      if (user) {
        enrollmentNo = user.enrollmentNo;
        if (user.studentResults && user.studentResults.length > 0) {
          const formattedResults = user.studentResults.map((r) => ({
            ...r,
            subjects: JSON.parse(r.subjectsJson || "[]"),
          }));

          const latestResult = formattedResults[formattedResults.length - 1];

          return NextResponse.json({
            success: true,
            hasSyncedResults: true,
            enrollmentNo: user.enrollmentNo,
            studentName: user.name,
            college: user.college,
            branch: user.branch,
            course: user.course,
            cpi: latestResult?.cpi || 0,
            cgpa: latestResult?.cgpa || 0,
            currentBacklogs: latestResult?.currentBacklogs ?? 0,
            totalBacklogs: latestResult?.totalBacklogs ?? 0,
            results: formattedResults,
          });
        } else {
          // No results fetched yet for this real user
          const decoded = decodeGTUEnrollment(user.enrollmentNo || "");
          return NextResponse.json({
            success: true,
            hasSyncedResults: false,
            enrollmentNo: user.enrollmentNo,
            studentName: user.name,
            college: user.college || decoded.collegeName,
            branch: user.branch || decoded.branchName,
            course: user.course || decoded.courseCode,
            cpi: 0,
            cgpa: 0,
            currentBacklogs: 0,
            totalBacklogs: 0,
            results: [],
          });
        }
      }
    }

    if (enrollmentNo) {
      const decoded = decodeGTUEnrollment(enrollmentNo);
      return NextResponse.json({
        success: true,
        hasSyncedResults: false,
        enrollmentNo,
        studentName: session?.user?.name || "GTU Student",
        college: (session?.user as any)?.college || decoded.collegeName,
        branch: (session?.user as any)?.branch || decoded.branchName,
        course: (session?.user as any)?.course || decoded.courseCode,
        cpi: 0,
        cgpa: 0,
        currentBacklogs: 0,
        totalBacklogs: 0,
        results: [],
      });
    }

    return NextResponse.json({
      success: true,
      hasSyncedResults: false,
      enrollmentNo: "",
      results: [],
    });
  } catch (error: any) {
    console.error("Failed to fetch student results:", error);
    return NextResponse.json({ error: "Failed to fetch student academic results" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await req.json();
    const { action, marksheet } = body;

    if (action === "saveLiveResult" && marksheet) {
      const semester = parseInt(marksheet.semester, 10) || 5;
      const examSession = marksheet.examSession || "Summer 2026";
      const spi = parseFloat(marksheet.spi) || 0;
      const cpi = parseFloat(marksheet.cpi) || 0;
      const cgpa = parseFloat(marksheet.cgpa) || 0;
      const currentBacklogs = parseInt(marksheet.currentBacklog, 10) || 0;
      const totalBacklogs = parseInt(marksheet.totalBacklog, 10) || 0;
      const resultStatus = marksheet.resultStatus || "PASS";
      const subjectsJson = JSON.stringify(marksheet.subjects || []);

      const user = await prisma.user.findUnique({ where: { id: userId } });
      const enrollmentNo = user?.enrollmentNo || "210120111001";

      const existing = await prisma.studentResult.findFirst({
        where: { userId, semester, examSession },
      });

      if (existing) {
        await prisma.studentResult.update({
          where: { id: existing.id },
          data: {
            spi,
            cpi,
            cgpa,
            currentBacklogs,
            totalBacklogs,
            resultStatus,
            subjectsJson,
            declaredDate: new Date(),
          },
        });
      } else {
        await prisma.studentResult.create({
          data: {
            userId,
            enrollmentNo,
            semester,
            examSession,
            spi,
            cpi,
            cgpa,
            currentBacklogs,
            totalBacklogs,
            resultStatus,
            subjectsJson,
            declaredDate: new Date(),
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Official GTU Marksheet successfully synced and saved to your profile!",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Failed to save student result:", error);
    return NextResponse.json({ error: "Failed to save marksheet" }, { status: 500 });
  }
}
