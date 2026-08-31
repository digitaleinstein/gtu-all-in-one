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
    if (!dbUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: dbUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        enrollmentNo: true,
        course: true,
        branch: true,
        semester: true,
        college: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
        _count: {
          select: {
            savedPapers: true,
            subscriptions: true,
            midsemRecords: true,
            pmmsChecklists: true,
          },
        },
      },
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const dbUser = await resolveOrCreateDbUser(session);
    if (!dbUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, enrollmentNo, course, branch, semester, college } = body;

    const cleanEnrollment = enrollmentNo ? enrollmentNo.trim() : null;

    // If changing enrollment number, ensure it doesn't conflict with another distinct user
    if (cleanEnrollment && cleanEnrollment !== dbUser.enrollmentNo) {
      const conflictingUser = await prisma.user.findFirst({
        where: {
          enrollmentNo: cleanEnrollment,
          NOT: { id: dbUser.id },
        },
      });

      if (conflictingUser) {
        // If the conflicting record is an unverified placeholder/seed, clean up the duplicate enrollment
        if (conflictingUser.email.includes("dummy") || !conflictingUser.isEmailVerified) {
          await prisma.user.update({
            where: { id: conflictingUser.id },
            data: { enrollmentNo: null },
          });
        } else {
          return NextResponse.json(
            { error: `Enrollment number ${cleanEnrollment} is already linked to another account (${conflictingUser.email}).` },
            { status: 400 }
          );
        }
      }
    }

    const updated = await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        name: name ? name.trim() : undefined,
        enrollmentNo: cleanEnrollment || undefined,
        course: course || undefined,
        branch: branch || undefined,
        semester: semester ? parseInt(semester, 10) : undefined,
        college: college ? college.trim() : undefined,
        isEmailVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        enrollmentNo: true,
        course: true,
        branch: true,
        semester: true,
        college: true,
        isEmailVerified: true,
      },
    });

    return NextResponse.json({
      user: updated,
      message: "Academic profile updated and saved successfully!",
    });
  } catch (error: any) {
    console.error("Profile PUT error:", error);
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
