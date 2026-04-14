import { Metadata } from "next"
import EvonyTroopCalculatorClient from "./evony-troop-calculator-client"

export const metadata: Metadata = {
  title: "Evony Troop Calculator | RSS, Power & Cost Tool",
  description: "Use Evony Troop Calculator to estimate troop cost, RSS, power, training & healing. Plan T1–T16 troops, optimize PvP & save resources easily.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/evony-troop-calculator"
  }
}

export default function EvonyTroopCalculatorPage() {
  return <EvonyTroopCalculatorClient />
}
