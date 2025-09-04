"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { Calculator, RotateCcw, Calendar, Baby, Heart, Clock } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

export default function PregnancyDueDateCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [method, setMethod] = useState("lmp")
  const [lmpDate, setLmpDate] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [ultrasoundDate, setUltrasoundDate] = useState("")
  const [gestationalWeeks, setGestationalWeeks] = useState("")
  const [gestationalDays, setGestationalDays] = useState("0")
  const [conceptionDate, setConceptionDate] = useState("")
  const [transferDate, setTransferDate] = useState("")
  const [embryoAge, setEmbryoAge] = useState("5")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (method === "lmp") {
      if (!lmpDate) {
        newErrors.lmpDate = "Last menstrual period date is required"
      }
      if (!cycleLength || isNaN(Number(cycleLength)) || Number(cycleLength) < 21 || Number(cycleLength) > 35) {
        newErrors.cycleLength = "Cycle length must be between 21-35 days"
      }
    } else if (method === "ultrasound") {
      if (!ultrasoundDate) {
        newErrors.ultrasoundDate = "Ultrasound date is required"
      }
      if (
        !gestationalWeeks ||
        isNaN(Number(gestationalWeeks)) ||
        Number(gestationalWeeks) < 4 ||
        Number(gestationalWeeks) > 42
      ) {
        newErrors.gestationalWeeks = "Gestational weeks must be between 4-42"
      }
      if (isNaN(Number(gestationalDays)) || Number(gestationalDays) < 0 || Number(gestationalDays) > 6) {
        newErrors.gestationalDays = "Gestational days must be between 0-6"
      }
    } else if (method === "conception") {
      if (!conceptionDate) {
        newErrors.conceptionDate = "Conception date is required"
      }
    } else if (method === "ivf") {
      if (!transferDate) {
        newErrors.transferDate = "Transfer date is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateDueDate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return

    try {
      let edd: Date
      let calculationMethod = ""
      let accuracy = ""

      const today = new Date()

      if (method === "lmp") {
        // LMP Method (Naegele's Rule)
        const lmp = new Date(lmpDate)
        const cycle = Number(cycleLength)

        // Standard 280 days, adjusted for cycle length
        const adjustmentDays = cycle - 28
        edd = new Date(lmp.getTime() + (280 + adjustmentDays) * 24 * 60 * 60 * 1000)

        calculationMethod = "Last Menstrual Period (Naegele's Rule)"
        accuracy = "±14 days"
      } else if (method === "ultrasound") {
        // Ultrasound Method
        const scanDate = new Date(ultrasoundDate)
        const weeks = Number(gestationalWeeks)
        const days = Number(gestationalDays)

        const totalDaysAtScan = weeks * 7 + days
        const remainingDays = 280 - totalDaysAtScan

        edd = new Date(scanDate.getTime() + remainingDays * 24 * 60 * 60 * 1000)

        calculationMethod = "Ultrasound Dating"
        accuracy = "±7 days (if early scan)"
      } else if (method === "conception") {
        // Conception Date Method
        const conception = new Date(conceptionDate)
        edd = new Date(conception.getTime() + 266 * 24 * 60 * 60 * 1000)

        calculationMethod = "Conception Date"
        accuracy = "±10 days"
      } else if (method === "ivf") {
        // IVF Transfer Method
        const transfer = new Date(transferDate)
        const embryoDays = Number(embryoAge)

        let daysToAdd: number
        if (embryoDays === 3) {
          daysToAdd = 261
        } else if (embryoDays === 5) {
          daysToAdd = 263
        } else {
          daysToAdd = 264 // 6-day embryo
        }

        edd = new Date(transfer.getTime() + daysToAdd * 24 * 60 * 60 * 1000)

        calculationMethod = `IVF Transfer (Day-${embryoDays} embryo)`
        accuracy = "±5 days"
      }

      // Calculate current gestational age
      let gestationalAgeToday: { weeks: number; days: number }
      let pregnancyProgress: number

      if (method === "lmp") {
        const lmp = new Date(lmpDate)
        const daysSinceLmp = Math.floor((today.getTime() - lmp.getTime()) / (24 * 60 * 60 * 1000))
        const cycle = Number(cycleLength)
        const adjustedDays = daysSinceLmp + (cycle - 28)

        gestationalAgeToday = {
          weeks: Math.floor(adjustedDays / 7),
          days: adjustedDays % 7,
        }
        pregnancyProgress = (adjustedDays / 280) * 100
      } else if (method === "conception") {
        const conception = new Date(conceptionDate)
        const daysSinceConception = Math.floor((today.getTime() - conception.getTime()) / (24 * 60 * 60 * 1000))
        const gestationalDays = daysSinceConception + 14 // Add 2 weeks to convert from conception age

        gestationalAgeToday = {
          weeks: Math.floor(gestationalDays / 7),
          days: gestationalDays % 7,
        }
        pregnancyProgress = (gestationalDays / 280) * 100
      } else {
        // For ultrasound and IVF, calculate from EDD
        const daysUntilEdd = Math.floor((edd!.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
        const currentGestationalDays = 280 - daysUntilEdd

        gestationalAgeToday = {
          weeks: Math.floor(currentGestationalDays / 7),
          days: currentGestationalDays % 7,
        }
        pregnancyProgress = (currentGestationalDays / 280) * 100
      }

      // Ensure progress doesn't exceed 100%
      pregnancyProgress = Math.min(pregnancyProgress, 100)

      setResult({
        edd: edd!,
        gestationalAge: gestationalAgeToday,
        pregnancyProgress: Math.max(0, pregnancyProgress),
        method: calculationMethod,
        accuracy: accuracy,
        inputs: {
          method,
          lmpDate,
          cycleLength,
          ultrasoundDate,
          gestationalWeeks,
          gestationalDays,
          conceptionDate,
          transferDate,
          embryoAge,
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating due date. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setMethod("lmp")
    setLmpDate("")
    setCycleLength("28")
    setUltrasoundDate("")
    setGestationalWeeks("")
    setGestationalDays("0")
    setConceptionDate("")
    setTransferDate("")
    setEmbryoAge("5")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
<SEO
  title="Due Date Calculator – Estimate Your Baby’s Arrival"
  description="Find your estimated due date in seconds. Use our free pregnancy due date calculator to plan ahead for your baby’s arrival."
  keywords="due date calculator, pregnancy calculator, baby due date estimator"
  slug="/health/due-date-calculator"
/>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Pregnancy Due Date Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-purple-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-purple-600">
                Health & Pregnancy
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Pregnancy Due Date Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pregnancy Due Date Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your Expected Date of Delivery (EDD) using LMP, ultrasound, conception date, or IVF transfer
                date with medically accurate formulas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>Due Date Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Select your preferred method and enter the required information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    {/* Method Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Calculation Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lmp">Last Menstrual Period (LMP)</SelectItem>
                            <SelectItem value="ultrasound">Ultrasound Dating</SelectItem>
                            <SelectItem value="conception">Conception Date</SelectItem>
                            <SelectItem value="ivf">IVF Transfer Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Dynamic Input Fields */}
                    <div className="space-y-6 mb-8">
                      {method === "lmp" && (
                        <>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                              First Day of Last Menstrual Period
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input
                                className={`h-12 pl-10 ${errors.lmpDate ? "border-red-300" : ""}`}
                                type="date"
                                value={lmpDate}
                                onChange={(e) => setLmpDate(e.target.value)}
                              />
                            </div>
                            {errors.lmpDate && <p className="text-red-600 text-xs mt-1">{errors.lmpDate}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                              Average Cycle Length (days)
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Clock className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input
                                className={`h-12 pl-10 ${errors.cycleLength ? "border-red-300" : ""}`}
                                type="text"
                                placeholder="28"
                                value={cycleLength}
                                onChange={(e) => setCycleLength(e.target.value)}
                              />
                            </div>
                            {errors.cycleLength && <p className="text-red-600 text-xs mt-1">{errors.cycleLength}</p>}
                            <p className="text-xs text-gray-500 mt-1">Typical range: 21-35 days</p>
                          </div>
                        </>
                      )}

                      {method === "ultrasound" && (
                        <>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                              Date of Ultrasound Scan
                            </Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input
                                className={`h-12 pl-10 ${errors.ultrasoundDate ? "border-red-300" : ""}`}
                                type="date"
                                value={ultrasoundDate}
                                onChange={(e) => setUltrasoundDate(e.target.value)}
                              />
                            </div>
                            {errors.ultrasoundDate && (
                              <p className="text-red-600 text-xs mt-1">{errors.ultrasoundDate}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Gestational Age (weeks)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Baby className="h-5 w-5 text-purple-500" />
                                </div>
                                <Input
                                  className={`h-12 pl-10 ${errors.gestationalWeeks ? "border-red-300" : ""}`}
                                  type="text"
                                  placeholder="12"
                                  value={gestationalWeeks}
                                  onChange={(e) => setGestationalWeeks(e.target.value)}
                                />
                              </div>
                              {errors.gestationalWeeks && (
                                <p className="text-red-600 text-xs mt-1">{errors.gestationalWeeks}</p>
                              )}
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">Additional Days</Label>
                              <div className="relative">
                                <Input
                                  className={`h-12 ${errors.gestationalDays ? "border-red-300" : ""}`}
                                  type="text"
                                  placeholder="0"
                                  value={gestationalDays}
                                  onChange={(e) => setGestationalDays(e.target.value)}
                                />
                              </div>
                              {errors.gestationalDays && (
                                <p className="text-red-600 text-xs mt-1">{errors.gestationalDays}</p>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {method === "conception" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Approximate Conception Date
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-purple-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.conceptionDate ? "border-red-300" : ""}`}
                              type="date"
                              value={conceptionDate}
                              onChange={(e) => setConceptionDate(e.target.value)}
                            />
                          </div>
                          {errors.conceptionDate && (
                            <p className="text-red-600 text-xs mt-1">{errors.conceptionDate}</p>
                          )}
                        </div>
                      )}

                      {method === "ivf" && (
                        <>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Embryo Transfer Date</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input
                                className={`h-12 pl-10 ${errors.transferDate ? "border-red-300" : ""}`}
                                type="date"
                                value={transferDate}
                                onChange={(e) => setTransferDate(e.target.value)}
                              />
                            </div>
                            {errors.transferDate && <p className="text-red-600 text-xs mt-1">{errors.transferDate}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                              Embryo Age at Transfer
                            </Label>
                            <Select value={embryoAge} onValueChange={setEmbryoAge}>
                              <SelectTrigger className="h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3-day embryo</SelectItem>
                                <SelectItem value="5">5-day embryo (blastocyst)</SelectItem>
                                <SelectItem value="6">6-day embryo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateDueDate}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800"
                      >
                        Calculate Due Date
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mb-3 shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">Due Date</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <p className="text-lg font-bold text-purple-900">{formatDate(result.edd)}</p>
                          <p className="text-gray-600 text-sm">Expected Due Date</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <p className="text-lg font-bold text-purple-900">
                            {result.gestationalAge.weeks}w {result.gestationalAge.days}d
                          </p>
                          <p className="text-gray-600 text-sm">Current Age</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Calendar className="w-8 h-8 text-purple-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Select a method and enter your information to calculate your due date.
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
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <span>Your Pregnancy Timeline</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Main Results */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">Estimated Due Date</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-700 mb-2">{formatDate(result.edd)}</p>
                          <p className="text-lg text-gray-600">Expected Due Date</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-700 mb-2">
                            {result.gestationalAge.weeks}w {result.gestationalAge.days}d
                          </p>
                          <p className="text-lg text-gray-600">Current Gestational Age</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-700 mb-2">
                            {result.pregnancyProgress.toFixed(1)}%
                          </p>
                          <p className="text-lg text-gray-600">Pregnancy Progress</p>
                        </div>
                      </div>
                    </div>

                    {/* Method Information */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">Calculation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-700 mb-3">Method Used</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{result.method}</strong>
                            </p>
                            <p className="text-xs text-gray-600">Accuracy: {result.accuracy}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                          <h4 className="font-semibold text-violet-700 mb-3">Important Note</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>Only ~4% of babies arrive on the exact due date</p>
                            <p className="text-xs text-gray-600">Most births occur within ±10 days of EDD</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">Pregnancy Progress</h3>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-violet-600 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(result.pregnancyProgress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Conception</span>
                        <span>{result.pregnancyProgress.toFixed(1)}% Complete</span>
                        <span>Due Date</span>
                      </div>
                    </div>

                    {/* Method Comparison Table */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-purple-700 mb-6">Due Date Calculation Methods</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-purple-200 rounded-lg">
                          <thead>
                            <tr className="bg-gradient-to-r from-purple-50 to-violet-50">
                              <th className="border border-purple-200 p-3 text-left font-semibold text-purple-700">
                                Method
                              </th>
                              <th className="border border-purple-200 p-3 text-center font-semibold text-purple-700">
                                Formula
                              </th>
                              <th className="border border-purple-200 p-3 text-center font-semibold text-purple-700">
                                Accuracy
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={result.method.includes("Last Menstrual") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">LMP (Naegele's Rule)</td>
                              <td className="border border-purple-200 p-3 text-center">LMP + 280 days</td>
                              <td className="border border-purple-200 p-3 text-center">±14 days</td>
                            </tr>
                            <tr className={result.method.includes("Conception") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">Conception Date</td>
                              <td className="border border-purple-200 p-3 text-center">Conception + 266 days</td>
                              <td className="border border-purple-200 p-3 text-center">±10 days</td>
                            </tr>
                            <tr className={result.method.includes("Ultrasound") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">Ultrasound Dating</td>
                              <td className="border border-purple-200 p-3 text-center">
                                Scan date + (280 - GA at scan)
                              </td>
                              <td className="border border-purple-200 p-3 text-center">±7 days (early scan)</td>
                            </tr>
                            <tr className={result.method.includes("IVF") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">IVF Transfer</td>
                              <td className="border border-purple-200 p-3 text-center">Transfer + 261-264 days</td>
                              <td className="border border-purple-200 p-3 text-center">±5 days</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">
                    Understanding Due Date Calculations
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Method Accuracy</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>IVF Transfer:</strong> Most accurate (±5 days)
                          </li>
                          <li>
                            <strong>Early Ultrasound:</strong> Very accurate (±7 days)
                          </li>
                          <li>
                            <strong>Conception Date:</strong> Good accuracy (±10 days)
                          </li>
                          <li>
                            <strong>LMP Method:</strong> Standard method (±14 days)
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Example Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-700 mb-2">
                          <strong>LMP: January 1, 2025 (28-day cycle)</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Formula: LMP + 280 days</p>
                          <p>
                            Due Date: <strong>October 8, 2025</strong>
                          </p>
                          <p>
                            Current (Feb 1): <strong>4w 3d pregnant</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Important Facts</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Only 4% of babies arrive on exact due date</li>
                          <li>37-42 weeks is considered full-term</li>
                          <li>First babies often arrive 1-2 days late</li>
                          <li>Cycle length affects LMP calculations</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">When to Use Each Method</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>LMP:</strong> Regular cycles, known LMP date
                          </li>
                          <li>
                            <strong>Ultrasound:</strong> Irregular cycles, uncertain LMP
                          </li>
                          <li>
                            <strong>Conception:</strong> Known ovulation/conception date
                          </li>
                          <li>
                            <strong>IVF:</strong> Assisted reproductive technology
                          </li>
                        </ul>
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
