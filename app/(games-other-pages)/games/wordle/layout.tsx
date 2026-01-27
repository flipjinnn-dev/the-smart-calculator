import type { Metadata } from "next";
import Script from "next/script";

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
  },
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/wordle',
  },
}

export default function WordleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "Daily Wordle Game",
  "url": "https://www.thesmartcalculator.com/games/wordle",
  "description": "Play the daily Wordle game online for free. Guess the 5-letter word in 6 tries!",
  "applicationCategory": "PuzzleGame",
  "offers": {
    "@type": "Offer",
    "url": "https://www.thesmartcalculator.com/games/wordle",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1024"
  }
}

return (
  <>
    <Script 
    type="application/ld+json" 
    id="json-ld-schema" 
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    strategy="afterInteractive" 
    />
    {children}
  </>
)
}
