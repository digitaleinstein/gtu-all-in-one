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
  ShieldAlert,
  Server,
  Download,
} from "lucide-react";
import { formatDate, formatTimeAgo } from "@/lib/utils";
import { GTU_COURSES } from "@/lib/gtu-data";
import { ResultSubscriptionModal } from "./ResultSubscriptionModal";
import { ResultGradeCardModal } from "./ResultGradeCardModal";

export function ResultsHub() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"declared" | "live_gtu_gateway" | "subscriptions">("declared");

  // Declared Results state
  const [results, setResults] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedSemester, setSelectedSemester] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingResults, setLoadingResults] = useState(true);
  const [isLiveFromGTU, setIsLiveFromGTU] = useState(true);

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // Live GTU Gateway state
  const [liveSessionData, setLiveSessionData] = useState<any | null>(null);
  const [loadingLiveSession, setLoadingLiveSession] = useState(false);
  const [selectedLiveBatch, setSelectedLiveBatch] = useState("");
  const [liveEnrollment, setLiveEnrollment] = useState((session?.user as any)?.enrollmentNo || "210120111001");
  const [liveCaptchaCode, setLiveCaptchaCode] = useState("");
  const [fetchingLiveResult, setFetchingLiveResult] = useState(false);
  const [liveResultData, setLiveResultData] = useState<any | null>(null);
  const [liveError, setLiveError] = useState("");

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
        setIsLiveFromGTU(data.liveFromGTU ?? true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingResults(false);
    }
  };

  const fetchLiveGTUSession = async () => {
    try {
      setLoadingLiveSession(true);
      setLiveError("");
      const res = await fetch("/api/gtu/live-session");
      const data = await res.json();
      if (res.ok) {
        setLiveSessionData(data);
        if (data.batches && data.batches.length > 0) {
          setSelectedLiveBatch(data.batches[0].value);
        }
      } else {
        setLiveError(data.error || "Failed to connect to GTU live server.");
      }
    } catch (e: any) {
      setLiveError("Could not establish live connection with gturesults.in");
    } finally {
      setLoadingLiveSession(false);
    }
  };

  const handleFetchLiveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveSessionData || !liveCaptchaCode) return;

    try {
      setFetchingLiveResult(true);
      setLiveError("");
      setLiveResultData(null);

      const res = await fetch("/api/gtu/live-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cookies: liveSessionData.cookies,
          viewState: liveSessionData.viewState,
          eventValidation: liveSessionData.eventValidation,
          viewStateGenerator: liveSessionData.viewStateGenerator,
          batch: selectedLiveBatch,
          enrollmentNo: liveEnrollment,
          captchaCode: liveCaptchaCode,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLiveResultData(data.data);
      } else {
        setLiveError(data.error || "Failed to fetch live result. Please verify captcha code.");
        // Refresh captcha on error
        fetchLiveGTUSession();
      }
    } catch (err: any) {
      setLiveError("Network error while communicating with GTU server.");
    } finally {
      setFetchingLiveResult(false);
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
    } else if (activeTab === "live_gtu_gateway") {
      fetchLiveGTUSession();
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
        setSyncStatusMsg(`Live sync complete! ${data.newResultsCount || 0} new declared exams synced from GTU server.`);
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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>Live GTU Results Integration (gturesults.in)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            GTU Results & Alert Watcher
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
            Real-time feed of newly declared examination results, live GTU server gateway with captcha verification, and instant push alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsSubscribeModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Result Alert</span>
          </button>
          <button
            onClick={handleSyncWatcher}
            disabled={syncingWatcher}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingWatcher ? "animate-spin" : ""}`} />
            <span>{syncingWatcher ? "Syncing..." : "Sync Live GTU"}</span>
          </button>
        </div>
      </div>

      {syncStatusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("declared")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "declared"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-muted hover:bg-accent text-muted-foreground"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Live Declared Results ({results.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("live_gtu_gateway")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "live_gtu_gateway"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-muted hover:bg-accent text-muted-foreground"
          }`}
        >
          <Server className="w-4 h-4 text-blue-300" />
          <span>⚡ Live GTU.ac.in Server Gateway</span>
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === "subscriptions"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
              : "bg-muted hover:bg-accent text-muted-foreground"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>My Result Alerts ({subscriptions.length})</span>
        </button>
      </div>

      {/* TAB 1: LIVE DECLARED RESULTS FEED */}
      {activeTab === "declared" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-3xl bg-card border border-border/80 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search live declared exam (e.g. BE SEM 5, Remedial)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-background border border-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-background border border-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Degree Programs</option>
                {GTU_COURSES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-background border border-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Semesters (1 to 8)</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {loadingResults ? (
            <div className="p-12 text-center text-muted-foreground text-xs">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-500 mb-2" />
              <span>Fetching live declared examination list from gturesults.in...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="p-12 text-center bg-card rounded-3xl border border-border text-muted-foreground text-xs">
              No declared exam results found matching your filter criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {r.course} • Sem {r.semester}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {formatDate(r.declaredDate)}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-foreground group-hover:text-emerald-600 transition-colors">
                      {r.examTitle}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Session: <strong className="text-foreground">{r.session}</strong>
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab("live_gtu_gateway");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600 text-emerald-600 hover:text-white dark:text-emerald-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Check on GTU Server</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE GTU OFFICIAL SERVER GATEWAY WITH REAL CAPTCHA */}
      {activeTab === "live_gtu_gateway" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6 max-w-2xl mx-auto">
            <div className="border-b border-border/60 pb-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                  Direct GTU Result Server Query (gturesults.in)
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Direct live proxy to Gujarat Technological University ASP.NET examination server with real-time CAPTCHA verification.
              </p>
            </div>

            {liveError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{liveError}</span>
              </div>
            )}

            <form onSubmit={handleFetchLiveResult} className="space-y-4">
              {/* Exam Batch Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Select Declared Examination Batch (Live from GTU) *
                </label>
                {loadingLiveSession ? (
                  <div className="p-2.5 rounded-2xl bg-muted text-xs text-muted-foreground flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting to gturesults.in live portal...</span>
                  </div>
                ) : (
                  <select
                    value={selectedLiveBatch}
                    onChange={(e) => setSelectedLiveBatch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {liveSessionData?.batches?.map((b: any) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Enrollment Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  GTU 12-Digit Enrollment Number *
                </label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  value={liveEnrollment}
                  onChange={(e) => setLiveEnrollment(e.target.value)}
                  placeholder="e.g. 210120111001"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Live CAPTCHA Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">
                    GTU Visual Security CAPTCHA *
                  </label>
                  <button
                    type="button"
                    onClick={fetchLiveGTUSession}
                    className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Refresh Captcha
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {liveSessionData?.captchaImage ? (
                    <div className="p-1 rounded-xl bg-white border border-border inline-block shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={liveSessionData.captchaImage}
                        alt="GTU Security Captcha"
                        className="h-10 w-28 object-contain rounded"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-28 bg-muted rounded-xl flex items-center justify-center text-[10px] text-muted-foreground">
                      Loading...
                    </div>
                  )}

                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={liveCaptchaCode}
                    onChange={(e) => setLiveCaptchaCode(e.target.value)}
                    placeholder="Enter Captcha"
                    className="flex-1 px-3.5 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={fetchingLiveResult || loadingLiveSession}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {fetchingLiveResult ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Querying Live GTU Server...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Fetch Live Result from GTU.ac.in</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Marksheet Result Card */}
          {liveResultData && (
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6 max-w-3xl mx-auto animate-in fade-in">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" /> Live From GTU Official Server
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mt-1">
                    {liveResultData.studentName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Enrollment: <span className="font-mono font-bold text-foreground">{liveResultData.enrollmentNo}</span> • {liveResultData.institute}
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-muted hover:bg-accent text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Copy</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-muted/40 text-center">
                <div>
                  <span className="text-[11px] text-muted-foreground block font-medium">SPI</span>
                  <span className="text-2xl font-black text-blue-600">{liveResultData.spi}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground block font-medium">CPI</span>
                  <span className="text-2xl font-black text-indigo-600">{liveResultData.cpi}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground block font-medium">Result</span>
                  <span className="text-2xl font-black text-emerald-600">{liveResultData.resultStatus}</span>
                </div>
              </div>

              {liveResultData.subjects && liveResultData.subjects.length > 0 && (
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted text-muted-foreground text-[10px] uppercase font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Subject Code</th>
                        <th className="py-2.5 px-3">Subject Name</th>
                        <th className="py-2.5 px-3">Theory</th>
                        <th className="py-2.5 px-3">Practical</th>
                        <th className="py-2.5 px-3 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {liveResultData.subjects.map((sub: any, idx: number) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-3 font-mono font-bold">{sub.code}</td>
                          <td className="py-2.5 px-3 font-medium">{sub.name}</td>
                          <td className="py-2.5 px-3 font-mono">{sub.theoryE}</td>
                          <td className="py-2.5 px-3 font-mono">{sub.theoryM}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-blue-600">{sub.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RESULT ALERTS SUBSCRIPTION */}
      {activeTab === "subscriptions" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-foreground">Your Active Result Watchers</h2>
              <p className="text-xs text-muted-foreground">
                Get notified instantly via Web Push and Email when GTU releases results for your enrolled course.
              </p>
            </div>
            <button
              onClick={() => setIsSubscribeModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Watcher</span>
            </button>
          </div>

          {loadingSubs ? (
            <div className="p-8 text-center text-muted-foreground text-xs">Loading subscriptions...</div>
          ) : subscriptions.length === 0 ? (
            <div className="p-12 text-center bg-card rounded-3xl border border-border text-muted-foreground text-xs">
              You do not have any active result alerts. Click &quot;Add Watcher&quot; to subscribe to your semester result.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="p-5 rounded-3xl bg-card border border-border flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-foreground block">
                      {sub.course} {sub.branch} (Sem {sub.semester})
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Session: {sub.examSession} • {sub.examType}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteSubscription(sub.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
            setIsSubscribeModalOpen(false);
            fetchSubscriptions();
          }}
        />
      )}
    </div>
  );
}
