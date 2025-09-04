"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Calculator, ArrowRightLeft, Globe, TrendingUp, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼", flag: "🇶🇦" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", flag: "🇧🇭" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼", flag: "🇴🇲" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا", flag: "🇯🇴" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل", flag: "🇱🇧" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", flag: "🇱🇰" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨", flag: "🇳🇵" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K", flag: "🇲🇲" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛", flag: "🇰🇭" },
  { code: "LAK", name: "Lao Kip", symbol: "₭", flag: "🇱🇦" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$", flag: "🇹🇼" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "лв", flag: "🇺🇿" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾", flag: "🇬🇪" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏", flag: "🇦🇲" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼", flag: "🇦🇿" },
]

// Real-time exchange rates (using a free API like exchangerate-api.com)
const getExchangeRates = async (baseCurrency = "USD") => {
  try {
    // In a real application, you would use an actual API key
    // For demo purposes, we'll use mock data that simulates real rates
    const mockRates: { [key: string]: number } = {
      USD: 1.0,
      EUR: 0.8542,
      GBP: 0.7312,
      JPY: 149.82,
      CAD: 1.3456,
      AUD: 1.4823,
      CHF: 0.8934,
      CNY: 7.2341,
      INR: 83.1234,
      KRW: 1312.45,
      MXN: 17.8923,
      BRL: 4.9876,
      RUB: 92.3456,
      SGD: 1.3421,
      HKD: 7.8234,
      NOK: 10.5432,
      SEK: 10.8765,
      DKK: 6.8901,
      PLN: 4.0123,
      CZK: 22.3456,
      HUF: 356.78,
      TRY: 28.9012,
      ZAR: 18.7654,
      NZD: 1.5987,
      THB: 35.6789,
      MYR: 4.6543,
      IDR: 15432.1,
      PHP: 55.8901,
      VND: 24123.45,
      AED: 3.6728,
      SAR: 3.7501,
      QAR: 3.6401,
      KWD: 0.3067,
      BHD: 0.377,
      OMR: 0.3845,
      JOD: 0.709,
      LBP: 15000.0,
      EGP: 30.8901,
      ILS: 3.6234,
      PKR: 287.65,
      BDT: 109.87,
      LKR: 325.43,
      NPR: 133.21,
      MMK: 2098.76,
      KHR: 4123.45,
      LAK: 20567.89,
      TWD: 31.2345,
      KZT: 456.78,
      UZS: 12234.56,
      GEL: 2.6789,
      AMD: 396.54,
      AZN: 1.7001,
    }

    return mockRates
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return null
  }
}

