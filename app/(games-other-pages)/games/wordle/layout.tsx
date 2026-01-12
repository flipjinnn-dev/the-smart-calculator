import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play Wordle Online - Daily Word Puzzle Game",
  description: "Play the daily Wordle game online. Guess the 5-letter hidden word in 6 tries. Challenge your vocabulary and share your results!",
  keywords: ["wordle", "play wordle", "wordle game", "daily word puzzle", "word guess game", "online wordle"],
  openGraph: {
    title: "Play Wordle - Daily Word Puzzle Challenge",
    description: "Can you guess the hidden word? Play the official-style Wordle game online now.",
    type: "website",
    url: "https://www.thesmartcalculator.com/games/wordle",
    images: [{
      url: "https://www.thesmartcalculator.com/assets/wordle-og.jpg",
      width: 1200,
      height: 630,
      alt: "Play Wordle Daily"
    }],
  }
}

export default function WordleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
