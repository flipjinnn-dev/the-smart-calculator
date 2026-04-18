import SourdoughClient from "./sourdough-client"

export const metadata = {
  title: "Sourdough Calculator: Complete Guide to Hydration, Ratios & Loaves",
  description: "Free sourdough calculator for perfect bread. Calculate hydration percentages, baker's ratios, and scale recipes. Get exact measurements for flour, water, starter & salt.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/food/sourdough-calculator"
  }
}

export default function SourdoughCalculatorPage() {
  return <SourdoughClient />
}
