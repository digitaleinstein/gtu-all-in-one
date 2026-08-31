"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  GraduationCap,
  Sparkles,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Search,
  BookOpen,
  Layers,
  X,
  Zap,
} from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES } from "@/lib/gtu-data";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";

export function EnrollmentOnboardingModal() {
  const { data: session, update } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("BE");
  const [branch, setBranch] = useState("Computer Engineering");
  const [semester, setSemester] = useState("5");
  const [college, setCollege] = useState("028 - L.D. College of Engineering (LDCE), Ahmedabad");

  const [isAutoDecoded, setIsAutoDecoded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const userEmail = session.user.email || "default";
      const currentEnroll = (session.user as any).enrollmentNo;
      setName(session.user.name || "");

      // If user already has an enrollment number linked on server, NEVER show
      if (currentEnroll && currentEnroll.trim() !== "" && currentEnroll !== "null") {
        if (typeof window !== "undefined") {
          localStorage.setItem("gtu_enrollment_saved_" + userEmail, "true");
        }
        setIsOpen(false);
        return;
      }

      // Check if user previously saved or dismissed
      if (typeof window !== "undefined") {
        const isDismissed = localStorage.getItem("gtu_enrollment_dismissed_" + userEmail);
        const isSaved = localStorage.getItem("gtu_enrollment_saved_" + userEmail);
        if (isDismissed === "true" || isSaved === "true") {
          setIsOpen(false);
          return;
        }
      }

      // First time Google user with no enrollment number
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [session]);

  const handleDismiss = () => {
    if (session?.user?.email && typeof window !== "undefined") {
      localStorage.setItem("gtu_enrollment_dismissed_" + session.user.email, "true");
    }
    setIsOpen(false);
  };

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
        setIsAutoDecoded(true);
      }
    } else {
      setIsAutoDecoded(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const digits = enrollmentNo.replace(/\D/g, "");
    if (digits.length < 11) {
      setError("Please enter a valid 12-digit GTU Enrollment Number (e.g. 210120111001).");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || session?.user?.name,
          enrollmentNo: digits,
          course,
          branch,
          semester: parseInt(semester, 10),
          college: college.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to link enrollment number");
      }

      setSuccess(true);
      const userEmail = session?.user?.email || "default";
      if (typeof window !== "undefined") {
        localStorage.setItem("gtu_enrollment_saved_" + userEmail, "true");
        localStorage.setItem("gtu_enrollment_dismissed_" + userEmail, "true");
      }

      if (update) {
        await update({
          user: {
            enrollmentNo: digits,
            course,
            branch,
            semester: parseInt(semester, 10),
            college,
          },
        });
      }

      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-card text-card-foreground border border-border/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative">
        {/* Close button (allows skipping for now) */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
          title="Skip for now"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            Complete Your GTU Profile 🎓
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Welcome, <strong>{session?.user?.name || "Student"}</strong>! Enter your GTU Enrollment Number to automatically sync your syllabus, past papers, and result alerts.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-2 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              GTU Profile Successfully Linked!
            </h3>
            <p className="text-xs text-muted-foreground">
              Your curriculum, semester, and college preferences are now synchronized.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Enrollment Number Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">
                  GTU 12-Digit Enrollment Number *
                </label>
                {isAutoDecoded && (
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>

            {/* Auto-Decoded Preview Banner */}
            {isAutoDecoded && (
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-500/30 space-y-2 text-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Auto-Identified Academic Profile</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono font-bold text-[10px]">
                    Sem {semester}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground space-y-1 pt-1 border-t border-blue-500/20">
                  <p>
                    🏛️ <strong>Institute:</strong> {college}
                  </p>
                  <p>
                    🎓 <strong>Degree &amp; Branch:</strong> {course} • {branch}
                  </p>
                </div>
              </div>
            )}

            {/* Editable Fields */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">Course</label>
                <select
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                    const bList = GTU_BRANCHES[e.target.value] || [];
                    if (bList.length > 0) setBranch(bList[0]);
                  }}
                  className="w-full px-2.5 py-2 rounded-xl bg-background border border-border text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {GTU_COURSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-background border border-border text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Sem {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-background border border-border text-xs focus:ring-2 focus:ring-blue-500 outline-none truncate"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-foreground">GTU Affiliated College</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || enrollmentNo.length < 11}
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Linking GTU Enrollment...</span>
                </>
              ) : (
                <>
                  <span>Save &amp; Link GTU Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
