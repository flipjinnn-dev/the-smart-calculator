"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingDown, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ERACalculator() {
  // ERA Calculator State
  const [earnedRuns, setEarnedRuns] = useState<string>("")
  const [inningsPitched, setInningsPitched] = useState<string>("")
  const [gameLength, setGameLength] = useState<"9" | "7">("9")

  // Japanese Era Converter State
  const [eraName, setEraName] = useState<string>("reiwa")
  const [eraYear, setEraYear] = useState<string>("")

  const [eraResult, setEraResult] = useState<null | {
    era: number
    rating: string
    description: string
  }>(null)

  const [japaneseResult, setJapaneseResult] = useState<null | {
    westernYear: number
    eraDisplay: string
  }>(null)

  const calculateERA = () => {
    const er = parseFloat(earnedRuns)
    const ip = parseFloat(inningsPitched)
    const multiplier = gameLength === "9" ? 9 : 7

    if (!er || !ip || ip <= 0) {
      alert("Please enter valid earned runs and innings pitched")
      return
    }

    // Calculate ERA
    const era = (er / ip) * multiplier

    // Determine rating
    let rating = ""
    let description = ""

    if (era < 2.00) {
      rating = "Elite / Hall of Fame Level"
      description = "Outstanding performance! This is elite-level pitching."
    } else if (era < 3.00) {
      rating = "Excellent"
      description = "Excellent pitching! Well above average performance."
    } else if (era < 3.50) {
      rating = "Very Good"
      description = "Very good pitching. Solid performance."
    } else if (era < 4.00) {
      rating = "Above Average"
      description = "Above average pitching. Good performance."
    } else if (era < 4.50) {
      rating = "Average"
      description = "Average MLB performance."
    } else if (era < 5.00) {
      rating = "Below Average"
      description = "Below average performance. Room for improvement."
    } else {
      rating = "Poor"
      description = "Struggling performance. Significant improvement needed."
    }

    setEraResult({
      era: parseFloat(era.toFixed(2)),
      rating,
      description
    })
  }

  const convertJapaneseEra = () => {
    const year = parseInt(eraYear)

    if (!year || year <= 0) {
      alert("Please enter a valid era year")
      return
    }

    const eraStartYears: { [key: string]: { start: number; name: string; japanese: string } } = {
      meiji: { start: 1868, name: "Meiji", japanese: "明治" },
      taisho: { start: 1912, name: "Taishō", japanese: "大正" },
      showa: { start: 1926, name: "Shōwa", japanese: "昭和" },
      heisei: { start: 1989, name: "Heisei", japanese: "平成" },
      reiwa: { start: 2019, name: "Reiwa", japanese: "令和" }
    }

    const selectedEra = eraStartYears[eraName]
    
    // Western Year = Era Start Year + Era Year − 1
    const westernYear = selectedEra.start + year - 1

    setJapaneseResult({
      westernYear,
      eraDisplay: `${selectedEra.name} ${year} (${selectedEra.japanese} ${year})`
    })
  }

  const resetERA = () => {
    setEarnedRuns("")
    setInningsPitched("")
    setGameLength("9")
    setEraResult(null)
  }

  const resetJapanese = () => {
    setEraName("reiwa")
    setEraYear("")
    setJapaneseResult(null)
  }

  return (
    <Tabs defaultValue="era" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-2 h-auto p-2">
        <TabsTrigger value="era" className="text-sm md:text-base">ERA Calculator</TabsTrigger>
        <TabsTrigger value="japanese" className="text-sm md:text-base">Japanese Era Converter</TabsTrigger>
      </TabsList>

      {/* ERA Calculator */}
      <TabsContent value="era" className="space-y-6 mt-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            Baseball ERA Calculator
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="earned-runs">Earned Runs (ER)</Label>
              <Input
                id="earned-runs"
                type="number"
                step="1"
                min="0"
                value={earnedRuns}
                onChange={(e) => setEarnedRuns(e.target.value)}
                placeholder="e.g., 15"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="innings-pitched">Innings Pitched (IP)</Label>
              <Input
                id="innings-pitched"
                type="number"
                step="0.1"
                min="0"
                value={inningsPitched}
                onChange={(e) => setInningsPitched(e.target.value)}
                placeholder="e.g., 45"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">Use decimals for partial innings (e.g., 6.2 = 6⅔ innings)</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="game-length">Game Length</Label>
              <select
                id="game-length"
                value={gameLength}
                onChange={(e) => setGameLength(e.target.value as "9" | "7")}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500"
              >
                <option value="9">9 Innings (MLB Standard)</option>
                <option value="7">7 Innings (High School / Softball)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={calculateERA}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 text-lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate ERA
            </Button>
            <Button 
              onClick={resetERA}
              variant="outline"
              className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100"
            >
              Reset
            </Button>
          </div>

          {eraResult && (
            <div className="mt-6 space-y-4">
              <div className="bg-white p-6 rounded-lg border-2 border-blue-300 shadow-md">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-2">Earned Run Average (ERA)</p>
                  <p className="text-6xl font-bold text-blue-600">{eraResult.era.toFixed(2)}</p>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Rating:</p>
                    <p className="text-xl font-bold text-blue-700">{eraResult.rating}</p>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Analysis:</p>
                    <p className="text-gray-700">{eraResult.description}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                  <p><strong>Formula:</strong> ERA = (Earned Runs ÷ Innings Pitched) × {gameLength}</p>
                  <p className="mt-1"><strong>Calculation:</strong> ({earnedRuns} ÷ {inningsPitched}) × {gameLength} = {eraResult.era.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Japanese Era Converter */}
      <TabsContent value="japanese" className="space-y-6 mt-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Japanese Era to Western Year Converter
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="era-name">Japanese Era (Gengō)</Label>
              <select
                id="era-name"
                value={eraName}
                onChange={(e) => setEraName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:border-purple-500"
              >
                <option value="reiwa">Reiwa (令和) - 2019–Present</option>
                <option value="heisei">Heisei (平成) - 1989–2019</option>
                <option value="showa">Shōwa (昭和) - 1926–1989</option>
                <option value="taisho">Taishō (大正) - 1912–1926</option>
                <option value="meiji">Meiji (明治) - 1868–1912</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="era-year">Era Year Number</Label>
              <Input
                id="era-year"
                type="number"
                step="1"
                min="1"
                value={eraYear}
                onChange={(e) => setEraYear(e.target.value)}
                placeholder="e.g., 7"
                className="border-2 border-gray-300 focus:border-purple-500"
              />
              <p className="text-xs text-gray-500">Enter the year within the selected era</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={convertJapaneseEra}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Convert to Western Year
            </Button>
            <Button 
              onClick={resetJapanese}
              variant="outline"
              className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100"
            >
              Reset
            </Button>
          </div>

          {japaneseResult && (
            <div className="mt-6">
              <div className="bg-white p-6 rounded-lg border-2 border-purple-300 shadow-md">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-2">Japanese Era:</p>
                  <p className="text-2xl font-bold text-purple-600 mb-4">{japaneseResult.eraDisplay}</p>
                  
                  <div className="border-t-2 border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-2">Western Calendar Year:</p>
                    <p className="text-5xl font-bold text-pink-600">{japaneseResult.westernYear}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                  <p><strong>Formula:</strong> Western Year = Era Start Year + Era Year − 1</p>
                  <p className="mt-1">This conversion helps translate Japanese imperial calendar dates to the Western Gregorian calendar.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
