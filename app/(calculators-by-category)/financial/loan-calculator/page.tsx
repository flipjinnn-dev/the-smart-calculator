"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Loan Calculator",
  description: "Calculate payments, total interest, and payment schedules for any loan",
  url: "https://smartcalculator.com/calculator/loan",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
};
export default function LoanCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('loan-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('loan-calculator', language, "calculator-guide");

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
    "loan_details_0": "",
    "enter_your_loan_information_to_calculate_payments_1": "",
    "loan_amount_2": "",
    "annual_interest_rate_3": "",
    "loan_term_years_4": "",
    "calculate_5": "",
    "calculation_results_6": "",
    "your_loan_payment_breakdown_7": "",
    "monthly_payment_8": "",
    "total_interest_9": "",
    "total_payment_10": "",
    "enter_loan_details_to_see_your_calculation_11": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);
  const calculateLoan = () => {
    const principal = Number.parseFloat(loanAmount);
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = Number.parseFloat(loanTerm) * 12;
    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) return;
    const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment
    });
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

      <div className="min-h-screen bg-white">

        {/* Breadcrumb */}

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>{contentData.loan_details_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_loan_information_to_calculate_payments_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="loanAmount" className="flex items-center space-x-2 text-base font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{contentData.loan_amount_2}</span>
                    </Label>
                    <Input id="loanAmount" type="number" placeholder="25000" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="h-12 text-lg" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="interestRate" className="flex items-center space-x-2 text-base font-semibold">
                      <Percent className="w-4 h-4" />
                      <span>{contentData.annual_interest_rate_3}</span>
                    </Label>
                    <Input id="interestRate" type="number" step="0.01" placeholder="5.5" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="h-12 text-lg" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="loanTerm" className="flex items-center space-x-2 text-base font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>{contentData.loan_term_years_4}</span>
                    </Label>
                    <Input id="loanTerm" type="number" placeholder="5" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} className="h-12 text-lg" />
                  </div>

                  <Button onClick={() => {
                  calculateLoan();
                  scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                }} className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg">{contentData.calculate_5}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl">{contentData.calculation_results_6}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_loan_payment_breakdown_7}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {results ? <div className="space-y-8">
                      <div className="text-center p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
                        <p className="text-lg text-gray-600 mb-3">{contentData.monthly_payment_8}</p>
                        <p className="text-5xl font-bold text-green-600 mb-4">
                          $
                          {results.monthlyPayment.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">{contentData.total_interest_9}</p>
                          <p className="text-2xl font-bold text-gray-900">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">{contentData.total_payment_10}</p>
                          <p className="text-2xl font-bold text-gray-900">
                            $
                            {results.totalPayment.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                        </div>
                      </div>
                    </div> : <div className="text-center py-16 text-gray-500">
                      <Calculator className="w-16 h-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">{contentData.enter_loan_details_to_see_your_calculation_11}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Calculators */}
          <div className="mt-12">
            <SimilarCalculators calculators={[{
            calculatorName: "Auto Loan Calculator",
            calculatorHref: "/financial/auto-loan-calculator",
            calculatorDescription: "Calculate loan payments, interest rates, and financing options for vehicle purchases."
          }, {
            calculatorName: "Interest Calculator",
            calculatorHref: "/financial/interest-calculator",
            calculatorDescription: "Calculate and compound interest on loans, investments, and savings accounts."
          }, {
            calculatorName: "Savings Calculator",
            calculatorHref: "/financial/savings-calculator",
            calculatorDescription: "Calculate your savings grow over time with compound interest and regular contributions."
          }]} color="green" title="Related Financial Calculators" />
          </div>

          <div className="mt-8">
              <CalculatorGuide data={guideData} />
            </div>
        </main>

      </div>
    </>;
}