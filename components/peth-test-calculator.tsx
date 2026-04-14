"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calculator, AlertCircle, CheckCircle, TrendingDown } from "lucide-react"

export default function PethTestCalculator() {
  const [mode, setMode] = useState<"estimate" | "lab">("estimate")
  const [drinkingPattern, setDrinkingPattern] = useState<string>("")
  const [daysSinceLastDrink, setDaysSinceLastDrink] = useState<string>("")
  const [labResult, setLabResult] = useState<string>("")
  const [daysSinceTest, setDaysSinceTest] = useState<string>("")
  const [cutoffLevel, setCutoffLevel] = useState<string>("20")
  const [results, setResults] = useState<{
    currentLevel: number
    cleanDate: number
    status: string
    halfLivesElapsed: number
  } | null>(null)

  const calculatePethLevel = () => {
    const halfLife = 4.5
    let startingLevel = 0
    let daysElapsed = 0

    if (mode === "estimate") {
      const days = parseFloat(daysSinceLastDrink)
      if (!drinkingPattern || isNaN(days) || days < 0) {
        return
      }

      switch (drinkingPattern) {
        case "chronic":
          startingLevel = 500
          break
        case "heavy":
          startingLevel = 200
          break
        case "binge":
          startingLevel = 60
          break
        case "moderate":
          startingLevel = 60
          break
        case "light":
          startingLevel = 25
          break
        default:
          return
      }

      daysElapsed = days
    } else {
      const lab = parseFloat(labResult)
      const days = parseFloat(daysSinceTest)
      
      if (isNaN(lab) || isNaN(days) || lab < 0 || days < 0) {
        return
      }

      startingLevel = lab
      daysElapsed = days
    }

    const halfLivesElapsed = daysElapsed / halfLife
    const currentLevel = startingLevel * Math.pow(0.5, halfLivesElapsed)
    
    const cutoff = parseFloat(cutoffLevel)
    let daysToClean = 0
    
    if (currentLevel > cutoff) {
      daysToClean = Math.ceil(
        (Math.log(cutoff / startingLevel) / Math.log(0.5)) * halfLife - daysElapsed
      )
    }

    let status = ""
    if (currentLevel < cutoff) {
      status = "NEGATIVE"
    } else if (currentLevel < 35) {
      status = "BORDERLINE"
    } else if (currentLevel < 200) {
      status = "POSITIVE"
    } else if (currentLevel < 1000) {
      status = "HIGH POSITIVE"
    } else {
      status = "CRITICAL"
    }

    setResults({
      currentLevel: Math.round(currentLevel * 10) / 10,
      cleanDate: daysToClean > 0 ? daysToClean : 0,
      status,
      halfLivesElapsed: Math.round(halfLivesElapsed * 10) / 10,
    })
  }

  const resetCalculator = () => {
    setDrinkingPattern("")
    setDaysSinceLastDrink("")
    setLabResult("")
    setDaysSinceTest("")
    setCutoffLevel("20")
    setResults(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-xl border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
          <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl text-blue-900">
            <Calculator className="w-8 h-8 text-blue-600" />
            PEth Test Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">Calculation Mode</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={mode === "estimate" ? "default" : "outline"}
                  onClick={() => {
                    setMode("estimate")
                    setResults(null)
                  }}
                  className="w-full"
                >
                  Estimate from Drinking
                </Button>
                <Button
                  type="button"
                  variant={mode === "lab" ? "default" : "outline"}
                  onClick={() => {
                    setMode("lab")
                    setResults(null)
                  }}
                  className="w-full"
                >
                  From Lab Result
                </Button>
              </div>
            </div>

            {mode === "estimate" ? (
              <>
                <div>
                  <Label htmlFor="drinking-pattern" className="text-base font-semibold mb-2 block">
                    Drinking Pattern
                  </Label>
                  <Select value={drinkingPattern} onValueChange={setDrinkingPattern}>
                    <SelectTrigger id="drinking-pattern">
                      <SelectValue placeholder="Select your drinking pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chronic">Chronic Daily Heavy (200-1000+ ng/mL)</SelectItem>
                      <SelectItem value="heavy">Regular Heavy (100-300 ng/mL)</SelectItem>
                      <SelectItem value="binge">Single Binge Episode (20-80 ng/mL)</SelectItem>
                      <SelectItem value="moderate">Moderate/Social (35-100 ng/mL)</SelectItem>
                      <SelectItem value="light">Light/Occasional (15-35 ng/mL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="days-since-drink" className="text-base font-semibold mb-2 block">
                    Days Since Last Drink
                  </Label>
                  <Input
                    id="days-since-drink"
                    type="number"
                    min="0"
                    step="1"
                    value={daysSinceLastDrink}
                    onChange={(e) => setDaysSinceLastDrink(e.target.value)}
                    placeholder="Enter number of days"
                    className="text-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="lab-result" className="text-base font-semibold mb-2 block">
                    Your Lab Result (ng/mL)
                  </Label>
                  <Input
                    id="lab-result"
                    type="number"
                    min="0"
                    step="0.1"
                    value={labResult}
                    onChange={(e) => setLabResult(e.target.value)}
                    placeholder="Enter your PEth level"
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="days-since-test" className="text-base font-semibold mb-2 block">
                    Days Since That Test
                  </Label>
                  <Input
                    id="days-since-test"
                    type="number"
                    min="0"
                    step="1"
                    value={daysSinceTest}
                    onChange={(e) => setDaysSinceTest(e.target.value)}
                    placeholder="Enter number of days"
                    className="text-lg"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="cutoff-level" className="text-base font-semibold mb-2 block">
                Negative Cutoff Level (ng/mL)
              </Label>
              <Select value={cutoffLevel} onValueChange={setCutoffLevel}>
                <SelectTrigger id="cutoff-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 ng/mL (Strict - Transplant Programs)</SelectItem>
                  <SelectItem value="20">20 ng/mL (Standard - Most Programs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={calculatePethLevel}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate PEth Level
            </Button>
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="px-6 py-6"
            >
              Reset
            </Button>
          </div>

          {results && (
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-6 h-6" />
                  Your Results
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Current Estimated Level</div>
                    <div className="text-3xl font-bold text-blue-600">{results.currentLevel} ng/mL</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <div className={`text-2xl font-bold ${
                      results.status === "NEGATIVE" ? "text-green-600" :
                      results.status === "BORDERLINE" ? "text-yellow-600" :
                      results.status === "POSITIVE" ? "text-orange-600" :
                      "text-red-600"
                    }`}>
                      {results.status}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Half-Lives Elapsed</div>
                  <div className="text-2xl font-bold text-indigo-600">{results.halfLivesElapsed}</div>
                  <div className="text-xs text-gray-500 mt-1">Based on 4.5-day average half-life</div>
                </div>

                {results.cleanDate > 0 ? (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-yellow-900 mb-1">
                        Estimated Days Until Clean: {results.cleanDate} days
                      </div>
                      <div className="text-sm text-yellow-800">
                        Add 3-5 days as a safety buffer. Individual half-life varies from 3-10 days.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-green-900 mb-1">
                        Below {cutoffLevel} ng/mL Threshold
                      </div>
                      <div className="text-sm text-green-800">
                        Your estimated level is below the negative cutoff. Confirm with a lab test.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <strong>Important:</strong> This calculator provides estimates only. Individual half-life varies (3-10 days). 
                    Always add a safety buffer and confirm with a certified lab test before any legal, medical, or employment decision.
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
