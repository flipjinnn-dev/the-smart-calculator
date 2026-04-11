import { Metadata } from "next"
import DepopFeeCalculatorClient from "./depop-fee-calculator-client"

export const metadata: Metadata = {
  title: "Depop Fee Calculator — Calculate Your Exact Profit",
  description: "Free Depop fee calculator for US, UK & Australia sellers. Calculate selling fees, processing fees & net profit instantly. 0% fees for US/UK sellers!",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/depop-fee-calculator"
  }
}

export default function DepopFeeCalculatorPage() {
  return <DepopFeeCalculatorClient />
}
