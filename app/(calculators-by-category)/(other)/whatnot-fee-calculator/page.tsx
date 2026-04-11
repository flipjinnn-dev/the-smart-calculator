import { Metadata } from "next"
import WhatnotFeeCalculatorClient from "./whatnot-fee-calculator-client"

export const metadata: Metadata = {
  title: "Whatnot Fee Calculator – Free Seller Profit Tool",
  description: "Use our free Whatnot fees calculator to calculate seller fees for US, UK & Canada. Instant Whatnot cost calculator for commission, processing & net profit.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/whatnot-fee-calculator"
  }
}

export default function WhatnotFeeCalculatorPage() {
  return <WhatnotFeeCalculatorClient />
}
