import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function resolveOrCreateDbUser(session: any) {
  if (!session?.user) return null;

  const sessionUserId = (session.user as any)?.id;
  const userEmail = session.user.email ? session.user.email.toLowerCase().trim() : null;
  const userEnrollment = (session.user as any)?.enrollmentNo ? (session.user as any).enrollmentNo.trim() : null;

  let dbUser = null;

  // 1. Match by Email first (Most reliable across Google OAuth and Credentials)
  if (userEmail) {
    dbUser = await prisma.user.findUnique({
      where: { email: userEmail },
    }).catch(() => null);
  }

  // 2. Match by Session User ID
  if (!dbUser && sessionUserId) {
    dbUser = await prisma.user.findUnique({
      where: { id: sessionUserId },
    }).catch(() => null);
  }

  // 3. Match by Enrollment Number
  if (!dbUser && userEnrollment) {
    dbUser = await prisma.user.findFirst({
      where: { enrollmentNo: userEnrollment },
    }).catch(() => null);
  }

  // 4. If user is authenticated with email, ensure their unique account exists
  if (!dbUser && userEmail) {
    const randomPassword = await bcrypt.hash(Math.random().toString(36).substring(2, 12), 10);
    try {
      dbUser = await prisma.user.create({
        data: {
          name: session.user.name || "GTU Student",
          email: userEmail,
          password: randomPassword,
          enrollmentNo: userEnrollment || null,
          course: (session.user as any)?.course || "BE",
          branch: (session.user as any)?.branch || "Computer Engineering",
          semester: (session.user as any)?.semester || 5,
          college: (session.user as any)?.college || "028 - L.D. College of Engineering, Ahmedabad",
          role: "STUDENT",
          isEmailVerified: true,
        },
      });
    } catch (e) {
      console.error("Failed to auto-create DB user in helper:", e);
      dbUser = await prisma.user.findUnique({ where: { email: userEmail } }).catch(() => null);
    }
  }

  return dbUser;
}
