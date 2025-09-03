"use client"
import { useRef, useState } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Square, Ruler } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SqftToCubicYardsCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states
  const [area, setArea] = useState<string>("")
  const [depth, setDepth] = useState<string>("")

  // Unit selection states
  const [areaUnit, setAreaUnit] = useState<string>("sqft")
  const [depthUnit, setDepthUnit] = useState<string>("in")

  // Unit conversion functions
  const convertAreaToSqft = (value: number, unit: string): number => {
    switch (unit) {
      case "sqft":
        return value
      case "sqin":
        return value / 144
      case "sqyd":
        return value * 9
      case "sqm":
        return value * 10.764
      case "sqcm":
        return value / 929.03
      default:
        return value
    }
  }

  const convertDepthToInches = (value: number, unit: string): number => {
    switch (unit) {
      case "in":
        return value
      case "ft":
        return value * 12
      case "yd":
        return value * 36
      case "cm":
        return value / 2.54
      case "m":
        return value * 39.37
      default:
        return value
    }
  }

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0
  }

  // Calculate results
  const calculateResults = () => {
    const areaValue = getNumericValue(area)
    const depthValue = getNumericValue(depth)

    // Convert to standard units (square feet and inches)
    const areaInSqft = convertAreaToSqft(areaValue, areaUnit)
    const depthInInches = convertDepthToInches(depthValue, depthUnit)

    // Step 1: Convert depth from inches to feet
    const depthInFeet = depthInInches / 12

    // Step 2: Calculate cubic feet
    const cubicFeet = areaInSqft * depthInFeet

    // Step 3: Convert cubic feet to cubic yards
    const cubicYards = cubicFeet / 27

    // Direct formula: cubic_yd = (area * depth) / 324
    const directCubicYards = (areaInSqft * depthInInches) / 324

    const newResult = {
      originalArea: areaValue,
      originalDepth: depthValue,
      areaUnit,
      depthUnit,
      areaInSqft,
      depthInInches,
      depthInFeet,
      cubicFeet,
      cubicYards,
      directCubicYards,
      steps: {
        step1: `Convert depth: ${depthInInches.toFixed(2)} inches ÷ 12 = ${depthInFeet.toFixed(4)} feet`,
        step2: `Calculate cubic feet: ${areaInSqft.toFixed(2)} ft² × ${depthInFeet.toFixed(4)} ft = ${cubicFeet.toFixed(4)} ft³`,
        step3: `Convert to cubic yards: ${cubicFeet.toFixed(4)} ft³ ÷ 27 = ${cubicYards.toFixed(2)} yd³`,
        direct: `Direct formula: (${areaInSqft.toFixed(2)} × ${depthInInches.toFixed(2)}) ÷ 324 = ${directCubicYards.toFixed(2)} yd³`,
      },
    }

    setResult(newResult)
    setShowResult(true)
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  }

  // Reset function
  const resetCalculator = () => {
    setArea("")
    setDepth("")
    setAreaUnit("sqft")
    setDepthUnit("in")
    setResult(null)
    setShowResult(false)
  }

  return (
    <>
      <Head>
        <title>Sq Ft to Cubic Yards Calculator – Easy Converter</title>
        <meta
          name="description"
          content="Convert square feet to cubic yards instantly. Use our free calculator for landscaping, concrete, and construction projects."
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
                  <p className="text-sm text-gray-500">Square Feet to Cubic Yards Calculator</p>
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
              <span className="text-gray-900 font-medium">Square Feet to Cubic Yards Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Square Feet to Cubic Yards Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert area measurements with depth into volume in cubic yards. Perfect for construction, landscaping,
                and material estimation projects.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>Area & Depth Inputs</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter area and depth measurements to calculate volume in cubic yards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">Area</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Square className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm"
                                type="number"
                                step="0.1"
                                min="0"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="0"
                              />
                            </div>
                            <Select value={areaUnit} onValueChange={setAreaUnit}>
                              <SelectTrigger className="w-20 h-12 border-2 focus:border-orange-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sqft">ft²</SelectItem>
                                <SelectItem value="sqin">in²</SelectItem>
                                <SelectItem value="sqyd">yd²</SelectItem>
                                <SelectItem value="sqm">m²</SelectItem>
                                <SelectItem value="sqcm">cm²</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">Depth</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm"
                                type="number"
                                step="0.1"
                                min="0"
                                value={depth}
                                onChange={(e) => setDepth(e.target.value)}
                                placeholder="0"
                              />
                            </div>
                            <Select value={depthUnit} onValueChange={setDepthUnit}>
                              <SelectTrigger className="w-16 h-12 border-2 focus:border-orange-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="in">in</SelectItem>
                                <SelectItem value="ft">ft</SelectItem>
                                <SelectItem value="yd">yd</SelectItem>
                                <SelectItem value="cm">cm</SelectItem>
                                <SelectItem value="m">m</SelectItem>
                              </SelectContent>
                            </Select>
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
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <p className="text-sm text-orange-700 font-medium">Input Values (converted)</p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                Area: {result.originalArea} {result.areaUnit} = {result.areaInSqft.toFixed(2)} ft²
                              </p>
                              <p>
                                Depth: {result.originalDepth} {result.depthUnit} = {result.depthInInches.toFixed(2)}{" "}
                                inches
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                            <p className="text-sm text-orange-700 font-medium">Volume</p>
                            <p className="text-3xl font-bold text-orange-900">{result.cubicYards.toFixed(2)}</p>
                            <p className="text-sm text-orange-600">cubic yards (yd³)</p>
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
                            <div className="p-2 bg-orange-50 rounded border border-orange-200">
                              <strong>Step 3:</strong> {result.steps.step3}
                            </div>
                            <div className="p-2 bg-amber-50 rounded border border-amber-200">
                              <strong>Direct Formula:</strong> {result.steps.direct}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Calculator className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter area and depth to see{" "}
                          <span className="font-semibold text-orange-600">volume calculation</span> in cubic yards.
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
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                    Understanding Square Feet to Cubic Yards Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Formulas Used</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200 space-y-2">
                      <p className="text-gray-700">
                        <strong>Step 1:</strong> Convert depth to feet: depth_ft = depth_in ÷ 12
                      </p>
                      <p className="text-gray-700">
                        <strong>Step 2:</strong> Calculate cubic feet: cubic_ft = area_ft² × depth_ft
                      </p>
                      <p className="text-gray-700">
                        <strong>Step 3:</strong> Convert to cubic yards: cubic_yd = cubic_ft ÷ 27
                      </p>
                      <p className="text-gray-700">
                        <strong>Direct Formula:</strong> cubic_yd = (area_ft² × depth_in) ÷ 324
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Calculation</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Given:</strong> Area = 100 ft², Depth = 6 inches
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Solution:</strong>
                      </p>
                      <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded space-y-1">
                        <p>Step 1: 6 inches ÷ 12 = 0.5 feet</p>
                        <p>Step 2: 100 ft² × 0.5 ft = 50 ft³</p>
                        <p>Step 3: 50 ft³ ÷ 27 = 1.85 yd³</p>
                        <p>Direct: (100 × 6) ÷ 324 = 1.85 yd³</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Common Applications</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Concrete:</strong> Calculate concrete needed for slabs, driveways, and foundations
                      </li>
                      <li>
                        <strong>Landscaping:</strong> Estimate mulch, soil, or gravel for garden beds
                      </li>
                      <li>
                        <strong>Construction:</strong> Determine material quantities for excavation projects
                      </li>
                      <li>
                        <strong>Paving:</strong> Calculate asphalt or paving material requirements
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
