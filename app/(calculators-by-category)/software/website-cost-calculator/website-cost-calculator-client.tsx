"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Calculator, DollarSign, TrendingUp, CheckCircle2, Info, Zap, Sparkles, Globe, Database, Briefcase, Building2 } from "lucide-react"
import CalculatorGuide from "@/components/calculator-guide"

interface CostBreakdown {
  baseDesign: number
  pages: number
  copywriting: number
  seo: number
  responsive: number
  database: number
  ecommerce: number
  cms: number
  hosting: number
  maintenance: number
}

interface WebsiteCostCalculatorClientProps {
  content: any
  guideContent: any
}

export default function WebsiteCostCalculatorClient({ content, guideContent }: WebsiteCostCalculatorClientProps) {
  const uiContent = content
  const guideData = guideContent || { color: 'blue', sections: [], faq: [] }
  
  // State
  const [numberOfPages, setNumberOfPages] = useState(5)
  const [designLevel, setDesignLevel] = useState("standard")
  const [copywritingPages, setCopywritingPages] = useState(0)
  const [seoKeywords, setSeoKeywords] = useState(0)
  const [responsiveDesign, setResponsiveDesign] = useState(true)
  const [databaseLevel, setDatabaseLevel] = useState("none")
  const [ecommerceLevel, setEcommerceLevel] = useState("none")
  const [cmsChoice, setCmsChoice] = useState("none")
  const [providerType, setProviderType] = useState("agency")
  
  const [result, setResult] = useState<{
    totalCost: number
    lowEstimate: number
    highEstimate: number
    breakdown: CostBreakdown
  } | null>(null)

  const designLevelCosts = {
    basic: { base: 3500, max: 6000, perPage: 200 },
    standard: { base: 6000, max: 12000, perPage: 350 },
    excellent: { base: 12000, max: 25000, perPage: 600 },
    worldClass: { base: 25000, max: 50000, perPage: 1000 }
  }

  const calculate = () => {
    const design = designLevelCosts[designLevel as keyof typeof designLevelCosts]
    const providerFactor = providerType === 'freelancer' ? 0.65 : 1.0
    
    const baseDesignCost = design.base * providerFactor
    const additionalPages = Math.max(0, numberOfPages - 5)
    const pagesCost = additionalPages * design.perPage * providerFactor
    const copywritingCost = copywritingPages * 300 * providerFactor
    const seoCost = seoKeywords * 200 * providerFactor
    const responsiveCost = responsiveDesign ? baseDesignCost * 0.2 : 0
    
    const databaseCosts = { none: 0, basic: 2500, advanced: 6000, full: 12000 }
    const databaseCost = databaseCosts[databaseLevel as keyof typeof databaseCosts] * providerFactor
    
    const ecommerceCosts = { none: 0, basic: 5000, standard: 10000, advanced: 20000, full: 35000 }
    const ecommerceCost = ecommerceCosts[ecommerceLevel as keyof typeof ecommerceCosts] * providerFactor
    
    const cmsCosts = { none: 0, wordpress: 2000, custom: 8000, enterprise: 15000 }
    const cmsCost = cmsCosts[cmsChoice as keyof typeof cmsCosts] * providerFactor
    
    const hostingCost = 500
    const developmentTotal = baseDesignCost + pagesCost + copywritingCost + seoCost + responsiveCost + databaseCost + ecommerceCost + cmsCost
    const maintenanceCost = Math.round(developmentTotal * 0.15)
    const totalCost = developmentTotal + hostingCost + maintenanceCost
    const lowEstimate = Math.round(totalCost * 0.8)
    const highEstimate = Math.round(totalCost * 1.2)
    
    setResult({
      totalCost: Math.round(totalCost),
      lowEstimate,
      highEstimate,
      breakdown: {
        baseDesign: Math.round(baseDesignCost),
        pages: Math.round(pagesCost),
        copywriting: Math.round(copywritingCost),
        seo: Math.round(seoCost),
        responsive: Math.round(responsiveCost),
        database: Math.round(databaseCost),
        ecommerce: Math.round(ecommerceCost),
        cms: Math.round(cmsCost),
        hosting: hostingCost,
        maintenance: maintenanceCost
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 rounded-3xl mb-6 shadow-2xl">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            {uiContent?.title || "Website Cost Calculator"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {uiContent?.description || "Get accurate estimates for your professional website development project based on 2024 market rates"}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Provider Type */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
               <CardContent className="p-6">
                 <Label className="text-lg font-bold text-gray-900 mb-4 block">{uiContent?.labels?.providerQuestion || "Who will build your website?"}</Label>
                 <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => setProviderType("freelancer")}
                     className={`rounded-xl border-2 p-4 transition-all ${providerType === "freelancer" ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600/20" : "border-gray-200 hover:border-blue-300"}`}
                   >
                     <div className="flex items-center gap-3 mb-2">
                       <div className={`p-2 rounded-lg ${providerType === "freelancer" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                         <Briefcase className="w-5 h-5" />
                       </div>
                       <span className={`font-bold ${providerType === "freelancer" ? "text-blue-900" : "text-gray-700"}`}>{uiContent?.labels?.freelancer || "Freelancer"}</span>
                     </div>
                     <p className="text-sm text-gray-600">{uiContent?.labels?.freelancerDesc || "Lower cost, direct communication"}</p>
                   </button>
                   
                   <button 
                     onClick={() => setProviderType("agency")}
                     className={`rounded-xl border-2 p-4 transition-all ${providerType === "agency" ? "border-cyan-600 bg-cyan-50 ring-2 ring-cyan-600/20" : "border-gray-200 hover:border-cyan-300"}`}
                   >
                     <div className="flex items-center gap-3 mb-2">
                       <div className={`p-2 rounded-lg ${providerType === "agency" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                         <Building2 className="w-5 h-5" />
                       </div>
                       <span className={`font-bold ${providerType === "agency" ? "text-cyan-900" : "text-gray-700"}`}>{uiContent?.labels?.agency || "Agency"}</span>
                     </div>
                     <p className="text-sm text-gray-600">{uiContent?.labels?.agencyDesc || "Full team, quality assurance"}</p>
                   </button>
                 </div>
               </CardContent>
            </Card>

            {/* General Settings */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm pt-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 py-6 to-cyan-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {uiContent?.cardTitles?.general || "General Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">{uiContent?.labels?.numberOfPages || "Number of Pages"}</Label>
                    <span className="text-2xl font-bold text-blue-600">{numberOfPages}</span>
                  </div>
                  <Slider 
                    className="[&>span:first-child]:bg-blue-200 [&>span:first-child]:h-2 [&_[role=slider]]:bg-blue-600 [&_[role=slider]]:border-blue-600"
                    value={[numberOfPages]} 
                    onValueChange={(v) => setNumberOfPages(v[0])} 
                    min={1} 
                    max={50} 
                    step={1} 
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">{uiContent?.labels?.designLevel || "Design Quality"}</Label>
                  <Select value={designLevel} onValueChange={setDesignLevel}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="basic">🟢 Basic - Template-based</SelectItem>
                      <SelectItem value="standard">🔵 Standard - Custom design</SelectItem>
                      <SelectItem value="excellent">🟣 Excellent - Premium quality</SelectItem>
                      <SelectItem value="worldClass">⭐ World Class - Enterprise grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-100">
                  <div>
                    <Label className="text-base font-semibold">{uiContent?.labels?.responsiveDesign || "Responsive Design"}</Label>
                    <p className="text-sm text-gray-600">{uiContent?.labels?.responsiveDesc || "Mobile & tablet optimization"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${responsiveDesign ? 'text-blue-600' : 'text-gray-400'}`}>
                      {responsiveDesign ? 'ON' : 'OFF'}
                    </span>
                    <Switch checked={responsiveDesign} onCheckedChange={setResponsiveDesign} className="data-[state=checked]:bg-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content & SEO */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm pt-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-teal-600 py-6 text-white">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {uiContent?.cardTitles?.contentSeo || "Content & SEO"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">{uiContent?.labels?.copywritingPages || "Professional Copywriting"}</Label>
                    <span className="text-2xl font-bold text-cyan-600">{copywritingPages}</span>
                  </div>
                  <Slider 
                    className="[&>span:first-child]:bg-cyan-200 [&>span:first-child]:h-2 [&_[role=slider]]:bg-cyan-600 [&_[role=slider]]:border-cyan-600"
                    value={[copywritingPages]} 
                    onValueChange={(v) => setCopywritingPages(v[0])} 
                    min={0} 
                    max={20} 
                    step={1} 
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">{uiContent?.labels?.seoKeywords || "SEO Keywords"}</Label>
                    <span className="text-2xl font-bold text-teal-600">{seoKeywords}</span>
                  </div>
                  <Slider 
                    className="[&>span:first-child]:bg-teal-200 [&>span:first-child]:h-2 [&_[role=slider]]:bg-teal-600 [&_[role=slider]]:border-teal-600"
                    value={[seoKeywords]} 
                    onValueChange={(v) => setSeoKeywords(v[0])} 
                    min={0} 
                    max={30} 
                    step={1} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Advanced Features */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm pt-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 py-6 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  {uiContent?.cardTitles?.features || "Advanced Features"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label>{uiContent?.labels?.databaseIntegration || "Database Integration"}</Label>
                  <Select value={databaseLevel} onValueChange={setDatabaseLevel}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="basic">Basic - Simple storage</SelectItem>
                      <SelectItem value="advanced">Advanced - Complex queries</SelectItem>
                      <SelectItem value="full">Full - Enterprise grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{uiContent?.labels?.ecommerce || "E-commerce"}</Label>
                  <Select value={ecommerceLevel} onValueChange={setEcommerceLevel}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="basic">Basic Store</SelectItem>
                      <SelectItem value="standard">Standard Store</SelectItem>
                      <SelectItem value="advanced">Advanced Store</SelectItem>
                      <SelectItem value="full">Full E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{uiContent?.labels?.cms || "Content Management"}</Label>
                  <Select value={cmsChoice} onValueChange={setCmsChoice}>
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="custom">Custom CMS</SelectItem>
                      <SelectItem value="enterprise">Enterprise CMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Button onClick={calculate} className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg">
              <Calculator className="w-5 h-5 mr-2" />
              {uiContent?.labels?.calculateButton || "Calculate Cost"}
            </Button>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8 space-y-6">
              {result ? (
                <>
                  <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
                    <CardHeader className="py-6">
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-6 h-6" />
                        {uiContent?.results?.title || "Your Estimate"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm opacity-90 mb-2">{uiContent?.results?.totalInvestment || "Total Investment"}</p>
                        <p className="text-5xl font-bold">${(result.totalCost / 1000).toFixed(1)}K</p>
                        <p className="text-sm opacity-75">(${result.totalCost.toLocaleString()})</p>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <p className="text-sm text-center mb-2">{uiContent?.results?.expectedRange || "Expected Range"}</p>
                        <p className="text-xl font-bold text-center">${result.lowEstimate.toLocaleString()} - ${result.highEstimate.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <span className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-semibold">
                          {providerType === 'freelancer' ? (uiContent?.results?.freelancerRate || 'Freelancer Rate') : (uiContent?.results?.agencyRate || 'Agency Rate')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-xl border-0 overflow-hidden border-2 pt-0">
                    <CardHeader className="bg-gradient-to-r from-blue-600 py-6 to-cyan-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        {uiContent?.results?.breakdown || "Breakdown"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2">
                      {result.breakdown.baseDesign > 0 && (
                        <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.baseDesign || "Base Design"}</span>
                          <span className="font-bold text-blue-600">${result.breakdown.baseDesign.toLocaleString()}</span>
                        </div>
                      )}
                      {result.breakdown.pages > 0 && (
                        <div className="flex justify-between p-3 bg-cyan-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.pages || "Additional Pages"}</span>
                          <span className="font-bold text-cyan-600">${result.breakdown.pages.toLocaleString()}</span>
                        </div>
                      )}
                      {result.breakdown.copywriting > 0 && (
                        <div className="flex justify-between p-3 bg-teal-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.copywriting || "Copywriting"}</span>
                          <span className="font-bold text-teal-600">${result.breakdown.copywriting.toLocaleString()}</span>
                        </div>
                      )}
                      {result.breakdown.seo > 0 && (
                        <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.seoKeywords || "SEO"}</span>
                          <span className="font-bold text-blue-600">${result.breakdown.seo.toLocaleString()}</span>
                        </div>
                      )}
                      {result.breakdown.responsive > 0 && (
                        <div className="flex justify-between p-3 bg-cyan-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.responsive || "Responsive"}</span>
                          <span className="font-bold text-cyan-600">${result.breakdown.responsive.toLocaleString()}</span>
                        </div>
                      )}
                      {result.breakdown.database > 0 && (
                        <div className="flex justify-between p-3 bg-teal-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.database || "Database"}</span>
                          <span className="font-bold text-teal-600">${result.breakdown.database.toLocaleString()}</span>
                        </div>
                      )}
                      {result.breakdown.ecommerce > 0 && (
                        <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.ecommerce || "E-commerce"}</span>
                          <span className="font-bold text-blue-600">${result.breakdown.ecommerce.toLocaleString()}</span>
                        </div>
                      )}
                      {result.breakdown.cms > 0 && (
                        <div className="flex justify-between p-3 bg-cyan-50 rounded-lg">
                          <span className="font-semibold">{uiContent?.results?.cmsSetup || "CMS"}</span>
                          <span className="font-bold text-cyan-600">${result.breakdown.cms.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold">{uiContent?.results?.hosting || "Hosting (1 yr)"}</span>
                        <span className="font-bold text-gray-600">${result.breakdown.hosting.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-amber-50 rounded-lg">
                        <span className="font-semibold">{uiContent?.results?.maintenance || "Maintenance"}</span>
                        <span className="font-bold text-amber-600">${result.breakdown.maintenance.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div className="text-sm space-y-2">
                          <p className="font-bold text-amber-900">{uiContent?.results?.notesTitle || "Important Notes"}</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>✓ {(uiContent?.results?.note1 || "Based on {provider} rates").replace('{provider}', providerType)}</li>
                            <li>✓ {uiContent?.results?.note2 || "Costs vary by location"}</li>
                            <li>✓ {uiContent?.results?.note3 || "Get 2-3 quotes for comparison"}</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="shadow-xl">
                  <CardContent className="p-12 text-center">
                    <Calculator className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-bold mb-2">{uiContent?.results?.readyTitle || "Ready to Calculate?"}</h3>
                    <p className="text-gray-600">{uiContent?.results?.readyDesc || "Configure your requirements and click calculate"}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {guideData?.sections?.length > 0 && (
          <div className="mt-16">
            <CalculatorGuide data={guideData} />
          </div>
        )}
      </div>
    </div>
  )
}
