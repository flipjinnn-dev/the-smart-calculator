import { getTodayWordleNumber, getTodaysWordleAnswer } from "@/lib/games/wordle-data"
import WordleGameClient from "./WordleGameClient"

export default async function WordlePage() {
  // Server-side data fetching
  const number = getTodayWordleNumber()
  const solution = await getTodaysWordleAnswer()

  return <WordleGameClient solution={solution} wordleNumber={number} />
}
