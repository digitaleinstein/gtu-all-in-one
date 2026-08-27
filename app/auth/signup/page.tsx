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
  KeyRound,
  RefreshCw,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES } from "@/lib/gtu-data";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";

export default function SignUpPage() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("BE");
  const [branch, setBranch] = useState("Computer Engineering");
  const [semester, setSemester] = useState("5");
  const [college, setCollege] = useState("028 - L.D. College of Engineering (LDCE), Ahmedabad");

  // OTP Verification State
  const [step, setStep] = useState<"DETAILS" | "OTP">("DETAILS");
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const [isAutoFetched, setIsAutoFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

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

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!enrollmentNo.trim() || !name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setSendingOtp(true);
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          name: name.trim(),
          purpose: "REGISTER",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification email");
      }

      setStep("OTP");
      setResendCountdown(60);
      setSuccess(`A 6-digit verification code has been dispatched to ${email.toLowerCase().trim()}`);
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
    } finally {
      setSendingOtp(false);
    }
  };

  // Step 2: Verify OTP & Complete Registration
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP code.");
      return;
    }

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
          otp: otp.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Account verified and registered successfully! Logging you in...");

      // Auto sign in with credentials
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
      setError(err.message || "Failed to verify account");
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
            {step === "DETAILS" ? "Create GTU Student Account" : "Verify Your Email Address"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {step === "DETAILS"
              ? "Register with your GTU Enrollment Number & verify your email with OTP."
              : `Enter the 6-digit OTP code sent to ${email}`}
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
              <span>{success}</span>
            </div>
          )}

          {step === "DETAILS" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  College, course, branch & semester are automatically parsed from your GTU enrollment.
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
                      placeholder="Aarav Mehta"
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
                <label className="text-xs font-semibold text-foreground">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* College */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">GTU Affiliated College</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Course, Semester, Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Course</label>
                  <select
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                      const bList = GTU_BRANCHES[e.target.value] || [];
                      if (bList.length > 0) setBranch(bList[0]);
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

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Sem {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
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

              {/* Submit Button to trigger OTP */}
              <button
                type="submit"
                disabled={sendingOtp}
                className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {sendingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending Verification OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Email Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: ENTER OTP */
            <form onSubmit={handleVerifyAndRegister} className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/30 text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto" />
                <p className="text-xs text-foreground font-semibold">
                  We have sent a 6-digit verification OTP to:
                </p>
                <p className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                  {email}
                </p>
              </div>

              <div className="space-y-2 text-center">
                <label className="text-xs font-semibold text-foreground block">
                  Enter 6-Digit OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="• • • • • •"
                  className="w-48 mx-auto px-4 py-3 rounded-2xl bg-background border-2 border-primary text-center text-2xl font-mono font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep("DETAILS");
                    setError("");
                  }}
                  className="text-muted-foreground hover:text-foreground font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  disabled={resendCountdown > 0 || sendingOtp}
                  onClick={handleSendOtp}
                  className="text-primary hover:underline font-bold disabled:text-muted-foreground disabled:no-underline"
                >
                  {resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : "Resend OTP"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying & Creating Account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP & Complete Registration</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-border/60 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
