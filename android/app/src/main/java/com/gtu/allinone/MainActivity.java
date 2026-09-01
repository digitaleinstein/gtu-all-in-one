package com.gtu.allinone;

import android.Manifest;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Message;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final int PERMISSION_REQUEST_CODE = 101;
    private static final String APP_URL = "https://gtu-all-in-one.vercel.app";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Check & request notification and storage permissions
        requestRequiredPermissions();

        // Configure WebView once Capacitor bridge is ready
        this.bridge.getWebView().post(this::setupAdvancedWebView);
    }

    private void requestRequiredPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(
                        this,
                        new String[]{Manifest.permission.POST_NOTIFICATIONS},
                        PERMISSION_REQUEST_CODE
                );
            }
        }
    }

    private void setupAdvancedWebView() {
        WebView webView = this.bridge.getWebView();
        if (webView == null) return;

        WebSettings settings = webView.getSettings();

        // 1. Clean User-Agent to allow Google OAuth inside WebView without "disallowed_useragent"
        String originalUa = settings.getUserAgentString();
        String cleanUa = originalUa
                .replace("; wv", "")
                .replaceAll("Version/\\d+\\.\\d+\\s", "")
                .replace("Capacitor", "");
        settings.setUserAgentString(cleanUa);

        // 2. Enable modern Web capabilities for high performance & offline caching
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setSupportMultipleWindows(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        // 3. Cookie management for Auth sessions
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);

        // 4. Register Native Android Download Interface for JavaScript
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidBridge");

        // 5. Native Download Listener with Android DownloadManager & System Notifications
        webView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
                triggerSystemDownload(url, contentDisposition, mimeType);
            }
        });

        // 6. Handle Google Sign-In & Multiple Windows / Popups inside the App
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                WebView newWebView = new WebView(MainActivity.this);
                WebSettings newSettings = newWebView.getSettings();
                newSettings.setJavaScriptEnabled(true);
                newSettings.setUserAgentString(cleanUa);
                newSettings.setDomStorageEnabled(true);
                CookieManager.getInstance().setAcceptThirdPartyCookies(newWebView, true);

                newWebView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest request) {
                        String targetUrl = request.getUrl().toString();
                        if (targetUrl.contains("gtu-all-in-one.vercel.app") || targetUrl.contains("/api/auth/callback")) {
                            webView.loadUrl(targetUrl);
                            return true;
                        }
                        return false;
                    }
                });

                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(newWebView);
                resultMsg.sendToTarget();
                return true;
            }
        });
    }

    public void triggerSystemDownload(String url, String contentDisposition, String mimeType) {
        try {
            if (url == null || url.isEmpty()) return;

            // Handle relative URLs
            String absoluteUrl = url;
            if (url.startsWith("/")) {
                absoluteUrl = APP_URL + url;
            }

            // Determine accurate file name
            String filename = URLUtil.guessFileName(absoluteUrl, contentDisposition, mimeType);
            if (filename == null || filename.isEmpty() || filename.equals("downloadfile")) {
                if (absoluteUrl.contains("subjectCode=")) {
                    filename = "GTU_Paper_" + System.currentTimeMillis() + ".pdf";
                } else {
                    filename = "GTU_Document_" + System.currentTimeMillis() + ".pdf";
                }
            }

            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(absoluteUrl));
            
            // Set MIME type
            if (mimeType != null && !mimeType.isEmpty() && !mimeType.equals("application/octet-stream")) {
                request.setMimeType(mimeType);
            } else if (filename.endsWith(".pdf")) {
                request.setMimeType("application/pdf");
            }

            // Pass authentication cookies
            String cookies = CookieManager.getInstance().getCookie(absoluteUrl);
            if (cookies != null) {
                request.addRequestHeader("cookie", cookies);
            }
            request.addRequestHeader("User-Agent", this.bridge.getWebView().getSettings().getUserAgentString());

            // Android System Notification Settings: Shows downloading & downloaded notification!
            request.setTitle(filename);
            request.setDescription("GTU All In One: Downloading examination paper / notes...");
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, filename);
            request.allowScanningByMediaScanner();

            DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
            if (downloadManager != null) {
                downloadManager.enqueue(request);
                Toast.makeText(this, "📥 Downloading: " + filename + "\nCheck notifications for progress", Toast.LENGTH_LONG).show();
            }
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Download starting in browser...", Toast.LENGTH_SHORT).show();
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
            } catch (Exception ex) {
                Toast.makeText(this, "Failed to download file", Toast.LENGTH_SHORT).show();
            }
        }
    }

    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void downloadFile(String url, String filename, String mimeType) {
            runOnUiThread(() -> {
                triggerSystemDownload(url, "attachment; filename=\"" + filename + "\"", mimeType);
            });
        }

        @JavascriptInterface
        public void showToast(String message) {
            runOnUiThread(() -> {
                Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
            });
        }
    }

    @Override
    public void onBackPressed() {
        if (this.bridge != null && this.bridge.getWebView() != null && this.bridge.getWebView().canGoBack()) {
            this.bridge.getWebView().goBack();
        } else {
            super.onBackPressed();
        }
    }
}
