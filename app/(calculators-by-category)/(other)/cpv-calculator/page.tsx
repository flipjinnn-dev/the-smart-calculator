import { Metadata } from "next"
import CPVCalculatorClient from "./cpv-calculator-client"

export const metadata: Metadata = {
  title: "CPV Calculator – Calculate Cost Per View Free Online",
  description: "Use our free CPV calculator to calculate cost per view instantly. Learn the CPV formula, how to calculate CPV for YouTube ads, convert CPV to CPM, and reduce your ad spend.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/cpv-calculator"
  }
}

export default function CPVCalculatorPage() {
  return <CPVCalculatorClient />
}
