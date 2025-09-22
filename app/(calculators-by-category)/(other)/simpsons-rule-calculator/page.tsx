"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calculator, FenceIcon as Function, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SEO from "@/lib/seo"
import Logo from "@/components/logo"

// Function parser for mathematical expressions
const evaluateFunction = (expression: string, x: number): number => {
  try {
    // Replace x with the actual value and common math functions
    const expr = expression
      .replace(/x/g, x.toString())
      .replace(/\^/g, "**")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log")
      .replace(/ln/g, "Math.log")
      .replace(/sqrt/g, "Math.sqrt")
      .replace(/pi/g, "Math.PI")
      .replace(/e/g, "Math.E")

    return eval(expr)
  } catch (error) {
    throw new Error(`Invalid function at x = ${x}`)
  }
}

export default function SimpsonsRuleCalculator() {
  const [functionExpression, setFunctionExpression] = useState("(x**5 + 7)**(-1/3)")
  const [lowerLimit, setLowerLimit] = useState(0)
  const [upperLimit, setUpperLimit] = useState(1)
  const [subintervals, setSubintervals] = useState(4)
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState("")
  const [showSteps, setShowSteps] = useState(false)

  const calculateSimpsonsRule = () => {
    setError("")

    // Validation
    if (subintervals % 2 !== 0) {
      setError("n must be an even integer. Simpson's 1/3 rule requires an even number of subintervals.")
      return
    }

    if (subintervals <= 0) {
      setError("Number of subintervals must be positive.")
      return
    }

    if (upperLimit <= lowerLimit) {
      setError("Upper limit must be greater than lower limit.")
      return
    }

    if (!functionExpression.trim()) {
      setError("Please enter a function.")
      return
    }

    try {
      const a = lowerLimit
      const b = upperLimit
      const n = subintervals

  // Calculate subinterval width
  const deltaX = (b - a) / n
  // For formula clarity, also calculate (b - a) / (3 * n)
  const simpsonFactor = (b - a) / (3 * n)

      // Generate partition points
      const points = []
      const functionValues = []
      const coefficients = []

      for (let i = 0; i <= n; i++) {
        const xi = a + i * deltaX
        points.push(xi)

        try {
          const fxi = evaluateFunction(functionExpression, xi)
          if (!isFinite(fxi)) {
            throw new Error(`Function undefined at x = ${xi}`)
          }
          functionValues.push(fxi)
        } catch (err) {
          let message = 'Unknown error';
          if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
            message = (err as any).message;
          }
          setError(`Function evaluation error at x = ${xi}: ${message}`)
          return
        }

        // Determine coefficients: 1 for endpoints, 4 for odd indices, 2 for even indices
        if (i === 0 || i === n) {
          coefficients.push(1)
        } else if (i % 2 === 1) {
          coefficients.push(4)
        } else {
          coefficients.push(2)
        }
      }

      // Apply Simpson's Rule formula
      let sum = 0
      for (let i = 0; i <= n; i++) {
        sum += coefficients[i] * functionValues[i]
      }

  // Simpson's 1/3 Rule: (b - a) / (3n) * sum
  const approximateIntegral = simpsonFactor * sum

      setResult({
        approximateIntegral,
        deltaX,
        simpsonFactor,
        points,
        functionValues,
        coefficients,
        sum,
        formula: "∫ₐᵇ f(x)dx ≈ (b-a)/(3n)[f(x₀) + 4f(x₁) + 2f(x₂) + ... + 4f(xₙ₋₁) + f(xₙ)]",
        functionExpression,
        lowerLimit: a,
        upperLimit: b,
        subintervals: n,
      })
      setShowResult(true)
    } catch (err) {
      let message = 'Unknown error';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
        message = (err as any).message;
      }
      setError(`Calculation error: ${message}`)
    }
  }

  const runExample = () => {
    setFunctionExpression("1/(x**5 + 7)")
    setLowerLimit(0)
    setUpperLimit(1)
    setSubintervals(4)
    setTimeout(() => calculateSimpsonsRule(), 100)
  }

  return (
    <>
      <SEO
        title="Simpson's Rule Calculator – Approximate Integrals Easily"
        description="Simpson's Rule Calculator: Calculate approximate integrals using Simpson's 1/3 rule with ease."
        slug="simpsons-rule-calculator"
        keywords="Simpson's Rule, Numerical Integration, Integral Calculator, Definite Integral, Math Calculator, Calculus, Approximate Integration, Simpson's 1/3 Rule, Math Tool"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Simpson's Rule Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-green-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/other-calculators" className="text-gray-500 hover:text-green-600">
                Other Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Simpson's Rule Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Function className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simpson's Rule Calculator – Approximate Integrals Easily
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Use Simpson's Rule to approximate definite integrals with high accuracy. This numerical integration
                method provides excellent approximations for smooth functions using parabolic segments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Function className="w-6 h-6 text-green-600" />
                      <span>Simpson's Rule Integration</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your function and integration limits to calculate the approximate integral
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {error && (
                      <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Function f(x) <span className="text-gray-500">(use x as variable, ** for powers)</span>
                        </Label>
                        <Input
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm font-mono"
                          type="text"
                          value={functionExpression}
                          onChange={(e) => setFunctionExpression(e.target.value)}
                          placeholder="e.g., x**2 + 3*x + 1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: +, -, *, /, **, sin, cos, tan, sqrt, log, ln, pi, e
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Lower Limit (a)</Label>
                          <Input
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                            type="number"
                            step="any"
                            value={lowerLimit}
                            onChange={(e) => setLowerLimit(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Upper Limit (b)</Label>
                          <Input
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                            type="number"
                            step="any"
                            value={upperLimit}
                            onChange={(e) => setUpperLimit(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Number of Subintervals (n) <span className="text-red-500">*must be even</span>
                        </Label>
                        <Input
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                          type="number"
                          min="2"
                          step="2"
                          value={subintervals}
                          onChange={(e) => setSubintervals(Number(e.target.value))}
                        />
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700">
                          <strong>Simpson's 1/3 Rule Formula:</strong><br />
                          <span className="font-mono">
                            ∫<sub>a</sub><sup>b</sup> f(x)dx ≈ (b-a)/(3n) [f(x₀) + 4f(x₁) + 2f(x₂) + ... + 4f(xₙ₋₁) + f(xₙ)]
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Where f(x) = (x⁵ + 7)<sup>-1/3</sup> for the example, n is even, and x<sub>i</sub> = a + i(b-a)/n
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button
                        onClick={calculateSimpsonsRule}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        Calculate Integral
                      </Button>
                      <Button
                        onClick={runExample}
                        variant="outline"
                        className="h-12 px-6 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        Try Example
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 h-full flex flex-col justify-center items-center p-8 sticky top-24">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center w-full">
                        <p className="text-lg text-gray-600 mb-2 font-medium">Approximate Integral</p>
                        <p className="text-4xl font-extrabold text-green-900 mb-4 drop-shadow-lg break-all">
                          {result.approximateIntegral.toFixed(6)}
                        </p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Δx = {result.deltaX.toFixed(4)}</p>
                          <p>Subintervals: {result.subintervals}</p>
                        </div>
                        <Button
                          onClick={() => setShowSteps(!showSteps)}
                          variant="outline"
                          size="sm"
                          className="mt-4 border-green-200 text-green-700 hover:bg-green-50"
                        >
                          {showSteps ? "Hide Steps" : "Show Steps"}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Function className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter function and limits, then click{" "}
                          <span className="font-semibold text-green-600">Calculate</span> to see result.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step-by-step breakdown */}
            {showResult && result && showSteps && (
              <div className="mt-8">
                <Card className="shadow-xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b px-8 py-6">
                    <CardTitle className="text-xl font-bold text-green-700">Step-by-Step Solution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">1. Given Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>Function: f(x) = {result.functionExpression}</p>
                          <p>Lower limit (a) = {result.lowerLimit}</p>
                          <p>Upper limit (b) = {result.upperLimit}</p>
                          <p>Number of subintervals (n) = {result.subintervals}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">2. Calculate Subinterval Width</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>
                            Δx = (b - a) / n = ({result.upperLimit} - {result.lowerLimit}) / {result.subintervals} ={" "}
                            {result.deltaX.toFixed(4)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">3. Partition Points and Function Values</h3>
                        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">i</th>
                                <th className="text-left py-2">xᵢ</th>
                                <th className="text-left py-2">f(xᵢ)</th>
                                <th className="text-left py-2">Coefficient</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.points.map((point: number, i: number) => (
                                <tr key={i} className="border-b">
                                  <td className="py-1">{i}</td>
                                  <td className="py-1">{point.toFixed(4)}</td>
                                  <td className="py-1">{result.functionValues[i].toFixed(6)}</td>
                                  <td className="py-1">{result.coefficients[i]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">4. Apply Simpson's Rule</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="mb-2">
                            Sum ={" "}
                            {result.coefficients
                              .map((coef: number, i: number) => `${coef} × ${result.functionValues[i].toFixed(6)}`)
                              .join(" + ")}
                          </p>
                          <p className="mb-2">Sum = {result.sum.toFixed(6)}</p>
                          <p>
                            Integral ≈ (b-a)/(3n) × Sum = ({result.lowerLimit} to {result.upperLimit})/3×{result.subintervals} × {result.sum.toFixed(6)} = <strong>{result.approximateIntegral.toFixed(6)}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* What is Simpson's Rule */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">What is Simpson's Rule?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Simpson's Rule is a numerical integration technique that approximates definite integrals by fitting
                    parabolic curves through sets of three points. It's more accurate than the Trapezoidal Rule because
                    it uses quadratic approximations instead of linear ones.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The method divides the integration interval into an even number of subintervals and applies the
                    formula with alternating coefficients (1, 4, 2, 4, 2, ..., 4, 1) to achieve higher precision.
                  </p>
                </CardContent>
              </Card>

              {/* How to Use */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">How to Use the Calculator</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>Enter your function f(x) using standard mathematical notation</li>
                    <li>Set the lower limit (a) and upper limit (b) of integration</li>
                    <li>Choose an even number of subintervals (n) - more subintervals give higher accuracy</li>
                    <li>Click "Calculate Integral" to get the approximate result</li>
                    <li>Use "Show Steps" to see the detailed calculation process</li>
                  </ol>
                </CardContent>
              </Card>

              {/* Formula */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Formula</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <p className="text-lg font-mono text-center mb-4">
                      ∫<sub>a</sub>
                      <sup>b</sup> f(x)dx ≈ (Δx/3)[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + 4f(x<sub>n-1</sub>) + f(x
                      <sub>n</sub>)]
                    </p>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p>
                        <strong>Where:</strong>
                      </p>
                      <p>• Δx = (b - a) / n (subinterval width)</p>
                      <p>• n = even number of subintervals</p>
                      <p>• Coefficients: 1 for endpoints, 4 for odd indices, 2 for even indices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Example</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>Problem:</strong> Approximate ∫₀¹ 1/(x⁵ + 7) dx using n = 4
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Solution:</p>
                      <p>1. Δx = (1 - 0) / 4 = 0.25</p>
                      <p>2. Points: x₀ = 0, x₁ = 0.25, x₂ = 0.5, x₃ = 0.75, x₄ = 1</p>
                      <p>
                        3. Function values: f(0) ≈ 0.142857, f(0.25) ≈ 0.142653, f(0.5) ≈ 0.141844, f(0.75) ≈ 0.139665,
                        f(1) = 0.125
                      </p>
                      <p>4. Apply coefficients [1, 4, 2, 4, 1]: Sum ≈ 1.133</p>
                      <p>
                        5. Result: (0.25/3) × 1.133 ≈ <strong>0.094417</strong>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">FAQ</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">What is Simpson's Rule?</h3>
                      <p className="text-gray-700">
                        Simpson's Rule is a numerical method for approximating definite integrals using parabolic
                        approximations, providing higher accuracy than linear methods like the Trapezoidal Rule.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Why must n be even?</h3>
                      <p className="text-gray-700">
                        Simpson's 1/3 rule requires pairing adjacent intervals to form parabolic segments. Each parabola
                        needs three points, so we need an even number of intervals to create complete pairs.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">How accurate is Simpson's Rule?</h3>
                      <p className="text-gray-700">
                        Simpson's Rule has an error of O(h⁵), making it much more accurate than the Trapezoidal Rule's
                        O(h³) error. It's exact for polynomials up to degree 3.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Difference between Trapezoidal Rule and Simpson's Rule?
                      </h3>
                      <p className="text-gray-700">
                        The Trapezoidal Rule uses linear approximations (straight lines) while Simpson's Rule uses
                        quadratic approximations (parabolas), resulting in significantly higher accuracy for smooth
                        functions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_720-8sE77EX08xKuB6AvLTisdyhRT3j1X2.png"
                  alt="Smart Calculator Logo"
                  className="w-12 h-12"
                />
                <span className="text-2xl font-bold">Smart Calculator</span>
              </div>
              <p className="text-gray-400">&copy; 2025 Smart Calculator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
