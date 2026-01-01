"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Calculator, Ruler } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';


interface BallisticCoefficientCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function BallisticCoefficientCalculatorClient({ content, guideContent }: BallisticCoefficientCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [inputMethod, setInputMethod] = useState("area");
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Input states
  const [mass, setMass] = useState(180); // grams
  const [area, setArea] = useState(400); // mm²
  const [diameter, setDiameter] = useState(22.6); // mm
  const [dragCoefficient, setDragCoefficient] = useState(0.3);

  // Unit selection states
  const [massUnit, setMassUnit] = useState("g"); // g, kg, gr, oz
  const [areaUnit, setAreaUnit] = useState("mm²"); // mm², cm², in²
  const [diameterUnit, setDiameterUnit] = useState("mm"); // mm, cm, in

  // Validation states
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Unit conversion functions
  const convertMassToKg = (value: number, unit: string): number => {
    switch (unit) {
      case "g":
        return value / 1000;
      case "kg":
        return value;
      case "gr":
        return value * 0.00006479891;
      // 1 grain = 0.00006479891 kg
      case "oz":
        return value * 0.0283495;
      // 1 ounce = 0.0283495 kg
      default:
        return value / 1000;
    }
  };
  const convertAreaToM2 = (value: number, unit: string): number => {
    switch (unit) {
      case "mm²":
        return value * 1e-6;
      case "cm²":
        return value * 1e-4;
      case "in²":
        return value * 0.00064516;
      // 1 in² = 0.00064516 m²
      default:
        return value / 1000;
    }
  };
  const convertDiameterToM = (value: number, unit: string): number => {
    switch (unit) {
      case "mm":
        return value / 1000;
      case "cm":
        return value / 100;
      case "in":
        return value * 0.0254;
      // 1 inch = 0.0254 m
      default:
        return value / 1000;
    }
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (mass <= 0) {
      newErrors.mass = "Mass must be greater than 0";
    }
    if (inputMethod === "area" && area <= 0) {
      newErrors.area = "Area must be greater than 0";
    }
    if (inputMethod === "diameter" && diameter <= 0) {
      newErrors.diameter = "Diameter must be greater than 0";
    }
    if (dragCoefficient <= 0) {
      newErrors.dragCoefficient = "Drag coefficient must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateBallisticCoefficient = () => {
    if (!validateInputs()) {
      return;
    }

    // Convert mass to kg using selected unit
    const massKg = convertMassToKg(mass, massUnit);

    // Calculate in m²
    let areaM2: number;
    if (inputMethod === "area") {
      // Convert area using selected unit
      areaM2 = convertAreaToM2(area, areaUnit);
    } else {
      // Calculate from diameter: A = π * (d/2)²
      // Convert diameter to meters first
      const diameterM = convertDiameterToM(diameter, diameterUnit);
      areaM2 = Math.PI * Math.pow(diameterM / 2, 2);
    }

    // Calculate Coefficient: B = m / (Cd × A)
    const ballisticCoefficient = massKg / (dragCoefficient * areaM2);

    // Calculate Density: SD = m / A
    const sectionalDensity = massKg / areaM2;
    setResult({
      ballisticCoefficient: ballisticCoefficient,
      sectionalDensity: sectionalDensity,
      massKg: massKg,
      areaM2: areaM2,
      dragCoefficient: dragCoefficient,
      formula: "B = m / (Cd × A)",
      originalMass: mass,
      massUnit: massUnit,
      originalArea: inputMethod === "area" ? area : null,
      areaUnit: areaUnit,
      originalDiameter: inputMethod === "diameter" ? diameter : null,
      diameterUnit: diameterUnit
    });
    setShowResult(true);
  };
  const handleCalculate = () => {
    calculateBallisticCoefficient();
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="w-6 h-6 text-blue-600" />
                      <span>{contentData.ballistic_coefficient_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_projectile_parameters_to_calculate_ballistic_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">{contentData.input_method_2}</Label>
                      <Tabs value={inputMethod} onValueChange={setInputMethod} className="w-full">
                        <TabsList className="bg-gradient-to-r from-blue-50 to-teal-50 grid grid-cols-2 gap-1 mb-6 h-auto p-2 rounded-xl border border-blue-200 shadow-sm">
                          <TabsTrigger value="area" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-teal-100 hover:shadow-md">{contentData.crosssectional_area_3}</TabsTrigger>
                          <TabsTrigger value="diameter" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-teal-100 hover:shadow-md">{contentData.diameter_4}</TabsTrigger>
                        </TabsList>

                        <div className="space-y-6">
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.mass_of_projectile_5}</Label>
                            <div className="flex gap-3">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calculator className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.mass ? "border-red-500" : ""}`} type="number" value={mass} onChange={e => setMass(Number(e.target.value))} />
                              </div>
                              <Select value={massUnit} onValueChange={setMassUnit}>
                                <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="g">{contentData.g_6}</SelectItem>
                                  <SelectItem value="kg">{contentData.kg_7}</SelectItem>
                                  <SelectItem value="gr">{contentData.gr_8}</SelectItem>
                                  <SelectItem value="oz">{contentData.oz_9}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.mass && <p className="text-red-500 text-sm mt-1">{errors.mass}</p>}
                          </div>

                          <TabsContent value="area" className="mt-0">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.crosssectional_area_10}</Label>
                              <div className="flex gap-3">
                                <div className="relative flex-1">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Ruler className="h-5 w-5 text-blue-500" />
                                  </div>
                                  <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.area ? "border-red-500" : ""}`} type="number" value={area} onChange={e => setArea(Number(e.target.value))} />
                                </div>
                                <Select value={areaUnit} onValueChange={setAreaUnit}>
                                  <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mm²">{contentData.mm_11}</SelectItem>
                                    <SelectItem value="cm²">{contentData.cm_12}</SelectItem>
                                    <SelectItem value="in²">{contentData.in_13}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                            </div>
                          </TabsContent>

                          <TabsContent value="diameter" className="mt-0">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.diameter_14}</Label>
                              <div className="flex gap-3">
                                <div className="relative flex-1">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Ruler className="h-5 w-5 text-blue-500" />
                                  </div>
                                  <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.diameter ? "border-red-500" : ""}`} type="number" value={diameter} onChange={e => setDiameter(Number(e.target.value))} />
                                </div>
                                <Select value={diameterUnit} onValueChange={setDiameterUnit}>
                                  <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mm">{contentData.mm_15}</SelectItem>
                                    <SelectItem value="cm">{contentData.cm_16}</SelectItem>
                                    <SelectItem value="in">{contentData.in_17}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {errors.diameter && <p className="text-red-500 text-sm mt-1">{errors.diameter}</p>}
                              <p className="text-xs text-gray-500 mt-1">{contentData.area_will_be_calculated_as_d2_18}</p>
                            </div>
                          </TabsContent>

                          {/* Drag Coefficient Input */}
                          <div className="relative">
                            <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.drag_coefficient_cd_19}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Target className="h-5 w-5 text-blue-500" />
                              </div>
                              <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.dragCoefficient ? "border-red-500" : ""}`} type="number" step="0.01" value={dragCoefficient} onChange={e => setDragCoefficient(Number(e.target.value))} />
                            </div>
                            {errors.dragCoefficient && <p className="text-red-500 text-sm mt-1">{errors.dragCoefficient}</p>}
                            <p className="text-xs text-gray-500 mt-1">{contentData.dimensionless_coefficient_typical_range_0105_20}</p>
                          </div>
                        </div>
                      </Tabs>
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.formula_21}</strong>{contentData.b_m_cd_a_22}<br />
                        <strong>{contentData.where_23}</strong>{contentData.b_ballistic_coefficient_kgm_m_mass_kg_cd_drag_coef_24}</p>
                    </div>

                    <Button onClick={handleCalculate} className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700">{contentData.calculate_coefficient_25}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-teal-50 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.results_26}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-4">
                        <div>
                          <p className="text-lg text-gray-600 mb-2 font-medium">{contentData.ballistic_coefficient_27}</p>
                          <p className="text-4xl font-extrabold text-blue-900 mb-2 drop-shadow-lg">
                            {result.ballisticCoefficient ? result.ballisticCoefficient.toFixed(0) : "0"}{contentData.kgm_28}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1 font-medium">{contentData.sectional_density_29}</p>
                          <p className="text-2xl font-bold text-teal-700">
                            {result.sectionalDensity ? result.sectionalDensity.toFixed(0) : "0"}{contentData.kgm_30}</p>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-600">{contentData.mass_31}{result.originalMass} {result.massUnit} (
                            {result.massKg ? result.massKg.toFixed(3) : "0"}{contentData.kg_32}<br />
                            {result.originalArea ? <>{contentData.area_33}{result.originalArea} {result.areaUnit} (
                                {result.areaM2 ? (result.areaM2 * 1e6).toFixed(1) : "0"}{contentData.mm_34}</> : <>{contentData.diameter_35}{result.originalDiameter} {result.diameterUnit}{contentData.area_36}{" "}
                                {result.areaM2 ? (result.areaM2 * 1e6).toFixed(1) : "0"}{contentData.mm_37}</>}
                            <br />{contentData.cd_38}{result.dragCoefficient ? result.dragCoefficient.toFixed(2) : "0"}
                          </p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Target className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_values_and_click_39}<span className="font-semibold text-blue-600">{contentData.calculate_40}</span>{contentData.to_see_results_41}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="ballistic-coefficient-calculator"
            entityType="calculator"
            creatorSlug="realynn-reed"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-teal-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mr-3 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.understanding_ballistic_coefficient_42}</CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.what_is_ballistic_coefficient_43}</h3>
                    <p className="text-gray-700 leading-relaxed">{contentData.ballistic_coefficient_bc_is_a_measure_of_a_project_44}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculation_45}</h3>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{contentData.given_46}</strong>
                      </p>
                      <ul className="text-sm text-gray-700 list-disc list-inside mb-3">
                        <li>{contentData.mass_m_180_g_0180_kg_47}</li>
                        <li>{contentData.area_a_400_mm_400_10_m_48}</li>
                        <li>{contentData.drag_coefficient_cd_030_49}</li>
                      </ul>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{contentData.calculation_50}</strong>
                      </p>
                      <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.b_0180_030_400_10_51}<br />{contentData.b_0180_120_10_52}<br />{contentData.b_1500_kgm_53}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.key_relationships_54}</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>{contentData.sectional_density_sd_55}</strong>{contentData.sd_m_a_mass_per_unit_area_56}</li>
                      <li>
                        <strong>{contentData.alternative_form_57}</strong>{contentData.b_sd_cd_58}</li>
                      <li>
                        <strong>{contentData.higher_bc_59}</strong>{contentData.better_longrange_performance_less_wind_drift_60}</li>
                      <li>
                        <strong>{contentData.typical_values_61}</strong>{contentData.k_0208_kgm_bullets_0103_kgm_pellets_62}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>;
}
