"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { 
  Youtube,
  DollarSign, 
  TrendingUp, 
  Eye, 
  Users, 
  Video,
  Calendar,
  Globe,
  Sparkles,
  AlertCircle,
  Loader2,
  ExternalLink,
  BarChart3
} from "lucide-react"
import CalculatorGuide from "@/components/calculator-guide"

interface ChannelData {
  channelId: string
  title: string
  thumbnail: string
  subscriberCount: string
  viewCount: string
  videoCount: string
  country?: string
  publishedAt?: string
}

interface YouTubeMoneyCalculatorClientProps {
  uiContent?: any
  guideContent?: any
}

// Country-based RPM data
const COUNTRY_RPM: Record<string, { min: number; max: number; default: number }> = {
  US: { min: 4, max: 12, default: 7 },
  CA: { min: 3.5, max: 10, default: 6 },
  UK: { min: 3, max: 9, default: 5.5 },
  DE: { min: 3, max: 8, default: 5 },
  AU: { min: 2.5, max: 8, default: 5 },
  IN: { min: 0.5, max: 2, default: 1 },
  BR: { min: 0.8, max: 2.5, default: 1.5 },
  PK: { min: 0.4, max: 1.8, default: 1 },
  BD: { min: 0.3, max: 1.5, default: 0.8 },
  DEFAULT: { min: 1, max: 10, default: 4 }
}

