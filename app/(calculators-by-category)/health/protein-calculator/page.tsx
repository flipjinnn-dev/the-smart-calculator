"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Zap, User, Target } from "lucide-react"
import Logo from "@/components/logo"

export default function ProteinIntakeCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [heightUnit, setHeightUnit] = useState("metric") // metric, us
  const [heightCm, setHeightCm] = useState("")
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [weightUnit, setWeightUnit] = useState("metric") // metric, us
  const [weightKg, setWeightKg] = useState("")
  const [weightLbs, setWeightLbs] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [goal, setGoal] = useState("")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const ageNum = Number.parseInt(age)
    if (!age || ageNum < 1 || ageNum > 120) {
      newErrors.age = "Please enter a valid age (1-120)"
    }

    // Height validation
    if (heightUnit === "metric") {
      const heightCmNum = Number.parseFloat(heightCm)
      if (!heightCm || heightCmNum < 50 || heightCmNum > 250) {
        newErrors.height = "Please enter a valid height (50-250 cm)"
      }
    } else {
      const heightFtNum = Number.parseInt(heightFt)
      const heightInNum = Number.parseInt(heightIn)
      if (!heightFt || heightFtNum < 2 || heightFtNum > 8) {
        newErrors.heightFt = "Please enter valid feet (2-8)"
      }
      if (!heightIn || heightInNum < 0 || heightInNum > 11) {
        newErrors.heightIn = "Please enter valid inches (0-11)"
      }
    }

    // Weight validation
    if (weightUnit === "metric") {
      const weightKgNum = Number.parseFloat(weightKg)
      if (!weightKg || weightKgNum < 20 || weightKgNum > 300) {
        newErrors.weight = "Please enter a valid weight (20-300 kg)"
      }
    } else {
      const weightLbsNum = Number.parseFloat(weightLbs)
      if (!weightLbs || weightLbsNum < 44 || weightLbsNum > 660) {
        newErrors.weight = "Please enter a valid weight (44-660 lbs)"
      }
    }

    if (!activityLevel) {
      newErrors.activityLevel = "Please select an activity level"
    }

    if (!goal) {
      newErrors.goal = "Please select a goal"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateProteinIntake = () => {
    if (!validateInputs()) return

    try {
      // Convert weight to kg
      let weightInKg = 0
      if (weightUnit === "metric") {
        weightInKg = Number.parseFloat(weightKg)
      } else {
        weightInKg = Number.parseFloat(weightLbs) * 0.4536
      }

      // Convert height to cm for BMI calculation (optional future use)
      let heightInCm = 0
      if (heightUnit === "metric") {
        heightInCm = Number.parseFloat(heightCm)
      } else {
        const ft = Number.parseInt(heightFt)
        const inches = Number.parseInt(heightIn)
        heightInCm = (ft * 12 + inches) * 2.54
      }

      // Get protein multiplier range based on activity level
      let minMultiplier = 0,
        maxMultiplier = 0
      let activityDescription = ""

      switch (activityLevel) {
        case "sedentary":
          minMultiplier = 0.8
          maxMultiplier = 0.8
          activityDescription = "Sedentary (little or no exercise)"
          break
        case "light":
          minMultiplier = 1.0
          maxMultiplier = 1.2
          activityDescription = "Light exercise (1-3 days/week)"
          break
        case "moderate":
          minMultiplier = 1.2
          maxMultiplier = 1.6
          activityDescription = "Moderate exercise (3-5 days/week)"
          break
        case "heavy":
          minMultiplier = 1.6
          maxMultiplier = 2.2
          activityDescription = "Heavy exercise (6-7 days/week)"
          break
        case "very_heavy":
          minMultiplier = 2.0
          maxMultiplier = 2.5
          activityDescription = "Very heavy exercise (twice/day or physical job)"
          break
      }

      // Adjust for goal
      let finalMultiplier = 0
      let goalDescription = ""
      let adviceNote = ""

      switch (goal) {
        case "maintenance":
          finalMultiplier = (minMultiplier + maxMultiplier) / 2 // Use midpoint
          goalDescription = "Maintenance"
          adviceNote =
            "Maintain current muscle mass and support daily activities. Spread protein intake throughout the day."
          break
        case "fat_loss":
          finalMultiplier = maxMultiplier // Use upper end
          goalDescription = "Fat Loss"
          adviceNote =
            "Higher protein helps preserve muscle during calorie deficit and increases satiety. Consider eating protein with each meal."
          break
        case "muscle_gain":
          finalMultiplier = Math.min(maxMultiplier * 1.1, 2.5) // Use maximum or slightly higher, cap at 2.5
          goalDescription = "Muscle Gain"
          adviceNote =
            "Optimal protein for muscle building. Combine with resistance training and adequate calories for best results."
          break
      }

      // Calculate protein requirement
      const proteinGrams = Math.round(weightInKg * finalMultiplier)
      const proteinRange = {
        min: Math.round(weightInKg * minMultiplier),
        max: Math.round(weightInKg * maxMultiplier),
      }

      // Calculate calories from protein (optional)
      const caloriesFromProtein = proteinGrams * 4
      const estimatedTotalCalories = weightInKg * 24 * 1.2 // Rough BMR estimate
      const proteinPercentage = Math.round((caloriesFromProtein / estimatedTotalCalories) * 100)

      const results = {
        age: Number.parseInt(age),
        gender: gender,
        weight: weightInKg,
        weightDisplay: weightUnit === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`,
        height: heightInCm,
        heightDisplay: heightUnit === "metric" ? `${heightCm} cm` : `${heightFt}'${heightIn}"`,
        activityLevel: activityDescription,
        goal: goalDescription,
        proteinGrams,
        proteinRange,
        multiplier: finalMultiplier,
        caloriesFromProtein,
        proteinPercentage,
        adviceNote,
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating protein intake. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setGender("male")
    setHeightUnit("metric")
    setHeightCm("")
    setHeightFt("")
    setHeightIn("")
    setWeightUnit("metric")
    setWeightKg("")
    setWeightLbs("")
    setActivityLevel("")
    setGoal("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Protein Intake Calculator - Daily Protein Requirement Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate your daily protein requirement based on age, weight, activity level, and fitness goals. Professional nutrition calculator for optimal protein intake."
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
                  <p className="text-sm text-gray-500">Protein Intake Calculator</p>
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
              <span className="text-gray-900 font-medium">Protein Intake Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Protein Intake Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your optimal daily protein requirement based on your activity level, fitness goals, and body
                composition. Get personalized recommendations for muscle building, fat loss, or maintenance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>Protein Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details to calculate your optimal daily protein intake
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Age and Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Age (years) *</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-green-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="30"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              min="1"
                              max="120"
                            />
                          </div>
                          {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Gender *</Label>
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
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">Height *</Label>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => setHeightUnit("metric")}
                              className={`px-3 py-1 text-xs rounded ${
                                heightUnit === "metric"
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              Metric
                            </button>
                            <button
                              type="button"
                              onClick={() => setHeightUnit("us")}
                              className={`px-3 py-1 text-xs rounded ${
                                heightUnit === "us"
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              US
                            </button>
                          </div>
                        </div>

                        {heightUnit === "metric" ? (
                          <div className="relative">
                            <Input
                              className={`h-12 ${errors.height ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="175"
                              value={heightCm}
                              onChange={(e) => setHeightCm(e.target.value)}
                              min="50"
                              max="250"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              cm
                            </span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Input
                                className={`h-12 ${errors.heightFt ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="5"
                                value={heightFt}
                                onChange={(e) => setHeightFt(e.target.value)}
                                min="2"
                                max="8"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                ft
                              </span>
                            </div>
                            <div className="relative">
                              <Input
                                className={`h-12 ${errors.heightIn ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="9"
                                value={heightIn}
                                onChange={(e) => setHeightIn(e.target.value)}
                                min="0"
                                max="11"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                in
                              </span>
                            </div>
                          </div>
                        )}
                        {(errors.height || errors.heightFt || errors.heightIn) && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.height || errors.heightFt || errors.heightIn}
                          </p>
                        )}
                      </div>

                      {/* Weight */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">Weight *</Label>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => setWeightUnit("metric")}
                              className={`px-3 py-1 text-xs rounded ${
                                weightUnit === "metric"
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              Metric
                            </button>
                            <button
                              type="button"
                              onClick={() => setWeightUnit("us")}
                              className={`px-3 py-1 text-xs rounded ${
                                weightUnit === "us"
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              US
                            </button>
                          </div>
                        </div>

                        <div className="relative">
                          {weightUnit === "metric" ? (
                            <>
                              <Input
                                className={`h-12 ${errors.weight ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="70"
                                value={weightKg}
                                onChange={(e) => setWeightKg(e.target.value)}
                                min="20"
                                max="300"
                                step="0.1"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                kg
                              </span>
                            </>
                          ) : (
                            <>
                              <Input
                                className={`h-12 ${errors.weight ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="154"
                                value={weightLbs}
                                onChange={(e) => setWeightLbs(e.target.value)}
                                min="44"
                                max="660"
                                step="0.1"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                lbs
                              </span>
                            </>
                          )}
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>

                      {/* Activity Level */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Activity Level *</Label>
                        <Select value={activityLevel} onValueChange={setActivityLevel}>
                          <SelectTrigger className={`h-12 ${errors.activityLevel ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                            <SelectItem value="light">Light exercise (1-3 days/week)</SelectItem>
                            <SelectItem value="moderate">Moderate exercise (3-5 days/week)</SelectItem>
                            <SelectItem value="heavy">Heavy exercise (6-7 days/week)</SelectItem>
                            <SelectItem value="very_heavy">Very heavy exercise (twice/day or physical job)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.activityLevel && <p className="text-red-600 text-xs mt-1">{errors.activityLevel}</p>}
                      </div>

                      {/* Goal */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Goal *</Label>
                        <Select value={goal} onValueChange={setGoal}>
                          <SelectTrigger className={`h-12 ${errors.goal ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your fitness goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Maintenance (maintain current weight/muscle)</SelectItem>
                            <SelectItem value="fat_loss">Fat Loss (lose weight while preserving muscle)</SelectItem>
                            <SelectItem value="muscle_gain">Muscle Gain (build muscle mass)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.goal && <p className="text-red-600 text-xs mt-1">{errors.goal}</p>}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateProteinIntake}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        Calculate Protein
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
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Daily Protein</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-green-200">
                          <p className="text-3xl font-bold text-green-900 mb-2">{result.proteinGrams}g</p>
                          <p className="text-sm font-medium text-gray-600">per day</p>
                          <p className="text-sm text-gray-500 mt-2">{result.goal}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Zap className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your details to calculate your optimal daily protein intake.
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
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="w-6 h-6 text-green-600" />
                      <span>Protein Intake Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <h3 className="text-3xl font-bold text-green-700 mb-2">{result.proteinGrams}g per day</h3>
                        <p className="text-lg text-gray-600 mb-4">Recommended Daily Protein Intake</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Weight</p>
                            <p className="font-semibold text-gray-700">{result.weightDisplay}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Activity</p>
                            <p className="font-semibold text-gray-700">{result.activityLevel.split(" ")[0]}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Goal</p>
                            <p className="font-semibold text-gray-700">{result.goal}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Multiplier</p>
                            <p className="font-semibold text-gray-700">{result.multiplier.toFixed(1)}g/kg</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3">Calculation Breakdown</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Body Weight:</strong> {result.weight.toFixed(1)} kg
                          </p>
                          <p>
                            <strong>Protein Multiplier:</strong> {result.multiplier.toFixed(1)} g/kg
                          </p>
                          <p>
                            <strong>Daily Protein:</strong> {result.weight.toFixed(1)} × {result.multiplier.toFixed(1)}{" "}
                            = {result.proteinGrams}g
                          </p>
                          <p>
                            <strong>Activity Range:</strong> {result.proteinRange.min}-{result.proteinRange.max}g
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <h4 className="font-semibold text-emerald-700 mb-3">Nutritional Info</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Calories from Protein:</strong> {result.caloriesFromProtein} kcal
                          </p>
                          <p>
                            <strong>Estimated % of Total Calories:</strong> ~{result.proteinPercentage}%
                          </p>
                          <p>
                            <strong>Protein per Meal (3 meals):</strong> ~{Math.round(result.proteinGrams / 3)}g
                          </p>
                          <p>
                            <strong>Protein per Meal (4 meals):</strong> ~{Math.round(result.proteinGrams / 4)}g
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Advice Note */}
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-3">Personalized Advice</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{result.adviceNote}</p>
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
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    About Protein Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Protein Multipliers by Activity</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Sedentary:</strong> 0.8 g/kg - Basic maintenance
                          </li>
                          <li>
                            <strong>Light Exercise:</strong> 1.0-1.2 g/kg - Recreational activity
                          </li>
                          <li>
                            <strong>Moderate Exercise:</strong> 1.2-1.6 g/kg - Regular training
                          </li>
                          <li>
                            <strong>Heavy Exercise:</strong> 1.6-2.2 g/kg - Intense training
                          </li>
                          <li>
                            <strong>Very Heavy/Athletes:</strong> 2.0-2.5 g/kg - Elite performance
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">Goal Adjustments</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Maintenance:</strong> Midpoint of activity range
                          </li>
                          <li>
                            <strong>Fat Loss:</strong> Upper end to preserve muscle
                          </li>
                          <li>
                            <strong>Muscle Gain:</strong> Maximum intake for growth
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">High-Quality Protein Sources</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Food</th>
                              <th className="text-left py-2">Protein/100g</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">Chicken breast</td>
                              <td>31g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Greek yogurt</td>
                              <td>10g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Eggs</td>
                              <td>13g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Salmon</td>
                              <td>25g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Lentils</td>
                              <td>9g</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Spread protein intake throughout the day</li>
                          <li>Combine with resistance training for muscle gain</li>
                          <li>Individual needs may vary based on genetics</li>
                          <li>Consult a nutritionist for personalized advice</li>
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
