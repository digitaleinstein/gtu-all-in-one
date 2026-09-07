import type { Metadata } from "next";
import { PMMSHub } from "@/components/pmms/PMMSHub";

export const metadata: Metadata = {
  title: "GTU PMMS Project Portal & Mentoring Hub | pmms.gtu.ac.in",
  description:
    "Unified companion for Gujarat Technological University PMMS: IDP/UDP milestone tracker, Periodic Progress Reports (PPR), Design Engineering Canvases, and PSAR patent guidelines.",
  keywords: [
    "GTU PMMS",
    "pmms.gtu.ac.in",
    "GTU Project Mentoring",
    "GTU PPR Report",
    "GTU Design Engineering Canvas",
    "GTU PSAR Report",
    "GTU BMC Canvas",
    "GTU Final Year Project",
  ],
  alternates: {
    canonical: "/pmms",
  },
  openGraph: {
    title: "GTU PMMS Project Portal & Mentoring Hub | GTU All In One",
    description: "Milestone tracker, PPR report generator, and guidelines for GTU PMMS.",
    url: "https://gtu-all-in-one.vercel.app/pmms",
  },
};

export default function PMMSPage() {
  return <PMMSHub />;
}
