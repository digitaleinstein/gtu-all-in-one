export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      cookies,
      viewState,
      eventValidation,
      viewStateGenerator,
      batch,
      enrollmentNo,
      captchaCode,
      seatNumber,
    } = body;

    if (!enrollmentNo || !captchaCode || !batch) {
      return NextResponse.json(
        { error: "Enrollment Number, Exam Batch, and Captcha code are required." },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append("__VIEWSTATE", viewState || "");
    formData.append("__VIEWSTATEGENERATOR", viewStateGenerator || "CA0B0334");
    formData.append("__EVENTVALIDATION", eventValidation || "");
    formData.append("ddlbatch", batch);
    formData.append("txtenroll", enrollmentNo.trim());
    formData.append("txtpassword", seatNumber || "");
    formData.append("CodeNumberTextBox", captchaCode.trim());
    formData.append("btnSearch", "Search");

    const res = await fetch("https://www.gturesults.in/Default.aspx", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookies || "",
        "Referer": "https://www.gturesults.in/",
        "Origin": "https://www.gturesults.in",
      },
      body: formData.toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`GTU server responded with status ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Check if error message is displayed on GTU page
    const lblError = $("#lblmsg, #lblMsg, .errormsg, #lblerror").text().trim();
    if (lblError && lblError.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: lblError,
        },
        { status: 400 }
      );
    }

    // Extract student details from live marksheet
    const studentName = $("#lblName, #lblname, #lblStudentName").text().trim();
    const institute = $("#lblInstName, #lblCollege, #lblinstname").text().trim();
    const branchName = $("#lblBranchName, #lblBranch, #lblbranch").text().trim();
    const examName = $("#lblExamName, #lblExam, #lblexam").text().trim();
    const declaredOn = $("#lblDeclaredOn").text().trim();
    const spi = $("#lblSPI, #lblspi").text().trim();
    const cpi = $("#lblCPI, #lblcpi").text().trim();
    const cgpa = $("#lblCGPA, #lblcgpa").text().trim();
    const resultStatus = $("#lblResult, #lblresult, #lblStatus").text().trim();
    const currentBacklog = $("#lblCurrentSemBacklog, #lblcurback").text().trim();
    const totalBacklog = $("#lblTotalBacklog, #lbltotback").text().trim();

    // Extract Subject-wise table
    const subjects: any[] = [];
    $("#GridView1 tr, table.table-bordered tr, table[id*='Grid'] tr").each((i, el) => {
      if (i === 0) return; // Skip header row
      const cols = $(el).find("td");
      if (cols.length >= 3) {
        const code = $(cols[0]).text().trim();
        const name = $(cols[1]).text().trim();
        const theoryE = cols.length > 2 ? $(cols[2]).text().trim() : "--";
        const theoryM = cols.length > 3 ? $(cols[3]).text().trim() : "--";
        const grade = cols.length > 4 ? $(cols[cols.length - 2]).text().trim() : "--";
        const credits = cols.length > 5 ? $(cols[cols.length - 1]).text().trim() : "--";

        if (code && name && code.match(/\d+/)) {
          subjects.push({ code, name, theoryE, theoryM, grade, credits });
        }
      }
    });

    // If no student name or subjects were parsed, the record was not declared/found in this batch
    if (!studentName && subjects.length === 0 && !spi) {
      return NextResponse.json(
        {
          success: false,
          error: "No result record found for enrollment " + enrollmentNo + " in the selected examination batch. Please ensure the correct exam session is selected.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      liveFromGTU: true,
      data: {
        enrollmentNo,
        studentName: studentName || "GTU Student",
        institute: institute || "GTU Affiliated College",
        branch: branchName || "Engineering",
        exam: examName || batch,
        declaredOn: declaredOn || undefined,
        spi: spi || "--",
        cpi: cpi || "--",
        cgpa: cgpa || "--",
        resultStatus: resultStatus || "DECLARED",
        currentBacklog: currentBacklog || "0",
        totalBacklog: totalBacklog || "0",
        subjects,
      },
    });
  } catch (error: any) {
    console.error("Live GTU result query error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to query GTU examination portal" },
      { status: 500 }
    );
  }
}
