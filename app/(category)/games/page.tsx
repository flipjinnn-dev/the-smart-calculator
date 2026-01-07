import Link from "next/link"
import Script from "next/script"
import { Gamepad2, Trophy, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GamesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Games",
    description: "Challenge yourself with fun and engaging word games",
    url: "https://www.thesmartcalculator.com/games",
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Games</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Challenge yourself with fun and engaging word games
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Wordle of the Day</CardTitle>
                  <CardDescription className="text-base">
                    Guess the 5-letter word in 6 tries. A new word every day!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/games/wordle">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold">
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-500">More Games Coming Soon</CardTitle>
                  <CardDescription>
                    We're working on bringing you more exciting games. Stay tuned!
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
