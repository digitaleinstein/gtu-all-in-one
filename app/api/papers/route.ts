export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GTU_POPULAR_SUBJECTS } from "@/lib/gtu-data";

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

    let papers = await prisma.paper.findMany({
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

    // Fallback: If DB query has 0 results, generate from popular subjects roster
    if (papers.length === 0 && !savedOnly) {
      let candidateSubjects = GTU_POPULAR_SUBJECTS;
      if (course && course !== "ALL") candidateSubjects = candidateSubjects.filter(s => s.course === course);
      if (semester && semester !== "ALL") candidateSubjects = candidateSubjects.filter(s => s.semester === parseInt(semester, 10));
      if (search) {
        const q = search.toLowerCase();
        candidateSubjects = candidateSubjects.filter(s => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
      }

      if (candidateSubjects.length > 0) {
        papers = candidateSubjects.flatMap(sub => [
          {
            id: `dyn_${sub.code}_s24`,
            subjectCode: sub.code,
            subjectName: sub.name,
            course: sub.course,
            branch: sub.branch,
            semester: sub.semester,
            examSeason: "Summer",
            year: 2024,
            pdfUrl: `/api/papers/download?subjectCode=${sub.code}&year=2024&season=Summer`,
            fileSize: "1.5 MB",
            downloadsCount: 420,
            createdAt: new Date(),
            savedBy: [],
          } as any,
          {
            id: `dyn_${sub.code}_w23`,
            subjectCode: sub.code,
            subjectName: sub.name,
            course: sub.course,
            branch: sub.branch,
            semester: sub.semester,
            examSeason: "Winter",
            year: 2023,
            pdfUrl: `/api/papers/download?subjectCode=${sub.code}&year=2023&season=Winter`,
            fileSize: "1.4 MB",
            downloadsCount: 380,
            createdAt: new Date(),
            savedBy: [],
          } as any,
        ]);
      }
    }

    const formattedPapers = papers.map((p) => ({
      ...p,
      isSaved: p.savedBy && p.savedBy.length > 0,
      pdfUrl: `/api/papers/download?id=${p.id}&subjectCode=${p.subjectCode}&year=${p.year}&season=${p.examSeason}`,
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
      if (!paperId.startsWith("dyn_")) {
        const updated = await prisma.paper.update({
          where: { id: paperId },
          data: { downloadsCount: { increment: 1 } },
        }).catch(() => null);
        return NextResponse.json({ downloadsCount: updated?.downloadsCount || 1 });
      }
      return NextResponse.json({ downloadsCount: 1 });
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
          pdfUrl: `/api/papers/download?subjectCode=${paperData.subjectCode}&year=${paperData.year || 2024}&season=${paperData.examSeason || 'Summer'}`,
          fileSize: paperData.fileSize || "1.4 MB",
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
