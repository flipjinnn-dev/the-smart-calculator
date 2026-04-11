import { Metadata } from "next"
import FlangeWeightCalculatorClient from "./flange-weight-calculator-client"

export const metadata: Metadata = {
  title: "Flange Weight Calculator – Accurate, Fast & Easy Online Tool",
  description: "A flange weight calculator helps you determine the weight of a flange in kilograms (kg) or pounds by using standard formulas based on outer diameter, inner diameter, thickness, and material density. It is widely used in piping, fabrication, and engineering industries to estimate load, cost, and transport requirements.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/flange-weight-calculator"
  }
}

export default function FlangeWeightCalculatorPage() {
  return <FlangeWeightCalculatorClient />
}
