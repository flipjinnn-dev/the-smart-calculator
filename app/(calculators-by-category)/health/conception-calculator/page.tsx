"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Baby, Calendar } from "lucide-react"
import Logo from "@/components/logo"

export default function ConceptionCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [cycleLength, setCycleLength] = useState("")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!lastPeriodDate) {
      newErrors.lastPeriodDate = "Please select the first day of your last period"
    } else {
      const selectedDate = new Date(lastPeriodDate)
      const today = new Date()
      const maxDate = new Date()
      maxDate.setDate(today.getDate() + 30) // Allow up to 30 days in future

      if (selectedDate > maxDate) {
        newErrors.lastPeriodDate = "Date cannot be more than 30 days in the future"
      }
    }

    if (!cycleLength) {
      newErrors.cycleLength = "Please select your average cycle length"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateConception = () => {
    if (!validateInputs()) return

    try {
      const lmpDate = new Date(lastPeriodDate)
      const cycleLengthNum = Number.parseInt(cycleLength)

      // Core calculations
      const ovulationDay = cycleLengthNum - 14
      const ovulationDate = new Date(lmpDate)
      ovulationDate.setDate(lmpDate.getDate() + ovulationDay - 1)

      // Fertile Window (Ovulation - 5 days to Ovulation)
      const fertileWindowStart = new Date(ovulationDate)
      fertileWindowStart.setDate(ovulationDate.getDate() - 5)
      const fertileWindowEnd = new Date(ovulationDate)

      // Peak Fertile Window (Ovulation - 2 days to Ovulation, 3 days total)
      const peakFertileWindowStart = new Date(ovulationDate)
      peakFertileWindowStart.setDate(ovulationDate.getDate() - 2)
      const peakFertileWindowEnd = new Date(ovulationDate)

      // Possible Conception Dates (any date in fertile window)
      const possibleConceptionDates = []
      for (let i = 0; i <= 5; i++) {
        const conceptionDate = new Date(fertileWindowStart)
        conceptionDate.setDate(fertileWindowStart.getDate() + i)

        // Due date for each conception date (Conception + 266 days)
        const dueDate = new Date(conceptionDate)
        dueDate.setDate(conceptionDate.getDate() + 266)

        possibleConceptionDates.push({
          date: conceptionDate,
          dueDate: dueDate,
          isPeak: conceptionDate >= peakFertileWindowStart && conceptionDate <= peakFertileWindowEnd,
          isOvulation: conceptionDate.getTime() === ovulationDate.getTime(),
        })
      }

      // Calculate next 6 cycles
      const futureCycles = []
      for (let i = 1; i <= 6; i++) {
        const cycleStartDate = new Date(lmpDate)
        cycleStartDate.setDate(lmpDate.getDate() + cycleLengthNum * i)

        const cycleOvulationDate = new Date(cycleStartDate)
        cycleOvulationDate.setDate(cycleStartDate.getDate() + ovulationDay - 1)

        const cycleFertileWindowStart = new Date(cycleOvulationDate)
        cycleFertileWindowStart.setDate(cycleOvulationDate.getDate() - 5)

        const cyclePeakFertileWindowStart = new Date(cycleOvulationDate)
        cyclePeakFertileWindowStart.setDate(cycleOvulationDate.getDate() - 2)

        // Possible conception dates for this cycle
        const cyclePossibleConceptionDates = []
        for (let j = 0; j <= 5; j++) {
          const conceptionDate = new Date(cycleFertileWindowStart)
          conceptionDate.setDate(cycleFertileWindowStart.getDate() + j)

          const dueDate = new Date(conceptionDate)
          dueDate.setDate(conceptionDate.getDate() + 266)

          cyclePossibleConceptionDates.push({
            date: conceptionDate,
            dueDate: dueDate,
          })
        }

        futureCycles.push({
          cycleNumber: i + 1,
          ovulationDate: cycleOvulationDate,
          fertileWindow: `${formatDate(cycleFertileWindowStart)} - ${formatDate(cycleOvulationDate)}`,
          peakFertileWindow: `${formatDate(cyclePeakFertileWindowStart)} - ${formatDate(cycleOvulationDate)}`,
          possibleConceptionDates: cyclePossibleConceptionDates,
          estimatedDueDates: `${formatDate(cyclePossibleConceptionDates[0].dueDate)} - ${formatDate(cyclePossibleConceptionDates[cyclePossibleConceptionDates.length - 1].dueDate)}`,
        })
      }

      const results = {
        lmpDate,
        cycleLength: cycleLengthNum,
        ovulationDate,
        fertileWindow: `${formatDate(fertileWindowStart)} - ${formatDate(fertileWindowEnd)}`,
        peakFertileWindow: `${formatDate(peakFertileWindowStart)} - ${formatDate(peakFertileWindowEnd)}`,
        possibleConceptionDates,
        futureCycles,
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating conception dates. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setLastPeriodDate("")
    setCycleLength("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  // Generate cycle length options (22-44 days)
  const cycleLengthOptions = []
  for (let i = 22; i <= 44; i++) {
    cycleLengthOptions.push(i)
  }

  return (
    <>
      <Head>
        <title>Conception Calculator – Estimate Fertile Window</title>
        <meta
          name="description"
          content="Find your best conception days with our calculator. Track ovulation and fertile periods to boost chances of pregnancy."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
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
                  <p className="text-sm text-gray-500">Conception Calculator</p>
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
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Conception Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Baby className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Conception Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your most fertile days, conception dates, and estimated due dates. Plan your pregnancy with
                accurate fertility predictions and conception timing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>Conception Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your menstrual cycle details to calculate conception dates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Last Period Date */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          First Day of Your Last Menstrual Period (LMP) *
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.lastPeriodDate ? "border-red-300" : ""}`}
                            type="date"
                            value={lastPeriodDate}
                            onChange={(e) => setLastPeriodDate(e.target.value)}
                          />
                        </div>
                        {errors.lastPeriodDate && <p className="text-red-600 text-xs mt-1">{errors.lastPeriodDate}</p>}
                      </div>

                      {/* Cycle Length */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Average Length of Menstrual Cycle (CL) *
                        </Label>
                        <Select value={cycleLength} onValueChange={setCycleLength}>
                          <SelectTrigger className={`h-12 ${errors.cycleLength ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your cycle length" />
                          </SelectTrigger>
                          <SelectContent>
                            {cycleLengthOptions.map((days) => (
                              <SelectItem key={days} value={days.toString()}>
                                {days} days
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.cycleLength && <p className="text-red-600 text-xs mt-1">{errors.cycleLength}</p>}
                        <p className="text-xs text-gray-500 mt-1">
                          Average menstrual cycle length ranges from 22 to 44 days (28 days is typical)
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateConception}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                      >
                        Calculate Conception
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center mb-3 shadow-lg">
                      <Baby className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">
                      Conception Window
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-purple-200">
                          <p className="text-lg font-bold text-purple-900 mb-2">{formatDate(result.ovulationDate)}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">Most Probable Conception</p>
                          <p className="text-xs text-gray-500">Peak fertile: {result.peakFertileWindow}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Baby className="w-8 h-8 text-purple-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your cycle details to calculate your conception window.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <span>Your Conception Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-4 text-lg">Current Cycle Windows</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">Ovulation Date:</span>
                            <p className="font-semibold text-purple-700">{formatDate(result.ovulationDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Fertile Window:</span>
                            <p className="font-semibold text-purple-700">{result.fertileWindow}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Peak Fertile Window:</span>
                            <p className="font-semibold text-purple-700">{result.peakFertileWindow}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-4 text-lg">Possible Conception Dates</h4>
                        <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                          {result.possibleConceptionDates.map((conception: any, index: number) => (
                            <div
                              key={index}
                              className={`p-2 rounded ${conception.isOvulation ? "bg-yellow-100 border border-yellow-300" : conception.isPeak ? "bg-green-100 border border-green-300" : "bg-gray-50"}`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  {formatDate(conception.date)}
                                  {conception.isOvulation && (
                                    <span className="text-yellow-700 text-xs ml-1">(Most Probable)</span>
                                  )}
                                  {conception.isPeak && !conception.isOvulation && (
                                    <span className="text-green-700 text-xs ml-1">(Peak)</span>
                                  )}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">Due: {formatDate(conception.dueDate)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Future Cycles Table */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-700 mb-4 text-lg">6-Cycle Forecast</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-indigo-200">
                              <th className="text-left py-2 px-2 text-indigo-700">Cycle #</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Ovulation Date</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Fertile Window</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Peak Fertile Window</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Possible Conception Dates</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Estimated Due Dates</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.futureCycles.map((cycle: any, index: number) => (
                              <tr key={index} className="border-b border-indigo-100">
                                <td className="py-2 px-2 font-medium">{cycle.cycleNumber}</td>
                                <td className="py-2 px-2 font-semibold text-purple-700">
                                  {formatDate(cycle.ovulationDate)}
                                </td>
                                <td className="py-2 px-2 text-xs">{cycle.fertileWindow}</td>
                                <td className="py-2 px-2 text-xs">{cycle.peakFertileWindow}</td>
                                <td className="py-2 px-2 text-xs">{cycle.possibleConceptionDates.length} dates</td>
                                <td className="py-2 px-2 text-xs">{cycle.estimatedDueDates}</td>
                              </tr>
                            ))}
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center mr-3 shadow-lg">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">
                    Understanding Conception
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Conception Probability</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Sperm can survive up to 5-7 days</strong> before ovulation
                          </li>
                          <li>
                            <strong>The last 3 days of fertile window</strong> have ~30% chance of conception
                          </li>
                          <li>
                            <strong>Conception is most probable on ovulation day</strong>
                          </li>
                          <li>
                            <strong>Any intercourse during fertile window</strong> may result in pregnancy
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Calculation Method</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Ovulation:</strong> LMP + (Cycle Length - 14 days)
                          </li>
                          <li>
                            <strong>Fertile Window:</strong> [Ovulation - 5 days, Ovulation]
                          </li>
                          <li>
                            <strong>Peak Fertile:</strong> [Ovulation - 2 days, Ovulation]
                          </li>
                          <li>
                            <strong>Due Date:</strong> Conception Date + 266 days
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-violet-700 mb-3">Timing for Conception</h3>
                      <div className="bg-white p-4 rounded-lg border border-violet-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Best timing:</strong> 1-2 days before ovulation
                          </li>
                          <li>
                            <strong>Good timing:</strong> Day of ovulation
                          </li>
                          <li>
                            <strong>Moderate timing:</strong> 3-5 days before ovulation
                          </li>
                          <li>
                            <strong>Low probability:</strong> After ovulation day
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-violet-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-violet-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>This calculator provides estimates based on average cycles</li>
                          <li>Actual conception timing can vary by individual</li>
                          <li>Due dates are estimates using Naegele's Rule</li>
                          <li>Consult healthcare providers for personalized advice</li>
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
