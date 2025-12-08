"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Calculator, TrendingUp, Gauge, Settings } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
export default function CarJumpDistanceCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('car-jump-distance-calculator', language, "calculator-ui");

  const {
    content: guideContent,
    loading: guideLoading,
    error: guideError
  } = useCalculatorContent('car-jump-distance-calculator', language, "calculator-guide");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "form": "",
    "results": "",
    "educational": "",
    "messages": "",
    "disclaimer": "",
    "seekHelp": "",
    "errors": "",
    "tooltips": "",
    "trajectory_path_0": "",
    "k_0_m_1": "",
    "m_2": "",
    "jump_parameters_3": "",
    "enter_vehicle_and_ramp_parameters_to_calculate_jum_4": "",
    "basic_5": "",
    "air_drag_6": "",
    "rotation_7": "",
    "takeoff_height_8": "",
    "m_9": "",
    "ft_10": "",
    "in_11": "",
    "cm_12": "",
    "landing_height_13": "",
    "m_14": "",
    "ft_15": "",
    "in_16": "",
    "cm_17": "",
    "ramp_angle_18": "",
    "rad_19": "",
    "takeoff_speed_20": "",
    "kmh_21": "",
    "mph_22": "",
    "ms_23": "",
    "fts_24": "",
    "gravity_25": "",
    "ms_26": "",
    "include_air_drag_effects_27": "",
    "air_density_28": "",
    "kgm_29": "",
    "drag_coefficient_30": "",
    "reference_area_31": "",
    "m_32": "",
    "ft_33": "",
    "in_34": "",
    "cm_35": "",
    "vehicle_mass_36": "",
    "kg_37": "",
    "lb_38": "",
    "g_39": "",
    "include_car_rotation_effects_40": "",
    "wheelbase_41": "",
    "m_42": "",
    "ft_43": "",
    "in_44": "",
    "cm_45": "",
    "car_length_46": "",
    "m_47": "",
    "ft_48": "",
    "in_49": "",
    "cm_50": "",
    "car_width_51": "",
    "m_52": "",
    "ft_53": "",
    "in_54": "",
    "cm_55": "",
    "car_height_56": "",
    "m_57": "",
    "ft_58": "",
    "in_59": "",
    "cm_60": "",
    "com_offset_61": "",
    "m_62": "",
    "ft_63": "",
    "in_64": "",
    "cm_65": "",
    "form_angle_66": "",
    "rad_67": "",
    "basic_formula_68": "",
    "projectile_motion_with_initial_velocity_v_at_angle_69": "",
    "range_70": "",
    "r_v_tf_where_tf_is_flight_time_to_landing_height_71": "",
    "calculate_distance_72": "",
    "jump_results_73": "",
    "no_solution_74": "",
    "jump_distance_75": "",
    "m_76": "",
    "flight_time_77": "",
    "s_78": "",
    "landing_speed_79": "",
    "ms_80": "",
    "max_height_81": "",
    "m_82": "",
    "max_height_distance_83": "",
    "m_84": "",
    "with_air_drag_85": "",
    "range_86": "",
    "m_87": "",
    "time_88": "",
    "s_89": "",
    "landing_speed_90": "",
    "ms_91": "",
    "car_rotation_92": "",
    "landing_angle_93": "",
    "angular_velocity_94": "",
    "s_95": "",
    "enter_parameters_and_click_96": "",
    "calculate_97": "",
    "to_see_results_98": "",
    "understanding_car_jump_physics_99": "",
    "projectile_motion_basics_100": "",
    "car_jumps_follow_projectile_motion_principles_the__101": "",
    "example_calculation_102": "",
    "given_103": "",
    "h_15_m_h_05_m_10_speed_90_kmh_250_ms_104": "",
    "calculation_105": "",
    "v_250_cos10_246_ms_106": "",
    "v_250_sin10_434_ms_107": "",
    "tf_434_434_298110_981_133_s_108": "",
    "range_246_133_327_m_109": "",
    "advanced_effects_110": "",
    "air_drag_111": "",
    "reduces_range_and_increases_flight_time_due_to_qua_112": "",
    "car_rotation_113": "",
    "vehicle_pitch_affects_landing_attitude_and_stabili_114": "",
    "safety_note_115": "",
    "this_is_an_educational_model_real_stunts_require_p_116": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Basic inputs with units
  const [takeoffHeight, setTakeoffHeight] = useState(1.5);
  const [takeoffHeightUnit, setTakeoffHeightUnit] = useState("m");
  const [landingHeight, setLandingHeight] = useState(0.5);
  const [landingHeightUnit, setLandingHeightUnit] = useState("m");
  const [rampAngle, setRampAngle] = useState(10);
  const [rampAngleUnit, setRampAngleUnit] = useState("deg");
  const [speedKmh, setSpeedKmh] = useState(90);
  const [speedUnit, setSpeedUnit] = useState("kmh");
  const [gravity, setGravity] = useState(9.80665);
  const [gravityUnit, setGravityUnit] = useState("ms2");

  // Advanced options
  const [includeDrag, setIncludeDrag] = useState(false);
  const [includeRotation, setIncludeRotation] = useState(false);

  // Drag parameters with units
  const [airDensity, setAirDensity] = useState(1.225);
  const [airDensityUnit, setAirDensityUnit] = useState("kgm3");
  const [dragCoefficient, setDragCoefficient] = useState(0.3);
  const [referenceArea, setReferenceArea] = useState(2.5);
  const [referenceAreaUnit, setReferenceAreaUnit] = useState("m2");
  const [vehicleMass, setVehicleMass] = useState(1500);
  const [vehicleMassUnit, setVehicleMassUnit] = useState("kg");

  // Rotation parameters with units
  const [wheelbase, setWheelbase] = useState(2.7);
  const [wheelbaseUnit, setWheelbaseUnit] = useState("m");
  const [carLength, setCarLength] = useState(4.5);
  const [carLengthUnit, setCarLengthUnit] = useState("m");
  const [carWidth, setCarWidth] = useState(1.8);
  const [carWidthUnit, setCarWidthUnit] = useState("m");
  const [carHeight, setCarHeight] = useState(1.5);
  const [carHeightUnit, setCarHeightUnit] = useState("m");
  const [comOffset, setComOffset] = useState(0.1);
  const [comOffsetUnit, setComOffsetUnit] = useState("m");
  const [formAngle, setFormAngle] = useState(5);
  const [formAngleUnit, setFormAngleUnit] = useState("deg");

  // Validation states
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const convertToMeters = (value: number, unit: string): number => {
    switch (unit) {
      case "m":
        return value;
      case "ft":
        return value * 0.3048;
      case "in":
        return value * 0.0254;
      case "cm":
        return value * 0.01;
      default:
        return value;
    }
  };
  const convertToMeterPerSecond = (value: number, unit: string): number => {
    switch (unit) {
      case "ms":
        return value;
      case "kmh":
        return value / 3.6;
      case "mph":
        return value * 0.44704;
      case "fps":
        return value * 0.3048;
      default:
        return value;
    }
  };
  const convertToRadians = (value: number, unit: string): number => {
    switch (unit) {
      case "rad":
        return value;
      case "deg":
        return value * Math.PI / 180;
      default:
        return value;
    }
  };
  const convertToKg = (value: number, unit: string): number => {
    switch (unit) {
      case "kg":
        return value;
      case "lb":
        return value * 0.453592;
      case "g":
        return value * 0.001;
      default:
        return value;
    }
  };
  const convertToSquareMeters = (value: number, unit: string): number => {
    switch (unit) {
      case "m2":
        return value;
      case "ft2":
        return value * 0.092903;
      case "in2":
        return value * 0.00064516;
      case "cm2":
        return value * 0.0001;
      default:
        return value;
    }
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (gravity <= 0) newErrors.gravity = "Gravity must be greater than 0";
    if (speedKmh < 0) newErrors.speedKmh = "Speed cannot be negative";
    if (rampAngle < -30 || rampAngle > 60) newErrors.rampAngle = "Angle should be between -30° and 60°";
    if (includeDrag) {
      if (airDensity <= 0) newErrors.airDensity = "Air density must be greater than 0";
      if (dragCoefficient <= 0) newErrors.dragCoefficient = "Drag coefficient must be greater than 0";
      if (referenceArea <= 0) newErrors.referenceArea = "Reference area must be greater than 0";
      if (vehicleMass <= 0) newErrors.vehicleMass = "Vehicle mass must be greater than 0";
    }
    if (includeRotation) {
      if (wheelbase <= 0) newErrors.wheelbase = "Wheelbase must be greater than 0";
      if (carLength <= 0) newErrors.carLength = "Car length must be greater than 0";
      if (carWidth <= 0) newErrors.carWidth = "Car width must be greater than 0";
      if (carHeight <= 0) newErrors.carHeight = "Car height must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateJump = () => {
    if (!validateInputs()) return;
    const h0 = convertToMeters(takeoffHeight, takeoffHeightUnit);
    const hL = convertToMeters(landingHeight, landingHeightUnit);
    const v0 = convertToMeterPerSecond(speedKmh, speedUnit);
    const alphaRad = convertToRadians(rampAngle, rampAngleUnit);
    const g = gravity; // Already in m/s²

    // Initial velocity components
    const v0x = v0 * Math.cos(alphaRad);
    const v0y = v0 * Math.sin(alphaRad);

    // Basic projectile motion calculations
    const discriminant = v0y * v0y + 2 * g * (h0 - hL);
    if (discriminant < 0) {
      setResult({
        error: "No landing possible at specified height. Increase speed or angle.",
        noLanding: true
      });
      setShowResult(true);
      return;
    }

    // Flight time to landing height
    const tf = (v0y + Math.sqrt(discriminant)) / g;

    // Range calculation
    const range = v0x * tf;

    // Maximum height calculations
    const tMax = v0y / g;
    const yMax = h0 + v0y * v0y / (2 * g);
    const xMax = v0x * tMax;

    // Landing velocity
    const vxLanding = v0x;
    const vyLanding = v0y - g * tf;
    const landingSpeed = Math.sqrt(vxLanding * vxLanding + vyLanding * vyLanding);
    let dragResults = null;
    let rotationResults = null;

    // Air drag calculations (simplified numerical integration)
    if (includeDrag) {
      const massKg = convertToKg(vehicleMass, vehicleMassUnit);
      const areaM2 = convertToSquareMeters(referenceArea, referenceAreaUnit);
      const b = 0.5 * airDensity * areaM2 * dragCoefficient;
      const dt = 0.002; // 2ms time step

      let x = 0,
        y = h0,
        vx = v0x,
        vy = v0y,
        t = 0;
      const trajectory = [];
      while (y >= hL && t < 20) {
        const v = Math.sqrt(vx * vx + vy * vy);
        const ax = -(b / massKg) * v * vx;
        const ay = -g - b / massKg * v * vy;
        vx += ax * dt;
        vy += ay * dt;
        x += vx * dt;
        y += vy * dt;
        t += dt;
        trajectory.push({
          x,
          y,
          t,
          v
        });
      }
      const finalV = Math.sqrt(vx * vx + vy * vy);
      dragResults = {
        range: x,
        flightTime: t,
        landingSpeed: finalV,
        trajectory
      };
    }

    // Car rotation calculations (simplified)
    if (includeRotation) {
      const massKg = convertToKg(vehicleMass, vehicleMassUnit);
      const lengthM = convertToMeters(carLength, carLengthUnit);
      const heightM = convertToMeters(carHeight, carHeightUnit);
      const wheelbaseM = convertToMeters(wheelbase, wheelbaseUnit);
      const comOffsetM = convertToMeters(comOffset, comOffsetUnit);
      const betaRad = convertToRadians(formAngle, formAngleUnit);
      const I = massKg / 12 * (lengthM * lengthM + heightM * heightM);
      const thetaDotDot = -(massKg * comOffsetM * g) / I * Math.cos(betaRad);
      const tL = wheelbaseM / v0;
      const omega = thetaDotDot * tL;
      const theta0 = omega * tL;
      const thetaLand = alphaRad + theta0 + omega * tf;
      rotationResults = {
        angularAcceleration: thetaDotDot * (180 / Math.PI),
        angularVelocity: omega * (180 / Math.PI),
        landingAngle: thetaLand * (180 / Math.PI)
      };
    }
    setResult({
      range: range,
      flightTime: tf,
      landingSpeed: landingSpeed,
      maxHeight: yMax,
      maxHeightDistance: xMax,
      timeToMaxHeight: tMax,
      v0: v0,
      v0x: v0x,
      v0y: v0y,
      takeoffHeight: h0,
      landingHeight: hL,
      rampAngle: rampAngle,
      dragResults: dragResults,
      rotationResults: rotationResults,
      trajectoryPoints: generateTrajectoryPoints(v0x, v0y, h0, hL, g, tf)
    });
    setShowResult(true);
  };
  const generateTrajectoryPoints = (v0x: number, v0y: number, h0: number, hL: number, g: number, tf: number) => {
    const points = [];
    const numPoints = 100;
    const dt = tf / numPoints;
    for (let i = 0; i <= numPoints; i++) {
      const t = i * dt;
      const x = v0x * t;
      const y = h0 + v0y * t - 0.5 * g * t * t;
      points.push({
        x,
        y,
        t
      });
    }
    return points;
  };
  const TrajectoryChart = ({
    trajectoryPoints
  }: {
    trajectoryPoints: any[];
  }) => {
    if (!trajectoryPoints || trajectoryPoints.length === 0) return null;
    const maxX = Math.max(...trajectoryPoints.map(p => p.x));
    const maxY = Math.max(...trajectoryPoints.map(p => p.y));
    const minY = Math.min(...trajectoryPoints.map(p => p.y));
    const width = 300;
    const height = 200;
    const padding = 20;
    const scaleX = (width - 2 * padding) / maxX;
    const scaleY = (height - 2 * padding) / (maxY - minY);
    const pathData = trajectoryPoints.map((point, index) => {
      const x = padding + point.x * scaleX;
      const y = height - padding - (point.y - minY) * scaleY;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
    return <div className="mt-4 p-4 bg-white rounded-lg border border-orange-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{contentData.trajectory_path_0}</h4>
      <svg width={width} height={height} className="border border-gray-200 rounded">
        <defs>
          <linearGradient id="trajectoryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <path d={pathData} stroke="url(#trajectoryGradient)" strokeWidth="2" fill="none" />
        {/* Ground line */}
        <line x1={padding} y1={height - padding - (result.landingHeight - minY) * scaleY} x2={width - padding} y2={height - padding - (result.landingHeight - minY) * scaleY} stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" />
        {/* Take-off point */}
        <circle cx={padding} cy={height - padding - (result.takeoffHeight - minY) * scaleY} r="4" fill="#f97316" />
        {/* Landing point */}
        <circle cx={padding + result.range * scaleX} cy={height - padding - (result.landingHeight - minY) * scaleY} r="4" fill="#dc2626" />
      </svg>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{contentData.k_0_m_1}</span>
        <span>{maxX.toFixed(1)}{contentData.m_2}</span>
      </div>
    </div>;
  };
  const handleCalculate = () => {
    calculateJump();
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Car className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Car className="w-6 h-6 text-orange-600" />
                    <span>{contentData.jump_parameters_3}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_vehicle_and_ramp_parameters_to_calculate_jum_4}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="bg-gradient-to-r from-orange-50 to-red-50 grid grid-cols-3 gap-1 mb-6 h-auto p-2 rounded-xl border border-orange-200 shadow-sm">
                      <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300">{contentData.basic_5}</TabsTrigger>
                      <TabsTrigger value="drag" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300">{contentData.air_drag_6}</TabsTrigger>
                      <TabsTrigger value="rotation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300">{contentData.rotation_7}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.takeoff_height_8}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <TrendingUp className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.1" value={takeoffHeight} onChange={e => setTakeoffHeight(Number(e.target.value))} />
                            </div>
                            <Select value={takeoffHeightUnit} onValueChange={setTakeoffHeightUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m">{contentData.m_9}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_10}</SelectItem>
                                <SelectItem value="in">{contentData.in_11}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_12}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.landing_height_13}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <TrendingUp className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.1" value={landingHeight} onChange={e => setLandingHeight(Number(e.target.value))} />
                            </div>
                            <Select value={landingHeightUnit} onValueChange={setLandingHeightUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m">{contentData.m_14}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_15}</SelectItem>
                                <SelectItem value="in">{contentData.in_16}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_17}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.ramp_angle_18}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calculator className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.rampAngle ? "border-red-500" : ""}`} type="number" step="1" value={rampAngle} onChange={e => setRampAngle(Number(e.target.value))} />
                            </div>
                            <Select value={rampAngleUnit} onValueChange={setRampAngleUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="deg">°</SelectItem>
                                <SelectItem value="rad">{contentData.rad_19}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.rampAngle && <p className="text-red-500 text-sm mt-1">{errors.rampAngle}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.takeoff_speed_20}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Gauge className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.speedKmh ? "border-red-500" : ""}`} type="number" step="1" value={speedKmh} onChange={e => setSpeedKmh(Number(e.target.value))} />
                            </div>
                            <Select value={speedUnit} onValueChange={setSpeedUnit}>
                              <SelectTrigger className="w-24 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kmh">{contentData.kmh_21}</SelectItem>
                                <SelectItem value="mph">{contentData.mph_22}</SelectItem>
                                <SelectItem value="ms">{contentData.ms_23}</SelectItem>
                                <SelectItem value="fps">{contentData.fts_24}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.speedKmh && <p className="text-red-500 text-sm mt-1">{errors.speedKmh}</p>}
                        </div>

                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.gravity_25}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calculator className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.gravity ? "border-red-500" : ""}`} type="number" step="0.001" value={gravity} onChange={e => setGravity(Number(e.target.value))} />
                            </div>
                            <Select value={gravityUnit} onValueChange={setGravityUnit}>
                              <SelectTrigger className="w-24 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ms2">{contentData.ms_26}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.gravity && <p className="text-red-500 text-sm mt-1">{errors.gravity}</p>}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="drag" className="space-y-6">
                      <div className="flex items-center justify-center space-x-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-2 border-orange-200">
                        <Settings className="w-6 h-6 text-orange-600" />
                        <Switch checked={includeDrag} onCheckedChange={setIncludeDrag} className="data-[state=checked]:bg-orange-500" />
                        <Label className="text-lg font-semibold text-orange-700">{contentData.include_air_drag_effects_27}</Label>
                      </div>

                      {includeDrag && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.air_density_28}</Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.airDensity ? "border-red-500" : ""}`} type="number" step="0.001" value={airDensity} onChange={e => setAirDensity(Number(e.target.value))} />
                            <Select value={airDensityUnit} onValueChange={setAirDensityUnit}>
                              <SelectTrigger className="w-28 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kgm3">{contentData.kgm_29}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.airDensity && <p className="text-red-500 text-sm mt-1">{errors.airDensity}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.drag_coefficient_30}</Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.dragCoefficient ? "border-red-500" : ""}`} type="number" step="0.01" value={dragCoefficient} onChange={e => setDragCoefficient(Number(e.target.value))} />
                          {errors.dragCoefficient && <p className="text-red-500 text-sm mt-1">{errors.dragCoefficient}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.reference_area_31}</Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.referenceArea ? "border-red-500" : ""}`} type="number" step="0.1" value={referenceArea} onChange={e => setReferenceArea(Number(e.target.value))} />
                            <Select value={referenceAreaUnit} onValueChange={setReferenceAreaUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m2">{contentData.m_32}</SelectItem>
                                <SelectItem value="ft2">{contentData.ft_33}</SelectItem>
                                <SelectItem value="in2">{contentData.in_34}</SelectItem>
                                <SelectItem value="cm2">{contentData.cm_35}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.referenceArea && <p className="text-red-500 text-sm mt-1">{errors.referenceArea}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.vehicle_mass_36}</Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.vehicleMass ? "border-red-500" : ""}`} type="number" step="10" value={vehicleMass} onChange={e => setVehicleMass(Number(e.target.value))} />
                            <Select value={vehicleMassUnit} onValueChange={setVehicleMassUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg">{contentData.kg_37}</SelectItem>
                                <SelectItem value="lb">{contentData.lb_38}</SelectItem>
                                <SelectItem value="g">{contentData.g_39}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.vehicleMass && <p className="text-red-500 text-sm mt-1">{errors.vehicleMass}</p>}
                        </div>
                      </div>}
                    </TabsContent>

                    <TabsContent value="rotation" className="space-y-6">
                      <div className="flex items-center justify-center space-x-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-2 border-orange-200">
                        <Settings className="w-6 h-6 text-orange-600" />
                        <Switch checked={includeRotation} onCheckedChange={setIncludeRotation} className="data-[state=checked]:bg-orange-500" />
                        <Label className="text-lg font-semibold text-orange-700">{contentData.include_car_rotation_effects_40}</Label>
                      </div>

                      {includeRotation && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ... existing rotation inputs with unit selectors ... */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.wheelbase_41}</Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.wheelbase ? "border-red-500" : ""}`} type="number" step="0.1" value={wheelbase} onChange={e => setWheelbase(Number(e.target.value))} />
                            <Select value={wheelbaseUnit} onValueChange={setWheelbaseUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m">{contentData.m_42}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_43}</SelectItem>
                                <SelectItem value="in">{contentData.in_44}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_45}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.wheelbase && <p className="text-red-500 text-sm mt-1">{errors.wheelbase}</p>}
                        </div>

                        {/* ... similar pattern for other rotation inputs ... */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.car_length_46}</Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.carLength ? "border-red-500" : ""}`} type="number" step="0.1" value={carLength} onChange={e => setCarLength(Number(e.target.value))} />
                            <Select value={carLengthUnit} onValueChange={setCarLengthUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m">{contentData.m_47}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_48}</SelectItem>
                                <SelectItem value="in">{contentData.in_49}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_50}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.carLength && <p className="text-red-500 text-sm mt-1">{errors.carLength}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.car_width_51}</Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.carWidth ? "border-red-500" : ""}`} type="number" step="0.1" value={carWidth} onChange={e => setCarWidth(Number(e.target.value))} />
                            <Select value={carWidthUnit} onValueChange={setCarWidthUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m">{contentData.m_52}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_53}</SelectItem>
                                <SelectItem value="in">{contentData.in_54}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_55}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.carWidth && <p className="text-red-500 text-sm mt-1">{errors.carWidth}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.car_height_56}</Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.carHeight ? "border-red-500" : ""}`} type="number" step="0.1" value={carHeight} onChange={e => setCarHeight(Number(e.target.value))} />
                            <Select value={carHeightUnit} onValueChange={setCarHeightUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m">{contentData.m_57}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_58}</SelectItem>
                                <SelectItem value="in">{contentData.in_59}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_60}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.carHeight && <p className="text-red-500 text-sm mt-1">{errors.carHeight}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.com_offset_61}</Label>
                          <div className="flex space-x-2">
                            <Input className="flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.01" value={comOffset} onChange={e => setComOffset(Number(e.target.value))} />
                            <Select value={comOffsetUnit} onValueChange={setComOffsetUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="m">{contentData.m_62}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_63}</SelectItem>
                                <SelectItem value="in">{contentData.in_64}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_65}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.form_angle_66}</Label>
                          <div className="flex space-x-2">
                            <Input className="flex-1 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="1" value={formAngle} onChange={e => setFormAngle(Number(e.target.value))} />
                            <Select value={formAngleUnit} onValueChange={setFormAngleUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="deg">°</SelectItem>
                                <SelectItem value="rad">{contentData.rad_67}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>}
                    </TabsContent>
                  </Tabs>

                  <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-700">
                      <strong>{contentData.basic_formula_68}</strong>{contentData.projectile_motion_with_initial_velocity_v_at_angle_69}<br />
                      <strong>{contentData.range_70}</strong>{contentData.r_v_tf_where_tf_is_flight_time_to_landing_height_71}</p>
                  </div>

                  <Button onClick={handleCalculate} className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 mt-6">{contentData.calculate_distance_72}</Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Card */}
            <div className="">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-50 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-3 shadow-lg">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.jump_results_73}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-4">
                    {result.error ? <div className="text-red-600">
                      <p className="text-lg font-semibold mb-2">{contentData.no_solution_74}</p>
                      <p className="text-sm">{result.error}</p>
                    </div> : <>
                      <div>
                        <p className="text-lg text-gray-600 mb-2 font-medium">{contentData.jump_distance_75}</p>
                        <p className="text-4xl font-extrabold text-orange-900 mb-2 drop-shadow-lg">
                          {result.range ? result.range.toFixed(1) : "0"}{contentData.m_76}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 font-medium">{contentData.flight_time_77}</p>
                          <p className="text-xl font-bold text-red-700">
                            {result.flightTime ? result.flightTime.toFixed(2) : "0"}{contentData.s_78}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">{contentData.landing_speed_79}</p>
                          <p className="text-xl font-bold text-red-700">
                            {result.landingSpeed ? result.landingSpeed.toFixed(1) : "0"}{contentData.ms_80}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">{contentData.max_height_81}</p>
                          <p className="text-xl font-bold text-red-700">
                            {result.maxHeight ? result.maxHeight.toFixed(1) : "0"}{contentData.m_82}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">{contentData.max_height_distance_83}</p>
                          <p className="text-xl font-bold text-red-700">
                            {result.maxHeightDistance ? result.maxHeightDistance.toFixed(1) : "0"}{contentData.m_84}</p>
                        </div>
                      </div>

                      {result.trajectoryPoints && <TrajectoryChart trajectoryPoints={result.trajectoryPoints} />}

                      {result.dragResults && <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
                        <p className="text-xs text-gray-600 font-semibold mb-1">{contentData.with_air_drag_85}</p>
                        <p className="text-xs text-gray-600">{contentData.range_86}{result.dragResults.range.toFixed(1)}{contentData.m_87}<br />{contentData.time_88}{result.dragResults.flightTime.toFixed(2)}{contentData.s_89}<br />{contentData.landing_speed_90}{result.dragResults.landingSpeed.toFixed(1)}{contentData.ms_91}</p>
                      </div>}

                      {result.rotationResults && <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
                        <p className="text-xs text-gray-600 font-semibold mb-1">{contentData.car_rotation_92}</p>
                        <p className="text-xs text-gray-600">{contentData.landing_angle_93}{result.rotationResults.landingAngle.toFixed(1)}°<br />{contentData.angular_velocity_94}{result.rotationResults.angularVelocity.toFixed(1)}{contentData.s_95}</p>
                      </div>}
                    </>}
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Car className="w-8 h-8 text-orange-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_parameters_and_click_96}<span className="font-semibold text-orange-600">{contentData.calculate_97}</span>{contentData.to_see_results_98}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ... existing educational content ... */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-50 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mr-3 shadow-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.understanding_car_jump_physics_99}</CardTitle>
              </CardHeader>
              <CardContent className="w-full space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.projectile_motion_basics_100}</h3>
                  <p className="text-gray-700 leading-relaxed">{contentData.car_jumps_follow_projectile_motion_principles_the__101}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculation_102}</h3>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{contentData.given_103}</strong>{contentData.h_15_m_h_05_m_10_speed_90_kmh_250_ms_104}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{contentData.calculation_105}</strong>
                    </p>
                    <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">{contentData.v_250_cos10_246_ms_106}<br />{contentData.v_250_sin10_434_ms_107}<br />{contentData.tf_434_434_298110_981_133_s_108}<br />{contentData.range_246_133_327_m_109}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.advanced_effects_110}</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      <strong>{contentData.air_drag_111}</strong>{contentData.reduces_range_and_increases_flight_time_due_to_qua_112}</li>
                    <li>
                      <strong>{contentData.car_rotation_113}</strong>{contentData.vehicle_pitch_affects_landing_attitude_and_stabili_114}</li>
                    <li>
                      <strong>{contentData.safety_note_115}</strong>{contentData.this_is_an_educational_model_real_stunts_require_p_116}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <CalculatorGuide data={guideContent} />
          </div>
        </div>
      </main>
    </div>
  </>;
}