export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PMMS_DEFAULT_MILESTONES } from "@/lib/gtu-data";
import { resolveOrCreateDbUser } from "@/lib/auth-user-helper";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const dbUser = await resolveOrCreateDbUser(session);
    const userId = dbUser?.id;

    let userMilestones: any[] = [];
    if (userId) {
      userMilestones = await prisma.pMMSMilestone.findMany({
        where: { userId },
      });
    }

    // Merge default guide metadata with user progress
    const milestones = PMMS_DEFAULT_MILESTONES.map((def) => {
      const userEntry = userMilestones.find((u) => u.milestoneKey === def.key);
      return {
        ...def,
        isCompleted: userEntry?.isCompleted || false,
        notes: userEntry?.notes || "",
        completedAt: userEntry?.completedAt || null,
        userMilestoneId: userEntry?.id || null,
      };
    });

    const completedCount = milestones.filter((m) => m.isCompleted).length;
    const progressPercent = Math.round((completedCount / milestones.length) * 100);

    return NextResponse.json({
      milestones,
      stats: {
        total: milestones.length,
        completed: completedCount,
        progressPercent,
      },
    });
  } catch (error: any) {
    console.error("PMMS GET error:", error);
    return NextResponse.json({ error: "Failed to fetch PMMS status" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const dbUser = await resolveOrCreateDbUser(session);
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = dbUser.id;
    const body = await req.json();
    const { milestoneKey, isCompleted, notes, title, phase } = body;

    if (!milestoneKey) {
      return NextResponse.json({ error: "milestoneKey is required" }, { status: 400 });
    }

    const existing = await prisma.pMMSMilestone.findUnique({
      where: {
        userId_milestoneKey: { userId, milestoneKey },
      },
    });

    let updated;
    if (existing) {
      updated = await prisma.pMMSMilestone.update({
        where: { id: existing.id },
        data: {
          isCompleted: isCompleted !== undefined ? isCompleted : existing.isCompleted,
          notes: notes !== undefined ? notes : existing.notes,
          completedAt: isCompleted ? new Date() : (isCompleted === false ? null : existing.completedAt),
        },
      });
    } else {
      updated = await prisma.pMMSMilestone.create({
        data: {
          userId,
          milestoneKey,
          title: title || milestoneKey,
          phase: phase || "Phase 1 (Sem 7)",
          isCompleted: Boolean(isCompleted),
          notes: notes || "",
          completedAt: isCompleted ? new Date() : null,
        },
      });
    }

    return NextResponse.json({
      milestone: updated,
      message: "PMMS milestone updated successfully",
    });
  } catch (error: any) {
    console.error("PMMS update error:", error);
    return NextResponse.json({ error: error.message || "Failed to update milestone" }, { status: 500 });
  }
}
