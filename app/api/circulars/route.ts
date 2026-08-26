export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrapeLiveCirculars, syncGTUDataToDatabase } from "@/lib/scraper";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // 1. Fetch live directly from GTU server
    let liveCirculars: any[] = [];
    try {
      liveCirculars = await scrapeLiveCirculars();
    } catch (e) {
      console.warn("Real-time live circular fetch failed, falling back to database:", e);
    }

    if (liveCirculars.length > 0) {
      let filtered = liveCirculars;
      if (category && category !== "ALL") {
        filtered = filtered.filter((c) => c.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter((c) => c.title.toLowerCase().includes(q));
      }
      return NextResponse.json({
        liveFromGTU: true,
        circulars: filtered.slice(0, limit),
        totalCount: filtered.length,
      });
    }

    // 2. Fallback to DB
    const whereClause: any = {};
    if (category && category !== "ALL") whereClause.category = category;
    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const circulars = await prisma.circular.findMany({
      where: whereClause,
      orderBy: [{ isPinned: "desc" }, { publishedDate: "desc" }],
      take: limit,
    });

    const totalCount = await prisma.circular.count({ where: whereClause });

    return NextResponse.json({
      liveFromGTU: false,
      circulars,
      totalCount,
    });
  } catch (error: any) {
    console.error("Circulars API error:", error);
    return NextResponse.json({ error: "Failed to fetch circulars" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action } = body;

    if (action === "sync") {
      const syncResult = await syncGTUDataToDatabase();
      return NextResponse.json({
        message: "Circulars and declared results synchronized with GTU portal",
        ...syncResult,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process circulars sync" }, { status: 500 });
  }
}
