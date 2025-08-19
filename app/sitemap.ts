import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thesmartcalculator.com/"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  // Category pages
  const categories = ["financial", "health", "math", "physics", "real-estate", "automotive", "business", "education"]

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Calculator pages
  const calculators = [
    "mortgage-calculator",
    "inflation-calculator",
    "loan-calculator",
    "compound-interest-calculator",
    "investment-calculator",
    "retirement-calculator",
    "tax-calculator",
    "credit-card-payoff-calculator",
    "auto-loan-calculator",
    "savings-calculator",
    "roi-calculator",
    "budget-calculator",
    "debt-consolidation-calculator",
    "bmi-calculator",
    "calorie-calculator",
    "percentage-calculator",
  ]

  const calculatorPages = calculators.map((calculator) => ({
    url: `${baseUrl}/calculator/${calculator}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...calculatorPages]
}
