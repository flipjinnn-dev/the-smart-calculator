"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, Tractor, Gauge, Percent, TrendingUp, Book, HelpCircle, ChevronDown, ChevronUp, Clock, MapPin, Sprout } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface AcresPerHourResults {
  acresPerHour: number;
  theoreticalAPH: number;
  acresPerDay: number;
  timeForField: number | null;
  workingWidthFt: number;
  speedMph: number;
  efficiency: number;
  overlap: number;
}

interface AcresPerHourCalculatorClientProps {
  content?: any;
  guideContent?: CalculatorGuideData;
}

export default function AcresPerHourCalculatorClient({
  content,
  guideContent,
}: AcresPerHourCalculatorClientProps) {
  const guideData = guideContent || { color: "green", sections: [], faq: [] };
  const contentData = content || {};

  const [workingWidth, setWorkingWidth] = useState("");
  const [widthUnit, setWidthUnit] = useState("feet");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState("mph");
  const [efficiency, setEfficiency] = useState("");
  const [overlap, setOverlap] = useState("10");
  const [operationType, setOperationType] = useState("");
  const [fieldArea, setFieldArea] = useState("");
  const [results, setResults] = useState<AcresPerHourResults | null>(null);
  const [error, setError] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scrollToResults = useMobileScroll();
  const resultsRef = useRef<HTMLDivElement>(null);

  const getDefaultEfficiency = (operation: string): number => {
    const efficiencies: { [key: string]: number } = {
      "mowing": 75,
      "planting": 70,
      "spraying": 82,
      "tillage": 75,
      "bush_hog": 72,
      "custom": 75
    };
    return efficiencies[operation] || 75;
  };

  const calculateAcresPerHour = () => {
    scrollToResults(resultsRef as React.RefObject<HTMLElement>);
    setError("");

    const widthValue = parseFloat(workingWidth);
    if (isNaN(widthValue) || widthValue <= 0) {
      setError("Please enter a valid working width");
      return;
    }

    const speedValue = parseFloat(speed);
    if (isNaN(speedValue) || speedValue <= 0) {
      setError("Please enter a valid speed");
      return;
    }

    const efficiencyValue = parseFloat(efficiency);
    if (isNaN(efficiencyValue) || efficiencyValue <= 0 || efficiencyValue > 100) {
      setError("Please enter a valid efficiency (1-100%)");
      return;
    }

    const overlapValue = parseFloat(overlap);
    if (isNaN(overlapValue) || overlapValue < 0 || overlapValue > 50) {
      setError("Please enter a valid overlap (0-50%)");
      return;
    }

    const widthInFeet = widthUnit === "inches" ? widthValue / 12 : widthValue;
    const speedInMph = speedUnit === "kmh" ? speedValue * 0.621371 : speedValue;
    const efficiencyDecimal = efficiencyValue / 100;
    const overlapDecimal = overlapValue / 100;

    const effectiveWidth = widthInFeet * (1 - overlapDecimal);
    const theoreticalAPH = (widthInFeet * speedInMph) / 8.25;
    const acresPerHour = (effectiveWidth * speedInMph * efficiencyDecimal) / 8.25;
    const acresPerDay = acresPerHour * 8;

    let timeForField = null;
    if (fieldArea && parseFloat(fieldArea) > 0) {
      timeForField = parseFloat(fieldArea) / acresPerHour;
    }

    setResults({
      acresPerHour: parseFloat(acresPerHour.toFixed(2)),
      theoreticalAPH: parseFloat(theoreticalAPH.toFixed(2)),
      acresPerDay: parseFloat(acresPerDay.toFixed(2)),
      timeForField,
      workingWidthFt: parseFloat(widthInFeet.toFixed(2)),
      speedMph: parseFloat(speedInMph.toFixed(2)),
      efficiency: efficiencyValue,
      overlap: overlapValue
    });
  };

  const handleOperationChange = (value: string) => {
    setOperationType(value);
    if (value && !efficiency) {
      setEfficiency(getDefaultEfficiency(value).toString());
    }
  };

  const resetCalculator = () => {
    setWorkingWidth("");
    setWidthUnit("feet");
    setSpeed("");
    setSpeedUnit("mph");
    setEfficiency("");
    setOverlap("10");
    setOperationType("");
    setFieldArea("");
    setResults(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Tractor className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {contentData.pageTitle || contentData.title || "Acres Per Hour Calculator"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {contentData.pageDescriptionBefore ?? ""}
              {contentData.pageDescriptionBold ? (
                <strong className="font-semibold text-gray-900">{contentData.pageDescriptionBold}</strong>
              ) : null}
              {contentData.pageDescriptionAfter ?? contentData.description ?? ""}
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <Card className="shadow-2xl border-2 pt-0 border-green-100 hover:shadow-green-100 transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-6 w-6" />
              Calculate Acres Per Hour
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your equipment specifications and field conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Operation Type */}
            <div className="space-y-2">
              <Label htmlFor="operationType" className="flex items-center gap-2">
                <Tractor className="h-4 w-4 text-green-600" />
                Operation Type
              </Label>
              <Select value={operationType} onValueChange={handleOperationChange}>
                <SelectTrigger id="operationType">
                  <SelectValue placeholder="Select operation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mowing">Mowing</SelectItem>
                  <SelectItem value="planting">Planting</SelectItem>
                  <SelectItem value="spraying">Spraying</SelectItem>
                  <SelectItem value="tillage">Tillage</SelectItem>
                  <SelectItem value="bush_hog">Bush Hog</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Working Width */}
            <div className="space-y-2">
              <Label htmlFor="workingWidth" className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-green-600" />
                Working Width
              </Label>
              <div className="flex gap-2">
                <Input
                  id="workingWidth"
                  type="number"
                  value={workingWidth}
                  onChange={(e) => setWorkingWidth(e.target.value)}
                  placeholder="Enter width"
                  className="flex-1"
                  step="0.1"
                  min="0"
                />
                <Select value={widthUnit} onValueChange={setWidthUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="inches">Inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500">
                Effective working width of your implement
              </p>
            </div>

            {/* Ground Speed */}
            <div className="space-y-2">
              <Label htmlFor="speed" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Ground Speed
              </Label>
              <div className="flex gap-2">
                <Input
                  id="speed"
                  type="number"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  placeholder="Enter speed"
                  className="flex-1"
                  step="0.1"
                  min="0"
                />
                <Select value={speedUnit} onValueChange={setSpeedUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mph">MPH</SelectItem>
                    <SelectItem value="kmh">KM/H</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500">
                Average operating speed
              </p>
            </div>

            {/* Efficiency */}
            <div className="space-y-2">
              <Label htmlFor="efficiency" className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-green-600" />
                Field Efficiency (%)
              </Label>
              <Input
                id="efficiency"
                type="number"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                placeholder="Enter efficiency (e.g., 75)"
                step="1"
                min="1"
                max="100"
              />
              <p className="text-xs text-gray-500">
                Typical: Mowing 70-85%, planting 65-80%, Spraying 75-90%, Tillage 70-85%
              </p>
            </div>

            {/* Overlap */}
            <div className="space-y-2">
              <Label htmlFor="overlap" className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-green-600" />
                Overlap (%)
              </Label>
              <Input
                id="overlap"
                type="number"
                value={overlap}
                onChange={(e) => setOverlap(e.target.value)}
                placeholder="Enter overlap (e.g., 10)"
                step="1"
                min="0"
                max="50"
              />
              <p className="text-xs text-gray-500">
                Typical overlap: 5-15% (default 10%)
              </p>
            </div>

            {/* Field Area (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="fieldArea" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Field Area (Optional)
              </Label>
              <Input
                id="fieldArea"
                type="number"
                value={fieldArea}
                onChange={(e) => setFieldArea(e.target.value)}
                placeholder="Enter field size in acres"
                step="0.1"
                min="0"
              />
              <p className="text-xs text-gray-500">
                Enter field size to calculate time needed
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button onClick={calculateAcresPerHour} className="flex-1 bg-green-600 hover:bg-green-700">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate
              </Button>
              <Button onClick={resetCalculator} variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div ref={resultsRef}>
          {results && (
            <Card className="shadow-2xl border-2 pt-0 border-green-100">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b px-8 py-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-6 w-6" />
                  Productivity Results
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your field coverage estimates
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Effective Acres Per Hour
                    </p>
                    <p className="text-5xl font-bold text-green-600">
                      {results.acresPerHour}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      acres/hour
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Theoretical APH
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.theoreticalAPH}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Without efficiency</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Acres Per 8-Hour Day
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.acresPerDay}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Field Efficiency
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.efficiency}%
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Overlap
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.overlap}%
                    </p>
                  </div>
                </div>

                {results.timeForField && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <p className="font-semibold text-blue-900">Time to Complete Field</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">
                      {results.timeForField.toFixed(2)} hours
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      ≈ {Math.floor(results.timeForField)} hours {Math.round((results.timeForField % 1) * 60)} minutes
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    Calculation Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Working Width:</span>
                      <span className="font-medium text-gray-900">{results.workingWidthFt} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective Width:</span>
                      <span className="font-medium text-gray-900">{(results.workingWidthFt * (1 - results.overlap / 100)).toFixed(2)} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ground Speed:</span>
                      <span className="font-medium text-gray-900">{results.speedMph} mph</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Formula Used:</span>
                      <span className="font-medium text-gray-900 text-xs">(W × S × E × (1-O)) ÷ 8.25</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> These are estimates. Actual field performance may vary based on terrain, operator skill, and field conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

          <CalculatorGuide data={guideData} layout="article" />

          <RatingProfileSection
            entityId="acres-per-hour-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <SimilarCalculators
            calculators={[{
              calculatorName: "Height Calculator",
              calculatorHref: "/height-calculator",
              calculatorDescription: "Convert height between different units such as centimeters, meters, feet, and inches for medical, fitness, and general use"
            }]}
            color="teal"
            title="Related Other Calculators"
          />
        </div>
      </main>
    </div>
  );
}
