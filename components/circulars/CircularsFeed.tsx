"use client";

import React, { useState, useEffect } from "react";
import {
  Newspaper,
  Search,
  Filter,
  RefreshCw,
  Pin,
  ExternalLink,
  Download,
  Calendar,
  FileText,
  Eye,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bell,
} from "lucide-react";
import { formatDate, formatTimeAgo, getCircularCategoryColor } from "@/lib/utils";
import { downloadGTUFile } from "@/lib/download-helper";
import { CircularDetailModal } from "./CircularDetailModal";
import { CircularSubscriptionModal } from "./CircularSubscriptionModal";

const CATEGORIES = [
  "ALL",
  "Examinations",
  "Timetables",
  "Academic",
  "Scholarships",
  "General",
];

export function CircularsFeed() {
  const [circulars, setCirculars] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const [activeModalCircular, setActiveModalCircular] = useState<any | null>(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const fetchCirculars = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== "ALL") params.append("category", selectedCategory);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      const res = await fetch(`/api/circulars?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setCirculars(data.circulars || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCirculars();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCirculars();
  };

  const handleSyncWithGTU = async () => {
    try {
      setSyncing(true);
      setSyncMessage("");
      const res = await fetch("/api/circulars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync" }),
      });
      if (res.ok) {
        const data = await res.json();
        setSyncMessage(`Feed refreshed with latest GTU updates! (${data.newCircularsCount || 0} new notices)`);
        fetchCirculars();
        setTimeout(() => setSyncMessage(""), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const pinnedCirculars = circulars.filter((c) => c.isPinned);
  const regularCirculars = circulars.filter((c) => !c.isPinned);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-orange-950 to-slate-950 text-white shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-200 text-xs font-semibold">
            <Newspaper className="w-3.5 h-3.5" />
            <span>GTU Official Circulars & Notices</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Live University News Feed
          </h1>
          <p className="text-xs text-amber-100/80 max-w-xl">
            Real-time feed aggregating examination orders, timetable schedules, academic calendars, and scholarship verification updates.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsSubModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-md cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alert Choices</span>
          </button>

          <button
            onClick={handleSyncWithGTU}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Scraping..." : "Sync Feed"}</span>
          </button>
        </div>
      </div>

      {syncMessage && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {cat === "ALL" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 min-w-[260px]">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary"
            />
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5" />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:bg-primary/90"
          >
            Search
          </button>
        </form>
      </div>

      {/* Circulars List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : circulars.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-3xl border border-dashed border-border bg-card/40">
          <Newspaper className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
          <h3 className="font-bold text-base text-foreground">No Circulars Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Try choosing another category or click &quot;Sync Official Feed&quot; to fetch the latest GTU announcements.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Pinned Circulars Spotlight */}
          {pinnedCirculars.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Pin className="w-3.5 h-3.5 fill-current rotate-45" />
                <span>Pinned & Important Notices</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pinnedCirculars.map((c) => {
                  const badge = getCircularCategoryColor(c.category);
                  return (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl border-2 border-amber-500/40 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-500 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {c.category}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {formatTimeAgo(c.publishedDate)}
                          </span>
                        </div>

                        <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 leading-snug">
                          {c.title}
                        </h3>

                        {c.gtuRefNo && (
                          <p className="text-[10px] font-mono text-muted-foreground mt-1">
                            Ref: {c.gtuRefNo}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveModalCircular(c)}
                          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview Notice</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const safeName = `GTU_Circular_${c.gtuRefNo ? c.gtuRefNo.replace(/[^a-zA-Z0-9_-]/g, "_") : c.id}.pdf`;
                            downloadGTUFile(c.pdfUrl, safeName, "application/pdf");
                          }}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <span>PDF</span>
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular Circulars */}
          <div className="space-y-2 pt-2">
            <span className="px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Recent Announcements
            </span>

            <div className="divide-y divide-border/60 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              {regularCirculars.map((c) => {
                const badge = getCircularCategoryColor(c.category);
                return (
                  <div
                    key={c.id}
                    className="p-4 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {c.category}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(c.publishedDate)}
                        </span>
                        {c.gtuRefNo && (
                          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                            • {c.gtuRefNo}
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => setActiveModalCircular(c)}
                        className="font-semibold text-xs sm:text-sm text-foreground hover:text-primary cursor-pointer transition-colors leading-snug"
                      >
                        {c.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setActiveModalCircular(c)}
                        className="px-3 py-1.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span>Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const safeName = `GTU_Circular_${c.gtuRefNo ? c.gtuRefNo.replace(/[^a-zA-Z0-9_-]/g, "_") : c.id}.pdf`;
                          downloadGTUFile(c.pdfUrl, safeName, "application/pdf");
                        }}
                        className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Circular Detail Modal */}
      {activeModalCircular && (
        <CircularDetailModal
          circular={activeModalCircular}
          isOpen={!!activeModalCircular}
          onClose={() => setActiveModalCircular(null)}
        />
      )}

      {/* Circular Subscription & Alert Choices Modal */}
      <CircularSubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        onSubscribed={() => fetchCirculars()}
      />
    </div>
  );
}
