// routes.ts
import { calculators } from "./calculator-data"

// ✅ Static pages (manually defined)
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about-us",
  CONTACT: "/contact-us",
  PRIVACY: "/privacy-policy",
  TERMS: "/terms-and-conditions",
} as const

// ✅ Categories (fixed)
export const CATEGORIES = {
  FINANCIAL: "/financial",
  HEALTH: "/health",
  MATH: "/maths",
  OTHER: "/other-calculators",
} as const

// ✅ Dynamic: calculators from calculator-data.ts
export const CALCULATOR_ROUTES = calculators.reduce<Record<string, string>>(
  (acc, calc) => {
    const key = calc.id.toUpperCase().replace(/-/g, "_")
    acc[key] = calc.href
    return acc
  },
  {}
)

// ✅ Helper: get single calculator URL by ID
export function getCalculatorUrl(id: string): string | undefined {
  return calculators.find((c) => c.id === id)?.href
}

// ✅ Helper: get all calculators under a category
export function getCalculatorsByCategory(categoryId: string) {
  return calculators.filter((c) => c.category === categoryId)
}
