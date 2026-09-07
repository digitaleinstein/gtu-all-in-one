# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.

# Preserve SourceFile and LineNumberTable for readable stack traces in crash reports
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Preserve all annotations and JavaScript interfaces
-keepattributes *Annotation*
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep our native WebAppInterface and MainActivity
-keep class com.gtu.allinone.MainActivity$WebAppInterface {
    public *;
}
-keep class com.gtu.allinone.** { *; }

# Keep Capacitor Bridge and Plugins
-keep class com.getcapacitor.** { *; }
-keep class * extends com.getcapacitor.Plugin { *; }
-keep class * extends com.getcapacitor.BridgeActivity { *; }

# Keep Cordova plugins if any
-keep class org.apache.cordova.** { *; }

# Suppress harmless warnings from third-party libraries
-dontwarn com.google.android.gms.**
-dontwarn org.apache.cordova.**
