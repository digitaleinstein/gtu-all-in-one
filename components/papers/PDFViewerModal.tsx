"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import { getGTUSubjectQuestions } from "@/lib/gtu-paper-questions";
import { downloadGTUFile } from "@/lib/download-helper";

interface PaperData {
  id: string;
  subjectCode: string;
  subjectName: string;
  course: string;
  branch: string;
  semester: number;
  examSeason: string;
  year: number;
  pdfUrl: string;
  fileSize?: string;
  downloadsCount: number;
  isSaved?: boolean;
}

interface PDFViewerModalProps {
  paper: PaperData;
  isOpen: boolean;
  onClose: () => void;
  onBookmarkToggle?: (paperId: string) => void;
}

export function PDFViewerModal({
  paper,
  isOpen,
  onClose,
  onBookmarkToggle,
}: PDFViewerModalProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const questions = getGTUSubjectQuestions(
    paper.subjectCode,
    paper.subjectName,
    paper.course,
    paper.semester
  );

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const downloadUrl = `/api/papers/download?id=${paper.id}&subjectCode=${paper.subjectCode}&subjectName=${encodeURIComponent(paper.subjectName)}&branch=${encodeURIComponent(paper.branch)}&year=${paper.year}&season=${paper.examSeason}&course=${paper.course}&sem=${paper.semester}`;
      const filename = `GTU_${paper.course}_Sem${paper.semester}_${paper.subjectCode}_${paper.examSeason}${paper.year}.pdf`;
      
      downloadGTUFile(downloadUrl, filename, "application/pdf");

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error("PDF download failed:", e);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card text-foreground rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-xs shrink-0">
              {paper.subjectCode}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-foreground truncate">
                {paper.subjectName}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <span>{paper.course} Sem {paper.semester}</span>
                <span>•</span>
                <span>{paper.branch}</span>
                <span>•</span>
                <span className="font-semibold text-primary">{paper.examSeason} {paper.year}</span>
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono font-medium px-1">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
                className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {onBookmarkToggle && (
              <button
                onClick={() => onBookmarkToggle(paper.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  paper.isSaved
                    ? "bg-amber-100 border-amber-300 text-amber-600 dark:bg-amber-950/60 dark:border-amber-700"
                    : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
                }`}
                title={paper.isSaved ? "Saved to Bookmarks" : "Save to Bookmarks"}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            )}

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl border border-border bg-muted/40 text-muted-foreground hover:text-foreground transition-colors hidden sm:block cursor-pointer"
              title="Print Question Paper"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-sm hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-60"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-border bg-muted/40 text-muted-foreground hover:text-foreground transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-muted/20 flex justify-center">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            className="w-full max-w-2xl bg-white text-black p-8 sm:p-12 rounded-2xl shadow-xl border border-neutral-300 transition-transform font-serif leading-relaxed text-sm"
          >
            {/* Official GTU Paper Header Layout */}
            <div className="text-center border-b-2 border-black pb-4 space-y-1">
              <h2 className="text-base font-bold tracking-wider uppercase">
                GUJARAT TECHNOLOGICAL UNIVERSITY
              </h2>
              <p className="text-xs font-semibold uppercase">
                {paper.course} - SEMESTER–{paper.semester} EXAMINATION – {paper.examSeason.toUpperCase()} {paper.year}
              </p>
              <div className="grid grid-cols-2 text-xs pt-2 text-left font-sans border-t border-neutral-300 mt-2 font-medium">
                <div>
                  <p>Subject Code: <span className="font-bold font-mono">{paper.subjectCode}</span></p>
                  <p>Subject Name: <span className="font-bold">{paper.subjectName}</span></p>
                </div>
                <div className="text-right">
                  <p>Time: <span className="font-bold">10:30 AM TO 01:00 PM</span></p>
                  <p>Total Marks: <span className="font-bold">70</span></p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="my-4 text-[11px] font-sans bg-neutral-100 p-3 rounded-lg border border-neutral-300 space-y-1">
              <p className="font-bold">Instructions:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-neutral-800">
                <li>Attempt all questions.</li>
                <li>Make suitable assumptions wherever necessary.</li>
                <li>Figures to the right indicate full marks.</li>
                <li>Simple and non-programmable scientific calculators are permitted.</li>
              </ol>
            </div>

            {/* Dynamic Subject-Specific Question Units */}
            <div className="space-y-6 text-xs font-sans text-neutral-900 mt-6">
              {questions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3 pt-2">
                  <div className="flex justify-between items-start font-bold border-b border-neutral-200 pb-1">
                    <span>{q.qNum}</span>
                    <span>Marks</span>
                  </div>

                  {q.parts.map((part, pIdx) => (
                    <div key={pIdx} className="flex justify-between items-baseline gap-4 pl-4">
                      <span>
                        <strong className="mr-2">{part.label}</strong>
                        {part.text}
                      </span>
                      <span className="font-bold shrink-0">{part.marks}</span>
                    </div>
                  ))}

                  {q.orOption && (
                    <>
                      <div className="text-center font-bold text-neutral-600 py-1 text-[11px]">— OR —</div>
                      <div className="flex justify-between items-baseline gap-4 pl-4">
                        <span>
                          <strong className="mr-2">{q.orOption.label}</strong>
                          {q.orOption.text}
                        </span>
                        <span className="font-bold shrink-0">{q.orOption.marks}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div className="text-center pt-6 text-[11px] text-neutral-500 font-semibold">
                ************* END OF PAPER *************
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Info */}
        <div className="px-5 py-3 border-t border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Verified GTU Examination Paper</span>
            <span>•</span>
            <span>{paper.downloadsCount} downloads</span>
          </div>
          <p className="text-[11px]">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono">Ctrl + P</kbd> to print directly.
          </p>
        </div>
      </div>
    </div>
  );
}
