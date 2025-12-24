"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, CreditCard, DollarSign, TrendingDown, HelpCircle, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
interface PaymentScheduleEntry {
  month: number;
  beginningBalance: number;
  interest: number;
  payment: number;
  principal: number;
  endingBalance: number;
}
export default function CreditCardCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('credit-card-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('credit-card-calculator', language, "calculator-guide");

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
    "credit_card_calculator_0": "",
    "credit_card_information_1": "",
    "current_balance_2": "",
    "annual_interest_rate_apr_3": "",
    "payment_strategy_4": "",
    "fixed_monthly_payment_calculate_time_5": "",
    "payoff_in_fixed_timeframe_calculate_payment_6": "",
    "minimum_payment_interest_of_balance_7": "",
    "monthly_payment_amount_8": "",
    "years_9": "",
    "months_10": "",
    "principal_payment_of_balance_11": "",
    "k_1_12": "",
    "k_2_13": "",
    "k_3_14": "",
    "k_4_15": "",
    "k_5_16": "",
    "calculate_17": "",
    "payoff_results_18": "",
    "your_debt_payoff_breakdown_19": "",
    "your_balance_will_be_paid_off_in_20": "",
    "years_21": "",
    "months_22": "",
    "required_monthly_payment_23": "",
    "total_interest_paid_24": "",
    "total_amount_paid_25": "",
    "payment_schedule_26": "",
    "download_csv_27": "",
    "month_28": "",
    "balance_29": "",
    "interest_30": "",
    "payment_31": "",
    "principal_32": "",
    "showing_first_24_months_download_csv_for_complete__33": "",
    "enter_your_credit_card_information_to_see_payoff_r_34": "",
    "formulas_behind_the_calculation_35": "",
    "monthly_interest_rate_36": "",
    "monthly_rate_annual_rate_12_37": "",
    "balance_recurrence_38": "",
    "new_balance_previous_balance_1_monthly_rate_paymen_39": "",
    "fixed_payment_payoff_time_40": "",
    "n_lnp_p_b_r_ln1_r_41": "",
    "fixed_timeframe_required_payment_42": "",
    "p_b_r_1r_1r_1_43": "",
    "example_scenarios_44": "",
    "scenario_1_aggressive_payoff_45": "",
    "balance_5000_46": "",
    "apr_1899_47": "",
    "payment_300month_48": "",
    "result_19_months_850_interest_49": "",
    "scenario_2_minimum_payment_50": "",
    "balance_5000_51": "",
    "apr_1899_52": "",
    "payment_2_of_balance_53": "",
    "result_30_years_15000_interest_54": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Input states
  const [balance, setBalance] = useState("5000");
  const [annualRate, setAnnualRate] = useState("18.99");
  const [paymentMode, setPaymentMode] = useState("fixed-payment");
  const [monthlyPayment, setMonthlyPayment] = useState("200");
  const [payoffYears, setPayoffYears] = useState("2");
  const [payoffMonths, setPayoffMonths] = useState("0");
  const [minimumPercent, setMinimumPercent] = useState("2");
  const [results, setResults] = useState<{
    payoffTime?: {
      years: number;
      months: number;
    };
    requiredPayment?: number;
    totalInterest: number;
    totalPaid: number;
    schedule: PaymentScheduleEntry[];
    error?: string;
  } | null>(null);
  const calculatePayoff = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const B0 = Number.parseFloat(balance);
    const rApr = Number.parseFloat(annualRate) / 100;
    const rp = rApr / 12; // monthly rate

    if (B0 <= 0) {
      setResults({
        totalInterest: 0,
        totalPaid: 0,
        schedule: [],
        error: "Balance must be greater than 0"
      });
      return;
    }
    if (rp <= 0) {
      setResults({
        totalInterest: 0,
        totalPaid: 0,
        schedule: [],
        error: "Interest rate must be greater than 0"
      });
      return;
    }
    const schedule: PaymentScheduleEntry[] = [];
    let totalInterest = 0;
    let totalPaid = 0;
    if (paymentMode === "fixed-payment") {
      // Mode A: Fixed Monthly Payment
      const P = Number.parseFloat(monthlyPayment);
      if (P <= B0 * rp) {
        setResults({
          totalInterest: 0,
          totalPaid: 0,
          schedule: [],
          error: "Payment too low - balance will never reduce. Minimum payment needed: $" + (B0 * rp + 1).toFixed(2)
        });
        return;
      }

      // Calculate of months using closed form
      const n = Math.log(P / (P - B0 * rp)) / Math.log(1 + rp);
      const years = Math.floor(n / 12);
      const months = Math.ceil(n % 12);

      // Generate payment schedule
      let currentBalance = B0;
      let month = 1;
      while (currentBalance > 0.01 && month <= 600) {
        // Safety limit
        const interestPayment = currentBalance * rp;
        const principalPayment = Math.min(P - interestPayment, currentBalance);
        const actualPayment = interestPayment + principalPayment;
        const newBalance = Math.max(0, currentBalance - principalPayment);
        schedule.push({
          month,
          beginningBalance: currentBalance,
          interest: interestPayment,
          payment: actualPayment,
          principal: principalPayment,
          endingBalance: newBalance
        });
        totalInterest += interestPayment;
        totalPaid += actualPayment;
        currentBalance = newBalance;
        month++;
      }
      setResults({
        payoffTime: {
          years,
          months
        },
        totalInterest,
        totalPaid,
        schedule
      });
    } else if (paymentMode === "fixed-timeframe") {
      // Mode B: Fixed Timeframe
      const totalMonths = Number.parseFloat(payoffYears) * 12 + Number.parseFloat(payoffMonths);
      if (totalMonths <= 0) {
        setResults({
          totalInterest: 0,
          totalPaid: 0,
          schedule: [],
          error: "Payoff time must be greater than 0"
        });
        return;
      }

      // Calculate payment using formula
      const P = B0 * rp * Math.pow(1 + rp, totalMonths) / (Math.pow(1 + rp, totalMonths) - 1);

      // Generate payment schedule
      let currentBalance = B0;
      for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = currentBalance * rp;
        const principalPayment = P - interestPayment;
        const newBalance = Math.max(0, currentBalance - principalPayment);
        schedule.push({
          month,
          beginningBalance: currentBalance,
          interest: interestPayment,
          payment: P,
          principal: principalPayment,
          endingBalance: newBalance
        });
        totalInterest += interestPayment;
        totalPaid += P;
        currentBalance = newBalance;
      }
      setResults({
        requiredPayment: P,
        totalInterest,
        totalPaid,
        schedule
      });
    } else {
      // Mode C: Interest + % of Balance
      const alpha = Number.parseFloat(minimumPercent) / 100;
      let currentBalance = B0;
      let month = 1;
      while (currentBalance > 0.01 && month <= 600) {
        // Safety limit
        const interestPayment = currentBalance * rp;
        const principalPayment = currentBalance * alpha;
        const payment = interestPayment + principalPayment;
        const newBalance = currentBalance * (1 - alpha);
        schedule.push({
          month,
          beginningBalance: currentBalance,
          interest: interestPayment,
          payment,
          principal: principalPayment,
          endingBalance: newBalance
        });
        totalInterest += interestPayment;
        totalPaid += payment;
        currentBalance = newBalance;
        month++;
      }
      const years = Math.floor((month - 1) / 12);
      const months = (month - 1) % 12;
      setResults({
        payoffTime: {
          years,
          months
        },
        totalInterest,
        totalPaid,
        schedule
      });
    }
  };
  const downloadCSV = () => {
    if (!results?.schedule.length) return;
    const headers = ["Month", "Beginning Balance", "Interest", "Payment", "Principal", "Ending Balance"];
    const csvContent = [headers.join(","), ...results.schedule.map(row => [row.month, row.beginningBalance.toFixed(2), row.interest.toFixed(2), row.payment.toFixed(2), row.principal.toFixed(2), row.endingBalance.toFixed(2)].join(","))].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "credit-card-payoff-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-red-600" />
                    <span>{contentData.credit_card_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.credit_card_information_1}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.current_balance_2}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={balance} onChange={e => setBalance(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-red-500" placeholder="5000" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.annual_interest_rate_apr_3}</Label>
                        <div className="relative">
                          <Input type="number" step="0.01" value={annualRate} onChange={e => setAnnualRate(e.target.value)} className="pr-10 h-12 text-lg border-2 focus:border-red-500" placeholder="18.99" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Mode */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.payment_strategy_4}</h3>
                    </div>

                    <RadioGroup value={paymentMode} onValueChange={setPaymentMode} className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fixed-payment" id="fixed-payment" />
                        <Label htmlFor="fixed-payment" className="text-base font-medium">{contentData.fixed_monthly_payment_calculate_time_5}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fixed-timeframe" id="fixed-timeframe" />
                        <Label htmlFor="fixed-timeframe" className="text-base font-medium">{contentData.payoff_in_fixed_timeframe_calculate_payment_6}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="minimum-payment" id="minimum-payment" />
                        <Label htmlFor="minimum-payment" className="text-base font-medium">{contentData.minimum_payment_interest_of_balance_7}</Label>
                      </div>
                    </RadioGroup>

                    {paymentMode === "fixed-payment" && <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.monthly_payment_amount_8}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-red-500" placeholder="200" />
                        </div>
                      </div>}

                    {paymentMode === "fixed-timeframe" && <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.years_9}</Label>
                          <Input type="number" value={payoffYears} onChange={e => setPayoffYears(e.target.value)} className="h-12 text-lg border-2 focus:border-red-500" placeholder="2" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.months_10}</Label>
                          <Input type="number" value={payoffMonths} onChange={e => setPayoffMonths(e.target.value)} className="h-12 text-lg border-2 focus:border-red-500" placeholder="0" />
                        </div>
                      </div>}

                    {paymentMode === "minimum-payment" && <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.principal_payment_of_balance_11}</Label>
                        <Select value={minimumPercent} onValueChange={setMinimumPercent}>
                          <SelectTrigger className="h-12 border-2 focus:border-red-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">{contentData.k_1_12}</SelectItem>
                            <SelectItem value="2">{contentData.k_2_13}</SelectItem>
                            <SelectItem value="3">{contentData.k_3_14}</SelectItem>
                            <SelectItem value="4">{contentData.k_4_15}</SelectItem>
                            <SelectItem value="5">{contentData.k_5_16}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>}
                  </div>

                  <Button onClick={calculatePayoff} className="w-full h-14 text-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl font-bold mt-12">{contentData.calculate_17}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.payoff_results_18}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_debt_payoff_breakdown_19}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? results.error ? <div className="text-center py-12">
                        <div className="bg-red-100 border border-red-300 rounded-lg p-6">
                          <p className="text-red-800 font-semibold">{results.error}</p>
                        </div>
                      </div> : <div className="space-y-6">
                        {/* Main Result */}
                        <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                          {results.payoffTime ? <>
                              <p className="text-lg mb-2 font-semibold text-green-800">{contentData.your_balance_will_be_paid_off_in_20}</p>
                              <p className="text-4xl font-bold mb-2 text-green-700">
                                {results.payoffTime.years}{contentData.years_21}{results.payoffTime.months}{contentData.months_22}</p>
                            </> : <>
                              <p className="text-lg mb-2 font-semibold text-green-800">{contentData.required_monthly_payment_23}</p>
                              <p className="text-4xl font-bold mb-2 text-green-700">
                                $
                                {results.requiredPayment?.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                              </p>
                            </>}
                        </div>

                        {/* Summary Stats */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">{contentData.total_interest_paid_24}</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">{contentData.total_amount_paid_25}</span>
                            <span className="font-bold text-purple-600">
                              $
                              {results.totalPaid.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </span>
                          </div>
                        </div>

                        {/* Payment Schedule */}
                        {results.schedule.length > 0 && <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold text-lg text-gray-900">{contentData.payment_schedule_26}</h3>
                              <Button onClick={downloadCSV} variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                                <Download className="w-4 h-4" />
                                <span>{contentData.download_csv_27}</span>
                              </Button>
                            </div>

                            <div className="max-h-96 overflow-y-auto border rounded-lg">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50 sticky top-0">
                                  <tr>
                                    <th className="px-3 py-2 text-left font-semibold">{contentData.month_28}</th>
                                    <th className="px-3 py-2 text-right font-semibold">{contentData.balance_29}</th>
                                    <th className="px-3 py-2 text-right font-semibold">{contentData.interest_30}</th>
                                    <th className="px-3 py-2 text-right font-semibold">{contentData.payment_31}</th>
                                    <th className="px-3 py-2 text-right font-semibold">{contentData.principal_32}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {results.schedule.slice(0, 24).map(row => <tr key={row.month} className="border-t">
                                      <td className="px-3 py-2">{row.month}</td>
                                      <td className="px-3 py-2 text-right">
                                        ${row.beginningBalance.toLocaleString("en-US", {
                                maximumFractionDigits: 0
                              })}
                                      </td>
                                      <td className="px-3 py-2 text-right text-red-600">${row.interest.toFixed(2)}</td>
                                      <td className="px-3 py-2 text-right font-semibold">${row.payment.toFixed(2)}</td>
                                      <td className="px-3 py-2 text-right text-green-600">
                                        ${row.principal.toFixed(2)}
                                      </td>
                                    </tr>)}
                                </tbody>
                              </table>
                              {results.schedule.length > 24 && <div className="p-3 text-center text-gray-500 bg-gray-50 border-t">{contentData.showing_first_24_months_download_csv_for_complete__33}</div>}
                            </div>
                          </div>}
                      </div> : <div className="text-center py-12 text-gray-500">
                      <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_credit_card_information_to_see_payoff_r_34}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Credit Card Payoff Calculator",
            calculatorHref: "/financial/credit-card-payoff-calculator",
            calculatorDescription: "Create optimal debt payoff strategy using avalanche method"
          }, {
            calculatorName: "Finance Calculator",
            calculatorHref: "/financial/finance-calculator",
            calculatorDescription: "Calculate value of money for investment and loan scenarios"
          }, {
            calculatorName: "Salary Calculator",
            calculatorHref: "/financial/salary-calculator",
            calculatorDescription: "Calculate-home pay, deductions, and salary conversions"
          }]} color="red" title="Related Financial Calculators" />

            {/* Educational Content */}
            <div className="mt-12 space-y-8">

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_behind_the_calculation_35}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.monthly_interest_rate_36}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.monthly_rate_annual_rate_12_37}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.balance_recurrence_38}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.new_balance_previous_balance_1_monthly_rate_paymen_39}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.fixed_payment_payoff_time_40}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.n_lnp_p_b_r_ln1_r_41}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.fixed_timeframe_required_payment_42}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.p_b_r_1r_1r_1_43}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Scenarios */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.example_scenarios_44}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold mb-3 text-blue-800">{contentData.scenario_1_aggressive_payoff_45}</h3>
                      <ul className="space-y-2 text-blue-700">
                        <li>{contentData.balance_5000_46}</li>
                        <li>{contentData.apr_1899_47}</li>
                        <li>{contentData.payment_300month_48}</li>
                        <li>{contentData.result_19_months_850_interest_49}</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h3 className="text-lg font-semibold mb-3 text-orange-800">{contentData.scenario_2_minimum_payment_50}</h3>
                      <ul className="space-y-2 text-orange-700">
                        <li>{contentData.balance_5000_51}</li>
                        <li>{contentData.apr_1899_52}</li>
                        <li>{contentData.payment_2_of_balance_53}</li>
                        <li>{contentData.result_30_years_15000_interest_54}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calculator Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="credit-card-calculator"
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