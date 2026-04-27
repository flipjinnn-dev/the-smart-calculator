import CountryWheelClient from './country-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Country Wheel – Spin & Pick a Random Country Instantly",
  description: "Spin the Country Wheel to pick a random country instantly. Use this fun tool for games, travel ideas, geography learning, and challenges online.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/country-wheel"
  }
}

export default function CountryWheelPage() {
  return <CountryWheelClient />
}
