"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, RotateCcw, Layers, Package, Weight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

type UnitSystem = "imperial" | "metric";
type CalculationMode = "dimensions" | "area";

interface Results {
  area: number;
  baseVolumeFt3: number;
  baseVolumeYd3: number;
  baseWeightLb: number;
  baseWeightTons: number;
  sandVolumeFt3: number;
  sandVolumeYd3: number;
  sandWeightLb: number;
  sandWeightTons: number;
  baseBags50lb: number;
  baseBags80lb: number;
  sandBags50lb: number;
  sandBags80lb: number;
}


interface PaverBaseCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function PaverBaseCalculatorClient({ content, guideContent }: PaverBaseCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  

          const scrollToResults = useMobileScroll();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Input states
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("dimensions");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [length, setLength] = useState<string>("20");
  const [width, setWidth] = useState<string>("10");
  const [totalArea, setTotalArea] = useState<string>("");
  const [baseDepth, setBaseDepth] = useState<string>("6");
  const [sandDepth, setSandDepth] = useState<string>("1");
  const [paverThickness, setPaverThickness] = useState<string>("2");
  const [baseDensity, setBaseDensity] = useState<string>("100");
  const [sandDensity, setSandDensity] = useState<string>("100");
  const [wasteFactor, setWasteFactor] = useState<string>("10");
  
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");

    // Parse inputs
    const len = parseFloat(length);
    const wid = parseFloat(width);
    const area = parseFloat(totalArea);
    const baseD = parseFloat(baseDepth);
    const sandD = parseFloat(sandDepth);
    const paverT = parseFloat(paverThickness);
    const baseDens = parseFloat(baseDensity);
    const sandDens = parseFloat(sandDensity);
    const waste = parseFloat(wasteFactor) / 100;

    // Validation
    if (calculationMode === "dimensions") {
      if (isNaN(len) || len <= 0 || isNaN(wid) || wid <= 0) {
        setError(content?.errors?.invalidDimensions || "Please enter valid length and width");
        return;
      }
    } else {
      if (isNaN(area) || area <= 0) {
        setError(content?.errors?.invalidArea || "Please enter valid area");
        return;
      }
    }

    if (isNaN(baseD) || baseD <= 0) {
      setError(content?.errors?.invalidBaseDepth || "Please enter valid base depth");
      return;
    }

    if (isNaN(sandD) || sandD < 0) {
      setError(content?.errors?.invalidSandDepth || "Please enter valid sand depth");
      return;
    }

    // Warning for shallow base
    if (unitSystem === "imperial" && baseD < 4) {
      setError(content?.warnings?.shallowBase || "Warning: Base depth less than 4 inches may not be suitable for heavy loads");
    }

    // Calculate area in square feet
    let areaFt2: number;
    if (calculationMode === "dimensions") {
      if (unitSystem === "metric") {
        // Convert meters to feet
        areaFt2 = (len * 3.28084) * (wid * 3.28084);
      } else {
        areaFt2 = len * wid;
      }
    } else {
      if (unitSystem === "metric") {
        // Convert m² to ft²
        areaFt2 = area * 10.7639;
      } else {
        areaFt2 = area;
      }
    }

    // Convert depths to feet
    let baseDepthFt: number;
    let sandDepthFt: number;

    if (unitSystem === "metric") {
      // Convert cm to feet
      baseDepthFt = (baseD / 2.54) / 12;
      sandDepthFt = (sandD / 2.54) / 12;
    } else {
      // Convert inches to feet
      baseDepthFt = baseD / 12;
      sandDepthFt = sandD / 12;
    }

    // Calculate volumes in cubic feet
    const baseVolFt3 = areaFt2 * baseDepthFt;
    const sandVolFt3 = areaFt2 * sandDepthFt;

    // Apply waste factor
    const baseVolFt3WithWaste = baseVolFt3 * (1 + waste);
    const sandVolFt3WithWaste = sandVolFt3 * (1 + waste);

    // Convert to cubic yards
    const baseVolYd3 = baseVolFt3WithWaste / 27;
    const sandVolYd3 = sandVolFt3WithWaste / 27;

    // Calculate weights
    const baseWeightLb = baseVolFt3WithWaste * baseDens;
    const sandWeightLb = sandVolFt3WithWaste * sandDens;

    // Convert to tons
    const baseWeightTons = baseWeightLb / 2000;
    const sandWeightTons = sandWeightLb / 2000;

    // Calculate bags
    const baseBags50 = Math.ceil(baseWeightLb / 50);
    const baseBags80 = Math.ceil(baseWeightLb / 80);
    const sandBags50 = Math.ceil(sandWeightLb / 50);
    const sandBags80 = Math.ceil(sandWeightLb / 80);

    setResults({
      area: areaFt2,
      baseVolumeFt3: baseVolFt3WithWaste,
      baseVolumeYd3: baseVolYd3,
      baseWeightLb: baseWeightLb,
      baseWeightTons: baseWeightTons,
      sandVolumeFt3: sandVolFt3WithWaste,
      sandVolumeYd3: sandVolYd3,
      sandWeightLb: sandWeightLb,
      sandWeightTons: sandWeightTons,
      baseBags50lb: baseBags50,
      baseBags80lb: baseBags80,
      sandBags50lb: sandBags50,
      sandBags80lb: sandBags80
    });
  };

  const reset = () => {
    setLength("20");
    setWidth("10");
    setTotalArea("");
    setBaseDepth("6");
    setSandDepth("1");
    setPaverThickness("2");
    setBaseDensity("100");
    setSandDensity("100");
    setWasteFactor("10");
    setResults(null);
    setError("");
  };

  // Auto-calculate on input change
  useEffect(() => {
    if (calculationMode === "dimensions" && length && width && baseDepth) {
      calculate();
    } else if (calculationMode === "area" && totalArea && baseDepth) {
      calculate();
    }
  }, [length, width, totalArea, baseDepth, sandDepth, paverThickness, baseDensity, sandDensity, wasteFactor, unitSystem, calculationMode]);

      return <>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Layers className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle || "Paver Base Calculator"}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription || "Calculate the amount of base material, sand, and pavers needed for your paving project"}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Layers className="w-6 h-6 text-orange-600" />
                    <span>{contentData.calculator?.title || "Calculate Materials"}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.calculator?.description || "Enter your project dimensions and specifications"}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
            {/* Unit System Toggle */}
            <div className="mb-6">
              <Label className="text-base font-semibold mb-3 block">
                {content?.inputs?.unitSystem || "Unit System"}
              </Label>
              <Tabs value={unitSystem} onValueChange={(v) => setUnitSystem(v as UnitSystem)}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="imperial">Imperial (ft, in)</TabsTrigger>
                  <TabsTrigger value="metric">Metric (m, cm)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Calculation Mode */}
            <div className="mb-6">
              <Label className="text-base font-semibold mb-3 block">
                {content?.inputs?.calculationMode || "Calculate Using"}
              </Label>
              <Tabs value={calculationMode} onValueChange={(v) => setCalculationMode(v as CalculationMode)}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="dimensions">{content?.inputs?.projectDimensions || "Project Dimensions"}</TabsTrigger>
                  <TabsTrigger value="area">{content?.inputs?.projectArea || "Project Area"}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Dimensions Input */}
            {calculationMode === "dimensions" ? (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="length" className="text-sm font-medium">
                    {content?.inputs?.length || "Length"} ({unitSystem === "imperial" ? "ft" : "m"})
                  </Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="20"
                    min="0"
                    step="0.1"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="width" className="text-sm font-medium">
                    {content?.inputs?.width || "Width"} ({unitSystem === "imperial" ? "ft" : "m"})
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="10"
                    min="0"
                    step="0.1"
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <Label htmlFor="totalArea" className="text-sm font-medium">
                  {content?.inputs?.totalArea || "Total Area"} ({unitSystem === "imperial" ? "sq ft" : "m²"})
                </Label>
                <Input
                  id="totalArea"
                  type="number"
                  value={totalArea}
                  onChange={(e) => setTotalArea(e.target.value)}
                  placeholder="200"
                  min="0"
                  step="0.1"
                  className="mt-1"
                />
              </div>
            )}

            {/* Base and Sand Depths */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="baseDepth" className="text-sm font-medium">
                  {content?.inputs?.baseDepth || "Gravel/Base Depth"} ({unitSystem === "imperial" ? "in" : "cm"})
                </Label>
                <Input
                  id="baseDepth"
                  type="number"
                  value={baseDepth}
                  onChange={(e) => setBaseDepth(e.target.value)}
                  placeholder="6"
                  min="0"
                  step="0.1"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {content?.inputs?.baseDepthHint || "Walkway: 4-6 in, Driveway: 6-12 in"}
                </p>
              </div>
              <div>
                <Label htmlFor="sandDepth" className="text-sm font-medium">
                  {content?.inputs?.sandDepth || "Sand Bedding Depth"} ({unitSystem === "imperial" ? "in" : "cm"})
                </Label>
                <Input
                  id="sandDepth"
                  type="number"
                  value={sandDepth}
                  onChange={(e) => setSandDepth(e.target.value)}
                  placeholder="1"
                  min="0"
                  step="0.1"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {content?.inputs?.sandDepthHint || "Typical: 1 inch (2.5 cm)"}
                </p>
              </div>
            </div>

            {/* Advanced Options */}
            <details className="mb-6">
              <summary className="cursor-pointer text-sm font-semibold text-orange-600 mb-4">
                {content?.inputs?.advancedOptions || "Advanced Options"}
              </summary>
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                <div>
                  <Label htmlFor="baseDensity" className="text-sm font-medium">
                    {content?.inputs?.baseDensity || "Base Density"} (lb/ft³)
                  </Label>
                  <Input
                    id="baseDensity"
                    type="number"
                    value={baseDensity}
                    onChange={(e) => setBaseDensity(e.target.value)}
                    placeholder="100"
                    min="0"
                    step="1"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="sandDensity" className="text-sm font-medium">
                    {content?.inputs?.sandDensity || "Sand Density"} (lb/ft³)
                  </Label>
                  <Input
                    id="sandDensity"
                    type="number"
                    value={sandDensity}
                    onChange={(e) => setSandDensity(e.target.value)}
                    placeholder="100"
                    min="0"
                    step="1"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="wasteFactor" className="text-sm font-medium">
                    {content?.inputs?.wasteFactor || "Waste Factor"} (%)
                  </Label>
                  <Input
                    id="wasteFactor"
                    type="number"
                    value={wasteFactor}
                    onChange={(e) => setWasteFactor(e.target.value)}
                    placeholder="10"
                    min="0"
                    max="100"
                    step="1"
                    className="mt-1"
                  />
                </div>
              </div>
            </details>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Button onClick={calculate} className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg">
                        <Calculator className="w-4 h-4 mr-2" />
                        {contentData.buttons?.calculate || "Calculate"}
                      </Button>
                      <Button onClick={reset} variant="outline" className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {contentData.buttons?.reset || "Reset"}
                      </Button>
                    </div>

                    {/* Error Display */}
                    {error && (
                      <Alert className="mt-4 border-orange-200 bg-orange-50">
                        <AlertDescription className="text-orange-800">{error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-1">
              {results && (
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-50 sticky top-4">
                  <CardHeader className="px-6 py-4">
                    <CardTitle className="text-xl font-bold text-orange-700">
                      {contentData.results?.title || "Material Requirements"}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {contentData.results?.description || "Based on your project specifications"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 space-y-4">
                    {/* Project Area */}
                    <div className="p-4 bg-white rounded-lg border border-orange-200">
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-gray-700">
                        <Layers className="w-4 h-4 text-orange-500" />
                        {contentData.results?.projectArea || "Project Area"}
                      </h3>
                      <p className="text-xl font-bold text-orange-600">
                        {results.area.toFixed(2)} sq ft
                      </p>
                      <p className="text-sm text-gray-600">({(results.area / 10.7639).toFixed(2)} m²)</p>
                    </div>

                    {/* Base Material */}
                    <div className="p-4 bg-white rounded-lg border border-orange-200">
                      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-gray-700">
                        <Package className="w-4 h-4 text-orange-500" />
                        {contentData.results?.baseMaterial || "Base Material"}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Volume:</span>
                          <span className="font-bold text-orange-600">{results.baseVolumeYd3.toFixed(2)} yd³</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Weight:</span>
                          <span className="font-bold text-orange-600">{results.baseWeightTons.toFixed(2)} tons</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">50 lb Bags:</span>
                          <span className="font-semibold">{results.baseBags50lb}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">80 lb Bags:</span>
                          <span className="font-semibold">{results.baseBags80lb}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sand Material */}
                    <div className="p-4 bg-white rounded-lg border border-amber-200">
                      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-gray-700">
                        <Weight className="w-4 h-4 text-amber-600" />
                        {contentData.results?.sandMaterial || "Sand Bedding"}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Volume:</span>
                          <span className="font-bold text-amber-600">{results.sandVolumeYd3.toFixed(2)} yd³</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Weight:</span>
                          <span className="font-bold text-amber-600">{results.sandWeightTons.toFixed(2)} tons</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">50 lb Bags:</span>
                          <span className="font-semibold">{results.sandBags50lb}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">80 lb Bags:</span>
                          <span className="font-semibold">{results.sandBags80lb}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="paver-base-calculator"
            entityType="calculator"
            creatorSlug="hudson-hale"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Cubic Yard Calculator",
                calculatorHref: "/construction/cubic-yard-calculator",
                calculatorDescription: "Calculate cubic yards for concrete, soil, and other materials with precise measurements for construction and landscaping projects"
              },
              {
                calculatorName: "Square Feet to Cubic Yards Calculator",
                calculatorHref: "/construction/square-feet-to-cubic-yards-calculator",
                calculatorDescription: "Convert square feet to cubic yards for concrete, soil, and other materials in construction and landscaping projects"
              },
              {
                calculatorName: "Gallons per Square Foot Calculator",
                calculatorHref: "/construction/gallons-per-square-foot-calculator",
                calculatorDescription: "Calculate the number of gallons needed per square foot for painting or flooring"
              }
            ]}
            color="orange"
            title="Related Construction Calculators"
          />
        </div>
      </main>
    </div>
  </>;

}
