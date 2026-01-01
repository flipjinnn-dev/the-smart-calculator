"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, Truck, DollarSign, MapPin, Clock, Wrench } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface TowingResults {
  totalCost: number;
  baseCost: number;
  distanceCost: number;
  locationMultiplier: number;
  timeMultiplier: number;
  additionalServicesCost: number;
  breakdown: {
    label: string;
    value: number;
  }[];
}


interface TowingEstimateCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function TowingEstimateCalculatorClient({ content, guideContent }: TowingEstimateCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const [vehicleType, setVehicleType] = useState("");
  const [towingMethod, setTowingMethod] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [locationType, setLocationType] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [additionalServices, setAdditionalServices] = useState({
    winching: false,
    roadside: false,
    storage: false,
    tolls: false,
    environmental: false
  });
  const [results, setResults] = useState<TowingResults | null>(null);
  const [error, setError] = useState("");

  const scrollToResults = useMobileScroll();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Base rates by vehicle type and towing method
  const getBaseCost = (vehicle: string, method: string): number => {
    const baseCosts: { [key: string]: { [key: string]: number } } = {
      "sedan": { "flatbed": 75, "wheel_lift": 50, "hook_chain": 45, "heavy_duty": 0, "motorcycle": 0 },
      "suv": { "flatbed": 95, "wheel_lift": 65, "hook_chain": 60, "heavy_duty": 0, "motorcycle": 0 },
      "pickup": { "flatbed": 100, "wheel_lift": 70, "hook_chain": 65, "heavy_duty": 150, "motorcycle": 0 },
      "luxury": { "flatbed": 125, "wheel_lift": 0, "hook_chain": 0, "heavy_duty": 0, "motorcycle": 0 },
      "motorcycle": { "flatbed": 60, "wheel_lift": 0, "hook_chain": 0, "heavy_duty": 0, "motorcycle": 45 },
      "van": { "flatbed": 90, "wheel_lift": 65, "hook_chain": 60, "heavy_duty": 0, "motorcycle": 0 },
      "rv": { "flatbed": 0, "wheel_lift": 0, "hook_chain": 0, "heavy_duty": 200, "motorcycle": 0 }
    };
    return baseCosts[vehicle]?.[method] || 75;
  };

  // Per-mile rates
  const getPerMileRate = (method: string): number => {
    const rates: { [key: string]: number } = {
      "flatbed": 3.5,
      "wheel_lift": 2.5,
      "hook_chain": 2.0,
      "heavy_duty": 5.0,
      "motorcycle": 2.0
    };
    return rates[method] || 3.0;
  };

  // Location multipliers
  const getLocationMultiplier = (location: string): number => {
    const multipliers: { [key: string]: number } = {
      "urban": 1.2,
      "suburban": 1.0,
      "rural": 1.1,
      "interstate": 1.15,
      "mountainous": 1.4
    };
    return multipliers[location] || 1.0;
  };

  // Time multipliers
  const getTimeMultiplier = (time: string): number => {
    const multipliers: { [key: string]: number } = {
      "daytime": 1.0,
      "night": 1.3,
      "weekend": 1.25,
      "holiday": 1.5
    };
    return multipliers[time] || 1.0;
  };

  // Additional services costs
  const getAdditionalServicesCost = (services: typeof additionalServices, baseCost: number): number => {
    let total = 0;
    if (services.winching) total += 75;
    if (services.roadside) total += 50;
    if (services.storage) total += 35;
    if (services.tolls) total += 25;
    if (services.environmental) total += baseCost * 0.07;
    return total;
  };

  const calculateTowingCost = () => {
    scrollToResults(resultsRef as React.RefObject<HTMLElement>);
    setError("");

    if (!vehicleType) {
      setError(contentData.error_vehicle || "Please select a vehicle type");
      return;
    }

    if (!towingMethod) {
      setError(contentData.error_method || "Please select a towing method");
      return;
    }

    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      setError(contentData.error_distance || "Please enter a valid distance");
      return;
    }

    // Convert km to miles if needed
    const distanceInMiles = distanceUnit === "km" ? dist * 0.621371 : dist;

    // Calculate costs
    const baseCost = getBaseCost(vehicleType, towingMethod);
    const perMileRate = getPerMileRate(towingMethod);
    const distanceCost = distanceInMiles * perMileRate;
    const locationMult = getLocationMultiplier(locationType);
    const timeMult = getTimeMultiplier(timeOfDay);
    
    const subtotal = (baseCost + distanceCost) * locationMult * timeMult;
    const additionalCost = getAdditionalServicesCost(additionalServices, baseCost);
    const totalCost = subtotal + additionalCost;

    const breakdown = [
      { label: contentData.base_cost_label || "Base Cost", value: baseCost },
      { label: contentData.distance_cost_label || "Distance Cost", value: distanceCost },
      { label: contentData.location_adjustment_label || "Location Adjustment", value: subtotal - (baseCost + distanceCost) },
      { label: contentData.time_adjustment_label || "Time Adjustment", value: (baseCost + distanceCost) * locationMult * (timeMult - 1) },
    ];

    if (additionalCost > 0) {
      breakdown.push({ label: contentData.additional_services_cost_label || "Additional Services", value: additionalCost });
    }

    setResults({
      totalCost,
      baseCost,
      distanceCost,
      locationMultiplier: locationMult,
      timeMultiplier: timeMult,
      additionalServicesCost: additionalCost,
      breakdown
    });
  };

  const handleClear = () => {
    setVehicleType("");
    setTowingMethod("");
    setDistance("");
    setDistanceUnit("miles");
    setLocationType("");
    setTimeOfDay("");
    setAdditionalServices({
      winching: false,
      roadside: false,
      storage: false,
      tolls: false,
      environmental: false
    });
    setResults(null);
    setError("");
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
              <Truck className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {contentData.pageTitle || "Towing Estimate Calculator"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {contentData.pageDescription || "Calculate towing costs based on vehicle type, distance, location, and services"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <Card className="shadow-2xl border-2 border-blue-100 pt-0 hover:shadow-blue-100 transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-6 w-6" />
                {contentData.input_section_title || "Calculate Towing Cost"}
              </CardTitle>
              <CardDescription className="text-black-50">
                {contentData.input_section_description || "Enter your vehicle and towing details below"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Vehicle Type */}
              <div className="space-y-2">
                <Label htmlFor="vehicleType" className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  {contentData.vehicle_type_label || "Vehicle Type"}
                </Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan / Compact Car</SelectItem>
                    <SelectItem value="suv">SUV / Crossover</SelectItem>
                    <SelectItem value="pickup">Pickup Truck</SelectItem>
                    <SelectItem value="luxury">Luxury / Sports Car</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="van">Van / Minivan</SelectItem>
                    <SelectItem value="rv">RV / Bus / Heavy Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Towing Method */}
              <div className="space-y-2">
                <Label htmlFor="towingMethod" className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-blue-600" />
                  {contentData.towing_method_label || "Towing Method"}
                </Label>
                <Select value={towingMethod} onValueChange={setTowingMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select towing method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="wheel_lift">Wheel Lift</SelectItem>
                    <SelectItem value="hook_chain">Hook & Chain</SelectItem>
                    <SelectItem value="heavy_duty">Heavy Duty</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle Tow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">
                    {contentData.distance_label || "Distance"}
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Enter distance"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distanceUnit">
                    {contentData.distance_unit_label || "Unit"}
                  </Label>
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="miles">Miles</SelectItem>
                      <SelectItem value="km">Kilometers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location Type */}
              <div className="space-y-2">
                <Label htmlFor="locationType" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {contentData.location_label || "Location Type"}
                </Label>
                <Select value={locationType} onValueChange={setLocationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="suburban">Suburban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                    <SelectItem value="interstate">Interstate</SelectItem>
                    <SelectItem value="mountainous">Mountainous / Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time of Day */}
              <div className="space-y-2">
                <Label htmlFor="timeOfDay" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  {contentData.time_label || "Time of Day"}
                </Label>
                <Select value={timeOfDay} onValueChange={setTimeOfDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daytime">Daytime</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Services */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {contentData.additional_services_label || "Additional Services"}
                </Label>
                <div className="space-y-3 pl-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="winching"
                      checked={additionalServices.winching}
                      onCheckedChange={(checked) =>
                        setAdditionalServices({ ...additionalServices, winching: checked as boolean })
                      }
                    />
                    <label htmlFor="winching" className="text-sm cursor-pointer">
                      Winching / Recovery (+$75)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="roadside"
                      checked={additionalServices.roadside}
                      onCheckedChange={(checked) =>
                        setAdditionalServices({ ...additionalServices, roadside: checked as boolean })
                      }
                    />
                    <label htmlFor="roadside" className="text-sm cursor-pointer">
                      Roadside Assistance (+$50)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="storage"
                      checked={additionalServices.storage}
                      onCheckedChange={(checked) =>
                        setAdditionalServices({ ...additionalServices, storage: checked as boolean })
                      }
                    />
                    <label htmlFor="storage" className="text-sm cursor-pointer">
                      Storage at Tow Yard - 1 Day (+$35)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tolls"
                      checked={additionalServices.tolls}
                      onCheckedChange={(checked) =>
                        setAdditionalServices({ ...additionalServices, tolls: checked as boolean })
                      }
                    />
                    <label htmlFor="tolls" className="text-sm cursor-pointer">
                      Toll Charges (+$25)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="environmental"
                      checked={additionalServices.environmental}
                      onCheckedChange={(checked) =>
                        setAdditionalServices({ ...additionalServices, environmental: checked as boolean })
                      }
                    />
                    <label htmlFor="environmental" className="text-sm cursor-pointer">
                      Environmental Surcharge (7% of base)
                    </label>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateTowingCost}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  {contentData.calculate_button || "Calculate Cost"}
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1"
                >
                  {contentData.clear_button || "Clear"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div ref={resultsRef}>
            <Card className="shadow-2xl border-2 pt-0 border-blue-100 sticky top-4 hover:shadow-blue-100 transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-6 w-6" />
                  {contentData.results_title || "Estimated Towing Cost"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {results ? (
                  <div className="space-y-6">
                    {/* Total Cost */}
                    <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-300 shadow-inner">
                      <div className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
                        {contentData.total_cost_label || "Total Estimated Cost"}
                      </div>
                      <div className="text-5xl font-bold text-blue-600 mb-2">
                        ${results.totalCost.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Based on {distance} {distanceUnit}
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <div className="h-1 w-8 bg-blue-600 rounded"></div>
                        {contentData.cost_breakdown_label || "Cost Breakdown"}
                      </h3>
                      <div className="space-y-2">
                        {results.breakdown.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-colors duration-200 border border-gray-200"
                          >
                            <span className="text-gray-700 font-medium">{item.label}</span>
                            <span className="font-bold text-blue-600 text-lg">
                              ${item.value.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
                      <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          <strong className="text-yellow-800">Important Note:</strong> This is an estimate based on industry averages. 
                          Actual costs may vary by service provider, location, and specific circumstances. 
                          Contact local towing companies for exact quotes.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Truck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Enter your towing details and click Calculate to see the estimated cost
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guide Section */}
        {guideContent && (
          <div className="mt-12">
            
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="towing-estimate-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          </div>
        )}

        {/* Similar Calculators */}
        <div className="mt-12">
          <SimilarCalculators calculators={[{
            calculatorName: "Age Calculator",
            calculatorHref: "/age-calculator",
            calculatorDescription: "Calculate age in years, months, and days"
          }, {
            calculatorName: "RPE Calculator",
            calculatorHref: "/rpe-calculator",
            calculatorDescription: "Calculate the rate of perceived exertion (RPE) for various activities"
          }, {
            calculatorName: "Enterprise SEO ROI Calculator",
            calculatorHref: "/enterprise-seo-roi-calculator",
            calculatorDescription: "Calculate the return on investment (ROI) for enterprise SEO"
          }]} />
        </div>
      </div>
    </div>
  );
}
