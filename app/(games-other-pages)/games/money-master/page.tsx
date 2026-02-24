import MoneyMasterClient from "./MoneyMasterClient";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Money Master - Financial Management Game',
  description: 'Master your money management skills with the Money Master game. Learn budgeting, saving, and smart financial decisions.',
  keywords: 'money master, financial game, money management, budgeting game',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/money-master',
  },
  openGraph: {
    title: 'Money Master - Financial Management Game',
    description: 'Master your money management skills with the Money Master game.',
    url: 'https://www.thesmartcalculator.com/games/money-master',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Money Master Game',
      },
    ],
  },
}

export default function MoneyMasterPage() {
  return <MoneyMasterClient />
}
