
"use client"
import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Percent } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"

export default function PercentageCalculator() {
  const [tab, setTab] = useState("of")
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")
  const [result, setResult] = useState<number | null>(null)

  function calculate() {
    const num1 = Number.parseFloat(value1)
    const num2 = Number.parseFloat(value2)
    if (isNaN(num1) || isNaN(num2)) {
      setResult(null)
      return
    }
    let res = 0
    switch (tab) {
      case "of":
        res = (num1 / 100) * num2
        break
      case "is":
        res = (num1 / num2) * 100
        break
      case "increase":
        res = num1 + (num1 * num2) / 100
        break
      case "decrease":
        res = num1 - (num1 * num2) / 100
        break
    }
    setResult(res)
  }

  return (
    <>
      <Head>
        <title>Percentage Calculator - Smart Calculator</title>
        <meta name="description" content="Free percentage calculator for all your percentage calculations. Calculate percentage of a number, percentage increase, decrease and more." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Percentage Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/maths" className="text-gray-500 hover:text-blue-600">
                Math
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Percentage Calculator</span>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Percent className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Percentage Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate percentages, percentage increases, decreases, and more with our comprehensive percentage calculator.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Percent className="w-6 h-6 text-blue-600" />
                      <span>Percentage Calculations</span>
                    </CardTitle>
                    <CardDescription className="text-base">Choose the type of percentage calculation you need</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                      <Button variant={tab === "of" ? "default" : "outline"} className="flex-1" onClick={() => setTab("of")}>% of</Button>
                      <Button variant={tab === "is" ? "default" : "outline"} className="flex-1" onClick={() => setTab("is")}>What % is</Button>
                      <Button variant={tab === "increase" ? "default" : "outline"} className="flex-1" onClick={() => setTab("increase")}>% Increase</Button>
                      <Button variant={tab === "decrease" ? "default" : "outline"} className="flex-1" onClick={() => setTab("decrease")}>% Decrease</Button>
                    </div>
                    {/* Input fields and labels */}
                    {tab === "of" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Percentage (%)</Label>
                            <Input type="number" placeholder="25" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Of Number</Label>
                            <Input type="number" placeholder="200" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                          </div>
                        </div>
                        <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600">Calculate</Button>
                      </div>
                    )}
                    {tab === "is" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Number</Label>
                            <Input type="number" placeholder="50" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Of Total</Label>
                            <Input type="number" placeholder="200" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                          </div>
                        </div>
                        <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600">Calculate</Button>
                      </div>
                    )}
                    {tab === "increase" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Original Number</Label>
                            <Input type="number" placeholder="100" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Increase (%)</Label>
                            <Input type="number" placeholder="20" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                          </div>
                        </div>
                        <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600">Calculate</Button>
                      </div>
                    )}
                    {tab === "decrease" && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Original Number</Label>
                            <Input type="number" placeholder="100" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">Decrease (%)</Label>
                            <Input type="number" placeholder="15" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                          </div>
                        </div>
                        <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-red-500 to-red-600">Calculate</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              {/* Result Card (right side) */}
              <div className="">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-blue-200 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg">
                      <Percent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {result !== null ? (
                      <div className="text-center">
                        <p className="text-lg text-gray-600 mb-2 font-medium">Calculated Value</p>
                        <p className="text-5xl font-extrabold text-blue-900 mb-2 drop-shadow-lg">
                          {result.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <div className="mt-2 text-sm text-gray-500">You can copy or use this value as needed.</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Percent className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">Enter values and click <span className="font-semibold text-blue-600">Calculate</span> to see result.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* How to use section below both cards */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col justify-center items-start p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mr-3 shadow-lg">
                    <Percent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight mb-2 text-left">How to use this calculator?</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-gray-700 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">1</span>
                      <span>Select the type of percentage calculation you need.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">2</span>
                      <span>Enter your values in the input fields.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">3</span>
                      <span>Click <span className="font-semibold text-blue-600">Calculate</span> to see the result instantly.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">4</span>
                      <span>Switch between tabs for different percentage operations.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

      </div>
    </>
  )
}
