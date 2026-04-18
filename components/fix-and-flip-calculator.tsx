"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Home, TrendingUp, DollarSign, Info } from "lucide-react"

export default function FixAndFlipCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>("")
  const [arv, setArv] = useState<string>("")
  const [rehabCosts, setRehabCosts] = useState<string>("")
  const [loanAmount, setLoanAmount] = useState<string>("")
  const [interestRate, setInterestRate] = useState<string>("")
  const [loanPoints, setLoanPoints] = useState<string>("")
  const [holdingMonths, setHoldingMonths] = useState<string>("")
  const [monthlyHoldingCosts, setMonthlyHoldingCosts] = useState<string>("")
  const [sellingCostsPercent, setSellingCostsPercent] = useState<string>("8")
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20")
  
  const [result, setResult] = useState<null | {
    grossProfit: number
    financingCosts: number
    totalHoldingCosts: number
    sellingCosts: number
    netProfit: number
    totalCashInvested: number
    roi: number
    cashOnCashReturn: number
    maxAllowableOffer: number
    meetsSeventyRule: boolean
  }>(null)

  const calculateDeal = () => {
    const purchase = parseFloat(purchasePrice)
    const afterRepairValue = parseFloat(arv)
    const rehab = parseFloat(rehabCosts)
    const loan = parseFloat(loanAmount) || 0
    const rate = parseFloat(interestRate) || 0
    const points = parseFloat(loanPoints) || 0
    const months = parseFloat(holdingMonths) || 0
    const monthlyHolding = parseFloat(monthlyHoldingCosts) || 0
    const sellingPercent = parseFloat(sellingCostsPercent) || 8
    const downPercent = parseFloat(downPaymentPercent) || 20

    if (!purchase || !afterRepairValue || !rehab || purchase <= 0 || afterRepairValue <= 0 || rehab < 0) {
      alert("Please enter valid values for Purchase Price, ARV, and Rehab Costs")
      return
    }

    // Calculate financing costs
    const loanPointsCost = (loan * points) / 100
    const monthlyInterest = (loan * (rate / 100)) / 12
    const totalInterest = monthlyInterest * months
    const financingCosts = loanPointsCost + totalInterest

    // Calculate holding costs
    const totalHoldingCosts = monthlyHolding * months

    // Calculate selling costs
    const sellingCosts = (afterRepairValue * sellingPercent) / 100

    // Calculate gross and net profit
    const grossProfit = afterRepairValue - purchase - rehab
    const netProfit = grossProfit - financingCosts - totalHoldingCosts - sellingCosts

    // Calculate total cash invested
    const downPayment = (purchase * downPercent) / 100
    const totalCashInvested = downPayment + rehab + financingCosts + totalHoldingCosts - loan

    // Calculate ROI
    const totalProjectCost = purchase + rehab + financingCosts + totalHoldingCosts + sellingCosts
    const roi = totalCashInvested > 0 ? (netProfit / totalCashInvested) * 100 : 0

    // Calculate cash-on-cash return
    const cashOnCashReturn = totalCashInvested > 0 ? (netProfit / totalCashInvested) * 100 : 0

    // Calculate 70% rule
    const maxAllowableOffer = (afterRepairValue * 0.70) - rehab
    const meetsSeventyRule = purchase <= maxAllowableOffer

    setResult({
      grossProfit,
      financingCosts,
      totalHoldingCosts,
      sellingCosts,
      netProfit,
      totalCashInvested,
      roi,
      cashOnCashReturn,
      maxAllowableOffer,
      meetsSeventyRule
    })
  }

  const resetCalculator = () => {
    setPurchasePrice("")
    setArv("")
    setRehabCosts("")
    setLoanAmount("")
    setInterestRate("")
    setLoanPoints("")
    setHoldingMonths("")
    setMonthlyHoldingCosts("")
    setSellingCostsPercent("8")
    setDownPaymentPercent("20")
    setResult(null)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Property Details */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-600" />
          Property Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="purchase-price" className="text-base font-semibold">
              Purchase Price ($)
            </Label>
            <Input
              id="purchase-price"
              type="number"
              step="1000"
              min="0"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="e.g., 120000"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="arv" className="text-base font-semibold">
              After Repair Value - ARV ($)
            </Label>
            <Input
              id="arv"
              type="number"
              step="1000"
              min="0"
              value={arv}
              onChange={(e) => setArv(e.target.value)}
              placeholder="e.g., 220000"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
            <p className="text-sm text-gray-600 flex items-start gap-1">
              <Info className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
              <span>Estimated market value after renovations</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rehab-costs" className="text-base font-semibold">
              Renovation/Rehab Costs ($)
            </Label>
            <Input
              id="rehab-costs"
              type="number"
              step="1000"
              min="0"
              value={rehabCosts}
              onChange={(e) => setRehabCosts(e.target.value)}
              placeholder="e.g., 40000"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
            <p className="text-sm text-gray-600">Include 10-15% contingency buffer</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="down-payment" className="text-base font-semibold">
              Down Payment (%)
            </Label>
            <Input
              id="down-payment"
              type="number"
              step="1"
              min="0"
              max="100"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
              placeholder="e.g., 20"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Financing Details */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Financing Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loan-amount" className="text-base font-semibold">
              Loan Amount ($)
            </Label>
            <Input
              id="loan-amount"
              type="number"
              step="1000"
              min="0"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g., 96000"
              className="border-2 border-gray-300 focus:border-green-500"
            />
            <p className="text-sm text-gray-600">Typically 70-80% of purchase price</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest-rate" className="text-base font-semibold">
              Annual Interest Rate (%)
            </Label>
            <Input
              id="interest-rate"
              type="number"
              step="0.1"
              min="0"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 10"
              className="border-2 border-gray-300 focus:border-green-500"
            />
            <p className="text-sm text-gray-600">Hard money loans: 9-13%</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loan-points" className="text-base font-semibold">
              Loan Origination Points (%)
            </Label>
            <Input
              id="loan-points"
              type="number"
              step="0.1"
              min="0"
              value={loanPoints}
              onChange={(e) => setLoanPoints(e.target.value)}
              placeholder="e.g., 2"
              className="border-2 border-gray-300 focus:border-green-500"
            />
            <p className="text-sm text-gray-600">Typically 1-3 points upfront</p>
          </div>
        </div>
      </div>

      {/* Holding Costs */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border-2 border-orange-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          Holding Costs
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="holding-months" className="text-base font-semibold">
              Holding Period (Months)
            </Label>
            <Input
              id="holding-months"
              type="number"
              step="1"
              min="0"
              value={holdingMonths}
              onChange={(e) => setHoldingMonths(e.target.value)}
              placeholder="e.g., 6"
              className="border-2 border-gray-300 focus:border-orange-500"
            />
            <p className="text-sm text-gray-600">Typical flips: 4-8 months</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly-holding" className="text-base font-semibold">
              Monthly Holding Costs ($)
            </Label>
            <Input
              id="monthly-holding"
              type="number"
              step="100"
              min="0"
              value={monthlyHoldingCosts}
              onChange={(e) => setMonthlyHoldingCosts(e.target.value)}
              placeholder="e.g., 1500"
              className="border-2 border-gray-300 focus:border-orange-500"
            />
            <p className="text-sm text-gray-600">Taxes, insurance, utilities, HOA</p>
          </div>
        </div>
      </div>

      {/* Selling Costs */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Selling Costs</h3>
        <div className="space-y-2">
          <Label htmlFor="selling-costs" className="text-base font-semibold">
            Selling Costs (% of ARV)
          </Label>
          <Input
            id="selling-costs"
            type="number"
            step="0.5"
            min="0"
            max="100"
            value={sellingCostsPercent}
            onChange={(e) => setSellingCostsPercent(e.target.value)}
            placeholder="e.g., 8"
            className="border-2 border-gray-300 focus:border-purple-500"
          />
          <p className="text-sm text-gray-600">
            Agent commissions (5-6%) + closing costs (1-3%) = typically 8-10%
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={calculateDeal}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Deal
        </Button>
        <Button 
          onClick={resetCalculator}
          variant="outline"
          className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100"
        >
          Reset
        </Button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* 70% Rule Check */}
          <div className={`p-6 rounded-xl border-2 ${result.meetsSeventyRule ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              {result.meetsSeventyRule ? '✅' : '⚠️'} 70% Rule Check
            </h3>
            <p className="text-lg mb-2">
              <span className="font-semibold">Maximum Allowable Offer (MAO):</span> {formatCurrency(result.maxAllowableOffer)}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Your Purchase Price:</span> {formatCurrency(parseFloat(purchasePrice))}
            </p>
            <p className={`mt-3 font-semibold ${result.meetsSeventyRule ? 'text-green-700' : 'text-red-700'}`}>
              {result.meetsSeventyRule 
                ? '✓ This deal meets the 70% rule!' 
                : '✗ Warning: Purchase price exceeds the 70% rule threshold'}
            </p>
          </div>

          {/* Profit Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Deal Analysis Summary</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 font-medium mb-1">Gross Profit</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.grossProfit)}</p>
                <p className="text-xs text-gray-500 mt-1">ARV - Purchase - Rehab</p>
              </div>

              <div className={`bg-white p-5 rounded-lg shadow-md border-l-4 ${result.netProfit > 0 ? 'border-green-500' : 'border-red-500'}`}>
                <p className="text-sm text-gray-600 font-medium mb-1">Net Profit</p>
                <p className={`text-3xl font-bold ${result.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(result.netProfit)}
                </p>
                <p className="text-xs text-gray-500 mt-1">After all costs</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
                <p className="text-sm text-gray-600 font-medium mb-1">Total Cash Invested</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(result.totalCashInvested)}</p>
                <p className="text-xs text-gray-500 mt-1">Your out-of-pocket</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-orange-500">
                <p className="text-sm text-gray-600 font-medium mb-1">ROI</p>
                <p className="text-3xl font-bold text-orange-600">{result.roi.toFixed(1)}%</p>
                <p className="text-xs text-gray-500 mt-1">Return on Investment</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-3">Cost Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Financing Costs:</span>
                  <span className="font-semibold">{formatCurrency(result.financingCosts)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Holding Costs:</span>
                  <span className="font-semibold">{formatCurrency(result.totalHoldingCosts)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Selling Costs:</span>
                  <span className="font-semibold">{formatCurrency(result.sellingCosts)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-gray-200">
                  <span className="font-bold text-gray-900">Total Additional Costs:</span>
                  <span className="font-bold">{formatCurrency(result.financingCosts + result.totalHoldingCosts + result.sellingCosts)}</span>
                </div>
              </div>
            </div>

            {/* Performance Assessment */}
            <div className="mt-6 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-600">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Deal Assessment:</p>
              <p className="text-sm text-blue-800">
                {result.netProfit >= 25000 && result.roi >= 15 
                  ? "✓ Excellent deal! Net profit and ROI meet investor targets."
                  : result.netProfit >= 15000 && result.roi >= 10
                  ? "✓ Good deal for competitive markets. Consider proceeding."
                  : result.netProfit > 0
                  ? "⚠ Marginal deal. Verify all numbers and consider negotiating."
                  : "✗ This deal shows a loss. Do not proceed without major adjustments."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
