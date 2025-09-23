"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Dumbbell, Target, TrendingUp, Download, Share2, Printer } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

// RPE Chart data mapping reps × RPE → % of 1RM
const rpeChart = {
  1: { 10: 1.0, 9.5: 0.975, 9: 0.95, 8.5: 0.925, 8: 0.9, 7.5: 0.875, 7: 0.85, 6.5: 0.825, 6: 0.8 },
  2: { 10: 0.97, 9.5: 0.95, 9: 0.925, 8.5: 0.9, 8: 0.875, 7.5: 0.85, 7: 0.825, 6.5: 0.8, 6: 0.775 },
  3: { 10: 0.94, 9.5: 0.922, 9: 0.897, 8.5: 0.872, 8: 0.847, 7.5: 0.822, 7: 0.797, 6.5: 0.772, 6: 0.747 },
  4: { 10: 0.91, 9.5: 0.895, 9: 0.87, 8.5: 0.845, 8: 0.82, 7.5: 0.795, 7: 0.77, 6.5: 0.745, 6: 0.72 },
  5: { 10: 0.885, 9.5: 0.868, 9: 0.843, 8.5: 0.818, 8: 0.793, 7.5: 0.768, 7: 0.743, 6.5: 0.718, 6: 0.693 },
  6: { 10: 0.86, 9.5: 0.841, 9: 0.816, 8.5: 0.791, 8: 0.766, 7.5: 0.741, 7: 0.716, 6.5: 0.691, 6: 0.666 },
  7: { 10: 0.835, 9.5: 0.814, 9: 0.789, 8.5: 0.764, 8: 0.739, 7.5: 0.714, 7: 0.689, 6.5: 0.664, 6: 0.639 },
  8: { 10: 0.81, 9.5: 0.787, 9: 0.762, 8.5: 0.737, 8: 0.712, 7.5: 0.687, 7: 0.662, 6.5: 0.637, 6: 0.612 },
  9: { 10: 0.785, 9.5: 0.76, 9: 0.735, 8.5: 0.71, 8: 0.685, 7.5: 0.66, 7: 0.635, 6.5: 0.61, 6: 0.585 },
  10: { 10: 0.76, 9.5: 0.733, 9: 0.708, 8.5: 0.683, 8: 0.658, 7.5: 0.633, 7: 0.608, 6.5: 0.583, 6: 0.558 },
  11: { 10: 0.735, 9.5: 0.706, 9: 0.681, 8.5: 0.656, 8: 0.631, 7.5: 0.606, 7: 0.581, 6.5: 0.556, 6: 0.531 },
  12: { 10: 0.71, 9.5: 0.679, 9: 0.654, 8.5: 0.629, 8: 0.604, 7.5: 0.579, 7: 0.554, 6.5: 0.529, 6: 0.504 },
}

// Helper function to round to increment
function roundToIncrement(value: number, increment: number): number {
  return Math.round(value / increment) * increment
}

