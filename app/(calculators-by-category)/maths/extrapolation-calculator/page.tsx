import ExtrapolationClient from "./extrapolation-client"

export const metadata = {
  title: "Extrapolation Calculator | Predict Future Values Online",
  description: "Use our extrapolation calculator to predict future values from data points using linear and exponential methods. Fast, accurate online forecasting tool.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/maths/extrapolation-calculator"
  }
}

export default function ExtrapolationCalculatorPage() {
  return <ExtrapolationClient />
}
