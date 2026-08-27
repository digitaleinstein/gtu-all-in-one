export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";
import { resolveOrCreateDbUser } from "@/lib/auth-user-helper";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const queryEnrollment = searchParams.get("enrollment");

    const dbUser = await resolveOrCreateDbUser(session);
    let enrollmentNo = queryEnrollment || dbUser?.enrollmentNo || (session?.user as any)?.enrollmentNo;

    if (dbUser) {
      const user = await prisma.user.findUnique({
        where: { id: dbUser.id },
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
            course: user.course,
            branch: user.branch,
            college: user.college,
            currentSemester: user.semester,
            spi: latestResult?.spi || 0,
            cpi: latestResult?.cpi || 0,
            cgpa: latestResult?.cgpa || latestResult?.cpi || 0,
            currentBacklogs: latestResult?.currentBacklogs ?? 0,
            totalBacklogs: latestResult?.totalBacklogs ?? 0,
            history: formattedResults,
          });
        }
      }
    }

    // Default clean un-synced profile with accurate GTU enrollment decoding
    const decoded = decodeGTUEnrollment(enrollmentNo || "210120111001");

    return NextResponse.json({
      success: true,
      hasSyncedResults: false,
      enrollmentNo: enrollmentNo || "210120111001",
      studentName: dbUser?.name || session?.user?.name || "GTU Student",
      course: decoded.courseName,
      branch: decoded.branchName,
      college: decoded.collegeName,
      currentSemester: dbUser?.semester || 5,
      spi: 0,
      cpi: 0,
      cgpa: 0,
      currentBacklogs: 0,
      totalBacklogs: 0,
      history: [],
      message: "No marksheet saved yet. Use the GTU Gateway to verify official result.",
    });
  } catch (error: any) {
    console.error("Results fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch student results" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const dbUser = await resolveOrCreateDbUser(session);
    if (!dbUser) {
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

      const enrollmentNo = dbUser.enrollmentNo || "210120111001";

      const existing = await prisma.studentResult.findFirst({
        where: { userId: dbUser.id, semester, examSession },
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
            userId: dbUser.id,
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
        message: `Marksheet for Semester ${semester} saved to your official student profile!`,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Save live result error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save marksheet" },
      { status: 500 }
    );
  }
}
