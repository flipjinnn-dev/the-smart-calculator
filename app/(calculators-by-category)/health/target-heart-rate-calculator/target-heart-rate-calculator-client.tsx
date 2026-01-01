"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Calculator, RotateCcw, Heart, Activity, Target } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;

interface TargetHeartRateCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function TargetHeartRateCalculatorClient({ content, guideContent }: TargetHeartRateCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [age, setAge] = useState("");
  const [maxHR, setMaxHR] = useState(""); // Optional override
  const [restingHR, setRestingHR] = useState(""); // Optional, required for Karvonen
  const [mhrFormula, setMhrFormula] = useState("haskell"); // haskell, tanaka, nes
  const [calculationMethod, setCalculationMethod] = useState("percentage"); // percentage, karvonen
  const [intensityZone, setIntensityZone] = useState("moderate"); // light, moderate, vigorous, custom
  const [customMinIntensity, setCustomMinIntensity] = useState("");
  const [customMaxIntensity, setCustomMaxIntensity] = useState("");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const ageNum = Number.parseInt(age);
    if (!age || ageNum < 10 || ageNum > 100) {
      newErrors.age = "Please enter a valid age (10-100)";
    }
    if (maxHR) {
      const maxHRNum = Number.parseInt(maxHR);
      if (maxHRNum < 100 || maxHRNum > 220) {
        newErrors.maxHR = "Max HR should be between 100-220 bpm";
      }
    }
    if (calculationMethod === "karvonen" && !restingHR) {
      newErrors.restingHR = "Resting HR is required for Karvonen method";
    }
    if (restingHR) {
      const restingHRNum = Number.parseInt(restingHR);
      if (restingHRNum < 30 || restingHRNum > 100) {
        newErrors.restingHR = "Resting HR should be between 30-100 bpm";
      }
    }
    if (intensityZone === "custom") {
      const minIntensity = Number.parseInt(customMinIntensity);
      const maxIntensity = Number.parseInt(customMaxIntensity);
      if (!customMinIntensity || minIntensity < 40 || minIntensity > 95) {
        newErrors.customMinIntensity = "Min intensity should be 40-95%";
      }
      if (!customMaxIntensity || maxIntensity < 40 || maxIntensity > 95) {
        newErrors.customMaxIntensity = "Max intensity should be 40-95%";
      }
      if (minIntensity >= maxIntensity) {
        newErrors.customMaxIntensity = "Max intensity must be higher than min";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateTargetHeartRate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      const ageNum = Number.parseInt(age);
      let calculatedMHR = 0;

      // Step 1: Calculate use provided MHR
      if (maxHR) {
        calculatedMHR = Number.parseInt(maxHR);
      } else {
        switch (mhrFormula) {
          case "haskell":
            calculatedMHR = 220 - ageNum;
            break;
          case "tanaka":
            calculatedMHR = 208 - 0.7 * ageNum;
            break;
          case "nes":
            calculatedMHR = 211 - 0.64 * ageNum;
            break;
        }
      }

      // Step 2: Get intensity range
      let minIntensity = 0,
        maxIntensity = 0;
      switch (intensityZone) {
        case "light":
          minIntensity = 50;
          maxIntensity = 60;
          break;
        case "moderate":
          minIntensity = 60;
          maxIntensity = 70;
          break;
        case "vigorous":
          minIntensity = 70;
          maxIntensity = 85;
          break;
        case "custom":
          minIntensity = Number.parseInt(customMinIntensity);
          maxIntensity = Number.parseInt(customMaxIntensity);
          break;
      }

      // Step 3: Calculate based on method
      let minTHR = 0,
        maxTHR = 0;
      const restingHRNum = restingHR ? Number.parseInt(restingHR) : 0;
      if (calculationMethod === "percentage") {
        minTHR = Math.round(calculatedMHR * (minIntensity / 100));
        maxTHR = Math.round(calculatedMHR * (maxIntensity / 100));
      } else {
        // Karvonen method
        const hrReserve = calculatedMHR - restingHRNum;
        minTHR = Math.round(hrReserve * (minIntensity / 100) + restingHRNum);
        maxTHR = Math.round(hrReserve * (maxIntensity / 100) + restingHRNum);
      }

      // Calculate zones for display
      const allZones = [{
        name: "Light",
        range: "50-60%",
        min: calculationMethod === "percentage" ? Math.round(calculatedMHR * 0.5) : Math.round((calculatedMHR - restingHRNum) * 0.5 + restingHRNum),
        max: calculationMethod === "percentage" ? Math.round(calculatedMHR * 0.6) : Math.round((calculatedMHR - restingHRNum) * 0.6 + restingHRNum)
      }, {
        name: "Moderate",
        range: "60-70%",
        min: calculationMethod === "percentage" ? Math.round(calculatedMHR * 0.6) : Math.round((calculatedMHR - restingHRNum) * 0.6 + restingHRNum),
        max: calculationMethod === "percentage" ? Math.round(calculatedMHR * 0.7) : Math.round((calculatedMHR - restingHRNum) * 0.7 + restingHRNum)
      }, {
        name: "Vigorous",
        range: "70-85%",
        min: calculationMethod === "percentage" ? Math.round(calculatedMHR * 0.7) : Math.round((calculatedMHR - restingHRNum) * 0.7 + restingHRNum),
        max: calculationMethod === "percentage" ? Math.round(calculatedMHR * 0.85) : Math.round((calculatedMHR - restingHRNum) * 0.85 + restingHRNum)
      }];
      const results = {
        age: ageNum,
        mhr: Math.round(calculatedMHR),
        mhrSource: maxHR ? "User Provided" : getFormulaName(mhrFormula),
        restingHR: restingHRNum || null,
        method: calculationMethod,
        intensityZone: intensityZone === "custom" ? `Custom (${minIntensity}-${maxIntensity}%)` : `${intensityZone.charAt(0).toUpperCase() + intensityZone.slice(1)} (${minIntensity}-${maxIntensity}%)`,
        minTHR,
        maxTHR,
        allZones,
        selectedZone: {
          minIntensity,
          maxIntensity
        }
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating target heart rate. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setAge("");
    setMaxHR("");
    setRestingHR("");
    setMhrFormula("haskell");
    setCalculationMethod("percentage");
    setIntensityZone("moderate");
    setCustomMinIntensity("");
    setCustomMaxIntensity("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const getFormulaName = (formula: string) => {
    switch (formula) {
      case "haskell":
        return "Haskell & Fox (220 - age)";
      case "tanaka":
        return "Tanaka (208 - 0.7 × age)";
      case "nes":
        return "Nes (211 - 0.64 × age)";
      default:
        return "";
    }
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.heart_rate_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_details_and_select_your_preferred_metho_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Age */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_years_2}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="number" placeholder="30" value={age} onChange={e => setAge(e.target.value)} min="10" max="100" />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                      </div>

                      {/* Optional Max HR Override */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.maximum_heart_rate_optional_3}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Heart className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.maxHR ? "border-red-300" : ""}`} type="number" placeholder="190" value={maxHR} onChange={e => setMaxHR(e.target.value)} min="100" max="220" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.bpm_4}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{contentData.leave_blank_to_calculate_using_formula_5}</p>
                        {errors.maxHR && <p className="text-red-600 text-xs mt-1">{errors.maxHR}</p>}
                      </div>

                      {/* MHR Formula Selection */}
                      {!maxHR && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.max_hr_formula_6}</Label>
                          <RadioGroup value={mhrFormula} onValueChange={setMhrFormula} className="space-y-3">
                            <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="haskell" id="haskell" className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor="haskell" className="cursor-pointer font-medium">{contentData.haskell_fox_1971_7}</Label>
                                <p className="text-sm text-gray-600 mt-1">{contentData.mhr_220_age_8}</p>
                                <p className="text-xs text-gray-500 mt-1">{contentData.most_commonly_used_formula_9}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="tanaka" id="tanaka" className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor="tanaka" className="cursor-pointer font-medium">{contentData.tanaka_et_al_2001_10}</Label>
                                <p className="text-sm text-gray-600 mt-1">{contentData.mhr_208_07_age_11}</p>
                                <p className="text-xs text-gray-500 mt-1">{contentData.more_accurate_for_older_adults_12}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                              <RadioGroupItem value="nes" id="nes" className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor="nes" className="cursor-pointer font-medium">{contentData.nes_et_al_2013_13}</Label>
                                <p className="text-sm text-gray-600 mt-1">{contentData.mhr_211_064_age_14}</p>
                                <p className="text-xs text-gray-500 mt-1">{contentData.based_on_large_population_study_15}</p>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>}

                      {/* Calculation Method */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.calculation_method_16}</Label>
                        <RadioGroup value={calculationMethod} onValueChange={setCalculationMethod} className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="percentage" id="percentage" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="percentage" className="cursor-pointer font-medium">{contentData.percentage_of_max_hr_basic_17}</Label>
                              <p className="text-sm text-gray-600 mt-1">{contentData.thr_mhr_intensity_18}</p>
                              <p className="text-xs text-gray-500 mt-1">{contentData.simple_and_widely_used_method_19}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="karvonen" id="karvonen" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="karvonen" className="cursor-pointer font-medium">{contentData.karvonen_method_advanced_20}</Label>
                              <p className="text-sm text-gray-600 mt-1">{contentData.thr_hrr_intensity_rhr_21}</p>
                              <p className="text-xs text-gray-500 mt-1">{contentData.more_personalized_requires_resting_hr_22}</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Resting HR (for Karvonen) */}
                      {calculationMethod === "karvonen" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.resting_heart_rate_required_for_karvonen_23}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Activity className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.restingHR ? "border-red-300" : ""}`} type="number" placeholder="70" value={restingHR} onChange={e => setRestingHR(e.target.value)} min="30" max="100" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.bpm_24}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{contentData.measure_when_completely_at_rest_25}</p>
                          {errors.restingHR && <p className="text-red-600 text-xs mt-1">{errors.restingHR}</p>}
                        </div>}

                      {/* Intensity Zone Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.intensity_zone_26}</Label>
                        <RadioGroup value={intensityZone} onValueChange={setIntensityZone} className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="light" id="light" />
                            <Label htmlFor="light" className="cursor-pointer font-medium flex-1">{contentData.light_5060_fat_burning_recovery_27}</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <Label htmlFor="moderate" className="cursor-pointer font-medium flex-1">{contentData.moderate_6070_aerobic_base_building_28}</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="vigorous" id="vigorous" />
                            <Label htmlFor="vigorous" className="cursor-pointer font-medium flex-1">{contentData.vigorous_7085_performance_training_29}</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom" className="cursor-pointer font-medium flex-1">{contentData.custom_range_30}</Label>
                          </div>
                        </RadioGroup>

                        {/* Custom Range Inputs */}
                        {intensityZone === "custom" && <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.min_31}</Label>
                              <Input className={`h-10 ${errors.customMinIntensity ? "border-red-300" : ""}`} type="number" placeholder="60" value={customMinIntensity} onChange={e => setCustomMinIntensity(e.target.value)} min="40" max="95" />
                              {errors.customMinIntensity && <p className="text-red-600 text-xs mt-1">{errors.customMinIntensity}</p>}
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.max_32}</Label>
                              <Input className={`h-10 ${errors.customMaxIntensity ? "border-red-300" : ""}`} type="number" placeholder="80" value={customMaxIntensity} onChange={e => setCustomMaxIntensity(e.target.value)} min="40" max="95" />
                              {errors.customMaxIntensity && <p className="text-red-600 text-xs mt-1">{errors.customMaxIntensity}</p>}
                            </div>
                          </div>}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateTargetHeartRate} className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">{contentData.calculate_33}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_34}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-cyan-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.target_hr_zone_35}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-blue-200">
                          <p className="text-3xl font-bold text-blue-900 mb-2">
                            {result.minTHR} - {result.maxTHR}
                          </p>
                          <p className="text-sm font-medium text-gray-600">{contentData.beats_per_minute_36}</p>
                          <p className="text-sm text-gray-500 mt-2">{result.intensityZone}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_age_and_preferences_to_calculate_your_t_37}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <span>{contentData.heart_rate_zone_results_38}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                        <h3 className="text-3xl font-bold text-blue-700 mb-2">
                          {result.minTHR} - {result.maxTHR}{contentData.bpm_39}</h3>
                        <p className="text-lg text-gray-600 mb-4">{contentData.target_heart_rate_zone_40}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">{contentData.age_41}</p>
                            <p className="font-semibold text-gray-700">{result.age}{contentData.years_42}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.max_hr_43}</p>
                            <p className="font-semibold text-gray-700">{result.mhr}{contentData.bpm_44}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.method_45}</p>
                            <p className="font-semibold text-gray-700">
                              {result.method === "percentage" ? "% of Max HR" : "Karvonen"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.zone_46}</p>
                            <p className="font-semibold text-gray-700">{result.intensityZone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* All Training Zones Table */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">{contentData.all_training_zones_47}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-blue-50">
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">{contentData.zone_48}</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">{contentData.intensity_49}</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">{contentData.heart_rate_50}</th>
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-700">{contentData.purpose_51}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.allZones.map((zone: any, index: number) => {
                          const isSelected = result.selectedZone.minIntensity >= (index === 0 ? 50 : index === 1 ? 60 : 70) && result.selectedZone.maxIntensity <= (index === 0 ? 60 : index === 1 ? 70 : 85);
                          return <tr key={zone.name} className={isSelected ? "bg-blue-100" : "hover:bg-gray-50"}>
                                  <td className="border border-gray-300 px-4 py-3 font-medium">{zone.name}</td>
                                  <td className="border border-gray-300 px-4 py-3">{zone.range}</td>
                                  <td className="border border-gray-300 px-4 py-3 font-semibold">
                                    {zone.min} - {zone.max}{contentData.bpm_52}</td>
                                  <td className="border border-gray-300 px-4 py-3 text-sm">
                                    {index === 0 && "Fat burning, active recovery"}
                                    {index === 1 && "Aerobic base, endurance"}
                                    {index === 2 && "Performance, lactate threshold"}
                                  </td>
                                </tr>;
                        })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8 mt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">{contentData.calculation_details_53}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-3">{contentData.maximum_heart_rate_54}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.value_55}</strong> {result.mhr}{contentData.bpm_56}</p>
                            <p>
                              <strong>{contentData.source_57}</strong> {result.mhrSource}
                            </p>
                            {result.restingHR && <p>
                                <strong>{contentData.resting_hr_58}</strong> {result.restingHR}{contentData.bpm_59}</p>}
                          </div>
                        </div>

                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <h4 className="font-semibold text-cyan-700 mb-3">{contentData.important_notes_60}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>{contentData.formulas_are_estimates_individual_max_hr_can_vary__61}</p>
                            <p>{contentData.karvonen_method_is_more_personalized_and_accurate_62}</p>
                            <p>{contentData.consider_fitness_level_and_health_conditions_63}</p>
                            <p>{contentData.consult_a_professional_before_starting_new_trainin_64}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Calories Burned Calculator",
          calculatorHref: "/health/calories-burned-calculator",
        }, {
          calculatorName: "Running Pace Calculator",
          calculatorHref: "/health/pace-calculator",
        }, {
          calculatorName: "BMR Calculator",
          calculatorHref: "/health/bmr-calculator",
        }
        ]} 
        color="blue" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.about_target_heart_rate_training_65}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.training_zones_explained_66}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.light_5060_67}</strong>{contentData.fat_burning_recovery_workouts_68}</li>
                          <li>
                            <strong>{contentData.moderate_6070_69}</strong>{contentData.aerobic_base_building_endurance_70}</li>
                          <li>
                            <strong>{contentData.vigorous_7085_71}</strong>{contentData.performance_training_lactate_threshold_72}</li>
                          <li>
                            <strong>{contentData.maximum_8595_73}</strong>{contentData.anaerobic_power_short_intervals_74}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.formula_accuracy_75}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.haskell_fox_76}</strong>{contentData.k_1012_bpm_standard_deviation_77}</li>
                          <li>
                            <strong>{contentData.tanaka_78}</strong>{contentData.more_accurate_for_older_adults_40_79}</li>
                          <li>
                            <strong>{contentData.nes_80}</strong>{contentData.based_on_3320_healthy_individuals_81}</li>
                          <li>
                            <strong>{contentData.individual_variation_82}</strong>{contentData.can_be_20_bpm_from_formula_83}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">{contentData.method_comparison_84}</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.method_85}</th>
                              <th className="text-left py-2">{contentData.accuracy_86}</th>
                              <th className="text-left py-2">{contentData.requirements_87}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.of_max_hr_88}</td>
                              <td>{contentData.good_89}</td>
                              <td>{contentData.age_only_90}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.karvonen_91}</td>
                              <td>{contentData.better_92}</td>
                              <td>{contentData.age_resting_hr_93}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">{contentData.best_practices_94}</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.measure_resting_hr_first_thing_in_the_morning_95}</li>
                          <li>{contentData.use_heart_rate_monitor_for_accurate_readings_96}</li>
                          <li>{contentData.allow_510_minute_warmup_before_target_zone_97}</li>
                          <li>{contentData.stay_hydrated_and_monitor_how_you_feel_98}</li>
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
            entityId="target-heart-rate-calculator"
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
