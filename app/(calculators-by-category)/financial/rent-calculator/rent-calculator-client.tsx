"use client";

import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Home, DollarSign, FileText, HelpCircle } from "lucide-react";
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

interface RentCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function RentCalculatorClient({ content, guideContent }: RentCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Form inputs
  const [incomeType, setIncomeType] = useState("annual");
  const [income, setIncome] = useState("60000");
  const [monthlyDebts, setMonthlyDebts] = useState("500");
  const [frontEndRatio, setFrontEndRatio] = useState("30");
  const [backEndRatio, setBackEndRatio] = useState("40");
  const [results, setResults] = useState<{
    monthlyIncome: number;
    frontEndLimit: number;
    backEndLimit: number;
    maxAffordableRent: number;
    limitingFactor: string;
  } | null>(null);
  const calculateRent = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    // Step 1: Convert income to monthly
    const incomeValue = Number.parseFloat(income);
    const monthlyIncome = incomeType === "annual" ? incomeValue / 12 : incomeValue;

    // Step 2: Front-end limit calculation
    const frontRatio = Number.parseFloat(frontEndRatio) / 100;
    const frontEndLimit = frontRatio * monthlyIncome;

    // Step 3: Back-end limit calculation
    const backRatio = Number.parseFloat(backEndRatio) / 100;
    const debts = Number.parseFloat(monthlyDebts);
    const backEndLimit = backRatio * monthlyIncome - debts;

    // Step 4: Maximum affordable rent
    const maxAffordableRent = Math.max(0, Math.min(frontEndLimit, backEndLimit));

    // Determine limiting factor
    let limitingFactor = "";
    if (frontEndLimit <= backEndLimit) {
      limitingFactor = "Front-end ratio";
    } else {
      limitingFactor = "Back-end ratio";
    }
    if (maxAffordableRent === 0) {
      limitingFactor = "Debt-to-income too high";
    }
    setResults({
      monthlyIncome,
      frontEndLimit,
      backEndLimit,
      maxAffordableRent,
      limitingFactor
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
                    <span>{contentData.rent_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Income Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.income_information_1}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.income_type_2}</Label>
                        <Select value={incomeType} onValueChange={setIncomeType}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annual">{contentData.annual_income_3}</SelectItem>
                            <SelectItem value="monthly">{contentData.monthly_income_4}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">
                          {incomeType === "annual" ? "Annual Gross Income" : "Monthly Gross Income"}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={income} onChange={e => setIncome(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" placeholder={incomeType === "annual" ? "60000" : "5000"} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Debt Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.debt_information_5}</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.other_monthly_debt_payments_6}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" value={monthlyDebts} onChange={e => setMonthlyDebts(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" placeholder="500" />
                      </div>
                      <p className="text-sm text-gray-600">{contentData.include_credit_cards_car_loans_student_loans_and_o_7}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Financial Ratios */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calculator className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.financial_ratios_8}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.frontend_ratio_9}</Label>
                        <Input type="number" value={frontEndRatio} onChange={e => setFrontEndRatio(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" placeholder="30" />
                        <p className="text-sm text-gray-600">{contentData.percentage_of_income_for_housing_typically_2830_10}</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.backend_ratio_11}</Label>
                        <Input type="number" value={backEndRatio} onChange={e => setBackEndRatio(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" placeholder="40" />
                        <p className="text-sm text-gray-600">{contentData.percentage_of_income_for_all_debts_typically_3640_12}</p>
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateRent} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12">{contentData.calculate_rent_13}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.rent_affordability_results_14}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_maximum_affordable_rent_breakdown_15}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Maximum Affordable Rent */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">{contentData.maximum_affordable_rent_16}</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          $
                          {results.maxAffordableRent.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                        <p className="text-sm text-green-600">{contentData.per_month_17}</p>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.calculation_breakdown_18}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">{contentData.monthly_income_19}</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.monthlyIncome.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">{contentData.frontend_limit_20}{frontEndRatio}%)</span>
                            <span className="font-bold text-purple-600">
                              $
                              {results.frontEndLimit.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">{contentData.backend_limit_21}{backEndRatio}%)</span>
                            <span className="font-bold text-orange-600">
                              $
                              {results.backEndLimit.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">{contentData.limiting_factor_22}</span>
                            <span className="font-bold text-gray-900">{results.limitingFactor}</span>
                          </div>
                        </div>
                      </div>

                      {/* Guidelines */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>{contentData.financial_guidelines_23}</strong>
                        </p>
                        <ul className="text-xs text-blue-600 space-y-1">
                          <li>{contentData.housing_costs_should_not_exceed_24}{frontEndRatio}{contentData.of_gross_income_25}</li>
                          <li>{contentData.total_debt_payments_should_not_exceed_26}{backEndRatio}{contentData.of_gross_income_27}</li>
                          <li>{contentData.consider_additional_costs_like_utilities_insurance_28}</li>
                        </ul>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_income_and_debt_information_to_see_your_29}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators calculators={[{
              calculatorName: "Payment Calculator",
              calculatorHref: "/financial/payment-calculator",
              calculatorDescription: "Calculate payments for loans, mortgages, and other financing options."
            }, {
              calculatorName: "Time Value of Money Calculator",
              calculatorHref: "/financial/finance-calculator",
              calculatorDescription: "Calculate and future values, analyze investment returns, and make informed financial decisions."
            }]} color="green" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Example Calculation */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.example_calculation_30}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">{contentData.sample_scenario_31}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">{contentData.inputs_32}</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>{contentData.annual_income_60000_33}</li>
                          <li>{contentData.monthly_debts_500_34}</li>
                          <li>{contentData.frontend_ratio_30_35}</li>
                          <li>{contentData.backend_ratio_40_36}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{contentData.calculation_37}</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>{contentData.monthly_income_60000_12_5000_38}</li>
                          <li>{contentData.frontend_limit_5000_30_1500_39}</li>
                          <li>{contentData.backend_limit_5000_40_500_1500_40}</li>
                          <li>
                            • <strong>{contentData.maximum_rent_1500_41}</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_calculation_details_42}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_monthly_income_conversion_43}</h3>
                      <p className="text-gray-700 mb-2">{contentData.if_annual_income_monthly_income_annual_income_12_44}</p>
                      <p className="text-gray-700">{contentData.if_monthly_income_monthly_income_monthly_income_as_45}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_frontend_ratio_limit_46}</h3>
                      <p className="text-gray-700">{contentData.rent_frontend_frontend_ratio_monthly_income_47}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_backend_ratio_limit_48}</h3>
                      <p className="text-gray-700">{contentData.rent_backend_backend_ratio_monthly_income_monthly__49}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_maximum_affordable_rent_50}</h3>
                      <p className="text-gray-700">{contentData.maximum_rent_minfrontend_limit_backend_limit_51}</p>
                      <p className="text-sm text-gray-600 mt-1">{contentData.if_the_result_is_negative_the_affordable_rent_is_s_52}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="rent-calculator"
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
