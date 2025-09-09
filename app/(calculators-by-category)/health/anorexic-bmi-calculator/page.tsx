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
import { Heart, Calculator, AlertTriangle, Activity, RotateCcw, HelpCircle, Scale } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

export default function AnorexicBMICalculator() {
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

    let weightInKg = Number.parseFloat(weight)
    let heightInM = 0

    // Convert weight to kg if needed
    if (unitSystem === "us") {
      weightInKg = weightInKg * 0.45359237 // lb to kg conversion
    }

    // Convert height to meters
    if (unitSystem === "us") {
      const totalInches = Number.parseFloat(heightFt) * 12 + Number.parseFloat(heightIn)
      heightInM = totalInches * 0.0254 // inches to meters
    } else {
      heightInM = Number.parseFloat(heightCm) / 100 // cm to meters
    }

    // Calculate BMI using standard formula
    const bmi = weightInKg / (heightInM * heightInM)

    // Determine severity classification
    let severity = ""
    let severityLevel = ""
    let warningLevel = ""
    let message = ""

    if (bmi >= 18.5) {
      severity = "Normal"
      severityLevel = "normal"
      warningLevel = "safe"
      message = "Does not suggest anorexia nervosa."
    } else if (bmi >= 17.5) {
      severity = "Mild Anorexia"
      severityLevel = "mild"
      warningLevel = "warning"
      message = `Your BMI suggests possible anorexia (Severity: ${severity}). Note: BMI alone is not a diagnosis.`
    } else if (bmi >= 17.0) {
      severity = "Mild Anorexia"
      severityLevel = "mild"
      warningLevel = "warning"
      message = `Your BMI suggests possible anorexia (Severity: ${severity}). Note: BMI alone is not a diagnosis.`
    } else if (bmi >= 16.0) {
      severity = "Moderate Anorexia"
      severityLevel = "moderate"
      warningLevel = "danger"
      message = `Your BMI suggests possible anorexia (Severity: ${severity}). Note: BMI alone is not a diagnosis.`
    } else if (bmi >= 15.0) {
      severity = "Severe Anorexia"
      severityLevel = "severe"
      warningLevel = "danger"
      message = `Your BMI suggests possible anorexia (Severity: ${severity}). Note: BMI alone is not a diagnosis.`
    } else {
      severity = "Extreme Anorexia"
      severityLevel = "extreme"
      warningLevel = "critical"
      message = `Your BMI suggests possible anorexia (Severity: ${severity}). Note: BMI alone is not a diagnosis.`
    }

    // Critical warnings
    let criticalWarning = ""
    if (bmi < 12) {
      criticalWarning = "Life-threatening condition — seek immediate medical care."
    } else if (bmi < 13.5) {
      criticalWarning = "Danger: Risk of organ failure."
    }

    // Age warning for children/adolescents
    const ageWarning =
      Number.parseFloat(age) <= 20
        ? "For children and adolescents (≤20 years), use CDC growth charts for proper BMI interpretation."
        : ""

    setResult({
      bmi: bmi,
      severity,
      severityLevel,
      warningLevel,
      message,
      criticalWarning,
      ageWarning,
      weightInKg,
      heightInM,
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
      <SEO 
      title={"Anorexic BMI Calculator"} 
      description={"Calculate BMI and assess anorexia nervosa severity using medical thresholds."} 
      slug={"/health/anorexic-bmi-calculator"}
      keywords="BMI, anorexia nervosa, medical thresholds" />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Anorexic BMI Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-red-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-red-600">
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Anorexic BMI Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Anorexic BMI Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate BMI and assess anorexia nervosa severity using medical classification thresholds. Educational
                tool for understanding BMI ranges and health implications.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-red-600" />
                      <h2 className="text-gray-900">Anorexic BMI Calculation</h2>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your measurements to calculate BMI and assess anorexia severity
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
                              Age affects BMI interpretation for children/adolescents
                            </div>
                          </div>
                        </Label>
                        <Input
                          className={`h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
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
                            className={`h-12 rounded-xl border-gray-200 focus:border-red-400 ${
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
                              className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
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
                              className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
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
                            className={`h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
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
                          className={`h-12 rounded-xl border-gray-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
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

                    <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm text-gray-700">
                        <strong>BMI Formula:</strong>{" "}
                        {unitSystem === "us"
                          ? "BMI = (weight in lb / (height in inches)²) × 703"
                          : "BMI = weight in kg / (height in meters)²"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Healthy BMI Range: 18.5 – 25 kg/m²</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateBMI}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-700 hover:to-orange-800"
                      >
                        Calculate BMI
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-orange-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-orange-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">BMI Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div
                            className={`bg-white p-4 rounded-lg border-2 ${
                              result.warningLevel === "critical"
                                ? "border-red-500"
                                : result.warningLevel === "danger"
                                  ? "border-red-400"
                                  : result.warningLevel === "warning"
                                    ? "border-orange-300"
                                    : "border-green-300"
                            }`}
                          >
                            <p className="text-3xl font-bold text-red-900">{result.bmi.toFixed(2)}</p>
                            <p className="text-gray-600">BMI kg/m²</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-red-200">
                            <p className="text-lg font-bold text-red-900">{result.severity}</p>
                            <p className="text-gray-600">Classification</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-red-200">
                            <p className="text-sm font-bold text-green-700">18.5 - 25</p>
                            <p className="text-gray-600">Healthy Range</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Scale className="w-8 h-8 text-red-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">
                          Enter your measurements, then click{" "}
                          <span className="font-semibold text-red-600">Calculate</span> to see BMI.
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
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-red-600" />
                      <span>BMI Analysis & Anorexia Assessment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div
                        className={`text-center p-6 rounded-xl border-2 ${
                          result.warningLevel === "critical"
                            ? "bg-gradient-to-br from-red-100 to-red-200 border-red-500"
                            : result.warningLevel === "danger"
                              ? "bg-gradient-to-br from-red-50 to-red-100 border-red-400"
                              : result.warningLevel === "warning"
                                ? "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300"
                                : "bg-gradient-to-br from-green-50 to-green-100 border-green-300"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                            result.warningLevel === "critical"
                              ? "bg-gradient-to-r from-red-700 to-red-800"
                              : result.warningLevel === "danger"
                                ? "bg-gradient-to-r from-red-600 to-red-700"
                                : result.warningLevel === "warning"
                                  ? "bg-gradient-to-r from-orange-600 to-orange-700"
                                  : "bg-gradient-to-r from-green-600 to-green-700"
                          }`}
                        >
                          <Scale className="w-6 h-6 text-white" />
                        </div>
                        <h3
                          className={`text-lg font-semibold mb-2 ${
                            result.warningLevel === "critical"
                              ? "text-red-800"
                              : result.warningLevel === "danger"
                                ? "text-red-700"
                                : result.warningLevel === "warning"
                                  ? "text-orange-700"
                                  : "text-green-700"
                          }`}
                        >
                          BMI Value
                        </h3>
                        <p
                          className={`text-3xl font-bold mb-1 ${
                            result.warningLevel === "critical"
                              ? "text-red-900"
                              : result.warningLevel === "danger"
                                ? "text-red-900"
                                : result.warningLevel === "warning"
                                  ? "text-orange-900"
                                  : "text-green-900"
                          }`}
                        >
                          {result.bmi.toFixed(2)}
                        </p>
                        <p
                          className={`text-sm ${
                            result.warningLevel === "critical"
                              ? "text-red-700"
                              : result.warningLevel === "danger"
                                ? "text-red-600"
                                : result.warningLevel === "warning"
                                  ? "text-orange-600"
                                  : "text-green-600"
                          }`}
                        >
                          kg/m²
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-red-700 mb-2">Classification</h3>
                        <p className="text-2xl font-bold text-red-900 mb-1">{result.severity}</p>
                        <p className="text-sm text-red-600">{result.severityLevel}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Healthy BMI Range</h3>
                        <p className="text-2xl font-bold text-green-900 mb-1">18.5 - 25</p>
                        <p className="text-sm text-green-600">kg/m²</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-700 mb-2">Assessment Result:</h4>
                      <p className="text-gray-700 mb-2">{result.message}</p>

                      {result.criticalWarning && (
                        <div className="mt-3 p-3 bg-red-100 rounded-lg border border-red-300">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-red-800 font-semibold">{result.criticalWarning}</p>
                          </div>
                        </div>
                      )}

                      {result.ageWarning && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-blue-800">{result.ageWarning}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-700 mb-1">Important Disclaimer</h4>
                          <p className="text-sm text-red-600">
                            This calculator is for informational purposes only. BMI is one indicator and not a
                            diagnosis. Consult a healthcare professional for proper assessment and treatment of eating
                            disorders.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-orange-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-orange-700 flex items-center justify-center mr-3 shadow-lg">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">
                    <h2>Understanding BMI & Anorexia Classification</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3">BMI Classifications</h3>
                      <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
                        <ul className="space-y-2 text-gray-700">
                          <li>
                            <strong>Normal:</strong> BMI ≥ 18.5 - Does not suggest anorexia
                          </li>
                          <li>
                            <strong>Mild Anorexia:</strong> BMI 17.0 - 17.49
                          </li>
                          <li>
                            <strong>Moderate Anorexia:</strong> BMI 16.0 - 16.99
                          </li>
                          <li>
                            <strong>Severe Anorexia:</strong> BMI 15.0 - 15.99
                          </li>
                          <li>
                            <strong>Extreme Anorexia:</strong> BMI &lt; 15.0
                          </li>
                        </ul>
                      </div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3">Critical Warnings</h3>
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <ul className="space-y-2 text-gray-700">
                          <li>
                            <strong>BMI &lt; 13.5:</strong> Risk of organ failure
                          </li>
                          <li>
                            <strong>BMI &lt; 12:</strong> Life-threatening condition
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>BMI alone is not sufficient for diagnosing anorexia nervosa</li>
                          <li>Clinical assessment requires psychological evaluation</li>
                          <li>Age, muscle mass, and bone density affect BMI interpretation</li>
                          <li>For children ≤20 years, use CDC growth charts</li>
                        </ul>
                      </div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3">Healthy BMI Range</h3>
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <p className="text-gray-700 mb-2">
                          <strong>18.5 – 25 kg/m²</strong> is considered the healthy BMI range for adults.
                        </p>
                        <p className="text-gray-700">
                          This range is associated with the lowest risk of health problems and mortality.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-red-100 rounded-lg border border-red-300">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">Seek Professional Help</h4>
                        <p className="text-sm text-red-700">
                          If you or someone you know is struggling with eating disorders, please consult healthcare
                          professionals. Early intervention and proper treatment are crucial for recovery.
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
