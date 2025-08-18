// Centralized routing configuration for easy management

export const ROUTES = {
  // Main pages
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",

  // Categories
  CATEGORIES: {
    FINANCIAL: "/financial",
    HEALTH: "/health",
    MATH: "/math",
    PHYSICS: "/physics",
    BUSINESS: "/business",
    EDUCATION: "/education",
    AUTOMOTIVE: "/automotive",
    REAL_ESTATE: "/real-estate",
  },

  // Calculators
  CALCULATORS: {
    // Financial
    MORTGAGE: "/financial/mortgage-calculator",
    LOAN: "/financial/loan-calculator",
    COMPOUND_INTEREST: "/financial/compound-interest-calculator",
    INVESTMENT: "/financial/investment-calculator",
    RETIREMENT: "/financial/retirement-calculator",
    TAX: "/financial/tax-calculator",
    CREDIT_CARD_PAYOFF: "/financial/credit-card-payoff-calculator",
    AUTO_LOAN: "/financial/auto-loan-calculator",
    SAVINGS: "/financial/savings-calculator",
    ROI: "/financial/roi-calculator",
    BUDGET: "/financial/budget-calculator",
    DEBT_CONSOLIDATION: "/financial/debt-consolidation-calculator",

    // Health
    BMI: "/health/bmi-calculator",
    CALORIE: "/health/calorie-calculator",
    BODY_FAT: "/health/body-fat-calculator",
    IDEAL_WEIGHT: "/health/ideal-weight-calculator",
    HEART_RATE: "/health/heart-rate-calculator",
    PREGNANCY: "/health/pregnancy-calculator",
    WATER_INTAKE: "/health/water-intake-calculator",
    SLEEP: "/health/sleep-calculator",
    MACRO: "/health/macro-calculator",
    BLOOD_PRESSURE: "/health/blood-pressure-calculator",

    // Math
    PERCENTAGE: "/maths/percentage-calculator",
    FRACTION: "/maths/fraction-calculator",
    ALGEBRA: "/maths/algebra-calculator",
    GEOMETRY: "/maths/geometry-calculator",
    STATISTICS: "/maths/statistics-calculator",
    PROBABILITY: "/maths/probability-calculator",

    // Physics
    VELOCITY: "/physics/velocity-calculator",
    ACCELERATION: "/physics/acceleration-calculator",
    FORCE: "/physics/force-calculator",
    ENERGY: "/physics/energy-calculator",
    POWER: "/physics/power-calculator",
    PRESSURE: "/physics/pressure-calculator",
  },
} as const

// Helper function to get calculator URL
export function getCalculatorUrl(calculatorId: string): string {
  return `/calculator/${calculatorId}`
}

// Helper function to get category URL
export function getCategoryUrl(categoryId: string): string {
  return `/category/${categoryId}`
}

// Calculator categories mapping
export const CALCULATOR_CATEGORIES = {
  financial: [
    "mortgage-calculator",
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
  ],
  health: [
    "bmi-calculator",
    "calorie-calculator",
    "body-fat-calculator",
    "ideal-weight-calculator",
    "heart-rate-calculator",
    "pregnancy-calculator",
    "water-intake-calculator",
    "sleep-calculator",
    "macro-calculator",
    "blood-pressure-calculator",
  ],
  math: ["percentage-calculator", "fraction-calculator", "algebra-calculator", "geometry-calculator", "statistics-calculator", "probability-calculator"],
  physics: ["velocity-calculator", "acceleration-calculator", "force-calculator", "energy-calculator", "power-calculator", "pressure-calculator"],
  business: ["profit-margin-calculator", "break-even-calculator", "cash-flow-calculator", "depreciation-calculator", "payroll-calculator"],
  education: ["gpa-calculator", "grade-calculator", "student-loan-calculator", "scholarship-calculator"],
  automotive: ["car-loan-calculator", "fuel-economy-calculator", "lease-calculator", "insurance-calculator"],
  "real-estate": ["property-tax-calculator", "rent-vs-buy-calculator", "cap-rate-calculator", "cash-on-cash-calculator"],
} as const
