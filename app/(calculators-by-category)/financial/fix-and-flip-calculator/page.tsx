import FixFlipClient from "./fix-flip-client"

export const metadata = {
  title: "Fix and Flip Calculator | ARV & ROI Tool",
  description: "Use this fix and flip calculator to estimate profit, ROI, ARV, rehab, financing, holding and selling costs for accurate real estate deal analysis.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/financial/fix-and-flip-calculator"
  }
}

export default function FixAndFlipCalculatorPage() {
  return <FixFlipClient />
}
