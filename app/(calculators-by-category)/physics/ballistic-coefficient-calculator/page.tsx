"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Target, Calculator, Ruler } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function BallisticCoefficientCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [inputMethod, setInputMethod] = useState("area")
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states
  const [mass, setMass] = useState(180) // grams
  const [area, setArea] = useState(400) // mm²
  const [diameter, setDiameter] = useState(22.6) // mm
  const [dragCoefficient, setDragCoefficient] = useState(0.3)

  // Unit selection states
  const [massUnit, setMassUnit] = useState("g") // g, kg, gr, oz
  const [areaUnit, setAreaUnit] = useState("mm²") // mm², cm², in²
  const [diameterUnit, setDiameterUnit] = useState("mm") // mm, cm, in

  // Validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Unit conversion functions
  const convertMassToKg = (value: number, unit: string): number => {
    switch (unit) {
      case "g":
        return value / 1000
      case "kg":
        return value
      case "gr":
        return value * 0.00006479891 // 1 grain = 0.00006479891 kg
      case "oz":
        return value * 0.0283495 // 1 ounce = 0.0283495 kg
      default:
        return value / 1000
    }
  }

  const convertAreaToM2 = (value: number, unit: string): number => {
    switch (unit) {
      case "mm²":
        return value * 1e-6
      case "cm²":
        return value * 1e-4
      case "in²":
        return value * 0.00064516 // 1 in² = 0.00064516 m²
      default:
        return value * 1e-6
    }
  }

  const convertDiameterToM = (value: number, unit: string): number => {
    switch (unit) {
      case "mm":
        return value / 1000
      case "cm":
        return value / 100
      case "in":
        return value * 0.0254 // 1 inch = 0.0254 m
      default:
        return value / 1000
    }
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (mass <= 0) {
      newErrors.mass = "Mass must be greater than 0"
    }
    if (inputMethod === "area" && area <= 0) {
      newErrors.area = "Area must be greater than 0"
    }
    if (inputMethod === "diameter" && diameter <= 0) {
      newErrors.diameter = "Diameter must be greater than 0"
    }
    if (dragCoefficient <= 0) {
      newErrors.dragCoefficient = "Drag coefficient must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateBallisticCoefficient = () => {
    if (!validateInputs()) {
      return
    }

    // Convert mass to kg using selected unit
    const massKg = convertMassToKg(mass, massUnit)

    // Calculate area in m²
    let areaM2: number
    if (inputMethod === "area") {
      // Convert area using selected unit
      areaM2 = convertAreaToM2(area, areaUnit)
    } else {
      // Calculate area from diameter: A = π * (d/2)²
      // Convert diameter to meters first
      const diameterM = convertDiameterToM(diameter, diameterUnit)
      areaM2 = Math.PI * Math.pow(diameterM / 2, 2)
    }

    // Calculate Ballistic Coefficient: B = m / (Cd × A)
    const ballisticCoefficient = massKg / (dragCoefficient * areaM2)

    // Calculate Sectional Density: SD = m / A
    const sectionalDensity = massKg / areaM2

    setResult({
      ballisticCoefficient: ballisticCoefficient,
      sectionalDensity: sectionalDensity,
      massKg: massKg,
      areaM2: areaM2,
      dragCoefficient: dragCoefficient,
      formula: "B = m / (Cd × A)",
      originalMass: mass,
      massUnit: massUnit,
      originalArea: inputMethod === "area" ? area : null,
      areaUnit: areaUnit,
      originalDiameter: inputMethod === "diameter" ? diameter : null,
      diameterUnit: diameterUnit,
    })
    setShowResult(true)
  }

  const handleCalculate = () => {
    calculateBallisticCoefficient()
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  }

  return (
    <>
      <Head>
        <title>Ballistic Coefficient Calculator – Bullet Efficiency</title>
        <meta
          name="description"
          content="Calculate ballistic coefficient easily. Use our free ballistic coefficient calculator to measure bullet aerodynamics and accuracy."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                  <p className="text-sm text-gray-500">Ballistic Coefficient Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/physics" className="text-gray-500 hover:text-blue-600">
                Physics
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Ballistic Coefficient Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ballistic Coefficient Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate the ballistic coefficient of projectiles using mass, cross-sectional area, and drag
                coefficient. Essential for ballistics analysis and projectile performance evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="w-6 h-6 text-blue-600" />
                      <span>Ballistic Coefficient Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter projectile parameters to calculate ballistic coefficient
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">Input Method</Label>
                      <Tabs value={inputMethod} onValueChange={setInputMethod} className="w-full">
                        <TabsList className="bg-gradient-to-r from-blue-50 to-teal-50 grid grid-cols-2 gap-1 mb-6 h-auto p-2 rounded-xl border border-blue-200 shadow-sm">
                          <TabsTrigger
                            value="area"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-teal-100 hover:shadow-md"
                          >
                            Cross-sectional Area
                          </TabsTrigger>
                          <TabsTrigger
                            value="diameter"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-teal-100 hover:shadow-md"
                          >
                            Diameter
                          </TabsTrigger>
                        </TabsList>

                        <div className="space-y-6">
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">Mass of Projectile</Label>
                            <div className="flex gap-3">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calculator className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.mass ? "border-red-500" : ""}`}
                                  type="number"
                                  value={mass}
                                  onChange={(e) => setMass(Number(e.target.value))}
                                />
                              </div>
                              <Select value={massUnit} onValueChange={setMassUnit}>
                                <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="g">g</SelectItem>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="gr">gr</SelectItem>
                                  <SelectItem value="oz">oz</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.mass && <p className="text-red-500 text-sm mt-1">{errors.mass}</p>}
                          </div>

                          <TabsContent value="area" className="mt-0">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Cross-sectional Area
                              </Label>
                              <div className="flex gap-3">
                                <div className="relative flex-1">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Ruler className="h-5 w-5 text-blue-500" />
                                  </div>
                                  <Input
                                    className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.area ? "border-red-500" : ""}`}
                                    type="number"
                                    value={area}
                                    onChange={(e) => setArea(Number(e.target.value))}
                                  />
                                </div>
                                <Select value={areaUnit} onValueChange={setAreaUnit}>
                                  <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mm²">mm²</SelectItem>
                                    <SelectItem value="cm²">cm²</SelectItem>
                                    <SelectItem value="in²">in²</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                            </div>
                          </TabsContent>

                          <TabsContent value="diameter" className="mt-0">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Diameter</Label>
                              <div className="flex gap-3">
                                <div className="relative flex-1">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Ruler className="h-5 w-5 text-blue-500" />
                                  </div>
                                  <Input
                                    className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.diameter ? "border-red-500" : ""}`}
                                    type="number"
                                    value={diameter}
                                    onChange={(e) => setDiameter(Number(e.target.value))}
                                  />
                                </div>
                                <Select value={diameterUnit} onValueChange={setDiameterUnit}>
                                  <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mm">mm</SelectItem>
                                    <SelectItem value="cm">cm</SelectItem>
                                    <SelectItem value="in">in</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {errors.diameter && <p className="text-red-500 text-sm mt-1">{errors.diameter}</p>}
                              <p className="text-xs text-gray-500 mt-1">Area will be calculated as π × (d/2)²</p>
                            </div>
                          </TabsContent>

                          {/* Drag Coefficient Input */}
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">
                              Drag Coefficient (Cd)
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Target className="h-5 w-5 text-blue-500" />
                              </div>
                              <Input
                                className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.dragCoefficient ? "border-red-500" : ""}`}
                                type="number"
                                step="0.01"
                                value={dragCoefficient}
                                onChange={(e) => setDragCoefficient(Number(e.target.value))}
                              />
                            </div>
                            {errors.dragCoefficient && (
                              <p className="text-red-500 text-sm mt-1">{errors.dragCoefficient}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              Dimensionless coefficient (typical range: 0.1-0.5)
                            </p>
                          </div>
                        </div>
                      </Tabs>
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>Formula:</strong> B = m / (Cd × A)
                        <br />
                        <strong>Where:</strong> B = Ballistic Coefficient (kg/m²), m = mass (kg), Cd = drag coefficient,
                        A = area (m²)
                      </p>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                    >
                      Calculate Ballistic Coefficient
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card
                  ref={resultsRef}
                  className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-teal-50 h-full flex flex-col justify-center items-center p-8"
                >
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div>
                          <p className="text-lg text-gray-600 mb-2 font-medium">Ballistic Coefficient</p>
                          <p className="text-4xl font-extrabold text-blue-900 mb-2 drop-shadow-lg">
                            {result.ballisticCoefficient ? result.ballisticCoefficient.toFixed(0) : "0"} kg/m²
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1 font-medium">Sectional Density</p>
                          <p className="text-2xl font-bold text-teal-700">
                            {result.sectionalDensity ? result.sectionalDensity.toFixed(0) : "0"} kg/m²
                          </p>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-600">
                            Mass: {result.originalMass} {result.massUnit} (
                            {result.massKg ? result.massKg.toFixed(3) : "0"} kg)
                            <br />
                            {result.originalArea ? (
                              <>
                                Area: {result.originalArea} {result.areaUnit} (
                                {result.areaM2 ? (result.areaM2 * 1e6).toFixed(1) : "0"} mm²)
                              </>
                            ) : (
                              <>
                                Diameter: {result.originalDiameter} {result.diameterUnit} (Area:{" "}
                                {result.areaM2 ? (result.areaM2 * 1e6).toFixed(1) : "0"} mm²)
                              </>
                            )}
                            <br />
                            Cd: {result.dragCoefficient ? result.dragCoefficient.toFixed(2) : "0"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Target className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter values and click <span className="font-semibold text-blue-600">Calculate</span> to see
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
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-teal-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mr-3 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                    Understanding Ballistic Coefficient
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What is Ballistic Coefficient?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ballistic coefficient (BC) is a measure of a projectile's ability to overcome air resistance in
                      flight. Higher BC values indicate better aerodynamic efficiency and less velocity loss over
                      distance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Calculation</h3>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Given:</strong>
                      </p>
                      <ul className="text-sm text-gray-700 list-disc list-inside mb-3">
                        <li>Mass (m) = 180 g = 0.180 kg</li>
                        <li>Area (A) = 400 mm² = 4.00 × 10⁻⁴ m²</li>
                        <li>Drag coefficient (Cd) = 0.30</li>
                      </ul>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Calculation:</strong>
                      </p>
                      <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        B = 0.180 / (0.30 × 4.00 × 10⁻⁴)
                        <br />B = 0.180 / (1.20 × 10⁻⁴)
                        <br />B ≈ 1500 kg/m²
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Relationships</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Sectional Density (SD):</strong> SD = m / A (mass per unit area)
                      </li>
                      <li>
                        <strong>Alternative form:</strong> B = SD / Cd
                      </li>
                      <li>
                        <strong>Higher BC:</strong> Better long-range performance, less wind drift
                      </li>
                      <li>
                        <strong>Typical values:</strong> 0.2-0.8 kg/m² (bullets), 0.1-0.3 kg/m² (pellets)
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
