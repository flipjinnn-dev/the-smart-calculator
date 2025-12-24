"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Calculator, RotateCcw, Heart, Calendar } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
export default function OvulationCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('ovulation-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('ovulation-calculator', language, "calculator-guide");

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
    "ovulation_calculation_0": "",
    "enter_your_menstrual_cycle_details_to_calculate_ov_1": "",
    "first_day_of_your_last_period_2": "",
    "average_length_of_cycle_3": "",
    "days_4": "",
    "average_menstrual_cycle_length_ranges_from_22_to_4_5": "",
    "calculate_6": "",
    "reset_7": "",
    "fertility_window_8": "",
    "most_probable_ovulation_9": "",
    "fertile_window_10": "",
    "enter_your_cycle_details_to_calculate_your_fertile_11": "",
    "your_ovulation_results_12": "",
    "current_cycle_13": "",
    "most_probable_ovulation_date_14": "",
    "ovulation_window_15": "",
    "best_intercourse_window_16": "",
    "important_dates_17": "",
    "pregnancy_test_date_18": "",
    "next_period_start_19": "",
    "due_date_if_pregnant_20": "",
    "next_6_cycles_forecast_21": "",
    "cycle_22": "",
    "cycle_start_23": "",
    "ovulation_date_24": "",
    "fertile_window_25": "",
    "next_period_26": "",
    "due_date_27": "",
    "understanding_ovulation_28": "",
    "how_it_works_29": "",
    "ovulation_typically_occurs_14_days_before_your_nex_30": "",
    "the_egg_survives_for_about_1224_hours_after_ovulat_31": "",
    "sperm_can_survive_in_the_reproductive_tract_for_up_32": "",
    "the_fertile_window_is_approximately_6_days_long_33": "",
    "best_times_for_conception_34": "",
    "highest_probability_35": "",
    "k_12_days_before_ovulation_36": "",
    "good_probability_37": "",
    "day_of_ovulation_38": "",
    "lower_probability_39": "",
    "k_35_days_before_ovulation_40": "",
    "very_low_41": "",
    "after_ovulation_day_42": "",
    "signs_of_ovulation_43": "",
    "changes_in_cervical_mucus_clear_stretchy_44": "",
    "slight_increase_in_basal_body_temperature_45": "",
    "mild_pelvic_or_abdominal_pain_46": "",
    "breast_tenderness_47": "",
    "increased_libido_48": "",
    "important_notes_49": "",
    "this_calculator_provides_estimates_based_on_averag_50": "",
    "actual_ovulation_can_vary_by_12_days_51": "",
    "stress_illness_and_lifestyle_can_affect_timing_52": "",
    "consult_healthcare_providers_for_fertility_concern_53": ""
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
  const [cycleLength, setCycleLength] = useState("");
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
  const calculateOvulation = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      const lmpDate = new Date(lastPeriodDate);
      const cycleLengthNum = Number.parseInt(cycleLength);

      // Core calculations
      const ovulationDay = cycleLengthNum - 14;
      const ovulationDate = new Date(lmpDate);
      ovulationDate.setDate(lmpDate.getDate() + ovulationDay - 1);

      // Ovulation window (2 days before to 2 days after)
      const ovulationWindowStart = new Date(ovulationDate);
      ovulationWindowStart.setDate(ovulationDate.getDate() - 2);
      const ovulationWindowEnd = new Date(ovulationDate);
      ovulationWindowEnd.setDate(ovulationDate.getDate() + 2);

      // Intercourse window (5 days before to 2 days after ovulation)
      const intercourseWindowStart = new Date(ovulationDate);
      intercourseWindowStart.setDate(ovulationDate.getDate() - 5);
      const intercourseWindowEnd = new Date(ovulationDate);
      intercourseWindowEnd.setDate(ovulationDate.getDate() + 2);

      // Pregnancy test date (7 days after ovulation)
      const pregnancyTestDate = new Date(ovulationDate);
      pregnancyTestDate.setDate(ovulationDate.getDate() + 7);

      // Next period start date
      const nextPeriodDate = new Date(lmpDate);
      nextPeriodDate.setDate(lmpDate.getDate() + cycleLengthNum);

      // Due date if pregnant (280 days from LMP)
      const dueDateIfPregnant = new Date(lmpDate);
      dueDateIfPregnant.setDate(lmpDate.getDate() + 280);

      // Calculate 6 cycles
      const futureCycles = [];
      for (let i = 1; i <= 6; i++) {
        const cycleStartDate = new Date(lmpDate);
        cycleStartDate.setDate(lmpDate.getDate() + cycleLengthNum * i);
        const cycleOvulationDate = new Date(cycleStartDate);
        cycleOvulationDate.setDate(cycleStartDate.getDate() + ovulationDay - 1);
        const cycleOvulationWindowStart = new Date(cycleOvulationDate);
        cycleOvulationWindowStart.setDate(cycleOvulationDate.getDate() - 2);
        const cycleOvulationWindowEnd = new Date(cycleOvulationDate);
        cycleOvulationWindowEnd.setDate(cycleOvulationDate.getDate() + 2);
        const cycleIntercourseWindowStart = new Date(cycleOvulationDate);
        cycleIntercourseWindowStart.setDate(cycleOvulationDate.getDate() - 5);
        const cycleIntercourseWindowEnd = new Date(cycleOvulationDate);
        cycleIntercourseWindowEnd.setDate(cycleOvulationDate.getDate() + 2);
        const cycleNextPeriodDate = new Date(cycleStartDate);
        cycleNextPeriodDate.setDate(cycleStartDate.getDate() + cycleLengthNum);
        const cycleDueDateIfPregnant = new Date(cycleStartDate);
        cycleDueDateIfPregnant.setDate(cycleStartDate.getDate() + 280);
        futureCycles.push({
          cycleNumber: i + 1,
          cycleStart: cycleStartDate,
          ovulationDate: cycleOvulationDate,
          ovulationWindow: `${formatDate(cycleOvulationWindowStart)} - ${formatDate(cycleOvulationWindowEnd)}`,
          intercourseWindow: `${formatDate(cycleIntercourseWindowStart)} - ${formatDate(cycleIntercourseWindowEnd)}`,
          nextPeriodDate: cycleNextPeriodDate,
          dueDateIfPregnant: cycleDueDateIfPregnant
        });
      }
      const results = {
        lmpDate,
        cycleLength: cycleLengthNum,
        ovulationDate,
        ovulationWindow: `${formatDate(ovulationWindowStart)} - ${formatDate(ovulationWindowEnd)}`,
        intercourseWindow: `${formatDate(intercourseWindowStart)} - ${formatDate(intercourseWindowEnd)}`,
        pregnancyTestDate,
        nextPeriodDate,
        dueDateIfPregnant,
        futureCycles
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating ovulation dates. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setLastPeriodDate("");
    setCycleLength("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };

  // Generate cycle length options (22-44 days)
  const cycleLengthOptions = [];
  for (let i = 22; i <= 44; i++) {
    cycleLengthOptions.push(i);
  }
  return <>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>{contentData.ovulation_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_menstrual_cycle_details_to_calculate_ov_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Last Period Date */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.first_day_of_your_last_period_2}</Label>
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
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.average_length_of_cycle_3}</Label>
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
                        <p className="text-xs text-gray-500 mt-1">{contentData.average_menstrual_cycle_length_ranges_from_22_to_4_5}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateOvulation} className="flex-1 h-12 text-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">{contentData.calculate_6}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-pink-300 text-pink-700 hover:bg-pink-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_7}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.fertility_window_8}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900 mb-2">{formatDate(result.ovulationDate)}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">{contentData.most_probable_ovulation_9}</p>
                          <p className="text-xs text-gray-500">{contentData.fertile_window_10}{result.ovulationWindow}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_cycle_details_to_calculate_your_fertile_11}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-pink-600" />
                      <span>{contentData.your_ovulation_results_12}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-700 mb-4 text-lg">{contentData.current_cycle_13}</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">{contentData.most_probable_ovulation_date_14}</span>
                            <p className="font-semibold text-pink-700">{formatDate(result.ovulationDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.ovulation_window_15}</span>
                            <p className="font-semibold text-pink-700">{result.ovulationWindow}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.best_intercourse_window_16}</span>
                            <p className="font-semibold text-pink-700">{result.intercourseWindow}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-4 text-lg">{contentData.important_dates_17}</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">{contentData.pregnancy_test_date_18}</span>
                            <p className="font-semibold text-blue-700">{formatDate(result.pregnancyTestDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.next_period_start_19}</span>
                            <p className="font-semibold text-blue-700">{formatDate(result.nextPeriodDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.due_date_if_pregnant_20}</span>
                            <p className="font-semibold text-blue-700">{formatDate(result.dueDateIfPregnant)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Future Cycles Table */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-4 text-lg">{contentData.next_6_cycles_forecast_21}</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-purple-200">
                              <th className="text-left py-2 px-2 text-purple-700">{contentData.cycle_22}</th>
                              <th className="text-left py-2 px-2 text-purple-700">{contentData.cycle_start_23}</th>
                              <th className="text-left py-2 px-2 text-purple-700">{contentData.ovulation_date_24}</th>
                              <th className="text-left py-2 px-2 text-purple-700">{contentData.fertile_window_25}</th>
                              <th className="text-left py-2 px-2 text-purple-700">{contentData.next_period_26}</th>
                              <th className="text-left py-2 px-2 text-purple-700">{contentData.due_date_27}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.futureCycles.map((cycle: any, index: number) => <tr key={index} className="border-b border-purple-100">
                                <td className="py-2 px-2 font-medium">{cycle.cycleNumber}</td>
                                <td className="py-2 px-2">{formatDate(cycle.cycleStart)}</td>
                                <td className="py-2 px-2 font-semibold text-pink-700">
                                  {formatDate(cycle.ovulationDate)}
                                </td>
                                <td className="py-2 px-2 text-xs">{cycle.ovulationWindow}</td>
                                <td className="py-2 px-2">{formatDate(cycle.nextPeriodDate)}</td>
                                <td className="py-2 px-2">{formatDate(cycle.dueDateIfPregnant)}</td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Conception Calculator",
          calculatorHref: "/health/conception-calculator",
        }, {
          calculatorName: "Period Calculator",
          calculatorHref: "/health/period-calculator",
        }, {
          calculatorName: "Pregnancy Weight Gain Calculator",
          calculatorHref: "/health/pregnancy-weight-gain-calculator",
        }
        ]} 
        color="pink" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.understanding_ovulation_28}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.how_it_works_29}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.ovulation_typically_occurs_14_days_before_your_nex_30}</li>
                          <li>{contentData.the_egg_survives_for_about_1224_hours_after_ovulat_31}</li>
                          <li>{contentData.sperm_can_survive_in_the_reproductive_tract_for_up_32}</li>
                          <li>{contentData.the_fertile_window_is_approximately_6_days_long_33}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.best_times_for_conception_34}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.highest_probability_35}</strong>{contentData.k_12_days_before_ovulation_36}</li>
                          <li>
                            <strong>{contentData.good_probability_37}</strong>{contentData.day_of_ovulation_38}</li>
                          <li>
                            <strong>{contentData.lower_probability_39}</strong>{contentData.k_35_days_before_ovulation_40}</li>
                          <li>
                            <strong>{contentData.very_low_41}</strong>{contentData.after_ovulation_day_42}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-rose-700 mb-3">{contentData.signs_of_ovulation_43}</h3>
                      <div className="bg-white p-4 rounded-lg border border-rose-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.changes_in_cervical_mucus_clear_stretchy_44}</li>
                          <li>{contentData.slight_increase_in_basal_body_temperature_45}</li>
                          <li>{contentData.mild_pelvic_or_abdominal_pain_46}</li>
                          <li>{contentData.breast_tenderness_47}</li>
                          <li>{contentData.increased_libido_48}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-rose-700 mb-3">{contentData.important_notes_49}</h3>
                      <div className="bg-white p-4 rounded-lg border border-rose-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.this_calculator_provides_estimates_based_on_averag_50}</li>
                          <li>{contentData.actual_ovulation_can_vary_by_12_days_51}</li>
                          <li>{contentData.stress_illness_and_lifestyle_can_affect_timing_52}</li>
                          <li>{contentData.consult_healthcare_providers_for_fertility_concern_53}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

           {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="ovulation-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <div className="mt-8">
              <CalculatorGuide data={guideData} />
          </div>
        </main>
      </div>
    </>;
}