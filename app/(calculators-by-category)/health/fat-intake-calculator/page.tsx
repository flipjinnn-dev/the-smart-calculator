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
import { Calculator, RotateCcw, Droplets, User, Target } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import fatIntakeData from "@/app/content/fat-intake-calculator.json"

export default function FatIntakeCalculator() {
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

  const calculateFatIntake = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return

    try {
      // Convert weight to kg
      let weightInKg = 0
      if (weightUnit === "metric") {
        weightInKg = Number.parseFloat(weightKg)
      } else {
        weightInKg = Number.parseFloat(weightLbs) * 0.4536
      }

      // Convert height to cm
      let heightInCm = 0
      if (heightUnit === "metric") {
        heightInCm = Number.parseFloat(heightCm)
      } else {
        const ft = Number.parseInt(heightFt)
        const inches = Number.parseInt(heightIn)
        heightInCm = (ft * 12 + inches) * 2.54
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

      // Get activity multiplier
      let activityMultiplier = 1.2
      let activityDescription = ""

      switch (activityLevel) {
        case "sedentary":
          activityMultiplier = 1.2
          activityDescription = "Sedentary (little/no exercise)"
          break
        case "light":
          activityMultiplier = 1.375
          activityDescription = "Light (1-3×/week)"
          break
        case "moderate":
          activityMultiplier = 1.55
          activityDescription = "Moderate (4-5×/week)"
          break
        case "active":
          activityMultiplier = 1.725
          activityDescription = "Active (daily or intense 3-4×/week)"
          break
        case "very_active":
          activityMultiplier = 1.9
          activityDescription = "Very Active (intense 6-7×/week)"
          break
        case "extra_active":
          activityMultiplier = 2.0
          activityDescription = "Extra Active (very intense or physical job)"
          break
      }

      // Calculate TDEE (maintenance calories)
      const tdee = Math.round(bmr * activityMultiplier)

      // Create calorie targets
      const calorieTargets = [
        { goal: "Lose 1 kg/week", calories: tdee - 1000 },
        { goal: "Lose 0.5 kg/week", calories: tdee - 500 },
        { goal: "Maintain weight", calories: tdee },
        { goal: "Gain 0.5 kg/week", calories: tdee + 500 },
        { goal: "Gain 1 kg/week", calories: tdee + 1000 },
      ]

      // Calculate fat intake for each target
      const fatResults = calorieTargets.map((target) => {
        const fatMinGrams = Math.round((target.calories * 0.2) / 9) // 20% of calories
        const fatMaxGrams = Math.round((target.calories * 0.35) / 9) // 35% of calories
        const satFatLimit10 = Math.round((target.calories * 0.1) / 9) // 10% limit
        const satFatLimit7 = Math.round((target.calories * 0.07) / 9) // 7% limit

        return {
          ...target,
          fatMinGrams,
          fatMaxGrams,
          satFatLimit10,
          satFatLimit7,
        }
      })

      const results = {
        age: ageNum,
        gender: gender,
        weight: weightInKg,
        weightDisplay: weightUnit === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`,
        height: heightInCm,
        heightDisplay: heightUnit === "metric" ? `${heightCm} cm` : `${heightFt}'${heightIn}"`,
        activityLevel: activityDescription,
        formula: formula === "mifflin" ? "Mifflin-St Jeor" : "Katch-McArdle",
        bmr: Math.round(bmr),
        tdee,
        fatResults,
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating fat intake. Please check your inputs and try again." })
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
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
<SEO
  title="Fat Intake Calculator – Daily Nutrition Tracker"
  description="Calculate your recommended daily fat intake. Use our free fat intake calculator to balance diet and support health."
  keywords="fat intake calculator, daily fat needs, nutrition calculator"
  slug="/health/fat-intake-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Fat Intake Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-orange-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-orange-600">
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Fat Intake Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fat Intake Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your optimal daily fat intake based on your calorie needs, activity level, and weight goals.
                Get personalized recommendations for healthy fat consumption and saturated fat limits.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>Fat Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details to calculate your optimal daily fat intake
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
                              <User className="h-5 w-5 text-orange-500" />
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
                                  ? "bg-orange-600 text-white"
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
                                  ? "bg-orange-600 text-white"
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
                                  ? "bg-orange-600 text-white"
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
                                  ? "bg-orange-600 text-white"
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
                            <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                            <SelectItem value="light">Light (1–3×/week)</SelectItem>
                            <SelectItem value="moderate">Moderate (4–5×/week)</SelectItem>
                            <SelectItem value="active">Active (daily or intense 3–4×/week)</SelectItem>
                            <SelectItem value="very_active">Very Active (intense 6–7×/week)</SelectItem>
                            <SelectItem value="extra_active">Extra Active (very intense or physical job)</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.activityLevel && <p className="text-red-600 text-xs mt-1">{errors.activityLevel}</p>}
                      </div>

                      {/* Formula Selection */}
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
                              Katch-McArdle (if body fat % known)
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
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateFatIntake}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                      >
                        Calculate Fat Intake
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center mb-3 shadow-lg">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">Daily Fat Range</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-orange-200">
                          <p className="text-2xl font-bold text-orange-900 mb-2">
                            {result.fatResults[2].fatMinGrams}-{result.fatResults[2].fatMaxGrams}g
                          </p>
                          <p className="text-sm font-medium text-gray-600">per day</p>
                          <p className="text-sm text-gray-500 mt-2">Maintenance</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Droplets className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your details to calculate your optimal daily fat intake.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="w-6 h-6 text-orange-600" />
                      <span>Fat Intake Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Results Table */}
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full border-collapse border border-orange-200 rounded-lg">
                        <thead>
                          <tr className="bg-gradient-to-r from-orange-50 to-amber-50">
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">
                              Goal
                            </th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">
                              Daily Calories
                            </th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">
                              Fat Range (20-35%)
                            </th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">
                              Sat Fat Limit (&lt;10%)
                            </th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">
                              Sat Fat Limit (&lt;7%)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.fatResults.map((row: any, index: number) => (
                            <tr key={index} className={index === 2 ? "bg-orange-50" : ""}>
                              <td className="border border-orange-200 p-3 font-medium">{row.goal}</td>
                              <td className="border border-orange-200 p-3">{row.calories} kcal</td>
                              <td className="border border-orange-200 p-3 font-semibold text-orange-700">
                                {row.fatMinGrams}-{row.fatMaxGrams}g
                              </td>
                              <td className="border border-orange-200 p-3">&lt;{row.satFatLimit10}g</td>
                              <td className="border border-orange-200 p-3">&lt;{row.satFatLimit7}g</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Calculation Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-700 mb-3">Calculation Details</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>BMR Formula:</strong> {result.formula}
                          </p>
                          <p>
                            <strong>BMR:</strong> {result.bmr} kcal/day
                          </p>
                          <p>
                            <strong>Activity Level:</strong> {result.activityLevel}
                          </p>
                          <p>
                            <strong>TDEE (Maintenance):</strong> {result.tdee} kcal/day
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <h4 className="font-semibold text-amber-700 mb-3">Your Profile</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Age:</strong> {result.age} years
                          </p>
                          <p>
                            <strong>Gender:</strong> {result.gender}
                          </p>
                          <p>
                            <strong>Height:</strong> {result.heightDisplay}
                          </p>
                          <p>
                            <strong>Weight:</strong> {result.weightDisplay}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-6 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-700 mb-3">Important Notes</h4>
                      <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                        <li>Fat provides 9 kcal per gram.</li>
                        <li>Healthy range: 20–35% of daily calories.</li>
                        <li>Saturated fat should be kept below 10% (or 7% for heart disease risk).</li>
                        <li>Individual needs may vary depending on health conditions and goals.</li>
                        <li>Focus on healthy fats from nuts, seeds, fish, and olive oil.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center mr-3 shadow-lg">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                    About Fat Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Types of Dietary Fat</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Monounsaturated:</strong> Olive oil, avocados, nuts
                          </li>
                          <li>
                            <strong>Polyunsaturated:</strong> Fish, walnuts, flaxseeds
                          </li>
                          <li>
                            <strong>Saturated:</strong> Meat, dairy, coconut oil (limit)
                          </li>
                          <li>
                            <strong>Trans fats:</strong> Processed foods (avoid)
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Health Benefits</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Essential for vitamin absorption (A, D, E, K)</li>
                          <li>Supports brain and nervous system function</li>
                          <li>Provides essential fatty acids</li>
                          <li>Helps maintain healthy skin and hair</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-amber-700 mb-3">Healthy Fat Sources</h3>
                      <div className="bg-white p-4 rounded-lg border border-amber-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Food</th>
                              <th className="text-left py-2">Fat/100g</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">Olive oil</td>
                              <td>100g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Avocado</td>
                              <td>15g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Almonds</td>
                              <td>49g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Salmon</td>
                              <td>13g</td>
                            </tr>
                            <tr>
                              <td className="py-1">Walnuts</td>
                              <td>65g</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-amber-700 mb-3">Guidelines</h3>
                      <div className="bg-white p-4 rounded-lg border border-amber-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Choose unsaturated fats over saturated</li>
                          <li>Include omega-3 fatty acids regularly</li>
                          <li>Limit processed and fried foods</li>
                          <li>Read nutrition labels carefully</li>
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
              <CalculatorGuide data={fatIntakeData} />
          </div>
        </main>
      </div>
    </>
  )
}
