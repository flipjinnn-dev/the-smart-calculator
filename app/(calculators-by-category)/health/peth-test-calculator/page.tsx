import { Metadata } from "next"
import PethTestCalculatorClient from "./peth-test-calculator-client"

export const metadata: Metadata = {
  title: "Peth Test Calculator | Alcohol Clearance Date",
  description: "Estimate your PEth level and alcohol clearance date using half-life science. Learn detection window, cutoff levels, and safe testing timeline.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/health/peth-test-calculator"
  }
}

export default function PethTestCalculatorPage() {
  return <PethTestCalculatorClient />
}
