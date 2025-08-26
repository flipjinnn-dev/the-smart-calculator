"use client"
import { useRef, useState } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, ChefHat, Wheat } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PastaConverter() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [pastaType, setPastaType] = useState<string>("short")
  const [specificPastaType, setSpecificPastaType] = useState<string>("penne")
  const [cookingPreference, setCookingPreference] = useState<string>("normal")
  const [expansionRatio, setExpansionRatio] = useState<number[]>([1.9])
  const [dryVolume, setDryVolume] = useState<string>("")
  const [volumeUnit, setVolumeUnit] = useState<string>("cups")
  const [bundleCircumference, setBundleCircumference] = useState<string>("")
  const [circumferenceUnit, setCircumferenceUnit] = useState<string>("inches")

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (pastaType === "short") {
      const volumeValue = getNumericValue(dryVolume)
      if (volumeValue <= 0) {
        newErrors.dryVolume = "Please enter a valid dry volume"
      }
    } else {
      const circumferenceValue = getNumericValue(bundleCircumference)
      if (circumferenceValue <= 0) {
        newErrors.bundleCircumference = "Please enter a valid bundle circumference"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0
  }

  // Convert volume units to cups for standardization
  const convertToCups = (value: number, unit: string): number => {
    switch (unit) {
      case "cups":
        return value
      case "ml":
        return value / 236.588 // 1 cup = 236.588 ml
      case "cm3":
        return value / 236.588 // 1 cup = 236.588 cm³
      case "l":
        return value * 4.22675 // 1 liter = 4.22675 cups
      case "pints":
        return value * 2 // 1 pint = 2 cups
      case "fl-oz":
        return value / 8 // 1 cup = 8 fl oz
      case "tbsp":
        return value / 16 // 1 cup = 16 tbsp
      case "tsp":
        return value / 48 // 1 cup = 48 tsp
      default:
        return value
    }
  }

  // Convert cups back to desired unit
  const convertFromCups = (value: number, unit: string): number => {
    switch (unit) {
      case "cups":
        return value
      case "ml":
        return value * 236.588
      case "cm3":
        return value * 236.588
      case "l":
        return value / 4.22675
      case "pints":
        return value / 2
      case "fl-oz":
        return value * 8
      case "tbsp":
        return value * 16
      case "tsp":
        return value * 48
      default:
        return value
    }
  }

  // Convert circumference units to inches for standardization
  const convertToInches = (value: number, unit: string): number => {
    switch (unit) {
      case "inches":
        return value
      case "cm":
        return value / 2.54 // 1 inch = 2.54 cm
      case "mm":
        return value / 25.4 // 1 inch = 25.4 mm
      default:
        return value
    }
  }

  const calculateResults = () => {
    if (!validateInputs()) {
      return
    }

    let cookedVolumeCups = 0
    let ratio = expansionRatio[0]

    // Adjust ratio based on cooking preference
    if (cookingPreference === "al-dente") {
      ratio = Math.max(1.5, ratio - 0.2)
    } else if (cookingPreference === "soft") {
      ratio = Math.min(2.0, ratio + 0.2)
    }

    if (pastaType === "short") {
      const dryVolumeCups = convertToCups(getNumericValue(dryVolume), volumeUnit)
      cookedVolumeCups = dryVolumeCups * ratio
    } else {
      const circumferenceInches = convertToInches(getNumericValue(bundleCircumference), circumferenceUnit)
      cookedVolumeCups = (circumferenceInches / 2.5) * ratio
    }

    const cookedVolumeOriginalUnit =
      pastaType === "short" ? convertFromCups(cookedVolumeCups, volumeUnit) : cookedVolumeCups

    const newResult = {
      pastaType,
      specificPastaType,
      cookingPreference,
      expansionRatio: ratio,
      dryVolume: getNumericValue(dryVolume),
      volumeUnit,
      bundleCircumference: getNumericValue(bundleCircumference),
      circumferenceUnit,
      cookedVolumeCups,
      cookedVolumeOriginalUnit,
      cookedVolumePints: cookedVolumeCups / 2,
      cookedVolumeLiters: cookedVolumeCups * 0.236588,
    }

    setResult(newResult)
    setShowResult(true)
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  }

  const resetCalculator = () => {
    setPastaType("short")
    setSpecificPastaType("penne")
    setCookingPreference("normal")
    setExpansionRatio([1.9])
    setDryVolume("")
    setVolumeUnit("cups")
    setBundleCircumference("")
    setCircumferenceUnit("inches")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>Dry to Cooked Pasta Converter | Smart Calculator</title>
        <meta
          name="description"
          content="Convert dry pasta measurements to cooked equivalents. Supports both short-shaped and long-shaped pasta with adjustable expansion ratios."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
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
                  <p className="text-sm text-gray-500">Dry to Cooked Pasta Converter</p>
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
              <Link href="/food" className="text-gray-500 hover:text-green-600">
                Food
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Pasta Converter</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Wheat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Dry to Cooked Pasta Converter</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert dry pasta measurements to their cooked equivalents for accurate recipe planning. Supports both
                short-shaped and long-shaped pasta with adjustable expansion ratios.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Wheat className="w-6 h-6 text-green-600" />
                      <span>Pasta Conversion Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Select pasta type, enter measurements, and get accurate cooked pasta equivalents
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div>
                        <Label className="text-sm font-medium text-green-800 mb-3 block">Type of Pasta</Label>
                        <RadioGroup value={pastaType} onValueChange={setPastaType} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="short" id="short" />
                            <Label htmlFor="short" className="text-sm font-medium">
                              Short-shaped pasta
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="long" id="long" />
                            <Label htmlFor="long" className="text-sm font-medium">
                              Long-shaped pasta
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-green-800 mb-3 block">Specific Pasta Type</Label>
                        <Select value={specificPastaType} onValueChange={setSpecificPastaType}>
                          <SelectTrigger className="w-full h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {pastaType === "short" ? (
                              <>
                                <SelectItem value="penne">Penne</SelectItem>
                                <SelectItem value="macaroni">Macaroni</SelectItem>
                                <SelectItem value="fusilli">Fusilli</SelectItem>
                                <SelectItem value="rigatoni">Rigatoni</SelectItem>
                                <SelectItem value="farfalle">Farfalle (Bow-tie)</SelectItem>
                                <SelectItem value="rotini">Rotini</SelectItem>
                                <SelectItem value="shells">Shells (Conchiglie)</SelectItem>
                                <SelectItem value="elbow">Elbow</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="spaghetti">Spaghetti</SelectItem>
                                <SelectItem value="linguine">Linguine</SelectItem>
                                <SelectItem value="fettuccine">Fettuccine</SelectItem>
                                <SelectItem value="angel-hair">Angel Hair</SelectItem>
                                <SelectItem value="pappardelle">Pappardelle</SelectItem>
                                <SelectItem value="tagliatelle">Tagliatelle</SelectItem>
                                <SelectItem value="bucatini">Bucatini</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-green-800 mb-3 block">Cooking Preference</Label>
                        <RadioGroup
                          value={cookingPreference}
                          onValueChange={setCookingPreference}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="al-dente" id="al-dente" />
                            <Label htmlFor="al-dente" className="text-sm font-medium">
                              Al Dente
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal" />
                            <Label htmlFor="normal" className="text-sm font-medium">
                              Normal
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="soft" id="soft" />
                            <Label htmlFor="soft" className="text-sm font-medium">
                              Soft
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {pastaType === "short" ? (
                        <div className="space-y-6">
                          <div>
                            <Label className="text-sm font-medium text-green-800 mb-3 block">Dry Volume</Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Wheat className="h-5 w-5 text-green-500" />
                                </div>
                                <Input
                                  className={`pl-10 h-12 rounded-xl border-green-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                                    errors.dryVolume ? "border-red-500" : ""
                                  }`}
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  value={dryVolume}
                                  onChange={(e) => {
                                    setDryVolume(e.target.value)
                                    setErrors({ ...errors, dryVolume: "" })
                                  }}
                                  placeholder="1.0"
                                />
                              </div>
                              <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                                <SelectTrigger className="w-20 h-12 border-2 focus:border-green-500">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cups">cups</SelectItem>
                                  <SelectItem value="ml">ml</SelectItem>
                                  <SelectItem value="l">L</SelectItem>
                                  <SelectItem value="fl-oz">fl oz</SelectItem>
                                  <SelectItem value="pints">pints</SelectItem>
                                  <SelectItem value="tbsp">tbsp</SelectItem>
                                  <SelectItem value="tsp">tsp</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.dryVolume && <p className="text-red-500 text-xs mt-1">{errors.dryVolume}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-green-800 mb-3 block">
                              Expansion Ratio: {expansionRatio[0].toFixed(1)}x
                            </Label>
                            <Slider
                              value={expansionRatio}
                              onValueChange={setExpansionRatio}
                              max={2.0}
                              min={1.5}
                              step={0.1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>1.5x (Firmer)</span>
                              <span>2.0x (Softer)</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Label className="text-sm font-medium text-green-800 mb-3 block">
                            Dry Bundle Circumference
                          </Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Wheat className="h-5 w-5 text-green-500" />
                              </div>
                              <Input
                                className={`pl-10 h-12 rounded-xl border-green-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${
                                  errors.bundleCircumference ? "border-red-500" : ""
                                }`}
                                type="number"
                                step="0.1"
                                min="0"
                                value={bundleCircumference}
                                onChange={(e) => {
                                  setBundleCircumference(e.target.value)
                                  setErrors({ ...errors, bundleCircumference: "" })
                                }}
                                placeholder="2.5"
                              />
                            </div>
                            <Select value={circumferenceUnit} onValueChange={setCircumferenceUnit}>
                              <SelectTrigger className="w-20 h-12 border-2 focus:border-green-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="inches">in</SelectItem>
                                <SelectItem value="cm">cm</SelectItem>
                                <SelectItem value="mm">mm</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.bundleCircumference && (
                            <p className="text-red-500 text-xs mt-1">{errors.bundleCircumference}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Tip: 2.5" bundle ≈ 1 cup cooked spaghetti</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={calculateResults}
                          className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Calculator className="w-5 h-5 mr-2" />
                          Calculate
                        </Button>
                        <Button
                          onClick={resetCalculator}
                          variant="outline"
                          className="h-14 px-6 text-lg font-semibold border-green-300 text-green-600 hover:bg-green-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
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
                  className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-50 sticky top-24 h-fit"
                >
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                      <Wheat className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="w-full space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700 font-medium">Pasta Type</p>
                          <p className="text-lg font-semibold text-gray-800 capitalize">{result.specificPastaType}</p>
                          <p className="text-sm text-gray-600">
                            {result.pastaType}-shaped | Cooking: {result.cookingPreference} | Ratio:{" "}
                            {result.expansionRatio.toFixed(1)}x
                          </p>
                        </div>

                        {result.pastaType === "short" ? (
                          <>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <p className="text-sm text-green-700 font-medium">Dry Volume</p>
                              <p className="text-lg font-semibold text-gray-800">
                                {result.dryVolume} {result.volumeUnit}
                              </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg border border-green-300">
                              <p className="text-sm text-green-700 font-medium">Cooked Volume</p>
                              <p className="text-3xl font-bold text-green-900">
                                {result.cookedVolumeOriginalUnit.toFixed(1)}
                              </p>
                              <p className="text-sm text-green-600">{result.volumeUnit}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <p className="text-sm text-green-700 font-medium">Bundle Circumference</p>
                              <p className="text-lg font-semibold text-gray-800">
                                {result.bundleCircumference} {result.circumferenceUnit}
                              </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg border border-green-300">
                              <p className="text-sm text-green-700 font-medium">Cooked Volume</p>
                              <p className="text-3xl font-bold text-green-900">{result.cookedVolumeCups.toFixed(1)}</p>
                              <p className="text-sm text-green-600">cups</p>
                            </div>
                          </>
                        )}

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-gray-800 mb-3">Additional Conversions</h4>
                          <div className="text-sm space-y-1 text-gray-700">
                            <p>• {result.cookedVolumeCups.toFixed(1)} cups</p>
                            <p>• {result.cookedVolumePints.toFixed(1)} pints</p>
                            <p>• {result.cookedVolumeLiters.toFixed(1)} liters</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-gray-800 mb-3">Formula Used</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            {result.pastaType === "short" ? (
                              <div className="p-2 bg-green-50 rounded border border-green-200">
                                <strong>Short Pasta:</strong>
                                <br />
                                Cooked Volume = Dry Volume × Expansion Ratio
                                <br />
                                {result.cookedVolumeOriginalUnit.toFixed(1)} = {result.dryVolume} ×{" "}
                                {result.expansionRatio.toFixed(1)}
                              </div>
                            ) : (
                              <div className="p-2 bg-green-50 rounded border border-green-200">
                                <strong>Long Pasta:</strong>
                                <br />
                                Cooked Volume = (Circumference ÷ 2.5) × Ratio
                                <br />
                                {result.cookedVolumeCups.toFixed(1)} = ({result.bundleCircumference} ÷ 2.5) ×{" "}
                                {result.expansionRatio.toFixed(1)}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-xs text-gray-600 italic">
                            Note: Values are estimates; exact yield varies by pasta type and cooking time.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Wheat className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Select pasta type and enter measurements to see cooked pasta equivalents.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mr-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    Understanding Pasta Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Expansion Ratios</h3>
                    <div className="bg-white p-4 rounded-lg border border-green-200 space-y-2">
                      <p className="text-gray-700">
                        <strong>Short Pasta:</strong> Typically expands 1.5-2x when cooked (default: 1.9x)
                      </p>
                      <p className="text-gray-700">
                        <strong>Long Pasta:</strong> 2.5" dry bundle ≈ 1 cup cooked pasta
                      </p>
                      <p className="text-gray-700">
                        <strong>Cooking Preference:</strong> Al dente uses lower ratios, soft uses higher ratios
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Calculations</h3>
                    <div className="bg-white p-4 rounded-lg border border-green-200 space-y-3">
                      <div>
                        <p className="text-gray-700 font-medium">Short Pasta Example:</p>
                        <p className="text-sm text-gray-600">1 cup dry penne × 1.9 = 1.9 cups cooked penne</p>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Long Pasta Example:</p>
                        <p className="text-sm text-gray-600">2.5" dry spaghetti bundle = 1 cup cooked spaghetti</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Practical Tips</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Recipe Planning:</strong> Use these conversions to determine how much dry pasta to cook
                      </li>
                      <li>
                        <strong>Portion Control:</strong> 1 cup cooked pasta ≈ 1 serving for most dishes
                      </li>
                      <li>
                        <strong>Meal Prep:</strong> Calculate bulk cooking amounts for weekly meal preparation
                      </li>
                      <li>
                        <strong>Leftover Management:</strong> Convert cooked pasta back to dry equivalents for storage
                        planning
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
