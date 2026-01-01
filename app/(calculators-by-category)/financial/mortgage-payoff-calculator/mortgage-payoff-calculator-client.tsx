"use client";

import type React from "react";
import { useState, useRef } from "react";

import { Calculator, DollarSign, Home, TrendingDown, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
;
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
interface MortgageResult {
  standardPayoffMonths: number;
  standardTotalInterest: number;
  standardTotalPayments: number;
  extraPayoffMonths: number;
  extraTotalInterest: number;
  extraTotalPayments: number;
  interestSavings: number;
  timeSavings: number;
  monthlyPayment: number;
}

interface MortgagePayoffCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function MortgagePayoffCalculatorClient({ content, guideContent }: MortgagePayoffCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const [originalAmount, setOriginalAmount] = useState("");
  const [originalTerm, setOriginalTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [calculationMode, setCalculationMode] = useState("known");
  const [remainingYears, setRemainingYears] = useState("");
  const [remainingMonths, setRemainingMonths] = useState("");
  const [unpaidPrincipal, setUnpaidPrincipal] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [oneTimeExtra, setOneTimeExtra] = useState("");
  const [monthlyExtra, setMonthlyExtra] = useState("");
  const [annualExtra, setAnnualExtra] = useState("");
  const [biweekly, setBiweekly] = useState(false);
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (!originalAmount || Number.parseFloat(originalAmount) <= 0) {
      newErrors.originalAmount = "Please enter a valid original loan amount";
    }
    if (!originalTerm || Number.parseFloat(originalTerm) <= 0) {
      newErrors.originalTerm = "Please enter a valid original loan term";
    }
    if (!interestRate || Number.parseFloat(interestRate) < 0) {
      newErrors.interestRate = "Please enter a valid interest rate";
    }
    if (calculationMode === "known") {
      if (!remainingYears || Number.parseFloat(remainingYears) < 0) {
        newErrors.remainingYears = "Please enter valid remaining years";
      }
    } else {
      if (!unpaidPrincipal || Number.parseFloat(unpaidPrincipal) <= 0) {
        newErrors.unpaidPrincipal = "Please enter a valid unpaid principal";
      }
      if (!monthlyPayment || Number.parseFloat(monthlyPayment) <= 0) {
        newErrors.monthlyPayment = "Please enter a valid monthly payment";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculatePayment = (principal: number, monthlyRate: number, months: number): number => {
    if (monthlyRate === 0) return principal / months;
    return monthlyRate * principal / (1 - Math.pow(1 + monthlyRate, -months));
  };
  const calculateRemainingBalance = (originalPrincipal: number, monthlyRate: number, originalPayment: number, elapsedMonths: number): number => {
    // Bk = P(1+r)^k - M * ((1+r)^k - 1) / r
    const compoundFactor = Math.pow(1 + monthlyRate, elapsedMonths);
    return originalPrincipal * compoundFactor - originalPayment * ((compoundFactor - 1) / monthlyRate);
  };
  const calculatePayoffMonths = (remainingBalance: number, monthlyRate: number, newPayment: number): number => {
    // N' = ln(M' / (M' - r * Bk)) / ln(1 + r)
    if (monthlyRate === 0) return remainingBalance / newPayment;
    const numerator = newPayment / (newPayment - monthlyRate * remainingBalance);
    if (numerator <= 1) return 0; // Payment too small to cover interest

    return Math.log(numerator) / Math.log(1 + monthlyRate);
  };
  const calculateFinalPayment = (remainingBalance: number, monthlyRate: number, newPayment: number, fullPayments: number): number => {
    // Balance after n_full payments: Bk(1+r)^n_full - M' * ((1+r)^n_full - 1) / r
    const compoundFactor = Math.pow(1 + monthlyRate, fullPayments);
    const balanceAfterFullPayments = remainingBalance * compoundFactor - newPayment * ((compoundFactor - 1) / monthlyRate);

    // Final payment: L = B_n_full * (1 + r)
    return Math.max(0, balanceAfterFullPayments * (1 + monthlyRate));
  };
  const calculateExactAmortization = (remainingBalance: number, monthlyRate: number, standardPayment: number, extraMonthly = 0, extraAnnual = 0, oneTime = 0) => {
    // Apply one-time payment immediately
    const adjustedBalance = Math.max(0, remainingBalance - oneTime);
    if (adjustedBalance === 0) {
      return {
        months: 0,
        totalInterest: 0,
        totalPayments: oneTime,
        finalPayment: 0
      };
    }
    const newPayment = standardPayment + extraMonthly;

    // Calculate payoff months using closed-form formula
    const exactMonths = calculatePayoffMonths(adjustedBalance, monthlyRate, newPayment);
    const fullPayments = Math.floor(exactMonths);

    // Calculate payment
    const finalPayment = calculateFinalPayment(adjustedBalance, monthlyRate, newPayment, fullPayments);

    // Calculate
    let totalPayments = oneTime + fullPayments * newPayment + finalPayment;
    let totalInterest = 0;

    // Add annual extra payments
    if (extraAnnual > 0) {
      const annualPayments = Math.floor(exactMonths / 12);
      totalPayments += annualPayments * extraAnnual;
    }

    // Calculate interest paid
    totalInterest = totalPayments - remainingBalance;
    return {
      months: exactMonths,
      totalInterest: Math.max(0, totalInterest),
      totalPayments,
      finalPayment
    };
  };
  const calculateMortgagePayoff = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    const principal = Number.parseFloat(originalAmount);
    const annualRate = Number.parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const originalTermMonths = Number.parseFloat(originalTerm) * 12;
    let remainingBalance: number;
    let standardMonthlyPayment: number;
    let remainingTermMonths: number;
    if (calculationMode === "known") {
      remainingTermMonths = Number.parseFloat(remainingYears) * 12 + (Number.parseFloat(remainingMonths) || 0);
      const elapsedMonths = originalTermMonths - remainingTermMonths;
      const originalPayment = calculatePayment(principal, monthlyRate, originalTermMonths);
      remainingBalance = calculateRemainingBalance(principal, monthlyRate, originalPayment, elapsedMonths);
      standardMonthlyPayment = calculatePayment(remainingBalance, monthlyRate, remainingTermMonths);
    } else {
      remainingBalance = Number.parseFloat(unpaidPrincipal);
      standardMonthlyPayment = Number.parseFloat(monthlyPayment);

      // Calculate term using exact formula
      remainingTermMonths = calculatePayoffMonths(remainingBalance, monthlyRate, standardMonthlyPayment);
    }
    const standard = calculateExactAmortization(remainingBalance, monthlyRate, standardMonthlyPayment);
    const extraMonthlyAmount = Number.parseFloat(monthlyExtra) || 0;
    const extraAnnualAmount = Number.parseFloat(annualExtra) || 0;
    const oneTimeAmount = Number.parseFloat(oneTimeExtra) || 0;

    // Adjust for biweekly payments (26 payments = 13 months worth per year)
    const biweeklyExtra = biweekly ? standardMonthlyPayment / 12 : 0;
    const withExtra = calculateExactAmortization(remainingBalance, monthlyRate, standardMonthlyPayment, extraMonthlyAmount + biweeklyExtra, extraAnnualAmount, oneTimeAmount);
    const mortgageResult: MortgageResult = {
      standardPayoffMonths: standard.months,
      standardTotalInterest: standard.totalInterest,
      standardTotalPayments: standard.totalPayments,
      extraPayoffMonths: withExtra.months,
      extraTotalInterest: withExtra.totalInterest,
      extraTotalPayments: withExtra.totalPayments,
      interestSavings: standard.totalInterest - withExtra.totalInterest,
      timeSavings: standard.months - withExtra.months,
      monthlyPayment: standardMonthlyPayment
    };
    setResult(mortgageResult);
    setShowResult(true);
  };
  const resetCalculator = () => {
    setOriginalAmount("");
    setOriginalTerm("");
    setInterestRate("");
    setCalculationMode("known");
    setRemainingYears("");
    setRemainingMonths("");
    setUnpaidPrincipal("");
    setMonthlyPayment("");
    setOneTimeExtra("");
    setMonthlyExtra("");
    setAnnualExtra("");
    setBiweekly(false);
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatTime = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  };
  const handleBiweeklyChange = (checked: boolean | "indeterminate") => {
    setBiweekly(checked === true);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Home className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <h2 className="text-gray-900">{contentData.mortgage_payoff_calculator_0}</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />{contentData.basic_loan_information_1}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                        <Label htmlFor="originalAmount" className="flex items-center gap-2">{contentData.original_loan_amount_2}<div className="group relative">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.the_original_amount_you_borrowed_3}</div>
                          </div>
                        </Label>
                        <Input id="originalAmount" type="number" placeholder="300000" value={originalAmount} onChange={e => setOriginalAmount(e.target.value)} className={errors.originalAmount ? "border-red-500" : ""} />
                        {errors.originalAmount && <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" />
                            {errors.originalAmount}
                          </p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="originalTerm" className="flex items-center gap-2">{contentData.original_term_years_4}<div className="group relative">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.original_loan_term_in_years_5}</div>
                          </div>
                        </Label>
                        <Input id="originalTerm" type="number" placeholder="30" value={originalTerm} onChange={e => setOriginalTerm(e.target.value)} className={errors.originalTerm ? "border-red-500" : ""} />
                        {errors.originalTerm && <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" />
                            {errors.originalTerm}
                          </p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interestRate" className="flex items-center gap-2">{contentData.annual_interest_rate_6}<div className="group relative">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.your_mortgage_interest_rate_7}</div>
                          </div>
                        </Label>
                        <Input id="interestRate" type="number" step="0.01" placeholder="6.5" value={interestRate} onChange={e => setInterestRate(e.target.value)} className={errors.interestRate ? "border-red-500" : ""} />
                        {errors.interestRate && <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" />
                            {errors.interestRate}
                          </p>}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">{contentData.calculation_method_8}</h3>
                    <RadioGroup value={calculationMode} onValueChange={setCalculationMode}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="known" id="known" />
                        <Label htmlFor="known">{contentData.i_know_the_remaining_term_9}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unknown" id="unknown" />
                        <Label htmlFor="unknown">{contentData.i_know_the_unpaid_balance_and_monthly_payment_10}</Label>
                      </div>
                    </RadioGroup>

                    {calculationMode === "known" ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="remainingYears">{contentData.remaining_years_11}</Label>
                          <Input id="remainingYears" type="number" placeholder="25" value={remainingYears} onChange={e => setRemainingYears(e.target.value)} className={errors.remainingYears ? "border-red-500" : ""} />
                          {errors.remainingYears && <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4" />
                              {errors.remainingYears}
                            </p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="remainingMonths">{contentData.remaining_months_optional_12}</Label>
                          <Input id="remainingMonths" type="number" placeholder="6" value={remainingMonths} onChange={e => setRemainingMonths(e.target.value)} />
                        </div>
                      </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="unpaidPrincipal">{contentData.unpaid_principal_13}</Label>
                          <Input id="unpaidPrincipal" type="number" placeholder="250000" value={unpaidPrincipal} onChange={e => setUnpaidPrincipal(e.target.value)} className={errors.unpaidPrincipal ? "border-red-500" : ""} />
                          {errors.unpaidPrincipal && <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4" />
                              {errors.unpaidPrincipal}
                            </p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="monthlyPayment">{contentData.monthly_payment_14}</Label>
                          <Input id="monthlyPayment" type="number" placeholder="1500" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} className={errors.monthlyPayment ? "border-red-500" : ""} />
                          {errors.monthlyPayment && <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4" />
                              {errors.monthlyPayment}
                            </p>}
                        </div>
                      </div>}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-green-600" />{contentData.extra_payment_options_15}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                        <Label htmlFor="oneTimeExtra">{contentData.onetime_extra_payment_16}</Label>
                        <Input id="oneTimeExtra" type="number" placeholder="5000" value={oneTimeExtra} onChange={e => setOneTimeExtra(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="monthlyExtra">{contentData.monthly_extra_payment_17}</Label>
                        <Input id="monthlyExtra" type="number" placeholder="200" value={monthlyExtra} onChange={e => setMonthlyExtra(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="annualExtra">{contentData.annual_extra_payment_18}</Label>
                        <Input id="annualExtra" type="number" placeholder="2000" value={annualExtra} onChange={e => setAnnualExtra(e.target.value)} />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox id="biweekly" checked={biweekly} onCheckedChange={handleBiweeklyChange} className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      <Label htmlFor="biweekly" className="flex items-center gap-2 text-sm font-medium">{contentData.switch_to_biweekly_payments_19}<div className="group relative">
                          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help hover:text-blue-500 transition-colors" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none shadow-lg">{contentData.pay_half_your_monthly_payment_every_2_weeks_26_pay_20}</div>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button onClick={calculateMortgagePayoff} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold">
                      <Calculator className="mr-2 h-5 w-5" />{contentData.calculate_21}</Button>
                  </div>
                </CardContent>
              </Card>

              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl"><h2>{contentData.payoff_analysis_22}</h2></CardTitle>
                  <CardDescription className="text-base">{contentData.your_mortgage_payoff_breakdown_23}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {showResult && result ? <div className="space-y-6">
                      {/* Interest Savings */}
                      <div className="text-center p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl border-2 border-green-300">
                        <p className="text-lg text-green-800 mb-2 font-semibold">{contentData.interest_savings_24}</p>
                        <p className="text-4xl font-bold text-green-700 mb-2">
                          {formatCurrency(result.interestSavings)}
                        </p>
                      </div>

                      {/* Summary */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">{contentData.time_saved_25}</span>
                          <span className="font-bold text-blue-600">{formatTime(result.timeSavings)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">{contentData.new_payoff_time_26}</span>
                          <span className="font-bold text-orange-600">{formatTime(result.extraPayoffMonths)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium text-gray-700">{contentData.monthly_payment_27}</span>
                          <span className="font-bold text-purple-600">{formatCurrency(result.monthlyPayment)}</span>
                        </div>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_mortgage_details_to_see_your_payoff_analysis_28}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {showResult && result && <Card className="shadow-2xl border-0 pt-0 bg-white mt-8">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.detailed_analysis_29}</CardTitle>
                  <CardDescription className="text-base">{contentData.complete_mortgage_payoff_comparison_30}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(result.interestSavings)}
                      </div>
                      <div className="text-sm font-medium text-green-800">{contentData.interest_savings_31}</div>
                      <div className="text-xs text-green-600 mt-1">{contentData.total_interest_saved_with_extra_payments_32}</div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(result.timeSavings)}</div>
                      <div className="text-sm font-medium text-blue-800">{contentData.time_saved_33}</div>
                      <div className="text-xs text-blue-600 mt-1">{contentData.earlier_payoff_with_extra_payments_34}</div>
                    </div>

                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(result.monthlyPayment)}
                      </div>
                      <div className="text-sm font-medium text-purple-800">{contentData.monthly_payment_35}</div>
                      <div className="text-xs text-purple-600 mt-1">{contentData.standard_principal_interest_36}</div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">{contentData.scenario_37}</th>
                          <th className="border border-gray-200 px-4 py-3 text-right font-semibold text-gray-900">{contentData.payoff_time_38}</th>
                          <th className="border border-gray-200 px-4 py-3 text-right font-semibold text-gray-900">{contentData.total_interest_39}</th>
                          <th className="border border-gray-200 px-4 py-3 text-right font-semibold text-gray-900">{contentData.total_payments_40}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">{contentData.standard_payments_41}</td>
                          <td className="border border-gray-200 px-4 py-3 text-right">
                            {formatTime(result.standardPayoffMonths)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-right">
                            {formatCurrency(result.standardTotalInterest)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-right">
                            {formatCurrency(result.standardTotalPayments)}
                          </td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="border border-gray-200 px-4 py-3 font-medium text-green-800">{contentData.with_extra_payments_42}</td>
                          <td className="border border-gray-200 px-4 py-3 text-right text-green-800 font-semibold">
                            {formatTime(result.extraPayoffMonths)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-right text-green-800 font-semibold">
                            {formatCurrency(result.extraTotalInterest)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-right text-green-800 font-semibold">
                            {formatCurrency(result.extraTotalPayments)}
                          </td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td className="border border-gray-200 px-4 py-3 font-medium text-blue-800">{contentData.difference_savings_43}</td>
                          <td className="border border-gray-200 px-4 py-3 text-right text-blue-800 font-semibold">
                            {formatTime(result.timeSavings)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-right text-blue-800 font-semibold">
                            {formatCurrency(result.interestSavings)}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-right text-blue-800 font-semibold">
                            {formatCurrency(result.standardTotalPayments - result.extraTotalPayments)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">{contentData.key_insights_44}</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>{contentData.extra_payments_reduce_your_loan_term_by_45}<strong>{formatTime(result.timeSavings)}</strong>
                      </li>
                      <li>{contentData.youll_save_46}<strong>{formatCurrency(result.interestSavings)}</strong>{contentData.in_total_interest_47}</li>
                      <li>{contentData.your_effective_interest_savings_rate_is_48}{" "}
                        <strong>{(result.interestSavings / result.standardTotalInterest * 100).toFixed(1)}%</strong>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>}

            <div className="mt-8">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    <h2>{contentData.understanding_mortgage_payoff_strategies_49}</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{contentData.extra_payment_benefits_50}</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            <strong>{contentData.interest_savings_51}</strong>{contentData.extra_payments_go_directly_to_principal_reducing_t_52}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            <strong>{contentData.time_savings_53}</strong>{contentData.pay_off_your_mortgage_years_earlier_than_scheduled_54}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            <strong>{contentData.equity_building_55}</strong>{contentData.build_home_equity_faster_with_accelerated_principa_56}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{contentData.payment_strategies_57}</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            <strong>{contentData.monthly_extra_58}</strong>{contentData.add_a_fixed_amount_to_each_monthly_payment_59}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            <strong>{contentData.annual_lump_sum_60}</strong>{contentData.use_tax_refunds_or_bonuses_for_extra_payments_61}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            <strong>{contentData.biweekly_payments_62}</strong>{contentData.pay_half_monthly_amount_every_2_weeks_26_paymentsy_63}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{contentData.important_64}</strong>{contentData.before_making_extra_mortgage_payments_ensure_you_h_65}</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>

          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="mortgage-payoff-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />

        <SimilarCalculators calculators={[{
          calculatorName: "Advanced Mortgage Calculator",
          calculatorHref: "/financial/mortgage-calculator",
          calculatorDescription: "Calculate mortgage payments and scenarios"
        }, {
          calculatorName: "Annuity Payout Calculator",
          calculatorHref: "/financial/annuity-payout-calculator",
          calculatorDescription: "Calculate payments and retirement income"
        }]} color="blue" title="Related Financial Calculators" />

        </main>
      </div>

    </>;
}
