"use client";

import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Home, DollarSign, Users, FileText, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;

interface HouseAffordabilityCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function HouseAffordabilityCalculatorClient({ content, guideContent }: HouseAffordabilityCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Calculation Mode
  const [calculationMode, setCalculationMode] = useState("income"); // "income" or "budget"

  // Mode A: Income & DTI Inputs
  const [annualIncome, setAnnualIncome] = useState("100000");
  const [monthlyDebts, setMonthlyDebts] = useState("500");
  const [frontEndRatio, setFrontEndRatio] = useState("28");
  const [backEndRatio, setBackEndRatio] = useState("36");

  // Mode B: Fixed Budget Input
  const [monthlyBudget, setMonthlyBudget] = useState("2500");

  // Common Inputs
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [mortgageRate, setMortgageRate] = useState("6.0");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.2");
  const [insuranceRate, setInsuranceRate] = useState("0.5");
  const [hoaRate, setHoaRate] = useState("0.3");
  const [results, setResults] = useState<{
    maxHousePrice: number;
    monthlyPayment: number;
    monthlyMortgage: number;
    monthlyPropertyTax: number;
    monthlyInsurance: number;
    monthlyHOA: number;
    totalMonthlyHousing: number;
    downPaymentAmount: number;
    loanAmount: number;
    housingBudgetUsed: number;
  } | null>(null);

  // Binary search to find maximum house price
  const findMaxHousePrice = (maxHousingBudget: number): number => {
    let low = 50000;
    let high = 2000000;
    let maxPrice = 0;
    const rMonthly = Number.parseFloat(mortgageRate) / 100 / 12;
    const N = Number.parseFloat(loanTerm) * 12;
    const dpPercent = Number.parseFloat(downPaymentPercent) / 100;
    const propTaxRate = Number.parseFloat(propertyTaxRate) / 100;
    const insRate = Number.parseFloat(insuranceRate) / 100;
    const hoaRatePercent = Number.parseFloat(hoaRate) / 100;
    while (high - low > 1) {
      const midPrice = (low + high) / 2;
      const loanAmount = midPrice * (1 - dpPercent);

      // Calculate mortgage payment
      let monthlyMortgage = 0;
      if (rMonthly > 0) {
        monthlyMortgage = loanAmount * rMonthly * Math.pow(1 + rMonthly, N) / (Math.pow(1 + rMonthly, N) - 1);
      } else {
        monthlyMortgage = loanAmount / N;
      }

      // Calculate monthly costs
      const monthlyPropertyTax = midPrice * propTaxRate / 12;
      const monthlyInsurance = midPrice * insRate / 12;
      const monthlyHOA = midPrice * hoaRatePercent / 12;
      const totalHousingCost = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyHOA;
      if (totalHousingCost <= maxHousingBudget) {
        maxPrice = midPrice;
        low = midPrice;
      } else {
        high = midPrice;
      }
    }
    return maxPrice;
  };
  const calculateAffordability = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    let maxHousingBudget = 0;
    if (calculationMode === "income") {
      // Mode A: Based on Income & DTI
      const monthlyIncome = Number.parseFloat(annualIncome) / 12;
      const monthlyDebt = Number.parseFloat(monthlyDebts);
      const frontRatio = Number.parseFloat(frontEndRatio) / 100;
      const backRatio = Number.parseFloat(backEndRatio) / 100;
      const frontMax = monthlyIncome * frontRatio;
      const backMax = monthlyIncome * backRatio - monthlyDebt;
      maxHousingBudget = Math.min(frontMax, backMax);
    } else {
      // Mode B: Fixed Monthly Budget
      maxHousingBudget = Number.parseFloat(monthlyBudget);
    }

    // Find maximum house price using binary search
    const maxPrice = findMaxHousePrice(maxHousingBudget);

    // Calculate breakdown
    const dpPercent = Number.parseFloat(downPaymentPercent) / 100;
    const rMonthly = Number.parseFloat(mortgageRate) / 100 / 12;
    const N = Number.parseFloat(loanTerm) * 12;
    const propTaxRate = Number.parseFloat(propertyTaxRate) / 100;
    const insRate = Number.parseFloat(insuranceRate) / 100;
    const hoaRatePercent = Number.parseFloat(hoaRate) / 100;
    const downPaymentAmount = maxPrice * dpPercent;
    const loanAmount = maxPrice * (1 - dpPercent);

    // Calculate mortgage payment
    let monthlyMortgage = 0;
    if (rMonthly > 0) {
      monthlyMortgage = loanAmount * rMonthly * Math.pow(1 + rMonthly, N) / (Math.pow(1 + rMonthly, N) - 1);
    } else {
      monthlyMortgage = loanAmount / N;
    }
    const monthlyPropertyTax = maxPrice * propTaxRate / 12;
    const monthlyInsurance = maxPrice * insRate / 12;
    const monthlyHOA = maxPrice * hoaRatePercent / 12;
    const totalMonthlyHousing = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyHOA;
    setResults({
      maxHousePrice: maxPrice,
      monthlyPayment: totalMonthlyHousing,
      monthlyMortgage,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyHousing,
      downPaymentAmount,
      loanAmount,
      housingBudgetUsed: maxHousingBudget
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
                  <Home className="w-8 h-8 text-white" />
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
                    <span>{contentData.affordability_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Calculation Mode */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.calculation_method_1}</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.how_would_you_like_to_calculate_2}</Label>
                      <Select value={calculationMode} onValueChange={setCalculationMode}>
                        <SelectTrigger className="h-12 border-2 focus:border-green-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">{contentData.based_on_income_debttoincome_ratios_3}</SelectItem>
                          <SelectItem value="budget">{contentData.based_on_fixed_monthly_budget_4}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Mode A: Income & DTI */}
                  {calculationMode === "income" && <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{contentData.income_debt_information_5}</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.annual_gross_income_6}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.monthly_debt_payments_7}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={monthlyDebts} onChange={e => setMonthlyDebts(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.frontend_ratio_8}</Label>
                          <Input type="number" value={frontEndRatio} onChange={e => setFrontEndRatio(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                          <p className="text-xs text-gray-500">{contentData.housing_costs_as_of_gross_income_typically_28_9}</p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.backend_ratio_10}</Label>
                          <Input type="number" value={backEndRatio} onChange={e => setBackEndRatio(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                          <p className="text-xs text-gray-500">{contentData.total_debt_as_of_gross_income_typically_36_11}</p>
                        </div>
                      </div>
                    </div>}

                  {/* Mode B: Fixed Budget */}
                  {calculationMode === "budget" && <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{contentData.monthly_housing_budget_12}</h3>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.maximum_monthly_housing_payment_13}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={monthlyBudget} onChange={e => setMonthlyBudget(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                        <p className="text-xs text-gray-500">{contentData.include_mortgage_taxes_insurance_and_hoa_fees_14}</p>
                      </div>
                    </div>}

                  <Separator />

                  {/* Loan Details */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.loan_property_details_15}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.down_payment_16}</Label>
                        <Input type="number" value={downPaymentPercent} onChange={e => setDownPaymentPercent(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.mortgage_interest_rate_17}</Label>
                        <Input type="number" step="0.1" value={mortgageRate} onChange={e => setMortgageRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.loan_term_years_18}</Label>
                        <Select value={loanTerm} onValueChange={setLoanTerm}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">{contentData.k_15_years_19}</SelectItem>
                            <SelectItem value="20">{contentData.k_20_years_20}</SelectItem>
                            <SelectItem value="25">{contentData.k_25_years_21}</SelectItem>
                            <SelectItem value="30">{contentData.k_30_years_22}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.property_tax_rate_23}</Label>
                        <Input type="number" step="0.1" value={propertyTaxRate} onChange={e => setPropertyTaxRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.home_insurance_rate_24}</Label>
                        <Input type="number" step="0.1" value={insuranceRate} onChange={e => setInsuranceRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.hoa_fee_rate_25}</Label>
                        <Input type="number" step="0.1" value={hoaRate} onChange={e => setHoaRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateAffordability} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12">{contentData.calculate_26}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.affordability_results_27}</CardTitle>
                  <CardDescription className="text-base">{contentData.how_much_house_you_can_afford_28}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Maximum House Price */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">{contentData.maximum_house_price_29}</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          $
                          {results.maxHousePrice.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                        </p>
                      </div>

                      {/* Monthly Payment Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.monthly_payment_breakdown_30}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">{contentData.principal_interest_31}</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.monthlyMortgage.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">{contentData.property_tax_32}</span>
                            <span className="font-bold text-purple-600">
                              $
                              {results.monthlyPropertyTax.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">{contentData.home_insurance_33}</span>
                            <span className="font-bold text-orange-600">
                              $
                              {results.monthlyInsurance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span className="font-medium text-gray-700">{contentData.hoa_fees_34}</span>
                            <span className="font-bold text-yellow-600">
                              $
                              {results.monthlyHOA.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">{contentData.total_monthly_payment_35}</span>
                            <span className="font-bold text-gray-900">
                              $
                              {results.totalMonthlyHousing.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Purchase Details */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.purchase_details_36}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <span className="font-medium text-gray-700">{contentData.down_payment_required_37}</span>
                            <span className="font-bold text-indigo-600">
                              $
                              {results.downPaymentAmount.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                            <span className="font-medium text-gray-700">{contentData.loan_amount_38}</span>
                            <span className="font-bold text-pink-600">
                              $
                              {results.loanAmount.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Budget Info */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>{contentData.housing_budget_used_39}</strong> $
                          {results.housingBudgetUsed.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                        <p className="text-xs text-blue-600">{contentData.this_calculation_assumes_40}{Number.parseFloat(downPaymentPercent)}{contentData.down_payment_and_41}{" "}
                          {mortgageRate}{contentData.interest_rate_42}</p>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_information_to_see_how_much_house_you_c_43}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Income Tax Calculator",
            calculatorHref: "/financial/income-tax-calculator",
            calculatorDescription: "Calculate federal and state income tax liability and refunds"
          }, {
            calculatorName: "Debt Payoff Calculator",
            calculatorHref: "/financial/debt-payoff-calculator",
            calculatorDescription: "Create a strategy to pay off debts faster using avalanche method"
          }, {
            calculatorName: "Finance Calculator",
            calculatorHref: "/financial/finance-calculator",
            calculatorDescription: "Calculate value of money for investment and loan scenarios"
          }]} color="green" title="Related Financial Calculators" />

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How Much House Can I Afford */}
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.how_much_house_can_i_afford_44}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">{contentData.determining_how_much_house_you_can_afford_depends__45}</p>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>{contentData.frontend_ratio_28_rule_46}</strong>{contentData.your_total_housing_costs_should_not_exceed_28_of_y_47}</li>
                      <li>
                        <strong>{contentData.backend_ratio_36_rule_48}</strong>{contentData.your_total_debt_payments_should_not_exceed_36_of_y_49}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas & Logic */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.house_affordability_formulas_logic_50}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_monthly_income_calculation_51}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.monthly_income_annual_income_12_52}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_dti_ratio_limits_53}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.frontend_max_monthly_income_frontend_ratio_54}<br />{contentData.backend_max_monthly_income_backend_ratio_monthly_d_55}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_housing_budget_56}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.max_housing_budget_minfrontend_max_backend_max_57}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_monthly_mortgage_payment_58}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.m_l_r1rn_1rn_1_59}<br />{contentData.where_l_loan_amount_r_monthly_rate_n_number_of_pay_60}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_5_total_housing_cost_61}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.total_mortgage_property_tax_insurance_hoa_62}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Calculations */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.example_calculations_63}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold mb-3 text-green-800">{contentData.example_1_incomebased_calculation_64}</h3>
                      <div className="text-gray-700 space-y-2">
                        <p>
                          <strong>{contentData.scenario_65}</strong>{contentData.k_100000_annual_income_500_monthly_debts_30year_mort_66}</p>
                        <p>
                          <strong>{contentData.calculation_67}</strong>{contentData.monthly_income_8333_frontend_max_2333_backend_max__68}</p>
                        <p>
                          <strong>{contentData.result_69}</strong>{contentData.max_housing_budget_2333_affordable_house_420000_70}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold mb-3 text-blue-800">{contentData.example_2_budgetbased_calculation_71}</h3>
                      <div className="text-gray-700 space-y-2">
                        <p>
                          <strong>{contentData.scenario_72}</strong>{contentData.fixed_budget_of_2500month_same_loan_parameters_as__73}</p>
                        <p>
                          <strong>{contentData.calculation_74}</strong>{contentData.housing_budget_2500_userdefined_75}</p>
                        <p>
                          <strong>{contentData.result_76}</strong>{contentData.affordable_house_390000_77}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to use */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="house-affordability-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />

            </div>
          </div>
        </main>
      </div>
    </>;
}
