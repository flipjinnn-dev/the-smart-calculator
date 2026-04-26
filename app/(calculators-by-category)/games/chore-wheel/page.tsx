import ChoreWheelClient from './chore-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Wheel Of Chores — Free Spin & Assign Chores Fairly",
  description: "Spin the Wheel Of Chores and assign household tasks fairly in seconds. Free chore wheel generator for kids, adults & roommates. No sign-up needed — try now!",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/chore-wheel"
  }
}

export default function ChoreWheelPage() {
  return <ChoreWheelClient />
}
