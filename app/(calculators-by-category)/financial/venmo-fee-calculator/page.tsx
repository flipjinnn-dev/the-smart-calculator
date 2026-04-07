import { Metadata } from "next"
import VenmoFeeCalculatorClient from "./venmo-fee-calculator-client"

export const metadata: Metadata = {
  title: "Venmo Fee Calculator | Instant Fee & Transfer Costs",
  description: "Calculate Venmo fees instantly. See exact charges for instant transfers, credit card payments, and goods & services. Free, fast, no signup needed.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/financial/venmo-fee-calculator"
  }
}

export default function VenmoFeeCalculatorPage() {
  return <VenmoFeeCalculatorClient />
}
