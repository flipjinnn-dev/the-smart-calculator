"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Heart, Activity, Target } from "lucide-react"
import Logo from "@/components/logo"

export default function TargetHeartRateCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [age, setAge] = useState("")
  const [maxHR, setMaxHR] = useState("") // Optional override
  const [restingHR, setRestingHR] = useState("") // Optional, required for Karvonen
  const [mhrFormula, setMhrFormula] = useState("haskell") // haskell, tanaka, nes
  const [calculationMethod, setCalculationMethod] = useState("percentage") // percentage, karvonen
  const [intensityZone, setIntensityZone] = useState("moderate") // light, moderate, vigorous, custom
  const [customMinIntensity, setCustomMinIntensity] = useState("")
  const [customMaxIntensity, setCustomMaxIntensity] = useState("")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const ageNum = Number.parseInt(age)
    if (!age || ageNum < 10 || ageNum > 100) {
      newErrors.age = "Please enter a valid age (10-100)"
    }

    if (maxHR) {
      const maxHRNum = Number.parseInt(maxHR)
      if (maxHRNum < 100 || maxHRNum > 220) {
        newErrors.maxHR = "Max HR should be between 100-220 bpm"
      }
    }

    if (calculationMethod === "karvonen" && !restingHR) {
      newErrors.restingHR = "Resting HR is required for Karvonen method"
    }

    if (restingHR) {
      const restingHRNum = Number.parseInt(restingHR)
      if (restingHRNum < 30 || restingHRNum > 100) {
        newErrors.restingHR = "Resting HR should be between 30-100 bpm"
      }
    }

    if (intensityZone === "custom") {
      const minIntensity = Number.parseInt(customMinIntensity)
      const maxIntensity = Number.parseInt(customMaxIntensity)

      if (!customMinIntensity || minIntensity < 40 || minIntensity > 95) {
        newErrors.customMinIntensity = "Min intensity should be 40-95%"
      }

      if (!customMaxIntensity || maxIntensity < 40 || maxIntensity > 95) {
        newErrors.customMaxIntensity = "Max intensity should be 40-95%"
      }

      if (minIntensity >= maxIntensity) {
        newErrors.customMaxIntensity = "Max intensity must be higher than min"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateTargetHeartRate = () => {
    if (!validateInputs()) return

    try {
      const ageNum = Number.parseInt(age)
      let calculatedMHR = 0

      // Step 1: Calculate or use provided MHR
      if (maxHR) {
        calculatedMHR = Number.parseInt(maxHR)
      } else {
        switch (mhrFormula) {
          case "haskell":
            calculatedMHR = 220 - ageNum
            break
          case "tanaka":
            calculatedMHR = 208 - 0.7 * ageNum
            break
          case "nes":
            calculatedMHR = 211 - 0.64 * ageNum
            break
        }
      }

      // Step 2: Get intensity range
      let minIntensity = 0,
        maxIntensity = 0
      switch (intensityZone) {
        case "light":
          minIntensity = 50
          maxIntensity = 60
          break
        case "moderate":
          minIntensity = 60
          maxIntensity = 70
          break
        case "vigorous":
          minIntensity = 70
          maxIntensity = 85
          break
        case "custom":
          minIntensity = Number.parseInt(customMinIntensity)
          maxIntensity = Number.parseInt(customMaxIntensity)
          break
      }

      // Step 3: Calculate THR based on method
      let minTHR = 0,
        maxTHR = 0
      const restingHRNum = restingHR ? Number.parseInt(restingHR) : 0

      if (calculationMethod === "percentage") {
        minTHR = Math.round(calculatedMHR * (minIntensity / 100))
        maxTHR = Math.round(calculatedMHR * (maxIntensity / 100))
      } else {
        // Karvonen method
        const hrReserve = calculatedMHR - restingHRNum
        minTHR = Math.round(hrReserve * (minIntensity / 100) + restingHRNum)
        maxTHR = Math.round(hrReserve * (maxIntensity / 100) + restingHRNum)
      }

      // Calculate all zones for display
      const allZones = [
        {
          name: "Light",
          range: "50-60%",
          min:
            calculationMethod === "percentage"
              ? Math.round(calculatedMHR * 0.5)
              : Math.round((calculatedMHR - restingHRNum) * 0.5 + restingHRNum),
          max:
            calculationMethod === "percentage"
              ? Math.round(calculatedMHR * 0.6)
              : Math.round((calculatedMHR - restingHRNum) * 0.6 + restingHRNum),
        },
        {
          name: "Moderate",
          range: "60-70%",
          min:
            calculationMethod === "percentage"
              ? Math.round(calculatedMHR * 0.6)
              : Math.round((calculatedMHR - restingHRNum) * 0.6 + restingHRNum),
          max:
            calculationMethod === "percentage"
              ? Math.round(calculatedMHR * 0.7)
              : Math.round((calculatedMHR - restingHRNum) * 0.7 + restingHRNum),
        },
        {
          name: "Vigorous",
          range: "70-85%",
          min:
            calculationMethod === "percentage"
              ? Math.round(calculatedMHR * 0.7)
              : Math.round((calculatedMHR - restingHRNum) * 0.7 + restingHRNum),
          max:
            calculationMethod === "percentage"
              ? Math.round(calculatedMHR * 0.85)
              : Math.round((calculatedMHR - restingHRNum) * 0.85 + restingHRNum),
        },
      ]

      const results = {
        age: ageNum,
        mhr: Math.round(calculatedMHR),
        mhrSource: maxHR ? "User Provided" : getFormulaName(mhrFormula),
        restingHR: restingHRNum || null,
        method: calculationMethod,
        intensityZone:
          intensityZone === "custom"
            ? `Custom (${minIntensity}-${maxIntensity}%)`
            : `${intensityZone.charAt(0).toUpperCase() + intensityZone.slice(1)} (${minIntensity}-${maxIntensity}%)`,
        minTHR,
        maxTHR,
        allZones,
        selectedZone: { minIntensity, maxIntensity },
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating target heart rate. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setMaxHR("")
    setRestingHR("")
    setMhrFormula("haskell")
    setCalculationMethod("percentage")
    setIntensityZone("moderate")
    setCustomMinIntensity("")
    setCustomMaxIntensity("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const getFormulaName = (formula: string) => {
    switch (formula) {
      case "haskell":
        return "Haskell & Fox (220 - age)"
      case "tanaka":
        return "Tanaka (208 - 0.7 × age)"
      case "nes":
        return "Nes (211 - 0.64 × age)"
      default:
        return ""
    }
  }

  return (
    <>
      <Head>
        <title>Target Heart Rate Calculator - Training Zone Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate your target heart rate zones using Haskell & Fox, Tanaka, and Nes formulas. Professional heart rate training calculator for fitness and cardio."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Target Heart Rate Calculator</p>
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
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Target Heart Rate Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Target Heart Rate Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your optimal training heart rate zones using proven formulas. Perfect for cardio training,
                fitness planning, and heart rate monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>Heart Rate Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details and select your preferred method to calculate target heart rate zones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Age */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Age (years) *</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                            type="number"
                            placeholder="30"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="10"
                            max="100"
                          />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                      </div>

                      {/* Optional Max HR Override */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Maximum Heart Rate (optional)
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Heart className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.maxHR ? "border-red-300" : ""}`}
                            type="number"
                            placeholder="190"
                            value={maxHR}
                            onChange={(e) => setMaxHR(e.target.value)}
                            min="100"
                            max="220"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            bpm
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Leave blank to calculate using formula</p>
                        {errors.maxHR && <p className="text-red-600 text-xs mt-1">{errors.maxHR}</p>}
                      </div>

                      {/* MHR Formula Selection */}
                      {!maxHR && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Max HR Formula</Label>
                          <RadioGroup value={mhrFormula} onValueChange={setMhrFormula} className="space-y-3">
                            <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="haskell" id="haskell" className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor="haskell" className="cursor-pointer font-medium">
                                  Haskell & Fox (1971)
                                </Label>
                                <p className="text-sm text-gray-600 mt-1">MHR = 220 - age</p>
                                <p className="text-xs text-gray-500 mt-1">Most commonly used formula</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="tanaka" id="tanaka" className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor="tanaka" className="cursor-pointer font-medium">
                                  Tanaka et al. (2001)
                                </Label>
                                <p className="text-sm text-gray-600 mt-1">MHR = 208 - (0.7 × age)</p>
                                <p className="text-xs text-gray-500 mt-1">More accurate for older adults</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="nes" id="nes" className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor="nes" className="cursor-pointer font-medium">
                                  Nes et al. (2013)
                                </Label>
                                <p className="text-sm text-gray-600 mt-1">MHR = 211 - (0.64 × age)</p>
                                <p className="text-xs text-gray-500 mt-1">Based on large population study</p>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {/* Calculation Method */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Calculation Method</Label>
                        <RadioGroup
                          value={calculationMethod}
                          onValueChange={setCalculationMethod}
                          className="space-y-3"
                        >
                          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="percentage" id="percentage" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="percentage" className="cursor-pointer font-medium">
                                Percentage of Max HR (Basic)
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">THR = MHR × %Intensity</p>
                              <p className="text-xs text-gray-500 mt-1">Simple and widely used method</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="karvonen" id="karvonen" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="karvonen" className="cursor-pointer font-medium">
                                Karvonen Method (Advanced)
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">THR = (HRR × %Intensity) + RHR</p>
                              <p className="text-xs text-gray-500 mt-1">More personalized, requires resting HR</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Resting HR (for Karvonen) */}
                      {calculationMethod === "karvonen" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Resting Heart Rate (required for Karvonen) *
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Activity className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.restingHR ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="70"
                              value={restingHR}
                              onChange={(e) => setRestingHR(e.target.value)}
                              min="30"
                              max="100"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              bpm
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Measure when completely at rest</p>
                          {errors.restingHR && <p className="text-red-600 text-xs mt-1">{errors.restingHR}</p>}
                        </div>
                      )}

                      {/* Intensity Zone Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Intensity Zone</Label>
                        <RadioGroup value={intensityZone} onValueChange={setIntensityZone} className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="light" id="light" />
                            <Label htmlFor="light" className="cursor-pointer font-medium flex-1">
                              Light (50-60%) - Fat burning, recovery
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <Label htmlFor="moderate" className="cursor-pointer font-medium flex-1">
                              Moderate (60-70%) - Aerobic base building
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="vigorous" id="vigorous" />
                            <Label htmlFor="vigorous" className="cursor-pointer font-medium flex-1">
                              Vigorous (70-85%) - Performance training
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom" className="cursor-pointer font-medium flex-1">
                              Custom Range
                            </Label>
                          </div>
                        </RadioGroup>

                        {/* Custom Range Inputs */}
                        {intensityZone === "custom" && (
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">Min %</Label>
                              <Input
                                className={`h-10 ${errors.customMinIntensity ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="60"
                                value={customMinIntensity}
                                onChange={(e) => setCustomMinIntensity(e.target.value)}
                                min="40"
                                max="95"
                              />
                              {errors.customMinIntensity && (
                                <p className="text-red-600 text-xs mt-1">{errors.customMinIntensity}</p>
                              )}
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">Max %</Label>
                              <Input
                                className={`h-10 ${errors.customMaxIntensity ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="80"
                                value={customMaxIntensity}
                                onChange={(e) => setCustomMaxIntensity(e.target.value)}
                                min="40"
                                max="95"
                              />
                              {errors.customMaxIntensity && (
                                <p className="text-red-600 text-xs mt-1">{errors.customMaxIntensity}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateTargetHeartRate}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        Calculate THR
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-cyan-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Target HR Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-blue-200">
                          <p className="text-3xl font-bold text-blue-900 mb-2">
                            {result.minTHR} - {result.maxTHR}
                          </p>
                          <p className="text-sm font-medium text-gray-600">beats per minute</p>
                          <p className="text-sm text-gray-500 mt-2">{result.intensityZone}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your age and preferences to calculate your target heart rate zone.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <span>Heart Rate Zone Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                        <h3 className="text-3xl font-bold text-blue-700 mb-2">
                          {result.minTHR} - {result.maxTHR} bpm
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">Target Heart Rate Zone</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Age</p>
                            <p className="font-semibold text-gray-700">{result.age} years</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Max HR</p>
                            <p className="font-semibold text-gray-700">{result.mhr} bpm</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Method</p>
                            <p className="font-semibold text-gray-700">
                              {result.method === "percentage" ? "% of Max HR" : "Karvonen"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Zone</p>
                            <p className="font-semibold text-gray-700">{result.intensityZone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* All Training Zones Table */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">All Training Zones</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-blue-50">
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">
                                Zone
                              </th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">
                                Intensity
                              </th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">
                                Heart Rate
                              </th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">
                                Purpose
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.allZones.map((zone: any, index: number) => {
                              const isSelected =
                                result.selectedZone.minIntensity >= (index === 0 ? 50 : index === 1 ? 60 : 70) &&
                                result.selectedZone.maxIntensity <= (index === 0 ? 60 : index === 1 ? 70 : 85)
                              return (
                                <tr key={zone.name} className={isSelected ? "bg-blue-100" : "hover:bg-gray-50"}>
                                  <td className="border border-gray-300 px-4 py-3 font-medium">{zone.name}</td>
                                  <td className="border border-gray-300 px-4 py-3">{zone.range}</td>
                                  <td className="border border-gray-300 px-4 py-3 font-semibold">
                                    {zone.min} - {zone.max} bpm
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-sm">
                                    {index === 0 && "Fat burning, active recovery"}
                                    {index === 1 && "Aerobic base, endurance"}
                                    {index === 2 && "Performance, lactate threshold"}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8 mt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">Calculation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-3">Maximum Heart Rate</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Value:</strong> {result.mhr} bpm
                            </p>
                            <p>
                              <strong>Source:</strong> {result.mhrSource}
                            </p>
                            {result.restingHR && (
                              <p>
                                <strong>Resting HR:</strong> {result.restingHR} bpm
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <h4 className="font-semibold text-cyan-700 mb-3">Important Notes</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Formulas are estimates - individual max HR can vary significantly</p>
                            <p>• Karvonen method is more personalized and accurate</p>
                            <p>• Consider fitness level and health conditions</p>
                            <p>• Consult a professional before starting new training</p>
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
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                    About Target Heart Rate Training
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Training Zones Explained</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Light (50-60%):</strong> Fat burning, recovery workouts
                          </li>
                          <li>
                            <strong>Moderate (60-70%):</strong> Aerobic base building, endurance
                          </li>
                          <li>
                            <strong>Vigorous (70-85%):</strong> Performance training, lactate threshold
                          </li>
                          <li>
                            <strong>Maximum (85-95%):</strong> Anaerobic power, short intervals
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Formula Accuracy</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Haskell & Fox:</strong> ±10-12 bpm standard deviation
                          </li>
                          <li>
                            <strong>Tanaka:</strong> More accurate for older adults (40+)
                          </li>
                          <li>
                            <strong>Nes:</strong> Based on 3,320 healthy individuals
                          </li>
                          <li>
                            <strong>Individual variation:</strong> Can be ±20 bpm from formula
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">Method Comparison</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Method</th>
                              <th className="text-left py-2">Accuracy</th>
                              <th className="text-left py-2">Requirements</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">% of Max HR</td>
                              <td>Good</td>
                              <td>Age only</td>
                            </tr>
                            <tr>
                              <td className="py-1">Karvonen</td>
                              <td>Better</td>
                              <td>Age + Resting HR</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">Best Practices</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Measure resting HR first thing in the morning</li>
                          <li>Use heart rate monitor for accurate readings</li>
                          <li>Allow 5-10 minute warm-up before target zone</li>
                          <li>Stay hydrated and monitor how you feel</li>
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
