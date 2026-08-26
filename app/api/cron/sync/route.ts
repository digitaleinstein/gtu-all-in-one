export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { syncGTUDataToDatabase } from "@/lib/scraper";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    // Optional simple security key check for cron triggers
    if (process.env.CRON_SECRET && key !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Invalid cron secret" }, { status: 401 });
    }

    const result = await syncGTUDataToDatabase();

    return NextResponse.json({
      status: "success",
      message: "Cron sync executed successfully",
      ...result,
    });
  } catch (error: any) {
    console.error("Cron sync execution failed:", error);
    return NextResponse.json({ error: error.message || "Cron sync error" }, { status: 500 });
  }
}
