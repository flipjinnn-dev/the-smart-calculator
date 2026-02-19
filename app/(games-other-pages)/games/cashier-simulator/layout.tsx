import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Cashier Simulator Game Online & PC Experience",
  description: "Experience realistic checkout in the best cashier simulator game! Play online, PC, or mobile and enjoy supermarket, grocery, and cashier gameplay fun.",
  keywords: [
    "cashier simulator game",
    "best cashier simulator game",
    "cashier simulator game free",
    "cashier simulator game online",
    "cashier simulator game Steam",
    "cashier game simulator",
    "supermarket cashier simulator game",
    "cashier game PC",
    "cashier simulator mobile",
    "grocery cashier simulator game",
    "cashier job simulator game",
    "cashier experience game",
    "cashier simulator games online",
    "supermarket cashier simulator",
    "cashier simulator",
    "cashier game",
    "checkout game",
    "retail simulator",
    "cash register game",
    "grocery store simulator",
    "point of sale simulator",
    "cashier training game"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/cashier-simulator",
    languages: {
      "x-default": "https://www.thesmartcalculator.com/games/cashier-simulator",
      "en": "https://www.thesmartcalculator.com/games/cashier-simulator",
      "pt-BR": "https://www.thesmartcalculator.com/games/cashier-simulator",
      "pl": "https://www.thesmartcalculator.com/games/cashier-simulator",
      "de": "https://www.thesmartcalculator.com/games/cashier-simulator",
      "es": "https://www.thesmartcalculator.com/games/cashier-simulator"
    }
  },
  openGraph: {
    title: "Best Cashier Simulator Game Online & PC Experience",
    description: "Experience realistic checkout in the best cashier simulator game! Play online, PC, or mobile and enjoy supermarket, grocery, and cashier gameplay fun.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/cashier-simulator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cashier Simulator Game – Play for Fun",
    description: "Experience realistic checkout in the best cashier simulator game! Play online, PC, or mobile and enjoy supermarket, grocery, and cashier gameplay fun.",
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

export default function CashierSimulatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
