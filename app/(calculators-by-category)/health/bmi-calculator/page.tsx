"use client"

import type React from "react"

import { useState, useRef } from "react"
import Head from "next/head"
import Link from "next/link"
import { Calculator, Heart, Ruler, Calendar, Scale } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BMI Calculator",
  description:
    "Calculate your Body Mass Index (BMI) and understand your weight status with age and gender considerations",
  url: "https://www.thesmartcalculator.com/health/bmi-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "BMI calculation",
    "Age and gender specific analysis",
    "Weight status interpretation",
    "Healthy weight range",
    "BMI Prime calculation",
    "Ponderal Index calculation",
    "Multiple unit systems",
  ],
}

interface BMIResults {
  bmi: number
  category: string
  description: string
  color: string
  healthyWeightRange: { min: number; max: number }
  bmiPrime: number
  ponderalIndex: number
  idealWeight: number
  bodyFatPercentage?: number
  bodySurfaceArea?: number
}

export default function BMICalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [age, setAge] = useState("25")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("180")
  const [heightUnit, setHeightUnit] = useState("cm")
  const [weight, setWeight] = useState("65")
  const [weightUnit, setWeightUnit] = useState("kg")
  const [results, setResults] = useState<BMIResults | null>(null)

  const calculateBMI = () => {
    let heightInM = 0
    let weightInKg = 0
    const ageNum = Number.parseInt(age)

    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    if (!ageNum || ageNum < 2 || ageNum > 120) return

    const heightValue = Number.parseFloat(height)
    const weightValue = Number.parseFloat(weight)

    if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) return

    switch (heightUnit) {
      case "cm":
        heightInM = heightValue / 100
        break
      case "m":
        heightInM = heightValue
        break
      case "ft":
        heightInM = heightValue * 0.3048
        break
      case "in":
        heightInM = heightValue * 0.0254
        break
      default:
        heightInM = heightValue / 100
    }

    switch (weightUnit) {
      case "kg":
        weightInKg = weightValue
        break
      case "g":
        weightInKg = weightValue / 1000
        break
      case "lbs":
        weightInKg = weightValue * 0.453592
        break
      case "oz":
        weightInKg = weightValue * 0.0283495
        break
      case "st":
        weightInKg = weightValue * 6.35029
        break
      default:
        weightInKg = weightValue
    }

    if (weightInKg <= 0 || heightInM <= 0) return

    const bmi = weightInKg / (heightInM * heightInM)
    const bmiPrime = bmi / 25
    const ponderalIndex = weightInKg / (heightInM * heightInM * heightInM)
    const healthyWeightRange = {
      min: 18.5 * heightInM * heightInM,
      max: 25 * heightInM * heightInM,
    }
    const idealWeight = 22 * heightInM * heightInM
    const bodySurfaceArea = 0.007184 * Math.pow(weightInKg, 0.425) * Math.pow(heightInM * 100, 0.725)

    let category = ""
    let description = ""
    let color = ""

    if (ageNum >= 18) {
      if (bmi < 18.5) {
        category = "Underweight"
        description =
          "Your BMI indicates you are underweight. Consider consulting with a healthcare provider for a healthy weight gain plan."
        color = "text-blue-600"
      } else if (bmi < 25) {
        category = "Normal"
        description =
          "Your BMI is within the healthy range. Maintain your current lifestyle with regular exercise and balanced nutrition."
        color = "text-green-600"
      } else if (bmi < 30) {
        category = "Overweight"
        description = "Your BMI indicates you are overweight. Consider a healthy diet and regular exercise program."
        color = "text-yellow-600"
      } else if (bmi < 35) {
        category = "Obesity Class I"
        description =
          "Your BMI indicates Class I obesity. Consider consulting with a healthcare provider for weight management."
        color = "text-orange-600"
      } else if (bmi < 40) {
        category = "Obesity Class II"
        description = "Your BMI indicates Class II obesity. Medical supervision is recommended for weight management."
        color = "text-red-600"
      } else {
        category = "Obesity Class III"
        description = "Your BMI indicates Class III obesity. Medical intervention is strongly recommended."
        color = "text-red-800"
      }
    } else {
      if (bmi < 18.5) {
        category = "Underweight"
        description = "Your BMI indicates you are underweight for your age. Consult with a pediatrician."
        color = "text-blue-600"
      } else if (bmi < 25) {
        category = "Normal"
        description = "Your BMI is within the healthy range for your age."
        color = "text-green-600"
      } else if (bmi < 30) {
        category = "Overweight"
        description = "Your BMI indicates you are overweight for your age. Consult with a pediatrician."
        color = "text-yellow-600"
      } else {
        category = "Obese"
        description = "Your BMI indicates obesity for your age. Medical consultation is recommended."
        color = "text-red-600"
      }
    }

    setResults({
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
      color,
      healthyWeightRange: {
        min: Math.round(healthyWeightRange.min * 10) / 10,
        max: Math.round(healthyWeightRange.max * 10) / 10,
      },
      bmiPrime: Math.round(bmiPrime * 10) / 10,
      ponderalIndex: Math.round(ponderalIndex * 10) / 10,
      idealWeight: Math.round(idealWeight * 10) / 10,
      bodySurfaceArea: Math.round(bodySurfaceArea * 100) / 100,
    })
  }

  const BMIChart = () => (
    <div className="space-y-4">
      <div className="relative w-full h-8 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-blue-400 flex items-center justify-center text-white text-xs font-bold">16</div>
          <div className="flex-1 bg-blue-300 flex items-center justify-center text-white text-xs font-bold">17</div>
          <div className="flex-1 bg-green-400 flex items-center justify-center text-white text-xs font-bold">18.5</div>
          <div className="flex-1 bg-green-500 flex items-center justify-center text-white text-xs font-bold">25</div>
          <div className="flex-1 bg-yellow-400 flex items-center justify-center text-white text-xs font-bold">30</div>
          <div className="flex-1 bg-red-400 flex items-center justify-center text-white text-xs font-bold">35</div>
          <div className="flex-1 bg-red-600 flex items-center justify-center text-white text-xs font-bold">40</div>
        </div>
        {results && (
          <div
            className="absolute top-0 w-1 h-full bg-black"
            style={{
              left: `${Math.min(Math.max(((results.bmi - 16) / (40 - 16)) * 100, 0), 100)}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-bold">
              {results.bmi}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obesity</span>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>BMI Calculator - Calculate Body Mass Index with Age & Gender | Smart Calculator</title>
        <meta
          name="description"
          content="Advanced BMI calculator with age and gender considerations. Calculate BMI, BMI Prime, Ponderal Index, and healthy weight range with accurate results."
        />
        <meta
          name="keywords"
          content="BMI calculator, body mass index, weight calculator, health calculator, BMI chart, age gender BMI"
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
                  <p className="text-sm text-gray-500">BMI Calculator</p>
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
              <span className="text-gray-900 font-medium">BMI Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">BMI Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your Body Mass Index (BMI) to understand your weight status and get personalized health
                recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 pt-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>BMI Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Modify the values and click the calculate button to use
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
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
                            min="2"
                            max="120"
                          />
                        </div>
                        <p className="text-sm text-gray-500">ages: 2 - 120</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Height</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="180"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                              min="10"
                              max="300"
                            />
                          </div>
                          <Select value={heightUnit} onValueChange={setHeightUnit}>
                            <SelectTrigger className="w-24 h-12 border-2 focus:border-green-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">cm</SelectItem>
                              <SelectItem value="m">m</SelectItem>
                              <SelectItem value="ft">ft</SelectItem>
                              <SelectItem value="in">in</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Weight</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="65"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                              min="1"
                              max="1000"
                            />
                          </div>
                          <Select value={weightUnit} onValueChange={setWeightUnit}>
                            <SelectTrigger className="w-24 h-12 border-2 focus:border-green-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="lbs">lbs</SelectItem>
                              <SelectItem value="oz">oz</SelectItem>
                              <SelectItem value="st">st</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={calculateBMI}
                      className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold"
                    >
                      Calculate BMI
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">Result</CardTitle>
                    <CardDescription className="text-base">Save this calculation</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {results ? (
                      <div className="space-y-6">
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                          <p className="text-lg text-gray-600 mb-2">BMI = {results.bmi} kg/m²</p>
                          <p className={`text-2xl font-bold ${results.color} mb-2`}>({results.category})</p>
                          <p className="text-4xl font-bold text-gray-900 mb-2">BMI = {results.bmi}</p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-gray-900">BMI Scale</h3>
                          <BMIChart />
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-bold text-lg text-gray-900">Detailed Results</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <span className="font-medium text-gray-700">BMI:</span>
                              <span className="font-bold text-blue-600">{results.bmi} kg/m²</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                              <span className="font-medium text-gray-700">Healthy BMI range:</span>
                              <span className="font-bold text-green-600">18.5 kg/m² - 25 kg/m²</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <span className="font-medium text-gray-700">Healthy weight for height:</span>
                              <span className="font-bold text-purple-600">
                                {results.healthyWeightRange.min} - {results.healthyWeightRange.max} kg
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <span className="font-medium text-gray-700">BMI Prime:</span>
                              <span className="font-bold text-orange-600">{results.bmiPrime}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                              <span className="font-medium text-gray-700">Ponderal Index:</span>
                              <span className="font-bold text-red-600">{results.ponderalIndex} kg/m³</span>
                            </div>
                            {results.bodySurfaceArea && (
                              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                <span className="font-medium text-gray-700">Body Surface Area:</span>
                                <span className="font-bold text-indigo-600">{results.bodySurfaceArea} m²</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                          Save This Calculation
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter your details to calculate your BMI</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Information Section */}
            <section className="mt-16">
              <Card className="shadow-2xl border-0 pt-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">About BMI Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI
                    = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">BMI Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Underweight</span>
                        <span className="text-blue-600 font-bold">Below 18.5</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Normal weight</span>
                        <span className="text-green-600 font-bold">18.5 - 24.9</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="font-medium">Overweight</span>
                        <span className="text-yellow-600 font-bold">25 - 29.9</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="font-medium">Obese</span>
                        <span className="text-red-600 font-bold">30 and above</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900">Additional Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>BMI Prime:</strong> Ratio of actual BMI to upper limit of normal BMI (25)
                        </p>
                        <p>
                          <strong>Ponderal Index:</strong> Alternative to BMI that accounts for body proportions
                        </p>
                        <p>
                          <strong>Body Surface Area:</strong> Calculated using the DuBois formula
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 font-medium">
                      <strong>Important:</strong> BMI is a screening tool and is not intended to diagnose disease or
                      illness. Please consult with a healthcare professional for personalized health advice.
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
