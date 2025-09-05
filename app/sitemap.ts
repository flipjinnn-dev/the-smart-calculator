import type { MetadataRoute } from "next";
import { ROUTES, CALCULATOR_CATEGORIES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thesmartcalculator.com";

  const pages: MetadataRoute.Sitemap = [];

  // Add main pages dynamically
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

  // Add categories dynamically
  Object.values(ROUTES.CATEGORIES).forEach((path) => {
    pages.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  // Add calculators dynamically from CALCULATOR_CATEGORIES
  Object.entries(CALCULATOR_CATEGORIES).forEach(([category, calculators]) => {
    calculators.forEach((slug) => {
      pages.push({
        url: `${baseUrl}/${category}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  return pages;
}
