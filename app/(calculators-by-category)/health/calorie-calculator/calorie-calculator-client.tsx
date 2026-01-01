"use client";

import { useRef, useState } from "react";

import { Calculator, Heart, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;

interface CalorieCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function CalorieCalculatorClient({ content, guideContent }: CalorieCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [results, setResults] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);
  const calculateCalories = () => {
    const ageNum = Number.parseFloat(age);
    const heightNum = Number.parseFloat(height);
    const weightNum = Number.parseFloat(weight);
    const activityNum = Number.parseFloat(activity);

    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!ageNum || !heightNum || !weightNum || !activityNum || !gender) return;

    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    const maintenance = bmr * activityNum;
    const weightLoss = maintenance - 500; // 1 lb per week
    const weightGain = maintenance + 500; // 1 lb per week

    setResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain)
    });
  };
  return <>

      <div className="min-h-screen bg-white">

        {/* Breadcrumb */}

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-red-50 py-4 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-red-600" />
                    <span>{contentData.personal_information_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_details_to_calculate_calorie_needs_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="age" className="text-base font-semibold">{contentData.age_2}</Label>
                      <Input id="age" type="number" placeholder="30" value={age} onChange={e => setAge(e.target.value)} className="h-12 text-lg" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="gender" className="text-base font-semibold">{contentData.gender_3}</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{contentData.male_4}</SelectItem>
                          <SelectItem value="female">{contentData.female_5}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="height" className="text-base font-semibold">{contentData.height_cm_6}</Label>
                      <Input id="height" type="number" placeholder="170" value={height} onChange={e => setHeight(e.target.value)} className="h-12 text-lg" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="weight" className="text-base font-semibold">{contentData.weight_kg_7}</Label>
                      <Input id="weight" type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} className="h-12 text-lg" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="activity" className="flex items-center space-x-2 text-base font-semibold">
                      <Activity className="w-4 h-4" />
                      <span>{contentData.activity_level_8}</span>
                    </Label>
                    <Select value={activity} onValueChange={setActivity}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.2">{contentData.sedentary_littleno_exercise_9}</SelectItem>
                        <SelectItem value="1.375">{contentData.light_light_exercise_13_daysweek_10}</SelectItem>
                        <SelectItem value="1.55">{contentData.moderate_moderate_exercise_35_daysweek_11}</SelectItem>
                        <SelectItem value="1.725">{contentData.active_hard_exercise_67_daysweek_12}</SelectItem>
                        <SelectItem value="1.9">{contentData.very_active_very_hard_exercise_physical_job_13}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={calculateCalories} className="w-full h-12 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg">{contentData.calculate_14}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 py-4 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl">{contentData.your_calorie_needs_15}</CardTitle>
                  <CardDescription className="text-base">{contentData.daily_calorie_requirements_for_different_goals_16}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {results ? <div className="space-y-8">
                      <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                        <p className="text-lg text-gray-600 mb-3">{contentData.maintenance_calories_17}</p>
                        <p className="text-5xl font-bold text-blue-600 mb-4">{results.maintenance.toLocaleString()}</p>
                        <p className="text-gray-600">{contentData.calories_to_maintain_current_weight_18}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">{contentData.weight_loss_1_lbweek_19}</p>
                          <p className="text-2xl font-bold text-green-600">
                            {results.weightLoss.toLocaleString()}{contentData.calories_20}</p>
                        </div>
                        <div className="text-center p-6 bg-orange-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">{contentData.weight_gain_1_lbweek_21}</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {results.weightGain.toLocaleString()}{contentData.calories_22}</p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">{contentData.basal_metabolic_rate_bmr_23}</p>
                          <p className="text-2xl font-bold text-gray-900">{results.bmr.toLocaleString()}{contentData.calories_24}</p>
                        </div>
                      </div>
                    </div> : <div className="text-center py-16 text-gray-500">
                      <Heart className="w-16 h-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_information_to_calculate_calorie_needs_25}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>
          </div>
<SimilarCalculators calculators={[{
          calculatorName: "Calories Burned Calculator",
          calculatorHref: "/health/calories-burned-calculator",
        }, {
          calculatorName: "BMR Calculator",
          calculatorHref: "/health/bmr-calculator",
        }, {
          calculatorName: "Protein Intake Calculator",
          calculatorHref: "/health/protein-calculator",
        }
        ]} 
        color="red" 
        title="Related Health Calculators" />
          {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="calorie-calculator"
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
