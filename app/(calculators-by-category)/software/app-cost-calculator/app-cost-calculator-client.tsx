"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Smartphone, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Briefcase,
  Palette,
  Zap,
  MessageSquare,
  Shield,
  TrendingUp,
  Mail,
  Printer,
  RotateCcw,
  GraduationCap,
  Heart,
  Users,
  Landmark,
  Plane,
  ShoppingCart,
  Layers
} from "lucide-react"
import CalculatorGuide from "@/components/calculator-guide"

// Feature cost weights (in hours)
const FEATURE_COSTS = {
  // Design
  mvp: 40,
  fullProduct: 80,
  ongoingPlatform: 120,
  basicUI: 30,
  standardUI: 60,
  advancedUI: 100,
  screens_1_5: 20,
  screens_6_10: 40,
  screens_11_20: 70,
  screens_21plus: 100,
  noAnimations: 0,
  basicAnimations: 15,
  advancedAnimations: 40,
  basicBrand: 10,
  standardBrand: 25,
  premiumBrand: 50,
  
  // Key Features
  login: 8,
  socialLogin: 12,
  userProfiles: 15,
  chat: 30,
  socialIntegration: 20,
  payments: 35,
  searchFilters: 25,
  mediaUpload: 20,
  analytics: 30,
  adminPanel: 40,
  pushNotifications: 12,
  locationServices: 25,
  
  // Communication
  messaging: 25,
  emailSMS: 15,
  supportSystem: 30,
  alerts: 10,
  
  // Interactivity
  scheduling: 20,
  booking: 30,
  gamification: 35,
  realTimeFeed: 40,
  
  // Security
  apiIntegration: 25,
  dataEncryption: 20,
  gdprCompliance: 30,
  hipaaCompliance: 40,
  securityDashboard: 25,
  
  // Promotion
  aso: 15,
  inAppAds: 20,
  adPlatformIntegration: 25
}

const HOURLY_RATE = 70 // Default hourly rate in USD

interface AppCostCalculatorClientProps {
  uiContent?: any
  guideContent?: any
}

const industryIcons: Record<string, any> = {
  education: GraduationCap,
  healthcare: Heart,
  social: Users,
  fintech: Landmark,
  travel: Plane,
  ecommerce: ShoppingCart,
  other: Layers
}

