"use client"
import { useRef, useState } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Scale, Droplets, ChefHat } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ingredients = [
  { name: "Water", density: 1000 },
  { name: "Flour (all-purpose)", density: 593 },
  { name: "Sugar (granulated)", density: 845 },
  { name: "Salt", density: 1217 },
  { name: "Milk (whole)", density: 1030 },
  { name: "Oil (vegetable)", density: 920 },
  { name: "Honey", density: 1420 },
  { name: "Butter", density: 911 },
  { name: "Rice (uncooked)", density: 753 },
  { name: "Oats (rolled)", density: 432 },
  { name: "Cocoa powder", density: 641 },
  { name: "Baking powder", density: 1520 },
  { name: "Custom", density: 1000 },
]

export default function CookingMeasurementConverter() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [selectedIngredient, setSelectedIngredient] = useState<string>("Water")
  const [density, setDensity] = useState<string>("1000")
  const [densityUnit, setDensityUnit] = useState<string>("kg/m³")
  const [weight, setWeight] = useState<string>("")
  const [volume, setVolume] = useState<string>("")

  // Unit selection states
  const [weightUnit, setWeightUnit] = useState<string>("g")
  const [volumeUnit, setVolumeUnit] = useState<string>("ml")

  const convertDensityToKgM3 = (value: number, unit: string): number => {
    switch (unit) {
      case "kg/m³":
        return value
      case "g/cm³":
        return value * 1000
      case "g/ml":
        return value * 1000
      case "lb/ft³":
        return value * 16.0185
      default:
        return value
    }
  }

  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredient(ingredientName)
    const ingredient = ingredients.find((ing) => ing.name === ingredientName)
    if (ingredient) {
      setDensity(ingredient.density.toString())
    }
    setErrors({})
  }

  const handleDensityUnitChange = (newUnit: string) => {
    const currentDensityValue = getNumericValue(density)
    const densityInKgM3 = convertDensityToKgM3(currentDensityValue, densityUnit)

    let newDensityValue = densityInKgM3
    switch (newUnit) {
      case "kg/m³":
        newDensityValue = densityInKgM3
        break
      case "g/cm³":
        newDensityValue = densityInKgM3 / 1000
        break
      case "g/ml":
        newDensityValue = densityInKgM3 / 1000
        break
      case "lb/ft³":
        newDensityValue = densityInKgM3 / 16.0185
        break
    }

    setDensity(newDensityValue.toFixed(3))
    setDensityUnit(newUnit)
  }

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    const densityValue = getNumericValue(density)
    const weightValue = getNumericValue(weight)
    const volumeValue = getNumericValue(volume)

    if (densityValue <= 0) {
      newErrors.density = "Density must be greater than 0"
    }

    if (weightValue < 0) {
      newErrors.weight = "Weight cannot be negative"
    }

    if (volumeValue < 0) {
      newErrors.volume = "Volume cannot be negative"
    }

    if (weightValue === 0 && volumeValue === 0) {
      newErrors.general = "Please enter either weight or volume"
    }

    if (weightValue > 0 && volumeValue > 0) {
      newErrors.general = "Please enter either weight OR volume, not both"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0
  }

  // Weight unit conversion to kg
  const convertWeightToKg = (value: number, unit: string): number => {
    switch (unit) {
      case "g":
        return value / 1000
      case "dag":
        return value * 0.01
      case "kg":
        return value
      case "oz":
        return value * 0.0283495
      case "lb":
        return value * 0.453592
      default:
        return value
    }
  }

  // Volume unit conversion to m³
  const convertVolumeToM3 = (value: number, unit: string): number => {
    switch (unit) {
      case "ml":
        return value / 1000000
      case "L":
        return value / 1000
      case "cups":
        return (value * 236.588) / 1000000
      case "tbsp":
        return (value * 14.7868) / 1000000
      case "tsp":
        return (value * 4.92892) / 1000000
      case "fl oz":
        return (value * 29.5735) / 1000000
      default:
        return value
    }
  }

  // Convert from kg to weight units
  const convertKgToWeight = (value: number, unit: string): number => {
    switch (unit) {
      case "g":
        return value * 1000
      case "dag":
        return value * 100
      case "kg":
        return value
      case "oz":
        return value / 0.0283495
      case "lb":
        return value / 0.453592
      default:
        return value
    }
  }

  // Convert from m³ to volume units
  const convertM3ToVolume = (value: number, unit: string): number => {
    switch (unit) {
      case "ml":
        return value * 1000000
      case "L":
        return value * 1000
      case "cups":
        return (value * 1000000) / 236.588
      case "tbsp":
        return (value * 1000000) / 14.7868
      case "tsp":
        return (value * 1000000) / 4.92892
      case "fl oz":
        return (value * 1000000) / 29.5735
      default:
        return value
    }
  }

  const calculateResults = () => {
    if (!validateInputs()) {
      return
    }

    const densityValue = convertDensityToKgM3(getNumericValue(density), densityUnit)
    const weightValue = getNumericValue(weight)
    const volumeValue = getNumericValue(volume)

    let calculationMode = ""
    let calculatedWeight = 0
    let calculatedVolume = 0
    let weightInKg = 0
    let volumeInM3 = 0

    // Auto-detect calculation mode
    if (weightValue > 0 && volumeValue === 0) {
      // Weight to Volume
      calculationMode = "weight-to-volume"
      weightInKg = convertWeightToKg(weightValue, weightUnit)
      volumeInM3 = weightInKg / densityValue
      calculatedVolume = convertM3ToVolume(volumeInM3, volumeUnit)
    } else if (volumeValue > 0 && weightValue === 0) {
      // Volume to Weight
      calculationMode = "volume-to-weight"
      volumeInM3 = convertVolumeToM3(volumeValue, volumeUnit)
      weightInKg = volumeInM3 * densityValue
      calculatedWeight = convertKgToWeight(weightInKg, weightUnit)
    }

    const newResult = {
      calculationMode,
      ingredient: selectedIngredient,
      density: densityValue,
      densityUnit,
      originalWeight: weightValue,
      originalVolume: volumeValue,
      weightUnit,
      volumeUnit,
      weightInKg,
      volumeInM3,
      calculatedWeight,
      calculatedVolume,
      // All possible conversions for display
      weightConversions:
        calculationMode === "volume-to-weight"
          ? {
              g: convertKgToWeight(weightInKg, "g"),
              dag: convertKgToWeight(weightInKg, "dag"),
              kg: convertKgToWeight(weightInKg, "kg"),
              oz: convertKgToWeight(weightInKg, "oz"),
              lb: convertKgToWeight(weightInKg, "lb"),
            }
          : null,
      volumeConversions:
        calculationMode === "weight-to-volume"
          ? {
              ml: convertM3ToVolume(volumeInM3, "ml"),
              L: convertM3ToVolume(volumeInM3, "L"),
              cups: convertM3ToVolume(volumeInM3, "cups"),
              tbsp: convertM3ToVolume(volumeInM3, "tbsp"),
              tsp: convertM3ToVolume(volumeInM3, "tsp"),
              "fl oz": convertM3ToVolume(volumeInM3, "fl oz"),
            }
          : null,
    }

    setResult(newResult)
    setShowResult(true)
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  }

  const resetCalculator = () => {
    setSelectedIngredient("Water")
    setDensity("1000")
    setDensityUnit("kg/m³")
    setWeight("")
    setVolume("")
    setWeightUnit("g")
    setVolumeUnit("ml")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Cooking Measurement Converter – Recipe Helper</title>
        <meta
          name="description"
          content="Convert cooking measurements easily. Use our free converter for cups, grams, ounces, and tablespoons in recipes."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
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
                  <p className="text-sm text-gray-500">Cooking Measurement Converter</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-red-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/food" className="text-gray-500 hover:text-red-600">
                Food
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Cooking Measurement Converter</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cooking Measurement Converter</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert between weight and volume of cooking ingredients using density. Perfect for recipe conversions
                and precise cooking measurements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <ChefHat className="w-6 h-6 text-red-600" />
                      <span>Ingredient Measurements</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Select an ingredient and enter either weight OR volume to convert between measurements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      {errors.general && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-600 text-sm font-medium">{errors.general}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-red-800 mb-3 block">Select Ingredient</Label>
                          <Select value={selectedIngredient} onValueChange={handleIngredientChange}>
                            <SelectTrigger className="h-12 border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm">
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
                          <Label className="text-sm font-medium text-red-800 mb-3 block">Density</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Scale className="h-5 w-5 text-red-500" />
                              </div>
                              <Input
                                className={`pl-10 h-12 rounded-xl border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
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
                                placeholder="1000"
                              />
                            </div>
                            <Select value={densityUnit} onValueChange={handleDensityUnitChange}>
                              <SelectTrigger className="w-24 h-12 border-2 focus:border-red-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg/m³">kg/m³</SelectItem>
                                <SelectItem value="g/cm³">g/cm³</SelectItem>
                                <SelectItem value="g/ml">g/ml</SelectItem>
                                <SelectItem value="lb/ft³">lb/ft³</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.density && <p className="text-red-500 text-xs mt-1">{errors.density}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-sm font-medium text-red-800 mb-3 block">Weight (Optional)</Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Scale className="h-5 w-5 text-red-500" />
                                </div>
                                <Input
                                  className={`pl-10 h-12 rounded-xl border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
                                    errors.weight ? "border-red-500" : ""
                                  }`}
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  value={weight}
                                  onChange={(e) => {
                                    setWeight(e.target.value)
                                    setErrors({ ...errors, weight: "", general: "" })
                                  }}
                                  placeholder="0"
                                />
                              </div>
                              <Select value={weightUnit} onValueChange={setWeightUnit}>
                                <SelectTrigger className="w-16 h-12 border-2 focus:border-red-500">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="g">g</SelectItem>
                                  <SelectItem value="dag">dag</SelectItem>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="oz">oz</SelectItem>
                                  <SelectItem value="lb">lb</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-red-800 mb-3 block">Volume (Optional)</Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Droplets className="h-5 w-5 text-red-500" />
                                </div>
                                <Input
                                  className={`pl-10 h-12 rounded-xl border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${
                                    errors.volume ? "border-red-500" : ""
                                  }`}
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  value={volume}
                                  onChange={(e) => {
                                    setVolume(e.target.value)
                                    setErrors({ ...errors, volume: "", general: "" })
                                  }}
                                  placeholder="0"
                                />
                              </div>
                              <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                                <SelectTrigger className="w-20 h-12 border-2 focus:border-red-500">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ml">ml</SelectItem>
                                  <SelectItem value="L">L</SelectItem>
                                  <SelectItem value="cups">cups</SelectItem>
                                  <SelectItem value="tbsp">tbsp</SelectItem>
                                  <SelectItem value="tsp">tsp</SelectItem>
                                  <SelectItem value="fl oz">fl oz</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.volume && <p className="text-red-500 text-xs mt-1">{errors.volume}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={calculateResults}
                          className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Calculator className="w-5 h-5 mr-2" />
                          Convert
                        </Button>
                        <Button
                          onClick={resetCalculator}
                          variant="outline"
                          className="h-14 px-6 text-lg font-semibold border-red-300 text-red-600 hover:bg-red-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
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
                  className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-pink-50 sticky top-24 h-fit"
                >
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mb-3 shadow-lg">
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="w-full space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <p className="text-sm text-red-700 font-medium">Ingredient</p>
                          <p className="text-lg font-semibold text-gray-800">{result.ingredient}</p>
                          <p className="text-sm text-gray-600">Density: {result.density.toFixed(2)} kg/m³</p>
                        </div>

                        {/* ... existing result display code ... */}
                        {result.calculationMode === "weight-to-volume" && (
                          <>
                            <div className="bg-white p-4 rounded-lg border border-red-200">
                              <p className="text-sm text-red-700 font-medium">Input Weight</p>
                              <p className="text-lg font-semibold text-gray-800">
                                {result.originalWeight} {result.weightUnit} = {result.weightInKg.toFixed(4)} kg
                              </p>
                            </div>

                            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border border-red-300">
                              <p className="text-sm text-red-700 font-medium">Equivalent Volume</p>
                              <p className="text-3xl font-bold text-red-900">{result.calculatedVolume.toFixed(2)}</p>
                              <p className="text-sm text-red-600">{result.volumeUnit}</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-red-200">
                              <h4 className="font-semibold text-gray-800 mb-2">All Volume Conversions</h4>
                              <div className="text-sm space-y-1 text-gray-700">
                                <p>{result.volumeConversions.ml.toFixed(2)} ml</p>
                                <p>{result.volumeConversions.L.toFixed(4)} L</p>
                                <p>{result.volumeConversions.cups.toFixed(3)} cups</p>
                                <p>{result.volumeConversions.tbsp.toFixed(2)} tbsp</p>
                                <p>{result.volumeConversions.tsp.toFixed(2)} tsp</p>
                                <p>{result.volumeConversions["fl oz"].toFixed(3)} fl oz</p>
                              </div>
                            </div>
                          </>
                        )}

                        {result.calculationMode === "volume-to-weight" && (
                          <>
                            <div className="bg-white p-4 rounded-lg border border-red-200">
                              <p className="text-sm text-red-700 font-medium">Input Volume</p>
                              <p className="text-lg font-semibold text-gray-800">
                                {result.originalVolume} {result.volumeUnit} = {result.volumeInM3.toFixed(8)} m³
                              </p>
                            </div>

                            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border border-red-300">
                              <p className="text-sm text-red-700 font-medium">Equivalent Weight</p>
                              <p className="text-3xl font-bold text-red-900">{result.calculatedWeight.toFixed(2)}</p>
                              <p className="text-sm text-red-600">{result.weightUnit}</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-red-200">
                              <h4 className="font-semibold text-gray-800 mb-2">All Weight Conversions</h4>
                              <div className="text-sm space-y-1 text-gray-700">
                                <p>{result.weightConversions.g.toFixed(2)} g</p>
                                <p>{result.weightConversions.dag.toFixed(3)} dag</p>
                                <p>{result.weightConversions.kg.toFixed(4)} kg</p>
                                <p>{result.weightConversions.oz.toFixed(3)} oz</p>
                                <p>{result.weightConversions.lb.toFixed(4)} lb</p>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Step-by-step Calculation */}
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <h4 className="font-semibold text-gray-800 mb-3">Formula Used</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            {result.calculationMode === "weight-to-volume" ? (
                              <div className="p-2 bg-red-50 rounded border border-red-200">
                                <strong>Volume = Weight ÷ Density</strong>
                                <br />V = {result.weightInKg.toFixed(4)} kg ÷ {result.density.toFixed(2)} kg/m³ ={" "}
                                {result.volumeInM3.toFixed(8)} m³
                              </div>
                            ) : (
                              <div className="p-2 bg-red-50 rounded border border-red-200">
                                <strong>Weight = Volume × Density</strong>
                                <br />W = {result.volumeInM3.toFixed(8)} m³ × {result.density.toFixed(2)} kg/m³ ={" "}
                                {result.weightInKg.toFixed(4)} kg
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <ChefHat className="w-8 h-8 text-red-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Select an ingredient and enter either{" "}
                          <span className="font-semibold text-red-600">weight OR volume</span> to see conversion
                          results.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-pink-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mr-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">
                    Understanding Cooking Measurement Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Core Formulas</h3>
                    <div className="bg-white p-4 rounded-lg border border-red-200 space-y-2">
                      <p className="text-gray-700">
                        <strong>Weight to Volume:</strong> Volume = Weight ÷ Density
                      </p>
                      <p className="text-gray-700">
                        <strong>Volume to Weight:</strong> Weight = Volume × Density
                      </p>
                      <p className="text-gray-700">
                        <strong>Density:</strong> Mass per unit volume (kg/m³)
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Common Ingredient Densities</h3>
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <p>
                            <strong>Water:</strong> 1000 kg/m³
                          </p>
                          <p>
                            <strong>Flour:</strong> 593 kg/m³
                          </p>
                          <p>
                            <strong>Sugar:</strong> 845 kg/m³
                          </p>
                          <p>
                            <strong>Salt:</strong> 1217 kg/m³
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Milk:</strong> 1030 kg/m³
                          </p>
                          <p>
                            <strong>Oil:</strong> 920 kg/m³
                          </p>
                          <p>
                            <strong>Honey:</strong> 1420 kg/m³
                          </p>
                          <p>
                            <strong>Butter:</strong> 911 kg/m³
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Practical Applications</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Recipe Scaling:</strong> Convert between weight and volume measurements when scaling
                        recipes
                      </li>
                      <li>
                        <strong>International Recipes:</strong> Convert between metric and US customary units
                      </li>
                      <li>
                        <strong>Precision Baking:</strong> Use weight measurements for more accurate results
                      </li>
                      <li>
                        <strong>Ingredient Substitution:</strong> Calculate equivalent amounts when substituting
                        ingredients
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
