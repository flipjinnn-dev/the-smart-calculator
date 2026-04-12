"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, DollarSign, Eye, TrendingDown, RotateCcw } from "lucide-react"

export default function CPVCalculator() {
  const [adSpend, setAdSpend] = useState<string>("")
  const [views, setViews] = useState<string>("")
  const [result, setResult] = useState<null | {
    cpv: number
    formattedCPV: string
    totalSpend: number
    totalViews: number
    costPer1000Views: number
  }>(null)

  const calculate = () => {
    const spend = parseFloat(adSpend)
    const viewCount = parseFloat(views)

    if (isNaN(spend) || isNaN(viewCount) || viewCount === 0) {
      alert("Please enter valid numbers for both fields")
      return
    }

    if (spend < 0 || viewCount < 0) {
      alert("Values cannot be negative")
      return
    }

    const cpvValue = spend / viewCount
    const costPer1000 = cpvValue * 1000

    setResult({
      cpv: cpvValue,
      formattedCPV: cpvValue.toFixed(4),
      totalSpend: spend,
      totalViews: viewCount,
      costPer1000Views: costPer1000
    })
  }

  const reset = () => {
    setAdSpend("")
    setViews("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="w-6 h-6 text-blue-600" />
            CPV Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Input Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="adSpend" className="text-base font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Total Ad Spend ($)
              </Label>
              <Input
                id="adSpend"
                type="number"
                placeholder="e.g., 1000"
                value={adSpend}
                onChange={(e) => setAdSpend(e.target.value)}
                className="text-lg border-2 focus:border-blue-400"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="views" className="text-base font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-600" />
                Total Views
              </Label>
              <Input
                id="views"
                type="number"
                placeholder="e.g., 25000"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                className="text-lg border-2 focus:border-blue-400"
                min="0"
                step="1"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={calculate}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-lg font-semibold"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate CPV
            </Button>
            <Button 
              onClick={reset}
              variant="outline"
              className="px-6 py-6 border-2"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">Your Cost Per View (CPV)</div>
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    ${result.formattedCPV}
                  </div>
                  <div className="text-sm text-gray-600">
                    per view
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border-2 border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <div className="text-sm text-gray-600">Total Spend</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${result.totalSpend.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-purple-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {result.totalViews.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-orange-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-orange-600" />
                    <div className="text-sm text-gray-600">Cost per 1,000 Views</div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    ${result.costPer1000Views.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Performance Indicator */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5">
                <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                  Performance Analysis
                </div>
                <div className="text-sm text-gray-700">
                  {result.cpv < 0.05 && (
                    <span className="text-green-600 font-semibold">✓ Excellent CPV! You're getting views at a very low cost.</span>
                  )}
                  {result.cpv >= 0.05 && result.cpv <= 0.10 && (
                    <span className="text-blue-600 font-semibold">✓ Good CPV! This is within the healthy average range for most campaigns.</span>
                  )}
                  {result.cpv > 0.10 && result.cpv <= 0.20 && (
                    <span className="text-orange-600 font-semibold">⚠ Average CPV. Look for optimization opportunities to reduce costs.</span>
                  )}
                  {result.cpv > 0.20 && (
                    <span className="text-red-600 font-semibold">⚠ High CPV. Consider auditing your targeting, ad creative, and bidding strategy.</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
