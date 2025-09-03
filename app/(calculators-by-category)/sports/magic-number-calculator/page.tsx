"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import Head from "next/head"
import { Trophy, Calculator, Target, AlertCircle, Activity, RotateCcw, HelpCircle, Crown } from "lucide-react"
import Logo from "@/components/logo"

export default function MagicNumberCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [mlbSeason, setMlbSeason] = useState(true)

  // Input states
  const [totalGames, setTotalGames] = useState("162")
  const [teamWins, setTeamWins] = useState("")
  const [rivalLosses, setRivalLosses] = useState("")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!totalGames || Number.parseInt(totalGames) <= 0 || !Number.isInteger(Number.parseFloat(totalGames))) {
      newErrors.totalGames = "Please enter a valid number of total games (> 0, whole number)"
    }

    if (!teamWins || Number.parseInt(teamWins) < 0 || !Number.isInteger(Number.parseFloat(teamWins))) {
      newErrors.teamWins = "Please enter a valid number of team wins (≥ 0, whole number)"
    }

    if (!rivalLosses || Number.parseInt(rivalLosses) < 0 || !Number.isInteger(Number.parseFloat(rivalLosses))) {
      newErrors.rivalLosses = "Please enter a valid number of rival losses (≥ 0, whole number)"
    }

    // Additional validation
    if (totalGames && teamWins && Number.parseInt(teamWins) > Number.parseInt(totalGames)) {
      newErrors.teamWins = "Team wins cannot exceed total games in season"
    }

    if (totalGames && rivalLosses && Number.parseInt(rivalLosses) > Number.parseInt(totalGames)) {
      newErrors.rivalLosses = "Rival losses cannot exceed total games in season"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateMagicNumber = () => {
    if (!validateInputs()) return

    const tg = Number.parseInt(totalGames)
    const wt = Number.parseInt(teamWins)
    const lo = Number.parseInt(rivalLosses)

    // Calculate Magic Number: MN = TG - Wt - Lo + 1
    const magicNumber = tg - wt - lo + 1

    // Determine context message
    let contextMessage = ""
    let celebratory = false

    if (magicNumber <= 0) {
      if (magicNumber === 0) {
        contextMessage = "🎉 Congratulations! Your team has clinched!"
        celebratory = true
      } else {
        contextMessage = "Your team clinched earlier in the season!"
        celebratory = true
      }
    } else {
      contextMessage = `${magicNumber} more favorable outcome${magicNumber > 1 ? "s" : ""} needed to clinch`
    }

    // Calculate games remaining for team and rival
    const teamGamesRemaining = tg - wt - (tg - wt - lo + 1 - magicNumber)
    const rivalGamesRemaining = tg - lo - (tg - wt - lo + 1 - magicNumber)

    setResult({
      totalGames: tg,
      teamWins: wt,
      rivalLosses: lo,
      magicNumber: magicNumber,
      contextMessage: contextMessage,
      celebratory: celebratory,
      teamGamesRemaining: Math.max(0, teamGamesRemaining),
      rivalGamesRemaining: Math.max(0, rivalGamesRemaining),
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setTotalGames(mlbSeason ? "162" : "")
    setTeamWins("")
    setRivalLosses("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const toggleMLBSeason = (checked: boolean) => {
    setMlbSeason(checked)
    setTotalGames(checked ? "162" : "")
  }

  return (
    <>
      <Head>
        <title>Magic Number Calculator – Baseball Playoff Tool</title>
        <meta
          name="description"
          content="Find your team’s magic number instantly. Use our free magic number calculator to track playoff standings and wins."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Magic Number Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-orange-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/sports" className="text-gray-500 hover:text-orange-600">
                Sports
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Magic Number Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Magic Number Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate the Magic Number in baseball standings. Find out how many combined wins by your team or losses
                by your closest rival are needed to clinch a division title or playoff spot.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-orange-600" />
                      <span>Team & Season Statistics</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your team's wins, rival's losses, and total games in the season
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* MLB Season Toggle */}
                    <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">MLB Season (162 games)</Label>
                          <p className="text-xs text-gray-600 mt-1">Automatically sets total games to 162</p>
                        </div>
                        <Switch
                          checked={mlbSeason}
                          onCheckedChange={toggleMLBSeason}
                          className="data-[state=checked]:bg-orange-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Total Games - Only show when MLB season is OFF */}
                      {!mlbSeason && (
                        <div className="relative">
                          <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            Total Games in Season (TG)
                            <div className="group relative ml-2">
                              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                Total games in the season (162 for MLB)
                              </div>
                            </div>
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calculator className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input
                              className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${
                                errors.totalGames ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                              }`}
                              type="number"
                              step="1"
                              min="1"
                              placeholder="162"
                              value={totalGames}
                              onChange={(e) => {
                                setTotalGames(e.target.value)
                                if (errors.totalGames) setErrors((prev) => ({ ...prev, totalGames: "" }))
                              }}
                            />
                          </div>
                          {errors.totalGames && (
                            <div className="flex items-center mt-2 text-red-600">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              <span className="text-sm">{errors.totalGames}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Team Wins */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Wins of Your Team (Wₜ)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Current wins by your team
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Trophy className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${
                              errors.teamWins ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter team wins"
                            value={teamWins}
                            onChange={(e) => {
                              setTeamWins(e.target.value)
                              if (errors.teamWins) setErrors((prev) => ({ ...prev, teamWins: "" }))
                            }}
                          />
                        </div>
                        {errors.teamWins && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.teamWins}</span>
                          </div>
                        )}
                      </div>

                      {/* Rival Losses */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Losses of Closest Rival (Lₒ)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Current losses by your closest rival
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${
                              errors.rivalLosses ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter rival losses"
                            value={rivalLosses}
                            onChange={(e) => {
                              setRivalLosses(e.target.value)
                              if (errors.rivalLosses) setErrors((prev) => ({ ...prev, rivalLosses: "" }))
                            }}
                          />
                        </div>
                        {errors.rivalLosses && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.rivalLosses}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-700">
                        <strong>Formula:</strong> Magic Number = TG - Wₜ - Lₒ + 1
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Lower magic number means closer to clinching</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateMagicNumber}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800"
                      >
                        Calculate Magic Number
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mb-3 shadow-lg">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">Magic Number</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="bg-white p-6 rounded-lg border border-orange-200">
                          <p
                            className={`text-4xl font-bold ${result.celebratory ? "text-green-600" : "text-orange-900"}`}
                          >
                            {result.magicNumber <= 0 ? "0" : result.magicNumber}
                          </p>
                          <p className="text-gray-600 mt-2">Magic Number</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <p
                            className={`text-sm font-medium ${result.celebratory ? "text-green-700" : "text-orange-700"}`}
                          >
                            {result.contextMessage}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Crown className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter team statistics and click{" "}
                          <span className="font-semibold text-orange-600">Calculate</span> to see the magic number.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>Detailed Magic Number Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-orange-700 mb-2">Magic Number</h3>
                        <p
                          className={`text-3xl font-bold mb-1 ${result.celebratory ? "text-green-600" : "text-orange-900"}`}
                        >
                          {result.magicNumber <= 0 ? "0" : result.magicNumber}
                        </p>
                        <p className={`text-sm ${result.celebratory ? "text-green-600" : "text-orange-600"}`}>
                          {result.celebratory ? "Clinched!" : "To Clinch"}
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-orange-700 mb-2">Total Games</h3>
                        <p className="text-2xl font-bold text-orange-900 mb-1">{result.totalGames}</p>
                        <p className="text-sm text-orange-600">Season Length</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-orange-700 mb-2">Team Wins</h3>
                        <p className="text-2xl font-bold text-orange-900 mb-1">{result.teamWins}</p>
                        <p className="text-sm text-orange-600">Current Wins</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-orange-700 mb-2">Rival Losses</h3>
                        <p className="text-2xl font-bold text-orange-900 mb-1">{result.rivalLosses}</p>
                        <p className="text-sm text-orange-600">Current Losses</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-700 mb-2">Calculation Steps:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>Formula:</strong> Magic Number = TG - Wₜ - Lₒ + 1
                        </p>
                        <p>
                          <strong>Calculation:</strong> {result.totalGames} - {result.teamWins} - {result.rivalLosses} +
                          1 = {result.magicNumber}
                        </p>
                        <p className={`font-medium ${result.celebratory ? "text-green-700" : "text-orange-700"}`}>
                          <strong>Result:</strong> {result.contextMessage}
                        </p>
                      </div>
                    </div>

                    {!result.celebratory && result.magicNumber > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-2">Dynamic Scenarios:</h4>
                        <div className="text-gray-700 space-y-1">
                          <p>• If your team wins {Math.min(result.magicNumber, 5)} more games, you will clinch</p>
                          <p>• If your rival loses {Math.min(result.magicNumber, 5)} more games, you will clinch</p>
                          <p>• Any combination of {result.magicNumber} team wins + rival losses = clinch</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mr-3 shadow-lg">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                    Understanding Magic Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">What is a Magic Number?</h3>
                      <p className="text-gray-700 mb-4">
                        The Magic Number shows how many combined wins by your team or losses by the closest rival are
                        needed to clinch a division title or playoff spot. It's a simple but powerful statistic that
                        helps fans and teams track how close they are to securing qualification.
                      </p>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">How it Works</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Every win by your team reduces the Magic Number by 1</li>
                        <li>Every loss by your rival reduces the Magic Number by 1</li>
                        <li>Magic Number = 0 means you've clinched</li>
                        <li>Magic Number = 1 means one final push needed</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong> MLB Season
                        </p>
                        <p className="text-gray-700">Total Games: 162</p>
                        <p className="text-gray-700">Team Wins: 96</p>
                        <p className="text-gray-700">Rival Losses: 62</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Calculation:</strong>
                        </p>
                        <p className="text-gray-700">Magic Number = 162 - 96 - 62 + 1</p>
                        <p className="text-gray-700 font-semibold">Magic Number = 5</p>
                        <p className="text-gray-700 mt-2">
                          Any combination of 5 more wins by your team OR 5 more losses by your rival will clinch the
                          division.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
