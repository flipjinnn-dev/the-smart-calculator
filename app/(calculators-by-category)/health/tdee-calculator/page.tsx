"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Calculator, RotateCcw, Zap, User, Activity } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

export default function TDEECalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
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
  const [bodyFat, setBodyFat] = useState("")
  const [formula, setFormula] = useState("mifflin") // mifflin, katch
  const [resultUnit, setResultUnit] = useState("calories") // calories, kilojoules

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const ageNum = Number.parseInt(age)
    if (!age || ageNum < 18 || ageNum > 80) {
      newErrors.age = "Please enter a valid age (18-80)"
    }

    // Height validation
    if (heightUnit === "metric") {
      const heightCmNum = Number.parseFloat(heightCm)
      if (!heightCm || heightCmNum < 100 || heightCmNum > 250) {
        newErrors.height = "Please enter a valid height (100-250 cm)"
      }
    } else {
      const heightFtNum = Number.parseInt(heightFt)
      const heightInNum = Number.parseInt(heightIn)
      if (!heightFt || heightFtNum < 3 || heightFtNum > 8) {
        newErrors.heightFt = "Please enter valid feet (3-8)"
      }
      if (!heightIn || heightInNum < 0 || heightInNum > 11) {
        newErrors.heightIn = "Please enter valid inches (0-11)"
      }
    }

    // Weight validation
    if (weightUnit === "metric") {
      const weightKgNum = Number.parseFloat(weightKg)
      if (!weightKg || weightKgNum < 30 || weightKgNum > 300) {
        newErrors.weight = "Please enter a valid weight (30-300 kg)"
      }
    } else {
      const weightLbsNum = Number.parseFloat(weightLbs)
      if (!weightLbs || weightLbsNum < 66 || weightLbsNum > 660) {
        newErrors.weight = "Please enter a valid weight (66-660 lbs)"
      }
    }

    if (!activityLevel) {
      newErrors.activityLevel = "Please select an activity level"
    }

    // Body fat validation (optional)
    if (bodyFat && formula === "katch") {
      const bodyFatNum = Number.parseFloat(bodyFat)
      if (bodyFatNum < 5 || bodyFatNum > 50) {
        newErrors.bodyFat = "Please enter a valid body fat percentage (5-50%)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateTDEE = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    if (!validateInputs()) return

    try {
      // Convert weight to kg
      let weightInKg = 0
      if (weightUnit === "metric") {
        weightInKg = Number.parseFloat(weightKg)
      } else {
        weightInKg = Number.parseFloat(weightLbs) * 0.453592
      }

      // Convert height to cm
      let heightInCm = 0
      if (heightUnit === "metric") {
        heightInCm = Number.parseFloat(heightCm)
      } else {
        const ft = Number.parseInt(heightFt)
        const inches = Number.parseInt(heightIn)
        heightInCm = ft * 30.48 + inches * 2.54
      }

      const ageNum = Number.parseInt(age)

      // Calculate BMR
      let bmr = 0
      if (formula === "mifflin") {
        // Mifflin-St Jeor
        if (gender === "male") {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum + 5
        } else {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum - 161
        }
      } else {
        // Katch-McArdle (requires body fat %)
        const bodyFatPercent = Number.parseFloat(bodyFat) / 100
        const lbm = weightInKg * (1 - bodyFatPercent)
        bmr = 370 + 21.6 * lbm
      }

      // Get activity multiplier and protein requirement
      let activityMultiplier = 1.2
      let activityDescription = ""
      let proteinPerKg = 0.8 // Default protein requirement

      switch (activityLevel) {
        case "sedentary":
          activityMultiplier = 1.2
          activityDescription = "Sedentary (little/no exercise)"
          proteinPerKg = 0.8
          break
        case "light":
          activityMultiplier = 1.375
          activityDescription = "Light (exercise 1-3×/week)"
          proteinPerKg = 1.0
          break
        case "moderate":
          activityMultiplier = 1.55
          activityDescription = "Moderate (exercise 4-5×/week)"
          proteinPerKg = 1.6
          break
        case "active":
          activityMultiplier = 1.725
          activityDescription = "Active (daily or intense 3-4×/week)"
          proteinPerKg = 1.6
          break
        case "very_active":
          activityMultiplier = 1.9
          activityDescription = "Very Active (intense 6-7×/week)"
          proteinPerKg = 2.2
          break
        case "extra_active":
          activityMultiplier = 2.0
          activityDescription = "Extra Active (very intense exercise daily / physical job)"
          proteinPerKg = 2.5
          break
      }

      // Calculate TDEE
      const tdeeCalories = Math.round(bmr * activityMultiplier)
      const tdeeKilojoules = Math.round(tdeeCalories * 4.184)

      const proteinGrams = Math.round(weightInKg * proteinPerKg)
      const proteinCalories = proteinGrams * 4
      const proteinPercentage = Math.round((proteinCalories / tdeeCalories) * 100)

      const heightInM = heightInCm / 100
      const bmi = Number.parseFloat((weightInKg / (heightInM * heightInM)).toFixed(1))

      let bmiCategory = ""
      if (bmi < 18.5) {
        bmiCategory = "Underweight"
      } else if (bmi < 25) {
        bmiCategory = "Normal"
      } else if (bmi < 30) {
        bmiCategory = "Overweight"
      } else {
        bmiCategory = "Obese"
      }

      const calorieGoals = {
        mildWeightLoss: Math.round(tdeeCalories * 0.9),
        weightLoss: Math.round(tdeeCalories * 0.81),
        extremeWeightLoss: Math.round(tdeeCalories * 0.61),
        mildWeightGain: Math.round(tdeeCalories * 1.1),
        weightGain: Math.round(tdeeCalories * 1.19),
        fastWeightGain: Math.round(tdeeCalories * 1.39),
      }

      const results = {
        age: ageNum,
        gender: gender,
        weight: weightInKg,
        weightDisplay: weightUnit === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`,
        height: heightInCm,
        heightDisplay: heightUnit === "metric" ? `${heightCm} cm` : `${heightFt}'${heightIn}"`,
        activityLevel: activityDescription,
        activityMultiplier,
        formula: formula === "mifflin" ? "Mifflin-St Jeor" : "Katch-McArdle",
        bmr: Math.round(bmr),
        tdeeCalories,
        tdeeKilojoules,
        resultUnit,
        proteinGrams,
        proteinPercentage,
        bmi,
        bmiCategory,
        calorieGoals,
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating TDEE. Please check your inputs and try again." })
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
    setBodyFat("")
    setFormula("mifflin")
    setResultUnit("calories")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
<SEO
  title="TDEE Calculator – Total Daily Energy Needs"
  description="Find your daily calorie burn with our TDEE calculator. Plan diet, workouts, and weight goals with accurate energy estimates."
  keywords="TDEE calculator, daily energy expenditure, calorie burn calculator"
  slug="/health/tdee-calculator"
/>
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
                  <p className="text-sm text-gray-500">TDEE Calculator</p>
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
              <span className="text-gray-900 font-medium">TDEE Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">TDEE Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your Total Daily Energy Expenditure (TDEE) to determine how many calories you burn per day
                including your activity level. Essential for weight management and nutrition planning.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>TDEE Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details to calculate your Total Daily Energy Expenditure
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
                              <User className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="30"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              min="18"
                              max="80"
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
                                  ? "bg-blue-600 text-white"
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
                                  ? "bg-blue-600 text-white"
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
                              min="100"
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
                                min="3"
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
                                  ? "bg-blue-600 text-white"
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
                                  ? "bg-blue-600 text-white"
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
                                min="30"
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
                                min="66"
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
                            <SelectItem value="sedentary">Sedentary (little/no exercise) - 1.2</SelectItem>
                            <SelectItem value="light">Light (exercise 1-3×/week) - 1.375</SelectItem>
                            <SelectItem value="moderate">Moderate (exercise 4-5×/week) - 1.55</SelectItem>
                            <SelectItem value="active">Active (daily or intense 3-4×/week) - 1.725</SelectItem>
                            <SelectItem value="very_active">Very Active (intense 6-7×/week) - 1.9</SelectItem>
                            <SelectItem value="extra_active">
                              Extra Active (very intense daily + physical job) - 2.0
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.activityLevel && <p className="text-red-600 text-xs mt-1">{errors.activityLevel}</p>}
                      </div>

                      {/* BMR Formula Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">BMR Formula</Label>
                        <RadioGroup value={formula} onValueChange={setFormula} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mifflin" id="mifflin" />
                            <Label htmlFor="mifflin" className="cursor-pointer">
                              Mifflin-St Jeor (default)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="katch" id="katch" />
                            <Label htmlFor="katch" className="cursor-pointer">
                              Katch-McArdle (if body fat % available)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Body Fat % (conditional) */}
                      {formula === "katch" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Body Fat % *</Label>
                          <div className="relative">
                            <Input
                              className={`h-12 ${errors.bodyFat ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="15"
                              value={bodyFat}
                              onChange={(e) => setBodyFat(e.target.value)}
                              min="5"
                              max="50"
                              step="0.1"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              %
                            </span>
                          </div>
                          {errors.bodyFat && <p className="text-red-600 text-xs mt-1">{errors.bodyFat}</p>}
                        </div>
                      )}

                      {/* Result Unit */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Result Unit</Label>
                        <RadioGroup value={resultUnit} onValueChange={setResultUnit} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="calories" id="calories" />
                            <Label htmlFor="calories" className="cursor-pointer">
                              Calories
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kilojoules" id="kilojoules" />
                            <Label htmlFor="kilojoules" className="cursor-pointer">
                              Kilojoules
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateTDEE}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        Calculate TDEE
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
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Daily Energy</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-blue-200">
                          <p className="text-2xl font-bold text-blue-900 mb-2">
                            {resultUnit === "calories" ? `${result.tdeeCalories}` : `${result.tdeeKilojoules}`}
                          </p>
                          <p className="text-sm font-medium text-gray-600">
                            {resultUnit === "calories" ? "kcal/day" : "kJ/day"}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">TDEE</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Zap className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your details to calculate your Total Daily Energy Expenditure.
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
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <span>Comprehensive Nutrition Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200 mb-6">
                      <div className="space-y-4 text-gray-800">
                        <div>
                          <p className="text-lg font-semibold text-blue-700 mb-2">
                            Daily Protein Requirement: {result.proteinGrams} g
                          </p>
                          <p className="text-sm text-gray-600">
                            Percentage of total calories from protein: ~{result.proteinPercentage}%
                          </p>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-lg font-semibold text-blue-700 mb-2">
                            The estimated TDEE (maintenance energy): {result.tdeeCalories.toLocaleString()} Calories/day
                          </p>
                          <p className="text-sm text-gray-600">BMR: {result.bmr.toLocaleString()} Calories/day</p>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-lg font-semibold text-blue-700 mb-2">
                            BMI Score: {result.bmi} kg/m² ({result.bmiCategory})
                          </p>
                          <p className="text-sm text-gray-600">Healthy BMI Range: 18.5 – 25 kg/m²</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-4 text-lg">Energy intake to lose weight:</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Mild weight loss (0.25 kg/week):</span>
                            <span className="font-semibold text-red-700">
                              {result.calorieGoals.mildWeightLoss.toLocaleString()} (90%) Calories/day
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Weight loss (0.5 kg/week):</span>
                            <span className="font-semibold text-red-700">
                              {result.calorieGoals.weightLoss.toLocaleString()} (81%) Calories/day
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Extreme weight loss (1 kg/week):</span>
                            <span className="font-semibold text-red-700">
                              {result.calorieGoals.extremeWeightLoss.toLocaleString()} (61%) Calories/day
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-4 text-lg">Energy intake to gain weight:</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Mild weight gain (0.25 kg/week):</span>
                            <span className="font-semibold text-green-700">
                              {result.calorieGoals.mildWeightGain.toLocaleString()} (110%) Calories/day
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Weight gain (0.5 kg/week):</span>
                            <span className="font-semibold text-green-700">
                              {result.calorieGoals.weightGain.toLocaleString()} (119%) Calories/day
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Fast weight gain (1 kg/week):</span>
                            <span className="font-semibold text-green-700">
                              {result.calorieGoals.fastWeightGain.toLocaleString()} (139%) Calories/day
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg border border-blue-200 mt-6">
                      <h4 className="font-semibold text-blue-700 mb-3">Understanding Your Comprehensive Results</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                        <div>
                          <p className="mb-2">
                            <strong>Protein Requirements:</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Sedentary: ~0.8 g/kg body weight</li>
                            <li>Light/Moderate: ~1.0–1.6 g/kg</li>
                            <li>Heavy training: ~1.6–2.2 g/kg</li>
                            <li>Athletes/Muscle gain: up to ~2.5 g/kg</li>
                          </ul>
                        </div>
                        <div>
                          <p className="mb-2">
                            <strong>Weight Management:</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Safe weight loss: 0.25-0.5 kg per week</li>
                            <li>Extreme loss (1 kg/week) requires medical supervision</li>
                            <li>Gradual weight gain prevents excess fat accumulation</li>
                            <li>Monitor progress and adjust as needed</li>
                          </ul>
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
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">About TDEE</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">BMR Formulas</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Mifflin-St Jeor (Recommended):</strong>
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                          <li>Men: BMR = 10×weight + 6.25×height - 5×age + 5</li>
                          <li>Women: BMR = 10×weight + 6.25×height - 5×age - 161</li>
                        </ul>
                        <p className="text-sm text-gray-700 mt-2 mb-2">
                          <strong>Katch-McArdle:</strong>
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                          <li>BMR = 370 + (21.6 × Lean Body Mass)</li>
                          <li>More accurate if body fat % is known</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Activity Multipliers</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>1.2:</strong> Sedentary (desk job, no exercise)
                          </li>
                          <li>
                            <strong>1.375:</strong> Light (exercise 1-3×/week)
                          </li>
                          <li>
                            <strong>1.55:</strong> Moderate (exercise 4-5×/week)
                          </li>
                          <li>
                            <strong>1.725:</strong> Active (daily exercise or intense 3-4×/week)
                          </li>
                          <li>
                            <strong>1.9:</strong> Very Active (intense exercise 6-7×/week)
                          </li>
                          <li>
                            <strong>2.0:</strong> Extra Active (very intense daily + physical job)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">Using Your TDEE</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Weight Loss:</strong> Eat 300-500 calories below TDEE
                          </li>
                          <li>
                            <strong>Weight Maintenance:</strong> Eat at your TDEE
                          </li>
                          <li>
                            <strong>Weight Gain:</strong> Eat 300-500 calories above TDEE
                          </li>
                          <li>
                            <strong>Muscle Building:</strong> Eat 200-300 calories above TDEE
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>TDEE is an estimate - monitor and adjust based on results</li>
                          <li>Muscle mass significantly affects metabolic rate</li>
                          <li>Age, genetics, and hormones influence actual needs</li>
                          <li>Recalculate as weight and activity levels change</li>
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
