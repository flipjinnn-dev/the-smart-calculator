import RipRapClient from "./rip-rap-client"

export const metadata = {
  title: "Rip Rap Calculator — Tons, Cubic Yards, Coverage & Cost Estimator",
  description: "Free rip rap calculator to estimate tons, cubic yards, coverage & cost. Calculate erosion control stone for channels, shorelines & slopes instantly.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/rip-rap-calculator"
  }
}

export default function RipRapCalculatorPage() {
  return <RipRapClient />
}
