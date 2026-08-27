"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Filter,
  GraduationCap,
  Layers,
  FileText,
  Presentation,
  Download,
  ExternalLink,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  BookMarked,
  RefreshCw,
  FolderGit2,
  SlidersHorizontal,
  Flame,
  X,
} from "lucide-react";
import { GTUStudyMaterial, STUDY_DEPARTMENTS, RESOURCE_TYPES } from "@/lib/study-materials-data";
import { MaterialModal } from "./MaterialModal";

export function StudyMaterialHub() {
  const [materials, setMaterials] = useState<GTUStudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedSem, setSelectedSem] = useState<number | "All">("All");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedMaterial, setSelectedMaterial] = useState<GTUStudyMaterial | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);

  // Load initial materials and saved bookmarks & check URL params
  useEffect(() => {
    async function loadMaterials() {
      try {
        setLoading(true);
        const res = await fetch("/api/materials");
        if (res.ok) {
          const data = await res.json();
          setMaterials(data.materials || []);
        }
      } catch (err) {
        console.error("Failed to load study materials:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMaterials();

    // Read URL query params
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const semParam = params.get("sem") || params.get("semester");
      if (semParam) {
        if (semParam.toLowerCase() === "all") {
          setSelectedSem("All");
        } else {
          const parsed = parseInt(semParam, 10);
          if (!isNaN(parsed) && parsed >= 1 && parsed <= 8) {
            setSelectedSem(parsed);
          }
        }
      }

      const deptParam = params.get("dept") || params.get("department");
      if (deptParam) {
        setSelectedDept(deptParam);
      }

      // Local storage bookmarks
      const stored = localStorage.getItem("gtu_saved_materials");
      if (stored) {
        try {
          setSavedIds(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("gtu_saved_materials", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const departmentPills = [
    { label: "All Departments", icon: Layers },
    { label: "Computer Engineering", icon: GraduationCap },
    { label: "Civil Engineering", icon: GraduationCap },
    { label: "Mechanical Engineering", icon: GraduationCap },
    { label: "Electrical Engineering", icon: GraduationCap },
    { label: "Diploma Engineering", icon: GraduationCap },
  ];

  // Available semester tabs
  const semesterTabs: (number | "All")[] = useMemo(() => {
    if (selectedDept === "Diploma Engineering") {
      return ["All", 1, 2, 3, 4, 5, 6];
    }
    return ["All", 1, 2, 3, 4, 5, 6, 7, 8];
  }, [selectedDept]);

  // Main Filter Logic: Every filter is strictly combined
  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      // 1. Saved Filter
      if (onlySaved && !savedIds.includes(item.id)) return false;

      // 2. Department Filter
      if (selectedDept !== "All Departments") {
        if (selectedDept === "Diploma Engineering") {
          if (item.degree !== "Diploma" && !item.department.toLowerCase().includes("diploma")) {
            return false;
          }
        } else {
          if (!item.department.toLowerCase().includes(selectedDept.toLowerCase())) {
            return false;
          }
        }
      }

      // 3. Semester Filter (Numeric comparison guaranteed)
      if (selectedSem !== "All") {
        if (Number(item.semester) !== Number(selectedSem)) {
          return false;
        }
      }

      // 4. Resource Type Filter
      if (selectedType !== "All Types") {
        if (!item.resourceTypes.some((r) => r.toLowerCase().includes(selectedType.toLowerCase()))) {
          return false;
        }
      }

      // 5. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = item.subjectCode.toLowerCase().includes(q);
        const matchesName = item.subjectName.toLowerCase().includes(q);
        const matchesDept = item.department.toLowerCase().includes(q);
        const matchesUnits = item.units.some((u) => u.title.toLowerCase().includes(q));
        if (!matchesCode && !matchesName && !matchesDept && !matchesUnits) return false;
      }

      return true;
    });
  }, [materials, selectedDept, selectedSem, selectedType, searchQuery, onlySaved, savedIds]);

  // Semester Counts for the current department filter
  const semesterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Filter base by department & search to compute per-semester badges
    const baseList = materials.filter((item) => {
      if (onlySaved && !savedIds.includes(item.id)) return false;
      if (selectedDept !== "All Departments") {
        if (selectedDept === "Diploma Engineering") {
          if (item.degree !== "Diploma" && !item.department.toLowerCase().includes("diploma")) return false;
        } else {
          if (!item.department.toLowerCase().includes(selectedDept.toLowerCase())) return false;
        }
      }
      return true;
    });

    counts["All"] = baseList.length;
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((s) => {
      counts[s] = baseList.filter((m) => Number(m.semester) === s).length;
    });
    return counts;
  }, [materials, selectedDept, onlySaved, savedIds]);

  const resetFilters = () => {
    setSelectedDept("All Departments");
    setSelectedSem("All");
    setSelectedType("All Types");
    setSearchQuery("");
    setOnlySaved(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-blue-600/5 via-indigo-600/5 to-transparent pt-12 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by Darshan University & GTU Open Library</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GTU Study Material Hub
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Access 160+ curated GTU subjects with chapter-wise <strong>e-Notes (PDFs)</strong>, <strong>PowerPoint Presentations</strong>, <strong>Solved GTU Paper Solutions</strong>, and <strong>Laboratory Practical Manuals</strong> organized semester by semester.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-3 self-start md:self-center shrink-0">
              <div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-primary">{materials.length || 169}+</span>
                <p className="text-[11px] font-medium text-muted-foreground mt-0.5">GTU Subjects</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">8</span>
                <p className="text-[11px] font-medium text-muted-foreground mt-0.5">Semesters</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</span>
                <p className="text-[11px] font-medium text-muted-foreground mt-0.5">Free Access</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-3xl pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Subject Code (e.g. 3150703, 3110003), Subject Name (ADA, PPS, Maths), or Unit Topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 text-sm rounded-2xl bg-card border border-border shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content & Interactive Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* ========================================================================= */}
        {/* FILTER 1: DEPARTMENT SELECTION */}
        {/* ========================================================================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Step 1: Select Department / Discipline
            </span>
            {savedIds.length > 0 && (
              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  onlySaved
                    ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>My Bookmarks ({savedIds.length})</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {departmentPills.map((dept) => {
              const Icon = dept.icon;
              const isSelected = selectedDept === dept.label;
              return (
                <button
                  key={dept.label}
                  onClick={() => {
                    setSelectedDept(dept.label);
                    if (dept.label === "Diploma Engineering" && typeof selectedSem === "number" && selectedSem > 6) {
                      setSelectedSem("All");
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                      : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{dept.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILTER 2: SEMESTER SELECTION (PROMINENT TABS + SELECT) */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-3xl bg-card border border-border/80 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Step 2: Select Semester
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Quick Dropdown:</span>
              <select
                value={selectedSem}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedSem(val === "All" ? "All" : parseInt(val, 10));
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-background border border-border text-foreground focus:border-primary outline-none"
              >
                <option value="All">All Semesters ({semesterCounts["All"] || 0} subjects)</option>
                {semesterTabs.filter((s) => s !== "All").map((s) => (
                  <option key={s} value={s}>
                    Semester {s} ({semesterCounts[s] || 0} subjects)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Semester Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {semesterTabs.map((sem) => {
              const isSelected = selectedSem === sem;
              const count = semesterCounts[sem] ?? 0;
              return (
                <button
                  key={sem}
                  onClick={() => setSelectedSem(sem)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-2xl transition-all shrink-0 ${
                    isSelected
                      ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400 scale-[1.04]"
                      : "bg-muted/70 hover:bg-muted text-foreground border border-border/70 hover:border-border"
                  }`}
                >
                  <span>{sem === "All" ? "All Semesters" : `Semester ${sem}`}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isSelected
                        ? "bg-white/25 text-white font-black"
                        : "bg-background text-muted-foreground border border-border/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Notification & Resource Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-muted/40 border border-border/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Active Filter:</span>
            
            {/* Department chip */}
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-card border border-border text-foreground">
              {selectedDept}
            </span>

            {/* Semester chip */}
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
              selectedSem === "All"
                ? "bg-card border border-border text-foreground"
                : "bg-blue-600 text-white shadow-sm font-black"
            }`}>
              {selectedSem === "All" ? "All Semesters" : `Semester ${selectedSem}`}
            </span>

            {/* Resource Type Dropdown */}
            <div className="inline-flex items-center gap-1.5 ml-2">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-card border border-border text-foreground focus:border-primary outline-none"
              >
                {RESOURCE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            <span className="text-xs font-semibold text-muted-foreground">
              Showing <strong className="text-foreground text-sm font-black">{filteredMaterials.length}</strong> subjects
            </span>

            {(selectedDept !== "All Departments" ||
              selectedSem !== "All" ||
              selectedType !== "All Types" ||
              searchQuery ||
              onlySaved) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-card border border-border hover:bg-muted text-foreground transition-all"
                title="Reset all filters"
              >
                <X className="w-3.5 h-3.5 text-rose-500" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Subject Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-3xl bg-card border border-border/60 animate-pulse"
              />
            ))}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="text-center py-16 px-4 border border-dashed border-border rounded-3xl bg-card/40 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">
                No Study Materials Found for Semester {selectedSem}
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No subjects matched your selected department &quot;{selectedDept}&quot; and semester &quot;{selectedSem}&quot;.
              </p>
            </div>
            <button
              onClick={() => setSelectedSem("All")}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
            >
              Show All Semesters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((sub) => {
              const isSaved = savedIds.includes(sub.id);
              return (
                <div
                  key={sub.id}
                  className="group relative flex flex-col justify-between p-5 rounded-3xl bg-card border border-border/80 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Top Badges */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-primary/10 text-primary rounded-lg">
                          {sub.subjectCode}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-black bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow-sm">
                          Semester {sub.semester}
                        </span>
                        <span className="px-2 py-0.5 text-[11px] font-semibold bg-secondary text-secondary-foreground rounded-lg">
                          {sub.degree}
                        </span>
                      </div>

                      {/* Bookmark Icon */}
                      <button
                        onClick={() => toggleSave(sub.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isSaved
                            ? "bg-amber-500/15 border-amber-500/30 text-amber-500"
                            : "bg-background border-border/60 text-muted-foreground hover:text-foreground"
                        }`}
                        title={isSaved ? "Remove from bookmarks" : "Bookmark subject"}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Subject Title & Dept */}
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {sub.subjectName}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        {sub.department}
                      </p>
                    </div>

                    {/* Resource Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {sub.resourceTypes.map((type, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-background border border-border/70 text-muted-foreground"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-5 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedMaterial(sub)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Explore Material ({sub.units.length} Units)</span>
                    </button>

                    <a
                      href={sub.darshanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      title="Open on Darshan University"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Material Modal */}
      {selectedMaterial && (
        <MaterialModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          isSaved={savedIds.includes(selectedMaterial.id)}
          onToggleSave={toggleSave}
        />
      )}
    </div>
  );
}
