import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wordle History - Past Wordle Answers & Solutions | TheSmartCalculator",
  description: "Browse the complete history of Wordle puzzles. Find past Wordle answers, solutions, and daily words. Search by date or Wordle number.",
  keywords: "wordle history, past wordle answers, wordle solutions, wordle archive, previous wordle words, wordle lookup",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/what-is-the-wordle-today",
  },
  openGraph: {
    title: "Wordle History - Past Wordle Answers & Solutions | TheSmartCalculator",
    description: "Browse the complete history of Wordle puzzles. Find past Wordle answers, solutions, and daily words.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/what-is-the-wordle-today",
  },
};

export default async function WordleHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
