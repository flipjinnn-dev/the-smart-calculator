import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/signin", "/auth/*"],
        // index/follow ka option nahi hota — Allow: "/" hi enough hai
      },
    ],
    sitemap: "https://www.thesmartcalculator.com/sitemap.xml",
  };
}
