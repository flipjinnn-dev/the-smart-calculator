"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DollarSign, Euro } from "lucide-react"

export default function ChaturbateTokenCalculator() {
  const [tokens, setTokens] = useState<string>("")
  const [usdValue, setUsdValue] = useState<number>(0)
  const [eurValue, setEurValue] = useState<number>(0)
  const [eurRate, setEurRate] = useState<number>(0.92) // Default EUR/USD rate

  // Fetch live EUR exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Using a free exchange rate API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        const data = await response.json()
        if (data.rates && data.rates.EUR) {
          setEurRate(data.rates.EUR)
        }
      } catch (error) {
        // Fallback to default rate if API fails
        console.log('Using default EUR rate')
      }
    }

    fetchExchangeRate()
  }, [])

  // Calculate values whenever tokens change
  useEffect(() => {
    const tokenAmount = parseFloat(tokens)
    if (!isNaN(tokenAmount) && tokenAmount >= 0) {
      // Model earning rate: $0.05 per token
      const usd = tokenAmount * 0.05
      const eur = usd * eurRate
      
      setUsdValue(usd)
      setEurValue(eur)
    } else {
      setUsdValue(0)
      setEurValue(0)
    }
  }, [tokens, eurRate])

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-pink-600" />
          Token to Money Converter
        </h3>

        {/* Token Input */}
        <div className="mb-6">
          <Label htmlFor="tokens" className="text-base font-semibold mb-2 block">
            Enter Token Amount
          </Label>
          <Input
            id="tokens"
            type="number"
            step="1"
            min="0"
            value={tokens}
            onChange={(e) => setTokens(e.target.value)}
            placeholder="e.g., 1000"
            className="text-2xl py-6 border-2 border-pink-300 focus:border-pink-500 text-center font-bold"
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Model earning rate: $0.05 per token
          </p>
        </div>

        {/* Results Display */}
        {tokens && parseFloat(tokens) > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {/* USD Value */}
            <div className="bg-white p-6 rounded-lg border-2 border-green-300 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <p className="text-sm font-semibold text-gray-600">USD Value</p>
              </div>
              <p className="text-4xl font-bold text-green-600">
                ${usdValue.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {tokens} tokens × $0.05
              </p>
            </div>

            {/* EUR Value */}
            <div className="bg-white p-6 rounded-lg border-2 border-blue-300 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-semibold text-gray-600">EUR Value</p>
              </div>
              <p className="text-4xl font-bold text-blue-600">
                €{eurValue.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Live exchange rate: €{eurRate.toFixed(4)}
              </p>
            </div>
          </div>
        )}

        {/* Quick Reference */}
        {!tokens && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              <strong>Quick examples:</strong> 100 tokens = $5.00 | 500 tokens = $25.00 | 1,000 tokens = $50.00
            </p>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This calculator shows model earnings at the fixed $0.05 per token rate. 
          Viewers pay $0.08–$0.10 per token depending on package size. The difference is Chaturbate's platform fee.
        </p>
      </div>
    </div>
  )
}
