import ERAClient from "./era-client"

export const metadata = {
  title: "ERA Calculator | Free Earned Run Average Calculator for Baseball & Softball",
  description: "Use this ERA calculator to instantly calculate earned run average for baseball and softball pitchers. Free ERA calculator with 9-inning and 7-inning formulas, plus Japanese era converter.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/sports/era-calculator"
  }
}

export default function ERACalculatorPage() {
  return <ERAClient />
}
