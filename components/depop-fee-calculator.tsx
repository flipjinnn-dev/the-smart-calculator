"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, Package, TrendingUp, Zap } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function DepopFeeCalculator() {
  const [region, setRegion] = useState<string>("us")
  const [sellingPrice, setSellingPrice] = useState<string>("")
  const [buyerShipping, setBuyerShipping] = useState<string>("")
  const [itemCost, setItemCost] = useState<string>("")
  const [shippingCost, setShippingCost] = useState<string>("")
  const [shippingMethod, setShippingMethod] = useState<string>("self")
  const [boosted, setBoosted] = useState<boolean>(false)
  
  const [result, setResult] = useState<{
    sellingFee: number
    processingFee: number
    boostFee: number
    totalFees: number
    payout: number
    netProfit: number
    profitMargin: number
    totalTransaction: number
    processingRate: string
    sellingFeeRate: string
    boostFeeRate: string
  } | null>(null)

  const calculateFees = () => {
    const price = parseFloat(sellingPrice)
    const shipping = parseFloat(buyerShipping) || 0
    const cost = parseFloat(itemCost) || 0
    const shippingExpense = parseFloat(shippingCost) || 0

    if (!price || price <= 0) {
      alert("Please enter a valid selling price")
      return
    }

    let sellingFee = 0
    let sellingFeeRate = ""
    let processingFee = 0
    let processingRate = ""
    let boostFee = 0
    let boostFeeRate = ""

    // Total transaction = item price + buyer shipping
    const totalTransaction = price + shipping

    if (region === "us") {
      // US: 0% selling fee, 3.3% + $0.45 processing
      sellingFee = 0
      sellingFeeRate = "0%"
      processingFee = totalTransaction * 0.033 + 0.45
      processingRate = "3.3% + $0.45"

      // Boost fee: 8% on item price (or item + shipping if self-arranged)
      if (boosted) {
        const boostBase = shippingMethod === "depop" ? price : totalTransaction
        boostFee = boostBase * 0.08
        boostFeeRate = "8%"
      }

    } else if (region === "uk") {
      // UK: 0% selling fee, 2.9% + £0.30 processing
      sellingFee = 0
      sellingFeeRate = "0%"
      processingFee = totalTransaction * 0.029 + 0.30
      processingRate = "2.9% + £0.30"

      // Boost fee: 12% on item price (or item + shipping if self-arranged)
      if (boosted) {
        const boostBase = shippingMethod === "depop" ? price : totalTransaction
        boostFee = boostBase * 0.12
        boostFeeRate = "12%"
      }

    } else if (region === "au") {
      // Australia: 10% selling fee, 2.6% + A$0.30 processing
      sellingFee = totalTransaction * 0.10
      sellingFeeRate = "10%"
      processingFee = totalTransaction * 0.026 + 0.30
      processingRate = "2.6% + A$0.30"

      // Boost fee: 8% on item price (or item + shipping if self-arranged)
      if (boosted) {
        const boostBase = shippingMethod === "depop" ? price : totalTransaction
        boostFee = boostBase * 0.08
        boostFeeRate = "8%"
      }

    } else {
      // International: 10% selling fee, varies by PayPal
      sellingFee = totalTransaction * 0.10
      sellingFeeRate = "10%"
      processingFee = totalTransaction * 0.034 + 0.30
      processingRate = "~3.4% + $0.30"

      // Boost fee: 8% on item price (or item + shipping if self-arranged)
      if (boosted) {
        const boostBase = shippingMethod === "depop" ? price : totalTransaction
        boostFee = boostBase * 0.08
        boostFeeRate = "8%"
      }
    }

    const totalFees = sellingFee + processingFee + boostFee
    const payout = price - totalFees
    const netProfit = payout - cost - shippingExpense
    const profitMargin = price > 0 ? (netProfit / price) * 100 : 0

    setResult({
      sellingFee: Math.round(sellingFee * 100) / 100,
      processingFee: Math.round(processingFee * 100) / 100,
      boostFee: Math.round(boostFee * 100) / 100,
      totalFees: Math.round(totalFees * 100) / 100,
      payout: Math.round(payout * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      profitMargin: Math.round(profitMargin * 10) / 10,
      totalTransaction: Math.round(totalTransaction * 100) / 100,
      processingRate,
      sellingFeeRate,
      boostFeeRate,
    })
  }

  const resetCalculator = () => {
    setSellingPrice("")
    setBuyerShipping("")
    setItemCost("")
    setShippingCost("")
    setBoosted(false)
    setResult(null)
  }

  const currencySymbol = region === "us" ? "$" : region === "uk" ? "£" : region === "au" ? "A$" : "$"

  const getMarginColor = (margin: number) => {
    if (margin >= 50) return "text-green-600"
    if (margin >= 40) return "text-blue-600"
    if (margin >= 30) return "text-yellow-600"
    if (margin >= 20) return "text-orange-600"
    return "text-red-600"
  }

  const getMarginLabel = (margin: number) => {
    if (margin >= 50) return "Excellent"
    if (margin >= 40) return "Good"
    if (margin >= 30) return "Fair"
    if (margin >= 20) return "Low"
    return "Very Low"
  }

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
            <SelectItem value="us" className="text-base py-3">United States (0% selling fee)</SelectItem>
            <SelectItem value="uk" className="text-base py-3">United Kingdom (0% selling fee)</SelectItem>
            <SelectItem value="au" className="text-base py-3">Australia (10% selling fee)</SelectItem>
            <SelectItem value="international" className="text-base py-3">International (10% selling fee)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-600">
          {region === "us" || region === "uk" 
            ? "US and UK sellers pay 0% selling fee — only payment processing applies!"
            : "International sellers pay 10% selling fee + processing fees."}
        </p>
      </div>

      {/* Selling Price */}
      <div className="space-y-3">
        <Label htmlFor="sellingPrice" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Selling Price <span className="text-red-600">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-bold text-gray-700">{currencySymbol}</span>
          <Input
            id="sellingPrice"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="e.g., 40"
            className="text-lg h-12 border-2 border-gray-300 focus:border-green-500"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-sm text-gray-600">
          The price you plan to list the item at (not including shipping).
        </p>
      </div>

      {/* Buyer Shipping */}
      <div className="space-y-3">
        <Label htmlFor="buyerShipping" className="text-lg font-bold text-gray-900">
          Buyer Shipping Cost
        </Label>
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-bold text-gray-700">{currencySymbol}</span>
          <Input
            id="buyerShipping"
            type="number"
            value={buyerShipping}
            onChange={(e) => setBuyerShipping(e.target.value)}
            placeholder="e.g., 6"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-sm text-gray-600">
          What the buyer pays for shipping. Fees are calculated on item price + shipping.
        </p>
      </div>

      {/* Item Cost */}
      <div className="space-y-3">
        <Label htmlFor="itemCost" className="text-lg font-bold text-gray-900">
          Your Item Cost (Optional)
        </Label>
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-bold text-gray-700">{currencySymbol}</span>
          <Input
            id="itemCost"
            type="number"
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
            placeholder="e.g., 10"
            className="text-lg h-12 border-2 border-gray-300 focus:border-purple-500"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-sm text-gray-600">
          What you originally paid for the item (for profit calculation).
        </p>
      </div>

      {/* Shipping Cost */}
      <div className="space-y-3">
        <Label htmlFor="shippingCost" className="text-lg font-bold text-gray-900">
          Your Shipping Cost (Optional)
        </Label>
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-bold text-gray-700">{currencySymbol}</span>
          <Input
            id="shippingCost"
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            placeholder="e.g., 5"
            className="text-lg h-12 border-2 border-gray-300 focus:border-orange-500"
            min="0"
            step="0.01"
          />
        </div>
        <p className="text-sm text-gray-600">
          What it actually costs you to ship the item.
        </p>
      </div>

      {/* Shipping Method */}
      <div className="space-y-3">
        <Label htmlFor="shippingMethod" className="text-lg font-bold text-gray-900">
          Shipping Method
        </Label>
        <Select value={shippingMethod} onValueChange={setShippingMethod}>
          <SelectTrigger id="shippingMethod" className="text-lg h-14 border-2 border-gray-300 hover:border-blue-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="depop" className="text-base py-3">Depop Label (excludes shipping from boost fee)</SelectItem>
            <SelectItem value="self" className="text-base py-3">Self-Arranged (includes shipping in boost fee)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-600">
          Using Depop labels saves money on boosted listing fees.
        </p>
      </div>

      {/* Boosted Listing */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
          <Checkbox 
            id="boosted" 
            checked={boosted}
            onCheckedChange={(checked) => setBoosted(checked as boolean)}
            className="w-6 h-6"
          />
          <div className="flex-1">
            <Label htmlFor="boosted" className="text-lg font-bold text-gray-900 cursor-pointer flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Boosted Listing
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              {region === "uk" ? "12% fee" : "8% fee"} on item price. Only charged if the item sells via the boosted tile within 28 days.
            </p>
          </div>
        </div>
      </div>

      {/* Formula Display */}
      <div className="p-5 bg-blue-50 border-2 border-blue-300 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-3">Fee Structure:</h4>
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Selling Fee:</strong> {region === "us" || region === "uk" ? "0%" : "10%"}</p>
          <p><strong>Processing Fee:</strong> {
            region === "us" ? "3.3% + $0.45" :
            region === "uk" ? "2.9% + £0.30" :
            region === "au" ? "2.6% + A$0.30" :
            "~3.4% + $0.30"
          }</p>
          {boosted && (
            <p><strong>Boost Fee:</strong> {region === "uk" ? "12%" : "8%"} (on {shippingMethod === "depop" ? "item price only" : "item + shipping"})</p>
          )}
          <p className="text-xs text-gray-600 mt-3">
            Fees calculated on: Item price + Buyer shipping
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
            {result.sellingFee > 0 && (
              <div className="bg-white p-6 rounded-xl border-2 border-red-200 shadow-sm">
                <div className="text-sm text-gray-600 mb-2">Selling Fee</div>
                <div className="text-4xl font-bold text-red-600">{currencySymbol}{result.sellingFee.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-2">{result.sellingFeeRate}</div>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Processing Fee</div>
              <div className="text-4xl font-bold text-blue-600">{currencySymbol}{result.processingFee.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">{result.processingRate}</div>
            </div>

            {result.boostFee > 0 && (
              <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-sm">
                <div className="text-sm text-gray-600 mb-2">Boost Fee</div>
                <div className="text-4xl font-bold text-purple-600">{currencySymbol}{result.boostFee.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-2">{result.boostFeeRate}</div>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Total Fees</div>
              <div className="text-4xl font-bold text-orange-600">{currencySymbol}{result.totalFees.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">All fees combined</div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Your Payout</div>
              <div className="text-4xl font-bold text-green-600">{currencySymbol}{result.payout.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-2">After Depop fees</div>
            </div>

            {(parseFloat(itemCost) > 0 || parseFloat(shippingCost) > 0) && (
              <div className={`bg-gradient-to-br ${result.netProfit >= 0 ? 'from-teal-100 to-cyan-100 border-teal-300' : 'from-red-100 to-pink-100 border-red-300'} p-6 rounded-xl border-2 shadow-sm`}>
                <div className="text-sm text-gray-600 mb-2">Net Profit</div>
                <div className={`text-4xl font-bold ${result.netProfit >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
                  {currencySymbol}{result.netProfit.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mt-2">After all costs</div>
              </div>
            )}
          </div>

          {/* Calculation Details */}
          <div className="bg-white border-2 border-green-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Calculation Details:</h4>
            <div className="space-y-2 text-gray-700">
              <p>• <strong>Selling Price:</strong> {currencySymbol}{parseFloat(sellingPrice).toFixed(2)}</p>
              <p>• <strong>Buyer Shipping:</strong> {currencySymbol}{(parseFloat(buyerShipping) || 0).toFixed(2)}</p>
              <p>• <strong>Total Transaction:</strong> {currencySymbol}{result.totalTransaction.toFixed(2)}</p>
              <p className="pt-2 border-t-2 border-gray-200">• <strong>Selling Fee:</strong> -{currencySymbol}{result.sellingFee.toFixed(2)}</p>
              <p>• <strong>Processing Fee:</strong> -{currencySymbol}{result.processingFee.toFixed(2)}</p>
              {result.boostFee > 0 && (
                <p>• <strong>Boost Fee:</strong> -{currencySymbol}{result.boostFee.toFixed(2)}</p>
              )}
              <p className="pt-2 border-t-2 border-gray-200 text-lg"><strong>Payout:</strong> {currencySymbol}{result.payout.toFixed(2)}</p>
              {(parseFloat(itemCost) > 0 || parseFloat(shippingCost) > 0) && (
                <>
                  <p>• <strong>Item Cost:</strong> -{currencySymbol}{(parseFloat(itemCost) || 0).toFixed(2)}</p>
                  <p>• <strong>Shipping Cost:</strong> -{currencySymbol}{(parseFloat(shippingCost) || 0).toFixed(2)}</p>
                  <p className="pt-2 border-t-2 border-gray-200 text-lg"><strong>Net Profit:</strong> {currencySymbol}{result.netProfit.toFixed(2)}</p>
                </>
              )}
            </div>
          </div>

          {/* Profit Margin */}
          {(parseFloat(itemCost) > 0 || parseFloat(shippingCost) > 0) && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-5">
              <h4 className="font-bold text-gray-900 mb-2">💡 Profit Analysis:</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Profit Margin:</strong> <span className={`text-2xl font-bold ${getMarginColor(result.profitMargin)}`}>
                    {result.profitMargin.toFixed(1)}%
                  </span> <span className={`ml-2 font-semibold ${getMarginColor(result.profitMargin)}`}>
                    ({getMarginLabel(result.profitMargin)})
                  </span>
                </p>
                <p>
                  <strong>Fee Percentage:</strong> {((result.totalFees / parseFloat(sellingPrice)) * 100).toFixed(2)}% of your selling price
                </p>
                {result.profitMargin < 40 && (
                  <p className="text-orange-700 font-semibold mt-3">
                    ⚠️ Consider pricing higher — most successful Depop sellers aim for 40-60% margins.
                  </p>
                )}
                {result.profitMargin >= 40 && (
                  <p className="text-green-700 font-semibold mt-3">
                    ✓ Great margin! This pricing leaves you with healthy profit.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
