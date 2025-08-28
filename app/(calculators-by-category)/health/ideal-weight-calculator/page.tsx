"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Scale, Ruler, User } from "lucide-react"
import Logo from "@/components/logo"

export default function IdealWeightCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [heightCm, setHeightCm] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")

  // Settings
  const [units, setUnits] = useState("metric") // metric or us

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Age validation
    if (!age || isNaN(Number(age))) {
      newErrors.age = "Age is required and must be a number"
    } else if (Number(age) < 2 || Number(age) > 80) {
      newErrors.age = "Age must be between 2 and 80 years"
    }

    // Gender validation
    if (!gender) {
      newErrors.gender = "Gender is required"
    }

    // Height validation
    if (units === "metric") {
      if (!heightCm || isNaN(Number(heightCm))) {
        newErrors.height = "Height is required and must be a number"
      } else if (Number(heightCm) < 100 || Number(heightCm) > 250) {
        newErrors.height = "Height must be between 100-250 cm"
      }
    } else {
      if (!heightFeet || isNaN(Number(heightFeet))) {
        newErrors.heightFeet = "Feet is required and must be a number"
      } else if (Number(heightFeet) < 3 || Number(heightFeet) > 8) {
        newErrors.heightFeet = "Feet must be between 3-8"
      }
      if (!heightInches || isNaN(Number(heightInches))) {
        newErrors.heightInches = "Inches is required and must be a number"
      } else if (Number(heightInches) < 0 || Number(heightInches) >= 12) {
        newErrors.heightInches = "Inches must be between 0-11"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateIdealWeight = () => {
    if (!validateInputs()) return

    try {
      // Convert inputs to metric
      const ageVal = Number(age)
      const genderVal = gender

      let heightCmVal: number
      if (units === "metric") {
        heightCmVal = Number(heightCm)
      } else {
        heightCmVal = (Number(heightFeet) * 12 + Number(heightInches)) * 2.54
      }

      // Convert height to inches for formula calculations
      const heightInchesTotal = heightCmVal / 2.54
      const inchesOver5Ft = heightInchesTotal - 60 // 5 feet = 60 inches

      // Calculate ideal weights using different formulas (all in kg)
      let hamwi: number, devine: number, robinson: number, miller: number

      if (genderVal === "male") {
        hamwi = 48.0 + 2.7 * inchesOver5Ft
        devine = 50.0 + 2.3 * inchesOver5Ft
        robinson = 52.0 + 1.9 * inchesOver5Ft
        miller = 56.2 + 1.41 * inchesOver5Ft
      } else {
        hamwi = 45.5 + 2.2 * inchesOver5Ft
        devine = 45.5 + 2.3 * inchesOver5Ft
        robinson = 49.0 + 1.7 * inchesOver5Ft
        miller = 53.1 + 1.36 * inchesOver5Ft
      }

      // Calculate BMI-based healthy weight range
      const heightM = heightCmVal / 100
      const bmiLowerBound = 18.5 * (heightM * heightM)
      const bmiUpperBound = 25.0 * (heightM * heightM)

      setResult({
        formulas: {
          hamwi: { kg: hamwi, lbs: hamwi * 2.20462 },
          devine: { kg: devine, lbs: devine * 2.20462 },
          robinson: { kg: robinson, lbs: robinson * 2.20462 },
          miller: { kg: miller, lbs: miller * 2.20462 },
        },
        bmiRange: {
          lower: { kg: bmiLowerBound, lbs: bmiLowerBound * 2.20462 },
          upper: { kg: bmiUpperBound, lbs: bmiUpperBound * 2.20462 },
        },
        inputs: {
          age: ageVal,
          gender: genderVal,
          height: heightCmVal,
          units,
        },
        calculations: {
          heightInches: heightInchesTotal,
          inchesOver5Ft: inchesOver5Ft,
          heightM: heightM,
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating ideal weight. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setGender("")
    setHeightCm("")
    setHeightFeet("")
    setHeightInches("")
    setUnits("metric")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Ideal Weight Calculator - Health & Fitness Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate your ideal weight using Hamwi, Devine, Robinson, and Miller formulas plus BMI-based healthy weight ranges."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
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
                  <p className="text-sm text-gray-500">Ideal Weight Calculator</p>
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
                Health & Fitness
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Ideal Weight Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ideal Weight Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your ideal weight using multiple proven formulas and BMI-based healthy weight ranges for
                comprehensive health assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>Ideal Weight Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details to calculate your ideal weight using multiple formulas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    {/* Units Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
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
                      {/* Age Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Age (years)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                            type="text"
                            placeholder="30"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        <p className="text-xs text-gray-500 mt-1">Age range: 2-80 years</p>
                      </div>

                      {/* Gender Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className={`h-12 ${errors.gender ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
                      </div>

                      {/* Height Input */}
                      {units === "metric" ? (
                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height (cm)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.height ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="175"
                              value={heightCm}
                              onChange={(e) => setHeightCm(e.target.value)}
                            />
                          </div>
                          {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
                          <p className="text-xs text-gray-500 mt-1">Height in centimeters</p>
                        </div>
                      ) : (
                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height (ft/in)</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-blue-500" />
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
                                placeholder="6"
                                value={heightInches}
                                onChange={(e) => setHeightInches(e.target.value)}
                              />
                            </div>
                          </div>
                          {(errors.heightFeet || errors.heightInches) && (
                            <p className="text-red-600 text-xs mt-1">{errors.heightFeet || errors.heightInches}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Feet and inches</p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateIdealWeight}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800"
                      >
                        Calculate Ideal Weight
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 flex items-center justify-center mb-3 shadow-lg">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Ideal Weight</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-lg font-bold text-blue-900">
                            {Math.round(result.formulas.devine.kg)} kg ({Math.round(result.formulas.devine.lbs)} lbs)
                          </p>
                          <p className="text-gray-600 text-sm">Devine Formula</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-lg font-bold text-blue-900">
                            {Math.round(result.bmiRange.lower.kg)}-{Math.round(result.bmiRange.upper.kg)} kg
                          </p>
                          <p className="text-gray-600 text-sm">Healthy BMI Range</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Scale className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your details and click Calculate to see your ideal weight ranges.
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
                      <Scale className="w-6 h-6 text-blue-600" />
                      <span>Ideal Weight Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Formula Results Table */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">Formula-Based Ideal Weights</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-blue-200 rounded-lg">
                          <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-cyan-50">
                              <th className="border border-blue-200 p-3 text-left font-semibold text-blue-700">
                                Formula
                              </th>
                              <th className="border border-blue-200 p-3 text-center font-semibold text-blue-700">
                                Weight (kg)
                              </th>
                              <th className="border border-blue-200 p-3 text-center font-semibold text-blue-700">
                                Weight (lbs)
                              </th>
                              <th className="border border-blue-200 p-3 text-left font-semibold text-blue-700">
                                Notes
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-blue-200 p-3 font-medium">Hamwi (1964)</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.hamwi.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.hamwi.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">
                                Oldest, drug dosage origins
                              </td>
                            </tr>
                            <tr className="bg-blue-25">
                              <td className="border border-blue-200 p-3 font-medium">Devine (1974)</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.devine.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.devine.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">
                                Still used in medical settings
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 p-3 font-medium">Robinson (1983)</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.robinson.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.robinson.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">
                                Slightly lighter estimate
                              </td>
                            </tr>
                            <tr className="bg-blue-25">
                              <td className="border border-blue-200 p-3 font-medium">Miller (1983)</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.miller.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.miller.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">Balanced estimate</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* BMI Range */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">BMI-Based Healthy Weight Range</h3>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-700 mb-2">
                          {result.bmiRange.lower.kg.toFixed(1)} - {result.bmiRange.upper.kg.toFixed(1)} kg
                        </p>
                        <p className="text-lg text-gray-600 mb-4">
                          ({result.bmiRange.lower.lbs.toFixed(1)} - {result.bmiRange.upper.lbs.toFixed(1)} lbs)
                        </p>
                        <p className="text-sm text-gray-700">
                          Based on WHO BMI range of 18.5-25 kg/m². This range provides more flexibility than
                          formula-based estimates.
                        </p>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">Calculation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-3">Input Summary</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Age:</strong> {result.inputs.age} years
                            </p>
                            <p>
                              <strong>Gender:</strong> {result.inputs.gender}
                            </p>
                            <p>
                              <strong>Height:</strong> {result.inputs.height.toFixed(1)} cm (
                              {result.calculations.heightInches.toFixed(1)} inches)
                            </p>
                            <p>
                              <strong>Inches over 5 ft:</strong> {result.calculations.inchesOver5Ft.toFixed(1)} inches
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <h4 className="font-semibold text-cyan-700 mb-3">Formula Examples</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Devine ({result.inputs.gender}):</strong>
                            </p>
                            <p className="font-mono text-xs">
                              {result.inputs.gender === "male"
                                ? `50.0 + (2.3 × ${result.calculations.inchesOver5Ft.toFixed(1)})`
                                : `45.5 + (2.3 × ${result.calculations.inchesOver5Ft.toFixed(1)})`}
                            </p>
                            <p>
                              <strong>BMI Range:</strong>
                            </p>
                            <p className="font-mono text-xs">18.5-25 × ({result.calculations.heightM.toFixed(2)})²</p>
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 flex items-center justify-center mr-3 shadow-lg">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                    Understanding Ideal Weight
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Formula Comparison</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Hamwi:</strong> Oldest formula, originally for drug dosing
                          </li>
                          <li>
                            <strong>Devine:</strong> Most commonly used in medical practice
                          </li>
                          <li>
                            <strong>Robinson:</strong> Tends to give slightly lower weights
                          </li>
                          <li>
                            <strong>Miller:</strong> More recent, balanced approach
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Example Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Female, 5'6" (167.64 cm)</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            Hamwi: 45.5 + (2.2 × 6) = <strong>58.7 kg (129.5 lb)</strong>
                          </p>
                          <p>
                            Devine: 45.5 + (2.3 × 6) = <strong>59.3 kg (130.7 lb)</strong>
                          </p>
                          <p>
                            BMI Range: <strong>51.9-70.1 kg (114.5-154.5 lb)</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Important Considerations</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Formulas don't account for body composition</li>
                          <li>Athletes may weigh more due to muscle mass</li>
                          <li>BMI range provides more flexibility</li>
                          <li>Individual health factors are important</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">When to Use Each Method</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Formulas:</strong> Quick estimates, medical dosing
                          </li>
                          <li>
                            <strong>BMI Range:</strong> General health guidelines
                          </li>
                          <li>
                            <strong>Professional Assessment:</strong> Body composition analysis
                          </li>
                          <li>
                            <strong>Personal Goals:</strong> Consider fitness and health status
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
