/**
 * Universal Download Helper for Web & Android Capacitor WebView
 * Triggers Android System DownloadManager with Notifications when inside the App,
 * and standard browser download in regular browser.
 */

export function downloadGTUFile(url: string, filename: string, mimeType: string = "application/pdf") {
  if (typeof window === "undefined") return;

  // 1. Android Bridge Check (Native DownloadManager with Status Bar Notifications)
  const win = window as any;
  if (win.AndroidBridge && typeof win.AndroidBridge.downloadFile === "function") {
    try {
      win.AndroidBridge.downloadFile(url, filename, mimeType);
      return;
    } catch (e) {
      console.warn("AndroidBridge download failed, falling back:", e);
    }
  }

  // 2. Standard Browser Fallback
  try {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    console.error("Browser download fallback failed:", e);
    window.open(url, "_blank");
  }
}
