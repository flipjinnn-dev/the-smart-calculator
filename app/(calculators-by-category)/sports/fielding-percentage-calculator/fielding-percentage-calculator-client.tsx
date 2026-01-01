"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import CalculatorGuide from "@/components/calculator-guide";
import { Trophy, Calculator, Target, AlertCircle, Activity, RotateCcw, HelpCircle } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface FieldingPercentageCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function FieldingPercentageCalculatorClient({ content, guideContent }: FieldingPercentageCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
"calculator-guide"                   // Content type  
    const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [showAsPercentage, setShowAsPercentage] = useState(false);

  // Input states
  const [putouts, setPutouts] = useState("");
  const [assists, setAssists] = useState("");
  const [errorsCount, setErrorsCount] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!putouts || Number.parseInt(putouts) < 0 || !Number.isInteger(Number.parseFloat(putouts))) {
      newErrors.putouts = "Please enter a valid number of putouts (≥ 0, whole number)";
    }
    if (!assists || Number.parseInt(assists) < 0 || !Number.isInteger(Number.parseFloat(assists))) {
      newErrors.assists = "Please enter a valid number of assists (≥ 0, whole number)";
    }
    if (!errorsCount || Number.parseInt(errorsCount) < 0 || !Number.isInteger(Number.parseFloat(errorsCount))) {
      newErrors.errorsCount = "Please enter a valid number of errors (≥ 0, whole number)";
    }
    const totalChances = Number.parseInt(putouts || "0") + Number.parseInt(assists || "0") + Number.parseInt(errorsCount || "0");
    if (totalChances === 0) {
      newErrors.putouts = "Total chances (putouts + assists + errors) must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateFPCT = () => {
    if (!validateInputs()) return;
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const p = Number.parseInt(putouts);
    const a = Number.parseInt(assists);
    const e = Number.parseInt(errorsCount);

    // Calculate Chances
    const totalChances = p + a + e;

    // Calculate
    const fpct = (p + a) / totalChances;

    // Determine performance level
    let performanceLevel = "";
    if (fpct >= 0.98) {
      performanceLevel = "Elite";
    } else if (fpct >= 0.95) {
      performanceLevel = "Good";
    } else if (fpct >= 0.9) {
      performanceLevel = "Average";
    } else {
      performanceLevel = "Below Average";
    }
    setResult({
      putouts: p,
      assists: a,
      errors: e,
      totalChances: totalChances,
      fpct: fpct,
      fpctPercentage: fpct * 100,
      performanceLevel: performanceLevel,
      isPerfect: e === 0
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setPutouts("");
    setAssists("");
    setErrorsCount("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form (left) */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Activity className="w-6 h-6 text-green-600" />
                    <span>{contentData.fielding_statistics_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_fielding_statistics_to_calculate_fielding_pe_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Putouts */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">{contentData.putouts_p_2}<div className="group relative ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.outs_recorded_by_the_fielder_3}</div>
                      </div>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Target className="h-5 w-5 text-green-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${errors.putouts ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter putouts" value={putouts} onChange={e => {
                          setPutouts(e.target.value);
                          if (errors.putouts) setErrors(prev => ({
                            ...prev,
                            putouts: ""
                          }));
                        }} />
                      </div>
                      {errors.putouts && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.putouts}</span>
                      </div>}
                    </div>

                    {/* Assists */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">{contentData.assists_a_4}<div className="group relative ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.plays_that_helped_record_an_out_5}</div>
                      </div>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calculator className="h-5 w-5 text-green-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${errors.assists ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter assists" value={assists} onChange={e => {
                          setAssists(e.target.value);
                          if (errors.assists) setErrors(prev => ({
                            ...prev,
                            assists: ""
                          }));
                        }} />
                      </div>
                      {errors.assists && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.assists}</span>
                      </div>}
                    </div>

                    {/* Errors */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">{contentData.errors_e_6}<div className="group relative ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.misplays_that_should_have_been_made_7}</div>
                      </div>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <AlertCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${errors.errorsCount ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter errors" value={errorsCount} onChange={e => {
                          setErrorsCount(e.target.value);
                          if (errors.errorsCount) setErrors(prev => ({
                            ...prev,
                            errorsCount: ""
                          }));
                        }} />
                      </div>
                      {errors.errorsCount && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.errorsCount}</span>
                      </div>}
                    </div>
                  </div>

                  {/* Output Format Toggle */}
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="block md:flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">{contentData.output_format_8}</Label>
                        <p className="text-xs text-gray-600 mt-1">{contentData.display_result_as_9}{showAsPercentage ? "percentage" : "decimal"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm ${!showAsPercentage ? "text-green-600 font-medium" : "text-gray-500"}`}>{contentData.decimal_10}</span>
                        <Switch checked={showAsPercentage} onCheckedChange={setShowAsPercentage} className="data-[state=checked]:bg-green-600" />
                        <span className={`text-sm ${showAsPercentage ? "text-green-600 font-medium" : "text-gray-500"}`}>{contentData.percentage_11}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">
                      <strong>{contentData.formula_12}</strong>{contentData.fpct_putouts_assists_putouts_assists_errors_13}</p>
                    <p className="text-xs text-gray-600 mt-1">{contentData.total_chances_putouts_assists_errors_14}</p>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={calculateFPCT} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800">{contentData.calculate_15}</Button>
                    <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_16}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Result Card (right side) */}
            <div ref={resultsRef} className="hidden lg:block p-0">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full">
                <CardHeader className="w-full text-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.fpct_results_17}</CardTitle>
                </CardHeader>
                <CardContent className="w-full text-center">
                  {showResult && result ? <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="text-3xl font-bold text-green-900">
                          {showAsPercentage ? `${result.fpctPercentage?.toFixed(1)}%` : result.fpct?.toFixed(3)}
                        </p>
                        <p className="text-gray-600">{contentData.fpct_18}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <p className="text-lg font-bold text-green-900">{result.totalChances}</p>
                        <p className="text-gray-600">{contentData.total_chances_19}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <p className="text-sm font-bold text-green-900">{result.performanceLevel}</p>
                        <p className="text-gray-600">{contentData.performance_20}</p>
                      </div>
                    </div>
                  </div> : <div className="text-center">
                    <Trophy className="w-8 h-8 text-green-300 mb-2 mx-auto" />
                    <p className="text-gray-500 text-base">{contentData.enter_fielding_statistics_and_click_21}{" "}
                      <span className="font-semibold text-green-600">{contentData.calculate_22}</span>{contentData.to_see_fpct_23}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Results Section */}
          {showResult && result && <div className="mt-8" ref={resultsRef}>
            <Card className="shadow-2xl border-0 p-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Calculator className="w-6 h-6 text-green-600" />
                  <span>{contentData.detailed_fpct_breakdown_24}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-700 mb-2">{contentData.fpct_25}</h3>
                    <p className="text-3xl font-bold text-green-900 mb-1">
                      {showAsPercentage ? `${result.fpctPercentage?.toFixed(1)}%` : result.fpct?.toFixed(3)}
                    </p>
                    <p className="text-sm text-green-600">
                      {result.isPerfect ? "Perfect!" : result.performanceLevel}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-700 mb-2">{contentData.putouts_26}</h3>
                    <p className="text-2xl font-bold text-green-900 mb-1">{result.putouts}</p>
                    <p className="text-sm text-green-600">{contentData.p_27}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-700 mb-2">{contentData.assists_28}</h3>
                    <p className="text-2xl font-bold text-green-900 mb-1">{result.assists}</p>
                    <p className="text-sm text-green-600">{contentData.a_29}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-700 mb-2">{contentData.errors_30}</h3>
                    <p className="text-2xl font-bold text-green-900 mb-1">{result.errors}</p>
                    <p className="text-sm text-green-600">{contentData.e_31}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-700 mb-2">{contentData.calculation_steps_32}</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>{contentData.step_1_33}</strong>{contentData.total_chances_34}{result.putouts} + {result.assists} + {result.errors}{" "}
                      = {result.totalChances}
                    </p>
                    <p>
                      <strong>{contentData.step_2_35}</strong>{contentData.fpct_36}{result.putouts} + {result.assists}) ÷ {result.totalChances}{" "}
                      = {result.fpct?.toFixed(3)}
                    </p>
                    {showAsPercentage && <p>
                      <strong>{contentData.step_3_37}</strong>{contentData.as_percentage_38}{result.fpct?.toFixed(3)}{contentData.k_100_39}{" "}
                      {result.fpctPercentage?.toFixed(1)}%
                    </p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="fielding-percentage-calculator"
            entityType="calculator"
            creatorSlug="antonio-ares"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Fielding Independent Pitching Calculator",
            calculatorHref: "/sports/fielding-independent-pitching-calculator",
            calculatorDescription: "Calculate fielding independent pitching (FIP) for baseball players"
          }, {
            calculatorName: "Earned Run Average Calculator",
            calculatorHref: "/sports/earned-run-average-calculator",
            calculatorDescription: "Calculate earned run average (ERA) for pitchers"
          }, {
            calculatorName: "Batting Average Calculator",
            calculatorHref: "/sports/batting-average-calculator",
            calculatorDescription: "Calculate batting average and related statistics for baseball and softball players with comprehensive performance metrics"
          }
          ]}
            color="green"
            title="Related Sport Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mr-3 shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.understanding_fielding_percentage_40}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.what_is_fpct_41}</h3>
                    <p className="text-gray-700 mb-4">{contentData.fielding_percentage_fpct_measures_how_often_a_fiel_42}</p>
                    <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.fpct_interpretation_43}</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>{contentData.k_1000_perfect_no_errors_44}</li>
                      <li>{contentData.k_0980_elite_level_45}</li>
                      <li>{contentData.k_09500979_good_46}</li>
                      <li>{contentData.k_09000949_average_47}</li>
                      <li>{contentData.below_0900_below_average_48}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.sample_calculation_49}</h3>
                    <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.example_50}</strong>{contentData.player_statistics_51}</p>
                      <p className="text-gray-700">{contentData.putouts_1489_52}</p>
                      <p className="text-gray-700">{contentData.assists_496_53}</p>
                      <p className="text-gray-700">{contentData.errors_33_54}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.calculation_55}</strong>
                      </p>
                      <p className="text-gray-700">{contentData.total_chances_1489_496_33_2018_56}</p>
                      <p className="text-gray-700">{contentData.fpct_1489_496_2018_57}</p>
                      <p className="text-gray-700 font-semibold">{contentData.fpct_0984_984_58}</p>
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <strong>{contentData.note_59}</strong>{contentData.high_fpct_doesnt_reflect_a_fielders_range_or_the_d_60}</p>
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
