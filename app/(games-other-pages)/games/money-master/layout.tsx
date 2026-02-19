import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Counting Money Game for Kids | Free Online Practice",
  description: "Play a counting money game for kids to learn coins, bills, and value. Enjoy free online counting money games and fun practice activities.",
  keywords: [
    "counting money game",
    "counting money games for kids",
    "counting money games online",
    "counting money game free",
    "counting money practice game",
    "money counting game kids",
    "counting money games online for kids",
    "counting money activities for kids",
    "counting money activities for kindergarten",
    "counting money activities for 1st grade",
    "counting money activities for 2nd grade"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/money-master",
    languages: {
      "x-default": "https://www.thesmartcalculator.com/games/money-master",
      "en": "https://www.thesmartcalculator.com/games/money-master",
      "pt-BR": "https://www.thesmartcalculator.com/games/money-master",
      "pl": "https://www.thesmartcalculator.com/games/money-master",
      "de": "https://www.thesmartcalculator.com/games/money-master",
      "es": "https://www.thesmartcalculator.com/games/money-master"
    }
  },
  openGraph: {
    title: "Counting Money Game for Kids | Free Online Practice",
    description: "Play a counting money game for kids to learn coins, bills, and value. Enjoy free online counting money games and fun practice activities.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/money-master",
  },
  twitter: {
    card: "summary_large_image",
    title: "Counting Money Game for Kids | Free Online Practice",
    description: "Play a counting money game for kids to learn coins, bills, and value. Enjoy free online counting money games and fun practice activities.",
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

export default function MoneyMasterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
