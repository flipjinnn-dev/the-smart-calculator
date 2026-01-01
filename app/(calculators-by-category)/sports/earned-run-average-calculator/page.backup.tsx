"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorGuide from "@/components/calculator-guide";
import { Trophy, Calculator, Target, AlertCircle, Activity } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
export default function EarnedRunAverageCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('earned-run-average-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'earned-run-average-calculator',  // Calculator name
    language,                            // Current language (en/ur etc)
    "calculator-guide"                   // Content type
  );
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
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
    "pitching_statistics_0": "",
    "enter_pitching_statistics_to_calculate_earned_run__1": "",
    "earned_runs_er_2": "",
    "whole_innings_pitched_3": "",
    "additional_outs_4": "",
    "game_length_5": "",
    "formula_6": "",
    "era_earned_runs_total_innings_game_innings_7": "",
    "total_innings_whole_innings_outs_3_each_out_repres_8": "",
    "calculate_9": "",
    "era_results_10": "",
    "era_11": "",
    "total_innings_12": "",
    "enter_pitching_statistics_and_click_13": "",
    "calculate_14": "",
    "to_see_era_15": "",
    "detailed_era_breakdown_16": "",
    "era_17": "",
    "earned_run_average_18": "",
    "earned_runs_19": "",
    "er_20": "",
    "total_innings_21": "",
    "ip_22": "",
    "game_length_23": "",
    "innings_24": "",
    "calculation_steps_25": "",
    "step_1_26": "",
    "total_innings_27": "",
    "k_3_28": "",
    "innings_29": "",
    "step_2_30": "",
    "era_31": "",
    "understanding_era_in_baseball_32": "",
    "what_is_era_33": "",
    "earned_run_average_era_measures_how_many_earned_ru_34": "",
    "era_interpretation_35": "",
    "under_200_excellent_36": "",
    "k_200300_very_good_37": "",
    "k_300400_good_38": "",
    "k_400500_average_39": "",
    "above_500_below_average_40": "",
    "sample_calculation_41": "",
    "example_42": "",
    "pitcher_statistics_43": "",
    "earned_runs_15_44": "",
    "innings_65_45": "",
    "outs_2_46": "",
    "game_innings_9_47": "",
    "calculation_48": "",
    "total_ip_65_23_6567_49": "",
    "era_15_6567_9_50": "",
    "era_206_51": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [earnedRuns, setEarnedRuns] = useState("");
  const [wholeInnings, setWholeInnings] = useState("");
  const [outs, setOuts] = useState("0");
  const [gameInnings, setGameInnings] = useState("9");
  const outsOptions = [{
    value: "0",
    label: "0 outs"
  }, {
    value: "1",
    label: "1 out"
  }, {
    value: "2",
    label: "2 outs"
  }];
  const gameInningsOptions = [{
    value: "9",
    label: "9 innings (MLB/Professional)"
  }, {
    value: "7",
    label: "7 innings (Softball/High School)"
  }];
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!earnedRuns || Number.parseFloat(earnedRuns) < 0) {
      newErrors.earnedRuns = "Please enter a valid number of earned runs (≥ 0)";
    }
    if (!wholeInnings || Number.parseFloat(wholeInnings) < 0) {
      newErrors.wholeInnings = "Please enter a valid number of whole innings (≥ 0)";
    }
    const totalInnings = Number.parseFloat(wholeInnings || "0") + Number.parseFloat(outs) / 3;
    if (totalInnings <= 0) {
      newErrors.wholeInnings = "Total innings pitched must be greater than 0";
    }
    if (!gameInnings || Number.parseFloat(gameInnings) <= 0) {
      newErrors.gameInnings = "Please enter a valid number of game innings";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateERA = () => {
    if (!validateInputs()) return;
    const er = Number.parseFloat(earnedRuns);
    const ipWhole = Number.parseFloat(wholeInnings);
    const outsValue = Number.parseFloat(outs);
    const gi = Number.parseFloat(gameInnings);

    // Step 1: Convert Innings + Outs into Total Innings
    const ipTotal = ipWhole + outsValue / 3;

    // Step 2: Calculate
    const era = er / ipTotal * gi;
    setResult({
      earnedRuns: er,
      wholeInnings: ipWhole,
      outs: outsValue,
      totalInnings: ipTotal,
      gameInnings: gi,
      era: era,
      outsAsFraction: outsValue === 1 ? "1/3" : outsValue === 2 ? "2/3" : "0"
    });
    setShowResult(true);
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
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
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Activity className="w-6 h-6 text-blue-600" />
                    <span>{contentData.pitching_statistics_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_pitching_statistics_to_calculate_earned_run__1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Earned Runs */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.earned_runs_er_2}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Target className="h-5 w-5 text-blue-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.earnedRuns ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter earned runs" value={earnedRuns} onChange={e => {
                          setEarnedRuns(e.target.value);
                          if (errors.earnedRuns) setErrors(prev => ({
                            ...prev,
                            earnedRuns: ""
                          }));
                        }} />
                      </div>
                      {errors.earnedRuns && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.earnedRuns}</span>
                      </div>}
                    </div>

                    {/* Whole Innings */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.whole_innings_pitched_3}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calculator className="h-5 w-5 text-blue-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.wholeInnings ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter whole innings" value={wholeInnings} onChange={e => {
                          setWholeInnings(e.target.value);
                          if (errors.wholeInnings) setErrors(prev => ({
                            ...prev,
                            wholeInnings: ""
                          }));
                        }} />
                      </div>
                      {errors.wholeInnings && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.wholeInnings}</span>
                      </div>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Outs */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.additional_outs_4}</Label>
                      <Select value={outs} onValueChange={setOuts}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200">
                          <SelectValue placeholder="Select additional outs" />
                        </SelectTrigger>
                        <SelectContent>
                          {outsOptions.map(option => <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Game Innings */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.game_length_5}</Label>
                      <Select value={gameInnings} onValueChange={setGameInnings}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200">
                          <SelectValue placeholder="Select game length" />
                        </SelectTrigger>
                        <SelectContent>
                          {gameInningsOptions.map(option => <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      <strong>{contentData.formula_6}</strong>{contentData.era_earned_runs_total_innings_game_innings_7}</p>
                    <p className="text-xs text-gray-600 mt-1">{contentData.total_innings_whole_innings_outs_3_each_out_repres_8}</p>
                  </div>

                  <Button onClick={calculateERA} className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">{contentData.calculate_9}</Button>
                </CardContent>
              </Card>
            </div>

            {/* Result Card (right side) */}
            <div className="">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mb-3 shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.era_results_10}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-4">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-3xl font-bold text-blue-900">{result.era?.toFixed(2)}</p>
                        <p className="text-gray-600">{contentData.era_11}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-200">
                        <p className="text-lg font-bold text-blue-900">{result.totalInnings?.toFixed(2)}</p>
                        <p className="text-gray-600">{contentData.total_innings_12}</p>
                      </div>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Trophy className="w-8 h-8 text-blue-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_pitching_statistics_and_click_13}{" "}
                      <span className="font-semibold text-blue-600">{contentData.calculate_14}</span>{contentData.to_see_era_15}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Results Section */}
          {showResult && result && <div className="mt-8">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  <span>{contentData.detailed_era_breakdown_16}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">{contentData.era_17}</h3>
                    <p className="text-3xl font-bold text-blue-900 mb-1">{result.era?.toFixed(2)}</p>
                    <p className="text-sm text-blue-600">{contentData.earned_run_average_18}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">{contentData.earned_runs_19}</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-1">{result.earnedRuns}</p>
                    <p className="text-sm text-blue-600">{contentData.er_20}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">{contentData.total_innings_21}</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-1">{result.totalInnings?.toFixed(2)}</p>
                    <p className="text-sm text-blue-600">{contentData.ip_22}{result.wholeInnings} + {result.outsAsFraction})
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">{contentData.game_length_23}</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-1">{result.gameInnings}</p>
                    <p className="text-sm text-blue-600">{contentData.innings_24}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2">{contentData.calculation_steps_25}</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>{contentData.step_1_26}</strong>{contentData.total_innings_27}{result.wholeInnings} + ({result.outs}{contentData.k_3_28}{" "}
                      {result.totalInnings?.toFixed(2)}{contentData.innings_29}</p>
                    <p>
                      <strong>{contentData.step_2_30}</strong>{contentData.era_31}{result.earnedRuns} ÷ {result.totalInnings?.toFixed(2)}) ×{" "}
                      {result.gameInnings} = {result.era?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-3 shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.understanding_era_in_baseball_32}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.what_is_era_33}</h3>
                    <p className="text-gray-700 mb-4">{contentData.earned_run_average_era_measures_how_many_earned_ru_34}</p>
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.era_interpretation_35}</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>{contentData.under_200_excellent_36}</li>
                      <li>{contentData.k_200300_very_good_37}</li>
                      <li>{contentData.k_300400_good_38}</li>
                      <li>{contentData.k_400500_average_39}</li>
                      <li>{contentData.above_500_below_average_40}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.sample_calculation_41}</h3>
                    <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.example_42}</strong>{contentData.pitcher_statistics_43}</p>
                      <p className="text-gray-700">{contentData.earned_runs_15_44}</p>
                      <p className="text-gray-700">{contentData.innings_65_45}</p>
                      <p className="text-gray-700">{contentData.outs_2_46}</p>
                      <p className="text-gray-700">{contentData.game_innings_9_47}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.calculation_48}</strong>
                      </p>
                      <p className="text-gray-700">{contentData.total_ip_65_23_6567_49}</p>
                      <p className="text-gray-700">{contentData.era_15_6567_9_50}</p>
                      <p className="text-gray-700 font-semibold">{contentData.era_206_51}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="earned-run-average-calculator"
            entityType="calculator"
            creatorSlug="antonio-ares"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
        <SimilarCalculators calculators={[{
          calculatorName: "Calculate The Magic Number",
          calculatorHref: "/sports/magic-number-calculator",
          calculatorDescription: "Calculate the magic number for playoff contention in sports"
        }, {
          calculatorName: "Fielding Percentage Calculator",
          calculatorHref: "/sports/fielding-percentage-calculator",
          calculatorDescription: "Calculate fielding percentage for baseball players"
        }, {
          calculatorName: "Fielding Independent Pitching Calculator",
          calculatorHref: "/sports/fielding-independent-pitching-calculator",
          calculatorDescription: "Calculate fielding independent pitching (FIP) for baseball players"
        }
        ]}
          color="blue"
          title="Related Sport Calculators" />
      </main>

    </div>
  </>;
}