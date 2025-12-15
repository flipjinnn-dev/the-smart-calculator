// Centralized calculator data for dynamic management

export interface Calculator {
  id: string
  name: string
  description: string
  href: string
  category: string
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

  // For other IDs, just add -calculator suffix if not already present
  return id.endsWith('-calculator') ? id : `${id}-calculator`;
}

export const calculators: Calculator[] = [
  // Financial Calculators
  {
    id: "mortgage",
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
    id: "inflation",
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
    id: "mortgage-payoff-calculator",
    name: "Mortgage Payoff Calculator",
    description: "Calculate your mortgage payoff date and total interest savings",
    href: "/financial/mortgage-payoff-calculator",
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
    id: "ideal-weight",
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
    id: "bmr",
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
    id: "calorie",
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
    id: "square-root-curve-calculator",
    name: "Square Root Curve Calculator",
    description: "Convert grades using the square root grading curve method",
    href: "maths/square-root-curve-calculator",
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
    id:"orthogonal-projection-calculator",
    name:"Orthogonal Projection Calculator",
    description:"Calculate the orthogonal projection of one vector onto another with step-by-step solutions and detailed analysis",
    href:"/physics/orthogonal-projection-calculator",
    category:"physics",
    popular:true
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
    description: "Calculate the conservation of momentum in collisions.",
    href: "/physics/conservation-of-momentum-calculator",
    category: "physics",
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
    id: "piecewise-function-calculator-grapher",
    name: "Piecewise Function Calculator & Grapher",
    description: "Define, evaluate, and graph piecewise functions.",
    href: "/piecewise-function-calculator-grapher",
    category: "other",
  },
  {
    id: "enterprise-seo-roi-calculator",
    name: "Enterprise SEO ROI Calculator",
    description: "Calculate the return on investment (ROI) for enterprise SEO.",
    href: "/enterprise-seo-roi-calculator",
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
    id: "height-calculator",
    name: "Height Calculator",
    description: "Calculate height in different units.",
    href: "/height-calculator",
    category: "other",
  },
  {
    id: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    description: "Calculate subnets and IP ranges.",
    href: "/ip-subnet-calculator",
    category: "other",
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
