"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Bell,
  Award,
  Search,
  RefreshCw,
  PlusCircle,
  Smartphone,
  Mail,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { formatDate, formatTimeAgo } from "@/lib/utils";
import { GTU_COURSES } from "@/lib/gtu-data";
import { ResultSubscriptionModal } from "./ResultSubscriptionModal";
import { ResultGradeCardModal } from "./ResultGradeCardModal";

export function ResultsHub() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"declared" | "subscriptions" | "checker">("declared");

  // Declared Results state
  const [results, setResults] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedSemester, setSelectedSemester] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingResults, setLoadingResults] = useState(true);

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // Direct Checker state
  const [checkerEnrollment, setCheckerEnrollment] = useState((session?.user as any)?.enrollmentNo || "210120111001");
  const [checkerSession, setCheckerSession] = useState("Summer 2024");
  const [checkerSem, setCheckerSem] = useState("5");
  const [gradeCardData, setGradeCardData] = useState<any | null>(null);
  const [checkingResult, setCheckingResult] = useState(false);

  // Watcher sync state
  const [syncingWatcher, setSyncingWatcher] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");

  // Modals
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [activeGradeCardModal, setActiveGradeCardModal] = useState<any | null>(null);

  const fetchDeclaredResults = async () => {
    try {
      setLoadingResults(true);
      const params = new URLSearchParams({ action: "declared" });
      if (selectedCourse !== "ALL") params.append("course", selectedCourse);
      if (selectedSemester !== "ALL") params.append("semester", selectedSemester);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      const res = await fetch(`/api/results?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingResults(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      setLoadingSubs(true);
      const res = await fetch("/api/results?action=subscriptions");
      if (res.ok) {
        const data = await res.json();
        setSubscriptions(data.subscriptions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSubs(false);
    }
  };

  useEffect(() => {
    if (activeTab === "declared") {
      fetchDeclaredResults();
    } else if (activeTab === "subscriptions") {
      fetchSubscriptions();
    }
  }, [activeTab, selectedCourse, selectedSemester]);

  const handleSyncWatcher = async () => {
    try {
      setSyncingWatcher(true);
      setSyncStatusMsg("");
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "checkWatcher" }),
      });
      if (res.ok) {
        const data = await res.json();
        setSyncStatusMsg(`Watcher checked GTU portal! (${data.newResultsCount || 0} new results synced)`);
        fetchDeclaredResults();
        setTimeout(() => setSyncStatusMsg(""), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncingWatcher(false);
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this result alert subscription?")) return;
    try {
      const res = await fetch(`/api/results?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscriptions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckGradeCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCheckingResult(true);
      const params = new URLSearchParams({
        action: "checkResult",
        enrollmentNo: checkerEnrollment.trim(),
        examSession: checkerSession,
        semester: checkerSem,
      });
      const res = await fetch(`/api/results?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setGradeCardData(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingResult(false);
    }
  };

  const handleSendTestPush = async () => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendTest",
          testNotification: {
            title: "🎉 GTU Result Alert (Simulation)",
            message: "BE Semester 5 Regular (Winter 2024) result has just been announced on GTU portal!",
            type: "RESULT",
            link: "/results",
          },
        }),
      });

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("GTU Result Alert", {
          body: "BE Sem 5 result published on result.gtu.ac.in! Check your score.",
          icon: "/favicon.ico",
        });
      }

      alert("Simulated push and in-app notification delivered to notification bell!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Automated GTU Result Scraper & Watcher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Targeted Result Notifications
          </h1>
          <p className="text-xs text-emerald-100/80 max-w-xl">
            Never miss a result declaration. Subscribe to your enrollment number, branch, or semester, and receive instant browser push alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSyncWatcher}
            disabled={syncingWatcher}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingWatcher ? "animate-spin" : ""}`} />
            <span>{syncingWatcher ? "Scraping GTU..." : "Check Portal Now"}</span>
          </button>

          <button
            onClick={() => setIsSubscribeModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Set New Result Alert</span>
          </button>
        </div>
      </div>

      {syncStatusMsg && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("declared")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "declared"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Live Declared Results ({results.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "subscriptions"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>My Alert Subscriptions</span>
        </button>

        <button
          onClick={() => setActiveTab("checker")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "checker"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Direct Grade Card Checker</span>
        </button>
      </div>

      {/* Tab 1: Live Declared Results */}
      {activeTab === "declared" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="p-4 rounded-2xl border border-border bg-card shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
              >
                <option value="ALL">All Degrees</option>
                {GTU_COURSES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
              >
                <option value="ALL">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s.toString()}>
                    Sem {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search result title (e.g. Remedial)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
              />
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Results List */}
          {loadingResults ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 rounded-2xl bg-card border border-border animate-pulse" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-3xl border border-dashed border-border bg-card/40">
              <Award className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
              <h3 className="font-bold text-sm text-foreground">No Declared Results Found</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Try clearing search filters or click &quot;Check Portal Now&quot; to fetch latest updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((r) => (
                <div
                  key={r.id}
                  className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold text-[11px]">
                        Declared on {formatDate(r.declaredDate)}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono text-[10px]">
                        {r.session}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-foreground">
                      {r.examTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {r.course} Semester {r.semester} {r.branch ? `• ${r.branch}` : ""}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                    <a
                      href={r.resultUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => {
                        setCheckerSem(r.semester.toString());
                        setCheckerSession(r.session);
                        setActiveTab("checker");
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-xs"
                    >
                      Check Grade Card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Alert Subscriptions */}
      {activeTab === "subscriptions" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-muted/20">
            <div>
              <h3 className="font-bold text-sm text-foreground">
                Active Result Watchers
              </h3>
              <p className="text-xs text-muted-foreground">
                The serverless background watcher checks GTU every 15 minutes and fires Push + Email alerts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSendTestPush}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl border border-border bg-card hover:bg-muted text-foreground flex items-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Test Push Alert</span>
              </button>

              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Subscription</span>
              </button>
            </div>
          </div>

          {loadingSubs ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 rounded-2xl bg-card border border-border animate-pulse" />
              ))}
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-3xl border border-dashed border-border bg-card/40">
              <Bell className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
              <h3 className="font-bold text-sm text-foreground">No Active Subscriptions</h3>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-sm mx-auto">
                Set up a result watcher for your semester so you don&apos;t have to manually refresh the GTU website!
              </p>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl"
              >
                Configure First Alert
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          Active Watcher
                        </span>
                      </div>
                      <span className="text-xs font-mono font-medium text-muted-foreground">
                        {sub.examSession}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-foreground">
                      {sub.course} Semester {sub.semester} ({sub.examType})
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {sub.branch}
                    </p>

                    {sub.enrollmentNo && (
                      <p className="text-xs font-mono text-primary mt-1">
                        Tracking Enrollment: {sub.enrollmentNo}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className={`flex items-center gap-1 ${sub.pushAlerts ? "text-emerald-600 font-semibold" : "opacity-40"}`}>
                        <Smartphone className="w-3.5 h-3.5" />
                        Push Alert {sub.pushAlerts ? "ON" : "OFF"}
                      </span>
                      <span className={`flex items-center gap-1 ${sub.emailAlerts ? "text-blue-600 font-semibold" : "opacity-40"}`}>
                        <Mail className="w-3.5 h-3.5" />
                        Email {sub.emailAlerts ? "ON" : "OFF"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground">
                      Created {formatDate(sub.createdAt)}
                    </span>
                    <button
                      onClick={() => handleDeleteSubscription(sub.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Cancel Subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Direct Result Checker / Grade Card Simulator */}
      {activeTab === "checker" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
            <h3 className="font-bold text-base text-foreground mb-1">
              Direct GTU Result Checker
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Enter student enrollment details to query and render high-resolution GTU Grade Statement.
            </p>

            <form onSubmit={handleCheckGradeCard} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  required
                  value={checkerEnrollment}
                  onChange={(e) => setCheckerEnrollment(e.target.value)}
                  placeholder="210120111001"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Exam Session
                </label>
                <select
                  value={checkerSession}
                  onChange={(e) => setCheckerSession(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
                >
                  <option value="Summer 2024">Summer 2024</option>
                  <option value="Winter 2023">Winter 2023</option>
                  <option value="Summer 2023">Summer 2023</option>
                  <option value="Winter 2022">Winter 2022</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Semester
                </label>
                <select
                  value={checkerSem}
                  onChange={(e) => setCheckerSem(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s.toString()}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={checkingResult}
                  className="w-full py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-xl hover:bg-primary/90 shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  {checkingResult ? "Fetching..." : "Fetch Grade Card"}
                </button>
              </div>
            </form>
          </div>

          {/* Render Grade Card if fetched */}
          {gradeCardData && (
            <div className="p-6 rounded-3xl border border-border bg-card shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-foreground">
                    Grade Card Loaded: {gradeCardData.studentName}
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono">
                    Enrollment: {gradeCardData.enrollmentNo} • SPI: {gradeCardData.spi} • CPI: {gradeCardData.cpi}
                  </p>
                </div>
                <button
                  onClick={() => setActiveGradeCardModal(gradeCardData)}
                  className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:bg-primary/90"
                >
                  Open Full Marksheet Modal
                </button>
              </div>

              {/* Mini Table Summary */}
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted text-muted-foreground font-semibold border-b border-border">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5 text-center">Theory (E/M)</th>
                      <th className="p-2.5 text-center">Grade</th>
                      <th className="p-2.5 text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {gradeCardData.subjects.map((s: any) => (
                      <tr key={s.code} className="hover:bg-muted/30">
                        <td className="p-2.5 font-mono font-bold text-primary">{s.code}</td>
                        <td className="p-2.5 font-medium">{s.name}</td>
                        <td className="p-2.5 text-center font-mono text-[11px]">{s.theoryE} + {s.theoryM}</td>
                        <td className="p-2.5 text-center font-bold text-emerald-600">{s.grade}</td>
                        <td className="p-2.5 text-center font-bold">{s.gradePoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subscription Modal */}
      {isSubscribeModalOpen && (
        <ResultSubscriptionModal
          isOpen={isSubscribeModalOpen}
          onClose={() => setIsSubscribeModalOpen(false)}
          onSubscribed={() => {
            fetchSubscriptions();
            setActiveTab("subscriptions");
          }}
        />
      )}

      {/* Grade Card Modal */}
      {activeGradeCardModal && (
        <ResultGradeCardModal
          result={activeGradeCardModal}
          isOpen={!!activeGradeCardModal}
          onClose={() => setActiveGradeCardModal(null)}
        />
      )}
    </div>
  );
}
