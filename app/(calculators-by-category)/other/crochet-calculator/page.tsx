import CrochetClient from "./crochet-client"

export const metadata = {
  title: "Crochet Calculator | Free Yarn, Gauge, Pricing & Time Calculator",
  description: "Use this crochet calculator to estimate yarn yardage, project cost, time, gauge adjustments, stitch counts, and pricing for any crochet project from blankets and hats to sweaters and commission work.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/other/crochet-calculator"
  }
}

export default function CrochetCalculatorPage() {
  return <CrochetClient />
}
