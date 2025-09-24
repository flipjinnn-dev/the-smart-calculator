"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { DollarSign, Calculator, RotateCcw, TrendingUp, PiggyBank, Target } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import CalculatorGuide from "@/components/calculator-guide"
import financeData from "@/app/content/finance-calculator.json"

export default function TVMCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [calculateFor, setCalculateFor] = useState("fv") // What to calculate: pv, fv, pmt, iy, n

  // Main TVM inputs
  const [pv, setPv] = useState("")
  const [fv, setFv] = useState("")
  const [pmt, setPmt] = useState("")
  const [iy, setIy] = useState("")
  const [n, setN] = useState("")

  // Settings
  const [py, setPy] = useState("12") // Payments per year
  const [cy, setCy] = useState("12") // Compounds per year
  const [paymentTiming, setPaymentTiming] = useState("end") // beginning or end

  // Helper function for iterative solving (Newton-Raphson method)
  const solveForRate = (
    pv: number,
    fv: number,
    pmt: number,
    n: number,
    py: number,
    cy: number,
    delta: number,
  ): number => {
    let rate = 0.1 // Initial guess
    const tolerance = 1e-10
    const maxIterations = 100

    for (let i = 0; i < maxIterations; i++) {
      const r = rate / cy
      const compoundFactor = Math.pow(1 + r, n)

      // TVM equation
      const f = pv * compoundFactor + pmt * ((compoundFactor - 1) / r) * (1 + r * delta) - fv

      // Derivative for Newton-Raphson
      const df =
        (pv * n * Math.pow(1 + r, n - 1)) / cy +
        pmt *
          ((((n * Math.pow(1 + r, n - 1)) / cy) * r - (compoundFactor - 1) / (r * r)) * (1 + r * delta) +
            (((compoundFactor - 1) / r) * delta) / cy)

      const newRate = rate - f / df

      if (Math.abs(newRate - rate) < tolerance) {
        return newRate * 100 // Convert to percentage
      }

      rate = newRate
    }

    return rate * 100 // Return as percentage
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}
    const filledCount = 0

    const requiredInputs = ["pv", "fv", "pmt", "iy", "n"].filter((input) => input !== calculateFor)

    requiredInputs.forEach((input) => {
      const value = input === "pv" ? pv : input === "fv" ? fv : input === "pmt" ? pmt : input === "iy" ? iy : n
      if (value === "" || value === null || value === undefined) {
        newErrors[input] = `${input.toUpperCase()} is required when calculating ${calculateFor.toUpperCase()}`
      } else if (isNaN(Number(value))) {
        newErrors[input] = `${input.toUpperCase()} must be a valid number`
      } else if (input === "iy" && Number(value) < 0) {
        newErrors[input] = "Interest rate must be positive"
      } else if (input === "n" && Number(value) <= 0) {
        newErrors[input] = "Number of periods must be positive"
      }
    })

    // Validate settings
    if (isNaN(Number(py)) || Number(py) <= 0) {
      newErrors.py = "Payments per year must be positive"
    }
    if (isNaN(Number(cy)) || Number(cy) <= 0) {
      newErrors.cy = "Compounds per year must be positive"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateTVM = () => {
    if (!validateInputs()) return

    try {
      const pvVal = calculateFor !== "pv" ? Number(pv) : null
      const fvVal = calculateFor !== "fv" ? Number(fv) : null
      const pmtVal = calculateFor !== "pmt" ? Number(pmt) : null
      const iyVal = calculateFor !== "iy" ? Number(iy) : null
      const nVal = calculateFor !== "n" ? Number(n) : null
      const pyVal = Number(py)
      const cyVal = Number(cy)
      const delta = paymentTiming === "beginning" ? 1 : 0

      let calculatedValue: number
      let calculatedVariable: string

      // Calculate based on selected variable
      if (calculateFor === "pv") {
        calculatedVariable = "PV"
        const r = iyVal! / cyVal
        const compoundFactor = Math.pow(1 + r, nVal!)
        const annuityFactor = ((compoundFactor - 1) / r) * (1 + r * delta)
        calculatedValue = (fvVal! - pmtVal! * annuityFactor) / compoundFactor
      } else if (calculateFor === "fv") {
        calculatedVariable = "FV"
        const r = iyVal! / cyVal
        const compoundFactor = Math.pow(1 + r, nVal!)
        const annuityFactor = ((compoundFactor - 1) / r) * (1 + r * delta)
        calculatedValue = pvVal! * compoundFactor + pmtVal! * annuityFactor
      } else if (calculateFor === "pmt") {
        calculatedVariable = "PMT"
        const r = iyVal! / cyVal
        const compoundFactor = Math.pow(1 + r, nVal!)
        const annuityFactor = ((compoundFactor - 1) / r) * (1 + r * delta)
        calculatedValue = (fvVal! - pvVal! * compoundFactor) / annuityFactor
      } else if (calculateFor === "iy") {
        calculatedVariable = "I/Y"
        calculatedValue = solveForRate(pvVal!, fvVal!, pmtVal!, nVal!, pyVal, cyVal, delta)
      } else if (calculateFor === "n") {
        calculatedVariable = "N"
        const r = iyVal! / cyVal
        const adjustedPmt = pmtVal! * (1 + r * delta)
        if (Math.abs(adjustedPmt + pvVal! * r) < 1e-10) {
          throw new Error("Cannot solve for N with these values")
        }
        calculatedValue = Math.log((fvVal! * r + adjustedPmt) / (pvVal! * r + adjustedPmt)) / Math.log(1 + r)
      } else {
        throw new Error("Invalid calculation type")
      }

      // Calculate additional metrics
      const finalPv = pvVal || calculatedValue
      const finalFv = fvVal || calculatedValue
      const finalPmt = pmtVal || calculatedValue
      const finalN = nVal || calculatedValue

      const totalPayments = finalPmt * finalN
      const totalInterest = finalFv - finalPv - totalPayments

      setResult({
        calculatedVariable,
        calculatedValue,
        inputs: {
          pv: pvVal,
          fv: fvVal,
          pmt: pmtVal,
          iy: iyVal,
          n: nVal,
          py: pyVal,
          cy: cyVal,
          paymentTiming,
        },
        results: {
          totalPayments,
          totalInterest,
          finalPv,
          finalFv,
          finalPmt: finalPmt,
          finalN,
          finalIy: iyVal || calculatedValue,
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating TVM. Please check your inputs and try again." })
    }
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  const resetCalculator = () => {
    setPv("")
    setFv("")
    setPmt("")
    setIy("")
    setN("")
    setPy("12")
    setCy("12")
    setPaymentTiming("end")
    setCalculateFor("fv")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
<SEO
  title="Free Finance Calculator – Smart Money Planning"
  description="Simplify financial decisions with our finance calculator. Estimate payments, plan budgets, and manage investments with quick, accurate results."
  keywords="finance calculator, budget calculator, investment calculator, money planning"
  slug="/financial/finance-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Time Value of Money Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-emerald-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/financial" className="text-gray-500 hover:text-emerald-600">
                Financial Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Time Value of Money Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Time Value of Money Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Professional TVM calculator that solves for PV, FV, PMT, I/Y, or N. Select what you want to calculate
                and enter the other 4 values.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-emerald-600" />
                      <span>TVM Variables</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter 4 values to solve for {calculateFor.toUpperCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="mb-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-center space-x-6">
                        <div className="flex items-center space-x-3">
                          <Calculator className="w-5 h-5 text-emerald-600" />
                          <span className="text-lg font-semibold text-gray-700">What do you want to calculate?</span>
                        </div>
                        <Select value={calculateFor} onValueChange={setCalculateFor}>
                          <SelectTrigger className="w-48 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pv">Present Value (PV)</SelectItem>
                            <SelectItem value="fv">Future Value (FV)</SelectItem>
                            <SelectItem value="pmt">Payment (PMT)</SelectItem>
                            <SelectItem value="iy">Interest Rate (I/Y)</SelectItem>
                            <SelectItem value="n">Number of Periods (N)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-3">
                        Select the variable you want to solve for, then enter the other 4 values
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* PV Input - hide if calculating PV */}
                      {calculateFor !== "pv" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Present Value (PV)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.pv ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="20000"
                              value={pv}
                              onChange={(e) => setPv(e.target.value)}
                            />
                          </div>
                          {errors.pv && <p className="text-red-600 text-xs mt-1">{errors.pv}</p>}
                          <p className="text-xs text-gray-500 mt-1">Lump sum at start (negative for outflow)</p>
                        </div>
                      )}

                      {/* FV Input - hide if calculating FV */}
                      {calculateFor !== "fv" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Future Value (FV)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <TrendingUp className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.fv ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="100000"
                              value={fv}
                              onChange={(e) => setFv(e.target.value)}
                            />
                          </div>
                          {errors.fv && <p className="text-red-600 text-xs mt-1">{errors.fv}</p>}
                          <p className="text-xs text-gray-500 mt-1">Lump sum at end</p>
                        </div>
                      )}

                      {/* PMT Input - hide if calculating PMT */}
                      {calculateFor !== "pmt" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Payment (PMT)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <PiggyBank className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.pmt ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="-2000"
                              value={pmt}
                              onChange={(e) => setPmt(e.target.value)}
                            />
                          </div>
                          {errors.pmt && <p className="text-red-600 text-xs mt-1">{errors.pmt}</p>}
                          <p className="text-xs text-gray-500 mt-1">Recurring payment (negative for withdrawal)</p>
                        </div>
                      )}

                      {/* I/Y Input - hide if calculating I/Y */}
                      {calculateFor !== "iy" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Interest Rate (I/Y)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Target className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.iy ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="6"
                              value={iy}
                              onChange={(e) => setIy(e.target.value)}
                            />
                          </div>
                          {errors.iy && <p className="text-red-600 text-xs mt-1">{errors.iy}</p>}
                          <p className="text-xs text-gray-500 mt-1">Annual interest rate (%)</p>
                        </div>
                      )}

                      {/* N Input - hide if calculating N */}
                      {calculateFor !== "n" && (
                        <div className={calculateFor === "pv" || calculateFor === "fv" ? "md:col-span-2" : ""}>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Number of Periods (N)</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calculator className="h-5 w-5 text-emerald-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.n ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="10"
                              value={n}
                              onChange={(e) => setN(e.target.value)}
                            />
                          </div>
                          {errors.n && <p className="text-red-600 text-xs mt-1">{errors.n}</p>}
                          <p className="text-xs text-gray-500 mt-1">Total compounding periods</p>
                        </div>
                      )}
                    </div>

                    {/* Settings */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Payments per Year (P/Y)
                          </Label>
                          <Select value={py} onValueChange={setPy}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 (Annual)</SelectItem>
                              <SelectItem value="2">2 (Semi-annual)</SelectItem>
                              <SelectItem value="4">4 (Quarterly)</SelectItem>
                              <SelectItem value="12">12 (Monthly)</SelectItem>
                              <SelectItem value="52">52 (Weekly)</SelectItem>
                              <SelectItem value="365">365 (Daily)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Compounds per Year (C/Y)
                          </Label>
                          <Select value={cy} onValueChange={setCy}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 (Annual)</SelectItem>
                              <SelectItem value="2">2 (Semi-annual)</SelectItem>
                              <SelectItem value="4">4 (Quarterly)</SelectItem>
                              <SelectItem value="12">12 (Monthly)</SelectItem>
                              <SelectItem value="52">52 (Weekly)</SelectItem>
                              <SelectItem value="365">365 (Daily)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Payment Timing</Label>
                          <div className="flex items-center space-x-4 h-12">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={paymentTiming === "beginning"}
                                onCheckedChange={(checked) => setPaymentTiming(checked ? "beginning" : "end")}
                              />
                              <span className="text-sm text-gray-700">
                                {paymentTiming === "beginning" ? "Beginning" : "End"} of Period
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateTVM}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800"
                      >
                        Calculate {calculateFor.toUpperCase()}
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-50 to-green-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 flex items-center justify-center mb-3 shadow-lg">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-emerald-700 tracking-tight">TVM Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-lg font-bold text-emerald-900">
                            {result.calculatedVariable === "I/Y" ? "" : "$"}
                            {Math.abs(result.calculatedValue).toLocaleString(undefined, {
                              minimumFractionDigits: result.calculatedVariable === "I/Y" ? 4 : 2,
                              maximumFractionDigits: result.calculatedVariable === "I/Y" ? 4 : 2,
                            })}
                            {result.calculatedVariable === "I/Y" ? "%" : ""}
                          </p>
                          <p className="text-gray-600 text-sm">{result.calculatedVariable}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-lg font-bold text-emerald-900">
                            $
                            {Math.abs(result.results.totalPayments).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p className="text-gray-600 text-sm">Total Payments</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-emerald-200">
                          <p className="text-lg font-bold text-emerald-900">
                            $
                            {result.results.totalInterest.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p className="text-gray-600 text-sm">Total Interest</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <DollarSign className="w-8 h-8 text-emerald-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Select what to calculate, enter 4 values, then click Calculate to solve for the 5th.
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
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-emerald-600" />
                      <span>TVM Calculation Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Summary Results */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-3">Calculated Variable</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{result.calculatedVariable}:</strong>{" "}
                            {result.calculatedVariable === "I/Y" ? "" : "$"}
                            {Math.abs(result.calculatedValue).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: result.calculatedVariable === "I/Y" ? 4 : 2,
                            })}
                            {result.calculatedVariable === "I/Y" ? "%" : ""}
                            {result.calculatedVariable === "N" ? " periods" : ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(result.calculatedVariable === "PV" && "Present value of investment") ||
                              (result.calculatedVariable === "FV" && "Future value of investment") ||
                              (result.calculatedVariable === "PMT" && "Required payment amount") ||
                              (result.calculatedVariable === "I/Y" && "Annual interest rate") ||
                              (result.calculatedVariable === "N" && "Number of compounding periods")}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">Payment Summary</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Total Payments:</strong> $
                            {Math.abs(result.results.totalPayments).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p>
                            <strong>Payment Frequency:</strong> {result.inputs.py}x per year
                          </p>
                          <p>
                            <strong>Payment Timing:</strong>{" "}
                            {result.inputs.paymentTiming === "beginning" ? "Beginning" : "End"} of period
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-3">Interest Summary</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Total Interest:</strong> $
                            {result.results.totalInterest.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p>
                            <strong>Compound Frequency:</strong> {result.inputs.cy}x per year
                          </p>
                          <p className="text-xs text-gray-500">
                            {result.results.totalInterest >= 0 ? "Interest earned" : "Interest paid"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* All Variables Summary */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-emerald-700 mb-6">Complete TVM Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-700 mb-3">Final Values</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>PV (Present Value):</strong> $
                              {result.results.finalPv?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) || "N/A"}
                            </p>
                            <p>
                              <strong>FV (Future Value):</strong> $
                              {result.results.finalFv?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) || "N/A"}
                            </p>
                            <p>
                              <strong>PMT (Payment):</strong> $
                              {result.results.finalPmt?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) || "N/A"}
                            </p>
                            <p>
                              <strong>I/Y (Interest Rate):</strong> {result.results.finalIy?.toFixed(4) || "N/A"}%
                            </p>
                            <p>
                              <strong>N (Periods):</strong> {result.results.finalN?.toFixed(2) || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <h4 className="font-semibold text-emerald-700 mb-3">Settings Used</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Payments per Year:</strong> {result.inputs.py}
                            </p>
                            <p>
                              <strong>Compounds per Year:</strong> {result.inputs.cy}
                            </p>
                            <p>
                              <strong>Payment Timing:</strong>{" "}
                              {result.inputs.paymentTiming === "beginning" ? "Beginning" : "End"} of period
                            </p>
                            <p>
                              <strong>Effective Rate per Period:</strong>{" "}
                              {((result.results.finalIy || 0) / result.inputs.cy).toFixed(6)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TVM Formula */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                      <h4 className="font-semibold text-emerald-700 mb-2">TVM Formula Used:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p className="font-mono text-xs bg-white p-2 rounded border">
                          PV × (1 + I/Y/C/Y)^N + PMT × [((1 + I/Y/C/Y)^N - 1) / (I/Y/C/Y)] × (1 + I/Y/C/Y × δ) = FV
                        </p>
                        <p className="text-xs">
                          Where δ = {result.inputs.paymentTiming === "beginning" ? "1" : "0"} (
                          {result.inputs.paymentTiming} of period payments)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-50 to-green-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 flex items-center justify-center mr-3 shadow-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-emerald-700 tracking-tight">
                    Understanding Time Value of Money
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">TVM Variables</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>PV (Present Value):</strong> Current worth of future cash flows
                          </li>
                          <li>
                            <strong>FV (Future Value):</strong> Value of investment at end of period
                          </li>
                          <li>
                            <strong>PMT (Payment):</strong> Regular payment amount (annuity)
                          </li>
                          <li>
                            <strong>I/Y (Interest Rate):</strong> Annual interest rate as percentage
                          </li>
                          <li>
                            <strong>N (Periods):</strong> Total number of compounding periods
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">Key Concepts</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Compounding:</strong> Interest earned on interest
                          </li>
                          <li>
                            <strong>Regular Contributions:</strong> Consistent periodic payments
                          </li>
                          <li>
                            <strong>Time Horizon:</strong> Length of investment period
                          </li>
                          <li>
                            <strong>Risk vs Return:</strong> Higher returns often mean higher risk
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">Example Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Scenario: Retirement Savings</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>PV = $20,000 (initial investment)</p>
                          <p>PMT = -$2,000 (annual contribution)</p>
                          <p>I/Y = 6% (annual return)</p>
                          <p>N = 10 years</p>
                          <p>P/Y = C/Y = 1 (annual)</p>
                          <p>
                            <strong>Result: FV ≈ $62,317</strong>
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">Sign Conventions</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Positive:</strong> Money received (inflows)
                          </li>
                          <li>
                            <strong>Negative:</strong> Money paid out (outflows)
                          </li>
                          <li>
                            <strong>PV:</strong> Negative if you invest money
                          </li>
                          <li>
                            <strong>PMT:</strong> Negative if you make payments
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-8">
            <CalculatorGuide data={financeData} />
          </div>
          
        </main>
      </div>
    </>
  )
}
