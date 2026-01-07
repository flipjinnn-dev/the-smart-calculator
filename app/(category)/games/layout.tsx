import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Games - Wordle & More | TheSmartCalculator",
  description: "Play free online games including Wordle of the Day. Challenge yourself with word puzzles and brain games. New games added regularly.",
  keywords: "free games, online games, wordle, word games, brain games, puzzle games, daily wordle, wordle unlimited",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games",
  },
  openGraph: {
    title: "Free Online Games - Wordle & More | TheSmartCalculator",
    description: "Play free online games including Wordle of the Day. Challenge yourself with word puzzles and brain games. New games added regularly.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games",
  },
};

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
