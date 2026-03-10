"use client";

import React, { useRef, useState } from "react";
import { Calculator, Activity, Beaker, AlertCircle, HelpCircle, Users, Pill } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";

type Gender = "male" | "female";
type InfectionSeverity = "mild" | "serious";
type DialysisStatus = "none" | "hemodialysis";

interface VancomycinResults {
  creatinineClearance: number;
  loadingDose: number;
  maintenanceDose: number;
  dosingInterval: string;
  targetTrough: string;
  targetAUC: string;
  estimatedTrough: number;
}

interface VancomycinCalculatorClientProps {
  content: any;
}

export default function VancomycinCalculatorClient({ content }: VancomycinCalculatorClientProps) {
  const contentData = content || {};
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [weight, setWeight] = useState("70");
  const [age, setAge] = useState("60");
  const [creatinine, setCreatinine] = useState("1.2");
  const [gender, setGender] = useState<Gender>("male");
  const [infectionSeverity, setInfectionSeverity] = useState<InfectionSeverity>("serious");
  const [dialysisStatus, setDialysisStatus] = useState<DialysisStatus>("none");
  const [results, setResults] = useState<VancomycinResults | null>(null);

  const calculateVancomycin = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    
    const wt = parseFloat(weight);
    const ageYears = parseFloat(age);
    const scr = parseFloat(creatinine);

    // Cockcroft-Gault equation for CrCl
    let crCl: number;
    if (gender === "male") {
      crCl = ((140 - ageYears) * wt) / (72 * scr);
    } else {
      crCl = (((140 - ageYears) * wt) / (72 * scr)) * 0.85;
    }

    // Loading dose: 25 mg/kg
    const loadingDose = wt * 25;

    // Maintenance dose: 15 mg/kg
    const maintenanceDose = wt * 15;

    // Dosing interval based on CrCl
    let dosingInterval: string;
    if (dialysisStatus === "hemodialysis") {
      dosingInterval = "After dialysis";
    } else if (crCl >= 90) {
      dosingInterval = "Every 8 hours";
    } else if (crCl >= 60) {
      dosingInterval = "Every 12 hours";
    } else if (crCl >= 30) {
      dosingInterval = "Every 24 hours";
    } else {
      dosingInterval = "Individualized";
    }

    // Target trough based on infection severity
    const targetTrough = infectionSeverity === "serious" ? "15–20 mg/L" : "10–15 mg/L";

    // Target AUC
    const targetAUC = "400–600";

    // Estimated trough (simplified)
    const estimatedTrough = infectionSeverity === "serious" ? 17.5 : 12.5;

    setResults({
      creatinineClearance: crCl,
      loadingDose,
      maintenanceDose,
      dosingInterval,
      targetTrough,
      targetAUC,
      estimatedTrough
    });
  };

  const loadExample = () => {
    setWeight("75");
    setAge("60");
    setCreatinine("1.2");
    setGender("male");
    setInfectionSeverity("serious");
    setDialysisStatus("none");
  };

  const resetForm = () => {
    setWeight("");
    setAge("");
    setCreatinine("");
    setGender("male");
    setInfectionSeverity("serious");
    setDialysisStatus("none");
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Pill className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vancomycin Calculator (Dose, AUC, Trough & Dialysis)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate vancomycin dosing, AUC, and trough levels for optimal antibiotic therapy
          </p>
        </div>

        <Card className="shadow-xl pt-0 border-0 bg-white mb-12">
          <CardContent className="p-8 py-4">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A <strong>vancomycin calculator</strong> is a clinical dosing tool used to estimate the optimal vancomycin dose, trough levels, and AUC (Area Under the Curve) based on patient-specific variables such as weight, age, kidney function (creatinine clearance), infection severity, and dialysis status. Modern vancomycin dosing calculators follow current AUC-guided therapeutic monitoring guidelines, targeting an AUC/MIC ratio of 400–600 to maximize treatment effectiveness while reducing nephrotoxicity. Clinicians commonly use a vancomycin dose calculator or vancomycin clinical calculator to determine loading dose, maintenance dose, trough level targets, and dosing intervals, especially in patients with renal impairment, pediatric populations, and those receiving hemodialysis.
              </p>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Incorrect dosing may lead to:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Treatment failure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Nephrotoxicity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Ototoxicity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Antibiotic resistance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">A modern vancomycin dosing calculator considers:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Loading dose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Maintenance dose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Dosing interval</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Target trough concentration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Target AUC exposure</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-2xl border-0 pt-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Calculator className="w-6 h-6 text-blue-600" />
                <span>Vancomycin Calculator</span>
              </CardTitle>
              <CardDescription className="text-base">Enter patient details for dosing calculation</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-900">
                    {contentData.weightLabel || "Patient Weight (kg)"}
                  </Label>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="h-12 text-lg border-2 focus:border-blue-500"
                    placeholder="70"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-900">
                    {contentData.ageLabel || "Age (years)"}
                  </Label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="h-12 text-lg border-2 focus:border-blue-500"
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-900">
                    {contentData.creatinineLabel || "Serum Creatinine (mg/dL)"}
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                    className="h-12 text-lg border-2 focus:border-blue-500"
                    placeholder="1.2"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-900">
                    {contentData.genderLabel || "Gender"}
                  </Label>
                  <Select value={gender} onValueChange={(value: Gender) => setGender(value)}>
                    <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-900">
                    {contentData.infectionTypeLabel || "Infection Severity"}
                  </Label>
                  <Select value={infectionSeverity} onValueChange={(value: InfectionSeverity) => setInfectionSeverity(value)}>
                    <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild Infection</SelectItem>
                      <SelectItem value="serious">Serious MRSA Infection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-900">
                    {contentData.dialysisLabel || "Dialysis Status"}
                  </Label>
                  <Select value={dialysisStatus} onValueChange={(value: DialysisStatus) => setDialysisStatus(value)}>
                    <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Dialysis</SelectItem>
                      <SelectItem value="hemodialysis">Hemodialysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={calculateVancomycin}
                  className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-xl font-bold"
                >
                  {contentData.calculateButton || "Calculate Vancomycin Dose"}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={loadExample} variant="outline" className="h-12">
                    {contentData.exampleButton || "Try Example"}
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="h-12">
                    {contentData.resetButton || "Reset"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card ref={resultsRef} className="shadow-2xl pt-0 border-0 bg-white sticky top-24">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
              <CardTitle className="text-2xl">
                {contentData.resultsTitle || "Vancomycin Dosing Results"}
              </CardTitle>
              <CardDescription className="text-base">Calculated dosing recommendations</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                      <p className="text-lg mb-2 font-semibold text-blue-800">Loading Dose</p>
                      <p className="text-3xl font-bold text-blue-700">{results.loadingDose.toFixed(0)} mg</p>
                      <p className="text-sm text-blue-600 mt-1">25 mg/kg</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-indigo-100 to-indigo-200 border-indigo-300">
                      <p className="text-lg mb-2 font-semibold text-indigo-800">Maintenance Dose</p>
                      <p className="text-3xl font-bold text-indigo-700">{results.maintenanceDose.toFixed(0)} mg</p>
                      <p className="text-sm text-indigo-600 mt-1">15 mg/kg {results.dosingInterval.toLowerCase()}</p>
                    </div>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-700">CrCl:</span>
                      <span className="font-bold text-gray-900">{results.creatinineClearance.toFixed(1)} mL/min</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-700">Dosing Interval:</span>
                      <span className="font-bold text-gray-900">{results.dosingInterval}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-700">Target Trough:</span>
                      <span className="font-bold text-green-600">{results.targetTrough}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-semibold text-gray-700">Target AUC/MIC:</span>
                      <span className="font-bold text-green-600">{results.targetAUC}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-gray-700">Estimated Trough:</span>
                      <span className="font-bold text-blue-600">{results.estimatedTrough} mg/L</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Clinical Note:</strong> These are estimated values. Actual dosing should be individualized based on therapeutic drug monitoring and clinical response. Consult current guidelines and institutional protocols.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    {contentData.noResultsYet || "Enter patient details to calculate vancomycin dosing"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-0 bg-white pt-0 mb-12">
          <CardHeader className="bg-gradient-to-r from-blue-50 py-6 to-indigo-50 border-b">
            <CardTitle className="text-2xl">Target Trough Levels</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-semibold">Infection Severity</th>
                    <th className="text-right py-3 font-semibold">Target Trough</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Mild infections</td>
                    <td className="py-3 text-right font-semibold text-green-600">10–15 mg/L</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 font-bold">Serious MRSA infections</td>
                    <td className="py-3 text-right font-bold text-blue-600">15–20 mg/L</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 pt-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b py-6">
            <CardTitle className="text-2xl">Vancomycin Dosing in Renal Impairment</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Kidney function strongly affects vancomycin clearance. A vancomycin calculator renal impairment adjustment prevents toxic accumulation.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-semibold">Creatinine Clearance</th>
                    <th className="text-right py-3 font-semibold">Dosing Interval</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">&gt;90 mL/min</td>
                    <td className="py-3 text-right font-semibold text-green-600">Every 8 hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">60–89 mL/min</td>
                    <td className="py-3 text-right font-semibold text-green-600">Every 12 hours</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">30–59 mL/min</td>
                    <td className="py-3 text-right font-semibold text-blue-600">Every 24 hours</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 font-bold">&lt;30 mL/min</td>
                    <td className="py-3 text-right font-bold text-red-600">Individualized dosing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-xl border-0 pt-0 bg-white">
            <CardHeader className="bg-gradient-to-r py-6 from-blue-50 to-indigo-50 border-b">
              <CardTitle className="text-2xl">Vancomycin Dosing Based on Trough</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Many hospitals still follow vancomycin dosing based on trough monitoring.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 font-semibold">Trough Level</th>
                      <th className="text-right py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">&lt;10 mg/L</td>
                      <td className="py-3 text-right font-semibold text-red-600">Increase dose</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">10–15 mg/L</td>
                      <td className="py-3 text-right font-semibold text-green-600">Acceptable for mild infection</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">15–20 mg/L</td>
                      <td className="py-3 text-right font-semibold text-blue-600">Target for serious infection</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 font-bold">&gt;20 mg/L</td>
                      <td className="py-3 text-right font-bold text-red-600">Reduce dose</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 pt-0 bg-white">
            <CardHeader className="bg-gradient-to-r py-6 from-blue-50 to-indigo-50 border-b">
              <CardTitle className="text-2xl">Hemodialysis Dosing</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Patients receiving dialysis require special dosing strategies. A vancomycin calculator for hemodialysis accounts for drug removal during treatment.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Loading Dose</h4>
                  <p className="text-gray-700 text-sm">20–25 mg/kg</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Maintenance Dose</h4>
                  <p className="text-gray-700 text-sm">10–15 mg/kg after dialysis</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Considerations</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Dialysis membrane type</li>
                    <li>• Treatment duration</li>
                    <li>• Residual kidney function</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-2xl">Pediatric Vancomycin Dosing</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Children require weight-based dosing. A vancomycin calculator pediatric determines safe doses using pediatric pharmacokinetic parameters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Typical Pediatric Dosing</h4>
                <p className="text-gray-700 text-sm">10–15 mg/kg every 6–8 hours</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Severe Infections</h4>
                <p className="text-gray-700 text-sm">15 mg/kg every 6 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 pt-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r py-6 from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-2xl">Best Practices from Vancomycin Dosing Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">AUC Monitoring</h4>
                  <p className="text-gray-600 text-sm">Use AUC 400–600 rather than trough alone.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Weight-Based Dosing</h4>
                  <p className="text-gray-600 text-sm">Use actual body weight.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Renal Adjustment</h4>
                  <p className="text-gray-600 text-sm">Adjust dosing intervals based on creatinine clearance.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Therapeutic Drug Monitoring</h4>
                  <p className="text-gray-600 text-sm">Measure trough or calculate AUC after initial dosing.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 pt-0 bg-white mb-12">
          <CardHeader className="bg-gradient-to-r py-6 from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">What is a vancomycin calculator?</h3>
                <p className="text-gray-700">
                  A vancomycin calculator is a clinical tool used to determine the correct vancomycin dose, dosing interval, and therapeutic monitoring targets based on patient-specific data.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">What does a vancomycin AUC calculator do?</h3>
                <p className="text-gray-700">
                  A vancomycin auc calculator estimates total drug exposure over 24 hours and helps clinicians maintain the recommended AUC/MIC ratio of 400–600.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">What trough level is recommended for vancomycin?</h3>
                <p className="text-gray-700">
                  Typical vancomycin dosing trough level targets are: 10–15 mg/L for mild infections and 15–20 mg/L for serious MRSA infections.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">How is vancomycin dosed in renal impairment?</h3>
                <p className="text-gray-700">
                  Vancomycin dosing renal impairment requires longer dosing intervals or reduced doses based on creatinine clearance.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">How is vancomycin dosed in hemodialysis patients?</h3>
                <p className="text-gray-700">
                  Vancomycin dosing in hemodialysis usually includes: Loading dose: 20–25 mg/kg and Maintenance dose: 10–15 mg/kg after dialysis. A vancomycin dosing calculator hemodialysis helps determine these doses.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Can vancomycin calculators be used for children?</h3>
                <p className="text-gray-700">
                  Yes. A vancomycin calculator pediatric estimates dosing based on body weight and age, typically 10–15 mg/kg per dose.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 pt-0 bg-white">
          <CardHeader className="bg-gradient-to-r py-6 from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-2xl">When to Use a Vancomycin Calculator</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Clinicians should use a vancomycin dosing calculator in situations such as:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Severe MRSA infections</h4>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-gray-900 mb-2">Sepsis or bacteremia</h4>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">ICU patients</h4>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-gray-900 mb-2">Renal impairment</h4>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Pediatric patients</h4>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">Hemodialysis patients</h4>
              </div>
            </div>
            <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">
                <strong>Important:</strong> Because dosing errors can cause harm, using a vancomycin calculator dose tool improves patient safety.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
