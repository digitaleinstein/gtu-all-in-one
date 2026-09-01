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

function parseGTUDate(dateStr: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  const cleaned = dateStr.trim();
  const d = new Date(cleaned);
  if (!isNaN(d.getTime())) {
    return d;
  }
  const parts = cleaned.split(/[-/.]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const parsed = new Date(year, month, day);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return null;
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

    // Parse structured .post-content cards with explicit upload dates & nested links
    $(".post-content").each((_, container) => {
      const $c = $(container);
      let href = "";
      $c.find("a").each((_, a) => {
        const h = $(a).attr("href") || "";
        if (h && h !== "#" && (h.includes(".pdf") || h.includes("uploads") || h.includes("gtusitecirculars") || h.startsWith("http"))) {
          href = h;
        }
      });

      const title = $c.find("h3").text().trim().replace(/\s+/g, " ");
      const dateText = $c.find("p[id*='UploadDate'], p[id*='lblUploadDate'], p.date, p").first().text().trim();
      const parsedDate = parseGTUDate(dateText);

      if (title.length > 5 && href && parsedDate) {
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

        if (!circulars.some((c) => c.title === title || c.pdfUrl === href)) {
          circulars.push({
            title,
            category,
            publishedDate: parsedDate,
            pdfUrl: href,
            isPinned: tLower.includes("important") || tLower.includes("instruction") || category === "Examinations",
            description: `Official circular published on Gujarat Technological University portal (${category}).`,
          });
        }
      }
    });

    // Sort strictly by publication date descending
    circulars.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

    return circulars.slice(0, 60);
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
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
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

      if (val && val !== "0" && rawText.length > 3) {
        const parts = val.split("$");
        const examCode = parts[0] || `EXAM_${results.length}`;
        const sessionCode = parts[1] || "Summer 2026";
        const dateStr = parts[2] || new Date().toISOString();

        let course = "BE";
        const upper = rawText.toUpperCase();
        if (upper.startsWith("BE")) course = "BE";
        else if (upper.startsWith("ME")) course = "ME";
        else if (upper.startsWith("MBA")) course = "MBA";
        else if (upper.startsWith("MCA")) course = "MCA";
        else if (upper.startsWith("BCA")) course = "BCA";
        else if (upper.startsWith("BA") || upper.startsWith("B.ARCH")) course = "B.Arch";
        else if (upper.startsWith("BB") || upper.startsWith("BBA")) course = "BBA";
        else if (upper.startsWith("DIPLOMA") || upper.startsWith("DI") || upper.startsWith("DE") || upper.startsWith("DIPL")) course = "Diploma";
        else if (upper.startsWith("BPH") || upper.startsWith("B.PHARM") || upper.startsWith("BP")) course = "B.Pharm";
        else if (upper.startsWith("MPH") || upper.startsWith("M.PHARM")) course = "M.Pharm";
        else if (upper.startsWith("MAM")) course = "BE";

        const semMatch = rawText.match(/SEM\s*(\d+)/i);
        const semester = semMatch ? parseInt(semMatch[1], 10) : 1;

        const dateObj = new Date(dateStr);
        const validDate = !isNaN(dateObj.getTime()) ? dateObj : new Date();

        results.push({
          examTitle: rawText,
          examCode,
          declaredDate: validDate,
          course,
          semester,
          session: sessionCode.startsWith("S")
            ? `Summer ${sessionCode.substring(1)}`
            : sessionCode.startsWith("W")
            ? `Winter ${sessionCode.substring(1)}`
            : sessionCode,
          resultUrl: "https://www.gturesults.in",
        });
      }
    });

    // Sort strictly by declared date descending (latest declared results first)
    results.sort((a, b) => b.declaredDate.getTime() - a.declaredDate.getTime());

    return results;
  } catch (error) {
    console.error("Live GTU results scraper failed:", error);
    return [];
  }
}

export async function syncGTUDataToDatabase() {
  const { dispatchCircularAlerts, dispatchResultAlerts } = await import("./notification-dispatcher");

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
      // Dispatch in-app alerts to students subscribed to this circular category
      await dispatchCircularAlerts(c).catch((e) => console.error("Circular alert dispatch error:", e));
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
      // Dispatch in-app alerts to students subscribed to this course & semester
      await dispatchResultAlerts(r).catch((e) => console.error("Result alert dispatch error:", e));
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
