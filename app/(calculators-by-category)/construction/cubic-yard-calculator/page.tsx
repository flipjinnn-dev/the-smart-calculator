"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Box, Calculator, Ruler, DollarSign, AlertCircle, Building2 } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function CubicYardCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Shape selection
  const [selectedShape, setSelectedShape] = useState("rectangular")

  // Input states - will be used dynamically based on shape
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [radius, setRadius] = useState("")
  const [innerRadius, setInnerRadius] = useState("")
  const [outerRadius, setOuterRadius] = useState("")
  const [innerLength, setInnerLength] = useState("")
  const [innerWidth, setInnerWidth] = useState("")
  const [innerHeight, setInnerHeight] = useState("")
  const [baseArea, setBaseArea] = useState("")
  const [costPerYard, setCostPerYard] = useState("")

  // Unit state (feet, inches, yards)
  const [unit, setUnit] = useState<"ft" | "in" | "yd">("ft")

  const shapes = [
    { value: "rectangular", label: "Rectangular Cuboid", icon: "📦" },
    { value: "cube", label: "Cube", icon: "🧊" },
    { value: "cylinder", label: "Cylinder", icon: "🥫" },
    { value: "hollow-cuboid", label: "Hollow Cuboid", icon: "📦" },
    { value: "hollow-cylinder", label: "Hollow Cylinder", icon: "🔧" },
    { value: "hemisphere", label: "Hemisphere", icon: "🌗" },
    { value: "cone", label: "Cone", icon: "🔺" },
    { value: "pyramid", label: "Pyramid", icon: "🔺" },
  ]

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Validation based on selected shape
    switch (selectedShape) {
      case "rectangular":
        if (!length || Number.parseFloat(length) <= 0) newErrors.length = "Please enter a valid length"
        if (!width || Number.parseFloat(width) <= 0) newErrors.width = "Please enter a valid width"
        if (!height || Number.parseFloat(height) <= 0) newErrors.height = "Please enter a valid height"
        break
      case "cube":
        if (!length || Number.parseFloat(length) <= 0) newErrors.length = "Please enter a valid side length"
        break
      case "cylinder":
        if (!radius || Number.parseFloat(radius) <= 0) newErrors.radius = "Please enter a valid radius"
        if (!height || Number.parseFloat(height) <= 0) newErrors.height = "Please enter a valid height"
        break
      case "hollow-cuboid":
        if (!length || Number.parseFloat(length) <= 0) newErrors.length = "Please enter a valid outer length"
        if (!width || Number.parseFloat(width) <= 0) newErrors.width = "Please enter a valid outer width"
        if (!height || Number.parseFloat(height) <= 0) newErrors.height = "Please enter a valid outer height"
        if (!innerLength || Number.parseFloat(innerLength) <= 0)
          newErrors.innerLength = "Please enter a valid inner length"
        if (!innerWidth || Number.parseFloat(innerWidth) <= 0) newErrors.innerWidth = "Please enter a valid inner width"
        if (!innerHeight || Number.parseFloat(innerHeight) <= 0)
          newErrors.innerHeight = "Please enter a valid inner height"
        break
      case "hollow-cylinder":
        if (!outerRadius || Number.parseFloat(outerRadius) <= 0)
          newErrors.outerRadius = "Please enter a valid outer radius"
        if (!innerRadius || Number.parseFloat(innerRadius) <= 0)
          newErrors.innerRadius = "Please enter a valid inner radius"
        if (!height || Number.parseFloat(height) <= 0) newErrors.height = "Please enter a valid height"
        if (Number.parseFloat(innerRadius) >= Number.parseFloat(outerRadius)) {
          newErrors.innerRadius = "Inner radius must be less than outer radius"
        }
        break
      case "hemisphere":
        if (!radius || Number.parseFloat(radius) <= 0) newErrors.radius = "Please enter a valid radius"
        break
      case "cone":
        if (!radius || Number.parseFloat(radius) <= 0) newErrors.radius = "Please enter a valid radius"
        if (!height || Number.parseFloat(height) <= 0) newErrors.height = "Please enter a valid height"
        break
      case "pyramid":
        if (!baseArea || Number.parseFloat(baseArea) <= 0) newErrors.baseArea = "Please enter a valid base area"
        if (!height || Number.parseFloat(height) <= 0) newErrors.height = "Please enter a valid height"
        break
    }

    if (costPerYard && Number.parseFloat(costPerYard) < 0) {
      newErrors.costPerYard = "Cost cannot be negative"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Convert input to feet (standard unit for calculation)
  const convertToFeet = (value: string) => {
    const num = Number.parseFloat(value)
    switch (unit) {
      case "in":
        return num / 12
      case "yd":
        return num * 3
      default:
        return num // already in feet
    }
  }

  const calculateVolume = () => {
    if (!validateInputs()) {
      return
    }

    let volumeFt3 = 0

    // Convert all inputs to feet for calculation
    const L = convertToFeet(length)
    const W = convertToFeet(width)
    const H = convertToFeet(height)
    const R = convertToFeet(radius)
    const Ri = convertToFeet(innerRadius)
    const Ro = convertToFeet(outerRadius)
    const Li = convertToFeet(innerLength)
    const Wi = convertToFeet(innerWidth)
    const Hi = convertToFeet(innerHeight)
    const A =
      unit === "ft"
        ? Number.parseFloat(baseArea)
        : unit === "in"
          ? Number.parseFloat(baseArea) / 144
          : Number.parseFloat(baseArea) * 9 // Convert area to ft²

    // Calculate volume based on shape
    switch (selectedShape) {
      case "rectangular":
        volumeFt3 = L * W * H
        break
      case "cube":
        volumeFt3 = L * L * L
        break
      case "cylinder":
        volumeFt3 = Math.PI * R * R * H
        break
      case "hollow-cuboid":
        volumeFt3 = L * W * H - Li * Wi * Hi
        break
      case "hollow-cylinder":
        volumeFt3 = Math.PI * H * (Ro * Ro - Ri * Ri)
        break
      case "hemisphere":
        volumeFt3 = (2 / 3) * Math.PI * R * R * R
        break
      case "cone":
        volumeFt3 = (1 / 3) * Math.PI * R * R * H
        break
      case "pyramid":
        volumeFt3 = (1 / 3) * A * H
        break
    }

    // Convert to cubic yards
    const volumeYd3 = volumeFt3 / 27

    // Calculate cost if provided
    const totalCost = costPerYard ? volumeYd3 * Number.parseFloat(costPerYard) : null

    setResult({
      volumeFt3,
      volumeYd3,
      totalCost,
      shape: selectedShape,
      inputs: {
        length: L,
        width: W,
        height: H,
        radius: R,
        innerRadius: Ri,
        outerRadius: Ro,
        innerLength: Li,
        innerWidth: Wi,
        innerHeight: Hi,
        baseArea: A,
        costPerYard: Number.parseFloat(costPerYard) || 0,
      },
    })
    setShowResult(true)
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  const renderInputFields = () => {
    const commonInputClass =
      "w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm"

    switch (selectedShape) {
      case "rectangular":
        return (
          <>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Length ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.length ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter length in ${unit}`}
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value)
                    if (errors.length) setErrors((prev) => ({ ...prev, length: "" }))
                  }}
                />
              </div>
              {errors.length && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.length}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Width ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.width ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter width in ${unit}`}
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value)
                    if (errors.width) setErrors((prev) => ({ ...prev, width: "" }))
                  }}
                />
              </div>
              {errors.width && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.width}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Height ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter height in ${unit}`}
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value)
                    if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                  }}
                />
              </div>
              {errors.height && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.height}</span>
                </div>
              )}
            </div>
          </>
        )

      case "cube":
        return (
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Side Length ({unit})</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Box className="h-5 w-5 text-orange-500" />
              </div>
              <Input
                className={`${commonInputClass} ${errors.length ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                type="number"
                step="0.1"
                placeholder={`Enter side length in ${unit}`}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value)
                  if (errors.length) setErrors((prev) => ({ ...prev, length: "" }))
                }}
              />
            </div>
            {errors.length && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.length}</span>
              </div>
            )}
          </div>
        )

      case "cylinder":
        return (
          <>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Radius ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.radius ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter radius in ${unit}`}
                  value={radius}
                  onChange={(e) => {
                    setRadius(e.target.value)
                    if (errors.radius) setErrors((prev) => ({ ...prev, radius: "" }))
                  }}
                />
              </div>
              {errors.radius && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.radius}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Height ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter height in ${unit}`}
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value)
                    if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                  }}
                />
              </div>
              {errors.height && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.height}</span>
                </div>
              )}
            </div>
          </>
        )

      case "hollow-cuboid":
        return (
          <>
            <div className="col-span-full">
              <h4 className="text-md font-semibold text-gray-800 mb-3">Outer Dimensions</h4>
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Outer Length ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.length ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter outer length in ${unit}`}
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value)
                    if (errors.length) setErrors((prev) => ({ ...prev, length: "" }))
                  }}
                />
              </div>
              {errors.length && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.length}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Outer Width ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.width ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter outer width in ${unit}`}
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value)
                    if (errors.width) setErrors((prev) => ({ ...prev, width: "" }))
                  }}
                />
              </div>
              {errors.width && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.width}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Outer Height ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter outer height in ${unit}`}
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value)
                    if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                  }}
                />
              </div>
              {errors.height && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.height}</span>
                </div>
              )}
            </div>
            <div className="col-span-full">
              <h4 className="text-md font-semibold text-gray-800 mb-3 mt-4">Inner Dimensions</h4>
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Inner Length ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.innerLength ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter inner length in ${unit}`}
                  value={innerLength}
                  onChange={(e) => {
                    setInnerLength(e.target.value)
                    if (errors.innerLength) setErrors((prev) => ({ ...prev, innerLength: "" }))
                  }}
                />
              </div>
              {errors.innerLength && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.innerLength}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Inner Width ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.innerWidth ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter inner width in ${unit}`}
                  value={innerWidth}
                  onChange={(e) => {
                    setInnerWidth(e.target.value)
                    if (errors.innerWidth) setErrors((prev) => ({ ...prev, innerWidth: "" }))
                  }}
                />
              </div>
              {errors.innerWidth && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.innerWidth}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Inner Height ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.innerHeight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter inner height in ${unit}`}
                  value={innerHeight}
                  onChange={(e) => {
                    setInnerHeight(e.target.value)
                    if (errors.innerHeight) setErrors((prev) => ({ ...prev, innerHeight: "" }))
                  }}
                />
              </div>
              {errors.innerHeight && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.innerHeight}</span>
                </div>
              )}
            </div>
          </>
        )

      case "hollow-cylinder":
        return (
          <>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Outer Radius ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.outerRadius ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter outer radius in ${unit}`}
                  value={outerRadius}
                  onChange={(e) => {
                    setOuterRadius(e.target.value)
                    if (errors.outerRadius) setErrors((prev) => ({ ...prev, outerRadius: "" }))
                  }}
                />
              </div>
              {errors.outerRadius && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.outerRadius}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Inner Radius ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.innerRadius ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter inner radius in ${unit}`}
                  value={innerRadius}
                  onChange={(e) => {
                    setInnerRadius(e.target.value)
                    if (errors.innerRadius) setErrors((prev) => ({ ...prev, innerRadius: "" }))
                  }}
                />
              </div>
              {errors.innerRadius && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.innerRadius}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Height ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter height in ${unit}`}
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value)
                    if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                  }}
                />
              </div>
              {errors.height && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.height}</span>
                </div>
              )}
            </div>
          </>
        )

      case "hemisphere":
        return (
          <div className="relative">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Radius ({unit})</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ruler className="h-5 w-5 text-orange-500" />
              </div>
              <Input
                className={`${commonInputClass} ${errors.radius ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                type="number"
                step="0.1"
                placeholder={`Enter radius in ${unit}`}
                value={radius}
                onChange={(e) => {
                  setRadius(e.target.value)
                  if (errors.radius) setErrors((prev) => ({ ...prev, radius: "" }))
                }}
              />
            </div>
            {errors.radius && (
              <div className="flex items-center mt-2 text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{errors.radius}</span>
              </div>
            )}
          </div>
        )

      case "cone":
        return (
          <>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Base Radius ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.radius ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter base radius in ${unit}`}
                  value={radius}
                  onChange={(e) => {
                    setRadius(e.target.value)
                    if (errors.radius) setErrors((prev) => ({ ...prev, radius: "" }))
                  }}
                />
              </div>
              {errors.radius && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.radius}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Height ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter height in ${unit}`}
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value)
                    if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                  }}
                />
              </div>
              {errors.height && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.height}</span>
                </div>
              )}
            </div>
          </>
        )

      case "pyramid":
        return (
          <>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Base Area ({unit}²)</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calculator className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.baseArea ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter base area in ${unit}²`}
                  value={baseArea}
                  onChange={(e) => {
                    setBaseArea(e.target.value)
                    if (errors.baseArea) setErrors((prev) => ({ ...prev, baseArea: "" }))
                  }}
                />
              </div>
              {errors.baseArea && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.baseArea}</span>
                </div>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Height ({unit})</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-orange-500" />
                </div>
                <Input
                  className={`${commonInputClass} ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                  type="number"
                  step="0.1"
                  placeholder={`Enter height in ${unit}`}
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value)
                    if (errors.height) setErrors((prev) => ({ ...prev, height: "" }))
                  }}
                />
              </div>
              {errors.height && (
                <div className="flex items-center mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{errors.height}</span>
                </div>
              )}
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Head>
        <title>Cubic Yard Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate cubic yards for construction projects. Support for multiple shapes with cost estimation."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_720-8sE77EX08xKuB6AvLTisdyhRT3j1X2.png"
                  alt="Smart Calculator Logo"
                  className="w-12 h-12"
                />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Cubic Yard Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/construction" className="text-gray-500 hover:text-blue-600">
                Construction
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Cubic Yard Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cubic Yard Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate cubic yards for construction materials like concrete, gravel, soil, and mulch. Support for
                multiple shapes with optional cost estimation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Box className="w-6 h-6 text-orange-600" />
                      <span>Shape & Dimensions</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Select shape and enter dimensions to calculate volume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Shape Selector */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Shape</Label>
                      <Select value={selectedShape} onValueChange={setSelectedShape}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200">
                          <SelectValue placeholder="Choose a shape" />
                        </SelectTrigger>
                        <SelectContent>
                          {shapes.map((shape) => (
                            <SelectItem key={shape.value} value={shape.value}>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{shape.icon}</span>
                                <span>{shape.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Unit Selector */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Unit</Label>
                      <Select value={unit} onValueChange={(value: "ft" | "in" | "yd") => setUnit(value)}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ft">Feet (ft)</SelectItem>
                          <SelectItem value="in">Inches (in)</SelectItem>
                          <SelectItem value="yd">Yards (yd)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dynamic Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">{renderInputFields()}</div>

                    {/* Cost Per Yard (Optional) */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Cost per Cubic Yard (Optional)
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-orange-500" />
                        </div>
                        <Input
                          className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${
                            errors.costPerYard ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                          }`}
                          type="number"
                          step="0.01"
                          placeholder="Enter cost per cubic yard"
                          value={costPerYard}
                          onChange={(e) => {
                            setCostPerYard(e.target.value)
                            if (errors.costPerYard) setErrors((prev) => ({ ...prev, costPerYard: "" }))
                          }}
                        />
                      </div>
                      {errors.costPerYard && (
                        <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.costPerYard}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-700">
                        <strong>Conversion:</strong> 1 cubic yard = 27 cubic feet = 46,656 cubic inches
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Commonly used for concrete, gravel, soil, mulch, and other construction materials.
                      </p>
                    </div>

                    <Button
                      onClick={calculateVolume}
                      className="w-full h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800"
                    >
                      Calculate Volume
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mb-3 shadow-lg">
                      <Box className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">Volume Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="bg-white p-3 rounded-lg border border-orange-200">
                            <p className="text-2xl font-bold text-orange-900">{result.volumeYd3?.toFixed(2)}</p>
                            <p className="text-gray-600">cubic yards</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-orange-200">
                            <p className="text-lg font-bold text-orange-900">{result.volumeFt3?.toFixed(1)}</p>
                            <p className="text-gray-600">cubic feet</p>
                          </div>
                          {result.totalCost && (
                            <div className="bg-white p-3 rounded-lg border border-orange-200">
                              <p className="text-lg font-bold text-orange-900">${result.totalCost?.toFixed(2)}</p>
                              <p className="text-gray-600">Total Cost</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Box className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Select shape, enter dimensions and click{" "}
                          <span className="font-semibold text-orange-600">Calculate</span> to see volume.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>Detailed Volume Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Box className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-orange-700 mb-2">Cubic Yards</h3>
                        <p className="text-3xl font-bold text-orange-900 mb-1">{result.volumeYd3?.toFixed(2)}</p>
                        <p className="text-xl text-orange-600">yd³</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Ruler className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-orange-700 mb-2">Cubic Feet</h3>
                        <p className="text-3xl font-bold text-orange-900 mb-1">{result.volumeFt3?.toFixed(1)}</p>
                        <p className="text-xl text-orange-600">ft³</p>
                      </div>
                      {result.totalCost && (
                        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
                            <DollarSign className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-orange-700 mb-2">Total Cost</h3>
                          <p className="text-3xl font-bold text-orange-900 mb-1">${result.totalCost?.toFixed(2)}</p>
                          <p className="text-xl text-orange-600">USD</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mr-3 shadow-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                    Understanding Cubic Yards in Construction
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Why Cubic Yards?</h3>
                      <p className="text-gray-700 mb-4">
                        Cubic yards are the standard unit for measuring bulk construction materials like concrete,
                        gravel, soil, and mulch. This unit provides a practical scale for construction projects and
                        material ordering.
                      </p>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Common Applications</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Concrete for foundations, driveways, patios</li>
                        <li>Gravel for driveways and landscaping</li>
                        <li>Soil and topsoil for gardening</li>
                        <li>Mulch for landscaping projects</li>
                        <li>Sand for construction and landscaping</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Example: Rectangular Driveway</strong>
                        </p>
                        <p className="text-gray-700">Length: 12 ft</p>
                        <p className="text-gray-700">Width: 9 ft</p>
                        <p className="text-gray-700">Depth: 2 ft</p>
                        <p className="text-gray-700">Volume: 12 × 9 × 2 = 216 ft³</p>
                        <p className="text-gray-700 font-semibold mt-2">Result: 216 ÷ 27 = 8 cubic yards</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        <strong>Conversion:</strong> Always divide cubic feet by 27 to get cubic yards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

      </div>
    </>
  )
}
