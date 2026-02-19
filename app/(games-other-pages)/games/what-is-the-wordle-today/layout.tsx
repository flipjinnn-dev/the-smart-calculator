import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wordle Archive & History | Complete List of Past Wordle Answers",
  description: "Browse the complete archive of past Wordle solutions. Search history by date, number, or word. Practice your skills with previous Wordle puzzles.",
  keywords: ["wordle history", "wordle archive", "past wordle answers", "wordle solutions list", "wordle replay", "wordle unlimited"],
  openGraph: {
    title: "Wordle Archive - Complete History of Solutions",
    description: "Explore every Wordle puzzle ever released. Search by date or number and view the full solution list.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/what-is-the-wordle-today",
    images: [{
      url: "https://www.thesmartcalculator.com/assets/wordle-history-og.jpg",
      width: 1200,
      height: 630,
      alt: "Wordle History Archive"
    }],
  },
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
    languages: {
      'x-default': 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
      'en': 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
      'pt-BR': 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
      'pl': 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
      'de': 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
      'es': 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
    }
  },
}

export default function WordleHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
