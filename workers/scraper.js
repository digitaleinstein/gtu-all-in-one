// Standalone GTU Live Data Scraper
const { PrismaClient } = require("@prisma/client");
const cheerio = require("cheerio");

const prisma = new PrismaClient();

function parseGTUDate(dateStr) {
  if (!dateStr) return new Date();
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
  return new Date();
}

async function runWorker() {
  console.log("=========================================");
  console.log(`[GTU Worker] Scraping live data from gtu.ac.in & gturesults.in...`);
  console.log("=========================================");

  try {
    // 1. Fetch live Circulars from GTU
    console.log("[GTU Worker] Scraping live GTU Circulars from https://www.gtu.ac.in/Circular.aspx...");
    const circularRes = await fetch("https://www.gtu.ac.in/Circular.aspx", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }).catch(() => null);

    let circularsCount = 0;
    if (circularRes && circularRes.ok) {
      const html = await circularRes.text();
      const $ = cheerio.load(html);

      const scrapedLinks = [];
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

          if (!scrapedLinks.some((c) => c.title === title || c.pdfUrl === href)) {
            scrapedLinks.push({
              title,
              category,
              publishedDate,
              pdfUrl: href,
              isPinned: tLower.includes("important") || tLower.includes("instruction"),
              description: `Official GTU Circular parsed live from gtu.ac.in server.`,
            });
          }
        }
      });

      for (const item of scrapedLinks) {
        const existing = await prisma.circular.findFirst({
          where: { OR: [{ title: item.title }, { pdfUrl: item.pdfUrl }] },
        });

        if (!existing) {
          await prisma.circular.create({ data: item });
          circularsCount++;
        } else {
          await prisma.circular.update({
            where: { id: existing.id },
            data: { publishedDate: item.publishedDate },
          });
        }
      }
      console.log(`[GTU Worker] Synced ${scrapedLinks.length} live circulars (${circularsCount} new added).`);
    }

    // 2. Fetch live declared results
    console.log("[GTU Worker] Scraping declared results from https://www.gturesults.in...");
    const resultsRes = await fetch("https://www.gturesults.in", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }).catch(() => null);

    let resultsCount = 0;
    if (resultsRes && resultsRes.ok) {
      const html = await resultsRes.text();
      const $ = cheerio.load(html);

      const scrapedResults = [];
      $("select#ddlbatch option, select[name*='batch'] option").each((_, el) => {
        const $opt = $(el);
        const val = $opt.attr("value") || "";
        const rawText = $opt.text().replace(/\.+/g, "").trim();

        if (val && val !== "0" && rawText.length > 5) {
          const parts = val.split("$");
          const examCode = parts[0] || `EXAM_${scrapedResults.length}`;
          const sessionCode = parts[1] || "Summer 2024";
          const dateStr = parts[2] || new Date().toISOString();

          let course = "BE";
          if (rawText.startsWith("BE")) course = "BE";
          else if (rawText.startsWith("ME")) course = "ME";
          else if (rawText.startsWith("MBA")) course = "MBA";
          else if (rawText.startsWith("MCA")) course = "MCA";
          else if (rawText.startsWith("Diploma") || rawText.startsWith("DI")) course = "Diploma";
          else if (rawText.startsWith("BPH") || rawText.startsWith("B.Pharm")) course = "B.Pharm";

          const semMatch = rawText.match(/SEM\s*(\d+)/i);
          const semester = semMatch ? parseInt(semMatch[1], 10) : 5;

          scrapedResults.push({
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

      for (const item of scrapedResults) {
        const existing = await prisma.liveResult.findFirst({
          where: { examTitle: item.examTitle },
        });

        if (!existing) {
          await prisma.liveResult.create({ data: item });
          resultsCount++;
        }
      }
      console.log(`[GTU Worker] Synced ${scrapedResults.length} declared exam batches (${resultsCount} new added).`);
    }

    console.log("=========================================");
    console.log(`[GTU Worker] Real-time sync cycle completed successfully!`);
    console.log("=========================================");
  } catch (err) {
    console.error("[GTU Worker] Error during background synchronization:", err);
  } finally {
    await prisma.$disconnect();
  }
}

runWorker();
