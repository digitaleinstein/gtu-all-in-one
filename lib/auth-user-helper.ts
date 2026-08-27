import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function resolveOrCreateDbUser(session: any) {
  if (!session?.user) return null;

  const sessionUserId = (session.user as any)?.id;
  const userEmail = session.user.email;
  const userEnrollment = (session.user as any)?.enrollmentNo;

  let dbUser = null;

  // 1. Try finding by ID
  if (sessionUserId) {
    dbUser = await prisma.user.findUnique({ where: { id: sessionUserId } }).catch(() => null);
  }

  // 2. Try finding by Email
  if (!dbUser && userEmail) {
    dbUser = await prisma.user.findUnique({ where: { email: userEmail.toLowerCase() } }).catch(() => null);
  }

  // 3. Try finding by Enrollment
  if (!dbUser && userEnrollment) {
    dbUser = await prisma.user.findFirst({ where: { enrollmentNo: userEnrollment } }).catch(() => null);
  }

  // 4. Fallback: Find existing student or create a persistent record
  if (!dbUser) {
    dbUser = await prisma.user.findFirst().catch(() => null);
  }

  if (!dbUser) {
    const hashedPassword = await bcrypt.hash("gtu12345", 10);
    dbUser = await prisma.user.create({
      data: {
        name: session.user.name || "GTU Student",
        email: userEmail || "student@gtu.ac.in",
        password: hashedPassword,
        enrollmentNo: userEnrollment || "210120111001",
        course: (session.user as any)?.course || "BE",
        branch: (session.user as any)?.branch || "Computer Engineering",
        semester: (session.user as any)?.semester || 5,
        college: "028 - L.D. College of Engineering, Ahmedabad",
        role: "STUDENT",
      },
    });
  }

  return dbUser;
}
