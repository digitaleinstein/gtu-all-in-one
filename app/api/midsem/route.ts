export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GTU_POPULAR_SUBJECTS } from "@/lib/gtu-data";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const semester = parseInt(searchParams.get("semester") || `${(session.user as any).semester || 5}`, 10);
    const userId = (session.user as any).id;

    let records = await prisma.midsemRecord.findMany({
      where: {
        userId,
        semester,
      },
      orderBy: { subjectCode: "asc" },
    });

    // If student has no saved records for this semester, auto-suggest default GTU subjects for their branch/sem
    if (records.length === 0) {
      const userBranch = (session.user as any).branch || "Computer Engineering";
      const userCourse = (session.user as any).course || "BE";
      const defaults = GTU_POPULAR_SUBJECTS.filter(
        (s) => s.semester === semester && s.course === userCourse && (s.branch === userBranch || s.branch === "Computer Engineering")
      );

      return NextResponse.json({
        records: [],
        suggestions: defaults,
        semester,
      });
    }

    return NextResponse.json({
      records,
      semester,
    });
  } catch (error: any) {
    console.error("Midsem GET error:", error);
    return NextResponse.json({ error: "Failed to fetch midsem records" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { action, semester, records, record } = body;

    // 1. Bulk Save/Update Entire Semester Grade Sheet
    if (action === "saveAll" && Array.isArray(records)) {
      const sem = parseInt(semester, 10);

      // Upsert each record
      for (const r of records) {
        if (!r.subjectCode || !r.subjectName) continue;

        const existing = await prisma.midsemRecord.findFirst({
          where: {
            userId,
            semester: sem,
            subjectCode: r.subjectCode,
          },
        });

        const dataPayload = {
          userId,
          semester: sem,
          subjectCode: r.subjectCode,
          subjectName: r.subjectName,
          credits: parseInt(r.credits, 10) || 4,
          midsemMarks: parseFloat(r.midsemMarks) || 0,
          totalMidsemMarks: parseFloat(r.totalMidsemMarks) || 30,
          internalMarks: parseFloat(r.internalMarks) || 0,
          totalInternalMarks: parseFloat(r.totalInternalMarks) || 20,
          practicalMarks: r.practicalMarks !== undefined && r.practicalMarks !== null ? parseFloat(r.practicalMarks) : null,
          totalPracticalMarks: r.totalPracticalMarks !== undefined && r.totalPracticalMarks !== null ? parseFloat(r.totalPracticalMarks) : null,
          targetGrade: r.targetGrade || "AA",
        };

        if (existing) {
          await prisma.midsemRecord.update({
            where: { id: existing.id },
            data: dataPayload,
          });
        } else {
          await prisma.midsemRecord.create({
            data: dataPayload,
          });
        }
      }

      const updatedRecords = await prisma.midsemRecord.findMany({
        where: { userId, semester: sem },
      });

      return NextResponse.json({
        message: "Marks & target grade sheet saved successfully!",
        records: updatedRecords,
      });
    }

    // 2. Add / Update Single Record
    if (record) {
      const sem = parseInt(record.semester || semester, 10);
      const created = await prisma.midsemRecord.create({
        data: {
          userId,
          semester: sem,
          subjectCode: record.subjectCode,
          subjectName: record.subjectName,
          credits: parseInt(record.credits, 10) || 4,
          midsemMarks: parseFloat(record.midsemMarks) || 0,
          totalMidsemMarks: parseFloat(record.totalMidsemMarks) || 30,
          internalMarks: parseFloat(record.internalMarks) || 0,
          totalInternalMarks: parseFloat(record.totalInternalMarks) || 20,
          practicalMarks: record.practicalMarks ? parseFloat(record.practicalMarks) : 0,
          totalPracticalMarks: record.totalPracticalMarks ? parseFloat(record.totalPracticalMarks) : 50,
          targetGrade: record.targetGrade || "AA",
        },
      });

      return NextResponse.json({ record: created, message: "Subject added to tracker" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Midsem save error:", error);
    return NextResponse.json({ error: error.message || "Failed to save marks" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = (session.user as any).id;

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.midsemRecord.deleteMany({
      where: { id, userId },
    });

    return NextResponse.json({ message: "Record deleted" });
  } catch (error: any) {
    console.error("Midsem delete error:", error);
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
