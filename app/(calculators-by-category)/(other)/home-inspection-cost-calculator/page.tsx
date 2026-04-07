import { Metadata } from "next"
import HomeInspectionCostCalculatorClient from "./home-inspection-cost-calculator-client"

export const metadata: Metadata = {
  title: "Home Inspection Cost Calculator | Estimate Prices",
  description: "Estimate your home inspection cost instantly. Get accurate pricing based on size, age, location, and add-ons. Free calculator, no signup needed.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/home-inspection-cost-calculator"
  }
}

export default function HomeInspectionCostCalculatorPage() {
  return <HomeInspectionCostCalculatorClient />
}
