"use client"

import { useCalculatorContent } from "@/hooks/useCalculatorContent"
import { usePathname } from "next/navigation"
import type React from "react"
import { useRef, useState } from "react"
import { Calculator, TrendingUp, DollarSign, Users, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useMobileScroll } from "@/hooks/useMobileScroll"

interface SEOROIResults {
  monthlyRevenue: number
  annualRevenue: number
  annualInvestment: number
  netProfit: number
  roi: number
  steps: string[]
}

export default function EnterpriseSeoRoiCalculatorCalculator() {
  const pathname = usePathname()
  const language = pathname.split('/')[1] || 'en'
  const { content, loading, error: contentError } = useCalculatorContent('enterprise-seo-roi-calculator', language)
  
  // Use content or fallback to defaults
  const contentData = content || {
    pageTitle: "Enterprise Seo Roi Calculator Calculator",
    pageDescription: "Calculate seo roi calculator with our free online calculator",
    form: {
      labels: {},
      placeholders: {},
      buttons: {
        calculate: "Calculate",
        reset: "Reset"
      }
    },
    results: {}
  }

  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const [monthlyTraffic, setMonthlyTraffic] = useState("10000")
  const [conversionRate, setConversionRate] = useState("2")
  const [averageOrderValue, setAverageOrderValue] = useState("100")
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000")

  const [results, setResults] = useState<SEOROIResults | null>(null)

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const calculateROI = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const traffic = parseFloat(monthlyTraffic)
    const conversion = parseFloat(conversionRate) / 100
    const orderValue = parseFloat(averageOrderValue)
    const investment = parseFloat(monthlyInvestment)

    if (!traffic || !conversion || !orderValue || !investment) return

    const monthlyRevenue = traffic * conversion * orderValue
    const annualRevenue = monthlyRevenue * 12
    const annualInvestment = investment * 12
    const netProfit = annualRevenue - annualInvestment
    const roi = ((netProfit / annualInvestment) * 100)

    const steps = [
      `Monthly conversions: ${traffic} × ${(conversion * 100).toFixed(1)}% = ${(traffic * conversion).toFixed(0)} conversions`,
      `Monthly revenue: ${(traffic * conversion).toFixed(0)} × $${orderValue} = ${formatCurrency(monthlyRevenue)}`,
      `Annual revenue: ${formatCurrency(monthlyRevenue)} × 12 = ${formatCurrency(annualRevenue)}`,
      `Annual investment: $${investment} × 12 = ${formatCurrency(annualInvestment)}`,
      `Net profit: ${formatCurrency(annualRevenue)} - ${formatCurrency(annualInvestment)} = ${formatCurrency(netProfit)}`,
      `ROI: (${formatCurrency(netProfit)} ÷ ${formatCurrency(annualInvestment)}) × 100 = ${roi.toFixed(1)}%`
    ]

    setResults({
      monthlyRevenue,
      annualRevenue,
      annualInvestment,
      netProfit,
      roi,
      steps
    })
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>SEO ROI Calculator</span>
                  </CardTitle>
                  <CardDescription className="text-base">Calculate SEO return on investment</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Monthly Organic Traffic</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={monthlyTraffic}
                          onChange={(e) => setMonthlyTraffic(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="10000"
                        />
                      </div>
                      <p className="text-sm text-gray-500">Number of monthly visitors from organic search</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Conversion Rate (%)</Label>
                      <Input
                        type="number"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(e.target.value)}
                        className="h-12 text-lg border-2 focus:border-blue-500"
                        placeholder="2"
                        step="0.1"
                      />
                      <p className="text-sm text-gray-500">Percentage of visitors who make a purchase</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Average Order Value ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={averageOrderValue}
                          onChange={(e) => setAverageOrderValue(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="100"
                        />
                      </div>
                      <p className="text-sm text-gray-500">Average revenue per order or transaction</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Monthly SEO Investment ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={monthlyInvestment}
                          onChange={(e) => setMonthlyInvestment(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="5000"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Total monthly spend on SEO (agency fees, tools, content, etc.)
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={calculateROI}
                    className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12"
                  >
                    Calculate ROI
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">SEO ROI Results</CardTitle>
                  <CardDescription className="text-base">Your SEO investment analysis</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Main ROI Result */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">SEO Return on Investment:</p>
                        <p className="text-5xl font-bold text-green-700">{results.roi.toFixed(2)}%</p>
                        <p className="text-sm text-green-600 mt-2">
                          {results.roi > 0 ? "Positive ROI - Profitable Investment" : "Negative ROI - Review Strategy"}
                        </p>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-xl border-2 bg-blue-50 border-blue-200">
                          <p className="text-sm mb-1 font-semibold text-blue-800">Monthly Revenue</p>
                          <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.monthlyRevenue)}</p>
                          <p className="text-xs text-blue-600">from organic traffic</p>
                        </div>
                        <div className="text-center p-4 rounded-xl border-2 bg-purple-50 border-purple-200">
                          <p className="text-sm mb-1 font-semibold text-purple-800">Annual Revenue</p>
                          <p className="text-2xl font-bold text-purple-700">{formatCurrency(results.annualRevenue)}</p>
                          <p className="text-xs text-purple-600">projected yearly</p>
                        </div>
                        <div className="text-center p-4 rounded-xl border-2 bg-indigo-50 border-indigo-200">
                          <p className="text-sm mb-1 font-semibold text-indigo-800">Annual Investment</p>
                          <p className="text-2xl font-bold text-indigo-700">
                            {formatCurrency(results.annualInvestment)}
                          </p>
                          <p className="text-xs text-indigo-600">yearly SEO spend</p>
                        </div>
                        <div className="text-center p-4 rounded-xl border-2 bg-orange-50 border-orange-200">
                          <p className="text-sm mb-1 font-semibold text-orange-800">Net Profit</p>
                          <p className="text-2xl font-bold text-orange-700">{formatCurrency(results.netProfit)}</p>
                          <p className="text-xs text-orange-600">annual profit</p>
                        </div>
                      </div>

                      {/* Step-by-Step Calculation */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Step-by-Step Calculation</h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                          {results.steps.map((step, index) => (
                            <p key={index} className="text-sm text-gray-700 font-mono">
                              {step}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* ROI Interpretation */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-2">ROI Interpretation</h4>
                        <p className="text-sm text-gray-700">
                          {results.roi >= 500
                            ? "🎉 Exceptional ROI! Your SEO investment is generating outstanding returns."
                            : results.roi >= 200
                              ? "✓ Great ROI! Your SEO strategy is performing well above industry standards."
                              : results.roi >= 100
                                ? "✓ Good ROI! Your SEO investment is profitable and generating positive returns."
                                : results.roi > 0
                                  ? "⚠ Positive ROI but below average. Consider optimizing your SEO strategy."
                                  : "✗ Negative ROI. Your SEO investment needs significant improvement."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your SEO metrics to calculate ROI</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* What is Enterprise SEO ROI */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">What is Enterprise SEO ROI?</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none text-gray-700 space-y-4">
                    <p>
                      <strong>Enterprise SEO ROI (Return on Investment)</strong> measures the profitability of your SEO
                      campaigns by comparing the revenue generated from organic search traffic against the costs
                      invested in SEO activities.
                    </p>
                    <p>
                      For enterprise businesses, calculating SEO ROI involves understanding your monthly organic
                      traffic, conversion rates, average order values, and SEO investment. This straightforward approach
                      helps justify SEO budgets and optimize marketing strategies.
                    </p>
                    <p>
                      A positive ROI indicates that your SEO efforts are generating more value than they cost, while a
                      negative ROI suggests the need for strategy adjustments or improved execution.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise SEO ROI Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Enterprise SEO ROI Formulas</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">1. Monthly Revenue</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-center text-lg font-mono">
                          $$
                          {
                            "\\text{Monthly Revenue} = \\text{Monthly Traffic} \\times \\text{Conversion Rate} \\times \\text{Average Order Value}"
                          }
                          $$
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Example: 10,000 visitors × 2% × $100 = $20,000/month</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">2. Annual Revenue</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-center text-lg font-mono">
                          $${"\\text{Annual Revenue} = \\text{Monthly Revenue} \\times 12"}$$
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Example: $20,000 × 12 = $240,000/year</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">3. Annual Investment</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-center text-lg font-mono">
                          $${"\\text{Annual Investment} = \\text{Monthly SEO Investment} \\times 12"}$$
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Example: $5,000 × 12 = $60,000/year</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">4. Return on Investment (ROI %)</h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-center text-lg font-mono">
                          $$
                          {
                            "\\text{ROI} = \\frac{\\text{Annual Revenue} - \\text{Annual Investment}}{\\text{Annual Investment}} \\times 100\\%"
                          }
                          $$
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Example: ($240,000 − $60,000) / $60,000 × 100% = 300%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Use This Calculator */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How to Use This Calculator?</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <ol className="space-y-4 text-gray-700">
                      <li>
                        <strong>Enter Monthly Organic Traffic:</strong> Input the number of visitors your website
                        receives from organic search each month. You can find this in Google Analytics or Google Search
                        Console
                      </li>
                      <li>
                        <strong>Set Conversion Rate:</strong> Enter the percentage of visitors who complete a desired
                        action (purchase, signup, etc.). Calculate by dividing conversions by total visitors.
                      </li>
                      <li>
                        <strong>Input Average Order Value:</strong> Enter the average revenue generated per transaction
                        or customer. This can be found in your e-commerce platform or CRM.
                      </li>
                      <li>
                        <strong>Specify Monthly SEO Investment:</strong> Include all monthly SEO expenses such as agency
                        fees, tools, content creation, link building, and technical SEO costs.
                      </li>
                      <li>
                        <strong>Calculate:</strong> Click the button to see your SEO ROI percentage, annual revenue
                        projections, and detailed breakdown.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Step-by-Step Example */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Step-by-Step Example</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-lg mb-4 text-gray-900">Example Scenario:</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Monthly Organic Traffic = 10,000 visitors</li>
                        <li>• Conversion Rate = 2%</li>
                        <li>• Average Order Value = $100</li>
                        <li>• Monthly SEO Investment = $5,000</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-900">Step 1: Calculate Revenue</p>
                        <p className="text-gray-700">
                          Monthly Revenue = 10,000 × 2% × $100 = <strong>$20,000</strong>
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold text-gray-900">Step 2: Calculate Revenue</p>
                        <p className="text-gray-700">
                          Annual Revenue = $20,000 × 12 = <strong>$240,000</strong>
                        </p>
                      </div>

                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold text-gray-900">Step 3: Calculate Investment</p>
                        <p className="text-gray-700">
                          Annual Investment = $5,000 × 12 = <strong>$60,000</strong>
                        </p>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-semibold text-gray-900">Step 4: Calculate Profit</p>
                        <p className="text-gray-700">
                          Net Profit = $240,000 − $60,000 = <strong>$180,000</strong>
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold text-gray-900">Step 5: Calculate</p>
                        <p className="text-gray-700">
                          ROI = ($240,000 − $60,000) / $60,000 × 100% = <strong>300%</strong>
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-gray-700">
                        <strong>Conclusion:</strong> This SEO campaign generated an excellent ROI of 300%, meaning for
                        every dollar invested in SEO, the company earned $3 in return. This demonstrates a highly
                        profitable and effective SEO strategy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Frequently Asked Questions (FAQs)</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        How is Enterprise SEO ROI calculated?
                      </h3>
                      <p className="text-gray-700">
                        Enterprise SEO ROI is calculated by comparing the revenue generated from organic traffic against
                        your SEO investment. The formula is: ROI = ((Annual Revenue - Annual Investment) / Annual
                        Investment) × 100. First, calculate monthly revenue by multiplying organic traffic by conversion
                        rate and average order value, then multiply by 12 for annual figures.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        What's a good ROI for Enterprise SEO?
                      </h3>
                      <p className="text-gray-700">
                        A good Enterprise SEO ROI typically ranges from 200% to 500%, but can vary significantly based
                        on industry, competition, and market conditions. Any positive ROI indicates a successful
                        campaign. ROIs above 300% are considered excellent, while anything above 500% is exceptional.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        How long does it take to see ROI from Enterprise SEO?
                      </h3>
                      <p className="text-gray-700">
                        Enterprise SEO typically shows meaningful ROI within 6-12 months. However, the exact timeline
                        depends on factors like current site authority, competition level, and investment amount. Some
                        businesses may see initial results in 3-4 months, while highly competitive industries might take
                        12-18 months to achieve significant returns.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        What factors influence Enterprise SEO ROI?
                      </h3>
                      <p className="text-gray-700">
                        Key factors include monthly organic traffic, conversion rate, average order value, and monthly
                        SEO investment. Industry competition, website authority, content quality, technical SEO health,
                        and user experience also play crucial roles. Additionally, factors like brand recognition,
                        market demand, and seasonal trends can significantly impact your SEO ROI.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        How can I improve my SEO ROI?
                      </h3>
                      <p className="text-gray-700">
                        To improve SEO ROI, focus on increasing organic traffic through better keyword targeting and
                        content optimization, improving conversion rates with better UX and landing pages, increasing
                        average order value through upselling and cross-selling, and optimizing SEO investment by
                        focusing on high-impact activities. Regular monitoring and data-driven adjustments are essential
                        for continuous improvement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
