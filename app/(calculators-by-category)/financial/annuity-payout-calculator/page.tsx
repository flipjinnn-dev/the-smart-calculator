"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, DollarSign, TrendingDown, HelpCircle, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
interface PayoutScheduleEntry {
  period: number;
  beginningBalance: number;
  interestEarned: number;
  payment: number;
  endingBalance: number;
}
export default function AnnuityPayoutCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('annuity-payout-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('annuity-payout-calculator', language, "calculator-guide");

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
    "payout_calculator_0": "",
    "calculation_mode_1": "",
    "fixed_length_2": "",
    "fixed_payment_3": "",
    "annuity_details_4": "",
    "starting_principal_5": "",
    "annual_interest_rate_6": "",
    "payout_frequency_7": "",
    "annually_8": "",
    "semiannually_9": "",
    "quarterly_10": "",
    "monthly_11": "",
    "semimonthly_12": "",
    "biweekly_13": "",
    "years_to_payout_14": "",
    "payment_amount_15": "",
    "calculate_16": "",
    "payout_results_17": "",
    "your_annuity_payout_breakdown_18": "",
    "your_payment_per_period_19": "",
    "for_20": "",
    "years_21": "",
    "your_fund_will_last_22": "",
    "years_23": "",
    "months_24": "",
    "with_25": "",
    "payments_26": "",
    "starting_principal_27": "",
    "total_payments_28": "",
    "total_interest_earned_29": "",
    "download_payout_schedule_csv_30": "",
    "enter_your_annuity_details_to_see_payout_results_31": "",
    "amortization_schedule_32": "",
    "detailed_breakdown_of_each_payment_period_showing__33": "",
    "period_34": "",
    "beginning_balance_35": "",
    "interest_earned_36": "",
    "payment_37": "",
    "ending_balance_38": "",
    "showing_first_12_periods_of_39": "",
    "total_periods_download_csv_for_complete_schedule_40": "",
    "calculation_formula_41": "",
    "fixed_length_mode_42": "",
    "calculate_amount_given_principal_rate_and_duration_43": "",
    "pmt_p_rp_1_1_rpn_44": "",
    "where_p_principal_rp_periodic_rate_n_total_payment_45": "",
    "fixed_payment_mode_46": "",
    "calculate_given_principal_rate_and_payment_amount_47": "",
    "n_lnpmt_pmt_p_rp_ln1_rp_48": "",
    "where_pmt_payment_amount_p_principal_rp_periodic_r_49": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Input states
  const [startingPrincipal, setStartingPrincipal] = useState("500000");
  const [annualRate, setAnnualRate] = useState("5");
  const [payoutYears, setPayoutYears] = useState("20");
  const [payoutFrequency, setPayoutFrequency] = useState("12");
  const [paymentAmount, setPaymentAmount] = useState("3000");
  const [calculationMode, setCalculationMode] = useState("fixedLength");
  const [results, setResults] = useState<{
    paymentPerPeriod?: number;
    totalPayments: number;
    totalInterest: number;
    durationYears?: number;
    durationMonths?: number;
    schedule: PayoutScheduleEntry[];
  } | null>(null);
  const getFrequencyLabel = (freq: string) => {
    const labels: {
      [key: string]: string;
    } = {
      "1": "Annually",
      "2": "Semiannually",
      "4": "Quarterly",
      "12": "Monthly",
      "24": "Semimonthly",
      "26": "Biweekly"
    };
    return labels[freq] || "Monthly";
  };
  const calculatePayout = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const P = Number.parseFloat(startingPrincipal);
    const r_annual = Number.parseFloat(annualRate) / 100;
    const m = Number.parseFloat(payoutFrequency);
    const r_p = r_annual / m; // periodic rate

    if (calculationMode === "fixedLength") {
      // Mode A: Fixed Length - calculate PMT
      const n = Number.parseFloat(payoutYears);
      const N = n * m; // total number of payments

      let PMT: number;
      if (r_p === 0) {
        // Special case: no interest
        PMT = P / N;
      } else {
        // Standard annuity payout formula
        PMT = P * r_p / (1 - Math.pow(1 + r_p, -N));
      }
      const totalPayments = PMT * N;
      const totalInterest = totalPayments - P;

      // Generate payout schedule
      const schedule: PayoutScheduleEntry[] = [];
      let balance = P;
      for (let period = 1; period <= N && balance > 0.01; period++) {
        const interestEarned = balance * r_p;
        const payment = Math.min(PMT, balance + interestEarned);
        const endingBalance = Math.max(0, balance + interestEarned - payment);
        schedule.push({
          period,
          beginningBalance: balance,
          interestEarned,
          payment,
          endingBalance
        });
        balance = endingBalance;
      }
      setResults({
        paymentPerPeriod: PMT,
        totalPayments,
        totalInterest,
        schedule
      });
    } else {
      // Mode B: Fixed Payment Amount - calculate duration
      const PMT = Number.parseFloat(paymentAmount);
      if (PMT <= P * r_p) {
        // Payment is too small - fund will never deplete
        setResults({
          totalPayments: 0,
          totalInterest: 0,
          durationYears: 0,
          durationMonths: 0,
          schedule: []
        });
        return;
      }
      let N: number;
      if (r_p === 0) {
        // Special case: no interest
        N = P / PMT;
      } else {
        // Calculate of payments until depletion
        N = Math.log(PMT / (PMT - P * r_p)) / Math.log(1 + r_p);
      }
      const durationYears = Math.floor(N / m);
      const durationMonths = Math.round((N / m - durationYears) * 12);
      const totalPayments = PMT * N;
      const totalInterest = totalPayments - P;

      // Generate payout schedule
      const schedule: PayoutScheduleEntry[] = [];
      let balance = P;
      for (let period = 1; balance > 0.01; period++) {
        const interestEarned = balance * r_p;
        const payment = Math.min(PMT, balance + interestEarned);
        const endingBalance = Math.max(0, balance + interestEarned - payment);
        schedule.push({
          period,
          beginningBalance: balance,
          interestEarned,
          payment,
          endingBalance
        });
        balance = endingBalance;
      }
      setResults({
        totalPayments,
        totalInterest,
        durationYears,
        durationMonths,
        schedule
      });
    }
  };
  const downloadSchedule = () => {
    if (!results?.schedule.length) return;
    const headers = ["Period", "Beginning Balance", "Interest Earned", "Payment", "Ending Balance"];
    const csvContent = [headers.join(","), ...results.schedule.map(row => [row.period, row.beginningBalance.toFixed(2), row.interestEarned.toFixed(2), row.payment.toFixed(2), row.endingBalance.toFixed(2)].join(","))].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "annuity-payout-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-8 h-8 text-white" />
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
                    <span>{contentData.payout_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Calculation Mode */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">{contentData.calculation_mode_1}</Label>
                    <Tabs value={calculationMode} onValueChange={setCalculationMode} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="fixedLength">{contentData.fixed_length_2}</TabsTrigger>
                        <TabsTrigger value="fixedPayment">{contentData.fixed_payment_3}</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <Separator />

                  {/* Basic Inputs */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.annuity_details_4}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.starting_principal_5}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={startingPrincipal} onChange={e => setStartingPrincipal(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.annual_interest_rate_6}</Label>
                        <Input type="number" step="0.1" value={annualRate} onChange={e => setAnnualRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.payout_frequency_7}</Label>
                        <Select value={payoutFrequency} onValueChange={setPayoutFrequency}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">{contentData.annually_8}</SelectItem>
                            <SelectItem value="2">{contentData.semiannually_9}</SelectItem>
                            <SelectItem value="4">{contentData.quarterly_10}</SelectItem>
                            <SelectItem value="12">{contentData.monthly_11}</SelectItem>
                            <SelectItem value="24">{contentData.semimonthly_12}</SelectItem>
                            <SelectItem value="26">{contentData.biweekly_13}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {calculationMode === "fixedLength" ? <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.years_to_payout_14}</Label>
                          <Input type="number" value={payoutYears} onChange={e => setPayoutYears(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" />
                        </div> : <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.payment_amount_15}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" />
                          </div>
                        </div>}
                    </div>
                  </div>

                  <Button onClick={calculatePayout} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12">{contentData.calculate_16}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.payout_results_17}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_annuity_payout_breakdown_18}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Main Result */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        {calculationMode === "fixedLength" ? <>
                            <p className="text-lg mb-2 font-semibold text-green-800">{contentData.your_payment_per_period_19}</p>
                            <p className="text-4xl font-bold mb-2 text-green-700">
                              $
                              {results.paymentPerPeriod?.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </p>
                            <p className="text-sm text-green-600">
                              {getFrequencyLabel(payoutFrequency)}{contentData.for_20}{payoutYears}{contentData.years_21}</p>
                          </> : <>
                            <p className="text-lg mb-2 font-semibold text-green-800">{contentData.your_fund_will_last_22}</p>
                            <p className="text-4xl font-bold mb-2 text-green-700">
                              {results.durationYears}{contentData.years_23}{results.durationMonths}{contentData.months_24}</p>
                            <p className="text-sm text-green-600">{contentData.with_25}{Number.parseFloat(paymentAmount).toLocaleString()}{" "}
                              {getFrequencyLabel(payoutFrequency).toLowerCase()}{contentData.payments_26}</p>
                          </>}
                      </div>

                      {/* Summary Stats */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">{contentData.starting_principal_27}</span>
                          <span className="font-bold text-blue-600">
                            $
                            {Number.parseFloat(startingPrincipal).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium text-gray-700">{contentData.total_payments_28}</span>
                          <span className="font-bold text-purple-600">
                            $
                            {results.totalPayments.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">{contentData.total_interest_earned_29}</span>
                          <span className="font-bold text-orange-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                      </div>

                      {/* Download Schedule */}
                      {results.schedule.length > 0 && <Button onClick={downloadSchedule} variant="outline" className="w-full h-12 border-2 border-green-500 text-green-600 hover:bg-green-50 bg-transparent">
                          <Download className="w-4 h-4 mr-2" />{contentData.download_payout_schedule_csv_30}</Button>}
                    </div> : <div className="text-center py-12 text-gray-500">
                      <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_annuity_details_to_see_payout_results_31}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Payout Schedule Table */}
            {results?.schedule.length && <Card className="shadow-2xl border-0 p-0 bg-white mt-8">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.amortization_schedule_32}</CardTitle>
                  <CardDescription className="text-base">{contentData.detailed_breakdown_of_each_payment_period_showing__33}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{contentData.period_34}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{contentData.beginning_balance_35}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{contentData.interest_earned_36}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{contentData.payment_37}</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{contentData.ending_balance_38}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {results.schedule.slice(0, 12).map((row, index) => <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{row.period}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.beginningBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.interestEarned.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.payment.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.endingBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                  {results.schedule.length > 12 && <div className="px-6 py-4 bg-gray-50 border-t text-center text-sm text-gray-600">{contentData.showing_first_12_periods_of_39}{results.schedule.length}{contentData.total_periods_download_csv_for_complete_schedule_40}</div>}
                </CardContent>
              </Card>}

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Annuity Calculator",
            calculatorHref: "/financial/annuity-calculator",
            calculatorDescription: "Calculate values, payments, and accumulation periods"
          }, {
            calculatorName: "Savings Calculator",
            calculatorHref: "/financial/savings-calculator",
            calculatorDescription: "Track savings growth and plan for financial goals over time"
          }, {
            calculatorName: "401(k) Calculator Suite",
            calculatorHref: "/financial/401k-calculator",
            calculatorDescription: "Comprehensive 401(k) planning with retirement projections and optimization"
          }]} color="green" title="Related Financial Calculators" />

            {/* Educational Content */}
            <div className="mt-12 space-y-8">

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.calculation_formula_41}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.fixed_length_mode_42}</h3>
                      <p className="text-gray-700 mb-2">{contentData.calculate_amount_given_principal_rate_and_duration_43}</p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">{contentData.pmt_p_rp_1_1_rpn_44}</div>
                      <p className="text-sm text-gray-600 mt-2">{contentData.where_p_principal_rp_periodic_rate_n_total_payment_45}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.fixed_payment_mode_46}</h3>
                      <p className="text-gray-700 mb-2">{contentData.calculate_given_principal_rate_and_payment_amount_47}</p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">{contentData.n_lnpmt_pmt_p_rp_ln1_rp_48}</div>
                      <p className="text-sm text-gray-600 mt-2">{contentData.where_pmt_payment_amount_p_principal_rp_periodic_r_49}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <CalculatorGuide data={guideData} />
            </div>
          </div>
        </main>
      </div>
    </>;
}