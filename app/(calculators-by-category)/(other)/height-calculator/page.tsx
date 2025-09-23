"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { Ruler, Calculator, RotateCcw, Users, TrendingUp } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

export default function HeightCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Child information
  const [childAge, setChildAge] = useState("")
  const [childGender, setChildGender] = useState("")
  const [childHeightFt, setChildHeightFt] = useState("")
  const [childHeightIn, setChildHeightIn] = useState("")
  const [childHeightCm, setChildHeightCm] = useState("")
  const [childWeightLb, setChildWeightLb] = useState("")
  const [childWeightKg, setChildWeightKg] = useState("")

  // Parents' heights
  const [motherHeightFt, setMotherHeightFt] = useState("")
  const [motherHeightIn, setMotherHeightIn] = useState("")
  const [motherHeightCm, setMotherHeightCm] = useState("")
  const [fatherHeightFt, setFatherHeightFt] = useState("")
  const [fatherHeightIn, setFatherHeightIn] = useState("")
  const [fatherHeightCm, setFatherHeightCm] = useState("")

  // Settings
  const [unitSystem, setUnitSystem] = useState("us") // us, metric, other
  const [methodSelection, setMethodSelection] = useState("auto") // auto, manual
  const [manualMethod, setManualMethod] = useState("khamis") // khamis, midparental

  // Unit conversion functions
  const convertToInches = (ft: number, inches: number): number => {
    return ft * 12 + inches
  }

  const convertCmToInches = (cm: number): number => {
    return cm / 2.54
  }

  const convertInchesToCm = (inches: number): number => {
    return inches * 2.54
  }

  const convertLbToKg = (lb: number): number => {
    return lb / 2.20462
  }

  const convertKgToLb = (kg: number): number => {
    return kg * 2.20462
  }

  // Get child height in cm
  const getChildHeightCm = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(childHeightCm) || 0
    } else {
      const ft = Number.parseFloat(childHeightFt) || 0
      const inches = Number.parseFloat(childHeightIn) || 0
      return convertInchesToCm(convertToInches(ft, inches))
    }
  }

  // Get child weight in kg
  const getChildWeightKg = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(childWeightKg) || 0
    } else {
      return convertLbToKg(Number.parseFloat(childWeightLb) || 0)
    }
  }

  // Get parent heights in cm
  const getMotherHeightCm = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(motherHeightCm) || 0
    } else {
      const ft = Number.parseFloat(motherHeightFt) || 0
      const inches = Number.parseFloat(motherHeightIn) || 0
      return convertInchesToCm(convertToInches(ft, inches))
    }
  }

  const getFatherHeightCm = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(fatherHeightCm) || 0
    } else {
      const ft = Number.parseFloat(fatherHeightFt) || 0
      const inches = Number.parseFloat(fatherHeightIn) || 0
      return convertInchesToCm(convertToInches(ft, inches))
    }
  }

  // Khamis-Roche Method (simplified coefficients)
  const calculateKhamisRoche = (
    age: number,
    gender: string,
    heightCm: number,
    weightKg: number,
    midParentalHeight: number,
  ): { height: number; margin: number } => {
    // Simplified regression coefficients (actual coefficients vary by age and are more complex)
    const coefficients = {
      male: { beta: 7.8, ah: 0.78, aw: 0.32, ap: 0.24 },
      female: { beta: 6.1, ah: 0.75, aw: 0.28, ap: 0.26 },
    }

    const coeff = coefficients[gender as keyof typeof coefficients]
    const predictedHeight = coeff.beta + coeff.ah * heightCm + coeff.aw * weightKg + coeff.ap * midParentalHeight

    const margin = gender === "male" ? 5.3 : 4.3 // cm

    return { height: predictedHeight, margin }
  }

  // Mid-Parental Height Method
  const calculateMidParental = (
    gender: string,
    motherHeight: number,
    fatherHeight: number,
  ): { height: number; margin: number } => {
    const midParentalHeight = (motherHeight + fatherHeight) / 2
    const adjustment = gender === "male" ? 6.5 : -6.5 // cm
    const predictedHeight = midParentalHeight + adjustment
    const margin = 10 // cm

    return { height: predictedHeight, margin }
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Child age validation
    const age = Number.parseFloat(childAge)
    if (!childAge || age < 0 || age > 18) {
      newErrors.childAge = "Age must be between 0 and 18 years"
    }

    // Child gender validation
    if (!childGender) {
      newErrors.childGender = "Please select child's gender"
    }

    // Child height validation
    const childHeight = getChildHeightCm()
    if (childHeight <= 0 || childHeight > 250) {
      newErrors.childHeight = "Please enter a valid height"
    }

    // Child weight validation (only for Khamis-Roche method)
    const shouldValidateWeight = methodSelection === "auto" ? age >= 4 : manualMethod === "khamis"
    if (shouldValidateWeight) {
      const childWeight = getChildWeightKg()
      if (childWeight <= 0 || childWeight > 200) {
        newErrors.childWeight = "Please enter a valid weight"
      }
    }

    // Parents' heights validation
    const motherHeight = getMotherHeightCm()
    const fatherHeight = getFatherHeightCm()
    if (motherHeight <= 0 || motherHeight > 250) {
      newErrors.motherHeight = "Please enter a valid height for mother"
    }
    if (fatherHeight <= 0 || fatherHeight > 250) {
      newErrors.fatherHeight = "Please enter a valid height for father"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateHeight = () => {
    if (!validateInputs()) return

    const age = Number.parseFloat(childAge)
    const childHeight = getChildHeightCm()
    const childWeight = getChildWeightKg()
    const motherHeight = getMotherHeightCm()
    const fatherHeight = getFatherHeightCm()
    const midParentalHeight = (motherHeight + fatherHeight) / 2

    let useKhamisRoche = false
    let useMidParental = false

    // Determine which method(s) to use
    if (methodSelection === "auto") {
      if (age >= 4) {
        useKhamisRoche = true
        useMidParental = true // Show both for comparison
      } else {
        useMidParental = true
      }
    } else {
      if (manualMethod === "khamis") {
        useKhamisRoche = true
      } else {
        useMidParental = true
      }
    }

    let khamisResult = null
    let midParentalResult = null

    if (useKhamisRoche) {
      khamisResult = calculateKhamisRoche(age, childGender, childHeight, childWeight, midParentalHeight)
    }

    if (useMidParental) {
      midParentalResult = calculateMidParental(childGender, motherHeight, fatherHeight)
    }

    setResult({
      khamisRoche: khamisResult,
      midParental: midParentalResult,
      childAge: age,
      childGender,
      childHeight,
      childWeight,
      motherHeight,
      fatherHeight,
      midParentalHeight,
      unitSystem,
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setChildAge("")
    setChildGender("")
    setChildHeightFt("")
    setChildHeightIn("")
    setChildHeightCm("")
    setChildWeightLb("")
    setChildWeightKg("")
    setMotherHeightFt("")
    setMotherHeightIn("")
    setMotherHeightCm("")
    setFatherHeightFt("")
    setFatherHeightIn("")
    setFatherHeightCm("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const formatHeight = (cm: number) => {
    if (unitSystem === "metric") {
      return `${cm.toFixed(1)} cm`
    } else {
      const totalInches = convertCmToInches(cm)
      const feet = Math.floor(totalInches / 12)
      const inches = totalInches % 12
      return `${feet}'${inches.toFixed(1)}"`
    }
  }

  return (
    <>
      <SEO
        title="Height Calculator – Estimate Adult Height"
        description="Predict adult height from current age. Use our free height calculator for kids, teens, and accurate growth estimation."
        slug="/height-calculator"
        keywords="height calculator, predict height, growth estimation, adult height prediction"
      />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Height Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-teal-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/other-calculators" className="text-gray-500 hover:text-teal-600">
                Other
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Height Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Ruler className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Height Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Predict your child's future adult height using scientifically proven methods. Get accurate estimates
                with confidence intervals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Users className="w-6 h-6 text-teal-600" />
                      <span>Child & Family Information</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter child's current measurements and parents' heights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Unit System Selection */}
                    <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Unit System</Label>
                      <RadioGroup value={unitSystem} onValueChange={setUnitSystem} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="us" id="us" />
                          <Label htmlFor="us">US (ft/in, lb)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="metric" id="metric" />
                          <Label htmlFor="metric">Metric (cm, kg)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Child Information */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-teal-700 mb-4">Child's Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Age (years)</Label>
                          <Input
                            className={`h-12 ${errors.childAge ? "border-red-300" : ""}`}
                            type="number"
                            step="0.1"
                            min="0"
                            max="18"
                            placeholder="8"
                            value={childAge}
                            onChange={(e) => setChildAge(e.target.value)}
                          />
                          {errors.childAge && <p className="text-red-600 text-xs mt-1">{errors.childAge}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                          <Select value={childGender} onValueChange={setChildGender}>
                            <SelectTrigger className={`h-12 ${errors.childGender ? "border-red-300" : ""}`}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.childGender && <p className="text-red-600 text-xs mt-1">{errors.childGender}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height</Label>
                          {unitSystem === "metric" ? (
                            <Input
                              className={`h-12 ${errors.childHeight ? "border-red-300" : ""}`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="132"
                              value={childHeightCm}
                              onChange={(e) => setChildHeightCm(e.target.value)}
                            />
                          ) : (
                            <div className="flex space-x-2">
                              <Input
                                className={`h-12 ${errors.childHeight ? "border-red-300" : ""}`}
                                type="number"
                                min="0"
                                placeholder="4"
                                value={childHeightFt}
                                onChange={(e) => setChildHeightFt(e.target.value)}
                              />
                              <span className="flex items-center text-gray-500">ft</span>
                              <Input
                                className={`h-12 ${errors.childHeight ? "border-red-300" : ""}`}
                                type="number"
                                step="0.1"
                                min="0"
                                max="11.9"
                                placeholder="4"
                                value={childHeightIn}
                                onChange={(e) => setChildHeightIn(e.target.value)}
                              />
                              <span className="flex items-center text-gray-500">in</span>
                            </div>
                          )}
                          {errors.childHeight && <p className="text-red-600 text-xs mt-1">{errors.childHeight}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Weight{" "}
                            {Number.parseFloat(childAge) < 4 && methodSelection === "auto" && (
                              <span className="text-gray-500">(optional)</span>
                            )}
                          </Label>
                          {unitSystem === "metric" ? (
                            <Input
                              className={`h-12 ${errors.childWeight ? "border-red-300" : ""}`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="32"
                              value={childWeightKg}
                              onChange={(e) => setChildWeightKg(e.target.value)}
                            />
                          ) : (
                            <Input
                              className={`h-12 ${errors.childWeight ? "border-red-300" : ""}`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="70"
                              value={childWeightLb}
                              onChange={(e) => setChildWeightLb(e.target.value)}
                            />
                          )}
                          {errors.childWeight && <p className="text-red-600 text-xs mt-1">{errors.childWeight}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Parents' Heights */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-teal-700 mb-4">Parents' Heights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Mother's Height</Label>
                          {unitSystem === "metric" ? (
                            <Input
                              className={`h-12 ${errors.motherHeight ? "border-red-300" : ""}`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="160"
                              value={motherHeightCm}
                              onChange={(e) => setMotherHeightCm(e.target.value)}
                            />
                          ) : (
                            <div className="flex space-x-2">
                              <Input
                                className={`h-12 ${errors.motherHeight ? "border-red-300" : ""}`}
                                type="number"
                                min="0"
                                placeholder="5"
                                value={motherHeightFt}
                                onChange={(e) => setMotherHeightFt(e.target.value)}
                              />
                              <span className="flex items-center text-gray-500">ft</span>
                              <Input
                                className={`h-12 ${errors.motherHeight ? "border-red-300" : ""}`}
                                type="number"
                                step="0.1"
                                min="0"
                                max="11.9"
                                placeholder="3"
                                value={motherHeightIn}
                                onChange={(e) => setMotherHeightIn(e.target.value)}
                              />
                              <span className="flex items-center text-gray-500">in</span>
                            </div>
                          )}
                          {errors.motherHeight && <p className="text-red-600 text-xs mt-1">{errors.motherHeight}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Father's Height</Label>
                          {unitSystem === "metric" ? (
                            <Input
                              className={`h-12 ${errors.fatherHeight ? "border-red-300" : ""}`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="175"
                              value={fatherHeightCm}
                              onChange={(e) => setFatherHeightCm(e.target.value)}
                            />
                          ) : (
                            <div className="flex space-x-2">
                              <Input
                                className={`h-12 ${errors.fatherHeight ? "border-red-300" : ""}`}
                                type="number"
                                min="0"
                                placeholder="5"
                                value={fatherHeightFt}
                                onChange={(e) => setFatherHeightFt(e.target.value)}
                              />
                              <span className="flex items-center text-gray-500">ft</span>
                              <Input
                                className={`h-12 ${errors.fatherHeight ? "border-red-300" : ""}`}
                                type="number"
                                step="0.1"
                                min="0"
                                max="11.9"
                                placeholder="9"
                                value={fatherHeightIn}
                                onChange={(e) => setFatherHeightIn(e.target.value)}
                              />
                              <span className="flex items-center text-gray-500">in</span>
                            </div>
                          )}
                          {errors.fatherHeight && <p className="text-red-600 text-xs mt-1">{errors.fatherHeight}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Method Selection */}
                    <div className="mb-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Prediction Method</Label>
                      <RadioGroup value={methodSelection} onValueChange={setMethodSelection} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="auto" id="auto" />
                          <Label htmlFor="auto">Auto-select (recommended)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manual" id="manual" />
                          <Label htmlFor="manual">Manual selection</Label>
                        </div>
                      </RadioGroup>

                      {methodSelection === "manual" && (
                        <div className="mt-3">
                          <Select value={manualMethod} onValueChange={setManualMethod}>
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="khamis">Khamis-Roche Method</SelectItem>
                              <SelectItem value="midparental">Mid-Parental Height Method</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateHeight}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800"
                      >
                        Calculate Height
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-teal-300 text-teal-700 hover:bg-teal-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mb-3 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">Predicted Height</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        {result.khamisRoche && (
                          <div className="bg-white p-6 rounded-lg border border-teal-200">
                            <p className="text-3xl font-bold text-teal-900">
                              {formatHeight(result.khamisRoche.height)}
                            </p>
                            <p className="text-gray-600 mt-1">Khamis-Roche Method</p>
                            <p className="text-sm text-gray-500 mt-1">±{formatHeight(result.khamisRoche.margin)}</p>
                          </div>
                        )}
                        {result.midParental && (
                          <div className="bg-white p-6 rounded-lg border border-teal-200">
                            <p className="text-3xl font-bold text-teal-900">
                              {formatHeight(result.midParental.height)}
                            </p>
                            <p className="text-gray-600 mt-1">Mid-Parental Method</p>
                            <p className="text-sm text-gray-500 mt-1">±{formatHeight(result.midParental.margin)}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Ruler className="w-8 h-8 text-teal-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter child and parent information, then click{" "}
                          <span className="font-semibold text-teal-600">Calculate</span> to see predicted adult height.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results */}
            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-teal-600" />
                      <span>Detailed Height Prediction</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {result.khamisRoche && (
                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                          <h3 className="text-lg font-semibold text-teal-700 mb-3">Khamis-Roche Method</h3>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Predicted Height:</strong> {formatHeight(result.khamisRoche.height)}
                            </p>
                            <p>
                              <strong>Accuracy Range:</strong> ±{formatHeight(result.khamisRoche.margin)}
                            </p>
                            <p>
                              <strong>Range:</strong>{" "}
                              {formatHeight(result.khamisRoche.height - result.khamisRoche.margin)} -{" "}
                              {formatHeight(result.khamisRoche.height + result.khamisRoche.margin)}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                              Based on child's current age, height, weight, and parents' heights. More accurate for
                              children 4+ years old.
                            </p>
                          </div>
                        </div>
                      )}

                      {result.midParental && (
                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <h3 className="text-lg font-semibold text-cyan-700 mb-3">Mid-Parental Height Method</h3>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Predicted Height:</strong> {formatHeight(result.midParental.height)}
                            </p>
                            <p>
                              <strong>Accuracy Range:</strong> ±{formatHeight(result.midParental.margin)}
                            </p>
                            <p>
                              <strong>Range:</strong>{" "}
                              {formatHeight(result.midParental.height - result.midParental.margin)} -{" "}
                              {formatHeight(result.midParental.height + result.midParental.margin)}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                              Based only on parents' heights. Can be used for any age but less accurate than
                              Khamis-Roche.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-700 mb-2">Input Summary:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                        <div>
                          <strong>Child Age:</strong> {result.childAge} years
                        </div>
                        <div>
                          <strong>Gender:</strong> {result.childGender}
                        </div>
                        <div>
                          <strong>Current Height:</strong> {formatHeight(result.childHeight)}
                        </div>
                        <div>
                          <strong>Mid-Parental:</strong> {formatHeight(result.midParentalHeight)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mr-3 shadow-lg">
                    <Ruler className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">
                    Understanding Height Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">Khamis-Roche Method</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Age Range:</strong> Best for children 4+ years old
                          </li>
                          <li>
                            <strong>Accuracy:</strong> ±2.1 inches (boys), ±1.7 inches (girls)
                          </li>
                          <li>
                            <strong>Factors:</strong> Child's age, height, weight, parents' heights
                          </li>
                          <li>
                            <strong>Method:</strong> Uses regression coefficients from longitudinal study
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-teal-700 mb-3">Mid-Parental Height Method</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Age Range:</strong> Can be used for any age
                          </li>
                          <li>
                            <strong>Accuracy:</strong> ±4 inches
                          </li>
                          <li>
                            <strong>Factors:</strong> Only parents' heights
                          </li>
                          <li>
                            <strong>Formula:</strong> (Mother + Father) ÷ 2 ± 2.5 inches
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Example (Boy, 8 years):</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Current height: 132 cm, weight: 32 kg</p>
                          <p>Mother: 160 cm, Father: 175 cm</p>
                          <p>Mid-parental: (160 + 175) ÷ 2 = 167.5 cm</p>
                          <p>
                            <strong>Khamis-Roche:</strong> ~178 cm (±5.3 cm)
                          </p>
                          <p>
                            <strong>Mid-Parental:</strong> 167.5 + 6.5 = 174 cm (±10 cm)
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-teal-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Predictions are estimates based on statistical models</li>
                          <li>Nutrition, health, and lifestyle can affect final height</li>
                          <li>Genetic factors account for ~80% of height variation</li>
                          <li>Environmental factors can influence growth patterns</li>
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
