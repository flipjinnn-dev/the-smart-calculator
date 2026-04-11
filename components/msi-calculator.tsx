"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Cpu, Zap, HardDrive, Fan, AlertTriangle } from "lucide-react"

export default function MSICalculator() {
  // Component selections
  const [cpu, setCpu] = useState<string>("")
  const [gpu, setGpu] = useState<string>("")
  const [ramSticks, setRamSticks] = useState<string>("2")
  const [ssdCount, setSsdCount] = useState<string>("1")
  const [hddCount, setHddCount] = useState<string>("0")
  const [fans, setFans] = useState<string>("3")
  const [rgbLighting, setRgbLighting] = useState<string>("no")
  const [liquidCooling, setLiquidCooling] = useState<string>("no")
  
  const [result, setResult] = useState<{
    totalWattage: number
    recommendedPSU: string
    breakdown: {
      cpu: number
      gpu: number
      ram: number
      storage: number
      cooling: number
      motherboard: number
      other: number
    }
  } | null>(null)

  // CPU Power Consumption Database
  const cpuDatabase: { [key: string]: number } = {
    "Intel Core i9-14900K": 253,
    "Intel Core i9-13900K": 253,
    "Intel Core i7-14700K": 253,
    "Intel Core i7-13700K": 253,
    "Intel Core i5-14600K": 181,
    "Intel Core i5-13600K": 181,
    "AMD Ryzen 9 7950X": 170,
    "AMD Ryzen 9 7900X": 170,
    "AMD Ryzen 7 7700X": 105,
    "AMD Ryzen 5 7600X": 105,
    "Intel Core i9-12900K": 241,
    "Intel Core i7-12700K": 190,
    "Intel Core i5-12600K": 150,
    "AMD Ryzen 9 5950X": 105,
    "AMD Ryzen 9 5900X": 105,
    "AMD Ryzen 7 5800X": 105,
    "AMD Ryzen 5 5600X": 65,
  }

  // GPU Power Consumption Database
  const gpuDatabase: { [key: string]: number } = {
    "NVIDIA RTX 4090": 450,
    "NVIDIA RTX 4080": 320,
    "NVIDIA RTX 4070 Ti": 285,
    "NVIDIA RTX 4070": 200,
    "NVIDIA RTX 4060 Ti": 160,
    "NVIDIA RTX 4060": 115,
    "NVIDIA RTX 3090 Ti": 450,
    "NVIDIA RTX 3090": 350,
    "NVIDIA RTX 3080 Ti": 350,
    "NVIDIA RTX 3080": 320,
    "NVIDIA RTX 3070 Ti": 290,
    "NVIDIA RTX 3070": 220,
    "NVIDIA RTX 3060 Ti": 200,
    "NVIDIA RTX 3060": 170,
    "AMD RX 7900 XTX": 355,
    "AMD RX 7900 XT": 315,
    "AMD RX 7800 XT": 263,
    "AMD RX 7700 XT": 245,
    "AMD RX 6950 XT": 335,
    "AMD RX 6900 XT": 300,
    "AMD RX 6800 XT": 300,
    "AMD RX 6800": 250,
    "AMD RX 6700 XT": 230,
  }

  const calculatePower = () => {
    if (!cpu || !gpu) {
      alert("Please select both CPU and GPU")
      return
    }

    // Get component power consumption
    const cpuPower = cpuDatabase[cpu] || 0
    const gpuPower = gpuDatabase[gpu] || 0
    
    // RAM: ~3W per stick
    const ramPower = parseInt(ramSticks) * 3
    
    // Storage: SSD ~3W, HDD ~6W
    const storagePower = (parseInt(ssdCount) * 3) + (parseInt(hddCount) * 6)
    
    // Cooling: Fans ~3W each, Liquid cooling ~15W
    const fanPower = parseInt(fans) * 3
    const liquidCoolingPower = liquidCooling === "yes" ? 15 : 0
    const coolingPower = fanPower + liquidCoolingPower
    
    // Motherboard: ~50-80W average
    const motherboardPower = 65
    
    // RGB and other: ~10-20W
    const rgbPower = rgbLighting === "yes" ? 15 : 0
    const otherPower = rgbPower + 10 // Misc components
    
    // Total wattage
    const totalWattage = cpuPower + gpuPower + ramPower + storagePower + coolingPower + motherboardPower + otherPower
    
    // Add 20-30% buffer for safety
    const bufferMultiplier = 1.25
    const recommendedWattage = Math.ceil(totalWattage * bufferMultiplier)
    
    // Determine PSU recommendation
    let recommendedPSU = ""
    if (recommendedWattage <= 450) {
      recommendedPSU = "550W"
    } else if (recommendedWattage <= 550) {
      recommendedPSU = "650W"
    } else if (recommendedWattage <= 650) {
      recommendedPSU = "750W"
    } else if (recommendedWattage <= 750) {
      recommendedPSU = "850W"
    } else if (recommendedWattage <= 900) {
      recommendedPSU = "1000W"
    } else if (recommendedWattage <= 1100) {
      recommendedPSU = "1200W"
    } else {
      recommendedPSU = "1500W+"
    }

    setResult({
      totalWattage: Math.round(totalWattage),
      recommendedPSU,
      breakdown: {
        cpu: cpuPower,
        gpu: gpuPower,
        ram: ramPower,
        storage: storagePower,
        cooling: coolingPower,
        motherboard: motherboardPower,
        other: otherPower,
      }
    })
  }

  const resetCalculator = () => {
    setCpu("")
    setGpu("")
    setRamSticks("2")
    setSsdCount("1")
    setHddCount("0")
    setFans("3")
    setRgbLighting("no")
    setLiquidCooling("no")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* CPU Selection */}
      <div className="space-y-3">
        <Label htmlFor="cpu" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          CPU (Processor) <span className="text-red-600">*</span>
        </Label>
        <Select value={cpu} onValueChange={setCpu}>
          <SelectTrigger id="cpu" className="text-lg h-14 border-2 border-gray-300 hover:border-blue-500 transition-colors">
            <SelectValue placeholder="Select your CPU" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="Intel Core i9-14900K" className="text-base py-3">Intel Core i9-14900K (253W)</SelectItem>
            <SelectItem value="Intel Core i9-13900K" className="text-base py-3">Intel Core i9-13900K (253W)</SelectItem>
            <SelectItem value="Intel Core i7-14700K" className="text-base py-3">Intel Core i7-14700K (253W)</SelectItem>
            <SelectItem value="Intel Core i7-13700K" className="text-base py-3">Intel Core i7-13700K (253W)</SelectItem>
            <SelectItem value="Intel Core i5-14600K" className="text-base py-3">Intel Core i5-14600K (181W)</SelectItem>
            <SelectItem value="Intel Core i5-13600K" className="text-base py-3">Intel Core i5-13600K (181W)</SelectItem>
            <SelectItem value="AMD Ryzen 9 7950X" className="text-base py-3">AMD Ryzen 9 7950X (170W)</SelectItem>
            <SelectItem value="AMD Ryzen 9 7900X" className="text-base py-3">AMD Ryzen 9 7900X (170W)</SelectItem>
            <SelectItem value="AMD Ryzen 7 7700X" className="text-base py-3">AMD Ryzen 7 7700X (105W)</SelectItem>
            <SelectItem value="AMD Ryzen 5 7600X" className="text-base py-3">AMD Ryzen 5 7600X (105W)</SelectItem>
            <SelectItem value="Intel Core i9-12900K" className="text-base py-3">Intel Core i9-12900K (241W)</SelectItem>
            <SelectItem value="Intel Core i7-12700K" className="text-base py-3">Intel Core i7-12700K (190W)</SelectItem>
            <SelectItem value="Intel Core i5-12600K" className="text-base py-3">Intel Core i5-12600K (150W)</SelectItem>
            <SelectItem value="AMD Ryzen 9 5950X" className="text-base py-3">AMD Ryzen 9 5950X (105W)</SelectItem>
            <SelectItem value="AMD Ryzen 9 5900X" className="text-base py-3">AMD Ryzen 9 5900X (105W)</SelectItem>
            <SelectItem value="AMD Ryzen 7 5800X" className="text-base py-3">AMD Ryzen 7 5800X (105W)</SelectItem>
            <SelectItem value="AMD Ryzen 5 5600X" className="text-base py-3">AMD Ryzen 5 5600X (65W)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GPU Selection */}
      <div className="space-y-3">
        <Label htmlFor="gpu" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          GPU (Graphics Card) <span className="text-red-600">*</span>
        </Label>
        <Select value={gpu} onValueChange={setGpu}>
          <SelectTrigger id="gpu" className="text-lg h-14 border-2 border-gray-300 hover:border-yellow-500 transition-colors">
            <SelectValue placeholder="Select your GPU" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="NVIDIA RTX 4090" className="text-base py-3">NVIDIA RTX 4090 (450W)</SelectItem>
            <SelectItem value="NVIDIA RTX 4080" className="text-base py-3">NVIDIA RTX 4080 (320W)</SelectItem>
            <SelectItem value="NVIDIA RTX 4070 Ti" className="text-base py-3">NVIDIA RTX 4070 Ti (285W)</SelectItem>
            <SelectItem value="NVIDIA RTX 4070" className="text-base py-3">NVIDIA RTX 4070 (200W)</SelectItem>
            <SelectItem value="NVIDIA RTX 4060 Ti" className="text-base py-3">NVIDIA RTX 4060 Ti (160W)</SelectItem>
            <SelectItem value="NVIDIA RTX 4060" className="text-base py-3">NVIDIA RTX 4060 (115W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3090 Ti" className="text-base py-3">NVIDIA RTX 3090 Ti (450W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3090" className="text-base py-3">NVIDIA RTX 3090 (350W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3080 Ti" className="text-base py-3">NVIDIA RTX 3080 Ti (350W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3080" className="text-base py-3">NVIDIA RTX 3080 (320W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3070 Ti" className="text-base py-3">NVIDIA RTX 3070 Ti (290W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3070" className="text-base py-3">NVIDIA RTX 3070 (220W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3060 Ti" className="text-base py-3">NVIDIA RTX 3060 Ti (200W)</SelectItem>
            <SelectItem value="NVIDIA RTX 3060" className="text-base py-3">NVIDIA RTX 3060 (170W)</SelectItem>
            <SelectItem value="AMD RX 7900 XTX" className="text-base py-3">AMD RX 7900 XTX (355W)</SelectItem>
            <SelectItem value="AMD RX 7900 XT" className="text-base py-3">AMD RX 7900 XT (315W)</SelectItem>
            <SelectItem value="AMD RX 7800 XT" className="text-base py-3">AMD RX 7800 XT (263W)</SelectItem>
            <SelectItem value="AMD RX 7700 XT" className="text-base py-3">AMD RX 7700 XT (245W)</SelectItem>
            <SelectItem value="AMD RX 6950 XT" className="text-base py-3">AMD RX 6950 XT (335W)</SelectItem>
            <SelectItem value="AMD RX 6900 XT" className="text-base py-3">AMD RX 6900 XT (300W)</SelectItem>
            <SelectItem value="AMD RX 6800 XT" className="text-base py-3">AMD RX 6800 XT (300W)</SelectItem>
            <SelectItem value="AMD RX 6800" className="text-base py-3">AMD RX 6800 (250W)</SelectItem>
            <SelectItem value="AMD RX 6700 XT" className="text-base py-3">AMD RX 6700 XT (230W)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Components */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-blue-600" />
          Additional Components
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="ramSticks" className="text-base font-bold text-gray-900">
              RAM Sticks
            </Label>
            <Select value={ramSticks} onValueChange={setRamSticks}>
              <SelectTrigger id="ramSticks" className="text-lg h-12 border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Stick (~3W)</SelectItem>
                <SelectItem value="2">2 Sticks (~6W)</SelectItem>
                <SelectItem value="4">4 Sticks (~12W)</SelectItem>
                <SelectItem value="8">8 Sticks (~24W)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="ssdCount" className="text-base font-bold text-gray-900">
              SSD Drives
            </Label>
            <Select value={ssdCount} onValueChange={setSsdCount}>
              <SelectTrigger id="ssdCount" className="text-lg h-12 border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 SSDs</SelectItem>
                <SelectItem value="1">1 SSD (~3W)</SelectItem>
                <SelectItem value="2">2 SSDs (~6W)</SelectItem>
                <SelectItem value="3">3 SSDs (~9W)</SelectItem>
                <SelectItem value="4">4 SSDs (~12W)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="hddCount" className="text-base font-bold text-gray-900">
              HDD Drives
            </Label>
            <Select value={hddCount} onValueChange={setHddCount}>
              <SelectTrigger id="hddCount" className="text-lg h-12 border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 HDDs</SelectItem>
                <SelectItem value="1">1 HDD (~6W)</SelectItem>
                <SelectItem value="2">2 HDDs (~12W)</SelectItem>
                <SelectItem value="3">3 HDDs (~18W)</SelectItem>
                <SelectItem value="4">4 HDDs (~24W)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="fans" className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Fan className="w-4 h-4 text-blue-600" />
              Case Fans
            </Label>
            <Select value={fans} onValueChange={setFans}>
              <SelectTrigger id="fans" className="text-lg h-12 border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 Fans</SelectItem>
                <SelectItem value="2">2 Fans (~6W)</SelectItem>
                <SelectItem value="3">3 Fans (~9W)</SelectItem>
                <SelectItem value="4">4 Fans (~12W)</SelectItem>
                <SelectItem value="6">6 Fans (~18W)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="liquidCooling" className="text-base font-bold text-gray-900">
              Liquid Cooling
            </Label>
            <Select value={liquidCooling} onValueChange={setLiquidCooling}>
              <SelectTrigger id="liquidCooling" className="text-lg h-12 border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes (~15W)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="rgbLighting" className="text-base font-bold text-gray-900">
              RGB Lighting
            </Label>
            <Select value={rgbLighting} onValueChange={setRgbLighting}>
              <SelectTrigger id="rgbLighting" className="text-lg h-12 border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes (~15W)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={calculatePower}
          size="lg"
          className="flex-1 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Power Requirements
        </Button>
        <Button
          onClick={resetCalculator}
          size="lg"
          variant="outline"
          className="text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
        >
          Reset
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-7 h-7 text-yellow-600" />
            Power Calculation Results
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Total System Wattage</div>
              <div className="text-4xl font-bold text-blue-600">{result.totalWattage}W</div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-green-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Recommended PSU</div>
              <div className="text-4xl font-bold text-green-600">{result.recommendedPSU}</div>
              <div className="text-xs text-gray-500 mt-2">80+ Certified Recommended</div>
            </div>
          </div>

          {/* Power Breakdown */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Power Consumption Breakdown:</h4>
            <div className="space-y-3">
              {[
                { label: "CPU", value: result.breakdown.cpu, color: "bg-blue-500" },
                { label: "GPU", value: result.breakdown.gpu, color: "bg-yellow-500" },
                { label: "RAM", value: result.breakdown.ram, color: "bg-green-500" },
                { label: "Storage", value: result.breakdown.storage, color: "bg-purple-500" },
                { label: "Cooling", value: result.breakdown.cooling, color: "bg-cyan-500" },
                { label: "Motherboard", value: result.breakdown.motherboard, color: "bg-orange-500" },
                { label: "Other Components", value: result.breakdown.other, color: "bg-pink-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-32 font-semibold text-gray-700">{item.label}:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className={`${item.color} h-full flex items-center justify-end px-2 text-white text-sm font-bold transition-all duration-500`}
                      style={{ width: `${(item.value / result.totalWattage) * 100}%` }}
                    >
                      {item.value > 0 && `${item.value}W`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>💡 Important Recommendations:</strong></p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>The recommended PSU includes a 25% safety buffer for stability and future upgrades</li>
                  <li>Always choose an 80+ certified PSU (Bronze, Gold, Platinum, or Titanium)</li>
                  <li>Use trusted brands like Corsair, EVGA, Seasonic, or MSI for reliability</li>
                  <li>Never cheap out on your PSU - it protects all your components</li>
                  <li>Consider modular PSUs for better cable management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
