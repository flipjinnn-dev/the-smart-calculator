import { Metadata } from "next"
import GrailedFeeCalculatorClient from "./grailed-fee-calculator-client"

export const metadata: Metadata = {
  title: "Grailed Fee Calculator — Calculate Grailed Fees & Payout Instantly",
  description: "Calculate Grailed fees instantly and know your exact payout before you list. Free Grailed fee calculator shows commission, processing fees, and net earnings in seconds.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/financial/grailed-fee-calculator"
  }
}

export default function GrailedFeeCalculatorPage() {
  return <GrailedFeeCalculatorClient />
}
