"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, TrendingDown, CheckCircle2, Info, Zap, CreditCard, Building2, Smartphone } from "lucide-react"
import SimilarCalculators from "@/components/similar-calculators"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FeeResult {
  fee: number 
  netAmount: number
  feePercentage: string
  transactionType: string
}

export default function VenmoFeeCalculatorClient() {
  const [amount, setAmount] = useState<string>("100")
  const [transactionType, setTransactionType] = useState<string>("instant-transfer")
  const [result, setResult] = useState<FeeResult | null>(null)

  const calculateFee = () => {
    const amt = parseFloat(amount)
    
    if (isNaN(amt) || amt <= 0) {
      return
    }

    let fee = 0
    let feePercentage = ""
    let netAmount = amt

    switch (transactionType) {
      case "credit-card":
        fee = amt * 0.03
        feePercentage = "3%"
        netAmount = amt
        break
      
      case "instant-transfer":
        fee = amt * 0.0175
        if (fee < 0.25) fee = 0.25
        if (fee > 25) fee = 25
        feePercentage = "1.75%"
        netAmount = amt - fee
        break
      
      case "goods-services":
        fee = (amt * 0.019) + 0.10
        feePercentage = "1.9% + $0.10"
        netAmount = amt - fee
        break
      
      case "tap-to-pay":
        fee = (amt * 0.0229) + 0.10
        feePercentage = "2.29% + $0.10"
        netAmount = amt - fee
        break
      
      case "check-payroll":
        fee = amt * 0.01
        if (fee < 5) fee = 5
        feePercentage = "1% (min $5)"
        netAmount = amt - fee
        break
      
      case "check-other":
        fee = amt * 0.05
        if (fee < 5) fee = 5
        feePercentage = "5% (min $5)"
        netAmount = amt - fee
        break
      
      default:
        fee = 0
        feePercentage = "FREE"
        netAmount = amt
    }

    setResult({
      fee: Math.round(fee * 100) / 100,
      netAmount: Math.round(netAmount * 100) / 100,
      feePercentage,
      transactionType
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Venmo Fee Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Calculate Venmo fees instantly. See exact charges for instant transfers, credit card payments, and goods & services. Free, fast, no signup needed.
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-10">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Answer</h2>
                <p className="text-gray-700 leading-relaxed">
                  Yes, but only in specific situations. Sending money via your bank account, debit card, or Venmo balance is always free. Fees apply when you use a credit card to send money (3%), request an instant transfer to your bank (1.75%), receive a goods and services payment as a seller (1.9% + $0.10), or deposit a check using the fast deposit option.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Card - Unique Design */}
        <div className="mb-12">
          <Card className="border-2 pt-0 border-gray-200 shadow-xl">
            <CardHeader className="py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Calculator className="w-7 h-7" />
                Calculate Your Venmo Fee
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-900">Transaction Type</Label>
                  <Select value={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger className="h-12 text-base border-2 border-gray-300 hover:border-blue-500 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant-transfer">Instant Transfer (1.75%)</SelectItem>
                      <SelectItem value="credit-card">Credit Card Payment (3%)</SelectItem>
                      <SelectItem value="goods-services">Goods & Services (1.9% + $0.10)</SelectItem>
                      <SelectItem value="tap-to-pay">Tap to Pay (2.29% + $0.10)</SelectItem>
                      <SelectItem value="check-payroll">Check Deposit - Payroll/Govt (1%)</SelectItem>
                      <SelectItem value="check-other">Check Deposit - Other (5%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-900">Amount ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="100.00"
                      className="h-12 text-base pl-12 border-2 border-gray-300 hover:border-blue-500 transition-colors"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={calculateFee}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Fee
              </Button>

              {result && (
                <div className="grid md:grid-cols-2 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-semibold text-red-900">Venmo Fee</span>
                    </div>
                    <div className="text-4xl font-bold text-red-700 mb-1">
                      ${result.fee.toFixed(2)}
                    </div>
                    <div className="text-sm text-red-600">{result.feePercentage}</div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-900">
                        {transactionType === "credit-card" ? "Total You Pay" : "You Receive"}
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-green-700 mb-1">
                      ${result.netAmount.toFixed(2)}
                    </div>
                    <div className="text-sm text-green-600">Net Amount</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* How to Use */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-600 rounded-xl p-3">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How to Use This Venmo Fee Calculator</h2>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed text-base">
                Using this calculator takes under 10 seconds. Select your transaction type from the dropdown whether that is an instant transfer, a goods and services payment, a credit card transaction, a check deposit, or an ATM withdrawal. Then enter your dollar amount and click Calculate. The tool instantly shows you the exact Venmo fee and the final net amount you will send or receive.
              </p>
              <div className="bg-white border-l-4 border-blue-600 rounded-r-lg p-4 mt-4">
                <p className="text-gray-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  No signup required. No ads. Works on mobile and desktop.
                </p>
              </div>
            </div>

            {/* Fee Formulas */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-purple-600 rounded-xl p-3">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How to Calculate Venmo Fees — Exact Formulas</h2>
              </div>
              <p className="text-gray-700 mb-6 font-semibold text-base">These are the official Venmo fee formulas for 2026:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-blue-200 p-5 rounded-xl hover:border-blue-400 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <p className="font-bold text-gray-900">Credit Card Payment</p>
                  </div>
                  <code className="text-blue-700 font-semibold text-sm bg-blue-50 px-3 py-2 rounded-lg block">Fee = Amount × 0.03</code>
                </div>
                <div className="bg-white border-2 border-purple-200 p-5 rounded-xl hover:border-purple-400 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <p className="font-bold text-gray-900">Instant Transfer</p>
                  </div>
                  <code className="text-purple-700 font-semibold text-sm bg-purple-50 px-3 py-2 rounded-lg block">Fee = Amount × 0.0175 (min $0.25 max $25.00)</code>
                </div>
                <div className="bg-white border-2 border-pink-200 p-5 rounded-xl hover:border-pink-400 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-pink-600" />
                    <p className="font-bold text-gray-900">Business G&S</p>
                  </div>
                  <code className="text-pink-700 font-semibold text-sm bg-pink-50 px-3 py-2 rounded-lg block">Fee = (Amount × 0.019) + $0.10</code>
                </div>
                <div className="bg-white border-2 border-green-200 p-5 rounded-xl hover:border-green-400 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <p className="font-bold text-gray-900">Tap to Pay</p>
                  </div>
                  <code className="text-green-700 font-semibold text-sm bg-green-50 px-3 py-2 rounded-lg block">Fee = (Amount × 0.0229) + $0.10</code>
                </div>
                <div className="bg-white border-2 border-orange-200 p-5 rounded-xl hover:border-orange-400 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                    <p className="font-bold text-gray-900">Check - Payroll/Govt</p>
                  </div>
                  <code className="text-orange-700 font-semibold text-sm bg-orange-50 px-3 py-2 rounded-lg block">Fee = Amount × 0.01 (min $5.00)</code>
                </div>
                <div className="bg-white border-2 border-red-200 p-5 rounded-xl hover:border-red-400 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-gray-900">Check - Others</p>
                  </div>
                  <code className="text-red-700 font-semibold text-sm bg-red-50 px-3 py-2 rounded-lg block">Fee = Amount × 0.05 (min $5.00)</code>
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
              <SimilarCalculators calculators={[{
              calculatorName: "Savings Calculator",
              calculatorHref: "/financial/savings-calculator",
              calculatorDescription: "Calculate your savings grow over time with compound interest and regular contributions."
            }, {
              calculatorName: "Investment Calculator",
              calculatorHref: "/financial/investment-calculator",
              calculatorDescription: "Plan your investment strategy and see how your portfolio can grow over time."
            }, {
              calculatorName: "Retirement Calculator",
              calculatorHref: "/financial/retirement-calculator",
              calculatorDescription: "Calculate much you need to save for retirement and plan your financial future."
            }]} color="blue" title="Related Financial Calculators" />
            
          </div>
        {/* Complete Fee Structure */}
        <div className="mt-12 space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Complete Venmo Fee Structure</h2>
            <p className="text-gray-600 text-lg">Comprehensive breakdown of all Venmo fees and charges</p>
          </div>

          {/* Spending & Sending */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <DollarSign className="w-7 h-7" />
                Spending & Sending Money
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Transaction Type</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Method</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Send Money to People</td>
                      <td className="px-8 py-5 text-gray-700">Balance / Debit Card / Bank Account</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Send Money to People</td>
                      <td className="px-8 py-5 text-gray-700">Credit Card</td>
                      <td className="px-8 py-5 font-bold text-red-600 text-lg">3% of total</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Online Purchase at Merchant</td>
                      <td className="px-8 py-5 text-gray-700">Any Venmo-linked method</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Adding Money */}
          <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7" />
                Adding Money to Your Venmo Account
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-green-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Transaction Type</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Speed</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-green-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Add Money from Linked Bank Account</td>
                      <td className="px-8 py-5 text-gray-700">Standard</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Receive Money in Personal Account</td>
                      <td className="px-8 py-5 text-gray-700">Instant</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Add Money via Direct Deposit</td>
                      <td className="px-8 py-5 text-gray-700">Per employer schedule</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Cash a Check — Payroll & Government (Faster Deposit)</td>
                      <td className="px-8 py-5 text-gray-700">Within minutes</td>
                      <td className="px-8 py-5 font-bold text-orange-600 text-lg">1% (min $5)</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Cash a Check — All Other Accepted Types (Faster Deposit)</td>
                      <td className="px-8 py-5 text-gray-700">Within minutes</td>
                      <td className="px-8 py-5 font-bold text-red-600 text-lg">5% (min $5)</td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Cash Any Check — Standard Hold</td>
                      <td className="px-8 py-5 text-gray-700">Up to 10 days</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Business Transactions */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Building2 className="w-7 h-7" />
                Business Transactions — Goods & Services
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-purple-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Account Type</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Fee (Paid by Seller)</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Buyer Pays Extra?</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Purchase Protection</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-purple-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Business / Charity Profile — Standard</td>
                      <td className="px-8 py-5 font-bold text-purple-600 text-lg">1.9% + $0.10</td>
                      <td className="px-8 py-5 text-gray-700">No</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">Yes</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Business Profile — Tap to Pay (NFC In-Person)</td>
                      <td className="px-8 py-5 font-bold text-purple-600 text-lg">2.29% + $0.10</td>
                      <td className="px-8 py-5 text-gray-700">No</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">Yes</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Personal Account — Goods & Services</td>
                      <td className="px-8 py-5 font-bold text-purple-600 text-lg">1.9% + $0.10</td>
                      <td className="px-8 py-5 text-gray-700">No</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-8 py-6 bg-purple-50 border-t-2 border-purple-100">
                <p className="text-gray-700 leading-relaxed">
                  <Info className="w-5 h-5 inline mr-2 text-purple-600" />
                  The goods and services fee is always paid by the seller. It is automatically deducted from the received amount before it reaches your Venmo balance. Buyers pay nothing extra — unless they fund their payment using a credit card, in which case the standard 3% credit card fee applies to them.
                </p>
              </div>
            </div>
          </div>

          {/* Money Transfer - Withdrawals */}
          <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Zap className="w-7 h-7" />
                Money Transfer — Withdrawals to Bank
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-orange-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Transfer Type</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Speed</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-orange-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Electronic Withdrawal — Standard</td>
                      <td className="px-8 py-5 text-gray-700">1–3 business days</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-orange-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Electronic Withdrawal — Instant Transfer</td>
                      <td className="px-8 py-5 text-gray-700">Within minutes</td>
                      <td className="px-8 py-5 font-bold text-red-600 text-lg">1.75% (min $0.25 · max $25)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-8 py-6 bg-orange-50 border-t-2 border-orange-100">
                <p className="text-gray-700 leading-relaxed">
                  <Info className="w-5 h-5 inline mr-2 text-orange-600" />
                  The instant transfer fee is capped at $25.00 regardless of amount. Any transfer of $1,429 or more will cost exactly $25 in fees.
                </p>
              </div>
            </div>
          </div>

          {/* Crypto Fees */}
          <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <DollarSign className="w-7 h-7" />
                Buying or Selling Cryptocurrencies
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Purchase / Sale Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">$1.00 – $4.99</td>
                      <td className="px-6 py-4 font-semibold text-indigo-600">$0.49 flat</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">$5.00 – $24.99</td>
                      <td className="px-6 py-4 font-semibold text-indigo-600">$0.99 flat</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">$25.00 – $74.99</td>
                      <td className="px-6 py-4 font-semibold text-indigo-600">$1.99 flat</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">$75.00 – $200.00</td>
                      <td className="px-6 py-4 font-semibold text-indigo-600">$2.49 flat</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">$200.01 – $1,000.00</td>
                      <td className="px-6 py-4 font-semibold text-indigo-600">1.80% of amount</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">Over $1,000.00</td>
                      <td className="px-6 py-4 font-semibold text-indigo-600">1.50% of amount</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">Receiving Cryptocurrency</td>
                      <td className="px-6 py-4 font-semibold text-green-600">FREE</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">Transferring to another Venmo or PayPal account</td>
                      <td className="px-6 py-4 font-semibold text-green-600">FREE</td>
                    </tr>
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">PYUSD (PayPal Stablecoin)</td>
                      <td className="px-6 py-4 font-semibold text-green-600">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Debit Card & ATM */}
          <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <CreditCard className="w-7 h-7" />
                Venmo Mastercard Debit Card & ATM Fees
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-teal-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Transaction Type</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Details</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-teal-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Venmo Debit Card — Issuance</td>
                      <td className="px-8 py-5 text-gray-700">One-time</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">ATM Withdrawal — MoneyPass Network</td>
                      <td className="px-8 py-5 text-gray-700">In-network (associated)</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">ATM Withdrawal — Non-MoneyPass ATM</td>
                      <td className="px-8 py-5 text-gray-700">Out-of-network</td>
                      <td className="px-8 py-5 font-bold text-red-600 text-lg">$2.50 flat</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">ATM Balance Inquiry</td>
                      <td className="px-8 py-5 text-gray-700">In or out of network</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Cash Withdrawal at Bank or Financial Institution</td>
                      <td className="px-8 py-5 text-gray-700">Over-the-counter</td>
                      <td className="px-8 py-5 font-bold text-red-600 text-lg">$3.00 flat</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Automatic Reload Using Bank Account</td>
                      <td className="px-8 py-5 text-gray-700">Any amount</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-medium">Venmo Debit Card Replacement</td>
                      <td className="px-8 py-5 text-gray-700">Lost or stolen</td>
                      <td className="px-8 py-5 font-bold text-green-600 text-lg">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Real Examples - Instant Transfer */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Zap className="w-7 h-7" />
                Venmo Instant Transfer Fee — Real Examples
              </h3>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">You Transfer</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Venmo Fee (1.75%)</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">You Receive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-bold text-lg">$10.00</td>
                      <td className="px-8 py-5 text-red-600 font-medium">$0.25 (minimum applies)</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">$9.75</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-bold text-lg">$50.00</td>
                      <td className="px-8 py-5 text-red-600 font-medium">$0.88</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">$49.12</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-bold text-lg">$100.00</td>
                      <td className="px-8 py-5 text-red-600 font-medium">$1.75</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">$98.25</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-bold text-lg">$300.00</td>
                      <td className="px-8 py-5 text-red-600 font-medium">$5.25</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">$294.75</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-bold text-lg">$500.00</td>
                      <td className="px-8 py-5 text-red-600 font-medium">$8.75</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">$491.25</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-bold text-lg">$1,000.00</td>
                      <td className="px-8 py-5 text-red-600 font-medium">$17.50</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">$982.50</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-8 py-5 text-gray-900 font-bold text-lg">$1,429.00 or more</td>
                      <td className="px-8 py-5 text-red-600 font-medium">$25.00 (maximum applies)</td>
                      <td className="px-8 py-5 text-green-600 font-bold text-lg">Amount minus $25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Real Examples - Goods & Services */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Building2 className="w-7 h-7" />
                Venmo Goods & Services Fee — Real Examples
              </h3>
            </div>
            <div className="p-0">
              <div className="px-8 py-6 bg-purple-50 border-b-2 border-purple-100">
                <p className="text-gray-700 font-semibold leading-relaxed">
                  Fee is deducted from the seller's received amount. Buyer pays nothing extra.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-purple-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Sale Amount</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Business Fee (1.9% + $0.10)</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">You Receive (Business)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-semibold">$25.00</td>
                      <td className="px-6 py-4 text-red-600">$0.58</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">$24.42</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-semibold">$50.00</td>
                      <td className="px-6 py-4 text-red-600">$1.05</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">$48.95</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-semibold">$100.00</td>
                      <td className="px-6 py-4 text-red-600">$2.00</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">$98.00</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-semibold">$200.00</td>
                      <td className="px-6 py-4 text-red-600">$3.90</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">$196.10</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-semibold">$500.00</td>
                      <td className="px-6 py-4 text-red-600">$9.60</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">$490.40</td>
                    </tr>
                    <tr className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-semibold">$1,000.00</td>
                      <td className="px-6 py-4 text-red-600">$19.10</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">$980.90</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Venmo vs PayPal */}
          <div className="bg-white border-2 border-pink-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-8 py-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <DollarSign className="w-7 h-7" />
                Venmo vs PayPal Fees — Which Is Cheaper?
              </h3>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6">
                Both apps are owned by PayPal Inc., but their fee structures differ significantly for sellers and businesses.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-pink-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Transaction Type</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Venmo Fee</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">PayPal Fee</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-pink-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">Send via bank or balance</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">FREE</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">FREE</td>
                      <td className="px-6 py-4 text-gray-700">Tie</td>
                    </tr>
                    <tr className="hover:bg-pink-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">Send via credit card</td>
                      <td className="px-6 py-4 text-red-600">3%</td>
                      <td className="px-6 py-4 text-red-600">3%</td>
                      <td className="px-6 py-4 text-gray-700">Tie</td>
                    </tr>
                    <tr className="hover:bg-pink-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">Instant transfer</td>
                      <td className="px-6 py-4 text-orange-600">1.75% (max $25)</td>
                      <td className="px-6 py-4 text-orange-600">1.75% (max $25)</td>
                      <td className="px-6 py-4 text-gray-700">Tie</td>
                    </tr>
                    <tr className="hover:bg-pink-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">Goods & Services seller fee</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">1.9% + $0.10</td>
                      <td className="px-6 py-4 text-red-600">3.49% + $0.49</td>
                      <td className="px-6 py-4 text-green-600 font-bold">Venmo cheaper</td>
                    </tr>
                    <tr className="hover:bg-pink-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">International transfers</td>
                      <td className="px-6 py-4 text-gray-500">Not available</td>
                      <td className="px-6 py-4 text-blue-600">200+ countries</td>
                      <td className="px-6 py-4 text-blue-600 font-bold">PayPal wins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 px-6 py-5 bg-green-50 border-l-4 border-green-600 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong>For domestic US transactions, Venmo is significantly cheaper than PayPal for goods and services</strong> — especially for small businesses and freelancers. On a $500 sale, Venmo saves you approximately $5.39 compared to PayPal. PayPal is the better choice only when you need to send money internationally.
                </p>
              </div>
            </div>
          </div>

          {/* How to Avoid or Reduce Venmo Fees */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Avoid or Reduce Venmo Fees</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">Always send via bank account, debit card, or Venmo balance.</p>
                  <p className="text-gray-700">Switching away from credit card saves you 3% on every single transaction.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">Use standard transfer instead of instant.</p>
                  <p className="text-gray-700">Unless it is urgent, waiting 1–3 business days saves you 1.75% every time you withdraw. On $500 that is $8.75 saved per withdrawal.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">Batch your withdrawals into one transfer.</p>
                  <p className="text-gray-700">Let payments accumulate and transfer once per week. One fee on a larger amount is always cheaper than multiple fees on small amounts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">Use a Business Profile if you sell regularly.</p>
                  <p className="text-gray-700">A Business Profile reduces your goods and services fee substantially compared to receiving payments on a personal account.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">Only use Goods & Services when purchase protection is actually needed.</p>
                  <p className="text-gray-700">For trusted friends and family, a standard personal payment is always free. Reserve G&S for strangers where buyer and seller protection matters.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">Check your default funding source before every payment.</p>
                  <p className="text-gray-700">The most common and most avoidable Venmo fee mistake is accidentally sending via credit card because it was left as the default. Verify your payment method before hitting send.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold">
                    How much is the Venmo instant transfer fee?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    The Venmo instant transfer fee is 1.75% of the transferred amount, with a minimum charge of $0.25 and a maximum cap of $25.00. A $100 transfer costs $1.75. A $500 transfer costs $8.75. Any transfer of $1,429 or more costs exactly $25.00 — the maximum. Standard transfers (1–3 business days) are always free.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold">
                    What is the Venmo goods and services fee in 2026?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    For a Business or Charity Profile, the fee is 1.9% + $0.10 per transaction. For Tap to Pay (NFC contactless in-person), the fee is 2.29% + $0.10. The fee is always paid by the seller and automatically deducted from the received amount. Buyers pay nothing extra.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold">
                    How much does Venmo charge for a $100 instant transfer?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Venmo charges $1.75 for a $100 instant transfer (1.75% × $100). You receive $98.25 in your bank account. Use the free standard transfer to receive the full $100 — it takes 1–3 business days.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold">
                    How much does Venmo charge for a $500 instant transfer?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Venmo charges $8.75 for a $500 instant transfer (1.75% × $500). You receive $491.25. The free standard transfer gives you the full $500 in 1–3 business days.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-semibold">
                    Does Venmo charge a fee for credit card payments?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Yes. Venmo charges a flat 3% fee when you send money using a linked credit card. You can completely avoid this by switching your funding source to a bank account, debit card, or your Venmo balance — all of which are always free.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Does Venmo charge a fee for business transactions?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Yes. Venmo charges 1.9% + $0.10 per payment received through a Business or Charity Profile for goods or services. Tap to Pay (NFC contactless) transactions cost 2.29% + $0.10. There is no monthly fee or setup fee.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left font-semibold">
                    Is Venmo free for buyers on goods and services payments?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Yes. Buyers pay no G&S fee. The seller absorbs the full transaction fee. However, if the buyer funds their payment using a credit card, Venmo's standard 3% credit card fee applies to the buyer's transaction.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left font-semibold">
                    How do I calculate Venmo fees manually?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Credit Card: Amount × 0.03. Instant Transfer: Amount × 0.0175 (minimum $0.25, maximum $25). Business G&S: (Amount × 0.019) + $0.10. Tap to Pay: (Amount × 0.0229) + $0.10. Or use the Venmo fee calculator at the top of this page for instant results.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left font-semibold">
                    Can I avoid Venmo fees completely?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Yes — for personal payments. Send using your bank account, debit card, or Venmo balance (never a credit card), and use the standard transfer when withdrawing to your bank. Both are always free. For business goods and services payments, a fee always applies when you receive payments, but using a Business Profile keeps the rate as low as possible.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left font-semibold">
                    Is Venmo cheaper than PayPal for business?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Yes, for US domestic transactions. Venmo charges 1.9% + $0.10 per business G&S transaction, while PayPal charges 3.49% + $0.49 for the same type. On a $500 sale that is a saving of over $5 per transaction with Venmo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-left font-semibold">
                    What ATM can I use with Venmo for free?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Any ATM within the MoneyPass network is free with your Venmo Mastercard Debit Card. Out-of-network ATMs cost $2.50 per withdrawal. ATM balance inquiries are free at any ATM, in or out of network.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger className="text-left font-semibold">
                    Does Venmo charge for check deposits?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Only for faster deposits. Payroll and government checks cost 1% (minimum $5) for the fast option. All other accepted check types cost 5% (minimum $5) for the fast option. If you choose the standard 10-day hold, all check deposits are free.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
