"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, AlertCircle, Info, Droplet } from "lucide-react";

interface CalculationResult {
  surfaceType: string;
  squareFootage: number;
  location: string;
  dirtLevel: string;
  costPerSqFt: number;
  baseCost: number;
  dirtMultiplier: number;
  finalCost: number;
  minCost: number;
  maxCost: number;
}

const SURFACE_TYPES = {
  driveway: { name: "Concrete Driveway", minRate: 0.08, maxRate: 0.18 },
  siding: { name: "House Siding", minRate: 0.10, maxRate: 0.25 },
  deck: { name: "Wood Deck", minRate: 0.15, maxRate: 0.30 },
  roof: { name: "Roof (Soft Wash)", minRate: 0.20, maxRate: 0.35 },
  sidewalk: { name: "Sidewalk", minRate: 0.10, maxRate: 0.20 },
  parking: { name: "Parking Lot", minRate: 0.06, maxRate: 0.15 },
  commercial: { name: "Commercial Building", minRate: 0.10, maxRate: 0.25 },
  patio: { name: "Patio", minRate: 0.10, maxRate: 0.22 }
};

const LOCATION_MULTIPLIERS = {
  northeast: { name: "Northeast (NY, MA, NJ)", multiplier: 1.2 },
  southeast: { name: "Southeast (FL, TX, GA)", multiplier: 0.9 },
  midwest: { name: "Midwest (IL, OH, MI)", multiplier: 1.0 },
  west: { name: "West (CA, WA, AZ)", multiplier: 1.15 },
  southwest: { name: "Southwest (AZ, NM, NV)", multiplier: 1.0 },
  other: { name: "Other U.S. Location", multiplier: 1.0 }
};

const DIRT_LEVELS = {
  light: { name: "Light Dirt - Standard Cleaning", multiplier: 1.0 },
  moderate: { name: "Moderate Buildup", multiplier: 1.2 },
  heavy: { name: "Heavy Stains (Oil, Mold, Algae)", multiplier: 1.4 }
};

export default function PressureWashingEstimateCalculator() {
  const [surfaceType, setSurfaceType] = useState<string>("driveway");
  const [squareFootage, setSquareFootage] = useState<string>("");
  const [location, setLocation] = useState<string>("other");
  const [dirtLevel, setDirtLevel] = useState<string>("light");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const sqft = parseFloat(squareFootage);

    if (!sqft || sqft <= 0) {
      alert("Please enter a valid square footage");
      return;
    }

    const surface = SURFACE_TYPES[surfaceType as keyof typeof SURFACE_TYPES];
    const locationData = LOCATION_MULTIPLIERS[location as keyof typeof LOCATION_MULTIPLIERS];
    const dirtData = DIRT_LEVELS[dirtLevel as keyof typeof DIRT_LEVELS];

    const baseMinRate = surface.minRate * locationData.multiplier;
    const baseMaxRate = surface.maxRate * locationData.multiplier;
    const avgRate = (baseMinRate + baseMaxRate) / 2;

    const baseCost = sqft * avgRate;
    const finalCost = baseCost * dirtData.multiplier;
    const minCost = sqft * baseMinRate * dirtData.multiplier;
    const maxCost = sqft * baseMaxRate * dirtData.multiplier;

    setResult({
      surfaceType: surface.name,
      squareFootage: sqft,
      location: locationData.name,
      dirtLevel: dirtData.name,
      costPerSqFt: avgRate,
      baseCost,
      dirtMultiplier: dirtData.multiplier,
      finalCost,
      minCost,
      maxCost
    });
  };

  const handleReset = () => {
    setSurfaceType("driveway");
    setSquareFootage("");
    setLocation("other");
    setDirtLevel("light");
    setResult(null);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="shadow-2xl border-0">
        <div className="h-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800"></div>
        <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <h1 className="text-3xl font-bold flex items-center text-gray-900">
            <Droplet className="w-8 h-8 mr-3 text-blue-600" />
            Pressure Washing Estimate Calculator
          </h1>
          <CardDescription className="text-lg">
            Get instant pressure washing cost estimates based on real contractor pricing data across the U.S.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="surfaceType" className="text-base font-semibold">
                Step 1: Select Surface Type
              </Label>
              <Select value={surfaceType} onValueChange={setSurfaceType}>
                <SelectTrigger id="surfaceType" className="h-12 text-base">
                  <SelectValue placeholder="Select surface type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SURFACE_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="squareFootage" className="text-base font-semibold">
                Step 2: Enter Square Footage
              </Label>
              <Input
                id="squareFootage"
                type="number"
                placeholder="e.g., 500"
                value={squareFootage}
                onChange={(e) => setSquareFootage(e.target.value)}
                className="h-12 text-base"
                min="1"
              />
              <p className="text-sm text-gray-500">Measure: Length × Width</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-semibold">
                Step 3: Choose Your Location
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="h-12 text-base">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(LOCATION_MULTIPLIERS).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dirtLevel" className="text-base font-semibold">
                Step 4: Select Dirt Level
              </Label>
              <Select value={dirtLevel} onValueChange={setDirtLevel}>
                <SelectTrigger id="dirtLevel" className="h-12 text-base">
                  <SelectValue placeholder="Select dirt level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DIRT_LEVELS).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button
              onClick={handleCalculate}
              className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Estimate
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-14 px-8 text-lg font-semibold"
            >
              Reset
            </Button>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border-2 border-green-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Your Estimate</h3>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Estimated Cost</p>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(result.finalCost)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Minimum Cost</p>
                    <p className="text-2xl font-bold text-gray-700">
                      {formatCurrency(result.minCost)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Maximum Cost</p>
                    <p className="text-2xl font-bold text-gray-700">
                      {formatCurrency(result.maxCost)}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-4 text-gray-900">Calculation Breakdown</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Surface Type:</span>
                      <span className="font-semibold text-gray-900">{result.surfaceType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Square Footage:</span>
                      <span className="font-semibold text-gray-900">{result.squareFootage.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold text-gray-900">{result.location}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Dirt Level:</span>
                      <span className="font-semibold text-gray-900">{result.dirtLevel}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Average Rate per Sq Ft:</span>
                      <span className="font-semibold text-gray-900">${result.costPerSqFt.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Dirt Level Multiplier:</span>
                      <span className="font-semibold text-gray-900">{result.dirtMultiplier}x</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">About This Estimate</h4>
                    <p className="text-sm text-blue-800">
                      This estimate is based on real contractor pricing data across the United States. 
                      Actual costs may vary based on accessibility, additional services, and specific contractor rates. 
                      Always request written quotes from multiple contractors before making a decision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Important Notes</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Accurate measurements ensure accurate estimates</li>
                  <li>Heavy stains (oil, mold, algae) increase costs by 30-50%</li>
                  <li>Most contractors have minimum service fees ($75-$150)</li>
                  <li>Hard-to-reach areas may incur additional charges</li>
                  <li>Add-on services (sealing, staining) cost extra</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
