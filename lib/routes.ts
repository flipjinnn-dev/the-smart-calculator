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
    HEALTH: "/category/health",
    MATH: "/category/math",
    PHYSICS: "/category/physics",
    BUSINESS: "/category/business",
    EDUCATION: "/category/education",
    AUTOMOTIVE: "/category/automotive",
    REAL_ESTATE: "/category/real-estate",
  },

  // Calculators
  CALCULATORS: {
    // Financial
    MORTGAGE: "/calculator/mortgage",
    LOAN: "/calculator/loan",
    COMPOUND_INTEREST: "/calculator/compound-interest",
    INVESTMENT: "/calculator/investment",
    RETIREMENT: "/calculator/retirement",
    TAX: "/calculator/tax",
    CREDIT_CARD_PAYOFF: "/calculator/credit-card-payoff",
    AUTO_LOAN: "/calculator/auto-loan",
    SAVINGS: "/calculator/savings",
    ROI: "/calculator/roi",
    BUDGET: "/calculator/budget",
    DEBT_CONSOLIDATION: "/calculator/debt-consolidation",

    // Health
    BMI: "/calculator/bmi",
    CALORIE: "/calculator/calorie",
    BODY_FAT: "/calculator/body-fat",
    IDEAL_WEIGHT: "/calculator/ideal-weight",
    HEART_RATE: "/calculator/heart-rate",
    PREGNANCY: "/calculator/pregnancy",
    WATER_INTAKE: "/calculator/water-intake",
    SLEEP: "/calculator/sleep",
    MACRO: "/calculator/macro",
    BLOOD_PRESSURE: "/calculator/blood-pressure",

    // Math
    PERCENTAGE: "/calculator/percentage",
    FRACTION: "/calculator/fraction",
    ALGEBRA: "/calculator/algebra",
    GEOMETRY: "/calculator/geometry",
    STATISTICS: "/calculator/statistics",
    PROBABILITY: "/calculator/probability",

    // Physics
    VELOCITY: "/calculator/velocity",
    ACCELERATION: "/calculator/acceleration",
    FORCE: "/calculator/force",
    ENERGY: "/calculator/energy",
    POWER: "/calculator/power",
    PRESSURE: "/calculator/pressure",
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
    "mortgage",
    "loan",
    "compound-interest",
    "investment",
    "retirement",
    "tax",
    "credit-card-payoff",
    "auto-loan",
    "savings",
    "roi",
    "budget",
    "debt-consolidation",
  ],
  health: [
    "bmi",
    "calorie",
    "body-fat",
    "ideal-weight",
    "heart-rate",
    "pregnancy",
    "water-intake",
    "sleep",
    "macro",
    "blood-pressure",
  ],
  math: ["percentage", "fraction", "algebra", "geometry", "statistics", "probability"],
  physics: ["velocity", "acceleration", "force", "energy", "power", "pressure"],
  business: ["profit-margin", "break-even", "cash-flow", "depreciation", "payroll"],
  education: ["gpa", "grade", "student-loan", "scholarship"],
  automotive: ["car-loan", "fuel-economy", "lease", "insurance"],
  "real-estate": ["property-tax", "rent-vs-buy", "cap-rate", "cash-on-cash"],
} as const
