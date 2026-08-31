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
  Zap,
  Info,
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
  const [receivedDemoOtp, setReceivedDemoOtp] = useState<string | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      await signIn("google", { callbackUrl: "/profile" });
    } catch (err) {
      setError("Failed to initialize Google Sign Up.");
      setGoogleLoading(false);
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
      if (data.demoOtp) {
        setReceivedDemoOtp(data.demoOtp);
        setOtp(data.demoOtp);
      }
      setSuccess(`Verification code dispatched for ${email.toLowerCase().trim()}`);
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
              ? "Sign up with Google or enter your GTU Enrollment Number."
              : `Enter the 6-digit verification code for ${email}`}
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
            <div className="space-y-5">
              {/* 1-Click Google Sign Up */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={googleLoading}
                className="w-full py-3 px-4 rounded-2xl bg-background hover:bg-muted/80 text-foreground border border-border font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer disabled:opacity-60"
              >
                {googleLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Sign up with Google (Instant Verification)</span>
              </button>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Or register with GTU Enrollment
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>

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
                    College, course, branch &amp; semester are automatically parsed from your GTU enrollment format.
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
                      <span>Generating &amp; Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Email Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: ENTER OTP */
            <form onSubmit={handleVerifyAndRegister} className="space-y-5">
              <div className="p-5 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-500/30 text-center space-y-3">
                <ShieldCheck className="w-9 h-9 text-blue-600 dark:text-blue-400 mx-auto" />
                
                <div>
                  <p className="text-xs text-foreground font-semibold">
                    Verification code for registered address:
                  </p>
                  <p className="text-sm font-black font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                    {email}
                  </p>
                </div>

                {/* Instant Verification Helper Banner */}
                {receivedDemoOtp && (
                  <div className="p-3 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span>Security Verification OTP:</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 font-mono text-base font-black text-foreground">
                        {receivedDemoOtp}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOtp(receivedDemoOtp)}
                      className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>1-Tap Auto-Fill Code ({receivedDemoOtp})</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Also check Spam/Promotions folder if your email inbox is strict.</span>
                </div>
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
                  className="w-52 mx-auto px-4 py-3 rounded-2xl bg-background border-2 border-primary text-center text-2xl font-mono font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep("DETAILS");
                    setError("");
                  }}
                  className="text-muted-foreground hover:text-foreground font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  disabled={resendCountdown > 0 || sendingOtp}
                  onClick={handleSendOtp}
                  className="text-primary hover:underline font-bold disabled:text-muted-foreground disabled:no-underline cursor-pointer"
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
                    <span>Verifying &amp; Creating Account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP &amp; Complete Registration</span>
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
