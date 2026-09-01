import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    // 1. Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),

    // 2. GTU Student Credentials Provider
    CredentialsProvider({
      name: "GTU Student Credentials",
      credentials: {
        identifier: { label: "Enrollment No or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Please enter your email/enrollment number and password");
        }

        const identifier = credentials.identifier.trim();

        // Find by email or enrollment number
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier.toLowerCase() },
              { enrollmentNo: identifier },
            ],
          },
        });

        if (!user) {
          throw new Error("No account found with this Enrollment No / Email");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          if (credentials.password !== user.password) {
            throw new Error("Invalid password. Default demo password is 'gtu12345'");
          }
        }

        // Update last login timestamp in DB
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        }).catch(() => null);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          enrollmentNo: user.enrollmentNo,
          course: user.course,
          branch: user.branch,
          semester: user.semester,
          college: user.college,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;
        try {
          const emailLower = user.email.toLowerCase().trim();
          const existingUser = await prisma.user.findUnique({
            where: { email: emailLower },
          });

          if (!existingUser) {
            const randomPasswordHash = await bcrypt.hash(Math.random().toString(36).substring(2, 12), 10);
            const newUser = await prisma.user.create({
              data: {
                name: user.name || "GTU Student",
                email: emailLower,
                password: randomPasswordHash,
                avatar: user.image || null,
                course: "BE",
                branch: "Computer Engineering",
                semester: 5,
                college: "028 - L.D. College of Engineering, Ahmedabad",
                role: "STUDENT",
                isEmailVerified: true,
                lastLoginAt: new Date(),
                notificationPreferences: JSON.stringify({
                  emailAlerts: true,
                  inAppAlerts: true,
                  resultAlerts: true,
                  circularAlerts: true,
                  selectedCategories: ["Examinations", "Timetables", "Academic", "Scholarships"],
                }),
              },
            });

            // Initialize default subscriptions for this student
            await prisma.resultSubscription.create({
              data: {
                userId: newUser.id,
                course: "BE",
                branch: "Computer Engineering",
                semester: 5,
                examSession: "Summer 2026",
                examType: "Regular",
                emailAlerts: true,
                pushAlerts: true,
                isActive: true,
              },
            }).catch(() => null);

            await prisma.circularSubscription.createMany({
              data: [
                { userId: newUser.id, category: "Examinations", emailAlerts: true, inAppAlerts: true, isActive: true },
                { userId: newUser.id, category: "Timetables", emailAlerts: true, inAppAlerts: true, isActive: true },
                { userId: newUser.id, category: "Scholarships", emailAlerts: true, inAppAlerts: true, isActive: true },
              ],
            }).catch(() => null);

            // Send Welcome In-App Notification
            await prisma.notification.create({
              data: {
                userId: newUser.id,
                title: "🎓 Welcome to GTU All In One!",
                message: "Your student profile is active! You will automatically receive live in-app notifications for your branch results and GTU circulars.",
                type: "SYSTEM",
                link: "/profile",
                isRead: false,
              },
            }).catch(() => null);

            (user as any).id = newUser.id;
            (user as any).enrollmentNo = newUser.enrollmentNo;
            (user as any).course = newUser.course;
            (user as any).branch = newUser.branch;
            (user as any).semester = newUser.semester;
            (user as any).college = newUser.college;
            (user as any).role = newUser.role;
            (user as any).isEmailVerified = true;
          } else {
            // Update lastLoginAt and image for existing user
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                isEmailVerified: true,
                lastLoginAt: new Date(),
                avatar: user.image || existingUser.avatar,
              },
            }).catch(() => null);

            (user as any).id = existingUser.id;
            (user as any).enrollmentNo = existingUser.enrollmentNo;
            (user as any).course = existingUser.course;
            (user as any).branch = existingUser.branch;
            (user as any).semester = existingUser.semester;
            (user as any).college = existingUser.college;
            (user as any).role = existingUser.role;
            (user as any).isEmailVerified = true;
          }
          return true;
        } catch (err) {
          console.error("Google sign-in sync error:", err);
          return true; // Allow NextAuth flow
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.id = (user as any).id || token.id;
        token.enrollmentNo = (user as any).enrollmentNo || token.enrollmentNo;
        token.course = (user as any).course || token.course || "BE";
        token.branch = (user as any).branch || token.branch || "Computer Engineering";
        token.semester = (user as any).semester || token.semester || 5;
        token.college = (user as any).college || token.college || "028 - L.D. College of Engineering, Ahmedabad";
        token.role = (user as any).role || token.role || "STUDENT";
        token.isEmailVerified = (user as any).isEmailVerified ?? token.isEmailVerified ?? true;
      }

      // Always ensure token has latest user details from server database
      if (token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email.toLowerCase().trim() },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.enrollmentNo = dbUser.enrollmentNo;
            token.course = dbUser.course || "BE";
            token.branch = dbUser.branch || "Computer Engineering";
            token.semester = dbUser.semester || 5;
            token.college = dbUser.college || "028 - L.D. College of Engineering, Ahmedabad";
            token.role = dbUser.role || "STUDENT";
            token.isEmailVerified = dbUser.isEmailVerified;
          }
        } catch (e) {
          // ignore
        }
      }

      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).enrollmentNo = token.enrollmentNo;
        (session.user as any).course = token.course;
        (session.user as any).branch = token.branch;
        (session.user as any).semester = token.semester;
        (session.user as any).college = token.college;
        (session.user as any).role = token.role;
        (session.user as any).isEmailVerified = token.isEmailVerified;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "gtu-all-in-one-super-secret-key-2025",
};
