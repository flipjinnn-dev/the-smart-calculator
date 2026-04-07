"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, TrendingDown, AlertCircle, CheckCircle2, Info } from "lucide-react"

interface VenmoFeeResult {
  fee: number
  netAmount: number
  feePercentage: string
  transactionType: string
}

export default function VenmoFeeCalculator() {
  const [amount, setAmount] = useState<string>("100")
  const [transactionType, setTransactionType] = useState<string>("instant-transfer")
  const [result, setResult] = useState<VenmoFeeResult | null>(null)

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
    <div className="w-full">
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 text-white">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="w-6 h-6" />
            Venmo Fee Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-semibold">Transaction Type</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="text-lg h-12">
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

          <div className="space-y-3">
            <Label className="text-base font-semibold">Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                className="text-lg h-12 pl-10"
                step="0.01"
              />
            </div>
          </div>

          <Button 
            onClick={calculateFee}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Calculate Fee
          </Button>

          {result && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-semibold text-red-900">Venmo Fee</span>
                </div>
                <div className="text-3xl font-bold text-red-700">
                  ${result.fee.toFixed(2)}
                </div>
                <div className="text-sm text-red-600 mt-1">{result.feePercentage}</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-900">
                    {transactionType === "credit-card" ? "Total You Pay" : "You Receive"}
                  </span>
                </div>
                <div className="text-3xl font-bold text-green-700">
                  ${result.netAmount.toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
