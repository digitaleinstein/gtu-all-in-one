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
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  BookOpen,
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
  midsemMarks: number;
  totalMidsemMarks: number;
  internalMarks: number;
  totalInternalMarks: number;
  practicalMarks: number;
  totalPracticalMarks: number;
  targetGrade: string;
}

export function MidsemTracker() {
  const { data: session } = useSession();
  const [selectedSemester, setSelectedSemester] = useState<number>(
    (session?.user as any)?.semester || 5
  );
  const [subjects, setSubjects] = useState<SubjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load existing records or populate defaults
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/midsem?semester=${selectedSemester}`);
      if (res.ok) {
        const data = await res.json();
        if (data.records && data.records.length > 0) {
          setSubjects(data.records);
        } else if (data.suggestions && data.suggestions.length > 0) {
          // Pre-populate suggested subjects
          const mapped: SubjectRow[] = data.suggestions.map((s: any) => ({
            subjectCode: s.code,
            subjectName: s.name,
            credits: s.credits || 4,
            midsemMarks: 24,
            totalMidsemMarks: 30,
            internalMarks: 18,
            totalInternalMarks: 20,
            practicalMarks: 40,
            totalPracticalMarks: 50,
            targetGrade: "AA",
          }));
          setSubjects(mapped);
        } else {
          // Default fallbacks
          setSubjects([
            {
              subjectCode: "3150703",
              subjectName: "Analysis and Design of Algorithms",
              credits: 5,
              midsemMarks: 26,
              totalMidsemMarks: 30,
              internalMarks: 18,
              totalInternalMarks: 20,
              practicalMarks: 45,
              totalPracticalMarks: 50,
              targetGrade: "AA",
            },
            {
              subjectCode: "3150710",
              subjectName: "Computer Networks",
              credits: 5,
              midsemMarks: 23,
              totalMidsemMarks: 30,
              internalMarks: 17,
              totalInternalMarks: 20,
              practicalMarks: 42,
              totalPracticalMarks: 50,
              targetGrade: "AB",
            },
          ]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [selectedSemester]);

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
        midsemMarks: 22,
        totalMidsemMarks: 30,
        internalMarks: 16,
        totalInternalMarks: 20,
        practicalMarks: 40,
        totalPracticalMarks: 50,
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
          records: subjects,
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

  // Calculations
  const calculationSummary = useMemo(() => {
    let totalCredits = 0;
    let weightedGradePoints = 0;
    let midsemTotalObtained = 0;
    let midsemMaxTotal = 0;

    subjects.forEach((s) => {
      const creds = Number(s.credits) || 4;
      const targetG = s.targetGrade || "AA";
      const gPoints = GTU_GRADE_POINTS[targetG] || 10;

      totalCredits += creds;
      weightedGradePoints += creds * gPoints;

      midsemTotalObtained += Number(s.midsemMarks) || 0;
      midsemMaxTotal += Number(s.totalMidsemMarks) || 30;
    });

    const predictedSPI = totalCredits > 0 ? weightedGradePoints / totalCredits : 0;
    const predictedPercentage = calculateGTUPercentage(predictedSPI);
    const midsemPercentage =
      midsemMaxTotal > 0 ? (midsemTotalObtained / midsemMaxTotal) * 100 : 0;

    return {
      totalCredits,
      predictedSPI: Math.round(predictedSPI * 100) / 100,
      predictedPercentage,
      midsemPercentage: Math.round(midsemPercentage * 10) / 10,
    };
  }, [subjects]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-900 via-pink-950 to-slate-950 text-white shadow-lg no-print">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-rose-200 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>GTU Internal Evaluation & Grade Predictor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Midsem Marks & SPI/CPI Calculator
          </h1>
          <p className="text-xs text-rose-100/80 max-w-xl">
            Input your midsem and internal test scores to calculate passing eligibility, exact required marks in 70-mark external GTU papers, and predicted SPI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Gradebook"}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Your internal marks and target calculations have been safely saved to your student profile!</span>
        </div>
      )}

      {/* Summary Scorecard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Predicted SPI */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Predicted Target SPI
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600 dark:text-rose-400">
              {calculationSummary.predictedSPI.toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">/ 10.0</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Based on chosen target letter grades
          </p>
        </div>

        {/* GTU Percentage */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Equivalent Percentage
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {calculationSummary.predictedPercentage}%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Formula: (SPI - 0.5) × 10
          </p>
        </div>

        {/* Midsem Average */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Midsem Performance
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
              {calculationSummary.midsemPercentage}%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Aggregated across all {subjects.length} subjects
          </p>
        </div>

        {/* Total Credits */}
        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Total Semester Credits
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {calculationSummary.totalCredits}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">Credits</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            GTU Teaching Scheme Weightage
          </p>
        </div>
      </div>

      {/* Semester Pill Selector & Add Subject */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-muted-foreground mr-1 shrink-0">
            Select Semester:
          </span>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSemester(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                selectedSemester === s
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              Semester {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddSubject}
          className="px-3.5 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span>Add Custom Subject</span>
        </button>
      </div>

      {/* Interactive Marks Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">
              Semester {selectedSemester} Subject Evaluation Breakdown
            </h3>
          </div>
          <span className="text-xs text-muted-foreground">
            GTU 100-Mark Scale (Theory E: 70 + Theory M: 30)
          </span>
        </div>

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
                <th className="p-3 text-center">Eligibility</th>
                <th className="p-3 text-center no-print">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {subjects.map((sub, idx) => {
                const targetCalc = calculateRequiredEndSemMarks(
                  sub.midsemMarks,
                  sub.totalMidsemMarks || 30,
                  sub.internalMarks,
                  sub.totalInternalMarks || 20,
                  sub.targetGrade
                );
                const isMidsemPassed = (sub.midsemMarks || 0) >= 12;

                return (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    {/* Subject Details */}
                    <td className="p-3 min-w-[200px]">
                      <input
                        type="text"
                        value={sub.subjectName}
                        onChange={(e) => handleFieldChange(idx, "subjectName", e.target.value)}
                        className="w-full font-semibold text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-xs"
                      />
                      <input
                        type="text"
                        value={sub.subjectCode}
                        onChange={(e) => handleFieldChange(idx, "subjectCode", e.target.value)}
                        className="w-24 text-[10px] font-mono text-muted-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none mt-0.5 block"
                      />
                    </td>

                    {/* Credits */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={sub.credits}
                        onChange={(e) => handleFieldChange(idx, "credits", parseInt(e.target.value, 10) || 1)}
                        className="w-12 text-center p-1 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary font-bold text-xs"
                      />
                    </td>

                    {/* Midsem Score */}
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={sub.totalMidsemMarks || 30}
                          value={sub.midsemMarks}
                          onChange={(e) => handleFieldChange(idx, "midsemMarks", parseFloat(e.target.value) || 0)}
                          className={`w-14 text-center p-1 rounded-lg bg-background border focus:ring-2 focus:ring-primary font-bold text-xs ${
                            isMidsemPassed ? "border-border text-foreground" : "border-rose-400 text-rose-600 bg-rose-50 dark:bg-rose-950/40"
                          }`}
                        />
                        <span className="text-muted-foreground text-[10px]">/ 30</span>
                      </div>
                    </td>

                    {/* Internal / Continuous Score */}
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={sub.totalInternalMarks || 20}
                          value={sub.internalMarks}
                          onChange={(e) => handleFieldChange(idx, "internalMarks", parseFloat(e.target.value) || 0)}
                          className="w-14 text-center p-1 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary font-bold text-xs"
                        />
                        <span className="text-muted-foreground text-[10px]">/ 20</span>
                      </div>
                    </td>

                    {/* Target Grade Dropdown */}
                    <td className="p-3 text-center">
                      <select
                        value={sub.targetGrade}
                        onChange={(e) => handleFieldChange(idx, "targetGrade", e.target.value)}
                        className="px-2 py-1 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary font-bold text-xs"
                      >
                        {Object.keys(GTU_GRADE_RANGES).map((g) => (
                          <option key={g} value={g}>
                            {g} ({GTU_GRADE_RANGES[g].min}+ %)
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Required in 70 External Theory Exam */}
                    <td className="p-3 text-center">
                      <div className="flex flex-col items-center">
                        <span
                          className={`text-sm font-black px-2.5 py-0.5 rounded-lg border ${
                            targetCalc.isPossible
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300"
                          }`}
                        >
                          {targetCalc.requiredMarksOutOf70} / 70
                        </span>
                        <span className="text-[9px] text-muted-foreground mt-0.5">
                          Min pass cutoff: 23
                        </span>
                      </div>
                    </td>

                    {/* Passing Eligibility Indicator */}
                    <td className="p-3 text-center">
                      {isMidsemPassed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3" />
                          Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md" title="Need min 12/30 in Midsem">
                          <AlertCircle className="w-3 h-3" />
                          Remedial Risk
                        </span>
                      )}
                    </td>

                    {/* Delete Action */}
                    <td className="p-3 text-center no-print">
                      <button
                        onClick={() => handleRemoveSubject(idx)}
                        className="p-1 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove Subject"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            💡 Note: In GTU 10-point scheme, AA grade requires 85%+ overall, AB requires 75%+, and minimum passing in 70-mark external theory is 23 marks (33%).
          </p>
          <button
            onClick={handleAddSubject}
            className="text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Subject</span>
          </button>
        </div>
      </div>
    </div>
  );
}
