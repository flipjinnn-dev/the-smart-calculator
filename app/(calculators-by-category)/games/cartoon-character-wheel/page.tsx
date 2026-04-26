import CartoonCharacterWheelClient from './cartoon-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Cartoon Character Wheel – Random Character Picker & Spinner",
  description: "Spin the Cartoon Character Wheel to pick random cartoon characters instantly. Free cartoon character wheel generator for drawing, games & fun. No signup needed!",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/cartoon-character-wheel"
  }
}

export default function CartoonCharacterWheelPage() {
  return <CartoonCharacterWheelClient />
}
