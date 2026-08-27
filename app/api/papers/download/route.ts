export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getGTUSubjectQuestions } from "@/lib/gtu-paper-questions";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const subjectCode = searchParams.get("subjectCode");
    const paramYear = searchParams.get("year");
    const paramSeason = searchParams.get("season");
    const paramCourse = searchParams.get("course");
    const paramSem = searchParams.get("sem");

    let paper = null;
    if (id) {
      paper = await prisma.paper.findUnique({ where: { id } });
    } else if (subjectCode) {
      paper = await prisma.paper.findFirst({
        where: {
          subjectCode,
          ...(paramYear ? { year: parseInt(paramYear, 10) } : {}),
          ...(paramSeason ? { examSeason: paramSeason } : {}),
        },
      });
    }

    const paperData = paper || {
      id: id || "sample_paper",
      subjectCode: subjectCode || "3150703",
      subjectName: "Analysis and Design of Algorithms",
      course: paramCourse || "BE",
      branch: "Computer Engineering",
      semester: paramSem ? parseInt(paramSem, 10) : 5,
      examSeason: paramSeason || "Summer",
      year: paramYear ? parseInt(paramYear, 10) : 2026,
    };

    if (paper) {
      await prisma.paper.update({
        where: { id: paper.id },
        data: { downloadsCount: { increment: 1 } },
      }).catch(() => {});
    }

    // Generate GTU Examination PDF using pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size: 595 x 842 points
    const { width, height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 40;

    // Header border top
    page.drawRectangle({
      x: 35,
      y: y - 85,
      width: width - 70,
      height: 95,
      borderColor: rgb(0.1, 0.1, 0.1),
      borderWidth: 1.5,
    });

    // 1. GTU University Title
    const title = "GUJARAT TECHNOLOGICAL UNIVERSITY";
    const titleWidth = fontBold.widthOfTextAtSize(title, 14);
    page.drawText(title, {
      x: (width - titleWidth) / 2,
      y: y - 5,
      size: 14,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    // 2. Exam Subtitle
    const subtitle = `${paperData.course.toUpperCase()} - SEMESTER–${paperData.semester} EXAMINATION – ${paperData.examSeason.toUpperCase()} ${paperData.year}`;
    const subWidth = fontBold.widthOfTextAtSize(subtitle, 11);
    page.drawText(subtitle, {
      x: (width - subWidth) / 2,
      y: y - 23,
      size: 11,
      font: fontBold,
      color: rgb(0.15, 0.15, 0.15),
    });

    // Divider line inside header
    page.drawLine({
      start: { x: 35, y: y - 32 },
      end: { x: width - 35, y: y - 32 },
      thickness: 1,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Subject Details Row 1
    page.drawText(`Subject Code: `, { x: 45, y: y - 48, size: 9.5, font: fontBold });
    page.drawText(`${paperData.subjectCode}`, { x: 120, y: y - 48, size: 9.5, font: fontRegular });
    page.drawText(`Time: 10:30 AM TO 01:00 PM`, { x: 370, y: y - 48, size: 9.5, font: fontBold });

    // Subject Details Row 2
    page.drawText(`Subject Name: `, { x: 45, y: y - 64, size: 9.5, font: fontBold });
    page.drawText(`${paperData.subjectName} (${paperData.branch})`, { x: 120, y: y - 64, size: 9.5, font: fontRegular });
    page.drawText(`Total Marks: 70`, { x: 370, y: y - 64, size: 9.5, font: fontBold });

    y -= 105;

    // Instructions Box
    page.drawRectangle({
      x: 35,
      y: y - 45,
      width: width - 70,
      height: 52,
      color: rgb(0.96, 0.96, 0.96),
      borderColor: rgb(0.75, 0.75, 0.75),
      borderWidth: 0.8,
    });

    page.drawText("Instructions:", { x: 42, y: y - 2, size: 8.5, font: fontBold });
    page.drawText("1. Attempt all questions.", { x: 48, y: y - 13, size: 8, font: fontRegular });
    page.drawText("2. Make suitable assumptions wherever necessary.", { x: 48, y: y - 23, size: 8, font: fontRegular });
    page.drawText("3. Figures to the right indicate full marks.", { x: 48, y: y - 33, size: 8, font: fontRegular });
    page.drawText("4. Simple and non-programmable scientific calculators are permitted.", { x: 48, y: y - 43, size: 8, font: fontRegular });

    y -= 65;

    // Dynamic Questions Data
    const questions = getGTUSubjectQuestions(
      paperData.subjectCode,
      paperData.subjectName,
      paperData.course,
      paperData.semester
    );

    // Render Question Units
    for (const q of questions) {
      if (y < 90) break;

      // Question Header Line
      page.drawText(q.qNum, { x: 38, y: y, size: 9, font: fontBold });
      page.drawText("Marks", { x: width - 72, y: y, size: 8.5, font: fontBold });

      page.drawLine({
        start: { x: 35, y: y - 3 },
        end: { x: width - 35, y: y - 3 },
        thickness: 0.5,
        color: rgb(0.6, 0.6, 0.6),
      });

      y -= 14;

      for (const part of q.parts) {
        page.drawText(part.label, { x: 50, y: y, size: 8.5, font: fontBold });

        const maxWidth = width - 150;
        const words = part.text.split(" ");
        let line = "";
        let lineY = y;

        for (const w of words) {
          const testLine = line + (line ? " " : "") + w;
          if (fontRegular.widthOfTextAtSize(testLine, 8.5) > maxWidth) {
            page.drawText(line, { x: 68, y: lineY, size: 8.5, font: fontRegular });
            line = w;
            lineY -= 10.5;
          } else {
            line = testLine;
          }
        }
        if (line) {
          page.drawText(line, { x: 68, y: lineY, size: 8.5, font: fontRegular });
        }

        page.drawText(part.marks, { x: width - 68, y: y, size: 8.5, font: fontBold });
        y = lineY - 14;
      }

      if (q.orOption) {
        const orText = "— OR —";
        const orWidth = fontBold.widthOfTextAtSize(orText, 8);
        page.drawText(orText, { x: (width - orWidth) / 2, y: y, size: 8, font: fontBold, color: rgb(0.4, 0.4, 0.4) });
        y -= 12;

        page.drawText(q.orOption.label, { x: 50, y: y, size: 8.5, font: fontBold });
        const maxWidth = width - 150;
        const words = q.orOption.text.split(" ");
        let line = "";
        let lineY = y;

        for (const w of words) {
          const testLine = line + (line ? " " : "") + w;
          if (fontRegular.widthOfTextAtSize(testLine, 8.5) > maxWidth) {
            page.drawText(line, { x: 68, y: lineY, size: 8.5, font: fontRegular });
            line = w;
            lineY -= 10.5;
          } else {
            line = testLine;
          }
        }
        if (line) {
          page.drawText(line, { x: 68, y: lineY, size: 8.5, font: fontRegular });
        }

        page.drawText(q.orOption.marks, { x: width - 68, y: y, size: 8.5, font: fontBold });
        y = lineY - 14;
      }

      y -= 4;
    }

    // End of paper marker
    const endText = "************* END OF PAPER *************";
    const endWidth = fontBold.widthOfTextAtSize(endText, 9);
    page.drawText(endText, {
      x: (width - endWidth) / 2,
      y: Math.max(y, 35),
      size: 9,
      font: fontBold,
      color: rgb(0.4, 0.4, 0.4),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="GTU_${paperData.course}_Sem${paperData.semester}_${paperData.subjectCode}_${paperData.examSeason}${paperData.year}.pdf"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate paper PDF" }, { status: 500 });
  }
}
