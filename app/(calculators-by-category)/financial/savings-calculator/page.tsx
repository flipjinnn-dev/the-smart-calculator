"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, PiggyBank, DollarSign, TrendingUp, FileText, HelpCircle } from 'lucide-react';
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
interface YearlyBreakdown {
  year: number;
  startingBalance: number;
  annualContribution: number;
  monthlyContributions: number;
  interestEarned: number;
  endingBalance: number;
}
export default function SavingsCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('savings-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('savings-calculator', language, "calculator-guide");

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
    "savings_calculator_0": "",
    "initial_investment_1": "",
    "initial_deposit_starting_balance_2": "",
    "regular_contributions_3": "",
    "annual_contribution_4": "",
    "annual_increase_rate_5": "",
    "monthly_contribution_6": "",
    "monthly_increase_rate_7": "",
    "investment_parameters_8": "",
    "annual_interest_rate_9": "",
    "number_of_years_10": "",
    "compounding_frequency_11": "",
    "annually_12": "",
    "semiannually_13": "",
    "quarterly_14": "",
    "monthly_15": "",
    "biweekly_16": "",
    "weekly_17": "",
    "daily_18": "",
    "tax_rate_on_interest_19": "",
    "inflation_rate_20": "",
    "calculate_growth_21": "",
    "savings_results_22": "",
    "your_savings_growth_projection_23": "",
    "final_balance_24": "",
    "compounding_25": "",
    "for_26": "",
    "years_27": "",
    "total_contributions_28": "",
    "interest_earned_29": "",
    "aftertax_balance_30": "",
    "real_value_inflationadjusted_31": "",
    "yearly_breakdown_32": "",
    "year_33": "",
    "contributions_34": "",
    "interest_35": "",
    "balance_36": "",
    "enter_your_savings_information_to_see_your_growth__37": "",
    "formulas_calculation_details_38": "",
    "k_1_periodic_interest_rate_39": "",
    "rperiod_annualrate_1_taxrate_compoundingfrequency_40": "",
    "k_2_annual_contributions_with_growth_41": "",
    "annualk_annualbase_1_annualincreaseratek1_42": "",
    "k_3_monthly_contributions_with_growth_43": "",
    "monthlyk_monthlybase_1_monthlyincreaseratek1_44": "",
    "k_4_final_balance_45": "",
    "balance_initial_1_rperiodperiods_accumulatedcontri_46": "",
    "k_5_real_value_inflationadjusted_47": "",
    "realvalue_finalbalance_1_inflationrateyears_48": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Input states
  const [initialDeposit, setInitialDeposit] = useState("10000");
  const [annualContribution, setAnnualContribution] = useState("5000");
  const [annualIncreaseRate, setAnnualIncreaseRate] = useState("3");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [monthlyIncreaseRate, setMonthlyIncreaseRate] = useState("3");
  const [annualInterestRate, setAnnualInterestRate] = useState("7");
  const [yearsToSave, setYearsToSave] = useState("20");
  const [compoundingFrequency, setCompoundingFrequency] = useState("12");
  const [taxRate, setTaxRate] = useState("0");
  const [inflationRate, setInflationRate] = useState("2.5");
  const [results, setResults] = useState<{
    finalBalance: number;
    totalContributions: number;
    interestEarned: number;
    finalBalanceAfterTax: number;
    realFinalBalance: number;
    yearlyBreakdown: YearlyBreakdown[];
  } | null>(null);
  const calculateSavings = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const P0 = Number.parseFloat(initialDeposit) || 0;
    const Cannual = Number.parseFloat(annualContribution) || 0;
    const iannualC = Number.parseFloat(annualIncreaseRate) / 100 || 0;
    const Cmonthly = Number.parseFloat(monthlyContribution) || 0;
    const imonthlyC = Number.parseFloat(monthlyIncreaseRate) / 100 || 0;
    const r = Number.parseFloat(annualInterestRate) / 100 || 0;
    const n = Number.parseFloat(yearsToSave) || 0;
    const m = Number.parseFloat(compoundingFrequency) || 12;
    const t = Number.parseFloat(taxRate) / 100 || 0;
    const f = Number.parseFloat(inflationRate) / 100 || 0;

    // Adjust interest rate for taxes
    const rnet = r * (1 - t);
    const rperiod = rnet / m;
    let totalBalance = P0;
    let totalContributions = P0;
    const yearlyBreakdown: YearlyBreakdown[] = [];

    // Calculate by year for detailed breakdown
    for (let year = 1; year <= n; year++) {
      const startingBalance = totalBalance;

      // Annual contribution for this year (with growth)
      const currentAnnualContrib = Cannual * Math.pow(1 + iannualC, year - 1);

      // Monthly contribution for this year (with growth)
      const currentMonthlyContrib = Cmonthly * Math.pow(1 + imonthlyC, year - 1);

      // Add annual contribution at beginning of year
      totalBalance += currentAnnualContrib;
      totalContributions += currentAnnualContrib;
      let yearInterest = 0;
      let monthlyContribTotal = 0;

      // Calculate compounding with monthly contributions
      for (let month = 1; month <= m; month++) {
        // Add monthly contribution
        totalBalance += currentMonthlyContrib;
        totalContributions += currentMonthlyContrib;
        monthlyContribTotal += currentMonthlyContrib;

        // Apply interest for this period
        const periodInterest = totalBalance * rperiod;
        totalBalance += periodInterest;
        yearInterest += periodInterest;
      }
      yearlyBreakdown.push({
        year,
        startingBalance,
        annualContribution: currentAnnualContrib,
        monthlyContributions: monthlyContribTotal,
        interestEarned: yearInterest,
        endingBalance: totalBalance
      });
    }
    const finalBalance = totalBalance;
    const interestEarned = finalBalance - totalContributions;

    // Calculate-tax balance (tax on interest only)
    const finalBalanceAfterTax = totalContributions + interestEarned * (1 - t);

    // Calculate value after inflation
    const realFinalBalance = finalBalance / Math.pow(1 + f, n);
    setResults({
      finalBalance,
      totalContributions,
      interestEarned,
      finalBalanceAfterTax,
      realFinalBalance,
      yearlyBreakdown
    });
  };
  const getCompoundingText = (freq: string) => {
    const frequencies: {
      [key: string]: string;
    } = {
      "1": "Annually",
      "2": "Semi-annually",
      "4": "Quarterly",
      "12": "Monthly",
      "26": "Biweekly",
      "52": "Weekly",
      "365": "Daily"
    };
    return frequencies[freq] || "Monthly";
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <PiggyBank className="w-8 h-8 text-white" />
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
                    <span>{contentData.savings_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Initial Investment */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.initial_investment_1}</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.initial_deposit_starting_balance_2}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" value={initialDeposit} onChange={e => setInitialDeposit(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contributions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.regular_contributions_3}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.annual_contribution_4}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={annualContribution} onChange={e => setAnnualContribution(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.annual_increase_rate_5}</Label>
                        <Input type="number" step="0.1" value={annualIncreaseRate} onChange={e => setAnnualIncreaseRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.monthly_contribution_6}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.monthly_increase_rate_7}</Label>
                        <Input type="number" step="0.1" value={monthlyIncreaseRate} onChange={e => setMonthlyIncreaseRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Investment Parameters */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.investment_parameters_8}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.annual_interest_rate_9}</Label>
                        <Input type="number" step="0.1" value={annualInterestRate} onChange={e => setAnnualInterestRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.number_of_years_10}</Label>
                        <Input type="number" value={yearsToSave} onChange={e => setYearsToSave(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.compounding_frequency_11}</Label>
                        <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">{contentData.annually_12}</SelectItem>
                            <SelectItem value="2">{contentData.semiannually_13}</SelectItem>
                            <SelectItem value="4">{contentData.quarterly_14}</SelectItem>
                            <SelectItem value="12">{contentData.monthly_15}</SelectItem>
                            <SelectItem value="26">{contentData.biweekly_16}</SelectItem>
                            <SelectItem value="52">{contentData.weekly_17}</SelectItem>
                            <SelectItem value="365">{contentData.daily_18}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.tax_rate_on_interest_19}</Label>
                        <Input type="number" step="0.1" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">{contentData.inflation_rate_20}</Label>
                        <Input type="number" step="0.1" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateSavings} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12">{contentData.calculate_growth_21}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.savings_results_22}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_savings_growth_projection_23}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Final Balance */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">{contentData.final_balance_24}</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          ${results.finalBalance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                        <p className="text-sm text-green-600">{contentData.compounding_25}{getCompoundingText(compoundingFrequency)}{contentData.for_26}{yearsToSave}{contentData.years_27}</p>
                      </div>

                      {/* Summary */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">{contentData.total_contributions_28}</span>
                          <span className="font-bold text-blue-600">
                            ${results.totalContributions.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium text-gray-700">{contentData.interest_earned_29}</span>
                          <span className="font-bold text-purple-600">
                            ${results.interestEarned.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        {Number.parseFloat(taxRate) > 0 && <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">{contentData.aftertax_balance_30}</span>
                            <span className="font-bold text-orange-600">
                              ${results.finalBalanceAfterTax.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </span>
                          </div>}
                        {Number.parseFloat(inflationRate) > 0 && <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span className="font-medium text-gray-700">{contentData.real_value_inflationadjusted_31}</span>
                            <span className="font-bold text-yellow-600">
                              ${results.realFinalBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </span>
                          </div>}
                      </div>

                      {/* Yearly Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.yearly_breakdown_32}</h3>
                        <div className="max-h-64 overflow-y-auto border rounded-lg">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="p-2 text-left">{contentData.year_33}</th>
                                <th className="p-2 text-right">{contentData.contributions_34}</th>
                                <th className="p-2 text-right">{contentData.interest_35}</th>
                                <th className="p-2 text-right">{contentData.balance_36}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.yearlyBreakdown.map(year => <tr key={year.year} className="border-t">
                                  <td className="p-2 font-medium">{year.year}</td>
                                  <td className="p-2 text-right">
                                    ${(year.annualContribution + year.monthlyContributions).toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </td>
                                  <td className="p-2 text-right">
                                    ${year.interestEarned.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </td>
                                  <td className="p-2 text-right font-medium">
                                    ${year.endingBalance.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <PiggyBank className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_savings_information_to_see_your_growth__37}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators calculators={[{
              calculatorName: "Interest Calculator",
              calculatorHref: "/financial/interest-calculator",
              calculatorDescription: "Calculate and compound interest on loans, investments, and savings accounts."
            }, {
              calculatorName: "Investment Calculator",
              calculatorHref: "/financial/investment-calculator",
              calculatorDescription: "Plan your investment strategy and see how your portfolio can grow over time."
            }, {
              calculatorName: "Salary Calculator",
              calculatorHref: "/financial/salary-calculator",
              calculatorDescription: "Convert between different pay periods and calculate your salary breakdown across various timeframes."
            }]} color="green" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_calculation_details_38}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_periodic_interest_rate_39}</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.rperiod_annualrate_1_taxrate_compoundingfrequency_40}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_annual_contributions_with_growth_41}</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.annualk_annualbase_1_annualincreaseratek1_42}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_monthly_contributions_with_growth_43}</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.monthlyk_monthlybase_1_monthlyincreaseratek1_44}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_final_balance_45}</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.balance_initial_1_rperiodperiods_accumulatedcontri_46}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_5_real_value_inflationadjusted_47}</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.realvalue_finalbalance_1_inflationrateyears_48}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="savings-calculator"
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