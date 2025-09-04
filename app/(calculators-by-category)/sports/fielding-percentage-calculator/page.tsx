"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { Trophy, Calculator, Target, AlertCircle, Activity, RotateCcw, HelpCircle } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

export default function FieldingPercentageCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showAsPercentage, setShowAsPercentage] = useState(false)

  // Input states
  const [putouts, setPutouts] = useState("")
  const [assists, setAssists] = useState("")
  const [errorsCount, setErrorsCount] = useState("")

  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!putouts || Number.parseInt(putouts) < 0 || !Number.isInteger(Number.parseFloat(putouts))) {
      newErrors.putouts = "Please enter a valid number of putouts (≥ 0, whole number)"
    }

    if (!assists || Number.parseInt(assists) < 0 || !Number.isInteger(Number.parseFloat(assists))) {
      newErrors.assists = "Please enter a valid number of assists (≥ 0, whole number)"
    }

    if (!errorsCount || Number.parseInt(errorsCount) < 0 || !Number.isInteger(Number.parseFloat(errorsCount))) {
      newErrors.errorsCount = "Please enter a valid number of errors (≥ 0, whole number)"
    }

    const totalChances =
      Number.parseInt(putouts || "0") + Number.parseInt(assists || "0") + Number.parseInt(errorsCount || "0")
    if (totalChances === 0) {
      newErrors.putouts = "Total chances (putouts + assists + errors) must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateFPCT = () => {
    if (!validateInputs()) return

    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const p = Number.parseInt(putouts)
    const a = Number.parseInt(assists)
    const e = Number.parseInt(errorsCount)

    // Calculate Total Chances
    const totalChances = p + a + e

    // Calculate FPCT
    const fpct = (p + a) / totalChances

    // Determine performance level
    let performanceLevel = ""
    if (fpct >= 0.98) {
      performanceLevel = "Elite"
    } else if (fpct >= 0.95) {
      performanceLevel = "Good"
    } else if (fpct >= 0.9) {
      performanceLevel = "Average"
    } else {
      performanceLevel = "Below Average"
    }

    setResult({
      putouts: p,
      assists: a,
      errors: e,
      totalChances: totalChances,
      fpct: fpct,
      fpctPercentage: fpct * 100,
      performanceLevel: performanceLevel,
      isPerfect: e === 0,
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setPutouts("")
    setAssists("")
    setErrorsCount("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
<SEO
  title="Fielding Percentage Calculator – Baseball Stats"
  description="Calculate fielding percentage instantly. Use our free calculator to measure baseball defense and player performance."
  keywords="fielding percentage calculator, baseball defense stats, baseball calculator, player performance tool"
  slug="/sports/fielding-percentage-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Fielding Percentage Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-green-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/sports" className="text-gray-500 hover:text-green-600">
                Sports
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Fielding Percentage Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fielding Percentage Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate Fielding Percentage (FPCT) for baseball and softball players. Measure defensive performance
                using putouts, assists, and errors to determine fielding effectiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-green-600" />
                      <span>Fielding Statistics</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter fielding statistics to calculate Fielding Percentage (FPCT)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Putouts */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">
                          Putouts (P)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Outs recorded by the fielder
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                              errors.putouts ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter putouts"
                            value={putouts}
                            onChange={(e) => {
                              setPutouts(e.target.value)
                              if (errors.putouts) setErrors((prev) => ({ ...prev, putouts: "" }))
                            }}
                          />
                        </div>
                        {errors.putouts && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.putouts}</span>
                          </div>
                        )}
                      </div>

                      {/* Assists */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">
                          Assists (A)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Plays that helped record an out
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                              errors.assists ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter assists"
                            value={assists}
                            onChange={(e) => {
                              setAssists(e.target.value)
                              if (errors.assists) setErrors((prev) => ({ ...prev, assists: "" }))
                            }}
                          />
                        </div>
                        {errors.assists && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.assists}</span>
                          </div>
                        )}
                      </div>

                      {/* Errors */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">
                          Errors (E)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Misplays that should have been made
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                              errors.errorsCount ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter errors"
                            value={errorsCount}
                            onChange={(e) => {
                              setErrorsCount(e.target.value)
                              if (errors.errorsCount) setErrors((prev) => ({ ...prev, errorsCount: "" }))
                            }}
                          />
                        </div>
                        {errors.errorsCount && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.errorsCount}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Output Format Toggle */}
                    <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="block md:flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Output Format</Label>
                          <p className="text-xs text-gray-600 mt-1">
                            Display result as {showAsPercentage ? "percentage" : "decimal"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`text-sm ${!showAsPercentage ? "text-green-600 font-medium" : "text-gray-500"}`}
                          >
                            Decimal
                          </span>
                          <Switch
                            checked={showAsPercentage}
                            onCheckedChange={setShowAsPercentage}
                            className="data-[state=checked]:bg-green-600"
                          />
                          <span
                            className={`text-sm ${showAsPercentage ? "text-green-600 font-medium" : "text-gray-500"}`}
                          >
                            Percentage
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">
                        <strong>Formula:</strong> FPCT = (Putouts + Assists) ÷ (Putouts + Assists + Errors)
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Total Chances = Putouts + Assists + Errors</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateFPCT}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                      >
                        Calculate FPCT
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div ref={resultsRef} className="hidden lg:block p-0">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">FPCT Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="bg-white p-4 rounded-lg border border-green-200">
                            <p className="text-3xl font-bold text-green-900">
                              {showAsPercentage ? `${result.fpctPercentage?.toFixed(1)}%` : result.fpct?.toFixed(3)}
                            </p>
                            <p className="text-gray-600">FPCT</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-lg font-bold text-green-900">{result.totalChances}</p>
                            <p className="text-gray-600">Total Chances</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-sm font-bold text-green-900">{result.performanceLevel}</p>
                            <p className="text-gray-600">Performance</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Trophy className="w-8 h-8 text-green-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">
                          Enter fielding statistics and click{" "}
                          <span className="font-semibold text-green-600">Calculate</span> to see FPCT.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && (
              <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>Detailed FPCT Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">FPCT</h3>
                        <p className="text-3xl font-bold text-green-900 mb-1">
                          {showAsPercentage ? `${result.fpctPercentage?.toFixed(1)}%` : result.fpct?.toFixed(3)}
                        </p>
                        <p className="text-sm text-green-600">
                          {result.isPerfect ? "Perfect!" : result.performanceLevel}
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Putouts</h3>
                        <p className="text-2xl font-bold text-green-900 mb-1">{result.putouts}</p>
                        <p className="text-sm text-green-600">P</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Assists</h3>
                        <p className="text-2xl font-bold text-green-900 mb-1">{result.assists}</p>
                        <p className="text-sm text-green-600">A</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Errors</h3>
                        <p className="text-2xl font-bold text-green-900 mb-1">{result.errors}</p>
                        <p className="text-sm text-green-600">E</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Calculation Steps:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>Step 1:</strong> Total Chances = {result.putouts} + {result.assists} + {result.errors}{" "}
                          = {result.totalChances}
                        </p>
                        <p>
                          <strong>Step 2:</strong> FPCT = ({result.putouts} + {result.assists}) ÷ {result.totalChances}{" "}
                          = {result.fpct?.toFixed(3)}
                        </p>
                        {showAsPercentage && (
                          <p>
                            <strong>Step 3:</strong> As percentage = {result.fpct?.toFixed(3)} × 100 ={" "}
                            {result.fpctPercentage?.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mr-3 shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    Understanding Fielding Percentage
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">What is FPCT?</h3>
                      <p className="text-gray-700 mb-4">
                        Fielding Percentage (FPCT) measures how often a fielder successfully handles a chance without
                        making an error. It's calculated by dividing successful plays (putouts + assists) by total
                        chances.
                      </p>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">FPCT Interpretation</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>1.000: Perfect (no errors)</li>
                        <li>0.980+: Elite level</li>
                        <li>0.950-0.979: Good</li>
                        <li>0.900-0.949: Average</li>
                        <li>Below 0.900: Below average</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong> Player Statistics
                        </p>
                        <p className="text-gray-700">Putouts: 1489</p>
                        <p className="text-gray-700">Assists: 496</p>
                        <p className="text-gray-700">Errors: 33</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Calculation:</strong>
                        </p>
                        <p className="text-gray-700">Total Chances = 1489 + 496 + 33 = 2018</p>
                        <p className="text-gray-700">FPCT = (1489 + 496) ÷ 2018</p>
                        <p className="text-gray-700 font-semibold">FPCT = 0.984 (98.4%)</p>
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800">
                          <strong>Note:</strong> High FPCT doesn't reflect a fielder's range or the difficulty of plays
                          attempted.
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
