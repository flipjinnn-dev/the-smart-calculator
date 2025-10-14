"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Calculator, RotateCcw, Scale, Ruler, Baby, Heart } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import pregnancyData from "@/app/content/pregnancy-weight-gain-calculator.json"
import SimilarCalculators from "@/components/similar-calculators"

export default function PregnancyWeightGainCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [prePregnancyWeight, setPrePregnancyWeight] = useState("")
  const [heightCm, setHeightCm] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [currentWeight, setCurrentWeight] = useState("")
  const [gestationalWeek, setGestationalWeek] = useState("")

  // Settings
  const [units, setUnits] = useState("metric") // metric or us

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Pre-pregnancy weight validation
    if (!prePregnancyWeight || isNaN(Number(prePregnancyWeight))) {
      newErrors.prePregnancyWeight = "Pre-pregnancy weight is required and must be a number"
    } else {
      const weight = Number(prePregnancyWeight)
      if (units === "metric" && (weight < 30 || weight > 200)) {
        newErrors.prePregnancyWeight = "Weight must be between 30-200 kg"
      } else if (units === "us" && (weight < 66 || weight > 440)) {
        newErrors.prePregnancyWeight = "Weight must be between 66-440 lbs"
      }
    }

    // Height validation
    if (units === "metric") {
      if (!heightCm || isNaN(Number(heightCm))) {
        newErrors.height = "Height is required and must be a number"
      } else if (Number(heightCm) < 120 || Number(heightCm) > 220) {
        newErrors.height = "Height must be between 120-220 cm"
      }
    } else {
      if (!heightFeet || isNaN(Number(heightFeet))) {
        newErrors.heightFeet = "Feet is required and must be a number"
      } else if (Number(heightFeet) < 4 || Number(heightFeet) > 7) {
        newErrors.heightFeet = "Feet must be between 4-7"
      }
      if (!heightInches || isNaN(Number(heightInches))) {
        newErrors.heightInches = "Inches is required and must be a number"
      } else if (Number(heightInches) < 0 || Number(heightInches) >= 12) {
        newErrors.heightInches = "Inches must be between 0-11"
      }
    }

    // Current weight validation (optional)
    if (currentWeight && isNaN(Number(currentWeight))) {
      newErrors.currentWeight = "Current weight must be a number"
    }

    // Gestational week validation (optional)
    if (
      gestationalWeek &&
      (isNaN(Number(gestationalWeek)) || Number(gestationalWeek) < 1 || Number(gestationalWeek) > 42)
    ) {
      newErrors.gestationalWeek = "Gestational week must be between 1-42"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateWeightGain = () => {
      scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    if (!validateInputs()) return

    try {
      // Convert inputs to metric
      let preWeightKg: number
      let currentWeightKg: number | null = null

      if (units === "metric") {
        preWeightKg = Number(prePregnancyWeight)
        currentWeightKg = currentWeight ? Number(currentWeight) : null
      } else {
        preWeightKg = Number(prePregnancyWeight) / 2.20462
        currentWeightKg = currentWeight ? Number(currentWeight) / 2.20462 : null
      }

      let heightCmVal: number
      if (units === "metric") {
        heightCmVal = Number(heightCm)
      } else {
        heightCmVal = (Number(heightFeet) * 12 + Number(heightInches)) * 2.54
      }

      // Calculate BMI
      const heightM = heightCmVal / 100
      const bmi = preWeightKg / (heightM * heightM)

      // Determine BMI category and weight gain recommendations
      let category: string
      let totalGainKg: { min: number; max: number }
      let weeklyGainKg: number

      if (bmi < 18.5) {
        category = "Underweight"
        totalGainKg = { min: 12.5, max: 18 }
        weeklyGainKg = 0.45
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal"
        totalGainKg = { min: 11.5, max: 16 }
        weeklyGainKg = 0.45
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = "Overweight"
        totalGainKg = { min: 7, max: 11.5 }
        weeklyGainKg = 0.25
      } else {
        category = "Obese"
        totalGainKg = { min: 5, max: 9 }
        weeklyGainKg = 0.25
      }

      // Convert to lbs
      const totalGainLbs = {
        min: totalGainKg.min * 2.20462,
        max: totalGainKg.max * 2.20462,
      }
      const weeklyGainLbs = weeklyGainKg * 2.20462

      // Calculate trimester breakdown
      const firstTrimesterGain = { min: 0.5, max: 2 } // kg
      const firstTrimesterGainLbs = { min: 1, max: 4 } // lbs

      // Progress tracking if current weight provided
      let progressTracking = null
      if (currentWeightKg && gestationalWeek) {
        const week = Number(gestationalWeek)
        const actualGainKg = currentWeightKg - preWeightKg
        const actualGainLbs = actualGainKg * 2.20462

        let expectedGainKg: number
        if (week <= 13) {
          // First trimester
          expectedGainKg = (week / 13) * ((firstTrimesterGain.min + firstTrimesterGain.max) / 2)
        } else {
          // Second/third trimester
          const weeksAfter13 = week - 13
          expectedGainKg = (firstTrimesterGain.min + firstTrimesterGain.max) / 2 + weeksAfter13 * weeklyGainKg
        }

        const expectedGainLbs = expectedGainKg * 2.20462
        const difference = actualGainKg - expectedGainKg

        let status: string
        if (Math.abs(difference) <= 1) {
          status = "On track"
        } else if (difference > 1) {
          status = "Above recommended"
        } else {
          status = "Below recommended"
        }

        progressTracking = {
          week,
          actualGain: { kg: actualGainKg, lbs: actualGainLbs },
          expectedGain: { kg: expectedGainKg, lbs: expectedGainLbs },
          difference: { kg: difference, lbs: difference * 2.20462 },
          status,
        }
      }

      setResult({
        bmi: bmi,
        category: category,
        totalGain: { kg: totalGainKg, lbs: totalGainLbs },
        weeklyGain: { kg: weeklyGainKg, lbs: weeklyGainLbs },
        firstTrimester: { kg: firstTrimesterGain, lbs: firstTrimesterGainLbs },
        progressTracking,
        inputs: {
          prePregnancyWeight: preWeightKg,
          height: heightCmVal,
          currentWeight: currentWeightKg,
          gestationalWeek: gestationalWeek ? Number(gestationalWeek) : null,
          units,
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating weight gain. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setPrePregnancyWeight("")
    setHeightCm("")
    setHeightFeet("")
    setHeightInches("")
    setCurrentWeight("")
    setGestationalWeek("")
    setUnits("metric")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
<SEO
  title="Pregnancy Weight Gain Calculator – Track Progress"
  description="Estimate healthy pregnancy weight gain week by week. Use our free calculator to track changes and support a healthy pregnancy."
  keywords="pregnancy weight gain calculator, healthy pregnancy weight, maternity calculator"
  slug="/health/pregnancy-weight-gain-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Pregnancy Weight Gain Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-pink-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-pink-600">
                Health & Wellness
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Pregnancy Weight Gain Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Baby className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pregnancy Weight Gain Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate recommended weight gain ranges and schedules based on Institute of Medicine (IOM) guidelines
                with optional progress tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>Weight Gain Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your pre-pregnancy details and optional current information for progress tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    {/* Units Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Unit System</Label>
                        <Select value={units} onValueChange={setUnits}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                            <SelectItem value="us">US (lbs, ft/in)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Pre-pregnancy Weight */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Pre-pregnancy Weight ({units === "metric" ? "kg" : "lbs"})
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.prePregnancyWeight ? "border-red-300" : ""}`}
                            type="text"
                            placeholder={units === "metric" ? "60" : "130"}
                            value={prePregnancyWeight}
                            onChange={(e) => setPrePregnancyWeight(e.target.value)}
                          />
                        </div>
                        {errors.prePregnancyWeight && (
                          <p className="text-red-600 text-xs mt-1">{errors.prePregnancyWeight}</p>
                        )}
                      </div>

                      {/* Height Input */}
                      {units === "metric" ? (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height (cm)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-pink-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.height ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="165"
                              value={heightCm}
                              onChange={(e) => setHeightCm(e.target.value)}
                            />
                          </div>
                          {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
                        </div>
                      ) : (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height (ft/in)</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-pink-500" />
                              </div>
                              <Input
                                className={`h-12 pl-10 ${errors.heightFeet ? "border-red-300" : ""}`}
                                type="text"
                                placeholder="5"
                                value={heightFeet}
                                onChange={(e) => setHeightFeet(e.target.value)}
                              />
                            </div>
                            <div className="relative flex-1">
                              <Input
                                className={`h-12 ${errors.heightInches ? "border-red-300" : ""}`}
                                type="text"
                                placeholder="5"
                                value={heightInches}
                                onChange={(e) => setHeightInches(e.target.value)}
                              />
                            </div>
                          </div>
                          {(errors.heightFeet || errors.heightInches) && (
                            <p className="text-red-600 text-xs mt-1">{errors.heightFeet || errors.heightInches}</p>
                          )}
                        </div>
                      )}

                      {/* Current Weight (Optional) */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Current Weight ({units === "metric" ? "kg" : "lbs"}){" "}
                          <span className="text-gray-500">(Optional)</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.currentWeight ? "border-red-300" : ""}`}
                            type="text"
                            placeholder={units === "metric" ? "65" : "145"}
                            value={currentWeight}
                            onChange={(e) => setCurrentWeight(e.target.value)}
                          />
                        </div>
                        {errors.currentWeight && <p className="text-red-600 text-xs mt-1">{errors.currentWeight}</p>}
                        <p className="text-xs text-gray-500 mt-1">For progress tracking</p>
                      </div>

                      {/* Gestational Week (Optional) */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Gestational Week <span className="text-gray-500">(Optional)</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Heart className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.gestationalWeek ? "border-red-300" : ""}`}
                            type="text"
                            placeholder="28"
                            value={gestationalWeek}
                            onChange={(e) => setGestationalWeek(e.target.value)}
                          />
                        </div>
                        {errors.gestationalWeek && (
                          <p className="text-red-600 text-xs mt-1">{errors.gestationalWeek}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Week 1-42 for progress tracking</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateWeightGain}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800"
                      >
                        Calculate Weight Gain
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-pink-300 text-pink-700 hover:bg-pink-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-700 flex items-center justify-center mb-3 shadow-lg">
                      <Baby className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">Weight Gain</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900">
                            {result.totalGain.kg.min.toFixed(1)}-{result.totalGain.kg.max.toFixed(1)} kg
                          </p>
                          <p className="text-gray-600 text-sm">Total Recommended</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900">BMI: {result.bmi.toFixed(1)}</p>
                          <p className="text-gray-600 text-sm">{result.category}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Baby className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your pre-pregnancy details to see recommended weight gain ranges.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Baby className="w-6 h-6 text-pink-600" />
                      <span>Weight Gain Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* BMI and Category */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                      <h3 className="text-xl font-semibold text-pink-700 mb-4">Pre-pregnancy Assessment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-pink-700 mb-2">BMI: {result.bmi.toFixed(1)}</p>
                          <p className="text-lg text-gray-600">Category: {result.category}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-pink-700 mb-2">
                            {result.totalGain.kg.min.toFixed(1)}-{result.totalGain.kg.max.toFixed(1)} kg
                          </p>
                          <p className="text-lg text-gray-600">
                            ({result.totalGain.lbs.min.toFixed(1)}-{result.totalGain.lbs.max.toFixed(1)} lbs)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Weight Gain Schedule */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-pink-700 mb-4">Trimester Schedule</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                          <h4 className="font-semibold text-pink-700 mb-3">First Trimester (Weeks 1-13)</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Total gain:</strong> {result.firstTrimester.kg.min}-{result.firstTrimester.kg.max}{" "}
                              kg ({result.firstTrimester.lbs.min}-{result.firstTrimester.lbs.max} lbs)
                            </p>
                            <p className="text-xs text-gray-600">Gradual weight gain, focus on nutrition quality</p>
                          </div>
                        </div>

                        <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                          <h4 className="font-semibold text-rose-700 mb-3">Second & Third Trimesters (Weeks 14-40)</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Weekly gain:</strong> ~{result.weeklyGain.kg.toFixed(2)} kg (~
                              {result.weeklyGain.lbs.toFixed(1)} lbs)
                            </p>
                            <p className="text-xs text-gray-600">Steady weekly weight gain</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Tracking */}
                    {result.progressTracking && (
                      <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                        <h3 className="text-xl font-semibold text-pink-700 mb-4">
                          Progress Tracking (Week {result.progressTracking.week})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-pink-700">
                              {result.progressTracking.actualGain.kg.toFixed(1)} kg
                            </p>
                            <p className="text-sm text-gray-600">Actual Gain</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-pink-700">
                              {result.progressTracking.expectedGain.kg.toFixed(1)} kg
                            </p>
                            <p className="text-sm text-gray-600">Expected Gain</p>
                          </div>
                          <div className="text-center">
                            <p
                              className={`text-lg font-bold ${
                                result.progressTracking.status === "On track"
                                  ? "text-green-700"
                                  : result.progressTracking.status === "Above recommended"
                                    ? "text-orange-700"
                                    : "text-blue-700"
                              }`}
                            >
                              {result.progressTracking.status}
                            </p>
                            <p className="text-sm text-gray-600">Status</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* IOM Guidelines Table */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-pink-700 mb-6">IOM Weight Gain Guidelines</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-pink-200 rounded-lg">
                          <thead>
                            <tr className="bg-gradient-to-r from-pink-50 to-rose-50">
                              <th className="border border-pink-200 p-3 text-left font-semibold text-pink-700">
                                BMI Category
                              </th>
                              <th className="border border-pink-200 p-3 text-center font-semibold text-pink-700">
                                BMI Range
                              </th>
                              <th className="border border-pink-200 p-3 text-center font-semibold text-pink-700">
                                Total Gain (kg)
                              </th>
                              <th className="border border-pink-200 p-3 text-center font-semibold text-pink-700">
                                Total Gain (lbs)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={result.category === "Underweight" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">Underweight</td>
                              <td className="border border-pink-200 p-3 text-center">&lt; 18.5</td>
                              <td className="border border-pink-200 p-3 text-center">12.5-18</td>
                              <td className="border border-pink-200 p-3 text-center">28-40</td>
                            </tr>
                            <tr className={result.category === "Normal" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">Normal</td>
                              <td className="border border-pink-200 p-3 text-center">18.5-24.9</td>
                              <td className="border border-pink-200 p-3 text-center">11.5-16</td>
                              <td className="border border-pink-200 p-3 text-center">25-35</td>
                            </tr>
                            <tr className={result.category === "Overweight" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">Overweight</td>
                              <td className="border border-pink-200 p-3 text-center">25.0-29.9</td>
                              <td className="border border-pink-200 p-3 text-center">7-11.5</td>
                              <td className="border border-pink-200 p-3 text-center">15-25</td>
                            </tr>
                            <tr className={result.category === "Obese" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">Obese</td>
                              <td className="border border-pink-200 p-3 text-center">≥ 30.0</td>
                              <td className="border border-pink-200 p-3 text-center">5-9</td>
                              <td className="border border-pink-200 p-3 text-center">11-20</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-700 flex items-center justify-center mr-3 shadow-lg">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">
                    Understanding Pregnancy Weight Gain
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">IOM Guidelines</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Based on pre-pregnancy BMI category</li>
                          <li>Accounts for maternal and fetal health</li>
                          <li>Reduces risk of complications</li>
                          <li>Updated in 2009 by Institute of Medicine</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Example Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Pre-pregnancy: 130 lbs, 5'5" (BMI 21.6)</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Category: Normal weight</p>
                          <p>
                            Total gain: <strong>25-35 lbs (11.5-16 kg)</strong>
                          </p>
                          <p>
                            1st trimester: <strong>1-4 lbs</strong>
                          </p>
                          <p>
                            2nd/3rd: <strong>~1 lb/week</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Important Factors</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Individual variation is normal</li>
                          <li>Quality of nutrition matters most</li>
                          <li>Regular prenatal care is essential</li>
                          <li>Multiple pregnancies need different guidelines</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Health Benefits</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Reduces risk of gestational diabetes</li>
                          <li>Lowers chance of preterm birth</li>
                          <li>Supports healthy fetal development</li>
                          <li>Easier postpartum weight loss</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Pregnancy Calculator",
                  calculatorHref: "/health/pregnancy-calculator",
                  calculatorDescription: "Estimate pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date"
                },
                {
                  calculatorName: "Pregnancy Conception Calculator", 
                  calculatorHref: "/health/pregnancy-conception-calculator",
                  calculatorDescription: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date"
                },
                {
                  calculatorName: "Healthy Weight Calculator",
                  calculatorHref: "/health/healthy-weight-calculator",
                  calculatorDescription: "Calculate your healthy weight range based on height and gender"
                }
              ]}
              color="pink"
              title="Related Health Calculators"
            />

          </div>

           {/* How to Use Section */}
          <div className="mt-8">
              <CalculatorGuide data={pregnancyData} />
          </div>
        </main>
      </div>
    </>
  )
}
