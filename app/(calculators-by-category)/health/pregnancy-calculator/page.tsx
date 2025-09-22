
"use client"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calendar, Baby } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import pregnancyData from "@/app/content/pregnancy-calculator.json"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pregnancy Calculator",
  description:
    "Estimate your pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date.",
  url: "https://www.thesmartcalculator.com/health/pregnancy-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Pregnancy schedule estimation",
    "Due date, last period, ultrasound, conception, IVF support",
    "Trimester calculation",
    "Weeks and days pregnant",
  ],
}

const calculateOptions = [
  { value: "dueDate", label: "Due Date" },
  { value: "lastPeriod", label: "Last Period" },
  { value: "ultrasound", label: "Ultrasound" },
  { value: "conception", label: "Conception Date" },
  { value: "ivf", label: "IVF Transfer Date" },
]

export default function PregnancyCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [calculateBasedOn, setCalculateBasedOn] = useState("dueDate")
  const [inputDate, setInputDate] = useState("")
  const [result, setResult] = useState<any>(null)

  function calculatePregnancy() {
    if (!inputDate) return
    const date = new Date(inputDate)
    let dueDate = date
    switch (calculateBasedOn) {
      case "dueDate":
        dueDate = date
        break
      case "lastPeriod":
        dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000)
        break
      case "ultrasound":
        dueDate = new Date(date.getTime() + 280 * 24 * 60 * 60 * 1000)
        break
      case "conception":
        dueDate = new Date(date.getTime() + 266 * 24 * 60 * 60 * 1000)
        break
      case "ivf":
        dueDate = new Date(date.getTime() + 266 * 24 * 60 * 60 * 1000)
        break
    }
    setResult({
      dueDate: dueDate.toDateString(),
      conceptionDate: new Date(dueDate.getTime() - 266 * 24 * 60 * 60 * 1000).toDateString(),
      lastPeriodDate: new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000).toDateString(),
      today: new Date().toDateString(),
      weeksPregnant: Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)),
      daysPregnant: Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)),
      trimester:
        Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)) < 13
          ? "First Trimester"
          : Math.floor((new Date().getTime() - (dueDate.getTime() - 280 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)) < 27
          ? "Second Trimester"
          : "Third Trimester",
    })
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);


  }

  return (
    <>
<SEO
  title="Pregnancy Calculator – Estimate Key Pregnancy Dates"
  description="Calculate important pregnancy milestones instantly. Use our free pregnancy calculator to estimate conception, due date, and trimester progress."
  keywords="pregnancy calculator, due date calculator, conception calculator, pregnancy week calculator"
  slug="/health/pregnancy-calculator"
/>

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
                  <p className="text-sm text-gray-500">Pregnancy Calculator</p>
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
              <span className="text-gray-900 font-medium">Pregnancy Calculator</span>
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pregnancy Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The Pregnancy Calculator can estimate a pregnancy schedule based on the provided due date, last period date, ultrasound date, conception date, or IVF transfer date.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Baby className="w-6 h-6 text-pink-500" />
                      <span>Pregnancy Calculator</span>
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
                    <Button onClick={calculatePregnancy} className="w-full h-14 text-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-xl font-bold">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results Info Section */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl p-0 border-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">Pregnancy Info</CardTitle>
                    <CardDescription className="text-base">Your pregnancy schedule breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {result ? (
                      <div className="space-y-4">
                        <div><strong>Due Date:</strong> {result.dueDate}</div>
                        <div><strong>Conception Date:</strong> {result.conceptionDate}</div>
                        <div><strong>Last Period Date:</strong> {result.lastPeriodDate}</div>
                        <div><strong>Weeks Pregnant:</strong> {result.weeksPregnant}</div>
                        <div><strong>Days Pregnant:</strong> {result.daysPregnant}</div>
                        <div><strong>Trimester:</strong> {result.trimester}</div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Baby className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter your date and click Calculate to see your pregnancy schedule</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Information Section */}
            <section className="mt-16">
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How Pregnancy is Calculated?</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    The Pregnancy Calculator estimates your pregnancy schedule based on the provided date and method. It uses standard medical formulas for due date, conception, and trimester calculation. Always consult your doctor for personalized advice.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Due Date</h3>
                      <p className="text-gray-600">
                        The estimated date when your baby is due. Calculated based on your selected method and input date.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Trimester</h3>
                      <p className="text-gray-600">
                        Pregnancy is divided into three trimesters. The calculator shows which trimester you are currently in.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Weeks Pregnant</h3>
                      <p className="text-gray-600">
                        The number of weeks you have been pregnant, calculated from the start date to today.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 font-medium">
                      <strong>Important:</strong> The results above are a guideline for typical situations. Please consult with a doctor for your pregnancy schedule if you have special medical conditions or questions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* How to Use Section */}
          <div className="mt-8">
            <CalculatorGuide data={pregnancyData} />
          </div>

        </main>

      </div>
    </>
  )
}
