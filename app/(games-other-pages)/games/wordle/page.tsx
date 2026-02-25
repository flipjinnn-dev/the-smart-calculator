import { getTodayWordleNumber, getTodaysWordleAnswer } from "@/lib/games/wordle-data"
import WordleGameClient from "./WordleGameClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Wordle - Daily Word Puzzle Game',
  description: 'Play Wordle, the popular daily word puzzle game. Guess the 5-letter word in 6 tries. New puzzle every day!',
  keywords: 'wordle, word game, puzzle game, daily puzzle, word puzzle',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/wordle',
  },
  openGraph: {
    title: 'Wordle - Daily Word Puzzle Game',
    description: 'Play Wordle, the popular daily word puzzle game. Guess the 5-letter word in 6 tries.',
    url: 'https://www.thesmartcalculator.com/games/wordle',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wordle Game',
      },
    ],
  },
}

export default async function WordlePage() {
  // Server-side data fetching
  const number = getTodayWordleNumber()
  const solution = await getTodaysWordleAnswer()

  return (
    <>
      <h1 className="sr-only">Wordle - Daily Word Puzzle Game</h1>
      <WordleGameClient solution={solution} wordleNumber={number} />
    </>
  )
}
