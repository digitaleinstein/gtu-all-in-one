/**
 * Universal External Portal & Browser Opener
 * Opens external sites (GTU Official, Result portal, Darshan, PMMS, Timetables, etc.)
 * in the user default native browser (Chrome/Edge/Firefox) when inside the mobile app,
 * and in a new tab when running on web.
 */
export function openExternalPortal(url: string, e?: React.MouseEvent | React.SyntheticEvent) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  if (!url) return;

  try {
    // 1. Check if running inside Android APK with AndroidBridge
    if (
      typeof window !== "undefined" &&
      (window as any).AndroidBridge &&
      typeof (window as any).AndroidBridge.openExternalUrl === "function"
    ) {
      (window as any).AndroidBridge.openExternalUrl(url);
      return;
    }

    // 2. Web browser fallback: open in new tab with security attributes
    if (typeof window !== "undefined") {
      const newWin = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
        window.location.href = url;
      }
    }
  } catch (err) {
    console.error("Failed to open external portal:", err);
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }
}
