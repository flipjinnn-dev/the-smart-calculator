import AquariumClient from "./aquarium-client"

export const metadata = {
  title: "Aquarium Substrate Calculator: How Much Gravel, Sand, or Soil Do You Need?",
  description: "Use this aquarium substrate calculator to instantly determine the exact volume and weight of substrate your aquarium requires. Free aquarium gravel calculator, sand calculator, and planted tank substrate calculator for all tank sizes.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/aquarium-substrate-calculator"
  }
}

export default function AquariumSubstrateCalculatorPage() {
  return <AquariumClient />
}
