import CandyWheelClient from './candy-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Candy Wheel – Spin & Pick Candy Instantly Online",
  description: "Spin the candy wheel to instantly pick a random candy. A fun, fair and interactive spinner for parties, classrooms and online games.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/candy-wheel"
  }
}

export default function CandyWheelPage() {
  return <CandyWheelClient />
}
