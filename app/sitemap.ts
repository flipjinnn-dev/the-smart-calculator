import type { MetadataRoute } from "next";
import { ROUTES, CATEGORIES, getCalculatorsByCategory } from "@/lib/routes";
import { calculators } from "@/lib/calculator-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thesmartcalculator.com";

  const pages: MetadataRoute.Sitemap = [];

  // ✅ Add main static pages
  const MAIN_PAGES = [
    ROUTES.HOME,
    ROUTES.ABOUT,
    ROUTES.CONTACT,
    ROUTES.PRIVACY,
    ROUTES.TERMS,
  ];

  MAIN_PAGES.forEach((path) => {
    pages.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === ROUTES.HOME ? "daily" : "monthly",
      priority: path === ROUTES.HOME ? 1 : 0.5,
    });
  });

  // ✅ Add category pages (from fixed CATEGORIES)
  Object.values(CATEGORIES).forEach((path) => {
    pages.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  // ✅ Add all calculators dynamically from calculator-data.ts
  calculators.forEach((calc) => {
    pages.push({
      url: `${baseUrl}${calc.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return pages;
}
