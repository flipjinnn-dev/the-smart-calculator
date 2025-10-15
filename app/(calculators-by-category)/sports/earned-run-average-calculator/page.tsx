"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Trophy, Calculator, Target, AlertCircle, Activity } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

export default function ERACalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [earnedRuns, setEarnedRuns] = useState("")
  const [wholeInnings, setWholeInnings] = useState("")
  const [outs, setOuts] = useState("0")
  const [gameInnings, setGameInnings] = useState("9")

  const outsOptions = [
    { value: "0", label: "0 outs" },
    { value: "1", label: "1 out" },
    { value: "2", label: "2 outs" },
  ]

  const gameInningsOptions = [
    { value: "9", label: "9 innings (MLB/Professional)" },
    { value: "7", label: "7 innings (Softball/High School)" },
  ]

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!earnedRuns || Number.parseFloat(earnedRuns) < 0) {
      newErrors.earnedRuns = "Please enter a valid number of earned runs (≥ 0)"
    }

    if (!wholeInnings || Number.parseFloat(wholeInnings) < 0) {
      newErrors.wholeInnings = "Please enter a valid number of whole innings (≥ 0)"
    }

    const totalInnings = Number.parseFloat(wholeInnings || "0") + Number.parseFloat(outs) / 3
    if (totalInnings <= 0) {
      newErrors.wholeInnings = "Total innings pitched must be greater than 0"
    }

    if (!gameInnings || Number.parseFloat(gameInnings) <= 0) {
      newErrors.gameInnings = "Please enter a valid number of game innings"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateERA = () => {
    if (!validateInputs()) return

    const er = Number.parseFloat(earnedRuns)
    const ipWhole = Number.parseFloat(wholeInnings)
    const outsValue = Number.parseFloat(outs)
    const gi = Number.parseFloat(gameInnings)

    // Step 1: Convert Innings + Outs into Total Innings
    const ipTotal = ipWhole + outsValue / 3

    // Step 2: Calculate ERA
    const era = (er / ipTotal) * gi

    setResult({
      earnedRuns: er,
      wholeInnings: ipWhole,
      outs: outsValue,
      totalInnings: ipTotal,
      gameInnings: gi,
      era: era,
      outsAsFraction: outsValue === 1 ? "1/3" : outsValue === 2 ? "2/3" : "0",
    })
    setShowResult(true)
  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  return (
    <>
<SEO
  title="ERA Calculator – Earned Run Average Tool"
  description="Calculate ERA quickly for baseball pitchers. Use our free earned run average calculator to analyze pitching performance."
  keywords="ERA calculator, earned run average calculator, baseball pitching stats, baseball performance tool"
  slug="/sports/earned-run-average-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_720-8sE77EX08xKuB6AvLTisdyhRT3j1X2.png"
                  alt="Smart Calculator Logo"
                  className="w-12 h-12"
                />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">ERA Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/sports" className="text-gray-500 hover:text-blue-600">
                Sports
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">ERA Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ERA Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate Earned Run Average (ERA) for baseball and softball pitchers. Convert innings and outs to
                precise ERA calculations with proper fractional innings handling.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <span>Pitching Statistics</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter pitching statistics to calculate Earned Run Average
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Earned Runs */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Earned Runs (ER)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${
                              errors.earnedRuns ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter earned runs"
                            value={earnedRuns}
                            onChange={(e) => {
                              setEarnedRuns(e.target.value)
                              if (errors.earnedRuns) setErrors((prev) => ({ ...prev, earnedRuns: "" }))
                            }}
                          />
                        </div>
                        {errors.earnedRuns && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.earnedRuns}</span>
                          </div>
                        )}
                      </div>

                      {/* Whole Innings */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Whole Innings Pitched</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${
                              errors.wholeInnings ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter whole innings"
                            value={wholeInnings}
                            onChange={(e) => {
                              setWholeInnings(e.target.value)
                              if (errors.wholeInnings) setErrors((prev) => ({ ...prev, wholeInnings: "" }))
                            }}
                          />
                        </div>
                        {errors.wholeInnings && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.wholeInnings}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Outs */}
                      <div className="mb-6">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Additional Outs</Label>
                        <Select value={outs} onValueChange={setOuts}>
                          <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200">
                            <SelectValue placeholder="Select additional outs" />
                          </SelectTrigger>
                          <SelectContent>
                            {outsOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Game Innings */}
                      <div className="mb-6">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Game Length</Label>
                        <Select value={gameInnings} onValueChange={setGameInnings}>
                          <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200">
                            <SelectValue placeholder="Select game length" />
                          </SelectTrigger>
                          <SelectContent>
                            {gameInningsOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>Formula:</strong> ERA = (Earned Runs ÷ Total Innings) × Game Innings
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Total Innings = Whole Innings + (Outs ÷ 3). Each out represents 1/3 of an inning.
                      </p>
                    </div>

                    <Button
                      onClick={calculateERA}
                      className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    >
                      Calculate ERA
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mb-3 shadow-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">ERA Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <p className="text-3xl font-bold text-blue-900">{result.era?.toFixed(2)}</p>
                            <p className="text-gray-600">ERA</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-blue-200">
                            <p className="text-lg font-bold text-blue-900">{result.totalInnings?.toFixed(2)}</p>
                            <p className="text-gray-600">Total Innings</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Trophy className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter pitching statistics and click{" "}
                          <span className="font-semibold text-blue-600">Calculate</span> to see ERA.
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
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>Detailed ERA Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">ERA</h3>
                        <p className="text-3xl font-bold text-blue-900 mb-1">{result.era?.toFixed(2)}</p>
                        <p className="text-sm text-blue-600">Earned Run Average</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Earned Runs</h3>
                        <p className="text-2xl font-bold text-blue-900 mb-1">{result.earnedRuns}</p>
                        <p className="text-sm text-blue-600">ER</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Total Innings</h3>
                        <p className="text-2xl font-bold text-blue-900 mb-1">{result.totalInnings?.toFixed(2)}</p>
                        <p className="text-sm text-blue-600">
                          IP ({result.wholeInnings} + {result.outsAsFraction})
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Game Length</h3>
                        <p className="text-2xl font-bold text-blue-900 mb-1">{result.gameInnings}</p>
                        <p className="text-sm text-blue-600">innings</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Calculation Steps:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>Step 1:</strong> Total Innings = {result.wholeInnings} + ({result.outs}/3) ={" "}
                          {result.totalInnings?.toFixed(2)} innings
                        </p>
                        <p>
                          <strong>Step 2:</strong> ERA = ({result.earnedRuns} ÷ {result.totalInnings?.toFixed(2)}) ×{" "}
                          {result.gameInnings} = {result.era?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-3 shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                    Understanding ERA in Baseball
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">What is ERA?</h3>
                      <p className="text-gray-700 mb-4">
                        Earned Run Average (ERA) measures how many earned runs a pitcher allows per nine innings
                        pitched. It's one of the most important statistics for evaluating pitcher performance.
                      </p>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">ERA Interpretation</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Under 2.00: Excellent</li>
                        <li>2.00-3.00: Very Good</li>
                        <li>3.00-4.00: Good</li>
                        <li>4.00-5.00: Average</li>
                        <li>Above 5.00: Below Average</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong> Pitcher Statistics
                        </p>
                        <p className="text-gray-700">Earned Runs: 15</p>
                        <p className="text-gray-700">Innings: 65</p>
                        <p className="text-gray-700">Outs: 2</p>
                        <p className="text-gray-700">Game Innings: 9</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Calculation:</strong>
                        </p>
                        <p className="text-gray-700">Total IP = 65 + (2/3) = 65.67</p>
                        <p className="text-gray-700">ERA = (15 ÷ 65.67) × 9</p>
                        <p className="text-gray-700 font-semibold">ERA = 2.06</p>
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
