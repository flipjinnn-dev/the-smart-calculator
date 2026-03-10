"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap, Car, Bike, Gauge } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";

interface ContentData {
  calculatorTitle: string;
  calculatorDescription: string;
  powerOutputLabel: string;
  weightLabel: string;
  powerUnitLabel: string;
  weightUnitLabel: string;
  vehicleTypeLabel: string;
  calculateButton: string;
  exampleButton: string;
  resetButton: string;
  resultsTitle: string;
  noResultsYet: string;
}

interface CalculationResult {
  powerToWeightRatio: number;
  powerUnit: string;
  weightUnit: string;
  ratioUnit: string;
  alternativeRatios: {
    hpPerLb: number;
    kwPerKg: number;
    wPerKg: number;
    hpPerTon: number;
  };
}

const defaultContent: ContentData = {
  calculatorTitle: "Power-to-Weight Ratio Calculator",
  calculatorDescription: "Calculate acceleration & efficiency of cars, bikes, F1 cars, or cyclists",
  powerOutputLabel: "Power Output",
  weightLabel: "Weight / Mass",
  powerUnitLabel: "Power Unit",
  weightUnitLabel: "Weight Unit",
  vehicleTypeLabel: "Vehicle Type (Optional)",
  calculateButton: "Calculate Ratio",
  exampleButton: "Try Example",
  resetButton: "Reset",
  resultsTitle: "Power-to-Weight Ratio",
  noResultsYet: "Enter power and weight to calculate ratio"
};

