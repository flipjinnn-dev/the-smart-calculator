"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import SEO from "@/lib/seo"
import { Calculator, FenceIcon as Function, AlertCircle, Download, Printer } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import Logo from "@/components/logo"

const parseExpression = (expr: string): string => {
  return expr
    .replace(/\*\*/g, "^") // Convert ** to ^ for powers
    .replace(/Math\./g, "") // Remove Math. prefix
    .replace(/\s+/g, "") // Remove all spaces
    .trim()
}

const differentiate = (expression: string, variable = "x"): string => {
  try {
    const expr = parseExpression(expression)

    // Handle polynomial terms like ax^n, ax^2, ax, x^n, x
    const terms = expr.split(/(?=[+-])/).filter((term) => term.length > 0)
    const derivativeTerms: string[] = []

    for (let term of terms) {
      term = term.trim()
      if (!term) continue

      // Check if term contains the variable
      if (!term.includes(variable)) {
        // Constant term - derivative is 0, skip
        continue
      }

      // Handle x^n terms
      const powerMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\^([+-]?\\d+)`))
      if (powerMatch) {
        const coeff =
          powerMatch[1] === "" || powerMatch[1] === "+"
            ? 1
            : powerMatch[1] === "-"
              ? -1
              : Number.parseFloat(powerMatch[1]) || 1
        const power = Number.parseInt(powerMatch[2])

        if (power === 0) continue // Derivative of constant is 0

        const newCoeff = coeff * power
        const newPower = power - 1

        if (newPower === 0) {
          derivativeTerms.push(newCoeff.toString())
        } else if (newPower === 1) {
          if (newCoeff === 1) derivativeTerms.push(variable)
          else if (newCoeff === -1) derivativeTerms.push(`-${variable}`)
          else derivativeTerms.push(`${newCoeff}*${variable}`)
        } else {
          if (newCoeff === 1) derivativeTerms.push(`${variable}^${newPower}`)
          else if (newCoeff === -1) derivativeTerms.push(`-${variable}^${newPower}`)
          else derivativeTerms.push(`${newCoeff}*${variable}^${newPower}`)
        }
        continue
      }

      // Handle linear terms like ax, x, -x, +x
      const linearMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}(?!\\^)`))
      if (linearMatch) {
        const coeff =
          linearMatch[1] === "" || linearMatch[1] === "+"
            ? 1
            : linearMatch[1] === "-"
              ? -1
              : Number.parseFloat(linearMatch[1]) || 1

        if (coeff === 1) derivativeTerms.push("1")
        else if (coeff === -1) derivativeTerms.push("-1")
        else derivativeTerms.push(coeff.toString())
        continue
      }
    }

    if (derivativeTerms.length === 0) return "0"

    // Join terms with proper signs
    let result = derivativeTerms[0]
    for (let i = 1; i < derivativeTerms.length; i++) {
      const term = derivativeTerms[i]
      if (term.startsWith("-")) {
        result += ` ${term}`
      } else {
        result += ` + ${term}`
      }
    }

    return result.replace(/\+ -/g, "- ")
  } catch (err) {
    console.error("Differentiation error:", err)
    return `d/d${variable}[${expression}]`
  }
}

