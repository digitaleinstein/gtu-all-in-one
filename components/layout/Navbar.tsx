"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  GraduationCap,
  FileText,
  Bell,
  Newspaper,
  FolderGit2,
  Calculator,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationDropdown } from "./NotificationDropdown";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/papers", label: "Papers Hub", icon: FileText },
    { href: "/materials", label: "Study Material", icon: BookOpen },
    { href: "/results", label: "Result Alerts", icon: Bell },
    { href: "/circulars", label: "Circulars", icon: Newspaper },
    { href: "/pmms", label: "PMMS Portal", icon: FolderGit2 },
    { href: "/midsem", label: "Midsem & SPI", icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          {/* Logo Area */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent whitespace-nowrap">
                    GTU All In One
                  </span>
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 bg-primary/10 text-primary font-bold rounded-md whitespace-nowrap">
                    PRO
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] text-muted-foreground font-medium truncate max-w-[180px]">
                  Gujarat Technological University
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <NotificationDropdown />
            <ThemeToggle />

            {/* Auth / Profile Area */}
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 sm:pl-2 rounded-xl border border-border bg-card/60 hover:bg-accent/60 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center uppercase shrink-0">
                    {(session.user.name || "GTU")[0]}
                  </div>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground truncate max-w-[110px]">
                      {session.user.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {(session.user as any).enrollmentNo || "Student"}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block mr-1" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-border/60 mb-1">
                      <p className="text-xs font-bold text-foreground truncate">
                        {session.user.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {(session.user as any).enrollmentNo || session.user.email}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-primary font-medium">
                        <span>{(session.user as any).course || "BE"}</span>
                        <span>•</span>
                        <span>Sem {(session.user as any).semester || 5}</span>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-accent transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>Student Profile</span>
                    </Link>

                    <Link
                      href="/midsem"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground hover:bg-accent transition-colors"
                    >
                      <Calculator className="w-4 h-4 text-muted-foreground" />
                      <span>My Marks & SPI</span>
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors mt-1 border-t border-border/40"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <Link
                  href="/auth/signin"
                  className="px-3.5 py-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-border bg-card text-foreground hover:bg-accent transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* If logged in, show student summary header */}
            {session?.user && (
              <div className="p-3 mb-2 rounded-2xl bg-card border border-border/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center uppercase">
                    {(session.user.name || "GTU")[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{session.user.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {(session.user as any).enrollmentNo || session.user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-primary text-primary-foreground"
                >
                  Profile
                </Link>
              </div>
            )}

            {/* Nav Links */}
            <div className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground font-bold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Auth action on mobile */}
            <div className="pt-2 border-t border-border/60">
              {session?.user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/auth/signin" });
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl border border-border text-foreground hover:bg-accent transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
