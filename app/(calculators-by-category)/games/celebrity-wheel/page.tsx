import CelebrityWheelClient from './celebrity-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Celebrity Wheel Spin – Random Famous Person Picker",
  description: "Spin the Celebrity Wheel to get random famous people instantly. Use this free celebrity spinner for games, fun challenges, and creative ideas.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/celebrity-wheel"
  }
}

export default function CelebrityWheelPage() {
  return <CelebrityWheelClient />
}
