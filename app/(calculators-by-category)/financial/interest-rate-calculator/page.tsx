"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState, useRef } from "react";

import { Calculator, Percent, DollarSign, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function InterestRateCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('interest-rate-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('interest-rate-calculator', language, "calculator-guide");

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
    "interest_rate_calculator_0": "",
    "loan_information_1": "",
    "loan_amount_2": "",
    "loan_term_3": "",
    "years_4": "",
    "months_5": "",
    "monthly_payment_6": "",
    "calculate_rate_7": "",
    "results_8": "",
    "your_loan_interest_rate_breakdown_9": "",
    "interest_rate_10": "",
    "total_of_11": "",
    "monthly_payments_12": "",
    "total_interest_paid_13": "",
    "enter_your_loan_information_to_calculate_the_inter_14": "",
    "formulas_calculation_method_15": "",
    "loan_payment_formula_16": "",
    "pmt_p_r1rn_1rn_1_17": "",
    "where_pmt_monthly_payment_p_principal_loan_amount__18": "",
    "interest_rate_calculation_19": "",
    "since_the_interest_rate_cannot_be_solved_algebraic_20": "",
    "total_interest_calculation_21": "",
    "total_interest_monthly_payment_number_of_payments__22": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [loanAmount, setLoanAmount] = useState("32000");
  const [loanTermYears, setLoanTermYears] = useState("3");
  const [loanTermMonths, setLoanTermMonths] = useState("0");
  const [monthlyPayment, setMonthlyPayment] = useState("960");
  const [results, setResults] = useState<{
    interestRate: number;
    totalPayments: number;
    totalInterest: number;
  } | null>(null);
  const solveForInterestRate = (principal: number, payment: number, totalMonths: number): number => {
    if (totalMonths === 0 || payment === 0) return 0;

    // Initial guess: 5% annual rate
    let monthlyRate = 0.05 / 12;
    const tolerance = 1e-10;
    const maxIterations = 100;
    for (let i = 0; i < maxIterations; i++) {
      if (Math.abs(monthlyRate) < 1e-15) {
        monthlyRate = 1e-10;
      }

      // Loan payment formula: PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
      // Rearranged: f(r) = P * [r(1+r)^n] / [(1+r)^n - 1] - PMT = 0
      const onePlusR = 1 + monthlyRate;
      const onePlusRN = Math.pow(onePlusR, totalMonths);
      const f = principal * (monthlyRate * onePlusRN) / (onePlusRN - 1) - payment;

      // Derivative f'(r)
      const numerator = monthlyRate * onePlusRN;
      const denominator = onePlusRN - 1;
      const dNumerator = onePlusRN + monthlyRate * totalMonths * Math.pow(onePlusR, totalMonths - 1);
      const dDenominator = totalMonths * Math.pow(onePlusR, totalMonths - 1);
      const df = principal * (dNumerator * denominator - numerator * dDenominator) / (denominator * denominator);
      if (Math.abs(df) < tolerance) break;
      const newRate = monthlyRate - f / df;
      if (Math.abs(newRate - monthlyRate) < tolerance) {
        return newRate * 12 * 100; // Convert to annual percentage
      }
      monthlyRate = newRate;
    }
    return monthlyRate * 12 * 100; // Convert to annual percentage
  };
  const calculateInterestRate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const principal = Number.parseFloat(loanAmount) || 0;
    const payment = Number.parseFloat(monthlyPayment) || 0;
    const years = Number.parseFloat(loanTermYears) || 0;
    const months = Number.parseFloat(loanTermMonths) || 0;
    const totalMonths = years * 12 + months;
    if (principal <= 0 || payment <= 0 || totalMonths <= 0) {
      setResults(null);
      return;
    }
    const annualRate = solveForInterestRate(principal, payment, totalMonths);
    const totalOfPayments = payment * totalMonths;
    const totalInterestPaid = totalOfPayments - principal;
    setResults({
      interestRate: annualRate,
      totalPayments: totalOfPayments,
      totalInterest: totalInterestPaid
    });
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Percent className="w-8 h-8 text-white" />
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
                    <span>{contentData.interest_rate_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Loan Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.loan_information_1}</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.loan_amount_2}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-blue-500" placeholder="32000" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.loan_term_3}</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Input type="number" value={loanTermYears} onChange={e => setLoanTermYears(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" placeholder="3" />
                            <Label className="text-sm text-gray-600">{contentData.years_4}</Label>
                          </div>
                          <div className="space-y-2">
                            <Input type="number" value={loanTermMonths} onChange={e => setLoanTermMonths(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" placeholder="0" />
                            <Label className="text-sm text-gray-600">{contentData.months_5}</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.monthly_payment_6}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-blue-500" placeholder="960" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateInterestRate} className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold">{contentData.calculate_rate_7}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.results_8}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_loan_interest_rate_breakdown_9}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Interest Rate */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                        <p className="text-lg mb-2 font-semibold text-blue-800">{contentData.interest_rate_10}</p>
                        <p className="text-4xl font-bold mb-2 text-blue-700">{results.interestRate.toFixed(3)}%</p>
                      </div>

                      {/* Payment Summary */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">{contentData.total_of_11}{" "}
                            {(Number.parseFloat(loanTermYears) || 0) * 12 + (Number.parseFloat(loanTermMonths) || 0)}{" "}{contentData.monthly_payments_12}</span>
                          <span className="font-bold text-green-600">
                            $
                            {results.totalPayments.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">{contentData.total_interest_paid_13}</span>
                          <span className="font-bold text-orange-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_loan_information_to_calculate_the_inter_14}</p>
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
              calculatorName: "Loan Calculator",
              calculatorHref: "/financial/loan-calculator",
              calculatorDescription: "Calculate payments, interest rates, and loan terms for personal and auto loans."
            }, {
              calculatorName: "Compound Interest Calculator",
              calculatorHref: "/financial/compound-interest-calculator",
              calculatorDescription: "Calculate interest growth on investments and savings over time."
            }]} color="blue" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_calculation_method_15}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.loan_payment_formula_16}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <div className="text-center text-lg font-mono">{contentData.pmt_p_r1rn_1rn_1_17}</div>
                      </div>
                      <p className="text-gray-700 text-sm">{contentData.where_pmt_monthly_payment_p_principal_loan_amount__18}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.interest_rate_calculation_19}</h3>
                      <p className="text-gray-700">{contentData.since_the_interest_rate_cannot_be_solved_algebraic_20}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.total_interest_calculation_21}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <div className="text-center text-lg font-mono">{contentData.total_interest_monthly_payment_number_of_payments__22}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* FAQ */}
              <CalculatorGuide data={guideData} />
            </div>
          </div>
        </main>
      </div>
    </>;
}