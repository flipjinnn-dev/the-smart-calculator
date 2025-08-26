"use client"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Head from "next/head"
import { Droplets, Calculator, RotateCcw, Ruler, Square, Cable as Cube } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function GallonsPerSqftCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states
  const [length, setLength] = useState<string>("")
  const [width, setWidth] = useState<string>("")
  const [height, setHeight] = useState<string>("")

  // Unit selection states for each input
  const [lengthUnit, setLengthUnit] = useState<string>("ft")
  const [widthUnit, setWidthUnit] = useState<string>("ft")
  const [heightUnit, setHeightUnit] = useState<string>("ft")

  // Unit conversion functions
  const convertToFeet = (value: number, unit: string): number => {
    switch (unit) {
      case "ft":
        return value
      case "in":
        return value / 12
      case "m":
        return value * 3.28084
      case "cm":
        return value * 0.0328084
      case "yd":
        return value * 3
      default:
        return value
    }
  }

  const getUnitLabel = (unit: string): string => {
    switch (unit) {
      case "ft":
        return "feet"
      case "in":
        return "inches"
      case "m":
        return "meters"
      case "cm":
        return "centimeters"
      case "yd":
        return "yards"
      default:
        return unit
    }
  }

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0
  }

  // Calculate results
  const calculateResults = () => {
    const lengthValue = getNumericValue(length)
    const widthValue = getNumericValue(width)
    const heightValue = getNumericValue(height)

    const L = convertToFeet(lengthValue, lengthUnit)
    const W = convertToFeet(widthValue, widthUnit)
    const H = convertToFeet(heightValue, heightUnit)

    // Step 1: Calculate area in square feet
    const area = L * W

    // Step 2: Calculate volume in cubic feet
    const volumeFt3 = area * H

    // Step 3: Convert cubic feet to US gallons
    const volumeGal = volumeFt3 * 7.48052

    // Step 4: Calculate gallons per square foot
    const gallonsPerSqft = area > 0 ? volumeGal / area : 0

    const newResult = {
      originalLength: lengthValue,
      originalWidth: widthValue,
      originalHeight: heightValue,
      lengthUnit,
      widthUnit,
      heightUnit,
      length: L,
      width: W,
      height: H,
      area,
      volumeFt3,
      volumeGal,
      gallonsPerSqft,
      steps: {
        step1: `Area = ${L.toFixed(2)} ft × ${W.toFixed(2)} ft = ${area.toFixed(2)} ft²`,
        step2: `Volume = ${area.toFixed(2)} ft² × ${H.toFixed(2)} ft = ${volumeFt3.toFixed(2)} ft³`,
        step3: `Volume in gallons = ${volumeFt3.toFixed(2)} ft³ × 7.48052 = ${volumeGal.toFixed(2)} gallons`,
        step4:
          area > 0
            ? `Gallons per sq ft = ${volumeGal.toFixed(2)} gallons ÷ ${area.toFixed(2)} ft² = ${gallonsPerSqft.toFixed(2)} gal/ft²`
            : "Gallons per sq ft = 0 (no area)",
      },
    }

    setResult(newResult)
    setShowResult(true)
  }

  // Reset function
  const resetCalculator = () => {
    setLength("")
    setWidth("")
    setHeight("")
    setLengthUnit("ft")
    setWidthUnit("ft")
    setHeightUnit("ft")
    setResult(null)
    setShowResult(false)
  }

  return (
    <>
      <Head>
        <title>Gallons per Square Foot Calculator | Smart Calculator</title>
        <meta
          name="description"
          content="Calculate gallons per square foot for liquid coverage, pool volume, tank capacity, and construction applications."
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
                  <p className="text-sm text-gray-500">Gallons per Square Foot Calculator</p>
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
              <Link href="/construction" className="text-gray-500 hover:text-orange-600">
                Construction
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Gallons per Square Foot Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallons per Square Foot Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate liquid coverage, pool volume, tank capacity, and construction applications. Get area, volume,
                and gallons per square foot with step-by-step calculations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Droplets className="w-6 h-6 text-orange-600" />
                      <span>Dimensions</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter length, width, and height in feet to calculate gallons per square foot
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      {/* Input Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Length (L)</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm"
                                type="number"
                                step="0.1"
                                min="0"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                placeholder="0"
                              />
                            </div>
                            <select
                              value={lengthUnit}
                              onChange={(e) => setLengthUnit(e.target.value)}
                              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-orange-200 bg-white text-sm"
                            >
                              <option value="ft">Feet (ft)</option>
                              <option value="in">Inches (in)</option>
                              <option value="m">Meters (m)</option>
                              <option value="cm">Centimeters (cm)</option>
                              <option value="yd">Yards (yd)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Width (W)</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Square className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm"
                                type="number"
                                step="0.1"
                                min="0"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                placeholder="0"
                              />
                            </div>
                            <select
                              value={widthUnit}
                              onChange={(e) => setWidthUnit(e.target.value)}
                              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-orange-200 bg-white text-sm"
                            >
                              <option value="ft">Feet (ft)</option>
                              <option value="in">Inches (in)</option>
                              <option value="m">Meters (m)</option>
                              <option value="cm">Centimeters (cm)</option>
                              <option value="yd">Yards (yd)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Height (H)</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Cube className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm"
                                type="number"
                                step="0.1"
                                min="0"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="0"
                              />
                            </div>
                            <select
                              value={heightUnit}
                              onChange={(e) => setHeightUnit(e.target.value)}
                              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-orange-200 bg-white text-sm"
                            >
                              <option value="ft">Feet (ft)</option>
                              <option value="in">Inches (in)</option>
                              <option value="m">Meters (m)</option>
                              <option value="cm">Centimeters (cm)</option>
                              <option value="yd">Yards (yd)</option>
                            </select>
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
                          Calculate
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
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="w-full space-y-4">
                        {/* Main Results */}
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <p className="text-sm text-orange-700 font-medium">Input Values (converted to feet)</p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                Length: {result.originalLength} {result.lengthUnit} = {result.length.toFixed(2)} ft
                              </p>
                              <p>
                                Width: {result.originalWidth} {result.widthUnit} = {result.width.toFixed(2)} ft
                              </p>
                              <p>
                                Height: {result.originalHeight} {result.heightUnit} = {result.height.toFixed(2)} ft
                              </p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <p className="text-sm text-orange-700 font-medium">Area</p>
                            <p className="text-2xl font-bold text-orange-900">{result.area.toFixed(2)} ft²</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <p className="text-sm text-orange-700 font-medium">Volume</p>
                            <p className="text-xl font-bold text-orange-900">{result.volumeFt3.toFixed(2)} ft³</p>
                            <p className="text-lg font-bold text-orange-900">{result.volumeGal.toFixed(2)} gallons</p>
                          </div>
                          <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                            <p className="text-sm text-orange-700 font-medium">Gallons per Square Foot</p>
                            <p className="text-3xl font-bold text-orange-900">{result.gallonsPerSqft.toFixed(2)}</p>
                            <p className="text-sm text-orange-600">gal/ft²</p>
                          </div>
                        </div>

                        {/* Step-by-step Calculation */}
                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-gray-800 mb-3">Step-by-step Calculation</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>Step 1:</strong> {result.steps.step1}
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>Step 2:</strong> {result.steps.step2}
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>Step 3:</strong> {result.steps.step3}
                            </div>
                            <div className="p-2 bg-orange-50 rounded border border-orange-200">
                              <strong>Step 4:</strong> {result.steps.step4}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Droplets className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter dimensions to see <span className="font-semibold text-orange-600">live results</span>{" "}
                          and step-by-step calculations.
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
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                    Understanding Gallons per Square Foot
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Formulas Used</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200 space-y-2">
                      <p className="text-gray-700">A = L × W (Area in square feet)</p>
                      <p className="text-gray-700">
                        V<sub>ft³</sub> = A × H = (L × W) × H (Volume in cubic feet)
                      </p>
                      <p className="text-gray-700">
                        V<sub>gal</sub> = V<sub>ft³</sub> × 7.48052 (Volume in US gallons)
                      </p>
                      <p className="text-gray-700">
                        G = V<sub>gal</sub> ÷ A (Gallons per square foot)
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Common Applications</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Pool & Spa:</strong> Calculate water volume and chemical dosing rates
                      </li>
                      <li>
                        <strong>Tank Design:</strong> Determine liquid storage capacity per floor area
                      </li>
                      <li>
                        <strong>Irrigation:</strong> Calculate water application rates for landscaping
                      </li>
                      <li>
                        <strong>Construction:</strong> Estimate concrete, paint, or coating coverage
                      </li>
                      <li>
                        <strong>Aquaculture:</strong> Design fish tanks and water systems
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Conversion Factor</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="text-gray-700 mb-2">
                        <strong>1 cubic foot = 7.48052 US gallons</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        This conversion factor is exact and widely used in construction, plumbing, and engineering
                        applications.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Calculation</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Given:</strong> Length = 10 ft, Width = 8 ft, Height = 3 ft
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Solution:</strong>
                      </p>
                      <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded space-y-1">
                        <p>Area = 10 × 8 = 80 ft²</p>
                        <p>Volume = 80 × 3 = 240 ft³</p>
                        <p>Volume in gallons = 240 × 7.48052 = 1,795.32 gallons</p>
                        <p>Gallons per sq ft = 1,795.32 ÷ 80 = 22.44 gal/ft²</p>
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
