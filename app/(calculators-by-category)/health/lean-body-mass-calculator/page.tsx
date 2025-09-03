"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Activity, Target, TrendingUp, Zap, Heart } from "lucide-react"
import Logo from "@/components/logo"

export default function LeanBodyMassCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [heightCm, setHeightCm] = useState("")
  const [weightLbs, setWeightLbs] = useState("")
  const [weightKg, setWeightKg] = useState("")
  const [bodyFat, setBodyFat] = useState("")
  const [unitSystem, setUnitSystem] = useState("us") // us or metric

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const ageNum = Number.parseInt(age)
    if (!age || ageNum < 1 || ageNum > 100) {
      newErrors.age = "Age must be between 1 and 100 years"
    }

    if (unitSystem === "us") {
      const ftNum = Number.parseInt(heightFt)
      const inNum = Number.parseInt(heightIn)
      const weightNum = Number.parseFloat(weightLbs)

      if (!heightFt || ftNum < 1 || ftNum > 8) {
        newErrors.heightFt = "Height must be between 1-8 feet"
      }
      if (!heightIn || inNum < 0 || inNum > 11) {
        newErrors.heightIn = "Inches must be between 0-11"
      }
      if (!weightLbs || weightNum <= 0 || weightNum > 1000) {
        newErrors.weightLbs = "Weight must be between 1-1000 lbs"
      }
    } else {
      const heightNum = Number.parseFloat(heightCm)
      const weightNum = Number.parseFloat(weightKg)

      if (!heightCm || heightNum < 50 || heightNum > 250) {
        newErrors.heightCm = "Height must be between 50-250 cm"
      }
      if (!weightKg || weightNum <= 0 || weightNum > 500) {
        newErrors.weightKg = "Weight must be between 1-500 kg"
      }
    }

    if (bodyFat && (Number.parseFloat(bodyFat) <= 0 || Number.parseFloat(bodyFat) >= 60)) {
      newErrors.bodyFat = "Body fat percentage must be between 1-59%"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateLBM = () => {
    if (!validateInputs()) return

    try {
      const ageNum = Number.parseInt(age)
      let heightCmNum = 0
      let weightKgNum = 0

      // Convert to metric for calculations
      if (unitSystem === "us") {
        const ftNum = Number.parseInt(heightFt)
        const inNum = Number.parseInt(heightIn)
        heightCmNum = (ftNum * 12 + inNum) * 2.54
        weightKgNum = Number.parseFloat(weightLbs) * 0.453592
      } else {
        heightCmNum = Number.parseFloat(heightCm)
        weightKgNum = Number.parseFloat(weightKg)
      }

      const heightMeters = heightCmNum / 100
      const results: any = {
        inputs: {
          age: ageNum,
          gender,
          height: heightCmNum,
          weight: weightKgNum,
          bodyFat: bodyFat ? Number.parseFloat(bodyFat) : null,
        },
        methods: [],
      }

      // Body Fat % Method (if provided)
      if (bodyFat) {
        const bodyFatNum = Number.parseFloat(bodyFat)
        const lbmBodyFat = weightKgNum * (1 - bodyFatNum / 100)
        results.methods.push({
          name: "Body Fat % Method",
          formula: "LBM = Weight × (1 - BF%/100)",
          result: Math.round(lbmBodyFat * 10) / 10,
          accuracy: "Most Accurate (with BF%)",
          recommended: true,
        })
      }

      // Age-based formula selection
      if (ageNum <= 14) {
        // Peters Formula for children
        const eECV = 0.0215 * Math.pow(weightKgNum, 0.6469) * Math.pow(heightCmNum, 0.7236)
        const lbmPeters = 3.8 * eECV
        results.methods.push({
          name: "Peters Formula",
          formula: "eLBM = 3.8 × (0.0215 × W^0.6469 × H^0.7236)",
          result: Math.round(lbmPeters * 10) / 10,
          accuracy: "Recommended for ≤14 years",
          recommended: true,
        })
      } else {
        // Adult formulas (Boer, James, Hume)

        // Boer Formula
        let lbmBoer = 0
        if (gender === "male") {
          lbmBoer = 0.407 * weightKgNum + 0.267 * heightCmNum - 19.2
        } else {
          lbmBoer = 0.252 * weightKgNum + 0.473 * heightCmNum - 48.3
        }
        results.methods.push({
          name: "Boer Formula",
          formula: gender === "male" ? "LBM = 0.407×W + 0.267×H - 19.2" : "LBM = 0.252×W + 0.473×H - 48.3",
          result: Math.round(lbmBoer * 10) / 10,
          accuracy: "Good for general population",
          recommended: false,
        })

        // James Formula
        let lbmJames = 0
        if (gender === "male") {
          lbmJames = 1.1 * weightKgNum - 128 * Math.pow(weightKgNum / heightMeters, 2)
        } else {
          lbmJames = 1.07 * weightKgNum - 148 * Math.pow(weightKgNum / heightMeters, 2)
        }
        results.methods.push({
          name: "James Formula",
          formula: gender === "male" ? "LBM = 1.10×W - 128×(W/H)²" : "LBM = 1.07×W - 148×(W/H)²",
          result: Math.round(lbmJames * 10) / 10,
          accuracy: "Moderate accuracy",
          recommended: false,
        })

        // Hume Formula
        let lbmHume = 0
        if (gender === "male") {
          lbmHume = 0.3281 * weightKgNum + 0.33929 * heightCmNum - 29.5336
        } else {
          lbmHume = 0.29569 * weightKgNum + 0.41813 * heightCmNum - 43.2933
        }
        results.methods.push({
          name: "Hume Formula",
          formula: gender === "male" ? "LBM = 0.328×W + 0.339×H - 29.5" : "LBM = 0.296×W + 0.418×H - 43.3",
          result: Math.round(lbmHume * 10) / 10,
          accuracy: "Good for clinical use",
          recommended: false,
        })
      }

      // Calculate average of formula-based methods (excluding body fat method)
      const formulaMethods = results.methods.filter((m: any) => m.name !== "Body Fat % Method")
      const averageLBM =
        formulaMethods.reduce((sum: number, method: any) => sum + method.result, 0) / formulaMethods.length
      results.averageLBM = Math.round(averageLBM * 10) / 10

      // Calculate body fat percentage from LBM (if not provided)
      if (!bodyFat && results.averageLBM) {
        const estimatedBodyFat = ((weightKgNum - results.averageLBM) / weightKgNum) * 100
        results.estimatedBodyFat = Math.round(estimatedBodyFat * 10) / 10
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating lean body mass. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setGender("male")
    setHeightFt("")
    setHeightIn("")
    setHeightCm("")
    setWeightLbs("")
    setWeightKg("")
    setBodyFat("")
    setUnitSystem("us")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Lean Body Mass Calculator – Fitness Measurement</title>
        <meta
          name="description"
          content="Estimate your lean body mass quickly and accurately. Use our free calculator to track muscle vs. fat for health goals."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-slate-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Lean Body Mass Calculator</p>
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
              <Link href="/health" className="text-gray-500 hover:text-blue-600">
                Fitness & Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Lean Body Mass Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lean Body Mass Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your lean body mass using scientifically proven formulas including Boer, James, Hume, and
                Peters methods.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>LBM Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details to calculate lean body mass
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
                              US (ft/in, lbs)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="metric" id="metric" />
                            <Label htmlFor="metric" className="cursor-pointer">
                              Metric (cm, kg)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Age and Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Age (years)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Activity className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="25"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>
                          {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Gender</Label>
                          <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male" className="cursor-pointer">
                                Male
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female" className="cursor-pointer">
                                Female
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
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
                              <Target className="h-5 w-5 text-blue-500" />
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

                      {/* Weight */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Weight ({unitSystem === "us" ? "lbs" : "kg"})
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${unitSystem === "us" ? (errors.weightLbs ? "border-red-300" : "") : errors.weightKg ? "border-red-300" : ""}`}
                            type="number"
                            placeholder={unitSystem === "us" ? "180" : "80"}
                            value={unitSystem === "us" ? weightLbs : weightKg}
                            onChange={(e) =>
                              unitSystem === "us" ? setWeightLbs(e.target.value) : setWeightKg(e.target.value)
                            }
                          />
                        </div>
                        {(errors.weightLbs || errors.weightKg) && (
                          <p className="text-red-600 text-xs mt-1">{errors.weightLbs || errors.weightKg}</p>
                        )}
                      </div>

                      {/* Body Fat Percentage (Optional) */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Body Fat Percentage (%) - Optional
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Zap className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.bodyFat ? "border-red-300" : ""}`}
                            type="number"
                            step="0.1"
                            placeholder="15.0"
                            value={bodyFat}
                            onChange={(e) => setBodyFat(e.target.value)}
                          />
                        </div>
                        {errors.bodyFat && <p className="text-red-600 text-xs mt-1">{errors.bodyFat}</p>}
                        <p className="text-xs text-gray-500 mt-1">
                          If known, provides the most accurate LBM calculation
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateLBM}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700"
                      >
                        Calculate LBM
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-slate-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-slate-600 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Lean Body Mass</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-3xl font-bold text-blue-900">
                            {result.methods.find((m: any) => m.recommended)?.result || result.averageLBM}kg
                          </p>
                          <p className="text-sm font-medium text-slate-600">
                            {result.methods.find((m: any) => m.recommended)?.accuracy || "Formula Average"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your details to calculate lean body mass.
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
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Heart className="w-6 h-6 text-blue-600" />
                      <span>Your Lean Body Mass Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Results Table */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">LBM Calculation Methods</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="bg-blue-50">
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-700">
                                Method
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-700">
                                Result (kg)
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-700">
                                Result (lbs)
                              </th>
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-700">
                                Accuracy
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.methods.map((method: any, index: number) => (
                              <tr key={index} className={method.recommended ? "bg-green-50" : ""}>
                                <td className="border border-gray-200 px-4 py-3">
                                  <div>
                                    <p className="font-medium text-gray-900">{method.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{method.formula}</p>
                                  </div>
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-700">
                                  {method.result}
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-slate-700">
                                  {Math.round(method.result * 2.20462 * 10) / 10}
                                </td>
                                <td className="border border-gray-200 px-4 py-3">
                                  <span className={method.recommended ? "text-green-700 font-medium" : "text-gray-600"}>
                                    {method.accuracy}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-3">Recommended LBM</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Value:</strong>{" "}
                              {result.methods.find((m: any) => m.recommended)?.result || result.averageLBM}kg (
                              {Math.round(
                                (result.methods.find((m: any) => m.recommended)?.result || result.averageLBM) *
                                  2.20462 *
                                  10,
                              ) / 10}
                              lbs)
                            </p>
                            <p>
                              <strong>Method:</strong>{" "}
                              {result.methods.find((m: any) => m.recommended)?.name || "Formula Average"}
                            </p>
                            {result.estimatedBodyFat && (
                              <p>
                                <strong>Estimated Body Fat:</strong> {result.estimatedBodyFat}%
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <h4 className="font-semibold text-slate-700 mb-3">Input Summary</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Age:</strong> {result.inputs.age} years
                            </p>
                            <p>
                              <strong>Gender:</strong> {result.inputs.gender === "male" ? "Male" : "Female"}
                            </p>
                            <p>
                              <strong>Height:</strong> {Math.round(result.inputs.height)}cm
                            </p>
                            <p>
                              <strong>Weight:</strong> {Math.round(result.inputs.weight * 10) / 10}kg
                            </p>
                            {result.inputs.bodyFat && (
                              <p>
                                <strong>Body Fat:</strong> {result.inputs.bodyFat}%
                              </p>
                            )}
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
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-slate-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-slate-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                    About Lean Body Mass
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">What is LBM?</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Lean Body Mass:</strong> Total body weight minus fat mass
                          </li>
                          <li>
                            <strong>Includes:</strong> Muscles, organs, bones, and water
                          </li>
                          <li>
                            <strong>Uses:</strong> Medication dosing, sports nutrition, health tracking
                          </li>
                          <li>
                            <strong>Difference:</strong> Slightly higher than fat-free mass
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Formula Accuracy</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Body Fat % Method:</strong> Most accurate when BF% is known
                          </li>
                          <li>
                            <strong>Peters Formula:</strong> Recommended for children ≤14 years
                          </li>
                          <li>
                            <strong>Boer Formula:</strong> Good for general adult population
                          </li>
                          <li>
                            <strong>Hume Formula:</strong> Preferred for clinical applications
                          </li>
                          <li>
                            <strong>James Formula:</strong> Moderate accuracy for adults
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">Clinical Applications</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Medication Dosing:</strong> More accurate than total body weight
                          </li>
                          <li>
                            <strong>Nutritional Assessment:</strong> Protein and calorie requirements
                          </li>
                          <li>
                            <strong>Athletic Performance:</strong> Training and recovery optimization
                          </li>
                          <li>
                            <strong>Health Monitoring:</strong> Tracking muscle mass changes
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-700 mb-3">Typical LBM Ranges</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Category</th>
                              <th className="text-center py-2">Male (%)</th>
                              <th className="text-center py-2">Female (%)</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">Athletes</td>
                              <td className="text-center">85-95%</td>
                              <td className="text-center">75-85%</td>
                            </tr>
                            <tr>
                              <td className="py-1">Fit Adults</td>
                              <td className="text-center">80-90%</td>
                              <td className="text-center">70-80%</td>
                            </tr>
                            <tr>
                              <td className="py-1">Average Adults</td>
                              <td className="text-center">75-85%</td>
                              <td className="text-center">65-75%</td>
                            </tr>
                          </tbody>
                        </table>
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
