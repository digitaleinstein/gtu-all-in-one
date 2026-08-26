export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const course = searchParams.get("course");
    const branch = searchParams.get("branch");
    const semester = searchParams.get("semester");
    const year = searchParams.get("year");
    const season = searchParams.get("season");
    const search = searchParams.get("search");
    const savedOnly = searchParams.get("savedOnly") === "true";

    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    const whereClause: any = {};

    if (course && course !== "ALL") {
      whereClause.course = course;
    }
    if (branch && branch !== "ALL") {
      whereClause.branch = branch;
    }
    if (semester && semester !== "ALL") {
      whereClause.semester = parseInt(semester, 10);
    }
    if (year && year !== "ALL") {
      whereClause.year = parseInt(year, 10);
    }
    if (season && season !== "ALL") {
      whereClause.examSeason = season;
    }
    if (search) {
      whereClause.OR = [
        { subjectCode: { contains: search } },
        { subjectName: { contains: search } },
      ];
    }
    if (savedOnly && userId) {
      whereClause.savedBy = {
        some: { userId },
      };
    }

    const papers = await prisma.paper.findMany({
      where: whereClause,
      include: {
        savedBy: userId ? { where: { userId } } : false,
      },
      orderBy: [
        { year: "desc" },
        { examSeason: "desc" },
        { subjectCode: "asc" },
      ],
    });

    const formattedPapers = papers.map((p) => ({
      ...p,
      isSaved: p.savedBy && p.savedBy.length > 0,
    }));

    return NextResponse.json({ papers: formattedPapers });
  } catch (error: any) {
    console.error("Failed to fetch papers:", error);
    return NextResponse.json({ error: "Failed to fetch question papers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { action, paperId, paperData } = body;

    // Action 1: Toggle Bookmark / Saved Paper
    if (action === "toggleBookmark") {
      if (!session?.user) {
        return NextResponse.json({ error: "Please log in to bookmark papers" }, { status: 401 });
      }
      const userId = (session.user as any).id;

      const existing = await prisma.savedPaper.findUnique({
        where: {
          userId_paperId: { userId, paperId },
        },
      });

      if (existing) {
        await prisma.savedPaper.delete({
          where: { id: existing.id },
        });
        return NextResponse.json({ saved: false, message: "Removed from saved papers" });
      } else {
        await prisma.savedPaper.create({
          data: { userId, paperId },
        });
        return NextResponse.json({ saved: true, message: "Added to saved papers" });
      }
    }

    // Action 2: Increment Download Count
    if (action === "download") {
      if (!paperId) return NextResponse.json({ error: "Missing paperId" }, { status: 400 });
      const updated = await prisma.paper.update({
        where: { id: paperId },
        data: { downloadsCount: { increment: 1 } },
      });
      return NextResponse.json({ downloadsCount: updated.downloadsCount });
    }

    // Action 3: Add / Upload New Paper
    if (action === "addPaper" && paperData) {
      const newPaper = await prisma.paper.create({
        data: {
          subjectCode: paperData.subjectCode,
          subjectName: paperData.subjectName,
          course: paperData.course || "BE",
          branch: paperData.branch || "Computer Engineering",
          semester: parseInt(paperData.semester, 10) || 5,
          examSeason: paperData.examSeason || "Summer",
          year: parseInt(paperData.year, 10) || 2024,
          pdfUrl: paperData.pdfUrl || `https://www.gtu.ac.in/uploads/${paperData.year}/${paperData.subjectCode}.pdf`,
          fileSize: paperData.fileSize || "1.2 MB",
        },
      });
      return NextResponse.json({ paper: newPaper, message: "Paper added successfully!" }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Paper action error:", error);
    return NextResponse.json({ error: error.message || "Failed to process request" }, { status: 500 });
  }
}