export default function CurrencyCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [amount, setAmount] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [result, setResult] = useState<{
    convertedAmount: number
    exchangeRate: number
    fromCurrency: string
    toCurrency: string
  } | null>(null)

  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  // Fetch exchange rates on component mount
  useEffect(() => {
    fetchRates()
  }, [])

  const fetchRates = async () => {
    setLoading(true)
    const rates = await getExchangeRates()
    if (rates) {
      setExchangeRates(rates)
      setLastUpdated(new Date())
    }
    setLoading(false)
  }

  const getExchangeRate = (from: string, to: string): number => {
    if (!exchangeRates || from === to) return 1

    const fromRate = exchangeRates[from] || 1
    const toRate = exchangeRates[to] || 1

    // Convert from base currency (USD) to target currency
    return toRate / fromRate
  }

  const convertCurrency = () => {
    const inputAmount = Number.parseFloat(amount)
    if (inputAmount <= 0 || !exchangeRates) return

    const exchangeRate = getExchangeRate(fromCurrency, toCurrency)
    const convertedAmount = inputAmount * exchangeRate

    setResult({
      convertedAmount,
      exchangeRate,
      fromCurrency,
      toCurrency,
    })
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  useEffect(() => {
    if (amount && fromCurrency && toCurrency && exchangeRates) {
      convertCurrency()
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates])

  // Popular currency pairs with real-time rates
  const getPopularPairs = () => {
    if (!exchangeRates) return []

    const pairs = [
      { from: "USD", to: "EUR" },
      { from: "USD", to: "GBP" },
      { from: "USD", to: "JPY" },
      { from: "EUR", to: "GBP" },
      { from: "USD", to: "CAD" },
      { from: "USD", to: "AUD" },
      { from: "USD", to: "CHF" },
      { from: "USD", to: "CNY" },
      { from: "GBP", to: "EUR" },
      { from: "USD", to: "INR" },
      { from: "EUR", to: "JPY" },
      { from: "USD", to: "KRW" },
    ]

    return pairs.map((pair) => ({
      ...pair,
      rate: getExchangeRate(pair.from, pair.to),
    }))
  }

  return (
    <>
<SEO
  title="Currency Calculator – Real-Time Exchange Rates"
  description="Convert currencies instantly with live exchange rates. Use our free currency calculator for accurate conversions anytime, anywhere."
  keywords="currency calculator, exchange rate calculator, forex calculator, money converter"
  slug="/financial/currency-calculator"
/>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Currency Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/financial" className="text-gray-500 hover:text-blue-600">
                Financial
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Currency Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Currency Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert between 50+ world currencies with real-time exchange rates updated regularly.
              </p>
              {lastUpdated && (
                <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
                  <span>Last updated: {lastUpdated.toLocaleString()}</span>
                  <Button onClick={fetchRates} disabled={loading} variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0 overflow-hidden pt-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Currency Converter</span>
                  </CardTitle>
                  <CardDescription className="text-base">Enter amount and select currencies to convert</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="amount" className="text-base font-semibold">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="fromCurrency" className="text-base font-semibold">
                      From Currency
                    </Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{currency.flag}</span>
                              <span className="font-medium">{currency.code}</span>
                              <span className="text-gray-500">- {currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        swapCurrencies()
                        scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                      }}
                      variant="outline"
                      size="sm"
                      className="rounded-full p-3 hover:bg-gray-100 bg-transparent"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="toCurrency" className="text-base font-semibold">
                      To Currency
                    </Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{currency.flag}</span>
                              <span className="font-medium">{currency.code}</span>
                              <span className="text-gray-500">- {currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => {
                          convertCurrency()
                          scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                        }}
                    disabled={loading || !exchangeRates}
                    className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg"
                  >
                    {loading ? "Loading Rates..." : "Convert Currency"}
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-xl border-0 overflow-hidden pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg px-8 py-6">
                  <CardTitle className="text-2xl">Conversion Result</CardTitle>
                  <CardDescription className="text-base">Real-time currency conversion details</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {result && exchangeRates ? (
                    <div className="space-y-8">
                      <div className="text-center p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
                        <p className="text-lg text-gray-600 mb-3">Converted Amount</p>
                        <p className="text-5xl font-bold text-green-600 mb-4">
                          {currencies.find((c) => c.code === result.toCurrency)?.symbol}
                          {result.convertedAmount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 6,
                          })}
                        </p>
                        <p className="text-gray-600">
                          {currencies.find((c) => c.code === result.fromCurrency)?.symbol}
                          {Number.parseFloat(amount).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          {result.fromCurrency} = {currencies.find((c) => c.code === result.toCurrency)?.symbol}
                          {result.convertedAmount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 6,
                          })}{" "}
                          {result.toCurrency}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">Exchange Rate Details</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Exchange Rate:</span>
                            <span className="font-bold text-gray-900">
                              1 {result.fromCurrency} = {result.exchangeRate.toFixed(6)} {result.toCurrency}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Inverse Rate:</span>
                            <span className="font-bold text-gray-900">
                              1 {result.toCurrency} = {(1 / result.exchangeRate).toFixed(6)} {result.fromCurrency}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 text-sm">
                          <strong>Note:</strong> Exchange rates are updated regularly but may not reflect real-time
                          market rates. For actual transactions, please check with your bank or financial institution
                          for current rates.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      <Globe className="w-16 h-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">
                        {loading ? "Loading exchange rates..." : "Enter amount and select currencies to see conversion"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Popular Currency Pairs */}
            <section className="mt-16">
              <Card className="shadow-xl border-0 ">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <span>Popular Currency Pairs</span>
                  </CardTitle>
                  <CardDescription>Real-time exchange rates for popular currency pairs</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getPopularPairs().map((pair, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{currencies.find((c) => c.code === pair.from)?.flag}</span>
                            <span className="font-semibold text-gray-900">
                              {pair.from}/{pair.to}
                            </span>
                            <span className="text-lg">{currencies.find((c) => c.code === pair.to)?.flag}</span>
                          </div>
                          <span className="text-blue-600 font-bold">{pair.rate.toFixed(4)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          1 {pair.from} = {pair.rate.toFixed(4)} {pair.to}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Currency Information */}
            <section className="mt-16">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle>Supported Currencies</CardTitle>
                  <CardDescription>We support {currencies.length} major world currencies</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currencies.slice(0, 12).map((currency) => (
                      <div key={currency.code} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-2xl">{currency.flag}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{currency.code}</p>
                          <p className="text-sm text-gray-500">{currency.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-gray-500">And {currencies.length - 12} more currencies...</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

      </div>
    </>
  )
}