export default function AppCostCalculatorClient({ uiContent, guideContent }: AppCostCalculatorClientProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Industry
    industry: "",
    
    // Step 2: Product Design
    productType: "",
    uiComplexity: "",
    screenCount: "",
    animations: "",
    brandDesign: "",
    
    // Step 3: Key Features
    features: [] as string[],
    
    // Step 4: Communication
    communication: [] as string[],
    
    // Step 5: Interactivity
    interactivity: [] as string[],
    
    // Step 6: Security & Ownership
    security: [] as string[],
    
    // Step 7: Promotion
    promotion: [] as string[],
    
    // Contact Info
    name: "",
    email: "",
    company: ""
  })
  
  const [result, setResult] = useState<{
    totalCost: number
    totalHours: number
    selectedFeatures: string[]
    breakdown: { category: string; hours: number; cost: number }[]
  } | null>(null)

  const handleCheckboxChange = (field: 'features' | 'communication' | 'interactivity' | 'security' | 'promotion', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const calculateCost = () => {
    let totalHours = 0
    const breakdown: { category: string; hours: number; cost: number }[] = []
    const selectedFeatures: string[] = []

    // Design hours
    let designHours = 0
    if (formData.productType) {
      designHours += FEATURE_COSTS[formData.productType as keyof typeof FEATURE_COSTS] || 0
      selectedFeatures.push(formData.productType)
    }
    if (formData.uiComplexity) {
      designHours += FEATURE_COSTS[formData.uiComplexity as keyof typeof FEATURE_COSTS] || 0
      selectedFeatures.push(formData.uiComplexity)
    }
    if (formData.screenCount) {
      designHours += FEATURE_COSTS[formData.screenCount as keyof typeof FEATURE_COSTS] || 0
      selectedFeatures.push(formData.screenCount)
    }
    if (formData.animations) {
      designHours += FEATURE_COSTS[formData.animations as keyof typeof FEATURE_COSTS] || 0
      selectedFeatures.push(formData.animations)
    }
    if (formData.brandDesign) {
      designHours += FEATURE_COSTS[formData.brandDesign as keyof typeof FEATURE_COSTS] || 0
      selectedFeatures.push(formData.brandDesign)
    }
    
    if (designHours > 0) {
      breakdown.push({ category: 'UI/UX Design', hours: designHours, cost: designHours * HOURLY_RATE })
      totalHours += designHours
    }

    // Key Features
    let featureHours = 0
    formData.features.forEach(feature => {
      const hours = FEATURE_COSTS[feature as keyof typeof FEATURE_COSTS] || 0
      featureHours += hours
      selectedFeatures.push(feature)
    })
    if (featureHours > 0) {
      breakdown.push({ category: 'Key Features', hours: featureHours, cost: featureHours * HOURLY_RATE })
      totalHours += featureHours
    }

    // Communication
    let commHours = 0
    formData.communication.forEach(comm => {
      const hours = FEATURE_COSTS[comm as keyof typeof FEATURE_COSTS] || 0
      commHours += hours
      selectedFeatures.push(comm)
    })
    if (commHours > 0) {
      breakdown.push({ category: 'Communication', hours: commHours, cost: commHours * HOURLY_RATE })
      totalHours += commHours
    }

    // Interactivity
    let interactivityHours = 0
    formData.interactivity.forEach(inter => {
      const hours = FEATURE_COSTS[inter as keyof typeof FEATURE_COSTS] || 0
      interactivityHours += hours
      selectedFeatures.push(inter)
    })
    if (interactivityHours > 0) {
      breakdown.push({ category: 'Interactivity', hours: interactivityHours, cost: interactivityHours * HOURLY_RATE })
      totalHours += interactivityHours
    }

    // Security
    let securityHours = 0
    formData.security.forEach(sec => {
      const hours = FEATURE_COSTS[sec as keyof typeof FEATURE_COSTS] || 0
      securityHours += hours
      selectedFeatures.push(sec)
    })
    if (securityHours > 0) {
      breakdown.push({ category: 'Security & Compliance', hours: securityHours, cost: securityHours * HOURLY_RATE })
      totalHours += securityHours
    }

    // Promotion
    let promoHours = 0
    formData.promotion.forEach(promo => {
      const hours = FEATURE_COSTS[promo as keyof typeof FEATURE_COSTS] || 0
      promoHours += hours
      selectedFeatures.push(promo)
    })
    if (promoHours > 0) {
      breakdown.push({ category: 'Promotion & Marketing', hours: promoHours, cost: promoHours * HOURLY_RATE })
      totalHours += promoHours
    }

    const totalCost = totalHours * HOURLY_RATE

    setResult({
      totalCost,
      totalHours,
      selectedFeatures,
      breakdown
    })
  }

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateCost()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetCalculator = () => {
    setFormData({
      industry: "",
      productType: "",
      uiComplexity: "",
      screenCount: "",
      animations: "",
      brandDesign: "",
      features: [],
      communication: [],
      interactivity: [],
      security: [],
      promotion: [],
      name: "",
      email: "",
      company: ""
    })
    setResult(null)
    setCurrentStep(1)
  }

  const content = uiContent || {}
  const guide = guideContent || {}

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-section,
          #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          @page {
            margin: 1cm;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 no-print">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 px-4">
            {content.title || "App Cost Calculator"}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            {content.subtitle || "Estimate your app development cost in minutes"}
          </p>
        </div>

        {!result ? (
          <Card className="shadow-2xl border-0 overflow-hidden transition-all pt-0 duration-300 hover:shadow-3xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 text-white">
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <span className="flex items-center gap-2">
                  <span className="hidden sm:inline">{content[`step${currentStep}Title`] || `Step ${currentStep} of 8`}</span>
                  <span className="sm:hidden">Step {currentStep}/8</span>
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 sm:w-32 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 8) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-normal">{currentStep}/8</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              {/* Step 1: Industry */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label className="text-lg sm:text-xl font-bold text-gray-800 mb-2 block">{content.industryLabel || "Select Your Industry"}</Label>
                    <p className="text-sm text-gray-600 mb-4">{content.industryDescription || "Choose the industry that best matches your app"}</p>
                  </div>
                  <RadioGroup value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['education', 'healthcare', 'social', 'fintech', 'travel', 'ecommerce', 'other'].map(industry => {
                        const Icon = industryIcons[industry]
                        return (
                          <div key={industry} className={`flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-purple-300 transition-all cursor-pointer group ${
                            formData.industry === industry ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-purple-400' : ''
                          }`}>
                            <RadioGroupItem value={industry} id={industry} className="border-2" />
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                                formData.industry === industry ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  formData.industry === industry ? 'text-white' : 'text-gray-600 group-hover:text-white'
                                }`} />
                              </div>
                              <Label htmlFor={industry} className="cursor-pointer font-medium text-gray-700 group-hover:text-purple-700">
                                {content[`industry_${industry}`] || industry.charAt(0).toUpperCase() + industry.slice(1)}
                              </Label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 2: Product Design */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold mb-3 block">{content.productTypeLabel || "Product Type"}</Label>
                    <RadioGroup value={formData.productType} onValueChange={(value) => setFormData({...formData, productType: value})}>
                      {['mvp', 'fullProduct', 'ongoingPlatform'].map(type => (
                        <div key={type} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                          <RadioGroupItem value={type} id={type} />
                          <Label htmlFor={type} className="cursor-pointer flex-1">
                            {content[`productType_${type}`] || type}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold mb-3 block">{content.uiComplexityLabel || "UI/UX Complexity"}</Label>
                    <RadioGroup value={formData.uiComplexity} onValueChange={(value) => setFormData({...formData, uiComplexity: value})}>
                      {['basicUI', 'standardUI', 'advancedUI'].map(ui => (
                        <div key={ui} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                          <RadioGroupItem value={ui} id={ui} />
                          <Label htmlFor={ui} className="cursor-pointer flex-1">
                            {content[`ui_${ui}`] || ui}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold mb-3 block">{content.screenCountLabel || "Number of Screens"}</Label>
                    <RadioGroup value={formData.screenCount} onValueChange={(value) => setFormData({...formData, screenCount: value})}>
                      {['screens_1_5', 'screens_6_10', 'screens_11_20', 'screens_21plus'].map(screens => (
                        <div key={screens} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                          <RadioGroupItem value={screens} id={screens} />
                          <Label htmlFor={screens} className="cursor-pointer flex-1">
                            {content[`screens_${screens}`] || screens}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 3: Key Features */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{content.keyFeaturesLabel || "Select Key Features"}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['login', 'socialLogin', 'userProfiles', 'chat', 'socialIntegration', 'payments', 'searchFilters', 'mediaUpload', 'analytics', 'adminPanel', 'pushNotifications', 'locationServices'].map(feature => (
                      <div key={feature} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                        <Checkbox 
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => handleCheckboxChange('features', feature)}
                        />
                        <Label htmlFor={feature} className="cursor-pointer flex-1">
                          {content[`feature_${feature}`] || feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Communication */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{content.communicationLabel || "Communication Features"}</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {['messaging', 'emailSMS', 'supportSystem', 'alerts'].map(comm => (
                      <div key={comm} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                        <Checkbox 
                          id={comm}
                          checked={formData.communication.includes(comm)}
                          onCheckedChange={() => handleCheckboxChange('communication', comm)}
                        />
                        <Label htmlFor={comm} className="cursor-pointer flex-1">
                          {content[`comm_${comm}`] || comm}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Interactivity */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{content.interactivityLabel || "Interactive Features"}</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {['scheduling', 'booking', 'gamification', 'realTimeFeed'].map(inter => (
                      <div key={inter} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                        <Checkbox 
                          id={inter}
                          checked={formData.interactivity.includes(inter)}
                          onCheckedChange={() => handleCheckboxChange('interactivity', inter)}
                        />
                        <Label htmlFor={inter} className="cursor-pointer flex-1">
                          {content[`inter_${inter}`] || inter}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Security */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{content.securityLabel || "Security & Compliance"}</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {['apiIntegration', 'dataEncryption', 'gdprCompliance', 'hipaaCompliance', 'securityDashboard'].map(sec => (
                      <div key={sec} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                        <Checkbox 
                          id={sec}
                          checked={formData.security.includes(sec)}
                          onCheckedChange={() => handleCheckboxChange('security', sec)}
                        />
                        <Label htmlFor={sec} className="cursor-pointer flex-1">
                          {content[`security_${sec}`] || sec}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Promotion */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">{content.promotionLabel || "Promotion & Marketing"}</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {['aso', 'inAppAds', 'adPlatformIntegration'].map(promo => (
                      <div key={promo} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                        <Checkbox 
                          id={promo}
                          checked={formData.promotion.includes(promo)}
                          onCheckedChange={() => handleCheckboxChange('promotion', promo)}
                        />
                        <Label htmlFor={promo} className="cursor-pointer flex-1">
                          {content[`promo_${promo}`] || promo}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Contact Info */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold mb-4 block">{content.contactLabel || "Get Your Detailed Quote"}</Label>
                  <div>
                    <Label htmlFor="name">{content.nameLabel || "Your Name"}</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={content.namePlaceholder || "John Doe"}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{content.emailLabel || "Email Address"}</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder={content.emailPlaceholder || "john@example.com"}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">{content.companyLabel || "Company (Optional)"}</Label>
                    <Input 
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder={content.companyPlaceholder || "Your Company"}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t gap-4">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{content.backButton || "Back"}</span>
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                >
                  {currentStep === 8 ? (content.calculateButton || "Calculate Cost") : (content.nextButton || "Next")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6" id="print-section">
            {/* Print Header - Only visible when printing */}
            <div className="hidden print:block mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">App Development Cost Estimate</h1>
              <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            {/* Results Card */}
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white print:shadow-none print:border print:border-gray-300">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-6 sm:mb-8">
                  <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 print:text-blue-600" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{content.resultsTitle || "Your App Cost Estimate"}</h2>
                  <p className="text-blue-100 text-sm sm:text-base print:text-gray-600">{content.resultsSubtitle || "Based on your selected features and requirements"}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 print:bg-blue-50 print:text-gray-900 transition-transform hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 print:text-blue-600" />
                      <span className="text-base sm:text-lg opacity-90 print:opacity-100">{content.totalCostLabel || "Estimated Cost"}</span>
                    </div>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">${result.totalCost.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm mt-2 opacity-75 print:opacity-100">{content.costNote || "Base estimate at $70/hour"}</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 print:bg-purple-50 print:text-gray-900 transition-transform hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 print:text-purple-600" />
                      <span className="text-base sm:text-lg opacity-90 print:opacity-100">{content.totalHoursLabel || "Development Time"}</span>
                    </div>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">{result.totalHours} {content.hoursLabel || "hrs"}</p>
                    <p className="text-xs sm:text-sm mt-2 opacity-75 print:opacity-100">{content.timeNote || "Approximate timeline: " + Math.ceil(result.totalHours / 160) + " months"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown Card */}
            <Card className="shadow-2xl border-0 print:shadow-none print:border print:border-gray-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 print:bg-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  {content.breakdownTitle || "Cost Breakdown"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {result.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow print:bg-white print:border print:border-gray-200">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-base sm:text-lg">{item.category}</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.hours} {content.hoursLabel || "hours"} × $70/hr</p>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">${item.cost.toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mt-4 print:bg-gray-900">
                    <div>
                      <p className="font-bold text-lg sm:text-xl">Total</p>
                      <p className="text-xs sm:text-sm opacity-90">{result.totalHours} total hours</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold">${result.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Features Card */}
            <Card className="shadow-2xl border-0 print:shadow-none print:border print:border-gray-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 print:bg-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  {content.selectedFeaturesTitle || "Selected Features"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {result.selectedFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors print:border print:border-green-200">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{content[`feature_${feature}`] || feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form Card */}
            {formData.email && (
              <Card className="shadow-xl border-0 bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {content.contactSuccessTitle || "We'll Contact You Soon!"}
                      </h3>
                      <p className="text-gray-600">
                        {content.contactSuccessMessage || `Thank you ${formData.name}! We'll send a detailed quote to ${formData.email} within 24 hours.`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 no-print">
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base border-2 hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4" />
                {content.newCalculationButton || "New Calculation"}
              </Button>
              <Button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center text-white gap-2 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Printer className="w-4 h-4" />
                {content.printButton || "Print Estimate"}
              </Button>
            </div>
          </div>
        )}

        {/* Guide Content Section */}
        {guideContent && (
          <div className="no-print">
            <CalculatorGuide data={guideContent} />
          </div>
        )}
      </div>
      </div>
    </>
  )
}
