"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Receipt, DollarSign, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import salesTaxData from "@/app/content/sales-tax-calulcator.json"

export default function SalesTaxCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const [calculationMode, setCalculationMode] = useState("fromPreTax")
  const [preTaxPrice, setPreTaxPrice] = useState("100")
  const [afterTaxPrice, setAfterTaxPrice] = useState("108")
  const [taxRate, setTaxRate] = useState("8")

  const [results, setResults] = useState<{
    prePrice: number
    tax: number
    afterPrice: number
    rate?: number
  } | null>(null)

  // Calculation functions based on the provided formulas
  function fromPreTax(prePrice: number, r: number) {
    const tax = prePrice * (r / 100)
    const after = prePrice * (1 + r / 100)
    return { prePrice, tax: +tax.toFixed(2), afterPrice: +after.toFixed(2) }
  }

  function fromAfterTax(afterPrice: number, r: number) {
    const pre = afterPrice / (1 + r / 100)
    const tax = afterPrice - pre
    return { prePrice: +pre.toFixed(2), tax: +tax.toFixed(2), afterPrice }
  }

  function rateFromPreAfter(prePrice: number, afterPrice: number) {
    const r = afterPrice / prePrice - 1
    return +(r * 100).toFixed(6)
  }

  const calculateSalesTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    let result: { prePrice: number; tax: number; afterPrice: number; rate?: number }

    if (calculationMode === "fromPreTax") {
      const prePrice = Number.parseFloat(preTaxPrice)
      const rate = Number.parseFloat(taxRate)
      const calc = fromPreTax(prePrice, rate)
      result = {
        prePrice: calc.prePrice,
        tax: calc.tax,
        afterPrice: calc.afterPrice,
      }
    } else if (calculationMode === "fromAfterTax") {
      const afterPrice = Number.parseFloat(afterTaxPrice)
      const rate = Number.parseFloat(taxRate)
      const calc = fromAfterTax(afterPrice, rate)
      result = {
        prePrice: calc.prePrice,
        tax: calc.tax,
        afterPrice: calc.afterPrice,
      }
    } else {
      // findTaxRate
      const prePrice = Number.parseFloat(preTaxPrice)
      const afterPrice = Number.parseFloat(afterTaxPrice)
      const calculatedRate = rateFromPreAfter(prePrice, afterPrice)
      result = {
        prePrice,
        tax: afterPrice - prePrice,
        afterPrice,
        rate: calculatedRate,
      }
    }

    setResults(result)
  }

  return (
    <>
      <SEO
        title="Sales Tax Calculator – Calculate Tax, Final Price & Reverse Tax"
        description="Free sales tax calculator to find total price including tax, reverse tax from after-tax price, or determine tax rate. Supports multiple calculation modes."
        keywords="sales tax calculator, tax calculator, reverse tax calculator, final price calculator"
        slug="/financial/sales-tax-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        {/* Header */}
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
                  <p className="text-sm text-gray-500">Sales Tax Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-green-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/financial" className="text-gray-500 hover:text-green-600">
                Financial Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Sales Tax Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Receipt className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sales Tax Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate sales tax, final price, or determine tax rate with our comprehensive sales tax calculator.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Sales Tax Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Calculation Mode */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">Calculation Mode</Label>
                    <Select value={calculationMode} onValueChange={setCalculationMode}>
                      <SelectTrigger className="h-12 border-2 focus:border-green-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fromPreTax">From Pre-Tax Price → Tax + After-Tax Price</SelectItem>
                        <SelectItem value="fromAfterTax">From After-Tax Price → Pre-Tax + Tax</SelectItem>
                        <SelectItem value="findTaxRate">Find Tax Rate from Pre-Tax & After-Tax Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Input Fields */}
                  <div className="space-y-6">
                    {calculationMode === "fromPreTax" && (
                      <>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Pre-Tax Price</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={preTaxPrice}
                              onChange={(e) => setPreTaxPrice(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                              placeholder="100.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Tax Rate (%)</Label>
                          <Input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                            className="h-12 text-lg border-2 focus:border-green-500"
                            placeholder="8.25"
                          />
                        </div>
                      </>
                    )}

                    {calculationMode === "fromAfterTax" && (
                      <>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">After-Tax Price</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={afterTaxPrice}
                              onChange={(e) => setAfterTaxPrice(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                              placeholder="108.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Tax Rate (%)</Label>
                          <Input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                            className="h-12 text-lg border-2 focus:border-green-500"
                            placeholder="8.25"
                          />
                        </div>
                      </>
                    )}

                    {calculationMode === "findTaxRate" && (
                      <>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Pre-Tax Price</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={preTaxPrice}
                              onChange={(e) => setPreTaxPrice(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                              placeholder="100.00"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">After-Tax Price</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={afterTaxPrice}
                              onChange={(e) => setAfterTaxPrice(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                              placeholder="108.00"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={calculateSalesTax}
                    className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-8"
                  >
                    Calculate Sales Tax
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Results</CardTitle>
                  <CardDescription className="text-base">Your sales tax calculation</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">Pre-Tax Price</span>
                          <span className="font-bold text-blue-600 text-xl">
                            $
                            {results.prePrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">Sales Tax</span>
                          <span className="font-bold text-orange-600 text-xl">
                            $
                            {results.tax.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">After-Tax Price</span>
                          <span className="font-bold text-green-600 text-xl">
                            $
                            {results.afterPrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        {results.rate !== undefined && (
                          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">Tax Rate</span>
                            <span className="font-bold text-purple-600 text-xl">{results.rate.toFixed(6)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your information to calculate sales tax</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Sales Tax Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Sales Tax Formulas</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. From Pre-Tax Price</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        <p>Tax = Pre-Price × (Rate / 100)</p>
                        <p>After Price = Pre-Price + Tax</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. From After-Tax Price</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        <p>Pre-Price = After Price / (1 + Rate / 100)</p>
                        <p>Tax = After Price - Pre-Price</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Find Tax Rate</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        <p>Rate = ((After Price / Pre Price) - 1) × 100</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Examples</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Example 1: Calculate Final Price</h3>
                      <p className="text-gray-700">Pre-tax price: $100, Tax rate: 8% → Tax: $8, Final price: $108</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Example 2: Reverse Tax Calculation</h3>
                      <p className="text-gray-700">
                        After-tax price: $108, Tax rate: 8% → Pre-tax price: $100, Tax: $8
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Example 3: Find Tax Rate</h3>
                      <p className="text-gray-700">Pre-tax: $100, After-tax: $108 → Tax rate: 8%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              <CalculatorGuide data={salesTaxData} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
