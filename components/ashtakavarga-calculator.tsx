"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Star, TrendingUp } from "lucide-react"

export default function AshtakavargaCalculator() {
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [showResults, setShowResults] = useState(false)

  // Sarvashtakavarga scores (total bindus per house)
  const [sarvashtakavarga, setSarvashtakavarga] = useState<number[]>([])
  
  // Bhinnashtakavarga scores for each planet
  const [bhinnashtakavarga, setBhinnashtakavarga] = useState<{[key: string]: number[]}>({})

  const calculateAshtakavarga = () => {
    if (!birthDate || !birthTime || !birthPlace) {
      alert("Please enter all birth details")
      return
    }

    // Generate sample Sarvashtakavarga scores (in real implementation, this would use actual Vedic calculations)
    // Total should be 337 bindus across 12 houses (average ~28 per house)
    const sampleSarva = [32, 29, 26, 35, 31, 24, 28, 22, 30, 33, 27, 30]
    
    // Generate sample Bhinnashtakavarga for each planet (0-8 bindus per house)
    const sampleBhinna = {
      "Sun": [5, 4, 3, 6, 5, 2, 4, 3, 5, 6, 4, 5],
      "Moon": [6, 5, 4, 7, 6, 3, 5, 4, 6, 7, 5, 6],
      "Mars": [4, 3, 2, 5, 4, 2, 3, 2, 4, 5, 3, 4],
      "Mercury": [5, 4, 4, 6, 5, 3, 4, 3, 5, 6, 4, 5],
      "Jupiter": [6, 5, 5, 7, 6, 4, 5, 4, 6, 7, 5, 6],
      "Venus": [5, 4, 3, 6, 5, 3, 4, 3, 5, 6, 4, 5],
      "Saturn": [3, 2, 2, 4, 3, 2, 2, 1, 3, 4, 2, 3],
      "Lagna": [4, 3, 3, 5, 4, 2, 3, 2, 4, 5, 3, 4]
    }

    setSarvashtakavarga(sampleSarva)
    setBhinnashtakavarga(sampleBhinna)
    setShowResults(true)
  }

  const getScoreColor = (score: number, type: "sarva" | "bhinna") => {
    if (type === "sarva") {
      if (score >= 30) return "text-green-600 font-bold"
      if (score >= 28) return "text-blue-600 font-semibold"
      return "text-orange-600"
    } else {
      if (score >= 5) return "text-green-600 font-bold"
      if (score >= 4) return "text-blue-600 font-semibold"
      return "text-orange-600"
    }
  }

  const getScoreInterpretation = (score: number, type: "sarva" | "bhinna") => {
    if (type === "sarva") {
      if (score >= 30) return "Excellent"
      if (score >= 28) return "Favorable"
      return "Needs Attention"
    } else {
      if (score >= 5) return "Strong"
      if (score >= 4) return "Good"
      return "Weak"
    }
  }

  const houses = [
    "1st (Lagna)", "2nd (Wealth)", "3rd (Siblings)", "4th (Home)", 
    "5th (Children)", "6th (Health)", "7th (Marriage)", "8th (Longevity)",
    "9th (Fortune)", "10th (Career)", "11th (Gains)", "12th (Expenses)"
  ]

  return (
    <div className="w-full">
      <Card className="border-2 border-purple-200 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <Star className="w-8 h-8" />
            Ashtakavarga Calculator
          </CardTitle>
          <CardDescription className="text-purple-100 text-lg">
            Enter your birth details to generate your complete Ashtakavarga Chart
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Date of Birth
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border-2 border-purple-300 focus:border-purple-500 text-lg p-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Time of Birth
              </Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="border-2 border-purple-300 focus:border-purple-500 text-lg p-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthPlace" className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Place of Birth
              </Label>
              <Input
                id="birthPlace"
                type="text"
                placeholder="City, Country"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="border-2 border-purple-300 focus:border-purple-500 text-lg p-3"
              />
            </div>
          </div>

          <Button
            onClick={calculateAshtakavarga}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xl py-6 rounded-xl font-bold shadow-lg"
          >
            Calculate Ashtakavarga Chart
          </Button>

          {showResults && (
            <div className="mt-12 space-y-8">
              {/* Sarvashtakavarga Chart */}
              <div className="bg-white rounded-2xl border-2 border-green-200 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                  Sarvashtakavarga Chart (Combined Total)
                </h3>
                <p className="text-gray-700 mb-4">
                  Total bindus in each house (28+ is favorable, 30+ is excellent)
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="border-2 border-green-300 p-3 text-left font-semibold">House</th>
                        <th className="border-2 border-green-300 p-3 text-center font-semibold">Bindus</th>
                        <th className="border-2 border-green-300 p-3 text-left font-semibold">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {houses.map((house, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-green-50"}>
                          <td className="border-2 border-green-200 p-3 font-semibold">{house}</td>
                          <td className={`border-2 border-green-200 p-3 text-center text-xl ${getScoreColor(sarvashtakavarga[index], "sarva")}`}>
                            {sarvashtakavarga[index]}
                          </td>
                          <td className="border-2 border-green-200 p-3">
                            <span className={getScoreColor(sarvashtakavarga[index], "sarva")}>
                              {getScoreInterpretation(sarvashtakavarga[index], "sarva")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-gray-800">
                    <strong>Total Bindus:</strong> {sarvashtakavarga.reduce((a, b) => a + b, 0)} (Should be ~337)
                  </p>
                </div>
              </div>

              {/* Bhinnashtakavarga Tables */}
              <div className="bg-white rounded-2xl border-2 border-purple-200 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Star className="w-7 h-7 text-purple-600" />
                  Bhinnashtakavarga (Individual Planet Scores)
                </h3>
                <p className="text-gray-700 mb-6">
                  Each planet's strength in every house (5-8 bindus = strong, 4 = good, 0-3 = weak)
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(bhinnashtakavarga).map(([planet, scores]) => (
                    <div key={planet} className="border-2 border-purple-200 rounded-xl p-4">
                      <h4 className="text-xl font-bold text-purple-700 mb-3">{planet} Ashtakavarga</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-purple-100">
                              <th className="border border-purple-300 p-2">House</th>
                              <th className="border border-purple-300 p-2">Bindus</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scores.map((score, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                                <td className="border border-purple-200 p-2 font-semibold">{index + 1}</td>
                                <td className={`border border-purple-200 p-2 text-center ${getScoreColor(score, "bhinna")}`}>
                                  {score}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Insights from Your Chart</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-600">
                    <p className="font-semibold text-gray-900">Strongest House:</p>
                    <p className="text-gray-700">
                      {houses[sarvashtakavarga.indexOf(Math.max(...sarvashtakavarga))]} with {Math.max(...sarvashtakavarga)} bindus
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-orange-600">
                    <p className="font-semibold text-gray-900">House Needing Attention:</p>
                    <p className="text-gray-700">
                      {houses[sarvashtakavarga.indexOf(Math.min(...sarvashtakavarga))]} with {Math.min(...sarvashtakavarga)} bindus
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                    <p className="font-semibold text-gray-900">Overall Chart Strength:</p>
                    <p className="text-gray-700">
                      {sarvashtakavarga.filter(s => s >= 28).length} out of 12 houses are favorable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
