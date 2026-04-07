import { Metadata } from "next"
import EthnicityCalculatorClient from "./ethnicity-calculator-client"

export const metadata: Metadata = {
  title: "Ethnicity Calculator – Calculate Your Ethnic % Fast",
  description: "Use our ethnicity percentage calculator to calculate ethnicity, estimate baby ethnicity, and explore your ethnic background instantly online free.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/ethnicity-calculator"
  }
}

export default function EthnicityCalculatorPage() {
  return <EthnicityCalculatorClient />
}
