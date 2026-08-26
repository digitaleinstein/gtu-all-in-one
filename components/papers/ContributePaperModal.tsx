"use client";

import React, { useState } from "react";
import { X, UploadCloud, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES, GTU_EXAM_SESSIONS } from "@/lib/gtu-data";

interface ContributePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaperAdded: () => void;
}

export function ContributePaperModal({
  isOpen,
  onClose,
  onPaperAdded,
}: ContributePaperModalProps) {
  const [course, setCourse] = useState("BE");
  const [branch, setBranch] = useState("Computer Engineering");
  const [semester, setSemester] = useState("5");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [examSeason, setExamSeason] = useState("Summer");
  const [year, setYear] = useState("2024");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const branches = GTU_BRANCHES[course] || GTU_BRANCHES["BE"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!subjectCode.trim() || !subjectName.trim()) {
      setError("Please fill subject code and subject name.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addPaper",
          paperData: {
            subjectCode: subjectCode.trim(),
            subjectName: subjectName.trim(),
            course,
            branch,
            semester: parseInt(semester, 10),
            examSeason,
            year: parseInt(year, 10),
            pdfUrl: pdfUrl.trim() || `https://www.gtu.ac.in/uploads/${year}/${subjectCode.trim()}.pdf`,
            fileSize: "1.3 MB",
          },
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to submit paper");
      }

      setSuccess(true);
      setTimeout(() => {
        onPaperAdded();
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to contribute paper");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-card text-foreground rounded-3xl border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                Contribute Question Paper (PYQ)
              </h3>
              <p className="text-xs text-muted-foreground">
                Share missing GTU university exam papers with other students
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
              <span>Paper published successfully! Adding to repository...</span>
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
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
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
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
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
              className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
            >
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-foreground mb-1">
                Subject Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 3150703"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-foreground mb-1">
                Subject Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Analysis and Design of Algorithms"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Exam Season
              </label>
              <select
                value={examSeason}
                onChange={(e) => setExamSeason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
              >
                <option value="Summer">Summer Exam</option>
                <option value="Winter">Winter Exam</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
              >
                {[2024, 2023, 2022, 2021, 2020].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              PDF Direct Link (or Leave Blank for auto-resolver)
            </label>
            <input
              type="url"
              placeholder="https://www.gtu.ac.in/uploads/...pdf"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-1.5"
            >
              {loading ? "Submitting..." : "Submit Paper"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
