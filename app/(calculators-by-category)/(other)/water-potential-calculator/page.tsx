import { Metadata } from "next"
import WaterPotentialCalculatorClient from "./water-potential-calculator-client"

export const metadata: Metadata = {
  title: "Water Potential Calculator | AP Biology & A-Level Guide",
  description: "Calculate water potential (ψ) instantly using ψ = ψs + ψp. Includes osmotic, pressure potential & examples for AP Bio & A-Level labs.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/water-potential-calculator"
  }
}

export default function WaterPotentialCalculatorPage() {
  return <WaterPotentialCalculatorClient />
}
