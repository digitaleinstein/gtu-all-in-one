import type { Metadata } from "next";
import { StudyMaterialHub } from "@/components/materials/StudyMaterialHub";

export const metadata: Metadata = {
  title: "GTU Study Material & Engineering Notes | Darshan University",
  description:
    "Comprehensive GTU syllabus study materials, notes, lab manuals, and PPTs powered by Darshan University.",
  alternates: {
    canonical: "/materials",
  },
};

export default function StudyMaterialAliasPage() {
  return <StudyMaterialHub />;
}
