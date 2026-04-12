import HomeReversionClient from "./home-reversion-client"

export const metadata = {
  title: "Home Reversion Calculator — Estimate Your Equity Release Payout Instantly",
  description: "Use our free home reversion calculator to estimate your equity release payout. Calculate how much cash you can release from your property based on age, property value, and share sold.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/home-reversion-calculator"
  }
}

export default function HomeReversionCalculatorPage() {
  return <HomeReversionClient />
}
