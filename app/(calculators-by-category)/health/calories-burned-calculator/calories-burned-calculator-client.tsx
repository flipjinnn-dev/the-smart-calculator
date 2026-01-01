"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Calculator, RotateCcw, Activity, Clock, Weight, Flame } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

// Activity data with MET values
const activities = [
// Walking
{
  name: "Walking (2.0 mph, slow)",
  met: 2.0
}, {
  name: "Walking (2.5 mph)",
  met: 2.5
}, {
  name: "Walking (3.0 mph, moderate)",
  met: 3.0
}, {
  name: "Walking (3.5 mph, brisk)",
  met: 3.5
}, {
  name: "Walking (4.0 mph, very brisk)",
  met: 4.0
}, {
  name: "Walking (4.5 mph)",
  met: 4.5
},
// Running
{
  name: "Running (5.0 mph)",
  met: 8.0
}, {
  name: "Running (6.0 mph)",
  met: 9.8
}, {
  name: "Running (7.0 mph)",
  met: 11.0
}, {
  name: "Running (8.0 mph)",
  met: 11.8
}, {
  name: "Running (9.0 mph)",
  met: 12.8
}, {
  name: "Running (10.0 mph)",
  met: 14.5
},
// Cycling
{
  name: "Cycling (10-12 mph, leisure)",
  met: 6.0
}, {
  name: "Cycling (12-14 mph, moderate)",
  met: 8.0
}, {
  name: "Cycling (14-16 mph, vigorous)",
  met: 10.0
}, {
  name: "Cycling (16-19 mph, racing)",
  met: 12.0
}, {
  name: "Cycling (>20 mph, racing)",
  met: 15.8
},
// Swimming
{
  name: "Swimming (freestyle, slow)",
  met: 5.8
}, {
  name: "Swimming (freestyle, moderate)",
  met: 8.0
}, {
  name: "Swimming (freestyle, fast)",
  met: 11.0
}, {
  name: "Swimming (backstroke)",
  met: 7.0
}, {
  name: "Swimming (breaststroke)",
  met: 8.0
}, {
  name: "Swimming (butterfly)",
  met: 13.8
},
// Gym Activities
{
  name: "Weight Training (general)",
  met: 6.0
}, {
  name: "Weight Training (vigorous)",
  met: 8.0
}, {
  name: "Aerobics (low impact)",
  met: 5.0
}, {
  name: "Aerobics (high impact)",
  met: 7.0
}, {
  name: "Elliptical (general)",
  met: 5.0
}, {
  name: "Rowing Machine (moderate)",
  met: 7.0
}, {
  name: "Rowing Machine (vigorous)",
  met: 8.5
}, {
  name: "Stair Climbing Machine",
  met: 9.0
},
// Sports
{
  name: "Basketball (general)",
  met: 6.5
}, {
  name: "Basketball (competitive)",
  met: 8.0
}, {
  name: "Tennis (general)",
  met: 7.0
}, {
  name: "Tennis (singles)",
  met: 8.0
}, {
  name: "Soccer (general)",
  met: 7.0
}, {
  name: "Soccer (competitive)",
  met: 10.0
}, {
  name: "Volleyball (recreational)",
  met: 3.0
}, {
  name: "Volleyball (competitive)",
  met: 6.0
},
// Other Activities
{
  name: "Yoga (Hatha)",
  met: 2.5
}, {
  name: "Yoga (Power)",
  met: 4.0
}, {
  name: "Dancing (ballroom)",
  met: 3.0
}, {
  name: "Dancing (aerobic)",
  met: 6.0
}, {
  name: "Hiking (general)",
  met: 6.0
}, {
  name: "Rock Climbing",
  met: 8.0
}, {
  name: "Jumping Rope (moderate)",
  met: 10.0
}, {
  name: "Jumping Rope (fast)",
  met: 12.0
}];

