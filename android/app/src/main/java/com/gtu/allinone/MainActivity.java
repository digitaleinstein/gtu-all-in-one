package com.gtu.allinone;

import android.Manifest;
import android.app.Dialog;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Message;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final int PERMISSION_REQUEST_CODE = 101;
    private static final String APP_URL = "https://gtu-all-in-one.vercel.app";
    // Standard Mobile Chrome UA that Google OAuth accepts without launching external browser
    private static final String CHROME_MOBILE_UA = "Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";

    private Dialog authPopupDialog = null;

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

        // 1. Set clean standard Chrome User-Agent to prevent Google OAuth from opening external browser
        settings.setUserAgentString(CHROME_MOBILE_UA);

        // 2. Enable modern Web capabilities for high performance & authentication
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setSupportMultipleWindows(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        // 3. Cookie management for Auth sessions & OAuth cookies
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);

        // 4. Register Native Android Download Interface for JavaScript
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidBridge");

        // 5. Native Download Listener for all direct PDF / document clicks
        webView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
                triggerSystemDownload(url, contentDisposition, mimeType);
            }
        });

        // 6. Keep all Google Sign In and App navigations strictly inside this WebView (NO external browser redirect)
        webView.setWebViewClient(new com.getcapacitor.BridgeWebViewClient(this.bridge) {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String targetUrl = request.getUrl().toString();
                if (targetUrl.startsWith("https://accounts.google.") ||
                    targetUrl.contains("google.com") ||
                    targetUrl.contains("googleusercontent.com") ||
                    targetUrl.contains("gstatic.com") ||
                    targetUrl.contains("googleapis.com") ||
                    targetUrl.contains("gtu-all-in-one.vercel.app") ||
                    targetUrl.contains("vercel.app") ||
                    targetUrl.contains("gtu.ac.in") ||
                    targetUrl.contains("gturesults.in") ||
                    targetUrl.contains("darshan.ac.in")) {
                    return false; // Load directly in app WebView
                }
                return super.shouldOverrideUrlLoading(view, request);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                CookieManager.getInstance().flush();
            }
        });

        // 7. Handle Google OAuth Popups & Windows inside the App
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                authPopupDialog = new Dialog(MainActivity.this, android.R.style.Theme_DeviceDefault_Light_NoActionBar_Fullscreen);
                
                WebView popupWebView = new WebView(MainActivity.this);
                WebSettings popupSettings = popupWebView.getSettings();
                popupSettings.setJavaScriptEnabled(true);
                popupSettings.setUserAgentString(CHROME_MOBILE_UA);
                popupSettings.setDomStorageEnabled(true);
                popupSettings.setDatabaseEnabled(true);
                popupSettings.setSupportMultipleWindows(true);
                popupSettings.setJavaScriptCanOpenWindowsAutomatically(true);

                CookieManager.getInstance().setAcceptCookie(true);
                CookieManager.getInstance().setAcceptThirdPartyCookies(popupWebView, true);

                popupWebView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest request) {
                        String targetUrl = request.getUrl().toString();
                        
                        // Check if OAuth has redirected back to GTU Portal
                        if (targetUrl.contains("gtu-all-in-one.vercel.app") || targetUrl.contains("/api/auth/callback") || targetUrl.contains("/profile")) {
                            CookieManager.getInstance().flush();
                            webView.loadUrl(targetUrl);
                            if (authPopupDialog != null && authPopupDialog.isShowing()) {
                                authPopupDialog.dismiss();
                                authPopupDialog = null;
                            }
                            return true;
                        }
                        return false;
                    }

                    @Override
                    public void onPageFinished(WebView v, String url) {
                        super.onPageFinished(v, url);
                        CookieManager.getInstance().flush();
                        if (url.contains("gtu-all-in-one.vercel.app") && !url.contains("/api/auth/signin")) {
                            webView.loadUrl(url);
                            if (authPopupDialog != null && authPopupDialog.isShowing()) {
                                authPopupDialog.dismiss();
                                authPopupDialog = null;
                            }
                        }
                    }
                });

                authPopupDialog.setContentView(popupWebView, new FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                ));
                authPopupDialog.show();

                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(popupWebView);
                resultMsg.sendToTarget();
                return true;
            }

            @Override
            public void onCloseWindow(WebView window) {
                if (authPopupDialog != null && authPopupDialog.isShowing()) {
                    authPopupDialog.dismiss();
                    authPopupDialog = null;
                }
                CookieManager.getInstance().flush();
                webView.reload();
            }
        });
    }

    public void triggerSystemDownload(String url, String contentDisposition, String mimeType) {
        try {
            if (url == null || url.isEmpty()) return;

            // Resolve relative URLs to production domain
            String absoluteUrl = url;
            if (url.startsWith("/")) {
                absoluteUrl = APP_URL + url;
            }

            // Determine accurate file name
            String filename = URLUtil.guessFileName(absoluteUrl, contentDisposition, mimeType);
            if (filename == null || filename.isEmpty() || filename.equals("downloadfile") || filename.equals("download")) {
                if (absoluteUrl.contains("circular") || absoluteUrl.contains("Circular")) {
                    filename = "GTU_Circular_" + System.currentTimeMillis() + ".pdf";
                } else if (absoluteUrl.contains("subjectCode=")) {
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
            } else if (filename.endsWith(".ppt") || filename.endsWith(".pptx")) {
                request.setMimeType("application/vnd.ms-powerpoint");
            }

            // Pass authentication cookies
            String cookies = CookieManager.getInstance().getCookie(absoluteUrl);
            if (cookies != null) {
                request.addRequestHeader("cookie", cookies);
            }
            request.addRequestHeader("User-Agent", CHROME_MOBILE_UA);

            // Android System Notification Settings: Shows progress & completion notifications!
            request.setTitle(filename);
            request.setDescription("GTU All In One: Downloading examination paper / circular...");
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
        if (authPopupDialog != null && authPopupDialog.isShowing()) {
            authPopupDialog.dismiss();
            authPopupDialog = null;
            return;
        }
        if (this.bridge != null && this.bridge.getWebView() != null && this.bridge.getWebView().canGoBack()) {
            this.bridge.getWebView().goBack();
        } else {
            super.onBackPressed();
        }
    }
}
