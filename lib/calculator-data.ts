// Centralized calculator data for dynamic management

export interface Calculator {
  id: string
  name: string
  description: string
  href: string
  category: string
  subcategory?: string
  popular?: boolean
}

// Function to get language-specific calculator name and description from metadata
import { calculatorsMeta } from '../meta/calculators';
import { getLocalizedCalculatorData, getLocalizedCalculatorHref } from './language-utils';

// Helper function to convert calculator ID to file name
export function getCalculatorFileName(id: string): string {
  // Convert ID to file name format
  if (id === 'bmi') return 'bmi-calculator';
  if (id === 'loan') return 'loan-calculator';
  if (id === 'inflation') return 'inflation-calculator';
  if (id === 'interest-rate-calculator') return 'interest-rate-calculator';
  if (id === 'income-tax-calculator') return 'income-tax-calculator';
  if (id === 'salary-calculator') return 'salary-calculator';
  if (id === 'uif-calculator') return 'uif-calculator';
  if (id === 'vancomycin-calculator') return 'vancomycin-calculator';
  if (id === 'compound-interest') return 'compound-interest-calculator';
  if (id === 'interest') return 'interest-calculator';
  if (id === 'payment') return 'payment-calculator';
  if (id === 'auto-loan') return 'auto-loan-calculator';
  if (id === 'amortization') return 'amortization-calculator';
  if (id === 'currency') return 'currency-calculator';
  if (id === 'investment') return 'investment-calculator';
  if (id === 'retirement') return 'retirement-calculator';
  if (id === '401k-calculator') return '401k-calculator';
  if (id === 'calories-burned-calculator') return 'calories-burned-calculator';
  if (id === 'one-rep-max-calculator') return 'one-rep-max-calculator';
  if (id === 'protein-calculator') return 'protein-calculator';
  if (id === 'sales-tax-calculator') return 'sales-tax-calculator';
  if (id === 'overweight-calculator') return 'overweight-calculator';
  if (id === 'gfr-calculator') return 'gfr-calculator';
  if (id === 'bmr-calculator') return 'bmr-calculator';
  if (id === 'body-fat-calculator') return 'body-fat-calculator';
  if (id === 'body-type-calculator') return 'body-type-calculator';
  if (id === 'bsa-calculator') return 'bsa-calculator';
  if (id === 'calorie-calculator') return 'calorie-calculator';
  if (id === 'carbohydrate-calculator') return 'carbohydrate-calculator';
  if (id === 'compound-interest-calculator') return 'compound-interest-calculator';
  if (id === 'conception-calculator') return 'conception-calculator';
  if (id === 'credit-card-calculator') return 'credit-card-calculator';
  if (id === 'credit-card-payoff-calculator') return 'credit-card-payoff-calculator';
  if (id === 'currency-calculator') return 'currency-calculator';
  if (id === 'debt-payoff-calculator') return 'debt-payoff-calculator';
  if (id === 'due-date-calculator') return 'due-date-calculator';
  if (id === 'estate-tax-calculator') return 'estate-tax-calculator';
  if (id === 'fat-intake-calculator') return 'fat-intake-calculator';
  if (id === 'finance-calculator') return 'finance-calculator';
  if (id === 'healthy-weight-calculator') return 'healthy-weight-calculator';
  if (id === 'house-affordability-calculator') return 'house-affordability-calculator';
  if (id === 'ideal-weight-calculator') return 'ideal-weight-calculator';
  if (id === 'investment-calculator') return 'investment-calculator';
  if (id === 'lean-body-mass-calculator') return 'lean-body-mass-calculator';
  if (id === 'loan-calculator') return 'loan-calculator';
  if (id === 'macro-calculator') return 'macro-calculator';
  if (id === 'marriage-calculator') return 'marriage-calculator';
  if (id === 'mortgage-calculator') return 'mortgage-calculator';
  if (id === 'mortgage-payoff-calculator') return 'mortgage-payoff-calculator';
  if (id === 'one-rep-max-calculator') return 'one-rep-max-calculator';
  if (id === 'overweight-calculator') return 'overweight-calculator';
  if (id === 'ovulation-calculator') return 'ovulation-calculator';
  if (id === 'pace-calculator') return 'pace-calculator';
  if (id === 'payment-calculator') return 'payment-calculator';
  if (id === 'pension-calculator') return 'pension-calculator';
  if (id === 'period-calculator') return 'period-calculator';
  if (id === 'pregnancy-calculator') return 'pregnancy-calculator';
  if (id === 'pregnancy-conception-calculator') return 'pregnancy-conception-calculator';
  if (id === 'pregnancy-due-date') return 'pregnancy-due-date';
  if (id === 'pregnancy-weight-gain-calculator') return 'pregnancy-weight-gain-calculator';
  if (id === 'protein-calculator') return 'protein-calculator';
  if (id === 'rent-calculator') return 'rent-calculator';
  if (id === 'retirement-calculator') return 'retirement-calculator';
  if (id === 'sales-tax-calculator') return 'sales-tax-calculator';
  if (id === 'savings-calculator') return 'savings-calculator';
  if (id === 'social-security-calculator') return 'social-security-calculator';
  if (id === 'target-heart-rate-calculator') return 'target-heart-rate-calculator';
  if (id === 'tdee-calculator') return 'tdee-calculator';
  if (id === 'weight-watcher-calculator') return 'weight-watcher-calculator';
  if (id === 'random-number-generator') return 'random-number-generator';
  if (id === 'scientific-calculator') return 'scientific-calculator';
  if (id === 'volume-calculator') return 'volume-calculator';
  if (id === 'piecewise-function-calculator-grapher') return 'piecewise-function-calculator-grapher';
  if (id === 'cups-to-pounds-converter') return 'cups-to-pounds-converter';
  if (id === 'cooking-measurement-converter') return 'cooking-measurement-converter';
  if (id === 'dry-to-cooked-pasta-converter') return 'dry-to-cooked-pasta-converter';
  if (id === 'acres-per-hour-calculator') return 'acres-per-hour-calculator';
  if (id === 'notice-period-calculator') return 'notice-period-calculator';
  if (id === 'grade-curve-calculator') return 'grade-curve-calculator';
  if (id === 'bank-statement-converter') return 'bank-statement-converter';
  if (id === 'dental-implant-cost-calculator') return 'dental-implant-cost-calculator';
  if (id === 'ssc-gpa-calculator') return 'ssc-gpa-calculator';
  if (id === 'twin-flame-calculator') return 'twin-flame-calculator';
  if (id === 'break-even-roas-calculator') return 'break-even-roas-calculator';
  if (id === 'pressure-washing-estimate-calculator') return 'pressure-washing-estimate-calculator';
  if (id === 'cpv-calculator') return 'cpv-calculator';
  if (id === 'home-reversion-calculator') return 'home-reversion-calculator';
  if (id === 'rip-rap-calculator') return 'rip-rap-calculator';
  if (id === 'soffit-calculator') return 'soffit-calculator';
  if (id === 'ashtakavarga-calculator') return 'ashtakavarga-calculator';
  if (id === 'aquarium-substrate-calculator') return 'aquarium-substrate-calculator';
  if (id === 'fix-and-flip-calculator') return 'fix-and-flip-calculator';
  if (id === 'kite-size-calculator') return 'kite-size-calculator';
  if (id === 'crochet-calculator') return 'crochet-calculator';
  if (id === 'era-calculator') return 'era-calculator';
  if (id === 'extrapolation-calculator') return 'extrapolation-calculator';
  if (id === 'chaturbate-token-calculator') return 'chaturbate-token-calculator';
  if (id === 'garage-conversion-cost-calculator') return 'garage-conversion-cost-calculator';
  if (id === 'newborn-weight-loss-calculator') return 'newborn-weight-loss-calculator';
  if (id === 'sourdough-calculator') return 'sourdough-calculator';

  // For other IDs, just add -calculator suffix if not already present
  return id.endsWith('-calculator') ? id : `${id}-calculator`;
}

