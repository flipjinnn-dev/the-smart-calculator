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
    href: "/calculator/mortgage",
    category: "financial",
    popular: true,
  },
  {
    id: "loan",
    name: "Loan Calculator",
    description: "Calculate loan payments, interest rates, and payoff schedules",
    href: "/calculator/loan",
    category: "financial",
    popular: true,
  },
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest growth over time with regular contributions",
    href: "/calculator/compound-interest",
    category: "financial",
    popular: true,
  },
  {
    id: "interest",
    name: "Interest Calculator",
    description: "Calculate investment growth, interest, and buying power after inflation.",
    href: "/calculator/interest",
    category: "financial",
    popular: true,
  },
  {
    id: "payment",
    name: "Payment Calculator",
    description: "Calculate loan payments for fixed terms or determine loan terms for fixed payments",
    href: "/calculator/payment",
    category: "financial",
    popular: true,
  },
  {
    id: "auto-loan",
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments and total cost",
    href: "/calculator/auto-loan",
    category: "financial",
  },
  {
    id: "amortization",
    name: "Amortization Calculator",
    description: "Generate detailed amortization schedules for loans",
    href: "/calculator/amortization",
    category: "financial",
  },
  {
    id: "currency",
    name: "Currency Calculator",
    description: "Convert between different currencies with real-time rates",
    href: "/calculator/currency",
    category: "financial",
  },
  {
    id: "investment",
    name: "Investment Calculator",
    description: "Calculate investment returns and growth projections",
    href: "/calculator/investment",
    category: "financial",
  },
  {
    id: "retirement",
    name: "Retirement Calculator",
    description: "Plan your retirement savings and calculate required contributions",
    href: "/calculator/retirement",
    category: "financial",
  },
  {
    id: "tax",
    name: "Tax Calculator",
    description: "Calculate income tax, deductions, and tax refunds",
    href: "/calculator/tax",
    category: "financial",
  },
  {
    id: "credit-card-payoff",
    name: "Credit Card Payoff Calculator",
    description: "Calculate time and interest to pay off credit card debt",
    href: "/calculator/credit-card-payoff",
    category: "financial",
  },
  {
    id: "savings",
    name: "Savings Calculator",
    description: "Calculate savings growth with regular deposits",
    href: "/calculator/savings",
    category: "financial",
  },
  {
    id: "roi",
    name: "ROI Calculator",
    description: "Calculate return on investment for various scenarios",
    href: "/calculator/roi",
    category: "financial",
  },
  {
    id: "budget",
    name: "Budget Calculator",
    description: "Create and manage your personal budget",
    href: "/calculator/budget",
    category: "financial",
  },
  {
    id: "debt-consolidation",
    name: "Debt Consolidation Calculator",
    description: "Compare debt consolidation options and savings",
    href: "/calculator/debt-consolidation",
    category: "financial",
  },

  // Health Calculators
  {
    id: "bmi",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your weight status",
    href: "/calculator/bmi",
    category: "health",
    popular: true,
  },
  {
    id: "calorie",
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs based on your lifestyle and goals",
    href: "/calculator/calorie",
    category: "health",
    popular: true,
  },
  {
    id: "body-fat",
    name: "Body Fat Calculator",
    description: "Calculate body fat percentage using various methods",
    href: "/calculator/body-fat",
    category: "health",
  },
  {
    id: "ideal-weight",
    name: "Ideal Weight Calculator",
    description: "Calculate your ideal weight based on height and body frame",
    href: "/calculator/ideal-weight",
    category: "health",
  },
  {
    id: "heart-rate",
    name: "Heart Rate Calculator",
    description: "Calculate target heart rate zones for exercise",
    href: "/calculator/heart-rate",
    category: "health",
  },
  {
    id: "pregnancy",
    name: "Pregnancy Calculator",
    description: "Calculate due date and pregnancy milestones",
    href: "/calculator/pregnancy",
    category: "health",
  },
  {
    id: "water-intake",
    name: "Water Intake Calculator",
    description: "Calculate daily water intake requirements",
    href: "/calculator/water-intake",
    category: "health",
  },
  {
    id: "sleep",
    name: "Sleep Calculator",
    description: "Calculate optimal sleep and wake times",
    href: "/calculator/sleep",
    category: "health",
  },
  {
    id: "macro",
    name: "Macro Calculator",
    description: "Calculate macronutrient requirements for your goals",
    href: "/calculator/macro",
    category: "health",
  },
  {
    id: "pregnancy",
    name: "Pregnancy Calculator",
    description: "Estimate pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date.",
    href: "/calculator/pregnancy",
    category: "health",
    popular: true,
  },
  {
    id: "pregnancy-conception",
    name: "Pregnancy Conception Calculator",
    description: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date.",
    href: "/calculator/pregnancy-conception",
    category: "health",
    popular: true,
  },
  {
    id: "blood-pressure",
    name: "Blood Pressure Calculator",
    description: "Understand blood pressure readings and categories",
    href: "/calculator/blood-pressure",
    category: "health",
  },

  // Math Calculators
  {
    id: "percentage",
    name: "Percentage Calculator",
    description: "Calculate percentages, ratios, and percentage changes easily",
    href: "/calculator/percentage",
    category: "math",
    popular: true,
  },
  {
    id: "fraction",
    name: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions",
    href: "/calculator/fraction",
    category: "math",
  },
  {
    id: "algebra",
    name: "Algebra Calculator",
    description: "Solve algebraic equations and expressions",
    href: "/calculator/algebra",
    category: "math",
  },
  {
    id: "geometry",
    name: "Geometry Calculator",
    description: "Calculate area, perimeter, and volume of geometric shapes",
    href: "/calculator/geometry",
    category: "math",
  },
  {
    id: "statistics",
    name: "Statistics Calculator",
    description: "Calculate mean, median, mode, and standard deviation",
    href: "/calculator/statistics",
    category: "math",
  },
  {
    id: "probability",
    name: "Probability Calculator",
    description: "Calculate probability and combinations",
    href: "/calculator/probability",
    category: "math",
  },

  // Physics Calculators
  {
    id: "velocity",
    name: "Velocity Calculator",
    description: "Calculate velocity, speed, and acceleration",
    href: "/calculator/velocity",
    category: "physics",
  },
  {
    id: "acceleration",
    name: "Acceleration Calculator",
    description: "Calculate acceleration and motion parameters",
    href: "/calculator/acceleration",
    category: "physics",
  },
  {
    id: "force",
    name: "Force Calculator",
    description: "Calculate force using Newton's laws of motion",
    href: "/calculator/force",
    category: "physics",
  },
  {
    id: "energy",
    name: "Energy Calculator",
    description: "Calculate kinetic and potential energy",
    href: "/calculator/energy",
    category: "physics",
  },
  {
    id: "power",
    name: "Power Calculator",
    description: "Calculate electrical and mechanical power",
    href: "/calculator/power",
    category: "physics",
  },
  {
    id: "pressure",
    name: "Pressure Calculator",
    description: "Calculate pressure, force, and area relationships",
    href: "/calculator/pressure",
    category: "physics",
  },

  // Business Calculators
  {
    id: "profit-margin",
    name: "Profit Margin Calculator",
    description: "Calculate gross and net profit margins",
    href: "/calculator/profit-margin",
    category: "business",
  },
  {
    id: "break-even",
    name: "Break Even Calculator",
    description: "Calculate break-even point for your business",
    href: "/calculator/break-even",
    category: "business",
  },
  {
    id: "cash-flow",
    name: "Cash Flow Calculator",
    description: "Calculate and analyze cash flow projections",
    href: "/calculator/cash-flow",
    category: "business",
  },
  {
    id: "depreciation",
    name: "Depreciation Calculator",
    description: "Calculate asset depreciation using various methods",
    href: "/calculator/depreciation",
    category: "business",
  },
  {
    id: "payroll",
    name: "Payroll Calculator",
    description: "Calculate employee payroll and deductions",
    href: "/calculator/payroll",
    category: "business",
  },

  // Education Calculators
  {
    id: "gpa",
    name: "GPA Calculator",
    description: "Calculate Grade Point Average for academic performance",
    href: "/calculator/gpa",
    category: "education",
  },
  {
    id: "grade",
    name: "Grade Calculator",
    description: "Calculate final grades and required scores",
    href: "/calculator/grade",
    category: "education",
  },
  {
    id: "student-loan",
    name: "Student Loan Calculator",
    description: "Calculate student loan payments and repayment options",
    href: "/calculator/student-loan",
    category: "education",
  },
  {
    id: "scholarship",
    name: "Scholarship Calculator",
    description: "Calculate scholarship amounts and requirements",
    href: "/calculator/scholarship",
    category: "education",
  },

  // Automotive Calculators
  {
    id: "car-loan",
    name: "Car Loan Calculator",
    description: "Calculate car loan payments and financing options",
    href: "/calculator/car-loan",
    category: "automotive",
  },
  {
    id: "fuel-economy",
    name: "Fuel Economy Calculator",
    description: "Calculate fuel efficiency and gas mileage",
    href: "/calculator/fuel-economy",
    category: "automotive",
  },
  {
    id: "lease",
    name: "Lease Calculator",
    description: "Calculate car lease payments and terms",
    href: "/calculator/lease",
    category: "automotive",
  },
  {
    id: "insurance",
    name: "Insurance Calculator",
    description: "Calculate auto insurance premiums and coverage",
    href: "/calculator/insurance",
    category: "automotive",
  },

  // Real Estate Calculators
  {
    id: "property-tax",
    name: "Property Tax Calculator",
    description: "Calculate property taxes and assessments",
    href: "/calculator/property-tax",
    category: "real-estate",
  },
  {
    id: "rent-vs-buy",
    name: "Rent vs Buy Calculator",
    description: "Compare renting vs buying a home financially",
    href: "/calculator/rent-vs-buy",
    category: "real-estate",
  },
  {
    id: "cap-rate",
    name: "Cap Rate Calculator",
    description: "Calculate capitalization rate for investment properties",
    href: "/calculator/cap-rate",
    category: "real-estate",
  },
  {
    id: "cash-on-cash",
    name: "Cash on Cash Calculator",
    description: "Calculate cash-on-cash return for real estate investments",
    href: "/calculator/cash-on-cash",
    category: "real-estate",
  },
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
