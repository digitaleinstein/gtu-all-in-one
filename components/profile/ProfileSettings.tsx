"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  User,
  Shield,
  Smartphone,
  Mail,
  Bell,
  CheckCircle2,
  Save,
  LogOut,
  Building,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  RefreshCw,
  Printer,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
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

  // Academic Results State
  const [resultsData, setResultsData] = useState<any>(null);
  const [selectedSemTab, setSelectedSemTab] = useState<number>(5);
  const [loadingResults, setLoadingResults] = useState(false);
  const [syncingResults, setSyncingResults] = useState(false);
  const [resultSyncMsg, setResultSyncMsg] = useState("");

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setEnrollmentNo((session.user as any).enrollmentNo || "210120111001");
      setCourse((session.user as any).course || "BE");
      setBranch((session.user as any).branch || "Computer Engineering");
      setSemester(((session.user as any).semester || 5).toString());
      setCollege((session.user as any).college || "028 - L.D. College of Engineering, Ahmedabad");
      setSelectedSemTab((session.user as any).semester || 5);
      fetchStudentResults((session.user as any).enrollmentNo || "210120111001");
    } else {
      fetchStudentResults("210120111001");
    }
  }, [session]);

  const fetchStudentResults = async (enrollment: string) => {
    try {
      setLoadingResults(true);
      const res = await fetch(`/api/user/results?enrollment=${enrollment}`);
      const data = await res.json();
      if (res.ok && data.results) {
        setResultsData(data);
        if (data.results.length > 0) {
          const maxSem = data.results[data.results.length - 1].semester;
          setSelectedSemTab(maxSem);
        }
      }
    } catch (e) {
      console.error("Failed to load results:", e);
    } finally {
      setLoadingResults(false);
    }
  };

  const handleSyncGTUResults = async () => {
    try {
      setSyncingResults(true);
      setResultSyncMsg("");
      const res = await fetch("/api/user/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "syncResults", enrollmentNo }),
      });
      const data = await res.json();
      if (res.ok) {
        setResultSyncMsg("Academic records verified and synchronized with GTU portal!");
        fetchStudentResults(enrollmentNo);
        setTimeout(() => setResultSyncMsg(""), 4000);
      }
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setSyncingResults(false);
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
      setSuccessMsg(`Auto-decoded GTU parameters: ${decoded.courseCode} ${decoded.branchName} (${decoded.collegeName})`);
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          enrollmentNo,
          course,
          branch,
          semester: parseInt(semester, 10),
          college,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Academic profile saved successfully!");
        if (update) update();
        fetchStudentResults(enrollmentNo);
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"] || [];

  const currentSemTranscript = resultsData?.results?.find(
    (r: any) => r.semester === selectedSemTab
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Verified GTU Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {name || "GTU Student"}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80 max-w-xl">
            Enrollment No: <span className="font-mono font-bold text-white">{enrollmentNo || "210120111001"}</span> • {course} {branch} (Sem {semester}) • {college}
          </p>
        </div>

        {/* CPI & CGPA Score Card */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
          <div className="text-center px-3 border-r border-white/20">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200 block">Current CPI</span>
            <span className="text-2xl font-black text-white">{resultsData?.cpi || "8.97"}</span>
          </div>
          <div className="text-center px-3 border-r border-white/20">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200 block">CGPA</span>
            <span className="text-2xl font-black text-white">{resultsData?.cgpa || "8.97"}</span>
          </div>
          <div className="text-center px-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 block">Backlogs</span>
            <span className="text-2xl font-black text-emerald-400">0</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: GTU OFFICIAL ACADEMIC RESULTS & GRADE TRANSCRIPTS */}
      <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                Official GTU Academic Results & Marksheets
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Complete semester-wise grade transcripts, Theory/Practical marks breakdown, and university grade points.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncGTUResults}
              disabled={syncingResults}
              className="px-3.5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingResults ? "animate-spin" : ""}`} />
              <span>{syncingResults ? "Syncing..." : "Sync Latest GTU Results"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-muted hover:bg-accent text-foreground text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Print Marksheet</span>
            </button>
          </div>
        </div>

        {resultSyncMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{resultSyncMsg}</span>
          </div>
        )}

        {/* Semester Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {resultsData?.results?.map((r: any) => (
            <button
              key={r.semester}
              onClick={() => setSelectedSemTab(r.semester)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                selectedSemTab === r.semester
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "bg-muted hover:bg-accent text-muted-foreground"
              }`}
            >
              <span>Semester {r.semester}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${selectedSemTab === r.semester ? "bg-white/20 text-white" : "bg-background text-foreground"}`}>
                SPI: {r.spi}
              </span>
            </button>
          ))}
        </div>

        {/* Current Semester Grade Card Details */}
        {currentSemTranscript ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60">
              <div>
                <span className="text-[11px] text-muted-foreground block font-medium">Exam Session</span>
                <span className="text-sm font-bold text-foreground">{currentSemTranscript.examSession}</span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block font-medium">Semester SPI</span>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{currentSemTranscript.spi}</span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block font-medium">Cumulative CPI</span>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">{currentSemTranscript.cpi}</span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block font-medium">Result Status</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {currentSemTranscript.resultStatus}
                </span>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-3.5">Code</th>
                    <th className="py-3 px-3.5">Subject Name</th>
                    <th className="py-3 px-3">Theory (ESE)</th>
                    <th className="py-3 px-3">Theory (Mid)</th>
                    <th className="py-3 px-3">Practical (ESE)</th>
                    <th className="py-3 px-3">Practical (PA)</th>
                    <th className="py-3 px-3 text-center">Grade</th>
                    <th className="py-3 px-3 text-center">Points</th>
                    <th className="py-3 px-3 text-center">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {currentSemTranscript.subjects?.map((sub: any, idx: number) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3.5 font-mono font-bold text-foreground">{sub.code}</td>
                      <td className="py-3 px-3.5 font-medium text-foreground max-w-xs">{sub.name}</td>
                      <td className="py-3 px-3 font-mono">{sub.theoryE}</td>
                      <td className="py-3 px-3 font-mono">{sub.theoryM}</td>
                      <td className="py-3 px-3 font-mono">{sub.practicalE}</td>
                      <td className="py-3 px-3 font-mono">{sub.practicalM}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs">
                          {sub.grade}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-foreground">{sub.gradePoints}</td>
                      <td className="py-3 px-3 text-center font-bold text-muted-foreground">{sub.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground text-xs">
            No result data found for this semester. Click &quot;Sync Latest GTU Results&quot; to fetch from server.
          </div>
        )}
      </div>

      {/* SECTION 2: EDIT STUDENT PROFILE & GTU ENROLLMENT CONFIG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card text-card-foreground rounded-3xl border border-border/80 shadow-lg p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-foreground">Edit Academic Profile</h2>
              <p className="text-xs text-muted-foreground">
                Update your GTU enrollment, department, and academic branch settings.
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
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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

        {/* 1-Click Demo Accounts Switcher */}
        <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-foreground">1-Click Demo Students</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Switch between pre-configured GTU student profiles across different semesters and branches:
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
  );
}
