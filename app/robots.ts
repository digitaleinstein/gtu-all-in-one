import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/profile"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/profile"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/profile"],
      },
    ],
    sitemap: "https://gtu-all-in-one.vercel.app/sitemap.xml",
    host: "https://gtu-all-in-one.vercel.app",
  };
}
