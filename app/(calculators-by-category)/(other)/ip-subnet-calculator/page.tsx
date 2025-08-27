"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import Head from "next/head"
import { Network, Calculator, RotateCcw, Globe, Shield, Binary } from "lucide-react"
import Logo from "@/components/logo"

export default function IPv4SubnetCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Inputs
  const [ipAddress, setIpAddress] = useState("")
  const [subnetMask, setSubnetMask] = useState("")
  const [maskFormat, setMaskFormat] = useState("cidr") // cidr or dotted
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Helper functions for IP operations
  const ipToNumber = (ip: string): number => {
    const parts = ip.split(".").map(Number)
    return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]
  }

  const numberToIp = (num: number): string => {
    return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join(".")
  }

  const cidrToMask = (cidr: number): string => {
    const mask = (0xffffffff << (32 - cidr)) >>> 0
    return numberToIp(mask)
  }

  const maskToCidr = (mask: string): number => {
    const maskNum = ipToNumber(mask)
    return 32 - Math.log2((~maskNum >>> 0) + 1)
  }

  const ipToBinary = (ip: string): string => {
    return ip
      .split(".")
      .map((octet) => Number.parseInt(octet).toString(2).padStart(8, "0"))
      .join(".")
  }

  const getIpClass = (firstOctet: number): string => {
    if (firstOctet >= 0 && firstOctet <= 127) return "A"
    if (firstOctet >= 128 && firstOctet <= 191) return "B"
    if (firstOctet >= 192 && firstOctet <= 223) return "C"
    if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)"
    return "E (Experimental)"
  }

  const getIpType = (ip: string): string => {
    const parts = ip.split(".").map(Number)
    const firstOctet = parts[0]
    const secondOctet = parts[1]

    // Private IP ranges
    if (firstOctet === 10) return "Private"
    if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) return "Private"
    if (firstOctet === 192 && secondOctet === 168) return "Private"

    // Loopback
    if (firstOctet === 127) return "Loopback"

    // Link-local
    if (firstOctet === 169 && secondOctet === 254) return "Link-local"

    return "Public"
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // IP Address validation
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
    const ipMatch = ipAddress.match(ipRegex)

    if (!ipAddress || !ipMatch) {
      newErrors.ipAddress = "Please enter a valid IPv4 address"
    } else {
      const octets = ipMatch.slice(1).map(Number)
      if (octets.some((octet) => octet < 0 || octet > 255)) {
        newErrors.ipAddress = "Each octet must be between 0 and 255"
      }
    }

    // Subnet mask validation
    if (maskFormat === "cidr") {
      const cidr = Number.parseInt(subnetMask.replace("/", ""))
      if (!subnetMask || isNaN(cidr) || cidr < 0 || cidr > 32) {
        newErrors.subnetMask = "CIDR must be between 0 and 32"
      }
    } else {
      const maskMatch = subnetMask.match(ipRegex)
      if (!subnetMask || !maskMatch) {
        newErrors.subnetMask = "Please enter a valid subnet mask"
      } else {
        const octets = maskMatch.slice(1).map(Number)
        if (octets.some((octet) => octet < 0 || octet > 255)) {
          newErrors.subnetMask = "Each octet must be between 0 and 255"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateSubnet = () => {
    if (!validateInputs()) return

    try {
      const ipNum = ipToNumber(ipAddress)
      const firstOctet = Number.parseInt(ipAddress.split(".")[0])

      // Get subnet mask
      let maskStr: string
      let cidrValue: number

      if (maskFormat === "cidr") {
        cidrValue = Number.parseInt(subnetMask.replace("/", ""))
        maskStr = cidrToMask(cidrValue)
      } else {
        maskStr = subnetMask
        cidrValue = maskToCidr(maskStr)
      }

      const maskNum = ipToNumber(maskStr)

      // Calculate network and broadcast
      const networkNum = ipNum & maskNum
      const wildcardNum = ~maskNum >>> 0
      const broadcastNum = networkNum | wildcardNum

      const networkAddr = numberToIp(networkNum)
      const broadcastAddr = numberToIp(broadcastNum)

      // Calculate host range
      const firstHostNum = networkNum + 1
      const lastHostNum = broadcastNum - 1
      const firstHost = numberToIp(firstHostNum)
      const lastHost = numberToIp(lastHostNum)

      // Calculate totals
      const totalAddresses = Math.pow(2, 32 - cidrValue)
      const usableHosts = Math.max(0, totalAddresses - 2)

      // Get IP class and type
      const ipClass = getIpClass(firstOctet)
      const ipType = getIpType(ipAddress)

      // Advanced calculations
      const wildcardMask = numberToIp(wildcardNum)
      const ipBinary = ipToBinary(ipAddress)
      const maskBinary = ipToBinary(maskStr)
      const networkBinary = ipToBinary(networkAddr)
      const broadcastBinary = ipToBinary(broadcastAddr)

      // Reverse DNS
      const reverseDns = ipAddress.split(".").reverse().join(".") + ".in-addr.arpa"

      // IPv6 mappings
      const ipv4Mapped = `::ffff:${ipAddress}`
      const sixToFour = `2002:${ipAddress
        .split(".")
        .map((octet) => Number.parseInt(octet).toString(16).padStart(2, "0"))
        .join("")}::/48`

      setResult({
        input: {
          ipAddress,
          subnetMask: maskStr,
          cidr: cidrValue,
          maskFormat,
        },
        basic: {
          networkAddress: networkAddr,
          broadcastAddress: broadcastAddr,
          firstHost,
          lastHost,
          totalAddresses,
          usableHosts,
          ipClass,
          ipType,
        },
        advanced: {
          wildcardMask,
          ipBinary,
          maskBinary,
          networkBinary,
          broadcastBinary,
          reverseDns,
          ipv4Mapped,
          sixToFour,
          ipInteger: ipNum,
          ipHex: "0x" + ipNum.toString(16).toUpperCase().padStart(8, "0"),
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating subnet. Please check your inputs." })
    }
  }

  const resetCalculator = () => {
    setIpAddress("")
    setSubnetMask("")
    setMaskFormat("cidr")
    setShowAdvanced(false)
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>IPv4 Subnet Calculator - Network Subnetting Tool - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate IPv4 subnet details including network address, broadcast address, host range, and IP class. Advanced networking calculator."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">IPv4 Subnet Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-slate-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/other" className="text-gray-500 hover:text-slate-600">
                Other
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">IPv4 Subnet Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Network className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">IPv4 Subnet Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate subnet details from IPv4 address and subnet mask. Get network address, broadcast address, host
                range, and advanced networking information.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Globe className="w-6 h-6 text-slate-600" />
                      <span>Network Configuration</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter IPv4 address and subnet mask to calculate subnet details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    {/* IP Address Input */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">IPv4 Address</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Network className="h-5 w-5 text-slate-500" />
                        </div>
                        <Input
                          className={`h-12 pl-10 ${errors.ipAddress ? "border-red-300" : ""}`}
                          type="text"
                          placeholder="192.168.1.130"
                          value={ipAddress}
                          onChange={(e) => setIpAddress(e.target.value)}
                        />
                      </div>
                      {errors.ipAddress && <p className="text-red-600 text-xs mt-1">{errors.ipAddress}</p>}
                    </div>

                    {/* Subnet Mask Input */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Subnet Mask Format</Label>
                      <Select value={maskFormat} onValueChange={setMaskFormat}>
                        <SelectTrigger className="h-12 mb-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cidr">CIDR Notation (/24)</SelectItem>
                          <SelectItem value="dotted">Dotted Decimal (255.255.255.0)</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Shield className="h-5 w-5 text-slate-500" />
                        </div>
                        <Input
                          className={`h-12 pl-10 ${errors.subnetMask ? "border-red-300" : ""}`}
                          type="text"
                          placeholder={maskFormat === "cidr" ? "/24 or 24" : "255.255.255.0"}
                          value={subnetMask}
                          onChange={(e) => setSubnetMask(e.target.value)}
                        />
                      </div>
                      {errors.subnetMask && <p className="text-red-600 text-xs mt-1">{errors.subnetMask}</p>}
                    </div>

                    {/* Advanced Options Toggle */}
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Show Advanced Details</Label>
                          <p className="text-xs text-gray-500 mt-1">
                            Include binary representation, wildcard mask, and IPv6 mappings
                          </p>
                        </div>
                        <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateSubnet}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800"
                      >
                        Calculate Subnet
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-gray-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center mb-3 shadow-lg">
                      <Network className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-700 tracking-tight">Subnet Details</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <p className="text-lg font-bold text-slate-900">{result.basic.networkAddress}</p>
                          <p className="text-gray-600 text-sm">Network Address</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <p className="text-lg font-bold text-slate-900">
                            {result.basic.usableHosts.toLocaleString()}
                          </p>
                          <p className="text-gray-600 text-sm">Usable Hosts</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <p className="text-lg font-bold text-slate-900">Class {result.basic.ipClass}</p>
                          <p className="text-gray-600 text-sm">{result.basic.ipType} IP</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Network className="w-8 h-8 text-slate-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter an IPv4 address and subnet mask, then click{" "}
                          <span className="font-semibold text-slate-600">Calculate</span> to see subnet details.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results */}
            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-slate-600" />
                      <span>Subnet Calculation Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Basic Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Network Information</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Network Address:</strong> {result.basic.networkAddress}
                          </p>
                          <p>
                            <strong>Broadcast Address:</strong> {result.basic.broadcastAddress}
                          </p>
                          <p>
                            <strong>Subnet Mask:</strong> {result.input.subnetMask}
                          </p>
                          <p>
                            <strong>CIDR Notation:</strong> /{result.input.cidr}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Host Information</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>First Host:</strong> {result.basic.firstHost}
                          </p>
                          <p>
                            <strong>Last Host:</strong> {result.basic.lastHost}
                          </p>
                          <p>
                            <strong>Total Addresses:</strong> {result.basic.totalAddresses.toLocaleString()}
                          </p>
                          <p>
                            <strong>Usable Hosts:</strong> {result.basic.usableHosts.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">IP Classification</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>IP Class:</strong> {result.basic.ipClass}
                          </p>
                          <p>
                            <strong>IP Type:</strong> {result.basic.ipType}
                          </p>
                          <p>
                            <strong>Input IP:</strong> {result.input.ipAddress}
                          </p>
                          <p>
                            <strong>Mask Format:</strong> {result.input.maskFormat.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Results */}
                    {showAdvanced && (
                      <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center">
                          <Binary className="w-5 h-5 mr-2" />
                          Advanced Details
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-slate-700 mb-3">Binary Representation</h4>
                            <div className="space-y-2 text-xs font-mono text-gray-700">
                              <p>
                                <strong>IP Address:</strong>
                                <br />
                                {result.advanced.ipBinary}
                              </p>
                              <p>
                                <strong>Subnet Mask:</strong>
                                <br />
                                {result.advanced.maskBinary}
                              </p>
                              <p>
                                <strong>Network:</strong>
                                <br />
                                {result.advanced.networkBinary}
                              </p>
                              <p>
                                <strong>Broadcast:</strong>
                                <br />
                                {result.advanced.broadcastBinary}
                              </p>
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-700 mb-3">Additional Formats</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                              <p>
                                <strong>Wildcard Mask:</strong> {result.advanced.wildcardMask}
                              </p>
                              <p>
                                <strong>IP as Integer:</strong> {result.advanced.ipInteger.toLocaleString()}
                              </p>
                              <p>
                                <strong>IP as Hex:</strong> {result.advanced.ipHex}
                              </p>
                              <p>
                                <strong>Reverse DNS:</strong> {result.advanced.reverseDns}
                              </p>
                              <p>
                                <strong>IPv4-mapped IPv6:</strong> {result.advanced.ipv4Mapped}
                              </p>
                              <p>
                                <strong>6to4 Prefix:</strong> {result.advanced.sixToFour}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Calculation Steps */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-700 mb-2">Calculation Steps:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          1. Convert IP and mask to binary: {result.input.ipAddress} & {result.input.subnetMask}
                        </p>
                        <p>2. Perform bitwise AND: Network = {result.basic.networkAddress}</p>
                        <p>3. Calculate wildcard mask: {result.advanced?.wildcardMask || "N/A"}</p>
                        <p>4. Broadcast = Network OR Wildcard: {result.basic.broadcastAddress}</p>
                        <p>
                          5. Host range: {result.basic.firstHost} - {result.basic.lastHost}
                        </p>
                        <p>
                          6. Total hosts: 2^(32-{result.input.cidr}) = {result.basic.totalAddresses.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-gray-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center mr-3 shadow-lg">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-700 tracking-tight">
                    Understanding IPv4 Subnetting
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">Key Concepts</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Network Address:</strong> First address in subnet (all host bits = 0)
                          </li>
                          <li>
                            <strong>Broadcast Address:</strong> Last address in subnet (all host bits = 1)
                          </li>
                          <li>
                            <strong>Host Range:</strong> Usable addresses between network and broadcast
                          </li>
                          <li>
                            <strong>CIDR Notation:</strong> /24 means first 24 bits are network portion
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-700 mb-3">IP Classes (Legacy)</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Class A:</strong> 0-127 (8-bit network, 24-bit host)
                          </li>
                          <li>
                            <strong>Class B:</strong> 128-191 (16-bit network, 16-bit host)
                          </li>
                          <li>
                            <strong>Class C:</strong> 192-223 (24-bit network, 8-bit host)
                          </li>
                          <li>
                            <strong>Class D:</strong> 224-239 (Multicast)
                          </li>
                          <li>
                            <strong>Class E:</strong> 240-255 (Experimental)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">Example Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>IP: 192.168.1.130/24</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Subnet mask: 255.255.255.0</p>
                          <p>Network: 192.168.1.0</p>
                          <p>Broadcast: 192.168.1.255</p>
                          <p>Host range: 192.168.1.1 - 192.168.1.254</p>
                          <p>Total addresses: 2^(32-24) = 256</p>
                          <p>Usable hosts: 256 - 2 = 254</p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-700 mb-3">Private IP Ranges</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>10.0.0.0/8:</strong> 10.0.0.0 - 10.255.255.255
                          </li>
                          <li>
                            <strong>172.16.0.0/12:</strong> 172.16.0.0 - 172.31.255.255
                          </li>
                          <li>
                            <strong>192.168.0.0/16:</strong> 192.168.0.0 - 192.168.255.255
                          </li>
                        </ul>
                      </div>
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
