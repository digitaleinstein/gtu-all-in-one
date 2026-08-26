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

/**
 * Real-time scraper for official GTU Circulars from https://www.gtu.ac.in/Circular.aspx
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

    // Parse all circular links matching S3 uploads
    $("a[href*='gtusitecirculars'], a[id*='lvCircular'] a, a[id*='lblContentHeading']").each((_, el) => {
      const $el = $(el);
      const title = $el.text().trim().replace(/\s+/g, " ");
      let href = $el.attr("href") || "";

      if (title.length > 5 && (href.includes(".pdf") || href.includes("uploads") || href.includes("gtusitecirculars"))) {
        if (!href.startsWith("http")) {
          href = `https://www.gtu.ac.in/${href.replace(/^\//, "")}`;
        }

        // Categorize based on keywords
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

        // Extract date if present in title
        const dateMatch = title.match(/(\d{2}[-/.]\d{2}[-/.]\d{4})/);
        const publishedDate = dateMatch ? new Date(dateMatch[1].replace(/[-.]/g, "/")) : new Date();

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

    return circulars.slice(0, 30);
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
        // Value format: 5523$S2026$2026-08-24$current$0
        const parts = val.split("$");
        const examCode = parts[0] || `EXAM_${results.length}`;
        const sessionCode = parts[1] || "Summer 2024";
        const dateStr = parts[2] || new Date().toISOString();

        // Extract Course & Sem
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

    return results.slice(0, 40);
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
