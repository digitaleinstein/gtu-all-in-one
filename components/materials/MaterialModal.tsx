"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  FileText,
  Presentation,
  Download,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Share2,
  FolderOpen,
  Search,
  Sparkles,
  Layers,
  GraduationCap,
  FileCheck2,
} from "lucide-react";
import { GTUStudyMaterial, StudyUnit } from "@/lib/study-materials-data";

interface MaterialModalProps {
  material: GTUStudyMaterial | null;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export function MaterialModal({
  material,
  onClose,
  isSaved = false,
  onToggleSave,
}: MaterialModalProps) {
  const [activeTab, setActiveTab] = useState<"units" | "types" | "about">("units");
  const [unitSearch, setUnitSearch] = useState("");
  const [copied, setCopied] = useState(false);

  if (!material) return null;

  const filteredUnits = material.units.filter((u) =>
    u.title.toLowerCase().includes(unitSearch.toLowerCase())
  );

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(material.darshanUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getResourceTypeIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("ppt") || t.includes("presentation")) return <Presentation className="w-4 h-4 text-orange-500" />;
    if (t.includes("lab") || t.includes("manual")) return <Layers className="w-4 h-4 text-purple-500" />;
    if (t.includes("paper") || t.includes("analysis")) return <FileCheck2 className="w-4 h-4 text-emerald-500" />;
    return <FileText className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 border-b border-border/80">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-primary/20 text-primary rounded-lg">
                  {material.subjectCode}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground rounded-lg">
                  {material.department}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-accent text-accent-foreground rounded-lg">
                  Sem {material.semester}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  {material.degree}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {material.subjectName}
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span>Curated & Published by</span>
                <span className="font-semibold text-foreground">Darshan University, Rajkot</span>
                <span>• GTU Syllabus 2026</span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              {onToggleSave && (
                <button
                  onClick={() => onToggleSave(material.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    isSaved
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-500"
                      : "bg-card/80 border-border text-muted-foreground hover:text-foreground"
                  }`}
                  title={isSaved ? "Saved to your bookmarks" : "Bookmark subject"}
                >
                  {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl border border-border bg-card/80 text-muted-foreground hover:text-foreground transition-all"
                title="Copy official link"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl border border-border bg-card/80 text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => setActiveTab("units")}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "units"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card/70 text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Chapter-wise Units & Notes ({material.units.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("types")}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "types"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card/70 text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Resource Types ({material.resourceTypes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === "about"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card/70 text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Syllabus Info</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === "units" && (
            <div className="space-y-4">
              {/* Search Units */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter chapters or topics (e.g. Unit-1, Array, Dynamic Programming, Graphs)..."
                  value={unitSearch}
                  onChange={(e) => setUnitSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-background border border-border/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Units List */}
              <div className="grid grid-cols-1 gap-3">
                {filteredUnits.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-border rounded-xl">
                    <p className="text-xs text-muted-foreground">No units found matching &quot;{unitSearch}&quot;</p>
                  </div>
                ) : (
                  filteredUnits.map((unit, idx) => (
                    <div
                      key={idx}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/80 bg-background/50 hover:bg-accent/40 hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          {getResourceTypeIcon(unit.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                              {unit.type || "e-Notes"}
                            </span>
                            {unit.fileSize && (
                              <span className="text-[10px] text-muted-foreground">
                                {unit.fileSize}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                            {unit.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <a
                          href={unit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Open PDF / Resource</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "types" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {material.resourceTypes.map((type, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      {getResourceTypeIcon(type)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{type}</h4>
                      <p className="text-[11px] text-muted-foreground">GTU Compliant Material</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Official {type.toLowerCase()} crafted by Darshan University professors specifically aligned with Gujarat Technological University examination patterns.
                  </p>
                  <a
                    href={material.darshanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-1"
                  >
                    <span>View all {type} on Darshan Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border/80 bg-background/60 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Subject Overview
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {material.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border border-border/80 bg-card text-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Course</span>
                  <p className="text-xs font-bold text-foreground mt-0.5">{material.degree}</p>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-card text-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Department</span>
                  <p className="text-xs font-bold text-foreground mt-0.5">{material.department}</p>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-card text-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Semester</span>
                  <p className="text-xs font-bold text-foreground mt-0.5">Sem {material.semester}</p>
                </div>
                <div className="p-3 rounded-xl border border-border/80 bg-card text-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Credits</span>
                  <p className="text-xs font-bold text-foreground mt-0.5">{material.credits} Credits</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Official Attribution:</strong> Study materials, e-Notes, PPT slides, and tutorial problem sets are provided courtesy of <strong>Darshan University, Rajkot</strong> and indexed for GTU student accessibility.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-muted/40 border-t border-border flex items-center justify-between gap-3">
          <a
            href={material.darshanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Darshan University Source Page</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
