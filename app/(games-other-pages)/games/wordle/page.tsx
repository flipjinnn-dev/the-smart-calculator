import { getTodayWordleNumber, getTodaysWordleAnswer } from "@/lib/games/wordle-data"
import WordleGameClient from "./WordleGameClient"
import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { CheckCircle2, Target, TrendingUp, Brain, Zap, Award } from "lucide-react"

export const metadata: Metadata = {
  title: 'Play Wordle Online – Daily Puzzle & Unlimited',
  description: 'Play Wordle online free. Solve the daily 5-letter Wordle today, get helpful hints, check answers, and enjoy unlimited Wordle practice anytime.',
  keywords: 'wordle, word game, puzzle game, daily puzzle, word puzzle, wordle online, play wordle',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/wordle',
    languages: {
      'x-default': 'https://www.thesmartcalculator.com/games/wordle',
      'en': 'https://www.thesmartcalculator.com/games/wordle',
      'pt-BR': 'https://www.thesmartcalculator.com/games/wordle',
      'pl': 'https://www.thesmartcalculator.com/games/wordle',
      'de': 'https://www.thesmartcalculator.com/games/wordle',
      'es': 'https://www.thesmartcalculator.com/games/wordle',
    }
  },
  openGraph: {
    title: 'Play Wordle Online – Daily Puzzle & Unlimited',
    description: 'Play Wordle online free. Solve the daily 5-letter Wordle today, get helpful hints, check answers, and enjoy unlimited Wordle practice anytime.',
    url: 'https://www.thesmartcalculator.com/games/wordle',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wordle Game Online',
      },
    ],
  },
}

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VideoGame",
      "@id": "https://www.thesmartcalculator.com/games/wordle#game",
      "name": "Wordle Game Online",
      "url": "https://www.thesmartcalculator.com/games/wordle",
      "description": "Play Wordle online free. Solve the daily 5-letter Wordle puzzle, practice unlimited rounds, track statistics, and improve your win rate with strategy tools.",
      "applicationCategory": "GameApplication",
      "operatingSystem": "All",
      "inLanguage": "en",
      "genre": "Word Game",
      "gamePlatform": "Web Browser",
      "playMode": "SinglePlayer",
      "isAccessibleForFree": true,
      "image": "https://www.thesmartcalculator.com/images/wordle-game.png",
      "publisher": {
        "@type": "Organization",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/games/wordle#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.thesmartcalculator.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Games",
          "item": "https://www.thesmartcalculator.com/games"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Wordle Game",
          "item": "https://www.thesmartcalculator.com/games/wordle"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.thesmartcalculator.com/games/wordle#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is today's Wordle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Today's Wordle is the daily five-letter puzzle that resets every 24 hours. Players have six attempts to guess the correct word."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Wordle today answer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Wordle answer today refers to the correct five-letter word for the current daily puzzle. We recommend solving it before checking the solution."
          }
        },
        {
          "@type": "Question",
          "name": "What was yesterday's Wordle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yesterday's Wordle was the previous daily puzzle that reset at midnight. You can visit our archive section for past Wordle answers."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Wordle of the day?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Wordle of the day is the daily puzzle that changes every 24 hours. Every player worldwide receives the same word for that day."
          }
        },
        {
          "@type": "Question",
          "name": "What letter does today's Wordle start with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The starting letter of today's Wordle changes daily. We recommend checking structured hints instead of revealing it immediately."
          }
        },
        {
          "@type": "Question",
          "name": "What is the first letter of today's Wordle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first letter depends on the current daily puzzle. Optional hints are available if you prefer guided solving."
          }
        },
        {
          "@type": "Question",
          "name": "What is today's Wordle word?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Today's Wordle word is the hidden five-letter English word you must guess within six attempts using green, yellow, and gray feedback clues."
          }
        },
        {
          "@type": "Question",
          "name": "What is Wordle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wordle is a daily word puzzle game where players guess a hidden five-letter word in six tries. Colored tiles show whether letters are correct, misplaced, or incorrect."
          }
        },
        {
          "@type": "Question",
          "name": "How do you play Wordle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter a valid five-letter English word, submit your guess, analyze the color feedback, adjust your next guess using logic, and solve the puzzle within six attempts."
          }
        }
      ]
    }
  ]
}

export default async function WordlePage() {
  const number = getTodayWordleNumber()
  const solution = await getTodaysWordleAnswer()

  return (
    <>
      <Script
        id="wordle-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
      
      <h1 className="sr-only">Wordle Game Online – Play Free Daily Word Puzzle</h1>
      <WordleGameClient solution={solution} wordleNumber={number} />
    </>
  )
}
