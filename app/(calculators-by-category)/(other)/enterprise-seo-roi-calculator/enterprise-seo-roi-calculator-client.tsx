"use client";

import type React from "react"
import { useRef, useState } from "react"
import { Calculator, TrendingUp, DollarSign, Users, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SimilarCalculators from "@/components/similar-calculators"
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface SEOROIResults {
  monthlyRevenue: number
  annualRevenue: number
  annualInvestment: number
  netProfit: number
  roi: number
  steps: string[]
}


interface EnterpriseSeoRoiCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function EnterpriseSeoRoiCalculatorClient({ content, guideContent }: EnterpriseSeoRoiCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
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
                    <span>{contentData.seoRoiCalculator}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.calculateSeoRoi}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.monthlyOrganicTraffic}</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={monthlyTraffic}
                          onChange={(e) => setMonthlyTraffic(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          placeholder={contentData.form?.placeholders?.monthlyOrganicTraffic}
                        />
                      </div>
                      <p className="text-sm text-gray-500">{contentData.form?.helperText?.monthlyOrganicTraffic}</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.conversionRate}</Label>
                      <Input
                        type="number"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(e.target.value)}
                        className="h-12 text-lg border-2 focus:border-blue-500"
                        placeholder={contentData.form?.placeholders?.conversionRate}
                        step="0.1"
                      />
                      <p className="text-sm text-gray-500">{contentData.form?.helperText?.conversionRate}</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.averageOrderValue}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={averageOrderValue}
                          onChange={(e) => setAverageOrderValue(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          placeholder={contentData.form?.placeholders?.averageOrderValue}
                        />
                      </div>
                      <p className="text-sm text-gray-500">{contentData.form?.helperText?.averageOrderValue}</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.monthlyInvestment}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={monthlyInvestment}
                          onChange={(e) => setMonthlyInvestment(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          placeholder={contentData.form?.placeholders?.monthlyInvestment}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        {contentData.form?.helperText?.monthlyInvestment}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={calculateROI}
                    className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12"
                  >
                    {contentData.form?.buttons?.calculate}
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.results?.title}</CardTitle>
                  <CardDescription className="text-base">{contentData.results?.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Main ROI Result */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">{contentData.results?.roiLabel}</p>
                        <p className="text-5xl font-bold text-green-700">{results.roi.toFixed(2)}%</p>
                        <p className="text-sm text-green-600 mt-2">
                          {results.roi > 0 ? contentData.results?.positiveROI : contentData.results?.negativeROI}
                        </p>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-xl border-2 bg-blue-50 border-blue-200">
                          <p className="text-sm mb-1 font-semibold text-blue-800">{contentData.results?.monthlyRevenue}</p>
                          <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.monthlyRevenue)}</p>
                          <p className="text-xs text-blue-600">{contentData.results?.fromOrganicTraffic}</p>
                        </div>
                        <div className="text-center p-4 rounded-xl border-2 bg-purple-50 border-purple-200">
                          <p className="text-sm mb-1 font-semibold text-purple-800">{contentData.results?.annualRevenue}</p>
                          <p className="text-2xl font-bold text-purple-700">{formatCurrency(results.annualRevenue)}</p>
                          <p className="text-xs text-purple-600">{contentData.results?.projectedYearly}</p>
                        </div>
                        <div className="text-center p-4 rounded-xl border-2 bg-indigo-50 border-indigo-200">
                          <p className="text-sm mb-1 font-semibold text-indigo-800">{contentData.results?.annualInvestment}</p>
                          <p className="text-2xl font-bold text-indigo-700">
                            {formatCurrency(results.annualInvestment)}
                          </p>
                          <p className="text-xs text-indigo-600">{contentData.results?.yearlySeoSpend}</p>
                        </div>
                        <div className="text-center p-4 rounded-xl border-2 bg-orange-50 border-orange-200">
                          <p className="text-sm mb-1 font-semibold text-orange-800">{contentData.results?.netProfit}</p>
                          <p className="text-2xl font-bold text-orange-700">{formatCurrency(results.netProfit)}</p>
                          <p className="text-xs text-orange-600">{contentData.results?.annualProfit}</p>
                        </div>
                      </div>

                      {/* Step-by-Step Calculation */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.results?.stepByStepCalculation}</h3>
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
                        <h4 className="font-semibold text-gray-900 mb-2">{contentData.results?.roiInterpretation}</h4>
                        <p className="text-sm text-gray-700">
                          {results.roi >= 500
                            ? contentData.results?.exceptional
                            : results.roi >= 200
                              ? contentData.results?.great
                              : results.roi >= 100
                                ? contentData.results?.good
                                : results.roi > 0
                                  ? contentData.results?.belowAverage
                                  : contentData.results?.needsImprovement}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.results?.emptyState}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>  
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="enterprise-seo-roi-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          </div>
        </main>
      </div>
    </>
  )
}
