"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { X, Bell, Newspaper, CheckCircle2, AlertCircle, Sparkles, Send } from "lucide-react";

interface CircularSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed?: () => void;
}

const CATEGORIES = [
  { id: "All", label: "All GTU Circulars", desc: "Receive alerts for every official circular published by GTU" },
  { id: "Examinations", label: "Examinations & Forms", desc: "Exam schedules, hall tickets, penalty, and reassessment notices" },
  { id: "Timetables", label: "Exam Timetables", desc: "Theory & Practical GTU Exam timetables release alerts" },
  { id: "Scholarships", label: "Scholarships & MYSY", desc: "MYSY, Digital Gujarat, and Freeship card scholarship circulars" },
  { id: "Academic", label: "Academic & Syllabus", desc: "Academic calendars, syllabus updates, and elective choices" },
  { id: "PMMS & Research", label: "PMMS & Project Portal", desc: "100 Activity points, DE Canvas, and PSAR patent submission alerts" },
];

export function CircularSubscriptionModal({
  isOpen,
  onClose,
  onSubscribed,
}: CircularSubscriptionModalProps) {
  const { data: session } = useSession();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Examinations", "Timetables", "Scholarships"]);
  const [keywords, setKeywords] = useState("");
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchCurrentPreferences();
    }
  }, [isOpen]);

  const fetchCurrentPreferences = async () => {
    try {
      const res = await fetch("/api/user/subscriptions");
      if (res.ok) {
        const data = await res.json();
        if (data.preferences?.selectedCategories) {
          setSelectedCategories(data.preferences.selectedCategories);
        }
      }
    } catch (e) {}
  };

  if (!isOpen) return null;

  const toggleCategory = (catId: string) => {
    if (catId === "All") {
      setSelectedCategories(["All"]);
      return;
    }

    let updated = selectedCategories.filter((c) => c !== "All");
    if (updated.includes(catId)) {
      updated = updated.filter((c) => c !== catId);
    } else {
      updated.push(catId);
    }

    if (updated.length === 0) {
      updated = ["All"];
    }
    setSelectedCategories(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // Save circular subscriptions for chosen categories
      for (const cat of selectedCategories) {
        await fetch("/api/user/subscriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "subscribeCircular",
            category: cat,
            keywords: keywords.trim() || undefined,
            inAppAlerts,
            emailAlerts: true,
          }),
        });
      }

      // Update general user preferences
      await fetch("/api/user/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updatePreferences",
          preferences: {
            circularAlerts: true,
            selectedCategories,
            inAppAlerts,
          },
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        if (onSubscribed) onSubscribed();
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to update circular alert choices");
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestNotification = async () => {
    try {
      setTestLoading(true);
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "testAlert", type: "CIRCULAR" }),
      });
      if (res.ok) {
        setTestSent(true);
        setTimeout(() => setTestSent(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card text-foreground rounded-3xl border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                GTU Circular Alerts Preferences
              </h3>
              <p className="text-xs text-muted-foreground">
                Choose the categories of circulars you want to be notified about
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Your circular alert preferences have been saved successfully!</span>
            </div>
          )}

          {testSent && (
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Test notification dispatched! Check the bell icon in your top navbar.</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-xs font-bold text-foreground">
              Select Categories to Receive Alerts:
            </label>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500/40 text-foreground shadow-xs"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
                        {cat.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? "bg-amber-600 border-amber-600 text-white" : "border-border bg-background"
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Optional Filter Keywords (comma-separated):
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. BE, Computer, Exam Form, Remedial"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
            <p className="text-[10px] text-muted-foreground">
              Only receive notifications for circulars matching these words (leave empty for all).
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-foreground">In-App Notification Feed</span>
            </div>
            <input
              type="checkbox"
              checked={inAppAlerts}
              onChange={(e) => setInAppAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleSendTestNotification}
              disabled={testLoading}
              className="px-3.5 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-blue-500" />
              <span>{testLoading ? "Sending..." : "Test Alert"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-muted-foreground transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold hover:brightness-105 shadow-md shadow-amber-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save My Choices"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
