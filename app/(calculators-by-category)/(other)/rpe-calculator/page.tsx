"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, RotateCcw, Dumbbell, Target, TrendingUp, Download, Share2, Printer } from "lucide-react";

// RPE Chart data mapping reps × RPE → % of 1RM
const rpeChart = {
  1: {
    10: 1.0,
    9.5: 0.975,
    9: 0.95,
    8.5: 0.925,
    8: 0.9,
    7.5: 0.875,
    7: 0.85,
    6.5: 0.825,
    6: 0.8
  },
  2: {
    10: 0.97,
    9.5: 0.95,
    9: 0.925,
    8.5: 0.9,
    8: 0.875,
    7.5: 0.85,
    7: 0.825,
    6.5: 0.8,
    6: 0.775
  },
  3: {
    10: 0.94,
    9.5: 0.922,
    9: 0.897,
    8.5: 0.872,
    8: 0.847,
    7.5: 0.822,
    7: 0.797,
    6.5: 0.772,
    6: 0.747
  },
  4: {
    10: 0.91,
    9.5: 0.895,
    9: 0.87,
    8.5: 0.845,
    8: 0.82,
    7.5: 0.795,
    7: 0.77,
    6.5: 0.745,
    6: 0.72
  },
  5: {
    10: 0.885,
    9.5: 0.868,
    9: 0.843,
    8.5: 0.818,
    8: 0.793,
    7.5: 0.768,
    7: 0.743,
    6.5: 0.718,
    6: 0.693
  },
  6: {
    10: 0.86,
    9.5: 0.841,
    9: 0.816,
    8.5: 0.791,
    8: 0.766,
    7.5: 0.741,
    7: 0.716,
    6.5: 0.691,
    6: 0.666
  },
  7: {
    10: 0.835,
    9.5: 0.814,
    9: 0.789,
    8.5: 0.764,
    8: 0.739,
    7.5: 0.714,
    7: 0.689,
    6.5: 0.664,
    6: 0.639
  },
  8: {
    10: 0.81,
    9.5: 0.787,
    9: 0.762,
    8.5: 0.737,
    8: 0.712,
    7.5: 0.687,
    7: 0.662,
    6.5: 0.637,
    6: 0.612
  },
  9: {
    10: 0.785,
    9.5: 0.76,
    9: 0.735,
    8.5: 0.71,
    8: 0.685,
    7.5: 0.66,
    7: 0.635,
    6.5: 0.61,
    6: 0.585
  },
  10: {
    10: 0.76,
    9.5: 0.733,
    9: 0.708,
    8.5: 0.683,
    8: 0.658,
    7.5: 0.633,
    7: 0.608,
    6.5: 0.583,
    6: 0.558
  },
  11: {
    10: 0.735,
    9.5: 0.706,
    9: 0.681,
    8.5: 0.656,
    8: 0.631,
    7.5: 0.606,
    7: 0.581,
    6.5: 0.556,
    6: 0.531
  },
  12: {
    10: 0.71,
    9.5: 0.679,
    9: 0.654,
    8.5: 0.629,
    8: 0.604,
    7.5: 0.579,
    7: 0.554,
    6.5: 0.529,
    6: 0.504
  }
};

