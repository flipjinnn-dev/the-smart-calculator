"use client"
import { useRef, useState } from "react"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Head from "next/head"
import { Package, Calculator, RotateCcw, Ruler, Square, Cable as Cube, Weight } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function CuboidWeightCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states
  const [length, setLength] = useState<string>("")
  const [width, setWidth] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [density, setDensity] = useState<string>("")

  // Unit selection states
  const [lengthUnit, setLengthUnit] = useState<string>("cm")
  const [widthUnit, setWidthUnit] = useState<string>("cm")
  const [heightUnit, setHeightUnit] = useState<string>("cm")

  // Material presets (density in kg/m³)
  const materialPresets = {
    custom: { name: "Custom", density: "" },
    wood_pine: { name: "Pine Wood", density: "500" },
    wood_oak: { name: "Oak Wood", density: "750" },
    aluminum: { name: "Aluminum", density: "2700" },
    steel: { name: "Steel", density: "7850" },
    concrete: { name: "Concrete", density: "2400" },
    plastic_pvc: { name: "PVC Plastic", density: "1400" },
    glass: { name: "Glass", density: "2500" },
    copper: { name: "Copper", density: "8960" },
    water: { name: "Water", density: "1000" },
  }

  // Unit conversion functions to centimeters
  const convertToCm = (value: number, unit: string): number => {
    switch (unit) {
      case "cm":
        return value
      case "mm":
        return value / 10
      case "m":
        return value * 100
      case "in":
        return value * 2.54
      case "ft":
        return value * 30.48
      default:
        return value
    }
  }

  const getUnitLabel = (unit: string): string => {
    switch (unit) {
      case "cm":
        return "centimeters"
      case "mm":
        return "millimeters"
      case "m":
        return "meters"
      case "in":
        return "inches"
      case "ft":
        return "feet"
      default:
        return unit
    }
  }

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0
  }

  // Handle material preset selection
  const handleMaterialChange = (materialKey: string) => {
    const material = materialPresets[materialKey as keyof typeof materialPresets]
    setDensity(material.density)
  }

  // Calculate results
  const calculateResults = () => {
    const lengthValue = getNumericValue(length)
    const widthValue = getNumericValue(width)
    const heightValue = getNumericValue(height)
    const densityValue = getNumericValue(density)

    // Convert all dimensions to centimeters
    const L = convertToCm(lengthValue, lengthUnit)
    const W = convertToCm(widthValue, widthUnit)
    const H = convertToCm(heightValue, heightUnit)

    // Step 1: Calculate volume in cubic centimeters
    const volumeCm3 = L * W * H

    // Step 2: Convert volume to cubic meters
    const volumeM3 = volumeCm3 / 1000000

    // Step 3: Calculate weight in kilograms
    const weight = volumeM3 * densityValue

    const newResult = {
      originalLength: lengthValue,
      originalWidth: widthValue,
      originalHeight: heightValue,
      originalDensity: densityValue,
      lengthUnit,
      widthUnit,
      heightUnit,
      length: L,
      width: W,
      height: H,
      density: densityValue,
      volumeCm3,
      volumeM3,
      weight,
      steps: {
        step1: `Volume (cm³) = ${L.toFixed(2)} cm × ${W.toFixed(2)} cm × ${H.toFixed(2)} cm = ${volumeCm3.toLocaleString()} cm³`,
        step2: `Volume (m³) = ${volumeCm3.toLocaleString()} cm³ ÷ 1,000,000 = ${volumeM3.toFixed(6)} m³`,
        step3: `Weight = ${volumeM3.toFixed(6)} m³ × ${densityValue} kg/m³ = ${weight.toFixed(2)} kg`,
      },
    }

    setResult(newResult)
    setShowResult(true)
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  }

  // Reset function
  const resetCalculator = () => {
    setLength("")
    setWidth("")
    setHeight("")
    setDensity("")
    setLengthUnit("cm")
    setWidthUnit("cm")
    setHeightUnit("cm")
    setResult(null)
    setShowResult(false)
  }

  return (
    <>
      <Head>
        <title>Size to Weight Calculator – Quick Conversion Tool</title>
        <meta
          name="description"
          content="Convert size to weight accurately. Use our free calculator for shipping, packaging, and material weight estimation."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
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
                  <p className="text-sm text-gray-500">Cuboid Weight Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-teal-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/construction" className="text-gray-500 hover:text-teal-600">
                Construction
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Cuboid Weight Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cuboid Weight Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate the weight of rectangular cuboids from dimensions and material density. Supports multiple
                units and includes material presets for common materials.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Package className="w-6 h-6 text-teal-600" />
                      <span>Dimensions & Material</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter length, width, height, and material density to calculate weight
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Length (L)</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm"
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
                              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm"
                            >
                              <option value="cm">Centimeters (cm)</option>
                              <option value="mm">Millimeters (mm)</option>
                              <option value="m">Meters (m)</option>
                              <option value="in">Inches (in)</option>
                              <option value="ft">Feet (ft)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Width (W)</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Square className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm"
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
                              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm"
                            >
                              <option value="cm">Centimeters (cm)</option>
                              <option value="mm">Millimeters (mm)</option>
                              <option value="m">Meters (m)</option>
                              <option value="in">Inches (in)</option>
                              <option value="ft">Feet (ft)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Height (H)</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Cube className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input
                                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm"
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
                              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm"
                            >
                              <option value="cm">Centimeters (cm)</option>
                              <option value="mm">Millimeters (mm)</option>
                              <option value="m">Meters (m)</option>
                              <option value="in">Inches (in)</option>
                              <option value="ft">Feet (ft)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Material & Density</Label>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs text-gray-600 mb-2 block">Material Presets</Label>
                            <select
                              onChange={(e) => handleMaterialChange(e.target.value)}
                              className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm"
                            >
                              <option value="custom">Select Material (Optional)</option>
                              {Object.entries(materialPresets).map(([key, material]) => (
                                <option key={key} value={key}>
                                  {material.name} {material.density && `(${material.density} kg/m³)`}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Weight className="h-5 w-5 text-teal-500" />
                            </div>
                            <Input
                              className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm"
                              type="number"
                              step="0.1"
                              min="0"
                              value={density}
                              onChange={(e) => setDensity(e.target.value)}
                              placeholder="Enter density in kg/m³"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-sm text-gray-500">kg/m³</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={calculateResults}
                          className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Calculator className="w-5 h-5 mr-2" />
                          Calculate Weight
                        </Button>
                        <Button
                          onClick={resetCalculator}
                          variant="outline"
                          className="h-14 px-6 text-lg font-semibold border-teal-300 text-teal-600 hover:bg-teal-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
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
                  className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-50 sticky top-24 h-fit"
                >
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center mb-3 shadow-lg">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white p-4 rounded-lg border border-teal-200">
                            <p className="text-sm text-teal-700 font-medium">Input Values (converted to cm)</p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                Length: {result.originalLength} {result.lengthUnit} = {result.length.toFixed(2)} cm
                              </p>
                              <p>
                                Width: {result.originalWidth} {result.widthUnit} = {result.width.toFixed(2)} cm
                              </p>
                              <p>
                                Height: {result.originalHeight} {result.heightUnit} = {result.height.toFixed(2)} cm
                              </p>
                              <p>Density: {result.originalDensity} kg/m³</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-teal-200">
                            <p className="text-sm text-teal-700 font-medium">Volume (cm³)</p>
                            <p className="text-2xl font-bold text-teal-900">{result.volumeCm3.toLocaleString()}</p>
                            <p className="text-sm text-teal-600">cubic centimeters</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-teal-200">
                            <p className="text-sm text-teal-700 font-medium">Volume (m³)</p>
                            <p className="text-xl font-bold text-teal-900">{result.volumeM3.toFixed(6)}</p>
                            <p className="text-sm text-teal-600">cubic meters</p>
                          </div>
                          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-4 rounded-lg border border-teal-300">
                            <p className="text-sm text-teal-700 font-medium">Weight</p>
                            <p className="text-3xl font-bold text-teal-900">{result.weight.toFixed(2)}</p>
                            <p className="text-sm text-teal-600">kilograms</p>
                          </div>
                        </div>

                        {/* Step-by-step Calculation */}
                        <div className="bg-white p-4 rounded-lg border border-teal-200">
                          <h4 className="font-semibold text-gray-800 mb-3">Step-by-step Calculation</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>Step 1:</strong> {result.steps.step1}
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>Step 2:</strong> {result.steps.step2}
                            </div>
                            <div className="p-2 bg-teal-50 rounded border border-teal-200">
                              <strong>Step 3:</strong> {result.steps.step3}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Package className="w-8 h-8 text-teal-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter dimensions and density to see{" "}
                          <span className="font-semibold text-teal-600">weight calculation</span> and step-by-step
                          results.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">
                    Understanding Cuboid Weight Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Formulas Used</h3>
                    <div className="bg-white p-4 rounded-lg border border-teal-200 space-y-2">
                      <p className="text-gray-700">
                        V<sub>cm³</sub> = L × W × H (Volume in cubic centimeters)
                      </p>
                      <p className="text-gray-700">
                        V<sub>m³</sub> = V<sub>cm³</sub> ÷ 1,000,000 (Volume in cubic meters)
                      </p>
                      <p className="text-gray-700">
                        Weight = V<sub>m³</sub> × ρ (Weight in kilograms)
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Common Material Densities</h3>
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <p>
                            <strong>Wood:</strong> 400-800 kg/m³
                          </p>
                          <p>
                            <strong>Aluminum:</strong> 2,700 kg/m³
                          </p>
                          <p>
                            <strong>Steel:</strong> 7,850 kg/m³
                          </p>
                          <p>
                            <strong>Concrete:</strong> 2,400 kg/m³
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Plastic (PVC):</strong> 1,400 kg/m³
                          </p>
                          <p>
                            <strong>Glass:</strong> 2,500 kg/m³
                          </p>
                          <p>
                            <strong>Copper:</strong> 8,960 kg/m³
                          </p>
                          <p>
                            <strong>Water:</strong> 1,000 kg/m³
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Calculation</h3>
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Given:</strong> Length = 50 cm, Width = 40 cm, Height = 30 cm, Density = 800 kg/m³
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Solution:</strong>
                      </p>
                      <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded space-y-1">
                        <p>Volume (cm³) = 50 × 40 × 30 = 60,000 cm³</p>
                        <p>Volume (m³) = 60,000 ÷ 1,000,000 = 0.06 m³</p>
                        <p>Weight = 0.06 × 800 = 48 kg</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Applications</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Engineering:</strong> Calculate material requirements and structural loads
                      </li>
                      <li>
                        <strong>Manufacturing:</strong> Estimate product weights for shipping and handling
                      </li>
                      <li>
                        <strong>Construction:</strong> Determine concrete, steel, and material quantities
                      </li>
                      <li>
                        <strong>Packaging:</strong> Calculate shipping weights and costs
                      </li>
                      <li>
                        <strong>Design:</strong> Optimize material usage and weight distribution
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
