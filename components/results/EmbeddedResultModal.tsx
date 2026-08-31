"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  Maximize2,
  Minimize2,
  RefreshCw,
  Copy,
  Check,
  Server,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  GraduationCap,
  Layers,
  ArrowUpRight,
  Printer,
  ChevronRight,
  Zap,
} from "lucide-react";

interface EmbeddedResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultItem?: any | null;
  userEnrollment?: string;
  userName?: string;
}

export function EmbeddedResultModal({
  isOpen,
  onClose,
  resultItem,
  userEnrollment = "210120111001",
  userName = "GTU Student",
}: EmbeddedResultModalProps) {
  const [activePortalUrl, setActivePortalUrl] = useState("https://result.gtu.ac.in");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedEnroll, setCopiedEnroll] = useState(false);
  const [viewMode, setViewMode] = useState<"embedded_portal" | "direct_api">("embedded_portal");
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Direct API Proxy state
  const [liveSession, setLiveSession] = useState<any | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [enrollmentInput, setEnrollmentInput] = useState(userEnrollment);
  const [captchaInput, setCaptchaInput] = useState("");
  const [fetchingResult, setFetchingResult] = useState(false);
  const [parsedGradeCard, setParsedGradeCard] = useState<any | null>(null);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (userEnrollment) {
      setEnrollmentInput(userEnrollment);
    }
  }, [userEnrollment]);

  useEffect(() => {
    if (isOpen && viewMode === "direct_api" && !liveSession) {
      fetchLiveSession();
    }
  }, [isOpen, viewMode]);

  if (!isOpen) return null;

  const handleCopyEnrollment = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(enrollmentInput || userEnrollment);
      setCopiedEnroll(true);
      setTimeout(() => setCopiedEnroll(false), 2500);
    }
  };

  const fetchLiveSession = async () => {
    try {
      setLoadingSession(true);
      setApiError("");
      const res = await fetch("/api/gtu/live-session");
      const data = await res.json();
      if (res.ok && data.success) {
        setLiveSession(data);
        if (data.batches && data.batches.length > 0) {
          // Preselect batch if resultItem matches
          const matched = data.batches.find((b: any) =>
            resultItem?.examTitle && b.label.toLowerCase().includes(resultItem.course?.toLowerCase())
          );
          setSelectedBatch(matched ? matched.value : data.batches[0].value);
        }
      } else {
        setApiError(data.error || "Failed to initialize live session with GTU server.");
      }
    } catch (e: any) {
      setApiError("Network error while connecting to GTU ASP.NET gateway.");
    } finally {
      setLoadingSession(false);
    }
  };

  const handleDirectQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveSession || !captchaInput) return;

    try {
      setFetchingResult(true);
      setApiError("");
      setParsedGradeCard(null);

      const res = await fetch("/api/gtu/live-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cookies: liveSession.cookies,
          viewState: liveSession.viewState,
          eventValidation: liveSession.eventValidation,
          viewStateGenerator: liveSession.viewStateGenerator,
          batch: selectedBatch,
          enrollmentNo: enrollmentInput.trim(),
          captchaCode: captchaInput.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setParsedGradeCard(data.data);
      } else {
        setApiError(data.error || "Invalid captcha code or result record not found.");
        fetchLiveSession(); // Refresh captcha
        setCaptchaInput("");
      }
    } catch (err: any) {
      setApiError("Failed to fetch live marksheet from university server.");
    } finally {
      setFetchingResult(false);
    }
  };

  const reloadIframe = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`bg-card text-card-foreground border border-border/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? "w-full h-full rounded-none"
            : "w-full max-w-6xl max-h-[92vh] h-[850px]"
        }`}
      >
        {/* Modal Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border/70 bg-muted/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-foreground">
                  GTU Official Results Gateway
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                  ● Live Gateway
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {resultItem ? resultItem.examTitle : "Gujarat Technological University Examination Results"}
              </p>
            </div>
          </div>

          {/* Quick Copy & Mode Toggles */}
          <div className="flex items-center gap-2">
            {/* 1-Tap Copy Enrollment Number */}
            <button
              onClick={handleCopyEnrollment}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                copiedEnroll
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                  : "bg-background border-border text-foreground hover:bg-muted"
              }`}
              title="Copy enrollment number to clipboard"
            >
              {copiedEnroll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              <span>{copiedEnroll ? "Copied!" : `Copy: ${enrollmentInput || "Enrollment"}`}</span>
            </button>

            {/* Switch Views: Embedded Webview vs In-App Direct Proxy */}
            <div className="inline-flex rounded-xl bg-background p-1 border border-border">
              <button
                onClick={() => setViewMode("embedded_portal")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  viewMode === "embedded_portal"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Embedded Portal
              </button>
              <button
                onClick={() => setViewMode("direct_api")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  viewMode === "direct_api"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ⚡ In-App Query
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW MODE 1: EMBEDDED OFFICIAL GTU PORTAL FRAME */}
        {/* ========================================================================= */}
        {viewMode === "embedded_portal" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Embedded Control Toolbar */}
            <div className="px-5 py-2.5 bg-muted/20 border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-semibold">Active Server:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setActivePortalUrl("https://result.gtu.ac.in");
                      reloadIframe();
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      activePortalUrl.includes("result.gtu.ac.in")
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-background border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    result.gtu.ac.in (Regular / Remedial)
                  </button>
                  <button
                    onClick={() => {
                      setActivePortalUrl("https://gturesults.in");
                      reloadIframe();
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      activePortalUrl.includes("gturesults.in")
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-background border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    gturesults.in (Archives / Re-assessment)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={reloadIframe}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background border border-border hover:bg-muted text-foreground transition-all"
                  title="Reload frame"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${iframeLoading ? "animate-spin text-primary" : ""}`} />
                  <span>Reload</span>
                </button>

                <a
                  href={activePortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
                >
                  <span>Open in External Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Step Guidance Banner */}
            <div className="px-5 py-2 bg-blue-50/70 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-900/40 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Instructions:</strong> 1. Select Exam Session &rarr; 2. Paste Enrollment No (use <strong>Copy Button</strong> above) &rarr; 3. Enter Visual Captcha &rarr; 4. Click Search!
                </span>
              </div>
            </div>

            {/* Responsive Iframe Container */}
            <div className="relative flex-1 w-full bg-slate-100 dark:bg-slate-900">
              <iframe
                key={iframeKey}
                src={activePortalUrl}
                title="GTU Official Results Portal"
                className="w-full h-full border-0"
                onLoad={() => setIframeLoading(false)}
                sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-downloads"
              />

              {/* Direct fallback overlay if iframe is blocked by university security policy */}
              <div className="absolute bottom-4 right-4 z-10 p-3 rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg text-xs flex items-center gap-3">
                <div>
                  <span className="font-bold text-foreground block">Having trouble in iframe?</span>
                  <span className="text-[11px] text-muted-foreground">Some GTU servers restrict embedding via X-Frame-Options.</span>
                </div>
                <a
                  href={activePortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold inline-flex items-center gap-1 shadow-sm shrink-0"
                >
                  <span>Launch Portal Directly</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 2: IN-APP DIRECT PROXY QUERY */}
        {/* ========================================================================= */}
        {viewMode === "direct_api" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {apiError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Query Form */}
              <div className="p-6 rounded-3xl bg-muted/40 border border-border space-y-5">
                <div className="border-b border-border/60 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-sm text-foreground">Direct GTU ASP.NET Query</h3>
                  </div>
                  <button
                    onClick={fetchLiveSession}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${loadingSession ? "animate-spin" : ""}`} />
                    <span>Refresh Session</span>
                  </button>
                </div>

                <form onSubmit={handleDirectQuery} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Exam Batch (Live GTU)</label>
                    {loadingSession ? (
                      <div className="p-2.5 rounded-xl bg-background border border-border text-xs text-muted-foreground flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                        <span>Loading declared examination batches from GTU server...</span>
                      </div>
                    ) : (
                      <select
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border text-xs focus:ring-2 focus:ring-primary outline-none"
                      >
                        {liveSession?.batches?.map((b: any) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">GTU 12-Digit Enrollment No</label>
                      <input
                        type="text"
                        required
                        maxLength={12}
                        value={enrollmentInput}
                        onChange={(e) => setEnrollmentInput(e.target.value)}
                        placeholder="210120111001"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-background border border-border font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Enter Captcha Code</label>
                      <div className="flex items-center gap-2">
                        {liveSession?.captchaImage ? (
                          <img
                            src={liveSession.captchaImage}
                            alt="GTU Captcha"
                            className="h-10 rounded-xl border border-border bg-white p-1 shrink-0"
                          />
                        ) : (
                          <div className="h-10 w-24 rounded-xl bg-muted animate-pulse shrink-0" />
                        )}
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          placeholder="Code"
                          className="w-full px-3 py-2 rounded-2xl bg-background border border-border font-mono text-center text-sm font-bold uppercase focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={fetchingResult || !captchaInput}
                    className="w-full py-2.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {fetchingResult ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Querying GTU ASP.NET Server...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Fetch & Parse Official Grade Card</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Parsed Result Display */}
              {parsedGradeCard && (
                <div className="p-6 rounded-3xl bg-card border border-border shadow-xl space-y-6 animate-in fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Official Result Transcript
                      </span>
                      <h3 className="text-lg font-black text-foreground mt-1">
                        {parsedGradeCard.studentName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Enrollment: <span className="font-mono font-bold text-foreground">{parsedGradeCard.enrollmentNo}</span> • {parsedGradeCard.branch}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        🏛️ {parsedGradeCard.institute}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-center px-3 py-1.5 rounded-2xl bg-muted border border-border">
                        <span className="text-[10px] font-bold text-muted-foreground block">SPI</span>
                        <span className="text-xl font-black text-blue-600">{parsedGradeCard.spi}</span>
                      </div>
                      <div className="text-center px-3 py-1.5 rounded-2xl bg-muted border border-border">
                        <span className="text-[10px] font-bold text-muted-foreground block">CPI</span>
                        <span className="text-xl font-black text-indigo-600">{parsedGradeCard.cpi}</span>
                      </div>
                      <div className="text-center px-3 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-[10px] font-bold text-emerald-600 block">STATUS</span>
                        <span className="text-base font-black text-emerald-600">{parsedGradeCard.resultStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subject Details Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-muted text-muted-foreground font-bold">
                        <tr>
                          <th className="p-2.5 rounded-l-xl">Subject Code</th>
                          <th className="p-2.5">Subject Name</th>
                          <th className="p-2.5 text-center">Theory (E)</th>
                          <th className="p-2.5 text-center">Theory (M)</th>
                          <th className="p-2.5 text-center">Grade</th>
                          <th className="p-2.5 text-center rounded-r-xl">Credits</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {parsedGradeCard.subjects?.map((s: any, idx: number) => (
                          <tr key={idx} className="hover:bg-muted/30">
                            <td className="p-2.5 font-mono font-bold text-primary">{s.code}</td>
                            <td className="p-2.5 font-medium">{s.name}</td>
                            <td className="p-2.5 text-center font-mono">{s.theoryE}</td>
                            <td className="p-2.5 text-center font-mono">{s.theoryM}</td>
                            <td className="p-2.5 text-center">
                              <span className="px-2 py-0.5 rounded-md font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {s.grade}
                              </span>
                            </td>
                            <td className="p-2.5 text-center font-mono font-bold">{s.credits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