const solveCriticalPoints = (derivative: string, variable = "x"): number[] => {
  try {
    if (derivative === "0") return []

    // Handle simple constants
    if (!derivative.includes(variable)) {
      return [] // No variable means no solution
    }

    // Handle linear equations like ax + b = 0
    const linearRegex = new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\s*([+-]\\s*\\d+\\.?\\d*)?`)
    const linearMatch = derivative.match(linearRegex)

    if (linearMatch && !derivative.includes(`${variable}^`)) {
      const a =
        linearMatch[1] === "" || linearMatch[1] === "+"
          ? 1
          : linearMatch[1] === "-"
            ? -1
            : Number.parseFloat(linearMatch[1]) || 1
      const b = linearMatch[2] ? Number.parseFloat(linearMatch[2].replace(/\s/g, "")) : 0

      if (a !== 0) {
        return [-b / a]
      }
    }

    // Handle quadratic equations like ax^2 + bx + c = 0
    const quadraticRegex = new RegExp(
      `([+-]?\\d*\\.?\\d*)\\*?${variable}\\^2\\s*([+-]\\s*\\d*\\.?\\d*\\*?${variable})?\\s*([+-]\\s*\\d+\\.?\\d*)?`,
    )
    const quadraticMatch = derivative.match(quadraticRegex)

    if (quadraticMatch) {
      const a =
        quadraticMatch[1] === "" || quadraticMatch[1] === "+"
          ? 1
          : quadraticMatch[1] === "-"
            ? -1
            : Number.parseFloat(quadraticMatch[1]) || 1

      let b = 0
      if (quadraticMatch[2]) {
        const bStr = quadraticMatch[2].replace(/\s/g, "").replace(variable, "").replace("*", "")
        b = bStr === "" || bStr === "+" ? 1 : bStr === "-" ? -1 : Number.parseFloat(bStr) || 0
      }

      const c = quadraticMatch[3] ? Number.parseFloat(quadraticMatch[3].replace(/\s/g, "")) : 0

      const discriminant = b * b - 4 * a * c
      if (discriminant >= 0) {
        const sqrt = Math.sqrt(discriminant)
        return [(-b + sqrt) / (2 * a), (-b - sqrt) / (2 * a)]
      }
    }

    return []
  } catch (err) {
    console.error("Solving error:", err)
    return []
  }
}

const partialDerivative = (expression: string, variable: string): string => {
  try {
    const expr = parseExpression(expression)
    const terms = expr.split(/(?=[+-])/).filter((term) => term.length > 0)
    const derivativeTerms: string[] = []

    for (let term of terms) {
      term = term.trim()
      if (!term) continue

      // Check if term contains the variable we're differentiating with respect to
      if (!term.includes(variable)) {
        // Term doesn't contain this variable - derivative is 0, skip
        continue
      }

      // Handle terms with both x and y (like 6xy)
      if (variable === "x" && term.includes("y")) {
        // Extract coefficient of xy term
        const xyMatch = term.match(/([+-]?\d*\.?\d*)\*?x\*?y/)
        if (xyMatch) {
          const coeff =
            xyMatch[1] === "" || xyMatch[1] === "+" ? 1 : xyMatch[1] === "-" ? -1 : Number.parseFloat(xyMatch[1]) || 1
          if (coeff === 1) derivativeTerms.push("y")
          else if (coeff === -1) derivativeTerms.push("-y")
          else derivativeTerms.push(`${coeff}*y`)
          continue
        }
      }

      if (variable === "y" && term.includes("x")) {
        // Extract coefficient of xy term
        const xyMatch = term.match(/([+-]?\d*\.?\d*)\*?x\*?y/)
        if (xyMatch) {
          const coeff =
            xyMatch[1] === "" || xyMatch[1] === "+" ? 1 : xyMatch[1] === "-" ? -1 : Number.parseFloat(xyMatch[1]) || 1
          if (coeff === 1) derivativeTerms.push("x")
          else if (coeff === -1) derivativeTerms.push("-x")
          else derivativeTerms.push(`${coeff}*x`)
          continue
        }
      }

      // Handle power terms like ax^n
      const powerMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}\\^([+-]?\\d+)`))
      if (powerMatch) {
        const coeff =
          powerMatch[1] === "" || powerMatch[1] === "+"
            ? 1
            : powerMatch[1] === "-"
              ? -1
              : Number.parseFloat(powerMatch[1]) || 1
        const power = Number.parseInt(powerMatch[2])

        if (power === 0) continue

        const newCoeff = coeff * power
        const newPower = power - 1

        if (newPower === 0) {
          derivativeTerms.push(newCoeff.toString())
        } else if (newPower === 1) {
          if (newCoeff === 1) derivativeTerms.push(variable)
          else if (newCoeff === -1) derivativeTerms.push(`-${variable}`)
          else derivativeTerms.push(`${newCoeff}*${variable}`)
        } else {
          if (newCoeff === 1) derivativeTerms.push(`${variable}^${newPower}`)
          else if (newCoeff === -1) derivativeTerms.push(`-${variable}^${newPower}`)
          else derivativeTerms.push(`${newCoeff}*${variable}^${newPower}`)
        }
        continue
      }

      // Handle linear terms like ax, x
      const linearMatch = term.match(new RegExp(`([+-]?\\d*\\.?\\d*)\\*?${variable}(?!\\^)`))
      if (linearMatch) {
        const coeff =
          linearMatch[1] === "" || linearMatch[1] === "+"
            ? 1
            : linearMatch[1] === "-"
              ? -1
              : Number.parseFloat(linearMatch[1]) || 1

        if (coeff === 1) derivativeTerms.push("1")
        else if (coeff === -1) derivativeTerms.push("-1")
        else derivativeTerms.push(coeff.toString())
        continue
      }
    }

    if (derivativeTerms.length === 0) return "0"

    // Join terms with proper signs
    let result = derivativeTerms[0]
    for (let i = 1; i < derivativeTerms.length; i++) {
      const term = derivativeTerms[i]
      if (term.startsWith("-")) {
        result += ` ${term}`
      } else {
        result += ` + ${term}`
      }
    }

    return result.replace(/\+ -/g, "- ")
  } catch (err) {
    console.error("Partial derivative error:", err)
    return `∂/∂${variable}[${expression}]`
  }
}

