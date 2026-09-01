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
  Eye,
  Maximize2,
  Copy,
} from "lucide-react";
import { formatDate, formatTimeAgo } from "@/lib/utils";
import { GTU_COURSES } from "@/lib/gtu-data";
import { ResultSubscriptionModal } from "./ResultSubscriptionModal";
import { EmbeddedResultModal } from "./EmbeddedResultModal";

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

  // Embedded Result Modal state
  const [selectedResultForEmbed, setSelectedResultForEmbed] = useState<any | null>(null);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  // Live GTU Gateway state
  const [liveSessionData, setLiveSessionData] = useState<any | null>(null);
  const [loadingLiveSession, setLoadingLiveSession] = useState(false);
  const [selectedLiveBatch, setSelectedLiveBatch] = useState("");
  const [liveEnrollment, setLiveEnrollment] = useState((session?.user as any)?.enrollmentNo || "210120111001");
  const [liveCaptchaCode, setLiveCaptchaCode] = useState("");
  const [fetchingLiveResult, setFetchingLiveResult] = useState(false);
  const [liveResultData, setLiveResultData] = useState<any | null>(null);
  const [liveError, setLiveError] = useState("");
  const [gatewayMode, setGatewayMode] = useState<"embedded" | "direct_form">("embedded");
  const [copiedEnroll, setCopiedEnroll] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Modals
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

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
    fetchDeclaredResults();
    if (session?.user) {
      fetchSubscriptions();
    }
  }, [session, selectedCourse, selectedSemester]);

  useEffect(() => {
    if (activeTab === "live_gtu_gateway" && gatewayMode === "direct_form" && !liveSessionData) {
      fetchLiveGTUSession();
    }
  }, [activeTab, gatewayMode]);

  const handleOpenEmbeddedResult = (resultItem?: any) => {
    setSelectedResultForEmbed(resultItem || null);
    setIsEmbedModalOpen(true);
  };

  const handleDeleteSubscription = async (id: string) => {
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
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-xl">
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time GTU Results Portal &amp; Live Alerts</span>
            </div>
            {isLiveFromGTU && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold border border-blue-400/30 font-mono">
                ● Live from gturesults.in
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            GTU Results Hub &amp; Embedded Gateway
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            View declared university results inside our <strong>Embedded GTU Portal</strong>, query the live ASP.NET examination server, and subscribe for instant notifications for upcoming exam sessions.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => handleOpenEmbeddedResult(null)}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Open Embedded Result Portal</span>
          </button>

          <button
            onClick={() => setIsSubscribeModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Subscribe Result Alerts</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-border/80">
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
          onClick={() => {
            setActiveTab("live_gtu_gateway");
            if (!liveSessionData) fetchLiveGTUSession();
          }}
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
                placeholder="Search declared result (e.g. BE SEM 5, Remedial)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchDeclaredResults()}
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
            <div className="p-12 text-center bg-card rounded-3xl border border-border text-muted-foreground text-xs space-y-3">
              <p>No declared exam results found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCourse("ALL");
                  setSelectedSemester("ALL");
                  setSearchQuery("");
                }}
                className="px-4 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
              >
                Reset Filters
              </button>
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

                    {/* Prominent Embedded View Button */}
                    <button
                      onClick={() => handleOpenEmbeddedResult(r)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View in Embedded Portal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE GTU OFFICIAL SERVER GATEWAY */}
      {activeTab === "live_gtu_gateway" && (
        <div className="space-y-6">
          {/* Sub-tab Switcher Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-card border border-border shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base sm:text-lg font-extrabold text-foreground">
                  Direct GTU Result Server (gturesults.in)
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Official Gujarat Technological University examination marksheet gateway.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-2xl border border-border/60 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setGatewayMode("embedded")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gatewayMode === "embedded"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🌐 Official Live Portal
              </button>
              <button
                type="button"
                onClick={() => setGatewayMode("direct_form")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gatewayMode === "direct_form"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ⚡ In-App Fast Search
              </button>
            </div>
          </div>

          {/* MODE 1: OFFICIAL EMBEDDED GTU PORTAL */}
          {gatewayMode === "embedded" && (
            <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden space-y-3 p-4 sm:p-6">
              {/* Helper Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-500/20 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Your GTU Enrollment:</span>
                  <span className="font-mono font-bold text-foreground bg-background px-2.5 py-1 rounded-xl border border-border">
                    {liveEnrollment}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(liveEnrollment);
                      setCopiedEnroll(true);
                      setTimeout(() => setCopiedEnroll(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    {copiedEnroll ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEnroll ? "Copied!" : "1-Tap Copy"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIframeKey((k) => k + 1)}
                    className="px-2.5 py-1 rounded-xl border border-border hover:bg-muted text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reload Portal</span>
                  </button>
                  <a
                    href="https://www.gturesults.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-xl border border-border hover:bg-muted text-xs font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Tab</span>
                  </a>
                </div>
              </div>

              {/* Iframe with Mobile Touch-Scrolling & Pan */}
              <div
                className="w-full h-[650px] sm:h-[750px] rounded-2xl border border-border overflow-auto overscroll-contain bg-white"
                style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y pinch-zoom" }}
              >
                <iframe
                  key={iframeKey}
                  src={`/api/gtu/proxy?enroll=${encodeURIComponent(liveEnrollment)}`}
                  className="w-full h-full min-w-full min-h-[650px] border-0 block"
                  title="Official GTU Results Portal"
                  sandbox="allow-forms allow-scripts allow-same-origin"
                />
              </div>
            </div>
          )}

          {/* MODE 2: IN-APP FAST SEARCH */}
          {gatewayMode === "direct_form" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6 max-w-2xl mx-auto">
              <div className="border-b border-border/60 pb-3">
                <h3 className="font-extrabold text-base text-foreground">
                  In-App Fast GTU Live Query
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Direct server query to gturesults.in. If no result was declared yet for your batch, official GTU status is reported.
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
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
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

                {/* Captcha Image & Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Visual CAPTCHA Verification *
                  </label>
                  <div className="flex items-center gap-3">
                    {liveSessionData?.captchaImage ? (
                      <div className="relative border border-border rounded-2xl p-1 bg-white shrink-0">
                        <img
                          src={liveSessionData.captchaImage}
                          alt="Live GTU Captcha"
                          className="h-10 rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-28 bg-muted rounded-2xl animate-pulse shrink-0" />
                    )}

                    <button
                      type="button"
                      onClick={fetchLiveGTUSession}
                      title="Refresh Captcha"
                      className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all shrink-0"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingLiveSession ? "animate-spin" : ""}`} />
                    </button>

                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={liveCaptchaCode}
                      onChange={(e) => setLiveCaptchaCode(e.target.value)}
                      placeholder="Enter Code"
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border font-mono text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={fetchingLiveResult || !liveCaptchaCode}
                  className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {fetchingLiveResult ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Communicating with GTU Server...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck2 className="w-4 h-4" />
                      <span>Fetch Live Result from gturesults.in</span>
                    </>
                  )}
                </button>
              </form>

              {/* Live Result Details */}
              {liveResultData && (
                <div className="p-5 rounded-3xl bg-muted/40 border border-border/80 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{liveResultData.studentName}</h3>
                      <p className="text-xs text-muted-foreground">{liveResultData.branch} • {liveResultData.enrollmentNo}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 block">{liveResultData.resultStatus}</span>
                      <span className="text-xs text-muted-foreground">SPI: {liveResultData.spi} | CPI: {liveResultData.cpi}</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="text-muted-foreground font-bold">
                        <tr>
                          <th className="py-1">Code</th>
                          <th className="py-1">Subject</th>
                          <th className="py-1 text-center">Theory</th>
                          <th className="py-1 text-center">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {liveResultData.subjects?.map((s: any, idx: number) => (
                          <tr key={idx} className="hover:bg-muted/30">
                            <td className="py-2 font-mono">{s.code}</td>
                            <td className="py-2">{s.name}</td>
                            <td className="py-2 text-center font-mono">{s.theoryE}</td>
                            <td className="py-2 text-center font-bold text-primary">{s.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: USER SUBSCRIPTIONS */}
      {activeTab === "subscriptions" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-card border border-border/80 shadow-sm">
            <div>
              <h2 className="text-base font-extrabold text-foreground">
                Your Active Result Alert Subscriptions
              </h2>
              <p className="text-xs text-muted-foreground">
                Our backend background watcher monitors GTU result portals every 15 minutes and dispatches alerts the moment your semester results are declared.
              </p>
            </div>

            <button
              onClick={() => setIsSubscribeModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add New Alert Subscription</span>
            </button>
          </div>

          {loadingSubs ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto text-emerald-500 mb-2" />
              <span>Loading your subscriptions...</span>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="p-12 text-center bg-card rounded-3xl border border-border text-muted-foreground text-xs space-y-3">
              <Bell className="w-8 h-8 mx-auto text-muted-foreground/50" />
              <p>You have not subscribed to any upcoming GTU result alerts yet.</p>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm"
              >
                Subscribe Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((s) => (
                <div
                  key={s.id}
                  className="p-5 rounded-3xl bg-card border border-border/80 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {s.course} • Semester {s.semester}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-muted text-muted-foreground">
                        {s.examSession}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-foreground">{s.branch}</h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      Enrollment: {s.enrollmentNo || "All branch students"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {s.notifyEmail && (
                        <span title="Email Alerts Active">
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                        </span>
                      )}
                      <span className="text-[11px]">Push &amp; In-App Notifications Active</span>
                    </div>

                    <button
                      onClick={() => handleDeleteSubscription(s.id)}
                      className="p-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      title="Unsubscribe"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Result Subscription Modal */}
      {isSubscribeModalOpen && (
        <ResultSubscriptionModal
          isOpen={isSubscribeModalOpen}
          onClose={() => setIsSubscribeModalOpen(false)}
          onSubscribed={fetchSubscriptions}
        />
      )}

      {/* Embedded Official GTU Result Modal */}
      {isEmbedModalOpen && (
        <EmbeddedResultModal
          isOpen={isEmbedModalOpen}
          onClose={() => {
            setIsEmbedModalOpen(false);
            setSelectedResultForEmbed(null);
          }}
          resultItem={selectedResultForEmbed}
          userEnrollment={(session?.user as any)?.enrollmentNo || "210120111001"}
          userName={session?.user?.name || "GTU Student"}
        />
      )}
    </div>
  );
}
