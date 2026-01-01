"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Receipt, DollarSign, Users, FileText, HelpCircle } from "lucide-react";
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

// Tax brackets for 2024 and 2025
const TAX_BRACKETS_2024 = {
  single: [{
    min: 0,
    max: 11000,
    rate: 0.1
  }, {
    min: 11000,
    max: 44725,
    rate: 0.12
  }, {
    min: 44725,
    max: 95375,
    rate: 0.22
  }, {
    min: 95375,
    max: 182050,
    rate: 0.24
  }, {
    min: 182050,
    max: 231250,
    rate: 0.32
  }, {
    min: 231250,
    max: 578125,
    rate: 0.35
  }, {
    min: 578125,
    max: Number.POSITIVE_INFINITY,
    rate: 0.37
  }],
  marriedJoint: [{
    min: 0,
    max: 22000,
    rate: 0.1
  }, {
    min: 22000,
    max: 89450,
    rate: 0.12
  }, {
    min: 89450,
    max: 190750,
    rate: 0.22
  }, {
    min: 190750,
    max: 364200,
    rate: 0.24
  }, {
    min: 364200,
    max: 462500,
    rate: 0.32
  }, {
    min: 462500,
    max: 693750,
    rate: 0.35
  }, {
    min: 693750,
    max: Number.POSITIVE_INFINITY,
    rate: 0.37
  }]
};
const STANDARD_DEDUCTIONS_2024 = {
  single: 14600,
  marriedJoint: 29200,
  marriedSeparate: 14600,
  headOfHousehold: 21900,
  qualifiedWidow: 29200
};
export default function IncomeTaxCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('income-tax-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('income-tax-calculator', language, "calculator-guide");

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
    "tax_calculator_0": "",
    "basic_information_1": "",
    "filing_status_2": "",
    "single_3": "",
    "married_filing_jointly_4": "",
    "married_filing_separately_5": "",
    "head_of_household_6": "",
    "qualified_widower_7": "",
    "tax_year_8": "",
    "k_2024_9": "",
    "k_2025_10": "",
    "young_dependents_016_11": "",
    "other_dependents_17_12": "",
    "person_1_income_13": "",
    "wages_tips_w2_box_1_14": "",
    "federal_tax_withheld_w2_box_2_15": "",
    "state_tax_withheld_w2_box_17_16": "",
    "businessselfemployment_income_17": "",
    "person_2_income_18": "",
    "wages_tips_w2_box_1_19": "",
    "federal_tax_withheld_w2_box_2_20": "",
    "other_income_21": "",
    "interest_income_1099int_22": "",
    "ordinary_dividends_1099div_23": "",
    "qualified_dividends_1099div_24": "",
    "longterm_capital_gains_25": "",
    "other_income_26": "",
    "deductions_credits_27": "",
    "ira_contributions_28": "",
    "real_estate_tax_29": "",
    "mortgage_interest_30": "",
    "charitable_donations_31": "",
    "calculate_32": "",
    "tax_results_33": "",
    "your_complete_tax_breakdown_34": "",
    "adjusted_gross_income_35": "",
    "taxable_income_36": "",
    "federal_tax_owed_37": "",
    "selfemployment_tax_38": "",
    "total_tax_liability_39": "",
    "tax_rates_40": "",
    "effective_tax_rate_41": "",
    "marginal_tax_rate_42": "",
    "deduction_used_43": "",
    "standard_44": "",
    "itemized_45": "",
    "enter_your_tax_information_to_see_your_results_46": "",
    "formulas_calculation_steps_47": "",
    "k_1_gross_income_48": "",
    "gross_wages_business_income_interest_dividends_cap_49": "",
    "k_2_adjusted_gross_income_agi_50": "",
    "agi_gross_income_abovetheline_deductions_ira_stude_51": "",
    "k_3_taxable_income_52": "",
    "taxable_income_agi_maxstandard_deduction_itemized__53": "",
    "k_4_federal_tax_54": "",
    "applied_using_progressive_tax_brackets_based_on_fi_55": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Basic Information
  const [filingStatus, setFilingStatus] = useState("single");
  const [youngDependents, setYoungDependents] = useState("0");
  const [otherDependents, setOtherDependents] = useState("0");
  const [taxYear, setTaxYear] = useState("2024");

  // Person 1 Income
  const [wages1, setWages1] = useState("75000");
  const [federalWithheld1, setFederalWithheld1] = useState("8500");
  const [stateWithheld1, setStateWithheld1] = useState("2500");
  const [localWithheld1, setLocalWithheld1] = useState("0");
  const [businessIncome1, setBusinessIncome1] = useState("0");
  const [estimatedTaxPaid1, setEstimatedTaxPaid1] = useState("0");
  const [medicareWages1, setMedicareWages1] = useState("75000");

  // Person 2 Income (for married filing jointly)
  const [wages2, setWages2] = useState("0");
  const [federalWithheld2, setFederalWithheld2] = useState("0");
  const [stateWithheld2, setStateWithheld2] = useState("0");
  const [localWithheld2, setLocalWithheld2] = useState("0");
  const [businessIncome2, setBusinessIncome2] = useState("0");
  const [estimatedTaxPaid2, setEstimatedTaxPaid2] = useState("0");
  const [medicareWages2, setMedicareWages2] = useState("0");

  // Other Income
  const [interestIncome, setInterestIncome] = useState("0");
  const [ordinaryDividends, setOrdinaryDividends] = useState("0");
  const [qualifiedDividends, setQualifiedDividends] = useState("0");
  const [passiveIncome, setPassiveIncome] = useState("0");
  const [shortTermCapitalGain, setShortTermCapitalGain] = useState("0");
  const [longTermCapitalGain, setLongTermCapitalGain] = useState("0");
  const [otherIncome, setOtherIncome] = useState("0");

  // Deductions & Credits
  const [iraContributions, setIraContributions] = useState("0");
  const [realEstateTax, setRealEstateTax] = useState("0");
  const [mortgageInterest, setMortgageInterest] = useState("0");
  const [charitableDonations, setCharitableDonations] = useState("0");
  const [studentLoanInterest, setStudentLoanInterest] = useState("0");
  const [childCareExpense, setChildCareExpense] = useState("0");
  const [collegeExpense, setCollegeExpense] = useState("0");
  const [otherDeductibles, setOtherDeductibles] = useState("0");
  const [results, setResults] = useState<{
    grossIncome: number;
    adjustedGrossIncome: number;
    taxableIncome: number;
    federalTax: number;
    selfEmploymentTax: number;
    totalTaxLiability: number;
    refundOrOwed: number;
    effectiveTaxRate: number;
    marginalTaxRate: number;
    standardDeduction: number;
    itemizedDeduction: number;
    usedDeduction: number;
  } | null>(null);
  const calculateTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    // Step 1: Total Income (Gross Income)
    const totalWages = Number.parseFloat(wages1) + Number.parseFloat(wages2);
    const totalBusinessIncome = Number.parseFloat(businessIncome1) + Number.parseFloat(businessIncome2);
    const totalInterest = Number.parseFloat(interestIncome);
    const totalOrdinaryDividends = Number.parseFloat(ordinaryDividends);
    const totalQualifiedDividends = Number.parseFloat(qualifiedDividends);
    const totalShortTermCapitalGains = Number.parseFloat(shortTermCapitalGain);
    const totalLongTermCapitalGains = Number.parseFloat(longTermCapitalGain);
    const totalOtherIncome = Number.parseFloat(passiveIncome) + Number.parseFloat(otherIncome);
    const grossIncome = totalWages + totalBusinessIncome + totalInterest + totalOrdinaryDividends + totalQualifiedDividends + totalShortTermCapitalGains + totalLongTermCapitalGains + totalOtherIncome;

    // Step 2: Self-Employment Tax Calculation
    const seIncome = 0.9235 * totalBusinessIncome;
    const ssTaxableWageBase = 168600; // 2024 SS wage base
    const seTax = totalBusinessIncome > 0 ? Math.min(seIncome, ssTaxableWageBase) * 0.124 + seIncome * 0.029 : 0;
    const seDeduction = seTax / 2;

    // Step 3: Adjusted Gross Income (AGI)
    const iraContrib = Number.parseFloat(iraContributions);
    const studentLoanInt = Number.parseFloat(studentLoanInterest);
    const otherAdjustments = 0; // Can be expanded for other adjustments

    const adjustedGrossIncome = grossIncome - (iraContrib + studentLoanInt + otherAdjustments + seDeduction);

    // Step 4: Deductions (Standard vs Itemized)
    const standardDeduction = STANDARD_DEDUCTIONS_2024[filingStatus as keyof typeof STANDARD_DEDUCTIONS_2024] || 14600;
    const itemizedDeduction = Number.parseFloat(realEstateTax) + Number.parseFloat(mortgageInterest) + Number.parseFloat(charitableDonations) + Number.parseFloat(otherDeductibles);
    const usedDeduction = Math.max(standardDeduction, itemizedDeduction);

    // Step 5: Taxable Income
    const taxableIncome = Math.max(0, adjustedGrossIncome - usedDeduction);

    // Step 6: Split Ordinary vs Capital Gains Income
    const capitalGainsTaxable = totalQualifiedDividends + totalLongTermCapitalGains;
    const ordinaryTaxable = Math.max(0, taxableIncome - capitalGainsTaxable);

    // Step 7: Regular Tax on Ordinary Income
    const brackets = filingStatus === "marriedJoint" ? TAX_BRACKETS_2024.marriedJoint : TAX_BRACKETS_2024.single;
    let ordinaryTax = 0;
    let remainingOrdinary = ordinaryTaxable;
    for (const bracket of brackets) {
      if (remainingOrdinary <= 0) break;
      const taxableAtBracket = Math.min(remainingOrdinary, bracket.max - bracket.min);
      ordinaryTax += taxableAtBracket * bracket.rate;
      remainingOrdinary -= taxableAtBracket;
    }

    // Step 8: Capital Gains Tax (0%, 15%, 20% tiers)
    let capitalGainsTax = 0;
    if (capitalGainsTaxable > 0) {
      // Capital gains thresholds for 2024
      const cgThresholds = filingStatus === "marriedJoint" ? {
        tier1: 94050,
        tier2: 583750
      } : {
        tier1: 47025,
        tier2: 518900
      };
      const ordinaryPlusCG = ordinaryTaxable + capitalGainsTaxable;

      // Calculate at each CG rate
      const cgAt0Percent = Math.max(0, Math.min(capitalGainsTaxable, cgThresholds.tier1 - ordinaryTaxable));
      const cgAt15Percent = Math.max(0, Math.min(capitalGainsTaxable - cgAt0Percent, cgThresholds.tier2 - Math.max(ordinaryTaxable, cgThresholds.tier1)));
      const cgAt20Percent = Math.max(0, capitalGainsTaxable - cgAt0Percent - cgAt15Percent);
      capitalGainsTax = cgAt0Percent * 0 + cgAt15Percent * 0.15 + cgAt20Percent * 0.2;
    }

    // Step 9: Total Federal Tax
    const federalTax = ordinaryTax + capitalGainsTax;

    // Step 10: Net Investment Income Tax (NIIT) - 3.8% on investment income
    const niitThreshold = filingStatus === "marriedJoint" ? 250000 : 200000;
    const niit = adjustedGrossIncome > niitThreshold ? Math.min(capitalGainsTaxable + totalInterest, adjustedGrossIncome - niitThreshold) * 0.038 : 0;

    // Step 11: Total Tax Liability Before Credits
    const totalTaxLiability = federalTax + seTax + niit;

    // Step 12: Apply Credits (simplified - can be expanded)
    const youngDeps = Number.parseFloat(youngDependents);
    const childTaxCredit = youngDeps * 2000; // Simplified CTC calculation
    const taxAfterCredits = totalTaxLiability - childTaxCredit;

    // Step 13: Refund or Amount Owed
    const totalWithheld = Number.parseFloat(federalWithheld1) + Number.parseFloat(federalWithheld2) + Number.parseFloat(estimatedTaxPaid1) + Number.parseFloat(estimatedTaxPaid2);
    const refundOrOwed = totalWithheld - Math.max(taxAfterCredits, 0) + Math.max(-taxAfterCredits, 0);

    // Calculate rates
    const effectiveTaxRate = grossIncome > 0 ? Math.max(taxAfterCredits, 0) / grossIncome * 100 : 0;
    const foundBracket = brackets.find(bracket => ordinaryTaxable > bracket.min && ordinaryTaxable <= bracket.max);
    const marginalTaxRate = foundBracket ? foundBracket.rate * 100 : 0;
    setResults({
      grossIncome,
      adjustedGrossIncome,
      taxableIncome,
      federalTax,
      selfEmploymentTax: seTax,
      totalTaxLiability: Math.max(taxAfterCredits, 0),
      refundOrOwed,
      effectiveTaxRate,
      marginalTaxRate,
      standardDeduction,
      itemizedDeduction,
      usedDeduction
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
                    <span>{contentData.tax_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.basic_information_1}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.filing_status_2}</Label>
                        <Select value={filingStatus} onValueChange={setFilingStatus}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">{contentData.single_3}</SelectItem>
                            <SelectItem value="marriedJoint">{contentData.married_filing_jointly_4}</SelectItem>
                            <SelectItem value="marriedSeparate">{contentData.married_filing_separately_5}</SelectItem>
                            <SelectItem value="headOfHousehold">{contentData.head_of_household_6}</SelectItem>
                            <SelectItem value="qualifiedWidow">{contentData.qualified_widower_7}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.tax_year_8}</Label>
                        <Select value={taxYear} onValueChange={setTaxYear}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">{contentData.k_2024_9}</SelectItem>
                            <SelectItem value="2025">{contentData.k_2025_10}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.young_dependents_016_11}</Label>
                        <Input type="number" value={youngDependents} onChange={e => setYoungDependents(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.other_dependents_17_12}</Label>
                        <Input type="number" value={otherDependents} onChange={e => setOtherDependents(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Person 1 Income */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.person_1_income_13}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.wages_tips_w2_box_1_14}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={wages1} onChange={e => setWages1(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.federal_tax_withheld_w2_box_2_15}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={federalWithheld1} onChange={e => setFederalWithheld1(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.state_tax_withheld_w2_box_17_16}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={stateWithheld1} onChange={e => setStateWithheld1(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.businessselfemployment_income_17}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={businessIncome1} onChange={e => setBusinessIncome1(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {filingStatus === "marriedJoint" && <>
                      <Separator />
                      {/* Person 2 Income */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">{contentData.person_2_income_18}</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">{contentData.wages_tips_w2_box_1_19}</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input type="number" value={wages2} onChange={e => setWages2(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">{contentData.federal_tax_withheld_w2_box_2_20}</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input type="number" value={federalWithheld2} onChange={e => setFederalWithheld2(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>}

                  <Separator />

                  {/* Other Income */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.other_income_21}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.interest_income_1099int_22}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={interestIncome} onChange={e => setInterestIncome(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.ordinary_dividends_1099div_23}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={ordinaryDividends} onChange={e => setOrdinaryDividends(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.qualified_dividends_1099div_24}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={qualifiedDividends} onChange={e => setQualifiedDividends(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.longterm_capital_gains_25}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={longTermCapitalGain} onChange={e => setLongTermCapitalGain(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.other_income_26}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={otherIncome} onChange={e => setOtherIncome(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Deductions & Credits */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Receipt className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.deductions_credits_27}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.ira_contributions_28}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={iraContributions} onChange={e => setIraContributions(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.real_estate_tax_29}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={realEstateTax} onChange={e => setRealEstateTax(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.mortgage_interest_30}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={mortgageInterest} onChange={e => setMortgageInterest(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.charitable_donations_31}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={charitableDonations} onChange={e => setCharitableDonations(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateTax} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12">{contentData.calculate_32}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.tax_results_33}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_complete_tax_breakdown_34}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Refund or Owe */}
                      <div className={`text-center p-6 rounded-2xl border-2 ${results.refundOrOwed >= 0 ? "bg-gradient-to-r from-green-100 to-green-200 border-green-300" : "bg-gradient-to-r from-red-100 to-red-200 border-red-300"}`}>
                        <p className={`text-lg mb-2 font-semibold ${results.refundOrOwed >= 0 ? "text-green-800" : "text-red-800"}`}>
                          {results.refundOrOwed >= 0 ? "Expected Refund:" : "Amount You Owe:"}
                        </p>
                        <p className={`text-4xl font-bold mb-2 ${results.refundOrOwed >= 0 ? "text-green-700" : "text-red-700"}`}>
                          $
                          {Math.abs(results.refundOrOwed).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                      </div>

                      {/* Tax Summary */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">{contentData.adjusted_gross_income_35}</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.adjustedGrossIncome.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">{contentData.taxable_income_36}</span>
                            <span className="font-bold text-purple-600">
                              $
                              {results.taxableIncome.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">{contentData.federal_tax_owed_37}</span>
                            <span className="font-bold text-orange-600">
                              $
                              {results.federalTax.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                          {results.selfEmploymentTax > 0 && <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <span className="font-medium text-gray-700">{contentData.selfemployment_tax_38}</span>
                              <span className="font-bold text-yellow-600">
                                $
                                {results.selfEmploymentTax.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                              </span>
                            </div>}
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">{contentData.total_tax_liability_39}</span>
                            <span className="font-bold text-gray-900">
                              $
                              {results.totalTaxLiability.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tax Rates */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.tax_rates_40}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <span className="font-medium text-gray-700">{contentData.effective_tax_rate_41}</span>
                            <span className="font-bold text-indigo-600">{results.effectiveTaxRate.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                            <span className="font-medium text-gray-700">{contentData.marginal_tax_rate_42}</span>
                            <span className="font-bold text-pink-600">{results.marginalTaxRate.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Deduction Info */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>{contentData.deduction_used_43}</strong> ${results.usedDeduction.toLocaleString()}(
                          {results.usedDeduction === results.standardDeduction ? "Standard" : "Itemized"})
                        </p>
                        <p className="text-xs text-blue-600">{contentData.standard_44}{results.standardDeduction.toLocaleString()}{contentData.itemized_45}{results.itemizedDeduction.toLocaleString()}
                        </p>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_tax_information_to_see_your_results_46}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators calculators={[{
              calculatorName: "401(k) Calculator Suite",
              calculatorHref: "/financial/401k-calculator",
              calculatorDescription: "Plan your 401(k) contributions, employer matching, and retirement savings strategy."
            }, {
              calculatorName: "Sales Tax Calculator",
              calculatorHref: "/financial/sales-tax-calculator",
              calculatorDescription: "Calculate tax, final price, or determine tax rate with our comprehensive sales tax calculator."
            }, {
              calculatorName: "Currency Calculator",
              calculatorHref: "/financial/currency-calculator",
              calculatorDescription: "Convert between different currencies with real-time exchange rates and historical data."
            }]} color="green" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_calculation_steps_47}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_gross_income_48}</h3>
                      <p className="text-gray-700">{contentData.gross_wages_business_income_interest_dividends_cap_49}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_adjusted_gross_income_agi_50}</h3>
                      <p className="text-gray-700">{contentData.agi_gross_income_abovetheline_deductions_ira_stude_51}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_taxable_income_52}</h3>
                      <p className="text-gray-700">{contentData.taxable_income_agi_maxstandard_deduction_itemized__53}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_federal_tax_54}</h3>
                      <p className="text-gray-700">{contentData.applied_using_progressive_tax_brackets_based_on_fi_55}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="income-tax-calculator"
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