import GarageClient from "./garage-client"

export const metadata = {
  title: "Garage Conversion Cost Calculator UK | Instant Estimates 2026",
  description: "Calculate your garage conversion cost in seconds. Get accurate UK estimates for single/double garage conversions. Includes regional pricing, spec levels, and detailed breakdowns.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/garage-conversion-cost-calculator"
  }
}

export default function GarageConversionCostCalculatorPage() {
  return <GarageClient />
}
