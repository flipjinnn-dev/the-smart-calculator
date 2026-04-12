"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw, Home, Percent, User, Heart } from "lucide-react"

export default function HomeReversionCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>("")
  const [outstandingMortgage, setOutstandingMortgage] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [shareToSell, setShareToSell] = useState<string>("40")
  const [healthStatus, setHealthStatus] = useState<string>("standard")
  const [result, setResult] = useState<{
    cashRelease: number
    netEquityRetained: number
    shareSoldPercent: number
    percentageOfMarketValue: number
  } | null>(null)

  const calculateReversion = () => {
    const propValue = parseFloat(propertyValue)
    const mortgage = parseFloat(outstandingMortgage) || 0
    const applicantAge = parseInt(age)
    const share = parseFloat(shareToSell)

    if (!propValue || propValue < 50000) {
      alert("Property value must be at least £50,000")
      return
    }

    if (!applicantAge || applicantAge < 65) {
      alert("Minimum age for home reversion is 65 years")
      return
    }

    if (!share || share < 20 || share > 100) {
      alert("Share to sell must be between 20% and 100%")
      return
    }

    // Calculate provider discount rate based on age and health
    let discountRate = 0.52 // Base discount for 70-year-old

    // Age adjustments
    if (applicantAge >= 80) {
      discountRate = 0.35 // Better rate for 80+
    } else if (applicantAge >= 75) {
      discountRate = 0.42 // Better rate for 75-79
    } else if (applicantAge >= 70) {
      discountRate = 0.52 // Standard rate for 70-74
    } else if (applicantAge >= 65) {
      discountRate = 0.62 // Higher discount for 65-69
    }

    // Health status adjustment
    if (healthStatus === "enhanced") {
      discountRate -= 0.08 // 8% better rate for enhanced health conditions
    }

    // Calculate market value of share being sold
    const marketValueOfShare = propValue * (share / 100)

    // Calculate cash received (market value minus provider discount)
    const cashReceived = marketValueOfShare * (1 - discountRate)

    // Calculate net equity retained
    const equityRetained = propValue * (1 - share / 100)

    // Calculate percentage of market value received
    const percentageReceived = ((1 - discountRate) * 100)

    setResult({
      cashRelease: Math.round(cashReceived - mortgage),
      netEquityRetained: Math.round(equityRetained),
      shareSoldPercent: share,
      percentageOfMarketValue: Math.round(percentageReceived * 10) / 10
    })
  }

  const resetCalculator = () => {
    setPropertyValue("")
    setOutstandingMortgage("")
    setAge("")
    setShareToSell("40")
    setHealthStatus("standard")
    setResult(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
        <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Calculator className="w-8 h-8" />
          Home Reversion Calculator
        </CardTitle>
        <p className="text-blue-100 mt-2">
          Estimate your equity release payout instantly
        </p>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="propertyValue" className="text-base font-semibold flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-600" />
              Property Value (£)
            </Label>
            <Input
              id="propertyValue"
              type="number"
              placeholder="e.g., 350000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="50000"
            />
            <p className="text-sm text-gray-600">Minimum £50,000</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="outstandingMortgage" className="text-base font-semibold flex items-center gap-2">
              <Home className="w-5 h-5 text-orange-600" />
              Outstanding Mortgage (£)
            </Label>
            <Input
              id="outstandingMortgage"
              type="number"
              placeholder="e.g., 0"
              value={outstandingMortgage}
              onChange={(e) => setOutstandingMortgage(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="0"
            />
            <p className="text-sm text-gray-600">Enter 0 if fully paid</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-base font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Age of Youngest Homeowner
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="e.g., 70"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="65"
              max="100"
            />
            <p className="text-sm text-gray-600">Minimum age is 65</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shareToSell" className="text-base font-semibold flex items-center gap-2">
              <Percent className="w-5 h-5 text-purple-600" />
              Share of Home to Sell (%)
            </Label>
            <Input
              id="shareToSell"
              type="number"
              placeholder="e.g., 40"
              value={shareToSell}
              onChange={(e) => setShareToSell(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="20"
              max="100"
            />
            <p className="text-sm text-gray-600">Between 20% and 100%</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="healthStatus" className="text-base font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              Health Status
            </Label>
            <select
              id="healthStatus"
              value={healthStatus}
              onChange={(e) => setHealthStatus(e.target.value)}
              className="w-full text-lg border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="standard">Standard Health</option>
              <option value="enhanced">Enhanced (Qualifying Medical Conditions)</option>
            </select>
            <p className="text-sm text-gray-600">
              Enhanced rates apply if you have diabetes, heart disease, or limited mobility
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={calculateReversion}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Payout
          </Button>
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="px-6 py-6 border-2 border-gray-300 hover:bg-gray-100"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Estimated Results</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <div className="text-sm text-gray-600 mb-1">Estimated Cash Release</div>
                <div className="text-3xl font-bold text-green-600">
                  £{result.cashRelease.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Tax-free lump sum</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <div className="text-sm text-gray-600 mb-1">Net Equity Retained</div>
                <div className="text-3xl font-bold text-blue-600">
                  £{result.netEquityRetained.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Remains in your estate</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <div className="text-sm text-gray-600 mb-1">Share Sold to Provider</div>
                <div className="text-3xl font-bold text-purple-600">
                  {result.shareSoldPercent}%
                </div>
                <div className="text-xs text-gray-500 mt-1">Of your property</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                <div className="text-sm text-gray-600 mb-1">% of Market Value Received</div>
                <div className="text-3xl font-bold text-orange-600">
                  {result.percentageOfMarketValue}%
                </div>
                <div className="text-xs text-gray-500 mt-1">Of the share sold</div>
              </div>
            </div>

            <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg mt-4">
              <p className="text-sm text-gray-800">
                <strong>Important:</strong> These figures are illustrative only. Actual offers depend on a formal property valuation, detailed health assessment, and provider terms. Always consult an FCA-regulated, Equity Release Council-registered adviser.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
