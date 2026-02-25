import Link from "next/link"
import Script from "next/script"
import { Gamepad2, Trophy, Brain, Coins } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GamesPage() {
  const games = [
    {
      id: "wordle",
      title: "Wordle of the Day",
      description: "Guess the 5-letter word in 6 tries. A new word every day!",
      icon: Trophy,
      link: "/games/wordle",
      gradient: "from-green-400 to-blue-500"
    },
    {
      id: "mental-maths",
      title: "Mental Math Trainer",
      description: "Challenge yourself with quick mental math quizzes and improve your speed!",
      icon: Brain,
      link: "/games/mental-maths",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: "coin-saver-challenge",
      title: "Coin Saver Challenge",
      description: "Drag and drop coins into the piggy bank before time runs out! Features levels, power-ups, and leaderboards.",
      icon: Coins,
      link: "/games/coin-saver-challenge",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      id: "money-master",
      title: "Money Master",
      description: "Drag and drop bills and coins into the piggy bank before time runs out! Features levels, power-ups, and leaderboards.",
      icon: Coins,
      link: "/games/money-master",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      id:"cashier-simulator",
      title:"Cashier Simulator",
      description:"Drag and drop products into the cashier before time runs out! Features levels, power-ups, and leaderboards.",
      icon:Coins,
      link:"/games/cashier-simulator",
      gradient:"from-yellow-400 to-orange-500"
    },
    {
     id:"grocery-cashier",
     title:"Grocery Cashier",
     description:"Enter the price of products into the game before time runs out! Features levels, power-ups, and leaderboards.",
     icon:Coins,
     link:"/games/grocery-cashier",
     gradient:"from-yellow-400 to-orange-500"
    },
    {
      id:"sort-coins",
      title:"Sort Coins",
      description:"Play a free online coin sorting and merging game for kids. Sort coins by value, merge stacks, complete levels, and enjoy a fun educational puzzle game.",
      icon:Coins,
      link:"/games/sort-coins",
      gradient:"from-yellow-400 to-orange-500"
    },
    {
      id:"aesthetic-wheel-spinner",
      title:"Aesthetic Wheel Spinner",
      description:"Use the Aesthetic Wheel to spin and discover outfits, themes, colors, names, and creative ideas instantly. Simple, fun, and inspiring.",
      icon:Coins,
      link:"/games/aesthetic-wheel-spinner",
      gradient:"from-yellow-400 to-orange-500"
    },
    {
      id:"age-wheel-spinner",
      title:"Age Wheel Spinner",
      description:"Use the Age Wheel to spin and discover your age instantly. Simple, fun, and inspiring.",
      icon:Coins,
      link:"/games/age-generator-wheel",
      gradient:"from-yellow-400 to-orange-500"
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Games",
    description: "Challenge yourself with fun and engaging games including Wordle and Mental Math",
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
              {games.map((game) => {
                const IconComponent = game.icon
                return (
                  <Card key={game.id} className="hover:shadow-xl transition-shadow border-0 shadow-lg bg-white">
                    <CardHeader>
                      <div className={`w-12 h-12 bg-gradient-to-br ${game.gradient} rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{game.title}</CardTitle>
                      <CardDescription className="text-base">
                        {game.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={game.link}>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold">
                          Play Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}

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
