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
  Bookmark,
  Award,
  Layers,
  Key,
} from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES } from "@/lib/gtu-data";

export function ProfileSettings() {
  const { data: session, update } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [course, setCourse] = useState("BE");
  const [branch, setBranch] = useState("Computer Engineering");
  const [semester, setSemester] = useState("5");
  const [college, setCollege] = useState("L.D. College of Engineering, Ahmedabad");

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setEnrollmentNo((session.user as any).enrollmentNo || "");
      setCourse((session.user as any).course || "BE");
      setBranch((session.user as any).branch || "Computer Engineering");
      setSemester(((session.user as any).semester || 5).toString());
      setCollege((session.user as any).college || "L.D. College of Engineering, Ahmedabad");
    }
  }, [session]);

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"] || [];

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
        setSuccessMsg("Profile updated successfully!");
        if (update) update();
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handlePushPermission = async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        new Notification("GTU All In One", {
          body: "Push alerts configured successfully!",
        });
        alert("Push notifications enabled!");
      } else {
        alert("Push notification access was denied.");
      }
    }
  };

  const handleQuickSwitch = async (emailToLogin: string) => {
    await signIn("credentials", {
      identifier: emailToLogin,
      password: "gtu12345",
      callbackUrl: "/profile",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 text-xs font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>GTU Student Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Profile & Alert Preferences
          </h1>
          <p className="text-xs text-slate-200/80 max-w-xl">
            Manage your academic enrollment profile, target semester preferences, and delivery channels for result watchers.
          </p>
        </div>

        {session?.user && (
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-rose-500/20 text-rose-200 border border-rose-500/30 hover:bg-rose-500/30 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        )}
      </div>

      {successMsg && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-base text-foreground">
              Academic Student Profile
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              These details are used to customize your question papers, syllabus, and result notifications.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-muted/60 border border-border text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  required
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  placeholder="210120111001"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Course / Degree
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
                >
                  {GTU_COURSES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Current Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s.toString()}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Branch / Discipline
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
              >
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                College / Institute Name
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="028 - L.D. College of Engineering, Ahmedabad"
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Update Profile"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Sidebar: Notification Settings & Demo Switcher */}
        <div className="space-y-6">
          {/* Notification Channels */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="font-bold text-base text-foreground">
              Notification Channels
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Web Push Alerts</p>
                    <p className="text-[10px] text-muted-foreground">Receive browser banners</p>
                  </div>
                </div>
                <button
                  onClick={handlePushPermission}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 rounded-lg hover:bg-emerald-500/20"
                >
                  Enable Push
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Email Notifications</p>
                    <p className="text-[10px] text-muted-foreground">Sent on result publication</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailEnabled}
                  onChange={(e) => setEmailEnabled(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Demo Account Quick Switcher */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-foreground">
                Demo Accounts Quick Switcher
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Instantly test different branches & semesters without typing credentials:
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleQuickSwitch("student@gtu.ac.in")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <p className="text-xs font-bold text-foreground">Aarav Mehta (Sem 5 CE)</p>
                <p className="text-[10px] text-muted-foreground font-mono">student@gtu.ac.in • 210120111001</p>
              </button>

              <button
                onClick={() => handleQuickSwitch("priya.patel@gtu.ac.in")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <p className="text-xs font-bold text-foreground">Priya Patel (Sem 3 IT)</p>
                <p className="text-[10px] text-muted-foreground font-mono">priya.patel@gtu.ac.in • 220280116015</p>
              </button>

              <button
                onClick={() => handleQuickSwitch("rahul.shah@gtu.ac.in")}
                className="w-full text-left p-2.5 rounded-xl border border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <p className="text-xs font-bold text-foreground">Rahul Shah (Sem 7 ME)</p>
                <p className="text-[10px] text-muted-foreground font-mono">rahul.shah@gtu.ac.in • 200170119042</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
