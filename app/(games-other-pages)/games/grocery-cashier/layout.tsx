import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grocery Cashier Game",
  description: "Play a Grocery Cashier Game online or on Android. Learn money skills, addition, subtraction, and practice as a fun educational game for kids.",
  keywords: [
    "grocery cashier game",
    "cash register simulator",
    "cashier simulation game",
    "money counting game",
    "change making game",
    "grocery store game",
    "cashier training game",
    "math game",
    "money skills game",
    "cash handling game",
    "retail simulator",
    "grocery cashier simulator",
    "cashier game online",
    "free cashier game",
    "cash register game",
    "money math game",
    "checkout simulator",
    "point of sale game",
    "cashier practice game",
    "educational money game"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/grocery-cashier",
    languages: {
      "x-default": "https://www.thesmartcalculator.com/games/grocery-cashier",
      "en": "https://www.thesmartcalculator.com/games/grocery-cashier",
      "pt-BR": "https://www.thesmartcalculator.com/games/grocery-cashier",
      "pl": "https://www.thesmartcalculator.com/games/grocery-cashier",
      "de": "https://www.thesmartcalculator.com/games/grocery-cashier",
      "es": "https://www.thesmartcalculator.com/games/grocery-cashier"
    }
  },
  openGraph: {
    title: "Grocery Cashier Game - Free Cash Register Simulator",
    description: "Master the cash register in this fun grocery cashier simulation game! Ring up items, accept payments, and give correct change.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/grocery-cashier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grocery Cashier Game - Cash Register Simulator",
    description: "Master the cash register! Ring up items, accept payments, and give correct change in 30 challenging levels.",
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

export default function GroceryCashierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
