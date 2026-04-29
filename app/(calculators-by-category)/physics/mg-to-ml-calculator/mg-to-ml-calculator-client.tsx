"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Calculator, Droplet, Beaker, Syringe, FlaskConical } from "lucide-react";
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
  name: "mg to mL Calculator",
  description: "Convert milligrams to milliliters instantly using density or concentration. Free calculator for medicine, syringe dosing, lab work & liquid conversions.",
  url: "https://www.thesmartcalculator.com/health/mg-to-ml-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: ["mg to mL conversion", "mL to mg conversion", "Multiple liquid presets", "Custom density input", "Medicine concentration calculations", "Syringe dosage calculations"]
};

interface MgToMlResults {
  mgValue: number;
  mlValue: number;
  density: number;
  liquid: string;
  conversionType: "mg-to-ml" | "ml-to-mg";
  formula: string;
}

interface MgToMlCalculatorClientProps {
  content: any;
  guideContent: any;
}

const LIQUID_PRESETS = {
  water: { name: "Water", density: 1000, unit: "mg/mL" },
  milk: { name: "Whole Milk", density: 1032, unit: "mg/mL" },
  cooking_oil: { name: "Cooking Oil", density: 915, unit: "mg/mL" },
  ethanol: { name: "Ethanol (Alcohol)", density: 789, unit: "mg/mL" },
  honey: { name: "Honey", density: 1420, unit: "mg/mL" },
  custom: { name: "Custom", density: 0, unit: "mg/mL" }
};

