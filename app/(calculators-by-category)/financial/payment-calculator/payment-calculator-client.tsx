"use client";

import { useRef, useState } from "react";

import { Calculator, DollarSign, Percent, Calendar, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
;
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
interface PaymentResults {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  numberOfPayments: number;
}
interface AmortizationEntry {
  year: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

interface PaymentCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function PaymentCalculatorClient({ content, guideContent }: PaymentCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [loanAmount, setLoanAmount] = useState("200000");
  const [loanTerm, setLoanTerm] = useState("15");
  const [interestRate, setInterestRate] = useState("6");
  const [monthlyPayment, setMonthlyPayment] = useState("1687.71");
  const [results, setResults] = useState<PaymentResults | null>(null);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);

          const calculateFixedTerm = () => {
    const principal = Number.parseFloat(loanAmount);
    const years = Number.parseFloat(loanTerm);
    const rate = Number.parseFloat(interestRate) / 100 / 12;
    const payments = years * 12;
    if (principal <= 0 || years <= 0 || rate < 0) return;
    const monthlyPmt = rate === 0 ? principal / payments : principal * rate * Math.pow(1 + rate, payments) / (Math.pow(1 + rate, payments) - 1);
    const totalPmt = monthlyPmt * payments;
    const totalInt = totalPmt - principal;
    const newResults: PaymentResults = {
      monthlyPayment: monthlyPmt,
      totalPayments: totalPmt,
      totalInterest: totalInt,
      loanAmount: principal,
      loanTerm: years,
      interestRate: Number.parseFloat(interestRate),
      numberOfPayments: payments
    };
    setResults(newResults);
    generateAmortization(newResults);
  };
  const calculateFixedPayment = () => {
    const payment = Number.parseFloat(monthlyPayment);
    const principal = Number.parseFloat(loanAmount);
    const rate = Number.parseFloat(interestRate) / 100 / 12;
    if (payment <= 0 || principal <= 0 || rate < 0) return;
    let payments: number;
    if (rate === 0) {
      payments = principal / payment;
    } else {
      payments = -Math.log(1 - principal * rate / payment) / Math.log(1 + rate);
    }
    const years = payments / 12;
    const totalPmt = payment * payments;
    const totalInt = totalPmt - principal;
    const newResults: PaymentResults = {
      monthlyPayment: payment,
      totalPayments: totalPmt,
      totalInterest: totalInt,
      loanAmount: principal,
      loanTerm: years,
      interestRate: Number.parseFloat(interestRate),
      numberOfPayments: payments
    };
    setResults(newResults);
    generateAmortization(newResults);
  };
  const generateAmortization = (data: PaymentResults) => {
    const schedule: AmortizationEntry[] = [];
    let balance = data.loanAmount;
    const monthlyRate = data.interestRate / 100 / 12;
    const monthlyPmt = data.monthlyPayment;
    for (let year = 1; year <= Math.ceil(data.loanTerm); year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      const monthsInYear = year === Math.ceil(data.loanTerm) ? data.loanTerm % 1 * 12 || 12 : 12;
      for (let month = 1; month <= monthsInYear && balance > 0; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(monthlyPmt - interestPayment, balance);
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
      }
      if (yearlyPrincipal > 0) {
        schedule.push({
          year,
          interest: yearlyInterest,
          principal: yearlyPrincipal,
          endingBalance: Math.max(0, balance)
        });
      }
    }
    setAmortization(schedule);
  };
  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  const clearForm = () => {
    setLoanAmount("200000");
    setLoanTerm("15");
    setInterestRate("6");
    setMonthlyPayment("1687.71");
    setResults(null);
    setAmortization([]);
  };
  return <>

      <div className="min-h-screen bg-white">

        {/* Breadcrumb */}

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white overflow-hidden pt-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.payment_calculator_1}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.choose_your_calculation_method_below_2}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Tabs defaultValue="fixed-term" className="mb-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="fixed-term">{contentData.fixed_term_3}</TabsTrigger>
                        <TabsTrigger value="fixed-payments">{contentData.fixed_payments_4}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="fixed-term" className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="loanAmount1" className="flex items-center space-x-2 text-base font-semibold">
                            <DollarSign className="w-4 h-4" />
                            <span>{contentData.loan_amount_5}</span>
                          </Label>
                          <Input id="loanAmount1" type="number" placeholder="200000" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="h-12 text-lg" />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="loanTerm1" className="flex items-center space-x-2 text-base font-semibold">
                            <Calendar className="w-4 h-4" />
                            <span>{contentData.loan_term_years_6}</span>
                          </Label>
                          <Input id="loanTerm1" type="number" placeholder="15" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} className="h-12 text-lg" />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="interestRate1" className="flex items-center space-x-2 text-base font-semibold">
                            <Percent className="w-4 h-4" />
                            <span>{contentData.interest_rate_7}</span>
                          </Label>
                          <Input id="interestRate1" type="number" step="0.01" placeholder="6" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="h-12 text-lg" />
                        </div>

                        <div className="flex space-x-4 mt-8">
                          <Button onClick={calculateFixedTerm} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg">{contentData.calculate_8}</Button>
                          <Button onClick={clearForm} variant="outline" className="h-12 px-8 text-lg border-2 bg-transparent">{contentData.clear_9}</Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="fixed-payments" className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="loanAmount2" className="flex items-center space-x-2 text-base font-semibold">
                            <DollarSign className="w-4 h-4" />
                            <span>{contentData.loan_amount_10}</span>
                          </Label>
                          <Input id="loanAmount2" type="number" placeholder="200000" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="h-12 text-lg" />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="monthlyPayment2" className="flex items-center space-x-2 text-base font-semibold">
                            <CreditCard className="w-4 h-4" />
                            <span>{contentData.monthly_payment_11}</span>
                          </Label>
                          <Input id="monthlyPayment2" type="number" placeholder="1687.71" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} className="h-12 text-lg" />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="interestRate2" className="flex items-center space-x-2 text-base font-semibold">
                            <Percent className="w-4 h-4" />
                            <span>{contentData.interest_rate_12}</span>
                          </Label>
                          <Input id="interestRate2" type="number" step="0.01" placeholder="6" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="h-12 text-lg" />
                        </div>

                        <div className="flex space-x-4 mt-8">
                          <Button onClick={() => {
                          calculateFixedPayment();
                          scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                        }} className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">{contentData.calculate_13}</Button>
                          <Button onClick={clearForm} variant="outline" className="h-12 px-8 text-lg border-2 bg-transparent">{contentData.clear_14}</Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white sticky top-24 pt-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">{contentData.monthly_payment_15}</CardTitle>
                    <CardDescription className="text-base">{contentData.your_payment_calculation_details_16}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {results ? <div className="space-y-8">
                        <div className="text-center p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                          <p className="text-5xl font-bold text-green-600 mb-4">
                            $
                            {results.monthlyPayment.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">{contentData.you_will_need_to_pay_17}{results.monthlyPayment.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}{" "}{contentData.every_month_for_18}{results.loanTerm.toFixed(1)}{contentData.years_to_payoff_the_debt_19}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                            <span className="text-gray-600">{contentData.total_of_20}{Math.round(results.numberOfPayments)}{contentData.payments_21}</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.totalPayments.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                            <span className="text-gray-600">{contentData.total_interest_22}</span>
                            <span className="font-bold text-red-600">
                              $
                              {results.totalInterest.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          })}
                            </span>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto mb-4 relative">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray={`${results.loanAmount / results.totalPayments * 251.2} 251.2`} strokeLinecap="round" />
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray={`${results.totalInterest / results.totalPayments * 251.2} 251.2`} strokeDashoffset={`-${results.loanAmount / results.totalPayments * 251.2}`} strokeLinecap="round" />
                            </svg>
                          </div>
                          <div className="flex justify-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span>{Math.round(results.loanAmount / results.totalPayments * 100)}{contentData.principal_23}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span>{Math.round(results.totalInterest / results.totalPayments * 100)}{contentData.interest_24}</span>
                            </div>
                          </div>
                        </div>
                      </div> : <div className="text-center py-16 text-gray-500">
                        <CreditCard className="w-16 h-16 mx-auto mb-6 opacity-50" />
                        <p className="text-lg">{contentData.enter_payment_details_to_see_your_calculation_25}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Amortization Schedule */}
            {results && amortization.length > 0 && <div className="mt-12">
                <Card className="shadow-2xl border-0">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">{contentData.amortization_schedule_26}</CardTitle>
                    <CardDescription className="text-base">{contentData.annual_payment_breakdown_27}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{contentData.year_28}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{contentData.interest_29}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{contentData.principal_30}</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{contentData.ending_balance_31}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {amortization.map((entry, index) => <tr key={entry.year} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{entry.year}</td>
                              <td className="px-6 py-4 text-sm text-right text-red-600">
                                $
                                {entry.interest.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                              </td>
                              <td className="px-6 py-4 text-sm text-right text-blue-600">
                                $
                                {entry.principal.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                              </td>
                              <td className="px-6 py-4 text-sm text-right text-gray-900">
                                $
                                {entry.endingBalance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>}
          </div>
        <SimilarCalculators calculators={[{
          calculatorName: "Currency Calculator",
          calculatorHref: "/financial/currency-calculator",
          calculatorDescription: "Convert between different currencies with real-time rates"
        }, {
          calculatorName: "Salary Calculator",
          calculatorHref: "/financial/salary-calculator",
          calculatorDescription: "Calculate salary after taxes and deductions"
        }, {
          calculatorName: "Savings Calculator",
          calculatorHref: "/financial/savings-calculator",
          calculatorDescription: "Calculate value of savings with compound interest"
        }]} color="blue" title="Related Financial Calculators" />
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="payment-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />

        </main>

      </div>
    </>;
}
