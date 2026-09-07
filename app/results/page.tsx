import type { Metadata } from "next";
import { ResultsHub } from "@/components/results/ResultsHub";

export const metadata: Metadata = {
  title: "GTU Result Alerts & Live Watcher | Check GTU Results Online",
  description:
    "Track official GTU result declarations in real-time from result.gtu.ac.in. Subscribe by enrollment number, branch, or semester for instant browser push notifications and results alerts.",
  keywords: [
    "GTU Results",
    "GTU Result 2026",
    "GTU Result 2025",
    "result.gtu.ac.in",
    "check gtu result",
    "GTU Result alert",
    "GTU B.E. Result",
    "GTU Diploma Result",
    "GTU Rechecking Result",
    "GTU Grade History",
    "GTU Exam Result",
  ],
  alternates: {
    canonical: "/results",
  },
  openGraph: {
    title: "GTU Result Alerts & Live Watcher | GTU All In One",
    description: "Track official GTU result publications in real time with instant push notifications.",
    url: "https://gtu-all-in-one.vercel.app/results",
  },
};

export default function ResultsPage() {
  return <ResultsHub />;
}
