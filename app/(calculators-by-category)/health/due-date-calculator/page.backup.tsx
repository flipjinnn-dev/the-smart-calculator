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
import { Calculator, RotateCcw, Calendar, Baby, Heart, Clock } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
;
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
export default function DueDateCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('due-date-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('due-date-calculator', language, "calculator-guide");

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
    "due_date_calculation_0": "",
    "select_your_preferred_method_and_enter_the_require_1": "",
    "calculation_method_2": "",
    "last_menstrual_period_lmp_3": "",
    "ultrasound_dating_4": "",
    "conception_date_5": "",
    "ivf_transfer_date_6": "",
    "first_day_of_last_menstrual_period_7": "",
    "average_cycle_length_days_8": "",
    "typical_range_2135_days_9": "",
    "date_of_ultrasound_scan_10": "",
    "gestational_age_weeks_11": "",
    "additional_days_12": "",
    "approximate_conception_date_13": "",
    "embryo_transfer_date_14": "",
    "embryo_age_at_transfer_15": "",
    "k_3day_embryo_16": "",
    "k_5day_embryo_blastocyst_17": "",
    "k_6day_embryo_18": "",
    "calculate_date_19": "",
    "reset_20": "",
    "due_date_21": "",
    "expected_due_date_22": "",
    "w_23": "",
    "d_24": "",
    "current_age_25": "",
    "select_a_method_and_enter_your_information_to_calc_26": "",
    "your_pregnancy_timeline_27": "",
    "estimated_due_date_28": "",
    "expected_due_date_29": "",
    "w_30": "",
    "d_31": "",
    "current_gestational_age_32": "",
    "pregnancy_progress_33": "",
    "calculation_details_34": "",
    "method_used_35": "",
    "accuracy_36": "",
    "important_note_37": "",
    "only_4_of_babies_arrive_on_the_exact_due_date_38": "",
    "most_births_occur_within_10_days_of_edd_39": "",
    "pregnancy_progress_40": "",
    "conception_41": "",
    "complete_42": "",
    "due_date_43": "",
    "due_date_calculation_methods_44": "",
    "method_45": "",
    "formula_46": "",
    "accuracy_47": "",
    "lmp_naegeles_rule_48": "",
    "lmp_280_days_49": "",
    "k_14_days_50": "",
    "conception_date_51": "",
    "conception_266_days_52": "",
    "k_10_days_53": "",
    "ultrasound_dating_54": "",
    "scan_date_280_ga_at_scan_55": "",
    "k_7_days_early_scan_56": "",
    "ivf_transfer_57": "",
    "transfer_261264_days_58": "",
    "k_5_days_59": "",
    "understanding_due_date_calculations_60": "",
    "method_accuracy_61": "",
    "ivf_transfer_62": "",
    "most_accurate_5_days_63": "",
    "early_ultrasound_64": "",
    "very_accurate_7_days_65": "",
    "conception_date_66": "",
    "good_accuracy_10_days_67": "",
    "lmp_method_68": "",
    "standard_method_14_days_69": "",
    "example_calculation_70": "",
    "lmp_january_1_2025_28day_cycle_71": "",
    "formula_lmp_280_days_72": "",
    "due_date_73": "",
    "october_8_2025_74": "",
    "current_feb_1_75": "",
    "k_4w_3d_pregnant_76": "",
    "important_facts_77": "",
    "only_4_of_babies_arrive_on_exact_due_date_78": "",
    "k_3742_weeks_is_considered_fullterm_79": "",
    "first_babies_often_arrive_12_days_late_80": "",
    "cycle_length_affects_lmp_calculations_81": "",
    "when_to_use_each_method_82": "",
    "lmp_83": "",
    "regular_cycles_known_lmp_date_84": "",
    "ultrasound_85": "",
    "irregular_cycles_uncertain_lmp_86": "",
    "conception_87": "",
    "known_ovulationconception_date_88": "",
    "ivf_89": "",
    "assisted_reproductive_technology_90": ""
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
  const [method, setMethod] = useState("lmp");
  const [lmpDate, setLmpDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [ultrasoundDate, setUltrasoundDate] = useState("");
  const [gestationalWeeks, setGestationalWeeks] = useState("");
  const [gestationalDays, setGestationalDays] = useState("0");
  const [conceptionDate, setConceptionDate] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [embryoAge, setEmbryoAge] = useState("5");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (method === "lmp") {
      if (!lmpDate) {
        newErrors.lmpDate = "Last menstrual period date is required";
      }
      if (!cycleLength || isNaN(Number(cycleLength)) || Number(cycleLength) < 21 || Number(cycleLength) > 35) {
        newErrors.cycleLength = "Cycle length must be between 21-35 days";
      }
    } else if (method === "ultrasound") {
      if (!ultrasoundDate) {
        newErrors.ultrasoundDate = "Ultrasound date is required";
      }
      if (!gestationalWeeks || isNaN(Number(gestationalWeeks)) || Number(gestationalWeeks) < 4 || Number(gestationalWeeks) > 42) {
        newErrors.gestationalWeeks = "Gestational weeks must be between 4-42";
      }
      if (isNaN(Number(gestationalDays)) || Number(gestationalDays) < 0 || Number(gestationalDays) > 6) {
        newErrors.gestationalDays = "Gestational days must be between 0-6";
      }
    } else if (method === "conception") {
      if (!conceptionDate) {
        newErrors.conceptionDate = "Conception date is required";
      }
    } else if (method === "ivf") {
      if (!transferDate) {
        newErrors.transferDate = "Transfer date is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateDueDate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      let edd: Date;
      let calculationMethod = "";
      let accuracy = "";
      const today = new Date();
      if (method === "lmp") {
        // LMP Method (Naegele's Rule)
        const lmp = new Date(lmpDate);
        const cycle = Number(cycleLength);

        // Standard 280 days, adjusted for cycle length
        const adjustmentDays = cycle - 28;
        edd = new Date(lmp.getTime() + (280 + adjustmentDays) * 24 * 60 * 60 * 1000);
        calculationMethod = "Last Menstrual Period (Naegele's Rule)";
        accuracy = "±14 days";
      } else if (method === "ultrasound") {
        // Ultrasound Method
        const scanDate = new Date(ultrasoundDate);
        const weeks = Number(gestationalWeeks);
        const days = Number(gestationalDays);
        const totalDaysAtScan = weeks * 7 + days;
        const remainingDays = 280 - totalDaysAtScan;
        edd = new Date(scanDate.getTime() + remainingDays * 24 * 60 * 60 * 1000);
        calculationMethod = "Ultrasound Dating";
        accuracy = "±7 days (if early scan)";
      } else if (method === "conception") {
        // Conception Date Method
        const conception = new Date(conceptionDate);
        edd = new Date(conception.getTime() + 266 * 24 * 60 * 60 * 1000);
        calculationMethod = "Conception Date";
        accuracy = "±10 days";
      } else if (method === "ivf") {
        // IVF Transfer Method
        const transfer = new Date(transferDate);
        const embryoDays = Number(embryoAge);
        let daysToAdd: number;
        if (embryoDays === 3) {
          daysToAdd = 261;
        } else if (embryoDays === 5) {
          daysToAdd = 263;
        } else {
          daysToAdd = 264; // 6-day embryo
        }
        edd = new Date(transfer.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
        calculationMethod = `IVF Transfer (Day-${embryoDays} embryo)`;
        accuracy = "±5 days";
      }

      // Calculate gestational age
      let gestationalAgeToday: {
        weeks: number;
        days: number;
      };
      let pregnancyProgress: number;
      if (method === "lmp") {
        const lmp = new Date(lmpDate);
        const daysSinceLmp = Math.floor((today.getTime() - lmp.getTime()) / (24 * 60 * 60 * 1000));
        const cycle = Number(cycleLength);
        const adjustedDays = daysSinceLmp + (cycle - 28);
        gestationalAgeToday = {
          weeks: Math.floor(adjustedDays / 7),
          days: adjustedDays % 7
        };
        pregnancyProgress = adjustedDays / 280 * 100;
      } else if (method === "conception") {
        const conception = new Date(conceptionDate);
        const daysSinceConception = Math.floor((today.getTime() - conception.getTime()) / (24 * 60 * 60 * 1000));
        const gestationalDays = daysSinceConception + 14; // Add 2 weeks to convert from conception age

        gestationalAgeToday = {
          weeks: Math.floor(gestationalDays / 7),
          days: gestationalDays % 7
        };
        pregnancyProgress = gestationalDays / 280 * 100;
      } else {
        // For ultrasound and IVF, calculate from EDD
        const daysUntilEdd = Math.floor((edd!.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
        const currentGestationalDays = 280 - daysUntilEdd;
        gestationalAgeToday = {
          weeks: Math.floor(currentGestationalDays / 7),
          days: currentGestationalDays % 7
        };
        pregnancyProgress = currentGestationalDays / 280 * 100;
      }

      // Ensure progress doesn't exceed 100%
      pregnancyProgress = Math.min(pregnancyProgress, 100);
      setResult({
        edd: edd!,
        gestationalAge: gestationalAgeToday,
        pregnancyProgress: Math.max(0, pregnancyProgress),
        method: calculationMethod,
        accuracy: accuracy,
        inputs: {
          method,
          lmpDate,
          cycleLength,
          ultrasoundDate,
          gestationalWeeks,
          gestationalDays,
          conceptionDate,
          transferDate,
          embryoAge
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating due date. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setMethod("lmp");
    setLmpDate("");
    setCycleLength("28");
    setUltrasoundDate("");
    setGestationalWeeks("");
    setGestationalDays("0");
    setConceptionDate("");
    setTransferDate("");
    setEmbryoAge("5");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0  border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>{contentData.due_date_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.select_your_preferred_method_and_enter_the_require_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    {/* Method Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.calculation_method_2}</Label>
                        <Select value={method} onValueChange={setMethod}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lmp">{contentData.last_menstrual_period_lmp_3}</SelectItem>
                            <SelectItem value="ultrasound">{contentData.ultrasound_dating_4}</SelectItem>
                            <SelectItem value="conception">{contentData.conception_date_5}</SelectItem>
                            <SelectItem value="ivf">{contentData.ivf_transfer_date_6}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Dynamic Input Fields */}
                    <div className="space-y-6 mb-8">
                      {method === "lmp" && <>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.first_day_of_last_menstrual_period_7}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.lmpDate ? "border-red-300" : ""}`} type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} />
                            </div>
                            {errors.lmpDate && <p className="text-red-600 text-xs mt-1">{errors.lmpDate}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.average_cycle_length_days_8}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Clock className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.cycleLength ? "border-red-300" : ""}`} type="text" placeholder="28" value={cycleLength} onChange={e => setCycleLength(e.target.value)} />
                            </div>
                            {errors.cycleLength && <p className="text-red-600 text-xs mt-1">{errors.cycleLength}</p>}
                            <p className="text-xs text-gray-500 mt-1">{contentData.typical_range_2135_days_9}</p>
                          </div>
                        </>}

                      {method === "ultrasound" && <>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.date_of_ultrasound_scan_10}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.ultrasoundDate ? "border-red-300" : ""}`} type="date" value={ultrasoundDate} onChange={e => setUltrasoundDate(e.target.value)} />
                            </div>
                            {errors.ultrasoundDate && <p className="text-red-600 text-xs mt-1">{errors.ultrasoundDate}</p>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.gestational_age_weeks_11}</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Baby className="h-5 w-5 text-purple-500" />
                                </div>
                                <Input className={`h-12 pl-10 ${errors.gestationalWeeks ? "border-red-300" : ""}`} type="text" placeholder="12" value={gestationalWeeks} onChange={e => setGestationalWeeks(e.target.value)} />
                              </div>
                              {errors.gestationalWeeks && <p className="text-red-600 text-xs mt-1">{errors.gestationalWeeks}</p>}
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.additional_days_12}</Label>
                              <div className="relative">
                                <Input className={`h-12 ${errors.gestationalDays ? "border-red-300" : ""}`} type="text" placeholder="0" value={gestationalDays} onChange={e => setGestationalDays(e.target.value)} />
                              </div>
                              {errors.gestationalDays && <p className="text-red-600 text-xs mt-1">{errors.gestationalDays}</p>}
                            </div>
                          </div>
                        </>}

                      {method === "conception" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.approximate_conception_date_13}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-purple-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.conceptionDate ? "border-red-300" : ""}`} type="date" value={conceptionDate} onChange={e => setConceptionDate(e.target.value)} />
                          </div>
                          {errors.conceptionDate && <p className="text-red-600 text-xs mt-1">{errors.conceptionDate}</p>}
                        </div>}

                      {method === "ivf" && <>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.embryo_transfer_date_14}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.transferDate ? "border-red-300" : ""}`} type="date" value={transferDate} onChange={e => setTransferDate(e.target.value)} />
                            </div>
                            {errors.transferDate && <p className="text-red-600 text-xs mt-1">{errors.transferDate}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.embryo_age_at_transfer_15}</Label>
                            <Select value={embryoAge} onValueChange={setEmbryoAge}>
                              <SelectTrigger className="h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">{contentData.k_3day_embryo_16}</SelectItem>
                                <SelectItem value="5">{contentData.k_5day_embryo_blastocyst_17}</SelectItem>
                                <SelectItem value="6">{contentData.k_6day_embryo_18}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>}
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateDueDate} className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800">{contentData.calculate_date_19}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_20}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mb-3 shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.due_date_21}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <p className="text-lg font-bold text-purple-900">{formatDate(result.edd)}</p>
                          <p className="text-gray-600 text-sm">{contentData.expected_due_date_22}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <p className="text-lg font-bold text-purple-900">
                            {result.gestationalAge.weeks}{contentData.w_23}{result.gestationalAge.days}{contentData.d_24}</p>
                          <p className="text-gray-600 text-sm">{contentData.current_age_25}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Calendar className="w-8 h-8 text-purple-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.select_a_method_and_enter_your_information_to_calc_26}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <span>{contentData.your_pregnancy_timeline_27}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Main Results */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">{contentData.estimated_due_date_28}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-700 mb-2">{formatDate(result.edd)}</p>
                          <p className="text-lg text-gray-600">{contentData.expected_due_date_29}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-700 mb-2">
                            {result.gestationalAge.weeks}{contentData.w_30}{result.gestationalAge.days}{contentData.d_31}</p>
                          <p className="text-lg text-gray-600">{contentData.current_gestational_age_32}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-700 mb-2">
                            {result.pregnancyProgress.toFixed(1)}%
                          </p>
                          <p className="text-lg text-gray-600">{contentData.pregnancy_progress_33}</p>
                        </div>
                      </div>
                    </div>

                    {/* Method Information */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">{contentData.calculation_details_34}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-700 mb-3">{contentData.method_used_35}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{result.method}</strong>
                            </p>
                            <p className="text-xs text-gray-600">{contentData.accuracy_36}{result.accuracy}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                          <h4 className="font-semibold text-violet-700 mb-3">{contentData.important_note_37}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>{contentData.only_4_of_babies_arrive_on_the_exact_due_date_38}</p>
                            <p className="text-xs text-gray-600">{contentData.most_births_occur_within_10_days_of_edd_39}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4">{contentData.pregnancy_progress_40}</h3>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-gradient-to-r from-purple-600 to-violet-600 h-4 rounded-full transition-all duration-500" style={{
                      width: `${Math.min(result.pregnancyProgress, 100)}%`
                    }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{contentData.conception_41}</span>
                        <span>{result.pregnancyProgress.toFixed(1)}{contentData.complete_42}</span>
                        <span>{contentData.due_date_43}</span>
                      </div>
                    </div>

                    {/* Method Comparison Table */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-purple-700 mb-6">{contentData.due_date_calculation_methods_44}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-purple-200 rounded-lg">
                          <thead>
                            <tr className="bg-gradient-to-r from-purple-50 to-violet-50">
                              <th className="border border-purple-200 p-3 text-left font-semibold text-purple-700">{contentData.method_45}</th>
                              <th className="border border-purple-200 p-3 text-center font-semibold text-purple-700">{contentData.formula_46}</th>
                              <th className="border border-purple-200 p-3 text-center font-semibold text-purple-700">{contentData.accuracy_47}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={result.method.includes("Last Menstrual") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">{contentData.lmp_naegeles_rule_48}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.lmp_280_days_49}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.k_14_days_50}</td>
                            </tr>
                            <tr className={result.method.includes("Conception") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">{contentData.conception_date_51}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.conception_266_days_52}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.k_10_days_53}</td>
                            </tr>
                            <tr className={result.method.includes("Ultrasound") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">{contentData.ultrasound_dating_54}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.scan_date_280_ga_at_scan_55}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.k_7_days_early_scan_56}</td>
                            </tr>
                            <tr className={result.method.includes("IVF") ? "bg-purple-25" : ""}>
                              <td className="border border-purple-200 p-3 font-medium">{contentData.ivf_transfer_57}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.transfer_261264_days_58}</td>
                              <td className="border border-purple-200 p-3 text-center">{contentData.k_5_days_59}</td>
                            </tr>
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.understanding_due_date_calculations_60}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.method_accuracy_61}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.ivf_transfer_62}</strong>{contentData.most_accurate_5_days_63}</li>
                          <li>
                            <strong>{contentData.early_ultrasound_64}</strong>{contentData.very_accurate_7_days_65}</li>
                          <li>
                            <strong>{contentData.conception_date_66}</strong>{contentData.good_accuracy_10_days_67}</li>
                          <li>
                            <strong>{contentData.lmp_method_68}</strong>{contentData.standard_method_14_days_69}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.example_calculation_70}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.lmp_january_1_2025_28day_cycle_71}</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{contentData.formula_lmp_280_days_72}</p>
                          <p>{contentData.due_date_73}<strong>{contentData.october_8_2025_74}</strong>
                          </p>
                          <p>{contentData.current_feb_1_75}<strong>{contentData.k_4w_3d_pregnant_76}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.important_facts_77}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.only_4_of_babies_arrive_on_exact_due_date_78}</li>
                          <li>{contentData.k_3742_weeks_is_considered_fullterm_79}</li>
                          <li>{contentData.first_babies_often_arrive_12_days_late_80}</li>
                          <li>{contentData.cycle_length_affects_lmp_calculations_81}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.when_to_use_each_method_82}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.lmp_83}</strong>{contentData.regular_cycles_known_lmp_date_84}</li>
                          <li>
                            <strong>{contentData.ultrasound_85}</strong>{contentData.irregular_cycles_uncertain_lmp_86}</li>
                          <li>
                            <strong>{contentData.conception_87}</strong>{contentData.known_ovulationconception_date_88}</li>
                          <li>
                            <strong>{contentData.ivf_89}</strong>{contentData.assisted_reproductive_technology_90}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Pregnancy Weight Gain Calculator",
            calculatorHref: "/health/pregnancy-weight-gain-calculator",
            calculatorDescription: "Calculate weight gain ranges and schedules based on Institute of Medicine (IOM) guidelines"
          }, {
            calculatorName: "Pregnancy Calculator",
            calculatorHref: "/health/pregnancy-calculator",
            calculatorDescription: "Estimate pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date"
          }, {
            calculatorName: "Pregnancy Conception Calculator",
            calculatorHref: "/health/pregnancy-conception-calculator",
            calculatorDescription: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date"
          }]} color="purple" title="Related Health Calculators" />

          </div>

      {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="due-date-calculator"
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