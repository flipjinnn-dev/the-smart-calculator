"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Calculator, Heart, User, Ruler, Weight, Activity, Calendar, Scale } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Body Fat Calculator",
  description:
    "Calculate your body fat percentage using the U.S. Navy method and BMI method. Get comprehensive analysis of your body composition.",
  url: "https://www.thesmartcalculator.com/health/body-fat-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Body fat percentage calculation",
    "U.S. Navy method",
    "BMI method",
    "Age and gender specific analysis",
    "Body composition breakdown",
    "Multiple unit systems",
  ],
}

interface BodyFatResult {
  bodyFatPercentage: number
  category: string
  bodyFatMass: number
  leanBodyMass: number
  idealBodyFat: number
  fatToLose: number
  bmiFatPercentage: number
}

export default function BodyFatCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [unitSystem, setUnitSystem] = useState<"us" | "metric" | "other">("metric")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState<string>("25")
  const [weight, setWeight] = useState<string>("70")
  const [heightFeet, setHeightFeet] = useState<string>("5")
  const [heightInches, setHeightInches] = useState<string>("10.5")
  const [heightCm, setHeightCm] = useState<string>("178")
  const [neckFeet, setNeckFeet] = useState<string>("1")
  const [neckInches, setNeckInches] = useState<string>("7.5")
  const [neckCm, setNeckCm] = useState<string>("38")
  const [waistFeet, setWaistFeet] = useState<string>("3")
  const [waistInches, setWaistInches] = useState<string>("1.5")
  const [waistCm, setWaistCm] = useState<string>("81")
  const [hipFeet, setHipFeet] = useState<string>("3")
  const [hipInches, setHipInches] = useState<string>("6")
  const [hipCm, setHipCm] = useState<string>("96")
  const [result, setResult] = useState<BodyFatResult | null>(null)

  // Auto-calculate on page load with default values
  useEffect(() => {
    if (age && gender && heightCm && weight && neckCm && waistCm) {
      // Small delay to ensure all state is set
      setTimeout(() => {
        calculateBodyFat()
      }, 100)
    }
  }, [])

  const calculateBodyFat = () => {
    let weightKg: number
    let heightCmValue: number
    let neckCmValue: number
    let waistCmValue: number
    let hipCmValue: number

    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    // Convert to metric
    if (unitSystem === "us") {
      weightKg = Number.parseFloat(weight) * 0.453592
      heightCmValue = (Number.parseFloat(heightFeet) * 12 + Number.parseFloat(heightInches)) * 2.54
      neckCmValue = (Number.parseFloat(neckFeet) * 12 + Number.parseFloat(neckInches)) * 2.54
      waistCmValue = (Number.parseFloat(waistFeet) * 12 + Number.parseFloat(waistInches)) * 2.54
      hipCmValue = (Number.parseFloat(hipFeet) * 12 + Number.parseFloat(hipInches)) * 2.54
    } else {
      weightKg = Number.parseFloat(weight)
      heightCmValue = Number.parseFloat(heightCm)
      neckCmValue = Number.parseFloat(neckCm)
      waistCmValue = Number.parseFloat(waistCm)
      hipCmValue = Number.parseFloat(hipCm)
    }

    if (weightKg <= 0 || heightCmValue <= 0 || neckCmValue <= 0 || waistCmValue <= 0) return

    // U.S. Navy Method
    let bodyFatPercentage: number
    if (gender === "male") {
      bodyFatPercentage =
        495 / (1.0324 - 0.19077 * Math.log10(waistCmValue - neckCmValue) + 0.15456 * Math.log10(heightCmValue)) - 450
    } else {
      bodyFatPercentage =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistCmValue + hipCmValue - neckCmValue) +
            0.221 * Math.log10(heightCmValue)) -
        450
    }

    // BMI Method (simplified)
    const bmi = weightKg / Math.pow(heightCmValue / 100, 2)
    const ageNum = Number.parseFloat(age)
    let bmiFatPercentage: number
    if (gender === "male") {
      bmiFatPercentage = 1.2 * bmi + 0.23 * ageNum - 16.2
    } else {
      bmiFatPercentage = 1.2 * bmi + 0.23 * ageNum - 5.4
    }

    // Calculate other metrics
    const bodyFatMass = (bodyFatPercentage / 100) * weightKg
    const leanBodyMass = weightKg - bodyFatMass

    // Ideal body fat (Jackson & Pollock)
    let idealBodyFat: number
    if (gender === "male") {
      if (ageNum < 30) idealBodyFat = 14
      else if (ageNum < 40) idealBodyFat = 17
      else if (ageNum < 50) idealBodyFat = 19
      else idealBodyFat = 21
    } else {
      if (ageNum < 30) idealBodyFat = 21
      else if (ageNum < 40) idealBodyFat = 23
      else if (ageNum < 50) idealBodyFat = 25
      else idealBodyFat = 27
    }

    const fatToLose = Math.max(0, ((bodyFatPercentage - idealBodyFat) / 100) * weightKg)

    // Determine category
    let category: string
    if (gender === "male") {
      if (bodyFatPercentage < 6) category = "Essential Fat"
      else if (bodyFatPercentage < 14) category = "Athletes"
      else if (bodyFatPercentage < 18) category = "Fitness"
      else if (bodyFatPercentage < 25) category = "Average"
      else category = "Obese"
    } else {
      if (bodyFatPercentage < 14) category = "Essential Fat"
      else if (bodyFatPercentage < 21) category = "Athletes"
      else if (bodyFatPercentage < 25) category = "Fitness"
      else if (bodyFatPercentage < 32) category = "Average"
      else category = "Obese"
    }

    setResult({
      bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
      category,
      bodyFatMass: Math.round(bodyFatMass * 10) / 10,
      leanBodyMass: Math.round(leanBodyMass * 10) / 10,
      idealBodyFat: idealBodyFat,
      fatToLose: Math.round(fatToLose * 10) / 10,
      bmiFatPercentage: Math.round(bmiFatPercentage * 10) / 10,
    })
  }

  const clearForm = () => {
    setAge("25")
    setWeight("70")
    setHeightFeet("5")
    setHeightInches("10.5")
    setHeightCm("178")
    setNeckFeet("1")
    setNeckInches("7.5")
    setNeckCm("38")
    setWaistFeet("3")
    setWaistInches("1.5")
    setWaistCm("81")
    setHipFeet("3")
    setHipInches("6")
    setHipCm("96")
    setResult(null)
  }

  const getBodyFatColor = (percentage: number) => {
    if (percentage < 10) return "text-green-600"
    if (percentage < 15) return "text-lime-600"
    if (percentage < 20) return "text-yellow-600"
    if (percentage < 25) return "text-orange-600"
    return "text-red-600"
  }

  const bodyFatCategories = [
    { category: "Essential Fat", men: "2-5%", women: "10-13%", color: "bg-green-500" },
    { category: "Athletes", men: "6-13%", women: "14-20%", color: "bg-lime-500" },
    { category: "Fitness", men: "14-17%", women: "21-24%", color: "bg-yellow-500" },
    { category: "Average", men: "18-24%", women: "25-31%", color: "bg-orange-500" },
    { category: "Obese", men: "25%+", women: "32%+", color: "bg-red-500" },
  ]

  const getWeightUnit = () => unitSystem === "us" ? "lbs" : "kg"
  const getHeightUnit = () => unitSystem === "us" ? "ft/in" : "cm"

  return (
    <>
<SEO
  title="Body Fat Calculator – Percentage Measurement Tool"
  description="Estimate body fat percentage instantly. Use our free body fat calculator to track progress and improve fitness goals."
  keywords="body fat calculator, body fat percentage calculator, fitness calculator"
  slug="/health/body-fat-calculator"
/>

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
                  <p className="text-sm text-gray-500">Body Fat Calculator</p>
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
              <span className="text-gray-900 font-medium">Body Fat Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Body Fat Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your body fat percentage using the U.S. Navy method and BMI method. Get comprehensive analysis
                of your body composition.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 pt-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>Body Fat Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your measurements to calculate body fat percentage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Unit System Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">Unit System</Label>
                      <Tabs value={unitSystem} onValueChange={(value) => setUnitSystem(value as "us" | "metric" | "other")} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="metric">Metric Units</TabsTrigger>
                          <TabsTrigger value="us">US Units</TabsTrigger>
                          <TabsTrigger value="other">Other Units</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                        <Label className="text-base font-semibold text-gray-900">Age</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="25"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            min="2"
                            max="120"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Weight</Label>
                        <div className="relative">
                          <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            min="10"
                            max="500"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {getWeightUnit()}
                          </span>
                        </div>
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
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">ft</span>
                            </div>
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="10.5"
                                value={heightInches}
                                onChange={(e) => setHeightInches(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="0"
                                max="11"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">in</span>
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
                              min="50"
                              max="250"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Neck</Label>
                        {unitSystem === "us" ? (
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="1"
                                value={neckFeet}
                                onChange={(e) => setNeckFeet(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="0"
                                max="2"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">ft</span>
                            </div>
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="7.5"
                                value={neckInches}
                                onChange={(e) => setNeckInches(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="0"
                                max="11"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">in</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="38"
                              value={neckCm}
                              onChange={(e) => setNeckCm(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-green-500"
                              min="20"
                              max="60"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Waist</Label>
                        {unitSystem === "us" ? (
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="3"
                                value={waistFeet}
                                onChange={(e) => setWaistFeet(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="1"
                                max="5"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">ft</span>
                            </div>
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="1.5"
                                value={waistInches}
                                onChange={(e) => setWaistInches(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="0"
                                max="11"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">in</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="81"
                              value={waistCm}
                              onChange={(e) => setWaistCm(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-green-500"
                              min="50"
                              max="200"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                          </div>
                        )}
                      </div>

                      {/* Hip (for females) */}
                      {gender === "female" && (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Hip</Label>
                          {unitSystem === "us" ? (
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <Input
                                  type="number"
                                  placeholder="3"
                                  value={hipFeet}
                                  onChange={(e) => setHipFeet(e.target.value)}
                                  className="h-12 text-lg border-2 focus:border-green-500"
                                  min="1"
                                  max="5"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">ft</span>
                              </div>
                              <div className="relative flex-1">
                                <Input
                                  type="number"
                                  placeholder="6"
                                  value={hipInches}
                                  onChange={(e) => setHipInches(e.target.value)}
                                  className="h-12 text-lg border-2 focus:border-green-500"
                                  min="0"
                                  max="11"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">in</span>
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              <Input
                                type="number"
                                placeholder="96"
                                value={hipCm}
                                onChange={(e) => setHipCm(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                                min="60"
                                max="200"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">cm</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateBodyFat}
                        className="flex-1 h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold"
                      >
                        Calculate Body Fat
                      </Button>
                      <Button
                        onClick={clearForm}
                        variant="outline"
                        className="px-8 h-14 text-lg border-2 hover:bg-gray-50 bg-transparent"
                      >
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">Body Fat Analysis</CardTitle>
                    <CardDescription className="text-base">Your complete body composition breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result ? (
                      <div className="space-y-6">
                        {/* Main Result */}
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                          <p className="text-lg text-gray-600 mb-2">Body Fat Percentage</p>
                          <p className="text-4xl font-bold text-green-600 mb-2">{result.bodyFatPercentage}%</p>
                          <p className={`text-xl font-bold ${getBodyFatColor(result.bodyFatPercentage)} mb-2`}>
                            ({result.category})
                          </p>
                        </div>

                        {/* Body Fat Scale */}
                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-gray-900">Body Fat Scale</h3>
                          <div className="relative w-full h-8 bg-gradient-to-r from-green-400 via-orange-400 to-red-400 rounded-lg overflow-hidden">
                            <div
                              className="absolute top-0 w-1 h-full bg-black"
                              style={{ left: `${Math.min(Math.max(result.bodyFatPercentage * 2, 0), 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                          </div>
                        </div>

                        {/* Detailed Results */}
                        <div className="space-y-4">
                          <h3 className="font-bold text-lg text-gray-900">Detailed Results</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <span className="font-medium text-gray-700">Body Fat (U.S. Navy)</span>
                              <span className="font-bold text-blue-600">{result.bodyFatPercentage}%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                              <span className="font-medium text-gray-700">Body Fat Category</span>
                              <span className="font-bold text-green-600">{result.category}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <span className="font-medium text-gray-700">Body Fat Mass</span>
                              <span className="font-bold text-purple-600">
                                {result.bodyFatMass} {getWeightUnit()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <span className="font-medium text-gray-700">Lean Body Mass</span>
                              <span className="font-bold text-orange-600">
                                {result.leanBodyMass} {getWeightUnit()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                              <span className="font-medium text-gray-700">Ideal Body Fat</span>
                              <span className="font-bold text-red-600">{result.idealBodyFat}%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                              <span className="font-medium text-gray-700">Fat to Lose</span>
                              <span className="font-bold text-indigo-600">
                                {result.fatToLose} {getWeightUnit()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                              <span className="font-medium text-gray-700">Body Fat (BMI method)</span>
                              <span className="font-bold text-teal-600">{result.bmiFatPercentage}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Save Button */}
                        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                          Save This Calculation
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter your measurements to calculate body fat percentage</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Body Fat Categories Reference */}
            <section className="mt-16">
              <Card className="shadow-2xl border-0 pt-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Body Fat Categories Reference</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2">
                          <th className="text-left py-3 px-4 font-semibold">Description</th>
                          <th className="text-left py-3 px-4 font-semibold">Women</th>
                          <th className="text-left py-3 px-4 font-semibold">Men</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bodyFatCategories.map((category, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-4 h-4 rounded ${category.color}`} />
                                <span className="font-medium">{category.category}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{category.women}</td>
                            <td className="py-3 px-4">{category.men}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

