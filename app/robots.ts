import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/404",
          "/500",
          "/server-sitemap.xml",
        ],
      },
    ],
    sitemap: "https://www.thesmartcalculator.com/sitemap.xml",
  };
}
