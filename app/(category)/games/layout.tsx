import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Games - Wordle & More | TheSmartCalculator",
  description: "Play free online games including Wordle of the Day. Challenge yourself with word puzzles and brain games. New games added regularly.",
  keywords: "free games, online games, wordle, word games, brain games, puzzle games, daily wordle, wordle unlimited",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games",
    languages: {
      'x-default': "https://www.thesmartcalculator.com/games",
      'en': "https://www.thesmartcalculator.com/games",
    }
  },
  openGraph: {
    title: "Free Online Games - Wordle & More | TheSmartCalculator",
    description: "Play free online games including Wordle of the Day. Challenge yourself with word puzzles and brain games. New games added regularly.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games",
    siteName: "Smart Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Online Games - Wordle & More",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Games - Wordle & More | TheSmartCalculator",
    description: "Play free online games including Wordle of the Day. Challenge yourself with word puzzles and brain games.",
    images: ["/og-image.png"],
  },
};

export default async function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
