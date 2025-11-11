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
import { Calculator, RotateCcw, Baby, Calendar } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
;
export default function ConceptionCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('conception-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('conception-calculator', language, "calculator-guide");

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
    "conception_calculation_0": "",
    "enter_your_menstrual_cycle_details_to_calculate_co_1": "",
    "first_day_of_your_last_menstrual_period_lmp_2": "",
    "average_length_of_menstrual_cycle_cl_3": "",
    "days_4": "",
    "average_menstrual_cycle_length_ranges_from_22_to_4_5": "",
    "calculate_6": "",
    "reset_7": "",
    "conception_window_8": "",
    "most_probable_conception_9": "",
    "peak_fertile_10": "",
    "enter_your_cycle_details_to_calculate_your_concept_11": "",
    "your_conception_results_12": "",
    "current_cycle_windows_13": "",
    "ovulation_date_14": "",
    "fertile_window_15": "",
    "peak_fertile_window_16": "",
    "possible_conception_dates_17": "",
    "most_probable_18": "",
    "peak_19": "",
    "due_20": "",
    "k_6cycle_forecast_21": "",
    "cycle_22": "",
    "ovulation_date_23": "",
    "fertile_window_24": "",
    "peak_fertile_window_25": "",
    "possible_conception_dates_26": "",
    "estimated_due_dates_27": "",
    "dates_28": "",
    "understanding_conception_29": "",
    "conception_probability_30": "",
    "sperm_can_survive_up_to_57_days_31": "",
    "before_ovulation_32": "",
    "the_last_3_days_of_fertile_window_33": "",
    "have_30_chance_of_conception_34": "",
    "conception_is_most_probable_on_ovulation_day_35": "",
    "any_intercourse_during_fertile_window_36": "",
    "may_result_in_pregnancy_37": "",
    "calculation_method_38": "",
    "ovulation_39": "",
    "lmp_cycle_length_14_days_40": "",
    "fertile_window_41": "",
    "ovulation_5_days_ovulation_42": "",
    "peak_fertile_43": "",
    "ovulation_2_days_ovulation_44": "",
    "due_date_45": "",
    "conception_date_266_days_46": "",
    "timing_for_conception_47": "",
    "best_timing_48": "",
    "k_12_days_before_ovulation_49": "",
    "good_timing_50": "",
    "day_of_ovulation_51": "",
    "moderate_timing_52": "",
    "k_35_days_before_ovulation_53": "",
    "low_probability_54": "",
    "after_ovulation_day_55": "",
    "important_notes_56": "",
    "this_calculator_provides_estimates_based_on_averag_57": "",
    "actual_conception_timing_can_vary_by_individual_58": "",
    "due_dates_are_estimates_using_naegeles_rule_59": "",
    "consult_healthcare_providers_for_personalized_advi_60": ""
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
  const calculateConception = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      const lmpDate = new Date(lastPeriodDate);
      const cycleLengthNum = Number.parseInt(cycleLength);

      // Core calculations
      const ovulationDay = cycleLengthNum - 14;
      const ovulationDate = new Date(lmpDate);
      ovulationDate.setDate(lmpDate.getDate() + ovulationDay - 1);

      // Fertile Window (Ovulation - 5 days to Ovulation)
      const fertileWindowStart = new Date(ovulationDate);
      fertileWindowStart.setDate(ovulationDate.getDate() - 5);
      const fertileWindowEnd = new Date(ovulationDate);

      // Peak Fertile Window (Ovulation - 2 days to Ovulation, 3 days total)
      const peakFertileWindowStart = new Date(ovulationDate);
      peakFertileWindowStart.setDate(ovulationDate.getDate() - 2);
      const peakFertileWindowEnd = new Date(ovulationDate);

      // Possible Conception Dates (any date in fertile window)
      const possibleConceptionDates = [];
      for (let i = 0; i <= 5; i++) {
        const conceptionDate = new Date(fertileWindowStart);
        conceptionDate.setDate(fertileWindowStart.getDate() + i);

        // Due date for each conception date (Conception + 266 days)
        const dueDate = new Date(conceptionDate);
        dueDate.setDate(conceptionDate.getDate() + 266);
        possibleConceptionDates.push({
          date: conceptionDate,
          dueDate: dueDate,
          isPeak: conceptionDate >= peakFertileWindowStart && conceptionDate <= peakFertileWindowEnd,
          isOvulation: conceptionDate.getTime() === ovulationDate.getTime()
        });
      }

      // Calculate 6 cycles
      const futureCycles = [];
      for (let i = 1; i <= 6; i++) {
        const cycleStartDate = new Date(lmpDate);
        cycleStartDate.setDate(lmpDate.getDate() + cycleLengthNum * i);
        const cycleOvulationDate = new Date(cycleStartDate);
        cycleOvulationDate.setDate(cycleStartDate.getDate() + ovulationDay - 1);
        const cycleFertileWindowStart = new Date(cycleOvulationDate);
        cycleFertileWindowStart.setDate(cycleOvulationDate.getDate() - 5);
        const cyclePeakFertileWindowStart = new Date(cycleOvulationDate);
        cyclePeakFertileWindowStart.setDate(cycleOvulationDate.getDate() - 2);

        // Possible conception dates for this cycle
        const cyclePossibleConceptionDates = [];
        for (let j = 0; j <= 5; j++) {
          const conceptionDate = new Date(cycleFertileWindowStart);
          conceptionDate.setDate(cycleFertileWindowStart.getDate() + j);
          const dueDate = new Date(conceptionDate);
          dueDate.setDate(conceptionDate.getDate() + 266);
          cyclePossibleConceptionDates.push({
            date: conceptionDate,
            dueDate: dueDate
          });
        }
        futureCycles.push({
          cycleNumber: i + 1,
          ovulationDate: cycleOvulationDate,
          fertileWindow: `${formatDate(cycleFertileWindowStart)} - ${formatDate(cycleOvulationDate)}`,
          peakFertileWindow: `${formatDate(cyclePeakFertileWindowStart)} - ${formatDate(cycleOvulationDate)}`,
          possibleConceptionDates: cyclePossibleConceptionDates,
          estimatedDueDates: `${formatDate(cyclePossibleConceptionDates[0].dueDate)} - ${formatDate(cyclePossibleConceptionDates[cyclePossibleConceptionDates.length - 1].dueDate)}`
        });
      }
      const results = {
        lmpDate,
        cycleLength: cycleLengthNum,
        ovulationDate,
        fertileWindow: `${formatDate(fertileWindowStart)} - ${formatDate(fertileWindowEnd)}`,
        peakFertileWindow: `${formatDate(peakFertileWindowStart)} - ${formatDate(peakFertileWindowEnd)}`,
        possibleConceptionDates,
        futureCycles
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating conception dates. Please check your inputs and try again."
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
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Baby className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>{contentData.conception_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_menstrual_cycle_details_to_calculate_co_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Last Period Date */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.first_day_of_your_last_menstrual_period_lmp_2}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.lastPeriodDate ? "border-red-300" : ""}`} type="date" value={lastPeriodDate} onChange={e => setLastPeriodDate(e.target.value)} />
                        </div>
                        {errors.lastPeriodDate && <p className="text-red-600 text-xs mt-1">{errors.lastPeriodDate}</p>}
                      </div>

                      {/* Cycle Length */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.average_length_of_menstrual_cycle_cl_3}</Label>
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
                      <Button onClick={calculateConception} className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">{contentData.calculate_6}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_7}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center mb-3 shadow-lg">
                      <Baby className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.conception_window_8}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-purple-200">
                          <p className="text-lg font-bold text-purple-900 mb-2">{formatDate(result.ovulationDate)}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">{contentData.most_probable_conception_9}</p>
                          <p className="text-xs text-gray-500">{contentData.peak_fertile_10}{result.peakFertileWindow}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Baby className="w-8 h-8 text-purple-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_cycle_details_to_calculate_your_concept_11}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <span>{contentData.your_conception_results_12}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-4 text-lg">{contentData.current_cycle_windows_13}</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">{contentData.ovulation_date_14}</span>
                            <p className="font-semibold text-purple-700">{formatDate(result.ovulationDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.fertile_window_15}</span>
                            <p className="font-semibold text-purple-700">{result.fertileWindow}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.peak_fertile_window_16}</span>
                            <p className="font-semibold text-purple-700">{result.peakFertileWindow}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-4 text-lg">{contentData.possible_conception_dates_17}</h4>
                        <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
                          {result.possibleConceptionDates.map((conception: any, index: number) => <div key={index} className={`p-2 rounded ${conception.isOvulation ? "bg-yellow-100 border border-yellow-300" : conception.isPeak ? "bg-green-100 border border-green-300" : "bg-gray-50"}`}>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  {formatDate(conception.date)}
                                  {conception.isOvulation && <span className="text-yellow-700 text-xs ml-1">{contentData.most_probable_18}</span>}
                                  {conception.isPeak && !conception.isOvulation && <span className="text-green-700 text-xs ml-1">{contentData.peak_19}</span>}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600">{contentData.due_20}{formatDate(conception.dueDate)}</div>
                            </div>)}
                        </div>
                      </div>
                    </div>

                    {/* Future Cycles Table */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-700 mb-4 text-lg">{contentData.k_6cycle_forecast_21}</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-indigo-200">
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.cycle_22}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.ovulation_date_23}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.fertile_window_24}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.peak_fertile_window_25}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.possible_conception_dates_26}</th>
                              <th className="text-left py-2 px-2 text-indigo-700">{contentData.estimated_due_dates_27}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.futureCycles.map((cycle: any, index: number) => <tr key={index} className="border-b border-indigo-100">
                                <td className="py-2 px-2 font-medium">{cycle.cycleNumber}</td>
                                <td className="py-2 px-2 font-semibold text-purple-700">
                                  {formatDate(cycle.ovulationDate)}
                                </td>
                                <td className="py-2 px-2 text-xs">{cycle.fertileWindow}</td>
                                <td className="py-2 px-2 text-xs">{cycle.peakFertileWindow}</td>
                                <td className="py-2 px-2 text-xs">{cycle.possibleConceptionDates.length}{contentData.dates_28}</td>
                                <td className="py-2 px-2 text-xs">{cycle.estimatedDueDates}</td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center mr-3 shadow-lg">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.understanding_conception_29}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.conception_probability_30}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.sperm_can_survive_up_to_57_days_31}</strong>{contentData.before_ovulation_32}</li>
                          <li>
                            <strong>{contentData.the_last_3_days_of_fertile_window_33}</strong>{contentData.have_30_chance_of_conception_34}</li>
                          <li>
                            <strong>{contentData.conception_is_most_probable_on_ovulation_day_35}</strong>
                          </li>
                          <li>
                            <strong>{contentData.any_intercourse_during_fertile_window_36}</strong>{contentData.may_result_in_pregnancy_37}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.calculation_method_38}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.ovulation_39}</strong>{contentData.lmp_cycle_length_14_days_40}</li>
                          <li>
                            <strong>{contentData.fertile_window_41}</strong>{contentData.ovulation_5_days_ovulation_42}</li>
                          <li>
                            <strong>{contentData.peak_fertile_43}</strong>{contentData.ovulation_2_days_ovulation_44}</li>
                          <li>
                            <strong>{contentData.due_date_45}</strong>{contentData.conception_date_266_days_46}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-violet-700 mb-3">{contentData.timing_for_conception_47}</h3>
                      <div className="bg-white p-4 rounded-lg border border-violet-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.best_timing_48}</strong>{contentData.k_12_days_before_ovulation_49}</li>
                          <li>
                            <strong>{contentData.good_timing_50}</strong>{contentData.day_of_ovulation_51}</li>
                          <li>
                            <strong>{contentData.moderate_timing_52}</strong>{contentData.k_35_days_before_ovulation_53}</li>
                          <li>
                            <strong>{contentData.low_probability_54}</strong>{contentData.after_ovulation_day_55}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-violet-700 mb-3">{contentData.important_notes_56}</h3>
                      <div className="bg-white p-4 rounded-lg border border-violet-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.this_calculator_provides_estimates_based_on_averag_57}</li>
                          <li>{contentData.actual_conception_timing_can_vary_by_individual_58}</li>
                          <li>{contentData.due_dates_are_estimates_using_naegeles_rule_59}</li>
                          <li>{contentData.consult_healthcare_providers_for_personalized_advi_60}</li>
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