export const calculators: Calculator[] = [
  // Financial Calculators
  {
    id: "mortgage-calculator",
    name: "Mortgage Calculators",
    description: "Calculate monthly mortgage payments, total interest, and amortization schedule",
    href: "/financial/mortgage-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "finance-calculator",
    name: "Finance Calculator",
    description: "A comprehensive tool for various financial calculations",
    href: "/financial/finance-calculator",
    category: "financial",
  },
  {
    id: "401k-calculator",
    name: "401(k) Calculator",
    description: "Estimate your 401(k) savings growth and retirement income",
    href: "/financial/401k-calculator",
    category: "financial",
  },
  {
    id: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    description: "Create a debt payoff plan and see how long it will take to become debt-free",
    href: "/financial/debt-payoff-calculator",
    category: "financial",
  },
  {
    id: "house-affordability-calculator",
    name: "House Affordability Calculator",
    description: "Determine how much house you can afford based on your income and expenses",
    href: "/financial/house-affordability-calculator",
    category: "financial",
  },
  {
    id: "estate-tax-calculator",
    name: "Estate Tax Calculator",
    description: "Estimate potential estate taxes and plan your estate accordingly",
    href: "/financial/estate-tax-calculator",
    category: "financial",
  },
  {
    id: "credit-card-payoff-calculator",
    name: "Credit Card Payoff Calculator",
    description: "Calculate how long it will take to pay off your credit card debt and interest",
    href: "/financial/credit-card-payoff-calculator",
    category: "financial",
  },
  {
    id: "credit-card-calculator",
    name: "Credit Card Calculator",
    description: "Calculate your credit card payments, interest charges, and payoff timeline",
    href: "/financial/credit-card-calculator",
    category: "financial",
  },
  {
    id: "annuity-payout-calculator",
    name: "Annuity Payout Calculator",
    description: "Calculate the payout amount for an annuity based on various factors",
    href: "/financial/annuity-payout-calculator",
    category: "financial",
  },
  {
    id: "annuity-calculator",
    name: "Annuity Calculator",
    description: "Calculate the future value of an annuity based on regular contributions and interest rates",
    href: "/financial/annuity-calculator",
    category: "financial",
  },
  {
    id: "social-security-calculator",
    name: "Social Security Calculator",
    description: "Estimate your Social Security benefits based on your earnings history",
    href: "/financial/social-security-calculator",
    category: "financial",
  },
  {
    id: "pension-calculator",
    name: "Pension Calculator",
    description: "Estimate your pension benefits based on salary and years of service",
    href: "/financial/pension-calculator",
    category: "financial",
  },
  {
    id: "savings-calculator",
    name: "Savings Calculator",
    description: "Calculate your savings growth over time with regular contributions",
    href: "/financial/savings-calculator",
    category: "financial",
  },
  {
    id: "marriage-calculator",
    name: "Marriage Calculator",
    description: "Evaluate the financial implications of marriage",
    href: "/financial/marriage-calculator",
    category: "financial",
  },
  {
    id: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    description: "Calculate sales tax for purchases based on local tax rates",
    href: "/financial/sales-tax-calculator",
    category: "financial",
  },
  {
    id: "inflation-calculator",
    name: "Inflation Calculator",
    description: "Calculate the impact of inflation on purchasing power over time",
    href: "/financial/inflation-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "rent-calculator",
    name: "Rent Calculator",
    description: "Calculate your monthly rent payments and affordability",
    href: "/financial/rent-calculator",
    category: "financial",
  },
  {
    id: "interest-rate-calculator",
    name: "Interest Rate Calculator",
    description: "Calculate the impact of interest rates on loans and investments",
    href: "/financial/interest-rate-calculator",
    category: "financial",
  },
  {
    id: "income-tax-calculator",
    name: "Income Tax Calculator",
    description: "Calculate your income tax based on various deductions and exemptions",
    href: "/financial/income-tax-calculator",
    category: "financial",
  },
  {
    id: "salary-calculator",
    name: "Salary Calculator",
    description: "Calculate your take-home pay after taxes and deductions",
    href: "/financial/salary-calculator",
    category: "financial",
  },
  {
    id: "uif-calculator",
    name: "UIF Calculator",
    description: "Calculate unemployment and maternity benefits in South Africa",
    href: "/uif-calculator",
    category: "other",
  },
  {
    id: "vancomycin-calculator",
    name: "Vancomycin Calculator",
    description: "Calculate vancomycin dosing, AUC, trough levels for clinical use",
    href: "/health/vancomycin-calculator",
    category: "health",
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate loan payments, interest rates, and payoff schedules",
    href: "/financial/loan-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest growth over time with regular contributions",
    href: "/financial/compound-interest-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "interest-calculator",
    name: "Interest Calculator",
    description: "Calculate investment growth, interest, and buying power after inflation.",
    href: "/financial/interest-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "payment-calculator",
    name: "Payment Calculator",
    description: "Calculate loan payments for fixed terms or determine loan terms for fixed payments",
    href: "/financial/payment-calculator",
    category: "financial",
    popular: true,
  },
  {
    id: "auto-loan-calculator",
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments and total cost",
    href: "/financial/auto-loan-calculator",
    category: "financial",
  },
  {
    id: "amortization-calculator",
    name: "Amortization Calculator",
    description: "Generate detailed amortization schedules for loans",
    href: "/financial/amortization-calculator",
    category: "financial",
  },
  {
    id: "mortgage-payoff-calculator",
    name: "Mortgage Payoff Calculator",
    description: "Calculate your mortgage payoff date and total interest savings",
    href: "/financial/mortgage-payoff-calculator",
    category: "financial",
  },
  {
    id: "reverse-sales-tax-calculator",
    name: "Reverse Sales Tax Calculator",
    description: "Calculate pre-tax price and exact tax amount from a tax-inclusive total price",
    href: "/financial/reverse-sales-tax-calculator",
    category: "financial",
  },
  {
    id: "currency-calculator",
    name: "Currency Calculator",
    description: "Convert between different currencies with real-time rates",
    href: "/financial/currency-calculator",
    category: "financial",
  },
  {
    id: "bank-statement-converter",
    name: "Bank Statement Converter",
    description: "Convert any bank statement (PDF, Excel, CSV) from any country or bank into standardized CSV format",
    href: "/financial/bank-statement-converter",
    category: "financial",
  },
  {
    id: "investment-calculator",
    name: "Investment Calculator",
    description: "Calculate investment returns and growth projections",
    href: "/financial/investment-calculator",
    category: "financial",
  },
  {
    id: "retirement-calculator",
    name: "Retirement Calculator",
    description: "Plan your retirement savings and calculate required contributions",
    href: "/financial/retirement-calculator",
    category: "financial",
  },

  // Health Calculators
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your weight status",
    href: "/health/bmi-calculator",
    category: "health",
    popular: true,
  },
  {
    id: "pregnancy-weight-gain-calculator",
    name: "Pregnancy Weight Gain Calculator",
    description: "Calculate your recommended weight gain during pregnancy",
    href: "/health/pregnancy-weight-gain-calculator",
    category: "health",
  },
  {
    id: "calories-burned-calculator",
    name: "Calories Burned Calculator",
    description: "Estimate the number of calories burned during physical activities.",
    href: "/health/calories-burned-calculator",
    category: "health"
  },
  {
    id: "due-date-calculator",
    name: "Due Date Calculator",
    description: "Estimate your due date based on your last menstrual period or conception date.",
    href: "/health/due-date-calculator",
    category: "health",
  },
  {
    id: "pace-calculator",
    name: "Pace Calculator",
    description: "Calculate your running pace and speed",
    href: "/health/pace-calculator",
    category: "health",
  },
  {
    id: "one-rep-max-calculator",
    name: "One Rep Max Calculator",
    description: "Estimate your one-rep max for strength training exercises.",
    href: "/health/one-rep-max-calculator",
    category: "health"
  },
  {
    id: "army-body-fat-calculator",
    name: "Army Body Fat Calculator",
    description: "Calculate body fat percentage using the U.S. Army method.",
    href: "/health/army-body-fat-calculator",
    category: "health"
  },
  {
    id: "target-heart-rate-calculator",
    name: "Target Heart Rate Calculator",
    description: "Calculate your target heart rate zone for exercise.",
    href: "/health/target-heart-rate-calculator",
    category: "health"
  },
  {
    id: "protein-calculator",
    name: "Protein Calculator",
    description: "Calculate your daily protein needs based on activity level and goals",
    href: "/health/protein-calculator",
    category: "health"
  },
  {
    id: "healthy-weight-calculator",
    name: "Healthy Weight Calculator",
    description: "Calculate your healthy weight range based on height and gender",
    href: "/health/healthy-weight-calculator",
    category: "health"
  },
  {
    id: "fat-intake-calculator",
    name: "Fat Intake Calculator",
    description: "Calculate your daily fat needs based on activity level and goals",
    href: "/health/fat-intake-calculator",
    category: "health"
  },
  {
    id: "carbohydrate-calculator",
    name: "Carbohydrate Calculator",
    description: "Calculate your daily carbohydrate needs based on activity level and goals",
    href: "/health/carbohydrate-calculator",
    category: "health"
  },
  {
    id: "ovulation-calculator",
    name: "Ovulation Calculator",
    description: "Estimate your ovulation date and fertile window",
    href: "/health/ovulation-calculator",
    category: "health"
  },
  {
    id: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    description: "Calculate your lean body mass based on weight and body fat percentage",
    href: "/health/lean-body-mass-calculator",
    category: "health"
  },
  {
    id: "tdee-calculator",
    name: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) based on activity level",
    href: "/health/tdee-calculator",
    category: "health"
  },
  {
    id: "conception-calculator",
    name: "Conception Calculator",
    description: "Estimate your conception date based on ovulation and intercourse dates.",
    href: "/health/conception-calculator",
    category: "health"
  },
  {
    id: "gfr-calculator",
    name: "GFR Calculator",
    description: "Estimate your Glomerular Filtration Rate (GFR) based on creatinine levels.",
    href: "/health/gfr-calculator",
    category: "health"
  },
  {
    id: "anorexic-bmi-calculator",
    name: "Anorexic BMI Calculator",
    description: "Calculate BMI for individuals with anorexia.",
    href: "/health/anorexic-bmi-calculator",
    category: "health"
  },
  {
    id: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight range based on height and gender",
    href: "/health/ideal-weight-calculator",
    category: "health"
  },
  {
    id: "overweight-calculator",
    name: "Overweight Calculator",
    description: "Calculate BMI for individuals with overweight.",
    href: "/health/overweight-calculator",
    category: "health"
  },
  {
    id: "body-type-calculator",
    name: "Body Type Calculator",
    description: "Determine your body type based on measurements and characteristics.",
    href: "/health/body-type-calculator",
    category: "health"
  },
  {
    id: "period-calculator",
    name: "Period Calculator",
    description: "Calculate your menstrual cycle and ovulation dates.",
    href: "/health/period-calculator",
    category: "health"
  },
  {
    id: "bmr-calculator",
    name: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate (BMR) for calorie needs",
    href: "/health/bmr-calculator",
    category: "health",
  },
  {
    id: "weight-watchers-points-calculator",
    name: "Weight Watchers Points Calculator",
    description: "Calculate Weight Watchers points based on food items.",
    href: "/health/weight-watchers-points-calculator",
    category: "health"
  },
  {
    id: "body-surface-area-calculator",
    name: "Body Surface Area Calculator",
    description: "Calculate your body surface area (BSA) using various methods.",
    href: "/health/body-surface-area-calculator",
    category: "health"
  },
  {
    id: "calorie-calculator",
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs based on your lifestyle and goals",
    href: "/health/calorie-calculator",
    category: "health",
    popular: true,
  },
  {
    id: "bac-calculator",
    name: "Blood Alcohol Content (BAC) Calculator",
    description: "Estimate your blood alcohol content (BAC) based on drinks consumed.",
    href: "/health/bac-calculator",
    category: "health"
  },
  {
    id: "body-fat-calculator",
    name: "Body Fat Calculator",
    description: "Calculate body fat percentage using various methods",
    href: "/health/body-fat-calculator",
    category: "health",
  },
  {
    id: "macro-calculator",
    name: "Macro Calculator",
    description: "Calculate macronutrient requirements for your goals",
    href: "/health/macro-calculator",
    category: "health",
  },
  {
    id: "pregnancy-calculator",
    name: "Pregnancy Calculator",
    description: "Estimate pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date.",
    href: "/health/pregnancy-calculator",
    category: "health",
    popular: true,
  },
  {
    id: "pregnancy-conception-calculator",
    name: "Pregnancy Conception Calculator",
    description: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date.",
    href: "/health/pregnancy-conception-calculator",
    category: "health",
    popular: true,
  },
  {
    id: "rucking-calorie-calculator",
    name: "Rucking Calorie Calculator",
    description: "Calculate calories burned during weighted walks (rucking) using the Pandolf equation",
    href: "/health/rucking-calorie-calculator",
    category: "health",
  },
  {
    id: "dental-implant-cost-calculator",
    name: "Dental Implant Cost Calculator",
    description: "Use our dental implant cost calculator to estimate per tooth, 6 teeth, 7 implants, or full mouth dental implant costs fast.",
    href: "/health/dental-implant-cost-calculator",
    category: "health",
  },
  {
    id: "peth-test-calculator",
    name: "PEth Test Calculator",
    description: "Estimate your PEth level and alcohol clearance date using half-life science. Learn detection window, cutoff levels, and safe testing timeline.",
    href: "/health/peth-test-calculator",
    category: "health",
  },

  // Math Calculators
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, ratios, and percentage changes easily",
    href: "/maths/percentage-calculator",
    category: "maths",
    popular: true,
  },
  {
    id: "inflection-point-calculator",
    name: "Inflection Point Calculator",
    description: "Find inflection points where a function changes concavity.",
    href: "/maths/inflection-point-calculator",
    category: "maths",
  },
  {
    id: "empirical-rule-calculator",
    name: "Empirical Rule Calculator",
    description: "Calculate the empirical rule for a given set of data.",
    href: "/maths/empirical-rule-calculator",
    category: "maths",
    popular: true
  },
  {
    id: "reverse-percentage-calculator",
    name: "Reverse Percentage Calculator",
    description: "Calculate original prices, discounts, or tax amounts by working backwards from final values and percentages",
    href: "/maths/reverse-percentage-calculator",
    category: "maths",
    popular: true,
  },
  {
    id: "square-root-curve-calculator",
    name: "Square Root Curve Calculator",
    description: "Convert grades using the square root grading curve method",
    href: "/maths/square-root-curve-calculator",
    category: "maths",
    popular: false
  },
  {
    id: "percent-error",
    name: "Percentage Error Calculator",
    description: "Calculate the percentage error between an estimated value and the actual value.",
    href: "/maths/percent-error-calculator",
    category: "maths",
  },
  {
    id: "critical-point-calculator",
    name: "Critical Point Calculator",
    description: "Calculate the critical point of a function.",
    href: "/maths/critical-point-calculator",
    category: "maths",
  },
  {
    id: "relative-extrema-calculator",
    name: "Relative Extrema Calculator",
    description: "Find all relative maxima, minima, and saddle points with step-by-step solutions",
    href: "/maths/relative-extrema-calculator",
    category: "maths",
  },
  {
    id: "simpsons-rule-calculator",
    name: "Simpson's Rule Calculator",
    description: "Calculate definite integrals using Simpson's Rule.",
    href: "/maths/simpsons-rule-calculator",
    category: "maths",
  },
  {
    id: "mean-value-theorem-calculator",
    name: "Mean Value Theorem Calculator",
    description: "Apply the Mean Value Theorem to find points on a curve.",
    href: "/maths/mean-value-theorem-calculator",
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
    id: "scientific-calculator",
    name: "Scientific Calculator",
    description: "Perform advanced mathematical calculations and graphing",
    href: "/maths/scientific-calculator",
    category: "maths",
  },
  {
    id: "volume-calculator",
    name: "Volume Calculator",
    description: "Calculate the volume of various shapes",
    href: "/maths/volume-calculator",
    category: "maths",
  },

  // Physics Calculators
  {
    id: "orthogonal-projection-calculator",
    name: "Orthogonal Projection Calculator",
    description: "Calculate the orthogonal projection of one vector onto another with step-by-step solutions and detailed analysis",
    href: "/physics/orthogonal-projection-calculator",
    category: "physics",
    popular: true
  },
  {
    id: "ballistic-coefficient",
    name: "Ballistic Coefficient Calculator",
    description: "Calculate the ballistic coefficient of a projectile.",
    href: "/physics/ballistic-coefficient-calculator",
    category: "physics",
  },
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
  {
    id: "car-jump-distance",
    name: "Car Jump Distance Calculator",
    description: "Calculate the distance a car can jump based on speed and angle.",
    href: "/physics/car-jump-distance-calculator",
    category: "physics",
  },
  {
    id: "conservation-of-momentum",
    name: "Conservation of Momentum Calculator",
    description: "Calculate momentum before and after collisions using conservation laws",
    href: "/physics/conservation-of-momentum-calculator",
    category: "physics",
  },
  {
    id: "power-to-weight-ratio",
    name: "Power-to-Weight Ratio Calculator",
    description: "Calculate acceleration & efficiency of cars, bikes, F1 cars, or cyclists",
    href: "/physics/power-to-weight-ratio-calculator",
    category: "physics",
  },
  {
    id: "phasor-calculator",
    name: "Phasor Calculator",
    description: "Learn phasor calculator concepts for AC circuits, conversions, impedance, and power factor. Simple guide with formulas, examples, and FAQs.",
    href: "/physics/phasor-calculator",
    category: "physics",
    popular: false,
  },
  // Construction Calculators
  {
    id: "board-foot",
    name: "Board Foot Calculator",
    description: "Calculate board feet for lumber and building materials",
    href: "/construction/board-foot-calculator",
    category: "construction",
    popular: true
  },
  {
    id: "cubic-yard",
    name: "Cubic Yard Calculator",
    description: "Calculate cubic yards for concrete, soil, and other materials",
    href: "/construction/cubic-yard-calculator",
    category: "construction",
  },
  {
    id: "gallons-per-square-foot",
    name: "Gallons per Square Foot Calculator",
    description: "Calculate the number of gallons needed per square foot for painting or flooring.",
    href: "/construction/gallons-per-square-foot-calculator",
    category: "construction",
  },
  {
    id: "size-to-weight-rectangular-cuboid",
    name: "Size to Weight Calculator",
    description: "Calculate the weight of a rectangular cuboid given its dimensions and material density.",
    href: "/construction/size-to-weight-rectangular-cuboid-calculator",
    category: "construction"
  },
  {
    id: "square-feet-to-cubic-yards",
    name: "Square Feet to Cubic Yards Calculator",
    description: "Convert square feet to cubic yards for concrete and other materials.",
    href: "/construction/square-feet-to-cubic-yards-calculator",
    category: "construction"
  },
  {
    id: "paver-base-calculator",
    name: "Paver Base Calculator",
    description: "Calculate gravel, sand, and base material needed for paving projects",
    href: "/construction/paver-base-calculator",
    category: "construction",
    popular: true
  },
  {
    id: "angle-weight-calculator",
    name: "Angle Weight Calculator",
    description: "Calculate steel, MS, SS, and aluminum angle weight in kg",
    href: "/construction/angle-weight-calculator",
    category: "construction"
  },
  {
    id: "board-and-batten-calculator",
    name: "Board and Batten Calculator",
    description: "Calculate boards, battens, spacing, and siding materials for wall projects",
    href: "/construction/board-and-batten-calculator",
    category: "construction"
  },
  // Food Calculators
  {
    id: "butter",
    name: "Butter Calculator",
    description: "Convert butter measurements between sticks, cups, tablespoons, teaspoons, and grams.",
    href: "/food/butter-calculator",
    category: "food",
    popular: true
  },
  {
    id: "cake-pan",
    name: "Cake Pan Calculator",
    description: "Calculate the equivalent sizes of round, square, and rectangular cake pans.",
    href: "/food/cake-pan-calculator",
    category: "food",
    popular: true
  },
  {
    id: "cooking-measurement-converter",
    name: "Cooking Measurement Converter",
    description: "Convert between different cooking measurements.",
    href: "/food/cooking-measurement-converter",
    category: "food",
  },
  {
    id: "dry-to-cooked-pasta-converter",
    name: "Dry to Cooked Pasta Converter",
    description: "Convert dry pasta measurements to cooked pasta equivalents.",
    href: "/food/dry-to-cooked-pasta-converter",
    category: "food"
  },
  {
    id: "cups-to-pounds-converter",
    name: "Cups to Pounds Converter",
    description: "Convert cups to pounds for various ingredients.",
    href: "/food/cups-to-pounds-converter",
    category: "food"
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
    id: "earned-run-average",
    name: "Earned Run Average Calculator",
    description: "Calculate earned run average (ERA) for pitchers",
    href: "/sports/earned-run-average-calculator",
    category: "sports",
  },
  {
    id: "fielding-percentage",
    name: "Fielding Percentage Calculator",
    description: "Calculate fielding percentage for baseball players",
    href: "/sports/fielding-percentage-calculator",
    category: "sports",
  },
  {
    id: "fielding-independent-pitching",
    name: "Fielding Independent Pitching Calculator",
    description: "Calculate fielding independent pitching (FIP) for baseball players",
    href: "/sports/fielding-independent-pitching-calculator",
    category: "sports",
  },
  {
    id: "magic-number",
    name: "Magic Number Calculator",
    description: "Calculate the magic number for playoff contention in sports.",
    href: "/sports/magic-number-calculator",
    category: "sports",
  },

  // Other Calculators
  {
    id: "towing-estimate-calculator",
    name: "Towing Estimate Calculator",
    description: "Calculate towing costs based on vehicle type, distance, location, and services",
    href: "/other/towing-estimate-calculator",
    category: "other",
    popular: true
  },
  {
    id: "age",
    name: "Age Calculator",
    description: "Calculate age in years, months, and days",
    href: "/age-calculator",
    category: "other",
    popular: true
  },
  {
    id: "twin-flame-calculator",
    name: "Twin Flame Calculator",
    description: "Calculate spiritual compatibility using numerology, birth charts, and lunar phases",
    href: "/twin-flame-calculator",
    category: "other",
    popular: false
  },
  {
    id: "end-of-service-calculator",
    name: "End of Service Calculator",
    description: "Use our End of Service Calculator to calculate the end of service date, salary, and benefits.",
    href: "/end-of-service-calculator",
    category: "other",
    popular: true
  },
  {
    id: "piecewise-function-calculator-grapher",
    name: "Piecewise Function Calculator & Grapher",
    description: "Define, evaluate, and graph piecewise functions.",
    href: "/piecewise-function-calculator-grapher",
    category: "other",
  },
  {
    id: "rpe-calculator",
    name: "RPE Calculator",
    description: "Calculate the rate of perceived exertion (RPE) for various activities.",
    href: "/rpe-calculator",
    category: "other",
  },
  {
    id: "indiana-child-support-calculator",
    name: "Indiana Child Support Calculator",
    description: "Estimate child support payments based on Indiana state guidelines.",
    href: "/indiana-child-support-calculator",
    category: "other",
  },
  {
    id: "time-calculator",
    name: "Time Calculator",
    description: "Perform calculations related to time, such as duration and time zone conversions.",
    href: "/time-calculator",
    category: "other",
  },
  {
    id: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate GPA based on course grades and credits.",
    href: "/gpa-calculator",
    category: "other",
  },
  {
    id: "grade-curve-calculator",
    name: "Grade Curve Calculator",
    description: "Adjust student scores using different curving methods to reflect relative class performance.",
    href: "/grade-curve-calculator",
    category: "other",
  },
  {
    id: "height-calculator",
    name: "Height Calculator",
    description: "Calculate height in different units.",
    href: "/height-calculator",
    category: "other",
  },
  {
    id: "ovr-calculator",
    name: "OVR Calculator",
    description: "Calculate the OVR (Overall Rating) for video games.",
    href: "/ovr-calculator",
    category: "other",
    popular: true,
  },
  {
    id: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    description: "Calculate subnets and IP ranges.",
    href: "/ip-subnet-calculator",
    category: "other",
  },
  {
    id: "implant-size-calculator",
    name: "Breast Implant Size Calculator",
    description: "Calculate ideal breast implant size based on body measurements and desired cup size for natural, proportional results.",
    href: "/implant-size-calculator",
    category: "other",
    popular: true,
  },

  // Software, Web & IT Calculators
  {
    id: "enterprise-seo-roi-calculator",
    name: "Enterprise SEO ROI Calculator",
    description: "Calculate the return on investment (ROI) for enterprise SEO.",
    href: "/software/enterprise-seo-roi-calculator",
    category: "software",
  },
  {
    id: "website-cost-calculator",
    name: "Website Cost Calculator",
    description: "Estimate website development costs based on features, design level, and functionality.",
    href: "/software/website-cost-calculator",
    category: "software",
    popular: true,
  },
  {
    id: "youtube-money-calculator",
    name: "YouTube Money Calculator",
    description: "Estimate YouTube earnings with RPM, views, CPM & sponsorship calculator for 2026.",
    href: "/software/youtube-money-calculator",
    category: "software",
    popular: true,
  },
  {
    id: "app-cost-calculator",
    name: "App Cost Calculator",
    description: "Estimate mobile and web app development costs with feature-based pricing. Get instant quotes for design, development, and deployment.",
    href: "/software/app-cost-calculator",
    category: "software",
    popular: true,
  },

  // Business & Startups Calculators
  {
    id: "break-even-calculator",
    name: "Break-Even Calculator",
    description: "Calculate break-even point in units and revenue to determine when your business becomes profitable.",
    href: "/business/break-even-calculator",
    category: "business",
    popular: true,
  },
  {
    id: "startup-costs-calculator",
    name: "Business Startup Cost Calculator",
    description: "Calculate total business startup costs and funding requirements including all expenses for your new business.",
    href: "/business/startup-costs-calculator",
    category: "business",
    popular: true,
  },

  // Other Calculators (English-only)
  {
    id: "therapy-productivity-calculator",
    name: "Therapy Productivity Calculator",
    description: "Measure therapist efficiency by comparing direct patient care time with total work hours. Track daily, weekly, or monthly productivity.",
    href: "/therapy-productivity-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "acres-per-hour-calculator",
    name: "Acres Per Hour Calculator",
    description: "Calculate acres per hour for mowing, planting, spraying, and tillage using width, speed, and efficiency",
    href: "/acres-per-hour-calculator",
    category: "other",
    popular: true,
  },
  {
    id: "notice-period-calculator",
    name: "Notice Period Calculator",
    description: "Calculate your last working day, notice duration, end date, and estimate notice period pay",
    href: "/notice-period-calculator",
    category: "other",
    popular: true,
  },
  {
    id: "ssc-gpa-calculator",
    name: "SSC GPA Calculator",
    description: "Calculate SSC GPA using Bangladesh grading system with marks to grade conversion and percentage calculator",
    href: "/ssc-gpa-calculator",
    category: "other",
    popular: true,
  },
  {
    id: "break-even-roas-calculator",
    name: "Break-Even ROAS Calculator",
    description: "Calculate your Break-Even ROAS and Target ROAS based on gross margin to stop losing money on ads.",
    href: "/business/break-even-roas-calculator",
    category: "business",
    popular: true,
  },
  {
    id: "pressure-washing-estimate-calculator",
    name: "Pressure Washing Estimate Calculator",
    description: "Calculate pressure washing costs per sq ft for driveways, houses, and commercial properties with instant estimates",
    href: "/pressure-washing-estimate-calculator",
    category: "other",
    popular: true,
  },
  {
    id: "venmo-fee-calculator",
    name: "Venmo Fee Calculator",
    description: "Calculate Venmo fees instantly for instant transfers, credit card payments, and goods & services",
    href: "/financial/venmo-fee-calculator",
    category: "financial",
    popular: false,
  },
  {
    id: "grailed-fee-calculator",
    name: "Grailed Fee Calculator",
    description: "Calculate Grailed fees & payout instantly. Free calculator shows commission, Stripe processing fees, and net earnings",
    href: "/financial/grailed-fee-calculator",
    category: "financial",
    popular: false,
  },
  {
    id: "loft-conversion-cost-calculator",
    name: "Loft Conversion Cost Calculator",
    description: "Calculate loft conversion costs for UK projects. Get estimates for Velux, dormer, hip-to-gable, mansard conversions",
    href: "/construction/loft-conversion-cost-calculator",
    category: "construction",
    popular: false,
  },
  {
    id: "home-inspection-cost-calculator",
    name: "Home Inspection Cost Calculator",
    description: "Estimate your home inspection cost based on size, age, location, and add-ons. Get accurate pricing instantly",
    href: "/home-inspection-cost-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "wall-panelling-calculator",
    name: "Wall Panelling Calculator",
    description: "Calculate how much wall panelling you need for MDF, shaker, dado, box & wood panels. Get accurate measurements and spacing",
    href: "/wall-panelling-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "song-length-calculator",
    name: "Song Length Calculator",
    description: "Calculate total duration of songs, playlists, and tracks. Add multiple songs, convert time formats, and estimate song length using BPM",
    href: "/song-length-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "ethnicity-calculator",
    name: "Ethnicity Calculator",
    description: "Calculate your ethnic percentage based on parents and ancestors. Estimate baby ethnicity, DNA results, and explore your ethnic background",
    href: "/ethnicity-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "flange-weight-calculator",
    name: "Flange Weight Calculator",
    description: "Calculate flange weight in kg or pounds using standard formulas. Supports blind, weld neck, slip-on flanges with carbon steel, stainless steel materials",
    href: "/construction/flange-weight-calculator",
    category: "construction",
    popular: false,
  },
  {
    id: "msi-calculator",
    name: "MSI Calculator",
    description: "Calculate PC power consumption, PSU wattage requirements, and component compatibility. Analyzes CPU, GPU, RAM, storage for optimal power supply selection",
    href: "/msi-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "water-potential-calculator",
    name: "Water Potential Calculator",
    description: "Calculate water potential (ψ) using ψ = ψs + ψp formula. Includes osmotic potential, pressure potential for AP Biology and A-Level labs",
    href: "/water-potential-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "whatnot-fee-calculator",
    name: "Whatnot Fee Calculator",
    description: "Calculate Whatnot seller fees for US, UK & Canada. Instant commission, processing fee & net profit calculator for all categories",
    href: "/whatnot-fee-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "depop-fee-calculator",
    name: "Depop Fee Calculator",
    description: "Calculate Depop seller fees for US, UK & Australia. Free tool for selling fees, processing fees & net profit with 0% fees for US/UK",
    href: "/depop-fee-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "cpv-calculator",
    name: "CPV Calculator",
    description: "Calculate cost per view for video ads. Free CPV calculator for YouTube, Google Ads with CPV to CPM converter",
    href: "/cpv-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "evony-troop-calculator",
    name: "Evony Troop Calculator",
    description: "Use Evony Troop Calculator to estimate troop cost, RSS, power, training & healing. Plan T1–T16 troops, optimize PvP & save resources easily.",
    href: "/evony-troop-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "home-reversion-calculator",
    name: "Home Reversion Calculator",
    description: "Estimate your equity release payout instantly. Calculate home reversion plan cash release based on age, property value & share sold",
    href: "/home-reversion-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "rip-rap-calculator",
    name: "Rip Rap Calculator",
    description: "Calculate rip rap tons, cubic yards, coverage & cost. Free erosion control stone calculator for channels, shorelines & slopes",
    href: "/construction/rip-rap-calculator",
    category: "construction",
    popular: false,
  },
  {
    id: "soffit-calculator",
    name: "Soffit Calculator",
    description: "Calculate soffit area, vents, fascia & cost. Free soffit replacement calculator for roofing projects with ventilation requirements",
    href: "/construction/soffit-calculator",
    category: "construction",
    popular: false,
  },
  {
    id: "polymeric-sand-calculator",
    name: "Polymeric Sand Calculator",
    description: "Calculate how many bags of polymeric sand needed for pavers. Free estimator for Dominator, Techniseal, Alliance Gator & more",
    href: "/construction/polymeric-sand-calculator",
    category: "construction",
    popular: false,
  },
  {
    id: "seatime-calculator",
    name: "Seatime Calculator",
    description: "Calculate total sea service in days and months for seafarers. Perfect for DG Shipping, MCA, USCG & STCW CoC applications",
    href: "/seatime-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "ashtakavarga-calculator",
    name: "Ashtakavarga Calculator",
    description: "Free ashtakavarga calculator online. Get complete ashtakavarga chart, sarvashtakavarga & bhinnashtakavarga scores by date of birth",
    href: "/ashtakavarga-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "aquarium-substrate-calculator",
    name: "Aquarium Substrate Calculator",
    description: "Calculate exact volume and weight of substrate for your aquarium. Free gravel, sand, and planted tank substrate calculator",
    href: "/aquarium-substrate-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "fix-and-flip-calculator",
    name: "Fix and Flip Calculator",
    description: "Estimate profit, ROI, ARV, rehab, financing, holding and selling costs for real estate house flipping deals",
    href: "/financial/fix-and-flip-calculator",
    category: "financial",
    popular: false,
  },
  {
    id: "kite-size-calculator",
    name: "Kite Size Calculator",
    description: "Calculate ideal kite size for kitesurfing based on weight, wind speed, skill level, and riding style",
    href: "/sports/kite-size-calculator",
    category: "sports",
    popular: false,
  },
  {
    id: "crochet-calculator",
    name: "Crochet Calculator",
    description: "Estimate yarn yardage, project cost, time, gauge, stitch counts, and pricing for crochet projects",
    href: "/other/crochet-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "era-calculator",
    name: "ERA Calculator",
    description: "Calculate earned run average (ERA) for baseball and softball pitchers with 9-inning or 7-inning formulas",
    href: "/sports/era-calculator",
    category: "sports",
    popular: false,
  },
  {
    id: "extrapolation-calculator",
    name: "Extrapolation Calculator",
    description: "Predict future values from data points using linear extrapolation with step-by-step solutions",
    href: "/maths/extrapolation-calculator",
    category: "maths",
    popular: false,
  },
  {
    id: "chaturbate-token-calculator",
    name: "Chaturbate Token Calculator",
    description: "Convert Chaturbate tokens to USD or EUR instantly. Models earn $0.05 per token",
    href: "/other/chaturbate-token-calculator",
    category: "other",
    popular: false,
  },
  {
    id: "garage-conversion-cost-calculator",
    name: "Garage Conversion Cost Calculator",
    description: "Calculate UK garage conversion costs with regional pricing, spec levels, and detailed breakdowns",
    href: "/construction/garage-conversion-cost-calculator",
    category: "construction",
    popular: false,
  },
  {
    id: "newborn-weight-loss-calculator",
    name: "Newborn Weight Loss Calculator",
    description: "Calculate newborn weight loss percentage in kg, lbs, or oz. Normal range 7-10%. Know when to call pediatrician",
    href: "/health/newborn-weight-loss-calculator",
    category: "health",
    popular: false,
  },
  {
    id: "sourdough-calculator",
    name: "Sourdough Calculator",
    description: "Calculate sourdough hydration, baker's percentages, and scale recipes. Get exact measurements for perfect bread",
    href: "/food/sourdough-calculator",
    category: "food",
    popular: false,
  }
]

