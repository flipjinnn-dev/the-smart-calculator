"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, Package, TrendingUp } from "lucide-react"

export default function WhatnotFeeCalculator() {
  const [region, setRegion] = useState<string>("us")
  const [category, setCategory] = useState<string>("standard")
  const [salePrice, setSalePrice] = useState<string>("")
  const [shippingCost, setShippingCost] = useState<string>("")
  const [salesTaxRate, setSalesTaxRate] = useState<string>("0")
  
  const [result, setResult] = useState<{
    commissionFee: number
    processingFee: number
    totalFees: number
    netPayout: number
    totalOrderValue: number
    salesTax: number
    commissionRate: string
    processingRate: string
  } | null>(null)

  const VAT_RATE = 0.20 // 20% VAT for UK/EU

  const calculateFees = () => {
    const price = parseFloat(salePrice)
    const shipping = parseFloat(shippingCost) || 0
    const taxRate = parseFloat(salesTaxRate) || 0

    if (!price || price <= 0) {
      alert("Please enter a valid sale price")
      return
    }

    let commissionFee = 0
    let commissionRateText = ""
    let processingFee = 0
    let processingRateText = ""

    // Calculate sales tax
    const salesTax = (price + shipping) * (taxRate / 100)
    const totalOrderValue = price + shipping + salesTax

    if (region === "us") {
      // US/Canada/Australia rates
      if (category === "standard") {
        // 8% commission, with $1,500 threshold for high-value collectibles
        if (price <= 1500) {
          commissionFee = price * 0.08
          commissionRateText = "8%"
        } else {
          commissionFee = 1500 * 0.08 // Only first $1,500
          commissionRateText = "8% on first $1,500, then 0%"
        }
      } else if (category === "electronics") {
        commissionFee = price * 0.05
        commissionRateText = "5%"
      } else if (category === "coins") {
        if (price <= 1500) {
          commissionFee = price * 0.04
          commissionRateText = "4%"
        } else {
          commissionFee = 1500 * 0.04
          commissionRateText = "4% on first $1,500, then 0%"
        }
      }

      // Processing fee: 2.9% + $0.30
      processingFee = totalOrderValue * 0.029 + 0.30
      processingRateText = "2.9% + $0.30"

    } else {
      // UK/EU rates
      if (category === "standard") {
        const baseCommission = price * 0.0667
        const commissionVAT = baseCommission * VAT_RATE
        commissionFee = baseCommission + commissionVAT
        commissionRateText = "6.67% + VAT"
      } else if (category === "electronics") {
        const baseCommission = price * 0.0667
        const commissionVAT = baseCommission * VAT_RATE
        commissionFee = baseCommission + commissionVAT
        commissionRateText = "6.67% + VAT"
      } else if (category === "coins") {
        const baseCommission = price * 0.04
        const commissionVAT = baseCommission * VAT_RATE
        commissionFee = baseCommission + commissionVAT
        commissionRateText = "4% + VAT"
      }

      // Processing fee: 2.42% + VAT + £0.25 + VAT
      const baseProcessing = totalOrderValue * 0.0242
      const processingVAT = baseProcessing * VAT_RATE
      const fixedFee = 0.25
      const fixedFeeVAT = fixedFee * VAT_RATE
      processingFee = baseProcessing + processingVAT + fixedFee + fixedFeeVAT
      processingRateText = "2.42% + VAT + £0.25 + VAT"
    }

    const totalFees = commissionFee + processingFee
    const netPayout = price - totalFees

    setResult({
      commissionFee: Math.round(commissionFee * 100) / 100,
      processingFee: Math.round(processingFee * 100) / 100,
      totalFees: Math.round(totalFees * 100) / 100,
      netPayout: Math.round(netPayout * 100) / 100,
      totalOrderValue: Math.round(totalOrderValue * 100) / 100,
      salesTax: Math.round(salesTax * 100) / 100,
      commissionRate: commissionRateText,
      processingRate: processingRateText,
    })
  }

  const resetCalculator = () => {
    setSalePrice("")
    setShippingCost("")
    setSalesTaxRate("0")
    setResult(null)
  }

  const currencySymbol = region === "us" ? "$" : "£"

  return (
    <div className="space-y-6">
      {/* Region Selection */}
      <div className="space-y-3">
        <Label htmlFor="region" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          Select Your Region <span className="text-red-600">*</span>
        </Label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger id="region" className="text-lg h-14 border-2 border-gray-300 hover:border-blue-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us" className="text-base py-3">US / Canada / Australia</SelectItem>
            <SelectItem value="uk" className="text-base py-3">UK / Europe</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-600">
          Fee rates differ significantly by location. US/Canada/Australia: 8% + 2.9% + $0.30. UK/EU: 6.67% + VAT + 2.42% + VAT + £0.25.
        </p>
      </div>

      {/* Category Selection */}
      <div className="space-y-3">
        <Label htmlFor="category" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Product Category <span className="text-red-600">*</span>
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="text-lg h-14 border-2 border-gray-300 hover:border-purple-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard" className="text-base py-3">
              Standard ({region === "us" ? "8%" : "6.67% + VAT"}) - Clothing, Collectibles, etc.
            </SelectItem>
            <SelectItem value="electronics" className="text-base py-3">
              Electronics ({region === "us" ? "5%" : "6.67% + VAT"})
            </SelectItem>
            <SelectItem value="coins" className="text-base py-3">
              Coins & Money (4{region === "us" ? "%" : "% + VAT"})
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-600">
          Different categories have different commission rates. High-value items over $1,500 may qualify for 0% commission above that threshold.
        </p>
      </div>

      {/* Sale Price */}
      <div className="space-y-3">
        <Label htmlFor="salePrice" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Sale Price <span className="text-red-600">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-bold text-gray-700">{currencySymbol}</span>
          <Input
            id="salePrice"
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="e.g., 100"
            className="text-lg h-12 border-2 border-gray-300 focus:border-green-500"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-sm text-gray-600">
          Enter the final sale price of your item (not including shipping or taxes).
        </p>
      </div>

      {/* Shipping Cost */}
      <div className="space-y-3">
        <Label htmlFor="shipping" className="text-lg font-bold text-gray-900">
          Shipping Cost (Buyer Pays)
        </Label>
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-bold text-gray-700">{currencySymbol}</span>
          <Input
            id="shipping"
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            placeholder="e.g., 9.21"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-sm text-gray-600">
          Even though the buyer pays shipping, it increases the total order value and affects your processing fee.
        </p>
      </div>

      {/* Sales Tax Rate */}
      <div className="space-y-3">
        <Label htmlFor="taxRate" className="text-lg font-bold text-gray-900">
          Sales Tax Rate (Optional)
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="taxRate"
            type="number"
            value={salesTaxRate}
            onChange={(e) => setSalesTaxRate(e.target.value)}
            placeholder="e.g., 8.5"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
            min="0"
            max="100"
            step="0.1"
          />
          <span className="text-gray-700 font-semibold whitespace-nowrap">%</span>
        </div>
        <p className="text-sm text-gray-600">
          Whatnot collects and remits sales tax automatically, but it affects the processing fee calculation.
        </p>
      </div>

      {/* Formula Display */}
      <div className="p-5 bg-blue-50 border-2 border-blue-300 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-3">Fee Structure:</h4>
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Commission:</strong> {region === "us" ? "8% (Standard), 5% (Electronics), 4% (Coins)" : "6.67% + VAT (Standard), 4% + VAT (Coins)"}</p>
          <p><strong>Processing:</strong> {region === "us" ? "2.9% + $0.30 on total order value" : "2.42% + VAT + £0.25 + VAT on total order value"}</p>
          <p className="text-xs text-gray-600 mt-3">
            Total order value = Sale price + Shipping + Sales tax
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={calculateFees}
          size="lg"
          className="flex-1 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Fees
        </Button>
        <Button
          onClick={resetCalculator}
          size="lg"
          variant="outline"
          className="text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
        >
          Reset
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-green-600" />
            Fee Breakdown
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Commission Fee</div>
              <div className="text-4xl font-bold text-blue-600">{currencySymbol}{result.commissionFee.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">{result.commissionRate}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Processing Fee</div>
              <div className="text-4xl font-bold text-purple-600">{currencySymbol}{result.processingFee.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">{result.processingRate}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-red-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Total Fees</div>
              <div className="text-4xl font-bold text-red-600">{currencySymbol}{result.totalFees.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">Commission + Processing</div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Your Net Payout</div>
              <div className="text-4xl font-bold text-green-600">{currencySymbol}{result.netPayout.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">What you take home</div>
            </div>
          </div>

          {/* Calculation Details */}
          <div className="bg-white border-2 border-green-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Calculation Details:</h4>
            <div className="space-y-2 text-gray-700">
              <p>• <strong>Sale Price:</strong> {currencySymbol}{parseFloat(salePrice).toFixed(2)}</p>
              <p>• <strong>Shipping Cost:</strong> {currencySymbol}{(parseFloat(shippingCost) || 0).toFixed(2)}</p>
              {result.salesTax > 0 && (
                <p>• <strong>Sales Tax ({salesTaxRate}%):</strong> {currencySymbol}{result.salesTax.toFixed(2)}</p>
              )}
              <p>• <strong>Total Order Value:</strong> {currencySymbol}{result.totalOrderValue.toFixed(2)}</p>
              <p className="pt-2 border-t-2 border-gray-200">• <strong>Commission Fee:</strong> -{currencySymbol}{result.commissionFee.toFixed(2)}</p>
              <p>• <strong>Processing Fee:</strong> -{currencySymbol}{result.processingFee.toFixed(2)}</p>
              <p className="pt-2 border-t-2 border-gray-200 text-lg"><strong>Net Payout:</strong> {currencySymbol}{result.netPayout.toFixed(2)}</p>
            </div>
          </div>

          {/* Profit Margin */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">💡 Profit Analysis:</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Fee Percentage:</strong> {((result.totalFees / parseFloat(salePrice)) * 100).toFixed(2)}% of your sale price
              </p>
              <p>
                <strong>You Keep:</strong> {((result.netPayout / parseFloat(salePrice)) * 100).toFixed(2)}% of your sale price
              </p>
              {parseFloat(salePrice) > 1500 && (category === "standard" || category === "coins") && (
                <p className="text-green-700 font-semibold">
                  ✓ This item qualifies for 0% commission above $1,500 (promotional offer - verify current eligibility)
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
