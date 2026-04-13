import { Metadata } from "next"
import PolymericSandCalculatorClient from "./polymeric-sand-calculator-client"

export const metadata: Metadata = {
  title: "Polymeric Sand Calculator — How Much Polymeric Sand Do I Need?",
  description: "Free paver sand estimator to instantly find how many bags of polymeric jointing sand your project needs. Works for Dominator, Techniseal, Alliance Gator, Gator Maxx, EZ Sand, and Unilock.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/polymeric-sand-calculator"
  }
}

export default function PolymericSandCalculatorPage() {
  return <PolymericSandCalculatorClient />
}
