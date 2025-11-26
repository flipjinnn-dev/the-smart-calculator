import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/404",
          "/500",
          "/server-sitemap.xml",
        ],
        // index/follow ka option nahi hota — Allow: "/" hi enough hai
      },
    ],
    sitemap: "https://www.thesmartcalculator.com/sitemap.xml",
  };
}
