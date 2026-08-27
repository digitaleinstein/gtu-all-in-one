import * as cheerio from "cheerio";
import { prisma } from "./prisma";

export interface ScrapedCircular {
  title: string;
  category: string;
  publishedDate: Date;
  pdfUrl: string;
  isPinned: boolean;
  gtuRefNo?: string;
  description?: string;
}

export interface ScrapedResult {
  examTitle: string;
  examCode: string;
  declaredDate: Date;
  course: string;
  semester: number;
  session: string;
  resultUrl: string;
}

function parseGTUDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const cleaned = dateStr.trim();
  // Format like "25-Aug-2026" or "25/08/2026" or "25-08-2026"
  const d = new Date(cleaned);
  if (!isNaN(d.getTime())) {
    return d;
  }
  // Try DD-MM-YYYY
  const parts = cleaned.split(/[-/.]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const parsed = new Date(year, month, day);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

/**
 * Real-time scraper for official GTU Circulars with authentic upload dates from https://www.gtu.ac.in/Circular.aspx
 */
export async function scrapeLiveCirculars(): Promise<ScrapedCircular[]> {
  try {
    const res = await fetch("https://www.gtu.ac.in/Circular.aspx", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 300 }, // Cache for 5 mins
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch GTU circulars page: ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const circulars: ScrapedCircular[] = [];

    // 1. Parse structured .post-content cards with explicit upload dates
    $(".post-content").each((_, container) => {
      const $c = $(container);
      const $link = $c.find("h3 a[href], a[href*='gtusitecirculars']").last();
      const title = $link.text().trim().replace(/\s+/g, " ");
      let href = $link.attr("href") || "";
      const dateText = $c.find("p[id*='UploadDate'], p[id*='lblUploadDate'], p.date").text().trim();

      if (title.length > 5 && (href.includes(".pdf") || href.includes("uploads") || href.includes("gtusitecirculars"))) {
        if (!href.startsWith("http")) {
          href = `https://www.gtu.ac.in/${href.replace(/^\//, "")}`;
        }

        let category = "General";
        const tLower = title.toLowerCase();
        if (tLower.includes("exam") || tLower.includes("result") || tLower.includes("recheck") || tLower.includes("reassessment")) {
          category = "Examinations";
        } else if (tLower.includes("timetable") || tLower.includes("time table") || tLower.includes("schedule")) {
          category = "Timetables";
        } else if (tLower.includes("academic") || tLower.includes("calendar") || tLower.includes("syllabus") || tLower.includes("elective")) {
          category = "Academic";
        } else if (tLower.includes("scholarship") || tLower.includes("mysy") || tLower.includes("fee")) {
          category = "Scholarships";
        } else if (tLower.includes("pmms") || tLower.includes("project") || tLower.includes("dissertation") || tLower.includes("patent")) {
          category = "PMMS & Research";
        }

        const publishedDate = parseGTUDate(dateText);

        if (!circulars.some((c) => c.title === title || c.pdfUrl === href)) {
          circulars.push({
            title,
            category,
            publishedDate,
            pdfUrl: href,
            isPinned: tLower.includes("important") || tLower.includes("instruction"),
            description: `Official circular published on Gujarat Technological University portal (${category}).`,
          });
        }
      }
    });

    // 2. Parse any additional AWS S3 links
    $("a[href*='gtusitecirculars'], a[id*='lvCircular'] a").each((_, el) => {
      const $el = $(el);
      const title = $el.text().trim().replace(/\s+/g, " ");
      let href = $el.attr("href") || "";

      if (title.length > 5 && (href.includes(".pdf") || href.includes("uploads") || href.includes("gtusitecirculars"))) {
        if (!href.startsWith("http")) {
          href = `https://www.gtu.ac.in/${href.replace(/^\//, "")}`;
        }

        let category = "General";
        const tLower = title.toLowerCase();
        if (tLower.includes("exam") || tLower.includes("result")) category = "Examinations";
        else if (tLower.includes("timetable")) category = "Timetables";
        else if (tLower.includes("academic")) category = "Academic";

        if (!circulars.some((c) => c.title === title || c.pdfUrl === href)) {
          circulars.push({
            title,
            category,
            publishedDate: new Date(),
            pdfUrl: href,
            isPinned: false,
            description: `Official circular published on Gujarat Technological University portal (${category}).`,
          });
        }
      }
    });

    // Sort by publication date descending
    circulars.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

    return circulars.slice(0, 50);
  } catch (error) {
    console.error("Live GTU circular scraper failed:", error);
    return [];
  }
}

/**
 * Real-time scraper for live declared results from https://www.gturesults.in
 */
export async function scrapeLiveResults(): Promise<ScrapedResult[]> {
  try {
    const res = await fetch("https://www.gturesults.in", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch GTU results page: ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const results: ScrapedResult[] = [];

    // Parse options in the ddlbatch dropdown
    $("select#ddlbatch option, select[name*='batch'] option").each((_, el) => {
      const $opt = $(el);
      const val = $opt.attr("value") || "";
      const rawText = $opt.text().replace(/\.+/g, "").trim();

      if (val && val !== "0" && rawText.length > 5) {
        const parts = val.split("$");
        const examCode = parts[0] || `EXAM_${results.length}`;
        const sessionCode = parts[1] || "Summer 2024";
        const dateStr = parts[2] || new Date().toISOString();

        let course = "BE";
        if (rawText.startsWith("BE")) course = "BE";
        else if (rawText.startsWith("ME")) course = "ME";
        else if (rawText.startsWith("MBA")) course = "MBA";
        else if (rawText.startsWith("MCA")) course = "MCA";
        else if (rawText.startsWith("BCA")) course = "BCA";
        else if (rawText.startsWith("Diploma") || rawText.startsWith("DI")) course = "Diploma";
        else if (rawText.startsWith("BPH") || rawText.startsWith("B.Pharm")) course = "B.Pharm";

        const semMatch = rawText.match(/SEM\s*(\d+)/i);
        const semester = semMatch ? parseInt(semMatch[1], 10) : 5;

        results.push({
          examTitle: rawText,
          examCode,
          declaredDate: new Date(dateStr),
          course,
          semester,
          session: sessionCode.startsWith("S") ? `Summer ${sessionCode.substring(1)}` : `Winter ${sessionCode.substring(1)}`,
          resultUrl: "https://www.gturesults.in",
        });
      }
    });

    return results.slice(0, 50);
  } catch (error) {
    console.error("Live GTU results scraper failed:", error);
    return [];
  }
}

/**
 * Synchronizes real live data from gtu.ac.in and gturesults.in to Database
 */
export async function syncGTUDataToDatabase() {
  const [liveCirculars, liveResults] = await Promise.all([
    scrapeLiveCirculars(),
    scrapeLiveResults(),
  ]);

  let circularsCount = 0;
  for (const c of liveCirculars) {
    const existing = await prisma.circular.findFirst({
      where: { OR: [{ title: c.title }, { pdfUrl: c.pdfUrl }] },
    });
    if (!existing) {
      await prisma.circular.create({ data: c });
      circularsCount++;
    } else {
      await prisma.circular.update({
        where: { id: existing.id },
        data: { publishedDate: c.publishedDate },
      });
    }
  }

  let resultsCount = 0;
  for (const r of liveResults) {
    const existing = await prisma.liveResult.findFirst({
      where: { examTitle: r.examTitle },
    });
    if (!existing) {
      await prisma.liveResult.create({ data: r });
      resultsCount++;
    }
  }

  return {
    success: true,
    newCircularsCount: circularsCount,
    newResultsCount: resultsCount,
    liveCircularsFound: liveCirculars.length,
    liveResultsFound: liveResults.length,
    timestamp: new Date().toISOString(),
  };
}
