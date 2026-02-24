import CashierSimulatorClient from "./CashierSimulatorClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Cashier Simulator - Practice Money Handling Skills',
  description: 'Play the Cashier Simulator game and practice handling money, making change, and improving your math skills in a fun retail environment.',
  keywords: 'cashier simulator, money handling game, cash register game, math game',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/cashier-simulator',
  },
  openGraph: {
    title: 'Cashier Simulator - Practice Money Handling Skills',
    description: 'Play the Cashier Simulator game and practice handling money and making change.',
    url: 'https://www.thesmartcalculator.com/games/cashier-simulator',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cashier Simulator Game',
      },
    ],
  },
}

export default function CashierSimulatorPage() {
  return <CashierSimulatorClient />
}
