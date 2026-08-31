"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  User,
  Shield,
  CheckCircle2,
  Save,
  LogOut,
  Sparkles,
  BookOpen,
  RefreshCw,
  FileText,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Building,
  BellRing,
  Bookmark,
  Calendar,
  Layers,
} from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES } from "@/lib/gtu-data";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";

export function ProfileSettings() {
  const { data: session, update } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("BE");
  const [branch, setBranch] = useState("Computer Engineering");
  const [semester, setSemester] = useState("5");
  const [college, setCollege] = useState("028 - L.D. College of Engineering, Ahmedabad");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Subscriptions & Stats
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [savedPapersCount, setSavedPapersCount] = useState(0);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      const userEnroll = (session.user as any).enrollmentNo || "";
      setEnrollmentNo(userEnroll);
      setCourse((session.user as any).course || "BE");
      setBranch((session.user as any).branch || "Computer Engineering");
      setSemester(((session.user as any).semester || 5).toString());
      setCollege((session.user as any).college || "GTU Affiliated Engineering Institute");
      setIsEmailVerified((session.user as any).isEmailVerified ?? true);

      fetchProfileData();
    }
  }, [session]);

  const fetchProfileData = async () => {
    try {
      setLoadingProfile(true);
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setEnrollmentNo(data.user.enrollmentNo || "");
          setCourse(data.user.course || "BE");
          setBranch(data.user.branch || "Computer Engineering");
          setSemester((data.user.semester || 5).toString());
          setCollege(data.user.college || "");
          if (data.user._count) {
            setSavedPapersCount(data.user._count.savedPapers || 0);
          }
        }
      }

      // Fetch active subscriptions
      const subRes = await fetch("/api/results");
      if (subRes.ok) {
        const subData = await subRes.json();
        if (subData.subscriptions) {
          setSubscriptions(subData.subscriptions);
        }
      }
    } catch (e) {
      console.error("Failed to load profile data:", e);
    } finally {
      setLoadingProfile(false);
    }
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
      }
    }
  };

  const handleAutoDecode = () => {
    if (!enrollmentNo) return;
    const decoded = decodeGTUEnrollment(enrollmentNo);
    if (decoded.isValid) {
      setCourse(decoded.courseCode);
      setBranch(decoded.branchName);
      setCollege(decoded.collegeName);
      setSemester(decoded.estimatedSemester.toString());
      setSuccessMsg(`Auto-decoded: ${decoded.courseCode} ${decoded.branchName} (${decoded.collegeName})`);
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      setSaving(true);
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          enrollmentNo: enrollmentNo.trim(),
          course,
          branch,
          semester: parseInt(semester, 10),
          college: college.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setName(data.user.name || name);
        setEnrollmentNo(data.user.enrollmentNo || enrollmentNo);
        setCourse(data.user.course || course);
        setBranch(data.user.branch || branch);
        if (data.user.semester) setSemester(data.user.semester.toString());
        setCollege(data.user.college || college);
        setSuccessMsg("Academic profile saved successfully!");
        if (update) update();
        setTimeout(() => setSuccessMsg(""), 3500);
      } else {
        setErrorMsg(data.error || "Failed to save profile");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"] || [];
  const decodedInfo = decodeGTUEnrollment(enrollmentNo);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Verified GTU Student Account</span>
            </div>
            {isEmailVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Email Verified
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {name || "GTU Student"}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
            Enrollment No: <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">{enrollmentNo || "N/A"}</span> • {course} {branch} (Sem {semester})
          </p>
          <p className="text-xs text-blue-200/70 font-medium">
            🏛️ {college}
          </p>
        </div>

        {/* Quick Academic Overview Card */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0 self-start md:self-center">
          <div className="text-center px-3 border-r border-white/20">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200 block">Semester</span>
            <span className="text-2xl font-black text-white">Sem {semester}</span>
          </div>
          <div className="text-center px-3 border-r border-white/20">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200 block">Alerts</span>
            <span className="text-2xl font-black text-white">{subscriptions.length}</span>
          </div>
          <div className="text-center px-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 block">Saved Papers</span>
            <span className="text-2xl font-black text-emerald-400">{savedPapersCount}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: OFFICIAL GTU RESULTS DIRECT GATEWAY ADVISORY */}
      <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-foreground">
                Official GTU Grade Cards & Marksheets Portal
              </h2>
            </div>
            <p className="text-xs text-muted-foreground max-w-3xl">
              Gujarat Technological University secures student semester marksheets with live visual CAPTCHA verification directly on the official university portal. To view and download your original marksheet transcript, visit the official GTU gateway.
            </p>
          </div>

          <a
            href="https://result.gtu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all inline-flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
          >
            <span>Open result.gtu.ac.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {decodedInfo.isValid && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border/60">
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Admission Batch</span>
              <span className="text-xs font-bold text-foreground">{decodedInfo.admissionYear} Batch</span>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Institute Code</span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">College {decodedInfo.collegeCode}</span>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Branch Code</span>
              <span className="text-xs font-bold text-foreground font-mono">{decodedInfo.branchCode} ({decodedInfo.branchName})</span>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border border-border/60">
              <span className="text-[11px] text-muted-foreground block font-medium">Degree Level</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{decodedInfo.courseCode}</span>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: EDIT STUDENT PROFILE & DEMO ACCOUNTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Profile Form */}
        <div className="lg:col-span-2 bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-foreground">Edit Academic Profile</h2>
              <p className="text-xs text-muted-foreground">
                Update your GTU enrollment number, department, semester, and college settings.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAutoDecode}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/20 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Decode</span>
            </button>
          </div>

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">GTU 12-Digit Enrollment Number</label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  value={enrollmentNo}
                  onChange={(e) => handleEnrollmentChange(e.target.value)}
                  placeholder="e.g. 210120111001"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email Address (Registered)</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-muted border border-border text-sm text-muted-foreground font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">GTU Affiliated College / Institute</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                <label className="text-xs font-semibold text-foreground">Current Semester</label>
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
              disabled={saving}
              className="py-2.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Save Profile Changes"}</span>
            </button>
          </form>
        </div>

        {/* Right Sidebar: Active Subscriptions & Account Switcher */}
        <div className="space-y-6">
          {/* Active Subscriptions Card */}
          <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <BellRing className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-foreground">Active Result Alerts</h3>
            </div>

            {subscriptions.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No active result notifications. Subscribe on the Results page to receive instant alerts when your semester results are declared.
              </p>
            ) : (
              <div className="space-y-2.5">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-2xl bg-muted/50 border border-border/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>{sub.course} Sem {sub.semester}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {sub.examSession}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{sub.branch}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 1-Click Demo Accounts Switcher */}
          <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-foreground">1-Click Demo Students</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Switch between pre-configured GTU student profiles:
            </p>

            <div className="space-y-2">
              {[
                { name: "Aarav Mehta", sem: "Sem 5 CE (LDCE)", email: "student@gtu.ac.in", enroll: "210120111001" },
                { name: "Priya Patel", sem: "Sem 3 IT (BVM)", email: "priya.patel@gtu.ac.in", enroll: "220280116015" },
                { name: "Rahul Shah", sem: "Sem 7 ME (VGEC)", email: "rahul.shah@gtu.ac.in", enroll: "200170119042" },
              ].map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => signIn("credentials", { identifier: acc.email, password: "gtu12345", callbackUrl: "/profile" })}
                  className="w-full p-3 rounded-2xl bg-muted/60 hover:bg-muted border border-border/60 text-left text-xs transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-foreground block">{acc.name}</span>
                    <span className="text-[11px] text-muted-foreground">{acc.sem} • {acc.enroll}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-border/60">
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
