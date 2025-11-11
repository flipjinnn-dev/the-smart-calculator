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
import { Calculator, RotateCcw, Timer, Activity, Zap, Clock } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
;
export default function PaceCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('pace-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('pace-calculator', language, "calculator-guide");

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
    "pace_calculation_0": "",
    "enter_time_and_distance_to_calculate_your_running__1": "",
    "time_hhmmss_or_flexible_format_2": "",
    "examples_530_2545_13000_3": "",
    "distance_4": "",
    "miles_5": "",
    "km_6": "",
    "meters_7": "",
    "yards_8": "",
    "race_presets_optional_9": "",
    "output_format_10": "",
    "pace_minmile_11": "",
    "pace_minkm_12": "",
    "speed_mph_13": "",
    "speed_kmh_14": "",
    "calculate_15": "",
    "reset_16": "",
    "your_pace_17": "",
    "enter_your_time_and_distance_to_calculate_your_run_18": "",
    "your_running_results_19": "",
    "primary_result_20": "",
    "all_formats_21": "",
    "calculation_details_22": "",
    "input_summary_23": "",
    "time_24": "",
    "distance_25": "",
    "conversions_26": "",
    "distance_27": "",
    "miles_28": "",
    "distance_29": "",
    "km_30": "",
    "understanding_running_pace_31": "",
    "pace_vs_speed_32": "",
    "pace_33": "",
    "time_per_unit_distance_minmile_minkm_34": "",
    "speed_35": "",
    "distance_per_unit_time_mph_kmh_36": "",
    "faster_pace_lower_time_per_mile_37": "",
    "higher_speed_more_distance_per_hour_38": "",
    "example_calculation_39": "",
    "k_5k_in_2500_40": "",
    "distance_5_km_311_miles_41": "",
    "pace_2500_5_42": "",
    "k_500_minkm_43": "",
    "pace_2500_311_44": "",
    "k_802_minmile_45": "",
    "speed_46": "",
    "k_75_mph_47": "",
    "or_48": "",
    "k_12_kmh_49": "",
    "training_zones_50": "",
    "easy_run_51": "",
    "k_12_minmile_slower_than_5k_pace_52": "",
    "tempo_53": "",
    "k_1530_secmile_slower_than_5k_pace_54": "",
    "interval_55": "",
    "k_5k_pace_or_faster_56": "",
    "long_run_57": "",
    "k_3090_secmile_slower_than_5k_pace_58": "",
    "common_race_paces_59": "",
    "k_5k_60": "",
    "k_6001000_minmile_recreational_61": "",
    "k_10k_62": "",
    "k_6301030_minmile_63": "",
    "half_marathon_64": "",
    "k_7001100_minmile_65": "",
    "marathon_66": "",
    "k_7301200_minmile_67": ""
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
  const [timeInput, setTimeInput] = useState("");
  const [distanceInput, setDistanceInput] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [outputUnit, setOutputUnit] = useState("min_per_mile");

  // Race presets
  const racePresets = {
    "5k": {
      distance: 5,
      unit: "km"
    },
    "10k": {
      distance: 10,
      unit: "km"
    },
    half_marathon: {
      distance: 13.1,
      unit: "miles"
    },
    marathon: {
      distance: 26.2,
      unit: "miles"
    },
    "1500m": {
      distance: 1500,
      unit: "meters"
    },
    "1_mile": {
      distance: 1,
      unit: "miles"
    },
    "3000m": {
      distance: 3000,
      unit: "meters"
    },
    "5000m": {
      distance: 5000,
      unit: "meters"
    }
  };
  const parseTimeInput = (input: string): number => {
    if (!input.trim()) return 0;

    // Handle flexible formats like "5:3" → "00:05:03"
    const parts = input.split(":").map(p => p.trim());
    if (parts.length === 1) {
      // Just seconds
      return Number.parseInt(parts[0]) || 0;
    } else if (parts.length === 2) {
      // mm:ss format
      const minutes = Number.parseInt(parts[0]) || 0;
      const seconds = Number.parseInt(parts[1]) || 0;
      return minutes * 60 + seconds;
    } else if (parts.length === 3) {
      // hh:mm:ss format
      const hours = Number.parseInt(parts[0]) || 0;
      const minutes = Number.parseInt(parts[1]) || 0;
      const seconds = Number.parseInt(parts[2]) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = Math.floor(totalSeconds % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };
  const convertDistance = (distance: number, fromUnit: string, toUnit: string): number => {
    // Convert to meters first
    let meters = distance;
    switch (fromUnit) {
      case "miles":
        meters = distance * 1609.34;
        break;
      case "km":
        meters = distance * 1000;
        break;
      case "yards":
        meters = distance * 0.9144;
        break;
      case "meters":
        meters = distance;
        break;
    }

    // Convert from meters to target unit
    switch (toUnit) {
      case "miles":
        return meters / 1609.34;
      case "km":
        return meters / 1000;
      case "yards":
        return meters / 0.9144;
      case "meters":
        return meters;
      default:
        return meters;
    }
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const timeSeconds = parseTimeInput(timeInput);
    const distance = Number.parseFloat(distanceInput);

    // Check if we have at least 2 inputs
    const hasTime = timeSeconds > 0;
    const hasDistance = distance > 0;
    if (!hasTime && !hasDistance) {
      newErrors.general = "Please enter at least time and distance to calculate pace";
      setErrors(newErrors);
      return false;
    }
    if (hasTime && timeSeconds <= 0) {
      newErrors.time = "Time must be greater than 0";
    }
    if (hasDistance && distance <= 0) {
      newErrors.distance = "Distance must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculatePace = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      const timeSeconds = parseTimeInput(timeInput);
      const distance = Number.parseFloat(distanceInput);

      // Convert distance to standard unit (miles for pace calculations)
      const distanceInMiles = convertDistance(distance, distanceUnit, "miles");
      const distanceInKm = convertDistance(distance, distanceUnit, "km");

      // Calculate in seconds per mile
      const paceSecondsPerMile = timeSeconds / distanceInMiles;
      const paceSecondsPerKm = timeSeconds / distanceInKm;

      // Calculate
      const speedMph = distanceInMiles / timeSeconds * 3600;
      const speedKmh = distanceInKm / timeSeconds * 3600;

      // Format results based on output unit
      let primaryResult = "";
      let secondaryResults: {
        [key: string]: string;
      } = {};
      switch (outputUnit) {
        case "min_per_mile":
          primaryResult = formatTime(paceSecondsPerMile);
          secondaryResults = {
            "Pace per km": formatTime(paceSecondsPerKm),
            "Speed (mph)": speedMph.toFixed(2),
            "Speed (km/h)": speedKmh.toFixed(2)
          };
          break;
        case "min_per_km":
          primaryResult = formatTime(paceSecondsPerKm);
          secondaryResults = {
            "Pace per mile": formatTime(paceSecondsPerMile),
            "Speed (mph)": speedMph.toFixed(2),
            "Speed (km/h)": speedKmh.toFixed(2)
          };
          break;
        case "mph":
          primaryResult = speedMph.toFixed(2);
          secondaryResults = {
            "Pace per mile": formatTime(paceSecondsPerMile),
            "Pace per km": formatTime(paceSecondsPerKm),
            "Speed (km/h)": speedKmh.toFixed(2)
          };
          break;
        case "kmh":
          primaryResult = speedKmh.toFixed(2);
          secondaryResults = {
            "Pace per mile": formatTime(paceSecondsPerMile),
            "Pace per km": formatTime(paceSecondsPerKm),
            "Speed (mph)": speedMph.toFixed(2)
          };
          break;
      }
      setResult({
        primaryResult,
        secondaryResults,
        outputUnit,
        inputs: {
          time: timeInput,
          distance: distanceInput,
          distanceUnit,
          totalSeconds: timeSeconds,
          distanceValue: distance
        },
        calculations: {
          paceSecondsPerMile,
          paceSecondsPerKm,
          speedMph,
          speedKmh,
          distanceInMiles,
          distanceInKm
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating pace. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setTimeInput("");
    setDistanceInput("");
    setDistanceUnit("miles");
    setOutputUnit("min_per_mile");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const handleRacePreset = (preset: string) => {
    const race = racePresets[preset as keyof typeof racePresets];
    if (race) {
      setDistanceInput(race.distance.toString());
      setDistanceUnit(race.unit);
    }
  };
  const getOutputUnitLabel = (unit: string) => {
    switch (unit) {
      case "min_per_mile":
        return "min/mile";
      case "min_per_km":
        return "min/km";
      case "mph":
        return "mph";
      case "kmh":
        return "km/h";
      default:
        return unit;
    }
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>{contentData.pace_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_time_and_distance_to_calculate_your_running__1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Time Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.time_hhmmss_or_flexible_format_2}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Timer className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.time ? "border-red-300" : ""}`} type="text" placeholder="25:30 or 1:25:30" value={timeInput} onChange={e => setTimeInput(e.target.value)} />
                        </div>
                        {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.examples_530_2545_13000_3}</p>
                      </div>

                      {/* Distance Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.distance_4}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Activity className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.distance ? "border-red-300" : ""}`} type="text" placeholder="5.0" value={distanceInput} onChange={e => setDistanceInput(e.target.value)} />
                          </div>
                          <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                            <SelectTrigger className="w-32 h-12 border-2 focus:border-orange-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="miles">{contentData.miles_5}</SelectItem>
                              <SelectItem value="km">{contentData.km_6}</SelectItem>
                              <SelectItem value="meters">{contentData.meters_7}</SelectItem>
                              <SelectItem value="yards">{contentData.yards_8}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.distance && <p className="text-red-600 text-xs mt-1">{errors.distance}</p>}
                      </div>

                      {/* Race Presets */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.race_presets_optional_9}</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {Object.entries(racePresets).map(([key, race]) => <Button key={key} variant="outline" size="sm" onClick={() => handleRacePreset(key)} className="text-xs border-orange-300 text-orange-700 hover:bg-orange-50">
                              {key.replace("_", " ").toUpperCase()}
                            </Button>)}
                        </div>
                      </div>

                      {/* Output Unit Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.output_format_10}</Label>
                        <Select value={outputUnit} onValueChange={setOutputUnit}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="min_per_mile">{contentData.pace_minmile_11}</SelectItem>
                            <SelectItem value="min_per_km">{contentData.pace_minkm_12}</SelectItem>
                            <SelectItem value="mph">{contentData.speed_mph_13}</SelectItem>
                            <SelectItem value="kmh">{contentData.speed_kmh_14}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculatePace} className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800">{contentData.calculate_15}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_16}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mb-3 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.your_pace_17}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <p className="text-2xl font-bold text-orange-900">{result.primaryResult}</p>
                          <p className="text-gray-600 text-sm">{getOutputUnitLabel(result.outputUnit)}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Activity className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_time_and_distance_to_calculate_your_run_18}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-orange-600" />
                      <span>{contentData.your_running_results_19}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Main Results */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                      <h3 className="text-xl font-semibold text-orange-700 mb-4">{contentData.primary_result_20}</h3>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-orange-700 mb-2">{result.primaryResult}</p>
                        <p className="text-lg text-gray-600">{getOutputUnitLabel(result.outputUnit)}</p>
                      </div>
                    </div>

                    {/* Secondary Results */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-orange-700 mb-4">{contentData.all_formats_21}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(result.secondaryResults).map(([label, value]) => <div key={label} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-lg font-bold text-orange-700">{result.secondaryResults.value}</p>
                            <p className="text-sm text-gray-600">{label}</p>
                          </div>)}
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-orange-700 mb-6">{contentData.calculation_details_22}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-700 mb-3">{contentData.input_summary_23}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.time_24}</strong> {result.inputs.time} ({formatTime(result.inputs.totalSeconds)})
                            </p>
                            <p>
                              <strong>{contentData.distance_25}</strong> {result.inputs.distance} {result.inputs.distanceUnit}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <h4 className="font-semibold text-amber-700 mb-3">{contentData.conversions_26}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.distance_27}</strong> {result.calculations.distanceInMiles.toFixed(2)}{contentData.miles_28}</p>
                            <p>
                              <strong>{contentData.distance_29}</strong> {result.calculations.distanceInKm.toFixed(2)}{contentData.km_30}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mr-3 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.understanding_running_pace_31}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.pace_vs_speed_32}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.pace_33}</strong>{contentData.time_per_unit_distance_minmile_minkm_34}</li>
                          <li>
                            <strong>{contentData.speed_35}</strong>{contentData.distance_per_unit_time_mph_kmh_36}</li>
                          <li>{contentData.faster_pace_lower_time_per_mile_37}</li>
                          <li>{contentData.higher_speed_more_distance_per_hour_38}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.example_calculation_39}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.k_5k_in_2500_40}</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{contentData.distance_5_km_311_miles_41}</p>
                          <p>{contentData.pace_2500_5_42}<strong>{contentData.k_500_minkm_43}</strong>
                          </p>
                          <p>{contentData.pace_2500_311_44}<strong>{contentData.k_802_minmile_45}</strong>
                          </p>
                          <p>{contentData.speed_46}<strong>{contentData.k_75_mph_47}</strong>{contentData.or_48}<strong>{contentData.k_12_kmh_49}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.training_zones_50}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.easy_run_51}</strong>{contentData.k_12_minmile_slower_than_5k_pace_52}</li>
                          <li>
                            <strong>{contentData.tempo_53}</strong>{contentData.k_1530_secmile_slower_than_5k_pace_54}</li>
                          <li>
                            <strong>{contentData.interval_55}</strong>{contentData.k_5k_pace_or_faster_56}</li>
                          <li>
                            <strong>{contentData.long_run_57}</strong>{contentData.k_3090_secmile_slower_than_5k_pace_58}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.common_race_paces_59}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            <strong>{contentData.k_5k_60}</strong>{contentData.k_6001000_minmile_recreational_61}</p>
                          <p>
                            <strong>{contentData.k_10k_62}</strong>{contentData.k_6301030_minmile_63}</p>
                          <p>
                            <strong>{contentData.half_marathon_64}</strong>{contentData.k_7001100_minmile_65}</p>
                          <p>
                            <strong>{contentData.marathon_66}</strong>{contentData.k_7301200_minmile_67}</p>
                        </div>
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