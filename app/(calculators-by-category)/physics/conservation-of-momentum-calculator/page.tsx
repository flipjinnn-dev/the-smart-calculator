"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Zap, Calculator, TrendingUp, Gauge, Settings } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function CollisionCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<any>({})

  // Object 1 inputs with units
  const [mass1, setMass1] = useState(2)
  const [mass1Unit, setMass1Unit] = useState("kg")
  const [initialVel1, setInitialVel1] = useState(4)
  const [initialVel1Unit, setInitialVel1Unit] = useState("ms")
  const [finalVel1, setFinalVel1] = useState("")
  const [finalVel1Unit, setFinalVel1Unit] = useState("ms")

  // Object 2 inputs with units
  const [mass2, setMass2] = useState(3)
  const [mass2Unit, setMass2Unit] = useState("kg")
  const [initialVel2, setInitialVel2] = useState(0)
  const [initialVel2Unit, setInitialVel2Unit] = useState("ms")
  const [finalVel2, setFinalVel2] = useState("")
  const [finalVel2Unit, setFinalVel2Unit] = useState("ms")

  // Collision type and parameters
  const [collisionType, setCollisionType] = useState("elastic")
  const [coefficientRestitution, setCoefficientRestitution] = useState(0.8)

  // Unit conversion functions
  const convertMass = (value: number, fromUnit: string): number => {
    const conversions = { kg: 1, g: 0.001, tonne: 1000 }
    return value * (conversions[fromUnit as keyof typeof conversions] || 1)
  }

  const convertVelocity = (value: number, fromUnit: string): number => {
    const conversions = { ms: 1, kmh: 1 / 3.6, mph: 0.44704 }
    return value * (conversions[fromUnit as keyof typeof conversions] || 1)
  }

  const convertEnergy = (value: number, toUnit: string): number => {
    const conversions = { J: 1, kJ: 0.001, cal: 0.239006 }
    return value * (conversions[toUnit as keyof typeof conversions] || 1)
  }

  // Validation function
  const validateInputs = () => {
    const newErrors: any = {}

    if (mass1 <= 0) newErrors.mass1 = "Mass must be positive"
    if (mass2 <= 0) newErrors.mass2 = "Mass must be positive"
    if (collisionType === "restitution" && (coefficientRestitution < 0 || coefficientRestitution > 1)) {
      newErrors.coefficientRestitution = "Coefficient must be between 0 and 1"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Physics calculations
  const calculateCollision = () => {
    if (!validateInputs()) return

    // Convert all values to SI units
    const m1 = convertMass(mass1, mass1Unit)
    const m2 = convertMass(mass2, mass2Unit)
    const u1 = convertVelocity(initialVel1, initialVel1Unit)
    const u2 = convertVelocity(initialVel2, initialVel2Unit)

    let v1: number, v2: number

    // Calculate final velocities based on collision type
    switch (collisionType) {
      case "elastic":
        v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2)
        v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2)
        break

      case "inelastic":
        v1 = v2 = (m1 * u1 + m2 * u2) / (m1 + m2)
        break

      case "restitution":
        v1 = ((m1 - coefficientRestitution * m2) * u1 + (1 + coefficientRestitution) * m2 * u2) / (m1 + m2)
        v2 = ((1 + coefficientRestitution) * m1 * u1 + (m2 - coefficientRestitution * m1) * u2) / (m1 + m2)
        break

      default: // general - solve for unknowns if possible
        if (finalVel1 !== "" && finalVel2 !== "") {
          v1 = convertVelocity(Number(finalVel1), finalVel1Unit)
          v2 = convertVelocity(Number(finalVel2), finalVel2Unit)
        } else if (finalVel1 !== "") {
          v1 = convertVelocity(Number(finalVel1), finalVel1Unit)
          v2 = (m1 * u1 + m2 * u2 - m1 * v1) / m2
        } else if (finalVel2 !== "") {
          v2 = convertVelocity(Number(finalVel2), finalVel2Unit)
          v1 = (m1 * u1 + m2 * u2 - m2 * v2) / m1
        } else {
          // Default to elastic if no final velocities given
          v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2)
          v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2)
        }
    }

    // Calculate momentum and energy
    const initialMomentum = m1 * u1 + m2 * u2
    const finalMomentum = m1 * v1 + m2 * v2

    const initialKE1 = 0.5 * m1 * u1 * u1
    const initialKE2 = 0.5 * m2 * u2 * u2
    const initialKETotal = initialKE1 + initialKE2

    const finalKE1 = 0.5 * m1 * v1 * v1
    const finalKE2 = 0.5 * m2 * v2 * v2
    const finalKETotal = finalKE1 + finalKE2

    const energyLoss = finalKETotal - initialKETotal

    setResult({
      finalVel1: v1,
      finalVel2: v2,
      initialMomentum,
      finalMomentum,
      initialKE1,
      initialKE2,
      initialKETotal,
      finalKE1,
      finalKE2,
      finalKETotal,
      energyLoss,
      isElastic: Math.abs(energyLoss) < 0.001,
    })
    setShowResult(true)
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  }

  return (
    <>
      <Head>
        <title>Conservation of Momentum Calculator – Physics Tool</title>
        <meta
          name="description"
          content="Calculate momentum conservation instantly. Use our free conservation of momentum calculator for collisions and physics problems."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
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
                  <p className="text-sm text-gray-500">Conservation of Momentum Calculator</p>
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
              <span className="text-gray-900 font-medium">Conservation of Momentum Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Conservation of Momentum Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate collision outcomes using conservation of momentum and energy principles. Supports elastic,
                inelastic, and general collisions with coefficient of restitution.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Zap className="w-6 h-6 text-blue-600" />
                      <span>Collision Parameters</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter object properties and collision type to calculate outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      {/* Collision Type Selection */}
                      <div>
                        <Label className="text-lg font-semibold text-gray-800 mb-4 block">Collision Type</Label>
                        <RadioGroup
                          value={collisionType}
                          onValueChange={setCollisionType}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="elastic" id="elastic" />
                            <Label htmlFor="elastic" className="font-medium">
                              Elastic
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="inelastic" id="inelastic" />
                            <Label htmlFor="inelastic" className="font-medium">
                              Perfectly Inelastic
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="restitution" id="restitution" />
                            <Label htmlFor="restitution" className="font-medium">
                              With Restitution
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="general" id="general" />
                            <Label htmlFor="general" className="font-medium">
                              General
                            </Label>
                          </div>
                        </RadioGroup>

                        {collisionType === "restitution" && (
                          <div className="mt-4">
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                              Coefficient of Restitution (e)
                            </Label>
                            <Input
                              className={`w-32 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.coefficientRestitution ? "border-red-500" : ""}`}
                              type="number"
                              step="0.01"
                              min="0"
                              max="1"
                              value={coefficientRestitution}
                              onChange={(e) => setCoefficientRestitution(Number(e.target.value))}
                            />
                            {errors.coefficientRestitution && (
                              <p className="text-red-500 text-sm mt-1">{errors.coefficientRestitution}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Object 1 */}
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Object 1</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">Mass (m₁)</Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Settings className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.mass1 ? "border-red-500" : ""}`}
                                  type="number"
                                  step="0.1"
                                  value={mass1}
                                  onChange={(e) => setMass1(Number(e.target.value))}
                                />
                              </div>
                              <Select value={mass1Unit} onValueChange={setMass1Unit}>
                                <SelectTrigger className="w-20 h-12 rounded-xl">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="g">g</SelectItem>
                                  <SelectItem value="tonne">t</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.mass1 && <p className="text-red-500 text-sm mt-1">{errors.mass1}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">
                              Initial Velocity (u₁)
                            </Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Gauge className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
                                  type="number"
                                  step="0.1"
                                  value={initialVel1}
                                  onChange={(e) => setInitialVel1(Number(e.target.value))}
                                />
                              </div>
                              <Select value={initialVel1Unit} onValueChange={setInitialVel1Unit}>
                                <SelectTrigger className="w-24 h-12 rounded-xl">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ms">m/s</SelectItem>
                                  <SelectItem value="kmh">km/h</SelectItem>
                                  <SelectItem value="mph">mph</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {collisionType === "general" && (
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Final Velocity (v₁) - Optional
                              </Label>
                              <div className="flex space-x-2">
                                <div className="relative flex-1">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <TrendingUp className="h-5 w-5 text-blue-500" />
                                  </div>
                                  <Input
                                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
                                    type="number"
                                    step="0.1"
                                    value={finalVel1}
                                    onChange={(e) => setFinalVel1(e.target.value)}
                                    placeholder="Leave empty to calculate"
                                  />
                                </div>
                                <Select value={finalVel1Unit} onValueChange={setFinalVel1Unit}>
                                  <SelectTrigger className="w-24 h-12 rounded-xl">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ms">m/s</SelectItem>
                                    <SelectItem value="kmh">km/h</SelectItem>
                                    <SelectItem value="mph">mph</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Object 2 */}
                      <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-teal-800 mb-4">Object 2</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">Mass (m₂)</Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Settings className="h-5 w-5 text-teal-500" />
                                </div>
                                <Input
                                  className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${errors.mass2 ? "border-red-500" : ""}`}
                                  type="number"
                                  step="0.1"
                                  value={mass2}
                                  onChange={(e) => setMass2(Number(e.target.value))}
                                />
                              </div>
                              <Select value={mass2Unit} onValueChange={setMass2Unit}>
                                <SelectTrigger className="w-20 h-12 rounded-xl">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="g">g</SelectItem>
                                  <SelectItem value="tonne">t</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.mass2 && <p className="text-red-500 text-sm mt-1">{errors.mass2}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">
                              Initial Velocity (u₂)
                            </Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Gauge className="h-5 w-5 text-teal-500" />
                                </div>
                                <Input
                                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm"
                                  type="number"
                                  step="0.1"
                                  value={initialVel2}
                                  onChange={(e) => setInitialVel2(Number(e.target.value))}
                                />
                              </div>
                              <Select value={initialVel2Unit} onValueChange={setInitialVel2Unit}>
                                <SelectTrigger className="w-24 h-12 rounded-xl">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ms">m/s</SelectItem>
                                  <SelectItem value="kmh">km/h</SelectItem>
                                  <SelectItem value="mph">mph</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {collisionType === "general" && (
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Final Velocity (v₂) - Optional
                              </Label>
                              <div className="flex space-x-2">
                                <div className="relative flex-1">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <TrendingUp className="h-5 w-5 text-teal-500" />
                                  </div>
                                  <Input
                                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm"
                                    type="number"
                                    step="0.1"
                                    value={finalVel2}
                                    onChange={(e) => setFinalVel2(e.target.value)}
                                    placeholder="Leave empty to calculate"
                                  />
                                </div>
                                <Select value={finalVel2Unit} onValueChange={setFinalVel2Unit}>
                                  <SelectTrigger className="w-24 h-12 rounded-xl">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ms">m/s</SelectItem>
                                    <SelectItem value="kmh">km/h</SelectItem>
                                    <SelectItem value="mph">mph</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={calculateCollision}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate Collision
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card
                  ref={resultsRef}
                  className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-teal-50 sticky top-24 h-fit"
                >
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Collision Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="w-full space-y-4">
                        <div className="text-center">
                          <p className="text-lg text-gray-600 mb-4 font-medium">Final Velocities</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <p className="text-sm text-blue-700 font-medium">Object 1</p>
                              <p className="text-2xl font-bold text-blue-900">{result.finalVel1.toFixed(2)} m/s</p>
                            </div>
                            <div className="bg-teal-100 p-3 rounded-lg">
                              <p className="text-sm text-teal-700 font-medium">Object 2</p>
                              <p className="text-2xl font-bold text-teal-900">{result.finalVel2.toFixed(2)} m/s</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-gray-800 mb-2">Momentum</h4>
                            <div className="text-sm space-y-1">
                              <p>Initial: {result.initialMomentum.toFixed(2)} kg⋅m/s</p>
                              <p>Final: {result.finalMomentum.toFixed(2)} kg⋅m/s</p>
                              <p
                                className={`font-medium ${Math.abs(result.finalMomentum - result.initialMomentum) < 0.001 ? "text-green-600" : "text-red-600"}`}
                              >
                                Conserved:{" "}
                                {Math.abs(result.finalMomentum - result.initialMomentum) < 0.001 ? "Yes" : "No"}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-gray-800 mb-2">Kinetic Energy</h4>
                            <div className="text-sm space-y-1">
                              <p>Initial Total: {result.initialKETotal.toFixed(2)} J</p>
                              <p>Final Total: {result.finalKETotal.toFixed(2)} J</p>
                              <p
                                className={`font-medium ${result.energyLoss >= 0 ? "text-red-600" : "text-green-600"}`}
                              >
                                Energy Change: {result.energyLoss.toFixed(2)} J
                              </p>
                              <p className={`font-medium ${result.isElastic ? "text-green-600" : "text-orange-600"}`}>
                                Type: {result.isElastic ? "Elastic" : "Inelastic"}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-gray-800 mb-2">Individual Energies</h4>
                            <div className="text-sm space-y-1">
                              <p>
                                Object 1: {result.initialKE1.toFixed(2)} → {result.finalKE1.toFixed(2)} J
                              </p>
                              <p>
                                Object 2: {result.initialKE2.toFixed(2)} → {result.finalKE2.toFixed(2)} J
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Zap className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter parameters and click <span className="font-semibold text-blue-600">Calculate</span> to
                          see results.
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
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                    Understanding Collision Physics
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Conservation Laws</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      All collisions conserve momentum: $$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$$
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Elastic collisions also conserve kinetic energy, while inelastic collisions convert some kinetic
                      energy to other forms.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Collision Types</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>Elastic:</strong> Both momentum and kinetic energy conserved (e = 1)
                      </li>
                      <li>
                        <strong>Perfectly Inelastic:</strong> Objects stick together after collision (e = 0)
                      </li>
                      <li>
                        <strong>With Restitution:</strong> Coefficient e determines energy loss (0 ≤ e ≤ 1)
                      </li>
                      <li>
                        <strong>General:</strong> Solve for unknowns using momentum conservation
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Example Calculation</h3>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Given:</strong> m₁ = 2 kg, u₁ = 4 m/s, m₂ = 3 kg, u₂ = 0 m/s, Elastic collision
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Solution:</strong>
                      </p>
                      <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        v₁ = ((2-3)×4 + 2×3×0)/(2+3) = -4/5 = -0.4 m/s
                        <br />
                        v₂ = ((3-2)×0 + 2×2×4)/(2+3) = 16/5 = 3.2 m/s
                        <br />
                        Initial KE = ½×2×4² = 16 J<br />
                        Final KE = ½×2×(-0.4)² + ½×3×(3.2)² = 16 J ✓
                      </p>
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
