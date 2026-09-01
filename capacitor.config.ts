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
      "*",
      "accounts.google.com",
      "accounts.google.co.in",
      "accounts.youtube.com",
      "apis.google.com",
      "*.google.com",
      "*.google.co.in",
      "*.googleusercontent.com",
      "*.gstatic.com",
      "*.googleapis.com",
      "gtu-all-in-one.vercel.app",
      "*.vercel.app",
      "gtu.ac.in",
      "*.gtu.ac.in",
      "gturesults.in",
      "*.gturesults.in",
      "darshan.ac.in",
      "*.darshan.ac.in"
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
