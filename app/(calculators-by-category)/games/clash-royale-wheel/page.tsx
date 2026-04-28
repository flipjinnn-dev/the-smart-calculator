import ClashRoyaleWheelClient from './clash-royale-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Clash Royale Wheel – Spin & Get Random Cards Instantly",
  description: "Use the Clash Royale Wheel to spin and instantly get random cards, decks, or champions. Free, fair, and perfect for Clash Royale challenges.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/clash-royale-wheel"
  }
}

export default function ClashRoyaleWheelPage() {
  return <ClashRoyaleWheelClient />
}
