"use client";

import React from "react";
import { X, Download, ExternalLink, Calendar, Tag, ShieldCheck, Printer } from "lucide-react";
import { formatDate, getCircularCategoryColor } from "@/lib/utils";
import { downloadGTUFile } from "@/lib/download-helper";

interface CircularDetailModalProps {
  circular: {
    id: string;
    title: string;
    category: string;
    publishedDate: string | Date;
    pdfUrl: string;
    isPinned?: boolean;
    gtuRefNo?: string;
    description?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function CircularDetailModal({
  circular,
  isOpen,
  onClose,
}: CircularDetailModalProps) {
  if (!isOpen) return null;

  const badgeStyle = getCircularCategoryColor(circular.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-card text-foreground rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
            >
              {circular.category}
            </span>
            {circular.gtuRefNo && (
              <span className="text-xs font-mono text-muted-foreground">
                Ref: {circular.gtuRefNo}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border bg-muted/40 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
              {circular.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published on {formatDate(circular.publishedDate)}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border border-border/80 text-xs text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground mb-1">Notice Overview:</p>
            {circular.description || "Official circular published by Gujarat Technological University for affiliated institutes, faculty, and enrolled students."}
          </div>

          {/* Embedded Document Preview Box */}
          <div className="p-6 rounded-2xl border border-border bg-white text-black font-serif text-xs space-y-4 shadow-sm">
            <div className="text-center border-b border-neutral-300 pb-3">
              <h3 className="font-bold text-sm uppercase">Gujarat Technological University</h3>
              <p className="text-[11px] text-neutral-600">Nr. Campus of Vishwakarma Govt. Engg. College, Chandkheda, Ahmedabad</p>
            </div>

            <div className="space-y-2 font-sans text-neutral-800">
              <p className="font-bold">Subject: {circular.title}</p>
              <p className="text-[11px] leading-relaxed">
                All Principals/Directors of affiliated colleges, Heads of Departments, and students are hereby informed to take note of the above circular. Please ensure strict compliance with the schedules and procedures detailed in the official PDF document.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={circular.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
          >
            <span>Open on GTU Official Web Server</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                const safeName = `GTU_Circular_${circular.gtuRefNo ? circular.gtuRefNo.replace(/[^a-zA-Z0-9_-]/g, "_") : circular.id}.pdf`;
                downloadGTUFile(circular.pdfUrl, safeName, "application/pdf");
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Circular PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
