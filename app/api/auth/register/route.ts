export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  enrollmentNo: z.string().min(6, "Enrollment number is required"),
  course: z.string().optional(),
  branch: z.string().optional(),
  semester: z.number().min(1).max(10).optional(),
  college: z.string().optional(),
  otp: z.string().min(6, "6-digit OTP is required for email verification"),
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

    const { name, email, password, enrollmentNo, otp } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();
    const cleanEnrollment = enrollmentNo.trim();

    // 1. Verify OTP
    const validOtp = await prisma.otpVerification.findFirst({
      where: {
        email: normalizedEmail,
        otp: otp.trim(),
        purpose: "REGISTER",
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!validOtp) {
      return NextResponse.json(
        { error: "Invalid or expired OTP code. Please request a new verification code." },
        { status: 400 }
      );
    }

    // Mark OTP as used
    await prisma.otpVerification.update({
      where: { id: validOtp.id },
      data: { isUsed: true },
    });

    // 2. Check if email or enrollment already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          { enrollmentNo: cleanEnrollment },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this Email or GTU Enrollment Number already exists." },
        { status: 409 }
      );
    }

    // 3. Auto-decode GTU enrollment attributes
    const decoded = decodeGTUEnrollment(cleanEnrollment);
    const course = parsed.data.course || decoded.courseCode || "BE";
    const branch = parsed.data.branch || decoded.branchName || "Computer Engineering";
    const semester = parsed.data.semester || decoded.estimatedSemester || 5;
    const college = parsed.data.college || decoded.collegeName || "GTU Affiliated Engineering Institute";

    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Store Student Data
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        enrollmentNo: cleanEnrollment,
        course,
        branch,
        semester,
        college,
        isEmailVerified: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account verified and registered successfully!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          enrollmentNo: user.enrollmentNo,
          course: user.course,
          branch: user.branch,
          semester: user.semester,
          college: user.college,
          isEmailVerified: true,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
