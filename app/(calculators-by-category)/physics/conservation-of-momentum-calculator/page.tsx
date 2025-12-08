"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Zap, Calculator, TrendingUp, Gauge, Settings } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
export default function ConservationOfMomentumCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('conservation-of-momentum-calculator', language, "calculator-ui");
  const {
    content: guideContent,
    loading: guideLoading,
    error: guideError
  } = useCalculatorContent('conservation-of-momentum-calculator', language, "calculator-guide");
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
    "collision_parameters_0": "",
    "enter_object_properties_and_collision_type_to_calc_1": "",
    "collision_type_2": "",
    "elastic_3": "",
    "perfectly_inelastic_4": "",
    "with_restitution_5": "",
    "general_6": "",
    "coefficient_of_restitution_e_7": "",
    "object_1_8": "",
    "mass_m_9": "",
    "kg_10": "",
    "g_11": "",
    "t_12": "",
    "initial_velocity_u_13": "",
    "ms_14": "",
    "kmh_15": "",
    "mph_16": "",
    "final_velocity_v_optional_17": "",
    "ms_18": "",
    "kmh_19": "",
    "mph_20": "",
    "object_2_21": "",
    "mass_m_22": "",
    "kg_23": "",
    "g_24": "",
    "t_25": "",
    "initial_velocity_u_26": "",
    "ms_27": "",
    "kmh_28": "",
    "mph_29": "",
    "final_velocity_v_optional_30": "",
    "ms_31": "",
    "kmh_32": "",
    "mph_33": "",
    "calculate_34": "",
    "collision_results_35": "",
    "final_velocities_36": "",
    "object_1_37": "",
    "ms_38": "",
    "object_2_39": "",
    "ms_40": "",
    "momentum_41": "",
    "initial_42": "",
    "kgms_43": "",
    "final_44": "",
    "kgms_45": "",
    "conserved_46": "",
    "kinetic_energy_47": "",
    "initial_total_48": "",
    "j_49": "",
    "final_total_50": "",
    "j_51": "",
    "energy_change_52": "",
    "j_53": "",
    "type_54": "",
    "individual_energies_55": "",
    "object_1_56": "",
    "j_57": "",
    "object_2_58": "",
    "j_59": "",
    "enter_parameters_and_click_60": "",
    "calculate_61": "",
    "to_see_results_62": "",
    "understanding_collision_physics_63": "",
    "conservation_laws_64": "",
    "all_collisions_conserve_momentum_m1u1_m2u2_m1v1_m2_65": "",
    "elastic_collisions_also_conserve_kinetic_energy_wh_66": "",
    "collision_types_67": "",
    "elastic_68": "",
    "both_momentum_and_kinetic_energy_conserved_e_1_69": "",
    "perfectly_inelastic_70": "",
    "objects_stick_together_after_collision_e_0_71": "",
    "with_restitution_72": "",
    "coefficient_e_determines_energy_loss_0_e_1_73": "",
    "general_74": "",
    "solve_for_unknowns_using_momentum_conservation_75": "",
    "example_calculation_76": "",
    "given_77": "",
    "m_2_kg_u_4_ms_m_3_kg_u_0_ms_elastic_collision_78": "",
    "solution_79": "",
    "v_234_23023_45_04_ms_80": "",
    "v_320_22423_165_32_ms_81": "",
    "initial_ke_24_16_j_82": "",
    "final_ke_204_332_16_j_83": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // Object 1 inputs with units
  const [mass1, setMass1] = useState(2);
  const [mass1Unit, setMass1Unit] = useState("kg");
  const [initialVel1, setInitialVel1] = useState(4);
  const [initialVel1Unit, setInitialVel1Unit] = useState("ms");
  const [finalVel1, setFinalVel1] = useState("");
  const [finalVel1Unit, setFinalVel1Unit] = useState("ms");

  // Object 2 inputs with units
  const [mass2, setMass2] = useState(3);
  const [mass2Unit, setMass2Unit] = useState("kg");
  const [initialVel2, setInitialVel2] = useState(0);
  const [initialVel2Unit, setInitialVel2Unit] = useState("ms");
  const [finalVel2, setFinalVel2] = useState("");
  const [finalVel2Unit, setFinalVel2Unit] = useState("ms");

  // Collision type and parameters
  const [collisionType, setCollisionType] = useState("elastic");
  const [coefficientRestitution, setCoefficientRestitution] = useState(0.8);

  // Unit conversion functions
  const convertMass = (value: number, fromUnit: string): number => {
    const conversions = {
      kg: 1,
      g: 0.001,
      tonne: 1000
    };
    return value * (conversions[fromUnit as keyof typeof conversions] || 1);
  };
  const convertVelocity = (value: number, fromUnit: string): number => {
    const conversions = {
      ms: 1,
      kmh: 1 / 3.6,
      mph: 0.44704
    };
    return value * (conversions[fromUnit as keyof typeof conversions] || 1);
  };
  const convertEnergy = (value: number, toUnit: string): number => {
    const conversions = {
      J: 1,
      kJ: 0.001,
      cal: 0.239006
    };
    return value * (conversions[toUnit as keyof typeof conversions] || 1);
  };

  // Validation function
  const validateInputs = () => {
    const newErrors: any = {};
    if (mass1 <= 0) newErrors.mass1 = "Mass must be positive";
    if (mass2 <= 0) newErrors.mass2 = "Mass must be positive";
    if (collisionType === "restitution" && (coefficientRestitution < 0 || coefficientRestitution > 1)) {
      newErrors.coefficientRestitution = "Coefficient must be between 0 and 1";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Physics calculations
  const calculateCollision = () => {
    if (!validateInputs()) return;

    // Convert all values to SI units
    const m1 = convertMass(mass1, mass1Unit);
    const m2 = convertMass(mass2, mass2Unit);
    const u1 = convertVelocity(initialVel1, initialVel1Unit);
    const u2 = convertVelocity(initialVel2, initialVel2Unit);
    let v1: number, v2: number;

    // Calculate velocities based on collision type
    switch (collisionType) {
      case "elastic":
        v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
        v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
        break;
      case "inelastic":
        v1 = v2 = (m1 * u1 + m2 * u2) / (m1 + m2);
        break;
      case "restitution":
        v1 = ((m1 - coefficientRestitution * m2) * u1 + (1 + coefficientRestitution) * m2 * u2) / (m1 + m2);
        v2 = ((1 + coefficientRestitution) * m1 * u1 + (m2 - coefficientRestitution * m1) * u2) / (m1 + m2);
        break;
      default:
        // general - solve for unknowns if possible
        if (finalVel1 !== "" && finalVel2 !== "") {
          v1 = convertVelocity(Number(finalVel1), finalVel1Unit);
          v2 = convertVelocity(Number(finalVel2), finalVel2Unit);
        } else if (finalVel1 !== "") {
          v1 = convertVelocity(Number(finalVel1), finalVel1Unit);
          v2 = (m1 * u1 + m2 * u2 - m1 * v1) / m2;
        } else if (finalVel2 !== "") {
          v2 = convertVelocity(Number(finalVel2), finalVel2Unit);
          v1 = (m1 * u1 + m2 * u2 - m2 * v2) / m1;
        } else {
          // Default to elastic if no final velocities given
          v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
          v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
        }
    }

    // Calculate and energy
    const initialMomentum = m1 * u1 + m2 * u2;
    const finalMomentum = m1 * v1 + m2 * v2;
    const initialKE1 = 0.5 * m1 * u1 * u1;
    const initialKE2 = 0.5 * m2 * u2 * u2;
    const initialKETotal = initialKE1 + initialKE2;
    const finalKE1 = 0.5 * m1 * v1 * v1;
    const finalKE2 = 0.5 * m2 * v2 * v2;
    const finalKETotal = finalKE1 + finalKE2;
    const energyLoss = finalKETotal - initialKETotal;
    setResult({
      finalVel1: v1,
      finalVel2: v2,
      initialMomentum,
      finalMomentum,
      initialKE1,
      initialKE2,
      initialKETotal,
      finalKE1,
      finalKE2,
      finalKETotal,
      energyLoss,
      isElastic: Math.abs(energyLoss) < 0.001
    });
    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <span>{contentData.collision_parameters_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_object_properties_and_collision_type_to_calc_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* Collision Type Selection */}
                    <div>
                      <Label className="text-lg font-semibold text-gray-800 mb-4 block">{contentData.collision_type_2}</Label>
                      <RadioGroup value={collisionType} onValueChange={setCollisionType} className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                          <RadioGroupItem value="elastic" id="elastic" />
                          <Label htmlFor="elastic" className="font-medium">{contentData.elastic_3}</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                          <RadioGroupItem value="inelastic" id="inelastic" />
                          <Label htmlFor="inelastic" className="font-medium">{contentData.perfectly_inelastic_4}</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                          <RadioGroupItem value="restitution" id="restitution" />
                          <Label htmlFor="restitution" className="font-medium">{contentData.with_restitution_5}</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="font-medium">{contentData.general_6}</Label>
                        </div>
                      </RadioGroup>

                      {collisionType === "restitution" && <div className="mt-4">
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.coefficient_of_restitution_e_7}</Label>
                        <Input className={`w-32 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.coefficientRestitution ? "border-red-500" : ""}`} type="number" step="0.01" min="0" max="1" value={coefficientRestitution} onChange={e => setCoefficientRestitution(Number(e.target.value))} />
                        {errors.coefficientRestitution && <p className="text-red-500 text-sm mt-1">{errors.coefficientRestitution}</p>}
                      </div>}
                    </div>

                    {/* Object 1 */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">{contentData.object_1_8}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.mass_m_9}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Settings className="h-5 w-5 text-blue-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm ${errors.mass1 ? "border-red-500" : ""}`} type="number" step="0.1" value={mass1} onChange={e => setMass1(Number(e.target.value))} />
                            </div>
                            <Select value={mass1Unit} onValueChange={setMass1Unit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg">{contentData.kg_10}</SelectItem>
                                <SelectItem value="g">{contentData.g_11}</SelectItem>
                                <SelectItem value="tonne">{contentData.t_12}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.mass1 && <p className="text-red-500 text-sm mt-1">{errors.mass1}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.initial_velocity_u_13}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Gauge className="h-5 w-5 text-blue-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm" type="number" step="0.1" value={initialVel1} onChange={e => setInitialVel1(Number(e.target.value))} />
                            </div>
                            <Select value={initialVel1Unit} onValueChange={setInitialVel1Unit}>
                              <SelectTrigger className="w-24 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ms">{contentData.ms_14}</SelectItem>
                                <SelectItem value="kmh">{contentData.kmh_15}</SelectItem>
                                <SelectItem value="mph">{contentData.mph_16}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {collisionType === "general" && <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.final_velocity_v_optional_17}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <TrendingUp className="h-5 w-5 text-blue-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm" type="number" step="0.1" value={finalVel1} onChange={e => setFinalVel1(e.target.value)} placeholder="Leave empty to calculate" />
                            </div>
                            <Select value={finalVel1Unit} onValueChange={setFinalVel1Unit}>
                              <SelectTrigger className="w-24 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ms">{contentData.ms_18}</SelectItem>
                                <SelectItem value="kmh">{contentData.kmh_19}</SelectItem>
                                <SelectItem value="mph">{contentData.mph_20}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>}
                      </div>
                    </div>

                    {/* Object 2 */}
                    <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-teal-800 mb-4">{contentData.object_2_21}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.mass_m_22}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Settings className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${errors.mass2 ? "border-red-500" : ""}`} type="number" step="0.1" value={mass2} onChange={e => setMass2(Number(e.target.value))} />
                            </div>
                            <Select value={mass2Unit} onValueChange={setMass2Unit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg">{contentData.kg_23}</SelectItem>
                                <SelectItem value="g">{contentData.g_24}</SelectItem>
                                <SelectItem value="tonne">{contentData.t_25}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.mass2 && <p className="text-red-500 text-sm mt-1">{errors.mass2}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.initial_velocity_u_26}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Gauge className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm" type="number" step="0.1" value={initialVel2} onChange={e => setInitialVel2(Number(e.target.value))} />
                            </div>
                            <Select value={initialVel2Unit} onValueChange={setInitialVel2Unit}>
                              <SelectTrigger className="w-24 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ms">{contentData.ms_27}</SelectItem>
                                <SelectItem value="kmh">{contentData.kmh_28}</SelectItem>
                                <SelectItem value="mph">{contentData.mph_29}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {collisionType === "general" && <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.final_velocity_v_optional_30}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <TrendingUp className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm" type="number" step="0.1" value={finalVel2} onChange={e => setFinalVel2(e.target.value)} placeholder="Leave empty to calculate" />
                            </div>
                            <Select value={finalVel2Unit} onValueChange={setFinalVel2Unit}>
                              <SelectTrigger className="w-24 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ms">{contentData.ms_31}</SelectItem>
                                <SelectItem value="kmh">{contentData.kmh_32}</SelectItem>
                                <SelectItem value="mph">{contentData.mph_33}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>}
                      </div>
                    </div>

                    <Button onClick={calculateCollision} className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Calculator className="w-5 h-5 mr-2" />{contentData.calculate_34}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-teal-50 sticky top-24 h-fit">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.collision_results_35}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="w-full space-y-4">
                    <div className="text-center">
                      <p className="text-lg text-gray-600 mb-4 font-medium">{contentData.final_velocities_36}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <p className="text-sm text-blue-700 font-medium">{contentData.object_1_37}</p>
                          <p className="text-2xl font-bold text-blue-900">{result.finalVel1.toFixed(2)}{contentData.ms_38}</p>
                        </div>
                        <div className="bg-teal-100 p-3 rounded-lg">
                          <p className="text-sm text-teal-700 font-medium">{contentData.object_2_39}</p>
                          <p className="text-2xl font-bold text-teal-900">{result.finalVel2.toFixed(2)}{contentData.ms_40}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2">{contentData.momentum_41}</h4>
                        <div className="text-sm space-y-1">
                          <p>{contentData.initial_42}{result.initialMomentum.toFixed(2)}{contentData.kgms_43}</p>
                          <p>{contentData.final_44}{result.finalMomentum.toFixed(2)}{contentData.kgms_45}</p>
                          <p className={`font-medium ${Math.abs(result.finalMomentum - result.initialMomentum) < 0.001 ? "text-green-600" : "text-red-600"}`}>{contentData.conserved_46}{" "}
                            {Math.abs(result.finalMomentum - result.initialMomentum) < 0.001 ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2">{contentData.kinetic_energy_47}</h4>
                        <div className="text-sm space-y-1">
                          <p>{contentData.initial_total_48}{result.initialKETotal.toFixed(2)}{contentData.j_49}</p>
                          <p>{contentData.final_total_50}{result.finalKETotal.toFixed(2)}{contentData.j_51}</p>
                          <p className={`font-medium ${result.energyLoss >= 0 ? "text-red-600" : "text-green-600"}`}>{contentData.energy_change_52}{result.energyLoss.toFixed(2)}{contentData.j_53}</p>
                          <p className={`font-medium ${result.isElastic ? "text-green-600" : "text-orange-600"}`}>{contentData.type_54}{result.isElastic ? "Elastic" : "Inelastic"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2">{contentData.individual_energies_55}</h4>
                        <div className="text-sm space-y-1">
                          <p>{contentData.object_1_56}{result.initialKE1.toFixed(2)} → {result.finalKE1.toFixed(2)}{contentData.j_57}</p>
                          <p>{contentData.object_2_58}{result.initialKE2.toFixed(2)} → {result.finalKE2.toFixed(2)}{contentData.j_59}</p>
                        </div>
                      </div>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Zap className="w-8 h-8 text-blue-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_parameters_and_click_60}<span className="font-semibold text-blue-600">{contentData.calculate_61}</span>{contentData.to_see_results_62}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          <CalculatorGuide data={guideData} />

          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-teal-50 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mr-3 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.understanding_collision_physics_63}</CardTitle>
              </CardHeader>
              <CardContent className="w-full space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.conservation_laws_64}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{contentData.all_collisions_conserve_momentum_m1u1_m2u2_m1v1_m2_65}</p>
                  <p className="text-gray-700 leading-relaxed">{contentData.elastic_collisions_also_conserve_kinetic_energy_wh_66}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.collision_types_67}</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      <strong>{contentData.elastic_68}</strong>{contentData.both_momentum_and_kinetic_energy_conserved_e_1_69}</li>
                    <li>
                      <strong>{contentData.perfectly_inelastic_70}</strong>{contentData.objects_stick_together_after_collision_e_0_71}</li>
                    <li>
                      <strong>{contentData.with_restitution_72}</strong>{contentData.coefficient_e_determines_energy_loss_0_e_1_73}</li>
                    <li>
                      <strong>{contentData.general_74}</strong>{contentData.solve_for_unknowns_using_momentum_conservation_75}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculation_76}</h3>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{contentData.given_77}</strong>{contentData.m_2_kg_u_4_ms_m_3_kg_u_0_ms_elastic_collision_78}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{contentData.solution_79}</strong>
                    </p>
                    <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.v_234_23023_45_04_ms_80}<br />{contentData.v_320_22423_165_32_ms_81}<br />{contentData.initial_ke_24_16_j_82}<br />{contentData.final_ke_204_332_16_j_83}</p>
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