const solveSystem = (eq1: string, eq2: string): Array<{ x: number; y: number }> => {
  try {
    // Parse equations to extract coefficients
    const parseLinear = (eq: string) => {
      let a = 0,
        b = 0,
        c = 0

      // Extract x coefficient
      const xMatch = eq.match(/([+-]?\d*\.?\d*)\*?x/)
      if (xMatch) {
        a = xMatch[1] === "" || xMatch[1] === "+" ? 1 : xMatch[1] === "-" ? -1 : Number.parseFloat(xMatch[1]) || 0
      }

      // Extract y coefficient
      const yMatch = eq.match(/([+-]?\d*\.?\d*)\*?y/)
      if (yMatch) {
        b = yMatch[1] === "" || yMatch[1] === "+" ? 1 : yMatch[1] === "-" ? -1 : Number.parseFloat(yMatch[1]) || 0
      }

      // Extract constant term
      const constMatch = eq.match(/([+-]?\d+\.?\d*)(?!\*[xy])/)
      if (constMatch) {
        c = -Number.parseFloat(constMatch[1]) // Move to right side
      }

      return { a, b, c }
    }

    const eq1Parsed = parseLinear(eq1)
    const eq2Parsed = parseLinear(eq2)

    // Solve using substitution method (like competitor)
    // From eq2: if we can solve for x or y directly
    if (eq2Parsed.a !== 0 && eq2Parsed.b === 0) {
      // eq2 is just ax + c = 0, so x = -c/a
      const x = eq2Parsed.c / eq2Parsed.a
      // Substitute into eq1 to find y
      if (eq1Parsed.b !== 0) {
        const y = (eq1Parsed.c - eq1Parsed.a * x) / eq1Parsed.b
        return [{ x, y }]
      }
    }

    if (eq2Parsed.b !== 0 && eq2Parsed.a === 0) {
      // eq2 is just by + c = 0, so y = -c/b
      const y = eq2Parsed.c / eq2Parsed.b
      // Substitute into eq1 to find x
      if (eq1Parsed.a !== 0) {
        const x = (eq1Parsed.c - eq1Parsed.b * y) / eq1Parsed.a
        return [{ x, y }]
      }
    }

    // General case: solve using Cramer's rule
    const det = eq1Parsed.a * eq2Parsed.b - eq1Parsed.b * eq2Parsed.a

    if (Math.abs(det) < 1e-10) {
      return [] // No unique solution
    }

    const x = (eq1Parsed.c * eq2Parsed.b - eq1Parsed.b * eq2Parsed.c) / det
    const y = (eq1Parsed.a * eq2Parsed.c - eq1Parsed.c * eq2Parsed.a) / det

    return [{ x, y }]
  } catch (err) {
    console.error("System solving error:", err)
    return []
  }
}

