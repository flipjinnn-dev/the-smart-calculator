import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wordle of the Day - Free Daily Word Puzzle Game | TheSmartCalculator",
  description: "Play today's Wordle! Guess the 5-letter word in 6 tries. New puzzle every day at midnight. Track your stats and share your results. Play Wordle Unlimited online.",
  keywords: "wordle, wordle today, daily wordle, word game, word puzzle, wordle of the day, wordle game, wordle unlimited, play wordle",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/wordle",
  },
  openGraph: {
    title: "Wordle of the Day - Free Daily Word Puzzle Game | TheSmartCalculator",
    description: "Play today's Wordle! Guess the 5-letter word in 6 tries. New puzzle every day at midnight. Track your stats and share your results.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/wordle",
  },
};

export default async function WordleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
