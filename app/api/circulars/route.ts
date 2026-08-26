export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncGTUDataToDatabase, scrapeLiveCirculars } from "@/lib/scraper";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const whereClause: any = {};

    if (category && category !== "ALL") {
      whereClause.category = category;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { gtuRefNo: { contains: search } },
        { description: { contains: search } },
      ];
    }

    let circulars = await prisma.circular.findMany({
      where: whereClause,
      orderBy: [
        { isPinned: "desc" },
        { publishedDate: "desc" },
      ],
      take: limit,
    });

    if (circulars.length === 0) {
      const live = await scrapeLiveCirculars();
      if (live.length > 0) {
        circulars = live as any;
      }
    }

    const totalCount = await prisma.circular.count({ where: whereClause });

    return NextResponse.json({
      circulars,
      totalCount: Math.max(totalCount, circulars.length),
    });
  } catch (error: any) {
    console.error("Failed to fetch circulars:", error);
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
        message: "Circulars and results synchronized with GTU portal",
        ...syncResult,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Circulars action error:", error);
    return NextResponse.json({ error: error.message || "Failed to process circulars request" }, { status: 500 });
  }
}
