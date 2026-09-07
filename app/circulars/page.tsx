import type { Metadata } from "next";
import { CircularsFeed } from "@/components/circulars/CircularsFeed";

export const metadata: Metadata = {
  title: "GTU Live Circulars, Notices & Exam Timetables | gtu.ac.in",
  description:
    "Real-time Gujarat Technological University official circulars feed: Examinations, Timetables, Academic Calendars, MYSY Scholarships, and General student guidelines from gtu.ac.in.",
  keywords: [
    "GTU Circular",
    "GTU Circulars",
    "GTU Notices",
    "GTU Exam Timetable",
    "GTU Academic Calendar",
    "gtu.ac.in circular",
    "GTU Scholarship",
    "MYSY GTU",
    "GTU Hall Ticket",
    "GTU Exam Notification",
  ],
  alternates: {
    canonical: "/circulars",
  },
  openGraph: {
    title: "GTU Live Circulars & Notices Feed | GTU All In One",
    description: "Real-time Gujarat Technological University official circulars, notifications and timetables.",
    url: "https://gtu-all-in-one.vercel.app/circulars",
  },
};

export default function CircularsPage() {
  return <CircularsFeed />;
}
