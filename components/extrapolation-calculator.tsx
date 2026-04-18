"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp } from "lucide-react"

export default function ExtrapolationCalculator() {
  const [x1, setX1] = useState<string>("")
  const [y1, setY1] = useState<string>("")
  const [x2, setX2] = useState<string>("")
  const [y2, setY2] = useState<string>("")
  const [x3, setX3] = useState<string>("")
  const [y3, setY3] = useState<string>("")
  const [calculationMode, setCalculationMode] = useState<"findY" | "findX">("findY")

  const [result, setResult] = useState<null | {
    value: number
    slope: number
    steps: string[]
  }>(null)

  const calculateExtrapolation = () => {
    const X1 = parseFloat(x1)
    const Y1 = parseFloat(y1)
    const X2 = parseFloat(x2)
    const Y2 = parseFloat(y2)

    if (isNaN(X1) || isNaN(Y1) || isNaN(X2) || isNaN(Y2)) {
      alert("Please enter valid values for both known data points (X1, Y1) and (X2, Y2)")
      return
    }

    if (X1 === X2) {
      alert("X1 and X2 cannot be the same value (slope would be undefined)")
      return
    }

    // Calculate slope
    const slope = (Y2 - Y1) / (X2 - X1)

    let calculatedValue: number
    let steps: string[] = []

    if (calculationMode === "findY") {
      const X3 = parseFloat(x3)
      if (isNaN(X3)) {
        alert("Please enter a valid X3 value")
        return
      }

      // Y3 = Y1 + [(X3 - X1) / (X2 - X1)] × (Y2 - Y1)
      const multiplier = (X3 - X1) / (X2 - X1)
      const difference = Y2 - Y1
      calculatedValue = Y1 + multiplier * difference

      steps = [
        `Step 1: Calculate the slope: m = (Y2 - Y1) / (X2 - X1)`,
        `m = (${Y2} - ${Y1}) / (${X2} - ${X1}) = ${slope.toFixed(4)}`,
        ``,
        `Step 2: Apply the linear extrapolation formula:`,
        `Y3 = Y1 + [(X3 - X1) / (X2 - X1)] × (Y2 - Y1)`,
        ``,
        `Step 3: Substitute the values:`,
        `Y3 = ${Y1} + [(${X3} - ${X1}) / (${X2} - ${X1})] × (${Y2} - ${Y1})`,
        `Y3 = ${Y1} + [${(X3 - X1).toFixed(2)} / ${(X2 - X1).toFixed(2)}] × ${difference.toFixed(2)}`,
        `Y3 = ${Y1} + ${multiplier.toFixed(4)} × ${difference.toFixed(2)}`,
        `Y3 = ${Y1} + ${(multiplier * difference).toFixed(4)}`,
        `Y3 = ${calculatedValue.toFixed(4)}`
      ]
    } else {
      const Y3 = parseFloat(y3)
      if (isNaN(Y3)) {
        alert("Please enter a valid Y3 value")
        return
      }

      // X3 = X1 + [(Y3 - Y1) / slope]
      calculatedValue = X1 + (Y3 - Y1) / slope

      steps = [
        `Step 1: Calculate the slope: m = (Y2 - Y1) / (X2 - X1)`,
        `m = (${Y2} - ${Y1}) / (${X2} - ${X1}) = ${slope.toFixed(4)}`,
        ``,
        `Step 2: Apply the rearranged formula to find X3:`,
        `X3 = X1 + [(Y3 - Y1) / m]`,
        ``,
        `Step 3: Substitute the values:`,
        `X3 = ${X1} + [(${Y3} - ${Y1}) / ${slope.toFixed(4)}]`,
        `X3 = ${X1} + [${(Y3 - Y1).toFixed(2)} / ${slope.toFixed(4)}]`,
        `X3 = ${X1} + ${((Y3 - Y1) / slope).toFixed(4)}`,
        `X3 = ${calculatedValue.toFixed(4)}`
      ]
    }

    setResult({
      value: calculatedValue,
      slope,
      steps
    })
  }

  const reset = () => {
    setX1("")
    setY1("")
    setX2("")
    setY2("")
    setX3("")
    setY3("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Linear Extrapolation Calculator
        </h3>

        {/* Calculation Mode Selector */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">What do you want to find?</Label>
          <div className="flex gap-4">
            <button
              onClick={() => setCalculationMode("findY")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                calculationMode === "findY"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
              }`}
            >
              Find Y3 (given X3)
            </button>
            <button
              onClick={() => setCalculationMode("findX")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                calculationMode === "findX"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
              }`}
            >
              Find X3 (given Y3)
            </button>
          </div>
        </div>

        {/* Known Data Points */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
            <h4 className="font-bold text-gray-900 mb-3">First Known Point (X1, Y1)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="x1">X1</Label>
                <Input
                  id="x1"
                  type="number"
                  step="any"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  placeholder="e.g., 1"
                  className="border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="y1">Y1</Label>
                <Input
                  id="y1"
                  type="number"
                  step="any"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  placeholder="e.g., 20000"
                  className="border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border-2 border-green-200">
            <h4 className="font-bold text-gray-900 mb-3">Second Known Point (X2, Y2)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="x2">X2</Label>
                <Input
                  id="x2"
                  type="number"
                  step="any"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  placeholder="e.g., 2"
                  className="border-2 border-gray-300 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="y2">Y2</Label>
                <Input
                  id="y2"
                  type="number"
                  step="any"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  placeholder="e.g., 26000"
                  className="border-2 border-gray-300 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Target Point */}
        <div className="bg-white p-4 rounded-lg border-2 border-purple-200 mb-4">
          <h4 className="font-bold text-gray-900 mb-3">
            {calculationMode === "findY" ? "Target X Value (X3)" : "Target Y Value (Y3)"}
          </h4>
          {calculationMode === "findY" ? (
            <div className="space-y-2">
              <Label htmlFor="x3">X3 (value to extrapolate at)</Label>
              <Input
                id="x3"
                type="number"
                step="any"
                value={x3}
                onChange={(e) => setX3(e.target.value)}
                placeholder="e.g., 5"
                className="border-2 border-gray-300 focus:border-purple-500"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="y3">Y3 (value to extrapolate at)</Label>
              <Input
                id="y3"
                type="number"
                step="any"
                value={y3}
                onChange={(e) => setY3(e.target.value)}
                placeholder="e.g., 44000"
                className="border-2 border-gray-300 focus:border-purple-500"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={calculateExtrapolation}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Extrapolation
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100"
          >
            Reset
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-white p-6 rounded-lg border-2 border-purple-300 shadow-md">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  {calculationMode === "findY" ? "Extrapolated Y3 Value" : "Extrapolated X3 Value"}
                </p>
                <p className="text-6xl font-bold text-purple-600">{result.value.toFixed(4)}</p>
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 mb-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Slope (m):</p>
                  <p className="text-xl font-bold text-blue-700">{result.slope.toFixed(4)}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Step-by-Step Solution:</p>
                  <div className="space-y-1 font-mono text-sm text-gray-700">
                    {result.steps.map((step, index) => (
                      <p key={index} className={step === "" ? "h-2" : ""}>
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                <p>
                  <strong>Formula Used:</strong>{" "}
                  {calculationMode === "findY"
                    ? "Y3 = Y1 + [(X3 - X1) / (X2 - X1)] × (Y2 - Y1)"
                    : "X3 = X1 + [(Y3 - Y1) / slope]"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
