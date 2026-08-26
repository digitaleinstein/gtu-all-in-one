export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    const res = await fetch("https://www.gturesults.in", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`GTU portal returned status ${res.status}`);
    }

    const setCookieHeader = res.headers.get("set-cookie") || "";
    const html = await res.text();
    const $ = cheerio.load(html);

    const viewState = $("input#__VIEWSTATE").val() || "";
    const eventValidation = $("input#__EVENTVALIDATION").val() || "";
    const viewStateGenerator = $("input#__VIEWSTATEGENERATOR").val() || "CA0B0334";

    // Extract all declared exam batches from select#ddlbatch
    const batches: { value: string; label: string; course: string; semester: number }[] = [];
    $("select#ddlbatch option").each((_, el) => {
      const val = $(el).attr("value") || "";
      const label = $(el).text().replace(/\.+/g, "").trim();

      if (val && val !== "0" && label.length > 3) {
        let course = "BE";
        if (label.startsWith("BE")) course = "BE";
        else if (label.startsWith("ME")) course = "ME";
        else if (label.startsWith("MBA")) course = "MBA";
        else if (label.startsWith("MCA")) course = "MCA";
        else if (label.startsWith("BCA")) course = "BCA";
        else if (label.startsWith("BA")) course = "BA";
        else if (label.startsWith("BB")) course = "BBA";
        else if (label.startsWith("Diploma") || label.startsWith("DI")) course = "Diploma";
        else if (label.startsWith("BPH") || label.startsWith("B.Pharm")) course = "B.Pharm";

        const semMatch = label.match(/SEM\s*(\d+)/i);
        const semester = semMatch ? parseInt(semMatch[1], 10) : 5;

        batches.push({ value: val, label, course, semester });
      }
    });

    // Fetch the live CAPTCHA image using the same session cookie
    const captchaRes = await fetch("https://www.gturesults.in/Handler.ashx", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Cookie": setCookieHeader,
        "Referer": "https://www.gturesults.in/",
      },
      cache: "no-store",
    });

    let captchaBase64 = "";
    if (captchaRes.ok) {
      const buffer = await captchaRes.arrayBuffer();
      captchaBase64 = `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;
    }

    return NextResponse.json({
      success: true,
      cookies: setCookieHeader,
      viewState,
      eventValidation,
      viewStateGenerator,
      captchaImage: captchaBase64,
      totalBatches: batches.length,
      batches: batches.slice(0, 100),
    });
  } catch (error: any) {
    console.error("Live GTU session error:", error);
    return NextResponse.json({ error: error.message || "Failed to initialize live GTU session" }, { status: 500 });
  }
}
