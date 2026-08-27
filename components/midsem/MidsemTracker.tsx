"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  Calculator,
  Save,
  Plus,
  Trash2,
  Printer,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  ArrowRight,
  HelpCircle,
  GraduationCap,
  Target,
  Percent,
} from "lucide-react";
import {
  calculateGTUPercentage,
  calculateRequiredEndSemMarks,
  GTU_GRADE_POINTS,
  GTU_GRADE_RANGES,
} from "@/lib/utils";
import { GTU_POPULAR_SUBJECTS } from "@/lib/gtu-data";

interface SubjectRow {
  id?: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  midsemMarks: number | string;
  totalMidsemMarks: number;
  internalMarks: number | string;
  totalInternalMarks: number;
  targetGrade: string;
}

export function MidsemTracker() {
  const { data: session } = useSession();
  const [activeTool, setActiveTool] = useState<"converter" | "target_calc" | "tracker">("converter");

  // 1. Quick SPI to Percentage Tool state
  const [inputSpi, setInputSpi] = useState<string>("8.50");
  const [inputCpi, setInputCpi] = useState<string>("8.25");

  // 2. Target 70-Mark External Calculator state
  const [calcMidsem, setCalcMidsem] = useState<number | string>(20);
  const [calcInternal, setCalcInternal] = useState<number | string>(15);
  const [calcTargetGrade, setCalcTargetGrade] = useState<string>("AA");

  // 3. Semester Gradebook Tracker state
  const [selectedSemester, setSelectedSemester] = useState<number>(
    (session?.user as any)?.semester || 5
  );
  const [subjects, setSubjects] = useState<SubjectRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load existing saved records or default empty subjects
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/midsem?semester=${selectedSemester}`);
      if (res.ok) {
        const data = await res.json();
        if (data.records && data.records.length > 0) {
          setSubjects(data.records);
        } else if (data.suggestions && data.suggestions.length > 0) {
          // Pre-populate actual GTU subjects with empty marks (0) so user enters their real marks
          const mapped: SubjectRow[] = data.suggestions.map((s: any) => ({
            subjectCode: s.code,
            subjectName: s.name,
            credits: s.credits || 4,
            midsemMarks: "",
            totalMidsemMarks: 30,
            internalMarks: "",
            totalInternalMarks: 20,
            targetGrade: "AA",
          }));
          setSubjects(mapped);
        } else {
          setSubjects([]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTool === "tracker") {
      fetchRecords();
    }
  }, [selectedSemester, activeTool]);

  // Quick SPI calculation
  const spiNum = parseFloat(inputSpi) || 0;
  const gtuPercentage = spiNum > 0 ? Math.max(0, Math.round((spiNum - 0.5) * 10 * 100) / 100) : 0;
  
  const getGtuClass = (pct: number) => {
    if (pct >= 70) return { label: "First Class with Distinction", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" };
    if (pct >= 60) return { label: "First Class", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" };
    if (pct >= 55) return { label: "Higher Second Class", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" };
    if (pct >= 50) return { label: "Second Class", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" };
    if (pct >= 40) return { label: "Pass Class", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" };
    return { label: "Below Passing Standard", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" };
  };

  const classInfo = getGtuClass(gtuPercentage);

  // Single Target 70-mark calculation
  const singleTargetReq = useMemo(() => {
    const m = Number(calcMidsem) || 0;
    const i = Number(calcInternal) || 0;
    return calculateRequiredEndSemMarks(m, 30, i, 20, calcTargetGrade);
  }, [calcMidsem, calcInternal, calcTargetGrade]);

  // Tracker Handlers
  const handleFieldChange = (index: number, field: keyof SubjectRow, value: any) => {
    setSubjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        subjectCode: `31${selectedSemester}000${prev.length + 1}`,
        subjectName: `Subject ${prev.length + 1}`,
        credits: 4,
        midsemMarks: "",
        totalMidsemMarks: 30,
        internalMarks: "",
        totalInternalMarks: 20,
        targetGrade: "AA",
      },
    ]);
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/midsem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveAll",
          semester: selectedSemester,
          records: subjects.map((s) => ({
            ...s,
            midsemMarks: Number(s.midsemMarks) || 0,
            internalMarks: Number(s.internalMarks) || 0,
          })),
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // Calculations for Tracker
  const calculationSummary = useMemo(() => {
    let totalCredits = 0;
    let weightedGradePoints = 0;
    let midsemTotalObtained = 0;
    let midsemMaxTotal = 0;
    let enteredCount = 0;

    subjects.forEach((s) => {
      const creds = Number(s.credits) || 4;
      const targetG = s.targetGrade || "AA";
      const gPoints = GTU_GRADE_POINTS[targetG] || 10;

      totalCredits += creds;
      weightedGradePoints += creds * gPoints;

      if (s.midsemMarks !== "" && !isNaN(Number(s.midsemMarks))) {
        midsemTotalObtained += Number(s.midsemMarks);
        enteredCount++;
      }
      midsemMaxTotal += Number(s.totalMidsemMarks) || 30;
    });

    const predictedSPI = totalCredits > 0 ? weightedGradePoints / totalCredits : 0;
    const predictedPercentage = calculateGTUPercentage(predictedSPI);
    const midsemPercentage =
      enteredCount > 0 && midsemMaxTotal > 0
        ? Math.round(((midsemTotalObtained / (enteredCount * 30)) * 100) * 10) / 10
        : 0;

    return {
      totalCredits,
      predictedSPI: Math.round(predictedSPI * 100) / 100,
      predictedPercentage,
      midsemPercentage,
      enteredCount,
    };
  }, [subjects]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900 via-pink-950 to-slate-950 text-white shadow-xl no-print">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Official Gujarat Technological University Evaluation Standards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            GTU SPI, CPI & Target Marks Calculator
          </h1>
          <p className="text-xs sm:text-sm text-rose-100/80 max-w-2xl leading-relaxed">
            Convert your official GTU SPI/CPI to percentage using the authentic circular formula <strong>(SPI - 0.5) × 10</strong>, calculate exact required marks out of 70 in GTU external papers, and plan your target semester grade.
          </p>
        </div>

        {/* Tab switcher buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={() => setActiveTool("converter")}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTool === "converter"
                ? "bg-white text-slate-900 shadow-md scale-105"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>SPI to % Converter</span>
          </button>
          <button
            onClick={() => setActiveTool("target_calc")}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTool === "target_calc"
                ? "bg-white text-slate-900 shadow-md scale-105"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Target 70-Mark Calc</span>
          </button>
          <button
            onClick={() => setActiveTool("tracker")}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTool === "tracker"
                ? "bg-white text-slate-900 shadow-md scale-105"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Semester Gradebook</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOOL 1: OFFICIAL GTU SPI / CPI TO PERCENTAGE CONVERTER */}
      {/* ========================================================================= */}
      {activeTool === "converter" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input card */}
            <div className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-rose-500" />
                  <h2 className="text-base font-bold text-foreground">Enter Your GTU SPI / CPI</h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  Valid range: 0.00 to 10.00 (from your GTU grade card)
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Semester Performance Index (SPI)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={inputSpi}
                      onChange={(e) => setInputSpi(e.target.value)}
                      placeholder="e.g. 8.50"
                      className="w-full px-4 py-3 text-lg font-black font-mono rounded-2xl bg-background border border-border focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                      / 10.0
                    </span>
                  </div>
                </div>

                {/* Quick Quick-Select Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-muted-foreground">Quick select:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["10.0", "9.50", "9.00", "8.50", "8.00", "7.50", "7.00", "6.50"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setInputSpi(v)}
                        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                          inputSpi === v
                            ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                            : "bg-muted hover:bg-muted/80 text-foreground border-border/60"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs text-muted-foreground space-y-1.5">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-rose-500" />
                  <span>GTU Official Circular Notification</span>
                </div>
                <p className="leading-relaxed">
                  As per Gujarat Technological University Ordinance No. GTU/Academic/2012/11484, percentage equivalent for Engineering & Diploma courses is calculated strictly as:
                </p>
                <div className="p-2 rounded-xl bg-background font-mono text-center font-bold text-foreground border border-border">
                  Percentage (%) = (SPI / CPI / CGPA - 0.5) × 10
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-2 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Official Calculation Result
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Equivalent Percentage */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent border border-rose-500/20 space-y-1">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">
                      Equivalent GTU Percentage
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-foreground">
                        {gtuPercentage}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      Calculation: ({inputSpi || "0"} - 0.5) × 10
                    </p>
                  </div>

                  {/* Division / Class Award */}
                  <div className={`p-6 rounded-2xl border space-y-1 ${classInfo.bg}`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      GTU Class Classification
                    </span>
                    <p className={`text-xl sm:text-2xl font-black ${classInfo.color}`}>
                      {classInfo.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Conferred on official GTU degree certificate
                    </p>
                  </div>
                </div>
              </div>

              {/* GTU Grade Scale & Class Reference Table */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  GTU Degree Classification Benchmark
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-background border border-border text-center space-y-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block">70% and Above</span>
                    <span className="text-muted-foreground text-[11px]">Distinction</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border text-center space-y-1">
                    <span className="text-blue-600 dark:text-blue-400 font-bold block">60% to 69.99%</span>
                    <span className="text-muted-foreground text-[11px]">First Class</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border text-center space-y-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold block">50% to 59.99%</span>
                    <span className="text-muted-foreground text-[11px]">Second Class</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border text-center space-y-1">
                    <span className="text-orange-600 dark:text-orange-400 font-bold block">40% to 49.99%</span>
                    <span className="text-muted-foreground text-[11px]">Pass Class</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOOL 2: TARGET 70-MARK EXTERNAL EXAM MARKS CALCULATOR */}
      {/* ========================================================================= */}
      {activeTool === "target_calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-500" />
                <h2 className="text-base font-bold text-foreground">Configure Subject Scores</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter your internal marks to see what you need in the 70-mark external paper.
              </p>
            </div>

            <div className="space-y-4">
              {/* Midsem score */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  College Midsem Test Marks (M)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={calcMidsem}
                    onChange={(e) => setCalcMidsem(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm font-bold font-mono rounded-xl bg-background border border-border focus:border-rose-500 outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    / 30
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">
                  Passing minimum: 12 / 30
                </span>
              </div>

              {/* Internal continuous evaluation */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Internal / Continuous Assignment Marks (I)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={calcInternal}
                    onChange={(e) => setCalcInternal(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm font-bold font-mono rounded-xl bg-background border border-border focus:border-rose-500 outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    / 20
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">
                  Assignments, quizzes & attendance
                </span>
              </div>

              {/* Target Grade Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Desired Target Letter Grade
                </label>
                <select
                  value={calcTargetGrade}
                  onChange={(e) => setCalcTargetGrade(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm font-bold rounded-xl bg-background border border-border focus:border-rose-500 outline-none"
                >
                  <option value="AA">Grade AA (85 - 100 Marks • 10 Points)</option>
                  <option value="AB">Grade AB (75 - 84 Marks • 9 Points)</option>
                  <option value="BB">Grade BB (65 - 74 Marks • 8 Points)</option>
                  <option value="BC">Grade BC (55 - 64 Marks • 7 Points)</option>
                  <option value="CC">Grade CC (45 - 54 Marks • 6 Points)</option>
                  <option value="CD">Grade CD (40 - 44 Marks • 5 Points)</option>
                  <option value="DD">Grade DD (35 - 39 Marks • 4 Points - Passing)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results card */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Target External Exam Requirement
              </span>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-transparent border border-rose-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-muted-foreground">
                    Required Score in GTU 70-Mark Theory Paper (E)
                  </span>
                  <span className="px-3 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-lg">
                    Target: Grade {calcTargetGrade}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-rose-600 dark:text-rose-400 font-mono">
                    {singleTargetReq.requiredMarksOutOf70}
                  </span>
                  <span className="text-base font-semibold text-muted-foreground">/ 70 Marks</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold pt-1">
                  {singleTargetReq.isPossible ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{singleTargetReq.message}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>{singleTargetReq.message}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border text-center">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Internal Secured</span>
                  <p className="text-base font-black text-foreground mt-0.5">
                    {Number(calcMidsem) + Number(calcInternal)} / 50
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border text-center">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">GTU Pass Cutoff</span>
                  <p className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    23 / 70 Min
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Total Aggregate Required</span>
                  <p className="text-base font-black text-foreground mt-0.5">
                    {GTU_GRADE_RANGES[calcTargetGrade]?.min || 85} / 100
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-background border border-border/80 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">GTU Passing Rule:</strong> A student must obtain a minimum of <strong>23 marks out of 70 (33%)</strong> in external theory examination AND a minimum of <strong>12 marks out of 30 (40%)</strong> in internal midsem exam to clear the course without backlog.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOOL 3: SEMESTER GRADEBOOK TRACKER */}
      {/* ========================================================================= */}
      {activeTool === "tracker" && (
        <div className="space-y-6">
          {/* Semester Selector & Action Bar */}
          <div className="p-4 rounded-2xl border border-border bg-card shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-muted-foreground mr-1 shrink-0">
                Semester:
              </span>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSemester(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                    selectedSemester === s
                      ? "bg-primary text-primary-foreground shadow-sm font-bold"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  Sem {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAddSubject}
                className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-primary" />
                <span>Add Subject</span>
              </button>
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-primary/90"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? "Saving..." : "Save Gradebook"}</span>
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in no-print">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Marks saved successfully to your student profile!</span>
            </div>
          )}

          {/* Subject Table */}
          <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">
                  Semester {selectedSemester} Subjects & Marks Entry
                </h3>
              </div>
              <span className="text-xs text-muted-foreground">
                Enter your real midsem marks to track your SPI
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                <span>Loading subjects...</span>
              </div>
            ) : subjects.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <p className="text-xs text-muted-foreground">No subjects added for Semester {selectedSemester} yet.</p>
                <button
                  onClick={handleAddSubject}
                  className="px-4 py-2 text-xs font-bold bg-primary text-primary-foreground rounded-xl"
                >
                  Add Your First Subject
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-muted/50 text-muted-foreground font-semibold border-b border-border">
                    <tr>
                      <th className="p-3">Subject & Code</th>
                      <th className="p-3 text-center">Credits</th>
                      <th className="p-3 text-center">Midsem (M) /30</th>
                      <th className="p-3 text-center">Internal /20</th>
                      <th className="p-3 text-center">Target Grade</th>
                      <th className="p-3 text-center font-bold text-primary">Req. in 70 External</th>
                      <th className="p-3 text-center no-print">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {subjects.map((sub, idx) => {
                      const mid = sub.midsemMarks === "" ? 0 : Number(sub.midsemMarks);
                      const int = sub.internalMarks === "" ? 0 : Number(sub.internalMarks);
                      const targetCalc = calculateRequiredEndSemMarks(
                        mid,
                        sub.totalMidsemMarks || 30,
                        int,
                        sub.totalInternalMarks || 20,
                        sub.targetGrade
                      );

                      return (
                        <tr key={idx} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 min-w-[200px]">
                            <input
                              type="text"
                              value={sub.subjectName}
                              onChange={(e) => handleFieldChange(idx, "subjectName", e.target.value)}
                              placeholder="Subject Name"
                              className="w-full font-semibold text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-xs"
                            />
                            <input
                              type="text"
                              value={sub.subjectCode}
                              onChange={(e) => handleFieldChange(idx, "subjectCode", e.target.value)}
                              placeholder="Code (e.g. 3150703)"
                              className="w-24 text-[10px] font-mono text-muted-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none mt-0.5 block"
                            />
                          </td>

                          <td className="p-3 text-center">
                            <input
                              type="number"
                              min={1}
                              max={12}
                              value={sub.credits}
                              onChange={(e) => handleFieldChange(idx, "credits", parseInt(e.target.value, 10) || 1)}
                              className="w-12 text-center p-1 rounded-lg bg-background border border-border font-bold text-xs"
                            />
                          </td>

                          <td className="p-3 text-center">
                            <div className="inline-flex items-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={30}
                                value={sub.midsemMarks}
                                placeholder="0"
                                onChange={(e) => handleFieldChange(idx, "midsemMarks", e.target.value)}
                                className="w-14 text-center p-1 rounded-lg bg-background border border-border font-bold text-xs"
                              />
                              <span className="text-muted-foreground text-[10px]">/ 30</span>
                            </div>
                          </td>

                          <td className="p-3 text-center">
                            <div className="inline-flex items-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={20}
                                value={sub.internalMarks}
                                placeholder="0"
                                onChange={(e) => handleFieldChange(idx, "internalMarks", e.target.value)}
                                className="w-14 text-center p-1 rounded-lg bg-background border border-border font-bold text-xs"
                              />
                              <span className="text-muted-foreground text-[10px]">/ 20</span>
                            </div>
                          </td>

                          <td className="p-3 text-center">
                            <select
                              value={sub.targetGrade}
                              onChange={(e) => handleFieldChange(idx, "targetGrade", e.target.value)}
                              className="p-1 rounded-lg bg-background border border-border font-bold text-xs"
                            >
                              <option value="AA">AA (10 pts)</option>
                              <option value="AB">AB (9 pts)</option>
                              <option value="BB">BB (8 pts)</option>
                              <option value="BC">BC (7 pts)</option>
                              <option value="CC">CC (6 pts)</option>
                              <option value="CD">CD (5 pts)</option>
                              <option value="DD">DD (4 pts)</option>
                            </select>
                          </td>

                          <td className="p-3 text-center font-bold text-foreground">
                            {targetCalc.requiredMarksOutOf70} / 70
                          </td>

                          <td className="p-3 text-center no-print">
                            <button
                              onClick={() => handleRemoveSubject(idx)}
                              className="p-1 text-muted-foreground hover:text-rose-500 rounded-lg"
                              title="Remove subject"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
