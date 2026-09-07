import type { Metadata } from "next";
import { PapersHub } from "@/components/papers/PapersHub";

export const metadata: Metadata = {
  title: "GTU Question Papers (PYQs) | Download GTU Old Papers",
  description:
    "Browse, preview, and download authentic Gujarat Technological University previous year question papers (PYQs) for B.E., Diploma, M.E., MBA, MCA, and B.Pharm with subject codes.",
  keywords: [
    "GTU Question Papers",
    "GTU PYQ",
    "GTU Old Papers",
    "GTU Papers Download",
    "GTU Previous Year Papers",
    "GTU Engineering Papers",
    "GTU Diploma Papers",
    "GTU Exam Papers",
    "GTU Solution",
  ],
  alternates: {
    canonical: "/papers",
  },
  openGraph: {
    title: "GTU Question Papers (PYQs) | GTU All In One",
    description: "Browse, preview, and download authentic Gujarat Technological University previous year question papers.",
    url: "https://gtu-all-in-one.vercel.app/papers",
  },
};

export default function PapersPage() {
  return <PapersHub />;
}
