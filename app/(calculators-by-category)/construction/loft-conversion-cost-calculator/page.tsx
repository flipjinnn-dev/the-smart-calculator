import { Metadata } from "next"
import LoftConversionCostCalculatorClient from "./loft-conversion-cost-calculator-client"

export const metadata: Metadata = {
  title: "Loft Conversion Cost Calculator | Instant Estimates for Dormer, Velux & More",
  description: "Calculate loft conversion costs instantly for UK projects. Get accurate estimates for Velux, dormer, hip-to-gable, mansard conversions. Free calculator with detailed breakdown.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/loft-conversion-cost-calculator"
  }
}

export default function LoftConversionCostCalculatorPage() {
  return <LoftConversionCostCalculatorClient />
}
