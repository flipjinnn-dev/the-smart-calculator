"use client"
import { useRef, useState } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Scale, Coffee, ChefHat } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ingredients = [
  { name: "All-purpose flour", density: 0.593 },
  { name: "Granulated sugar", density: 0.845 },
  { name: "Brown sugar (packed)", density: 0.9 },
  { name: "Powdered sugar", density: 0.56 },
  { name: "Butter", density: 0.911 },
  { name: "Vegetable oil", density: 0.92 },
  { name: "Milk (whole)", density: 1.03 },
  { name: "Water", density: 1.0 },
  { name: "Honey", density: 1.42 },
  { name: "Rice (uncooked)", density: 0.753 },
  { name: "Oats (rolled)", density: 0.432 },
  { name: "Cocoa powder", density: 0.641 },
  { name: "Salt", density: 1.217 },
  { name: "Baking powder", density: 1.52 },
  { name: "Custom", density: 1.0 },
]

export default function CupsToPoundsConverter() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [conversionMode, setConversionMode] = useState<string>("cups-to-pounds")
  const [selectedIngredient, setSelectedIngredient] = useState<string>("All-purpose flour")
  const [density, setDensity] = useState<string>("0.593")
  const [cups, setCups] = useState<string>("")
  const [pounds, setPounds] = useState<string>("")

  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredient(ingredientName)
    const ingredient = ingredients.find((ing) => ing.name === ingredientName)
    if (ingredient) {
      setDensity(ingredient.density.toString())
    }
    setErrors({})
  }

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    const densityValue = getNumericValue(density)
    const cupsValue = getNumericValue(cups)
    const poundsValue = getNumericValue(pounds)

    if (densityValue <= 0) {
      newErrors.density = "Density must be greater than 0"
    }

    if (conversionMode === "cups-to-pounds") {
      if (cupsValue <= 0) {
        newErrors.cups = "Please enter a valid number of cups"
      }
    } else {
      if (poundsValue <= 0) {
        newErrors.pounds = "Please enter a valid number of pounds"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0
  }

  const calculateResults = () => {
    if (!validateInputs()) {
      return
    }

    const densityValue = getNumericValue(density) // g/mL
    const cupsValue = getNumericValue(cups)
    const poundsValue = getNumericValue(pounds)

    let calculatedPounds = 0
    let calculatedCups = 0
    let densityInLbPerCup = 0

    densityInLbPerCup = densityValue / 1.9172

    if (conversionMode === "cups-to-pounds") {
      calculatedPounds = (cupsValue * densityValue) / 1.9172
    } else {
      calculatedCups = (poundsValue * 1.9172) / densityValue
    }

    const newResult = {
      conversionMode,
      ingredient: selectedIngredient,
      densityGmL: densityValue,
      densityLbCup: densityInLbPerCup,
      inputCups: cupsValue,
      inputPounds: poundsValue,
      calculatedPounds,
      calculatedCups,
    }

    setResult(newResult)
    setShowResult(true)
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  }

  const resetCalculator = () => {
    setConversionMode("cups-to-pounds")
    setSelectedIngredient("All-purpose flour")
    setDensity("0.593")
    setCups("")
    setPounds("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Cups to Pounds Converter | Smart Calculator</title>
        <meta
          name="description"
          content="Convert between US cups and pounds for cooking ingredients using density. Perfect for recipe conversions and baking measurements."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
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
                  <p className="text-sm text-gray-500">Cups to Pounds Converter</p>
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
              <Link href="/food" className="text-gray-500 hover:text-orange-600">
                Food
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Cups to Pounds Converter</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cups to Pounds Converter</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert between US cups (volume) and pounds (weight) using ingredient density. Perfect for recipe
                conversions and precise baking measurements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Coffee className="w-6 h-6 text-orange-600" />
                      <span>Cups ↔ Pounds Conversion</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Select conversion direction, choose an ingredient, and enter the measurement to convert
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div>
                        <Label className="text-sm font-medium text-orange-800 mb-3 block">Conversion Direction</Label>
                        <RadioGroup value={conversionMode} onValueChange={setConversionMode} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cups-to-pounds" id="cups-to-pounds" />
                            <Label htmlFor="cups-to-pounds" className="text-sm font-medium">
                              Cups → Pounds
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pounds-to-cups" id="pounds-to-cups" />
                            <Label htmlFor="pounds-to-cups" className="text-sm font-medium">
                              Pounds → Cups
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">Select Ingredient</Label>
                          <Select value={selectedIngredient} onValueChange={handleIngredientChange}>
                            <SelectTrigger className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ingredients.map((ingredient) => (
                                <SelectItem key={ingredient.name} value={ingredient.name}>
                                  {ingredient.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">Density (g/mL)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Scale className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input
                              className={`pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${
                                errors.density ? "border-red-500" : ""
                              }`}
                              type="number"
                              step="0.001"
                              min="0"
                              value={density}
                              onChange={(e) => {
                                setDensity(e.target.value)
                                if (selectedIngredient !== "Custom") {
                                  setSelectedIngredient("Custom")
                                }
                                setErrors({ ...errors, density: "" })
                              }}
                              placeholder="0.593"
                            />
                          </div>
                          {errors.density && <p className="text-red-500 text-xs mt-1">{errors.density}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-sm font-medium text-orange-800 mb-3 block">
                              {conversionMode === "cups-to-pounds" ? "Cups (Input)" : "Cups (Result)"}
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Coffee className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input
                                className={`pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${
                                  errors.cups ? "border-red-500" : ""
                                }`}
                                type="number"
                                step="0.1"
                                min="0"
                                value={cups}
                                onChange={(e) => {
                                  setCups(e.target.value)
                                  setErrors({ ...errors, cups: "" })
                                }}
                                placeholder="0"
                                disabled={conversionMode === "pounds-to-cups"}
                              />
                            </div>
                            {errors.cups && <p className="text-red-500 text-xs mt-1">{errors.cups}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-orange-800 mb-3 block">
                              {conversionMode === "pounds-to-cups" ? "Pounds (Input)" : "Pounds (Result)"}
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Scale className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input
                                className={`pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${
                                  errors.pounds ? "border-red-500" : ""
                                }`}
                                type="number"
                                step="0.01"
                                min="0"
                                value={pounds}
                                onChange={(e) => {
                                  setPounds(e.target.value)
                                  setErrors({ ...errors, pounds: "" })
                                }}
                                placeholder="0"
                                disabled={conversionMode === "cups-to-pounds"}
                              />
                            </div>
                            {errors.pounds && <p className="text-red-500 text-xs mt-1">{errors.pounds}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={calculateResults}
                          className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Calculator className="w-5 h-5 mr-2" />
                          Convert
                        </Button>
                        <Button
                          onClick={resetCalculator}
                          variant="outline"
                          className="h-14 px-6 text-lg font-semibold border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card
                  ref={resultsRef}
                  className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-50 sticky top-24 h-fit"
                >
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mb-3 shadow-lg">
                      <Coffee className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="w-full space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <p className="text-sm text-orange-700 font-medium">Ingredient</p>
                          <p className="text-lg font-semibold text-gray-800">{result.ingredient}</p>
                          <p className="text-sm text-gray-600">
                            Density: {result.densityGmL.toFixed(3)} g/mL = {result.densityLbCup.toFixed(3)} lb/cup
                          </p>
                        </div>

                        {result.conversionMode === "cups-to-pounds" ? (
                          <>
                            <div className="bg-white p-4 rounded-lg border border-orange-200">
                              <p className="text-sm text-orange-700 font-medium">Input</p>
                              <p className="text-lg font-semibold text-gray-800">{result.inputCups} cups</p>
                            </div>

                            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                              <p className="text-sm text-orange-700 font-medium">Equivalent Weight</p>
                              <p className="text-3xl font-bold text-orange-900">{result.calculatedPounds.toFixed(2)}</p>
                              <p className="text-sm text-orange-600">pounds</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-white p-4 rounded-lg border border-orange-200">
                              <p className="text-sm text-orange-700 font-medium">Input</p>
                              <p className="text-lg font-semibold text-gray-800">{result.inputPounds} pounds</p>
                            </div>

                            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                              <p className="text-sm text-orange-700 font-medium">Equivalent Volume</p>
                              <p className="text-3xl font-bold text-orange-900">{result.calculatedCups.toFixed(2)}</p>
                              <p className="text-sm text-orange-600">cups</p>
                            </div>
                          </>
                        )}

                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-gray-800 mb-3">Formula Used</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            {result.conversionMode === "cups-to-pounds" ? (
                              <div className="p-2 bg-orange-50 rounded border border-orange-200">
                                <strong>Cups → Pounds:</strong>
                                <br />
                                lb = cups × (ρ g/mL) ÷ 1.9172
                                <br />
                                lb = {result.inputCups} × {result.densityGmL.toFixed(3)} ÷ 1.9172 ={" "}
                                {result.calculatedPounds.toFixed(2)} pounds
                              </div>
                            ) : (
                              <div className="p-2 bg-orange-50 rounded border border-orange-200">
                                <strong>Pounds → Cups:</strong>
                                <br />
                                cups = lb × 1.9172 ÷ (ρ g/mL)
                                <br />
                                cups = {result.inputPounds} × 1.9172 ÷ {result.densityGmL.toFixed(3)} ={" "}
                                {result.calculatedCups.toFixed(2)} cups
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-gray-800 mb-2">Conversion Factor</h4>
                          <p className="text-sm text-gray-700">
                            1 US cup = 236.588 mL
                            <br />
                            Conversion factor = 1.9172 (g/mL → lb/cup)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Coffee className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Select conversion direction, choose an ingredient, and enter a measurement to see results.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mr-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                    Understanding Cups to Pounds Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Core Formulas</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200 space-y-2">
                      <p className="text-gray-700">
                        <strong>Cups → Pounds:</strong> lb = cups × (ρ g/mL) ÷ 1.9172
                      </p>
                      <p className="text-gray-700">
                        <strong>Pounds → Cups:</strong> cups = lb × 1.9172 ÷ (ρ g/mL)
                      </p>
                      <p className="text-gray-700">
                        <strong>Constants:</strong> 1 US cup = 236.588 mL, Conversion factor = 1.9172
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Calculation</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="text-gray-700 mb-2">
                        <strong>Convert 2 cups of all-purpose flour to pounds:</strong>
                      </p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>• Flour density = 0.593 g/mL</p>
                        <p>• Formula: lb = 2 × 0.593 ÷ 1.9172</p>
                        <p>• Result: lb = 1.186 ÷ 1.9172 = 0.62 pounds</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Practical Applications</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Recipe Scaling:</strong> Convert volume measurements to weight for more accurate baking
                      </li>
                      <li>
                        <strong>Professional Baking:</strong> Use weight measurements for consistent results
                      </li>
                      <li>
                        <strong>Ingredient Shopping:</strong> Calculate how much to buy when recipes use different units
                      </li>
                      <li>
                        <strong>Nutritional Analysis:</strong> Convert between volume and weight for accurate nutrition
                        calculations
                      </li>
                    </ul>
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