export default function CriticalPointCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [functionExpression, setFunctionExpression] = useState("3*x^2 + 4*x + 9")

  type Point2D = {
    x: number
    y: number
  }

  type SingleVariableResult = {
    type: "single"
    function: string
    derivative: string
    criticalPoints: number[]
    steps: string[]
  }

  type MultiVariableResult = {
    type: "multi"
    function: string
    partialX: string
    partialY: string
    criticalPoints: Point2D[]
    steps: string[]
  }

  type CalculatorResult = SingleVariableResult | MultiVariableResult

  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState("")

  const formatNumber = (value: number): string => {
    if (!isFinite(value) || isNaN(value)) return "undefined"

    // Check if it's a simple fraction
    const tolerance = 1e-10
    for (let denom = 1; denom <= 20; denom++) {
      const num = Math.round(value * denom)
      if (Math.abs(value - num / denom) < tolerance) {
        if (denom === 1) return num.toString()
        if (num < 0) return `-${Math.abs(num)}/${denom}`
        return `${num}/${denom}`
      }
    }

    return Math.abs(value) < 1e-10 ? "0" : value.toFixed(4)
  }

  const formatPoint = (point: Point2D): string => {
    return `(${formatNumber(point.x)}, ${formatNumber(point.y)})`
  }

  const calculateCriticalPoints = () => {
    setError("")
    if (!functionExpression.trim()) {
      setError("Please enter a function.")
      return
    }

    try {
      const cleanedExpression = functionExpression.replace(/\^/g, "**").replace(/\s+/g, "").trim()

      const hasX = /(?:^|[^a-zA-Z])x(?:[^a-zA-Z]|$)/.test(cleanedExpression)
      const hasY = /(?:^|[^a-zA-Z])y(?:[^a-zA-Z]|$)/.test(cleanedExpression)

      if (hasX && hasY) {
        const partialX = partialDerivative(functionExpression, "x")
        const partialY = partialDerivative(functionExpression, "y")
        const criticalPoints = solveSystem(partialX, partialY)

        const steps = [
          `Step I: Calculate the first partial derivative w.r.t "x"`,
          `∂f/∂x = ${partialX}`,
          `Step II: Calculate the first partial derivative w.r.t "y"`,
          `∂f/∂y = ${partialY}`,
          `Step III: Set both partial derivatives equal to zero`,
          `${partialX} = 0`,
          `${partialY} = 0`,
          criticalPoints.length > 0
            ? `Critical point(s): ${criticalPoints.map((p) => formatPoint(p)).join(", ")}`
            : "No critical points found",
        ]

        setResult({
          type: "multi",
          function: functionExpression,
          partialX,
          partialY,
          criticalPoints,
          steps,
        })
      } else {
        const variable = hasX ? "x" : "y"
        const derivative = differentiate(functionExpression, variable)
        const criticalPoints = solveCriticalPoints(derivative, variable)

        const steps = [
          `Step I: Find the first derivative of the given function`,
          `f'(${variable}) = ${derivative}`,
          `Step II: Set the first derivative equal to zero and solve`,
          `${derivative} = 0`,
          criticalPoints.length > 0
            ? `Critical point(s): ${variable} = ${criticalPoints.map((p) => formatNumber(p)).join(", ")}`
            : "No critical points found",
        ]

        setResult({
          type: "single",
          function: functionExpression,
          derivative,
          criticalPoints,
          steps,
        })
      }

      setShowResult(true)
      scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    } catch (err) {
      setError("Calculation error. Please check your function syntax.")
      console.error("Calculation error:", err)
    }
  }

  const runSingleExample = () => {
    setFunctionExpression("3*x^2 + 4*x + 9")
    setTimeout(() => calculateCriticalPoints(), 100)
  }

  const runMultiExample = () => {
    setFunctionExpression("4*x^2 + 6*x*y + 8*y")
    setTimeout(() => calculateCriticalPoints(), 100)
  }

  const exportToPDF = () => {
    window.print()
  }

  return (
    <>
      <SEO
        title="Critical Point Calculator – Find f′(x)=0 or ∂f/∂x=0 Solutions"
        description="Free Critical Point Calculator. Find critical points of single-variable or multivariable functions by solving f′(x)=0 or ∂f/∂x=0 and ∂f/∂y=0. Supports undefined derivative checks."
        keywords="critical point calculator, derivative calculator, calculus calculator, find critical points, f'(x)=0 solver"
        slug="/maths/critical-point-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Critical Point Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-orange-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/maths" className="text-gray-500 hover:text-orange-600">
                Math Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Critical Point Calculator</span>
            </div>
          </div>
        </nav>

        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Function className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Critical Point Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Find critical points of single-variable or multivariable functions by solving f′(x)=0 or ∂f/∂x=0 and
                ∂f/∂y=0. Identify where derivatives are zero or undefined.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Function className="w-6 h-6 text-orange-600" />
                      <span>Critical Point Finder</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your function to find critical points automatically
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
                          Function{" "}
                          <span className="text-gray-500">(use x for single-variable, x and y for multivariable)</span>
                        </Label>
                        <Input
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm font-mono"
                          type="text"
                          value={functionExpression}
                          onChange={(e) => setFunctionExpression(e.target.value)}
                          placeholder="e.g., 3*x^2 + 4*x + 9"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: +, -, *, /, ^, sin, cos, tan, sqrt, log, ln, pi, e
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-700">
                          <strong>How it works:</strong>
                          <br />• If your function only uses x, it finds f'(x) and solves f'(x) = 0<br />• If your
                          function uses x and y, it finds ∂f/∂x, ∂f/∂y and solves both = 0
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button
                        onClick={calculateCriticalPoints}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                      >
                        Calculate
                      </Button>
                      <Button
                        onClick={() => {
                          if (/y/.test(functionExpression)) {
                            runMultiExample()
                          } else {
                            runSingleExample()
                          }
                        }}
                        variant="outline"
                        className="h-12 px-6 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                      >
                        Example
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Result Card */}
              <div ref={resultsRef} className="lg:hidden" id="results">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-100 p-6 mb-6">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                      Critical Points Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center w-full">
                        <div className="space-y-3">
                          {result.type === "single" ? (
                            result.criticalPoints.length > 0 ? (
                              result.criticalPoints.map((point: number, index: number) => (
                                <div key={index} className="text-2xl font-bold text-orange-900">
                                  x = {formatNumber(point)}
                                </div>
                              ))
                            ) : (
                              <p className="text-lg text-gray-600">No critical points found</p>
                            )
                          ) : result.criticalPoints.length > 0 ? (
                            result.criticalPoints.map((point: Point2D, index: number) => (
                              <div key={index} className="text-xl font-bold text-orange-900">
                                {formatPoint(point)}
                              </div>
                            ))
                          ) : (
                            <p className="text-lg text-gray-600">No critical points found</p>
                          )}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={exportToPDF}
                            size="sm"
                            variant="outline"
                            className="border-orange-200 text-orange-700 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                          <Button
                            onClick={() => window.print()}
                            size="sm"
                            variant="outline"
                            className="border-orange-200 text-orange-700"
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Print
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Function className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter function and click <span className="font-semibold text-orange-600">Calculate</span> to
                          find critical points.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Desktop Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-100 h-full flex flex-col justify-center items-center p-8 sticky top-24">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                      Critical Points Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center w-full">
                        <div className="space-y-3">
                          {result.type === "single" ? (
                            result.criticalPoints.length > 0 ? (
                              result.criticalPoints.map((point: number, index: number) => (
                                <div key={index} className="text-2xl font-bold text-orange-900">
                                  x = {formatNumber(point)}
                                </div>
                              ))
                            ) : (
                              <p className="text-lg text-gray-600">No critical points found</p>
                            )
                          ) : result.criticalPoints.length > 0 ? (
                            result.criticalPoints.map((point: Point2D, index: number) => (
                              <div key={index} className="text-xl font-bold text-orange-900">
                                {formatPoint(point)}
                              </div>
                            ))
                          ) : (
                            <p className="text-lg text-gray-600">No critical points found</p>
                          )}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={exportToPDF}
                            size="sm"
                            variant="outline"
                            className="border-orange-200 text-orange-700 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                          <Button
                            onClick={() => window.print()}
                            size="sm"
                            variant="outline"
                            className="border-orange-200 text-orange-700"
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Print
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Function className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter function and click <span className="font-semibold text-orange-600">Calculate</span> to
                          find critical points.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step-by-step breakdown */}
            {showResult && result && (
              <div className="mt-12">
                <Card className="shadow-xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b px-8 py-6">
                    <CardTitle className="text-xl font-bold text-orange-700">Step-by-Step Process</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      {result.type === "single" ? (
                        <div className="text-lg space-y-6">
                          <p className="font-semibold">Calculate the critical point of {result.function}</p>

                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Step I: Find the first derivative of the given function.</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>f(x) = {result.function}</p>
                                <p>f'(x) = {result.derivative}</p>
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">
                                Step II: Set the first derivative equal to zero and solve.
                              </p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>f'(x) = 0</p>
                                <p>{result.derivative} = 0</p>
                                {result.criticalPoints.length > 0 && (
                                  <p>x = {result.criticalPoints.map((p) => formatNumber(p)).join(", ")}</p>
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">
                                Hence, the critical point(s) of the given function: x ={" "}
                                {result.criticalPoints.length > 0
                                  ? result.criticalPoints.map((p) => formatNumber(p)).join(", ")
                                  : "No critical points found"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-lg space-y-6">
                          <p className="font-semibold">Calculate the critical points of {result.function}</p>

                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Step I: Calculate the first partial derivative w.r.t "x"</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>∂f/∂x = {result.partialX}</p>
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">Step II: Calculate the first partial derivative w.r.t "y"</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>∂f/∂y = {result.partialY}</p>
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">Step III: Set both partial derivatives equal to zero</p>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <p>For ∂f/∂x: {result.partialX} = 0</p>
                                <p>For ∂f/∂y: {result.partialY} = 0</p>
                                {result.criticalPoints.length > 0 &&
                                  result.criticalPoints.map((point: Point2D, index: number) => (
                                    <p key={index}>Critical point: {formatPoint(point)}</p>
                                  ))}
                              </div>
                            </div>

                            <div>
                              <p className="font-semibold">
                                Hence, the critical points of the given function are:{" "}
                                {result.criticalPoints.length > 0
                                  ? result.criticalPoints.map((p) => formatPoint(p)).join(", ")
                                  : "No critical points found"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How to Find Critical Points */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    How to Find Critical Points (Step by Step)
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">For Single-Variable Functions f(x):</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>Find the first derivative f'(x)</li>
                        <li>Set f'(x) = 0 and solve for x</li>
                        <li>Find points where f'(x) is undefined</li>
                        <li>List all critical points</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">For Multivariable Functions f(x,y):</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>Find partial derivatives ∂f/∂x and ∂f/∂y</li>
                        <li>Set both partial derivatives equal to zero</li>
                        <li>Solve the system of equations simultaneously</li>
                        <li>Check for points where partials are undefined</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Single Variable Example */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Single Variable Functions Example</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>Example:</strong> Find critical points of f(x) = 3x² + 4x + 9
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2 font-mono text-sm">
                        <p>
                          <strong>Step 1:</strong> f(x) = 3x² + 4x + 9
                        </p>
                        <p>
                          <strong>Step 2:</strong> f'(x) = 6x + 4
                        </p>
                        <p>
                          <strong>Step 3:</strong> Set f'(x) = 0: 6x + 4 = 0
                        </p>
                        <p>
                          <strong>Step 4:</strong> Solve: 6x = -4 → x = -4/6 = -2/3
                        </p>
                        <p>
                          <strong>Step 5:</strong> Critical Point = -2/3 ≈ -0.6667
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700">
                      The function has one critical point at x = -2/3, where the derivative equals zero.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Multivariable Example */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Multivariable Functions Example</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>Example:</strong> Find critical points of f(x,y) = 4x² + 6xy + 8y
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2 font-mono text-sm">
                        <p>
                          <strong>Step 1:</strong> f(x,y) = 4x² + 6xy + 8y
                        </p>
                        <p>
                          <strong>Step 2:</strong> ∂f/∂x = 8x + 6y
                        </p>
                        <p>
                          <strong>Step 3:</strong> ∂f/∂y = 6x + 8
                        </p>
                        <p>
                          <strong>Step 4:</strong> Solve system:
                        </p>
                        <p className="ml-4">8x + 6y = 0</p>
                        <p className="ml-4">6x + 8 = 0</p>
                        <p>
                          <strong>Step 5:</strong> From equation 2: x = -8/6 = -4/3
                        </p>
                        <p>
                          <strong>Step 6:</strong> Substitute: 8(-4/3) + 6y = 0 → y = 16/9
                        </p>
                        <p>
                          <strong>Step 7:</strong> Critical Point = (-4/3, 16/9) ≈ (-1.3333, 1.7778)
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700">
                      The function has one critical point at (-4/3, 16/9) where both partial derivatives equal zero.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">FAQ Section</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">What is a critical point?</h3>
                      <p className="text-gray-700">
                        A critical point is a point in the domain of a function where the derivative is either zero or
                        undefined. These points are candidates for local maxima, minima, or inflection points.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">How do you find critical points?</h3>
                      <p className="text-gray-700">
                        For single-variable functions, find f'(x) and solve f'(x) = 0, plus check where f'(x) is
                        undefined. For multivariable functions, find all partial derivatives, set them equal to zero,
                        and solve the system simultaneously.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Why are critical points important?</h3>
                      <p className="text-gray-700">
                        Critical points help identify local extrema (maxima and minima) of functions, which are
                        essential for optimization problems in calculus, economics, engineering, and many other fields.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What's the difference between critical points and inflection points?
                      </h3>
                      <p className="text-gray-700">
                        Critical points occur where f'(x) = 0 or is undefined, while inflection points occur where
                        f''(x) = 0 and the concavity changes. A point can be both critical and an inflection point.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This tool is for educational use only. Verify results for academic or
                professional work. Complex functions may require advanced techniques not covered by this simplified
                calculator.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
