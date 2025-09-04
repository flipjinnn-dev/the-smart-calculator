"use client"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import Logo from "@/components/logo"
import Link from "next/link"
import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react"
import CalculatorGuide from "@/components/calculator-guide"
import inflationData from "@/app/content/inflation-calculator.json"
import SEO from "@/lib/seo"
import { useMobileScroll } from "@/hooks/useMobileScroll"


export default function InflationCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [tab, setTab] = useState("future")
  const [amount, setAmount] = useState("1000")
  const [inflationRate, setInflationRate] = useState("3")
  const [years, setYears] = useState("10")
  const [futureValue, setFutureValue] = useState("1000")
  const [pastValue, setPastValue] = useState("1000")
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<any>(null)

  const calculateInflation = () => {
    const principal = Number.parseFloat(amount) || 0
    const rate = Number.parseFloat(inflationRate) / 100 || 0
    const time = Number.parseFloat(years) || 0
    const futureVal = Number.parseFloat(futureValue) || 0
    const pastVal = Number.parseFloat(pastValue) || 0

    let calculationResult: any = {}

    if (tab === "future") {
      const futureAmount = principal * Math.pow(1 + rate, time)
      const totalInflation = futureAmount - principal
      const inflationPercent = ((futureAmount - principal) / principal) * 100

      calculationResult = {
        type: "future",
        originalAmount: principal,
        futureAmount: futureAmount,
        totalInflation: totalInflation,
        inflationPercent: inflationPercent,
        years: time,
        rate: rate * 100,
      }
    } else if (tab === "past") {
      const pastAmount = futureVal / Math.pow(1 + rate, time)
      const totalInflation = futureVal - pastAmount
      const inflationPercent = ((futureVal - pastAmount) / pastAmount) * 100

      calculationResult = {
        type: "past",
        futureAmount: futureVal,
        pastAmount: pastAmount,
        totalInflation: totalInflation,
        inflationPercent: inflationPercent,
        years: time,
        rate: rate * 100,
      }
    } else if (tab === "rate") {
      if (pastVal <= 0 || futureVal <= 0 || time <= 0) {
        calculationResult.calculatedRate = 0
      } else {
        const calculatedRate = (Math.pow(futureVal / pastVal, 1 / time) - 1) * 100
        const totalInflation = futureVal - pastVal
        const inflationPercent = ((futureVal - pastVal) / pastVal) * 100

        calculationResult = {
          type: "rate",
          pastAmount: pastVal,
          futureAmount: futureVal,
          calculatedRate: calculatedRate,
          totalInflation: totalInflation,
          inflationPercent: inflationPercent,
          years: time,
        }
      }
    }

    const yearlyData = []
    for (let i = 0; i <= time; i++) {
      let value
      if (tab === "future") {
        // Using FV = PV × (1 + r)^t for each year
        value = principal * Math.pow(1 + rate, i)
      } else if (tab === "past") {
        // Using PV = FV / (1 + r)^t then projecting forward
        const basePastAmount = futureVal / Math.pow(1 + rate, time)
        value = basePastAmount * Math.pow(1 + rate, i)
      } else {
        // Using calculated rate for projection
        const calcRate = Math.pow(futureVal / pastVal, 1 / time) - 1
        value = pastVal * Math.pow(1 + calcRate, i)
      }

      yearlyData.push({
        year: new Date().getFullYear() + i,
        value: value,
        inflationImpact:
          value - (tab === "future" ? principal : tab === "past" ? futureVal / Math.pow(1 + rate, time) : pastVal),
      })
    }

    calculationResult.yearlyData = yearlyData
    setResult(calculationResult)
    setShowResult(true)
  }

  const handleCalculate = () => {
    calculateInflation()
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  return (
    <>
<SEO
  title="Inflation Calculator – Track Money’s True Value"
  description="See how inflation affects your money over time. Use our free inflation calculator to understand purchasing power and make informed financial choices."
  keywords="inflation calculator, purchasing power calculator, money value, finance calculator"
  slug="/financial/inflation-calculator"
/>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500 font-medium">Inflation Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white/50 backdrop-blur-sm border-b px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link
                href="/"
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 flex items-center"
              >
                <span>Home</span>
              </Link>
              <span className="text-gray-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <Link href="/financial" className="text-gray-600 hover:text-orange-600 transition-colors duration-200">
                Financial
              </Link>
              <span className="text-gray-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-orange-600 font-medium">Inflation Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 ring-4 ring-orange-100">
                  <TrendingUp className="w-10 h-10 text-white drop-shadow-md" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Inflation Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate the impact of inflation on your money over time and understand how purchasing power changes.
              </p>
              <div className="flex justify-center mt-4">
                <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left: Calculator Card */}
              <div>
                <Card className="shadow-xl border-0 min-h-0 rounded-xl pt-0 overflow-hidden hover:shadow-orange-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-t-xl py-5 px-6 border-b border-orange-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Calculator className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-orange-800 font-semibold">Inflation Details</span>
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 text-orange-700/70">
                      Enter your inflation calculation information below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="mb-6">
                      <Label className="text-sm font-semibold mb-3 block text-orange-800">
                        What would you like to calculate?
                      </Label>
                      <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="bg-gradient-to-r from-orange-50 to-red-50 w-full h-auto p-1 rounded-xl border border-orange-200 shadow-sm">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
                            <TabsTrigger
                              value="future"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:shadow-md whitespace-nowrap"
                            >
                              Future Value
                            </TabsTrigger>
                            <TabsTrigger
                              value="past"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:shadow-md whitespace-nowrap"
                            >
                              Past Value
                            </TabsTrigger>
                            <TabsTrigger
                              value="rate"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-3 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:shadow-md whitespace-nowrap"
                            >
                              Inflation Rate
                            </TabsTrigger>
                          </div>
                        </TabsList>

                        <TabsContent value="future">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">
                                Current Amount ($)
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="1000"
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">
                                Annual Inflation Rate (%)
                              </Label>
                              <div className="relative">
                                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={inflationRate}
                                  onChange={(e) => setInflationRate(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="3"
                                  step="0.1"
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">Number of Years</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={years}
                                  onChange={(e) => setYears(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="10"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="past">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">
                                Future Amount ($)
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={futureValue}
                                  onChange={(e) => setFutureValue(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="1000"
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">
                                Annual Inflation Rate (%)
                              </Label>
                              <div className="relative">
                                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={inflationRate}
                                  onChange={(e) => setInflationRate(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="3"
                                  step="0.1"
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">Number of Years</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={years}
                                  onChange={(e) => setYears(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="10"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="rate">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">Past Amount ($)</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={pastValue}
                                  onChange={(e) => setPastValue(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="1000"
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">
                                Current Amount ($)
                              </Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={futureValue}
                                  onChange={(e) => setFutureValue(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="1000"
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-orange-800 mb-3 block">Number of Years</Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                                <Input
                                  type="number"
                                  value={years}
                                  onChange={(e) => setYears(e.target.value)}
                                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-lg h-12"
                                  placeholder="10"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate Inflation Impact
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Results Card */}
              <div>
                <Card ref={resultsRef} className="shadow-xl border-0 pt-0 min-h-0 rounded-xl overflow-hidden hover:shadow-orange-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-t-xl py-5 px-6 border-b border-orange-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-orange-800 font-semibold">Your Inflation Results</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">
                      See your inflation calculation results here
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="min-h-[200px] space-y-6">
                      {showResult && result ? (
                        <div className="space-y-6">
                          {/* Main Result Summary */}
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                            <h3 className="text-lg font-semibold text-orange-800 mb-4">
                              {result.type === "future" && "Future Value Impact"}
                              {result.type === "past" && "Past Value Equivalent"}
                              {result.type === "rate" && "Calculated Inflation Rate"}
                            </h3>

                            {result.type === "future" && (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Current Amount:</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.originalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Future Value:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.futureAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Total Inflation Impact:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.totalInflation.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Purchasing Power Loss:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.inflationPercent.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            )}

                            {result.type === "past" && (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Current Amount:</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.futureAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Past Equivalent:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.pastAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Inflation Impact:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    ${result.totalInflation.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Total Inflation:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.inflationPercent.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            )}

                            {result.type === "rate" && (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Past Amount:</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.pastAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Current Amount:</span>
                                  <span className="font-bold text-lg text-orange-800">
                                    ${result.futureAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Annual Inflation Rate:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.calculatedRate.toFixed(2)}%
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-orange-700">Total Inflation:</span>
                                  <span className="font-bold text-lg text-red-600">
                                    {result.inflationPercent.toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Chart */}
                          {result.yearlyData && (
                            <div>
                              <h4 className="font-semibold text-orange-800 mb-3">Inflation Impact Over Time</h4>
                              <div className="h-64">
                                <ChartContainer
                                  config={{
                                    value: { label: "Value", color: "#ea580c" },
                                  }}
                                  className="h-full w-full"
                                >
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={result.yearlyData}>
                                      <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                                      <XAxis dataKey="year" stroke="#ea580c" />
                                      <YAxis stroke="#ea580c" />
                                      <ChartTooltip content={<ChartTooltipContent />} />
                                      <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#ea580c"
                                        strokeWidth={3}
                                        dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                                      />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </ChartContainer>
                              </div>
                            </div>
                          )}

                          {/* Year-by-Year Table */}
                          {result.yearlyData && (
                            <div>
                              <h4 className="font-semibold text-orange-800 mb-3">Year-by-Year Breakdown</h4>
                              <div className="max-h-64 overflow-y-auto border border-orange-200 rounded-lg">
                                <Table >
                                  <TableHeader className="bg-orange-50">
                                    <TableRow>
                                      <TableHead className="text-orange-800">Year</TableHead>
                                      <TableHead className="text-orange-800">Value</TableHead>
                                      <TableHead className="text-orange-800">Inflation Impact</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {result.yearlyData.map((row: any, index: number) => (
                                      <TableRow key={index} className="hover:bg-orange-50/50">
                                        <TableCell className="font-medium">{row.year}</TableCell>
                                        <TableCell>
                                          ${row.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell className="text-red-600">
                                          $
                                          {Math.abs(row.inflationImpact).toLocaleString(undefined, {
                                            maximumFractionDigits: 2,
                                          })}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calculator className="w-8 h-8 text-orange-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Calculate</h3>
                          <p className="text-gray-600">
                            Enter your values and click "Calculate Inflation Impact" to see the results.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Historical Inflation Data Section */}
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl p-0 border-0 rounded-xl overflow-hidden hover:shadow-orange-100/50 transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 py-6 px-8 border-b border-orange-100/50">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-orange-800 font-bold">Historical US Inflation Rates</span>
                </CardTitle>
                <CardDescription className="text-base text-orange-700/80 mt-2">
                  Monthly and annual inflation rates from 2013 to 2025 to help you understand historical trends
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 bg-white">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-orange-50 to-red-50">
                        <TableHead className="text-orange-800 font-semibold">Year</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Jan</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Feb</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Mar</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Apr</TableHead>
                        <TableHead className="text-orange-800 font-semibold">May</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Jun</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Jul</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Aug</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Sep</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Oct</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Nov</TableHead>
                        <TableHead className="text-orange-800 font-semibold">Dec</TableHead>
                        <TableHead className="text-orange-800 font-semibold bg-orange-100">Average</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2025</TableCell>
                        <TableCell>3.00%</TableCell>
                        <TableCell>2.82%</TableCell>
                        <TableCell>2.39%</TableCell>
                        <TableCell>2.31%</TableCell>
                        <TableCell>2.35%</TableCell>
                        <TableCell>2.67%</TableCell>
                        <TableCell>2.70%</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="text-gray-400">-</TableCell>
                        <TableCell className="font-semibold bg-orange-50">-</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2024</TableCell>
                        <TableCell>3.09%</TableCell>
                        <TableCell>3.15%</TableCell>
                        <TableCell>3.48%</TableCell>
                        <TableCell>3.36%</TableCell>
                        <TableCell>3.27%</TableCell>
                        <TableCell>2.97%</TableCell>
                        <TableCell>2.89%</TableCell>
                        <TableCell>2.53%</TableCell>
                        <TableCell>2.44%</TableCell>
                        <TableCell>2.60%</TableCell>
                        <TableCell>2.75%</TableCell>
                        <TableCell>2.89%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">2.95%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2023</TableCell>
                        <TableCell>6.41%</TableCell>
                        <TableCell>6.04%</TableCell>
                        <TableCell>4.98%</TableCell>
                        <TableCell>4.93%</TableCell>
                        <TableCell>4.05%</TableCell>
                        <TableCell>2.97%</TableCell>
                        <TableCell>3.18%</TableCell>
                        <TableCell>3.67%</TableCell>
                        <TableCell>3.70%</TableCell>
                        <TableCell>3.24%</TableCell>
                        <TableCell>3.14%</TableCell>
                        <TableCell>3.35%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">4.12%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2022</TableCell>
                        <TableCell className="text-red-600 font-medium">7.48%</TableCell>
                        <TableCell className="text-red-600 font-medium">7.87%</TableCell>
                        <TableCell className="text-red-600 font-medium">8.54%</TableCell>
                        <TableCell className="text-red-600 font-medium">8.26%</TableCell>
                        <TableCell className="text-red-600 font-medium">8.58%</TableCell>
                        <TableCell className="text-red-600 font-medium">9.06%</TableCell>
                        <TableCell className="text-red-600 font-medium">8.52%</TableCell>
                        <TableCell className="text-red-600 font-medium">8.26%</TableCell>
                        <TableCell className="text-red-600 font-medium">8.20%</TableCell>
                        <TableCell className="text-red-600 font-medium">7.75%</TableCell>
                        <TableCell className="text-red-600 font-medium">7.11%</TableCell>
                        <TableCell className="text-red-600 font-medium">6.45%</TableCell>
                        <TableCell className="font-semibold bg-orange-50 text-red-600">8.00%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2021</TableCell>
                        <TableCell>1.40%</TableCell>
                        <TableCell>1.68%</TableCell>
                        <TableCell>2.62%</TableCell>
                        <TableCell>4.16%</TableCell>
                        <TableCell>4.99%</TableCell>
                        <TableCell>5.39%</TableCell>
                        <TableCell>5.37%</TableCell>
                        <TableCell>5.25%</TableCell>
                        <TableCell>5.39%</TableCell>
                        <TableCell>6.22%</TableCell>
                        <TableCell>6.81%</TableCell>
                        <TableCell>7.04%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">4.70%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2020</TableCell>
                        <TableCell>2.49%</TableCell>
                        <TableCell>2.33%</TableCell>
                        <TableCell>1.54%</TableCell>
                        <TableCell>0.33%</TableCell>
                        <TableCell>0.12%</TableCell>
                        <TableCell>0.65%</TableCell>
                        <TableCell>0.99%</TableCell>
                        <TableCell>1.31%</TableCell>
                        <TableCell>1.37%</TableCell>
                        <TableCell>1.18%</TableCell>
                        <TableCell>1.17%</TableCell>
                        <TableCell>1.36%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">1.24%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2019</TableCell>
                        <TableCell>1.55%</TableCell>
                        <TableCell>1.52%</TableCell>
                        <TableCell>1.86%</TableCell>
                        <TableCell>2.00%</TableCell>
                        <TableCell>1.79%</TableCell>
                        <TableCell>1.65%</TableCell>
                        <TableCell>1.81%</TableCell>
                        <TableCell>1.75%</TableCell>
                        <TableCell>1.71%</TableCell>
                        <TableCell>1.76%</TableCell>
                        <TableCell>2.05%</TableCell>
                        <TableCell>2.29%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">1.81%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2018</TableCell>
                        <TableCell>2.07%</TableCell>
                        <TableCell>2.21%</TableCell>
                        <TableCell>2.36%</TableCell>
                        <TableCell>2.46%</TableCell>
                        <TableCell>2.80%</TableCell>
                        <TableCell>2.87%</TableCell>
                        <TableCell>2.95%</TableCell>
                        <TableCell>2.70%</TableCell>
                        <TableCell>2.28%</TableCell>
                        <TableCell>2.52%</TableCell>
                        <TableCell>2.18%</TableCell>
                        <TableCell>1.91%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">2.44%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2017</TableCell>
                        <TableCell>2.50%</TableCell>
                        <TableCell>2.74%</TableCell>
                        <TableCell>2.38%</TableCell>
                        <TableCell>2.20%</TableCell>
                        <TableCell>1.87%</TableCell>
                        <TableCell>1.63%</TableCell>
                        <TableCell>1.73%</TableCell>
                        <TableCell>1.94%</TableCell>
                        <TableCell>2.23%</TableCell>
                        <TableCell>2.04%</TableCell>
                        <TableCell>2.20%</TableCell>
                        <TableCell>2.11%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">2.13%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2016</TableCell>
                        <TableCell>1.37%</TableCell>
                        <TableCell>1.02%</TableCell>
                        <TableCell>0.85%</TableCell>
                        <TableCell>1.13%</TableCell>
                        <TableCell>1.02%</TableCell>
                        <TableCell>1.01%</TableCell>
                        <TableCell>0.84%</TableCell>
                        <TableCell>1.06%</TableCell>
                        <TableCell>1.46%</TableCell>
                        <TableCell>1.64%</TableCell>
                        <TableCell>1.69%</TableCell>
                        <TableCell>2.07%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">1.26%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2015</TableCell>
                        <TableCell className="text-blue-600">-0.09%</TableCell>
                        <TableCell className="text-blue-600">-0.03%</TableCell>
                        <TableCell className="text-blue-600">-0.07%</TableCell>
                        <TableCell className="text-blue-600">-0.20%</TableCell>
                        <TableCell className="text-blue-600">-0.04%</TableCell>
                        <TableCell>0.12%</TableCell>
                        <TableCell>0.17%</TableCell>
                        <TableCell>0.20%</TableCell>
                        <TableCell className="text-blue-600">-0.04%</TableCell>
                        <TableCell>0.17%</TableCell>
                        <TableCell>0.50%</TableCell>
                        <TableCell>0.73%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">0.12%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2014</TableCell>
                        <TableCell>1.58%</TableCell>
                        <TableCell>1.13%</TableCell>
                        <TableCell>1.51%</TableCell>
                        <TableCell>1.95%</TableCell>
                        <TableCell>2.13%</TableCell>
                        <TableCell>2.07%</TableCell>
                        <TableCell>1.99%</TableCell>
                        <TableCell>1.70%</TableCell>
                        <TableCell>1.66%</TableCell>
                        <TableCell>1.66%</TableCell>
                        <TableCell>1.32%</TableCell>
                        <TableCell>0.76%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">1.62%</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-orange-50/30">
                        <TableCell className="font-semibold text-orange-800">2013</TableCell>
                        <TableCell>1.59%</TableCell>
                        <TableCell>1.98%</TableCell>
                        <TableCell>1.47%</TableCell>
                        <TableCell>1.06%</TableCell>
                        <TableCell>1.36%</TableCell>
                        <TableCell>1.75%</TableCell>
                        <TableCell>1.96%</TableCell>
                        <TableCell>1.52%</TableCell>
                        <TableCell>1.18%</TableCell>
                        <TableCell>0.96%</TableCell>
                        <TableCell>1.24%</TableCell>
                        <TableCell>1.50%</TableCell>
                        <TableCell className="font-semibold bg-orange-50">1.46%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Key Insights:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>
                      • <strong>2022</strong> saw the highest inflation rates in decades, peaking at 9.06% in June
                    </li>
                    <li>
                      • <strong>2015</strong> experienced deflation (negative inflation) in several months
                    </li>
                    <li>
                      • The Federal Reserve typically targets around <strong>2% annual inflation</strong>
                    </li>
                    <li>• Use this historical data to make informed assumptions about future inflation rates</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>


           <div className="mt-8">
              <CalculatorGuide data={inflationData} />
            </div>
        </main>

      </div>
    </>
  )
}