export default function YouTubeMoneyCalculatorClient({ uiContent, guideContent }: YouTubeMoneyCalculatorClientProps) {
  const [calculationMode, setCalculationMode] = useState<'automatic' | 'manual'>('automatic')
  const [channelInput, setChannelInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [channelData, setChannelData] = useState<ChannelData | null>(null)
  
  // Manual mode inputs
  const [dailyViews, setDailyViews] = useState(1000)
  const [cpm, setCpm] = useState(4)
  const [manualResults, setManualResults] = useState<any>(null)
  
  // Advanced settings
  const [rpm, setRpm] = useState(4)
  const [uploadsPerMonth, setUploadsPerMonth] = useState(8)
  const [selectedCountry, setSelectedCountry] = useState("DEFAULT")
  
  const content = uiContent || {}

  const fetchChannelData = async () => {
    if (!channelInput.trim()) {
      setError(content.errorEmptyInput || "Please enter a YouTube channel URL, handle, or ID")
      return
    }

    setLoading(true)
    setError("")
    setChannelData(null)

    try {
      const response = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: channelInput })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || content.errorFetchFailed || "Failed to fetch channel data")
        setLoading(false)
        return
      }

      if (data.success && data.data) {
        setChannelData(data.data)
        
        // Auto-set RPM based on country
        if (data.data.country && COUNTRY_RPM[data.data.country]) {
          setRpm(COUNTRY_RPM[data.data.country].default)
          setSelectedCountry(data.data.country)
        }
      }
    } catch (err) {
      setError(content.errorNetwork || "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const calculateEarnings = () => {
    if (!channelData) return null

    const totalViews = parseInt(channelData.viewCount) || 0
    const videoCount = parseInt(channelData.videoCount) || 1
    const avgViewsPerVideo = Math.round(totalViews / videoCount)
    
    const estimatedMonthlyViews = avgViewsPerVideo * uploadsPerMonth
    const estimatedMonthlyEarnings = (estimatedMonthlyViews / 1000) * rpm
    const estimatedYearlyEarnings = estimatedMonthlyEarnings * 12
    
    // Sponsorship estimate (rough formula based on views)
    const sponsorshipMin = Math.round(avgViewsPerVideo * 0.01)
    const sponsorshipMax = Math.round(avgViewsPerVideo * 0.05)

    return {
      avgViewsPerVideo,
      estimatedMonthlyViews,
      estimatedMonthlyEarnings: estimatedMonthlyEarnings.toFixed(2),
      estimatedYearlyEarnings: estimatedYearlyEarnings.toFixed(2),
      estimatedDailyEarnings: (estimatedMonthlyEarnings / 30).toFixed(2),
      sponsorshipRange: `$${sponsorshipMin.toLocaleString()} - $${sponsorshipMax.toLocaleString()}`
    }
  }

  const calculateManualEarnings = () => {
    const monthlyViews = dailyViews * 30
    const yearlyViews = dailyViews * 365
    const dailyEarnings = (dailyViews / 1000) * cpm
    const monthlyEarnings = (monthlyViews / 1000) * cpm
    const yearlyEarnings = (yearlyViews / 1000) * cpm
    
    // Sponsorship estimate
    const avgViewsPerVideo = dailyViews * 3 // Rough estimate
    const sponsorshipMin = Math.round(avgViewsPerVideo * 0.01)
    const sponsorshipMax = Math.round(avgViewsPerVideo * 0.05)

    return {
      dailyViews,
      monthlyViews,
      yearlyViews,
      estimatedDailyEarnings: dailyEarnings.toFixed(2),
      estimatedMonthlyEarnings: monthlyEarnings.toFixed(2),
      estimatedYearlyEarnings: yearlyEarnings.toFixed(2),
      sponsorshipRange: `$${sponsorshipMin.toLocaleString()} - $${sponsorshipMax.toLocaleString()}`
    }
  }

  const handleManualCalculation = () => {
    if (dailyViews <= 0) {
      setError(content.errorInvalidViews || "Please enter valid daily views")
      return
    }
    setError("")
    setManualResults(calculateManualEarnings())
  }

  const results = channelData ? calculateEarnings() : null

  const resetCalculator = () => {
    setChannelInput("")
    setChannelData(null)
    setManualResults(null)
    setError("")
    setRpm(4)
    setUploadsPerMonth(8)
    setDailyViews(1000)
    setCpm(4)
    setSelectedCountry("DEFAULT")
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
              <Youtube className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3 px-4">
              {content.title || "YouTube Money Calculator"}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              {content.subtitle || "Estimate your YouTube earnings based on views, RPM, and engagement"}
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-xl bg-gray-100 p-1 shadow-inner">
              <button
                onClick={() => {
                  setCalculationMode('automatic')
                  setError("")
                  setManualResults(null)
                }}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  calculationMode === 'automatic'
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  {content.modeAutomatic || "Channel URL"}
                </div>
              </button>
              <button
                onClick={() => {
                  setCalculationMode('manual')
                  setError("")
                  setChannelData(null)
                }}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  calculationMode === 'manual'
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  {content.modeManual || "Manual Input"}
                </div>
              </button>
            </div>
          </div>

          {/* Automatic Mode - Input Card */}
          {calculationMode === 'automatic' && (
          <Card className="shadow-2xl border-0 mb-6 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                {content.inputSectionTitle || "Enter Channel Information"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-6">
                {/* Channel Input */}
                <div>
                  <Label className="text-base font-semibold text-gray-800 mb-2 block">
                    {content.channelInputLabel || "YouTube Channel URL, Handle, or ID"}
                  </Label>
                  <p className="text-sm text-gray-600 mb-3">
                    {content.channelInputHint || "e.g., https://youtube.com/@channelname or @channelname or channel ID"}
                  </p>
                  <Input
                    type="text"
                    value={channelInput}
                    onChange={(e) => setChannelInput(e.target.value)}
                    placeholder={content.channelInputPlaceholder || "Paste channel URL or handle"}
                    className="text-base p-3 border-2 focus:border-red-400"
                    disabled={loading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Fetch Button */}
                <Button
                  onClick={fetchChannelData}
                  disabled={loading}
                  className="w-full py-3 text-base bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {content.loadingText || "Fetching Data..."}
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      {content.calculateButton || "Calculate Earnings"}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Manual Mode - Input Card */}
          {calculationMode === 'manual' && (
          <Card className="shadow-2xl border-0 mb-6 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                {content.manualInputTitle || "Manual Calculation"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-6">
                {/* Daily Views Input */}
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <Label className="text-base font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    {content.dailyViewsLabel || "Daily Views"}
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-white p-3 rounded-lg">
                      <Slider
                        value={[dailyViews]}
                        onValueChange={(value) => setDailyViews(value[0])}
                        min={100}
                        max={1000000}
                        step={100}
                        className="[&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-600 [&_.slider-track]:bg-blue-200 [&_.slider-range]:bg-blue-600"
                      />
                    </div>
                    <Input
                      type="number"
                      value={dailyViews}
                      onChange={(e) => setDailyViews(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-32 text-center font-bold text-blue-600 border-2 border-blue-300 bg-white"
                    />
                  </div>
                  <p className="text-xs text-blue-700 mt-2 font-medium">
                    {content.dailyViewsHint || "Average daily views your videos receive"}
                  </p>
                </div>

                {/* CPM Input */}
                <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <Label className="text-base font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    {content.cpmLabel || "CPM (Cost Per 1000 Views)"}
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-white p-3 rounded-lg">
                      <Slider
                        value={[cpm]}
                        onValueChange={(value) => setCpm(value[0])}
                        min={0.5}
                        max={20}
                        step={0.5}
                        className="[&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-600 [&_.slider-track]:bg-green-200 [&_.slider-range]:bg-green-600"
                      />
                    </div>
                    <span className="text-2xl font-bold text-green-600 min-w-[80px] bg-white px-4 py-2 rounded-lg border-2 border-green-300">${cpm}</span>
                  </div>
                  <p className="text-xs text-green-700 mt-2 font-medium">
                    {content.cpmHint || "Typical range: $2-$10, varies by niche and region"}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Calculate Button */}
                <Button
                  onClick={handleManualCalculation}
                  className="w-full py-3 text-base bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {content.calculateButton || "Calculate Earnings"}
                </Button>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Automatic Mode Results */}
          {channelData && results && (
            <div className="space-y-6">
              {/* Channel Info Card */}
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-red-50">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    {content.channelInfoTitle || "Channel Overview"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <img
                      src={channelData.thumbnail}
                      alt={channelData.title}
                      className="w-24 h-24 rounded-xl shadow-md"
                    />
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{channelData.title}</h3>
                        <a
                          href={`https://youtube.com/channel/${channelData.channelId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 mt-1"
                        >
                          {content.visitChannel || "Visit Channel"}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">{content.subscribers || "Subscribers"}</p>
                            <p className="text-sm font-bold text-gray-900">
                              {parseInt(channelData.subscriberCount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">{content.totalViews || "Total Views"}</p>
                            <p className="text-sm font-bold text-gray-900">
                              {parseInt(channelData.viewCount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">{content.totalVideos || "Videos"}</p>
                            <p className="text-sm font-bold text-gray-900">
                              {parseInt(channelData.videoCount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {channelData.country && (
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">{content.country || "Country"}</p>
                              <p className="text-sm font-bold text-gray-900">{channelData.country}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Earnings Card */}
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    {content.earningsTitle || "Estimated Earnings"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.avgViews || "Avg Views/Video"}</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {results.avgViewsPerVideo.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.monthlyViews || "Monthly Views"}</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {results.estimatedMonthlyViews.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.dailyEarnings || "Daily Earnings"}</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${results.estimatedDailyEarnings}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.monthlyEarnings || "Monthly Earnings"}</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${parseFloat(results.estimatedMonthlyEarnings).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl text-white text-center">
                    <p className="text-sm opacity-90 mb-2">{content.yearlyEarnings || "Estimated Yearly Earnings"}</p>
                    <p className="text-4xl font-bold">${parseFloat(results.estimatedYearlyEarnings).toLocaleString()}</p>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-800 mb-1">
                          {content.sponsorshipTitle || "Estimated Sponsorship Value"}
                        </p>
                        <p className="text-lg font-bold text-yellow-600">{results.sponsorshipRange}</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          {content.sponsorshipNote || "Per video sponsorship range based on average views"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        {content.disclaimer || "These earnings are estimates only. Actual income depends on CPM, niche, region, and monetization."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reset Button */}
              <div className="flex justify-center">
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-3 border-2 hover:bg-gray-50"
                >
                  <TrendingUp className="w-4 h-4" />
                  {content.newCalculation || "Calculate Another Channel"}
                </Button>
              </div>
            </div>
          )}

          {/* Manual Mode Results */}
          {manualResults && (
            <div className="space-y-6">
              {/* Manual Earnings Card */}
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    {content.earningsTitle || "Estimated Earnings"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.dailyViewsLabel || "Daily Views"}</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {manualResults.dailyViews.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.monthlyViews || "Monthly Views"}</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {manualResults.monthlyViews.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.yearlyViews || "Yearly Views"}</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {manualResults.yearlyViews.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.dailyEarnings || "Daily Earnings"}</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${manualResults.estimatedDailyEarnings}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.monthlyEarnings || "Monthly Earnings"}</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${parseFloat(manualResults.estimatedMonthlyEarnings).toLocaleString()}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">{content.yearlyEarnings || "Yearly Earnings"}</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${parseFloat(manualResults.estimatedYearlyEarnings).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl text-white text-center mb-6">
                    <p className="text-sm opacity-90 mb-2">{content.estimatedRevenue || "Total Estimated Yearly Revenue"}</p>
                    <p className="text-4xl font-bold">${parseFloat(manualResults.estimatedYearlyEarnings).toLocaleString()}</p>
                  </div>

                  <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl mb-6">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-800 mb-1">
                          {content.sponsorshipTitle || "Estimated Sponsorship Value"}
                        </p>
                        <p className="text-lg font-bold text-yellow-600">{manualResults.sponsorshipRange}</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          {content.sponsorshipNote || "Per video sponsorship range based on average views"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        {content.disclaimer || "These earnings are estimates only. Actual income depends on CPM, niche, region, and monetization."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reset Button */}
              <div className="flex justify-center">
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-3 border-2 hover:bg-gray-50"
                >
                  <TrendingUp className="w-4 h-4" />
                  {content.newCalculation || "Calculate Again"}
                </Button>
              </div>
            </div>
          )}

          {/* Guide Content */}
          {guideContent && (
            <div className="mt-12">
              <CalculatorGuide data={guideContent} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
