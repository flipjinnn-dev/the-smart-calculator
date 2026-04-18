import KiteClient from "./kite-client"

export const metadata = {
  title: "Kite Size Calculator | Free Kitesurfing Kite Size Chart by Weight & Wind",
  description: "Use this kite size calculator to instantly determine the ideal kite size in square meters (m²) using proven formulas. Free kite size chart by weight and kite size wind calculator deliver accurate results tailored to real-world conditions.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/sports/kite-size-calculator"
  }
}

export default function KiteSizeCalculatorPage() {
  return <KiteClient />
}