interface CaloriesBurnedCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function CaloriesBurnedCalculatorClient({ content, guideContent }: CaloriesBurnedCalculatorClientProps) {
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
  const [selectedActivity, setSelectedActivity] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg"); // kg or lbs

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!selectedActivity) {
      newErrors.activity = "Please select an activity";
    }
    const hoursNum = Number.parseInt(hours) || 0;
    const minutesNum = Number.parseInt(minutes) || 0;
    if (hoursNum < 0 || hoursNum > 24) {
      newErrors.hours = "Hours must be between 0-24";
    }
    if (minutesNum < 0 || minutesNum > 59) {
      newErrors.minutes = "Minutes must be between 0-59";
    }
    if (hoursNum === 0 && minutesNum === 0) {
      newErrors.duration = "Duration must be greater than 0";
    }
    const weightNum = Number.parseFloat(weight);
    if (!weight || weightNum <= 0 || weightNum > 1000) {
      newErrors.weight = "Please enter a valid weight";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateCalories = () => {
    if (!validateInputs()) return;
    try {
      const activity = activities.find(a => a.name === selectedActivity);
      if (!activity) return;
      const hoursNum = Number.parseInt(hours) || 0;
      const minutesNum = Number.parseInt(minutes) || 0;
      const totalMinutes = hoursNum * 60 + minutesNum;
      let weightKg = Number.parseFloat(weight);
      if (weightUnit === "lbs") {
        weightKg = weightKg * 0.45359237;
      }

      // Formula: Calories = Time(min) × MET × 3.5 × Weight(kg) / 200
      const caloriesBurned = totalMinutes * activity.met * 3.5 * weightKg / 200;
      const caloriesBurnedAlt = totalMinutes * activity.met * weightKg * 0.0175;
      const caloriesPerMinute = activity.met * 3.5 * weightKg / 200;
      const results = {
        activity: activity.name,
        met: activity.met,
        duration: `${hoursNum}h ${minutesNum}m`,
        totalMinutes,
        weight: weightUnit === "kg" ? `${weight} kg` : `${weight} lbs`,
        weightKg: Math.round(weightKg * 100) / 100,
        // More precise rounding
        caloriesBurned: Math.round(caloriesBurned * 100) / 100,
        // Round to 2 decimal places like Calculator.net
        caloriesBurnedAlt: Math.round(caloriesBurnedAlt * 100) / 100,
        caloriesPerMinute: Math.round(caloriesPerMinute * 100) / 100
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating calories. Please check your inputs and try again."
      });
    }
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const resetCalculator = () => {
    setSelectedActivity("");
    setHours("");
    setMinutes("");
    setWeight("");
    setWeightUnit("kg");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Flame className="w-8 h-8 text-white" />
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
                      <span>{contentData.activity_duration_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.select_your_activity_duration_and_weight_to_calcul_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Activity Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.activity_type_2}</Label>
                        <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                          <SelectTrigger className={`h-12 ${errors.activity ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select an activity" />
                          </SelectTrigger>
                          <SelectContent>
                            {activities.map(activity => <SelectItem key={activity.name} value={activity.name}>
                                {activity.name} ({activity.met}{contentData.met_3}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.activity && <p className="text-red-600 text-xs mt-1">{errors.activity}</p>}
                      </div>

                      {/* Duration */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.duration_4}</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.hours ? "border-red-300" : ""}`} type="number" placeholder="0" value={hours} onChange={e => setHours(e.target.value)} min="0" max="24" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.hours_5}</span>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.minutes ? "border-red-300" : ""}`} type="number" placeholder="30" value={minutes} onChange={e => setMinutes(e.target.value)} min="0" max="59" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.min_6}</span>
                          </div>
                        </div>
                        {(errors.hours || errors.minutes || errors.duration) && <p className="text-red-600 text-xs mt-1">
                            {errors.hours || errors.minutes || errors.duration}
                          </p>}
                      </div>

                      {/* Weight */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.body_weight_7}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Weight className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`} type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} />
                          </div>
                          <RadioGroup value={weightUnit} onValueChange={setWeightUnit} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="kg" id="kg" />
                              <Label htmlFor="kg" className="cursor-pointer">{contentData.kg_8}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="lbs" id="lbs" />
                              <Label htmlFor="lbs" className="cursor-pointer">{contentData.lbs_9}</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateCalories} className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">{contentData.calculate_10}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_11}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className=" shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center mb-3 shadow-lg">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.calories_burned_12}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-orange-200">
                          <p className="text-3xl font-bold text-orange-900 mb-2">{result.caloriesBurned}{contentData.kcal_13}</p>
                          <p className="text-sm font-medium text-gray-600">{result.activity}</p>
                          <p className="text-sm text-gray-500">
                            {result.duration} • {result.weight}
                          </p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Flame className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.select_activity_and_duration_to_calculate_calories_14}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Flame className="w-6 h-6 text-orange-600" />
                      <span>{contentData.calculation_results_15}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                        <h3 className="text-2xl font-bold text-orange-700 mb-4">{result.caloriesBurned}{contentData.kcal_burned_16}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">{contentData.activity_17}</p>
                            <p className="font-semibold text-gray-700">{result.activity}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.duration_18}</p>
                            <p className="font-semibold text-gray-700">{result.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.weight_19}</p>
                            <p className="font-semibold text-gray-700">{result.weight}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.met_value_20}</p>
                            <p className="font-semibold text-gray-700">{result.met}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calculation Steps */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-orange-700 mb-6">{contentData.calculation_breakdown_21}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-700 mb-3">{contentData.calculatornet_formula_22}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.formula_23}</strong>{contentData.time_met_35_weight_200_24}</p>
                            <p>
                              <strong>{contentData.calculation_25}</strong> {result.totalMinutes} × {result.met}{contentData.k_35_26}{" "}
                              {result.weightKg}{contentData.k_200_27}</p>
                            <p>
                              <strong>{contentData.result_28}</strong> {result.caloriesBurned}{contentData.kcal_29}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <h4 className="font-semibold text-amber-700 mb-3">{contentData.compact_form_30}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.formula_31}</strong>{contentData.time_met_weight_00175_32}</p>
                            <p>
                              <strong>{contentData.per_minute_33}</strong> {result.caloriesPerMinute}{contentData.kcalmin_34}</p>
                            <p>
                              <strong>{contentData.result_35}</strong> {result.caloriesBurnedAlt}{contentData.kcal_36}</p>
                            <p className="text-xs text-gray-500">{contentData.both_formulas_give_identical_results_37}</p>
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center mr-3 shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.about_met_values_calorie_calculation_38}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.what_is_met_39}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.met_40}</strong>{contentData.metabolic_equivalent_of_task_41}</li>
                          <li>
                            <strong>{contentData.k_1_met_42}</strong>{contentData.resting_energy_expenditure_1_kcalkghour_43}</li>
                          <li>
                            <strong>{contentData.higher_met_44}</strong>{contentData.more_intense_activity_more_calories_burned_45}</li>
                          <li>
                            <strong>{contentData.standard_46}</strong>{contentData.based_on_scientific_research_and_measurements_47}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.formula_explanation_48}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{contentData.calculatornet_formula_49}</strong>
                          </p>
                          <p className="bg-orange-50 p-2 rounded font-mono text-xs">{contentData.calories_timemin_met_35_weightkg_200_50}</p>
                          <p>
                            <strong>{contentData.compact_form_51}</strong>
                          </p>
                          <p className="bg-orange-50 p-2 rounded font-mono text-xs">{contentData.calories_timemin_met_weightkg_00175_52}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-amber-700 mb-3">{contentData.important_notes_53}</h3>
                      <div className="bg-white p-4 rounded-lg border border-amber-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.estimates_only_54}</strong>{contentData.results_are_approximations_55}</li>
                          <li>
                            <strong>{contentData.individual_variation_56}</strong>{contentData.k_2030_difference_possible_57}</li>
                          <li>
                            <strong>{contentData.factors_not_included_58}</strong>{contentData.age_fitness_level_body_composition_59}</li>
                          <li>
                            <strong>{contentData.use_for_guidance_60}</strong>{contentData.not_medical_advice_61}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-amber-700 mb-3">{contentData.activity_intensity_levels_62}</h3>
                      <div className="bg-white p-4 rounded-lg border border-amber-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.met_range_63}</th>
                              <th className="text-left py-2">{contentData.intensity_64}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.k_10_29_65}</td>
                              <td className="text-green-600">{contentData.light_66}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.k_30_59_67}</td>
                              <td className="text-yellow-600">{contentData.moderate_68}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.k_60_69}</td>
                              <td className="text-red-600">{contentData.vigorous_70}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "BMI Calculator",
            calculatorHref: "/health/bmi-calculator",
            calculatorDescription: "Calculate Body Mass Index and understand your weight status"
          }, {
            calculatorName: "Healthy Weight Calculator",
            calculatorHref: "/health/healthy-weight-calculator",
            calculatorDescription: "Calculate healthy weight range based on height and gender"
          }, {
            calculatorName: "Overweight Calculator",
            calculatorHref: "/health/overweight-calculator",
            calculatorDescription: "Calculate for individuals with overweight"
          }]} color="orange" title="Related Health Calculators" />

          </div>

          {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="calories-burned-calculator"
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