// Helper function to round to increment
function roundToIncrement(value: number, increment: number): number {
  return Math.round(value / increment) * increment;
}
export default function RpeCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('rpe-calculator', language, "calculator-ui");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "weight_lifted_2": "",
    "lbs_3": "",
    "reps_performed_4": "",
    "rep_5": "",
    "rpe_value_6": "",
    "rpe_7": "",
    "minimum_weight_increment_8": "",
    "k_05_lbs_9": "",
    "k_1_lb_10": "",
    "k_25_lbs_11": "",
    "k_5_lbs_12": "",
    "k_10_lbs_13": "",
    "calculate_14": "",
    "reset_15": "",
    "estimated_1rm_16": "",
    "lbs_17": "",
    "lbs_18": "",
    "reps_rpe_19": "",
    "of_1rm_20": "",
    "enter_your_lift_details_to_estimate_your_1rm_21": "",
    "rpe_chart_22": "",
    "suggested_loads_based_on_your_estimated_1rm_of_23": "",
    "lbs_24": "",
    "download_csv_25": "",
    "share_results_26": "",
    "print_chart_27": "",
    "reps_28": "",
    "rpe_10_29": "",
    "rpe_95_30": "",
    "rpe_9_31": "",
    "rpe_85_32": "",
    "rpe_8_33": "",
    "rpe_75_34": "",
    "rpe_7_35": "",
    "rpe_65_36": "",
    "rpe_6_37": "",
    "note_38": "",
    "your_input_39": "",
    "reps_rpe_40": "",
    "is_highlighted_in_the_chart_above_41": "",
    "how_the_rpe_calculator_works_42": "",
    "rpe_scale_43": "",
    "rpe_10_44": "",
    "maximum_effort_no_reps_left_45": "",
    "rpe_95_46": "",
    "could_do_1_more_rep_with_perfect_form_47": "",
    "rpe_9_48": "",
    "could_do_1_more_rep_49": "",
    "rpe_85_50": "",
    "could_do_12_more_reps_51": "",
    "rpe_8_52": "",
    "could_do_2_more_reps_53": "",
    "rpe_7_54": "",
    "could_do_3_more_reps_55": "",
    "rpe_6_56": "",
    "could_do_4_more_reps_57": "",
    "calculation_method_58": "",
    "formula_59": "",
    "k_1rm_weight_percentage_60": "",
    "where_61": "",
    "percentage_comes_from_rpe_chart_62": "",
    "example_63": "",
    "k_225_lbs_5_reps_rpe_8_64": "",
    "chart_shows_793_for_5_reps_rpe_8_65": "",
    "k_1rm_225_0793_284_lbs_66": "",
    "frequently_asked_questions_67": "",
    "what_is_rpe_68": "",
    "rpe_rate_of_perceived_exertion_is_a_scale_from_110_69": "",
    "how_accurate_is_the_rpe_calculator_70": "",
    "rpebased_1rm_estimates_are_generally_accurate_with_71": "",
    "what_rep_range_works_best_72": "",
    "rpe_calculations_are_most_accurate_in_the_38_rep_r_73": "",
    "how_do_i_use_rpe_in_training_74": "",
    "rpe_allows_for_autoregulation_adjusting_training_l_75": "",
    "what_about_different_exercises_76": "",
    "rpe_charts_work_best_for_compound_movements_like_s_77": "",
    "should_i_test_my_actual_1rm_78": "",
    "rpe_estimates_are_safer_and_less_fatiguing_than_tr_79": "",
    "estimate_your_1rm_from_weight_reps_and_rpe_0": "",
    "enter_your_lift_details_to_calculate_your_estimate_1": ""
  };
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRpe] = useState("");
  const [increment, setIncrement] = useState("2.5");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const weightNum = Number.parseFloat(weight);
    if (!weight || weightNum <= 0 || weightNum > 1000) {
      newErrors.weight = "Please enter a valid weight (1-1000)";
    }
    const repsNum = Number.parseInt(reps);
    if (!reps || repsNum < 1 || repsNum > 12) {
      newErrors.reps = "Reps must be between 1-12";
    }
    const rpeNum = Number.parseFloat(rpe);
    if (!rpe || rpeNum < 6 || rpeNum > 10) {
      newErrors.rpe = "RPE must be between 6-10";
    }
    const incrementNum = Number.parseFloat(increment);
    if (!increment || incrementNum <= 0) {
      newErrors.increment = "Please select a valid increment";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateRPE = () => {
    if (!validateInputs()) return;
    try {
      const weightNum = Number.parseFloat(weight);
      const repsNum = Number.parseInt(reps);
      const rpeNum = Number.parseFloat(rpe);
      const incrementNum = Number.parseFloat(increment);

      // Get percentage from RPE chart
      const percentage = rpeChart[repsNum as keyof typeof rpeChart]?.[rpeNum as keyof (typeof rpeChart)[1]];
      if (!percentage) {
        setErrors({
          general: "Invalid RPE/Reps combination"
        });
        return;
      }

      // Calculate 1RM
      const estimated1RM = weightNum / percentage;

      // Generate suggested loads for different RPE/rep combinations
      const suggestedLoads = [];
      for (let r = 1; r <= 12; r++) {
        const rowData: {
          reps: number;
          loads: {
            [key: string]: number;
          };
        } = {
          reps: r,
          loads: {}
        };
        const rpeValues = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6];
        for (const rpeVal of rpeValues) {
          const chartPercentage = rpeChart[r as keyof typeof rpeChart]?.[rpeVal as keyof (typeof rpeChart)[1]];
          if (chartPercentage) {
            const load = roundToIncrement(estimated1RM * chartPercentage, incrementNum);
            rowData.loads[rpeVal.toString()] = load;
          }
        }
        suggestedLoads.push(rowData);
      }
      const results = {
        inputWeight: weightNum,
        inputReps: repsNum,
        inputRPE: rpeNum,
        increment: incrementNum,
        percentage: percentage,
        estimated1RM: Math.round(estimated1RM * 100) / 100,
        suggestedLoads: suggestedLoads,
        userInputHighlight: {
          reps: repsNum,
          rpe: rpeNum
        }
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating RPE. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setWeight("");
    setReps("");
    setRpe("");
    setIncrement("2.5");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const downloadCSV = () => {
    if (!result) return;
    let csv = "Reps,RPE 10,RPE 9.5,RPE 9,RPE 8.5,RPE 8,RPE 7.5,RPE 7,RPE 6.5,RPE 6\n";
    result.suggestedLoads.forEach((row: any) => {
      const rpeValues = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6];
      const loads = rpeValues.map(rpe => row.loads[rpe] || "").join(",");
      csv += `${row.reps},${loads}\n`;
    });
    const blob = new Blob([csv], {
      type: "text/csv"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rpe-chart.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const shareResults = () => {
    if (!result) return;
    const shareText = `My RPE Calculator Results:\n1RM Estimate: ${result.estimated1RM} lbs\nBased on: ${result.inputWeight} lbs × ${result.inputReps} reps @ RPE ${result.inputRPE}`;
    if (navigator.share) {
      navigator.share({
        title: "RPE Calculator Results",
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Results copied to clipboard!");
    }
  };
  const printChart = () => {
    window.print();
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>{contentData.estimate_your_1rm_from_weight_reps_and_rpe_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_lift_details_to_calculate_your_estimate_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Weight Lifted */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.weight_lifted_2}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Dumbbell className="h-5 w-5 text-green-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`} type="number" placeholder="225" value={weight} onChange={e => setWeight(e.target.value)} step="0.5" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.lbs_3}</span>
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>

                      {/* Reps Performed */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.reps_performed_4}</Label>
                        <Select value={reps} onValueChange={setReps}>
                          <SelectTrigger className={`h-12 ${errors.reps ? "border-red-300" : ""}`}>
                            <div className="flex items-center">
                              <Target className="h-5 w-5 text-green-500 mr-2" />
                              <SelectValue placeholder="Select reps (1-12)" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({
                            length: 12
                          }, (_, i) => i + 1).map(rep => <SelectItem key={rep} value={rep.toString()}>
                                {rep}{contentData.rep_5}{rep !== 1 ? "s" : ""}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.reps && <p className="text-red-600 text-xs mt-1">{errors.reps}</p>}
                      </div>

                      {/* RPE Value */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.rpe_value_6}</Label>
                        <Select value={rpe} onValueChange={setRpe}>
                          <SelectTrigger className={`h-12 ${errors.rpe ? "border-red-300" : ""}`}>
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                              <SelectValue placeholder="Select RPE (6-10)" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {[10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6].map(rpeVal => <SelectItem key={rpeVal} value={rpeVal.toString()}>{contentData.rpe_7}{rpeVal}{" "}
                                {rpeVal === 10 ? "(Max effort)" : rpeVal >= 9 ? "(Very hard)" : rpeVal >= 8 ? "(Hard)" : rpeVal >= 7 ? "(Moderate)" : "(Easy)"}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.rpe && <p className="text-red-600 text-xs mt-1">{errors.rpe}</p>}
                      </div>

                      {/* Weight Increment */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.minimum_weight_increment_8}</Label>
                        <Select value={increment} onValueChange={setIncrement}>
                          <SelectTrigger className={`h-12 ${errors.increment ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select increment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.5">{contentData.k_05_lbs_9}</SelectItem>
                            <SelectItem value="1">{contentData.k_1_lb_10}</SelectItem>
                            <SelectItem value="2.5">{contentData.k_25_lbs_11}</SelectItem>
                            <SelectItem value="5">{contentData.k_5_lbs_12}</SelectItem>
                            <SelectItem value="10">{contentData.k_10_lbs_13}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.increment && <p className="text-red-600 text-xs mt-1">{errors.increment}</p>}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateRPE} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">{contentData.calculate_14}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_15}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.estimated_1rm_16}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-green-200">
                          <p className="text-3xl font-bold text-green-900 mb-2">{result.estimated1RM}{contentData.lbs_17}</p>
                          <p className="text-sm font-medium text-gray-600">
                            {result.inputWeight}{contentData.lbs_18}{result.inputReps}{contentData.reps_rpe_19}{result.inputRPE}
                          </p>
                          <p className="text-sm text-gray-500">{Math.round(result.percentage * 100)}{contentData.of_1rm_20}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Dumbbell className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_lift_details_to_estimate_your_1rm_21}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Results Section */}
            {showResult && result && <div className="mt-8 space-y-8">
                {/* RPE Chart */}
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center space-x-3 text-2xl">
                        <Target className="w-6 h-6 text-green-600" />
                        <span>{contentData.rpe_chart_22}</span>
                      </CardTitle>
                      <CardDescription className="text-base">{contentData.suggested_loads_based_on_your_estimated_1rm_of_23}{result.estimated1RM}{contentData.lbs_24}</CardDescription>
                    </div>
                    <div className="flex flex-row space-x-2 md:space-x-4 md:ml-auto">
                      <Button onClick={downloadCSV} variant="outline" className="flex items-center space-x-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        <span>{contentData.download_csv_25}</span>
                      </Button>
                      <Button onClick={shareResults} variant="outline" className="flex items-center space-x-2 bg-transparent">
                        <Share2 className="w-4 h-4" />
                        <span>{contentData.share_results_26}</span>
                      </Button>
                      <Button onClick={printChart} variant="outline" className="flex items-center space-x-2 bg-transparent">
                        <Printer className="w-4 h-4" />
                        <span>{contentData.print_chart_27}</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-green-50">
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.reps_28}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_10_29}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_95_30}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_9_31}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_85_32}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_8_33}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_75_34}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_7_35}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_65_36}</TableHead>
                            <TableHead className="text-xs font-semibold text-green-800">{contentData.rpe_6_37}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result.suggestedLoads.map((row: any, index: number) => <TableRow key={index} className={`hover:bg-green-50 ${row.reps === result.userInputHighlight.reps ? "bg-green-100 font-semibold" : ""}`}>
                              <TableCell className="text-xs font-medium">{row.reps}</TableCell>
                              {[10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6].map(rpeVal => <TableCell key={rpeVal} className={`text-xs ${row.reps === result.userInputHighlight.reps && rpeVal === result.userInputHighlight.rpe ? "bg-green-200 font-bold" : ""}`}>
                                  {row.loads[rpeVal] ? `${row.loads[rpeVal]} lbs` : "-"}
                                </TableCell>)}
                            </TableRow>)}
                        </TableBody>
                      </Table>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      <strong>{contentData.note_38}</strong>{contentData.your_input_39}{result.inputReps}{contentData.reps_rpe_40}{result.inputRPE}{contentData.is_highlighted_in_the_chart_above_41}</p>
                  </CardContent>
                </Card>
              </div>}

            {/* How the RPE Calculator Works */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.how_the_rpe_calculator_works_42}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.rpe_scale_43}</h3>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.rpe_10_44}</strong>{contentData.maximum_effort_no_reps_left_45}</li>
                          <li>
                            <strong>{contentData.rpe_95_46}</strong>{contentData.could_do_1_more_rep_with_perfect_form_47}</li>
                          <li>
                            <strong>{contentData.rpe_9_48}</strong>{contentData.could_do_1_more_rep_49}</li>
                          <li>
                            <strong>{contentData.rpe_85_50}</strong>{contentData.could_do_12_more_reps_51}</li>
                          <li>
                            <strong>{contentData.rpe_8_52}</strong>{contentData.could_do_2_more_reps_53}</li>
                          <li>
                            <strong>{contentData.rpe_7_54}</strong>{contentData.could_do_3_more_reps_55}</li>
                          <li>
                            <strong>{contentData.rpe_6_56}</strong>{contentData.could_do_4_more_reps_57}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.calculation_method_58}</h3>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-sm text-gray-700 space-y-2">
                          <p>
                            <strong>{contentData.formula_59}</strong>{contentData.k_1rm_weight_percentage_60}</p>
                          <p>
                            <strong>{contentData.where_61}</strong>{contentData.percentage_comes_from_rpe_chart_62}</p>
                          <p>
                            <strong>{contentData.example_63}</strong>{contentData.k_225_lbs_5_reps_rpe_8_64}</p>
                          <p>{contentData.chart_shows_793_for_5_reps_rpe_8_65}</p>
                          <p>{contentData.k_1rm_225_0793_284_lbs_66}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8 ">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.frequently_asked_questions_67}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">{contentData.what_is_rpe_68}</h3>
                        <p className="text-sm text-gray-700">{contentData.rpe_rate_of_perceived_exertion_is_a_scale_from_110_69}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">{contentData.how_accurate_is_the_rpe_calculator_70}</h3>
                        <p className="text-sm text-gray-700">{contentData.rpebased_1rm_estimates_are_generally_accurate_with_71}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">{contentData.what_rep_range_works_best_72}</h3>
                        <p className="text-sm text-gray-700">{contentData.rpe_calculations_are_most_accurate_in_the_38_rep_r_73}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">{contentData.how_do_i_use_rpe_in_training_74}</h3>
                        <p className="text-sm text-gray-700">{contentData.rpe_allows_for_autoregulation_adjusting_training_l_75}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">{contentData.what_about_different_exercises_76}</h3>
                        <p className="text-sm text-gray-700">{contentData.rpe_charts_work_best_for_compound_movements_like_s_77}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2">{contentData.should_i_test_my_actual_1rm_78}</h3>
                        <p className="text-sm text-gray-700">{contentData.rpe_estimates_are_safer_and_less_fatiguing_than_tr_79}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>;
}