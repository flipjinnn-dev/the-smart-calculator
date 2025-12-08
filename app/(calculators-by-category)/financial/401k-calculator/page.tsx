"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";
import { Calculator, TrendingUp, DollarSign, PiggyBank, HelpCircle, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";

export default function FourOhOneKCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('401k-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('401k-calculator', language, "calculator-guide");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "type_of_calculation_2": "",
    "retirement_planning_3": "",
    "calculateterm_401k_growth_and_projections_4": "",
    "early_withdrawal_costs_5": "",
    "calculate_and_taxes_on_early_withdrawals_6": "",
    "maximize_employer_match_7": "",
    "find_optimal_contribution_rate_for_maximum_matchin_8": "",
    "basic_information_9": "",
    "current_age_10": "",
    "retirement_age_11": "",
    "current_annual_salary_12": "",
    "current_401k_balance_13": "",
    "contribution_settings_14": "",
    "employee_contribution_rate_15": "",
    "employer_match_rate_16": "",
    "employer_match_limit_of_salary_eligible_17": "",
    "growth_assumptions_18": "",
    "annual_salary_growth_19": "",
    "expected_annual_return_20": "",
    "expected_inflation_rate_21": "",
    "calculate_projection_22": "",
    "early_withdrawal_amount_23": "",
    "federal_income_tax_rate_24": "",
    "state_income_tax_rate_25": "",
    "localcity_tax_rate_26": "",
    "penalty_exemptions_27": "",
    "are_you_employed_28": "",
    "do_you_have_a_qualifying_disability_29": "",
    "do_you_qualify_for_other_penalty_exemptions_30": "",
    "calculate_withdrawal_cost_31": "",
    "current_age_32": "",
    "current_annual_salary_33": "",
    "employer_match_structure_34": "",
    "employer_match_1_35": "",
    "match_1_limit_36": "",
    "employer_match_2_37": "",
    "match_2_limit_38": "",
    "optimize_employer_match_39": "",
    "retirement_projection_40": "",
    "your_401k_growth_forecast_41": "",
    "projected_balance_at_retirement_42": "",
    "real_value_todays_dollars_43": "",
    "contribution_breakdown_44": "",
    "your_contributions_45": "",
    "employer_match_46": "",
    "investment_growth_47": "",
    "final_years_projection_48": "",
    "age_49": "",
    "salary_50": "",
    "contributions_51": "",
    "enter_your_information_to_see_your_401k_projection_52": "",
    "withdrawal_impact_53": "",
    "penalties_and_taxes_breakdown_54": "",
    "net_amount_youll_receive_55": "",
    "effective_cost_56": "",
    "cost_breakdown_57": "",
    "gross_withdrawal_58": "",
    "early_withdrawal_penalty_10_59": "",
    "federal_income_tax_60": "",
    "state_income_tax_61": "",
    "localcity_tax_62": "",
    "enter_withdrawal_details_to_see_cost_breakdown_63": "",
    "optimization_results_64": "",
    "recommended_contribution_strategy_65": "",
    "recommended_contribution_rate_66": "",
    "maximum_employer_match_67": "",
    "optimal_range_68": "",
    "contribute_between_69": "",
    "and_70": "",
    "to_maximize_employer_matching_71": "",
    "contribution_analysis_72": "",
    "contribution_73": "",
    "match_74": "",
    "your_75": "",
    "total_76": "",
    "enter_your_details_to_optimize_employer_matching_77": "",
    "formulas_calculation_logic_78": "",
    "k_1_salary_progression_79": "",
    "salaryt_current_salary_1_growth_ratet1_80": "",
    "k_2_employee_contribution_81": "",
    "employee_contribution_contribution_rate_salary_cap_82": "",
    "k_3_employer_match_83": "",
    "if_employee_rate_match_limit_match_match_rate_sala_84": "",
    "else_match_match_rate_match_limit_salary_85": "",
    "k_4_balance_growth_86": "",
    "new_balance_previous_balance_contributions_1_retur_87": "",
    "k_5_early_withdrawal_penalty_88": "",
    "net_amount_withdrawal_1_penalty_rate_1_tax_rates_89": "",
    "k_401k_calculator_0": "",
    "choose_your_calculation_type_and_get_accurate_reti_1": ""
  };
  const guideData = guideContent || { color: 'blue', sections: [], faq: [] };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [activeTab, setActiveTab] = useState("retirement");

  // Retirement Calculator States
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [lifeExpectancy, setLifeExpectancy] = useState("85");
  const [currentSalary, setCurrentSalary] = useState("60000");
  const [currentBalance, setCurrentBalance] = useState("50000");
  const [employeeContributionRate, setEmployeeContributionRate] = useState("6");
  const [employerMatchRate, setEmployerMatchRate] = useState("50");
  const [employerMatchLimit, setEmployerMatchLimit] = useState("6");
  const [salaryGrowthRate, setSalaryGrowthRate] = useState("3");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [inflationRate, setInflationRate] = useState("2.5");
  const [earlyWithdrawalAmount, setEarlyWithdrawalAmount] = useState("10000");
  const [federalTaxRate, setFederalTaxRate] = useState("25");
  const [stateTaxRate, setStateTaxRate] = useState("5");
  const [localTaxRate, setLocalTaxRate] = useState("0");
  const [isEmployed, setIsEmployed] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [hasOtherExemptions, setHasOtherExemptions] = useState(false);
  const [optimizerAge, setOptimizerAge] = useState("30");
  const [optimizerSalary, setOptimizerSalary] = useState("75000");
  const [match1Rate, setMatch1Rate] = useState("50");
  const [match1Limit, setMatch1Limit] = useState("3");
  const [match2Rate, setMatch2Rate] = useState("20");
  const [match2Limit, setMatch2Limit] = useState("6");

  // Results States
  const [retirementResults, setRetirementResults] = useState<any>(null);
  const [earlyWithdrawalResults, setEarlyWithdrawalResults] = useState<any>(null);
  const [optimizerResults, setOptimizerResults] = useState<any>(null);
  const calculateRetirement = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const age = Number.parseFloat(currentAge);
    const R = Number.parseFloat(retirementAge);
    const S0 = Number.parseFloat(currentSalary);
    const B0 = Number.parseFloat(currentBalance);
    const c = Number.parseFloat(employeeContributionRate) / 100;
    const m = Number.parseFloat(employerMatchRate) / 100;
    const mlimit = Number.parseFloat(employerMatchLimit) / 100;
    const g = Number.parseFloat(salaryGrowthRate) / 100;
    const r = Number.parseFloat(annualReturn) / 100;
    const i = Number.parseFloat(inflationRate) / 100;
    const n = R - age;
    let totalEmployeeContributions = 0;
    let totalEmployerContributions = 0;
    const yearlyBreakdown = [];

    // Calculate exact competitor formula: BR = B0 × (1+r)^n + Σ(Et + Mt) × (1+r)^(n-t)
    let futureValueOfContributions = 0;
    for (let t = 1; t <= n; t++) {
      // Salary progression: St = S0 × (1+g)^(t−1)
      const St = S0 * Math.pow(1 + g, t - 1);

      // Employee contribution: Et = c × St
      const Et = Math.min(c * St, 23000); // 2024 limit

      // Employer match calculation with exact formula
      let Mt = 0;
      if (c <= mlimit) {
        Mt = m * St;
      } else {
        Mt = m * (mlimit * St);
      }
      Mt = Math.min(Mt, 69000 - Et); // Total contribution limit

      // Future value of this year's contributions: (Et + Mt) × (1+r)^(n-t)
      futureValueOfContributions += (Et + Mt) * Math.pow(1 + r, n - t);
      totalEmployeeContributions += Et;
      totalEmployerContributions += Mt;
      if (t > n - 10) {
        // Last 10 years for display
        yearlyBreakdown.push({
          year: new Date().getFullYear() + t - 1,
          age: Math.round(age + t - 1),
          salary: Math.round(St),
          employeeContribution: Math.round(Et),
          employerContribution: Math.round(Mt),
          balance: Math.round(B0 * Math.pow(1 + r, t) + futureValueOfContributions * Math.pow(1 + r, t - n))
        });
      }
    }

    // Final balance: BR = B0 × (1+r)^n + futureValueOfContributions
    const retirementBalance = B0 * Math.pow(1 + r, n) + futureValueOfContributions;
    const totalContributions = totalEmployeeContributions + totalEmployerContributions;
    const totalGrowth = retirementBalance - B0 - totalContributions;

    // Real value (today's dollars): RealValue = BR / (1+i)^n
    const inflationAdjustedBalance = retirementBalance / Math.pow(1 + i, n);
    setRetirementResults({
      retirementBalance,
      inflationAdjustedBalance,
      totalContributions,
      totalEmployeeContributions,
      totalEmployerContributions,
      totalGrowth,
      yearlyBreakdown
    });
  };
  const calculateEarlyWithdrawal = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const withdrawalAmt = Number.parseFloat(earlyWithdrawalAmount);
    const fedTaxRate = Number.parseFloat(federalTaxRate) / 100;
    const stateRate = Number.parseFloat(stateTaxRate) / 100;
    const localRate = Number.parseFloat(localTaxRate) / 100;

    // Determine if 10% penalty applies
    let penaltyRate = 0.1;
    if (hasDisability || hasOtherExemptions) {
      penaltyRate = 0;
    }
    const penalty = withdrawalAmt * penaltyRate;
    const federalTax = withdrawalAmt * fedTaxRate;
    const stateTax = withdrawalAmt * stateRate;
    const localTax = withdrawalAmt * localRate;
    const totalTaxes = federalTax + stateTax + localTax;
    const netAmount = withdrawalAmt - penalty - totalTaxes;
    setEarlyWithdrawalResults({
      grossAmount: withdrawalAmt,
      penalty,
      federalTax,
      stateTax,
      localTax,
      totalTaxes,
      netAmount,
      effectiveRate: (penalty + totalTaxes) / withdrawalAmt * 100
    });
  };
  const calculateOptimizer = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const salary = Number.parseFloat(optimizerSalary);
    const match1 = Number.parseFloat(match1Rate) / 100;
    const limit1 = Number.parseFloat(match1Limit) / 100;
    const match2 = Number.parseFloat(match2Rate) / 100;
    const limit2 = Number.parseFloat(match2Limit) / 100;
    const contributionLevels = [];
    const maxContributionRate = Math.min(23000 / salary, 1); // Don't exceed IRS limit

    // Calculate at different contribution levels
    for (let rate = 0; rate <= maxContributionRate; rate += 0.005) {
      // 0.5% increments
      let employerMatch = 0;

      // First tier match
      if (rate <= limit1) {
        employerMatch += match1 * rate * salary;
      } else {
        employerMatch += match1 * limit1 * salary;
      }

      // Second tier match (if applicable)
      if (rate > limit1 && rate <= limit2) {
        employerMatch += match2 * (rate - limit1) * salary;
      } else if (rate > limit2) {
        employerMatch += match2 * (limit2 - limit1) * salary;
      }
      const employeeContribution = rate * salary;
      const totalContribution = employeeContribution + employerMatch;
      contributionLevels.push({
        contributionRate: rate * 100,
        employeeContribution,
        employerMatch,
        totalContribution,
        effectiveMatch: employeeContribution > 0 ? employerMatch / employeeContribution * 100 : 0
      });
    }

    // Find optimal range
    const maxMatch = Math.max(...contributionLevels.map(level => level.employerMatch));
    const optimalLevels = contributionLevels.filter(level => level.employerMatch >= maxMatch * 0.99);
    const minOptimalRate = Math.min(...optimalLevels.map(level => level.contributionRate));
    const maxOptimalRate = Math.max(...optimalLevels.map(level => level.contributionRate));
    setOptimizerResults({
      contributionLevels: contributionLevels.filter((_, index) => index % 4 === 0),
      // Show every 2%
      maxEmployerMatch: maxMatch,
      optimalRateMin: minOptimalRate,
      optimalRateMax: maxOptimalRate,
      recommendedRate: limit2 * 100 // Generally recommend contributing up to full match
    });
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center py-16 ">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <Calculator className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            {/* Calculator Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.k_401k_calculator_0}</span>
                    </CardTitle>
                    <CardDescription>{contentData.choose_your_calculation_type_and_get_accurate_reti_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <Label className="text-base font-semibold text-gray-900">{contentData.type_of_calculation_2}</Label>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setActiveTab("retirement")} className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${activeTab === "retirement" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                          <TrendingUp className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">{contentData.retirement_planning_3}</div>
                            <div className="text-sm opacity-75">{contentData.calculateterm_401k_growth_and_projections_4}</div>
                          </div>
                        </button>
                        <button onClick={() => setActiveTab("withdrawal")} className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${activeTab === "withdrawal" ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                          <AlertTriangle className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">{contentData.early_withdrawal_costs_5}</div>
                            <div className="text-sm opacity-75">{contentData.calculate_and_taxes_on_early_withdrawals_6}</div>
                          </div>
                        </button>
                        <button onClick={() => setActiveTab("optimizer")} className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${activeTab === "optimizer" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                          <Target className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">{contentData.maximize_employer_match_7}</div>
                            <div className="text-sm opacity-75">{contentData.find_optimal_contribution_rate_for_maximum_matchin_8}</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {activeTab === "retirement" && <>
                        {/* Basic Information */}
                        <div className="space-y-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">{contentData.basic_information_9}</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.current_age_10}</Label>
                              <Input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.retirement_age_11}</Label>
                              <Input type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" />
                            </div>

                            <div className="space-y-3 sm:col-span-2">
                              <Label className="text-base font-semibold text-gray-900">{contentData.current_annual_salary_12}</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input type="number" value={currentSalary} onChange={e => setCurrentSalary(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-blue-500" />
                              </div>
                            </div>

                            <div className="space-y-3 sm:col-span-2">
                              <Label className="text-base font-semibold text-gray-900">{contentData.current_401k_balance_13}</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input type="number" value={currentBalance} onChange={e => setCurrentBalance(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-blue-500" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Contribution Settings */}
                        <div className="space-y-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">{contentData.contribution_settings_14}</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.employee_contribution_rate_15}</Label>
                              <Input type="number" value={employeeContributionRate} onChange={e => setEmployeeContributionRate(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" step="0.1" />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.employer_match_rate_16}</Label>
                              <Input type="number" value={employerMatchRate} onChange={e => setEmployerMatchRate(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" step="0.1" />
                            </div>

                            <div className="space-y-3 sm:col-span-2">
                              <Label className="text-base font-semibold text-gray-900">{contentData.employer_match_limit_of_salary_eligible_17}</Label>
                              <Input type="number" value={employerMatchLimit} onChange={e => setEmployerMatchLimit(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" step="0.1" />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Growth Assumptions */}
                        <div className="space-y-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">{contentData.growth_assumptions_18}</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.annual_salary_growth_19}</Label>
                              <Input type="number" value={salaryGrowthRate} onChange={e => setSalaryGrowthRate(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" step="0.1" />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.expected_annual_return_20}</Label>
                              <Input type="number" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" step="0.1" />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.expected_inflation_rate_21}</Label>
                              <Input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" step="0.1" />
                            </div>
                          </div>
                        </div>

                        <Button onClick={calculateRetirement} className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12">{contentData.calculate_projection_22}</Button>
                      </>}

                    {activeTab === "withdrawal" && <>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">{contentData.early_withdrawal_amount_23}</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input type="number" value={earlyWithdrawalAmount} onChange={e => setEarlyWithdrawalAmount(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-orange-500" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.federal_income_tax_rate_24}</Label>
                              <Input type="number" value={federalTaxRate} onChange={e => setFederalTaxRate(e.target.value)} className="h-12 text-lg border-2 focus:border-orange-500" />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.state_income_tax_rate_25}</Label>
                              <Input type="number" value={stateTaxRate} onChange={e => setStateTaxRate(e.target.value)} className="h-12 text-lg border-2 focus:border-orange-500" />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.localcity_tax_rate_26}</Label>
                              <Input type="number" value={localTaxRate} onChange={e => setLocalTaxRate(e.target.value)} className="h-12 text-lg border-2 focus:border-orange-500" />
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">{contentData.penalty_exemptions_27}</h3>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="employed" checked={isEmployed} onCheckedChange={val => setIsEmployed(val === true)} />
                              <Label htmlFor="employed">{contentData.are_you_employed_28}</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="disability" checked={hasDisability} onCheckedChange={val => setHasDisability(val === true)} />
                              <Label htmlFor="disability">{contentData.do_you_have_a_qualifying_disability_29}</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="exemptions" checked={hasOtherExemptions} onCheckedChange={val => setHasOtherExemptions(val === true)} />
                              <Label htmlFor="exemptions">{contentData.do_you_qualify_for_other_penalty_exemptions_30}</Label>
                            </div>
                          </div>
                        </div>

                        <Button onClick={calculateEarlyWithdrawal} className="w-full h-14 text-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-xl font-bold">{contentData.calculate_withdrawal_cost_31}</Button>
                      </>}

                    {activeTab === "optimizer" && <>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.current_age_32}</Label>
                              <Input type="number" value={optimizerAge} onChange={e => setOptimizerAge(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">{contentData.current_annual_salary_33}</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input type="number" value={optimizerSalary} onChange={e => setOptimizerSalary(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">{contentData.employer_match_structure_34}</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">{contentData.employer_match_1_35}</Label>
                                <Input type="number" value={match1Rate} onChange={e => setMatch1Rate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                              </div>

                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">{contentData.match_1_limit_36}</Label>
                                <Input type="number" value={match1Limit} onChange={e => setMatch1Limit(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                              </div>

                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">{contentData.employer_match_2_37}</Label>
                                <Input type="number" value={match2Rate} onChange={e => setMatch2Rate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                              </div>

                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">{contentData.match_2_limit_38}</Label>
                                <Input type="number" value={match2Limit} onChange={e => setMatch2Limit(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button onClick={calculateOptimizer} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-xl font-bold">{contentData.optimize_employer_match_39}</Button>
                      </>}
                  </CardContent>
                </Card>

                {/* Results Panel - Always visible on the right */}
                <div className="lg:sticky lg:top-8 lg:self-start">
                  {activeTab === "retirement" && <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                        <CardTitle className="text-2xl">{contentData.retirement_projection_40}</CardTitle>
                        <CardDescription className="text-base">{contentData.your_401k_growth_forecast_41}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        {retirementResults ? <div className="space-y-6">
                            {/* Main Results */}
                            <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-green-100 border-blue-300">
                              <p className="text-lg mb-2 font-semibold text-blue-800">{contentData.projected_balance_at_retirement_42}</p>
                              <p className="text-4xl font-bold mb-2 text-blue-700">
                                $
                                {retirementResults.retirementBalance.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          })}
                              </p>
                              <p className="text-sm text-blue-600">{contentData.real_value_todays_dollars_43}{retirementResults.inflationAdjustedBalance.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          })}
                              </p>
                            </div>

                            {/* Contribution Breakdown */}
                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">{contentData.contribution_breakdown_44}</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                  <span className="font-medium text-gray-700">{contentData.your_contributions_45}</span>
                                  <span className="font-bold text-green-600">
                                    $
                                    {retirementResults.totalEmployeeContributions.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="font-medium text-gray-700">{contentData.employer_match_46}</span>
                                  <span className="font-bold text-blue-600">
                                    $
                                    {retirementResults.totalEmployerContributions.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                  <span className="font-medium text-gray-700">{contentData.investment_growth_47}</span>
                                  <span className="font-bold text-purple-600">
                                    $
                                    {retirementResults.totalGrowth.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Yearly Breakdown */}
                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">{contentData.final_years_projection_48}</h3>
                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {retirementResults.yearlyBreakdown.map((year: any) => <div key={year.year} className="p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-gray-700">
                                        {year.year}{contentData.age_49}{year.age})
                                      </span>
                                      <span className="font-bold text-gray-900">${year.balance.toLocaleString()}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 flex justify-between">
                                      <span>{contentData.salary_50}{year.salary.toLocaleString()}</span>
                                      <span>{contentData.contributions_51}{(year.employeeContribution + year.employerContribution).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>)}
                              </div>
                            </div>
                          </div> : <div className="text-center py-12 text-gray-500">
                            <PiggyBank className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">{contentData.enter_your_information_to_see_your_401k_projection_52}</p>
                          </div>}
                      </CardContent>
                    </Card>}

                  {activeTab === "withdrawal" && <Card className="shadow-2xl p-0 border-0 pt-0 bg-white">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                        <CardTitle className="text-2xl">{contentData.withdrawal_impact_53}</CardTitle>
                        <CardDescription className="text-base">{contentData.penalties_and_taxes_breakdown_54}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        {earlyWithdrawalResults ? <div className="space-y-6">
                            <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-orange-100 to-red-100 border-orange-300">
                              <p className="text-lg mb-2 font-semibold text-orange-800">{contentData.net_amount_youll_receive_55}</p>
                              <p className="text-4xl font-bold mb-2 text-orange-700">
                                ${earlyWithdrawalResults.netAmount.toLocaleString()}
                              </p>
                              <p className="text-sm text-orange-600">{contentData.effective_cost_56}{earlyWithdrawalResults.effectiveRate.toFixed(1)}%
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">{contentData.cost_breakdown_57}</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                  <span className="font-medium text-gray-700">{contentData.gross_withdrawal_58}</span>
                                  <span className="font-bold text-green-600">
                                    ${earlyWithdrawalResults.grossAmount.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                  <span className="font-medium text-gray-700">{contentData.early_withdrawal_penalty_10_59}</span>
                                  <span className="font-bold text-red-600">
                                    -${earlyWithdrawalResults.penalty.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                  <span className="font-medium text-gray-700">{contentData.federal_income_tax_60}</span>
                                  <span className="font-bold text-red-600">
                                    -${earlyWithdrawalResults.federalTax.toLocaleString()}
                                  </span>
                                </div>
                                {earlyWithdrawalResults.stateTax > 0 && <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-gray-700">{contentData.state_income_tax_61}</span>
                                    <span className="font-bold text-red-600">
                                      -${earlyWithdrawalResults.stateTax.toLocaleString()}
                                    </span>
                                  </div>}
                                {earlyWithdrawalResults.localTax > 0 && <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-gray-700">{contentData.localcity_tax_62}</span>
                                    <span className="font-bold text-red-600">
                                      -${earlyWithdrawalResults.localTax.toLocaleString()}
                                    </span>
                                  </div>}
                              </div>
                            </div>
                          </div> : <div className="text-center py-12 text-gray-500">
                            <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">{contentData.enter_withdrawal_details_to_see_cost_breakdown_63}</p>
                          </div>}
                      </CardContent>
                    </Card>}

                  {activeTab === "optimizer" && <Card className="shadow-2xl border-0 p-0 bg-white">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                        <CardTitle className="text-2xl">{contentData.optimization_results_64}</CardTitle>
                        <CardDescription className="text-base">{contentData.recommended_contribution_strategy_65}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        {optimizerResults ? <div className="space-y-6">
                            <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-blue-100 border-green-300">
                              <p className="text-lg mb-2 font-semibold text-green-800">{contentData.recommended_contribution_rate_66}</p>
                              <p className="text-4xl font-bold mb-2 text-green-700">
                                {optimizerResults.recommendedRate.toFixed(1)}%
                              </p>
                              <p className="text-sm text-green-600">{contentData.maximum_employer_match_67}{optimizerResults.maxEmployerMatch.toLocaleString()}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">{contentData.optimal_range_68}</h3>
                              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-gray-700 mb-2">{contentData.contribute_between_69}<strong>{optimizerResults.optimalRateMin.toFixed(1)}%</strong>{contentData.and_70}{" "}
                                  <strong>{optimizerResults.optimalRateMax.toFixed(1)}%</strong>{contentData.to_maximize_employer_matching_71}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">{contentData.contribution_analysis_72}</h3>
                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {optimizerResults.contributionLevels.slice(0, 15).map((level: any, index: number) => <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-gray-700">
                                        {level.contributionRate.toFixed(1)}{contentData.contribution_73}</span>
                                      <span className="font-bold text-gray-900">
                                        ${level.employerMatch.toLocaleString()}{contentData.match_74}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 flex justify-between">
                                      <span>{contentData.your_75}{level.employeeContribution.toLocaleString()}</span>
                                      <span>{contentData.total_76}{level.totalContribution.toLocaleString()}</span>
                                    </div>
                                  </div>)}
                              </div>
                            </div>
                          </div> : <div className="text-center py-12 text-gray-500">
                            <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">{contentData.enter_your_details_to_optimize_employer_matching_77}</p>
                          </div>}
                      </CardContent>
                    </Card>}
                </div>
              </div>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Retirement Calculator",
            calculatorHref: "/financial/retirement-calculator",
            calculatorDescription: "Plan your complete retirement strategy with comprehensive projections"
          }, {
            calculatorName: "Salary Calculator",
            calculatorHref: "/financial/salary-calculator",
            calculatorDescription: "Calculate take-home pay and understand salary breakdowns"
          }, {
            calculatorName: "Savings Calculator",
            calculatorHref: "/financial/savings-calculator",
            calculatorDescription: "Track savings growth and plan for financial goals"
          }]} color="blue" title="Related Financial Calculators" />

            {/* Educational Content */}
            <div className="mt-0 space-y-8">
              <CalculatorGuide data={guideData} />
              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_calculation_logic_78}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_salary_progression_79}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.salaryt_current_salary_1_growth_ratet1_80}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_employee_contribution_81}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.employee_contribution_contribution_rate_salary_cap_82}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_employer_match_83}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.if_employee_rate_match_limit_match_match_rate_sala_84}<br />{contentData.else_match_match_rate_match_limit_salary_85}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_balance_growth_86}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.new_balance_previous_balance_contributions_1_retur_87}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_5_early_withdrawal_penalty_88}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.net_amount_withdrawal_1_penalty_rate_1_tax_rates_89}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

        </main>
      </div>
    </>;
}