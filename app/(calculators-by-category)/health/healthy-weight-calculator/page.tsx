"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Activity, Target, Heart, Scale } from "lucide-react"
import Logo from "@/components/logo"

export default function HealthyWeightCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [heightCm, setHeightCm] = useState("")
  const [unitSystem, setUnitSystem] = useState("us") // us or metric

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (unitSystem === "us") {
      const ftNum = Number.parseInt(heightFt)
      const inNum = Number.parseInt(heightIn)

      if (!heightFt || ftNum < 1 || ftNum > 8) {
        newErrors.heightFt = "Height must be between 1-8 feet"
      }
      if (!heightIn || inNum < 0 || inNum > 11) {
        newErrors.heightIn = "Inches must be between 0-11"
      }
    } else {
      const heightNum = Number.parseFloat(heightCm)

      if (!heightCm || heightNum < 50 || heightNum > 250) {
        newErrors.heightCm = "Height must be between 50-250 cm"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateHealthyWeight = () => {
    if (!validateInputs()) return

    try {
      let heightCmNum = 0

      // Convert to metric for calculations
      if (unitSystem === "us") {
        const ftNum = Number.parseInt(heightFt)
        const inNum = Number.parseInt(heightIn)
        heightCmNum = (ftNum * 12 + inNum) * 2.54
      } else {
        heightCmNum = Number.parseFloat(heightCm)
      }

      const heightMeters = heightCmNum / 100

      // Calculate healthy weight range using BMI 18.5-25
      const minWeightKg = 18.5 * (heightMeters * heightMeters)
      const maxWeightKg = 25 * (heightMeters * heightMeters)

      // Convert to pounds
      const minWeightLbs = minWeightKg * 2.20462
      const maxWeightLbs = maxWeightKg * 2.20462

      const results = {
        heightCm: heightCmNum,
        heightDisplay: unitSystem === "us" ? `${heightFt}'${heightIn}"` : `${heightCm} cm`,
        minWeightKg: Math.round(minWeightKg * 10) / 10,
        maxWeightKg: Math.round(maxWeightKg * 10) / 10,
        minWeightLbs: Math.round(minWeightLbs * 10) / 10,
        maxWeightLbs: Math.round(maxWeightLbs * 10) / 10,
        bmiRange: "18.5 - 25.0",
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating healthy weight. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setHeightFt("")
    setHeightIn("")
    setHeightCm("")
    setUnitSystem("us")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Healthy Weight Calculator - Health & Fitness Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate your healthy weight range based on BMI guidelines. Professional healthy weight calculator for adults."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
                  <p className="text-sm text-gray-500">Healthy Weight Calculator</p>
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
              <Link href="/health" className="text-gray-500 hover:text-green-600">
                Fitness & Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Healthy Weight Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Healthy Weight Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your healthy weight range based on standard BMI guidelines for adults 18 years and older.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>Weight Range Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your height to calculate your healthy weight range
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Unit System Toggle */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Unit System</Label>
                        <RadioGroup value={unitSystem} onValueChange={setUnitSystem} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="us" id="us" />
                            <Label htmlFor="us" className="cursor-pointer">
                              US (ft/in)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="metric" id="metric" />
                            <Label htmlFor="metric" className="cursor-pointer">
                              Metric (cm)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Height */}
                      {unitSystem === "us" ? (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Input
                                className={`h-12 ${errors.heightFt ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="5"
                                value={heightFt}
                                onChange={(e) => setHeightFt(e.target.value)}
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                ft
                              </span>
                            </div>
                            <div className="relative">
                              <Input
                                className={`h-12 ${errors.heightIn ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="8"
                                value={heightIn}
                                onChange={(e) => setHeightIn(e.target.value)}
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                in
                              </span>
                            </div>
                          </div>
                          {(errors.heightFt || errors.heightIn) && (
                            <p className="text-red-600 text-xs mt-1">{errors.heightFt || errors.heightIn}</p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height (cm)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Target className="h-5 w-5 text-green-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.heightCm ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="175"
                              value={heightCm}
                              onChange={(e) => setHeightCm(e.target.value)}
                            />
                          </div>
                          {errors.heightCm && <p className="text-red-600 text-xs mt-1">{errors.heightCm}</p>}
                        </div>
                      )}

                      {/* Age Note */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Activity className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-800">Age Requirement</p>
                            <p className="text-sm text-green-700">
                              This calculator is intended for adults 18 years and older. BMI calculations may not be
                              appropriate for children, pregnant women, or athletes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateHealthyWeight}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        Calculate Range
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
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Healthy Weight</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900 mb-1">
                            {result.minWeightKg} - {result.maxWeightKg} kg
                          </p>
                          <p className="text-lg font-bold text-emerald-900">
                            {result.minWeightLbs} - {result.maxWeightLbs} lbs
                          </p>
                          <p className="text-sm font-medium text-gray-600 mt-2">For height {result.heightDisplay}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Scale className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your height to see your healthy weight range.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Scale className="w-6 h-6 text-green-600" />
                      <span>Your Healthy Weight Range</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <h3 className="text-2xl font-bold text-green-700 mb-2">
                          For height {result.heightDisplay} ({Math.round(result.heightCm)} cm):
                        </h3>
                        <div className="text-3xl font-bold text-green-900 mb-2">
                          {result.minWeightLbs} – {result.maxWeightLbs} lbs
                        </div>
                        <div className="text-xl font-semibold text-emerald-700">
                          ({result.minWeightKg} – {result.maxWeightKg} kg)
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          This calculator uses the standard BMI range ({result.bmiRange}) for adults.
                        </p>
                      </div>
                    </div>

                    {/* Calculation Steps */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-green-700 mb-6">Calculation Steps</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-700 mb-3">Step 1: Height Conversion</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>Height: {result.heightDisplay}</p>
                            <p>Height in meters: {(result.heightCm / 100).toFixed(2)} m</p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <h4 className="font-semibold text-emerald-700 mb-3">Step 2: BMI Calculation</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>Lower limit (BMI 18.5): {result.minWeightKg} kg</p>
                            <p>Upper limit (BMI 25.0): {result.maxWeightKg} kg</p>
                            <p className="text-xs text-gray-500 mt-2">Formula: BMI × height²</p>
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
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    About Healthy Weight
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">BMI-Based Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Based on BMI range:</strong> 18.5 – 25.0 kg/m²
                          </li>
                          <li>
                            <strong>Formula:</strong> Weight = BMI × height²
                          </li>
                          <li>
                            <strong>Standard:</strong> World Health Organization guidelines
                          </li>
                          <li>
                            <strong>Age group:</strong> Adults 18 years and older
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>General guideline:</strong> Not personalized medical advice
                          </li>
                          <li>
                            <strong>Limitations:</strong> Doesn't account for muscle mass
                          </li>
                          <li>
                            <strong>Special populations:</strong> May not apply to athletes
                          </li>
                          <li>
                            <strong>Consultation:</strong> Speak with healthcare provider
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">BMI Categories</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">BMI Range</th>
                              <th className="text-left py-2">Category</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">Below 18.5</td>
                              <td className="text-blue-600">Underweight</td>
                            </tr>
                            <tr className="bg-green-50">
                              <td className="py-1">18.5 - 24.9</td>
                              <td className="text-green-600 font-medium">Normal weight</td>
                            </tr>
                            <tr>
                              <td className="py-1">25.0 - 29.9</td>
                              <td className="text-orange-600">Overweight</td>
                            </tr>
                            <tr>
                              <td className="py-1">30.0 and above</td>
                              <td className="text-red-600">Obese</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">Factors Not Considered</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Body composition:</strong> Muscle vs. fat ratio
                          </li>
                          <li>
                            <strong>Bone density:</strong> Individual skeletal differences
                          </li>
                          <li>
                            <strong>Age:</strong> Metabolism and body changes
                          </li>
                          <li>
                            <strong>Ethnicity:</strong> Different body type variations
                          </li>
                          <li>
                            <strong>Health conditions:</strong> Medical considerations
                          </li>
                        </ul>
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
