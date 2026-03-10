"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Calculator, TrendingUp, AlertCircle } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";

interface ContentData {
  calculatorTitle: string;
  calculatorDescription: string;
  materialLabel: string;
  angleTypeLabel: string;
  leg1Label: string;
  leg2Label: string;
  thicknessLabel: string;
  lengthLabel: string;
  dimensionUnitLabel: string;
  lengthUnitLabel: string;
  calculateButton: string;
  exampleButton: string;
  resetButton: string;
  steps: string;
  resultsTitle: string;
  noResultsYet: string;
  materials: {
    mild_steel: string;
    stainless_steel: string;
    aluminum: string;
  };
  angleTypes: {
    equal: string;
    unequal: string;
  };
}

interface CalculationResult {
  crossSectionArea: number;
  volume: number;
  weightPerMeter: number;
  totalWeight: number;
  material: string;
  density: number;
  leg1: number;
  leg2: number;
  thickness: number;
  length: number;
  angleType: string;
}

const defaultContent: ContentData = {
  calculatorTitle: "Angle Weight Calculator",
  calculatorDescription: "Calculate the weight of steel, MS, SS, and aluminum angle bars",
  materialLabel: "Material Type",
  angleTypeLabel: "Angle Type",
  leg1Label: "Leg 1 (Width 1)",
  leg2Label: "Leg 2 (Width 2)",
  thicknessLabel: "Wall Thickness",
  lengthLabel: "Length",
  dimensionUnitLabel: "Dimension Unit",
  lengthUnitLabel: "Length Unit",
  calculateButton: "Calculate Weight",
  exampleButton: "Try Example",
  resetButton: "Reset",
  steps: "Calculation Results",
  resultsTitle: "Weight Results",
  noResultsYet: "Enter dimensions and click Calculate",
  materials: {
    mild_steel: "Mild Steel (MS)",
    stainless_steel: "Stainless Steel (SS)",
    aluminum: "Aluminum"
  },
  angleTypes: {
    equal: "Equal Angle",
    unequal: "Unequal Angle"
  }
};

const materialDensities = {
  mild_steel: 7850, // kg/m³
  stainless_steel: 8000, // kg/m³
  aluminum: 2700 // kg/m³
};

