"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { Calculator, Heart, User, Ruler, Weight, Activity, Target, Utensils, Calendar, Scale } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Logo from "@/components/logo"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Macro Calculator",
  description:
    "Calculate your daily macronutrient needs based on your goals, activity level, and body composition using accurate BMR formulas.",
  url: "https://www.thesmartcalculator.com/health/macro-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Macronutrient calculation",
    "BMR estimation using Mifflin-St Jeor",
    "Activity level adjustments",
    "Goal-based calorie modifications",
    "Multiple unit systems",
    "Macro ratio presets",
  ],
}

interface MacroResults {
  calories: number
  kilojoules: number
  protein: number
  proteinRange: [number, number]
  carbs: number
  carbRange: [number, number]
  fat: number
  fatRange: [number, number]
  sugar: number
  saturatedFat: number
  bmr: number
  tdee: number
}

export default function MacroCalculator() {
  const [unitSystem, setUnitSystem] = useState<"us" | "metric" | "other">("metric")
  const [age, setAge] = useState("25")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [heightFeet, setHeightFeet] = useState("5")
  const [heightInches, setHeightInches] = useState("10")
  const [heightCm, setHeightCm] = useState("178")
  const [weightLbs, setWeightLbs] = useState("165")
  const [weightKg, setWeightKg] = useState("75")
  const [activity, setActivity] = useState("moderate")
  const [goal, setGoal] = useState("maintain")
  const [bmrFormula, setBmrFormula] = useState("mifflin")
  const [bodyFatPercentage, setBodyFatPercentage] = useState("")
  const [results, setResults] = useState<MacroResults | null>(null)

  // 1. Macro Presets
  const macroPresets = {
    balanced: { label: "Balanced", protein: 0.25, carbs: 0.45, fat: 0.3 },
    lowFat: { label: "Low Fat", protein: 0.25, carbs: 0.6, fat: 0.15 },
    lowCarb: { label: "Low Carb", protein: 0.3, carbs: 0.2, fat: 0.5 },
    highProtein: { label: "High Protein", protein: 0.4, carbs: 0.3, fat: 0.3 },
  }
  const macroPresetKeys = ["balanced", "lowFat", "lowCarb", "highProtein"] as (keyof typeof macroPresets)[]

  // 2. State for selected preset and custom plan
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof macroPresets | "custom">("balanced")
  const [customMacros, setCustomMacros] = useState({ protein: 25, carbs: 50, fat: 25 })
  const [customError, setCustomError] = useState("")
  const [allResults, setAllResults] = useState<any>(null)

  // Auto-calculate on page load with default values
  useEffect(() => {
    if (age && gender && heightCm && weightKg) {
      // Small delay to ensure all state is set
      setTimeout(() => {
        calculateAllMacros()
      }, 100)
    }
  }, [])

  // Removed the useEffect that recalculates on every input change

  const activityLevels = {
    bmr: { label: "Basal Metabolic Rate (BMR)", multiplier: 1.0 },
    sedentary: { label: "Sedentary: little or no exercise", multiplier: 1.2 },
    light: { label: "Light: exercise 1-3 times/week", multiplier: 1.375 },
    moderate: { label: "Moderate: exercise 4-5 times/week", multiplier: 1.55 },
    active: { label: "Active: daily exercise or intense exercise 3-4 times/week", multiplier: 1.725 },
    veryActive: { label: "Very Active: intense exercise 6-7 times/week", multiplier: 1.9 },
    extraActive: { label: "Extra Active: very intense exercise daily, or physical job", multiplier: 2.2 },
  }

  const goals = {
    maintain: { label: "Maintain weight", adjustment: 0 },
    mildLoss: { label: "Mild weight loss of 0.5 lb (0.25 kg) per week", adjustment: -250 },
    weightLoss: { label: "Weight loss of 1 lb (0.5 kg) per week", adjustment: -500 },
    extremeLoss: { label: "Extreme weight loss of 2 lb (1 kg) per week", adjustment: -1000 },
    mildGain: { label: "Mild weight gain of 0.5 lb (0.25 kg) per week", adjustment: 250 },
    weightGain: { label: "Weight gain of 1 lb (0.5 kg) per week", adjustment: 500 },
    extremeGain: { label: "Extreme weight gain of 2 lb (1 kg) per week", adjustment: 1000 },
  }

  // 3. Calculation logic for all presets and custom
  const calculateAllMacros = () => {
    // Convert to metric for calculations
    const weightKgValue = unitSystem === "us" ? Number.parseFloat(weightLbs) * 0.453592 : Number.parseFloat(weightKg)
    const heightCmValue = unitSystem === "us" ? (Number.parseFloat(heightFeet) * 12 + Number.parseFloat(heightInches)) * 2.54 : Number.parseFloat(heightCm)
    const ageNum = Number.parseFloat(age)

    if (weightKgValue <= 0 || heightCmValue <= 0 || ageNum <= 0) return

    let bmr: number
    if (bmrFormula === "mifflin") {
      // Mifflin-St Jeor Equation
      if (gender === "male") {
        bmr = 10 * weightKgValue + 6.25 * heightCmValue - 5 * ageNum + 5
      } else {
        bmr = 10 * weightKgValue + 6.25 * heightCmValue - 5 * ageNum - 161
      }
    } else {
      // Katch-McArdle Formula (requires body fat percentage)
      const bodyFat = Number.parseFloat(bodyFatPercentage) || 15 // default 15% if not provided
      const leanBodyMass = weightKgValue * (1 - bodyFat / 100)
      bmr = 370 + 21.6 * leanBodyMass
    }

    // Calculate TDEE
    const tdee = bmr * activityLevels[activity as keyof typeof activityLevels].multiplier

    // Adjust for goal
    const targetCalories = tdee + goals[goal as keyof typeof goals].adjustment

    // Helper to calculate macro results for a given ratio
    function getMacroResult(ratios: { protein: number; carbs: number; fat: number }) {
      const proteinCalories = targetCalories * ratios.protein
      const carbCalories = targetCalories * ratios.carbs
      const fatCalories = targetCalories * ratios.fat
      const proteinGrams = proteinCalories / 4
      const carbGrams = carbCalories / 4
      const fatGrams = fatCalories / 9
      const proteinRange: [number, number] = [Math.round(proteinGrams * 0.9), Math.round(proteinGrams * 1.1)]
      const carbRange: [number, number] = [Math.round(carbGrams * 0.9), Math.round(carbGrams * 1.1)]
      const fatRange: [number, number] = [Math.round(fatGrams * 0.9), Math.round(fatGrams * 1.1)]
      const sugarLimit = Math.round((targetCalories * 0.1) / 4) // 10% of calories from sugar
      const saturatedFatLimit = Math.round((targetCalories * 0.1) / 9) // 10% of calories from saturated fat
      return {
        calories: Math.round(targetCalories),
        kilojoules: Math.round(targetCalories * 4.184),
        protein: Math.round(proteinGrams),
        proteinRange,
        carbs: Math.round(carbGrams),
        carbRange,
        fat: Math.round(fatGrams),
        fatRange,
        sugar: sugarLimit,
        saturatedFat: saturatedFatLimit,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
      }
    }

    // Calculate for all presets
    const resultsObj: any = {}
    for (const key of macroPresetKeys) {
      resultsObj[key] = getMacroResult(macroPresets[key])
    }
    // Custom plan
    const total = customMacros.protein + customMacros.carbs + customMacros.fat
    if (total !== 100) {
      setCustomError("Protein + Carbs + Fat must equal 100%.")
      resultsObj.custom = null
    } else {
      setCustomError("")
      resultsObj.custom = getMacroResult({
        protein: customMacros.protein / 100,
        carbs: customMacros.carbs / 100,
        fat: customMacros.fat / 100,
      })
    }
    setAllResults(resultsObj)
    // Set the main results to the selected tab for backward compatibility
    setResults(resultsObj[selectedPreset] || null)
  }

  const getWeightUnit = () => unitSystem === "us" ? "lbs" : "kg"
  const getHeightUnit = () => unitSystem === "us" ? "ft/in" : "cm"

  return (
    <>
      <Head>
        <title>Macro Calculator - Calculate Daily Macronutrient Needs | Smart Calculator</title>
        <meta
          name="description"
          content="Calculate your daily macronutrient needs based on your goals, activity level, and body composition using accurate BMR formulas."
        />
        <meta
          name="keywords"
          content="macro calculator, macronutrients, BMR calculator, calorie calculator, protein carbs fat"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Macro Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
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
              <span className="text-gray-900 font-medium">Macro Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Macro Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                This calculator can provide a range of suggested values for a person's macronutrient and Calorie needs under normal conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>Macro Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Modify the values and click the calculate button to use
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Unit System Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">Unit System</Label>
                      <Tabs value={unitSystem} onValueChange={(value) => setUnitSystem(value as "us" | "metric" | "other")} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="us">US Units</TabsTrigger>
                          <TabsTrigger value="metric">Metric Units</TabsTrigger>
                          <TabsTrigger value="other">Other Units</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Age</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="25"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            min="18"
                            max="80"
                          />
                        </div>
                        <p className="text-sm text-gray-500">ages 18 - 80</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Gender</Label>
                        <RadioGroup value={gender} onValueChange={(value) => setGender(value as "male" | "female")}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Height</Label>
                        {unitSystem === "us" ? (
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="5"
                                value={heightFeet}
                                onChange={(e) => setHeightFeet(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="1"
                                max="8"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">feet</span>
                            </div>
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="10"
                                value={heightInches}
                                onChange={(e) => setHeightInches(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="0"
                                max="11"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">inches</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="178"
                              value={heightCm}
                              onChange={(e) => setHeightCm(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                              min="100"
                              max="250"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Weight</Label>
                        <div className="relative">
                          <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="75"
                            value={unitSystem === "us" ? weightLbs : weightKg}
                            onChange={(e) => {
                              if (unitSystem === "us") {
                                setWeightLbs(e.target.value)
                              } else {
                                setWeightKg(e.target.value)
                              }
                            }}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            min="30"
                            max="500"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {getWeightUnit()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Level and Goal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Activity</Label>
                        <Select value={activity} onValueChange={setActivity}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(activityLevels).map(([key, level]) => (
                              <SelectItem key={key} value={key}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Your Goal</Label>
                        <Select value={goal} onValueChange={setGoal}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(goals).map(([key, goalItem]) => (
                              <SelectItem key={key} value={key}>
                                {goalItem.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* BMR Formula Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">BMR Estimation Formula</Label>
                      <div className="flex space-x-4">
                        <RadioGroup value={bmrFormula} onValueChange={setBmrFormula}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mifflin" id="mifflin" />
                            <Label htmlFor="mifflin">Mifflin St Jeor</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="katch" id="katch" />
                            <Label htmlFor="katch">Katch-McArdle</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {bmrFormula === "katch" && (
                        <div className="mt-4">
                          <Label className="text-sm font-medium text-gray-700">Body Fat Percentage</Label>
                          <Input
                            type="number"
                            placeholder="15"
                            value={bodyFatPercentage}
                            onChange={(e) => setBodyFatPercentage(e.target.value)}
                            className="mt-2 h-10 border-2 focus:border-green-500"
                            min="5"
                            max="50"
                          />
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={calculateAllMacros}
                      className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold"
                    >
                      Calculate Macros
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card className="shadow-2xl border-0 bg-white sticky top-24 pt-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">Macro Results</CardTitle>
                    <CardDescription className="text-base">Your daily macronutrient breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {allResults ? (
                      <Tabs value={selectedPreset} onValueChange={v => setSelectedPreset(v as keyof typeof macroPresets | "custom")} className="mb-8">
                        <TabsList
                          className="grid grid-rows-2 grid-cols-3 gap-2 justify-center w-full mb-2 bg-white"
                          style={{ minHeight: 110 }}
                        >
                          <TabsTrigger
                            value="balanced"
                            className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center"
                          >
                            Balanced
                          </TabsTrigger>
                          <TabsTrigger
                            value="lowFat"
                            className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center"
                          >
                            Low Fat
                          </TabsTrigger>
                          <TabsTrigger
                            value="lowCarb"
                            className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center"
                          >
                            Low Carb
                          </TabsTrigger>
                          <TabsTrigger
                            value="highProtein"
                            className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center"
                          >
                            High Protein
                          </TabsTrigger>
                          <TabsTrigger
                            value="custom"
                            className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-blue-100 transition-all flex items-center justify-center col-span-2"
                          >
                            Create Your Own
                          </TabsTrigger>
                        </TabsList>
                        {/* Tab Content - must be inside <Tabs> */}
                        {macroPresetKeys.map((key) => (
                          <TabsContent key={key} value={key} className={selectedPreset === key ? "block" : "hidden"}>
                            {allResults[key] && (
                              <div className="space-y-6">
                                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200 mt-2 mb-4 shadow-lg">
                                    <p className="text-lg text-gray-600 mb-2">Daily Calories</p>
                                    <p className="text-4xl font-bold text-green-600 mb-2">{allResults[key].calories}</p>
                                    <p className="text-sm text-gray-500">or {allResults[key].kilojoules} kJ/day</p>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h3 className="font-bold text-lg text-gray-900">Macronutrients</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                      <span className="font-medium text-gray-700">Protein</span>
                                      <span className="font-bold text-blue-600">{allResults[key].protein}g</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                      <span className="font-medium text-gray-700">Carbohydrates</span>
                                      <span className="font-bold text-green-600">{allResults[key].carbs}g</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                      <span className="font-medium text-gray-700">Fat</span>
                                      <span className="font-bold text-purple-600">{allResults[key].fat}g</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h3 className="font-bold text-lg text-gray-900">Macro Ranges</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                                      <span className="font-medium text-gray-700">Protein Range</span>
                                      <span className="font-bold text-orange-600">{allResults[key].proteinRange[0]}-{allResults[key].proteinRange[1]}g</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                      <span className="font-medium text-gray-700">Carb Range</span>
                                      <span className="font-bold text-yellow-600">{allResults[key].carbRange[0]}-{allResults[key].carbRange[1]}g</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                      <span className="font-medium text-gray-700">Fat Range</span>
                                      <span className="font-bold text-red-600">{allResults[key].fatRange[0]}-{allResults[key].fatRange[1]}g</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h3 className="font-bold text-lg text-gray-900">Daily Limits</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                      <span className="font-medium text-gray-700">Sugar</span>
                                      <span className="font-bold text-indigo-600">&lt;{allResults[key].sugar}g</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                                      <span className="font-medium text-gray-700">Saturated Fat</span>
                                      <span className="font-bold text-teal-600">&lt;{allResults[key].saturatedFat}g</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4 pt-4 border-t">
                                  <h3 className="font-bold text-lg text-gray-900">Metabolic Info</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                      <span className="font-medium text-gray-700">BMR</span>
                                      <span className="font-bold text-gray-600">{allResults[key].bmr} calories</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                      <span className="font-medium text-gray-700">TDEE</span>
                                      <span className="font-bold text-gray-600">{allResults[key].tdee} calories</span>
                                    </div>
                                  </div>
                                </div>
                                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold mt-4">
                                  Save This Calculation
                                </Button>
                              </div>
                            )}
                          </TabsContent>
                        ))}
                        <TabsContent value="custom" className={selectedPreset === "custom" ? "block" : "hidden"}>
                          <div className="mt-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
                            <div className="flex flex-col items-center">
                              <Label>Protein (%)</Label>
                              <Input type="number" min={0} max={100} value={customMacros.protein} onChange={e => setCustomMacros({ ...customMacros, protein: Number(e.target.value) })} className="w-24" />
                            </div>
                            <div className="flex flex-col items-center">
                              <Label>Carbs (%)</Label>
                              <Input type="number" min={0} max={100} value={customMacros.carbs} onChange={e => setCustomMacros({ ...customMacros, carbs: Number(e.target.value) })} className="w-24" />
                            </div>
                            <div className="flex flex-col items-center">
                              <Label>Fat (%)</Label>
                              <Input type="number" min={0} max={100} value={customMacros.fat} onChange={e => setCustomMacros({ ...customMacros, fat: Number(e.target.value) })} className="w-24" />
                            </div>
                          </div>
                          {customError && <div className="text-red-600 font-semibold mb-2">{customError}</div>}
                          {allResults.custom && !customError && (
                            <div className="space-y-6">
                              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                                <p className="text-lg text-gray-600 mb-2">Daily Calories</p>
                                <p className="text-4xl font-bold text-green-600 mb-2">{allResults.custom.calories}</p>
                                <p className="text-sm text-gray-500">or {allResults.custom.kilojoules} kJ/day</p>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-bold text-lg text-gray-900">Macronutrients</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <span className="font-medium text-gray-700">Protein</span>
                                    <span className="font-bold text-blue-600">{allResults.custom.protein}g</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <span className="font-medium text-gray-700">Carbohydrates</span>
                                    <span className="font-bold text-green-600">{allResults.custom.carbs}g</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                    <span className="font-medium text-gray-700">Fat</span>
                                    <span className="font-bold text-purple-600">{allResults.custom.fat}g</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-bold text-lg text-gray-900">Macro Ranges</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <span className="font-medium text-gray-700">Protein Range</span>
                                    <span className="font-bold text-orange-600">{allResults.custom.proteinRange[0]}-{allResults.custom.proteinRange[1]}g</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <span className="font-medium text-gray-700">Carb Range</span>
                                    <span className="font-bold text-yellow-600">{allResults.custom.carbRange[0]}-{allResults.custom.carbRange[1]}g</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-gray-700">Fat Range</span>
                                    <span className="font-bold text-red-600">{allResults.custom.fatRange[0]}-{allResults.custom.fatRange[1]}g</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-bold text-lg text-gray-900">Daily Limits</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                    <span className="font-medium text-gray-700">Sugar</span>
                                    <span className="font-bold text-indigo-600">&lt;{allResults.custom.sugar}g</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                                    <span className="font-medium text-gray-700">Saturated Fat</span>
                                    <span className="font-bold text-teal-600">&lt;{allResults.custom.saturatedFat}g</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4 pt-4 border-t">
                                <h3 className="font-bold text-lg text-gray-900">Metabolic Info</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="font-medium text-gray-700">BMR</span>
                                    <span className="font-bold text-gray-600">{allResults.custom.bmr} calories</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="font-medium text-gray-700">TDEE</span>
                                    <span className="font-bold text-gray-600">{allResults.custom.tdee} calories</span>
                                  </div>
                                </div>
                              </div>
                              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold mt-4">
                                Save This Calculation
                              </Button>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Utensils className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter your details and click Calculate Macros to see your macros</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Information Section */}
            <section className="mt-16">
              <Card className="shadow-2xl border-0 bg-white pt-0">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">What are Macronutrients (Macros)?</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    In the context of health and fitness, macronutrients are most often defined to be the chemical
                    compounds that humans consume in large quantities that provide bulk energy. Specifically, they refer
                    to carbohydrates, proteins, and fats. Some definitions also include water, air, calcium, sodium,
                    chloride ions, and some other substances, along with more typical macronutrients, since they are
                    needed in large quantities by the human body. In this calculator, we only calculate daily
                    carbohydrate, protein, and fat needs.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Protein</h3>
                      <p className="text-gray-600">
                        Proteins are organic compounds comprised of amino acids, and are one of the types of macronutrients. 
                        Amino acids are essential to a person's well-being, and there are certain amino acids that can only 
                        be obtained through diet. These amino acids are typically referred to as "essential amino acids," 
                        and are obtained by humans and other animals through the consumption of protein.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Carbohydrates (Carbs)</h3>
                      <p className="text-gray-600">
                        Carbohydrates, often referred to as simply "carbs," are compounds that are typically classified 
                        as sugar, starch, or fiber. Sugar is the simplest form of carbohydrate, while starch and fiber 
                        are complex carbohydrates. Glucose is a monosaccharide and is one of the key sources of energy 
                        for humans, as well as other animals.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Fat</h3>
                      <p className="text-gray-600">
                        Fats are molecules that are comprised primarily of carbon and hydrogen atoms. Common examples 
                        include cholesterol, phospholipids, and triglycerides. Although fats, in the context of nutrition, 
                        are typically viewed as unhealthy, they have both structural as well as metabolic functions, 
                        and are a necessary part of the human diet.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 font-medium">
                      <strong>Important:</strong> The results above are a guideline for more typical situations. Please consult with a doctor for
                      your macronutrient needs if you are an athlete, training for a specific purpose, or on special
                      diet due to a disease, pregnancy, or other conditions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

      </div>
    </>
  )
}
