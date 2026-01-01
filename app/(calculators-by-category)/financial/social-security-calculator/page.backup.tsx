"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Shield, DollarSign, TrendingUp, FileText, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;

// Full Retirement Age table based on birth year
const FRA_TABLE: {
  [key: string]: number;
} = {
  "1937": 65.0,
  "1938": 65.17,
  // 65 and 2 months
  "1939": 65.33,
  // 65 and 4 months
  "1940": 65.5,
  // 65 and 6 months
  "1941": 65.67,
  // 65 and 8 months
  "1942": 65.83,
  // 65 and 10 months
  "1943": 66.0,
  "1944": 66.0,
  "1945": 66.0,
  "1946": 66.0,
  "1947": 66.0,
  "1948": 66.0,
  "1949": 66.0,
  "1950": 66.0,
  "1951": 66.0,
  "1952": 66.0,
  "1953": 66.0,
  "1954": 66.0,
  "1955": 66.17,
  // 66 and 2 months
  "1956": 66.33,
  // 66 and 4 months
  "1957": 66.5,
  // 66 and 6 months
  "1958": 66.67,
  // 66 and 8 months
  "1959": 66.83,
  // 66 and 10 months
  "1960": 67.0
};
export default function SocialSecurityCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('social-security-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('social-security-calculator', language, "calculator-guide");

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
    "social_security_inputs_0": "",
    "basic_information_1": "",
    "birth_year_2": "",
    "full_retirement_age_3": "",
    "autocalculated_4": "",
    "years_5": "",
    "life_expectancy_years_6": "",
    "monthly_benefit_at_fra_7": "",
    "claiming_ages_to_compare_8": "",
    "age_9": "",
    "fra_10": "",
    "economic_assumptions_11": "",
    "annual_cola_12": "",
    "investment_return_13": "",
    "show_in_future_inflated_dollars_vs_todays_dollars_14": "",
    "calculate_15": "",
    "benefit_comparison_16": "",
    "compare_claiming_strategies_17": "",
    "optimal_strategy_18": "",
    "claim_at_age_19": "",
    "highest_present_value_20": "",
    "detailed_comparison_21": "",
    "claim_age_22": "",
    "monthly_benefit_23": "",
    "lifetime_benefits_24": "",
    "present_value_25": "",
    "age_26": "",
    "best_27": "",
    "vs_fra_28": "",
    "key_insights_29": "",
    "present_values_assume_30": "",
    "annual_investment_return_31": "",
    "benefits_increase_by_32": "",
    "annually_after_claiming_33": "",
    "early_claiming_reduces_benefits_permanently_34": "",
    "delayed_retirement_credits_add_8_per_year_after_fr_35": "",
    "select_claiming_ages_and_calculate_to_see_your_res_36": "",
    "how_social_security_benefits_work_37": "",
    "k_1_primary_insurance_amount_pia_38": "",
    "your_pia_is_calculated_from_your_average_indexed_m_39": "",
    "k_2_claiming_age_adjustments_40": "",
    "benefits_are_reduced_for_early_claiming_before_fra_41": "",
    "k_3_present_value_analysis_42": "",
    "where_r_investment_return_rate_accounting_for_the__43": "",
    "frequently_asked_questions_44": "",
    "what_is_full_retirement_age_fra_45": "",
    "full_retirement_age_is_when_you_can_claim_100_of_y_46": "",
    "how_much_do_i_lose_by_claiming_early_at_62_47": "",
    "claiming_at_62_reduces_your_benefit_by_about_2530__48": "",
    "what_are_delayed_retirement_credits_49": "",
    "for_each_year_you_delay_claiming_past_fra_up_to_ag_50": "",
    "what_is_the_breakeven_age_51": "",
    "the_breakeven_age_is_when_the_total_benefits_recei_52": "",
    "how_does_cola_affect_my_benefits_53": "",
    "costofliving_adjustments_cola_are_applied_annually_54": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Input states (with validation)
  const [birthYear, setBirthYear] = useState("1960");
  const [claimingAges, setClaimingAges] = useState<number[]>([62, 67, 70]);
  const [lifeExpectancy, setLifeExpectancy] = useState("85");
  const [monthlyBenefitAtFRA, setMonthlyBenefitAtFRA] = useState("2500");
  const [colaRate, setColaRate] = useState("2.5");
  const [investmentReturn, setInvestmentReturn] = useState("7.0");
  const [showInflatedDollars, setShowInflatedDollars] = useState(false);

  // Clamp and validate input values to match calculator.net
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  // Clamp birth year to 1900 - current year
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1900;
    val = clamp(val, 1900, new Date().getFullYear());
    setBirthYear(val.toString());
  };

  // Clamp life expectancy (minimum 62, max 120)
  const handleLifeExpectancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 62;
    val = clamp(val, 62, 120);
    setLifeExpectancy(val.toString());
  };

  // Clamp monthly benefit (minimum 1, max 20000)
  const handleMonthlyBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1;
    val = clamp(val, 1, 20000);
    setMonthlyBenefitAtFRA(val.toString());
  };

  // Clamp COLA (0-10%)
  const handleColaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0;
    val = clamp(val, 0, 10);
    setColaRate(val.toString());
  };

  // Clamp investment return (0-15%)
  const handleInvestmentReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0;
    val = clamp(val, 0, 15);
    setInvestmentReturn(val.toString());
  };

  // Results state
  const [results, setResults] = useState<{
    claimingAge: number;
    monthlyBenefit: number;
    lifetimeBenefits: number;
    presentValue: number;
    adjustmentFactor: number;
  }[] | null>(null);

  // Calculate Retirement Age (FRA) in years and months, matching SSA rules
  const getFullRetirementAge = (year: string): {
    years: number;
    months: number;
    decimal: number;
  } => {
    const y = parseInt(year);
    if (y <= 1937) return {
      years: 65,
      months: 0,
      decimal: 65.0
    };
    if (y >= 1960) return {
      years: 67,
      months: 0,
      decimal: 67.0
    };
    // 1938-1942: add 2 months per year
    if (y >= 1938 && y <= 1942) {
      const addMonths = (y - 1937) * 2;
      return {
        years: 65,
        months: addMonths,
        decimal: 65 + addMonths / 12
      };
    }
    // 1943-1954: 66
    if (y >= 1943 && y <= 1954) return {
      years: 66,
      months: 0,
      decimal: 66.0
    };
    // 1955-1959: add 2 months per year
    if (y >= 1955 && y <= 1959) {
      const addMonths = (y - 1954) * 2;
      return {
        years: 66,
        months: addMonths,
        decimal: 66 + addMonths / 12
      };
    }
    // fallback
    return {
      years: 67,
      months: 0,
      decimal: 67.0
    };
  };

  // Calculate factor for claiming before/after FRA (SSA/Calculator.net logic)
  // Early: 5/9 of 1% per month for first 36 months, 5/12 of 1% for additional months
  // Late: 2/3 of 1% per month (8% per year)
  const getAdjustmentFactor = (claimAge: number, fraDecimal: number): number => {
    const monthsDiff = Math.round((claimAge - fraDecimal) * 12);
    if (monthsDiff === 0) return 1.0;
    if (monthsDiff < 0) {
      // Early claiming
      const monthsEarly = -monthsDiff;
      let reduction = 0;
      if (monthsEarly <= 36) {
        reduction = monthsEarly * (5 / 9) * 0.01;
      } else {
        reduction = 36 * (5 / 9) * 0.01 + (monthsEarly - 36) * (5 / 12) * 0.01;
      }
      return 1 - reduction;
    } else {
      // Delayed credits
      return 1 + monthsDiff * (2 / 3) * 0.01;
    }
  };

  // Calculate value of benefits (Calculator.net logic: monthly compounding, COLA, discounting)
  const calculatePresentValue = (monthlyBenefit: number, claimAge: number, lifeExp: number, cola: number, investReturn: number): number => {
    let pv = 0;
    const monthlyReturn = investReturn / 100 / 12;
    const monthlyCola = cola / 100 / 12;
    const totalMonths = Math.round((lifeExp - claimAge) * 12);
    for (let month = 0; month < totalMonths; month++) {
      // Each month, benefit increases by COLA, discount by investment return
      const benefitAtMonth = monthlyBenefit * Math.pow(1 + monthlyCola, month);
      const discountedBenefit = benefitAtMonth / Math.pow(1 + monthlyReturn, month);
      pv += discountedBenefit;
    }
    return pv;
  };
  const calculateBenefits = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const fra = getFullRetirementAge(birthYear);
    const baseBenefit = parseFloat(monthlyBenefitAtFRA);
    const lifeExp = parseFloat(lifeExpectancy);
    const cola = parseFloat(colaRate);
    const investReturn = parseFloat(investmentReturn);
    const calculatedResults = claimingAges.map(age => {
      const adjustmentFactor = getAdjustmentFactor(age, fraObj.decimal);
      const monthlyBenefit = baseBenefit * adjustmentFactor;
      // Calculate benefits (undiscounted)
      const yearsReceiving = lifeExp - age;
      let lifetimeBenefits = 0;
      for (let year = 0; year < yearsReceiving; year++) {
        const benefitThisYear = monthlyBenefit * 12 * Math.pow(1 + cola / 100, year);
        lifetimeBenefits += benefitThisYear;
      }
      // Calculate value
      const presentValue = calculatePresentValue(monthlyBenefit, age, lifeExp, cola, investReturn);
      return {
        claimingAge: age,
        monthlyBenefit,
        lifetimeBenefits,
        presentValue,
        adjustmentFactor
      };
    });
    setResults(calculatedResults);
  };

  // Handle claiming age selection
  const handleClaimingAgeChange = (age: number, checked: boolean) => {
    if (checked) {
      setClaimingAges([...claimingAges, age].sort((a, b) => a - b));
    } else {
      setClaimingAges(claimingAges.filter(a => a !== age));
    }
  };
  const fraObj = getFullRetirementAge(birthYear);
  const fra = fraObj.decimal;
  const bestOption = results ? results.reduce((best, current) => current.presentValue > best.presentValue ? current : best) : null;
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>{contentData.social_security_inputs_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.basic_information_1}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.birth_year_2}</Label>
                        <Input type="number" min="1900" max={new Date().getFullYear()} value={birthYear} onChange={handleBirthYearChange} className="h-12 text-lg border-2 focus:border-blue-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.full_retirement_age_3}<span className="ml-2 text-sm text-blue-600 font-normal">{contentData.autocalculated_4}{fraObj.years}{contentData.years_5}{fraObj.months ? `, ${fraObj.months} months` : ""})
                          </span>
                        </Label>
                        <Input value={`${fraObj.years} years${fraObj.months ? ", " + fraObj.months + " months" : ""}`} disabled className="h-12 text-lg border-2 bg-gray-50" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.life_expectancy_years_6}</Label>
                        <Input type="number" value={lifeExpectancy} onChange={handleLifeExpectancyChange} className="h-12 text-lg border-2 focus:border-blue-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.monthly_benefit_at_fra_7}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={monthlyBenefitAtFRA} onChange={handleMonthlyBenefitChange} className="pl-10 h-12 text-lg border-2 focus:border-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Claiming Ages */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.claiming_ages_to_compare_8}</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[62, 63, 64, 65, 66, 67, 68, 69, 70].map(age => <div key={age} className="flex items-center space-x-2">
                          <Checkbox id={`age-${age}`} checked={claimingAges.includes(age)} onCheckedChange={checked => handleClaimingAgeChange(age, checked as boolean)} />
                          <Label htmlFor={`age-${age}`} className="text-sm font-medium">{contentData.age_9}{age}
                            {age === Math.floor(fra) && <span className="ml-1 text-xs text-blue-600">{contentData.fra_10}</span>}
                          </Label>
                        </div>)}
                    </div>
                  </div>

                  <Separator />

                  {/* Economic Assumptions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.economic_assumptions_11}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.annual_cola_12}</Label>
                        <Input type="number" step="0.1" value={colaRate} onChange={handleColaChange} className="h-12 text-lg border-2 focus:border-blue-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.investment_return_13}</Label>
                        <Input type="number" step="0.1" value={investmentReturn} onChange={handleInvestmentReturnChange} className="h-12 text-lg border-2 focus:border-blue-500" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="inflated-dollars" checked={showInflatedDollars} onCheckedChange={checked => setShowInflatedDollars(checked as boolean)} />
                      <Label htmlFor="inflated-dollars" className="text-sm font-medium">{contentData.show_in_future_inflated_dollars_vs_todays_dollars_14}</Label>
                    </div>
                  </div>

                  <Button onClick={calculateBenefits} disabled={claimingAges.length === 0} className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12">{contentData.calculate_15}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.benefit_comparison_16}</CardTitle>
                  <CardDescription className="text-base">{contentData.compare_claiming_strategies_17}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Best Strategy Highlight */}
                      {bestOption && <div className="bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 p-6 rounded-2xl text-center">
                          <p className="text-lg mb-2 font-semibold text-green-800">{contentData.optimal_strategy_18}</p>
                          <p className="text-3xl font-bold mb-2 text-green-700">{contentData.claim_at_age_19}{bestOption.claimingAge}
                          </p>
                          <p className="text-sm text-green-600">{contentData.highest_present_value_20}{bestOption.presentValue.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                          </p>
                        </div>}

                      {/* Comparison Table */}
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.detailed_comparison_21}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 p-3 text-left font-semibold">{contentData.claim_age_22}</th>
                                <th className="border border-gray-200 p-3 text-left font-semibold">{contentData.monthly_benefit_23}</th>
                                <th className="border border-gray-200 p-3 text-left font-semibold">{contentData.lifetime_benefits_24}</th>
                                <th className="border border-gray-200 p-3 text-left font-semibold">{contentData.present_value_25}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.map((result, index) => <tr key={result.claimingAge} className={`${bestOption && result.claimingAge === bestOption.claimingAge ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'}`}>
                                  <td className="border border-gray-200 p-3 font-medium">{contentData.age_26}{result.claimingAge}
                                    {bestOption && result.claimingAge === bestOption.claimingAge && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{contentData.best_27}</span>}
                                  </td>
                                  <td className="border border-gray-200 p-3">
                                    ${result.monthlyBenefit.toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                    <div className="text-xs text-gray-500">
                                      {((result.adjustmentFactor - 1) * 100).toFixed(1)}{contentData.vs_fra_28}</div>
                                  </td>
                                  <td className="border border-gray-200 p-3">
                                    ${result.lifetimeBenefits.toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </td>
                                  <td className="border border-gray-200 p-3 font-semibold">
                                    ${result.presentValue.toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Key Insights */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">{contentData.key_insights_29}</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>{contentData.present_values_assume_30}{investmentReturn}{contentData.annual_investment_return_31}</li>
                          <li>{contentData.benefits_increase_by_32}{colaRate}{contentData.annually_after_claiming_33}</li>
                          <li>{contentData.early_claiming_reduces_benefits_permanently_34}</li>
                          <li>{contentData.delayed_retirement_credits_add_8_per_year_after_fr_35}</li>
                        </ul>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.select_claiming_ages_and_calculate_to_see_your_res_36}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators calculators={[{
              calculatorName: "Savings Calculator",
              calculatorHref: "/financial/savings-calculator",
              calculatorDescription: "Calculate your savings grow over time with compound interest and regular contributions."
            }, {
              calculatorName: "Investment Calculator",
              calculatorHref: "/financial/investment-calculator",
              calculatorDescription: "Plan your investment strategy and see how your portfolio can grow over time."
            }, {
              calculatorName: "Retirement Calculator",
              calculatorHref: "/financial/retirement-calculator",
              calculatorDescription: "Calculate much you need to save for retirement and plan your financial future."
            }]} color="blue" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How It Works */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.how_social_security_benefits_work_37}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_primary_insurance_amount_pia_38}</h3>
                      <p className="text-gray-700 mb-2">{contentData.your_pia_is_calculated_from_your_average_indexed_m_39}</p>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        {"PIA = 0.90 × AIME≤$1,226 + 0.32 × (AIME$1,226-$7,391) + 0.15 × (AIME>$7,391)"}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_claiming_age_adjustments_40}</h3>
                      <p className="text-gray-700">{contentData.benefits_are_reduced_for_early_claiming_before_fra_41}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_present_value_analysis_42}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        {"PV = Σ [Benefit_t × (1+COLA)^t] / (1+r)^t"}
                      </div>
                      <p className="text-gray-700 mt-2">{contentData.where_r_investment_return_rate_accounting_for_the__43}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.frequently_asked_questions_44}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />{contentData.what_is_full_retirement_age_fra_45}</div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{contentData.full_retirement_age_is_when_you_can_claim_100_of_y_46}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />{contentData.how_much_do_i_lose_by_claiming_early_at_62_47}</div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{contentData.claiming_at_62_reduces_your_benefit_by_about_2530__48}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />{contentData.what_are_delayed_retirement_credits_49}</div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{contentData.for_each_year_you_delay_claiming_past_fra_up_to_ag_50}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />{contentData.what_is_the_breakeven_age_51}</div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{contentData.the_breakeven_age_is_when_the_total_benefits_recei_52}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />{contentData.how_does_cola_affect_my_benefits_53}</div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{contentData.costofliving_adjustments_cola_are_applied_annually_54}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Calculator Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="social-security-calculator"
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