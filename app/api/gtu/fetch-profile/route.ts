export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const enrollment = searchParams.get("enrollment") || "";

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment number is required" }, { status: 400 });
    }

    const decoded = decodeGTUEnrollment(enrollment);

    return NextResponse.json({
      success: true,
      profile: decoded,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to decode enrollment" }, { status: 500 });
  }
}
