"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  Award,
  Bell,
  FileText,
  Calculator,
  Compass,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const gtuFaqs: FAQItem[] = [
  {
    question: "How do I check my GTU Exam Results online?",
    answer:
      "You can check your GTU exam results by entering your 12-digit enrollment number and exam session on the official portal result.gtu.ac.in or by setting up automated browser push alerts on GTU All In One so you are notified the minute your branch or semester result is published.",
  },
  {
    question: "Where can I download GTU Previous Year Question Papers (PYQs)?",
    answer:
      "GTU All In One hosts a comprehensive catalog of GTU previous year question papers for B.E., Diploma, M.E., MBA, MCA, and B.Pharm spanning Summer and Winter examination sessions from 2020 to 2026. You can search by subject code (e.g., 3150703) to instantly preview or download papers.",
  },
  {
    question: "What is the official GTU percentage conversion formula from SPI / CPI?",
    answer:
      "The official Gujarat Technological University formula to convert SPI or CPI into percentage is: Percentage (%) = (SPI / CPI - 0.5) * 10. For example, a CPI of 8.0 equals (8.0 - 0.5) * 10 = 75.0%.",
  },
  {
    question: "What are the passing marks for GTU 70-mark external exams?",
    answer:
      "Students must secure a minimum of 23 marks out of 70 (33%) in the university external end-semester theory exam, and at least 12 marks out of 30 (40%) in the internal/midsem exam to successfully pass the subject.",
  },
  {
    question: "What is GTU PMMS and what documents must students submit?",
    answer:
      "GTU PMMS (Project Monitoring and Mentoring System at pmms.gtu.ac.in) tracks IDP/UDP capstone projects for 7th and 8th semester engineering students. Submissions include Team Registration, Project Title Approval, Periodic Progress Reports (PPR-1 to PPR-4), Design Engineering Canvas (DEC), Business Model Canvas (BMC), Patent Search & Analysis Report (PSAR), and Plagiarism Clearance.",
  },
  {
    question: "How do GTU 100 Activity Points work for Bachelor of Engineering (B.E.)?",
    answer:
      "Regular 4-year B.E. students must earn at least 100 Activity Points (75 points for Diploma-to-Degree D2D students) through sports, cultural activities, NSS, community outreach, technical paper presentations, hackathons, and certified MOOC courses (NPTEL/Coursera) to receive their degree certificate.",
  },
];

export function GtuSeoGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="space-y-8 pt-4 border-t border-border/60">
      {/* Search Engine Optimized Knowledge Hub */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-xs">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official GTU Academic & Student Knowledge Base</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            Gujarat Technological University (GTU) Student Companion
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Welcome to GTU All In One, the premier digital portal designed for over 400,000 students enrolled across 400+ engineering, pharmacy, polytechnic, and management colleges affiliated with Gujarat Technological University.
          </p>
        </div>

        {/* 6 Key Student Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/results"
            className="p-4 rounded-2xl border border-border/80 bg-background/50 hover:bg-background hover:border-primary/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
              <span>GTU Results & Notifications</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Track live result declarations on result.gtu.ac.in and receive instant push notifications to your mobile and PC.
            </p>
          </Link>

          <Link
            href="/papers"
            className="p-4 rounded-2xl border border-border/80 bg-background/50 hover:bg-background hover:border-primary/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
              <span>GTU Question Papers (PYQs)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Download previous year question papers for B.E., Diploma, M.E., MBA, and MCA for Summer and Winter exams.
            </p>
          </Link>

          <Link
            href="/circulars"
            className="p-4 rounded-2xl border border-border/80 bg-background/50 hover:bg-background hover:border-primary/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
              <span>Official GTU Circulars</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Real-time feed of exam timetables, academic circulars, MYSY scholarships, and hall ticket announcements from gtu.ac.in.
            </p>
          </Link>

          <Link
            href="/materials"
            className="p-4 rounded-2xl border border-border/80 bg-background/50 hover:bg-background hover:border-primary/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
              <span>Darshan Study Materials</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Curated lecture notes, chapter-wise PPTs, question banks, and practical laboratory manuals for GTU engineering.
            </p>
          </Link>

          <Link
            href="/pmms"
            className="p-4 rounded-2xl border border-border/80 bg-background/50 hover:bg-background hover:border-primary/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
              <span>GTU PMMS Mentoring Hub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Complete guidance for IDP/UDP submissions, Periodic Progress Reports (PPR), BMC/DEC canvases, and PSAR patent reviews.
            </p>
          </Link>

          <Link
            href="/midsem"
            className="p-4 rounded-2xl border border-border/80 bg-background/50 hover:bg-background hover:border-primary/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
              <span>SPI/CPI & Cutoff Calculator</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Calculate external 70-mark target scores to achieve your target SPI and convert your marks using official GTU rules.
            </p>
          </Link>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) with Schema.org optimization */}
      <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Frequently Asked Questions about GTU (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {gtuFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/70 bg-background/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
