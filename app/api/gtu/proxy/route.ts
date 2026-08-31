export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const asset = searchParams.get("asset");
    const enroll = searchParams.get("enroll") || "";
    const batch = searchParams.get("batch") || "";

    const baseUrl = "https://www.gturesults.in";

    // 1. Handle proxying static assets (CSS, JS, Images, Captcha Handler)
    if (asset) {
      const assetUrl = `${baseUrl}/${asset.replace(/^\//, "")}`;
      const assetRes = await fetch(assetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": "https://www.gturesults.in/",
        },
        cache: "no-store",
      });

      const contentType = assetRes.headers.get("content-type") || "text/plain";
      const buffer = await assetRes.arrayBuffer();

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 2. Fetch the main GTU ASP.NET Page
    const gtuRes = await fetch(baseUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    });

    const setCookie = gtuRes.headers.get("set-cookie") || "";
    let html = await gtuRes.text();

    // Rewrite relative links, stylesheets, scripts, images, and form action to route via our proxy
    html = html.replace(/href="Style\/([^"]+)"/g, 'href="/api/gtu/proxy?asset=Style/$1"');
    html = html.replace(/src="Script\/([^"]+)"/g, 'src="/api/gtu/proxy?asset=Script/$1"');
    html = html.replace(/src="Handler\.ashx([^"]*)"/g, 'src="/api/gtu/proxy?asset=Handler.ashx$1"');
    html = html.replace(/src="images\/([^"]+)"/g, 'src="/api/gtu/proxy?asset=images/$1"');
    html = html.replace(/href="images\/([^"]+)"/g, 'href="/api/gtu/proxy?asset=images/$1"');
    html = html.replace(/action="(\.\/)?Default\.aspx"/gi, 'action="/api/gtu/proxy"');

    // Inject enhanced styling and auto-population script for seamless embedded experience
    const injectedScript = `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important; margin: 0; padding: 12px; background: #f8fafc; color: #1e293b; }
        .style1, table { max-width: 100% !important; border-collapse: collapse !important; }
        input[type="text"], select { padding: 8px 12px !important; border-radius: 8px !important; border: 1px solid #cbd5e1 !important; font-size: 13px !important; }
        input[type="submit"] { background: #2563eb !important; color: white !important; font-weight: bold !important; padding: 8px 18px !important; border-radius: 8px !important; border: none !important; cursor: pointer !important; transition: all 0.2s !important; }
        input[type="submit"]:hover { background: #1d4ed8 !important; }
        #Panel1, table[id*="Grid"] { width: 100% !important; background: white !important; border-radius: 12px !important; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important; padding: 16px !important; margin-top: 16px !important; }
        #Panel1 td, table[id*="Grid"] td, table[id*="Grid"] th { padding: 8px 12px !important; border: 1px solid #e2e8f0 !important; }
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
      </script>
    `;

    html = html.replace("</head>", `${injectedScript}</head>`);

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "text/html; charset=utf-8");
    responseHeaders.set("Cache-Control", "no-store, max-age=0");
    // Strip X-Frame-Options to allow embedding in our app
    responseHeaders.delete("X-Frame-Options");
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    if (setCookie) {
      responseHeaders.set("Set-Cookie", setCookie);
    }

    return new NextResponse(html, { headers: responseHeaders });
  } catch (error: any) {
    console.error("GTU Proxy GET error:", error);
    return new NextResponse(
      `<div style="font-family: sans-serif; padding: 24px; text-align: center; color: #e11d48;">
        <h3>Could not establish live connection to GTU Server</h3>
        <p>${error.message || "Network timeout connecting to gturesults.in"}</p>
        <button onclick="location.reload()" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">Retry Connection</button>
      </div>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const cookieHeader = req.headers.get("cookie") || "";

    const formParams = new URLSearchParams();
    formData.forEach((value, key) => {
      formParams.append(key, value.toString());
    });

    const gtuRes = await fetch("https://www.gturesults.in/Default.aspx", {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookieHeader,
        "Referer": "https://www.gturesults.in/",
        "Origin": "https://www.gturesults.in",
      },
      body: formParams.toString(),
      cache: "no-store",
    });

    let html = await gtuRes.text();
    const setCookie = gtuRes.headers.get("set-cookie") || "";

    // Rewrite links
    html = html.replace(/href="Style\/([^"]+)"/g, 'href="/api/gtu/proxy?asset=Style/$1"');
    html = html.replace(/src="Script\/([^"]+)"/g, 'src="/api/gtu/proxy?asset=Script/$1"');
    html = html.replace(/src="Handler\.ashx([^"]*)"/g, 'src="/api/gtu/proxy?asset=Handler.ashx$1"');
    html = html.replace(/src="images\/([^"]+)"/g, 'src="/api/gtu/proxy?asset=images/$1"');
    html = html.replace(/href="images\/([^"]+)"/g, 'href="/api/gtu/proxy?asset=images/$1"');
    html = html.replace(/action="(\.\/)?Default\.aspx"/gi, 'action="/api/gtu/proxy"');

    const injectedScript = `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important; margin: 0; padding: 12px; background: #f8fafc; color: #1e293b; }
        .style1, table { max-width: 100% !important; border-collapse: collapse !important; }
        input[type="text"], select { padding: 8px 12px !important; border-radius: 8px !important; border: 1px solid #cbd5e1 !important; font-size: 13px !important; }
        input[type="submit"] { background: #2563eb !important; color: white !important; font-weight: bold !important; padding: 8px 18px !important; border-radius: 8px !important; border: none !important; cursor: pointer !important; }
        #Panel1, table[id*="Grid"] { width: 100% !important; background: white !important; border-radius: 12px !important; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important; padding: 16px !important; margin-top: 16px !important; }
        #Panel1 td, table[id*="Grid"] td, table[id*="Grid"] th { padding: 8px 12px !important; border: 1px solid #e2e8f0 !important; }
      </style>
    `;

    html = html.replace("</head>", `${injectedScript}</head>`);

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "text/html; charset=utf-8");
    responseHeaders.set("Cache-Control", "no-store, max-age=0");
    responseHeaders.delete("X-Frame-Options");
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    if (setCookie) {
      responseHeaders.set("Set-Cookie", setCookie);
    }

    return new NextResponse(html, { headers: responseHeaders });
  } catch (error: any) {
    console.error("GTU Proxy POST error:", error);
    return new NextResponse(
      `<div style="font-family: sans-serif; padding: 24px; text-align: center; color: #e11d48;">
        <h3>Could not submit query to GTU Server</h3>
        <p>${error.message}</p>
        <button onclick="history.back()" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">Go Back</button>
      </div>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
