"use client"
import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Calendar, Baby } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pregnancy Conception Calculator",
  description:
    "Estimate conception date and related pregnancy milestones based on due date, last period, or ultrasound date.",
  url: "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Conception date estimation",
    "Due date, last period, ultrasound support",
    "Pregnancy milestones",
    "Weeks and days since conception",
  ],
}

const calculateOptions = [
  { value: "dueDate", label: "Due Date" },
  { value: "lastPeriod", label: "Last Period" },
  { value: "ultrasound", label: "Ultrasound" },
]

export default function PregnancyConceptionCalculator() {
  const [calculateBasedOn, setCalculateBasedOn] = useState("dueDate")
  const [inputDate, setInputDate] = useState("")
  const [result, setResult] = useState<any>(null)

  function calculateConception() {
    if (!inputDate) return
    const date = new Date(inputDate)
    let conceptionDate = date
    switch (calculateBasedOn) {
      case "dueDate":
        conceptionDate = new Date(date.getTime() - 266 * 24 * 60 * 60 * 1000)
        break
      case "lastPeriod":
        conceptionDate = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000)
        break
      case "ultrasound":
        conceptionDate = date // ultrasound date is often close to conception
        break
    }
    // Calculate weeks, milestones, etc.
    setResult({
      conceptionDate: conceptionDate.toDateString(),
      dueDate: new Date(conceptionDate.getTime() + 266 * 24 * 60 * 60 * 1000).toDateString(),
      lastPeriodDate: new Date(conceptionDate.getTime() - 14 * 24 * 60 * 60 * 1000).toDateString(),
      today: new Date().toDateString(),
      weeksSinceConception: Math.floor((new Date().getTime() - conceptionDate.getTime()) / (7 * 24 * 60 * 60 * 1000)),
      daysSinceConception: Math.floor((new Date().getTime() - conceptionDate.getTime()) / (24 * 60 * 60 * 1000)),
    })
  }

  return (
    <>
      <Head>
        <title>Pregnancy Conception Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date." />
        <meta
          name="keywords"
          content="pregnancy conception calculator, due date, last period, ultrasound, conception date" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Pregnancy Conception Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-pink-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-pink-600">
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Pregnancy Conception Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Baby className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pregnancy Conception Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The Pregnancy Conception Calculator can estimate your conception date and related milestones based on the provided due date, last period, or ultrasound date.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Baby className="w-6 h-6 text-pink-500" />
                      <span>Pregnancy Conception Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Modify the values and click the calculate button to use
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">Calculate Based On</Label>
                      <Select value={calculateBasedOn} onValueChange={setCalculateBasedOn}>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {calculateOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900">Your Date</Label>
                      <Input type="date" value={inputDate} onChange={e => setInputDate(e.target.value)} className="w-full mt-2" />
                    </div>
                    <Button onClick={calculateConception} className="w-full h-14 text-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-xl font-bold">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results Info Section */}
              <div className="lg:col-span-1">
                <Card className="shadow-2xl border-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">Conception Info</CardTitle>
                    <CardDescription className="text-base">Your conception and pregnancy milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result ? (
                      <div className="space-y-4">
                        <div><strong>Conception Date:</strong> {result.conceptionDate}</div>
                        <div><strong>Due Date:</strong> {result.dueDate}</div>
                        <div><strong>Last Period Date:</strong> {result.lastPeriodDate}</div>
                        <div><strong>Weeks Since Conception:</strong> {result.weeksSinceConception}</div>
                        <div><strong>Days Since Conception:</strong> {result.daysSinceConception}</div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Baby className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter your date and click Calculate to see your conception milestones</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Information Section */}
            <section className="mt-16">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How Conception is Calculated?</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    The Pregnancy Conception Calculator estimates your conception date and milestones based on the provided date and method. It uses standard medical formulas for conception, due date, and pregnancy milestones. Always consult your doctor for personalized advice.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Conception Date</h3>
                      <p className="text-gray-600">
                        The estimated date when conception occurred. Calculated based on your selected method and input date.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Due Date</h3>
                      <p className="text-gray-600">
                        The estimated date when your baby is due, based on conception date.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Weeks Since Conception</h3>
                      <p className="text-gray-600">
                        The number of weeks since conception, calculated from conception date to today.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 font-medium">
                      <strong>Important:</strong> The results above are a guideline for typical situations. Please consult with a doctor for your conception and pregnancy milestones if you have special medical conditions or questions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Logo />
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
