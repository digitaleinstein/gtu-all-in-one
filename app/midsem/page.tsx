import type { Metadata } from "next";
import { MidsemTracker } from "@/components/midsem/MidsemTracker";

export const metadata: Metadata = {
  title: "GTU SPI CPI Calculator & 70-Mark Cutoff Tracker",
  description:
    "Calculate internal eligibility, required target scores in 70-mark external GTU theory exam, and predict your semester SPI with official GTU conversion formula (SPI - 0.5) * 10.",
  keywords: [
    "GTU SPI Calculator",
    "GTU CPI Calculator",
    "GTU Grade Calculator",
    "GTU Passing Marks 70",
    "GTU Midsem Marks",
    "GTU Percentage Formula",
  ],
  alternates: {
    canonical: "/midsem",
  },
  openGraph: {
    title: "GTU SPI CPI Calculator & 70-Mark Cutoff Tracker | GTU All In One",
    description: "Official GTU formula converter, external 70-mark cutoff estimator, and semester SPI predictor.",
    url: "https://gtu-all-in-one.vercel.app/midsem",
  },
};

export default function MidsemPage() {
  return <MidsemTracker />;
}
