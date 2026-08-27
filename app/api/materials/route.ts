export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { GTU_STUDY_MATERIALS } from "@/lib/study-materials-data";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const department = searchParams.get("department") || "All Departments";
    const semester = searchParams.get("semester");
    const degree = searchParams.get("degree") || "All";
    const resourceType = searchParams.get("resourceType") || "All Types";
    const code = searchParams.get("code");

    // Direct single subject query by code
    if (code) {
      const subject = GTU_STUDY_MATERIALS.find(
        (s) => s.subjectCode === code || s.id === code
      );
      if (!subject) {
        return NextResponse.json({ error: "Study material not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, material: subject });
    }

    let filtered = [...GTU_STUDY_MATERIALS];

    // Department Filter
    if (department && department !== "All Departments" && department !== "All") {
      filtered = filtered.filter((s) =>
        s.department.toLowerCase().includes(department.toLowerCase())
      );
    }

    // Semester Filter
    if (semester && semester !== "All" && semester !== "0") {
      const semNum = parseInt(semester, 10);
      if (!isNaN(semNum)) {
        filtered = filtered.filter((s) => s.semester === semNum);
      }
    }

    // Degree Filter
    if (degree && degree !== "All") {
      filtered = filtered.filter((s) => s.degree.toLowerCase() === degree.toLowerCase());
    }

    // Resource Type Filter
    if (resourceType && resourceType !== "All Types") {
      filtered = filtered.filter((s) =>
        s.resourceTypes.some((r) => r.toLowerCase().includes(resourceType.toLowerCase()))
      );
    }

    // Search Query (subject code, subject name, department)
    if (query) {
      filtered = filtered.filter(
        (s) =>
          s.subjectCode.toLowerCase().includes(query) ||
          s.subjectName.toLowerCase().includes(query) ||
          s.department.toLowerCase().includes(query) ||
          s.units.some((u) => u.title.toLowerCase().includes(query))
      );
    }

    // Grouping stats
    const totalCount = filtered.length;
    const departmentsCount: Record<string, number> = {};
    GTU_STUDY_MATERIALS.forEach((s) => {
      departmentsCount[s.department] = (departmentsCount[s.department] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      totalCount,
      departmentsCount,
      materials: filtered,
      source: "Darshan University & GTU Open Courseware Repository",
    });
  } catch (error: any) {
    console.error("Failed to fetch study materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch study materials" },
      { status: 500 }
    );
  }
}
