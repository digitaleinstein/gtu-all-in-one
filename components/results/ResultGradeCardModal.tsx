"use client";

import React from "react";
import { X, Printer, Award, CheckCircle2, FileText, Share2, Sparkles } from "lucide-react";
import { calculateGTUPercentage } from "@/lib/utils";

interface SubjectResult {
  code: string;
  name: string;
  theoryE?: string;
  theoryM?: string;
  practicalE?: string;
  practicalM?: string;
  grade: string;
  gradePoints: number;
  credits: number;
}

interface ResultData {
  enrollmentNo: string;
  studentName: string;
  institute: string;
  course: string;
  semester: number;
  examSession: string;
  examType: string;
  declarationDate: string;
  spi: number;
  cpi: number;
  cgpa: number;
  totalCredits: number;
  earnedCredits: number;
  resultStatus: string;
  currentBacklogs: number;
  totalBacklogs: number;
  subjects: SubjectResult[];
}

interface ResultGradeCardModalProps {
  result: ResultData;
  isOpen: boolean;
  onClose: () => void;
}

export function ResultGradeCardModal({
  result,
  isOpen,
  onClose,
}: ResultGradeCardModalProps) {
  if (!isOpen) return null;

  const percentage = calculateGTUPercentage(result.spi);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-card text-foreground rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-muted/40 no-print">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                GTU Grade Card Statement
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Enrollment: {result.enrollmentNo} • Sem {result.semester} ({result.examSession})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Marksheet</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grade Card Content Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-muted/20 flex justify-center">
          <div className="w-full max-w-3xl bg-white text-black p-6 sm:p-10 rounded-2xl shadow-xl border border-neutral-300 font-sans space-y-6">
            {/* Header */}
            <div className="text-center border-b-2 border-neutral-800 pb-4 space-y-1">
              <h2 className="text-base sm:text-lg font-black tracking-wide uppercase text-neutral-900">
                GUJARAT TECHNOLOGICAL UNIVERSITY, AHMEDABAD
              </h2>
              <p className="text-xs font-bold uppercase text-neutral-700">
                GRADE CARD STATEMENT – {result.examSession.toUpperCase()} EXAMINATION
              </p>
            </div>

            {/* Student Info Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border border-neutral-300 p-3 rounded-xl bg-neutral-50/50">
              <div>
                <p><span className="font-bold text-neutral-600">Name:</span> <span className="font-bold text-neutral-900">{result.studentName}</span></p>
                <p><span className="font-bold text-neutral-600">Enrollment No:</span> <span className="font-mono font-bold">{result.enrollmentNo}</span></p>
                <p><span className="font-bold text-neutral-600">Institute:</span> {result.institute}</p>
              </div>
              <div className="sm:text-right">
                <p><span className="font-bold text-neutral-600">Course:</span> {result.course}</p>
                <p><span className="font-bold text-neutral-600">Semester:</span> Sem {result.semester} ({result.examType})</p>
                <p><span className="font-bold text-neutral-600">Declared Date:</span> {result.declarationDate}</p>
              </div>
            </div>

            {/* Subject-wise Marks Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-neutral-300">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-800 font-bold border-b border-neutral-300">
                    <th className="p-2 border-r border-neutral-300">Code</th>
                    <th className="p-2 border-r border-neutral-300">Subject Name</th>
                    <th className="p-2 text-center border-r border-neutral-300">Credits</th>
                    <th className="p-2 text-center border-r border-neutral-300">Theory (E/M)</th>
                    <th className="p-2 text-center border-r border-neutral-300">Practical</th>
                    <th className="p-2 text-center border-r border-neutral-300">Grade</th>
                    <th className="p-2 text-center">Grade Point</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((sub) => (
                    <tr key={sub.code} className="border-b border-neutral-200 hover:bg-neutral-50 font-medium">
                      <td className="p-2 border-r border-neutral-300 font-mono font-bold text-neutral-800">{sub.code}</td>
                      <td className="p-2 border-r border-neutral-300">{sub.name}</td>
                      <td className="p-2 text-center border-r border-neutral-300 font-bold">{sub.credits}</td>
                      <td className="p-2 text-center border-r border-neutral-300 font-mono text-[11px]">
                        {sub.theoryE} + {sub.theoryM}
                      </td>
                      <td className="p-2 text-center border-r border-neutral-300 font-mono text-[11px]">
                        {sub.practicalE || "--"} + {sub.practicalM || "--"}
                      </td>
                      <td className="p-2 text-center border-r border-neutral-300 font-bold text-emerald-700">
                        {sub.grade}
                      </td>
                      <td className="p-2 text-center font-bold text-neutral-800">
                        {sub.gradePoints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Performance Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center border border-neutral-300 p-4 rounded-xl bg-neutral-100/70">
              <div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase">Semester SPI</span>
                <p className="text-xl sm:text-2xl font-black text-emerald-600">{result.spi.toFixed(2)}</p>
                <span className="text-[10px] text-neutral-600">Equiv: {percentage}%</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase">Cumulative CPI</span>
                <p className="text-xl sm:text-2xl font-black text-blue-600">{result.cpi.toFixed(2)}</p>
                <span className="text-[10px] text-neutral-600">Total Credits: {result.totalCredits}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase">CGPA</span>
                <p className="text-xl sm:text-2xl font-black text-indigo-600">{result.cgpa.toFixed(2)}</p>
                <span className="text-[10px] text-neutral-600">Earned: {result.earnedCredits}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase">Result Status</span>
                <p className="text-base sm:text-lg font-black text-emerald-700 flex items-center justify-center gap-1 mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{result.resultStatus}</span>
                </p>
                <span className="text-[10px] text-neutral-600">Backlogs: {result.currentBacklogs}</span>
              </div>
            </div>

            {/* GTU Footer Note */}
            <div className="text-[10px] text-neutral-500 space-y-0.5 border-t border-neutral-200 pt-3">
              <p>• GTU Percentage Conversion: Percentage (%) = (SPI / CPI - 0.5) × 10</p>
              <p>• Minimum passing marks: 23 out of 70 in External Theory (E) & 12 out of 30 in Midsem (M).</p>
              <p>• This is a computerized preview generated from Gujarat Technological University result records.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
