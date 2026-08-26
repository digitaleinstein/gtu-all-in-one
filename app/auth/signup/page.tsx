"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Search,
  BookOpen,
} from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES } from "@/lib/gtu-data";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("BE");
  const [branch, setBranch] = useState("Computer Engineering");
  const [semester, setSemester] = useState("5");
  const [college, setCollege] = useState("028 - L.D. College of Engineering (LDCE), Ahmedabad");

  const [isAutoFetched, setIsAutoFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-detect profile from GTU Enrollment Number
  const handleEnrollmentChange = (val: string) => {
    setEnrollmentNo(val);
    const digits = val.replace(/\D/g, "");
    if (digits.length >= 11) {
      const decoded = decodeGTUEnrollment(digits);
      if (decoded.isValid) {
        setCourse(decoded.courseCode);
        setBranch(decoded.branchName);
        setCollege(decoded.collegeName);
        setSemester(decoded.estimatedSemester.toString());
        setIsAutoFetched(true);
      }
    } else {
      setIsAutoFetched(false);
    }
  };

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          enrollmentNo: enrollmentNo.trim(),
          course,
          branch,
          semester: parseInt(semester, 10),
          college,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);

      // Auto sign in
      const signInRes = await signIn("credentials", {
        identifier: email,
        password,
        redirect: false,
      });

      if (signInRes?.ok) {
        router.push("/profile");
        router.refresh();
      } else {
        router.push("/auth/signin");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create student account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Create GTU Student Account
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enter your GTU Enrollment Number to automatically sync your profile, exam papers & semester result transcripts.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-3xl border border-border/80 shadow-xl space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Account created successfully! Synchronizing GTU results and redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Enrollment Number with Auto-Detection */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">
                  GTU 12-Digit Enrollment Number *
                </label>
                {isAutoFetched && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> Auto-Decoded
                  </span>
                )}
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  required
                  maxLength={12}
                  value={enrollmentNo}
                  onChange={(e) => handleEnrollmentChange(e.target.value)}
                  placeholder="e.g. 210120111001"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                College, course, branch & semester are automatically fetched from your official GTU enrollment format.
              </p>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@gtu.ac.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Password (min 6 characters) *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* College Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">GTU Affiliated College / Institute</label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. 028 - L.D. College of Engineering, Ahmedabad"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Course, Branch & Semester */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Degree / Course</label>
                <select
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                    const newBranches = GTU_BRANCHES[e.target.value] || [];
                    if (newBranches.length > 0) setBranch(newBranches[0]);
                  }}
                  className="w-full px-3 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {GTU_COURSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-semibold text-foreground">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-semibold text-foreground">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span>Registering Student Account...</span>
              ) : (
                <>
                  <span>Create Account & Sync Results</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
