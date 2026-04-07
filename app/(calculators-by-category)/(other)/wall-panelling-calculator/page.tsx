import { Metadata } from "next"
import WallPanellingCalculatorClient from "./wall-panelling-calculator-client"

export const metadata: Metadata = {
  title: "Wall Panelling Calculator Free Online Tool, Formulas & Complete Guide",
  description: "Calculate how much wall panelling you need instantly. Free UK calculator for MDF, shaker, dado, box & wood panels. Get accurate measurements, spacing & costs.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/wall-panelling-calculator"
  }
}

export default function WallPanellingCalculatorPage() {
  return <WallPanellingCalculatorClient />
}
