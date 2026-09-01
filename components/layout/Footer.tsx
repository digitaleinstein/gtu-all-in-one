"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ExternalLink, ShieldCheck, Heart, Sparkles } from "lucide-react";

export function Footer() {
  const gtuOfficialLinks = [
    { label: "GTU Official Website", url: "https://www.gtu.ac.in" },
    { label: "GTU Result Portal", url: "https://result.gtu.ac.in" },
    { label: "Darshan Univ Study Material", url: "https://www.darshan.ac.in/gtu-study-material" },
    { label: "GTU PMMS Portal", url: "https://pmms.gtu.ac.in" },
    { label: "100 Activity Points Portal", url: "https://gtuactivity.nic.in" },
    { label: "GTU Circulars Archive", url: "https://www.gtu.ac.in/Circular.aspx" },
    { label: "GTU Exam Time Table", url: "https://timetable.gtu.ac.in" },
  ];

  return (
    <footer className="border-t border-border/80 bg-card/40 mt-16 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-foreground text-sm tracking-tight">
                GTU All In One
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The unified, intelligent student companion for Gujarat Technological University (GTU) students.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>GTU Live Scraper & Watcher Online</span>
            </div>
          </div>

          {/* Quick Modules */}
          <div>
            <p className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">
              Core Modules
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/papers" className="hover:text-primary transition-colors">
                  Previous Question Papers (PYQs)
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-primary transition-colors">
                  Study Material & e-Notes (Darshan Univ)
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-primary transition-colors">
                  Result Watcher & Push Alerts
                </Link>
              </li>
              <li>
                <Link href="/circulars" className="hover:text-primary transition-colors">
                  Live Official Circulars Feed
                </Link>
              </li>
              <li>
                <Link href="/pmms" className="hover:text-primary transition-colors">
                  PMMS Project Mentoring Hub
                </Link>
              </li>
              <li>
                <Link href="/midsem" className="hover:text-primary transition-colors">
                  Midsem Marks & SPI/CPI Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Official GTU Portals */}
          <div>
            <p className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">
              Official GTU Portals
            </p>
            <ul className="space-y-2">
              {gtuOfficialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guidelines & Tools */}
          <div>
            <p className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider">
              Student Resources
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/midsem" className="hover:text-primary transition-colors">
                  70-Mark GTU External Target Calculator
                </Link>
              </li>
              <li>
                <Link href="/pmms" className="hover:text-primary transition-colors">
                  Design Engineering Canvas Templates
                </Link>
              </li>
              <li>
                <Link href="/pmms" className="hover:text-primary transition-colors">
                  PSAR Patent Search Guidelines
                </Link>
              </li>
              <li>
                <Link href="/circulars" className="hover:text-primary transition-colors">
                  MYSY Scholarship Notifications
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} GTU All In One. Crafted for GTU Engineers &amp; Scholars across Gujarat.</p>
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <span>Developed by</span>
            <span className="font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
              Dhrumil Prajapati
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
