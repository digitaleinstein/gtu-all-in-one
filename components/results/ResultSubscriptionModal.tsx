"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { X, Bell, Mail, Smartphone, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES, GTU_EXAM_SESSIONS } from "@/lib/gtu-data";
import { showNativeDeviceNotification } from "@/lib/native-notifications";

interface ResultSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export function ResultSubscriptionModal({
  isOpen,
  onClose,
  onSubscribed,
}: ResultSubscriptionModalProps) {
  const { data: session } = useSession();

  const [course, setCourse] = useState((session?.user as any)?.course || "BE");
  const [branch, setBranch] = useState((session?.user as any)?.branch || "Computer Engineering");
  const [semester, setSemester] = useState((session?.user as any)?.semester?.toString() || "5");
  const [examSession, setExamSession] = useState("Summer 2026");
  const [examType, setExamType] = useState("Regular");
  const [enrollmentNo, setEnrollmentNo] = useState((session?.user as any)?.enrollmentNo || "");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"];

  const handlePushPermission = async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setPushAlerts(false);
        alert("Push notifications were disabled or denied in your browser settings.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "subscribe",
          course,
          branch,
          semester: parseInt(semester, 10),
          examSession,
          examType,
          enrollmentNo: enrollmentNo.trim() || undefined,
          emailAlerts,
          pushAlerts,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to configure subscription");
      }

      setSuccess(true);
      setTimeout(() => {
        onSubscribed();
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create result alert subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card text-foreground rounded-3xl border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                Configure Target Result Alert
              </h3>
              <p className="text-xs text-muted-foreground">
                Get notified instantaneously the minute GTU publishes your result
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border bg-muted/40 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Subscription active! Background watcher will track this result.</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
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
                    {c.code} - {c.name.split(" ")[0]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Branch / Department
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Exam Session
              </label>
              <select
                value={examSession}
                onChange={(e) => setExamSession(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
              >
                <option value="Summer 2026">Summer 2026 (Live Declaration / Upcoming)</option>
                <option value="Winter 2026">Winter 2026 (Upcoming Nov-Dec 2026)</option>
                <option value="Summer 2027">Summer 2027 (Upcoming May-Jun 2027)</option>
                <option value="Winter 2025">Winter 2025 (Recent Results)</option>
                <option value="Summer 2025">Summer 2025 (Recent Results)</option>
                <option value="Winter 2024">Winter 2024</option>
                <option value="Summer 2024">Summer 2024</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Exam Type
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
              >
                <option value="Regular">Regular Student</option>
                <option value="Remedial">Remedial Exam</option>
                <option value="All">Both Regular & Remedial</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Enrollment Number (Optional for Personalized Grade Fetch)
            </label>
            <input
              type="text"
              placeholder="e.g. 210120111001"
              value={enrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-mono"
            />
          </div>

          {/* Delivery Channels */}
          <div className="pt-2 border-t border-border/60 space-y-2">
            <span className="block text-xs font-bold text-foreground">
              Delivery Notification Channels
            </span>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => {
                    setPushAlerts(e.target.checked);
                    if (e.target.checked) handlePushPermission();
                  }}
                  className="rounded text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <span>Browser Push</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>Email Alerts</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await fetch("/api/notifications", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "testAlert", type: "RESULT" }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    if (data.notification) {
                      showNativeDeviceNotification(
                        data.notification.title,
                        data.notification.message,
                        "RESULT",
                        data.notification.link || "/results"
                      );
                    }
                  }
                } catch (e) {}
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-muted text-foreground flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Test Alert</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || success}
                className="px-5 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {loading ? "Activating..." : "Save Alert Subscription"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
