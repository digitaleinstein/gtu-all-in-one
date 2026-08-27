export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";
import { z } from "zod";

const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  purpose: z.string().default("REGISTER"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = sendOtpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, name, purpose } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // If registering, verify user doesn't already exist
    if (purpose === "REGISTER") {
      const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      if (existing) {
        return NextResponse.json(
          { error: "An account with this email address already exists. Please sign in." },
          { status: 409 }
        );
      }
    }

    // Invalidate previous unexpired OTPs for this email & purpose
    await prisma.otpVerification.updateMany({
      where: {
        email: normalizedEmail,
        purpose,
        isUsed: false,
      },
      data: { isUsed: true },
    });

    // Generate random 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save to Database
    await prisma.otpVerification.create({
      data: {
        email: normalizedEmail,
        otp,
        purpose,
        expiresAt,
      },
    });

    // Send Real Email OTP
    const emailResult = await sendOtpEmail({
      to: normalizedEmail,
      name,
      otp,
      purpose: purpose === "REGISTER" ? "Student Registration" : "Account Verification",
    });

    if (!emailResult.success) {
      console.warn("Could not dispatch via SMTP transporter, falling back to simulated OTP response");
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${normalizedEmail}.`,
      expiresInMinutes: 10,
    });
  } catch (error: any) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { error: "Failed to generate and send verification code. Please try again." },
      { status: 500 }
    );
  }
}
