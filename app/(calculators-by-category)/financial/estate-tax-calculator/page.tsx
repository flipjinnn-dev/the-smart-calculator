"use client"

import type React from "react"

import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Receipt, DollarSign, FileText, HelpCircle, Building, CreditCard, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

export default function EstateTaxCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Assets
  const [realEstate, setRealEstate] = useState("500000")
  const [investments, setInvestments] = useState("250000")
  const [savings, setSavings] = useState("100000")
  const [vehicles, setVehicles] = useState("50000")
  const [retirementPlans, setRetirementPlans] = useState("300000")
  const [lifeInsurance, setLifeInsurance] = useState("200000")
  const [otherAssets, setOtherAssets] = useState("0")

  // Liabilities & Expenses
  const [mortgages, setMortgages] = useState("200000")
  const [funeralExpenses, setFuneralExpenses] = useState("15000")
  const [adminExpenses, setAdminExpenses] = useState("25000")
  const [claims, setClaims] = useState("0")

  // Deductions
  const [charitableContributions, setCharitableContributions] = useState("0")

  // Other Adjustments
  const [lifetimeGifts, setLifetimeGifts] = useState("0")

  const [stateInheritanceTax, setStateInheritanceTax] = useState("0")
  const [results, setResults] = useState<{
    totalAssets: number
    totalLiabilities: number
    totalDeductions: number
    stateInheritanceTax: number
    lifetimeGifts: number
    netTaxableEstate: number
    exemption: number
    taxableEstate: number
    estateTaxOwed: number
  } | null>(null)

  const calculateEstateTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    // Assets (match competitor order and grouping)
    const assetFields = [
      Number.parseFloat(realEstate),
      Number.parseFloat(investments),
      Number.parseFloat(savings),
      Number.parseFloat(vehicles),
      Number.parseFloat(retirementPlans),
      Number.parseFloat(lifeInsurance),
      Number.parseFloat(otherAssets),
    ];
    const totalAssets = assetFields.reduce((a, b) => a + b, 0);

    // Liabilities & Deductions (match competitor order and grouping)
    const liabilityFields = [
      Number.parseFloat(mortgages), // Debts (mortgages, loan, credit cards, etc)
      Number.parseFloat(funeralExpenses), // Funeral, Administration, and Claims Expenses
      Number.parseFloat(charitableContributions), // Charitable Contributions
      Number.parseFloat(stateInheritanceTax), // State Inheritance or Estate Taxes
    ];
    const totalLiabilities = liabilityFields.reduce((a, b) => a + b, 0);

    // Lifetime Gifts
    const gifts = Number.parseFloat(lifetimeGifts);

    // Net taxable estate = Assets - Liabilities + Lifetime Gifts
    const netTaxableEstate = totalAssets - totalLiabilities + gifts;

    // Federal Exemption (2025 value)
    const exemption = 13990000;

    // Taxable Estate
    const taxableEstate = Math.max(0, netTaxableEstate - exemption);

    // Estate Tax Owed (40% rate)
    const rate = 0.4;
    const estateTaxOwed = taxableEstate * rate;

    setResults({
      totalAssets,
      totalLiabilities,
      totalDeductions: Number.parseFloat(charitableContributions),
      stateInheritanceTax: Number.parseFloat(stateInheritanceTax),
      lifetimeGifts: gifts,
      netTaxableEstate,
      exemption,
      taxableEstate,
      estateTaxOwed,
    });
  }

  return (
    <>
      <SEO
        title="Estate Tax Calculator 2025 – Federal Estate Tax Estimator"
        description="Free estate tax calculator to estimate federal estate taxes for 2025. Calculate gross estate, exemptions, and tax liability with current $13.99M exemption threshold."
        keywords="estate tax calculator, estate tax estimator, federal estate tax, inheritance tax calculator, 2025 estate tax"
        slug="/financial/estate-tax-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Estate Tax Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-green-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/financial" className="text-gray-500 hover:text-green-600">
                Finance Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Estate Tax Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Receipt className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Estate Tax Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate federal estate taxes for 2025 with the current $13.99 million exemption threshold.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Estate Tax Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Assets */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Building className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Assets</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Residence & Other Real Estate</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={realEstate}
                            onChange={(e) => setRealEstate(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">
                          Stocks, Bonds, Other Investments
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={investments}
                            onChange={(e) => setInvestments(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Savings, CDs, Checking Accounts</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={savings}
                            onChange={(e) => setSavings(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">
                          Vehicles, Boats, Other Properties
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={vehicles}
                            onChange={(e) => setVehicles(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Retirement Plans</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={retirementPlans}
                            onChange={(e) => setRetirementPlans(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Life Insurance Benefit</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={lifeInsurance}
                            onChange={(e) => setLifeInsurance(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">Other Assets</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={otherAssets}
                            onChange={(e) => setOtherAssets(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Liabilities & Expenses */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Liability, Costs, and Deductibles</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Debts (mortgages, loan, credit cards, etc)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={mortgages}
                            onChange={(e) => setMortgages(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Funeral, Administration, and Claims Expenses</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={funeralExpenses}
                            onChange={(e) => setFuneralExpenses(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Charitable Contributions</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={charitableContributions}
                            onChange={(e) => setCharitableContributions(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">State Inheritance or Estate Taxes</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={stateInheritanceTax}
                            onChange={(e) => setStateInheritanceTax(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Deductions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Deductions</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Charitable Contributions</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={charitableContributions}
                          onChange={(e) => setCharitableContributions(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Other Adjustments */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Lifetime Gifted Amount</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">
                        Total amount you've gifted tax free in your lifetime
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={lifetimeGifts}
                          onChange={(e) => setLifetimeGifts(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateEstateTax}
                    className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Estate Tax
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Estate Tax Results</CardTitle>
                  <CardDescription className="text-base">Your complete estate tax breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Summary Sentence (Competitor Style) */}
                      <div className="text-center p-4 mb-2">
                        <p className="text-lg font-semibold text-gray-900">
                          Net taxable estate is ${results.netTaxableEstate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
                        </p>
                        {/* Removed summary line as requested */}
                      </div>
                      {/* Estate Tax Owed */}
                      <div
                        className={`text-center p-6 rounded-2xl border-2 ${
                          results.estateTaxOwed === 0
                            ? "bg-gradient-to-r from-green-100 to-green-200 border-green-300"
                            : "bg-gradient-to-r from-red-100 to-red-200 border-red-300"
                        }`}
                      >
                        <p
                          className={`text-lg mb-2 font-semibold ${
                            results.estateTaxOwed === 0 ? "text-green-800" : "text-red-800"
                          }`}
                        >
                          Estate Tax Owed:
                        </p>
                        <p
                          className={`text-4xl font-bold mb-2 ${
                            results.estateTaxOwed === 0 ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          $
                          {results.estateTaxOwed.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        {results.estateTaxOwed === 0 && (
                          <p className="text-sm text-green-700 font-medium">
                            No estate tax is owed since the estate is below the exemption threshold.
                          </p>
                        )}
                      </div>

                      {/* Estate Summary */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          {/* Assets breakdown */}
                          <div className="flex flex-col gap-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">Assets</span>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>Residence & Other Real Estate</span>
                              <span className="text-right">${Number(realEstate).toLocaleString("en-US")}</span>
                              <span>Stocks, Bonds, and Other Investments</span>
                              <span className="text-right">${Number(investments).toLocaleString("en-US")}</span>
                              <span>Savings, CDs, and Checking Account Balance</span>
                              <span className="text-right">${Number(savings).toLocaleString("en-US")}</span>
                              <span>Vehicles, Boats, and Other Properties</span>
                              <span className="text-right">${Number(vehicles).toLocaleString("en-US")}</span>
                              <span>Retirement Plans</span>
                              <span className="text-right">${Number(retirementPlans).toLocaleString("en-US")}</span>
                              <span>Life Insurance Benefit</span>
                              <span className="text-right">${Number(lifeInsurance).toLocaleString("en-US")}</span>
                              <span>Other Assets</span>
                              <span className="text-right">${Number(otherAssets).toLocaleString("en-US")}</span>
                            </div>
                            <div className="flex justify-between font-bold mt-2">
                              <span>Total Assets</span>
                              <span>${results.totalAssets.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                          {/* Liabilities breakdown */}
                          <div className="flex flex-col gap-1 p-3 bg-red-50 rounded-lg border border-red-200">
                            <span className="font-medium text-gray-700">Liability, Costs, and Deductibles</span>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>Debts (mortgages, loan, credit cards, etc)</span>
                              <span className="text-right">${Number(mortgages).toLocaleString("en-US")}</span>
                              <span>Funeral, Administration, and Claims Expenses</span>
                              <span className="text-right">${Number(funeralExpenses).toLocaleString("en-US")}</span>
                              <span>Charitable Contributions</span>
                              <span className="text-right">${Number(charitableContributions).toLocaleString("en-US")}</span>
                              <span>State Inheritance or Estate Taxes</span>
                              <span className="text-right">${Number(stateInheritanceTax).toLocaleString("en-US")}</span>
                            </div>
                            <div className="flex justify-between font-bold mt-2">
                              <span>Total Liabilities & Deductions</span>
                              <span>${results.totalLiabilities.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                          {/* Lifetime Gifts */}
                          <div className="flex flex-col gap-1 p-3 bg-pink-50 rounded-lg border border-pink-200">
                            <span className="font-medium text-gray-700">Lifetime Gifted Amount</span>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>Total amount you've gifted tax free in your lifetime</span>
                              <span className="text-right">${Number(lifetimeGifts).toLocaleString("en-US")}</span>
                            </div>
                          </div>
                          {/* Net Taxable Estate */}
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">Net Taxable Estate</span>
                            <span className="font-bold text-gray-800">
                              ${results.netTaxableEstate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          {/* Federal Exemption */}
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <span className="font-medium text-gray-700">Federal Exemption (2025)</span>
                            <span className="font-bold text-green-600">
                              ${results.exemption.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          {/* Taxable Estate */}
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">Taxable Estate</span>
                            <span className="font-bold text-orange-600">
                              ${results.taxableEstate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tax Rate Info */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-800 mb-2">
                          <strong>Tax Rate:</strong> 40% on taxable estate above exemption
                        </p>
                        <p className="text-xs text-gray-600">
                          The federal estate tax rate is a flat 40% on the amount exceeding the $13.99M exemption for
                          2025.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your estate information to see your results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How to Use */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How to Use the Estate Tax Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <ol className="space-y-4 text-gray-700">
                      <li>
                        <strong>Enter Assets:</strong> Include all assets such as real estate, investments, savings,
                        vehicles, retirement plans, and life insurance benefits
                      </li>
                      <li>
                        <strong>Add Liabilities:</strong> Input debts including mortgages, loans, funeral expenses, and
                        administration costs
                      </li>
                      <li>
                        <strong>Include Deductions:</strong> Add charitable contributions that reduce the taxable estate
                      </li>
                      <li>
                        <strong>Lifetime Gifts:</strong> Include any lifetime gifts made above the annual exclusion
                        limits
                      </li>
                      <li>
                        <strong>Review Results:</strong> See your gross estate, taxable estate, and estimated federal
                        estate tax
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Estate Tax Calculation Formula</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Total Assets</h3>
                      <p className="text-gray-700">
                        Assets = Real Estate + Investments + Savings + Vehicles + Retirement Plans + Life Insurance +
                        Other Assets
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Total Liabilities</h3>
                      <p className="text-gray-700">
                        Liabilities = Mortgages + Loans + Credit Cards + Funeral Expenses + Administration Expenses +
                        Claims
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Gross Estate</h3>
                      <p className="text-gray-700">
                        Gross Estate = Assets - Liabilities + Lifetime Gifts - Charitable Contributions
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Taxable Estate</h3>
                      <p className="text-gray-700">Taxable Estate = max(0, Gross Estate - Federal Exemption)</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">5. Estate Tax Owed</h3>
                      <p className="text-gray-700">Estate Tax = Taxable Estate × 40%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                          What is the federal estate tax exemption for 2025?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        The federal estate tax exemption for 2025 is $13.99 million per individual. This means estates
                        valued below this threshold are not subject to federal estate tax.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                          How is life insurance treated in estate tax calculations?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        Life insurance proceeds are included in the gross estate if the deceased owned the policy or had
                        "incidents of ownership." However, if the policy is owned by someone else and proceeds are paid
                        directly to beneficiaries, it may not be included.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                          What expenses can be deducted from the gross estate?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        Deductible expenses include funeral expenses, administration costs, debts of the deceased,
                        mortgages, and charitable bequests. These reduce the taxable estate value.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                          How do lifetime gifts affect estate taxes?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        Lifetime gifts above the annual exclusion limit ($18,000 per recipient in 2024) use up part of
                        your lifetime exemption. Any unused exemption at death is available for estate tax purposes.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                          Are there state estate taxes in addition to federal?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        Some states impose their own estate or inheritance taxes with different exemption amounts and
                        rates. This calculator only covers federal estate tax. Consult a tax professional for
                        state-specific calculations.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                          When is the estate tax return due?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        Form 706 (estate tax return) is due 9 months after the date of death, with a possible 6-month
                        extension. The tax is generally due at the same time as the return filing.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
