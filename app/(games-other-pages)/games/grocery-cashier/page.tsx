import GroceryCashierClient from "./GroceryCashierClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Grocery Cashier Game - Learn Money & Math Skills',
  description: 'Play the Grocery Cashier game and improve your money counting, addition, and customer service skills in a fun grocery store setting.',
  keywords: 'grocery cashier, money counting game, math skills, cashier game',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/grocery-cashier',
  },
  openGraph: {
    title: 'Grocery Cashier Game - Learn Money & Math Skills',
    description: 'Play the Grocery Cashier game and improve your money counting and math skills.',
    url: 'https://www.thesmartcalculator.com/games/grocery-cashier',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grocery Cashier Game',
      },
    ],
  },
}

export default function GroceryCashierPage() {
  return <GroceryCashierClient />
}
