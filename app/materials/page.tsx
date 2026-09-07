import type { Metadata } from "next";
import { StudyMaterialHub } from "@/components/materials/StudyMaterialHub";

export const metadata: Metadata = {
  title: "GTU Study Material, e-Notes, PPT & Lab Manuals | Darshan University",
  description:
    "Download official GTU study material, chapter-wise e-Notes, PPT presentations, lab practical manuals, and solved exam question papers for Computer, Civil, Mechanical, and Electrical Engineering.",
  keywords: [
    "GTU Study Material",
    "Darshan University GTU Material",
    "GTU Notes",
    "GTU Engineering Notes",
    "GTU PPT",
    "GTU Lab Manual",
    "GTU Syllabus",
    "GTU Books PDF",
  ],
  alternates: {
    canonical: "/materials",
  },
  openGraph: {
    title: "GTU Study Material, e-Notes & Lab Manuals | GTU All In One",
    description: "Download chapter-wise e-Notes, PPT presentations, and lab manuals for GTU students.",
    url: "https://gtu-all-in-one.vercel.app/materials",
  },
};

export default function MaterialsPage() {
  return <StudyMaterialHub />;
}
