export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
  purpose: z.string().default("REGISTER"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = verifyOtpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, otp, purpose } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Look up OTP record
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        email: normalizedEmail,
        otp: otp.trim(),
        purpose,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid or expired OTP. Please request a new code." },
        { status: 400 }
      );
    }

    // Mark OTP as used
    await prisma.otpVerification.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (error: any) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP code." },
      { status: 500 }
    );
  }
}
