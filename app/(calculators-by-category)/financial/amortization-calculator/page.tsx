"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Calculator, DollarSign, Percent, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface AmortizationRow {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}
export default function AmortizationCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const { content, loading, error: contentError } = useCalculatorContent('amortization-calculator', language, 'calculator-ui');
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('amortization-calculator', language, "calculator-guide");
  
  // Use content or fallback to defaults
  const contentData = content || {
    pageTitle: "Amortization Calculator",
    pageDescription: "Generate a detailed amortization schedule",
    form: {
      labels: {},
      placeholders: {},
      buttons: {
        calculate: "Calculate",
        reset: "Reset"
      }
    },
    results: {}
  };

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [loanAmount, setLoanAmount] = useState("200000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    schedule: AmortizationRow[];
  } | null>(null);

  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  const calculateAmortization = () => {
    const principal = Number.parseFloat(loanAmount);
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = Number.parseFloat(loanTerm) * 12;
    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) return;
    const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const schedule: AmortizationRow[] = [];
    let remainingBalance = principal;
    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      schedule.push({
        payment: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment,
      schedule
    });
  };
  return <>
      
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{contentData.amortization_calculator_5}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.generate_a_detailed_amortization_schedule_showing__6}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r py-6 from-indigo-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    <span>{contentData.loan_details_7}</span>
                  </CardTitle>
                  <CardDescription className="text-sm">{contentData.enter_loan_information_to_generate_schedule_8}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="flex items-center space-x-2 text-sm font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>{contentData.loan_amount_9}</span>
                    </Label>
                    <Input id="loanAmount" type="number" placeholder="200000" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="h-10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate" className="flex items-center space-x-2 text-sm font-semibold">
                      <Percent className="w-4 h-4" />
                      <span>{contentData.interest_rate_10}</span>
                    </Label>
                    <Input id="interestRate" type="number" step="0.01" placeholder="6.5" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="h-10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanTerm" className="flex items-center space-x-2 text-sm font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>{contentData.loan_term_11}</span>
                    </Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">{contentData.k_15_years_12}</SelectItem>
                        <SelectItem value="20">{contentData.k_20_years_13}</SelectItem>
                        <SelectItem value="25">{contentData.k_25_years_14}</SelectItem>
                        <SelectItem value="30">{contentData.k_30_years_15}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-semibold">{contentData.start_date_16}</Label>
                    <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="h-10" />
                  </div>

                  <Button onClick={() => {
                  calculateAmortization();
                  scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                }} className="w-full h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg">{contentData.generate_schedule_17}</Button>
                </CardContent>
              </Card>

              {/* Results Summary */}
              <Card className="shadow-xl border-0" ref={resultsRef}>
                <CardHeader className="bg-gradient-to-r py-6 from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="text-xl">{contentData.loan_summary_18}</CardTitle>
                  <CardDescription className="text-sm">{contentData.payment_overview_19}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl">
                        <p className="text-sm text-gray-600 mb-2">{contentData.monthly_payment_20}</p>
                        <p className="text-3xl font-bold text-indigo-600">
                          $
                          {results.monthlyPayment.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">{contentData.total_interest_21}</p>
                          <p className="text-lg font-bold text-green-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        })}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">{contentData.total_payment_22}</p>
                          <p className="text-lg font-bold text-blue-600">
                            $
                            {results.totalPayment.toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        })}
                          </p>
                        </div>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">{contentData.enter_loan_details_to_see_summary_23}</p>
                    </div>}
                </CardContent>
              </Card>

              {/* Amortization Schedule */}
              <Card className="shadow-xl border-0 lg:col-span-1">
                <CardHeader className="bg-gradient-to-r py-6 from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="text-xl">{contentData.payment_schedule_24}</CardTitle>
                  <CardDescription className="text-sm">{contentData.first_12_payments_preview_25}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-4">
                      <div className="max-h-96 overflow-y-auto">
                        <div className="space-y-2">
                          {results.schedule.slice(0, 12).map((row, index) => <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-900">{contentData.payment_26}{row.payment}</span>
                                <span className="text-sm font-bold text-indigo-600">
                                  $
                                  {(row.principal + row.interest).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-gray-500">{contentData.principal_27}</span>
                                  <span className="font-medium">
                                    $
                                    {row.principal.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">{contentData.interest_28}</span>
                                  <span className="font-medium">
                                    $
                                    {row.interest.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{contentData.balance_29}{row.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          })}
                              </div>
                            </div>)}
                        </div>
                      </div>
                      {results.schedule.length > 12 && <p className="text-xs text-gray-500 text-center">{contentData.showing_first_12_of_30}{results.schedule.length}{contentData.payments_31}</p>}
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">{contentData.generate_schedule_to_see_payment_details_32}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>
          </div>
        <SimilarCalculators calculators={[{
          calculatorName: "Interest Calculator",
          calculatorHref: "/financial/interest-calculator",
          calculatorDescription: "Calculate simple and compound interest on investments"
        }, {
          calculatorName: "Investment Calculator",
          calculatorHref: "/financial/investment-calculator",
          calculatorDescription: "Calculate investment returns and portfolio growth"
        }, {
          calculatorName: "Interest Rate Calculator",
          calculatorHref: "/financial/interest-rate-calculator",
          calculatorDescription: "Calculate interest rates for loans and investments"
        }]} color="blue" title="Related Financial Calculators" />
          {/* Calculator Guide */}
          <div className="mx-auto mt-12">
            
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="amortization-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          </div>

        </main>
      </div>
    </>;
}