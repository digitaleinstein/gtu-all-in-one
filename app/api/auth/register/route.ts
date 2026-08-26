export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";
import { syncAndStoreStudentResults } from "@/lib/gtu-results-engine";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  enrollmentNo: z.string().min(6, "Enrollment number is required"),
  course: z.string().optional(),
  branch: z.string().optional(),
  semester: z.number().min(1).max(10).optional(),
  college: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, enrollmentNo } = parsed.data;

    // Auto-decode GTU enrollment attributes
    const decoded = decodeGTUEnrollment(enrollmentNo);
    const course = parsed.data.course || decoded.courseCode || "BE";
    const branch = parsed.data.branch || decoded.branchName || "Computer Engineering";
    const semester = parsed.data.semester || decoded.estimatedSemester || 5;
    const college = parsed.data.college || decoded.collegeName || "GTU Affiliated Engineering Institute";

    // Check if email or enrollment already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase().trim() },
          { enrollmentNo: enrollmentNo.trim() },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this Email or GTU Enrollment Number already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        enrollmentNo: enrollmentNo.trim(),
        course,
        branch,
        semester,
        college,
      },
    });

    // Automatically sync & store student result history
    try {
      await syncAndStoreStudentResults(user.id, user.enrollmentNo!, user.semester || 5);
    } catch (resErr) {
      console.warn("Failed to auto-seed student results:", resErr);
    }

    // Create default welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "🎉 Welcome to GTU All In One!",
        message: `Your account for ${user.course} - ${user.branch} (${user.college}) is active! Your GTU academic results have been synchronized.`,
        type: "INFO",
        link: "/profile",
      },
    });

    // Create default result subscription for current semester
    await prisma.resultSubscription.create({
      data: {
        userId: user.id,
        enrollmentNo: user.enrollmentNo,
        course: user.course || "BE",
        branch: user.branch || "Computer Engineering",
        semester: user.semester || 5,
        examSession: "Winter 2024",
        examType: "Regular",
        emailAlerts: true,
        pushAlerts: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully! You can now log in.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          enrollmentNo: user.enrollmentNo,
          course: user.course,
          branch: user.branch,
          semester: user.semester,
          college: user.college,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create account" },
      { status: 500 }
    );
  }
}