export default function MgToMlCalculatorClient({ content, guideContent }: MgToMlCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  
  const [mgValue, setMgValue] = useState("");
  const [mlValue, setMlValue] = useState("");
  const [selectedLiquid, setSelectedLiquid] = useState("water");
  const [customDensity, setCustomDensity] = useState("");
  const [medicationConcentration, setMedicationConcentration] = useState("");
  const [conversionType, setConversionType] = useState<"mg-to-ml" | "ml-to-mg">("mg-to-ml");
  const [results, setResults] = useState<MgToMlResults | null>(null);

  const getCurrentDensity = () => {
    if (selectedLiquid === "custom") {
      const density = parseFloat(customDensity);
      return density > 0 ? density : 1000;
    }
    return LIQUID_PRESETS[selectedLiquid as keyof typeof LIQUID_PRESETS].density;
  };

  const calculate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const density = getCurrentDensity();
    
    if (conversionType === "mg-to-ml") {
      const mg = parseFloat(mgValue);
      if (!mg || mg <= 0) return;
      
      const ml = mg / density;
      const formula = `mL = mg ÷ density (${density} mg/mL)`;
      
      setResults({
        mgValue: mg,
        mlValue: ml,
        density,
        liquid: selectedLiquid === "custom" ? "Custom Liquid" : LIQUID_PRESETS[selectedLiquid as keyof typeof LIQUID_PRESETS].name,
        conversionType,
        formula
      });
    } else {
      const ml = parseFloat(mlValue);
      if (!ml || ml <= 0) return;
      
      const mg = ml * density;
      const formula = `mg = mL × density (${density} mg/mL)`;
      
      setResults({
        mgValue: mg,
        mlValue: ml,
        density,
        liquid: selectedLiquid === "custom" ? "Custom Liquid" : LIQUID_PRESETS[selectedLiquid as keyof typeof LIQUID_PRESETS].name,
        conversionType,
        formula
      });
    }
  };

  const ConversionChart = () => (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-gray-900">Common Conversions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Water (1000 mg/mL)</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>100 mg</span>
              <span className="font-medium">0.1 mL</span>
            </div>
            <div className="flex justify-between">
              <span>500 mg</span>
              <span className="font-medium">0.5 mL</span>
            </div>
            <div className="flex justify-between">
              <span>1000 mg</span>
              <span className="font-medium">1 mL</span>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Cooking Oil (915 mg/mL)</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>100 mg</span>
              <span className="font-medium">0.109 mL</span>
            </div>
            <div className="flex justify-between">
              <span>500 mg</span>
              <span className="font-medium">0.546 mL</span>
            </div>
            <div className="flex justify-between">
              <span>1000 mg</span>
              <span className="font-medium">1.09 mL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Droplet className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                mg to mL Calculator | Instant Conversion Tool
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert mg to mL instantly using density or concentration. Free calculator for medicine, syringe dosing, lab work & liquid conversions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 pt-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>MG to ML Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Divide milligrams by the liquid's density (mg/mL) to get milliliters. For water: mL = mg ÷ 1000. For medicine: mL = mg ÷ concentration (mg/mL).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Conversion Type Selection */}
                    <div className="mb-6">
                      <Label className="text-base font-semibold text-gray-900 mb-3 block">Conversion Direction</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant={conversionType === "mg-to-ml" ? "default" : "outline"}
                          onClick={() => setConversionType("mg-to-ml")}
                          className="h-12 text-base"
                        >
                          mg → mL
                        </Button>
                        <Button
                          variant={conversionType === "ml-to-mg" ? "default" : "outline"}
                          onClick={() => setConversionType("ml-to-mg")}
                          className="h-12 text-base"
                        >
                          mL → mg
                        </Button>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">
                          {conversionType === "mg-to-ml" ? "Milligrams (mg)" : "Milliliters (mL)"}
                        </Label>
                        <div className="relative">
                          {conversionType === "mg-to-ml" ? (
                            <FlaskConical className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          ) : (
                            <Beaker className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          )}
                          <Input
                            type="number"
                            placeholder={conversionType === "mg-to-ml" ? "Enter mg" : "Enter mL"}
                            value={conversionType === "mg-to-ml" ? mgValue : mlValue}
                            onChange={(e) => conversionType === "mg-to-ml" ? setMgValue(e.target.value) : setMlValue(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            min="0"
                            step="any"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Liquid Type</Label>
                        <Select value={selectedLiquid} onValueChange={setSelectedLiquid}>
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                            <SelectValue placeholder="Select liquid" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="water">Water</SelectItem>
                            <SelectItem value="milk">Whole Milk</SelectItem>
                            <SelectItem value="cooking_oil">Cooking Oil</SelectItem>
                            <SelectItem value="ethanol">Ethanol (Alcohol)</SelectItem>
                            <SelectItem value="honey">Honey</SelectItem>
                            <SelectItem value="custom">Custom Density</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedLiquid === "custom" && (
                        <div className="space-y-3 md:col-span-2">
                          <Label className="text-base font-semibold text-gray-900">Custom Density (mg/mL)</Label>
                          <div className="relative">
                            <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="Enter density in mg/mL"
                              value={customDensity}
                              onChange={(e) => setCustomDensity(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                              min="0"
                              step="any"
                            />
                          </div>
                          <p className="text-sm text-gray-500">
                            Enter the density of your liquid in milligrams per milliliter
                          </p>
                        </div>
                      )}

                      <div className="space-y-3 md:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">Medication Concentration (Optional)</Label>
                        <div className="relative">
                          <Syringe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="text"
                            placeholder="e.g., 250 mg/5 mL or 50 mg/mL"
                            value={medicationConcentration}
                            onChange={(e) => setMedicationConcentration(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          For medicine: enter concentration from bottle label (e.g., 250 mg/5 mL)
                        </p>
                      </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">Result</CardTitle>
                    <CardDescription className="text-base">Your conversion result</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {results ? (
                      <div className="space-y-6">
                        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
                          <p className="text-lg text-gray-600 mb-2">
                            {results.conversionType === "mg-to-ml" ? 
                              `${results.mgValue} mg = ${results.mlValue.toFixed(4)} mL` : 
                              `${results.mlValue} mL = ${results.mgValue.toFixed(2)} mg`
                            }
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            Liquid: {results.liquid}
                          </p>
                          <p className="text-sm text-gray-500">
                            Density: {results.density} mg/mL
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-gray-900">Formula Used</h3>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <code className="text-sm font-mono text-gray-800">
                              {results.formula}
                            </code>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-gray-900">Calculation Steps</h3>
                          <div className="space-y-2 text-sm">
                            {results.conversionType === "mg-to-ml" ? (
                              <>
                                <div className="p-2 bg-blue-50 rounded">
                                  <strong>Step 1:</strong> Identify density: {results.density} mg/mL
                                </div>
                                <div className="p-2 bg-blue-50 rounded">
                                  <strong>Step 2:</strong> Apply formula: mL = mg ÷ density
                                </div>
                                <div className="p-2 bg-blue-50 rounded">
                                  <strong>Step 3:</strong> Calculate: {results.mgValue} ÷ {results.density} = {results.mlValue.toFixed(4)} mL
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="p-2 bg-green-50 rounded">
                                  <strong>Step 1:</strong> Identify density: {results.density} mg/mL
                                </div>
                                <div className="p-2 bg-green-50 rounded">
                                  <strong>Step 2:</strong> Apply formula: mg = mL × density
                                </div>
                                <div className="p-2 bg-green-50 rounded">
                                  <strong>Step 3:</strong> Calculate: {results.mlValue} × {results.density} = {results.mgValue.toFixed(2)} mg
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <ConversionChart />
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Droplet className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter values to calculate conversion</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Density Calculator",
                  calculatorHref: "/physics/density-calculator",
                  calculatorDescription: "Calculate density of materials using mass and volume"
                },
                {
                  calculatorName: "Volume Calculator",
                  calculatorHref: "/physics/volume-calculator",
                  calculatorDescription: "Calculate volume of various shapes and objects"
                },
                {
                  calculatorName: "Mass Calculator",
                  calculatorHref: "/physics/mass-calculator",
                  calculatorDescription: "Calculate mass using density and volume"
                }
              ]} 
              color="blue" 
              title="Related Physics Calculators" 
            />
            
            {/* Information Section */}
            <section className="mt-16">
              {/* Rating and Profile Section */}
              <RatingProfileSection
                entityId="mg-to-ml-calculator"
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
    </>
  );
}
