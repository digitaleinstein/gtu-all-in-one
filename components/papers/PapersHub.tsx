"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Bookmark,
  BookmarkCheck,
  PlusCircle,
  Sparkles,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  FolderDown,
  Layers,
  GraduationCap,
} from "lucide-react";
import { GTU_COURSES, GTU_BRANCHES, GTU_EXAM_SESSIONS, GTU_POPULAR_SUBJECTS } from "@/lib/gtu-data";
import { GTU_STUDY_MATERIALS } from "@/lib/study-materials-data";
import { downloadGTUFile } from "@/lib/download-helper";
import { PDFViewerModal } from "./PDFViewerModal";
import { ContributePaperModal } from "./ContributePaperModal";

export function PapersHub() {
  const { data: session } = useSession();
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCourse, setSelectedCourse] = useState<string>("BE");
  const [selectedBranch, setSelectedBranch] = useState<string>("Computer Engineering");
  const [selectedSemester, setSelectedSemester] = useState<string>("ALL");
  const [selectedSeason, setSelectedSeason] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("ALL");
  const [savedOnly, setSavedOnly] = useState(false);

  // Modals
  const [activePreviewPaper, setActivePreviewPaper] = useState<any | null>(null);
  const [isContributeOpen, setIsContributeOpen] = useState(false);

  // Computed all GTU Subjects for 1-click subject selection & autocomplete
  const allGTUSubjects = useMemo(() => {
    const map = new Map<string, { code: string; name: string; sem: number; course: string; branch: string }>();
    GTU_POPULAR_SUBJECTS.forEach((s) => {
      if (!map.has(s.code)) {
        map.set(s.code, { code: s.code, name: s.name, sem: s.semester, course: s.course, branch: s.branch });
      }
    });
    GTU_STUDY_MATERIALS.forEach((s) => {
      if (!map.has(s.subjectCode)) {
        map.set(s.subjectCode, { code: s.subjectCode, name: s.subjectName, sem: s.semester, course: s.degree, branch: s.department });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Quick search autocomplete suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const qClean = q.replace(/[\s\-_]/g, "");
    return allGTUSubjects
      .filter(
        (s) =>
          s.code.toLowerCase().includes(q) ||
          s.code.includes(qClean) ||
          s.name.toLowerCase().includes(q) ||
          (q.includes("math") && s.name.toLowerCase().includes("math"))
      )
      .slice(0, 8);
  }, [allGTUSubjects, searchQuery]);

  const quickSubjectTags = [
    "ADA",
    "PPS",
    "Maths-1",
    "Maths-2",
    "Data Structures",
    "DBMS",
    "Operating System",
    "Python",
    "Computer Networks",
    "Theory of Computation",
    "Software Engineering",
    "COA",
  ];

  const fetchPapers = async (overrideSearch?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const currentSearch = overrideSearch !== undefined ? overrideSearch : searchQuery;

      if (selectedCourse !== "ALL" && !currentSearch.trim()) params.append("course", selectedCourse);
      if (selectedBranch !== "ALL" && !currentSearch.trim()) params.append("branch", selectedBranch);
      if (selectedSemester !== "ALL" && !currentSearch.trim()) params.append("semester", selectedSemester);
      if (selectedSeason !== "ALL") params.append("season", selectedSeason);
      if (selectedYear !== "ALL") params.append("year", selectedYear);
      if (currentSearch.trim()) params.append("search", currentSearch.trim());
      if (savedOnly) params.append("savedOnly", "true");

      const res = await fetch(`/api/papers?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPapers(data.papers || []);
      }
    } catch (e) {
      console.error("Error fetching papers:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [selectedCourse, selectedBranch, selectedSemester, selectedSeason, selectedYear, savedOnly]);

  // Debounced live search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPapers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPapers();
  };

  const handleSelectSubject = (code: string) => {
    setSelectedSubjectCode(code);
    if (code === "ALL") {
      setSearchQuery("");
      fetchPapers("");
    } else {
      const subj = allGTUSubjects.find((s) => s.code === code);
      if (subj) {
        setSearchQuery(subj.code);
        setSelectedCourse(subj.course || "ALL");
        setSelectedSemester(subj.sem ? subj.sem.toString() : "ALL");
        fetchPapers(subj.code);
      }
    }
  };

  const handleBookmarkToggle = async (paperId: string) => {
    try {
      const res = await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleBookmark", paperId }),
      });
      if (res.ok) {
        setPapers((prev) =>
          prev.map((p) => (p.id === paperId ? { ...p, isSaved: !p.isSaved } : p))
        );
        if (activePreviewPaper?.id === paperId) {
          setActivePreviewPaper((prev: any) =>
            prev ? { ...prev, isSaved: !prev.isSaved } : null
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDirectDownload = async (paper: any) => {
    try {
      const downloadUrl = `/api/papers/download?id=${paper.id}&subjectCode=${paper.subjectCode}&subjectName=${encodeURIComponent(paper.subjectName)}&branch=${encodeURIComponent(paper.branch)}&year=${paper.year}&season=${paper.examSeason}&course=${paper.course}&sem=${paper.semester}`;
      const filename = `GTU_${paper.course}_Sem${paper.semester}_${paper.subjectCode}_${paper.examSeason}${paper.year}.pdf`;

      setPapers((prev) =>
        prev.map((p) =>
          p.id === paper.id ? { ...p, downloadsCount: (p.downloadsCount || 0) + 1 } : p
        )
      );

      downloadGTUFile(downloadUrl, filename, "application/pdf");
    } catch (e) {
      console.error("Direct download failed:", e);
    }
  };

  const currentBranches = GTU_BRANCHES[selectedCourse] || GTU_BRANCHES["BE"] || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>GTU Question Paper Archive (PYQ)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Previous Year Question Papers
          </h1>
          <p className="text-xs text-blue-100/80 max-w-xl">
            Access, view in high resolution, and instantly download authentic Gujarat Technological University examination question papers across all GTU branches & semesters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSavedOnly(!savedOnly)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              savedOnly
                ? "bg-amber-400 text-amber-950 border-amber-300 shadow-md"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${savedOnly ? "fill-current" : ""}`} />
            <span>{savedOnly ? "Showing Saved" : "My Saved Papers"}</span>
          </button>

          <button
            onClick={() => setIsContributeOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl shadow-md hover:bg-primary/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Contribute Paper</span>
          </button>
        </div>
      </div>

      {/* Main Filter and Subject Search Section */}
      <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4">
        
        {/* Row 1: Instant Subject Search Input + Direct Subject Dropdown Picker */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            🔍 Subject Search &amp; Direct Subject Picker
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input with Live Floating Suggestions */}
            <div className="md:col-span-2 relative">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Subject (e.g. ADA, PPS, Maths 1, DBMS, OS, Python) or Code (3150703)..."
                  className="w-full pl-10 pr-16 py-3 text-xs font-medium rounded-2xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary shadow-sm outline-none transition-all placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSubjectCode("ALL");
                      fetchPapers("");
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </form>

              {/* Instant Floating Subject Suggestions */}
              {searchQuery.trim() && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden divide-y divide-border/60">
                  <div className="px-4 py-2 bg-muted/60 flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span>Matching Subjects for PYQ ({searchSuggestions.length})</span>
                    <span className="text-[10px] text-primary">Click to filter papers</span>
                  </div>
                  {searchSuggestions.map((subj) => (
                    <button
                      key={subj.code}
                      type="button"
                      onClick={() => handleSelectSubject(subj.code)}
                      className="w-full text-left p-3 hover:bg-accent/70 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {subj.code}
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            Sem {subj.sem} • {subj.branch}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {subj.name}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground px-2.5 py-1 rounded-lg transition-all">
                        View Papers
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Subject Dropdown Selector */}
            <div className="relative">
              <select
                value={selectedSubjectCode}
                onChange={(e) => handleSelectSubject(e.target.value)}
                className="w-full px-4 py-3 text-xs font-bold rounded-2xl bg-background border border-border shadow-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer truncate"
              >
                <option value="ALL">📚 Select Subject ({allGTUSubjects.length} GTU Subjects)</option>
                {allGTUSubjects.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} - {s.name} (Sem {s.sem})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick-Filter Popular Subject Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs pt-1">
            <span className="text-muted-foreground font-bold text-[11px] whitespace-nowrap mr-1">Popular:</span>
            {quickSubjectTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  fetchPapers(tag);
                }}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/70 hover:bg-muted text-foreground border border-border/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Secondary Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-border/60">
          {/* Course */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Course / Degree
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedBranch("ALL");
              }}
              className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
            >
              <option value="ALL">All Courses</option>
              {GTU_COURSES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name.split("(")[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Branch / Discipline
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
            >
              <option value="ALL">All Branches</option>
              {currentBranches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Season */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Exam Season
            </label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
            >
              <option value="ALL">All Seasons</option>
              <option value="Summer">Summer Exams</option>
              <option value="Winter">Winter Exams</option>
            </select>
          </div>

          {/* Exam Year */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Exam Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
            >
              <option value="ALL">All Years</option>
              {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Semester Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-border/60 scrollbar-none">
          <span className="text-xs font-semibold text-muted-foreground mr-1 shrink-0">
            Semester:
          </span>
          <button
            onClick={() => {
              setSelectedSemester("ALL");
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
              selectedSemester === "ALL"
                ? "bg-primary text-primary-foreground font-bold shadow-sm"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            All Sem
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedSemester(s.toString());
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                selectedSemester === s.toString()
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              Sem {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-muted-foreground">
          Showing <span className="text-foreground">{papers.length}</span> question papers
          {selectedSemester !== "ALL" && ` for Semester ${selectedSemester}`}
          {selectedCourse !== "ALL" && ` (${selectedCourse})`}
        </p>
        <button
          onClick={() => fetchPapers()}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Papers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl border border-border bg-card/50 animate-pulse p-5"
            />
          ))}
        </div>
      ) : papers.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-3xl border border-dashed border-border bg-card/40">
          <FolderDown className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
          <h3 className="font-bold text-base text-foreground">No Question Papers Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your filters, clearing the search query, or contribute this paper to the repository!
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setSelectedCourse("ALL");
                setSelectedBranch("ALL");
                setSelectedSemester("ALL");
                setSelectedSeason("ALL");
                setSelectedYear("ALL");
                setSearchQuery("");
                setSavedOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold bg-muted hover:bg-muted/80 rounded-xl"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setIsContributeOpen(true)}
              className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl"
            >
              Contribute This Paper
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-150"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono font-bold text-xs">
                      {paper.subjectCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-semibold text-[11px]">
                      Sem {paper.semester}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookmarkToggle(paper.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      paper.isSaved
                        ? "bg-amber-100 border-amber-300 text-amber-600 dark:bg-amber-950/60 dark:border-amber-700"
                        : "border-transparent text-muted-foreground/60 hover:text-foreground hover:bg-muted"
                    }`}
                    title={paper.isSaved ? "Saved" : "Save Paper"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${paper.isSaved ? "fill-current" : ""}`} />
                  </button>
                </div>

                <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {paper.subjectName}
                </h3>

                <div className="mt-2.5 space-y-1 text-xs text-muted-foreground">
                  <p className="truncate">
                    {paper.course} • {paper.branch}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 font-medium">
                    <span className="text-primary font-semibold">
                      {paper.examSeason} {paper.year}
                    </span>
                    <span>•</span>
                    <span>{paper.fileSize || "1.2 MB"}</span>
                    <span>•</span>
                    <span>{paper.downloadsCount || 0} downloads</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActivePreviewPaper(paper)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDirectDownload(paper)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PDF Viewer Modal */}
      {activePreviewPaper && (
        <PDFViewerModal
          paper={activePreviewPaper}
          isOpen={!!activePreviewPaper}
          onClose={() => setActivePreviewPaper(null)}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}

      {/* Contribute Paper Modal */}
      {isContributeOpen && (
        <ContributePaperModal
          isOpen={isContributeOpen}
          onClose={() => setIsContributeOpen(false)}
          onPaperAdded={fetchPapers}
        />
      )}
    </div>
  );
}
