"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Head from "next/head"
import { Calculator, AlertTriangle, Activity, RotateCcw, HelpCircle, Apple } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import Logo from "@/components/logo"

export default function WeightWatchersPointsCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [calories, setCalories] = useState("")
  const [saturatedFat, setSaturatedFat] = useState("")
  const [sugar, setSugar] = useState("")
  const [protein, setProtein] = useState("")

  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!calories || Number.parseFloat(calories) < 0) {
      newErrors.calories = "Please enter valid calories (≥0)"
    }

    if (!saturatedFat || Number.parseFloat(saturatedFat) < 0) {
      newErrors.saturatedFat = "Please enter valid saturated fat (≥0)"
    }

    if (!sugar || Number.parseFloat(sugar) < 0) {
      newErrors.sugar = "Please enter valid sugar (≥0)"
    }

    if (!protein || Number.parseFloat(protein) < 0) {
      newErrors.protein = "Please enter valid protein (≥0)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculatePoints = () => {
    if (!validateInputs()) return

    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const caloriesValue = Number.parseFloat(calories)
    const saturatedFatValue = Number.parseFloat(saturatedFat)
    const sugarValue = Number.parseFloat(sugar)
    const proteinValue = Number.parseFloat(protein)

    // Weight Watchers SmartPoints Formula (2015-2021)
    const rawPoints = 0.0305 * caloriesValue + 0.275 * saturatedFatValue + 0.12 * sugarValue - 0.098 * proteinValue

    const smartPoints = Math.round(rawPoints)

    // Ensure minimum of 0 points
    const finalPoints = Math.max(0, smartPoints)

    // Calculate breakdown for display
    const caloriesContribution = 0.0305 * caloriesValue
    const saturatedFatContribution = 0.275 * saturatedFatValue
    const sugarContribution = 0.12 * sugarValue
    const proteinContribution = 0.098 * proteinValue

    setResult({
      smartPoints: finalPoints,
      rawPoints: rawPoints,
      breakdown: {
        calories: caloriesContribution,
        saturatedFat: saturatedFatContribution,
        sugar: sugarContribution,
        protein: proteinContribution,
      },
      inputs: {
        calories: caloriesValue,
        saturatedFat: saturatedFatValue,
        sugar: sugarValue,
        protein: proteinValue,
      },
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setCalories("")
    setSaturatedFat("")
    setSugar("")
    setProtein("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Weight Watchers SmartPoints Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate Weight Watchers SmartPoints using the 2015-2021 formula. Enter calories, saturated fat, sugar, and protein to get your points value."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Weight Watchers SmartPoints Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-purple-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-purple-600">
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Weight Watchers SmartPoints Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Apple className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Weight Watchers SmartPoints Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate Weight Watchers SmartPoints using the 2015-2021 formula. Enter nutritional information to get
                your points value for tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-purple-600" />
                      <span>SmartPoints Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter nutritional information to calculate Weight Watchers SmartPoints
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {/* Calories */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Calories (kcal)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Total calories in the food item
                            </div>
                          </div>
                        </Label>
                        <Input
                          className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                            errors.calories ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="1"
                          min="0"
                          placeholder="Enter calories"
                          value={calories}
                          onChange={(e) => {
                            setCalories(e.target.value)
                            if (errors.calories) setErrors((prev) => ({ ...prev, calories: "" }))
                          }}
                        />
                        {errors.calories && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.calories}</span>
                          </div>
                        )}
                      </div>

                      {/* Saturated Fat */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Saturated Fat (grams)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Saturated fat content in grams
                            </div>
                          </div>
                        </Label>
                        <Input
                          className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                            errors.saturatedFat ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="Enter saturated fat"
                          value={saturatedFat}
                          onChange={(e) => {
                            setSaturatedFat(e.target.value)
                            if (errors.saturatedFat) setErrors((prev) => ({ ...prev, saturatedFat: "" }))
                          }}
                        />
                        {errors.saturatedFat && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.saturatedFat}</span>
                          </div>
                        )}
                      </div>

                      {/* Sugar */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Sugar (grams)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Total sugar content in grams
                            </div>
                          </div>
                        </Label>
                        <Input
                          className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                            errors.sugar ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="Enter sugar"
                          value={sugar}
                          onChange={(e) => {
                            setSugar(e.target.value)
                            if (errors.sugar) setErrors((prev) => ({ ...prev, sugar: "" }))
                          }}
                        />
                        {errors.sugar && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.sugar}</span>
                          </div>
                        )}
                      </div>

                      {/* Protein */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Protein (grams)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Protein content in grams (reduces points)
                            </div>
                          </div>
                        </Label>
                        <Input
                          className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                            errors.protein ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="Enter protein"
                          value={protein}
                          onChange={(e) => {
                            setProtein(e.target.value)
                            if (errors.protein) setErrors((prev) => ({ ...prev, protein: "" }))
                          }}
                        />
                        {errors.protein && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.protein}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>SmartPoints Formula (2015-2021):</strong> Points = (0.0305 × Calories) + (0.275 ×
                        Saturated Fat) + (0.12 × Sugar) - (0.098 × Protein)
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Result is rounded to the nearest whole number</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculatePoints}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
                      >
                        Calculate SmartPoints
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-indigo-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Apple className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">SmartPoints</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? (
                      <div className="space-y-4">
                        <div className="bg-white p-6 rounded-lg border-2 border-purple-400">
                          <p className="text-4xl font-bold text-purple-900">{result.smartPoints}</p>
                          <p className="text-purple-600">Points</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600">Weight Watchers</p>
                          <p className="text-sm text-gray-600">SmartPoints Value</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Apple className="w-8 h-8 text-purple-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">
                          Enter nutritional information, then click{" "}
                          <span className="font-semibold text-purple-600">Calculate</span> to see SmartPoints.
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
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>SmartPoints Calculation Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-400">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Apple className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-800 mb-2">SmartPoints Value</h3>
                        <p className="text-4xl font-bold text-purple-900 mb-1">{result.smartPoints}</p>
                        <p className="text-sm text-purple-700">Points</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Raw Calculation</h3>
                        <p className="text-2xl font-bold text-indigo-900 mb-1">{result.rawPoints.toFixed(2)}</p>
                        <p className="text-sm text-indigo-600">Before rounding</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Calculation Breakdown</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Calories ({result.inputs.calories} × 0.0305):</span>
                              <span className="font-medium">+{result.breakdown.calories.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Saturated Fat ({result.inputs.saturatedFat}g × 0.275):</span>
                              <span className="font-medium">+{result.breakdown.saturatedFat.toFixed(3)}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Sugar ({result.inputs.sugar}g × 0.12):</span>
                              <span className="font-medium">+{result.breakdown.sugar.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Protein ({result.inputs.protein}g × 0.098):</span>
                              <span className="font-medium text-green-600">-{result.breakdown.protein.toFixed(3)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-300 mt-3 pt-3">
                          <div className="flex justify-between font-semibold">
                            <span>Total Raw Points:</span>
                            <span>{result.rawPoints.toFixed(3)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-purple-700">
                            <span>Final SmartPoints (rounded):</span>
                            <span>{result.smartPoints}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center mr-3 shadow-lg">
                    <Apple className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">
                    Understanding Weight Watchers SmartPoints
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">SmartPoints Formula (2015-2021)</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <div className="space-y-2 text-gray-700">
                          <div className="flex justify-between">
                            <span>Calories:</span>
                            <span className="font-medium">× 0.0305</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturated Fat:</span>
                            <span className="font-medium">× 0.275</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sugar:</span>
                            <span className="font-medium">× 0.12</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Protein:</span>
                            <span className="font-medium text-green-600">- 0.098</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Historical Context</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>
                            <strong>Before 2010:</strong> Original Points (calories, fat, fiber)
                          </li>
                          <li>
                            <strong>2010-2015:</strong> PointsPlus (protein, carbs, fat, fiber)
                          </li>
                          <li>
                            <strong>2015-2021:</strong> SmartPoints (this calculator)
                          </li>
                          <li>
                            <strong>2022+:</strong> Updated formulas with more factors
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Key Features</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Protein reduces points (encourages protein intake)</li>
                          <li>Sugar and saturated fat increase points</li>
                          <li>Calories form the base calculation</li>
                          <li>Result is rounded to nearest whole number</li>
                          <li>Minimum value is 0 points</li>
                        </ul>
                      </div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Usage Tips</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Use nutrition labels for accurate values</li>
                          <li>Track all ingredients in recipes</li>
                          <li>Consider portion sizes when calculating</li>
                          <li>Zero-point foods don't need calculation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-purple-100 rounded-lg border border-purple-300">
                    <div className="flex items-start space-x-2">
                      <Apple className="w-5 h-5 text-purple-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-1">Note About Weight Watchers</h4>
                        <p className="text-sm text-purple-700">
                          This calculator uses the SmartPoints formula from December 2015 to November 2021. Weight
                          Watchers has since updated their system. For current Weight Watchers programs, please refer to
                          their official app and materials.
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
