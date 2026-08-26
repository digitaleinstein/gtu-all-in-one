import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatTimeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(d);
}

// GTU Grading Scale and points
export const GTU_GRADE_POINTS: Record<string, number> = {
  AA: 10,
  AB: 9,
  BB: 8,
  BC: 7,
  CC: 6,
  CD: 5,
  DD: 4,
  FF: 0,
};

export const GTU_GRADE_RANGES: Record<string, { min: number; max: number; label: string; color: string }> = {
  AA: { min: 85, max: 100, label: "Outstanding (10.0)", color: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400" },
  AB: { min: 75, max: 84, label: "Excellent (9.0)", color: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400" },
  BB: { min: 65, max: 74, label: "Very Good (8.0)", color: "text-cyan-600 bg-cyan-50 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400" },
  BC: { min: 55, max: 64, label: "Good (7.0)", color: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400" },
  CC: { min: 45, max: 54, label: "Fair (6.0)", color: "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400" },
  CD: { min: 40, max: 44, label: "Average (5.0)", color: "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-400" },
  DD: { min: 35, max: 39, label: "Pass (4.0)", color: "text-slate-600 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-300" },
  FF: { min: 0, max: 34, label: "Fail (0.0)", color: "text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400" },
};

/**
 * Calculate GTU Equivalent Percentage from SPI/CPI
 * GTU Formula: Percentage = (SPI/CPI - 0.5) * 10
 */
export function calculateGTUPercentage(spiOrCpi: number): number {
  if (spiOrCpi <= 0) return 0;
  const percentage = (spiOrCpi - 0.5) * 10;
  return Math.max(0, Math.min(100, Math.round(percentage * 100) / 100));
}

/**
 * Calculate required marks in 70-mark GTU End Semester External Exam
 * GTU standard 100-mark component:
 * Theory = Midsem (30) + Internal/Continuous (20) + External GTU (70) -> Scaled or Direct (30+70 = 100 total for theory)
 * Or standard GTU scheme: E(70) + M(30) = 100 Theory Total.
 * Minimum Passing in E(70): 23 marks (33%).
 * Minimum Passing in M(30): 12 marks (40%).
 */
export function calculateRequiredEndSemMarks(
  midsemScore: number,
  totalMidsem: number = 30,
  internalScore: number = 20,
  totalInternal: number = 20,
  targetGradeKey: string = "AA"
): {
  requiredMarksOutOf70: number;
  isPossible: boolean;
  minPassMarks: number;
  targetTotalPercent: number;
  message: string;
} {
  const targetGrade = GTU_GRADE_RANGES[targetGradeKey] || GTU_GRADE_RANGES["AA"];
  const targetMinPercentage = targetGrade.min;

  // Midsem scaled to 30
  const normalizedMidsem = (midsemScore / (totalMidsem || 30)) * 30;
  // If internal is evaluated out of 20 or 50, let's normalize standard GTU 100 theory base: 30 midsem + 70 external
  // Target total out of 100 = targetMinPercentage
  const neededInTheoryTotal = targetMinPercentage;
  const requiredOutOf70 = Math.ceil(neededInTheoryTotal - normalizedMidsem);

  const minPassMarks = 23; // GTU 33% cutoff for 70 mark paper
  const finalNeeded = Math.max(minPassMarks, requiredOutOf70);

  if (finalNeeded > 70) {
    return {
      requiredMarksOutOf70: 70,
      isPossible: false,
      minPassMarks,
      targetTotalPercent: targetMinPercentage,
      message: `Target ${targetGradeKey} requires ${requiredOutOf70}/70, which exceeds max 70. Consider aiming for next achievable grade.`,
    };
  }

  return {
    requiredMarksOutOf70: Math.max(minPassMarks, finalNeeded),
    isPossible: true,
    minPassMarks,
    targetTotalPercent: targetMinPercentage,
    message: `You need at least ${Math.max(minPassMarks, finalNeeded)} / 70 in external GTU exam to secure ${targetGradeKey} grade.`,
  };
}

export function getCircularCategoryColor(category: string): { bg: string; text: string; border: string } {
  switch (category?.toLowerCase()) {
    case "examinations":
    case "exam":
      return { bg: "bg-rose-50 dark:bg-rose-950/40", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800" };
    case "timetables":
    case "timetable":
      return { bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" };
    case "academic":
      return { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" };
    case "scholarships":
      return { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800" };
    default:
      return { bg: "bg-purple-50 dark:bg-purple-950/40", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" };
  }
}