export default function PowerToWeightRatioCalculatorClient({
  content
}: {
  content?: ContentData | null;
}) {
  const contentData = content || defaultContent;

  const [powerOutput, setPowerOutput] = useState<string>("290");
  const [weight, setWeight] = useState<string>("4069");
  const [powerUnit, setPowerUnit] = useState<string>("hp");
  const [weightUnit, setWeightUnit] = useState<string>("lb");
  const [vehicleType, setVehicleType] = useState<string>("car");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const convertPowerToHp = (power: number, unit: string): number => {
    switch(unit) {
      case "hp": return power;
      case "kW": return power * 1.34102;
      case "W": return power * 0.00134102;
      default: return power;
    }
  };

  const convertPowerToKw = (power: number, unit: string): number => {
    switch(unit) {
      case "hp": return power * 0.746;
      case "kW": return power;
      case "W": return power * 0.001;
      default: return power;
    }
  };

  const convertWeightToLb = (w: number, unit: string): number => {
    switch(unit) {
      case "lb": return w;
      case "kg": return w * 2.20462;
      case "ton": return w * 2204.62;
      default: return w;
    }
  };

  const convertWeightToKg = (w: number, unit: string): number => {
    switch(unit) {
      case "lb": return w * 0.453592;
      case "kg": return w;
      case "ton": return w * 1000;
      default: return w;
    }
  };

  const calculateRatio = () => {
    setError("");
    
    const power = parseFloat(powerOutput);
    const mass = parseFloat(weight);

    if (isNaN(power) || power <= 0) {
      setError("Please enter a valid power output (greater than 0)");
      return;
    }

    if (isNaN(mass) || mass <= 0) {
      setError("Please enter a valid weight/mass (greater than 0)");
      return;
    }

    // Calculate primary ratio
    const primaryRatio = power / mass;

    // Convert to all common units for comparison
    const powerInHp = convertPowerToHp(power, powerUnit);
    const powerInKw = convertPowerToKw(power, powerUnit);
    const powerInW = powerInKw * 1000;
    const weightInLb = convertWeightToLb(mass, weightUnit);
    const weightInKg = convertWeightToKg(mass, weightUnit);
    const weightInTon = weightInKg / 1000;

    const calculationResult: CalculationResult = {
      powerToWeightRatio: primaryRatio,
      powerUnit,
      weightUnit,
      ratioUnit: `${powerUnit}/${weightUnit}`,
      alternativeRatios: {
        hpPerLb: powerInHp / weightInLb,
        kwPerKg: powerInKw / weightInKg,
        wPerKg: powerInW / weightInKg,
        hpPerTon: powerInHp / weightInTon
      }
    };

    setResult(calculationResult);
    setShowResult(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const runExample = () => {
    setPowerOutput("290");
    setWeight("4069");
    setPowerUnit("hp");
    setWeightUnit("lb");
    setVehicleType("car");
    setError("");
  };

  const resetCalculator = () => {
    setPowerOutput("");
    setWeight("");
    setPowerUnit("hp");
    setWeightUnit("lb");
    setVehicleType("car");
    setResult(null);
    setError("");
    setShowResult(false);
  };

  const formatNumber = (num: number, decimals: number = 4): string => {
    return num.toFixed(decimals);
  };

  const getPerformanceCategory = (hpPerLb: number): { category: string; color: string; description: string } => {
    if (hpPerLb >= 0.15) return { category: "Supercar", color: "text-purple-700", description: "Exceptional acceleration" };
    if (hpPerLb >= 0.10) return { category: "High Performance", color: "text-blue-700", description: "Very fast acceleration" };
    if (hpPerLb >= 0.06) return { category: "Performance", color: "text-green-700", description: "Good acceleration" };
    if (hpPerLb >= 0.04) return { category: "Standard", color: "text-yellow-700", description: "Moderate acceleration" };
    return { category: "Economy", color: "text-gray-700", description: "Basic acceleration" };
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {contentData.calculatorTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {contentData.calculatorDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-2xl pt-0 border-0 bg-white/80 backdrop-blur">
                <CardHeader className="py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-xl">
                  <CardTitle className="flex items-center text-2xl">
                    <Calculator className="mr-3 h-6 w-6" />
                    Input Parameters
                  </CardTitle>
                  <CardDescription className="text-indigo-50">
                    Enter power output and weight to calculate the ratio
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType" className="text-base font-semibold text-gray-700">
                        {contentData.vehicleTypeLabel}
                      </Label>
                      <Select value={vehicleType} onValueChange={setVehicleType}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-200 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car / Pickup Truck</SelectItem>
                          <SelectItem value="motorcycle">Motorcycle / Motorbike</SelectItem>
                          <SelectItem value="f1">F1 Car</SelectItem>
                          <SelectItem value="cyclist">Cyclist</SelectItem>
                          <SelectItem value="supercar">Supercar</SelectItem>
                          <SelectItem value="train">Train / Ship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="powerOutput" className="text-base font-semibold text-gray-700">
                        {contentData.powerOutputLabel}
                      </Label>
                      <Input 
                        className="w-full h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-200 shadow-sm" 
                        type="number" 
                        value={powerOutput} 
                        onChange={e => setPowerOutput(e.target.value)} 
                        placeholder="290" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="powerUnit" className="text-base font-semibold text-gray-700">
                        {contentData.powerUnitLabel}
                      </Label>
                      <Select value={powerUnit} onValueChange={setPowerUnit}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-200 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hp">Horsepower (hp)</SelectItem>
                          <SelectItem value="kW">Kilowatts (kW)</SelectItem>
                          <SelectItem value="W">Watts (W)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-base font-semibold text-gray-700">
                        {contentData.weightLabel}
                      </Label>
                      <Input 
                        className="w-full h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-200 shadow-sm" 
                        type="number" 
                        value={weight} 
                        onChange={e => setWeight(e.target.value)} 
                        placeholder="4069" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weightUnit" className="text-base font-semibold text-gray-700">
                        {contentData.weightUnitLabel}
                      </Label>
                      <Select value={weightUnit} onValueChange={setWeightUnit}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-indigo-400 focus:ring-indigo-200 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lb">Pounds (lb)</SelectItem>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="ton">Tons (ton)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-sm text-gray-700">
                      <strong>Formula:</strong>
                      <br />Power-to-Weight Ratio = Power Output ÷ Weight or Mass
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      onClick={calculateRatio}
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      {contentData.calculateButton}
                    </Button>
                    <Button 
                      onClick={runExample}
                      variant="outline"
                      className="h-12 text-base font-semibold border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all duration-200"
                    >
                      {contentData.exampleButton}
                    </Button>
                    <Button 
                      onClick={resetCalculator}
                      variant="outline"
                      className="h-12 text-base font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                    >
                      {contentData.resetButton}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showResult && result && (
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white/80 backdrop-blur mt-8">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-xl">
                    <CardTitle className="flex items-center text-2xl">
                      <Gauge className="mr-3 h-6 w-6" />
                      Power-to-Weight Ratio Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 mb-6">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Primary Ratio</h3>
                        <p className="text-5xl font-bold text-indigo-700 mb-2">
                          {formatNumber(result.powerToWeightRatio)}
                        </p>
                        <p className="text-xl text-gray-600">{result.ratioUnit}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center mb-2">
                          <Car className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold text-blue-900">hp/lb</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-700">{formatNumber(result.alternativeRatios.hpPerLb)}</p>
                        <p className="text-sm text-blue-600 mt-1">Horsepower per pound</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                        <div className="flex items-center mb-2">
                          <Zap className="w-5 h-5 text-purple-600 mr-2" />
                          <h3 className="font-semibold text-purple-900">kW/kg</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-700">{formatNumber(result.alternativeRatios.kwPerKg)}</p>
                        <p className="text-sm text-purple-600 mt-1">Kilowatts per kilogram</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                        <div className="flex items-center mb-2">
                          <Bike className="w-5 h-5 text-green-600 mr-2" />
                          <h3 className="font-semibold text-green-900">W/kg</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-700">{formatNumber(result.alternativeRatios.wPerKg, 2)}</p>
                        <p className="text-sm text-green-600 mt-1">Watts per kilogram</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
                        <div className="flex items-center mb-2">
                          <Gauge className="w-5 h-5 text-orange-600 mr-2" />
                          <h3 className="font-semibold text-orange-900">hp/ton</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-700">{formatNumber(result.alternativeRatios.hpPerTon, 2)}</p>
                        <p className="text-sm text-orange-600 mt-1">Horsepower per ton</p>
                      </div>
                    </div>

                    {vehicleType === "car" && (
                      <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-3 text-lg">Performance Category</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-2xl font-bold ${getPerformanceCategory(result.alternativeRatios.hpPerLb).color}`}>
                              {getPerformanceCategory(result.alternativeRatios.hpPerLb).category}
                            </p>
                            <p className="text-gray-600 mt-1">
                              {getPerformanceCategory(result.alternativeRatios.hpPerLb).description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="hidden lg:block">
              <Card className="shadow-2xl pt-0 border-0 bg-gradient-to-br from-indigo-50 to-purple-100 h-[50%] flex flex-col justify-center items-center p-8 sticky top-24">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-indigo-700 tracking-tight">{contentData.resultsTitle}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? (
                    <div className="text-center w-full space-y-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-indigo-800 mb-2">Primary Ratio</h3>
                        <div className="text-3xl font-bold text-indigo-900">
                          {formatNumber(result.powerToWeightRatio)}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{result.ratioUnit}</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-indigo-800 mb-2">hp/lb</h3>
                        <div className="text-2xl font-bold text-indigo-900">
                          {formatNumber(result.alternativeRatios.hpPerLb)}
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-indigo-800 mb-2">W/kg</h3>
                        <div className="text-2xl font-bold text-indigo-900">
                          {formatNumber(result.alternativeRatios.wPerKg, 2)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Gauge className="w-8 h-8 text-indigo-300 mb-2" />
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
                <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">Power-to-Weight Ratio Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-0">
                  Our <strong>Power-to-Weight Ratio Calculator</strong> allows you to instantly measure the efficiency and acceleration potential of any vehicle or human-powered activity. By dividing a vehicle's power output by its weight or mass, you can compare cars, motorbikes, supercars, trains, ships, or even bicycles on a level playing field. Higher power-to-weight ratios indicate faster acceleration and better performance. Use our calculator to explore car power-to-weight, cycling power-to-weight, and even F1 car power-to-weight metrics with ease.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">What is Power-to-Weight Ratio?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The <strong>Power-to-Weight Ratio (PWR)</strong> is a key metric that measures how much power a vehicle or athlete produces per unit of weight. Unlike absolute power, which only tells how strong an engine is, PWR accounts for vehicle mass, enabling fair comparisons across lightweight motorbikes, pickup trucks, supercars, and even spacecraft.
              </p>

              <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Formula:</h3>
                <div className="font-mono text-lg text-center bg-white p-4 rounded">
                  Power-to-Weight Ratio = Power Output (hp or kW) ÷ Weight or Mass (lb or kg)
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Units commonly used:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>hp/lb (horsepower per pound)</li>
                <li>kW/kg (kilowatt per kilogram)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Why It Matters</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                A car with high horsepower but also heavy weight may accelerate slower than a lighter vehicle with lower horsepower. The power-to-weight ratio accounts for this difference, helping enthusiasts and engineers predict acceleration, efficiency, and overall performance.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-gray-900 font-semibold mb-3">For example:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-700 mb-1"><strong>Ford F-series pickup truck:</strong> 290 hp, 4,069 lb → 0.071 hp/lb</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-1"><strong>Ford Fiesta:</strong> 89 hp, 2,546 lb → 0.035 hp/lb</p>
                  </div>
                  <p className="text-gray-700 mt-3">
                    Even though the Fiesta has enough power for city driving, the pickup accelerates almost twice as fast in theory.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">How to Use the Power-to-Weight Ratio Calculator</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Using our <strong>Power-to-Weight Ratio Calculator</strong> is simple and intuitive:
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Enter Vehicle or Athlete Power Output</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Cars: horsepower (hp) or kilowatts (kW)</li>
                    <li>Cyclists: watts (W)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Enter Vehicle Weight or Athlete Mass</h3>
                  <p className="text-gray-700 mb-0">Cars, trucks, motorbikes, ships, or bicycles in pounds (lb) or kilograms (kg)</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Click Calculate</h3>
                  <p className="text-gray-700 mb-0">Instantly get your power-to-weight ratio in preferred units</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
                <p className="text-gray-700">
                  <strong>Tip:</strong> Use curb weight for cars (vehicle weight without passengers or cargo) to get the most accurate comparison.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Understanding Vehicle Power-to-Weight Ratios</h2>
              
              <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
                <img 
                  src="/images/power-to-vehicle-ratio.png" 
                  alt="Power-to-Weight Ratio comparison across different vehicle types"
                  className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                />
                <p className="text-center text-gray-600 mt-4 text-sm">
                  <strong>Vehicle Performance Comparison:</strong> Different vehicle types have varying power-to-weight ratios affecting their acceleration and efficiency.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Cars and Pickup Trucks</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                High-performance cars and trucks vary significantly in PWR:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Supercars: Lightweight with high engine output → high PWR</li>
                <li>Pickup trucks and SUVs: Heavier but powerful → moderate PWR</li>
                <li>Compact cars: Low weight but smaller engines → lower PWR</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Motorcycles and Motorbikes</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Motorbikes often outperform cars in acceleration despite lower engine power due to extremely low weight, giving them exceptionally high PWR.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Trains, Ships, and Dumper Trucks</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                While vehicles like trains or ships have massive engines, their enormous weight reduces PWR. Use the calculator to compare different transport modes for theoretical acceleration or efficiency analysis.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Bicycles and Human Power</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cyclists can also calculate their <strong>cycling power-to-weight ratio</strong>:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Measure your power output in watts</li>
                <li>Divide by your body weight in kilograms</li>
                <li>Higher PWR indicates better climbing and sprinting performance</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Step-by-Step: Calculating Power-to-Weight Ratio</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Find the Power Output</h3>
                  <p className="text-gray-700">Check your vehicle's specifications or measure your own output (cyclists) using a power meter.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Determine the Weight or Mass</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Cars: curb weight from manual or official sources</li>
                    <li>Motorcycles: manufacturer's weight</li>
                    <li>Cyclists: body mass in kg</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Use the Formula</h3>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                    PWR = Power (hp or W) ÷ Weight (lb or kg)
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Convert Units (if needed)</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>1 hp = 0.746 kW</li>
                    <li>1 lb = 0.4536 kg</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Compare and Analyze</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Higher PWR → faster acceleration potential</li>
                    <li>Lower PWR → slower acceleration but may have other benefits (stability, cargo capacity)</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Worked Examples</h2>

              <div className="space-y-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 1: Pickup Truck vs Small Car</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-900 font-semibold">Ford F-series pickup: 290 hp, 4,069 lb</p>
                      <div className="bg-white p-3 rounded mt-2 font-mono text-sm">
                        290 ÷ 4069 = 0.071 hp/lb
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">Ford Fiesta: 89 hp, 2,546 lb</p>
                      <div className="bg-white p-3 rounded mt-2 font-mono text-sm">
                        89 ÷ 2546 = 0.035 hp/lb
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3">
                      <strong>Observation:</strong> Pickup truck has double the PWR → accelerates faster in theory.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 2: Cycling Power-to-Weight</h3>
                  <div className="space-y-3">
                    <p className="text-gray-900 font-semibold">Cyclist produces 300 W and weighs 70 kg</p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      300 ÷ 70 = 4.29 W/kg
                    </div>
                    <p className="text-gray-700 mt-3">
                      <strong>Observation:</strong> This PWR indicates strong climbing potential.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 3: F1 Car</h3>
                  <div className="space-y-3">
                    <p className="text-gray-900 font-semibold">Minimum weight: 798 kg, Power: 772 kW</p>
                    <div className="bg-white p-3 rounded font-mono text-sm">
                      772 ÷ 798 = 0.967 kW/kg ≈ 1297 hp/t
                    </div>
                    <p className="text-gray-700 mt-3">
                      <strong>Observation:</strong> Extremely high PWR → unmatched acceleration and speed.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Units and Measurement Guide</h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Units</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Power</td>
                      <td className="border border-gray-300 px-4 py-2">hp, kW, W</td>
                      <td className="border border-gray-300 px-4 py-2">Cars, motorcycles, cycling, rowing</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Weight / Mass</td>
                      <td className="border border-gray-300 px-4 py-2">lb, kg</td>
                      <td className="border border-gray-300 px-4 py-2">Use mass for consistency across planets or vehicle types</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Ratio</td>
                      <td className="border border-gray-300 px-4 py-2">hp/lb, kW/kg</td>
                      <td className="border border-gray-300 px-4 py-2">Choose consistent units for comparisons</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
                <p className="text-gray-700">
                  <strong>Experience Tip:</strong> Always use the same units when comparing vehicles, e.g., don't mix lb and kg.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Factors Affecting Power-to-Weight Ratio</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While PWR is crucial for acceleration prediction, real-world performance also depends on:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Aerodynamic drag</strong> – affects high-speed acceleration</li>
                <li><strong>Rolling resistance</strong> – depends on tires and road surface</li>
                <li><strong>Transmission efficiency</strong> – power loss in gearboxes</li>
                <li><strong>Vehicle payload</strong> – additional weight reduces effective PWR</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Power-to-Weight Ratio Across Vehicles</h2>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Vehicle Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Power-to-Weight Trend</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Supercars</td>
                      <td className="border border-gray-300 px-4 py-2">Very high</td>
                      <td className="border border-gray-300 px-4 py-2">Lightweight, high engine output</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Pickup Trucks</td>
                      <td className="border border-gray-300 px-4 py-2">Moderate</td>
                      <td className="border border-gray-300 px-4 py-2">Heavyweight, strong engine</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Motorcycles</td>
                      <td className="border border-gray-300 px-4 py-2">High</td>
                      <td className="border border-gray-300 px-4 py-2">Lightweight, moderate engine output</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Trains / Ships</td>
                      <td className="border border-gray-300 px-4 py-2">Low</td>
                      <td className="border border-gray-300 px-4 py-2">Heavyweight, massive engines</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Bicycles</td>
                      <td className="border border-gray-300 px-4 py-2">Low to Moderate</td>
                      <td className="border border-gray-300 px-4 py-2">Human-powered, depends on training</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Spaceships</td>
                      <td className="border border-gray-300 px-4 py-2">Very high</td>
                      <td className="border border-gray-300 px-4 py-2">Light and high thrust-to-weight ratio in orbit</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Power-to-Weight Ratio Calculator for Cycling and Sports</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Cycling:</strong> PWR determines climbing and sprinting efficiency</li>
                <li><strong>Rowing & Weightlifting:</strong> Helps assess muscular power relative to body mass</li>
                <li><strong>Running:</strong> Measure running efficiency in watts per kg</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
                <p className="text-gray-700">
                  <strong>Expert Tip:</strong> Competitive cyclists often aim for &gt; 5 W/kg in short sprints.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">FAQs</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. How to calculate power-to-weight ratio?</h3>
                  <p className="text-gray-700 mb-2">Use the formula:</p>
                  <div className="bg-white p-3 rounded font-mono text-sm mb-2">
                    PWR = Power Output ÷ Weight or Mass
                  </div>
                  <p className="text-gray-700 mb-0">Choose consistent units (hp/lb or kW/kg).</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Is a higher power-to-weight ratio better?</h3>
                  <p className="text-gray-700 mb-0">Yes, a higher PWR indicates better acceleration and speed potential. However, stability and vehicle control should also be considered.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. How to calculate car power-to-weight ratio?</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Find the vehicle's peak power (hp or kW)</li>
                    <li>Determine curb weight (lb or kg)</li>
                    <li>Divide power by weight to get PWR</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. How to calculate power-to-weight ratio for motorcycles?</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Obtain engine power</li>
                    <li>Check motorcycle weight</li>
                    <li>Divide power by weight → higher ratio = faster acceleration</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. How to calculate cycling power-to-weight ratio?</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Measure watts via a power meter</li>
                    <li>Divide by body weight in kg</li>
                    <li>Use PWR to assess climbing/sprinting efficiency</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">6. How to calculate power-to-weight ratio per ton?</h3>
                  <p className="text-gray-700 mb-0">Convert weight into tons (1 ton = 1,000 kg or 2,204 lb), then divide power by total tons.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Experience-Based Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Track PWR Changes</h3>
                  <p className="text-gray-700 mb-0">Add weight (passengers/cargo) to see real-world impact on acceleration.</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare Across Vehicles</h3>
                  <p className="text-gray-700 mb-0">Use PWR instead of raw horsepower to evaluate performance fairly.</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Optimize Cycling Performance</h3>
                  <p className="text-gray-700 mb-0">Train to increase watts while reducing body weight for better PWR.</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Supercars vs Motorbikes</h3>
                  <p className="text-gray-700 mb-0">Motorbikes may outperform in acceleration despite lower engine power due to extreme lightness.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The <strong>Power-to-Weight Ratio Calculator</strong> is an essential tool for comparing vehicle performance across different categories. Whether you're evaluating cars, motorcycles, F1 cars, or even your own cycling performance, understanding PWR helps you make informed decisions about acceleration potential and efficiency. Use this calculator to gain insights into how power and weight interact to determine real-world performance.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SimilarCalculators
              calculators={[
                {
                  calculatorName: "Conservation of Momentum Calculator",
                  calculatorHref: "/physics/conservation-of-momentum-calculator",
                  calculatorDescription: "Calculate momentum conservation in collisions"
                },
                {
                  calculatorName: "Critical Point Calculator",
                  calculatorHref: "/maths/critical-point-calculator",
                  calculatorDescription: "Find critical points of functions"
                },
                {
                  calculatorName: "Inflection Point Calculator",
                  calculatorHref: "/maths/inflection-point-calculator",
                  calculatorDescription: "Calculate inflection points and concavity"
                }
              ]}
              color="purple"
            />
          </div>
        </main>
      </div>
    </>
  );
}
