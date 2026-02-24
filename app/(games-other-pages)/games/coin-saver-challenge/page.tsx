import CoinSaverGameClient from "./CoinSaverGameClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Coin Saver Challenge - Fun Money Saving Game',
  description: 'Play the Coin Saver Challenge game and learn money-saving skills while having fun. Test your financial decision-making abilities.',
  keywords: 'coin saver, money saving game, financial game, savings challenge',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/coin-saver-challenge',
  },
  openGraph: {
    title: 'Coin Saver Challenge - Fun Money Saving Game',
    description: 'Play the Coin Saver Challenge game and learn money-saving skills while having fun.',
    url: 'https://www.thesmartcalculator.com/games/coin-saver-challenge',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coin Saver Challenge Game',
      },
    ],
  },
}

export default function CoinSaverChallengePage() {
  return <CoinSaverGameClient />
}
