export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncGTUDataToDatabase } from "@/lib/scraper";

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

    const circulars = await prisma.circular.findMany({
      where: whereClause,
      orderBy: [
        { isPinned: "desc" },
        { publishedDate: "desc" },
      ],
      take: limit,
    });

    const totalCount = await prisma.circular.count({ where: whereClause });

    return NextResponse.json({
      circulars,
      totalCount,
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

    if (action === "create" && body.circularData) {
      const created = await prisma.circular.create({
        data: {
          title: body.circularData.title,
          category: body.circularData.category || "General",
          publishedDate: body.circularData.publishedDate ? new Date(body.circularData.publishedDate) : new Date(),
          pdfUrl: body.circularData.pdfUrl || "https://www.gtu.ac.in",
          isPinned: !!body.circularData.isPinned,
          gtuRefNo: body.circularData.gtuRefNo || `GTU/CIRCULAR/${Date.now()}`,
          description: body.circularData.description,
        },
      });
      return NextResponse.json({ circular: created, message: "Circular published" }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Circular sync error:", error);
    return NextResponse.json({ error: error.message || "Sync failed" }, { status: 500 });
  }
}
