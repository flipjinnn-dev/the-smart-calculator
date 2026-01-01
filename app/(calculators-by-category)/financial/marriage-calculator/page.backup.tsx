"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Heart, DollarSign, Users, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;

// 2025 Tax brackets
const TAX_BRACKETS_2025 = {
  single: [{
    min: 0,
    max: 11300,
    rate: 0.1
  }, {
    min: 11300,
    max: 45850,
    rate: 0.12
  }, {
    min: 45850,
    max: 98000,
    rate: 0.22
  }, {
    min: 98000,
    max: 186850,
    rate: 0.24
  }, {
    min: 186850,
    max: 237300,
    rate: 0.32
  }, {
    min: 237300,
    max: 593450,
    rate: 0.35
  }, {
    min: 593450,
    max: Number.POSITIVE_INFINITY,
    rate: 0.37
  }],
  marriedJoint: [{
    min: 0,
    max: 22600,
    rate: 0.1
  }, {
    min: 22600,
    max: 91700,
    rate: 0.12
  }, {
    min: 91700,
    max: 196000,
    rate: 0.22
  }, {
    min: 196000,
    max: 373700,
    rate: 0.24
  }, {
    min: 373700,
    max: 474600,
    rate: 0.32
  }, {
    min: 474600,
    max: 712050,
    rate: 0.35
  }, {
    min: 712050,
    max: Number.POSITIVE_INFINITY,
    rate: 0.37
  }]
};
const STANDARD_DEDUCTIONS_2025 = {
  single: 14600,
  marriedJoint: 29200
};
const SS_WAGE_BASE_2025 = 168600;
const CAPITAL_GAINS_THRESHOLDS_2025 = {
  single: {
    tier1: 40000,
    tier2: 80000
  },
  marriedJoint: {
    tier1: 80000,
    tier2: 160000
  }
};
export default function MarriageCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('marriage-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('marriage-calculator', language, "calculator-guide");

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
    "marriage_tax_calculator_0": "",
    "state_city_tax_rate_1": "",
    "spouse_1_income_2": "",
    "salary_business_income_3": "",
    "interest_dividend_income_4": "",
    "passive_income_5": "",
    "shortterm_capital_gains_6": "",
    "longterm_capital_gains_7": "",
    "qualified_dividends_8": "",
    "k_401k_ira_savings_9": "",
    "updated_tax_calculation_functions_10": "",
    "use_standard_deduction_14600_11": "",
    "itemized_deductions_12": "",
    "selfemployed_13": "",
    "spouse_2_income_14": "",
    "salary_business_income_15": "",
    "interest_dividend_income_16": "",
    "passive_income_17": "",
    "shortterm_capital_gains_18": "",
    "longterm_capital_gains_19": "",
    "qualified_dividends_20": "",
    "k_401k_ira_savings_21": "",
    "use_standard_deduction_14600_22": "",
    "itemized_deductions_23": "",
    "selfemployed_24": "",
    "calculate_tax_impact_25": "",
    "marriage_tax_results_26": "",
    "tax_penalty_or_benefit_analysis_27": "",
    "of_total_income_28": "",
    "detailed_tax_breakdown_29": "",
    "category_30": "",
    "spouse_1_31": "",
    "spouse_2_32": "",
    "combined_not_married_33": "",
    "joint_married_34": "",
    "income_35": "",
    "federal_tax_36": "",
    "marginal_rate_37": "",
    "social_security_tax_38": "",
    "medicare_tax_39": "",
    "statecity_tax_40": "",
    "k_401k_ira_41": "",
    "final_take_home_42": "",
    "enter_both_spouses_information_to_see_your_marriag_43": "",
    "formulas_calculation_details_44": "",
    "k_1_individual_income_calculation_45": "",
    "total_income_wages_interest_passive_stcg_ltcg_qual_46": "",
    "taxable_income_total_income_deductions_selfemploym_47": "",
    "k_2_joint_income_calculation_48": "",
    "joint_income_spouse_1_total_income_spouse_2_total__49": "",
    "joint_taxable_joint_income_joint_deductions_combin_50": "",
    "k_3_marriage_penaltybenefit_51": "",
    "penaltybenefit_individual_tax_1_individual_tax_2_j_52": "",
    "positive_result_marriage_benefit_negative_result_m_53": "",
    "k_4_percentage_impact_54": "",
    "marriage_impact_penalty_or_benefit_joint_income_10_55": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Unified input state for both spouses and shared fields
  const [inputs, setInputs] = useState({
    spouse1: {
      salary: "65000",
      businessIncome: "0",
      interest: "0",
      dividends: "0",
      rental: "0",
      royalty: "0",
      passive: "0",
      shortTermGain: "0",
      longTermGain: "0",
      qualifiedDividends: "0",
      retirement: "10000",
      filingStatus: "single",
      dependents: "0",
      itemizedDeductions: "0",
      useStandardDeduction: true,
      selfEmployed: false
    },
    spouse2: {
      salary: "45000",
      businessIncome: "0",
      interest: "0",
      dividends: "0",
      rental: "0",
      royalty: "0",
      passive: "0",
      shortTermGain: "0",
      longTermGain: "0",
      qualifiedDividends: "0",
      retirement: "6000",
      filingStatus: "single",
      dependents: "0",
      itemizedDeductions: "0",
      useStandardDeduction: true,
      selfEmployed: false
    },
    stateTaxRate: "5",
    taxYear: "2025"
  });
  type ResultType = {
    spouse1: {
      income: number;
      retirement: number;
      deduction: number;
      taxableIncome: number;
      federalTax: number;
      marginalRate: number;
      ssTax: number;
      medicareTax: number;
      stateTax: number;
      takeHome: number;
    };
    spouse2: {
      income: number;
      retirement: number;
      deduction: number;
      taxableIncome: number;
      federalTax: number;
      marginalRate: number;
      ssTax: number;
      medicareTax: number;
      stateTax: number;
      takeHome: number;
    };
    combined: {
      income: number;
      federalTax: number;
      ssTax: number;
      medicareTax: number;
      stateTax: number;
      retirement: number;
      takeHome: number;
    };
    joint: {
      jointIncome: number;
      jointRetirement: number;
      jointDeduction: number;
      jointTaxable: number;
      federalTax: number;
      marginalRate: number;
      ssTax: number;
      medicareTax: number;
      stateTax: number;
      takeHome: number;
    };
    penaltyOrBenefit: number;
    penaltyPercentage: number;
  };
  const [results, setResults] = useState<ResultType | null>(null);
  const calculateSocialSecurityTax = (income: number) => {
    return Math.min(income, SS_WAGE_BASE_2025) * 0.062;
  };
  const calculateMedicareTax = (income: number) => {
    return income * 0.0145;
  };
  const calculateStateTax = (income: number, rate: number) => {
    return income * (rate / 100);
  };

  // Calculate for given income and brackets, and return both total tax and marginal rate
  const calculateTaxFromBrackets = (taxableIncome: number, brackets: any[]) => {
    let tax = 0;
    let remainingIncome = taxableIncome;
    let marginalRate = 0;
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      const taxableAtBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += taxableAtBracket * bracket.rate;
      if (taxableAtBracket > 0) {
        marginalRate = bracket.rate;
      }
      remainingIncome -= taxableAtBracket;
    }
    return {
      tax,
      marginalRate
    };
  };

  // Calculate tax on qualified dividends and LTCG
  const calculatePreferentialTax = (ordinaryTaxable: number, preferentialIncome: number, filingStatus: string) => {
    if (preferentialIncome <= 0) return 0;
    const thresholds = CAPITAL_GAINS_THRESHOLDS_2025[filingStatus as keyof typeof CAPITAL_GAINS_THRESHOLDS_2025];
    const totalIncome = ordinaryTaxable + preferentialIncome;

    // Calculate at each rate
    const at0Percent = Math.max(0, Math.min(preferentialIncome, thresholds.tier1 - ordinaryTaxable));
    const at15Percent = Math.max(0, Math.min(preferentialIncome - at0Percent, thresholds.tier2 - Math.max(ordinaryTaxable, thresholds.tier1)));
    const at20Percent = Math.max(0, preferentialIncome - at0Percent - at15Percent);
    return at0Percent * 0 + at15Percent * 0.15 + at20Percent * 0.2;
  };

  // Calculate-employment tax
  const calculateSelfEmploymentTax = (businessIncome: number) => {
    if (businessIncome <= 0) return 0;
    const seIncome = businessIncome * 0.9235;
    const ssTaxableWageBase = SS_WAGE_BASE_2025;
    return Math.min(seIncome, ssTaxableWageBase) * 0.124 + seIncome * 0.029;
  };

  // Competitor-style: federal tax on (income - deduction - retirement), payroll/state on gross income
  const calculateIndividualTax = (income: number, retirement: number, itemizedDeductions: number, useStandardDeduction: boolean) => {
    // Step 1: Deduction
    const standardDeduction = STANDARD_DEDUCTIONS_2025.single;
    const deduction = useStandardDeduction ? standardDeduction : Math.max(standardDeduction, itemizedDeductions);
    // Step 2: Taxable income (income - deduction - retirement)
    const taxableIncome = Math.max(0, income - deduction - retirement);
    // Step 3: Federal tax
    const {
      tax: federalTax,
      marginalRate
    } = calculateTaxFromBrackets(taxableIncome, TAX_BRACKETS_2025.single);
    // Step 4: Payroll taxes (on gross income)
    const ssTax = calculateSocialSecurityTax(income);
    const medicareTax = calculateMedicareTax(income);
    // Step 5: State tax (on gross income)
    const stateTax = calculateStateTax(income, Number.parseFloat(inputs.stateTaxRate));
    // Step 6: Take home
    const takeHome = income - retirement - federalTax - ssTax - medicareTax - stateTax;
    return {
      income,
      retirement,
      deduction,
      taxableIncome,
      federalTax,
      marginalRate,
      ssTax,
      medicareTax,
      stateTax,
      takeHome
    };
  };

  // Competitor-style: joint federal tax on (income1+income2 - deduction - retirement1 - retirement2), payroll/state on gross joint income
  const calculateJointTax = (income1: number, income2: number, retirement1: number, retirement2: number, itemizedDeductions1: number, itemizedDeductions2: number, useStandardDeduction1: boolean, useStandardDeduction2: boolean) => {
    const jointIncome = income1 + income2;
    const jointRetirement = retirement1 + retirement2;
    const standardDeduction = STANDARD_DEDUCTIONS_2025.marriedJoint;
    const jointItemized = (useStandardDeduction1 ? 0 : itemizedDeductions1) + (useStandardDeduction2 ? 0 : itemizedDeductions2);
    const jointDeduction = Math.max(standardDeduction, jointItemized);
    const jointTaxable = Math.max(0, jointIncome - jointDeduction - jointRetirement);
    const {
      tax: federalTax,
      marginalRate
    } = calculateTaxFromBrackets(jointTaxable, TAX_BRACKETS_2025.marriedJoint);
    const ssTax = calculateSocialSecurityTax(income1) + calculateSocialSecurityTax(income2);
    const medicareTax = calculateMedicareTax(income1) + calculateMedicareTax(income2);
    const stateTax = calculateStateTax(jointIncome, Number.parseFloat(inputs.stateTaxRate));
    const takeHome = jointIncome - jointRetirement - federalTax - ssTax - medicareTax - stateTax;
    return {
      jointIncome,
      jointRetirement,
      jointDeduction,
      jointTaxable,
      federalTax,
      marginalRate,
      ssTax,
      medicareTax,
      stateTax,
      takeHome
    };
  };
  const calculateMarriageTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const w1 = Number.parseFloat(inputs.spouse1.salary);
    const w2 = Number.parseFloat(inputs.spouse2.salary);
    const r1 = Number.parseFloat(inputs.spouse1.retirement);
    const r2 = Number.parseFloat(inputs.spouse2.retirement);
    const d1 = Number.parseFloat(inputs.spouse1.itemizedDeductions);
    const d2 = Number.parseFloat(inputs.spouse2.itemizedDeductions);
    // Individual
    const spouse1Result = calculateIndividualTax(w1, r1, d1, inputs.spouse1.useStandardDeduction);
    const spouse2Result = calculateIndividualTax(w2, r2, d2, inputs.spouse2.useStandardDeduction);
    // Joint
    const jointResult = calculateJointTax(w1, w2, r1, r2, d1, d2, inputs.spouse1.useStandardDeduction, inputs.spouse2.useStandardDeduction);
    // Penalty/Benefit
    const totalIndividualFederalTax = spouse1Result.federalTax + spouse2Result.federalTax;
    const penaltyOrBenefit = totalIndividualFederalTax - jointResult.federalTax;
    const penaltyPercentage = penaltyOrBenefit / jointResult.jointIncome * 100;
    setResults({
      spouse1: spouse1Result,
      spouse2: spouse2Result,
      combined: {
        income: spouse1Result.income + spouse2Result.income,
        federalTax: totalIndividualFederalTax,
        ssTax: spouse1Result.ssTax + spouse2Result.ssTax,
        medicareTax: spouse1Result.medicareTax + spouse2Result.medicareTax,
        stateTax: spouse1Result.stateTax + spouse2Result.stateTax,
        retirement: spouse1Result.retirement + spouse2Result.retirement,
        takeHome: spouse1Result.takeHome + spouse2Result.takeHome
      },
      joint: jointResult,
      penaltyOrBenefit,
      penaltyPercentage
    });
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-pink-600" />
                    <span>{contentData.marriage_tax_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900">{contentData.state_city_tax_rate_1}</Label>
                    <div className="relative">
                      <Input type="number" value={inputs.stateTaxRate} onChange={e => setInputs(i => ({
                      ...i,
                      stateTaxRate: e.target.value
                    }))} className="h-12 text-lg border-2 focus:border-pink-500" placeholder="5" />
                    </div>
                  </div>

                  <Separator />

                  {/* Spouse 1 */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-pink-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.spouse_1_income_2}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.salary_business_income_3}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse1.salary} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            salary: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.interest_dividend_income_4}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse1.interest} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            interest: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.passive_income_5}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse1.passive} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            passive: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.shortterm_capital_gains_6}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse1.shortTermGain} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            shortTermGain: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.longterm_capital_gains_7}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse1.longTermGain} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            longTermGain: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.qualified_dividends_8}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse1.qualifiedDividends} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            qualifiedDividends: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">{contentData.k_401k_ira_savings_9}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse1.retirement} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            retirement: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>
                    </div>{contentData.updated_tax_calculation_functions_10}<div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="standard1" checked={inputs.spouse1.useStandardDeduction} onCheckedChange={val => setInputs(i => ({
                        ...i,
                        spouse1: {
                          ...i.spouse1,
                          useStandardDeduction: val === true
                        }
                      }))} />
                        <Label htmlFor="standard1" className="text-base font-semibold text-gray-900">{contentData.use_standard_deduction_14600_11}</Label>
                      </div>

                      {!inputs.spouse1.useStandardDeduction && <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.itemized_deductions_12}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={inputs.spouse1.itemizedDeductions} onChange={e => setInputs(i => ({
                          ...i,
                          spouse1: {
                            ...i.spouse1,
                            itemizedDeductions: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                          </div>
                        </div>}

                      <div className="flex items-center space-x-2">
                        <Checkbox id="se1" checked={inputs.spouse1.selfEmployed} onCheckedChange={val => setInputs(i => ({
                        ...i,
                        spouse1: {
                          ...i.spouse1,
                          selfEmployed: val === true
                        }
                      }))} />
                        <Label htmlFor="se1" className="text-base font-semibold text-gray-900">{contentData.selfemployed_13}</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Spouse 2 */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-pink-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.spouse_2_income_14}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.salary_business_income_15}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse2.salary} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            salary: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.interest_dividend_income_16}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse2.interest} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            interest: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.passive_income_17}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse2.passive} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            passive: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.shortterm_capital_gains_18}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse2.shortTermGain} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            shortTermGain: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.longterm_capital_gains_19}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse2.longTermGain} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            longTermGain: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.qualified_dividends_20}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse2.qualifiedDividends} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            qualifiedDividends: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">{contentData.k_401k_ira_savings_21}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={inputs.spouse2.retirement} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            retirement: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="standard2" checked={inputs.spouse2.useStandardDeduction} onCheckedChange={val => setInputs(i => ({
                        ...i,
                        spouse2: {
                          ...i.spouse2,
                          useStandardDeduction: val === true
                        }
                      }))} />
                        <Label htmlFor="standard2" className="text-base font-semibold text-gray-900">{contentData.use_standard_deduction_14600_22}</Label>
                      </div>

                      {!inputs.spouse2.useStandardDeduction && <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.itemized_deductions_23}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={inputs.spouse2.itemizedDeductions} onChange={e => setInputs(i => ({
                          ...i,
                          spouse2: {
                            ...i.spouse2,
                            itemizedDeductions: e.target.value
                          }
                        }))} className="pl-10 h-12 text-lg border-2 focus:border-pink-500" />
                          </div>
                        </div>}

                      <div className="flex items-center space-x-2">
                        <Checkbox id="se2" checked={inputs.spouse2.selfEmployed} onCheckedChange={val => setInputs(i => ({
                        ...i,
                        spouse2: {
                          ...i.spouse2,
                          selfEmployed: val === true
                        }
                      }))} />
                        <Label htmlFor="se2" className="text-base font-semibold text-gray-900">{contentData.selfemployed_24}</Label>
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateMarriageTax} className="w-full h-14 text-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl font-bold mt-12">{contentData.calculate_tax_impact_25}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.marriage_tax_results_26}</CardTitle>
                  <CardDescription className="text-base">{contentData.tax_penalty_or_benefit_analysis_27}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Marriage Penalty/Benefit */}
                      <div className={`text-center p-6 rounded-2xl border-2 ${results.penaltyOrBenefit >= 0 ? "bg-gradient-to-r from-green-100 to-green-200 border-green-300" : "bg-gradient-to-r from-red-100 to-red-200 border-red-300"}`}>
                        <p className={`text-lg mb-2 font-semibold ${results.penaltyOrBenefit >= 0 ? "text-green-800" : "text-red-800"}`}>
                          {results.penaltyOrBenefit >= 0 ? "Marriage Tax Benefit:" : "Marriage Tax Penalty:"}
                        </p>
                        <p className={`text-4xl font-bold mb-2 ${results.penaltyOrBenefit >= 0 ? "text-green-700" : "text-red-700"}`}>
                          $
                          {Math.abs(results.penaltyOrBenefit).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                        </p>
                        <p className={`text-lg ${results.penaltyOrBenefit >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {Math.abs(results.penaltyPercentage).toFixed(2)}{contentData.of_total_income_28}</p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.detailed_tax_breakdown_29}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">{contentData.category_30}</th>
                                <th className="text-right py-2">{contentData.spouse_1_31}</th>
                                <th className="text-right py-2">{contentData.spouse_2_32}</th>
                                <th className="text-right py-2">{contentData.combined_not_married_33}</th>
                                <th className="text-right py-2">{contentData.joint_married_34}</th>
                              </tr>
                            </thead>
                            <tbody className="space-y-1">
                              <tr className="border-b">
                                <td className="py-2 font-medium">{contentData.income_35}</td>
                                <td className="text-right py-2">${results.spouse1.income.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.income.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.income.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.jointIncome.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">{contentData.federal_tax_36}</td>
                                <td className="text-right py-2">${results.spouse1.federalTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.federalTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.federalTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.federalTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">{contentData.marginal_rate_37}</td>
                                <td className="text-right py-2">{(results.spouse1.marginalRate * 100).toFixed(0)}%</td>
                                <td className="text-right py-2">{(results.spouse2.marginalRate * 100).toFixed(0)}%</td>
                                <td className="text-right py-2">-</td>
                                <td className="text-right py-2">{(results.joint.marginalRate * 100).toFixed(0)}%</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">{contentData.social_security_tax_38}</td>
                                <td className="text-right py-2">${results.spouse1.ssTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.ssTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.ssTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.ssTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">{contentData.medicare_tax_39}</td>
                                <td className="text-right py-2">${results.spouse1.medicareTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.medicareTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.medicareTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.medicareTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">{contentData.statecity_tax_40}</td>
                                <td className="text-right py-2">${results.spouse1.stateTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.stateTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.stateTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.stateTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">{contentData.k_401k_ira_41}</td>
                                <td className="text-right py-2">${results.spouse1.retirement.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.retirement.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.retirement.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.jointRetirement.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="py-2 font-bold">{contentData.final_take_home_42}</td>
                                <td className="text-right py-2 font-bold">${results.spouse1.takeHome.toLocaleString("en-US")}</td>
                                <td className="text-right py-2 font-bold">${results.spouse2.takeHome.toLocaleString("en-US")}</td>
                                <td className="text-right py-2 font-bold">${results.combined.takeHome.toLocaleString("en-US")}</td>
                                <td className="text-right py-2 font-bold">${results.joint.takeHome.toLocaleString("en-US")}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_both_spouses_information_to_see_your_marriag_43}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators calculators={[{
              calculatorName: "House Affordability Calculator",
              calculatorHref: "/financial/house-affordability-calculator",
              calculatorDescription: "Calculate much house you can afford based on your income, debts, and down payment."
            }, {
              calculatorName: "Loan Calculator",
              calculatorHref: "/financial/loan-calculator",
              calculatorDescription: "Calculate payments, interest rates, and loan terms for personal and auto loans."
            }, {
              calculatorName: "Salary Calculator",
              calculatorHref: "/financial/salary-calculator",
              calculatorDescription: "Convert between different pay periods and calculate your salary breakdown across various timeframes."
            }]} color="pink" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_calculation_details_44}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_individual_income_calculation_45}</h3>
                      <p className="text-gray-700 mb-2">{contentData.total_income_wages_interest_passive_stcg_ltcg_qual_46}</p>
                      <p className="text-gray-700">{contentData.taxable_income_total_income_deductions_selfemploym_47}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_joint_income_calculation_48}</h3>
                      <p className="text-gray-700 mb-2">{contentData.joint_income_spouse_1_total_income_spouse_2_total__49}</p>
                      <p className="text-gray-700">{contentData.joint_taxable_joint_income_joint_deductions_combin_50}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_marriage_penaltybenefit_51}</h3>
                      <p className="text-gray-700 mb-2">{contentData.penaltybenefit_individual_tax_1_individual_tax_2_j_52}</p>
                      <p className="text-gray-700">{contentData.positive_result_marriage_benefit_negative_result_m_53}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_percentage_impact_54}</h3>
                      <p className="text-gray-700">{contentData.marriage_impact_penalty_or_benefit_joint_income_10_55}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="marriage-calculator"
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