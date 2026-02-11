"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, Tractor, Gauge, Percent, TrendingUp, Book, HelpCircle, ChevronDown, ChevronUp, Leaf, Info, CheckCircle2 } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingProfileSection } from '@/components/rating-profile-section';
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AcresPerHourResults {
  acresPerHour: number;
  acresPerDay: number;
  hoursFor100Acres: number;
  hoursFor1000Acres: number;
  workingWidthFt: number;
  speedMph: number;
  efficiency: number;
}

interface AcresPerHourCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function AcresPerHourCalculatorClient({ content, guideContent }: AcresPerHourCalculatorClientProps) {
  const contentData = content || {};
  
  const [workingWidth, setWorkingWidth] = useState("");
  const [widthUnit, setWidthUnit] = useState("feet");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState("mph");
  const [efficiency, setEfficiency] = useState("");
  const [operationType, setOperationType] = useState("");
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
      setError(contentData.error_width || "Please enter a valid working width");
      return;
    }

    const speedValue = parseFloat(speed);
    if (isNaN(speedValue) || speedValue <= 0) {
      setError(contentData.error_speed || "Please enter a valid speed");
      return;
    }

    const efficiencyValue = parseFloat(efficiency);
    if (isNaN(efficiencyValue) || efficiencyValue <= 0 || efficiencyValue > 100) {
      setError(contentData.error_efficiency || "Please enter a valid efficiency (1-100%)");
      return;
    }

    const widthInFeet = widthUnit === "inches" ? widthValue / 12 : widthValue;
    const speedInMph = speedUnit === "kmh" ? speedValue * 0.621371 : speedValue;
    const efficiencyDecimal = efficiencyValue / 100;

    const acresPerHour = (widthInFeet * speedInMph * efficiencyDecimal) / 8.25;
    const acresPerDay = acresPerHour * 8;
    const hoursFor100Acres = 100 / acresPerHour;
    const hoursFor1000Acres = 1000 / acresPerHour;

    setResults({
      acresPerHour: parseFloat(acresPerHour.toFixed(2)),
      acresPerDay: parseFloat(acresPerDay.toFixed(2)),
      hoursFor100Acres: parseFloat(hoursFor100Acres.toFixed(2)),
      hoursFor1000Acres: parseFloat(hoursFor1000Acres.toFixed(2)),
      workingWidthFt: parseFloat(widthInFeet.toFixed(2)),
      speedMph: parseFloat(speedInMph.toFixed(2)),
      efficiency: efficiencyValue
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
    setOperationType("");
    setResults(null);
    setError("");
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-4 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg">
            <Tractor className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            {contentData.title || "Acres Per Hour Calculator"}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {contentData.description || "Calculate how many acres you can cover per hour based on working width, ground speed, and field efficiency"}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <Card className="shadow-2xl border-2 border-green-100 hover:shadow-green-100 transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-6 w-6" />
              {contentData.input_title || "Calculate Acres Per Hour"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {contentData.input_description || "Enter your equipment specifications and field conditions"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Operation Type */}
            <div className="space-y-2">
              <Label htmlFor="operationType" className="flex items-center gap-2">
                <Tractor className="h-4 w-4 text-green-600" />
                {contentData.operation_label || "Operation Type"}
              </Label>
              <Select value={operationType} onValueChange={handleOperationChange}>
                <SelectTrigger id="operationType">
                  <SelectValue placeholder={contentData.operation_placeholder || "Select operation type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mowing">{contentData.operation_mowing || "Mowing"}</SelectItem>
                  <SelectItem value="planting">{contentData.operation_planting || "Planting"}</SelectItem>
                  <SelectItem value="spraying">{contentData.operation_spraying || "Spraying"}</SelectItem>
                  <SelectItem value="tillage">{contentData.operation_tillage || "Tillage"}</SelectItem>
                  <SelectItem value="bush_hog">{contentData.operation_bush_hog || "Bush Hog"}</SelectItem>
                  <SelectItem value="custom">{contentData.operation_custom || "Custom"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Working Width */}
            <div className="space-y-2">
              <Label htmlFor="workingWidth" className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-green-600" />
                {contentData.width_label || "Working Width"}
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
                    <SelectItem value="feet">{contentData.unit_feet || "Feet"}</SelectItem>
                    <SelectItem value="inches">{contentData.unit_inches || "Inches"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500">
                {contentData.width_hint || "Effective working width of your implement"}
              </p>
            </div>

            {/* Ground Speed */}
            <div className="space-y-2">
              <Label htmlFor="speed" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                {contentData.speed_label || "Ground Speed"}
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
                    <SelectItem value="mph">{contentData.unit_mph || "MPH"}</SelectItem>
                    <SelectItem value="kmh">{contentData.unit_kmh || "KM/H"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500">
                {contentData.speed_hint || "Average operating speed"}
              </p>
            </div>

            {/* Efficiency */}
            <div className="space-y-2">
              <Label htmlFor="efficiency" className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-green-600" />
                {contentData.efficiency_label || "Field Efficiency (%)"}
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
                {contentData.efficiency_hint || "Typical: Mowing 70-85%, Planting 65-80%, Spraying 75-90%, Tillage 70-85%"}
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
                {contentData.calculate_button || "Calculate"}
              </Button>
              <Button onClick={resetCalculator} variant="outline">
                {contentData.reset_button || "Reset"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div ref={resultsRef}>
          {results && (
            <Card className="shadow-2xl border-2 border-green-100">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b px-8 py-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-6 w-6" />
                  {contentData.results_title || "Productivity Results"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {contentData.results_description || "Your field coverage estimates"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      {contentData.result_acres_per_hour_label || "Acres Per Hour"}
                    </p>
                    <p className="text-5xl font-bold text-green-600">
                      {results.acresPerHour}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {contentData.result_acres_unit || "acres/hour"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      {contentData.result_acres_per_day_label || "Acres Per 8-Hour Day"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.acresPerDay}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      {contentData.result_hours_100_label || "Hours for 100 Acres"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.hoursFor100Acres}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      {contentData.result_hours_1000_label || "Hours for 1,000 Acres"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.hoursFor1000Acres}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      {contentData.result_efficiency_label || "Field Efficiency"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.efficiency}%
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    {contentData.calculation_details_title || "Calculation Details"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {contentData.detail_working_width || "Working Width:"}
                      </span>
                      <span className="font-medium text-gray-900">
                        {results.workingWidthFt} ft
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {contentData.detail_speed || "Ground Speed:"}
                      </span>
                      <span className="font-medium text-gray-900">
                        {results.speedMph} mph
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {contentData.detail_formula || "Formula Used:"}
                      </span>
                      <span className="font-medium text-gray-900 text-xs">
                        (W × S × E) ÷ 8.25
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>{contentData.note_title || "Note:"}</strong> {contentData.note_text || "These are estimates. Actual field performance may vary based on terrain, operator skill, and field conditions."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-16 space-y-12">
        {/* What Is Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 p-3 rounded-xl">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              What Is an Acres per Hour Calculator?
            </h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              An <strong>acres per hour calculator</strong> (also called an <strong>acre per hour calculator</strong> or <strong>acres an hour calculator</strong>) is a planning and productivity tool used in agriculture, land management, and property maintenance. It helps estimate how much land can be covered in a given time, allowing operators to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>Plan labor and fuel needs</li>
              <li>Compare equipment performance</li>
              <li>Estimate job completion times</li>
              <li>Price custom work accurately</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Whether you're running a tractor, sprayer, planter, or bush hog, calculating acres per hour gives you a realistic picture of field productivity.
            </p>
          </div>
        </section>

        {/* Formula Section with Image */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Acres Per Hour Formula
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-green-100 p-6 rounded-xl border-2 border-green-500 mb-6">
                <p className="text-xl font-mono text-center text-gray-900">
                  Acres per Hour = (Width × Speed × Efficiency) ÷ 8.25
                </p>
              </div>
              <div className="space-y-4 text-gray-700">
                <p className="font-semibold text-lg text-gray-900">Why 8.25?</p>
                <ul className="space-y-2 pl-5 list-disc">
                  <li>1 mile per hour = 5,280 feet per hour</li>
                  <li>1 acre = 43,560 square feet</li>
                  <li>43,560 ÷ 5,280 ≈ 8.25</li>
                </ul>
                <p className="mt-4">
                  This constant converts feet and miles into acres accurately.
                </p>
              </div>
            </div>
            <div className="relative h-64 lg:h-80">
              <Image
                src="/images/how-to-calculate-acres-per-hour.png"
                alt="How to Calculate Acres Per Hour"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Key Factors Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Key Factors That Affect Acres per Hour
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Working Width
              </h3>
              <p className="text-gray-700">
                The effective width of your implement (not just the advertised width). Overlap and missed strips reduce real output.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Ground Speed
              </h3>
              <p className="text-gray-700">
                Higher speeds increase acreage per hour—but only if quality and safety are maintained.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Field Efficiency
              </h3>
              <p className="text-gray-700 mb-3">
                Accounts for turns, headlands, overlap, obstacles, and operator skill.
              </p>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-900">Typical ranges:</p>
                <p className="text-gray-600">• Mowing: 70–85%</p>
                <p className="text-gray-600">• Planting: 65–80%</p>
                <p className="text-gray-600">• Spraying: 75–90%</p>
                <p className="text-gray-600">• Tillage: 70–85%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Operation Types Examples */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Acres per Hour by Operation Type
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mowing Calculator Example
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• 6 ft mower</p>
                <p>• 5 mph</p>
                <p>• 80% efficiency</p>
                <p className="font-bold text-green-600 dark:text-green-400 text-lg mt-3">
                  Result: ~2.9 acres/hour
                </p>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Planting Calculator Example
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• 30 ft planter</p>
                <p>• 6 mph</p>
                <p>• 75% efficiency</p>
                <p className="font-bold text-blue-600 text-lg mt-3">
                  Result: ~16.4 acres/hour
                </p>
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 py-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Spraying Calculator Example
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• 60 ft boom</p>
                <p>• 8 mph</p>
                <p>• 85% efficiency</p>
                <p className="font-bold text-purple-600 text-lg mt-3">
                  Result: ~49.5 acres/hour
                </p>
              </div>
            </div>
            <div className="border-l-4 border-orange-500 pl-6 py-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tillage Calculator Example
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• 12 ft disk</p>
                <p>• 5 mph</p>
                <p>• 80% efficiency</p>
                <p className="font-bold text-orange-600 text-lg mt-3">
                  Result: ~5.8 acres/hour
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Manual Calculation Steps with Image */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How to Calculate Acres per Hour Manually
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 lg:h-80">
              <Image
                src="/images/how-to-calculate-acres-per-hour-manually.png"
                alt="Calculate Acres Per Hour Manually"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <p className="text-gray-700">
                  <strong>Measure actual working width</strong> (feet) – Use the effective width, not rated width
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <p className="text-gray-700">
                  <strong>Determine average operating speed</strong> (mph) – Not maximum, but realistic average
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <p className="text-gray-700">
                  <strong>Estimate realistic field efficiency</strong> (%) – Consider field conditions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <p className="text-gray-700">
                  <strong>Plug values into the formula</strong> and divide by 8.25
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <p className="text-gray-700">
                  <strong>Adjust for terrain, operator skill, and conditions</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-3">
            {[
              "Using rated width instead of effective width",
              "Ignoring overlap",
              "Overestimating field efficiency",
              "Using maximum speed instead of average speed",
              "Forgetting headlands and turns"
            ].map((mistake, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <span className="text-red-600 font-bold">❌</span>
                <p className="text-gray-700">{mistake}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-700 font-semibold">
            💡 A realistic acres per hour calculator estimate is better than an optimistic one.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-xl">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How accurate is an acres per hour calculator?",
                a: "When realistic field efficiency is used, estimates are usually within 5–15% of real-world results."
              },
              {
                q: "What's the best field efficiency to use?",
                a: "Small irregular fields: 65–70%. Large open fields: 80–90%. The efficiency depends on field shape, obstacles, and operator experience."
              },
              {
                q: "Can one calculator work for all equipment?",
                a: "Yes. The same acres per hour formula applies to mowing, planting, spraying, and tillage—only the inputs change."
              },
              {
                q: "Is acres per hour the same as acres covered per hour?",
                a: "Yes. Acres covered per hour calculator is simply another name for the same concept."
              },
              {
                q: "Why does mowing have lower efficiency?",
                a: "Frequent turns, obstacles, and overlap reduce productivity compared to spraying or planting."
              },
              {
                q: "What is the formula for acres per hour?",
                a: "Acres per Hour = (Width × Speed × Efficiency) ÷ 8.25, where width is in feet, speed is in mph, and efficiency is a decimal (e.g., 0.75 for 75%)."
              },
              {
                q: "How do I calculate acres per hour for mowing?",
                a: "Use your mower's working width in feet, your average ground speed in mph, and a field efficiency of 70-85% in the formula: (Width × Speed × Efficiency) ÷ 8.25."
              },
              {
                q: "What efficiency should I use for planting?",
                a: "Planting typically has 65-80% efficiency depending on field size, shape, and conditions. Use 70% as a conservative estimate."
              },
              {
                q: "How many acres can a 60-foot sprayer cover per hour?",
                a: "At 8 mph with 85% efficiency: (60 × 8 × 0.85) ÷ 8.25 = approximately 49.5 acres per hour."
              },
              {
                q: "Why is 8.25 used in the acres per hour formula?",
                a: "8.25 is a conversion constant. It comes from dividing 43,560 (square feet per acre) by 5,280 (feet per mile per hour), which equals approximately 8.25."
              },
              {
                q: "How do I convert working width from inches to feet?",
                a: "Divide the width in inches by 12. For example, a 72-inch mower is 6 feet (72 ÷ 12 = 6)."
              },
              {
                q: "What's the difference between rated width and effective width?",
                a: "Rated width is the manufacturer's specified width. Effective width accounts for overlap and is typically 5-10% less than rated width."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="p-5 bg-white">
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Rating and Profile Section */}
      <RatingProfileSection
        entityId="acres-per-hour-calculator"
        entityType="calculator"
        creatorSlug="aiden-asher"
        initialRatingTotal={0}
        initialRatingCount={0}
      />
      <SimilarCalculators calculators={[{
        calculatorName: "Height Calculator",
        calculatorHref: "/height-calculator",
        calculatorDescription: "Convert height between different units such as centimeters, meters, feet, and inches for medical, fitness, and general use"
      },
      ]}
        color="purple"
        title="Related Other Calculators" />
    </div>
  );
}
