import SoffitClient from "./soffit-client"

export const metadata = {
  title: "Soffit Calculator | Area, Vent & Cost Estimate",
  description: "Use our soffit calculator to estimate soffit area, vents, fascia, panels & cost. Free tool for soffit replacement and roofing projects 2026.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/soffit-calculator"
  }
}

export default function SoffitCalculatorPage() {
  return <SoffitClient />
}