// Helper functions to get calculators by category with multilingual support
export function getCalculatorsByCategory(category: string, language: string = 'en'): Calculator[] {
  return calculators.filter((calc) => calc.category === category).map(calc => {
    // Get language-specific data
    const fileName = getCalculatorFileName(calc.id);
    const localizedData = getLocalizedCalculatorData(fileName, language);

    return {
      ...calc,
      name: localizedData.name,
      description: localizedData.description,
      href: getLocalizedCalculatorHref(fileName, language)
    };
  });
}

export function getPopularCalculatorsByCategory(category: string, language: string = 'en'): Calculator[] {
  return calculators.filter((calc) => calc.category === category && calc.popular).map(calc => {
    // Get language-specific data
    const fileName = getCalculatorFileName(calc.id);
    const localizedData = getLocalizedCalculatorData(fileName, language);

    return {
      ...calc,
      name: localizedData.name,
      description: localizedData.description,
      href: getLocalizedCalculatorHref(fileName, language)
    };
  });
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

// New function to get calculator by name
export function getCalculatorByName(name: string): Calculator | undefined {
  return calculators.find((calc) => calc.name === name);
}

// Helper functions for subcategories
export function getCalculatorsBySubcategory(category: string, subcategory: string, language: string = 'en'): Calculator[] {
  return calculators.filter((calc) => calc.category === category && calc.subcategory === subcategory).map(calc => {
    const fileName = getCalculatorFileName(calc.id);
    const localizedData = getLocalizedCalculatorData(fileName, language);

    return {
      ...calc,
      name: localizedData.name,
      description: localizedData.description,
      href: getLocalizedCalculatorHref(fileName, language)
    };
  });
}

export function getSubcategoriesByCategory(category: string): string[] {
  const subcategories = new Set<string>();
  calculators
    .filter((calc) => calc.category === category && calc.subcategory)
    .forEach((calc) => {
      if (calc.subcategory) {
        subcategories.add(calc.subcategory);
      }
    });
  return Array.from(subcategories);
}
