import { Metadata } from "next"
import PhasorCalculatorClient from "./phasor-calculator-client"

export const metadata: Metadata = {
  title: "Phasor Calculator Guide: AC Circuits Made Simple",
  description: "Learn phasor calculator concepts for AC circuits, conversions, impedance, and power factor. Simple guide with formulas, examples, and FAQs.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/physics/phasor-calculator"
  }
}

export default function PhasorCalculatorPage() {
  return <PhasorCalculatorClient />
}
