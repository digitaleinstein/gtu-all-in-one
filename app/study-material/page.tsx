import { Metadata } from "next";
import { StudyMaterialHub } from "@/components/materials/StudyMaterialHub";

export const metadata: Metadata = {
  title: "GTU Study Material | Darshan University",
  description:
    "Comprehensive GTU syllabus study materials, notes, lab manuals, and PPTs powered by Darshan University.",
};

export default function StudyMaterialAliasPage() {
  return <StudyMaterialHub />;
}
