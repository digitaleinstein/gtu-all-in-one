// Standalone GTU Live Data Scraper
const { PrismaClient } = require("@prisma/client");
const cheerio = require("cheerio");

const prisma = new PrismaClient();

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
      $("a[href*='gtusitecirculars'], a[id*='lvCircular'] a, a[id*='lblContentHeading']").each((_, el) => {
        const $el = $(el);
        const title = $el.text().trim().replace(/\s+/g, " ");
        let href = $el.attr("href") || "";

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

          scrapedLinks.push({
            title,
            category,
            publishedDate: new Date(),
            pdfUrl: href,
            isPinned: tLower.includes("important") || tLower.includes("instruction"),
            description: `Official GTU Circular parsed live from gtu.ac.in server.`,
          });
        }
      });

      for (const c of scrapedLinks.slice(0, 30)) {
        const existing = await prisma.circular.findFirst({
          where: { OR: [{ title: c.title }, { pdfUrl: c.pdfUrl }] },
        });
        if (!existing) {
          await prisma.circular.create({ data: c });
          circularsCount++;
        }
      }
      console.log(`[GTU Worker] ✅ Scraped & stored ${scrapedLinks.length} live circulars (${circularsCount} new added).`);
    }

    // 2. Fetch live Declared Results from gturesults.in
    console.log("[GTU Worker] Scraping live declared exams from https://www.gturesults.in...");
    const resultsRes = await fetch("https://www.gturesults.in", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }).catch(() => null);

    let resultsCount = 0;
    if (resultsRes && resultsRes.ok) {
      const html = await resultsRes.text();
      const $ = cheerio.load(html);

      const scrapedExams = [];
      $("select#ddlbatch option, select[name*='batch'] option").each((_, el) => {
        const $opt = $(el);
        const val = $opt.attr("value") || "";
        const rawText = $opt.text().replace(/\.+/g, "").trim();

        if (val && val !== "0" && rawText.length > 5) {
          const parts = val.split("$");
          const examCode = parts[0] || `EXAM_${scrapedExams.length}`;
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

          scrapedExams.push({
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

      for (const r of scrapedExams.slice(0, 40)) {
        const existing = await prisma.liveResult.findFirst({
          where: { examTitle: r.examTitle },
        });
        if (!existing) {
          await prisma.liveResult.create({ data: r });
          resultsCount++;
        }
      }
      console.log(`[GTU Worker] ✅ Scraped & stored ${scrapedExams.length} live declared exam entries (${resultsCount} new added).`);
    }

    console.log("[GTU Worker] Complete live data synchronization finished!");
  } catch (error) {
    console.error("[GTU Worker] Scraper failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runWorker();
}

module.exports = { runWorker };
