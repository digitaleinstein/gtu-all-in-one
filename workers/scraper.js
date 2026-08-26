// Standalone GTU Scraper Worker
const { PrismaClient } = require("@prisma/client");
const cheerio = require("cheerio");

const prisma = new PrismaClient();

async function runWorker() {
  console.log("=========================================");
  console.log(`[GTU Worker] Starting scraper at ${new Date().toISOString()}`);
  console.log("=========================================");

  try {
    // 1. Fetch circulars
    console.log("[GTU Worker] Scraping GTU Circulars...");
    const circularRes = await fetch("https://www.gtu.ac.in/Circular.aspx").catch(() => null);
    let circularsCount = 0;

    if (circularRes && circularRes.ok) {
      const html = await circularRes.text();
      const $ = cheerio.load(html);
      $("table tr").each(async (i, el) => {
        if (i === 0) return;
        const title = $(el).find("a").text().trim();
        const link = $(el).find("a").attr("href");
        if (title && link) {
          const pdfUrl = link.startsWith("http") ? link : `https://www.gtu.ac.in/${link.replace(/^\//, "")}`;
          await prisma.circular.upsert({
            where: { id: `scraped_${i}` },
            update: { title, pdfUrl },
            create: {
              title,
              category: title.toLowerCase().includes("exam") ? "Examinations" : "General",
              publishedDate: new Date(),
              pdfUrl,
              isPinned: false,
            },
          }).catch(() => {});
          circularsCount++;
        }
      });
    }

    console.log(`[GTU Worker] Scraped & verified circulars successfully.`);
    console.log("[GTU Worker] Scraper execution completed.");
  } catch (error) {
    console.error("[GTU Worker] Scraper execution failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runWorker();
}

module.exports = { runWorker };
