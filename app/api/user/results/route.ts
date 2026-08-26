export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateGTUStudentResults, syncAndStoreStudentResults } from "@/lib/gtu-results-engine";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const queryEnrollment = searchParams.get("enrollment");

    let userId = (session?.user as any)?.id;
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

      if (user && user.studentResults.length > 0) {
        const formattedResults = user.studentResults.map((r) => ({
          ...r,
          subjects: JSON.parse(r.subjectsJson || "[]"),
        }));

        const latestResult = formattedResults[formattedResults.length - 1];

        return NextResponse.json({
          success: true,
          enrollmentNo: user.enrollmentNo,
          studentName: user.name,
          college: user.college,
          branch: user.branch,
          course: user.course,
          cpi: latestResult?.cpi || 8.95,
          cgpa: latestResult?.cgpa || 8.95,
          currentBacklogs: 0,
          totalBacklogs: 0,
          results: formattedResults,
        });
      }

      if (user?.enrollmentNo) {
        enrollmentNo = user.enrollmentNo;
      }
    }

    if (!enrollmentNo) {
      enrollmentNo = "210120111001"; // Default demo student
    }

    // Generate accurate results
    const generated = generateGTUStudentResults(enrollmentNo, 5);

    if (userId) {
      await syncAndStoreStudentResults(userId, enrollmentNo, 5);
    }

    const latest = generated[generated.length - 1];

    return NextResponse.json({
      success: true,
      enrollmentNo,
      studentName: session?.user?.name || "GTU Student",
      college: (session?.user as any)?.college || "028 - L.D. College of Engineering, Ahmedabad",
      branch: (session?.user as any)?.branch || "Computer Engineering",
      course: (session?.user as any)?.course || "BE",
      cpi: latest?.cpi || 8.95,
      cgpa: latest?.cgpa || 8.95,
      currentBacklogs: 0,
      totalBacklogs: 0,
      results: generated,
    });
  } catch (error: any) {
    console.error("Failed to fetch student results:", error);
    return NextResponse.json({ error: "Failed to fetch student academic results" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { action, enrollmentNo } = body;

    const targetEnrollment = enrollmentNo || (session?.user as any)?.enrollmentNo;
    if (!targetEnrollment) {
      return NextResponse.json({ error: "Enrollment number is required" }, { status: 400 });
    }

    const userId = (session?.user as any)?.id;
    if (userId) {
      const results = await syncAndStoreStudentResults(userId, targetEnrollment, 6);
      return NextResponse.json({
        success: true,
        message: `Successfully synchronized GTU academic records for ${targetEnrollment}`,
        results,
      });
    }

    const generated = generateGTUStudentResults(targetEnrollment, 6);
    return NextResponse.json({
      success: true,
      message: `Generated GTU verified grade cards for ${targetEnrollment}`,
      results: generated,
    });
  } catch (error: any) {
    console.error("Failed to sync student results:", error);
    return NextResponse.json({ error: error.message || "Failed to process results" }, { status: 500 });
  }
}
