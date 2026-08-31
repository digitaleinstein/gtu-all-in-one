"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      await signIn("google", { callbackUrl: "/profile" });
    } catch (err) {
      setError("Failed to initialize Google Sign In.");
      setGoogleLoading(false);
    }
  };

  const handleDemoLogin = (email: string) => {
    setIdentifier(email);
    setPassword("gtu12345");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Sign In to GTU Portal
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Access your GTU student profile, result alerts &amp; study resources.
          </p>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-2xl space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1-Click Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3 px-4 rounded-2xl bg-background hover:bg-muted/80 text-foreground border border-border font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer disabled:opacity-60"
          >
            {googleLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Or sign in with GTU Credentials
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Enrollment Number or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 210120111001 or student@gtu.ac.in"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-2xl bg-background border border-border focus:ring-2 focus:ring-blue-500 font-medium outline-none"
                />
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-foreground">
                  Password
                </label>
                <span className="text-[11px] text-muted-foreground font-mono">Demo: gtu12345</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-2xl bg-background border border-border focus:ring-2 focus:ring-blue-500 font-mono outline-none"
                />
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-blue-500/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-3 border-t border-border/60 space-y-2">
            <span className="block text-[11px] font-bold text-muted-foreground text-center">
              ⚡ Instant 1-Tap Demo Logins
            </span>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <button
                type="button"
                onClick={() => handleDemoLogin("student@gtu.ac.in")}
                className="p-2 rounded-xl border border-border bg-muted/40 hover:bg-muted font-bold text-foreground text-center transition-all cursor-pointer"
              >
                Sem 5 CE
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("priya.patel@gtu.ac.in")}
                className="p-2 rounded-xl border border-border bg-muted/40 hover:bg-muted font-bold text-foreground text-center transition-all cursor-pointer"
              >
                Sem 3 IT
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("rahul.shah@gtu.ac.in")}
                className="p-2 rounded-xl border border-border bg-muted/40 hover:bg-muted font-bold text-foreground text-center transition-all cursor-pointer"
              >
                Sem 7 Mech
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Sign up with OTP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
