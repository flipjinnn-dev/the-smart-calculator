import CombinationClient from "./combination-client"

export const metadata = {
  title: "Combination Sum Calculator - Find All Number Combinations That Add Up",
  description: "Free combination sum calculator finds all unique groups of numbers that add up to your target. Supports number reuse, backtracking algorithm, Excel integration. Perfect for budget reconciliation, programming interviews & math problems.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/maths/combination-sum-calculator"
  }
}

export default function CombinationSumCalculatorPage() {
  return <CombinationClient />
}
