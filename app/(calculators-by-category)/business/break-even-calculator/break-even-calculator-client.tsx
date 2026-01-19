"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, DollarSign, Package, Info, BarChart3 } from "lucide-react"
import CalculatorGuide from "@/components/calculator-guide"

interface BreakEvenResult {
  breakEvenUnits: number
  breakEvenRevenue: number
  contributionMargin: number
  contributionMarginPercent: number
  isValid: boolean
  message?: string
  profitAtTarget?: number
}

export default function BreakEvenCalculatorClient({
  uiContent,
  guideData,
}: {
  uiContent?: any
  guideData?: any
}) {
  const [fixedCosts, setFixedCosts] = useState<string>("10000")
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>("40")
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>("60")
  const [targetUnits, setTargetUnits] = useState<string>("")
  const [result, setResult] = useState<BreakEvenResult | null>(null)

  const calculate = () => {
    const fc = parseFloat(fixedCosts)
    const vc = parseFloat(variableCostPerUnit)
    const sp = parseFloat(sellingPricePerUnit)

    if (isNaN(fc) || isNaN(vc) || isNaN(sp)) {
      setResult({
        breakEvenUnits: 0,
        breakEvenRevenue: 0,
        contributionMargin: 0,
        contributionMarginPercent: 0,
        isValid: false,
        message: uiContent?.errors?.invalidInput || "Please enter valid numbers for all fields"
      })
      return
    }

    if (fc < 0 || vc < 0 || sp < 0) {
      setResult({
        breakEvenUnits: 0,
        breakEvenRevenue: 0,
        contributionMargin: 0,
        contributionMarginPercent: 0,
        isValid: false,
        message: uiContent?.errors?.negativeValues || "All values must be positive"
      })
      return
    }

    if (sp <= vc) {
      setResult({
        breakEvenUnits: 0,
        breakEvenRevenue: 0,
        contributionMargin: 0,
        contributionMarginPercent: 0,
        isValid: false,
        message: uiContent?.errors?.priceTooLow || "Selling price must be greater than variable cost per unit. No break-even possible."
      })
      return
    }

    const contributionMargin = sp - vc
    const contributionMarginPercent = (contributionMargin / sp) * 100
    const breakEvenUnits = fc / contributionMargin
    const breakEvenRevenue = breakEvenUnits * sp

    let profitAtTarget = 0
    if (targetUnits) {
      const tu = parseFloat(targetUnits)
      if (!isNaN(tu) && tu > 0) {
        const totalRevenue = tu * sp
        const totalCosts = fc + (vc * tu)
        profitAtTarget = totalRevenue - totalCosts
      }
    }

    setResult({
      breakEvenUnits: Math.round(breakEvenUnits * 100) / 100,
      breakEvenRevenue: Math.round(breakEvenRevenue * 100) / 100,
      contributionMargin: Math.round(contributionMargin * 100) / 100,
      contributionMarginPercent: Math.round(contributionMarginPercent * 100) / 100,
      isValid: true,
      profitAtTarget: profitAtTarget
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-3xl mb-6 shadow-2xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            {uiContent?.title || "Break-Even Calculator"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {uiContent?.description || "Calculate the point where your total revenue equals total costs and find when your business becomes profitable"}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Cost Inputs */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm pt-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-white">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {uiContent?.cardTitles?.costs || "Cost Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">{uiContent?.labels?.fixedCosts || "Fixed Costs"} (€)</Label>
                  <Input
                    type="number"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(e.target.value)}
                    placeholder="10000"
                    className="text-lg h-12"
                  />
                  <p className="text-sm text-gray-600">{uiContent?.descriptions?.fixedCosts || "Costs that don't change with output (rent, salaries, etc.)"}</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{uiContent?.labels?.variableCostPerUnit || "Variable Cost per Unit"} (€)</Label>
                  <Input
                    type="number"
                    value={variableCostPerUnit}
                    onChange={(e) => setVariableCostPerUnit(e.target.value)}
                    placeholder="40"
                    className="text-lg h-12"
                  />
                  <p className="text-sm text-gray-600">{uiContent?.descriptions?.variableCostPerUnit || "Costs that change per product (materials, labor per unit)"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Inputs */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm pt-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-red-600 py-6 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {uiContent?.cardTitles?.pricing || "Pricing Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">{uiContent?.labels?.sellingPricePerUnit || "Selling Price per Unit"} (€)</Label>
                  <Input
                    type="number"
                    value={sellingPricePerUnit}
                    onChange={(e) => setSellingPricePerUnit(e.target.value)}
                    placeholder="60"
                    className="text-lg h-12"
                  />
                  <p className="text-sm text-gray-600">{uiContent?.descriptions?.sellingPricePerUnit || "Price at which you sell one unit"}</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{uiContent?.labels?.targetUnits || "Target Units"} ({uiContent?.labels?.optional || "Optional"})</Label>
                  <Input
                    type="number"
                    value={targetUnits}
                    onChange={(e) => setTargetUnits(e.target.value)}
                    placeholder="1000"
                    className="text-lg h-12"
                  />
                  <p className="text-sm text-gray-600">{uiContent?.descriptions?.targetUnits || "Calculate profit at a specific number of units"}</p>
                </div>
              </CardContent>
            </Card>

            <Button onClick={calculate} className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
              <Calculator className="w-5 h-5 mr-2" />
              {uiContent?.labels?.calculateButton || "Calculate Break-Even"}
            </Button>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8 space-y-6">
              {result ? (
                result.isValid ? (
                  <>
                    <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white">
                      <CardHeader className="py-6">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-6 h-6" />
                          {uiContent?.results?.title || "Break-Even Analysis"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm opacity-90 mb-2">{uiContent?.results?.breakEvenUnits || "Break-Even Units"}</p>
                          <p className="text-5xl font-bold">{result.breakEvenUnits.toLocaleString()}</p>
                          <p className="text-sm opacity-75 mt-1">{uiContent?.results?.unitsNeeded || "units needed"}</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4">
                          <p className="text-sm text-center mb-2">{uiContent?.results?.breakEvenRevenue || "Break-Even Revenue"}</p>
                          <p className="text-2xl font-bold text-center">€{result.breakEvenRevenue.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-xl border-0 overflow-hidden pt-0">
                      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-white">
                        <CardTitle className="flex items-center gap-2">
                          <Info className="w-5 h-5" />
                          {uiContent?.results?.details || "Details"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.contributionMargin || "Contribution Margin"}</span>
                          <span className="font-bold text-purple-600">€{result.contributionMargin.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-pink-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.contributionMarginPercent || "Margin %"}</span>
                          <span className="font-bold text-pink-600">{result.contributionMarginPercent.toFixed(2)}%</span>
                        </div>
                        {targetUnits && result.profitAtTarget !== undefined && (
                          <div className={`flex justify-between p-3 rounded-lg ${result.profitAtTarget >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                            <span className="font-semibold">{uiContent?.results?.profitAtTarget || `Profit at ${targetUnits} units`}</span>
                            <span className={`font-bold ${result.profitAtTarget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              €{result.profitAtTarget.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                          <div className="text-sm space-y-2">
                            <p className="font-bold text-purple-900">{uiContent?.results?.notesTitle || "Key Insights"}</p>
                            <ul className="space-y-1 text-gray-700">
                              <li>✓ {uiContent?.results?.note1 || `You need to sell ${result.breakEvenUnits.toLocaleString()} units to break even`}</li>
                              <li>✓ {uiContent?.results?.note2 || `Each unit contributes €${result.contributionMargin} towards fixed costs`}</li>
                              <li>✓ {uiContent?.results?.note3 || `After break-even, each unit adds €${result.contributionMargin} to profit`}</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="shadow-xl bg-red-50 border-red-200">
                    <CardContent className="p-8 text-center">
                      <Info className="w-16 h-16 mx-auto mb-4 text-red-600" />
                      <h3 className="text-xl font-bold mb-2 text-red-900">{uiContent?.errors?.title || "Cannot Calculate"}</h3>
                      <p className="text-red-700">{result.message}</p>
                    </CardContent>
                  </Card>
                )
              ) : (
                <Card className="shadow-xl">
                  <CardContent className="p-12 text-center">
                    <Calculator className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                    <h3 className="text-xl font-bold mb-2">{uiContent?.results?.readyTitle || "Ready to Calculate?"}</h3>
                    <p className="text-gray-600">{uiContent?.results?.readyDesc || "Enter your costs and pricing, then click calculate"}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {guideData?.sections?.length > 0 && (
          <div className="mt-16">
            <CalculatorGuide data={guideData} />
          </div>
        )}
      </div>
    </div>
  )
}
