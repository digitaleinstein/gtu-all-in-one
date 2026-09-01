/**
 * Universal Native Device Notification Dispatcher
 * Dispatches real system notifications on Android (via Java AndroidBridge)
 * and Web Push/Browser Notifications on Desktop & Mobile browsers.
 */
export function showNativeDeviceNotification(
  title: string,
  message: string,
  type: string = "RESULT",
  url: string = "/results"
) {
  try {
    // 1. Android Native Bridge (Inside the GTU All In One APK)
    if (
      typeof window !== "undefined" &&
      (window as any).AndroidBridge &&
      typeof (window as any).AndroidBridge.showNativeNotification === "function"
    ) {
      (window as any).AndroidBridge.showNativeNotification(title, message, type, url);
      return true;
    }

    // 2. Web Browser Notification API (Desktop & Mobile Chrome/Edge/Firefox)
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, {
          body: message,
          icon: "/icon.png",
          badge: "/icon.png",
        });
        return true;
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification(title, {
              body: message,
              icon: "/icon.png",
              badge: "/icon.png",
            });
          }
        });
      }
    }
  } catch (err) {
    console.error("Failed to show native device notification:", err);
  }
  return false;
}
