"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, TrendingDown, TrendingUp } from "lucide-react"

export default function GrailedFeeCalculator() {
  const [salePrice, setSalePrice] = useState<string>("")
  const [shippingCost, setShippingCost] = useState<string>("")
  const [sellerStatus, setSellerStatus] = useState<string>("onboarded")
  const [transactionType, setTransactionType] = useState<string>("domestic")
  const [result, setResult] = useState<null | {
    salePrice: number
    shippingCost: number
    grailedCommission: number
    processingFee: number
    totalFees: number
    payout: number
    effectiveFeePercentage: number
  }>(null)

  const getProcessingFeeRate = (status: string, type: string) => {
    if (status === "onboarded") {
      return type === "domestic" 
        ? { percentage: 0.0349, fixed: 0.49 }
        : { percentage: 0.0499, fixed: 0.49 }
    } else if (status === "not-onboarded") {
      return type === "domestic"
        ? { percentage: 0.0349, fixed: 0.99 }
        : { percentage: 0.0499, fixed: 0.99 }
    } else {
      return { percentage: 0.055, fixed: 0.99 }
    }
  }

  const calculateFees = () => {
    const salePriceNum = parseFloat(salePrice)
    const shippingNum = parseFloat(shippingCost) || 0

    if (!salePriceNum || salePriceNum <= 0) {
      alert("Please enter a valid sale price")
      return
    }

    const grailedCommission = salePriceNum * 0.09
    const totalTransaction = salePriceNum + shippingNum
    const processingRate = getProcessingFeeRate(sellerStatus, transactionType)
    const processingFee = (totalTransaction * processingRate.percentage) + processingRate.fixed
    const totalFees = grailedCommission + processingFee
    const payout = totalTransaction - totalFees
    const effectiveFeePercentage = (totalFees / salePriceNum) * 100

    setResult({
      salePrice: salePriceNum,
      shippingCost: shippingNum,
      grailedCommission,
      processingFee,
      totalFees,
      payout,
      effectiveFeePercentage,
    })
  }

  const resetCalculator = () => {
    setSalePrice("")
    setShippingCost("")
    setSellerStatus("onboarded")
    setTransactionType("domestic")
    setResult(null)
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="space-y-6 bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-7 h-7 text-blue-600" />
          Calculate Your Grailed Fees
        </h3>

        {/* Sale Price */}
        <div className="space-y-3">
          <Label htmlFor="salePrice" className="text-lg font-bold text-gray-900">
            Item Sale Price ($) <span className="text-red-600">*</span>
          </Label>
          <Input
            id="salePrice"
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="e.g., 250"
            min="0"
            step="0.01"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
          />
          <p className="text-sm text-gray-600">
            The price the buyer pays for the item (excluding shipping)
          </p>
        </div>

        {/* Shipping Cost */}
        <div className="space-y-3">
          <Label htmlFor="shippingCost" className="text-lg font-bold text-gray-900">
            Shipping Cost ($)
          </Label>
          <Input
            id="shippingCost"
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            placeholder="e.g., 12"
            min="0"
            step="0.01"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
          />
          <p className="text-sm text-gray-600">
            Optional: Amount you charge for shipping
          </p>
        </div>

        {/* Seller Status */}
        <div className="space-y-3">
          <Label htmlFor="sellerStatus" className="text-lg font-bold text-gray-900">
            Stripe Seller Status
          </Label>
          <Select value={sellerStatus} onValueChange={setSellerStatus}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="onboarded">Stripe Onboarded (Recommended)</SelectItem>
              <SelectItem value="not-onboarded">Eligible but Not Onboarded</SelectItem>
              <SelectItem value="non-eligible">Non-Stripe Country</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600">
            Check your Grailed account settings for your Stripe status
          </p>
        </div>

        {/* Transaction Type */}
        <div className="space-y-3">
          <Label htmlFor="transactionType" className="text-lg font-bold text-gray-900">
            Transaction Type
          </Label>
          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="domestic">Domestic (US)</SelectItem>
              <SelectItem value="international">International</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={calculateFees}
            size="lg"
            className="flex-1 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
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
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Payout Card */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Your Estimated Payout</h3>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">${result.payout.toFixed(2)}</div>
              <div className="text-xl opacity-90">Net earnings after all fees</div>
            </div>
          </div>

          {/* Fee Breakdown Card */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-red-600" />
              Fee Breakdown
            </h4>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Item Sale Price:</span>
                <span className="text-lg font-bold text-blue-600">${result.salePrice.toFixed(2)}</span>
              </div>
              {result.shippingCost > 0 && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Shipping Collected:</span>
                  <span className="text-lg font-bold text-blue-600">${result.shippingCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-2 border-red-200">
                <span className="font-semibold">Grailed Commission (9%):</span>
                <span className="text-lg font-bold text-red-600">-${result.grailedCommission.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-2 border-red-200">
                <span className="font-semibold">Payment Processing Fee:</span>
                <span className="text-lg font-bold text-red-600">-${result.processingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-2 border-orange-300">
                <span className="font-semibold">Total Fees:</span>
                <span className="text-lg font-bold text-orange-600">-${result.totalFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-300">
                <span className="font-semibold">Effective Fee Rate:</span>
                <span className="text-lg font-bold text-green-600">{result.effectiveFeePercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Payout Timeline */}
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Payout Timeline:</strong> You will receive ${result.payout.toFixed(2)} directly to your linked bank account (via Stripe) usually within <strong>3 calendar days</strong> after delivery confirmation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
