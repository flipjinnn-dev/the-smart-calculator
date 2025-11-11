"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, DollarSign, Clock, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
type PayFrequency = "hourly" | "daily" | "weekly" | "biweekly" | "semimonthly" | "monthly" | "quarterly" | "yearly";
interface SalaryResults {
  unadjustedAnnual: number;
  adjustedAnnual: number;
  conversions: {
    hourly: {
      unadjusted: number;
      adjusted: number;
    };
    daily: {
      unadjusted: number;
      adjusted: number;
    };
    weekly: {
      unadjusted: number;
      adjusted: number;
    };
    biweekly: {
      unadjusted: number;
      adjusted: number;
    };
    semimonthly: {
      unadjusted: number;
      adjusted: number;
    };
    monthly: {
      unadjusted: number;
      adjusted: number;
    };
    quarterly: {
      unadjusted: number;
      adjusted: number;
    };
    yearly: {
      unadjusted: number;
      adjusted: number;
    };
  };
  workingDaysAdjusted: number;
}
export default function SalaryCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('salary-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('salary-calculator', language, "calculator-guide");

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
    "salary_calculator_0": "",
    "salary_information_1": "",
    "salary_amount_2": "",
    "pay_frequency_3": "",
    "hourly_4": "",
    "daily_5": "",
    "weekly_6": "",
    "biweekly_7": "",
    "semimonthly_8": "",
    "monthly_9": "",
    "quarterly_10": "",
    "yearly_11": "",
    "work_schedule_12": "",
    "hours_per_week_13": "",
    "days_per_week_14": "",
    "holidays_per_year_15": "",
    "vacation_days_per_year_16": "",
    "calculate_17": "",
    "salary_results_18": "",
    "your_salary_breakdown_and_conversions_19": "",
    "unadjusted_annual_20": "",
    "k_260_working_days_21": "",
    "adjusted_annual_22": "",
    "working_days_23": "",
    "pay_period_conversions_24": "",
    "period_25": "",
    "unadjusted_26": "",
    "adjusted_27": "",
    "assumptions_used_28": "",
    "k_52_working_weeks_per_year_29": "",
    "k_5_working_days_per_week_260_total_days_30": "",
    "holidays_vacation_days_31": "",
    "days_32": "",
    "adjusted_calculation_removes_nonworking_days_33": "",
    "enter_your_salary_information_to_see_conversions_34": "",
    "formulas_logic_35": "",
    "annual_salary_conversion_36": "",
    "hourly_37": "",
    "rate_hoursweek_52_weeks_38": "",
    "daily_39": "",
    "rate_260_days_40": "",
    "weekly_41": "",
    "rate_52_weeks_42": "",
    "biweekly_43": "",
    "rate_26_periods_44": "",
    "semimonthly_45": "",
    "rate_24_periods_46": "",
    "monthly_47": "",
    "rate_12_months_48": "",
    "quarterly_49": "",
    "rate_4_quarters_50": "",
    "adjusted_salary_51": "",
    "adjusted_annual_unadjusted_annual_working_days_aft_52": "",
    "working_days_260_holidays_vacation_days_53": "",
    "example_calculation_54": "",
    "if_rate_25hour_40_hoursweek_25_days_off_55": "",
    "unadjusted_annual_25_40_52_52000_56": "",
    "working_days_260_25_235_days_57": "",
    "adjusted_annual_52000_235_260_47000_58": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Input states
  const [salaryAmount, setSalaryAmount] = useState("50000");
  const [frequency, setFrequency] = useState<PayFrequency>("yearly");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [holidaysPerYear, setHolidaysPerYear] = useState("10");
  const [vacationDays, setVacationDays] = useState("15");
  const [results, setResults] = useState<SalaryResults | null>(null);
  const calculateSalary = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const rate = Number.parseFloat(salaryAmount);
    const hrsPerWeek = Number.parseFloat(hoursPerWeek);
    const daysPerWeekNum = Number.parseFloat(daysPerWeek);
    const holidays = Number.parseFloat(holidaysPerYear);
    const vacation = Number.parseFloat(vacationDays);

    // Constants
    const daysInYear = 260; // 52 weeks × 5 days
    const workingDaysAdjusted = daysInYear - (holidays + vacation);

    // Step 1: Calculate Unadjusted Salary
    let unadjustedAnnual: number;
    switch (frequency) {
      case "hourly":
        unadjustedAnnual = rate * hrsPerWeek * 52;
        break;
      case "daily":
        unadjustedAnnual = rate * daysInYear;
        break;
      case "weekly":
        unadjustedAnnual = rate * 52;
        break;
      case "biweekly":
        unadjustedAnnual = rate * 26;
        break;
      case "semimonthly":
        unadjustedAnnual = rate * 24;
        break;
      case "monthly":
        unadjustedAnnual = rate * 12;
        break;
      case "quarterly":
        unadjustedAnnual = rate * 4;
        break;
      case "yearly":
        unadjustedAnnual = rate;
        break;
      default:
        unadjustedAnnual = rate;
    }

    // Step 2: Calculate Adjusted Salary
    const adjustedAnnual = unadjustedAnnual * (workingDaysAdjusted / daysInYear);

    // Step 3: Convert to Other Frequencies
    const conversions = {
      hourly: {
        unadjusted: unadjustedAnnual / (daysPerWeekNum * hrsPerWeek * 52),
        adjusted: adjustedAnnual / (daysPerWeekNum * hrsPerWeek * 52)
      },
      daily: {
        unadjusted: unadjustedAnnual / daysInYear,
        adjusted: adjustedAnnual / workingDaysAdjusted
      },
      weekly: {
        unadjusted: unadjustedAnnual / 52,
        adjusted: adjustedAnnual / 52
      },
      biweekly: {
        unadjusted: unadjustedAnnual / 26,
        adjusted: adjustedAnnual / 26
      },
      semimonthly: {
        unadjusted: unadjustedAnnual / 24,
        adjusted: adjustedAnnual / 24
      },
      monthly: {
        unadjusted: unadjustedAnnual / 12,
        adjusted: adjustedAnnual / 12
      },
      quarterly: {
        unadjusted: unadjustedAnnual / 4,
        adjusted: adjustedAnnual / 4
      },
      yearly: {
        unadjusted: unadjustedAnnual,
        adjusted: adjustedAnnual
      }
    };
    setResults({
      unadjustedAnnual,
      adjustedAnnual,
      conversions,
      workingDaysAdjusted
    });
  };
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const getFrequencyLabel = (freq: string) => {
    const labels: Record<string, string> = {
      hourly: "Hourly",
      daily: "Daily",
      weekly: "Weekly",
      biweekly: "Bi-weekly",
      semimonthly: "Semi-monthly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      yearly: "Yearly"
    };
    return labels[freq] || freq;
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>{contentData.salary_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Salary Input */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.salary_information_1}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.salary_amount_2}</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" value={salaryAmount} onChange={e => setSalaryAmount(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-blue-500" placeholder="50000" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.pay_frequency_3}</Label>
                        <Select value={frequency} onValueChange={(value: PayFrequency) => setFrequency(value)}>
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">{contentData.hourly_4}</SelectItem>
                            <SelectItem value="daily">{contentData.daily_5}</SelectItem>
                            <SelectItem value="weekly">{contentData.weekly_6}</SelectItem>
                            <SelectItem value="biweekly">{contentData.biweekly_7}</SelectItem>
                            <SelectItem value="semimonthly">{contentData.semimonthly_8}</SelectItem>
                            <SelectItem value="monthly">{contentData.monthly_9}</SelectItem>
                            <SelectItem value="quarterly">{contentData.quarterly_10}</SelectItem>
                            <SelectItem value="yearly">{contentData.yearly_11}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Work Schedule */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.work_schedule_12}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(frequency === "hourly" || frequency === "daily") && <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.hours_per_week_13}</Label>
                          <Input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" placeholder="40" />
                        </div>}

                      {frequency === "daily" && <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.days_per_week_14}</Label>
                          <Input type="number" value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" placeholder="5" />
                        </div>}

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.holidays_per_year_15}</Label>
                        <Input type="number" value={holidaysPerYear} onChange={e => setHolidaysPerYear(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" placeholder="10" />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.vacation_days_per_year_16}</Label>
                        <Input type="number" value={vacationDays} onChange={e => setVacationDays(e.target.value)} className="h-12 text-lg border-2 focus:border-blue-500" placeholder="15" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateSalary} className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12">{contentData.calculate_17}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.salary_results_18}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_salary_breakdown_and_conversions_19}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Annual Salary Comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                          <p className="text-lg mb-2 font-semibold text-blue-800">{contentData.unadjusted_annual_20}</p>
                          <p className="text-3xl font-bold text-blue-700">{formatCurrency(results.unadjustedAnnual)}</p>
                          <p className="text-sm text-blue-600 mt-1">{contentData.k_260_working_days_21}</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                          <p className="text-lg mb-2 font-semibold text-green-800">{contentData.adjusted_annual_22}</p>
                          <p className="text-3xl font-bold text-green-700">{formatCurrency(results.adjustedAnnual)}</p>
                          <p className="text-sm text-green-600 mt-1">{results.workingDaysAdjusted}{contentData.working_days_23}</p>
                        </div>
                      </div>

                      {/* Conversion Table */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{contentData.pay_period_conversions_24}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-2 font-semibold text-gray-900">{contentData.period_25}</th>
                                <th className="text-right py-2 font-semibold text-blue-600">{contentData.unadjusted_26}</th>
                                <th className="text-right py-2 font-semibold text-green-600">{contentData.adjusted_27}</th>
                              </tr>
                            </thead>
                            <tbody className="space-y-1">
                              {Object.entries(results.conversions).map(([period, values]) => <tr key={period} className="border-b border-gray-100">
                                  <td className="py-3 font-medium text-gray-700">{getFrequencyLabel(period)}</td>
                                  <td className="py-3 text-right text-blue-600 font-semibold">
                                    {formatCurrency(values.unadjusted)}
                                  </td>
                                  <td className="py-3 text-right text-green-600 font-semibold">
                                    {formatCurrency(values.adjusted)}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Assumptions */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">{contentData.assumptions_used_28}</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>{contentData.k_52_working_weeks_per_year_29}</li>
                          <li>{contentData.k_5_working_days_per_week_260_total_days_30}</li>
                          <li>{contentData.holidays_vacation_days_31}{" "}
                            {Number.parseFloat(holidaysPerYear) + Number.parseFloat(vacationDays)}{contentData.days_32}</li>
                          <li>{contentData.adjusted_calculation_removes_nonworking_days_33}</li>
                        </ul>
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_salary_information_to_see_conversions_34}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators calculators={[{
              calculatorName: "Investment Calculator",
              calculatorHref: "/financial/investment-calculator",
              calculatorDescription: "Plan your investment strategy and see how your portfolio can grow over time."
            }, {
              calculatorName: "Time Value of Money Calculator",
              calculatorHref: "/financial/finance-calculator",
              calculatorDescription: "Calculate and future values, analyze investment returns, and make informed financial decisions."
            }, {
              calculatorName: "Savings Calculator",
              calculatorHref: "/financial/savings-calculator",
              calculatorDescription: "Calculate your savings grow over time with compound interest and regular contributions."
            }]} color="blue" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_logic_35}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.annual_salary_conversion_36}</h3>
                      <ul className="text-gray-700 space-y-1 ml-4">
                        <li>
                          • <strong>{contentData.hourly_37}</strong>{contentData.rate_hoursweek_52_weeks_38}</li>
                        <li>
                          • <strong>{contentData.daily_39}</strong>{contentData.rate_260_days_40}</li>
                        <li>
                          • <strong>{contentData.weekly_41}</strong>{contentData.rate_52_weeks_42}</li>
                        <li>
                          • <strong>{contentData.biweekly_43}</strong>{contentData.rate_26_periods_44}</li>
                        <li>
                          • <strong>{contentData.semimonthly_45}</strong>{contentData.rate_24_periods_46}</li>
                        <li>
                          • <strong>{contentData.monthly_47}</strong>{contentData.rate_12_months_48}</li>
                        <li>
                          • <strong>{contentData.quarterly_49}</strong>{contentData.rate_4_quarters_50}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.adjusted_salary_51}</h3>
                      <p className="text-gray-700">{contentData.adjusted_annual_unadjusted_annual_working_days_aft_52}</p>
                      <p className="text-gray-700 mt-2">{contentData.working_days_260_holidays_vacation_days_53}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.example_calculation_54}</h3>
                      <p className="text-gray-700">{contentData.if_rate_25hour_40_hoursweek_25_days_off_55}</p>
                      <ul className="text-gray-700 space-y-1 ml-4 mt-2">
                        <li>{contentData.unadjusted_annual_25_40_52_52000_56}</li>
                        <li>{contentData.working_days_260_25_235_days_57}</li>
                        <li>{contentData.adjusted_annual_52000_235_260_47000_58}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              <CalculatorGuide data={guideData} />
            </div>
          </div>
        </main>
      </div>
    </>;
}