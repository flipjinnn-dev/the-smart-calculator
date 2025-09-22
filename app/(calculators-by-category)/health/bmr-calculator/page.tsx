"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { Heart, Calculator, RotateCcw, Activity, Scale, Ruler, User } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import bmrData from "@/app/content/bmr-calculator.json"

export default function BMRCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [heightCm, setHeightCm] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [weightKg, setWeightKg] = useState("")
  const [weightLbs, setWeightLbs] = useState("")
  const [bodyFat, setBodyFat] = useState([15])

  // Settings
  const [units, setUnits] = useState("metric") // metric or us
  const [formula, setFormula] = useState("mifflin") // mifflin, harris, katch
  const [resultUnit, setResultUnit] = useState("kcal") // kcal or kj

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Age validation
    if (!age || isNaN(Number(age))) {
      newErrors.age = "Age is required and must be a number"
    } else if (Number(age) < 15 || Number(age) > 80) {
      newErrors.age = "Age must be between 15 and 80 years"
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

    // Weight validation
    if (units === "metric") {
      if (!weightKg || isNaN(Number(weightKg))) {
        newErrors.weight = "Weight is required and must be a number"
      } else if (Number(weightKg) < 30 || Number(weightKg) > 300) {
        newErrors.weight = "Weight must be between 30-300 kg"
      }
    } else {
      if (!weightLbs || isNaN(Number(weightLbs))) {
        newErrors.weight = "Weight is required and must be a number"
      } else if (Number(weightLbs) < 66 || Number(weightLbs) > 660) {
        newErrors.weight = "Weight must be between 66-660 lbs"
      }
    }

    // Body fat validation for Katch-McArdle
    if (formula === "katch") {
      if (bodyFat[0] < 5 || bodyFat[0] > 50) {
        newErrors.bodyFat = "Body fat percentage must be between 5-50%"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateBMR = () => {
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

      let weightKgVal: number
      if (units === "metric") {
        weightKgVal = Number(weightKg)
      } else {
        weightKgVal = Number(weightLbs) * 0.453592
      }

      let bmr: number

      // Calculate BMR based on selected formula
      if (formula === "mifflin") {
        // Mifflin-St Jeor Equation
        if (genderVal === "male") {
          bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageVal + 5
        } else {
          bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageVal - 161
        }
      } else if (formula === "harris") {
        // Revised Harris-Benedict Equation
        if (genderVal === "male") {
          bmr = 66.5 + 13.75 * weightKgVal + 5.003 * heightCmVal - 6.75 * ageVal
        } else {
          bmr = 655.1 + 9.563 * weightKgVal + 1.85 * heightCmVal - 4.676 * ageVal
        }
      } else if (formula === "katch") {
        // Katch-McArdle Formula
        const lbm = (1 - bodyFat[0] / 100) * weightKgVal
        bmr = 370 + 21.6 * lbm
      } else {
        throw new Error("Invalid formula selected")
      }

      // Calculate activity levels
      const activityLevels = {
        sedentary: bmr * 1.2,
        lightlyActive: bmr * 1.375,
        moderatelyActive: bmr * 1.55,
        veryActive: bmr * 1.725,
        extraActive: bmr * 1.9,
      }

      // Convert to kJ if needed
      const bmrResult = resultUnit === "kj" ? bmr * 4.184 : bmr
      const activityLevelsResult = Object.fromEntries(
        Object.entries(activityLevels).map(([key, value]) => [key, resultUnit === "kj" ? value * 4.184 : value]),
      )

      setResult({
        bmr: bmrResult,
        activityLevels: activityLevelsResult,
        inputs: {
          age: ageVal,
          gender: genderVal,
          height: heightCmVal,
          weight: weightKgVal,
          bodyFat: bodyFat[0],
          formula,
          units,
          resultUnit,
        },
        calculations: {
          baseBmr: bmr,
          lbm: formula === "katch" ? (1 - bodyFat[0] / 100) * weightKgVal : null,
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating BMR. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setGender("")
    setHeightCm("")
    setHeightFeet("")
    setHeightInches("")
    setWeightKg("")
    setWeightLbs("")
    setBodyFat([15])
    setUnits("metric")
    setFormula("mifflin")
    setResultUnit("kcal")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <SEO
        title="BMR Calculator – Basal Metabolic Rate Estimator"
        description="Calculate your BMR and daily calorie needs. Use our free BMR calculator to plan diet, weight loss, and energy balance."
        keywords="BMR calculator, basal metabolic rate calculator, calorie needs calculator"
        slug="/health/bmr-calculator"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">BMR Calculator</p>
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
                Health & Fitness
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">BMR Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">BMR Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your Basal Metabolic Rate using proven formulas. Discover how many calories your body burns at
                rest and your daily calorie needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>BMR Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details to calculate your Basal Metabolic Rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    {/* Formula and Units Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">BMR Formula</Label>
                          <Select value={formula} onValueChange={setFormula}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mifflin">Mifflin-St Jeor (Recommended)</SelectItem>
                              <SelectItem value="harris">Revised Harris-Benedict</SelectItem>
                              <SelectItem value="katch">Katch-McArdle (Requires Body Fat %)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Age Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Age (years)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                            type="text"
                            placeholder="28"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        <p className="text-xs text-gray-500 mt-1">Age range: 15-80 years</p>
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
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height (cm)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-green-500" />
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
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height (ft/in)</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-green-500" />
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
                                placeholder="9"
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

                      {/* Weight Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Weight ({units === "metric" ? "kg" : "lbs"})
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`}
                            type="text"
                            placeholder={units === "metric" ? "70" : "154"}
                            value={units === "metric" ? weightKg : weightLbs}
                            onChange={(e) =>
                              units === "metric" ? setWeightKg(e.target.value) : setWeightLbs(e.target.value)
                            }
                          />
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                        <p className="text-xs text-gray-500 mt-1">
                          Weight in {units === "metric" ? "kilograms" : "pounds"}
                        </p>
                      </div>

                      {/* Body Fat Input - only for Katch-McArdle */}
                      {formula === "katch" && (
                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Body Fat Percentage: {bodyFat[0]}%
                          </Label>
                          <div className="px-3">
                            <Slider
                              value={bodyFat}
                              onValueChange={setBodyFat}
                              max={50}
                              min={5}
                              step={0.5}
                              className="w-full"
                            />
                          </div>
                          {errors.bodyFat && <p className="text-red-600 text-xs mt-1">{errors.bodyFat}</p>}
                          <p className="text-xs text-gray-500 mt-1">
                            Required for Katch-McArdle formula. Use DEXA scan or body fat calipers for accuracy.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Result Unit Toggle */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-gray-700">Result Unit</Label>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`text-sm ${resultUnit === "kcal" ? "font-semibold text-green-600" : "text-gray-500"}`}
                          >
                            kcal/day
                          </span>
                          <Switch
                            checked={resultUnit === "kj"}
                            onCheckedChange={(checked) => setResultUnit(checked ? "kj" : "kcal")}
                          />
                          <span
                            className={`text-sm ${resultUnit === "kj" ? "font-semibold text-green-600" : "text-gray-500"}`}
                          >
                            kJ/day
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateBMR}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800"
                      >
                        Calculate BMR
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-teal-700 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">BMR Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900">
                            {Math.round(result.bmr).toLocaleString()} {resultUnit}/day
                          </p>
                          <p className="text-gray-600 text-sm">Basal Metabolic Rate</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900">
                            {Math.round(result.activityLevels.sedentary).toLocaleString()} {resultUnit}/day
                          </p>
                          <p className="text-gray-600 text-sm">Sedentary (No exercise)</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900">
                            {Math.round(result.activityLevels.moderatelyActive).toLocaleString()} {resultUnit}/day
                          </p>
                          <p className="text-gray-600 text-sm">Moderately Active</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your details and click Calculate to see your BMR and daily calorie needs.
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
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-green-600" />
                      <span>BMR & Daily Calorie Needs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* BMR Result */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-green-700 mb-2">
                          {Math.round(result.bmr).toLocaleString()} {resultUnit}/day
                        </h3>
                        <p className="text-gray-600 mb-4">Your Basal Metabolic Rate</p>
                        <p className="text-sm text-gray-700">
                          This is the number of calories your body burns at rest to maintain basic physiological
                          functions.
                        </p>
                      </div>
                    </div>

                    {/* Activity Levels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">Sedentary</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.sedentary).toLocaleString()} {resultUnit}/day
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Little or no exercise</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">Lightly Active</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.lightlyActive).toLocaleString()} {resultUnit}/day
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Light exercise 1-3 days/week</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">Moderately Active</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.moderatelyActive).toLocaleString()} {resultUnit}/day
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Moderate exercise 3-5 days/week</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">Very Active</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.veryActive).toLocaleString()} {resultUnit}/day
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Hard exercise 6-7 days/week</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">Extra Active</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.extraActive).toLocaleString()} {resultUnit}/day
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Very hard exercise, physical job</p>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-green-700 mb-6">Calculation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-700 mb-3">Formula Used</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>
                                {result.inputs.formula === "mifflin" && "Mifflin-St Jeor Equation"}
                                {result.inputs.formula === "harris" && "Revised Harris-Benedict"}
                                {result.inputs.formula === "katch" && "Katch-McArdle Formula"}
                              </strong>
                            </p>
                            {result.inputs.formula === "katch" && result.calculations.lbm && (
                              <p>Lean Body Mass: {result.calculations.lbm.toFixed(1)} kg</p>
                            )}
                            <p>Base BMR: {Math.round(result.calculations.baseBmr)} kcal/day</p>
                          </div>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                          <h4 className="font-semibold text-teal-700 mb-3">Input Summary</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Age:</strong> {result.inputs.age} years
                            </p>
                            <p>
                              <strong>Gender:</strong> {result.inputs.gender}
                            </p>
                            <p>
                              <strong>Height:</strong> {result.inputs.height.toFixed(1)} cm
                            </p>
                            <p>
                              <strong>Weight:</strong> {result.inputs.weight.toFixed(1)} kg
                            </p>
                            {result.inputs.formula === "katch" && (
                              <p>
                                <strong>Body Fat:</strong> {result.inputs.bodyFat}%
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Formula Display */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Formula Used:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        {result.inputs.formula === "mifflin" && (
                          <div className="font-mono text-xs bg-white p-2 rounded border">
                            {result.inputs.gender === "male"
                              ? "BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5"
                              : "BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161"}
                          </div>
                        )}
                        {result.inputs.formula === "harris" && (
                          <div className="font-mono text-xs bg-white p-2 rounded border">
                            {result.inputs.gender === "male"
                              ? "BMR = 66.5 + (13.75 × weight_kg) + (5.003 × height_cm) - (6.75 × age)"
                              : "BMR = 655.1 + (9.563 × weight_kg) + (1.850 × height_cm) - (4.676 × age)"}
                          </div>
                        )}
                        {result.inputs.formula === "katch" && (
                          <div className="font-mono text-xs bg-white p-2 rounded border">
                            BMR = 370 + (21.6 × LBM), where LBM = (1 - Body Fat % / 100) × Weight
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-teal-700 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Understanding BMR</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">BMR Formulas</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Mifflin-St Jeor:</strong> Most accurate for general population
                          </li>
                          <li>
                            <strong>Harris-Benedict:</strong> Older formula, still widely used
                          </li>
                          <li>
                            <strong>Katch-McArdle:</strong> Best for lean individuals with known body fat %
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">Activity Levels</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Sedentary:</strong> Desk job, no exercise (BMR × 1.2)
                          </li>
                          <li>
                            <strong>Lightly Active:</strong> Light exercise 1-3 days/week (BMR × 1.375)
                          </li>
                          <li>
                            <strong>Moderately Active:</strong> Moderate exercise 3-5 days/week (BMR × 1.55)
                          </li>
                          <li>
                            <strong>Very Active:</strong> Hard exercise 6-7 days/week (BMR × 1.725)
                          </li>
                          <li>
                            <strong>Extra Active:</strong> Very hard exercise, physical job (BMR × 1.9)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Example Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>28-year-old male, 175 cm, 70 kg</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>BMR = (10 × 70) + (6.25 × 175) - (5 × 28) + 5</p>
                          <p>BMR = 700 + 1,093.75 - 140 + 5</p>
                          <p>
                            <strong>BMR = 1,659 kcal/day</strong>
                          </p>
                          <p>
                            Moderately Active = 1,659 × 1.55 = <strong>2,571 kcal/day</strong>
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>BMR decreases with age and increases with muscle mass</li>
                          <li>These are estimates - individual metabolism varies</li>
                          <li>For weight loss, create a moderate calorie deficit</li>
                          <li>Consult healthcare providers for personalized advice</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-8">
            <CalculatorGuide data={bmrData} />
          </div>
        </main>
      </div>
    </>
  )
}
