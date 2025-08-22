"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { ChefHat, Calculator, Ruler, AlertCircle, Cookie } from "lucide-react"

export default function CakePanCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Shape selection
  const [selectedShape, setSelectedShape] = useState("round")

  // Input states
  const [diameter, setDiameter] = useState("")
  const [height, setHeight] = useState("5") // Default 5cm height
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [recipePanVolume, setRecipePanVolume] = useState("")

  const shapes = [
    { value: "round", label: "Round (Cylinder)", icon: "⭕" },
    { value: "rectangle", label: "Rectangle/Square", icon: "⬜" },
  ]

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (selectedShape === "round") {
      if (!diameter || Number.parseFloat(diameter) <= 0) {
        newErrors.diameter = "Please enter a valid diameter"
      }
      if (!height || Number.parseFloat(height) <= 0) {
        newErrors.height = "Please enter a valid height"
      }
    } else if (selectedShape === "rectangle") {
      if (!length || Number.parseFloat(length) <= 0) {
        newErrors.length = "Please enter a valid length"
      }
      if (!width || Number.parseFloat(width) <= 0) {
        newErrors.width = "Please enter a valid width"
      }
      if (!height || Number.parseFloat(height) <= 0) {
        newErrors.height = "Please enter a valid height"
      }
    }

    if (recipePanVolume && Number.parseFloat(recipePanVolume) <= 0) {
      newErrors.recipePanVolume = "Please enter a valid recipe pan volume"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateVolume = () => {
    if (!validateInputs()) return

    let volumeCm3 = 0

    if (selectedShape === "round") {
      const radius = Number.parseFloat(diameter) / 2
      volumeCm3 = Math.PI * Math.pow(radius, 2) * Number.parseFloat(height)
    } else if (selectedShape === "rectangle") {
      volumeCm3 = Number.parseFloat(length) * Number.parseFloat(width) * Number.parseFloat(height)
    }

    const volumeL = volumeCm3 / 1000

    let ratio = null
    if (recipePanVolume && Number.parseFloat(recipePanVolume) > 0) {
      ratio = volumeL / Number.parseFloat(recipePanVolume)
    }

    setResult({
      volumeCm3,
      volumeL,
      ratio,
      recipePanVolumeL: recipePanVolume ? Number.parseFloat(recipePanVolume) : null,
    })
    setShowResult(true)
  }

  const renderInputFields = () => {
    const commonInputClass =
      "w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200 shadow-sm"

    if (selectedShape === "round") {
      return (
        <>
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Diameter (cm)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-5 w-5 text-pink-500" />
              </div>
              <Input
                className={`${commonInputClass} ${errors.diameter ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                type="number"
                step="0.1"
                placeholder="Enter diameter in cm"
                value={diameter}
                onChange={(e) => {
                  setDiameter(e.target.value)
                  if (errors.diameter) setErrors((prev) => ({ ...prev, diameter: "" }))
                }}
              />
            </div>
            {errors.diameter && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.diameter}</span>
              </div>
            )}
          </div>
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Height (cm)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-5 w-5 text-pink-500" />
              </div>
              <Input
                className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                type="number"
                step="0.1"
                placeholder="Enter height in cm"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value)
                  if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                }}
              />
            </div>
            {errors.height && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.height}</span>
              </div>
            )}
          </div>
        </>
      )
    } else if (selectedShape === "rectangle") {
      return (
        <>
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Length (cm)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-5 w-5 text-pink-500" />
              </div>
              <Input
                className={`${commonInputClass} ${errors.length ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                type="number"
                step="0.1"
                placeholder="Enter length in cm"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value)
                  if (errors.length) setErrors((prev) => ({ ...prev, length: "" }))
                }}
              />
            </div>
            {errors.length && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.length}</span>
              </div>
            )}
          </div>
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Width (cm)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-5 w-5 text-pink-500" />
              </div>
              <Input
                className={`${commonInputClass} ${errors.width ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                type="number"
                step="0.1"
                placeholder="Enter width in cm"
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value)
                  if (errors.width) setErrors((prev) => ({ ...prev, width: "" }))
                }}
              />
            </div>
            {errors.width && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.width}</span>
              </div>
            )}
          </div>
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Height (cm)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-5 w-5 text-pink-500" />
              </div>
              <Input
                className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                type="number"
                step="0.1"
                placeholder="Enter height in cm"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value)
                  if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                }}
              />
            </div>
            {errors.height && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.height}</span>
              </div>
            )}
          </div>
        </>
      )
    }

    return null
  }

  return (
    <>
      <Head>
        <title>Cake Pan Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate cake pan volume and recipe scaling ratios. Perfect for adjusting recipes to different pan sizes."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
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
                  <p className="text-sm text-gray-500">Cake Pan Calculator</p>
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
              <Link href="/food" className="text-gray-500 hover:text-blue-600">
                Food
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Cake Pan Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cake Pan Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate cake pan volume and recipe scaling ratios. Perfect for adjusting recipes to different pan
                sizes and ensuring perfect baking results.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Cookie className="w-6 h-6 text-pink-600" />
                      <span>Pan Shape & Dimensions</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Select pan shape and enter dimensions to calculate volume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Shape Selector */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Pan Shape</Label>
                      <Select value={selectedShape} onValueChange={setSelectedShape}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200">
                          <SelectValue placeholder="Choose a pan shape" />
                        </SelectTrigger>
                        <SelectContent>
                          {shapes.map((shape) => (
                            <SelectItem key={shape.value} value={shape.value}>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{shape.icon}</span>
                                <span>{shape.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dynamic Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">{renderInputFields()}</div>

                    {/* Recipe Pan Volume (Optional) */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Recipe Pan Volume (L) - Optional
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calculator className="h-5 w-5 text-pink-500" />
                        </div>
                        <Input
                          className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200 shadow-sm ${
                            errors.recipePanVolume ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="0.01"
                          placeholder="Enter recipe pan volume in liters"
                          value={recipePanVolume}
                          onChange={(e) => {
                            setRecipePanVolume(e.target.value)
                            if (errors.recipePanVolume) setErrors((prev) => ({ ...prev, recipePanVolume: "" }))
                          }}
                        />
                      </div>
                      {errors.recipePanVolume && (
                        <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.recipePanVolume}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <p className="text-sm text-gray-700">
                        <strong>Conversion:</strong> 1 L = 1000 cm³
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Enter recipe pan volume to get scaling ratio for adjusting ingredient quantities.
                      </p>
                    </div>

                    <Button
                      onClick={calculateVolume}
                      className="w-full h-12 text-lg bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800"
                    >
                      Calculate Pan Volume
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-700 flex items-center justify-center mb-3 shadow-lg">
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">
                      Pan Volume Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="bg-white p-3 rounded-lg border border-pink-200">
                            <p className="text-2xl font-bold text-pink-900">{result.volumeL?.toFixed(3)}</p>
                            <p className="text-gray-600">liters (L)</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-pink-200">
                            <p className="text-lg font-bold text-pink-900">{result.volumeCm3?.toFixed(0)}</p>
                            <p className="text-gray-600">cm³</p>
                          </div>
                          {result.ratio && (
                            <div className="bg-white p-3 rounded-lg border border-pink-200">
                              <p className="text-lg font-bold text-pink-900">{result.ratio?.toFixed(2)}x</p>
                              <p className="text-gray-600">Recipe Ratio</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <ChefHat className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Select shape, enter dimensions and click{" "}
                          <span className="font-semibold text-pink-600">Calculate</span> to see volume.
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
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>Detailed Volume Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-pink-700 mb-2">Volume (Liters)</h3>
                        <p className="text-3xl font-bold text-pink-900 mb-1">{result.volumeL?.toFixed(3)}</p>
                        <p className="text-xl text-pink-600">L</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Ruler className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-pink-700 mb-2">Volume (cm³)</h3>
                        <p className="text-3xl font-bold text-pink-900 mb-1">{result.volumeCm3?.toFixed(0)}</p>
                        <p className="text-xl text-pink-600">cm³</p>
                      </div>
                      {result.ratio && (
                        <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Calculator className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-pink-700 mb-2">Recipe Scaling</h3>
                          <p className="text-3xl font-bold text-pink-900 mb-1">{result.ratio?.toFixed(2)}x</p>
                          <p className="text-xl text-pink-600">Multiply ingredients</p>
                        </div>
                      )}
                    </div>

                    {result.ratio && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-700 mb-2">Recipe Adjustment Guide:</h4>
                        {result.ratio > 1 ? (
                          <p className="text-gray-700">
                            Your pan is {result.ratio.toFixed(2)} times larger than the recipe pan. Multiply all
                            ingredients by {result.ratio.toFixed(2)} to fill your pan properly.
                          </p>
                        ) : result.ratio < 1 ? (
                          <p className="text-gray-700">
                            Your pan is {(1 / result.ratio).toFixed(2)} times smaller than the recipe pan. Multiply all
                            ingredients by {result.ratio.toFixed(2)} to avoid overflow.
                          </p>
                        ) : (
                          <p className="text-gray-700">
                            Your pan is the same size as the recipe pan. Use the original recipe quantities.
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-700 flex items-center justify-center mr-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">
                    Understanding Pan Volume in Baking
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Why Pan Volume Matters</h3>
                      <p className="text-gray-700 mb-4">
                        Pan volume determines how much batter your pan can hold and affects baking time, texture, and
                        rise. Using the wrong pan size can result in overflow, uneven baking, or flat cakes.
                      </p>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Scaling Guidelines</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Your pan is larger than the recipe pan - increase ingredients</li>
                        <li>Your pan is smaller than the recipe pan - reduce ingredients</li>
                        <li>Your pan is the same size as the recipe pan - use original recipe</li>
                        <li>Adjust baking time: larger pans need more time</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Sample Calculations</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Round Pan: 20cm × 5cm</strong>
                        </p>
                        <p className="text-gray-700">V = π(10²)(5) = 1,571 cm³</p>
                        <p className="text-gray-700 font-semibold">≈ 1.571 L</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Rectangle Pan: 20cm × 20cm × 5cm</strong>
                        </p>
                        <p className="text-gray-700">V = 20 × 20 × 5 = 2,000 cm³</p>
                        <p className="text-gray-700 font-semibold">= 2.0 L</p>
                        <p className="text-gray-700 mt-2">Ratio: 2.0 ÷ 1.571 = 1.27x</p>
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
