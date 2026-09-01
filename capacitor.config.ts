import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gtu.allinone",
  appName: "GTU All in one",
  webDir: "public",
  server: {
    url: "https://gtu-all-in-one.vercel.app",
    cleartext: true,
    androidScheme: "https",
    allowNavigation: [
      "https://gtu-all-in-one.vercel.app*",
      "https://accounts.google.com*",
      "https://accounts.youtube.com*",
      "https://apis.google.com*",
      "https://*.google.com*",
      "https://*.googleusercontent.com*",
      "https://*.gstatic.com*",
      "https://*.gtu.ac.in*",
      "https://*.darshan.ac.in*"
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#0f172a",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0f172a"
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};

export default config;
