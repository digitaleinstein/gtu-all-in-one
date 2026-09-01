export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const BASE_URL = "https://www.gturesults.in";

function rewriteGtuHtml(rawHtml: string, enroll: string = "", batch: string = ""): string {
  let html = rawHtml;

  // 1. Rewrite Captcha & Handler
  html = html.replace(/(src|href)=["'](\.\.\/)?Handler\.ashx([^"']*)["']/gi, '$1="/api/gtu/proxy?asset=Handler.ashx$3"');

  // 2. Rewrite Images, Styles, Scripts (case-insensitive for Images/images, Style, Script)
  html = html.replace(/(src|href)=["'](\.\.\/)?(images|Style|Script)\/([^"']+)["']/gi, '$1="/api/gtu/proxy?asset=$3/$4"');

  // 3. Rewrite ASP.NET WebResource & ScriptResource
  html = html.replace(/(src|href)=["'](\.\.\/)?(WebResource\.axd|ScriptResource\.axd)([^"']*)["']/gi, '$1="/api/gtu/proxy?asset=$3$4"');

  // 4. Rewrite Form Action to proxy POST
  html = html.replace(/action=["'](\.\/)?(Default\.aspx)?["']/gi, 'action="/api/gtu/proxy"');

  // 5. Inject Clean Responsive Styling & Touch-Scroll Support
  const injectedStyleAndScript = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0, user-scalable=yes">
    <style>
      html, body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        margin: 0 !important;
        padding: 8px 10px !important;
        background-color: #f8fafc !important;
        color: #0f172a !important;
        width: 100% !important;
        min-height: 100% !important;
        overflow-x: auto !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
        touch-action: pan-x pan-y !important;
        box-sizing: border-box !important;
      }
      * {
        box-sizing: border-box !important;
      }
      form {
        width: 100% !important;
        max-width: 1000px !important;
        margin: 0 auto !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
      }
      .toptable, .header {
        width: 100% !important;
        max-width: 1000px !important;
        margin: 0 auto !important;
      }
      .logo img, img[alt="GTU"] {
        max-height: 56px !important;
        height: auto !important;
        width: auto !important;
      }
      #imgCaptcha {
        border: 2px solid #3b82f6 !important;
        border-radius: 8px !important;
        background: white !important;
        vertical-align: middle !important;
        max-width: 120px !important;
        height: auto !important;
      }
      input[type="text"], select {
        padding: 9px 12px !important;
        border-radius: 8px !important;
        border: 1.5px solid #cbd5e1 !important;
        font-size: 14px !important;
        outline: none !important;
        background: white !important;
        box-sizing: border-box !important;
        max-width: 100% !important;
      }
      input[type="text"]:focus, select:focus {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 3px rgba(37,99,235,0.15) !important;
      }
      #btnSearch, input[type="submit"] {
        background: linear-gradient(135deg, #1e40af, #2563eb) !important;
        color: white !important;
        font-weight: 700 !important;
        padding: 10px 22px !important;
        border-radius: 8px !important;
        border: none !important;
        cursor: pointer !important;
        font-size: 14px !important;
        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2) !important;
        transition: all 0.2s ease !important;
      }
      #btnSearch:hover, input[type="submit"]:hover {
        background: #1d4ed8 !important;
        transform: translateY(-1px) !important;
      }
      #Panel1, table[id*="Grid"], table.table-bordered, div[id*="Panel"] {
        width: 100% !important;
        background: #ffffff !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important;
        padding: 12px !important;
        margin-top: 16px !important;
        border: 1px solid #e2e8f0 !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        display: block !important;
      }
      table[id*="Grid"] {
        min-width: 600px !important;
        display: table !important;
      }
      #Panel1 td, table[id*="Grid"] td, table[id*="Grid"] th {
        padding: 8px 10px !important;
        border: 1px solid #e2e8f0 !important;
        font-size: 12px !important;
        white-space: nowrap !important;
      }
      table[id*="Grid"] th {
        background: #f1f5f9 !important;
        font-weight: 700 !important;
        color: #334155 !important;
      }
      .print-btn-bar {
        text-align: right;
        margin: 10px 0;
      }
      .print-btn {
        background: #059669;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        font-size: 12px;
      }
      @media (max-width: 640px) {
        body {
          padding: 6px !important;
        }
        #ddlbatch, #txtenroll {
          width: 100% !important;
        }
      }
    </style>
    <script>
      window.addEventListener('DOMContentLoaded', function() {
        var enrollInput = document.getElementById('txtenroll');
        if (enrollInput && "${enroll}") {
          enrollInput.value = "${enroll}";
        }
        var batchSelect = document.getElementById('ddlbatch');
        if (batchSelect && "${batch}") {
          batchSelect.value = "${batch}";
        }
      });
      function printResult() {
        window.print();
      }
    </script>
  `;

  if (html.includes("</head>")) {
    html = html.replace("</head>", `${injectedStyleAndScript}</head>`);
  } else {
    html = `${injectedStyleAndScript}${html}`;
  }

  return html;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const asset = searchParams.get("asset");
    const enroll = searchParams.get("enroll") || "";
    const batch = searchParams.get("batch") || "";
    const incomingCookie = req.headers.get("cookie") || "";

    // 1. Handle proxying static assets (CSS, JS, Images, Captcha Handler, .axd files)
    if (asset) {
      const assetUrl = `${BASE_URL}/${asset.replace(/^\//, "")}`;
      
      const assetRes = await fetch(assetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Cookie": incomingCookie,
          "Referer": `${BASE_URL}/`,
        },
        cache: "no-store",
      });

      const contentType = assetRes.headers.get("content-type") || "text/plain";
      const buffer = await assetRes.arrayBuffer();

      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Cache-Control", asset.includes("Handler.ashx") ? "no-store, max-age=0" : "public, max-age=86400");
      headers.set("Access-Control-Allow-Origin", "*");

      const setCookie = assetRes.headers.get("set-cookie");
      if (setCookie) {
        headers.set("Set-Cookie", setCookie);
      }

      return new NextResponse(buffer, { headers });
    }

    // 2. Fetch the main GTU ASP.NET Page
    const gtuRes = await fetch(BASE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    });

    const setCookie = gtuRes.headers.get("set-cookie") || "";
    const rawHtml = await gtuRes.text();
    const processedHtml = rewriteGtuHtml(rawHtml, enroll, batch);

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "text/html; charset=utf-8");
    responseHeaders.set("Cache-Control", "no-store, max-age=0");
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    if (setCookie) {
      responseHeaders.set("Set-Cookie", setCookie);
    }

    return new NextResponse(processedHtml, { headers: responseHeaders });
  } catch (error: any) {
    console.error("GTU Proxy GET error:", error);
    return new NextResponse(
      `<div style="font-family: sans-serif; padding: 28px; text-align: center; color: #dc2626;">
        <h3 style="margin-top:0;">GTU Result Server Connection</h3>
        <p style="font-size:13px;">${error.message || "Failed to establish live session with gturesults.in"}</p>
        <button onclick="location.reload()" style="padding: 9px 18px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Retry Connection</button>
      </div>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const incomingCookie = req.headers.get("cookie") || "";

    const formParams = new URLSearchParams();
    formData.forEach((value, key) => {
      formParams.append(key, value.toString());
    });

    const gtuRes = await fetch(`${BASE_URL}/Default.aspx`, {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": incomingCookie,
        "Referer": `${BASE_URL}/`,
        "Origin": BASE_URL,
      },
      body: formParams.toString(),
      cache: "no-store",
    });

    const setCookie = gtuRes.headers.get("set-cookie") || "";
    const rawHtml = await gtuRes.text();
    const processedHtml = rewriteGtuHtml(rawHtml);

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "text/html; charset=utf-8");
    responseHeaders.set("Cache-Control", "no-store, max-age=0");
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    if (setCookie) {
      responseHeaders.set("Set-Cookie", setCookie);
    }

    return new NextResponse(processedHtml, { headers: responseHeaders });
  } catch (error: any) {
    console.error("GTU Proxy POST error:", error);
    return new NextResponse(
      `<div style="font-family: sans-serif; padding: 28px; text-align: center; color: #dc2626;">
        <h3 style="margin-top:0;">Failed to Submit Query to GTU Server</h3>
        <p style="font-size:13px;">${error.message}</p>
        <button onclick="history.back()" style="padding: 9px 18px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Go Back</button>
      </div>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
