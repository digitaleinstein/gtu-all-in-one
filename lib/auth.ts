import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
          // Allow fallback for demo accounts with plain text in seed if needed, but we hash in seed
          if (credentials.password !== user.password) {
            throw new Error("Invalid password. Try 'gtu12345'");
          }
        }

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
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.enrollmentNo = (user as any).enrollmentNo;
        token.course = (user as any).course;
        token.branch = (user as any).branch;
        token.semester = (user as any).semester;
        token.college = (user as any).college;
        token.role = (user as any).role;
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
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "gtu-all-in-one-super-secret-key-2025",
};
