"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, ArrowRightLeft, Zap } from "lucide-react"

export default function PhasorCalculator() {
  const [rectangularA, setRectangularA] = useState<string>("3")
  const [rectangularB, setRectangularB] = useState<string>("4")
  const [polarR, setPolarR] = useState<string>("5")
  const [polarTheta, setPolarTheta] = useState<string>("53.13")
  const [results, setResults] = useState<any>(null)

  const rectangularToPolar = () => {
    const a = parseFloat(rectangularA) || 0
    const b = parseFloat(rectangularB) || 0

    const R = Math.sqrt(a * a + b * b)
    const theta = Math.atan2(b, a) * (180 / Math.PI)

    setResults({
      type: "rect-to-polar",
      input: { a, b },
      output: { R, theta },
      eulerForm: `${R.toFixed(4)}e^(j${theta.toFixed(2)}°)`
    })
  }

  const polarToRectangular = () => {
    const R = parseFloat(polarR) || 0
    const theta = parseFloat(polarTheta) || 0
    const thetaRad = theta * (Math.PI / 180)

    const a = R * Math.cos(thetaRad)
    const b = R * Math.sin(thetaRad)

    setResults({
      type: "polar-to-rect",
      input: { R, theta },
      output: { a, b },
      eulerForm: `${R.toFixed(4)}e^(j${theta.toFixed(2)}°)`
    })
  }

  const formatNumber = (num: number) => {
    return num.toFixed(4)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-purple-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Zap className="w-8 h-8" />
            Phasor Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="rect-to-polar" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="rect-to-polar" className="text-base">
                Rectangular → Polar
              </TabsTrigger>
              <TabsTrigger value="polar-to-rect" className="text-base">
                Polar → Rectangular
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rect-to-polar" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rect-a" className="text-base font-semibold text-gray-700">
                    Real Part (a)
                  </Label>
                  <Input
                    id="rect-a"
                    type="number"
                    step="any"
                    value={rectangularA}
                    onChange={(e) => setRectangularA(e.target.value)}
                    placeholder="Enter real part"
                    className="border-2 border-gray-300 text-lg"
                  />
                  <p className="text-sm text-gray-500">In-phase component</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rect-b" className="text-base font-semibold text-gray-700">
                    Imaginary Part (b)
                  </Label>
                  <Input
                    id="rect-b"
                    type="number"
                    step="any"
                    value={rectangularB}
                    onChange={(e) => setRectangularB(e.target.value)}
                    placeholder="Enter imaginary part"
                    className="border-2 border-gray-300 text-lg"
                  />
                  <p className="text-sm text-gray-500">Quadrature component (j)</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-center text-lg font-semibold text-blue-900">
                  Z = {rectangularA} + j{rectangularB}
                </p>
              </div>

              <Button
                onClick={rectangularToPolar}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-6 text-lg"
              >
                <ArrowRightLeft className="w-5 h-5 mr-2" />
                Convert to Polar Form
              </Button>
            </TabsContent>

            <TabsContent value="polar-to-rect" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="polar-r" className="text-base font-semibold text-gray-700">
                    Magnitude (R)
                  </Label>
                  <Input
                    id="polar-r"
                    type="number"
                    step="any"
                    value={polarR}
                    onChange={(e) => setPolarR(e.target.value)}
                    placeholder="Enter magnitude"
                    className="border-2 border-gray-300 text-lg"
                  />
                  <p className="text-sm text-gray-500">Modulus (always ≥ 0)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="polar-theta" className="text-base font-semibold text-gray-700">
                    Phase Angle (θ) in degrees
                  </Label>
                  <Input
                    id="polar-theta"
                    type="number"
                    step="any"
                    value={polarTheta}
                    onChange={(e) => setPolarTheta(e.target.value)}
                    placeholder="Enter angle"
                    className="border-2 border-gray-300 text-lg"
                  />
                  <p className="text-sm text-gray-500">Measured counterclockwise</p>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <p className="text-center text-lg font-semibold text-green-900">
                  Z = {polarR}∠{polarTheta}°
                </p>
              </div>

              <Button
                onClick={polarToRectangular}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-6 text-lg"
              >
                <ArrowRightLeft className="w-5 h-5 mr-2" />
                Convert to Rectangular Form
              </Button>
            </TabsContent>
          </Tabs>

          {results && (
            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Conversion Results
                </h3>

                {results.type === "rect-to-polar" && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                      <div className="text-sm text-gray-600 mb-2">Input (Rectangular Form)</div>
                      <div className="text-xl font-bold text-purple-900">
                        Z = {results.input.a} + j{results.input.b}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRightLeft className="w-8 h-8 text-purple-600" />
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                      <div className="text-sm text-gray-600 mb-2">Output (Polar Form)</div>
                      <div className="text-xl font-bold text-green-900 mb-3">
                        Z = {formatNumber(results.output.R)}∠{formatNumber(results.output.theta)}°
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-xs text-gray-600">Magnitude (R)</div>
                          <div className="text-lg font-semibold text-green-800">
                            {formatNumber(results.output.R)}
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-xs text-gray-600">Phase Angle (θ)</div>
                          <div className="text-lg font-semibold text-green-800">
                            {formatNumber(results.output.theta)}°
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                      <div className="text-sm text-indigo-900 font-semibold mb-1">Euler Form</div>
                      <div className="text-base text-indigo-800 font-mono">
                        Z = {results.eulerForm}
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                      <div className="text-sm text-blue-900 font-semibold mb-2">Formulas Used</div>
                      <div className="space-y-1 text-sm text-blue-800 font-mono">
                        <div>R = √(a² + b²) = √({results.input.a}² + {results.input.b}²) = {formatNumber(results.output.R)}</div>
                        <div>θ = atan2(b, a) = atan2({results.input.b}, {results.input.a}) = {formatNumber(results.output.theta)}°</div>
                      </div>
                    </div>
                  </div>
                )}

                {results.type === "polar-to-rect" && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                      <div className="text-sm text-gray-600 mb-2">Input (Polar Form)</div>
                      <div className="text-xl font-bold text-green-900">
                        Z = {results.input.R}∠{results.input.theta}°
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRightLeft className="w-8 h-8 text-purple-600" />
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
                      <div className="text-sm text-gray-600 mb-2">Output (Rectangular Form)</div>
                      <div className="text-xl font-bold text-purple-900 mb-3">
                        Z = {formatNumber(results.output.a)} + j{formatNumber(results.output.b)}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-purple-50 p-3 rounded">
                          <div className="text-xs text-gray-600">Real Part (a)</div>
                          <div className="text-lg font-semibold text-purple-800">
                            {formatNumber(results.output.a)}
                          </div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                          <div className="text-xs text-gray-600">Imaginary Part (b)</div>
                          <div className="text-lg font-semibold text-purple-800">
                            {formatNumber(results.output.b)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                      <div className="text-sm text-indigo-900 font-semibold mb-1">Euler Form</div>
                      <div className="text-base text-indigo-800 font-mono">
                        Z = {results.eulerForm}
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                      <div className="text-sm text-blue-900 font-semibold mb-2">Formulas Used</div>
                      <div className="space-y-1 text-sm text-blue-800 font-mono">
                        <div>a = R·cos(θ) = {results.input.R}·cos({results.input.theta}°) = {formatNumber(results.output.a)}</div>
                        <div>b = R·sin(θ) = {results.input.R}·sin({results.input.theta}°) = {formatNumber(results.output.b)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Note:</strong> This calculator uses atan2(b, a) for accurate angle calculation in all four quadrants. Engineers use "j" (not "i") for the imaginary unit because "i" represents current in electrical circuits.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
