import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coin Challenge Saving: Easy & Smart Way to Save Coins",
  description: "Start Coin Challenge Saving at home. Simple rules, free printables & proven methods to turn spare coins into real savings.",
  keywords: ["coin challenge saving", "coin saving challenge", "coin saving chart", "coin saving challenge tracker", "coin saving challenge printable", "52 week coin saving challenge", "easy coin saving challenge", "pound coin saving challenge", "coin savings challenge template", "how to save coins at home"],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/coin-saver-challenge",
    languages: {
      "x-default": "https://www.thesmartcalculator.com/games/coin-saver-challenge",
      "en": "https://www.thesmartcalculator.com/games/coin-saver-challenge",
    }
  },
  openGraph: {
    title: "Coin Challenge Saving: Easy & Smart Way to Save Coins",
    description: "Start Coin Challenge Saving at home. Simple rules, free printables & proven methods to turn spare coins into real savings.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/coin-saver-challenge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coin Challenge Saving: Easy & Smart Way to Save Coins",
    description: "Start Coin Challenge Saving at home. Simple rules, free printables & proven methods to turn spare coins into real savings.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function CoinSaverChallengeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
