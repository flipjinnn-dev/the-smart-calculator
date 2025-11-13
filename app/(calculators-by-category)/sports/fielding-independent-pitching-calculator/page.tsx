"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Trophy, Calculator, Target, AlertCircle, Activity, RotateCcw, HelpCircle, BarChart3 } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";
export default function FieldingIndependentPitchingCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('fielding-independent-pitching-calculator', language, "calculator-ui");

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
    "enter_pitching_statistics_to_calculate_fielding_in_1": "",
    "home_runs_allowed_hr_2": "",
    "home_runs_allowed_by_the_pitcher_3": "",
    "walks_bb_4": "",
    "base_on_balls_issued_by_the_pitcher_5": "",
    "hit_by_pitch_hbp_6": "",
    "batters_hit_by_pitch_7": "",
    "strikeouts_k_8": "",
    "strikeouts_recorded_by_the_pitcher_9": "",
    "innings_pitched_ip_10": "",
    "total_innings_pitched_eg_1452_11": "",
    "fip_constant_cfip_12": "",
    "scaling_constant_3132_13": "",
    "decimal_precision_14": "",
    "k_1_decimal_place_15": "",
    "k_2_decimal_places_16": "",
    "k_3_decimal_places_17": "",
    "advanced_mode_18": "",
    "calculate_cfip_from_league_stats_19": "",
    "league_statistics_20": "",
    "league_era_21": "",
    "league_hr_22": "",
    "league_bb_23": "",
    "league_hbp_24": "",
    "league_k_25": "",
    "league_ip_26": "",
    "formula_27": "",
    "fip_13hr_3bbhbp_2k_ip_cfip_28": "",
    "lower_fip_indicates_better_pitcher_performance_29": "",
    "calculate_30": "",
    "reset_31": "",
    "fip_results_32": "",
    "fip_33": "",
    "performance_34": "",
    "custom_cfip_35": "",
    "enter_pitching_statistics_and_click_36": "",
    "calculate_37": "",
    "to_see_fip_38": "",
    "detailed_fip_breakdown_39": "",
    "fip_40": "",
    "hr_component_41": "",
    "k_13_42": "",
    "bbhbp_component_43": "",
    "k_3_44": "",
    "k_component_45": "",
    "k_2_46": "",
    "calculation_steps_47": "",
    "step_1_48": "",
    "numerator_13_49": "",
    "k_3_50": "",
    "k_2_51": "",
    "step_2_52": "",
    "divide_by_ip_53": "",
    "step_3_54": "",
    "add_cfip_55": "",
    "note_56": "",
    "custom_cfip_calculated_from_league_statistics_57": "",
    "understanding_fip_58": "",
    "what_is_fip_59": "",
    "fielding_independent_pitching_fip_evaluates_a_pitc_60": "",
    "fip_vs_era_comparison_61": "",
    "fip_era_neutral_defenseluck_62": "",
    "fip_era_defense_may_have_hurt_pitcher_63": "",
    "fip_era_defense_may_have_helped_pitcher_64": "",
    "sample_calculation_65": "",
    "example_66": "",
    "pitcher_statistics_67": "",
    "hr_21_bb_55_hbp_13_68": "",
    "k_235_ip_145_cfip_3214_69": "",
    "calculation_70": "",
    "numerator_1321_35513_2235_7_71": "",
    "fip_7_145_3214_72": "",
    "fip_326_73": "",
    "note_74": "",
    "average_fip_is_typically_around_420_varying_by_sea_75": ""
  };
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [decimalPrecision, setDecimalPrecision] = useState("2");
  const [advancedMode, setAdvancedMode] = useState(false);

  // Input states
  const [homeRuns, setHomeRuns] = useState("");
  const [walks, setWalks] = useState("");
  const [hitByPitch, setHitByPitch] = useState("");
  const [strikeouts, setStrikeouts] = useState("");
  const [inningsPitched, setInningsPitched] = useState("");
  const [fipConstant, setFipConstant] = useState("3.214");

  // Advanced mode league stats
  const [leagueERA, setLeagueERA] = useState("");
  const [leagueHR, setLeagueHR] = useState("");
  const [leagueBB, setLeagueBB] = useState("");
  const [leagueHBP, setLeagueHBP] = useState("");
  const [leagueK, setLeagueK] = useState("");
  const [leagueIP, setLeagueIP] = useState("");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!homeRuns || Number.parseInt(homeRuns) < 0 || !Number.isInteger(Number.parseFloat(homeRuns))) {
      newErrors.homeRuns = "Please enter a valid number of home runs (≥ 0, whole number)";
    }
    if (!walks || Number.parseInt(walks) < 0 || !Number.isInteger(Number.parseFloat(walks))) {
      newErrors.walks = "Please enter a valid number of walks (≥ 0, whole number)";
    }
    if (!hitByPitch || Number.parseInt(hitByPitch) < 0 || !Number.isInteger(Number.parseFloat(hitByPitch))) {
      newErrors.hitByPitch = "Please enter a valid number of hit by pitch (≥ 0, whole number)";
    }
    if (!strikeouts || Number.parseInt(strikeouts) < 0 || !Number.isInteger(Number.parseFloat(strikeouts))) {
      newErrors.strikeouts = "Please enter a valid number of strikeouts (≥ 0, whole number)";
    }
    if (!inningsPitched || Number.parseFloat(inningsPitched) <= 0) {
      newErrors.inningsPitched = "Please enter a valid number of innings pitched (> 0)";
    }
    if (!fipConstant || Number.parseFloat(fipConstant) <= 0) {
      newErrors.fipConstant = "Please enter a valid FIP constant (> 0)";
    }

    // Advanced mode validation
    if (advancedMode) {
      if (!leagueERA || Number.parseFloat(leagueERA) <= 0) {
        newErrors.leagueERA = "Please enter a valid league ERA (> 0)";
      }
      if (!leagueHR || Number.parseInt(leagueHR) < 0) {
        newErrors.leagueHR = "Please enter a valid league HR (≥ 0)";
      }
      if (!leagueBB || Number.parseInt(leagueBB) < 0) {
        newErrors.leagueBB = "Please enter a valid league BB (≥ 0)";
      }
      if (!leagueHBP || Number.parseInt(leagueHBP) < 0) {
        newErrors.leagueHBP = "Please enter a valid league HBP (≥ 0)";
      }
      if (!leagueK || Number.parseInt(leagueK) < 0) {
        newErrors.leagueK = "Please enter a valid league K (≥ 0)";
      }
      if (!leagueIP || Number.parseFloat(leagueIP) <= 0) {
        newErrors.leagueIP = "Please enter a valid league IP (> 0)";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateFIP = () => {
    if (!validateInputs()) return;
    const hr = Number.parseInt(homeRuns);
    const bb = Number.parseInt(walks);
    const hbp = Number.parseInt(hitByPitch);
    const k = Number.parseInt(strikeouts);
    const ip = Number.parseFloat(inningsPitched);
    let cfip = Number.parseFloat(fipConstant);

    // Calculate cFIP if in advanced mode
    if (advancedMode) {
      const lERA = Number.parseFloat(leagueERA);
      const lHR = Number.parseInt(leagueHR);
      const lBB = Number.parseInt(leagueBB);
      const lHBP = Number.parseInt(leagueHBP);
      const lK = Number.parseInt(leagueK);
      const lIP = Number.parseFloat(leagueIP);
      cfip = lERA - (13 * lHR + 3 * (lBB + lHBP) - 2 * lK) / lIP;
    }

    // Calculate components
    const hrComponent = 13 * hr;
    const walkHbpComponent = 3 * (bb + hbp);
    const strikeoutComponent = -2 * k;
    const numerator = hrComponent + walkHbpComponent + strikeoutComponent;

    // Calculate
    const fip = numerator / ip + cfip;

    // Determine performance level
    let performanceLevel = "";
    if (fip <= 3.2) {
      performanceLevel = "Excellent";
    } else if (fip <= 3.75) {
      performanceLevel = "Above Average";
    } else if (fip <= 4.2) {
      performanceLevel = "Average";
    } else if (fip <= 4.75) {
      performanceLevel = "Below Average";
    } else {
      performanceLevel = "Poor";
    }
    setResult({
      homeRuns: hr,
      walks: bb,
      hitByPitch: hbp,
      strikeouts: k,
      inningsPitched: ip,
      fipConstant: cfip,
      hrComponent: hrComponent,
      walkHbpComponent: walkHbpComponent,
      strikeoutComponent: strikeoutComponent,
      numerator: numerator,
      fip: fip,
      performanceLevel: performanceLevel,
      customCFIP: advancedMode
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setHomeRuns("");
    setWalks("");
    setHitByPitch("");
    setStrikeouts("");
    setInningsPitched("");
    setFipConstant("3.214");
    setLeagueERA("");
    setLeagueHR("");
    setLeagueBB("");
    setLeagueHBP("");
    setLeagueK("");
    setLeagueIP("");
    setResult(null);
    setShowResult(false);
    setErrors({});
    setAdvancedMode(false);
  };
  const precision = Number.parseInt(decimalPrecision);
  return <>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-purple-600" />
                      <span>{contentData.pitching_statistics_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_pitching_statistics_to_calculate_fielding_in_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Home Runs */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3  flex items-center">{contentData.home_runs_allowed_hr_2}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.home_runs_allowed_by_the_pitcher_3}</div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.homeRuns ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter home runs" value={homeRuns} onChange={e => {
                          setHomeRuns(e.target.value);
                          if (errors.homeRuns) setErrors(prev => ({
                            ...prev,
                            homeRuns: ""
                          }));
                        }} />
                        </div>
                        {errors.homeRuns && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.homeRuns}</span>
                          </div>}
                      </div>

                      {/* Walks */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3  flex items-center">{contentData.walks_bb_4}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.base_on_balls_issued_by_the_pitcher_5}</div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.walks ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter walks" value={walks} onChange={e => {
                          setWalks(e.target.value);
                          if (errors.walks) setErrors(prev => ({
                            ...prev,
                            walks: ""
                          }));
                        }} />
                        </div>
                        {errors.walks && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.walks}</span>
                          </div>}
                      </div>

                      {/* Hit By Pitch */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3  flex items-center">{contentData.hit_by_pitch_hbp_6}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.batters_hit_by_pitch_7}</div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.hitByPitch ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter HBP" value={hitByPitch} onChange={e => {
                          setHitByPitch(e.target.value);
                          if (errors.hitByPitch) setErrors(prev => ({
                            ...prev,
                            hitByPitch: ""
                          }));
                        }} />
                        </div>
                        {errors.hitByPitch && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.hitByPitch}</span>
                          </div>}
                      </div>

                      {/* Strikeouts */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.strikeouts_k_8}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.strikeouts_recorded_by_the_pitcher_9}</div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Trophy className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.strikeouts ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter strikeouts" value={strikeouts} onChange={e => {
                          setStrikeouts(e.target.value);
                          if (errors.strikeouts) setErrors(prev => ({
                            ...prev,
                            strikeouts: ""
                          }));
                        }} />
                        </div>
                        {errors.strikeouts && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.strikeouts}</span>
                          </div>}
                      </div>

                      {/* Innings Pitched */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.innings_pitched_ip_10}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.total_innings_pitched_eg_1452_11}</div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BarChart3 className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.inningsPitched ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter innings pitched" value={inningsPitched} onChange={e => {
                          setInningsPitched(e.target.value);
                          if (errors.inningsPitched) setErrors(prev => ({
                            ...prev,
                            inningsPitched: ""
                          }));
                        }} />
                        </div>
                        {errors.inningsPitched && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.inningsPitched}</span>
                          </div>}
                      </div>

                      {/* FIP Constant */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.fip_constant_cfip_12}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">{contentData.scaling_constant_3132_13}</div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.fipConstant ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.001" min="0" placeholder="Enter FIP constant" value={fipConstant} onChange={e => {
                          setFipConstant(e.target.value);
                          if (errors.fipConstant) setErrors(prev => ({
                            ...prev,
                            fipConstant: ""
                          }));
                        }} disabled={advancedMode} />
                        </div>
                        {errors.fipConstant && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.fipConstant}</span>
                          </div>}
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Decimal Precision */}
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.decimal_precision_14}</Label>
                        <Select value={decimalPrecision} onValueChange={setDecimalPrecision}>
                          <SelectTrigger className="w-full h-12 border-purple-300 focus:border-purple-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">{contentData.k_1_decimal_place_15}</SelectItem>
                            <SelectItem value="2">{contentData.k_2_decimal_places_16}</SelectItem>
                            <SelectItem value="3">{contentData.k_3_decimal_places_17}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Advanced Mode Toggle */}
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">{contentData.advanced_mode_18}</Label>
                            <p className="text-xs text-gray-600 mt-1">{contentData.calculate_cfip_from_league_stats_19}</p>
                          </div>
                          <Switch checked={advancedMode} onCheckedChange={setAdvancedMode} className="data-[state=checked]:bg-purple-600" />
                        </div>
                      </div>
                    </div>

                    {/* Advanced Mode League Stats */}
                    {advancedMode && <div className="mb-6 p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="text-lg font-semibold text-purple-700 mb-4">{contentData.league_statistics_20}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.league_era_21}</Label>
                            <Input className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${errors.leagueERA ? "border-red-300 focus:border-red-400" : ""}`} type="number" step="0.01" placeholder="4.50" value={leagueERA} onChange={e => {
                          setLeagueERA(e.target.value);
                          if (errors.leagueERA) setErrors(prev => ({
                            ...prev,
                            leagueERA: ""
                          }));
                        }} />
                            {errors.leagueERA && <span className="text-xs text-red-600 mt-1">{errors.leagueERA}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.league_hr_22}</Label>
                            <Input className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${errors.leagueHR ? "border-red-300 focus:border-red-400" : ""}`} type="number" step="1" placeholder="5000" value={leagueHR} onChange={e => {
                          setLeagueHR(e.target.value);
                          if (errors.leagueHR) setErrors(prev => ({
                            ...prev,
                            leagueHR: ""
                          }));
                        }} />
                            {errors.leagueHR && <span className="text-xs text-red-600 mt-1">{errors.leagueHR}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.league_bb_23}</Label>
                            <Input className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${errors.leagueBB ? "border-red-300 focus:border-red-400" : ""}`} type="number" step="1" placeholder="8000" value={leagueBB} onChange={e => {
                          setLeagueBB(e.target.value);
                          if (errors.leagueBB) setErrors(prev => ({
                            ...prev,
                            leagueBB: ""
                          }));
                        }} />
                            {errors.leagueBB && <span className="text-xs text-red-600 mt-1">{errors.leagueBB}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.league_hbp_24}</Label>
                            <Input className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${errors.leagueHBP ? "border-red-300 focus:border-red-400" : ""}`} type="number" step="1" placeholder="1500" value={leagueHBP} onChange={e => {
                          setLeagueHBP(e.target.value);
                          if (errors.leagueHBP) setErrors(prev => ({
                            ...prev,
                            leagueHBP: ""
                          }));
                        }} />
                            {errors.leagueHBP && <span className="text-xs text-red-600 mt-1">{errors.leagueHBP}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.league_k_25}</Label>
                            <Input className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${errors.leagueK ? "border-red-300 focus:border-red-400" : ""}`} type="number" step="1" placeholder="22000" value={leagueK} onChange={e => {
                          setLeagueK(e.target.value);
                          if (errors.leagueK) setErrors(prev => ({
                            ...prev,
                            leagueK: ""
                          }));
                        }} />
                            {errors.leagueK && <span className="text-xs text-red-600 mt-1">{errors.leagueK}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.league_ip_26}</Label>
                            <Input className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${errors.leagueIP ? "border-red-300 focus:border-red-400" : ""}`} type="number" step="0.1" placeholder="43000" value={leagueIP} onChange={e => {
                          setLeagueIP(e.target.value);
                          if (errors.leagueIP) setErrors(prev => ({
                            ...prev,
                            leagueIP: ""
                          }));
                        }} />
                            {errors.leagueIP && <span className="text-xs text-red-600 mt-1">{errors.leagueIP}</span>}
                          </div>
                        </div>
                      </div>}

                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.formula_27}</strong>{contentData.fip_13hr_3bbhbp_2k_ip_cfip_28}</p>
                      <p className="text-xs text-gray-600 mt-1">{contentData.lower_fip_indicates_better_pitcher_performance_29}</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateFIP} className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800">{contentData.calculate_30}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_31}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mb-3 shadow-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.fip_results_32}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <p className="text-3xl font-bold text-purple-900">{result.fip?.toFixed(precision)}</p>
                            <p className="text-gray-600">{contentData.fip_33}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-sm font-bold text-purple-900">{result.performanceLevel}</p>
                            <p className="text-gray-600">{contentData.performance_34}</p>
                          </div>
                          {result.customCFIP && <div className="bg-white p-3 rounded-lg border border-purple-200">
                              <p className="text-lg font-bold text-purple-900">{result.fipConstant?.toFixed(3)}</p>
                              <p className="text-gray-600">{contentData.custom_cfip_35}</p>
                            </div>}
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-purple-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_pitching_statistics_and_click_36}{" "}
                          <span className="font-semibold text-purple-600">{contentData.calculate_37}</span>{contentData.to_see_fip_38}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>{contentData.detailed_fip_breakdown_39}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{contentData.fip_40}</h3>
                        <p className="text-3xl font-bold text-purple-900 mb-1">{result.fip?.toFixed(precision)}</p>
                        <p className="text-sm text-purple-600">{result.performanceLevel}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{contentData.hr_component_41}</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{result.hrComponent}</p>
                        <p className="text-sm text-purple-600">{contentData.k_13_42}{result.homeRuns}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{contentData.bbhbp_component_43}</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{result.walkHbpComponent}</p>
                        <p className="text-sm text-purple-600">{contentData.k_3_44}{result.walks}+{result.hitByPitch})
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{contentData.k_component_45}</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{result.strikeoutComponent}</p>
                        <p className="text-sm text-purple-600">{contentData.k_2_46}{result.strikeouts}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-2">{contentData.calculation_steps_47}</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>{contentData.step_1_48}</strong>{contentData.numerator_13_49}{result.homeRuns}{contentData.k_3_50}{result.walks}+
                          {result.hitByPitch}{contentData.k_2_51}{result.strikeouts} = {result.numerator}
                        </p>
                        <p>
                          <strong>{contentData.step_2_52}</strong>{contentData.divide_by_ip_53}{result.numerator} ÷ {result.inningsPitched} ={" "}
                          {(result.numerator / result.inningsPitched).toFixed(3)}
                        </p>
                        <p>
                          <strong>{contentData.step_3_54}</strong>{contentData.add_cfip_55}{(result.numerator / result.inningsPitched).toFixed(3)} +{" "}
                          {result.fipConstant?.toFixed(3)} = {result.fip?.toFixed(precision)}
                        </p>
                        {result.customCFIP && <p className="text-purple-600">
                            <strong>{contentData.note_56}</strong>{contentData.custom_cfip_calculated_from_league_statistics_57}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Magic Number Calculator",
          calculatorHref: "/sports/magic-number-calculator",
          calculatorDescription: "Calculate the magic number for playoff contention in sports"
        }, {
          calculatorName: "Fielding Percentage Calculator",
          calculatorHref: "/sports/fielding-percentage-calculator",
          calculatorDescription: "Calculate fielding percentage for baseball players"
        }, {
          calculatorName: "Earned Run Average Calculator",
          calculatorHref: "/sports/earned-run-average-calculator",
          calculatorDescription: "Calculate earned run average (ERA) for pitchers"
        }
        ]} 
        color="purple" 
        title="Related Sport Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mr-3 shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.understanding_fip_58}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.what_is_fip_59}</h3>
                      <p className="text-gray-700 mb-4">{contentData.fielding_independent_pitching_fip_evaluates_a_pitc_60}</p>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.fip_vs_era_comparison_61}</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>{contentData.fip_era_neutral_defenseluck_62}</li>
                        <li>{contentData.fip_era_defense_may_have_hurt_pitcher_63}</li>
                        <li>{contentData.fip_era_defense_may_have_helped_pitcher_64}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.sample_calculation_65}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.example_66}</strong>{contentData.pitcher_statistics_67}</p>
                        <p className="text-gray-700">{contentData.hr_21_bb_55_hbp_13_68}</p>
                        <p className="text-gray-700">{contentData.k_235_ip_145_cfip_3214_69}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.calculation_70}</strong>
                        </p>
                        <p className="text-gray-700">{contentData.numerator_1321_35513_2235_7_71}</p>
                        <p className="text-gray-700">{contentData.fip_7_145_3214_72}</p>
                        <p className="text-gray-700 font-semibold">{contentData.fip_326_73}</p>
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800">
                          <strong>{contentData.note_74}</strong>{contentData.average_fip_is_typically_around_420_varying_by_sea_75}</p>
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