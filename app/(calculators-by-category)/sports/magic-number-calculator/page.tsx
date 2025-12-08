"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import CalculatorGuide from "@/components/calculator-guide";
import { Trophy, Calculator, Target, AlertCircle, Activity, RotateCcw, HelpCircle, Crown } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";
export default function MagicNumberCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('magic-number-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'magic-number-calculator',  // Calculator name
    language,                   // Current language (en/ur etc)
    "calculator-guide"          // Content type
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
    "team_season_statistics_0": "",
    "enter_your_teams_wins_rivals_losses_and_total_game_1": "",
    "mlb_season_162_games_2": "",
    "automatically_sets_total_games_to_162_3": "",
    "total_games_in_season_tg_4": "",
    "total_games_in_the_season_162_for_mlb_5": "",
    "wins_of_your_team_w_6": "",
    "current_wins_by_your_team_7": "",
    "losses_of_closest_rival_l_8": "",
    "current_losses_by_your_closest_rival_9": "",
    "formula_10": "",
    "magic_number_tg_w_l_1_11": "",
    "lower_magic_number_means_closer_to_clinching_12": "",
    "calculate_number_13": "",
    "reset_14": "",
    "magic_number_15": "",
    "magic_number_16": "",
    "enter_team_statistics_and_click_17": "",
    "calculate_18": "",
    "to_see_the_magic_number_19": "",
    "detailed_magic_number_breakdown_20": "",
    "magic_number_21": "",
    "total_games_22": "",
    "season_length_23": "",
    "team_wins_24": "",
    "current_wins_25": "",
    "rival_losses_26": "",
    "current_losses_27": "",
    "calculation_steps_28": "",
    "formula_29": "",
    "magic_number_tg_w_l_1_30": "",
    "calculation_31": "",
    "k_1_32": "",
    "result_33": "",
    "dynamic_scenarios_34": "",
    "if_your_team_wins_35": "",
    "more_games_you_will_clinch_36": "",
    "if_your_rival_loses_37": "",
    "more_games_you_will_clinch_38": "",
    "any_combination_of_39": "",
    "team_wins_rival_losses_clinch_40": "",
    "understanding_magic_numbers_41": "",
    "what_is_a_magic_number_42": "",
    "the_magic_number_shows_how_many_combined_wins_by_y_43": "",
    "how_it_works_44": "",
    "every_win_by_your_team_reduces_the_magic_number_by_45": "",
    "every_loss_by_your_rival_reduces_the_magic_number__46": "",
    "magic_number_0_means_youve_clinched_47": "",
    "magic_number_1_means_one_final_push_needed_48": "",
    "sample_calculation_49": "",
    "example_50": "",
    "mlb_season_51": "",
    "total_games_162_52": "",
    "team_wins_96_53": "",
    "rival_losses_62_54": "",
    "calculation_55": "",
    "magic_number_162_96_62_1_56": "",
    "magic_number_5_57": "",
    "any_combination_of_5_more_wins_by_your_team_or_5_m_58": ""
  };
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [mlbSeason, setMlbSeason] = useState(true);

  // Input states
  const [totalGames, setTotalGames] = useState("162");
  const [teamWins, setTeamWins] = useState("");
  const [rivalLosses, setRivalLosses] = useState("");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!totalGames || Number.parseInt(totalGames) <= 0 || !Number.isInteger(Number.parseFloat(totalGames))) {
      newErrors.totalGames = "Please enter a valid number of total games (> 0, whole number)";
    }
    if (!teamWins || Number.parseInt(teamWins) < 0 || !Number.isInteger(Number.parseFloat(teamWins))) {
      newErrors.teamWins = "Please enter a valid number of team wins (≥ 0, whole number)";
    }
    if (!rivalLosses || Number.parseInt(rivalLosses) < 0 || !Number.isInteger(Number.parseFloat(rivalLosses))) {
      newErrors.rivalLosses = "Please enter a valid number of rival losses (≥ 0, whole number)";
    }

    // Additional validation
    if (totalGames && teamWins && Number.parseInt(teamWins) > Number.parseInt(totalGames)) {
      newErrors.teamWins = "Team wins cannot exceed total games in season";
    }
    if (totalGames && rivalLosses && Number.parseInt(rivalLosses) > Number.parseInt(totalGames)) {
      newErrors.rivalLosses = "Rival losses cannot exceed total games in season";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateMagicNumber = () => {
    if (!validateInputs()) return;
    const tg = Number.parseInt(totalGames);
    const wt = Number.parseInt(teamWins);
    const lo = Number.parseInt(rivalLosses);

    // Calculate Number: MN = TG - Wt - Lo + 1
    const magicNumber = tg - wt - lo + 1;

    // Determine context message
    let contextMessage = "";
    let celebratory = false;
    if (magicNumber <= 0) {
      if (magicNumber === 0) {
        contextMessage = "🎉 Congratulations! Your team has clinched!";
        celebratory = true;
      } else {
        contextMessage = "Your team clinched earlier in the season!";
        celebratory = true;
      }
    } else {
      contextMessage = `${magicNumber} more favorable outcome${magicNumber > 1 ? "s" : ""} needed to clinch`;
    }

    // Calculate remaining for team and rival
    const teamGamesRemaining = tg - wt - (tg - wt - lo + 1 - magicNumber);
    const rivalGamesRemaining = tg - lo - (tg - wt - lo + 1 - magicNumber);
    setResult({
      totalGames: tg,
      teamWins: wt,
      rivalLosses: lo,
      magicNumber: magicNumber,
      contextMessage: contextMessage,
      celebratory: celebratory,
      teamGamesRemaining: Math.max(0, teamGamesRemaining),
      rivalGamesRemaining: Math.max(0, rivalGamesRemaining)
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setTotalGames(mlbSeason ? "162" : "");
    setTeamWins("");
    setRivalLosses("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const toggleMLBSeason = (checked: boolean) => {
    setMlbSeason(checked);
    setTotalGames(checked ? "162" : "");
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form (left) */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Activity className="w-6 h-6 text-orange-600" />
                    <span>{contentData.team_season_statistics_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_teams_wins_rivals_losses_and_total_game_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {/* MLB Season Toggle */}
                  <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">{contentData.mlb_season_162_games_2}</Label>
                        <p className="text-xs text-gray-600 mt-1">{contentData.automatically_sets_total_games_to_162_3}</p>
                      </div>
                      <Switch checked={mlbSeason} onCheckedChange={toggleMLBSeason} className="data-[state=checked]:bg-orange-600" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Total Games - Only show when MLB season is OFF */}
                    {!mlbSeason && <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.total_games_in_season_tg_4}<div className="group relative ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.total_games_in_the_season_162_for_mlb_5}</div>
                      </div>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calculator className="h-5 w-5 text-orange-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.totalGames ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="1" placeholder="162" value={totalGames} onChange={e => {
                          setTotalGames(e.target.value);
                          if (errors.totalGames) setErrors(prev => ({
                            ...prev,
                            totalGames: ""
                          }));
                        }} />
                      </div>
                      {errors.totalGames && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.totalGames}</span>
                      </div>}
                    </div>}

                    {/* Team Wins */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.wins_of_your_team_w_6}<div className="group relative ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.current_wins_by_your_team_7}</div>
                      </div>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Trophy className="h-5 w-5 text-orange-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.teamWins ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter team wins" value={teamWins} onChange={e => {
                          setTeamWins(e.target.value);
                          if (errors.teamWins) setErrors(prev => ({
                            ...prev,
                            teamWins: ""
                          }));
                        }} />
                      </div>
                      {errors.teamWins && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.teamWins}</span>
                      </div>}
                    </div>

                    {/* Rival Losses */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.losses_of_closest_rival_l_8}<div className="group relative ml-2">
                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.current_losses_by_your_closest_rival_9}</div>
                      </div>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Target className="h-5 w-5 text-orange-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.rivalLosses ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter rival losses" value={rivalLosses} onChange={e => {
                          setRivalLosses(e.target.value);
                          if (errors.rivalLosses) setErrors(prev => ({
                            ...prev,
                            rivalLosses: ""
                          }));
                        }} />
                      </div>
                      {errors.rivalLosses && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.rivalLosses}</span>
                      </div>}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-700">
                      <strong>{contentData.formula_10}</strong>{contentData.magic_number_tg_w_l_1_11}</p>
                    <p className="text-xs text-gray-600 mt-1">{contentData.lower_magic_number_means_closer_to_clinching_12}</p>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={calculateMagicNumber} className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800">{contentData.calculate_number_13}</Button>
                    <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_14}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Result Card (right side) */}
            <div className="hidden lg:block">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mb-3 shadow-lg">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.magic_number_15}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-4">
                    <div className="bg-white p-6 rounded-lg border border-orange-200">
                      <p className={`text-4xl font-bold ${result.celebratory ? "text-green-600" : "text-orange-900"}`}>
                        {result.magicNumber <= 0 ? "0" : result.magicNumber}
                      </p>
                      <p className="text-gray-600 mt-2">{contentData.magic_number_16}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className={`text-sm font-medium ${result.celebratory ? "text-green-700" : "text-orange-700"}`}>
                        {result.contextMessage}
                      </p>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Crown className="w-8 h-8 text-orange-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_team_statistics_and_click_17}{" "}
                      <span className="font-semibold text-orange-600">{contentData.calculate_18}</span>{contentData.to_see_the_magic_number_19}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Results Section */}
          {showResult && result && <div className="mt-8">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Calculator className="w-6 h-6 text-orange-600" />
                  <span>{contentData.detailed_magic_number_breakdown_20}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">{contentData.magic_number_21}</h3>
                    <p className={`text-3xl font-bold mb-1 ${result.celebratory ? "text-green-600" : "text-orange-900"}`}>
                      {result.magicNumber <= 0 ? "0" : result.magicNumber}
                    </p>
                    <p className={`text-sm ${result.celebratory ? "text-green-600" : "text-orange-600"}`}>
                      {result.celebratory ? "Clinched!" : "To Clinch"}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">{contentData.total_games_22}</h3>
                    <p className="text-2xl font-bold text-orange-900 mb-1">{result.totalGames}</p>
                    <p className="text-sm text-orange-600">{contentData.season_length_23}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">{contentData.team_wins_24}</h3>
                    <p className="text-2xl font-bold text-orange-900 mb-1">{result.teamWins}</p>
                    <p className="text-sm text-orange-600">{contentData.current_wins_25}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">{contentData.rival_losses_26}</h3>
                    <p className="text-2xl font-bold text-orange-900 mb-1">{result.rivalLosses}</p>
                    <p className="text-sm text-orange-600">{contentData.current_losses_27}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-2">{contentData.calculation_steps_28}</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>{contentData.formula_29}</strong>{contentData.magic_number_tg_w_l_1_30}</p>
                    <p>
                      <strong>{contentData.calculation_31}</strong> {result.totalGames} - {result.teamWins} - {result.rivalLosses}{contentData.k_1_32}{result.magicNumber}
                    </p>
                    <p className={`font-medium ${result.celebratory ? "text-green-700" : "text-orange-700"}`}>
                      <strong>{contentData.result_33}</strong> {result.contextMessage}
                    </p>
                  </div>
                </div>

                {!result.celebratory && result.magicNumber > 0 && <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2">{contentData.dynamic_scenarios_34}</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>{contentData.if_your_team_wins_35}{Math.min(result.magicNumber, 5)}{contentData.more_games_you_will_clinch_36}</p>
                    <p>{contentData.if_your_rival_loses_37}{Math.min(result.magicNumber, 5)}{contentData.more_games_you_will_clinch_38}</p>
                    <p>{contentData.any_combination_of_39}{result.magicNumber}{contentData.team_wins_rival_losses_clinch_40}</p>
                  </div>
                </div>}
              </CardContent>
            </Card>
          </div>}
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Fielding Percentage Calculator",
            calculatorHref: "/sports/fielding-percentage-calculator",
            calculatorDescription: "Calculate fielding percentage for baseball players"
          }, {
            calculatorName: "Pitching Insights",
            calculatorHref: "/sports/fielding-independent-pitching-calculator",
            calculatorDescription: "Calculate fielding independent pitching (FIP) for baseball players"
          }, {
            calculatorName: "Team Batting Stats",
            calculatorHref: "/sports/batting-average-calculator",
            calculatorDescription: "Calculate batting average and related statistics for baseball and softball players with comprehensive performance metrics"
          }
          ]}
            color="orange"
            title="Related Sport Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mr-3 shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.understanding_magic_numbers_41}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.what_is_a_magic_number_42}</h3>
                    <p className="text-gray-700 mb-4">{contentData.the_magic_number_shows_how_many_combined_wins_by_y_43}</p>
                    <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.how_it_works_44}</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>{contentData.every_win_by_your_team_reduces_the_magic_number_by_45}</li>
                      <li>{contentData.every_loss_by_your_rival_reduces_the_magic_number__46}</li>
                      <li>{contentData.magic_number_0_means_youve_clinched_47}</li>
                      <li>{contentData.magic_number_1_means_one_final_push_needed_48}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.sample_calculation_49}</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.example_50}</strong>{contentData.mlb_season_51}</p>
                      <p className="text-gray-700">{contentData.total_games_162_52}</p>
                      <p className="text-gray-700">{contentData.team_wins_96_53}</p>
                      <p className="text-gray-700">{contentData.rival_losses_62_54}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.calculation_55}</strong>
                      </p>
                      <p className="text-gray-700">{contentData.magic_number_162_96_62_1_56}</p>
                      <p className="text-gray-700 font-semibold">{contentData.magic_number_5_57}</p>
                      <p className="text-gray-700 mt-2">{contentData.any_combination_of_5_more_wins_by_your_team_or_5_m_58}</p>
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