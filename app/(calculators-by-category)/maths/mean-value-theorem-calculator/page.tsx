"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import SEO from "@/lib/seo"
import { Calculator, FenceIcon, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import Logo from "@/components/logo"

// Mathematical expression evaluator using safer Function constructor
const evaluateFunction = (expression: string, x: number): number => {
  try {
    const safeExpr = expression
      .replace(/x/g, `(${x})`)
      .replace(/\^/g, '**')
      .replace(/([a-z]+)/gi, (m, p1) => {
        const lower = p1.toLowerCase();
        if (lower === 'log') return 'Math.log10';
        if (lower === 'ln') return 'Math.log';
        return `Math.${lower}`;
      })
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E');

  const func = Function(`return ${safeExpr};`);
    const result = func();
    return isFinite(result) ? result : Number.NaN;
  } catch (error) {
    throw new Error(`Invalid function at x = ${x}`);
  }
}

// Numerical differentiation for fallback
const calculateDerivative = (expression: string, x: number, h = 1e-5): number => {
  try {
    const f_x_plus_h = evaluateFunction(expression, x + h);
    const f_x_minus_h = evaluateFunction(expression, x - h);

    if (!isFinite(f_x_plus_h) || !isFinite(f_x_minus_h)) {
      throw new Error("Function not differentiable at this point");
    }

    return (f_x_plus_h - f_x_minus_h) / (2 * h);
  } catch (error) {
    throw new Error("Cannot compute derivative");
  }
}

// Improved symbolic derivative for polynomials and basic functions
const getSymbolicDerivative = (expression: string): string => {
  let expr = expression.trim().replace(/\s+/g, '').replace(/\^/g, '**');

  // Handle basic non-polynomial functions
  const lowerExpr = expr.toLowerCase();
  if (lowerExpr === 'sin(x)') return 'cos(x)';
  if (lowerExpr === 'cos(x)') return '-sin(x)';
  if (lowerExpr === 'tan(x)') return '1/(cos(x)**2)';
  if (lowerExpr === 'exp(x)') return 'exp(x)';
  if (lowerExpr === 'ln(x)') return '1/x';
  if (lowerExpr === 'log(x)') return '1/(x*ln(10))'; // log10
  if (lowerExpr.startsWith('sqrt(x**2+') || lowerExpr.startsWith('sqrt(x**2 +')) {
    const constantMatch = lowerExpr.match(/sqrt\(x\*\*2\s*\+\s*([\d.]+)\)/);
    if (constantMatch) {
      const constant = constantMatch[1];
      return `x/sqrt(x**2+${constant})`;
    }
  }

  // Assume polynomial, parse terms
  if (!expr.startsWith('+') && !expr.startsWith('-')) expr = '+' + expr;

  const termList: string[] = [];
  let current = '';
  for (let i = 0; i < expr.length; i++) {
    if ((expr[i] === '+' || expr[i] === '-') && i > 0 && expr[i - 1] !== '*') {
      termList.push(current);
      current = expr[i];
    } else {
      current += expr[i];
    }
  }
  if (current) termList.push(current);

  const derivTerms: string[] = [];

  for (let term of termList) {
    let sign = term[0];
    let rest = term.slice(1);
    if (sign !== '+' && sign !== '-') {
      rest = term;
      sign = '+';
    }

    if (!rest.includes('x')) continue; // constant term

    let coeff = '1';
    let power = '1';
    if (rest === 'x') {
      // ok
    } else if (rest.includes('**')) {
      const parts = rest.split('**');
      power = parts[1];
      const left = parts[0];
      if (left === 'x') {
        coeff = '1';
      } else if (left.endsWith('*x')) {
        coeff = left.slice(0, -2);
      } else {
        return "f'(x)"; // fallback
      }
    } else if (rest.endsWith('x')) {
      coeff = rest.slice(0, -1) || '1';
    } else {
      return "f'(x)"; // fallback
    }

    let coeffNum = parseFloat(coeff);
    let powerNum = parseFloat(power);
    if (sign === '-') coeffNum = -coeffNum;

    if (powerNum === 0) continue;

    const newCoeff = coeffNum * powerNum;
    const newPower = powerNum - 1;

    let newSign = newCoeff > 0 ? '+' : '-';
    let absCoeff = Math.abs(newCoeff);
    let newCoeffStr = (absCoeff === 1 && newPower !== 0) ? '' : absCoeff.toString();

    let newTerm = newSign + newCoeffStr;
    if (newPower > 0) {
      if (newCoeffStr && newPower !== 0) newTerm += '*';
      newTerm += 'x';
      if (newPower !== 1) newTerm += '**' + newPower;
    }

    derivTerms.push(newTerm);
  }

  let deriv = derivTerms.join('');
  if (deriv.startsWith('+')) deriv = deriv.slice(1);
  if (!deriv) deriv = '0';

  return deriv;
}

// Numerical root finder for f(c) = target
const findRoots = (derivFunc: (x: number) => number, a: number, b: number, target: number): number[] => {
  const f = (x: number) => derivFunc(x) - target;
  const solutions: number[] = [];
  const numIntervals = 50; // Increased for better detection
  const dx = (b - a) / numIntervals;
  let prev = f(a + 1e-6);
  for (let i = 1; i <= numIntervals; i++) {
    const x = a + i * dx;
    const curr = f(x);
    if (curr * prev <= 0) { // Sign change
      let low = x - dx;
      let high = x;
      for (let j = 0; j < 60; j++) { // More iterations for precision
        const mid = (low + high) / 2;
        const val = f(mid);
        if (Math.abs(val) < 1e-8) {
          solutions.push(Number(mid.toFixed(8)));
          break;
        }
        if (val * f(low) <= 0) {
          high = mid;
        } else {
          low = mid;
        }
      }
    }
    prev = curr;
  }

  // Remove duplicates
  return solutions.filter((v, i, arr) => arr.findIndex(t => Math.abs(t - v) < 1e-4) === i).sort();
}

const solveForC = (functionExpr: string, symbolicDerivative: string, targetSlope: number, a: number, b: number): number[] => {
  // Handle constant derivative
  const constVal = parseFloat(symbolicDerivative);
  if (!isNaN(constVal)) {
    if (Math.abs(constVal - targetSlope) < 1e-8) {
      return [Number(((a + b) / 2).toFixed(8))];
    }
    return [];
  }

  let derivFunc: (x: number) => number;
  if (symbolicDerivative.includes("f'")) {
    derivFunc = (x: number) => calculateDerivative(functionExpr, x);
  } else {
    derivFunc = (x: number) => evaluateFunction(symbolicDerivative, x);
  }

  return findRoots(derivFunc, a, b, targetSlope);
}

export default function MeanValueTheoremCalculator() {
  const [functionExpression, setFunctionExpression] = useState("(x**2+4)**(1/2)")
  const [intervalA, setIntervalA] = useState(1)
  const [intervalB, setIntervalB] = useState(3)
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState("")
  const [showSteps, setShowSteps] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const calculateMVT = () => {
    setError("")

    if (intervalB <= intervalA) {
      setError("Upper limit (b) must be greater than lower limit (a).")
      return
    }

    if (!functionExpression.trim()) {
      setError("Please enter a function.")
      return
    }

    try {
      const a = intervalA
      const b = intervalB

      const f_a = evaluateFunction(functionExpression, a)
      const f_b = evaluateFunction(functionExpression, b)

      if (!isFinite(f_a)) {
        setError(`Function is undefined at x = ${a}`)
        return
      }

      if (!isFinite(f_b)) {
        setError(`Function is undefined at x = ${b}`)
        return
      }

      const aroc = (f_b - f_a) / (b - a)

      const symbolicDerivative = getSymbolicDerivative(functionExpression)

      const cValues = solveForC(functionExpression, symbolicDerivative, aroc, a, b)

      setResult({
        functionExpression,
        intervalA: a,
        intervalB: b,
        f_a,
        f_b,
        aroc,
        symbolicDerivative,
        cValues,
        equation: `f'(c) = ${aroc.toFixed(6)}`,
        mvtSatisfied: cValues.length > 0,
      })

      setShowResult(true)
      scrollToRef(resultRef as React.RefObject<HTMLElement>)
    } catch (err: any) {
      setError(`Calculation error: ${err.message}`)
    }
  }

  const runExample = () => {
    setFunctionExpression("x**2")
    setIntervalA(1)
    setIntervalB(3)
    setTimeout(() => calculateMVT(), 100)
  }

  return (
    <>
      <SEO
        title="Mean Value Theorem Calculator – Find MVT Point c"
        description="Free online Mean Value Theorem Calculator. Enter your function and interval to find the point c where f'(c) equals the average rate of change. Step-by-step solutions included."
        keywords="mean value theorem calculator, MVT calculator, calculus calculator, derivative calculator, average rate of change"
        slug="maths/mean-value-theorem-calculator"
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
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Mean Value Theorem Calculator</p>
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
              <Link href="/maths" className="text-gray-500 hover:text-green-600">
                Math Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Mean Value Theorem Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FenceIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mean Value Theorem Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate the point c guaranteed by the Mean Value Theorem (MVT), with step-by-step logic showing where
                the instantaneous rate of change equals the average rate of change.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <FenceIcon className="w-6 h-6 text-green-600" />
                      <span>Mean Value Theorem Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your function and interval to find the point c where f'(c) equals the average rate of change
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
                          placeholder="e.g., x**2, sin(x), x**3 + 2*x"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: +, -, *, /, **, sin, cos, tan, sqrt, log, ln, exp, abs, pi, e
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Interval Start (a)</Label>
                          <Input
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                            type="number"
                            step="any"
                            value={intervalA}
                            onChange={(e) => setIntervalA(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Interval End (b)</Label>
                          <Input
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                            type="number"
                            step="any"
                            value={intervalB}
                            onChange={(e) => setIntervalB(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700">
                          <strong>Mean Value Theorem Formula:</strong>
                          <br />
                          <span className="text-lg font-mono text-center block my-2">{`f'(c) = \frac{f(b) - f(a)}{b - a}`}</span>
                          <span className="text-lg font-mono text-center block my-2">
                            where a &lt; c &lt; b
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button
                        onClick={calculateMVT}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        Calculate MVT Point
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

              {/* Mobile Result Card */}
              <div className="lg:hidden" ref={resultRef}>
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100 p-6 mb-6">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center w-full">
                        <p className="text-lg text-gray-600 mb-2 font-medium">MVT Point(s) c</p>
                        {result.cValues.length > 0 ? (
                          <div className="space-y-2">
                            {result.cValues.map((c: number, index: number) => (
                              <p key={index} className="text-3xl font-extrabold text-green-900 drop-shadow-lg">
                                c = {c}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-lg text-red-600 font-semibold">No solution found in interval</p>
                        )}
                        <div className="text-sm text-gray-600 space-y-1 mt-4">
                          <p>AROC: {result.aroc.toFixed(6)}</p>
                          <p>
                            f({result.intervalA}) = {result.f_a.toFixed(6)}
                          </p>
                          <p>
                            f({result.intervalB}) = {result.f_b.toFixed(6)}
                          </p>
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
                        <FenceIcon className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter function and interval, then click{" "}
                          <span className="font-semibold text-green-600">Calculate</span> to see result.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Desktop Result Card (right side) */}
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
                        <p className="text-lg text-gray-600 mb-2 font-medium">MVT Point(s) c</p>
                        {result.cValues.length > 0 ? (
                          <div className="space-y-2">
                            {result.cValues.map((c: number, index: number) => (
                              <p key={index} className="text-3xl font-extrabold text-green-900 drop-shadow-lg">
                                c = {c}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-lg text-red-600 font-semibold">No solution found in interval</p>
                        )}
                        <div className="text-sm text-gray-600 space-y-1 mt-4">
                          <p>AROC: {result.aroc.toFixed(6)}</p>
                          <p>
                            f({result.intervalA}) = {result.f_a.toFixed(6)}
                          </p>
                          <p>
                            f({result.intervalB}) = {result.f_b.toFixed(6)}
                          </p>
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
                        <FenceIcon className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter function and interval, then click{" "}
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
                          <p>
                            Interval: [{result.intervalA}, {result.intervalB}]
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">2. Compute f(a) and f(b)</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>
                            f({result.intervalA}) = {result.f_a.toFixed(6)}
                          </p>
                          <p>
                            f({result.intervalB}) = {result.f_b.toFixed(6)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">3. Compute Average Rate of Change (AROC)</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>AROC = (f(b) - f(a)) / (b - a)</p>
                          <p>
                            AROC = ({result.f_b.toFixed(6)} - {result.f_a.toFixed(6)}) / ({result.intervalB} - {result.intervalA})
                          </p>
                          <p>AROC = {result.aroc.toFixed(6)}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">4. Find Derivative f'(x)</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>f'(x) = {result.symbolicDerivative}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">5. Solve f'(c) = AROC</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>
                            Equation: {result.symbolicDerivative} = {result.aroc.toFixed(6)}
                          </p>
                          <p className="mt-2">Solving the equation (algebraically or numerically depending on complexity):</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          6. Verify that c lies in the interval (a, b)
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          {result.cValues.length > 0 ? (
                            <div>
                              <p className="mb-2">Solution(s):</p>
                              {result.cValues.map((c: number, index: number) => (
                                <p key={index} className="font-semibold text-green-700">
                                  c = {c} ∈ ({result.intervalA}, {result.intervalB}) ✅
                                </p>
                              ))}
                              <p className="mt-2 text-green-700">
                                <strong>The Mean Value Theorem is satisfied!</strong>
                              </p>
                            </div>
                          ) : (
                            <p className="text-red-600">
                              No solution found in the open interval ({result.intervalA}, {result.intervalB}). The function may not satisfy the MVT conditions (continuity/differentiability) or no such c exists.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* What is the Mean Value Theorem */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">What is the Mean Value Theorem?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Mean Value Theorem (MVT) is a key result in differential calculus. It states that if a function f is continuous on the closed interval [a, b] and differentiable on the open interval (a, b), then there exists at least one point c in (a, b) such that the derivative f'(c) equals the average rate of change over [a, b].
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Geometrically, this means there is at least one point where the tangent to the curve is parallel to the secant line joining (a, f(a)) and (b, f(b)).
                  </p>
                </CardContent>
              </Card>

              {/* Mean Value Theorem Formula */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Mean Value Theorem Formula</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
                    <h4 className="font-semibold mb-4">Mean Value Theorem Formula:</h4>
                    <span className="text-lg font-mono text-center mb-4">{`f'(c) = \frac{f(b) - f(a)}{b - a}`}</span>
                    <p className="text-lg font-mono text-center mb-4">
                      where a &lt; c &lt; b
                    </p>

                    <h4 className="font-semibold mb-4 mt-6">Step-by-Step Logic:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Verify the function is continuous on [a, b] and differentiable on (a, b).</li>
                      <li>{`Compute the average rate of change: \frac{f(b) - f(a)}{b - a}.`}</li>
                      <li>Find the derivative f'(x).</li>
                      <li>{`Solve f'(c) = \frac{f(b) - f(a)}{b - a} for c in (a, b).`}</li>
                    </ol>
                  </div>

                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      <strong>Conditions for MVT:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>f(x) must be continuous on the closed interval [a,b]</li>
                      <li>f(x) must be differentiable on the open interval (a,b)</li>
                      <li>
                        The theorem guarantees at least one such c, but there may be more.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* How to Use This Calculator */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">How to Use This Calculator?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>Enter your function f(x) using standard mathematical notation (e.g., x**2, sin(x), -4*x**3 + 6*x - 2).</li>
                    <li>Specify the interval endpoints a and b (with a &lt; b).</li>
                    <li>Click "Calculate MVT Point" to find the value(s) of c.</li>
                    <li>Review the step-by-step solution showing all calculations.</li>
                    <li>Verify that each c lies in the open interval (a, b).</li>
                  </ol>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Examples</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Example 1: f(x) = x², [1, 3]</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>
                          <strong>Step-by-step solution:</strong>
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>• f(1) = 1, f(3) = 9</p>
                          <p>• AROC = (9-1)/(3-1) = 4</p>
                          <p>• f'(x) = 2x</p>
                          <p>• Solve: 2c = 4 ⇒ c = 2</p>
                          <p>• Verify: 2 ∈ (1,3) ✅</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Example 2: f(x) = x³, [0, 2]</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>
                          <strong>Step-by-step solution:</strong>
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>• f(0) = 0, f(2) = 8</p>
                          <p>• AROC = (8-0)/(2-0) = 4</p>
                          <p>• f'(x) = 3x²</p>
                          <p>• Solve: 3c² = 4 ⇒ c² = 4/3 ⇒ c = ±√(4/3) ≈ ±1.154 (only positive in interval)</p>
                          <p>• Verify: 1.154 ∈ (0,2) ✅</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Example 3: f(x) = -4x³ + 6x - 2, [-4, 2] (Corrected Calculation)</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p>
                          <strong>Step-by-step solution:</strong>
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>• f(-4) = 230, f(2) = -22</p>
                          <p>• AROC = (-22 - 230)/(2 - (-4)) = -252/6 = -42</p>
                          <p>• f'(x) = -12x² + 6</p>
                          <p>• Solve: -12c² + 6 = -42 ⇒ -12c² = -48 ⇒ c² = 4 ⇒ c = ±2</p>
                          <p>• Verify: -2 and 2 ∈ (-4,2)? -2 ✅, 2 ❌ (2 is endpoint, but open interval)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">FAQs</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What is the Mean Value Theorem in simple words?
                      </h3>
                      <p className="text-gray-700">
                        The Mean Value Theorem states that for any smooth curve between two points, there's at least one
                        point where the slope of the tangent line equals the slope of the line connecting the endpoints.
                        It's like saying "somewhere on your journey, your instantaneous speed equaled your average
                        speed."
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">How does this calculator work?</h3>
                      <p className="text-gray-700">
                        The calculator evaluates your function at the endpoints, computes the average rate of change
                        (AROC), finds the derivative (symbolically for simple cases, numerically otherwise), and solves the equation f'(c) = AROC to find the MVT point(s) c in the given interval using numerical root-finding methods.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What are the conditions for applying the Mean Value Theorem?
                      </h3>
                      <p className="text-gray-700">
                        The function must be: (1) continuous on the closed interval [a,b], and (2) differentiable on the
                        open interval (a,b). If these conditions aren't met, the theorem doesn't guarantee the existence
                        of point c.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Can there be more than one value of c?
                      </h3>
                      <p className="text-gray-700">
                        Yes! The Mean Value Theorem guarantees at least one point c, but there can be multiple points
                        where f'(c) equals the average rate of change. For example, higher-degree polynomials may have multiple solutions.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What is the difference between Mean Value Theorem and Mean Value Theorem for Integrals?
                      </h3>
                      <p className="text-gray-700">
                        The standard MVT relates to derivatives and rates of change. The MVT for Integrals (also called the Average Value Theorem) states that there exists c where f(c) equals the average value of f over [a, b], i.e., f(c) = (1/(b-a)) ∫_a^b f(x) dx.
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