import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/song-length-calculator"

  return {
    title: {
      absolute: "Song Length Calculator - Calculate Song Duration Instantly",
    },
    description: "Free song length calculator to calculate total duration of songs, playlists, and tracks. Add multiple songs, convert time formats, and estimate song length using BPM.",
    keywords: "song length calculator, song duration calculator, playlist length calculator, song time calculator, bpm to song length calculator, average song length calculator, song playlist time calculator, music duration calculator, track length calculator, song length adder, calculate playlist time, song time duration calculator, how long is a song, playlist duration calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Song Length Calculator - Calculate Song Duration Instantly",
      description: "Free song length calculator to calculate total duration of songs, playlists, and tracks. Add multiple songs, convert time formats, and estimate song length using BPM.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Song Length Calculator - Calculate Song Duration Instantly",
      description: "Free song length calculator to calculate total duration of songs, playlists, and tracks. Add multiple songs, convert time formats, and estimate song length using BPM.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default function SongLengthCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
