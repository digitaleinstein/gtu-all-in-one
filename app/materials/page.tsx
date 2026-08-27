import { Metadata } from "next";
import { StudyMaterialHub } from "@/components/materials/StudyMaterialHub";

export const metadata: Metadata = {
  title: "GTU Study Material, e-Notes, PPT & Lab Manuals | Darshan University",
  description:
    "Download official GTU study material, chapter-wise e-Notes, PPT presentations, lab practical manuals, and solved exam question papers for Computer, Civil, Mechanical, and Electrical Engineering.",
};

export default function MaterialsPage() {
  return <StudyMaterialHub />;
}
