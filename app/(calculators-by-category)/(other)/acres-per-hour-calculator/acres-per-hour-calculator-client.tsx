"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, Tractor, Gauge, Percent, TrendingUp, Book, HelpCircle, ChevronDown, ChevronUp, Clock, MapPin, Sprout } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
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

export default function AcresPerHourCalculatorClient() {
  
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
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-4 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg">
            <Tractor className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Acres Per Hour Calculator
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Calculate acres per hour for mowing, planting, spraying, or harvesting with efficiency and overlap adjustments. Plan farm work accurately and fast.
        </p>
      </div>

      {/* Introduction Section */}
      <section className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          An acres per hour calculator determines how much land a machine can cover in one hour using this formula:
        </p>
        <div className="bg-white p-6 rounded-xl border-2 border-green-500 mb-4">
          <p className="text-center text-2xl font-semibold text-gray-900">
            Acres per Hour = <span className="text-green-600">(Speed × Width × Efficiency)</span> ÷ 8.25
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-green-600 mb-1">Speed</p>
            <p>miles per hour (mph)</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-green-600 mb-1">Width</p>
            <p>working width of implement (feet)</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-green-600 mb-1">Efficiency</p>
            <p>0.70–0.90 depending on field conditions</p>
          </div>
        </div>
        <p className="text-gray-700 mt-4">
          <strong>8.25</strong> = conversion constant
        </p>
        <p className="text-gray-700 mt-4">
          For mowing, spraying, planting, bush hogging, or combine harvesting, this formula gives accurate real-world coverage estimates.
        </p>
      </section>

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

        {/* Core Formula Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Core Formula Behind Acres Per Hour Calculation
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1️⃣ Theoretical Field Capacity (TFC)</h3>
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-400 mb-4">
                <p className="text-center text-2xl font-semibold text-gray-900">
                  TFC = <span className="text-blue-600">(Speed × Width)</span> ÷ 8.25
                </p>
              </div>
              <p className="text-gray-700">This assumes:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
                <li>No overlap</li>
                <li>No turning loss</li>
                <li>Perfect rectangular field</li>
                <li>No downtime</li>
              </ul>
              <p className="text-gray-700 mt-2"><strong>This is ideal performance only.</strong></p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2️⃣ Effective Field Capacity (EFC)</h3>
              <div className="bg-green-100 p-6 rounded-xl border-2 border-green-500 mb-4">
                <p className="text-center text-2xl font-semibold text-gray-900">
                  EFC = <span className="text-green-600">(Speed × Width × Field Efficiency)</span> ÷ 8.25
                </p>
              </div>
              <p className="text-gray-700 mb-2">Field efficiency accounts for:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Turning time</li>
                <li>Irregular field shape</li>
                <li>Overlapping passes</li>
                <li>Refilling downtime</li>
                <li>Terrain variation</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Typical efficiency range: 70% – 90%</strong></p>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why the Constant 8.25 Is Used</h3>
              <p className="text-gray-700 mb-3">The number 8.25 converts square feet per hour into acres per hour. It comes from:</p>
              <div className="bg-white p-4 rounded-lg mb-3">
                <p className="text-gray-700">• 1 acre = 43,560 square feet</p>
                <p className="text-gray-700">• 1 mile = 5,280 feet</p>
              </div>
              <p className="text-gray-700 mb-2">Mathematically:</p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-center font-mono text-lg text-gray-900">
                  5280 ÷ 43560 ≈ 8.25
                </p>
              </div>
              <p className="text-gray-700 mt-3">Without this constant, conversion would require multiple manual steps.</p>
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

        {/* How to Calculate Section */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How to Calculate Acres Per Hour (Step-by-Step)
          </h2>
          <p className="text-gray-700 mb-6">To calculate how many acres per hour you can cover:</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Measure actual working width (feet)</p>
                <p className="text-gray-600 text-sm">Use the effective width, not rated width</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Determine average operating speed (mph)</p>
                <p className="text-gray-600 text-sm">Not maximum, but realistic average</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Estimate realistic field efficiency (%)</p>
                <p className="text-gray-600 text-sm">Consider field conditions, turns, and obstacles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Plug values into the formula</p>
                <p className="text-gray-600 text-sm">Multiply and divide by 8.25</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-amber-400">
            <h3 className="font-bold text-gray-900 mb-3">Example:</h3>
            <p className="text-gray-700 mb-2">Speed = 5 mph, Width = 6 ft, Efficiency = 80%</p>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-center font-mono text-lg text-gray-900">
                (5 × 6 × 0.80) ÷ 8.25 = 2.91 acres/hour
              </p>
            </div>
          </div>
        </section>

        {/* Time Calculation Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How Long Will It Take to Cover My Field?
          </h2>
          <p className="text-gray-700 mb-4">To calculate time required:</p>
          <div className="bg-white p-6 rounded-xl border-2 border-purple-400 mb-6">
            <p className="text-center text-2xl font-semibold text-gray-900">
              Time = <span className="text-purple-600">Total Area</span> ÷ Acres Per Hour
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-3">Example:</h3>
            <p className="text-gray-700">Field size = 20 acres</p>
            <p className="text-gray-700 mb-3">Machine capacity = 2.91 acres/hour</p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-center font-mono text-lg text-gray-900 mb-2">
                20 ÷ 2.91 = 6.87 hours
              </p>
              <p className="text-center text-gray-600 text-sm">So approximately 6.9 hours needed.</p>
            </div>
          </div>
        </section>

        {/* Equipment-Specific Calculators */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Equipment-Specific Acres Per Hour Calculators
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bush Hog Acres Per Hour Calculator</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Typical speed: 4–6 mph</li>
                <li>• Width: 5–8 ft</li>
                <li>• Efficiency: 75–85%</li>
              </ul>
              <p className="text-gray-700 mt-2">Common for pasture mowing and land clearing.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mowing Acres Per Hour Calculator</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Overlap usually 10%</li>
                <li>• Efficiency slightly lower for irregular lawns</li>
              </ul>
              <p className="text-gray-700 mt-2">Used for:</p>
              <ul className="space-y-1 text-gray-700 pl-4">
                <li>• Residential lawn mowing</li>
                <li>• Estate maintenance</li>
                <li>• Commercial landscape contracts</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acres Per Hour Calculator Spraying</h3>
              <p className="text-gray-700 mb-2">Sprayers have wider booms (20–120 ft).</p>
              <p className="text-gray-700 font-semibold">Typical:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Speed: 6–12 mph</li>
                <li>• Efficiency: 80–90%</li>
              </ul>
              <p className="text-gray-700 mt-2">Spraying covers significantly more acres per hour.</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Combine Acres Per Hour Calculator</h3>
              <p className="text-gray-700 mb-2">Combine harvesters operate slower.</p>
              <p className="text-gray-700 font-semibold">Typical:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Speed: 3–5 mph</li>
                <li>• Header width: 20–40 ft</li>
                <li>• Efficiency: 65–75%</li>
              </ul>
              <p className="text-gray-700 mt-2">Used for wheat, corn, soybean harvesting.</p>
            </div>

            <div className="border-l-4 border-amber-500 pl-6 py-4 bg-amber-50 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acres Per Hour Planting Calculator</h3>
              <p className="text-gray-700">Planting requires precise overlap control.</p>
              <p className="text-gray-700 mt-2">Typical efficiency: 70–85%.</p>
            </div>
          </div>
        </section>

        {/* Quick Estimation Rule */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Quick Estimation Rule (For Fast Bidding)
          </h2>
          <div className="bg-white p-6 rounded-xl border-2 border-indigo-400">
            <p className="text-center text-2xl font-semibold text-gray-900 mb-4">
              1 mph × 10 ft width ≈ 1.21 acres/hour
            </p>
            <p className="text-gray-700 text-center">Useful for quick rough estimates.</p>
          </div>
        </section>

        {/* Factors Section */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Factors That Affect Acres Covered Per Hour
          </h2>
          <p className="text-gray-700 mb-4">Actual results vary due to:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">• Field shape</p>
              <p className="text-gray-600 text-sm">Irregular fields reduce efficiency</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">• Obstacles (trees, poles)</p>
              <p className="text-gray-600 text-sm">More obstacles = more turning</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">• Soil condition</p>
              <p className="text-gray-600 text-sm">Wet or rough terrain slows work</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">• Operator experience</p>
              <p className="text-gray-600 text-sm">Skilled operators work faster</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">• Equipment horsepower</p>
              <p className="text-gray-600 text-sm">Underpowered = slower speeds</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">• Weather</p>
              <p className="text-gray-600 text-sm">Wind, rain affect operations</p>
            </div>
          </div>
          <p className="text-gray-700 mt-6 font-semibold">Large rectangular plots give most accurate results.</p>
        </section>

        {/* Why Use Section */}
        <section className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use an Acres Per Hour Calculator?
          </h2>
          <p className="text-gray-700 mb-4">A professional farm equipment acres per hour calculator helps:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <p className="text-gray-700">Estimate fuel usage</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <p className="text-gray-700">Plan labor requirements</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <p className="text-gray-700">Calculate contract pricing</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <p className="text-gray-700">Compare machinery productivity</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <p className="text-gray-700">Improve operational efficiency</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <p className="text-gray-700">Support precision agriculture</p>
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

        {/* Final Summary */}
        <section className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Final Summary
          </h2>
          <p className="text-gray-700 mb-4">
            The <strong>Acres Per Hour Calculator</strong> estimates how much land a machine can cover in one hour using:
          </p>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-400 mb-6">
            <p className="text-center text-2xl font-semibold text-gray-900">
              Acres per Hour = <span className="text-gray-700">(Speed × Width × Efficiency)</span> ÷ 8.25
            </p>
          </div>
          <p className="text-gray-700 mb-4">
            Including <strong>overlap adjustment</strong> and realistic efficiency helps farmers and contractors:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-700">Plan productivity</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-700">Estimate fuel & labor costs</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-700">Bid contracts accurately</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-700">Optimize farm operations</p>
            </div>
          </div>
          <p className="text-gray-700 mt-6 font-semibold">
            A simple yet essential tool for modern agriculture and lawn management.
          </p>
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
