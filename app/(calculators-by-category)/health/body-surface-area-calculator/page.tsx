"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Activity, Calculator, User, Scale, Ruler, AlertCircle, RotateCcw, HelpCircle } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import bsaData from "@/app/content/bsa-calculator.json"

export default function BSACalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [gender, setGender] = useState("")
  const [weight, setWeight] = useState("")
  const [weightUnit, setWeightUnit] = useState("kg")
  const [height, setHeight] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [heightUnit, setHeightUnit] = useState("cm")

  const resultsRef = useRef<HTMLDivElement>(null)
  const  scrollToRef  = useMobileScroll()

  // Unit conversion functions
  const convertWeightToKg = (weight: number, unit: string): number => {
    switch (unit) {
      case "lbs":
        return weight * 0.453592
      case "grams":
        return weight / 1000
      default:
        return weight // kg
    }
  }

  const convertHeightToCm = (height: number, unit: string, feet?: number, inches?: number): number => {
    if (unit === "ft-in" && feet !== undefined && inches !== undefined) {
      return (feet * 12 + inches) * 2.54
    }
    return height // cm
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!gender) {
      newErrors.gender = "Please select gender"
    }

    if (!weight || Number.parseFloat(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight (> 0)"
    }

    if (heightUnit === "cm") {
      if (!height || Number.parseFloat(height) <= 0) {
        newErrors.height = "Please enter a valid height (> 0)"
      }
    } else {
      if (!heightFeet || Number.parseFloat(heightFeet) < 0) {
        newErrors.heightFeet = "Please enter valid feet"
      }
      if (!heightInches || Number.parseFloat(heightInches) < 0 || Number.parseFloat(heightInches) >= 12) {
        newErrors.heightInches = "Please enter valid inches (0-11)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateBSA = () => {
    if (!validateInputs()) return

    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    // Convert inputs to standard units (kg, cm)
    const weightKg = convertWeightToKg(Number.parseFloat(weight), weightUnit)
    const heightCm =
      heightUnit === "cm"
        ? Number.parseFloat(height)
        : convertHeightToCm(0, "ft-in", Number.parseFloat(heightFeet), Number.parseFloat(heightInches))

    // Calculate BSA using all 7 formulas
    const formulas = {
      duBois: 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725),
      mosteller: Math.sqrt((weightKg * heightCm) / 3600),
      haycock: 0.024265 * Math.pow(weightKg, 0.5378) * Math.pow(heightCm, 0.3964),
      gehanGeorge: 0.0235 * Math.pow(weightKg, 0.51456) * Math.pow(heightCm, 0.42246),
      boyd: 0.0333 * Math.pow(weightKg, 0.6157 - 0.0188 * Math.log10(weightKg)) * Math.pow(heightCm, 0.3),
      fujimoto: 0.008883 * Math.pow(weightKg, 0.444) * Math.pow(heightCm, 0.663),
      takahira: 0.007241 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725),
    }

    // Calculate average BSA
    const bsaValues = Object.values(formulas)
    const averageBSA = bsaValues.reduce((sum, val) => sum + val, 0) / bsaValues.length

    setResult({
      weightKg,
      heightCm,
      formulas,
      averageBSA,
      gender,
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setGender("")
    setWeight("")
    setHeight("")
    setHeightFeet("")
    setHeightInches("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
<SEO
  title="Body Surface Area Calculator – Medical BSA Tool"
  description="Calculate body surface area instantly with accurate formulas. Use our free BSA calculator for medical, health, and dosage calculations."
  keywords="body surface area calculator, BSA calculator, medical dosage calculator, health measurement tool"
  slug="/health/body-surface-area-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Body Surface Area Calculator</p>
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
              <Link href="/health" className="text-gray-500 hover:text-teal-600">
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Body Surface Area Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Body Surface Area Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate Body Surface Area (BSA) using 7 major medical formulas. Essential for accurate medication
                dosing, chemotherapy calculations, and clinical assessments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <User className="w-6 h-6 text-teal-600" />
                      <span>Patient Information</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter patient details to calculate Body Surface Area using multiple formulas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Gender Selection */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Gender</Label>
                      <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" className="text-teal-600" />
                          <Label htmlFor="male" className="cursor-pointer">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" className="text-teal-600" />
                          <Label htmlFor="female" className="cursor-pointer">
                            Female
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.gender && (
                        <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.gender}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Weight */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">
                          Weight
                          <div className="relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Patient's body weight
                            </div>
                          </div>
                        </Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Scale className="h-5 w-5 text-teal-500" />
                            </div>
                            <Input
                              className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${
                                errors.weight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                              }`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="Enter weight"
                              value={weight}
                              onChange={(e) => {
                                setWeight(e.target.value)
                                if (errors.weight) setErrors((prev) => ({ ...prev, weight: "" }))
                              }}
                            />
                          </div>
                          <Select value={weightUnit} onValueChange={setWeightUnit}>
                            <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-teal-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="lbs">lbs</SelectItem>
                              <SelectItem value="grams">g</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.weight && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.weight}</span>
                          </div>
                        )}
                      </div>

                      {/* Height */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">
                          Height
                          <div className="relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
                              Patient's height
                            </div>
                          </div>
                        </Label>
                        <div className="flex space-x-2 mb-2">
                          <Select value={heightUnit} onValueChange={setHeightUnit}>
                            <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-teal-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">cm</SelectItem>
                              <SelectItem value="ft-in">ft/in</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {heightUnit === "cm" ? (
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-teal-500" />
                            </div>
                            <Input
                              className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${
                                errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                              }`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="Enter height in cm"
                              value={height}
                              onChange={(e) => {
                                setHeight(e.target.value)
                                if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input
                                className={`w-full h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${
                                  errors.heightFeet ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                                }`}
                                type="number"
                                min="0"
                                placeholder="Feet"
                                value={heightFeet}
                                onChange={(e) => {
                                  setHeightFeet(e.target.value)
                                  if (errors.heightFeet) setErrors((prev) => ({ ...prev, heightFeet: "" }))
                                }}
                              />
                            </div>
                            <div className="relative flex-1">
                              <Input
                                className={`w-full h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${
                                  errors.heightInches ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                                }`}
                                type="number"
                                min="0"
                                max="11"
                                placeholder="Inches"
                                value={heightInches}
                                onChange={(e) => {
                                  setHeightInches(e.target.value)
                                  if (errors.heightInches) setErrors((prev) => ({ ...prev, heightInches: "" }))
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {(errors.height || errors.heightFeet || errors.heightInches) && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.height || errors.heightFeet || errors.heightInches}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <p className="text-sm text-gray-700">
                        <strong>BSA Formulas:</strong> This calculator uses 7 major formulas including Du Bois,
                        Mosteller, Haycock, Gehan & George, Boyd, Fujimoto, and Takahira methods for comprehensive
                        comparison.
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateBSA}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800"
                      >
                        Calculate BSA
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-teal-300 text-teal-700 hover:bg-teal-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">BSA Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? (
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-teal-200">
                          <p className="text-3xl font-bold text-teal-900">{result.averageBSA?.toFixed(3)} m²</p>
                          <p className="text-gray-600">Average BSA</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-teal-200">
                          <p className="text-lg font-bold text-teal-900">{result.weightKg?.toFixed(1)} kg</p>
                          <p className="text-gray-600">Weight</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-teal-200">
                          <p className="text-lg font-bold text-teal-900">{result.heightCm?.toFixed(1)} cm</p>
                          <p className="text-gray-600">Height</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Activity className="w-8 h-8 text-teal-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">
                          Enter patient information and click{" "}
                          <span className="font-semibold text-teal-600">Calculate</span> to see BSA results.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && (
              <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-teal-600" />
                      <span>BSA Formula Comparison</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-teal-200">
                            <th className="text-left py-3 px-4 font-semibold text-teal-700">Formula</th>
                            <th className="text-right py-3 px-4 font-semibold text-teal-700">BSA (m²)</th>
                            <th className="text-left py-3 px-4 font-semibold text-teal-700">Method</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">Du Bois</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.duBois.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Most widely used</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">Mosteller</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.mosteller.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Simplified formula</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">Haycock</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.haycock.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Pediatric preferred</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">Gehan & George</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.gehanGeorge.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Clinical studies</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">Boyd</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.boyd.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Weight-dependent</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">Fujimoto</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.fujimoto.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Asian populations</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">Takahira</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.takahira.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Modified Du Bois</td>
                          </tr>
                          <tr className="bg-teal-50 border-t-2 border-teal-200">
                            <td className="py-3 px-4 font-bold text-teal-700">Average</td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-teal-700">
                              {result.averageBSA.toFixed(4)}
                            </td>
                            <td className="py-3 px-4 text-sm font-medium text-teal-600">All formulas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-700 mb-2">Patient Information:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>Gender:</strong> {result.gender}
                        </p>
                        <p>
                          <strong>Weight:</strong> {result.weightKg.toFixed(1)} kg
                        </p>
                        <p>
                          <strong>Height:</strong> {result.heightCm.toFixed(1)} cm
                        </p>
                        <p>
                          <strong>Average BSA:</strong> {result.averageBSA.toFixed(3)} m²
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <strong>Clinical Note:</strong> BSA values are normalized to m². These formulas are widely used
                        in clinical and pharmaceutical calculations. This calculator is for informational purposes only.
                        Consult a healthcare provider for medical use.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mr-3 shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">
                    Understanding Body Surface Area
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">What is BSA?</h3>
                      <p className="text-gray-700 mb-4">
                        Body Surface Area (BSA) is a measurement of the total surface area of the human body. It's
                        crucial for determining appropriate medication dosages, especially in chemotherapy, and for
                        various physiological calculations.
                      </p>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">Clinical Applications</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Chemotherapy dosing</li>
                        <li>Cardiac index calculations</li>
                        <li>Burn assessment</li>
                        <li>Renal clearance studies</li>
                        <li>Metabolic rate calculations</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">Formula Comparison</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Most Common:</strong> Du Bois Formula
                        </p>
                        <p className="text-gray-700 text-sm font-mono">BSA = 0.007184 × W^0.425 × H^0.725</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Simplified:</strong> Mosteller Formula
                        </p>
                        <p className="text-gray-700 text-sm font-mono">BSA = √(W × H / 3600)</p>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Normal adult BSA ranges from 1.5 to 2.0 m². Average adult BSA is
                          approximately 1.7 m².
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

           {/* How to Use Section */}
          <div className="mt-8">
            <CalculatorGuide data={bsaData} />
          </div>
        </main>

      </div>
    </>
  )
}
