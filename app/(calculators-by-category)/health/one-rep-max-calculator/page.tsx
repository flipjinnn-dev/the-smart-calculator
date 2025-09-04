"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Calculator, RotateCcw, Dumbbell, Target, TrendingUp } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

export default function OneRepMaxCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [weight, setWeight] = useState("")
  const [repetitions, setRepetitions] = useState("")
  const [inputUnit, setInputUnit] = useState("kg") // kg or lbs
  const [formula, setFormula] = useState("epley") // epley, brzycki, lombardi
  const [outputUnit, setOutputUnit] = useState("kg") // kg or lbs

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const weightNum = Number.parseFloat(weight)
    if (!weight || weightNum <= 0 || weightNum > 1000) {
      newErrors.weight = "Please enter a valid weight"
    }

    const repsNum = Number.parseInt(repetitions)
    if (!repetitions || repsNum < 1 || repsNum > 10) {
      newErrors.repetitions = "Repetitions must be between 1-10"
    }

    if (!formula) {
      newErrors.formula = "Please select a formula"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateOneRepMax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return

    try {
      let weightKg = Number.parseFloat(weight)
      if (inputUnit === "lbs") {
        weightKg = weightKg * 0.45359237
      }

      const reps = Number.parseInt(repetitions)
      let oneRepMaxKg = 0

      // Calculate 1RM based on selected formula
      switch (formula) {
        case "epley":
          oneRepMaxKg = weightKg * (1 + reps / 30)
          break
        case "brzycki":
          oneRepMaxKg = (weightKg * 36) / (37 - reps)
          break
        case "lombardi":
          oneRepMaxKg = weightKg * Math.pow(reps, 0.1)
          break
      }

      // Convert to output unit
      const oneRepMaxLbs = oneRepMaxKg / 0.45359237

      const results = {
        inputWeight: `${weight} ${inputUnit}`,
        repetitions: reps,
        formula: formula,
        formulaName: formula.charAt(0).toUpperCase() + formula.slice(1),
        oneRepMaxKg: Math.round(oneRepMaxKg * 100) / 100,
        oneRepMaxLbs: Math.round(oneRepMaxLbs * 100) / 100,
        outputUnit: outputUnit,
        displayValue: outputUnit === "kg" ? Math.round(oneRepMaxKg * 100) / 100 : Math.round(oneRepMaxLbs * 100) / 100,
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating 1RM. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setWeight("")
    setRepetitions("")
    setInputUnit("kg")
    setFormula("epley")
    setOutputUnit("kg")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const getFormulaDescription = (formulaType: string) => {
    switch (formulaType) {
      case "epley":
        return "1RM = W × (1 + r ÷ 30)"
      case "brzycki":
        return "1RM = W × 36 ÷ (37 − r)"
      case "lombardi":
        return "1RM = W × r^0.10"
      default:
        return ""
    }
  }

  return (
    <>
<SEO
  title="One Rep Max Calculator – Max Weight Estimator"
  description="Find your one rep max safely with our calculator. Estimate max lifting weight for strength training and track progress."
  keywords="one rep max calculator, lifting calculator, strength training estimator"
  slug="/health/one-rep-max-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">One-Rep Max Calculator</p>
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
              <Link href="/health" className="text-gray-500 hover:text-red-600">
                Fitness & Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">One-Rep Max Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">One-Rep Max Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your estimated one-rep maximum using proven formulas from strength training research. Perfect
                for powerlifting, weightlifting, and strength programming.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-red-600" />
                      <span>1RM Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your lift weight, repetitions, and select a formula to calculate your one-rep max
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Weight Lifted */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Weight Lifted</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Dumbbell className="h-5 w-5 text-red-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`}
                              type="number"
                              placeholder="100"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              step="0.1"
                            />
                          </div>
                          <RadioGroup value={inputUnit} onValueChange={setInputUnit} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="kg" id="input-kg" />
                              <Label htmlFor="input-kg" className="cursor-pointer">
                                kg
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="lbs" id="input-lbs" />
                              <Label htmlFor="input-lbs" className="cursor-pointer">
                                lbs
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>

                      {/* Repetitions */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Number of Repetitions</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-red-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.repetitions ? "border-red-300" : ""}`}
                            type="number"
                            placeholder="5"
                            value={repetitions}
                            onChange={(e) => setRepetitions(e.target.value)}
                            min="1"
                            max="10"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            reps (1-10)
                          </span>
                        </div>
                        {errors.repetitions && <p className="text-red-600 text-xs mt-1">{errors.repetitions}</p>}
                      </div>

                      {/* Formula Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Formula Selection</Label>
                        <RadioGroup value={formula} onValueChange={setFormula} className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-red-50">
                            <RadioGroupItem value="epley" id="epley" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="epley" className="cursor-pointer font-medium">
                                Epley Formula
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">1RM = W × (1 + r ÷ 30)</p>
                              <p className="text-xs text-gray-500 mt-1">Most commonly used, good for 1-10 reps</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-red-50">
                            <RadioGroupItem value="brzycki" id="brzycki" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="brzycki" className="cursor-pointer font-medium">
                                Brzycki Formula
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">1RM = W × 36 ÷ (37 − r)</p>
                              <p className="text-xs text-gray-500 mt-1">Conservative estimate, best for 2-10 reps</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-red-50">
                            <RadioGroupItem value="lombardi" id="lombardi" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="lombardi" className="cursor-pointer font-medium">
                                Lombardi Formula
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">1RM = W × r^0.10</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Based on power function, good for all rep ranges
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                        {errors.formula && <p className="text-red-600 text-xs mt-1">{errors.formula}</p>}
                      </div>

                      {/* Output Unit */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Output Unit</Label>
                        <RadioGroup value={outputUnit} onValueChange={setOutputUnit} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kg" id="output-kg" />
                            <Label htmlFor="output-kg" className="cursor-pointer">
                              Kilograms (kg)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lbs" id="output-lbs" />
                            <Label htmlFor="output-lbs" className="cursor-pointer">
                              Pounds (lbs)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateOneRepMax}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                      >
                        Calculate 1RM
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-rose-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center mb-3 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">Estimated 1RM</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-red-200">
                          <p className="text-3xl font-bold text-red-900 mb-2">
                            {result.displayValue} {result.outputUnit}
                          </p>
                          <p className="text-sm font-medium text-gray-600">{result.formulaName} Formula</p>
                          <p className="text-sm text-gray-500">
                            {result.inputWeight} × {result.repetitions} reps
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Dumbbell className="w-8 h-8 text-red-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter weight and reps to calculate your one-rep max.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                      <span>1RM Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200">
                        <h3 className="text-3xl font-bold text-red-700 mb-2">
                          {result.displayValue} {result.outputUnit}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">Estimated One-Rep Maximum</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Input Weight</p>
                            <p className="font-semibold text-gray-700">{result.inputWeight}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Repetitions</p>
                            <p className="font-semibold text-gray-700">{result.repetitions} reps</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Formula Used</p>
                            <p className="font-semibold text-gray-700">{result.formulaName}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Both Units</p>
                            <p className="font-semibold text-gray-700">
                              {result.oneRepMaxKg} kg / {result.oneRepMaxLbs} lbs
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calculation Steps */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-red-700 mb-6">Calculation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <h4 className="font-semibold text-red-700 mb-3">{result.formulaName} Formula</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Formula:</strong> {getFormulaDescription(result.formula)}
                            </p>
                            <p>
                              <strong>Where:</strong> W = weight, r = repetitions
                            </p>
                            <p>
                              <strong>Result:</strong> {result.oneRepMaxKg} kg ({result.oneRepMaxLbs} lbs)
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                          <h4 className="font-semibold text-rose-700 mb-3">Safety Notes</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• These are estimates only (~10% accuracy variation)</p>
                            <p>• Best used with weights you can lift for 3-10 reps</p>
                            <p>• Epley and Brzycki produce identical results at 10 reps</p>
                            <p>• Always warm up properly before attempting heavy lifts</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-rose-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center mr-3 shadow-lg">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">
                    About One-Rep Max Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-3">Formula Comparison</h3>
                      <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Epley:</strong> Most popular, linear progression
                          </li>
                          <li>
                            <strong>Brzycki:</strong> More conservative, asymptotic curve
                          </li>
                          <li>
                            <strong>Lombardi:</strong> Power function, works across all rep ranges
                          </li>
                          <li>
                            <strong>Accuracy:</strong> All formulas are within ~10% of actual 1RM
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-red-700 mb-3">Best Practices</h3>
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Use weights you can lift for 3-8 reps for best accuracy</li>
                          <li>Ensure proper form throughout the test set</li>
                          <li>Rest adequately between attempts</li>
                          <li>Test when fresh, not after other training</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-rose-700 mb-3">Safety Considerations</h3>
                      <div className="bg-white p-4 rounded-lg border border-rose-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Warm-up:</strong> Always perform proper warm-up sets
                          </li>
                          <li>
                            <strong>Spotter:</strong> Use a spotter for bench press and squats
                          </li>
                          <li>
                            <strong>Progressive:</strong> Work up gradually to test weight
                          </li>
                          <li>
                            <strong>Recovery:</strong> Allow adequate recovery between max efforts
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-rose-700 mb-3">Using Your 1RM</h3>
                      <div className="bg-white p-4 rounded-lg border border-rose-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">% of 1RM</th>
                              <th className="text-left py-2">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">50-60%</td>
                              <td>Speed/Power</td>
                            </tr>
                            <tr>
                              <td className="py-1">65-75%</td>
                              <td>Hypertrophy</td>
                            </tr>
                            <tr>
                              <td className="py-1">80-90%</td>
                              <td>Strength</td>
                            </tr>
                            <tr>
                              <td className="py-1">90-100%</td>
                              <td>Max Strength</td>
                            </tr>
                          </tbody>
                        </table>
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
