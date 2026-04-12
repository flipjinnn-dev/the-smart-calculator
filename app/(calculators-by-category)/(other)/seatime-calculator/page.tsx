import { Metadata } from "next"
import SeatimeCalculatorClient from "./seatime-calculator-client"

export const metadata: Metadata = {
  title: "Seatime Calculator — Accurate Sea Time Calculation for Seafarers",
  description: "Instantly calculate your total sea service in days and months with this free seatime calculator. Perfect for DG Shipping (India), MCA (UK), USCG (USA), and STCW applications.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/seatime-calculator"
  }
}

export default function SeatimeCalculatorPage() {
  return <SeatimeCalculatorClient />
}
