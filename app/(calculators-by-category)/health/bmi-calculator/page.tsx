"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState, useRef } from "react";
import { Calculator, Heart, Ruler, Calendar, Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BMI Calculator",
  description: "Calculate Body Mass Index (BMI) and understand your weight status with age and gender considerations",
  url: "https://www.thesmartcalculator.com/health/bmi-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: ["BMI calculation", "Age and gender specific analysis", "Weight status interpretation", "Healthy weight range", "BMI Prime calculation", "Ponderal Index calculation", "Multiple unit systems"]
};
interface BMIResults {
  bmi: number;
  category: string;
  description: string;
  color: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  bmiPrime: number;
  ponderalIndex: number;
  idealWeight: number;
  bodyFatPercentage?: number;
  bodySurfaceArea?: number;
}
export default function BmiCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('bmi-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('bmi-calculator', language, "calculator-guide");

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
    "k_16_0": "",
    "k_17_1": "",
    "k_185_2": "",
    "k_25_3": "",
    "k_30_4": "",
    "k_35_5": "",
    "k_40_6": "",
    "underweight_7": "",
    "normal_8": "",
    "overweight_9": "",
    "obesity_10": "",
    "bmi_calculator_11": "",
    "modify_the_values_and_click_the_calculate_button_t_12": "",
    "age_13": "",
    "ages_2_120_14": "",
    "gender_15": "",
    "male_16": "",
    "female_17": "",
    "other_18": "",
    "height_19": "",
    "cm_20": "",
    "m_21": "",
    "ft_22": "",
    "in_23": "",
    "weight_24": "",
    "kg_25": "",
    "g_26": "",
    "lbs_27": "",
    "oz_28": "",
    "st_29": "",
    "calculate_30": "",
    "result_31": "",
    "save_this_calculation_32": "",
    "bmi_33": "",
    "kgm_34": "",
    "bmi_35": "",
    "bmi_scale_36": "",
    "detailed_results_37": "",
    "bmi_38": "",
    "kgm_39": "",
    "healthy_bmi_range_40": "",
    "k_185_kgm_25_kgm_41": "",
    "healthy_weight_for_height_42": "",
    "kg_43": "",
    "bmi_prime_44": "",
    "ponderal_index_45": "",
    "kgm_46": "",
    "body_surface_area_47": "",
    "m_48": "",
    "save_this_calculation_49": "",
    "enter_your_details_to_calculate_your_bmi_50": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("180");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("65");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [results, setResults] = useState<BMIResults | null>(null);
  const calculateBMI = () => {
    let heightInM = 0;
    let weightInKg = 0;
    const ageNum = Number.parseInt(age);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!ageNum || ageNum < 2 || ageNum > 120) return;
    const heightValue = Number.parseFloat(height);
    const weightValue = Number.parseFloat(weight);
    if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) return;
    switch (heightUnit) {
      case "cm":
        heightInM = heightValue / 100;
        break;
      case "m":
        heightInM = heightValue;
        break;
      case "ft":
        heightInM = heightValue * 0.3048;
        break;
      case "in":
        heightInM = heightValue * 0.0254;
        break;
      default:
        heightInM = heightValue / 100;
    }
    switch (weightUnit) {
      case "kg":
        weightInKg = weightValue;
        break;
      case "g":
        weightInKg = weightValue / 1000;
        break;
      case "lbs":
        weightInKg = weightValue * 0.453592;
        break;
      case "oz":
        weightInKg = weightValue * 0.0283495;
        break;
      case "st":
        weightInKg = weightValue * 6.35029;
        break;
      default:
        weightInKg = weightValue;
    }
    if (weightInKg <= 0 || heightInM <= 0) return;
    const bmi = weightInKg / (heightInM * heightInM);
    const bmiPrime = bmi / 25;
    const ponderalIndex = weightInKg / (heightInM * heightInM * heightInM);
    const healthyWeightRange = {
      min: 18.5 * heightInM * heightInM,
      max: 25 * heightInM * heightInM
    };
    const idealWeight = 22 * heightInM * heightInM;
    const bodySurfaceArea = 0.007184 * Math.pow(weightInKg, 0.425) * Math.pow(heightInM * 100, 0.725);
    let category = "";
    let description = "";
    let color = "";
    if (ageNum >= 18) {
      if (bmi < 18.5) {
        category = "Underweight";
        description = "Your BMI indicates you are underweight. Consider consulting with a healthcare provider for a healthy weight gain plan.";
        color = "text-blue-600";
      } else if (bmi < 25) {
        category = "Normal";
        description = "Your BMI is within the healthy range. Maintain your current lifestyle with regular exercise and balanced nutrition.";
        color = "text-green-600";
      } else if (bmi < 30) {
        category = "Overweight";
        description = "Your BMI indicates you are overweight. Consider a healthy diet and regular exercise program.";
        color = "text-yellow-600";
      } else if (bmi < 35) {
        category = "Obesity Class I";
        description = "Your BMI indicates Class I obesity. Consider consulting with a healthcare provider for weight management.";
        color = "text-orange-600";
      } else if (bmi < 40) {
        category = "Obesity Class II";
        description = "Your BMI indicates Class II obesity. Medical supervision is recommended for weight management.";
        color = "text-red-600";
      } else {
        category = "Obesity Class III";
        description = "Your BMI indicates Class III obesity. Medical intervention is strongly recommended.";
        color = "text-red-800";
      }
    } else {
      if (bmi < 18.5) {
        category = "Underweight";
        description = "Your BMI indicates you are underweight for your age. Consult with a pediatrician.";
        color = "text-blue-600";
      } else if (bmi < 25) {
        category = "Normal";
        description = "Your BMI is within the healthy range for your age.";
        color = "text-green-600";
      } else if (bmi < 30) {
        category = "Overweight";
        description = "Your BMI indicates you are overweight for your age. Consult with a pediatrician.";
        color = "text-yellow-600";
      } else {
        category = "Obese";
        description = "Your BMI indicates obesity for your age. Medical consultation is recommended.";
        color = "text-red-600";
      }
    }
    setResults({
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
      color,
      healthyWeightRange: {
        min: Math.round(healthyWeightRange.min * 10) / 10,
        max: Math.round(healthyWeightRange.max * 10) / 10
      },
      bmiPrime: Math.round(bmiPrime * 10) / 10,
      ponderalIndex: Math.round(ponderalIndex * 10) / 10,
      idealWeight: Math.round(idealWeight * 10) / 10,
      bodySurfaceArea: Math.round(bodySurfaceArea * 100) / 100
    });
  };
  const BMIChart = () => <div className="space-y-4">
      <div className="relative w-full h-8 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-blue-400 flex items-center justify-center text-white text-xs font-bold">{contentData.k_16_0}</div>
          <div className="flex-1 bg-blue-300 flex items-center justify-center text-white text-xs font-bold">{contentData.k_17_1}</div>
          <div className="flex-1 bg-green-400 flex items-center justify-center text-white text-xs font-bold">{contentData.k_185_2}</div>
          <div className="flex-1 bg-green-500 flex items-center justify-center text-white text-xs font-bold">{contentData.k_25_3}</div>
          <div className="flex-1 bg-yellow-400 flex items-center justify-center text-white text-xs font-bold">{contentData.k_30_4}</div>
          <div className="flex-1 bg-red-400 flex items-center justify-center text-white text-xs font-bold">{contentData.k_35_5}</div>
          <div className="flex-1 bg-red-600 flex items-center justify-center text-white text-xs font-bold">{contentData.k_40_6}</div>
        </div>
        {results && <div className="absolute top-0 w-1 h-full bg-black" style={{
        left: `${Math.min(Math.max((results.bmi - 16) / (40 - 16) * 100, 0), 100)}%`,
        transform: "translateX(-50%)"
      }}>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-bold">
              {results.bmi}
            </div>
          </div>}
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{contentData.underweight_7}</span>
        <span>{contentData.normal_8}</span>
        <span>{contentData.overweight_9}</span>
        <span>{contentData.obesity_10}</span>
      </div>
    </div>;
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 pt-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>{contentData.bmi_calculator_11}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.modify_the_values_and_click_the_calculate_button_t_12}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.age_13}</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" placeholder="25" value={age} onChange={e => setAge(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" min="2" max="120" />
                        </div>
                        <p className="text-sm text-gray-500">{contentData.ages_2_120_14}</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.gender_15}</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">{contentData.male_16}</SelectItem>
                            <SelectItem value="female">{contentData.female_17}</SelectItem>
                            <SelectItem value="other">{contentData.other_18}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.height_19}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" placeholder="180" value={height} onChange={e => setHeight(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" min="10" max="300" />
                          </div>
                          <Select value={heightUnit} onValueChange={setHeightUnit}>
                            <SelectTrigger className="w-24 h-12 border-2 focus:border-green-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">{contentData.cm_20}</SelectItem>
                              <SelectItem value="m">{contentData.m_21}</SelectItem>
                              <SelectItem value="ft">{contentData.ft_22}</SelectItem>
                              <SelectItem value="in">{contentData.in_23}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.weight_24}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" placeholder="65" value={weight} onChange={e => setWeight(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" min="1" max="1000" />
                          </div>
                          <Select value={weightUnit} onValueChange={setWeightUnit}>
                            <SelectTrigger className="w-24 h-12 border-2 focus:border-green-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">{contentData.kg_25}</SelectItem>
                              <SelectItem value="g">{contentData.g_26}</SelectItem>
                              <SelectItem value="lbs">{contentData.lbs_27}</SelectItem>
                              <SelectItem value="oz">{contentData.oz_28}</SelectItem>
                              <SelectItem value="st">{contentData.st_29}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button onClick={calculateBMI} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold">{contentData.calculate_30}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">{contentData.result_31}</CardTitle>
                    <CardDescription className="text-base">{contentData.save_this_calculation_32}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {results ? <div className="space-y-6">
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                          <p className="text-lg text-gray-600 mb-2">{contentData.bmi_33}{results.bmi}{contentData.kgm_34}</p>
                          <p className={`text-2xl font-bold ${results.color} mb-2`}>({results.category})</p>
                          <p className="text-4xl font-bold text-gray-900 mb-2">{contentData.bmi_35}{results.bmi}</p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-gray-900">{contentData.bmi_scale_36}</h3>
                          <BMIChart />
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-bold text-lg text-gray-900">{contentData.detailed_results_37}</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <span className="font-medium text-gray-700">{contentData.bmi_38}</span>
                              <span className="font-bold text-blue-600">{results.bmi}{contentData.kgm_39}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                              <span className="font-medium text-gray-700">{contentData.healthy_bmi_range_40}</span>
                              <span className="font-bold text-green-600">{contentData.k_185_kgm_25_kgm_41}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <span className="font-medium text-gray-700">{contentData.healthy_weight_for_height_42}</span>
                              <span className="font-bold text-purple-600">
                                {results.healthyWeightRange.min} - {results.healthyWeightRange.max}{contentData.kg_43}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <span className="font-medium text-gray-700">{contentData.bmi_prime_44}</span>
                              <span className="font-bold text-orange-600">{results.bmiPrime}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                              <span className="font-medium text-gray-700">{contentData.ponderal_index_45}</span>
                              <span className="font-bold text-red-600">{results.ponderalIndex}{contentData.kgm_46}</span>
                            </div>
                            {results.bodySurfaceArea && <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                <span className="font-medium text-gray-700">{contentData.body_surface_area_47}</span>
                                <span className="font-bold text-indigo-600">{results.bodySurfaceArea}{contentData.m_48}</span>
                              </div>}
                          </div>
                        </div>

                        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold">{contentData.save_this_calculation_49}</Button>
                      </div> : <div className="text-center py-12 text-gray-500">
                        <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">{contentData.enter_your_details_to_calculate_your_bmi_50}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Body Mass Calculator",
            calculatorHref: "/health/lean-body-mass-calculator",
            calculatorDescription: "Calculate lean body mass based on weight and body fat percentage"
          }, {
            calculatorName: "Anorexic BMI Calculator",
            calculatorHref: "/health/anorexic-bmi-calculator",
            calculatorDescription: "Calculate for individuals with anorexia"
          }, {
            calculatorName: "Overweight Calculator",
            calculatorHref: "/health/overweight-calculator",
            calculatorDescription: "Calculate for individuals with overweight"
          }]} color="green" title="Related Health Calculators" />
            
            {/* Information Section */}
            <section className="mt-16">
          {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="bmi-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <div className="mt-8">
              <CalculatorGuide data={guideData} />
          </div>
            </section>
          </div>
        </main>
      </div>
    </>;
}