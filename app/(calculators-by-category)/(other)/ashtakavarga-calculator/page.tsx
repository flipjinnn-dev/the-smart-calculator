import AshtakavargaClient from "./ashtakavarga-client"

export const metadata = {
  title: "Ashtakavarga Calculator: Free Online Vedic Astrology Bindu Points Tool by Date of Birth",
  description: "Free ashtakavarga calculator online delivers your complete ashtakavarga chart and ashtakavarga points in seconds. Get sarvashtakavarga chart calculator results, bhinnashtakavarga scores for every planet, and precise Vedic predictions for career, marriage, health, wealth, and longevity.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/ashtakavarga-calculator"
  }
}

export default function AshtakavargaCalculatorPage() {
  return <AshtakavargaClient />
}
