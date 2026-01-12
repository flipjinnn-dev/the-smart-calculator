import { getAllWordleHistory } from "@/lib/games/wordle-data"
import WordleArchiveClient from "./WordleArchiveClient"

export default function WordleHistoryPage() {
  // Server-side data fetching
  // Sort by number descending (newest first)
  const history = [...getAllWordleHistory()].sort((a, b) => b.number - a.number)

  return <WordleArchiveClient initialHistory={history} />
}
