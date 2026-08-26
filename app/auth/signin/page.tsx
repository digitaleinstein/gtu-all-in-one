"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  GraduationCap,
  Key,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        identifier: identifier.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (email: string) => {
    setIdentifier(email);
    setPassword("gtu12345");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Sign In to GTU All In One
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your GTU Enrollment Number or Email to access your portal.
          </p>
        </div>

        {/* Form Card */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-xl space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Enrollment Number or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="210120111001 or student@gtu.ac.in"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-medium"
                />
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-foreground">
                  Password
                </label>
                <span className="text-[11px] text-muted-foreground">Default: gtu12345</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary font-mono"
                />
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? "Verifying..." : "Sign In to Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-3 border-t border-border/60 space-y-2">
            <span className="block text-[11px] font-bold text-muted-foreground text-center">
              Or Instant Demo Sign-In
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => handleDemoLogin("student@gtu.ac.in")}
                className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted font-semibold text-foreground text-center"
              >
                Sem 5 CE
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("priya.patel@gtu.ac.in")}
                className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted font-semibold text-foreground text-center"
              >
                Sem 3 IT
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("rahul.shah@gtu.ac.in")}
                className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted font-semibold text-foreground text-center"
              >
                Sem 7 ME
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
            Register Student Profile
          </Link>
        </p>
      </div>
    </div>
  );
}
