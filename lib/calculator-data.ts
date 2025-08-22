// Centralized calculator data for dynamic management

export interface Calculator {
  id: string
  name: string
  description: string
  href: string
  category: string
  popular?: boolean
}

export const calculators: Calculator[] = [
  // Financial Calculators
  {
    id: "mortgage",
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments, total interest, and amortization schedule",
    href: "/financial/mortgage-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "inflation",
    name: "Inflation Calculator",
    description: "Calculate the impact of inflation on purchasing power over time",
    href: "/financial/inflation-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "loan",
    name: "Loan Calculator",
    description: "Calculate loan payments, interest rates, and payoff schedules",
    href: "/financial/loan-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest growth over time with regular contributions",
    href: "/financial/compound-interest-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "interest",
    name: "Interest Calculator",
    description: "Calculate investment growth, interest, and buying power after inflation.",
    href: "/financial/interest-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "payment",
    name: "Payment Calculator",
    description: "Calculate loan payments for fixed terms or determine loan terms for fixed payments",
    href: "/financial/payment-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "auto-loan",
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments and total cost",
    href: "/financial/auto-loan-calculator",
    category: "financial",
  },
  {
    id: "amortization",
    name: "Amortization Calculator",
    description: "Generate detailed amortization schedules for loans",
    href: "/financial/amortization-calculator",
    category: "financial",
  },
  {
    id: "currency",
    name: "Currency Calculator",
    description: "Convert between different currencies with real-time rates",
    href: "/financial/currency-calculator",
    category: "financial",
  },
  {
    id: "investment",
    name: "Investment Calculator",
    description: "Calculate investment returns and growth projections",
    href: "/financial/investment-calculator",
    category: "financial",
  },
  {
    id: "retirement",
    name: "Retirement Calculator",
    description: "Plan your retirement savings and calculate required contributions",
    href: "/financial/retirement-calculator",
    category: "financial",
  },

  // Health Calculators
  {
    id: "bmi",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your weight status",
    href: "/health/bmi-calculator",
    category: "health",
    popular: true,
  },
  {
    id: "calorie",
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs based on your lifestyle and goals",
    href: "/health/calorie-calculator",
    category: "health",
    popular: true,
  },
  {
    id: "body-fat",
    name: "Body Fat Calculator",
    description: "Calculate body fat percentage using various methods",
    href: "/health/body-fat-calculator",
    category: "health",
  },
  {
    id: "macro",
    name: "Macro Calculator",
    description: "Calculate macronutrient requirements for your goals",
    href: "/health/macro-calculator",
    category: "health",
  },
  {
    id: "pregnancy",
    name: "Pregnancy Calculator",
    description: "Estimate pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date.",
    href: "/health/pregnancy-calculator",
    category: "health",
    popular: true,
  },
  {
    id: "pregnancy-conception",
    name: "Pregnancy Conception Calculator",
    description: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date.",
    href: "/health/pregnancy-conception-calculator",
    category: "health",
    popular: true,
  },

  // Math Calculators
  {
    id: "percentage",
    name: "Percentage Calculator",
    description: "Calculate percentages, ratios, and percentage changes easily",
    href: "/maths/percentage-calculator",
    category: "maths",
    popular: true,
  },
  {
    id:"percent-error",
    name: "Percentage Error Calculator",
    description: "Calculate the percentage error between an estimated value and the actual value.",
    href: "/maths/percent-error-calculator",
    category: "maths",
  },
  {
    id: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers within a specified range",
    href: "/maths/random-number-generator",
    category: "maths",
  },
  {
    id:"scientific-calculator",
    name: "Scientific Calculator",
    description: "Perform advanced mathematical calculations and graphing",
    href: "/maths/scientific-calculator",
    category: "maths",
  },
    {
    id:"volume-calculator",
    name: "Volume Calculator",
    description: "Calculate the volume of various shapes",
    href: "/maths/volume-calculator",
    category: "maths",
  },

  // Physics Calculators
  {
    id: "velocity",
    name: "Velocity Calculator",
    description: "Calculate velocity, speed, and acceleration",
    href: "/physics/velocity-calculator",
    category: "physics",
    popular: true
  },
  {
    id: "arrow-speed",
    name: "Arrow Speed Calculator",
    description: "Calculate arrow speed, momentum, and kinetic energy using IBO ratings.",
    href: "/physics/arrow-speed-calculator",
    category: "physics",
  },
  // Construction Calculators
  {
    id: "board-foot",
    name: "Board Foot Calculator",
    description: "Calculate board feet for lumber and building materials",
    href: "/construction/board-foot-calculator",
    category: "construction",
    popular:true
  },
  {
    id: "cubic-yard",
    name: "Cubic Yard Calculator",
    description: "Calculate cubic yards for concrete, soil, and other materials",
    href: "/construction/cubic-yard-calculator",
    category: "construction",
  },
  // Food Calculators
  {
    id: "buttor",
    name: "Butter Calculator",
    description: "Convert butter measurements between sticks, cups, tablespoons, teaspoons, and grams.",
    href: "/food/butter-calculator",
    category: "food",
    popular:true
  },
  {
    id: "cake-pan",
    name: "Cake Pan Calculator",
    description: "Calculate the equivalent sizes of round, square, and rectangular cake pans.",
    href: "/food/cake-pan-calculator",
    category: "food",
    popular:true
  },
  // Sports Calculators
  {
    id: "batting-average",
    name: "Batting Average Calculator",
    description: "Calculate batting average and related statistics",
    href: "/sports/batting-average-calculator",
    category: "sports",
    popular: true
  },
  {
    id:"earned-run-average",
    name: "Earned Run Average Calculator",
    description: "Calculate earned run average (ERA) for pitchers",
    href: "/sports/earned-run-average-calculator",
    category: "sports",
  },

  // Other Calculators
  {
    id: "age",
    name: "Age Calculator",
    description: "Calculate age in years, months, and days",
    href: "/other/age-calculator",
    category: "other",
    popular: true
  },
  {
    id:"time-calculator",
    name: "Time Calculator",
    description: "Perform calculations related to time, such as duration and time zone conversions.",
    href: "/other/time-calculator",
    category: "other",
  }


]

// Helper functions to get calculators by category
export function getCalculatorsByCategory(category: string): Calculator[] {
  return calculators.filter((calc) => calc.category === category)
}

export function getPopularCalculatorsByCategory(category: string): Calculator[] {
  return calculators.filter((calc) => calc.category === category && calc.popular)
}

export function getCalculatorCount(category: string): number {
  return calculators.filter((calc) => calc.category === category).length
}

export function getAllCalculatorsByCategory(): Record<string, Calculator[]> {
  const categories: Record<string, Calculator[]> = {}

  calculators.forEach((calc) => {
    if (!categories[calc.category]) {
      categories[calc.category] = []
    }
    categories[calc.category].push(calc)
  })

  return categories
}