export default function AngleWeightCalculatorClient({
  content,
  guideContent
}: {
  content?: ContentData | null;
  guideContent?: any;
}) {
  const contentData = content || defaultContent;

  const [material, setMaterial] = useState<string>("mild_steel");
  const [angleType, setAngleType] = useState<string>("equal");
  const [leg1, setLeg1] = useState<string>("50");
  const [leg2, setLeg2] = useState<string>("50");
  const [thickness, setThickness] = useState<string>("6");
  const [length, setLength] = useState<string>("6");
  const [dimensionUnit, setDimensionUnit] = useState<string>("mm");
  const [lengthUnit, setLengthUnit] = useState<string>("m");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const convertToMm = (value: number, unit: string): number => {
    switch(unit) {
      case "mm": return value;
      case "cm": return value * 10;
      case "inch": return value * 25.4;
      default: return value;
    }
  };

  const convertToMeters = (value: number, unit: string): number => {
    switch(unit) {
      case "m": return value;
      case "cm": return value / 100;
      case "ft": return value * 0.3048;
      case "inch": return value * 0.0254;
      default: return value;
    }
  };

  const calculateWeight = () => {
    setError("");
    
    const L1 = parseFloat(leg1);
    const L2 = parseFloat(leg2);
    const t = parseFloat(thickness);
    const len = parseFloat(length);

    if (isNaN(L1) || L1 <= 0) {
      setError("Please enter a valid Leg 1 dimension (greater than 0)");
      return;
    }

    if (isNaN(L2) || L2 <= 0) {
      setError("Please enter a valid Leg 2 dimension (greater than 0)");
      return;
    }

    if (isNaN(t) || t <= 0) {
      setError("Please enter a valid thickness (greater than 0)");
      return;
    }

    if (isNaN(len) || len <= 0) {
      setError("Please enter a valid length (greater than 0)");
      return;
    }

    // Convert all dimensions to mm
    const L1mm = convertToMm(L1, dimensionUnit);
    const L2mm = convertToMm(L2, dimensionUnit);
    const tmm = convertToMm(t, dimensionUnit);

    if (tmm >= L1mm || tmm >= L2mm) {
      setError("Thickness must be less than both leg dimensions");
      return;
    }

    const density = materialDensities[material as keyof typeof materialDensities];

    // Calculate cross-section area in mm²
    const area = (L1mm + L2mm - tmm) * tmm;

    // Convert length to meters
    const lengthMeters = convertToMeters(len, lengthUnit);
    
    // Convert length from meters to mm
    const lengthMm = lengthMeters * 1000;

    // Calculate volume in mm³
    const volume = area * lengthMm;

    // Convert volume to m³ (divide by 10^9)
    const volumeM3 = volume / 1000000000;

    // Calculate total weight in kg
    const totalWeight = volumeM3 * density;

    // Calculate weight per meter
    const weightPerMeter = totalWeight / lengthMeters;

    // Calculate weight per foot
    const weightPerFoot = weightPerMeter * 0.3048;

    const calculationResult: CalculationResult = {
      crossSectionArea: area,
      volume: volumeM3,
      weightPerMeter: weightPerMeter,
      totalWeight: totalWeight,
      material: material,
      density: density,
      leg1: L1mm,
      leg2: L2mm,
      thickness: tmm,
      length: lengthMeters,
      angleType: angleType
    };

    setResult(calculationResult);
    setShowResult(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const runExample = () => {
    setMaterial("mild_steel");
    setAngleType("equal");
    setLeg1("50");
    setLeg2("50");
    setThickness("6");
    setLength("6");
    setDimensionUnit("mm");
    setLengthUnit("m");
    setError("");
  };

  const resetCalculator = () => {
    setMaterial("mild_steel");
    setAngleType("equal");
    setLeg1("");
    setLeg2("");
    setThickness("");
    setLength("");
    setDimensionUnit("mm");
    setLengthUnit("m");
    setResult(null);
    setError("");
    setShowResult(false);
  };

  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toFixed(decimals);
  };

  const getMaterialName = (mat: string): string => {
    const names: { [key: string]: string } = {
      mild_steel: "Mild Steel (MS)",
      stainless_steel: "Stainless Steel (SS)",
      aluminum: "Aluminum"
    };
    return names[mat] || mat;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{contentData.calculatorTitle}</h1>
              <p className="text-lg text-gray-600">{contentData.calculatorDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Scale className="w-6 h-6 text-orange-600" />
                      <span>{contentData.calculatorTitle}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.calculatorDescription}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-8">
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="material" className="text-base font-semibold text-gray-700">
                            {contentData.materialLabel}
                          </Label>
                          <Select value={material} onValueChange={setMaterial}>
                            <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mild_steel">{contentData.materials.mild_steel}</SelectItem>
                              <SelectItem value="stainless_steel">{contentData.materials.stainless_steel}</SelectItem>
                              <SelectItem value="aluminum">{contentData.materials.aluminum}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="angleType" className="text-base font-semibold text-gray-700">
                            {contentData.angleTypeLabel}
                          </Label>
                          <Select value={angleType} onValueChange={(val) => {
                            setAngleType(val);
                            if (val === "equal") {
                              setLeg2(leg1);
                            }
                          }}>
                            <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equal">{contentData.angleTypes.equal}</SelectItem>
                              <SelectItem value="unequal">{contentData.angleTypes.unequal}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="leg1" className="text-base font-semibold text-gray-700">
                            {contentData.leg1Label}
                          </Label>
                          <Input 
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                            type="number" 
                            value={leg1} 
                            onChange={e => {
                              setLeg1(e.target.value);
                              if (angleType === "equal") {
                                setLeg2(e.target.value);
                              }
                            }} 
                            placeholder="50" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dimensionUnit" className="text-base font-semibold text-gray-700">
                            {contentData.dimensionUnitLabel}
                          </Label>
                          <Select value={dimensionUnit} onValueChange={setDimensionUnit}>
                            <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm">Millimeters (mm)</SelectItem>
                              <SelectItem value="cm">Centimeters (cm)</SelectItem>
                              <SelectItem value="inch">Inches (in)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="leg2" className="text-base font-semibold text-gray-700">
                            {contentData.leg2Label}
                          </Label>
                          <Input 
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                            type="number" 
                            value={leg2} 
                            onChange={e => setLeg2(e.target.value)} 
                            placeholder="50"
                            disabled={angleType === "equal"}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="thickness" className="text-base font-semibold text-gray-700">
                            {contentData.thicknessLabel}
                          </Label>
                          <Input 
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                            type="number" 
                            value={thickness} 
                            onChange={e => setThickness(e.target.value)} 
                            placeholder="6" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="length" className="text-base font-semibold text-gray-700">
                            {contentData.lengthLabel}
                          </Label>
                          <Input 
                            className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                            type="number" 
                            value={length} 
                            onChange={e => setLength(e.target.value)} 
                            placeholder="6" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lengthUnit" className="text-base font-semibold text-gray-700">
                            {contentData.lengthUnitLabel}
                          </Label>
                          <Select value={lengthUnit} onValueChange={setLengthUnit}>
                            <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="m">Meters (m)</SelectItem>
                              <SelectItem value="cm">Centimeters (cm)</SelectItem>
                              <SelectItem value="ft">Feet (ft)</SelectItem>
                              <SelectItem value="inch">Inches (in)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-700">
                          <strong>Formula:</strong>
                          <br />Weight (kg) = (L1 + L2 − T) × T × Length × Density
                          <br />For steel: Weight/m = (L1 + L2 − T) × T × 0.00785
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button onClick={calculateWeight} className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                        {contentData.calculateButton}
                      </Button>
                      <Button onClick={runExample} variant="outline" className="h-12 px-6 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">
                        {contentData.exampleButton}
                      </Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent">
                        {contentData.resetButton}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {showResult && result && (
                  <Card ref={resultsRef} className="shadow-2xl pt-0 border-0 bg-white mt-8">
                    <CardHeader className="bg-gradient-to-r pt-0 from-orange-50 to-red-50 border-b px-8 py-6">
                      <CardTitle className="flex items-center space-x-3 text-2xl">
                        <Calculator className="w-6 h-6 text-orange-600" />
                        <span>{contentData.steps}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Input Parameters</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Material:</span>
                              <span className="ml-2 font-semibold text-gray-900">{getMaterialName(result.material)}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Angle Type:</span>
                              <span className="ml-2 font-semibold text-gray-900">{result.angleType === 'equal' ? 'Equal' : 'Unequal'}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Leg 1:</span>
                              <span className="ml-2 font-semibold text-gray-900">{result.leg1} mm</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Leg 2:</span>
                              <span className="ml-2 font-semibold text-gray-900">{result.leg2} mm</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Thickness:</span>
                              <span className="ml-2 font-semibold text-gray-900">{result.thickness} mm</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Length:</span>
                              <span className="ml-2 font-semibold text-gray-900">{result.length} m</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Calculation Steps</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start">
                              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                              <div>
                                <p className="font-semibold text-gray-900">Cross-Section Area</p>
                                <p className="text-gray-700">A = (L1 + L2 − T) × T</p>
                                <p className="text-gray-700">A = ({result.leg1} + {result.leg2} − {result.thickness}) × {result.thickness}</p>
                                <p className="text-gray-900 font-semibold">A = {formatNumber(result.crossSectionArea, 2)} mm²</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                              <div>
                                <p className="font-semibold text-gray-900">Volume</p>
                                <p className="text-gray-700">Volume = Area × Length</p>
                                <p className="text-gray-700">Volume = {formatNumber(result.crossSectionArea, 2)} mm² × {result.length * 1000} mm</p>
                                <p className="text-gray-900 font-semibold">Volume = {formatNumber(result.volume * 1000000000, 0)} mm³ = {formatNumber(result.volume, 6)} m³</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                              <div>
                                <p className="font-semibold text-gray-900">Weight Calculation</p>
                                <p className="text-gray-700">Weight = Volume × Density</p>
                                <p className="text-gray-700">Weight = {formatNumber(result.volume, 6)} m³ × {result.density} kg/m³</p>
                                <p className="text-gray-900 font-semibold">Total Weight = {formatNumber(result.totalWeight, 2)} kg</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Final Results</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-sm text-gray-600 mb-1">Weight per Meter</p>
                              <p className="text-3xl font-bold text-orange-600">{formatNumber(result.weightPerMeter, 2)} kg/m</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-sm text-gray-600 mb-1">Total Weight ({result.length}m)</p>
                              <p className="text-3xl font-bold text-orange-600">{formatNumber(result.totalWeight, 2)} kg</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="hidden lg:block">
                <Card className="shadow-2xl pt-0 border-0 bg-gradient-to-br from-orange-50 to-red-100 h-[50%] flex flex-col justify-center items-center p-8 sticky top-24">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.resultsTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center w-full space-y-4">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h3 className="font-semibold text-orange-800 mb-2">Weight per Meter</h3>
                          <div className="text-3xl font-bold text-orange-900">
                            {formatNumber(result.weightPerMeter, 2)} kg/m
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h3 className="font-semibold text-orange-800 mb-2">Total Weight</h3>
                          <div className="text-3xl font-bold text-orange-900">
                            {formatNumber(result.totalWeight, 2)} kg
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Scale className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          {contentData.noResultsYet}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto prose prose-lg">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">Quick Answer</h2>
                  <p className="text-gray-700 leading-relaxed mb-0">
                    An <strong>angle weight calculator</strong> is a tool used to determine the weight of angle bars (L-shaped metal sections) based on their dimensions, material type, and length. The weight is calculated using the angle weight calculation formula: <strong>Weight (kg) = Cross-sectional Area × Length × Material Density</strong>. For steel angle bars, the density is typically 7850 kg/m³, while for aluminum angles it is about 2700 kg/m³. Using an angle weight calculator in kg helps engineers, fabricators, and builders estimate material weight quickly for cost estimation, transportation, and structural planning.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">Equal Angles Weight per Kg</h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Size</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Gauge in mm</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Weight Per Feet (Kgs)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Weight Per Mtr (Kgs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 px-4 py-2">20x20x3</td><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">0.274</td><td className="border border-gray-300 px-4 py-2">0.899</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">25x25x3</td><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">0.335</td><td className="border border-gray-300 px-4 py-2">1.099</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">25x25x5</td><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">0.548</td><td className="border border-gray-300 px-4 py-2">1.798</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">31x31x3</td><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">0.390</td><td className="border border-gray-300 px-4 py-2">1.280</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">35x35x5</td><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">0.792</td><td className="border border-gray-300 px-4 py-2">2.599</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">37x37x3</td><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">0.518</td><td className="border border-gray-300 px-4 py-2">1.700</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">40x40x3</td><td className="border border-gray-300 px-4 py-2">3</td><td className="border border-gray-300 px-4 py-2">0.548</td><td className="border border-gray-300 px-4 py-2">1.798</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">40x40x5</td><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">0.915</td><td className="border border-gray-300 px-4 py-2">3.002</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">40x40x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">1.066</td><td className="border border-gray-300 px-4 py-2">3.498</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">50x50x5</td><td className="border border-gray-300 px-4 py-2">5</td><td className="border border-gray-300 px-4 py-2">1.158</td><td className="border border-gray-300 px-4 py-2">3.799</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">50x50x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">1.372</td><td className="border border-gray-300 px-4 py-2">4.502</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">60x60x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">1.645</td><td className="border border-gray-300 px-4 py-2">5.397</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65x65x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">1.767</td><td className="border border-gray-300 px-4 py-2">5.798</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65x65x8</td><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">2.346</td><td className="border border-gray-300 px-4 py-2">7.697</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65x65x10</td><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">2.864</td><td className="border border-gray-300 px-4 py-2">9.397</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">75x75x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">2.072</td><td className="border border-gray-300 px-4 py-2">6.798</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">75x75x8</td><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">2.712</td><td className="border border-gray-300 px-4 py-2">8.898</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">75x75x10</td><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">3.352</td><td className="border border-gray-300 px-4 py-2">10.998</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">80x80x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">2.224</td><td className="border border-gray-300 px-4 py-2">7.297</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">80x80x8</td><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">2.925</td><td className="border border-gray-300 px-4 py-2">9.597</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90x90x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">2.499</td><td className="border border-gray-300 px-4 py-2">8.199</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90x90x8</td><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">3.292</td><td className="border border-gray-300 px-4 py-2">10.801</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90x90x10</td><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">4.084</td><td className="border border-gray-300 px-4 py-2">13.400</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x100x6</td><td className="border border-gray-300 px-4 py-2">6</td><td className="border border-gray-300 px-4 py-2">2.804</td><td className="border border-gray-300 px-4 py-2">9.200</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x100x8</td><td className="border border-gray-300 px-4 py-2">8</td><td className="border border-gray-300 px-4 py-2">3.687</td><td className="border border-gray-300 px-4 py-2">12.097</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x100x10</td><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">4.545</td><td className="border border-gray-300 px-4 py-2">14.912</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x100x12</td><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">5.395</td><td className="border border-gray-300 px-4 py-2">17.701</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">110x110x12</td><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">5.028</td><td className="border border-gray-300 px-4 py-2">16.497</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">130x130x10</td><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">6.004</td><td className="border border-gray-300 px-4 py-2">19.699</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x150x10</td><td className="border border-gray-300 px-4 py-2">10</td><td className="border border-gray-300 px-4 py-2">6.950</td><td className="border border-gray-300 px-4 py-2">22.803</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x150x12</td><td className="border border-gray-300 px-4 py-2">12</td><td className="border border-gray-300 px-4 py-2">8.290</td><td className="border border-gray-300 px-4 py-2">27.199</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x150x16</td><td className="border border-gray-300 px-4 py-2">16</td><td className="border border-gray-300 px-4 py-2">10.911</td><td className="border border-gray-300 px-4 py-2">35.799</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x150x20</td><td className="border border-gray-300 px-4 py-2">20</td><td className="border border-gray-300 px-4 py-2">13.441</td><td className="border border-gray-300 px-4 py-2">44.100</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Unequal Angles Weight per Kg</h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Size (mm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Weight per meter (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 px-4 py-2">30x20x3</td><td className="border border-gray-300 px-4 py-2">1.1</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">30x20x4</td><td className="border border-gray-300 px-4 py-2">1.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">30x20x5</td><td className="border border-gray-300 px-4 py-2">1.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">40x25x3</td><td className="border border-gray-300 px-4 py-2">1.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">40x25x4</td><td className="border border-gray-300 px-4 py-2">1.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">40x25x5</td><td className="border border-gray-300 px-4 py-2">2.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">40x25x6</td><td className="border border-gray-300 px-4 py-2">2.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">45x30x3</td><td className="border border-gray-300 px-4 py-2">1.7</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">45x30x4</td><td className="border border-gray-300 px-4 py-2">2.2</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">45x30x5</td><td className="border border-gray-300 px-4 py-2">2.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">45x30x6</td><td className="border border-gray-300 px-4 py-2">3.3</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">50x30x3</td><td className="border border-gray-300 px-4 py-2">1.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">50x30x4</td><td className="border border-gray-300 px-4 py-2">2.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">50x30x5</td><td className="border border-gray-300 px-4 py-2">3</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">50x30x6</td><td className="border border-gray-300 px-4 py-2">3.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">60x40x5</td><td className="border border-gray-300 px-4 py-2">3.7</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">60x40x6</td><td className="border border-gray-300 px-4 py-2">4.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">60x40x8</td><td className="border border-gray-300 px-4 py-2">5.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65x45x5</td><td className="border border-gray-300 px-4 py-2">4.1</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65x45x6</td><td className="border border-gray-300 px-4 py-2">4.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65x45x8</td><td className="border border-gray-300 px-4 py-2">6.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">70x45x5</td><td className="border border-gray-300 px-4 py-2">4.3</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">70x45x6</td><td className="border border-gray-300 px-4 py-2">5.2</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">75x50x5</td><td className="border border-gray-300 px-4 py-2">4.7</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">75x50x6</td><td className="border border-gray-300 px-4 py-2">5.6</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">80x50x5</td><td className="border border-gray-300 px-4 py-2">4.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">80x50x6</td><td className="border border-gray-300 px-4 py-2">5.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">80x50x8</td><td className="border border-gray-300 px-4 py-2">7.7</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">80x50x10</td><td className="border border-gray-300 px-4 py-2">9.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90x60x6</td><td className="border border-gray-300 px-4 py-2">6.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90x60x8</td><td className="border border-gray-300 px-4 py-2">8.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90x60x10</td><td className="border border-gray-300 px-4 py-2">11</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90x60x12</td><td className="border border-gray-300 px-4 py-2">13</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x65x6</td><td className="border border-gray-300 px-4 py-2">7.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x65x8</td><td className="border border-gray-300 px-4 py-2">9.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x65x10</td><td className="border border-gray-300 px-4 py-2">12.2</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x75x6</td><td className="border border-gray-300 px-4 py-2">8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x75x8</td><td className="border border-gray-300 px-4 py-2">10.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x75x10</td><td className="border border-gray-300 px-4 py-2">13</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">100x75x12</td><td className="border border-gray-300 px-4 py-2">15.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">125x75x6</td><td className="border border-gray-300 px-4 py-2">9.2</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">125x75x8</td><td className="border border-gray-300 px-4 py-2">12.1</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">125x75x10</td><td className="border border-gray-300 px-4 py-2">14.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">125x95x6</td><td className="border border-gray-300 px-4 py-2">10.1</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">125x95x8</td><td className="border border-gray-300 px-4 py-2">13.3</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">125x95x10</td><td className="border border-gray-300 px-4 py-2">16.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">125x95x12</td><td className="border border-gray-300 px-4 py-2">19.6</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x75x8</td><td className="border border-gray-300 px-4 py-2">13.7</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x75x10</td><td className="border border-gray-300 px-4 py-2">16.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x75x12</td><td className="border border-gray-300 px-4 py-2">20.1</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x115x8</td><td className="border border-gray-300 px-4 py-2">16.2</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x115x10</td><td className="border border-gray-300 px-4 py-2">20</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x115x12</td><td className="border border-gray-300 px-4 py-2">23.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150x115x15</td><td className="border border-gray-300 px-4 py-2">29.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200x100x10</td><td className="border border-gray-300 px-4 py-2">22.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200x100x12</td><td className="border border-gray-300 px-4 py-2">27.2</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200x100x15</td><td className="border border-gray-300 px-4 py-2">33.6</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200x150x10</td><td className="border border-gray-300 px-4 py-2">16.7</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200x150x12</td><td className="border border-gray-300 px-4 py-2">31.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200x150x15</td><td className="border border-gray-300 px-4 py-2">39.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200x150x18</td><td className="border border-gray-300 px-4 py-2">46.9</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Steel Angle Weight Per Kg of SAIL (Steel Authority of India Limited)</h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Section</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Dimensions (mm)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Sectional Weight (kg/m)</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Length (m)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 px-4 py-2" rowSpan={9}>Angles - Bhilai Steel Plant</td><td className="border border-gray-300 px-4 py-2">50 x 50 x 5*</td><td className="border border-gray-300 px-4 py-2">3.8</td><td className="border border-gray-300 px-4 py-2" rowSpan={9}>10 to 13 for all dimensions</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">50 x 50 x 6</td><td className="border border-gray-300 px-4 py-2">4.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">60 x 60 x 5/6/8*</td><td className="border border-gray-300 px-4 py-2">4.5/5.4/7.0</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65 x 65 x 5*</td><td className="border border-gray-300 px-4 py-2">4.9</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">65 x 65 x 6/8/10</td><td className="border border-gray-300 px-4 py-2">5.8/7.7/9.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">70 x 70 x 5/6*</td><td className="border border-gray-300 px-4 py-2">5.3/6.3</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">75 x 75 x 5/6/8/10</td><td className="border border-gray-300 px-4 py-2">5.7/6.8/8.9/11.0</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">80 x 80 x 6/8/10</td><td className="border border-gray-300 px-4 py-2">7.3/9.6/11.8</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">90 x 90 x 6/8/10</td><td className="border border-gray-300 px-4 py-2">8.2/10.8/13.4</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2" rowSpan={4}>Angles - Durgapur Steel Plant</td><td className="border border-gray-300 px-4 py-2">100 x 100 x 10/12</td><td className="border border-gray-300 px-4 py-2">14.9/17.7</td><td className="border border-gray-300 px-4 py-2" rowSpan={4}>10 to 11.5 for all dimensions</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">110 x 110 x 10/12</td><td className="border border-gray-300 px-4 py-2">16.6/19.7</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">130 x 130 x 10/12</td><td className="border border-gray-300 px-4 py-2">19.7/23.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">150 x 150 x 12/16</td><td className="border border-gray-300 px-4 py-2">22.9/27.3</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2" rowSpan={4}>Angles - Bhilai Steel Plant</td><td className="border border-gray-300 px-4 py-2">150 x 150 x 16/20*</td><td className="border border-gray-300 px-4 py-2">35.8/44.1</td><td className="border border-gray-300 px-4 py-2" rowSpan={4}>10 to 13 for all dimensions</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200 x 200 x 16</td><td className="border border-gray-300 px-4 py-2">48.5</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200 x 200 x 20</td><td className="border border-gray-300 px-4 py-2">60</td></tr>
                      <tr><td className="border border-gray-300 px-4 py-2">200 x 200 x 24</td><td className="border border-gray-300 px-4 py-2">70.8</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Angle Weight Calculator: Complete Guide</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Angle bars—also known as L-sections or angle irons—are widely used in construction, fabrication, machinery frames, towers, and structural supports. Accurately calculating their weight is essential for material planning and structural design.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  An <strong>angle weight calculator online</strong> simplifies this process by automatically computing weight based on dimensions such as leg length, thickness, and length of the angle section.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This guide explains everything you need to know about the <strong>steel angle weight calculator</strong>, formulas, charts, and downloadable tools like <strong>angle weight calculator Excel</strong> sheets and PDF charts.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">What is an Angle Weight Calculator?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  An <strong>angle weight calculator</strong> is a formula-based or digital tool that determines the weight of angle bars (L-shaped metal sections).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  It is commonly used by:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Structural engineers</li>
                  <li>Fabrication shops</li>
                  <li>Construction companies</li>
                  <li>Metal suppliers</li>
                  <li>Mechanical engineers</li>
                  <li>Industrial designers</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The calculator works for multiple materials including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>MS angle weight calculator</strong> (Mild Steel)</li>
                  <li><strong>SS angle weight calculator</strong> (Stainless Steel)</li>
                  <li><strong>Aluminum angle weight calculator</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  It can also calculate different angle types such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Equal angle weight calculator</strong></li>
                  <li><strong>Unequal angle weight calculator</strong></li>
                  <li><strong>L angle weight calculator</strong></li>
                  <li><strong>Angle section weight calculator</strong></li>
                </ul>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Types of Angle Bars</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Understanding angle types is important when using an <strong>angle bar weight calculator</strong>.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">1. Equal Angle Bars</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In equal angles, both legs of the L-section have the same dimensions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Example:</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  50 mm × 50 mm × 6 mm
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These are widely used in:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Frames</li>
                  <li>Towers</li>
                  <li>Structural reinforcements</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  An <strong>equal angle weight calculator</strong> helps determine weight quickly.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">2. Unequal Angle Bars</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In unequal angles, the legs have different sizes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Example:</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  75 mm × 50 mm × 6 mm
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These are commonly used in:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Structural supports</li>
                  <li>Bridge frameworks</li>
                  <li>Machine bases</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A <strong>unequal angle weight calculator</strong> is used for precise estimation.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Angle Weight Calculator Formula</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The <strong>angle weight calculation formula</strong> depends on the cross-section area and density of the material.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Basic Formula</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-6 font-mono text-sm">
                  Weight = Volume × Density
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Since volume = Area × Length
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The final formula becomes:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-6 font-mono text-sm">
                  Weight (kg) = Cross-section Area × Length × Density
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Simplified Steel Formula</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For steel angle bars, the simplified formula is:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-6 font-mono text-sm">
                  Weight (kg/m) = (A + B − T) × T × 0.00785
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Where:</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>A = Leg 1 (mm)</li>
                  <li>B = Leg 2 (mm)</li>
                  <li>T = Thickness (mm)</li>
                  <li>0.00785 = Steel density factor</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This formula is commonly used in an <strong>angle iron weight calculator</strong> or <strong>angle section weight calculator</strong>.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Example Angle Weight Calculation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Suppose you have an angle:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-900 font-semibold mb-2">50 × 50 × 6 mm</p>
                  <p className="text-gray-900 font-semibold">Length = 6 meters</p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Using the formula:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                  Weight/m = (50 + 50 − 6) × 6 × 0.00785<br/>
                  Weight/m = 4.43 kg
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Total weight for 6 meters:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-6 font-mono text-sm">
                  4.43 × 6 = 26.58 kg
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Using an <strong>angle weight calculator in kg</strong> simplifies this calculation instantly.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Steel Angle Weight Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A <strong>steel angle weight calculator</strong> is the most commonly used version because steel angles are widely used in construction and infrastructure.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Steel types include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>MS angle weight calculator</strong> (Mild Steel)</li>
                  <li><strong>SS angle weight calculator</strong> (Stainless Steel)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Typical density values:
                </p>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Material</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Density</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Mild Steel</td>
                        <td className="border border-gray-300 px-4 py-2">7850 kg/m³</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Stainless Steel</td>
                        <td className="border border-gray-300 px-4 py-2">8000 kg/m³</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Aluminum</td>
                        <td className="border border-gray-300 px-4 py-2">2700 kg/m³</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Using the correct density ensures accurate results.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Aluminum Angle Weight Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  An <strong>aluminum angle weight calculator</strong> works the same way but uses a lower density value.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aluminum advantages:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Lightweight</li>
                  <li>Corrosion resistant</li>
                  <li>Ideal for aerospace and marine applications</li>
                  <li>Easier to transport</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Because aluminum density is much lower, aluminum angle bars weigh about one-third of steel angles.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Applications of Angle Weight Calculation</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Angle weight calculations are essential for multiple industries.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Construction</h3>
                    <p className="text-gray-700 mb-0">Used in structural frames, buildings, bridges, and towers.</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Fabrication</h3>
                    <p className="text-gray-700 mb-0">Helps metal fabricators determine material requirements.</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Logistics</h3>
                    <p className="text-gray-700 mb-0">Weight calculations are required for transport planning and shipping costs.</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Structural Engineering</h3>
                    <p className="text-gray-700 mb-0">Ensures accurate load calculations.</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">How to Use an Angle Weight Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Using an <strong>angle weight calculator</strong> typically requires the following steps:
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1</h3>
                    <p className="text-gray-700 mb-0">Select the material type (MS, SS, aluminum).</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2</h3>
                    <p className="text-gray-700 mb-2">Enter the leg dimensions.</p>
                    <p className="text-gray-700 mb-0"><strong>Example:</strong> A = 50 mm, B = 50 mm</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3</h3>
                    <p className="text-gray-700 mb-2">Enter the thickness.</p>
                    <p className="text-gray-700 mb-0"><strong>Example:</strong> 6 mm</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4</h3>
                    <p className="text-gray-700 mb-2">Enter the length.</p>
                    <p className="text-gray-700 mb-0"><strong>Example:</strong> 6 meters</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 5</h3>
                    <p className="text-gray-700 mb-2">Click Calculate.</p>
                    <p className="text-gray-700 mb-0">The calculator will return the total weight in kg.</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Equal vs Unequal Angle Weight Calculation</h2>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Calculator</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Equal Angle</td>
                        <td className="border border-gray-300 px-4 py-2">Both legs same size</td>
                        <td className="border border-gray-300 px-4 py-2">Equal angle weight calculator</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Unequal Angle</td>
                        <td className="border border-gray-300 px-4 py-2">Legs different sizes</td>
                        <td className="border border-gray-300 px-4 py-2">Unequal angle weight calculator</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Both types can be calculated using the same <strong>angle weight calculation formula</strong>.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Angle Bar Weight Calculator vs Angle Iron Weight Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  These terms are often used interchangeably:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Angle bar weight calculator</li>
                  <li>Angle iron weight calculator</li>
                  <li>L angle weight calculator</li>
                  <li>Angle section weight calculator</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  All refer to the same process: calculating the weight of L-shaped metal profiles.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Frequently Asked Questions (FAQs)</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What is an angle weight calculator?</h3>
                    <p className="text-gray-700 mb-0">An angle weight calculator is a tool used to determine the weight of L-shaped metal sections based on their dimensions, length, and material density.</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">How do you calculate angle weight?</h3>
                    <p className="text-gray-700 mb-2">The angle weight calculation formula is:</p>
                    <p className="text-gray-700 mb-2 font-mono bg-white p-2 rounded">Weight = Cross-section Area × Length × Density</p>
                    <p className="text-gray-700 mb-0 font-mono bg-white p-2 rounded">For steel: Weight/m = (A + B − T) × T × 0.00785</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What is the weight of a 50×50×6 angle?</h3>
                    <p className="text-gray-700 mb-0">A 50×50×6 mm equal angle weighs approximately <strong>4.43 kg per meter</strong>.</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Where can I download an angle weight chart PDF?</h3>
                    <p className="text-gray-700 mb-0">Many engineering websites and steel manufacturers provide angle weight chart PDF files containing standard size tables.</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Is there an angle weight calculator in Excel?</h3>
                    <p className="text-gray-700 mb-0">Yes. Many engineers use an angle weight calculator Excel spreadsheet to automatically calculate weight for multiple angle sizes.</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What materials can be calculated?</h3>
                    <p className="text-gray-700 mb-2">Most calculators support:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Mild Steel</li>
                      <li>Stainless Steel</li>
                      <li>Aluminum</li>
                    </ul>
                    <p className="text-gray-700 mt-2 mb-0">This allows use as a steel angle weight calculator, ss angle weight calculator, or aluminum angle weight calculator.</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Conclusion</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  An <strong>angle weight calculator</strong> is an essential tool for engineers, builders, and metal fabricators. Whether calculating MS angles, stainless steel angles, or aluminum sections, accurate weight estimation ensures better planning, cost control, and structural safety.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <SimilarCalculators
                calculators={[
                  {
                    calculatorName: "Board Foot Calculator",
                    calculatorHref: "/construction/board-foot-calculator",
                    calculatorDescription: "Calculate board feet for lumber"
                  },
                  {
                    calculatorName: "Cubic Yard Calculator",
                    calculatorHref: "/construction/cubic-yard-calculator",
                    calculatorDescription: "Calculate cubic yards for materials"
                  },
                  {
                    calculatorName: "Size to Weight Calculator",
                    calculatorHref: "/construction/size-to-weight-rectangular-cuboid-calculator",
                    calculatorDescription: "Calculate weight from dimensions"
                  }
                ]}
                color="orange"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
