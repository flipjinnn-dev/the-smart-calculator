"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { Calculator, RotateCcw, Shield, Activity, Target, TrendingUp } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import armyBodyFatData from "@/app/content/army-body-fat-calculator.json"

export default function ArmyBodyFatCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [abdomen, setAbdomen] = useState("")

  // Army standards by age group and gender
  const armyStandards = {
    male: {
      "17-20": 20,
      "21-27": 22,
      "28-39": 24,
      "40+": 26,
    },
    female: {
      "17-20": 30,
      "21-27": 32,
      "28-39": 34,
      "40+": 36,
    },
  }

  const getAgeGroup = (age: number): string => {
    if (age >= 17 && age <= 20) return "17-20"
    if (age >= 21 && age <= 27) return "21-27"
    if (age >= 28 && age <= 39) return "28-39"
    if (age >= 40) return "40+"
    return "17-20" // default
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const ageNum = Number.parseInt(age)
    const weightNum = Number.parseFloat(weight)
    const abdomenNum = Number.parseFloat(abdomen)

    if (!age || ageNum < 17 || ageNum > 65) {
      newErrors.age = "Age must be between 17 and 65 years"
    }

    if (!weight || weightNum <= 0 || weightNum > 500) {
      newErrors.weight = "Weight must be between 1 and 500 lbs"
    }

    if (!abdomen || abdomenNum <= 0 || abdomenNum > 60) {
      newErrors.abdomen = "Abdominal circumference must be between 1 and 60 inches"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateBodyFat = () => {
    if (!validateInputs()) return

    try {
      const ageNum = Number.parseInt(age)
      const weightNum = Number.parseFloat(weight)
      const abdomenNum = Number.parseFloat(abdomen)

      let bodyFatPercentage = 0

      // Apply gender-specific formulas
      if (gender === "male") {
        // Male formula: %BF = -26.97 - (0.12 × Weight[lbs]) + (1.99 × Abdomen[in])
        bodyFatPercentage = -26.97 - 0.12 * weightNum + 1.99 * abdomenNum
      } else {
        // Female formula: %BF = -9.15 - (0.015 × Weight[lbs]) + (1.27 × Abdomen[in])
        bodyFatPercentage = -9.15 - 0.015 * weightNum + 1.27 * abdomenNum
      }

      // Round to 1 decimal place
      bodyFatPercentage = Math.round(bodyFatPercentage * 10) / 10

      // Get age group and standard
      const ageGroup = getAgeGroup(ageNum)
      const maxAllowed =
        armyStandards[gender as keyof typeof armyStandards][ageGroup as keyof typeof armyStandards.male]
      const withinStandard = bodyFatPercentage <= maxAllowed
      const difference = bodyFatPercentage - maxAllowed

      setResult({
        bodyFatPercentage,
        maxAllowed,
        withinStandard,
        difference,
        ageGroup,
        gender,
        inputs: {
          age: ageNum,
          weight: weightNum,
          abdomen: abdomenNum,
        },
        calculations: {
          formula:
            gender === "male"
              ? `-26.97 - (0.12 × ${weightNum}) + (1.99 × ${abdomenNum})`
              : `-9.15 - (0.015 × ${weightNum}) + (1.27 × ${abdomenNum})`,
          step1: gender === "male" ? -26.97 - 0.12 * weightNum : -9.15 - 0.015 * weightNum,
          step2: gender === "male" ? 1.99 * abdomenNum : 1.27 * abdomenNum,
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating body fat. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setGender("male")
    setAge("")
    setWeight("")
    setAbdomen("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const BodyFatGraph = ({ result }: { result: any }) => {
    const percentage = (result.bodyFatPercentage / result.maxAllowed) * 100
    const barWidth = Math.min(percentage, 120) // Cap at 120% for display

    return (
      <div className="bg-white p-6 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-700 mb-4">Visual Comparison</h4>
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div
                className={`h-8 rounded-full transition-all duration-500 ${
                  result.withinStandard
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                }`}
                style={{ width: `${Math.min(barWidth, 100)}%` }}
              />
              {/* Standard line marker */}
              <div className="absolute top-0 right-0 w-1 h-8 bg-gray-600 rounded-r-full" />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0%</span>
              <span>Standard: {result.maxAllowed}%</span>
            </div>
          </div>

          {/* Values */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{result.bodyFatPercentage}%</p>
              <p className="text-sm text-gray-600">Your Result</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-700">{result.maxAllowed}%</p>
              <p className="text-sm text-gray-600">Army Standard</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
<SEO
  title="Army Body Fat Calculator – Accurate Measurement"
  description="Calculate body fat percentage using army standards. Use our free body fat calculator for fitness and military readiness."
  keywords="army body fat calculator, body fat calculator, military fitness standards"
  slug="/health/army-body-fat-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
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
                  <p className="text-sm text-gray-500">U.S. Army Body Fat Calculator</p>
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
              <span className="text-gray-900 font-medium">U.S. Army Body Fat Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">U.S. Army Body Fat Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate body fat percentage using the U.S. Army's June 2023 one-site tape test formula and compare
                against AR 600-9 standards.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>Body Fat Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your measurements for Army body fat assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Gender Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Gender</Label>
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

                      {/* Age Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Age (years)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Activity className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                            type="number"
                            placeholder="25"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                      </div>

                      {/* Weight Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Weight (lbs)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`}
                            type="number"
                            placeholder="180"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>

                      {/* Abdominal Circumference Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Abdominal Circumference (inches)
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.abdomen ? "border-red-300" : ""}`}
                            type="number"
                            step="0.1"
                            placeholder="36.0"
                            value={abdomen}
                            onChange={(e) => setAbdomen(e.target.value)}
                          />
                        </div>
                        {errors.abdomen && <p className="text-red-600 text-xs mt-1">{errors.abdomen}</p>}
                        <p className="text-xs text-gray-500 mt-1">Measured at the navel (horizontal)</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateBodyFat}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                      >
                        Calculate Body Fat
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mb-3 shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Body Fat %</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-3xl font-bold text-green-900">{result.bodyFatPercentage}%</p>
                          <p
                            className={`text-sm font-medium ${result.withinStandard ? "text-green-600" : "text-red-600"}`}
                          >
                            {result.withinStandard ? "✅ Within Standard" : "❌ Exceeds Standard"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Shield className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your measurements to calculate Army body fat percentage.
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
                      <Shield className="w-6 h-6 text-green-600" />
                      <span>Your Army Body Fat Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Main Results */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <h3 className="text-xl font-semibold text-green-700 mb-4">Assessment Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-green-700 mb-1">{result.bodyFatPercentage}%</p>
                          <p className="text-sm text-gray-600">Your Body Fat</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-700 mb-1">{result.maxAllowed}%</p>
                          <p className="text-sm text-gray-600">Army Standard</p>
                        </div>
                        <div>
                          <p
                            className={`text-2xl font-bold mb-1 ${result.withinStandard ? "text-green-600" : "text-red-600"}`}
                          >
                            {result.withinStandard ? "✅ PASS" : "❌ FAIL"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {result.withinStandard ? "Within Standard" : `${result.difference.toFixed(1)}% over limit`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <BodyFatGraph result={result} />
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-green-700 mb-6">Calculation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-700 mb-3">
                            Formula Used ({result.gender === "male" ? "Male" : "Female"})
                          </h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p className="font-mono bg-white p-2 rounded border">{result.calculations.formula}</p>
                            <p>
                              = {result.calculations.step1.toFixed(2)} + {result.calculations.step2.toFixed(2)}
                            </p>
                            <p>
                              = <strong>{result.bodyFatPercentage}%</strong>
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <h4 className="font-semibold text-emerald-700 mb-3">Standards Applied</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Age Group:</strong> {result.ageGroup} years
                            </p>
                            <p>
                              <strong>Gender:</strong> {result.gender === "male" ? "Male" : "Female"}
                            </p>
                            <p>
                              <strong>Max Allowed:</strong> {result.maxAllowed}%
                            </p>
                            <p>
                              <strong>AR 600-9 (2023)</strong> Standards
                            </p>
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
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mr-3 shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    Army Body Fat Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">AR 600-9 Standards (2023)</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Age Group</th>
                              <th className="text-center py-2">Male Max</th>
                              <th className="text-center py-2">Female Max</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">17–20 years</td>
                              <td className="text-center">20%</td>
                              <td className="text-center">30%</td>
                            </tr>
                            <tr>
                              <td className="py-1">21–27 years</td>
                              <td className="text-center">22%</td>
                              <td className="text-center">32%</td>
                            </tr>
                            <tr>
                              <td className="py-1">28–39 years</td>
                              <td className="text-center">24%</td>
                              <td className="text-center">34%</td>
                            </tr>
                            <tr>
                              <td className="py-1">40+ years</td>
                              <td className="text-center">26%</td>
                              <td className="text-center">36%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">June 2023 Updates</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Single-site tape test (abdomen only)</li>
                          <li>Simplified measurement process</li>
                          <li>Reduced measurement errors</li>
                          <li>Consistent with medical standards</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">ACFT Exemption</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          Soldiers may be exempt from body fat assessment if they achieve:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>540+ total ACFT score</strong>
                          </li>
                          <li>
                            <strong>80+ points</strong> in each event
                          </li>
                          <li>No medical limitations</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">Measurement Guidelines</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Measure at the navel (horizontal)</li>
                          <li>Normal breathing, not sucked in</li>
                          <li>Tape snug but not compressing skin</li>
                          <li>Round to nearest 0.5 inch</li>
                          <li>Take 3 measurements, use middle value</li>
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
              <CalculatorGuide data={armyBodyFatData} />
          </div>
        </main>
      </div>
    </>
  )
}
