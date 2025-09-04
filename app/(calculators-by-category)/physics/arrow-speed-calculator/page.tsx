"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { Target, Zap, Activity, AlertCircle, ToggleLeft } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

export default function ArrowSpeedCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [iboRating, setIboRating] = useState("")
  const [drawLength, setDrawLength] = useState("")
  const [drawWeight, setDrawWeight] = useState("")
  const [arrowWeight, setArrowWeight] = useState("")
  const [stringWeight, setStringWeight] = useState("")

  // Unit toggle states
  const [iboUnit, setIboUnit] = useState<"fps" | "m/s">("fps") // fps or m/s
  const [lengthUnit, setLengthUnit] = useState<"in" | "cm">("in") // inches or cm
  const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb") // pounds or kg

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!iboRating || Number.parseFloat(iboRating) <= 0) {
      newErrors.iboRating = "Please enter a valid IBO rating"
    }

    if (!drawLength || Number.parseFloat(drawLength) <= 0) {
      newErrors.drawLength = "Please enter a valid draw length"
    }

    if (!drawWeight || Number.parseFloat(drawWeight) <= 0) {
      newErrors.drawWeight = "Please enter a valid draw weight"
    }

    if (!arrowWeight || Number.parseFloat(arrowWeight) <= 0) {
      newErrors.arrowWeight = "Please enter a valid arrow weight"
    }

    if (stringWeight && Number.parseFloat(stringWeight) < 0) {
      newErrors.stringWeight = "String weight cannot be negative"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateArrowSpeed = () => {

    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);


    if (!validateInputs()) {
      return
    }

    // Convert all inputs to standard units (fps, inches, pounds, grains)
    let iboFps = Number.parseFloat(iboRating)
    if (iboUnit === "m/s") {
      iboFps = iboFps / 0.3048 // Convert m/s to fps
    }

    let drawLengthIn = Number.parseFloat(drawLength)
    if (lengthUnit === "cm") {
      drawLengthIn = drawLengthIn / 2.54 // Convert cm to inches
    }

    let drawWeightLb = Number.parseFloat(drawWeight)
    if (weightUnit === "kg") {
      drawWeightLb = drawWeightLb * 2.2046 // Convert kg to pounds
    }

    const arrowWeightGr = Number.parseFloat(arrowWeight)
    const stringWeightGr = Number.parseFloat(stringWeight) || 0

    // IBO-based speed calculation
    // Baseline: 30" draw length, 70 lb draw weight, 350 gr arrow
    // Adjustments: ±10 fps per 1" draw length, ±2 fps per lb draw weight,
    // ∓1 fps per 3 grains arrow weight, ∓1 fps per 3 grains string weight
    const speedFps =
      iboFps + 10 * (drawLengthIn - 30) + 2 * (drawWeightLb - 70) - (arrowWeightGr - 350) / 3 - stringWeightGr / 3

    // Convert to m/s
    const speedMs = speedFps * 0.3048

    // Calculate arrow mass in kg
    const arrowMassKg = arrowWeightGr * 6.479891e-5

    // Calculate momentum (p = m * v)
    const momentumNs = arrowMassKg * speedMs

    // Calculate kinetic energy (KE = 1/2 * m * v²)
    const kineticEnergyJ = 0.5 * arrowMassKg * speedMs * speedMs

    setResult({
      speedFps: Math.max(0, speedFps),
      speedMs: Math.max(0, speedMs),
      momentumNs,
      kineticEnergyJ,
      arrowMassKg,
      // Input values for display
      iboRating: iboFps,
      drawLength: drawLengthIn,
      drawWeight: drawWeightLb,
      arrowWeight: arrowWeightGr,
      stringWeight: stringWeightGr,
    })
    setShowResult(true)
  }

  return (
    <>
<SEO
  title="Arrow Speed Calculator – Archery Accuracy Tool"
  description="Estimate arrow speed in seconds. Use our free arrow speed calculator to improve archery accuracy and bow performance."
  keywords="arrow speed calculator, archery calculator, bow performance calculator, arrow velocity tool"
  slug="/physics/arrow-speed-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_720-8sE77EX08xKuB6AvLTisdyhRT3j1X2.png"
                  alt="Smart Calculator Logo"
                  className="w-12 h-12"
                />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Arrow Speed Calculator</p>
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
              <span className="text-gray-900 font-medium">Arrow Speed Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Arrow Speed Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate arrow speed, momentum, and kinetic energy using IBO ratings and bow specifications.
                Professional archery calculator with comprehensive unit conversions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="w-6 h-6 text-slate-600" />
                      <span>Bow & Arrow Specifications</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your bow and arrow specifications to calculate performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* IBO Rating */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">Bow IBO Rating</Label>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs ${iboUnit === "fps" ? "text-slate-600 font-medium" : "text-gray-400"}`}
                            >
                              fps
                            </span>
                            <Switch
                              checked={iboUnit === "m/s"}
                              onCheckedChange={(checked) => setIboUnit(checked ? "m/s" : "fps")}
                              className="data-[state=checked]:bg-slate-600"
                            />
                            <span
                              className={`text-xs ${iboUnit === "m/s" ? "text-slate-600 font-medium" : "text-gray-400"}`}
                            >
                              m/s
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Zap className="h-5 w-5 text-slate-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${
                              errors.iboRating ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            placeholder={`Enter IBO rating in ${iboUnit}`}
                            value={iboRating}
                            onChange={(e) => {
                              setIboRating(e.target.value)
                              if (errors.iboRating) {
                                setErrors((prev) => ({ ...prev, iboRating: "" }))
                              }
                            }}
                          />
                        </div>
                        {errors.iboRating && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.iboRating}</span>
                          </div>
                        )}
                      </div>

                      {/* Draw Length */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">Draw Length</Label>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs ${lengthUnit === "in" ? "text-slate-600 font-medium" : "text-gray-400"}`}
                            >
                              in
                            </span>
                            <Switch
                              checked={lengthUnit === "cm"}
                              onCheckedChange={(checked) => setLengthUnit(checked ? "cm" : "in")}
                              className="data-[state=checked]:bg-slate-600"
                            />
                            <span
                              className={`text-xs ${lengthUnit === "cm" ? "text-slate-600 font-medium" : "text-gray-400"}`}
                            >
                              cm
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ToggleLeft className="h-5 w-5 text-slate-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${
                              errors.drawLength ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="0.1"
                            placeholder={`Enter draw length in ${lengthUnit}`}
                            value={drawLength}
                            onChange={(e) => {
                              setDrawLength(e.target.value)
                              if (errors.drawLength) {
                                setErrors((prev) => ({ ...prev, drawLength: "" }))
                              }
                            }}
                          />
                        </div>
                        {errors.drawLength && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.drawLength}</span>
                          </div>
                        )}
                      </div>

                      {/* Draw Weight */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">Peak Draw Weight</Label>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs ${weightUnit === "lb" ? "text-slate-600 font-medium" : "text-gray-400"}`}
                            >
                              lb
                            </span>
                            <Switch
                              checked={weightUnit === "kg"}
                              onCheckedChange={(checked) => setWeightUnit(checked ? "kg" : "lb")}
                              className="data-[state=checked]:bg-slate-600"
                            />
                            <span
                              className={`text-xs ${weightUnit === "kg" ? "text-slate-600 font-medium" : "text-gray-400"}`}
                            >
                              kg
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Activity className="h-5 w-5 text-slate-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${
                              errors.drawWeight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="0.1"
                            placeholder={`Enter draw weight in ${weightUnit}`}
                            value={drawWeight}
                            onChange={(e) => {
                              setDrawWeight(e.target.value)
                              if (errors.drawWeight) {
                                setErrors((prev) => ({ ...prev, drawWeight: "" }))
                              }
                            }}
                          />
                        </div>
                        {errors.drawWeight && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.drawWeight}</span>
                          </div>
                        )}
                      </div>

                      {/* Arrow Weight */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Arrow Weight (grains)</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-slate-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${
                              errors.arrowWeight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            placeholder="Enter arrow weight in grains"
                            value={arrowWeight}
                            onChange={(e) => {
                              setArrowWeight(e.target.value)
                              if (errors.arrowWeight) {
                                setErrors((prev) => ({ ...prev, arrowWeight: "" }))
                              }
                            }}
                          />
                        </div>
                        {errors.arrowWeight && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.arrowWeight}</span>
                          </div>
                        )}
                      </div>

                      {/* String Weight (Optional) */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Extra String Weight (grains) - Optional
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Activity className="h-5 w-5 text-slate-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${
                              errors.stringWeight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            placeholder="Enter extra string weight (optional)"
                            value={stringWeight}
                            onChange={(e) => {
                              setStringWeight(e.target.value)
                              if (errors.stringWeight) {
                                setErrors((prev) => ({ ...prev, stringWeight: "" }))
                              }
                            }}
                          />
                        </div>
                        {errors.stringWeight && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.stringWeight}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-sm text-gray-700">
                        <strong>IBO Standard:</strong> Based on 30" draw length, 70 lb draw weight, and 350 grain arrow.
                        Adjustments: ±10 fps per inch of draw length, ±2 fps per pound of draw weight.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Results are estimates based on industry-standard IBO calculations.
                      </p>
                    </div>

                    <Button
                      onClick={calculateArrowSpeed}
                      className="w-full h-12 text-lg bg-gradient-to-r from-slate-600 to-blue-700 hover:from-slate-700 hover:to-blue-800"
                    >
                      Calculate Arrow Performance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-blue-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-600 to-blue-700 flex items-center justify-center mb-3 shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-700 tracking-tight">
                      Arrow Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="bg-white p-3 rounded-lg border border-slate-200">
                            <p className="text-2xl font-bold text-slate-900">{result.speedFps?.toFixed(1)}</p>
                            <p className="text-gray-600">fps</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-slate-200">
                            <p className="text-2xl font-bold text-slate-900">{result.speedMs?.toFixed(1)}</p>
                            <p className="text-gray-600">m/s</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-slate-200">
                            <p className="text-lg font-bold text-slate-900">{result.kineticEnergyJ?.toFixed(1)}</p>
                            <p className="text-gray-600">Joules</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Target className="w-8 h-8 text-slate-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your bow specs and click <span className="font-semibold text-slate-600">Calculate</span>{" "}
                          to see arrow performance.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Zap className="w-6 h-6 text-slate-600" />
                      <span>Detailed Performance Metrics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Arrow Speed</h3>
                        <p className="text-3xl font-bold text-slate-900 mb-1">{result.speedFps?.toFixed(1)} fps</p>
                        <p className="text-xl text-slate-600">{result.speedMs?.toFixed(1)} m/s</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Momentum</h3>
                        <p className="text-3xl font-bold text-slate-900 mb-1">{result.momentumNs?.toFixed(3)}</p>
                        <p className="text-xl text-slate-600">N·s</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Kinetic Energy</h3>
                        <p className="text-3xl font-bold text-slate-900 mb-1">{result.kineticEnergyJ?.toFixed(1)}</p>
                        <p className="text-xl text-slate-600">Joules</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-blue-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-600 to-blue-700 flex items-center justify-center mr-3 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-700 tracking-tight">
                    Understanding Arrow Speed & IBO Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">IBO Rating Explained</h3>
                      <p className="text-gray-700 mb-4">
                        IBO (International Bowhunting Organization) rating is a standardized measurement based on a
                        30-inch draw length, 70-pound draw weight, and 350-grain arrow. This provides a baseline for
                        comparing bow performance across different manufacturers.
                      </p>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">Performance Factors</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Draw length: ±10 fps per inch change</li>
                        <li>Draw weight: ±2 fps per pound change</li>
                        <li>Arrow weight: ∓1 fps per 3 grains</li>
                        <li>String accessories: ∓1 fps per 3 grains</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong>
                        </p>
                        <p className="text-gray-700">IBO Rating: 320 fps</p>
                        <p className="text-gray-700">Draw Length: 29" (-1" from baseline)</p>
                        <p className="text-gray-700">Draw Weight: 60 lb (-10 lb from baseline)</p>
                        <p className="text-gray-700">Arrow Weight: 400 gr (+50 gr from baseline)</p>
                        <p className="text-gray-700 font-semibold mt-2">Result: 320 - 10 - 20 - 16.7 ≈ 273 fps</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        Momentum and kinetic energy are calculated using physics formulas: p = mv and KE = ½mv².
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
