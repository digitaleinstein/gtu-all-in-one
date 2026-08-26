"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FileText,
  Bell,
  Newspaper,
  FolderGit2,
  Calculator,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { formatTimeAgo, formatDate, getCircularCategoryColor } from "@/lib/utils";

export function DashboardOverview() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCirculars, setRecentCirculars] = useState<any[]>([]);
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [circRes, resRes] = await Promise.all([
          fetch("/api/circulars?limit=5"),
          fetch("/api/results?action=declared"),
        ]);
        if (circRes.ok) {
          const circData = await circRes.json();
          setRecentCirculars(circData.circulars || []);
        }
        if (resRes.ok) {
          const resData = await resRes.json();
          setRecentResults(resData.results || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const studentName = session?.user?.name || "GTU Scholar";
  const enrollmentNo = (session?.user as any)?.enrollmentNo || "210120111001";
  const branch = (session?.user as any)?.branch || "Computer Engineering";
  const semester = (session?.user as any)?.semester || 5;
  const course = (session?.user as any)?.course || "BE";
  const college = (session?.user as any)?.college || "L.D. College of Engineering, Ahmedabad";

  const coreModules = [
    {
      title: "Papers Hub (PYQs)",
      description: "Search, filter & preview 100+ GTU question papers from Summer 2020 to Summer 2024 with direct PDF downloads.",
      icon: FileText,
      href: "/papers",
      color: "from-blue-600 to-cyan-600",
      badge: "Summer 2024 Live",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      title: "Result Alerts & Watcher",
      description: "Get instant push notifications and email alerts the second your semester or remedial results are published.",
      icon: Bell,
      href: "/results",
      color: "from-emerald-600 to-teal-600",
      badge: "Real-time Watcher",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      title: "Circulars News Feed",
      description: "Live scraped official GTU notices categorized by Exams, Timetables, Academic Calendars & Scholarships.",
      icon: Newspaper,
      href: "/circulars",
      color: "from-amber-600 to-orange-600",
      badge: "Live Feed",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      title: "PMMS Project Hub",
      description: "Embedded pmms.gtu.ac.in portal viewer, milestone checklists, PPR templates, and Design Engineering canvases.",
      icon: FolderGit2,
      href: "/pmms",
      color: "from-purple-600 to-indigo-600",
      badge: "Sem 7 & 8 IDP/UDP",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    },
    {
      title: "Midsem & SPI Calculator",
      description: "Calculate required marks in 70-mark GTU external exam to secure AA/AB grades with GTU percentage formulas.",
      icon: Calculator,
      href: "/midsem",
      color: "from-rose-600 to-pink-600",
      badge: "Formula (SPI-0.5)*10",
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
    },
    {
      title: "Student Profile & Alerts",
      description: "Customize your branch, semester, web push notification subscriptions, and academic gradebook settings.",
      icon: ShieldCheck,
      href: "/profile",
      color: "from-slate-700 to-zinc-800 dark:from-slate-800 dark:to-zinc-900",
      badge: "Customizable",
      badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-semibold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>GTU Academic Year 2024-25 Companion</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-200 to-indigo-200">{studentName}</span>
            </h1>
            <p className="text-sm text-blue-100/80 leading-relaxed">
              {course} {branch} • Semester {semester} • {college}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/10">
                Enrollment: {enrollmentNo}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-sans font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Result Watcher Active
              </span>
            </div>
          </div>

          {/* Quick Stats / Action */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-5 shrink-0 flex flex-col gap-3 min-w-[240px]">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              Quick PYQ Search
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/papers?search=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Subject code (e.g. 3150703)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-black/30 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="w-4 h-4 text-blue-200/60 absolute left-3 top-2.5" />
            </form>
            <div className="flex items-center justify-between text-[11px] text-blue-200/80 pt-1">
              <Link href="/papers" className="hover:text-white underline">
                Browse all papers →
              </Link>
              <Link href="/midsem" className="hover:text-white underline">
                Check SPI →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Live Notice Ticker Banner */}
      {recentCirculars.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 shadow-sm">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-xs shrink-0 shadow-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>LATEST GTU NOTICE</span>
          </div>
          <div className="flex-1 truncate text-xs font-medium">
            <Link
              href={`/circulars`}
              className="hover:underline flex items-center gap-2 truncate"
            >
              <span className="truncate">{recentCirculars[0].title}</span>
              <span className="text-[10px] text-muted-foreground shrink-0">
                ({formatDate(recentCirculars[0].publishedDate)})
              </span>
            </Link>
          </div>
          <Link
            href="/circulars"
            className="text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline shrink-0 hidden sm:block"
          >
            View All →
          </Link>
        </div>
      )}

      {/* Core Navigation Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Core Student Modules
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Everything you need for GTU examinations, results, internal marks, and projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.title}
                href={module.href}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${module.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${module.badgeColor}`}
                    >
                      {module.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {module.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Open Module</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two-Column Section: Declared Results & Recent Circulars Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Declared Results Watcher */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    Live Result Watcher
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Recently declared university results from GTU portal
                  </p>
                </div>
              </div>
              <Link
                href="/results"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Configure Alerts →
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentResults.slice(0, 4).map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">
                      {r.examTitle}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                      <span className="px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px]">
                        {r.course} Sem {r.semester}
                      </span>
                      <span>•</span>
                      <span>Declared {formatDate(r.declaredDate)}</span>
                    </div>
                  </div>
                  <Link
                    href={`/results?tab=checker&course=${r.course}&sem=${r.semester}`}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Check Grade</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Tracking active for {course} {branch}</span>
            <Link href="/results?tab=subscriptions" className="text-primary font-medium hover:underline">
              Manage Subscriptions
            </Link>
          </div>
        </div>

        {/* Recent Official GTU Circulars */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    Latest Circulars & Notices
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Official GTU examination, academic and scholarship orders
                  </p>
                </div>
              </div>
              <Link
                href="/circulars"
                className="text-xs font-semibold text-primary hover:underline"
              >
                All Circulars →
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentCirculars.slice(0, 4).map((c) => {
                const badgeStyle = getCircularCategoryColor(c.category);
                return (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                      >
                        {c.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {formatTimeAgo(c.publishedDate)}
                      </span>
                    </div>
                    <Link
                      href="/circulars"
                      className="block text-xs font-semibold text-foreground hover:text-primary transition-colors mt-1.5 line-clamp-2"
                    >
                      {c.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Auto-scraped from gtu.ac.in
            </span>
            <Link href="/circulars" className="text-primary font-medium hover:underline">
              Search Circulars
            </Link>
          </div>
        </div>
      </div>

      {/* GTU Formula & Student Quick Reference Box */}
      <div className="rounded-3xl border border-border bg-muted/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              GTU Percentage Formula
            </span>
            <p className="text-sm font-semibold text-foreground">
              Percentage (%) = (SPI / CPI - 0.5) × 10
            </p>
            <p className="text-xs text-muted-foreground">
              Official GTU conversion rule for university marksheets and employment.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              GTU Theory Passing Cutoff
            </span>
            <p className="text-sm font-semibold text-foreground">
              Min 23 / 70 (External) & 12 / 30 (Midsem)
            </p>
            <p className="text-xs text-muted-foreground">
              Students must secure at least 33% in 70-mark paper and 40% in Midsem.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              100 Activity Points Rule
            </span>
            <p className="text-sm font-semibold text-foreground">
              Mandatory 100 Points for B.E. Degree
            </p>
            <p className="text-xs text-muted-foreground">
              Complete NSS, sports, MOOC certifications & tech fest submissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
