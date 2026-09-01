"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  Shield,
  CheckCircle2,
  Save,
  LogOut,
  Sparkles,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Building,
  BellRing,
  Trash2,
  Send,
  Newspaper,
  Bell,
  Sliders,
} from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES } from "@/lib/gtu-data";
import { decodeGTUEnrollment } from "@/lib/gtu-decoder";
import { showNativeDeviceNotification } from "@/lib/native-notifications";

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
  const [resultSubscriptions, setResultSubscriptions] = useState<any[]>([]);
  const [circularSubscriptions, setCircularSubscriptions] = useState<any[]>([]);
  const [savedPapersCount, setSavedPapersCount] = useState(0);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Alert preferences
  const [preferences, setPreferences] = useState({
    resultAlerts: true,
    circularAlerts: true,
    inAppAlerts: true,
    emailAlerts: true,
    selectedCategories: ["Examinations", "Timetables", "Academic", "Scholarships"],
  });

  const [saving, setSaving] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [testSent, setTestSent] = useState(false);
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

      // Fetch active subscriptions and alert preferences
      const subRes = await fetch("/api/user/subscriptions");
      if (subRes.ok) {
        const subData = await subRes.json();
        setResultSubscriptions(subData.resultSubscriptions || []);
        setCircularSubscriptions(subData.circularSubscriptions || []);
        if (subData.preferences) {
          setPreferences((prev) => ({ ...prev, ...subData.preferences }));
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
    const digits = val.replace(/D/g, "");
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

  const handleUpdatePreferences = async (newPrefs: any) => {
    setPreferences(newPrefs);
    try {
      await fetch("/api/user/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updatePreferences",
          preferences: newPrefs,
        }),
      });
      setSuccessMsg("Alert choices updated!");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSubscription = async (id: string, type: "result" | "circular") => {
    try {
      const res = await fetch(`/api/user/subscriptions?id=${id}&type=${type}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (type === "result") {
          setResultSubscriptions((prev) => prev.filter((s) => s.id !== id));
        } else {
          setCircularSubscriptions((prev) => prev.filter((s) => s.id !== id));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendTestNotification = async (type: "RESULT" | "CIRCULAR") => {
    try {
      setTestLoading(true);
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "testAlert", type }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.notification) {
          showNativeDeviceNotification(
            data.notification.title,
            data.notification.message,
            type,
            data.notification.link || (type === "RESULT" ? "/results" : "/circulars")
          );
        }
        setTestSent(true);
        setTimeout(() => setTestSent(false), 3500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTestLoading(false);
    }
  };

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"] || [];
  const totalAlerts = resultSubscriptions.length + circularSubscriptions.length;

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
            <span className="text-2xl font-black text-white">{totalAlerts}</span>
          </div>
          <div className="text-center px-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 block">Saved Papers</span>
            <span className="text-2xl font-black text-emerald-400">{savedPapersCount}</span>
          </div>
        </div>
      </div>

      {testSent && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
            <span><strong>Test in-app notification sent!</strong> Check the notification bell in the top navbar.</span>
          </div>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Profile Form & Notification Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Form */}
          <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-extrabold text-base text-foreground">Academic Information</h3>
                <p className="text-xs text-muted-foreground">Stored securely in your student database record</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-muted/60 border border-border text-xs sm:text-sm text-muted-foreground cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">GTU 12-Digit Enrollment Number</label>
                <input
                  type="text"
                  value={enrollmentNo}
                  onChange={(e) => handleEnrollmentChange(e.target.value)}
                  placeholder="e.g. 210120111001"
                  maxLength={12}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Course</label>
                  <select
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                      const avail = GTU_BRANCHES[e.target.value] || [];
                      if (avail.length > 0) setBranch(avail[0]);
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Institute / College</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. 028 - L.D. College of Engineering"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="py-2.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving Changes..." : "Save Academic Profile"}</span>
              </button>
            </form>
          </div>

          {/* Alert Choices & Notification Preferences Card */}
          <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <BellRing className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="font-extrabold text-base text-foreground">Alert &amp; Notification Choices</h3>
                  <p className="text-xs text-muted-foreground">Select which notifications you receive inside the app</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSendTestNotification("RESULT")}
                  disabled={testLoading}
                  className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-[11px] font-bold text-foreground border border-border transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3 h-3 text-blue-500" />
                  <span>Test Result Alert</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSendTestNotification("CIRCULAR")}
                  disabled={testLoading}
                  className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-[11px] font-bold text-foreground border border-border transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3 h-3 text-amber-500" />
                  <span>Test Circular Alert</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">🎓 Live Result Alerts</span>
                  <input
                    type="checkbox"
                    checked={preferences.resultAlerts}
                    onChange={(e) => handleUpdatePreferences({ ...preferences, resultAlerts: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Instant in-app alerts whenever GTU declares results for {course} Sem {semester} ({branch}).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">📢 Official Circular Alerts</span>
                  <input
                    type="checkbox"
                    checked={preferences.circularAlerts}
                    onChange={(e) => handleUpdatePreferences({ ...preferences, circularAlerts: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Notifications when new Exam timetables, MYSY scholarships, or academic notices are published.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Active Subscriptions & Account Switcher */}
        <div className="space-y-6">
          {/* Active Result Subscriptions Card */}
          <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-foreground">Target Result Subscriptions</h3>
              </div>
              <span className="text-xs font-bold text-muted-foreground">{resultSubscriptions.length}</span>
            </div>

            {resultSubscriptions.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No active result subscriptions yet. They are created automatically for your branch.
              </p>
            ) : (
              <div className="space-y-2.5">
                {resultSubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-2xl bg-muted/50 border border-border/60 text-xs space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>{sub.course} Sem {sub.semester}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {sub.examSession}
                        </span>
                        <button
                          onClick={() => handleDeleteSubscription(sub.id, "result")}
                          className="p-1 rounded-lg text-muted-foreground hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remove subscription"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{sub.branch}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Circular Subscriptions Card */}
          <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-foreground">Circular Subscriptions</h3>
              </div>
              <span className="text-xs font-bold text-muted-foreground">{circularSubscriptions.length}</span>
            </div>

            {circularSubscriptions.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No circular filters added. All official notices are monitored.
              </p>
            ) : (
              <div className="space-y-2">
                {circularSubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-semibold text-foreground">{sub.category}</span>
                      {sub.keywords && (
                        <p className="text-[10px] text-muted-foreground">Filter: {sub.keywords}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteSubscription(sub.id, "circular")}
                      className="p-1 rounded-lg text-muted-foreground hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remove subscription"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="bg-card text-card-foreground rounded-3xl border border-border/80 shadow-md p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-foreground">Account Status</h3>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-muted-foreground">Account Type</span>
                <span className="font-bold text-primary">GTU Student</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/60">
                <span className="text-muted-foreground">Status</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active &amp; Verified
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60">
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
