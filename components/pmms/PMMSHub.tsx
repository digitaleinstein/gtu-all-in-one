"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  Circle,
  BookOpen,
  Download,
  FileText,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Info,
  Calendar,
  Save,
  Globe,
  Layers,
  Search,
} from "lucide-react";

export function PMMSHub() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"tracker" | "portal" | "canvas" | "psar">("tracker");
  const [milestones, setMilestones] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, progressPercent: 0 });
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const fetchPMMSData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pmms");
      if (res.ok) {
        const data = await res.json();
        setMilestones(data.milestones || []);
        setStats(data.stats || { total: 0, completed: 0, progressPercent: 0 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPMMSData();
  }, []);

  const handleToggleMilestone = async (milestoneKey: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      setMilestones((prev) =>
        prev.map((m) => (m.key === milestoneKey ? { ...m, isCompleted: newStatus } : m))
      );

      const res = await fetch("/api/pmms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestoneKey,
          isCompleted: newStatus,
        }),
      });

      if (res.ok) {
        fetchPMMSData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateNotes = async (milestoneKey: string, notes: string) => {
    try {
      setSavingKey(milestoneKey);
      await fetch("/api/pmms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestoneKey,
          notes,
        }),
      });
      setTimeout(() => setSavingKey(null), 800);
    } catch (e) {
      console.error(e);
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-purple-200 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>GTU PMMS (Project Monitoring and Mentoring System) Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Final Year Project & Mentoring Portal
          </h1>
          <p className="text-xs text-purple-100/80 max-w-xl">
            Streamlined assistance for GTU IDP / UDP projects: milestone tracking, periodic progress reports (PPR), Design Engineering canvases, and patent searches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://pmms.gtu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-purple-500 hover:bg-purple-600 text-white rounded-xl shadow-md transition-colors"
          >
            <span>Open pmms.gtu.ac.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Overall Project Milestone Progress
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground">
              {stats.completed} of {stats.total}
            </span>
            <span className="text-xs font-semibold text-primary">
              ({stats.progressPercent}% Completed)
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex-1 max-w-md">
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <div
              style={{ width: `${stats.progressPercent}%` }}
              className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 transition-all duration-500 rounded-full"
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Complete all Phase 1 and Phase 2 items before final university viva submission.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("tracker")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "tracker"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Milestone Checklist ({milestones.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("portal")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "portal"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Embedded Portal Viewer</span>
        </button>

        <button
          onClick={() => setActiveTab("canvas")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "canvas"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Design Canvases & Templates</span>
        </button>

        <button
          onClick={() => setActiveTab("psar")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "psar"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>PSAR Patent Search Guide</span>
        </button>
      </div>

      {/* Tab 1: Milestone Checklist */}
      {activeTab === "tracker" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {milestones.map((m, idx) => (
              <div
                key={m.key}
                className={`p-5 rounded-2xl border transition-all ${
                  m.isCompleted
                    ? "border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleMilestone(m.key, m.isCompleted)}
                      className="mt-0.5 p-1 rounded-lg hover:bg-muted transition-colors shrink-0 text-primary"
                      title={m.isCompleted ? "Mark incomplete" : "Mark completed"}
                    >
                      {m.isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
                      )}
                    </button>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                          {m.phase}
                        </span>
                        {m.isCompleted && (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            Completed ✓
                          </span>
                        )}
                      </div>

                      <h3 className={`font-bold text-sm ${m.isCompleted ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {m.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {m.description}
                      </p>

                      {/* Requirements List */}
                      {m.requirements && (
                        <div className="pt-2">
                          <p className="text-[11px] font-bold text-foreground mb-1">
                            Key Checklist Requirements:
                          </p>
                          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                            {m.requirements.map((r: string, rIdx: number) => (
                              <li key={rIdx}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-2 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                        <span className="font-bold">GTU Guideline:</span> {m.gtuGuidelines}
                      </div>
                    </div>
                  </div>

                  {/* Student Notes & Remarks */}
                  <div className="w-full md:w-72 shrink-0 space-y-1.5 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-muted-foreground">My Project Notes</span>
                      {savingKey === m.key && (
                        <span className="text-[10px] text-emerald-600 font-bold animate-pulse">
                          Saved!
                        </span>
                      )}
                    </div>
                    <textarea
                      defaultValue={m.notes}
                      onBlur={(e) => handleUpdateNotes(m.key, e.target.value)}
                      placeholder="Add team remarks, guide comments, or file links..."
                      rows={3}
                      className="w-full p-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Embedded Portal Viewer */}
      {activeTab === "portal" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-border bg-muted/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <span>
                Embedded view of <code className="font-mono text-foreground font-bold">pmms.gtu.ac.in</code>. If the GTU server restricts embedded iframes on your network, use the direct launcher button.
              </span>
            </div>
            <a
              href="https://pmms.gtu.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 flex items-center gap-1.5 shrink-0"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[650px] rounded-3xl border border-border bg-card overflow-hidden shadow-inner">
            <iframe
              src="https://pmms.gtu.ac.in"
              title="GTU PMMS Official Portal"
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Design Canvases & Templates */}
      {activeTab === "canvas" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AEIOU Canvas */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  Canvas 1
                </span>
                <span className="text-xs text-muted-foreground">Sem 7 Mandatory</span>
              </div>
              <h3 className="font-bold text-sm text-foreground">
                AEIOU Summary Canvas
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Covers Activities (what users do), Environments (where activities take place), Interactions (person-to-person/device), Objects (tools & devices), and Users (stakeholders).
              </p>
              <div className="p-3 rounded-xl bg-muted/40 text-xs font-mono text-muted-foreground space-y-1">
                <p>• Activities: User workflows & routines</p>
                <p>• Environments: Physical or digital atmosphere</p>
                <p>• Interactions: Touchpoints & communication</p>
                <p>• Objects: Hardware, software, instruments</p>
                <p>• Users: Primary, secondary & extreme personas</p>
              </div>
            </div>

            {/* Empathy Mapping Canvas */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Canvas 2
                </span>
                <span className="text-xs text-muted-foreground">Sem 7 Mandatory</span>
              </div>
              <h3 className="font-bold text-sm text-foreground">
                Empathy Mapping Canvas
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Deeply captures the user mindset: User Persona, What they Say, What they Do, What they Think, What they Feel, along with Pains and Gains.
              </p>
              <div className="p-3 rounded-xl bg-muted/40 text-xs font-mono text-muted-foreground space-y-1">
                <p>• User: Definition & role</p>
                <p>• Say & Do: Observed behaviors</p>
                <p>• Think & Feel: Emotions & anxieties</p>
                <p>• Pains: Frustrations & blockers</p>
                <p>• Gains: Goals & ideal outcomes</p>
              </div>
            </div>

            {/* Ideation Canvas */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Canvas 3
                </span>
                <span className="text-xs text-muted-foreground">Sem 7 Mandatory</span>
              </div>
              <h3 className="font-bold text-sm text-foreground">
                Ideation Canvas
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Brainstorming potential solution strategies, mapping people, activities, situations, and combining them into novel product propositions.
              </p>
              <div className="p-3 rounded-xl bg-muted/40 text-xs font-mono text-muted-foreground space-y-1">
                <p>• People: Target recipients</p>
                <p>• Activities: Key interventions</p>
                <p>• Situation / Context / Location</p>
                <p>• Props / Tools: Technology stack</p>
              </div>
            </div>

            {/* Product Development Canvas */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  Canvas 4
                </span>
                <span className="text-xs text-muted-foreground">Sem 7 & 8</span>
              </div>
              <h3 className="font-bold text-sm text-foreground">
                Product Development Canvas (PDC)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Converts validated concepts into technical engineering architecture, feature backlogs, component requirements, and MVP specifications.
              </p>
              <div className="p-3 rounded-xl bg-muted/40 text-xs font-mono text-muted-foreground space-y-1">
                <p>• Purpose: Vision & Problem Statement</p>
                <p>• Product Features: Core functionalities</p>
                <p>• Components & Architecture</p>
                <p>• Customer Revalidation & Feedback</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: PSAR Patent Search Guide */}
      {activeTab === "psar" && (
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-bold text-base text-foreground">
              Patent Search and Analysis Report (PSAR) Guidelines
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every GTU student in final year engineering must search and analyze at least 5 patented innovations related to their IDP/UDP project topic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://ipindiaservices.gov.in/publicsearch"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-border bg-muted/20 hover:border-primary transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">Indian Patent Office (IPO)</span>
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Search published Indian patent applications and granted patents.
              </p>
            </a>

            <a
              href="https://patents.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-border bg-muted/20 hover:border-primary transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">Google Patents</span>
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Worldwide search index with multi-language patent claims translation.
              </p>
            </a>

            <a
              href="https://patentscope.wipo.int"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-border bg-muted/20 hover:border-primary transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">WIPO PATENTSCOPE</span>
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-[11px] text-muted-foreground">
                International Patent System database covering PCT applications.
              </p>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1">
            <p className="font-bold">Important Plagiarism & Patent Rules:</p>
            <p>1. Do not copy patent claims word-for-word into your final project report.</p>
            <p>2. Final report similarity index must not exceed 30% on Turnitin/Urkund verification.</p>
            <p>3. Generate the PSAR summary certificate from PMMS portal and get it signed by your internal guide.</p>
          </div>
        </div>
      )}
    </div>
  );
}
