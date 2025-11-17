"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Calculator, RotateCcw, Calendar, Heart } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function PeriodCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('period-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('period-calculator', language, "calculator-guide");

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
    "period_tracking_0": "",
    "enter_your_cycle_details_to_predict_your_next_peri_1": "",
    "first_day_of_your_last_period_lmp_2": "",
    "average_cycle_length_days_3": "",
    "days_4": "",
    "default_is_28_days_range_2244_days_5": "",
    "average_period_length_days_6": "",
    "days_7": "",
    "default_is_5_days_range_310_days_8": "",
    "calculate_9": "",
    "reset_10": "",
    "next_period_11": "",
    "expected_period_start_12": "",
    "cycle_length_13": "",
    "days_14": "",
    "enter_your_cycle_details_to_predict_your_next_peri_15": "",
    "your_period_results_16": "",
    "current_cycle_17": "",
    "next_period_start_18": "",
    "estimated_ovulation_19": "",
    "fertile_window_20": "",
    "cycle_information_21": "",
    "cycle_length_22": "",
    "days_23": "",
    "period_length_24": "",
    "days_25": "",
    "last_period_26": "",
    "k_6month_forecast_27": "",
    "month_28": "",
    "period_start_29": "",
    "period_end_30": "",
    "ovulation_31": "",
    "fertile_window_32": "",
    "understanding_your_cycle_33": "",
    "menstrual_cycle_phases_34": "",
    "menstrual_phase_35": "",
    "days_15_period_bleeding_36": "",
    "follicular_phase_37": "",
    "days_113_egg_development_38": "",
    "ovulation_39": "",
    "around_day_14_egg_release_40": "",
    "luteal_phase_41": "",
    "days_1528_preparation_for_pregnancy_42": "",
    "calculation_method_43": "",
    "next_period_44": "",
    "lmp_cycle_length_45": "",
    "ovulation_46": "",
    "lmp_cycle_length_14_47": "",
    "fertile_window_48": "",
    "ovulation_2_days_49": "",
    "forecast_50": "",
    "repeat_for_next_6_cycles_51": "",
    "fertility_timing_52": "",
    "most_fertile_53": "",
    "k_2_days_before_ovulation_54": "",
    "fertile_window_55": "",
    "k_5_days_total_around_ovulation_56": "",
    "sperm_survival_57": "",
    "up_to_5_days_in_reproductive_tract_58": "",
    "egg_survival_59": "",
    "k_1224_hours_after_ovulation_60": "",
    "important_notes_61": "",
    "this_calculator_provides_estimates_based_on_averag_62": "",
    "actual_cycles_can_vary_due_to_stress_illness_or_li_63": "",
    "track_your_cycle_for_3_months_for_better_accuracy_64": "",
    "consult_healthcare_providers_for_irregular_cycles_65": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!lastPeriodDate) {
      newErrors.lastPeriodDate = "Please select the first day of your last period";
    } else {
      const selectedDate = new Date(lastPeriodDate);
      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 30); // Allow up to 30 days in future

      if (selectedDate > maxDate) {
        newErrors.lastPeriodDate = "Date cannot be more than 30 days in the future";
      }
    }
    if (!cycleLength) {
      newErrors.cycleLength = "Please select your average cycle length";
    }
    if (!periodLength) {
      newErrors.periodLength = "Please select your average period length";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const calculatePeriod = () => {
    if (!validateInputs()) return;
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    try {
      const lmpDate = new Date(lastPeriodDate);
      const cycleLengthNum = Number.parseInt(cycleLength);
      const periodLengthNum = Number.parseInt(periodLength);

      // Core calculations
      const nextPeriodDate = new Date(lmpDate);
      nextPeriodDate.setDate(lmpDate.getDate() + cycleLengthNum);
      const ovulationDate = new Date(lmpDate);
      ovulationDate.setDate(lmpDate.getDate() + (cycleLengthNum - 14));

      // Fertile Window (Ovulation ± 2 days)
      const fertileWindowStart = new Date(ovulationDate);
      fertileWindowStart.setDate(ovulationDate.getDate() - 2);
      const fertileWindowEnd = new Date(ovulationDate);
      fertileWindowEnd.setDate(ovulationDate.getDate() + 2);

      // Calculate 6 cycles forecast
      const futureCycles = [];
      for (let i = 1; i <= 6; i++) {
        const cycleStartDate = new Date(lmpDate);
        cycleStartDate.setDate(lmpDate.getDate() + cycleLengthNum * i);
        const cycleEndDate = new Date(cycleStartDate);
        cycleEndDate.setDate(cycleStartDate.getDate() + periodLengthNum - 1);
        const cycleOvulationDate = new Date(cycleStartDate);
        cycleOvulationDate.setDate(cycleStartDate.getDate() + (cycleLengthNum - 14));
        const cycleFertileStart = new Date(cycleOvulationDate);
        cycleFertileStart.setDate(cycleOvulationDate.getDate() - 2);
        const cycleFertileEnd = new Date(cycleOvulationDate);
        cycleFertileEnd.setDate(cycleOvulationDate.getDate() + 2);
        futureCycles.push({
          cycleNumber: i + 1,
          periodStart: cycleStartDate,
          periodEnd: cycleEndDate,
          ovulationDate: cycleOvulationDate,
          fertileWindow: `${formatDate(cycleFertileStart)} - ${formatDate(cycleFertileEnd)}`,
          month: cycleStartDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
          })
        });
      }
      const results = {
        lmpDate,
        cycleLength: cycleLengthNum,
        periodLength: periodLengthNum,
        nextPeriodDate,
        ovulationDate,
        fertileWindowStart,
        fertileWindowEnd,
        fertileWindow: `${formatDate(fertileWindowStart)} - ${formatDate(fertileWindowEnd)}`,
        futureCycles
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating period dates. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setLastPeriodDate("");
    setCycleLength("28");
    setPeriodLength("5");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };

  // Generate cycle length options (22-44 days)
  const cycleLengthOptions = [];
  for (let i = 22; i <= 44; i++) {
    cycleLengthOptions.push(i);
  }

  // Generate period length options (3-10 days)
  const periodLengthOptions = [];
  for (let i = 3; i <= 10; i++) {
    periodLengthOptions.push(i);
  }
  return <>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>{contentData.period_tracking_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_cycle_details_to_predict_your_next_peri_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Last Period Date */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.first_day_of_your_last_period_lmp_2}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.lastPeriodDate ? "border-red-300" : ""}`} type="date" value={lastPeriodDate} onChange={e => setLastPeriodDate(e.target.value)} />
                        </div>
                        {errors.lastPeriodDate && <p className="text-red-600 text-xs mt-1">{errors.lastPeriodDate}</p>}
                      </div>

                      {/* Cycle Length */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.average_cycle_length_days_3}</Label>
                        <Select value={cycleLength} onValueChange={setCycleLength}>
                          <SelectTrigger className={`h-12 ${errors.cycleLength ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your cycle length" />
                          </SelectTrigger>
                          <SelectContent>
                            {cycleLengthOptions.map(days => <SelectItem key={days} value={days.toString()}>
                                {days}{contentData.days_4}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.cycleLength && <p className="text-red-600 text-xs mt-1">{errors.cycleLength}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.default_is_28_days_range_2244_days_5}</p>
                      </div>

                      {/* Period Length */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.average_period_length_days_6}</Label>
                        <Select value={periodLength} onValueChange={setPeriodLength}>
                          <SelectTrigger className={`h-12 ${errors.periodLength ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your period length" />
                          </SelectTrigger>
                          <SelectContent>
                            {periodLengthOptions.map(days => <SelectItem key={days} value={days.toString()}>
                                {days}{contentData.days_7}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.periodLength && <p className="text-red-600 text-xs mt-1">{errors.periodLength}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.default_is_5_days_range_310_days_8}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculatePeriod} className="h-12 px-8 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold shadow-lg">
                        <Calculator className="w-4 h-4 mr-2" />{contentData.calculate_9}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-pink-300 text-pink-700 hover:bg-pink-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_10}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.next_period_11}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900 mb-2">{formatDate(result.nextPeriodDate)}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">{contentData.expected_period_start_12}</p>
                          <p className="text-xs text-gray-500">{contentData.cycle_length_13}{result.cycleLength}{contentData.days_14}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_cycle_details_to_predict_your_next_peri_15}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-pink-600" />
                      <span>{contentData.your_period_results_16}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-700 mb-4 text-lg">{contentData.current_cycle_17}</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">{contentData.next_period_start_18}</span>
                            <p className="font-semibold text-pink-700">{formatDate(result.nextPeriodDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.estimated_ovulation_19}</span>
                            <p className="font-semibold text-pink-700">{formatDate(result.ovulationDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.fertile_window_20}</span>
                            <p className="font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                              {result.fertileWindow}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-4 text-lg">{contentData.cycle_information_21}</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">{contentData.cycle_length_22}</span>
                            <p className="font-semibold text-purple-700">{result.cycleLength}{contentData.days_23}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.period_length_24}</span>
                            <p className="font-semibold text-purple-700">{result.periodLength}{contentData.days_25}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.last_period_26}</span>
                            <p className="font-semibold text-purple-700">{formatDate(result.lmpDate)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Future Cycles Forecast */}
                    <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-700 mb-4 text-lg">{contentData.k_6month_forecast_27}</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-indigo-200">
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.month_28}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.period_start_29}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.period_end_30}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.ovulation_31}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.fertile_window_32}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.futureCycles.map((cycle: any, index: number) => <tr key={index} className="border-b border-indigo-100">
                                <td className="py-2 px-2 font-medium">{cycle.month}</td>
                                <td className="py-2 px-2 font-semibold text-pink-700">
                                  {formatDate(cycle.periodStart)}
                                </td>
                                <td className="py-2 px-2 text-pink-600">{formatDate(cycle.periodEnd)}</td>
                                <td className="py-2 px-2 font-semibold text-purple-700">
                                  {formatDate(cycle.ovulationDate)}
                                </td>
                                <td className="py-2 px-2 text-xs bg-green-50 text-green-700 rounded ">
                                  {cycle.fertileWindow}
                                </td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Pregnancy Due Date Calculator",
          calculatorHref: "/health/due-date-calculator",
        }, {
          calculatorName: "Pregnancy Calculator",
          calculatorHref: "/health/pregnancy-calculator",
        }, {
          calculatorName: "Pregnancy Conception Calculator",
          calculatorHref: "/health/pregnancy-conception-calculator",
        }
        ]} 
        color="pink" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.understanding_your_cycle_33}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.menstrual_cycle_phases_34}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.menstrual_phase_35}</strong>{contentData.days_15_period_bleeding_36}</li>
                          <li>
                            <strong>{contentData.follicular_phase_37}</strong>{contentData.days_113_egg_development_38}</li>
                          <li>
                            <strong>{contentData.ovulation_39}</strong>{contentData.around_day_14_egg_release_40}</li>
                          <li>
                            <strong>{contentData.luteal_phase_41}</strong>{contentData.days_1528_preparation_for_pregnancy_42}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.calculation_method_43}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.next_period_44}</strong>{contentData.lmp_cycle_length_45}</li>
                          <li>
                            <strong>{contentData.ovulation_46}</strong>{contentData.lmp_cycle_length_14_47}</li>
                          <li>
                            <strong>{contentData.fertile_window_48}</strong>{contentData.ovulation_2_days_49}</li>
                          <li>
                            <strong>{contentData.forecast_50}</strong>{contentData.repeat_for_next_6_cycles_51}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.fertility_timing_52}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.most_fertile_53}</strong>{contentData.k_2_days_before_ovulation_54}</li>
                          <li>
                            <strong>{contentData.fertile_window_55}</strong>{contentData.k_5_days_total_around_ovulation_56}</li>
                          <li>
                            <strong>{contentData.sperm_survival_57}</strong>{contentData.up_to_5_days_in_reproductive_tract_58}</li>
                          <li>
                            <strong>{contentData.egg_survival_59}</strong>{contentData.k_1224_hours_after_ovulation_60}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.important_notes_61}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.this_calculator_provides_estimates_based_on_averag_62}</li>
                          <li>{contentData.actual_cycles_can_vary_due_to_stress_illness_or_li_63}</li>
                          <li>{contentData.track_your_cycle_for_3_months_for_better_accuracy_64}</li>
                          <li>{contentData.consult_healthcare_providers_for_irregular_cycles_65}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-8">
            <CalculatorGuide data={guideData} />
          </div>
        </main>
      </div>
    </>;
}