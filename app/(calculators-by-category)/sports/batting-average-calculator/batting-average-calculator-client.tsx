"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculatorGuide from "@/components/calculator-guide";
import { Trophy, Target, Activity } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface BattingAverageCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function BattingAverageCalculatorClient({ content, guideContent }: BattingAverageCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [tab, setTab] = useState("basic");
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Input states for basic calculation
  const [runsScored, setRunsScored] = useState(315);
  const [timesOut, setTimesOut] = useState(3);

  // Input states for advanced calculation
  const [advancedRuns, setAdvancedRuns] = useState(315);
  const [inningsPlayed, setInningsPlayed] = useState(5);
  const [notOuts, setNotOuts] = useState(2);

          const calculateBasicAverage = () => {
    if (isNaN(runsScored) || runsScored < 0) {
      alert("Please enter a valid positive number for runs scored");
      return;
    }
    if (isNaN(timesOut) || timesOut <= 0) {
      alert("Please enter a valid positive number for times out (must be greater than 0)");
      return;
    }
    const battingAverage = runsScored / timesOut;
    setResult({
      type: "basic",
      runsScored,
      timesOut,
      battingAverage,
      formula: `Batting Average = ${runsScored} ÷ ${timesOut} = ${battingAverage.toFixed(2)}`,
      explanation: `With ${runsScored} runs scored and ${timesOut} dismissals, the batting average is ${battingAverage.toFixed(2)}.`
    });
    setShowResult(true);
  };
  const calculateAdvancedAverage = () => {
    if (isNaN(advancedRuns) || advancedRuns < 0) {
      alert("Please enter a valid positive number for runs scored");
      return;
    }
    if (isNaN(inningsPlayed) || inningsPlayed <= 0) {
      alert("Please enter a valid positive number for innings played");
      return;
    }
    if (isNaN(notOuts) || notOuts < 0) {
      alert("Please enter a valid number for not outs (0 or positive)");
      return;
    }
    if (notOuts >= inningsPlayed) {
      alert("Not outs cannot be greater than or equal to innings played");
      return;
    }
    const calculatedTimesOut = inningsPlayed - notOuts;
    if (calculatedTimesOut <= 0) {
      alert("Times out must be greater than 0 (innings played - not outs)");
      return;
    }
    const battingAverage = advancedRuns / calculatedTimesOut;
    setResult({
      type: "advanced",
      runsScored: advancedRuns,
      inningsPlayed,
      notOuts,
      timesOut: calculatedTimesOut,
      battingAverage,
      formula: `Times Out = ${inningsPlayed} - ${notOuts} = ${calculatedTimesOut}; Batting Average = ${advancedRuns} ÷ ${calculatedTimesOut} = ${battingAverage.toFixed(2)}`,
      explanation: `With ${advancedRuns} runs in ${inningsPlayed} innings (${notOuts} not out), the batting average is ${battingAverage.toFixed(2)}.`
    });
    setShowResult(true);
  };
  const handleCalculate = () => {
    switch (tab) {
      case "basic":
        calculateBasicAverage();
        break;
      case "advanced":
        calculateAdvancedAverage();
        break;
    }
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                    <Trophy className="w-6 h-6 text-green-600" />
                    <span>{contentData.batting_average_calculation_1}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.choose_between_basic_or_advanced_calculation_metho_2}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Label className="text-base font-semibold mb-3 block">{contentData.what_calculation_method_would_you_like_to_use_3}</Label>
                    <Tabs value={tab} onValueChange={setTab} className="w-full">
                      <TabsList className="bg-gradient-to-r from-green-50 to-emerald-50 grid grid-cols-2 gap-1 mb-6 h-auto p-2 rounded-xl border border-green-200 shadow-sm">
                        <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:shadow-md">{contentData.basic_calculation_4}</TabsTrigger>
                        <TabsTrigger value="advanced" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:shadow-md">{contentData.advanced_calculation_5}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="basic">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.runs_scored_6}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Target className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" min="0" value={runsScored} onChange={e => setRunsScored(Number(e.target.value))} />
                            </div>
                          </div>
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.times_out_7}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Activity className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" min="1" value={timesOut} onChange={e => setTimesOut(Number(e.target.value))} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-gray-700">
                            <strong>{contentData.formula_8}</strong>{contentData.batting_average_runs_scored_times_out_9}</p>
                          <p className="text-xs text-gray-600 mt-1">{contentData.example_315_runs_3_dismissals_10500_average_10}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="advanced">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.runs_scored_11}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Target className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" min="0" value={advancedRuns} onChange={e => setAdvancedRuns(Number(e.target.value))} />
                            </div>
                          </div>
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.innings_played_12}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Activity className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" min="1" value={inningsPlayed} onChange={e => setInningsPlayed(Number(e.target.value))} />
                            </div>
                          </div>
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.not_outs_13}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Trophy className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm" type="number" min="0" value={notOuts} onChange={e => setNotOuts(Number(e.target.value))} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-gray-700">
                            <strong>{contentData.formula_14}</strong>{contentData.times_out_innings_played_not_outs_15}<br />{contentData.batting_average_runs_scored_times_out_16}</p>
                          <p className="text-xs text-gray-600 mt-1">{contentData.not_out_innings_dont_count_as_dismissals_which_can_17}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <Button onClick={handleCalculate} className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">{contentData.calculate_average_18}</Button>
                </CardContent>
              </Card>
            </div>

            {/* Result Card (right side) */}
            <div className="">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.batting_average_19}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-3">
                    <div className="space-y-2">
                      <p className="text-4xl font-bold text-green-900">{result.battingAverage.toFixed(2)}</p>
                      <p className="text-lg text-gray-600">{contentData.batting_average_20}</p>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700 font-medium">{result.formula}</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">{result.explanation}</div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Trophy className="w-8 h-8 text-green-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_your_cricket_statistics_and_click_21}{" "}
                      <span className="font-semibold text-green-600">{contentData.calculate_22}</span>{contentData.to_see_your_batting_average_23}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Definition and Context section */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.understanding_batting_average_24}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.definition_25}</h3>
                    <p className="text-gray-700 mb-4">{contentData.batting_average_in_cricket_is_a_statistic_that_mea_26}</p>
                    <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.key_points_27}</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>{contentData.higher_averages_indicate_better_batting_performanc_28}</li>
                      <li>{contentData.not_out_innings_are_not_counted_as_dismissals_29}</li>
                      <li>{contentData.a_good_batting_average_varies_by_level_of_cricket_30}</li>
                      <li>{contentData.professional_averages_above_40_are_considered_exce_31}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.sample_calculation_32}</h3>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.example_33}</strong>
                      </p>
                      <p className="text-gray-700">{contentData.runs_scored_315_34}</p>
                      <p className="text-gray-700">{contentData.times_out_3_35}</p>
                      <p className="text-gray-700 font-semibold">{contentData.batting_average_315_3_10500_36}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{contentData.this_would_be_an_exceptional_batting_average_indic_37}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="batting-average-calculator"
            entityType="calculator"
            creatorSlug="antonio-ares"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
        <SimilarCalculators calculators={[{
          calculatorName: "Magic Number Calculator",
          calculatorHref: "/sports/magic-number-calculator",
          calculatorDescription: "Calculate the magic number for playoff contention in sports"
        }, {
          calculatorName: "Earned Run Average Calculator",
          calculatorHref: "/sports/earned-run-average-calculator",
          calculatorDescription: "Calculate earned run average (ERA) for pitchers"
        }, {
          calculatorName: "Fielding Percentage Calculator",
          calculatorHref: "/sports/fielding-percentage-calculator",
          calculatorDescription: "Calculate fielding percentage for baseball players"
        }
        ]}
          color="green"
          title="Related Sport Calculators" />
      </main>

    </div>
  </>;
}
