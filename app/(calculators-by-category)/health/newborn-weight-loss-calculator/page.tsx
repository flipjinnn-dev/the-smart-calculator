import NewbornClient from "./newborn-client"

export const metadata = {
  title: "Newborn Weight Loss Calculator — How to Calculate, What's Normal",
  description: "Free newborn weight loss calculator. Calculate weight loss percentage in kg, lbs, or oz. Normal range is 7-10%. Get instant results and know when to call your pediatrician.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/health/newborn-weight-loss-calculator"
  }
}

export default function NewbornWeightLossCalculatorPage() {
  return <NewbornClient />
}
