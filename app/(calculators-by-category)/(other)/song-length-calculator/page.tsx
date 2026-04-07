import { Metadata } from "next"
import SongLengthCalculatorClient from "./song-length-calculator-client"

export const metadata: Metadata = {
  title: "Song Length Calculator - Calculate Song Duration Instantly",
  description: "Free song length calculator to calculate total duration of songs, playlists, and tracks. Add multiple songs, convert time formats, and estimate song length using BPM.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/song-length-calculator"
  }
}

export default function SongLengthCalculatorPage() {
  return <SongLengthCalculatorClient />
}
