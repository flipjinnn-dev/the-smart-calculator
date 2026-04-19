import LMTDClient from "./lmtd-client"

export const metadata = {
  title: "LMTD Calculator – Log Mean Temperature Difference Calculator",
  description: "Free LMTD calculator for heat exchangers. Calculate log mean temperature difference, correction factors, and thermal performance. Supports counterflow, parallel flow, shell-and-tube, and cross-flow configurations.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/physics/lmtd-calculator"
  }
}

export default function LMTDCalculatorPage() {
  return <LMTDClient />
}