export default function RPECalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [rpe, setRpe] = useState("")
  const [increment, setIncrement] = useState("2.5")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const weightNum = Number.parseFloat(weight)
    if (!weight || weightNum <= 0 || weightNum > 1000) {
      newErrors.weight = "Please enter a valid weight (1-1000)"
    }

    const repsNum = Number.parseInt(reps)
    if (!reps || repsNum < 1 || repsNum > 12) {
      newErrors.reps = "Reps must be between 1-12"
    }

    const rpeNum = Number.parseFloat(rpe)
    if (!rpe || rpeNum < 6 || rpeNum > 10) {
      newErrors.rpe = "RPE must be between 6-10"
    }

    const incrementNum = Number.parseFloat(increment)
    if (!increment || incrementNum <= 0) {
      newErrors.increment = "Please select a valid increment"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateRPE = () => {
    if (!validateInputs()) return

    try {
      const weightNum = Number.parseFloat(weight)
      const repsNum = Number.parseInt(reps)
      const rpeNum = Number.parseFloat(rpe)
      const incrementNum = Number.parseFloat(increment)

      // Get percentage from RPE chart
      const percentage = rpeChart[repsNum as keyof typeof rpeChart]?.[rpeNum as keyof (typeof rpeChart)[1]]

      if (!percentage) {
        setErrors({ general: "Invalid RPE/Reps combination" })
        return
      }

      // Calculate estimated 1RM
      const estimated1RM = weightNum / percentage

      // Generate suggested loads for different RPE/rep combinations
      const suggestedLoads = []
      for (let r = 1; r <= 12; r++) {
        const rowData: { reps: number; loads: { [key: string]: number } } = { reps: r, loads: {} };
        const rpeValues = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6];

        for (const rpeVal of rpeValues) {
          const chartPercentage = rpeChart[r as keyof typeof rpeChart]?.[rpeVal as keyof (typeof rpeChart)[1]];
          if (chartPercentage) {
            const load = roundToIncrement(estimated1RM * chartPercentage, incrementNum);
            rowData.loads[rpeVal.toString()] = load;
          }
        }
        suggestedLoads.push(rowData);
      }

      const results = {
        inputWeight: weightNum,
        inputReps: repsNum,
        inputRPE: rpeNum,
        increment: incrementNum,
        percentage: percentage,
        estimated1RM: Math.round(estimated1RM * 100) / 100,
        suggestedLoads: suggestedLoads,
        userInputHighlight: { reps: repsNum, rpe: rpeNum },
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating RPE. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setWeight("")
    setReps("")
    setRpe("")
    setIncrement("2.5")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const downloadCSV = () => {
    if (!result) return

    let csv = "Reps,RPE 10,RPE 9.5,RPE 9,RPE 8.5,RPE 8,RPE 7.5,RPE 7,RPE 6.5,RPE 6\n"

    result.suggestedLoads.forEach((row: any) => {
      const rpeValues = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6]
      const loads = rpeValues.map((rpe) => row.loads[rpe] || "").join(",")
      csv += `${row.reps},${loads}\n`
    })

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rpe-chart.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const shareResults = () => {
    if (!result) return

    const shareText = `My RPE Calculator Results:\n1RM Estimate: ${result.estimated1RM} lbs\nBased on: ${result.inputWeight} lbs × ${result.inputReps} reps @ RPE ${result.inputRPE}`

    if (navigator.share) {
      navigator.share({
        title: "RPE Calculator Results",
        text: shareText,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Results copied to clipboard!")
    }
  }

  const printChart = () => {
    window.print()
  }

  return (
    <>
      <SEO
        title="RPE Calculator – Estimate 1RM from Weight, Reps, and RPE"
        slug="rpe-calculator"
        keywords="RPE Calculator, 1RM Estimator, Rate of Perceived Exertion, Weightlifting Calculator, Strength Training Tools"
        description="Free RPE Calculator: Convert weight, reps, and RPE into estimated 1RM (1-Rep Max). Includes RPE chart and load suggestions rounded to your chosen weight increment."
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">RPE Calculator</p>
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
              <Link href="/other-calculators" className="text-gray-500 hover:text-green-600">
                Other Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">RPE Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">RPE Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Estimate your 1RM from weight, reps, and RPE. Get personalized load recommendations for your training.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>Estimate Your 1RM from Weight, Reps, and RPE</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your lift details to calculate your estimated one-rep maximum
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Weight Lifted */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Weight Lifted</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Dumbbell className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`}
                            type="number"
                            placeholder="225"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            step="0.5"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            lbs
                          </span>
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>

                      {/* Reps Performed */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Reps Performed</Label>
                        <Select value={reps} onValueChange={setReps}>
                          <SelectTrigger className={`h-12 ${errors.reps ? "border-red-300" : ""}`}>
                            <div className="flex items-center">
                              <Target className="h-5 w-5 text-green-500 mr-2" />
                              <SelectValue placeholder="Select reps (1-12)" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((rep) => (
                              <SelectItem key={rep} value={rep.toString()}>
                                {rep} rep{rep !== 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.reps && <p className="text-red-600 text-xs mt-1">{errors.reps}</p>}
                      </div>

                      {/* RPE Value */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">RPE Value</Label>
                        <Select value={rpe} onValueChange={setRpe}>
                          <SelectTrigger className={`h-12 ${errors.rpe ? "border-red-300" : ""}`}>
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                              <SelectValue placeholder="Select RPE (6-10)" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {[10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6].map((rpeVal) => (
                              <SelectItem key={rpeVal} value={rpeVal.toString()}>
                                RPE {rpeVal}{" "}
                                {rpeVal === 10
                                  ? "(Max effort)"
                                  : rpeVal >= 9
                                    ? "(Very hard)"
                                    : rpeVal >= 8
                                      ? "(Hard)"
                                      : rpeVal >= 7
                                        ? "(Moderate)"
                                        : "(Easy)"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.rpe && <p className="text-red-600 text-xs mt-1">{errors.rpe}</p>}
                      </div>

                      {/* Weight Increment */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Minimum Weight Increment</Label>
                        <Select value={increment} onValueChange={setIncrement}>
                          <SelectTrigger className={`h-12 ${errors.increment ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select increment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">0.5 lbs</SelectItem>
                            <SelectItem value="1">1 lb</SelectItem>
                            <SelectItem value="2.5">2.5 lbs</SelectItem>
                            <SelectItem value="5">5 lbs</SelectItem>
                            <SelectItem value="10">10 lbs</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.increment && <p className="text-red-600 text-xs mt-1">{errors.increment}</p>}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateRPE}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        Calculate
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

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Estimated 1RM</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-green-200">
                          <p className="text-3xl font-bold text-green-900 mb-2">{result.estimated1RM} lbs</p>
                          <p className="text-sm font-medium text-gray-600">
                            {result.inputWeight} lbs × {result.inputReps} reps @ RPE {result.inputRPE}
                          </p>
                          <p className="text-sm text-gray-500">{Math.round(result.percentage * 100)}% of 1RM</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Dumbbell className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your lift details to estimate your 1RM.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Results Section */}
            {showResult && result && (
              <div className="mt-8 space-y-8">
                {/* RPE Chart */}
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center space-x-3 text-2xl">
                        <Target className="w-6 h-6 text-green-600" />
                        <span>RPE Chart</span>
                      </CardTitle>
                      <CardDescription className="text-base">
                        Suggested loads based on your estimated 1RM of {result.estimated1RM} lbs
                      </CardDescription>
                    </div>
                    <div className="flex flex-row space-x-2 md:space-x-4 md:ml-auto">
                      <Button
                        onClick={downloadCSV}
                        variant="outline"
                        className="flex items-center space-x-2 bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download CSV</span>
                      </Button>
                      <Button
                        onClick={shareResults}
                        variant="outline"
                        className="flex items-center space-x-2 bg-transparent"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share Results</span>
                      </Button>
                      <Button onClick={printChart} variant="outline" className="flex items-center space-x-2 bg-transparent">
                        <Printer className="w-4 h-4" />
                        <span>Print Chart</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-green-50">
                            <TableHead className="text-xs font-semibold text-green-800">Reps</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 10</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 9.5</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 9</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 8.5</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 8</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 7.5</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 7</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 6.5</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">RPE 6</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result.suggestedLoads.map((row: any, index: number) => (
                            <TableRow
                              key={index}
                              className={`hover:bg-green-50 ${
                                row.reps === result.userInputHighlight.reps ? "bg-green-100 font-semibold" : ""
                              }`}
                            >
                              <TableCell className="text-xs font-medium">{row.reps}</TableCell>
                              {[10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6].map((rpeVal) => (
                                <TableCell
                                  key={rpeVal}
                                  className={`text-xs ${
                                    row.reps === result.userInputHighlight.reps &&
                                    rpeVal === result.userInputHighlight.rpe
                                      ? "bg-green-200 font-bold"
                                      : ""
                                  }`}
                                >
                                  {row.loads[rpeVal] ? `${row.loads[rpeVal]} lbs` : "-"}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      <strong>Note:</strong> Your input ({result.inputReps} reps @ RPE {result.inputRPE}) is highlighted
                      in the chart above.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* How the RPE Calculator Works */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How the RPE Calculator Works</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">RPE Scale</h3>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>RPE 10:</strong> Maximum effort, no reps left
                          </li>
                          <li>
                            <strong>RPE 9.5:</strong> Could do 1 more rep with perfect form
                          </li>
                          <li>
                            <strong>RPE 9:</strong> Could do 1 more rep
                          </li>
                          <li>
                            <strong>RPE 8.5:</strong> Could do 1-2 more reps
                          </li>
                          <li>
                            <strong>RPE 8:</strong> Could do 2 more reps
                          </li>
                          <li>
                            <strong>RPE 7:</strong> Could do 3 more reps
                          </li>
                          <li>
                            <strong>RPE 6:</strong> Could do 4 more reps
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Calculation Method</h3>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-gray-700 space-y-2">
                          <p>
                            <strong>Formula:</strong> 1RM = Weight ÷ Percentage
                          </p>
                          <p>
                            <strong>Where:</strong> Percentage comes from RPE chart
                          </p>
                          <p>
                            <strong>Example:</strong> 225 lbs × 5 reps @ RPE 8
                          </p>
                          <p>Chart shows 79.3% for 5 reps @ RPE 8</p>
                          <p>1RM = 225 ÷ 0.793 = 284 lbs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8 ">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">What is RPE?</h3>
                        <p className="text-sm text-gray-700">
                          RPE (Rate of Perceived Exertion) is a scale from 1-10 that measures how hard an exercise
                          feels. In strength training, it's used to gauge how many more reps you could perform with good
                          form.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          How accurate is the RPE calculator?
                        </h3>
                        <p className="text-sm text-gray-700">
                          RPE-based 1RM estimates are generally accurate within 5-10% when used properly. Accuracy
                          improves with experience using the RPE scale and consistent form.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">What rep range works best?</h3>
                        <p className="text-sm text-gray-700">
                          RPE calculations are most accurate in the 3-8 rep range. Very low reps (1-2) and high reps
                          (10+) can be less reliable due to technique breakdown or cardiovascular limitations.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">How do I use RPE in training?</h3>
                        <p className="text-sm text-gray-700">
                          RPE allows for autoregulation - adjusting training loads based on daily readiness. Instead of
                          fixed percentages, you can hit target RPE ranges for more flexible programming.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">What about different exercises?</h3>
                        <p className="text-sm text-gray-700">
                          RPE charts work best for compound movements like squat, bench, and deadlift. Isolation
                          exercises may not follow the same patterns due to different fatigue mechanisms.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">Should I test my actual 1RM?</h3>
                        <p className="text-sm text-gray-700">
                          RPE estimates are safer and less fatiguing than true 1RM testing. Reserve actual 1RM attempts
                          for competition or specific testing phases with proper preparation.
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
