"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Heart, Calculator, AlertTriangle, Activity, RotateCcw, HelpCircle, Scale } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import Logo from "@/components/logo"

export default function OverweightCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [unitSystem, setUnitSystem] = useState("us")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [weight, setWeight] = useState("")
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [heightCm, setHeightCm] = useState("")

  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!age || Number.parseFloat(age) <= 0 || Number.parseFloat(age) > 120) {
      newErrors.age = "Please enter a valid age (1-120)"
    }

    if (!gender) {
      newErrors.gender = "Please select gender"
    }

    if (!weight || Number.parseFloat(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight"
    }

    if (unitSystem === "us") {
      if (!heightFt || Number.parseFloat(heightFt) <= 0) {
        newErrors.heightFt = "Please enter valid feet"
      }
      if (!heightIn || Number.parseFloat(heightIn) < 0 || Number.parseFloat(heightIn) >= 12) {
        newErrors.heightIn = "Please enter valid inches (0-11)"
      }
    } else {
      if (!heightCm || Number.parseFloat(heightCm) <= 0) {
        newErrors.heightCm = "Please enter valid height in cm"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateBMI = () => {
    if (!validateInputs()) return

    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const weightValue = Number.parseFloat(weight)
    let heightInMeters = 0
    let heightInInches = 0

    // Calculate height in meters and inches
    if (unitSystem === "us") {
      heightInInches = Number.parseFloat(heightFt) * 12 + Number.parseFloat(heightIn)
      heightInMeters = heightInInches * 0.0254 // inches to meters
    } else {
      heightInMeters = Number.parseFloat(heightCm) / 100 // cm to meters
      heightInInches = Number.parseFloat(heightCm) / 2.54 // cm to inches
    }

    // Calculate BMI using appropriate formula
    let bmi = 0
    if (unitSystem === "us") {
      // US Formula: BMI = (weight in lb / (height in inches)²) × 703
      bmi = (weightValue / (heightInInches * heightInInches)) * 703
    } else {
      // Metric Formula: BMI = weight in kg / (height in meters)²
      bmi = weightValue / (heightInMeters * heightInMeters)
    }

    // Determine BMI classification
    let category = ""
    let categoryLevel = ""
    let categoryColor = ""
    let message = ""

    if (bmi < 18.5) {
      category = "Underweight"
      categoryLevel = "underweight"
      categoryColor = "blue"
      message = "Your BMI indicates you are underweight. Consider consulting a healthcare provider."
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal"
      categoryLevel = "normal"
      categoryColor = "green"
      message = "Your BMI is in the normal range. Maintain your healthy lifestyle!"
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      category = "Overweight"
      categoryLevel = "overweight"
      categoryColor = "orange"
      message = "Your BMI indicates you are overweight. Consider lifestyle changes for better health."
    } else {
      category = "Obese"
      categoryLevel = "obese"
      categoryColor = "red"
      message = "Your BMI indicates obesity. Consult a healthcare provider for guidance."
    }

    // Calculate normal weight range
    let minWeight = 0
    let maxWeight = 0

    if (unitSystem === "us") {
      // US Formula: Weight = (BMI / 703) × (height in inches)²
      minWeight = (18.5 / 703) * (heightInInches * heightInInches)
      maxWeight = (24.9 / 703) * (heightInInches * heightInInches)
    } else {
      // Metric Formula: Weight = BMI × (height in meters)²
      minWeight = 18.5 * (heightInMeters * heightInMeters)
      maxWeight = 24.9 * (heightInMeters * heightInMeters)
    }

    // Convert weight range to display units if needed
    let displayMinWeight = minWeight
    let displayMaxWeight = maxWeight
    const weightUnit = unitSystem === "us" ? "lbs" : "kg"

    if (unitSystem === "metric") {
      // Also show in lbs for reference
      const minWeightLbs = minWeight * 2.20462
      const maxWeightLbs = maxWeight * 2.20462
      displayMinWeight = minWeight
      displayMaxWeight = maxWeight
    }

    const explanatoryText = `At your height, a healthy weight would be between ${Math.round(displayMinWeight)}–${Math.round(displayMaxWeight)} ${weightUnit}. Your BMI is ${bmi.toFixed(1)}, which places you in the ${category} category.`

    setResult({
      bmi: bmi,
      category,
      categoryLevel,
      categoryColor,
      message,
      explanatoryText,
      minWeight: displayMinWeight,
      maxWeight: displayMaxWeight,
      weightUnit,
      heightInMeters,
      heightInInches,
      age: Number.parseFloat(age),
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setUnitSystem("us")
    setAge("")
    setGender("")
    setWeight("")
    setHeightFt("")
    setHeightIn("")
    setHeightCm("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Overweight Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate BMI and determine if you are underweight, normal, overweight, or obese. Get your healthy weight range and BMI classification."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Overweight Calculator</p>
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
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Overweight Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Overweight Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your BMI and determine if you are underweight, normal weight, overweight, or obese. Get your
                healthy weight range based on WHO standards.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-green-600" />
                      <span>BMI Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your measurements to calculate BMI and weight classification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Unit System Toggle */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Unit System</Label>
                      <RadioGroup value={unitSystem} onValueChange={setUnitSystem} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="us" id="us" />
                          <Label htmlFor="us">US Units (ft/in, lb)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="metric" id="metric" />
                          <Label htmlFor="metric">Metric Units (cm, kg)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {/* Age */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Age (years)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Age for reference (BMI standards apply to adults)
                            </div>
                          </div>
                        </Label>
                        <Input
                          className={`h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                            errors.age ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="1"
                          min="1"
                          max="120"
                          placeholder="Enter age"
                          value={age}
                          onChange={(e) => {
                            setAge(e.target.value)
                            if (errors.age) setErrors((prev) => ({ ...prev, age: "" }))
                          }}
                        />
                        {errors.age && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.age}</span>
                          </div>
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger
                            className={`h-12 rounded-xl border-gray-200 focus:border-green-400 ${
                              errors.gender ? "border-red-300 focus:border-red-400" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.gender}</span>
                          </div>
                        )}
                      </div>

                      {/* Height */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Height {unitSystem === "us" ? "(ft + in)" : "(cm)"}
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Your current height measurement
                            </div>
                          </div>
                        </Label>
                        {unitSystem === "us" ? (
                          <div className="flex space-x-2">
                            <Input
                              className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                                errors.heightFt ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                              }`}
                              type="number"
                              step="1"
                              min="0"
                              placeholder="Feet"
                              value={heightFt}
                              onChange={(e) => {
                                setHeightFt(e.target.value)
                                if (errors.heightFt) setErrors((prev) => ({ ...prev, heightFt: "" }))
                              }}
                            />
                            <Input
                              className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                                errors.heightIn ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                              }`}
                              type="number"
                              step="1"
                              min="0"
                              max="11"
                              placeholder="Inches"
                              value={heightIn}
                              onChange={(e) => {
                                setHeightIn(e.target.value)
                                if (errors.heightIn) setErrors((prev) => ({ ...prev, heightIn: "" }))
                              }}
                            />
                          </div>
                        ) : (
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                              errors.heightCm ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="Enter height in cm"
                            value={heightCm}
                            onChange={(e) => {
                              setHeightCm(e.target.value)
                              if (errors.heightCm) setErrors((prev) => ({ ...prev, heightCm: "" }))
                            }}
                          />
                        )}
                        {(errors.heightFt || errors.heightIn || errors.heightCm) && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.heightFt || errors.heightIn || errors.heightCm}</span>
                          </div>
                        )}
                      </div>

                      {/* Weight */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          Weight {unitSystem === "us" ? "(lb)" : "(kg)"}
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Your current body weight
                            </div>
                          </div>
                        </Label>
                        <Input
                          className={`h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                            errors.weight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder={`Enter weight in ${unitSystem === "us" ? "pounds" : "kilograms"}`}
                          value={weight}
                          onChange={(e) => {
                            setWeight(e.target.value)
                            if (errors.weight) setErrors((prev) => ({ ...prev, weight: "" }))
                          }}
                        />
                        {errors.weight && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.weight}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">
                        <strong>BMI Formula:</strong>{" "}
                        {unitSystem === "us"
                          ? "BMI = (weight in lb / (height in inches)²) × 703"
                          : "BMI = weight in kg / (height in meters)²"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Healthy BMI Range: 18.5 – 24.9 kg/m²</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateBMI}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800"
                      >
                        Calculate BMI
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
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-blue-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">BMI Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div
                            className={`bg-white p-4 rounded-lg border-2 ${
                              result.categoryColor === "red"
                                ? "border-red-500"
                                : result.categoryColor === "orange"
                                  ? "border-orange-400"
                                  : result.categoryColor === "green"
                                    ? "border-green-400"
                                    : "border-blue-400"
                            }`}
                          >
                            <p className="text-3xl font-bold text-gray-900">{result.bmi.toFixed(1)}</p>
                            <p className="text-gray-600">BMI kg/m²</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <p
                              className={`text-lg font-bold ${
                                result.categoryColor === "red"
                                  ? "text-red-700"
                                  : result.categoryColor === "orange"
                                    ? "text-orange-700"
                                    : result.categoryColor === "green"
                                      ? "text-green-700"
                                      : "text-blue-700"
                              }`}
                            >
                              {result.category}
                            </p>
                            <p className="text-gray-600">Classification</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <p className="text-sm font-bold text-green-700">
                              {Math.round(result.minWeight)} - {Math.round(result.maxWeight)} {result.weightUnit}
                            </p>
                            <p className="text-gray-600">Healthy Range</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Scale className="w-8 h-8 text-green-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">
                          Enter your measurements, then click{" "}
                          <span className="font-semibold text-green-600">Calculate</span> to see BMI.
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
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>BMI Analysis & Weight Classification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div
                        className={`text-center p-6 rounded-xl border-2 ${
                          result.categoryColor === "red"
                            ? "bg-gradient-to-br from-red-50 to-red-100 border-red-400"
                            : result.categoryColor === "orange"
                              ? "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-400"
                              : result.categoryColor === "green"
                                ? "bg-gradient-to-br from-green-50 to-green-100 border-green-400"
                                : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-400"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                            result.categoryColor === "red"
                              ? "bg-gradient-to-r from-red-600 to-red-700"
                              : result.categoryColor === "orange"
                                ? "bg-gradient-to-r from-orange-600 to-orange-700"
                                : result.categoryColor === "green"
                                  ? "bg-gradient-to-r from-green-600 to-green-700"
                                  : "bg-gradient-to-r from-blue-600 to-blue-700"
                          }`}
                        >
                          <Scale className="w-6 h-6 text-white" />
                        </div>
                        <h3
                          className={`text-lg font-semibold mb-2 ${
                            result.categoryColor === "red"
                              ? "text-red-800"
                              : result.categoryColor === "orange"
                                ? "text-orange-800"
                                : result.categoryColor === "green"
                                  ? "text-green-800"
                                  : "text-blue-800"
                          }`}
                        >
                          BMI Value
                        </h3>
                        <p
                          className={`text-3xl font-bold mb-1 ${
                            result.categoryColor === "red"
                              ? "text-red-900"
                              : result.categoryColor === "orange"
                                ? "text-orange-900"
                                : result.categoryColor === "green"
                                  ? "text-green-900"
                                  : "text-blue-900"
                          }`}
                        >
                          {result.bmi.toFixed(1)}
                        </p>
                        <p
                          className={`text-sm ${
                            result.categoryColor === "red"
                              ? "text-red-700"
                              : result.categoryColor === "orange"
                                ? "text-orange-700"
                                : result.categoryColor === "green"
                                  ? "text-green-700"
                                  : "text-blue-700"
                          }`}
                        >
                          kg/m²
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Classification</h3>
                        <p
                          className={`text-2xl font-bold mb-1 ${
                            result.categoryColor === "red"
                              ? "text-red-900"
                              : result.categoryColor === "orange"
                                ? "text-orange-900"
                                : result.categoryColor === "green"
                                  ? "text-green-900"
                                  : "text-blue-900"
                          }`}
                        >
                          {result.category}
                        </p>
                        <p className="text-sm text-green-600">WHO Standard</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Healthy Weight Range</h3>
                        <p className="text-2xl font-bold text-green-900 mb-1">
                          {Math.round(result.minWeight)} - {Math.round(result.maxWeight)}
                        </p>
                        <p className="text-sm text-green-600">{result.weightUnit}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Assessment Result:</h4>
                      <p className="text-gray-700 mb-2">{result.message}</p>
                      <p className="text-gray-700">{result.explanatoryText}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-blue-700 flex items-center justify-center mr-3 shadow-lg">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    Understanding BMI & Weight Classification
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">BMI Classifications (WHO Standard)</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                            <strong>Underweight:</strong> BMI &lt; 18.5
                          </li>
                          <li className="flex items-center">
                            <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                            <strong>Normal:</strong> BMI 18.5 - 24.9
                          </li>
                          <li className="flex items-center">
                            <div className="w-4 h-4 bg-orange-400 rounded mr-2"></div>
                            <strong>Overweight:</strong> BMI 25.0 - 29.9
                          </li>
                          <li className="flex items-center">
                            <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                            <strong>Obese:</strong> BMI ≥ 30.0
                          </li>
                        </ul>
                      </div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">BMI Formulas</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="space-y-2 text-gray-700">
                          <li>
                            <strong>Metric:</strong> BMI = weight (kg) ÷ height² (m)
                          </li>
                          <li>
                            <strong>US Units:</strong> BMI = (weight (lb) ÷ height² (in)) × 703
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>BMI is a screening tool, not a diagnostic measure</li>
                          <li>Muscle mass, bone density, and body composition affect BMI</li>
                          <li>Athletes may have high BMI due to muscle mass</li>
                          <li>Age, ethnicity, and gender can influence interpretation</li>
                        </ul>
                      </div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Healthy Weight Benefits</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Reduced risk of heart disease and diabetes</li>
                          <li>Better sleep quality and energy levels</li>
                          <li>Improved mobility and joint health</li>
                          <li>Enhanced overall quality of life</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300">
                    <div className="flex items-start space-x-2">
                      <Heart className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">Consult Healthcare Professionals</h4>
                        <p className="text-sm text-green-700">
                          For personalized health advice and weight management plans, consult with healthcare providers
                          who can consider your individual health profile and medical history.
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
