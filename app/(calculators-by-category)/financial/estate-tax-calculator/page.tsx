"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Receipt, DollarSign, FileText, HelpCircle, Building, CreditCard, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function EstateTaxCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('estate-tax-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('estate-tax-calculator', language, "calculator-guide");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "form": "",
    "results": "",
    "educational": "",
    "messages": "",
    "disclaimer": "",
    "seekHelp": "",
    "errors": "",
    "tooltips": "",
    "estate_tax_calculator_0": "",
    "assets_1": "",
    "residence_other_real_estate_2": "",
    "stocks_bonds_other_investments_3": "",
    "savings_cds_checking_accounts_4": "",
    "vehicles_boats_other_properties_5": "",
    "retirement_plans_6": "",
    "life_insurance_benefit_7": "",
    "other_assets_8": "",
    "liability_costs_and_deductibles_9": "",
    "debts_mortgages_loan_credit_cards_etc_10": "",
    "funeral_administration_and_claims_expenses_11": "",
    "charitable_contributions_12": "",
    "state_inheritance_or_estate_taxes_13": "",
    "deductions_14": "",
    "charitable_contributions_15": "",
    "lifetime_gifted_amount_16": "",
    "total_amount_youve_gifted_tax_free_in_your_lifetim_17": "",
    "calculate_tax_18": "",
    "estate_tax_results_19": "",
    "your_complete_estate_tax_breakdown_20": "",
    "net_taxable_estate_is_21": "",
    "estate_tax_owed_22": "",
    "no_estate_tax_is_owed_since_the_estate_is_below_th_23": "",
    "assets_24": "",
    "residence_other_real_estate_25": "",
    "stocks_bonds_and_other_investments_26": "",
    "savings_cds_and_checking_account_balance_27": "",
    "vehicles_boats_and_other_properties_28": "",
    "retirement_plans_29": "",
    "life_insurance_benefit_30": "",
    "other_assets_31": "",
    "total_assets_32": "",
    "liability_costs_and_deductibles_33": "",
    "debts_mortgages_loan_credit_cards_etc_34": "",
    "funeral_administration_and_claims_expenses_35": "",
    "charitable_contributions_36": "",
    "state_inheritance_or_estate_taxes_37": "",
    "total_liabilities_deductions_38": "",
    "lifetime_gifted_amount_39": "",
    "total_amount_youve_gifted_tax_free_in_your_lifetim_40": "",
    "net_taxable_estate_41": "",
    "federal_exemption_2025_42": "",
    "taxable_estate_43": "",
    "tax_rate_44": "",
    "k_40_on_taxable_estate_above_exemption_45": "",
    "the_federal_estate_tax_rate_is_a_flat_40_on_the_am_46": "",
    "enter_your_estate_information_to_see_your_results_47": "",
    "estate_tax_calculation_formula_48": "",
    "k_1_total_assets_49": "",
    "assets_real_estate_investments_savings_vehicles_re_50": "",
    "k_2_total_liabilities_51": "",
    "liabilities_mortgages_loans_credit_cards_funeral_e_52": "",
    "k_3_gross_estate_53": "",
    "gross_estate_assets_liabilities_lifetime_gifts_cha_54": "",
    "k_4_taxable_estate_55": "",
    "taxable_estate_max0_gross_estate_federal_exemption_56": "",
    "k_5_estate_tax_owed_57": "",
    "estate_tax_taxable_estate_40_58": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Assets
  const [realEstate, setRealEstate] = useState("500000");
  const [investments, setInvestments] = useState("250000");
  const [savings, setSavings] = useState("100000");
  const [vehicles, setVehicles] = useState("50000");
  const [retirementPlans, setRetirementPlans] = useState("300000");
  const [lifeInsurance, setLifeInsurance] = useState("200000");
  const [otherAssets, setOtherAssets] = useState("0");

  // Liabilities & Expenses
  const [mortgages, setMortgages] = useState("200000");
  const [funeralExpenses, setFuneralExpenses] = useState("15000");
  const [adminExpenses, setAdminExpenses] = useState("25000");
  const [claims, setClaims] = useState("0");

  // Deductions
  const [charitableContributions, setCharitableContributions] = useState("0");

  // Other Adjustments
  const [lifetimeGifts, setLifetimeGifts] = useState("0");
  const [stateInheritanceTax, setStateInheritanceTax] = useState("0");
  const [results, setResults] = useState<{
    totalAssets: number;
    totalLiabilities: number;
    totalDeductions: number;
    stateInheritanceTax: number;
    lifetimeGifts: number;
    netTaxableEstate: number;
    exemption: number;
    taxableEstate: number;
    estateTaxOwed: number;
  } | null>(null);
  const calculateEstateTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    // Assets (match competitor order and grouping)
    const assetFields = [Number.parseFloat(realEstate), Number.parseFloat(investments), Number.parseFloat(savings), Number.parseFloat(vehicles), Number.parseFloat(retirementPlans), Number.parseFloat(lifeInsurance), Number.parseFloat(otherAssets)];
    const totalAssets = assetFields.reduce((a, b) => a + b, 0);

    // Liabilities & Deductions (match competitor order and grouping)
    const liabilityFields = [Number.parseFloat(mortgages),
    // Debts (mortgages, loan, credit cards, etc)
    Number.parseFloat(funeralExpenses),
    // Funeral, Administration, and Claims Expenses
    Number.parseFloat(charitableContributions),
    // Charitable Contributions
    Number.parseFloat(stateInheritanceTax) // State Inheritance or Estate Taxes
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
      estateTaxOwed
    });
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Receipt className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>{contentData.estate_tax_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Assets */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Building className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.assets_1}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.residence_other_real_estate_2}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={realEstate} onChange={e => setRealEstate(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.stocks_bonds_other_investments_3}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={investments} onChange={e => setInvestments(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.savings_cds_checking_accounts_4}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={savings} onChange={e => setSavings(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.vehicles_boats_other_properties_5}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={vehicles} onChange={e => setVehicles(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.retirement_plans_6}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={retirementPlans} onChange={e => setRetirementPlans(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.life_insurance_benefit_7}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={lifeInsurance} onChange={e => setLifeInsurance(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">{contentData.other_assets_8}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={otherAssets} onChange={e => setOtherAssets(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Liabilities & Expenses */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.liability_costs_and_deductibles_9}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.debts_mortgages_loan_credit_cards_etc_10}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={mortgages} onChange={e => setMortgages(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.funeral_administration_and_claims_expenses_11}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={funeralExpenses} onChange={e => setFuneralExpenses(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.charitable_contributions_12}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={charitableContributions} onChange={e => setCharitableContributions(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.state_inheritance_or_estate_taxes_13}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={stateInheritanceTax} onChange={e => setStateInheritanceTax(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Deductions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.deductions_14}</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.charitable_contributions_15}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" value={charitableContributions} onChange={e => setCharitableContributions(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Other Adjustments */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.lifetime_gifted_amount_16}</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.total_amount_youve_gifted_tax_free_in_your_lifetim_17}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" value={lifetimeGifts} onChange={e => setLifetimeGifts(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateEstateTax} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12">{contentData.calculate_tax_18}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.estate_tax_results_19}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_complete_estate_tax_breakdown_20}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Summary Sentence (Competitor Style) */}
                      <div className="text-center p-4 mb-2">
                        <p className="text-lg font-semibold text-gray-900">{contentData.net_taxable_estate_is_21}{results.netTaxableEstate.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}.
                        </p>
                        {/* Removed summary line as requested */}
                      </div>
                      {/* Estate Tax Owed */}
                      <div className={`text-center p-6 rounded-2xl border-2 ${results.estateTaxOwed === 0 ? "bg-gradient-to-r from-green-100 to-green-200 border-green-300" : "bg-gradient-to-r from-red-100 to-red-200 border-red-300"}`}>
                        <p className={`text-lg mb-2 font-semibold ${results.estateTaxOwed === 0 ? "text-green-800" : "text-red-800"}`}>{contentData.estate_tax_owed_22}</p>
                        <p className={`text-4xl font-bold mb-2 ${results.estateTaxOwed === 0 ? "text-green-700" : "text-red-700"}`}>
                          $
                          {results.estateTaxOwed.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                        {results.estateTaxOwed === 0 && <p className="text-sm text-green-700 font-medium">{contentData.no_estate_tax_is_owed_since_the_estate_is_below_th_23}</p>}
                      </div>

                      {/* Estate Summary */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          {/* Assets breakdown */}
                          <div className="flex flex-col gap-1 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">{contentData.assets_24}</span>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>{contentData.residence_other_real_estate_25}</span>
                              <span className="text-right">${Number(realEstate).toLocaleString("en-US")}</span>
                              <span>{contentData.stocks_bonds_and_other_investments_26}</span>
                              <span className="text-right">${Number(investments).toLocaleString("en-US")}</span>
                              <span>{contentData.savings_cds_and_checking_account_balance_27}</span>
                              <span className="text-right">${Number(savings).toLocaleString("en-US")}</span>
                              <span>{contentData.vehicles_boats_and_other_properties_28}</span>
                              <span className="text-right">${Number(vehicles).toLocaleString("en-US")}</span>
                              <span>{contentData.retirement_plans_29}</span>
                              <span className="text-right">${Number(retirementPlans).toLocaleString("en-US")}</span>
                              <span>{contentData.life_insurance_benefit_30}</span>
                              <span className="text-right">${Number(lifeInsurance).toLocaleString("en-US")}</span>
                              <span>{contentData.other_assets_31}</span>
                              <span className="text-right">${Number(otherAssets).toLocaleString("en-US")}</span>
                            </div>
                            <div className="flex justify-between font-bold mt-2">
                              <span>{contentData.total_assets_32}</span>
                              <span>${results.totalAssets.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}</span>
                            </div>
                          </div>
                          {/* Liabilities breakdown */}
                          <div className="flex flex-col gap-1 p-3 bg-red-50 rounded-lg border border-red-200">
                            <span className="font-medium text-gray-700">{contentData.liability_costs_and_deductibles_33}</span>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>{contentData.debts_mortgages_loan_credit_cards_etc_34}</span>
                              <span className="text-right">${Number(mortgages).toLocaleString("en-US")}</span>
                              <span>{contentData.funeral_administration_and_claims_expenses_35}</span>
                              <span className="text-right">${Number(funeralExpenses).toLocaleString("en-US")}</span>
                              <span>{contentData.charitable_contributions_36}</span>
                              <span className="text-right">${Number(charitableContributions).toLocaleString("en-US")}</span>
                              <span>{contentData.state_inheritance_or_estate_taxes_37}</span>
                              <span className="text-right">${Number(stateInheritanceTax).toLocaleString("en-US")}</span>
                            </div>
                            <div className="flex justify-between font-bold mt-2">
                              <span>{contentData.total_liabilities_deductions_38}</span>
                              <span>${results.totalLiabilities.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}</span>
                            </div>
                          </div>
                          {/* Lifetime Gifts */}
                          <div className="flex flex-col gap-1 p-3 bg-pink-50 rounded-lg border border-pink-200">
                            <span className="font-medium text-gray-700">{contentData.lifetime_gifted_amount_39}</span>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                              <span>{contentData.total_amount_youve_gifted_tax_free_in_your_lifetim_40}</span>
                              <span className="text-right">${Number(lifetimeGifts).toLocaleString("en-US")}</span>
                            </div>
                          </div>
                          {/* Net Taxable Estate */}
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">{contentData.net_taxable_estate_41}</span>
                            <span className="font-bold text-gray-800">
                              ${results.netTaxableEstate.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          {/* Federal Exemption */}
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <span className="font-medium text-gray-700">{contentData.federal_exemption_2025_42}</span>
                            <span className="font-bold text-green-600">
                              ${results.exemption.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          {/* Taxable Estate */}
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">{contentData.taxable_estate_43}</span>
                            <span className="font-bold text-orange-600">
                              ${results.taxableEstate.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tax Rate Info */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-800 mb-2">
                          <strong>{contentData.tax_rate_44}</strong>{contentData.k_40_on_taxable_estate_above_exemption_45}</p>
                        <p className="text-xs text-gray-600">{contentData.the_federal_estate_tax_rate_is_a_flat_40_on_the_am_46}</p>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_estate_information_to_see_your_results_47}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Sales Tax Calculator",
            calculatorHref: "/financial/sales-tax-calculator",
            calculatorDescription: "Calculate tax rates and total costs for purchases across states"
          }, {
            calculatorName: "Salary Calculator",
            calculatorHref: "/financial/salary-calculator",
            calculatorDescription: "Calculate-home pay, deductions, and salary conversions"
          }, {
            calculatorName: "Income Tax Calculator",
            calculatorHref: "/financial/income-tax-calculator",
            calculatorDescription: "Estimate federal and state income tax liability and refunds"
          }]} color="green" title="Related Financial Calculators" />

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.estate_tax_calculation_formula_48}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_total_assets_49}</h3>
                      <p className="text-gray-700">{contentData.assets_real_estate_investments_savings_vehicles_re_50}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_total_liabilities_51}</h3>
                      <p className="text-gray-700">{contentData.liabilities_mortgages_loans_credit_cards_funeral_e_52}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_gross_estate_53}</h3>
                      <p className="text-gray-700">{contentData.gross_estate_assets_liabilities_lifetime_gifts_cha_54}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_taxable_estate_55}</h3>
                      <p className="text-gray-700">{contentData.taxable_estate_max0_gross_estate_federal_exemption_56}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_5_estate_tax_owed_57}</h3>
                      <p className="text-gray-700">{contentData.estate_tax_taxable_estate_40_58}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              <CalculatorGuide data={guideData} />

            </div>
          </div>
        </main>
      </div>
    </>;
}