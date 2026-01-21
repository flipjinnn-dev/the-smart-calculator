"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, DollarSign, TrendingUp, Building2, Briefcase, Users, Laptop, FileText, Shield, Package, Lightbulb, Truck, Globe, AlertTriangle } from "lucide-react"
import CalculatorGuide from "@/components/calculator-guide"

interface StartupCost {
  advertising: string
  businessPlan: string
  communications: string
  financing: string
  fixtures: string
  insurance: string
  officeSupplies: string
  premises: string
  professionalFees: string
  productDev: string
  research: string
  transport: string
  website: string
  otherCosts: string
  unexpected: string
  ownCapital: string
}

interface StartupResult {
  totalCost: number
  netFundingNeeded: number
  isValid: boolean
  message?: string
  breakdown: Array<{ category: string; amount: number }>
}

export default function StartupCostsCalculatorClient({
  uiContent,
  guideData,
}: {
  uiContent?: any
  guideData?: any
}) {
  const [costs, setCosts] = useState<StartupCost>({
    advertising: "",
    businessPlan: "",
    communications: "",
    financing: "",
    fixtures: "",
    insurance: "",
    officeSupplies: "",
    premises: "",
    professionalFees: "",
    productDev: "",
    research: "",
    transport: "",
    website: "",
    otherCosts: "",
    unexpected: "",
    ownCapital: ""
  })
  const [result, setResult] = useState<StartupResult | null>(null)

  const handleInputChange = (field: keyof StartupCost, value: string) => {
    setCosts(prev => ({ ...prev, [field]: value }))
  }

  const calculate = () => {
    const advertising = parseFloat(costs.advertising) || 0
    const businessPlan = parseFloat(costs.businessPlan) || 0
    const communications = parseFloat(costs.communications) || 0
    const financing = parseFloat(costs.financing) || 0
    const fixtures = parseFloat(costs.fixtures) || 0
    const insurance = parseFloat(costs.insurance) || 0
    const officeSupplies = parseFloat(costs.officeSupplies) || 0
    const premises = parseFloat(costs.premises) || 0
    const professionalFees = parseFloat(costs.professionalFees) || 0
    const productDev = parseFloat(costs.productDev) || 0
    const research = parseFloat(costs.research) || 0
    const transport = parseFloat(costs.transport) || 0
    const website = parseFloat(costs.website) || 0
    const otherCosts = parseFloat(costs.otherCosts) || 0
    const unexpected = parseFloat(costs.unexpected) || 0
    const ownCapital = parseFloat(costs.ownCapital) || 0

    const allCosts = [
      advertising, businessPlan, communications, financing, fixtures,
      insurance, officeSupplies, premises, professionalFees, productDev,
      research, transport, website, otherCosts, unexpected
    ]

    if (allCosts.some(cost => cost < 0) || ownCapital < 0) {
      setResult({
        totalCost: 0,
        netFundingNeeded: 0,
        isValid: false,
        message: uiContent?.errors?.negativeValues || "All values must be positive or zero",
        breakdown: []
      })
      return
    }

    const totalCost = allCosts.reduce((sum, cost) => sum + cost, 0)
    const netFundingNeeded = Math.max(0, totalCost - ownCapital)

    const breakdown: Array<{ category: string; amount: number }> = []
    if (advertising > 0) breakdown.push({ category: uiContent?.labels?.advertising || "Advertising & Marketing", amount: advertising })
    if (businessPlan > 0) breakdown.push({ category: uiContent?.labels?.businessPlan || "Business Plan", amount: businessPlan })
    if (communications > 0) breakdown.push({ category: uiContent?.labels?.communications || "Communications Infrastructure", amount: communications })
    if (financing > 0) breakdown.push({ category: uiContent?.labels?.financing || "Cost of Financing", amount: financing })
    if (fixtures > 0) breakdown.push({ category: uiContent?.labels?.fixtures || "Fixtures & Equipment", amount: fixtures })
    if (insurance > 0) breakdown.push({ category: uiContent?.labels?.insurance || "Insurance", amount: insurance })
    if (officeSupplies > 0) breakdown.push({ category: uiContent?.labels?.officeSupplies || "Office Supplies", amount: officeSupplies })
    if (premises > 0) breakdown.push({ category: uiContent?.labels?.premises || "Premises", amount: premises })
    if (professionalFees > 0) breakdown.push({ category: uiContent?.labels?.professionalFees || "Professional Fees", amount: professionalFees })
    if (productDev > 0) breakdown.push({ category: uiContent?.labels?.productDev || "Product Development & Stock", amount: productDev })
    if (research > 0) breakdown.push({ category: uiContent?.labels?.research || "Research & Development", amount: research })
    if (transport > 0) breakdown.push({ category: uiContent?.labels?.transport || "Transport", amount: transport })
    if (website > 0) breakdown.push({ category: uiContent?.labels?.website || "Website Development", amount: website })
    if (otherCosts > 0) breakdown.push({ category: uiContent?.labels?.otherCosts || "Other Costs", amount: otherCosts })
    if (unexpected > 0) breakdown.push({ category: uiContent?.labels?.unexpected || "Unexpected Costs", amount: unexpected })

    setResult({
      totalCost,
      netFundingNeeded,
      isValid: true,
      breakdown
    })
  }

  const currencySymbol = uiContent?.currencySymbol || "£"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            {uiContent?.title || "Business Startup Cost Calculator"}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {uiContent?.description || "Calculate the total startup costs needed to launch your business"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-blue-100 pt-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r pt-6 from-blue-50 to-purple-50 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <DollarSign className="w-5 h-5" />
                  {uiContent?.cardTitles?.marketingSetup || "Marketing & Setup Costs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advertising" className="flex items-center gap-2 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    {uiContent?.labels?.advertising || "Advertising & Marketing"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="advertising"
                      type="number"
                      value={costs.advertising}
                      onChange={(e) => handleInputChange('advertising', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.advertising}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessPlan" className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4 text-blue-600" />
                    {uiContent?.labels?.businessPlan || "Business Plan"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="businessPlan"
                      type="number"
                      value={costs.businessPlan}
                      onChange={(e) => handleInputChange('businessPlan', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.businessPlan}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communications" className="flex items-center gap-2 text-sm font-medium">
                    <Laptop className="w-4 h-4 text-blue-600" />
                    {uiContent?.labels?.communications || "Communications Infrastructure"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="communications"
                      type="number"
                      value={costs.communications}
                      onChange={(e) => handleInputChange('communications', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.communications}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
                    <Globe className="w-4 h-4 text-blue-600" />
                    {uiContent?.labels?.website || "Website Development"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="website"
                      type="number"
                      value={costs.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.website}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 pt-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r pt-6 from-purple-50 to-blue-50 border-b">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Building2 className="w-5 h-5" />
                  {uiContent?.cardTitles?.operationalCosts || "Operational & Infrastructure Costs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="premises" className="flex items-center gap-2 text-sm font-medium">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    {uiContent?.labels?.premises || "Premises"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="premises"
                      type="number"
                      value={costs.premises}
                      onChange={(e) => handleInputChange('premises', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.premises}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixtures" className="flex items-center gap-2 text-sm font-medium">
                    <Package className="w-4 h-4 text-purple-600" />
                    {uiContent?.labels?.fixtures || "Fixtures & Equipment"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="fixtures"
                      type="number"
                      value={costs.fixtures}
                      onChange={(e) => handleInputChange('fixtures', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.fixtures}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officeSupplies" className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4 text-purple-600" />
                    {uiContent?.labels?.officeSupplies || "Office Supplies"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="officeSupplies"
                      type="number"
                      value={costs.officeSupplies}
                      onChange={(e) => handleInputChange('officeSupplies', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.officeSupplies}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transport" className="flex items-center gap-2 text-sm font-medium">
                    <Truck className="w-4 h-4 text-purple-600" />
                    {uiContent?.labels?.transport || "Transport"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="transport"
                      type="number"
                      value={costs.transport}
                      onChange={(e) => handleInputChange('transport', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.transport}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 pt-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r pt-6 from-green-50 to-blue-50 border-b">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Users className="w-5 h-5" />
                  {uiContent?.cardTitles?.professionalCosts || "Professional & Development Costs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="professionalFees" className="flex items-center gap-2 text-sm font-medium">
                    <Briefcase className="w-4 h-4 text-green-600" />
                    {uiContent?.labels?.professionalFees || "Professional Fees"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="professionalFees"
                      type="number"
                      value={costs.professionalFees}
                      onChange={(e) => handleInputChange('professionalFees', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.professionalFees}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance" className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="w-4 h-4 text-green-600" />
                    {uiContent?.labels?.insurance || "Insurance"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="insurance"
                      type="number"
                      value={costs.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.insurance}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productDev" className="flex items-center gap-2 text-sm font-medium">
                    <Package className="w-4 h-4 text-green-600" />
                    {uiContent?.labels?.productDev || "Product Development & Stock"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="productDev"
                      type="number"
                      value={costs.productDev}
                      onChange={(e) => handleInputChange('productDev', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.productDev}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="research" className="flex items-center gap-2 text-sm font-medium">
                    <Lightbulb className="w-4 h-4 text-green-600" />
                    {uiContent?.labels?.research || "Research & Development"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="research"
                      type="number"
                      value={costs.research}
                      onChange={(e) => handleInputChange('research', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.research}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-100 pt-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r pt-6 from-amber-50 to-orange-50 border-b">
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <AlertTriangle className="w-5 h-5" />
                  {uiContent?.cardTitles?.otherCosts || "Other & Contingency Costs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="financing" className="flex items-center gap-2 text-sm font-medium">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    {uiContent?.labels?.financing || "Cost of Financing"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="financing"
                      type="number"
                      value={costs.financing}
                      onChange={(e) => handleInputChange('financing', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.financing}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherCosts" className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4 text-amber-600" />
                    {uiContent?.labels?.otherCosts || "Other Costs"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="otherCosts"
                      type="number"
                      value={costs.otherCosts}
                      onChange={(e) => handleInputChange('otherCosts', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.otherCosts}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unexpected" className="flex items-center gap-2 text-sm font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    {uiContent?.labels?.unexpected || "Unexpected Costs (Rainy Day Fund)"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="unexpected"
                      type="number"
                      value={costs.unexpected}
                      onChange={(e) => handleInputChange('unexpected', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.unexpected}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownCapital" className="flex items-center gap-2 text-sm font-medium">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    {uiContent?.labels?.ownCapital || "Your Own Capital"}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{currencySymbol}</span>
                    <Input
                      id="ownCapital"
                      type="number"
                      value={costs.ownCapital}
                      onChange={(e) => handleInputChange('ownCapital', e.target.value)}
                      placeholder="0"
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{uiContent?.descriptions?.ownCapital}</p>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={calculate}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              {uiContent?.labels?.calculateButton || "Calculate Total Startup Costs"}
            </Button>
          </div>

          <div className="lg:col-span-1">
            {result && result.isValid ? (
              <Card className="border-2 border-green-200 shadow-xl pt-0 sticky top-6 bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader className="border-b bg-gradient-to-r pt-6 from-green-100 to-blue-100">
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    {uiContent?.results?.title || "Startup Cost Analysis"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
                    <div className="text-sm text-gray-600 mb-2">{uiContent?.results?.totalStartupCost || "Total Startup Cost"}</div>
                    <div className="text-4xl font-bold text-green-600">{currencySymbol}{result.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
                    <div className="text-sm text-gray-600 mb-2">{uiContent?.results?.netFundingNeeded || "Net Funding Needed"}</div>
                    <div className="text-3xl font-bold text-blue-600">{currencySymbol}{result.netFundingNeeded.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p className="text-xs text-gray-500 mt-2">{uiContent?.results?.afterCapital || "After your own capital"}</p>
                  </div>

                  {result.breakdown.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {uiContent?.results?.breakdown || "Cost Breakdown"}
                      </h4>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {result.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border">
                            <span className="text-sm text-gray-700">{item.category}</span>
                            <span className="font-semibold text-gray-900">{currencySymbol}{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {uiContent?.results?.keyInsights || "Key Insights"}
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• {uiContent?.results?.insight1 || "This is the minimum capital needed to start"}</li>
                      <li>• {uiContent?.results?.insight2 || "Add 10-20% buffer for unexpected costs"}</li>
                      <li>• {uiContent?.results?.insight3 || "Consider funding options: savings, loans, investors"}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : result && !result.isValid ? (
              <Card className="border-2 border-red-200 pt-0 shadow-xl sticky top-6">
                <CardHeader className="border-b bg-red-50 pt-6">
                  <CardTitle className="text-red-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {uiContent?.errors?.title || "Cannot Calculate"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-red-700">{result.message}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-gray-200 shadow-xl pt-0 sticky top-6">
                <CardHeader className="border-b bg-gradient-to-r pt-6 from-blue-50 to-purple-50">
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    {uiContent?.results?.readyTitle || "Ready to Calculate?"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    {uiContent?.results?.readyDesc || "Enter your estimated startup costs in the form and click calculate to see your total budget requirements."}
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm text-blue-800">
                      💡 {uiContent?.results?.tip || "Tip: Be realistic with your estimates. It's better to overestimate than underestimate."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {guideData && <CalculatorGuide data={guideData} />}
      </div>
    </div>
  )
}
