"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, Clock, User, AlertCircle } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

export default function AgeCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ dateOfBirth?: string; targetDate?: string }>({})

  // Input states
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0])

  const validateInputs = () => {
    const newErrors: { dateOfBirth?: string; targetDate?: string } = {}

    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Please enter your date of birth"
    }

    if (!targetDate) {
      newErrors.targetDate = "Please enter the target date"
    }

    if (dateOfBirth && targetDate) {
      const birthDate = new Date(dateOfBirth)
      const target = new Date(targetDate)

      if (birthDate > target) {
        newErrors.targetDate = "Target date must be after date of birth"
      }

      // Check if birth date is not in the future
      const today = new Date()
      if (birthDate > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future"
      }

      // Check if dates are valid
      if (isNaN(birthDate.getTime())) {
        newErrors.dateOfBirth = "Please enter a valid date"
      }

      if (isNaN(target.getTime())) {
        newErrors.targetDate = "Please enter a valid date"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateAge = () => {
    if (!validateInputs()) {
      return
    }

    const birthDate = new Date(dateOfBirth)
    const target = new Date(targetDate)

    // Calculate total difference in milliseconds
    const totalMs = target.getTime() - birthDate.getTime()
    const totalSeconds = Math.floor(totalMs / 1000)

    // Calculate years, months, days using precise calendar arithmetic
    let years = target.getFullYear() - birthDate.getFullYear()
    let months = target.getMonth() - birthDate.getMonth()
    let days = target.getDate() - birthDate.getDate()

    // Adjust for negative days
    if (days < 0) {
      months--
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += lastMonth.getDate()
    }

    // Adjust for negative months
    if (months < 0) {
      years--
      months += 12
    }

    // Calculate remaining time components
    const remainingMs =
      totalMs - years * 365.25 * 24 * 60 * 60 * 1000 - months * 30.44 * 24 * 60 * 60 * 1000 - days * 24 * 60 * 60 * 1000
    const remainingSeconds = Math.floor(remainingMs / 1000)
    const hours = Math.floor(remainingSeconds / 3600)
    const minutes = Math.floor((remainingSeconds % 3600) / 60)
    const seconds = remainingSeconds % 60

    // Calculate total units for display
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60))
    const totalMinutes = Math.floor(totalMs / (1000 * 60))

    setResult({
      years,
      months,
      days,
      weeks: totalWeeks,
      hours,
      minutes,
      seconds,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      birthDate: birthDate.toLocaleDateString(),
      targetDate: target.toLocaleDateString(),
    })
    setShowResult(true)
  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  return (
    <>
      <SEO
        title="Age Calculator – Calculate Age by Date of Birth"
        description="Find your exact age in years, months, and days. Use our free age calculator to calculate age instantly by date of birth."
        slug="/age-calculator"
        keywords="age calculator, calculate age, date of birth calculator, age in years months days"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
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
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Age Calculator</p>
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
              <Link href="/other-calculators" className="text-gray-500 hover:text-blue-600">
                Other
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Age Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Age Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your exact age in years, months, weeks, days, hours, minutes, and seconds. Perfect for
                birthdays, anniversaries, and milestone tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <span>Age Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your birth date and target date to calculate precise age
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Date of Birth</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.dateOfBirth ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => {
                              setDateOfBirth(e.target.value)
                              if (errors.dateOfBirth) {
                                setErrors((prev) => ({ ...prev, dateOfBirth: undefined }))
                              }
                            }}
                          />
                        </div>
                        {errors.dateOfBirth && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.dateOfBirth}</span>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Target Date</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.targetDate ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="date"
                            value={targetDate}
                            onChange={(e) => {
                              setTargetDate(e.target.value)
                              if (errors.targetDate) {
                                setErrors((prev) => ({ ...prev, targetDate: undefined }))
                              }
                            }}
                          />
                        </div>
                        {errors.targetDate && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.targetDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>How it works:</strong> The calculator uses precise calendar arithmetic to handle leap
                        years, varying month lengths, and time zones accurately.
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Results include both exact age breakdown and total time in each unit.
                      </p>
                    </div>

                    <Button
                      onClick={calculateAge}
                      className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                    >
                      Calculate Age
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mb-3 shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">Your Age</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-2xl font-bold text-purple-900">{result.years}</p>
                            <p className="text-gray-600">Years</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-2xl font-bold text-purple-900">{result.months}</p>
                            <p className="text-gray-600">Months</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-2xl font-bold text-purple-900">{result.totalWeeks}</p>
                            <p className="text-gray-600">Weeks</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-2xl font-bold text-purple-900">{result.totalDays}</p>
                            <p className="text-gray-600">Days</p>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                          <p className="text-xs text-gray-600">
                            From {result.birthDate} to {result.targetDate}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Calendar className="w-8 h-8 text-purple-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your dates and click <span className="font-semibold text-purple-600">Calculate</span> to
                          see your exact age.
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
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Clock className="w-6 h-6 text-purple-600" />
                      <span>Detailed Age Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.years}</p>
                        <p className="text-sm text-gray-600 mt-1">Years</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.months}</p>
                        <p className="text-sm text-gray-600 mt-1">Months</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.totalWeeks}</p>
                        <p className="text-sm text-gray-600 mt-1">Weeks</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.totalDays}</p>
                        <p className="text-sm text-gray-600 mt-1">Days</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-900 break-all">
                          {result.totalHours.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Hours</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-900 break-all">
                          {result.totalMinutes.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Minutes</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-900 break-all leading-tight">
                          {result.totalSeconds.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Seconds</p>
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mr-3 shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">
                    Understanding Age Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">How Age is Calculated</h3>
                      <p className="text-gray-700 mb-4">
                        Age calculation involves precise calendar arithmetic that accounts for leap years, varying month
                        lengths, and the Western age system where age increases only after the birthday passes.
                      </p>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Key Features</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Handles leap years automatically</li>
                        <li>Accounts for months with different day counts</li>
                        <li>Provides both exact breakdown and total units</li>
                        <li>Uses Western age counting system</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong>
                        </p>
                        <p className="text-gray-700">Birth Date: January 1, 2000</p>
                        <p className="text-gray-700">Target Date: August 22, 2025</p>
                        <p className="text-gray-700 font-semibold">Result: 25 years, 7 months, 21 days</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        The calculator also provides the total time in weeks, days, hours, minutes, and seconds for
                        comprehensive age analysis.
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
