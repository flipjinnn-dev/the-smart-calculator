"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Network, Calculator, RotateCcw, Globe, Shield, Binary } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
export default function IpSubnetCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('ip-subnet-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'ip-subnet-calculator',
    language,
    "calculator-guide"
  )
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  }
  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "ipv4_address_2": "",
    "subnet_mask_format_3": "",
    "cidr_notation_24_4": "",
    "dotted_decimal_2552552550_5": "",
    "show_advanced_details_6": "",
    "include_binary_representation_wildcard_mask_and_ip_7": "",
    "calculate_8": "",
    "reset_9": "",
    "subnet_details_10": "",
    "network_address_11": "",
    "usable_hosts_12": "",
    "class_13": "",
    "ip_14": "",
    "enter_an_ipv4_address_and_subnet_mask_then_click_15": "",
    "calculate_16": "",
    "to_see_subnet_details_17": "",
    "subnet_calculation_results_18": "",
    "network_information_19": "",
    "network_address_20": "",
    "broadcast_address_21": "",
    "subnet_mask_22": "",
    "cidr_notation_23": "",
    "host_information_24": "",
    "first_host_25": "",
    "last_host_26": "",
    "total_addresses_27": "",
    "usable_hosts_28": "",
    "ip_classification_29": "",
    "ip_class_30": "",
    "ip_type_31": "",
    "input_ip_32": "",
    "mask_format_33": "",
    "advanced_details_34": "",
    "binary_representation_35": "",
    "ip_address_36": "",
    "subnet_mask_37": "",
    "network_38": "",
    "broadcast_39": "",
    "additional_formats_40": "",
    "wildcard_mask_41": "",
    "ip_as_integer_42": "",
    "ip_as_hex_43": "",
    "reverse_dns_44": "",
    "ipv4mapped_ipv6_45": "",
    "k_6to4_prefix_46": "",
    "calculation_steps_47": "",
    "k_1_convert_ip_and_mask_to_binary_48": "",
    "k_2_perform_bitwise_and_network_49": "",
    "k_3_calculate_mask_50": "",
    "k_4_broadcast_network_or_wildcard_51": "",
    "k_5_host_range_52": "",
    "k_6_total_hosts_232_53": "",
    "understanding_ipv4_subnetting_54": "",
    "key_concepts_55": "",
    "network_address_56": "",
    "first_address_in_subnet_all_host_bits_0_57": "",
    "broadcast_address_58": "",
    "last_address_in_subnet_all_host_bits_1_59": "",
    "host_range_60": "",
    "usable_addresses_between_network_and_broadcast_61": "",
    "cidr_notation_62": "",
    "k_24_means_first_24_bits_are_network_portion_63": "",
    "ip_classes_legacy_64": "",
    "class_a_65": "",
    "k_0127_8bit_network_24bit_host_66": "",
    "class_b_67": "",
    "k_128191_16bit_network_16bit_host_68": "",
    "class_c_69": "",
    "k_192223_24bit_network_8bit_host_70": "",
    "class_d_71": "",
    "k_224239_multicast_72": "",
    "class_e_73": "",
    "k_240255_experimental_74": "",
    "example_calculation_75": "",
    "ip_192168113024_76": "",
    "subnet_mask_2552552550_77": "",
    "network_19216810_78": "",
    "broadcast_1921681255_79": "",
    "host_range_19216811_1921681254_80": "",
    "total_addresses_23224_256_81": "",
    "usable_hosts_256_2_254_82": "",
    "private_ip_ranges_83": "",
    "k_100008_84": "",
    "k_10000_10255255255_85": "",
    "k_172160012_86": "",
    "k_1721600_17231255255_87": "",
    "k_1921680016_88": "",
    "k_19216800_192168255255_89": "",
    "network_configuration_0": "",
    "enter_ipv4_address_and_subnet_mask_to_calculate_su_1": ""
  };
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Inputs
  const [ipAddress, setIpAddress] = useState("");
  const [subnetMask, setSubnetMask] = useState("");
  const [maskFormat, setMaskFormat] = useState("cidr"); // cidr or dotted
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Helper functions for IP operations
  const ipToNumber = (ip: string): number => {
    const parts = ip.split(".").map(Number);
    return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
  };
  const numberToIp = (num: number): string => {
    return [num >>> 24 & 255, num >>> 16 & 255, num >>> 8 & 255, num & 255].join(".");
  };
  const cidrToMask = (cidr: number): string => {
    const mask = 0xffffffff << 32 - cidr >>> 0;
    return numberToIp(mask);
  };
  const maskToCidr = (mask: string): number => {
    const maskNum = ipToNumber(mask);
    return 32 - Math.log2((~maskNum >>> 0) + 1);
  };
  const ipToBinary = (ip: string): string => {
    return ip.split(".").map(octet => Number.parseInt(octet).toString(2).padStart(8, "0")).join(".");
  };
  const getIpClass = (firstOctet: number): string => {
    if (firstOctet >= 0 && firstOctet <= 127) return "A";
    if (firstOctet >= 128 && firstOctet <= 191) return "B";
    if (firstOctet >= 192 && firstOctet <= 223) return "C";
    if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
    return "E (Experimental)";
  };
  const getIpType = (ip: string): string => {
    const parts = ip.split(".").map(Number);
    const firstOctet = parts[0];
    const secondOctet = parts[1];

    // Private IP ranges
    if (firstOctet === 10) return "Private";
    if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) return "Private";
    if (firstOctet === 192 && secondOctet === 168) return "Private";

    // Loopback
    if (firstOctet === 127) return "Loopback";

    // Link-local
    if (firstOctet === 169 && secondOctet === 254) return "Link-local";
    return "Public";
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    // IP Address validation
    const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipMatch = ipAddress.match(ipRegex);
    if (!ipAddress || !ipMatch) {
      newErrors.ipAddress = "Please enter a valid IPv4 address";
    } else {
      const octets = ipMatch.slice(1).map(Number);
      if (octets.some(octet => octet < 0 || octet > 255)) {
        newErrors.ipAddress = "Each octet must be between 0 and 255";
      }
    }

    // Subnet mask validation
    if (maskFormat === "cidr") {
      const cidr = Number.parseInt(subnetMask.replace("/", ""));
      if (!subnetMask || isNaN(cidr) || cidr < 0 || cidr > 32) {
        newErrors.subnetMask = "CIDR must be between 0 and 32";
      }
    } else {
      const maskMatch = subnetMask.match(ipRegex);
      if (!subnetMask || !maskMatch) {
        newErrors.subnetMask = "Please enter a valid subnet mask";
      } else {
        const octets = maskMatch.slice(1).map(Number);
        if (octets.some(octet => octet < 0 || octet > 255)) {
          newErrors.subnetMask = "Each octet must be between 0 and 255";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateSubnet = () => {
    if (!validateInputs()) return;
    try {
      const ipNum = ipToNumber(ipAddress);
      const firstOctet = Number.parseInt(ipAddress.split(".")[0]);

      // Get subnet mask
      let maskStr: string;
      let cidrValue: number;
      if (maskFormat === "cidr") {
        cidrValue = Number.parseInt(subnetMask.replace("/", ""));
        maskStr = cidrToMask(cidrValue);
      } else {
        maskStr = subnetMask;
        cidrValue = maskToCidr(maskStr);
      }
      const maskNum = ipToNumber(maskStr);

      // Calculate and broadcast
      const networkNum = ipNum & maskNum;
      const wildcardNum = ~maskNum >>> 0;
      const broadcastNum = networkNum | wildcardNum;
      const networkAddr = numberToIp(networkNum);
      const broadcastAddr = numberToIp(broadcastNum);

      // Calculate range
      const firstHostNum = networkNum + 1;
      const lastHostNum = broadcastNum - 1;
      const firstHost = numberToIp(firstHostNum);
      const lastHost = numberToIp(lastHostNum);

      // Calculate
      const totalAddresses = Math.pow(2, 32 - cidrValue);
      const usableHosts = Math.max(0, totalAddresses - 2);

      // Get IP class and type
      const ipClass = getIpClass(firstOctet);
      const ipType = getIpType(ipAddress);

      // Advanced calculations
      const wildcardMask = numberToIp(wildcardNum);
      const ipBinary = ipToBinary(ipAddress);
      const maskBinary = ipToBinary(maskStr);
      const networkBinary = ipToBinary(networkAddr);
      const broadcastBinary = ipToBinary(broadcastAddr);

      // Reverse DNS
      const reverseDns = ipAddress.split(".").reverse().join(".") + ".in-addr.arpa";

      // IPv6 mappings
      const ipv4Mapped = `::ffff:${ipAddress}`;
      const sixToFour = `2002:${ipAddress.split(".").map(octet => Number.parseInt(octet).toString(16).padStart(2, "0")).join("")}::/48`;
      setResult({
        input: {
          ipAddress,
          subnetMask: maskStr,
          cidr: cidrValue,
          maskFormat
        },
        basic: {
          networkAddress: networkAddr,
          broadcastAddress: broadcastAddr,
          firstHost,
          lastHost,
          totalAddresses,
          usableHosts,
          ipClass,
          ipType
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
          ipHex: "0x" + ipNum.toString(16).toUpperCase().padStart(8, "0")
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating subnet. Please check your inputs."
      });
    }
  };
  const resetCalculator = () => {
    setIpAddress("");
    setSubnetMask("");
    setMaskFormat("cidr");
    setShowAdvanced(false);
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Network className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Globe className="w-6 h-6 text-slate-600" />
                    <span>{contentData.network_configuration_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_ipv4_address_and_subnet_mask_to_calculate_su_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>}

                  {/* IP Address Input */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.ipv4_address_2}</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Network className="h-5 w-5 text-slate-500" />
                      </div>
                      <Input className={`h-12 pl-10 ${errors.ipAddress ? "border-red-300" : ""}`} type="text" placeholder="192.168.1.130" value={ipAddress} onChange={e => setIpAddress(e.target.value)} />
                    </div>
                    {errors.ipAddress && <p className="text-red-600 text-xs mt-1">{errors.ipAddress}</p>}
                  </div>

                  {/* Subnet Mask Input */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.subnet_mask_format_3}</Label>
                    <Select value={maskFormat} onValueChange={setMaskFormat}>
                      <SelectTrigger className="h-12 mb-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cidr">{contentData.cidr_notation_24_4}</SelectItem>
                        <SelectItem value="dotted">{contentData.dotted_decimal_2552552550_5}</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="h-5 w-5 text-slate-500" />
                      </div>
                      <Input className={`h-12 pl-10 ${errors.subnetMask ? "border-red-300" : ""}`} type="text" placeholder={maskFormat === "cidr" ? "/24 or 24" : "255.255.255.0"} value={subnetMask} onChange={e => setSubnetMask(e.target.value)} />
                    </div>
                    {errors.subnetMask && <p className="text-red-600 text-xs mt-1">{errors.subnetMask}</p>}
                  </div>

                  {/* Advanced Options Toggle */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">{contentData.show_advanced_details_6}</Label>
                        <p className="text-xs text-gray-500 mt-1">{contentData.include_binary_representation_wildcard_mask_and_ip_7}</p>
                      </div>
                      <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={calculateSubnet} className="flex-1 h-12 text-lg bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800">{contentData.calculate_8}</Button>
                    <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_9}</Button>
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
                  <CardTitle className="text-2xl font-bold text-slate-700 tracking-tight">{contentData.subnet_details_10}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-3 w-full">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <p className="text-lg font-bold text-slate-900">{result.basic.networkAddress}</p>
                      <p className="text-gray-600 text-sm">{contentData.network_address_11}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <p className="text-lg font-bold text-slate-900">
                        {result.basic.usableHosts.toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-sm">{contentData.usable_hosts_12}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <p className="text-lg font-bold text-slate-900">{contentData.class_13}{result.basic.ipClass}</p>
                      <p className="text-gray-600 text-sm">{result.basic.ipType}{contentData.ip_14}</p>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Network className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_an_ipv4_address_and_subnet_mask_then_click_15}{" "}
                      <span className="font-semibold text-slate-600">{contentData.calculate_16}</span>{contentData.to_see_subnet_details_17}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Results */}
          {showResult && result && <div className="mt-8">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Calculator className="w-6 h-6 text-slate-600" />
                  <span>{contentData.subnet_calculation_results_18}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* Basic Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.network_information_19}</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>{contentData.network_address_20}</strong> {result.basic.networkAddress}
                      </p>
                      <p>
                        <strong>{contentData.broadcast_address_21}</strong> {result.basic.broadcastAddress}
                      </p>
                      <p>
                        <strong>{contentData.subnet_mask_22}</strong> {result.input.subnetMask}
                      </p>
                      <p>
                        <strong>{contentData.cidr_notation_23}</strong> /{result.input.cidr}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">{contentData.host_information_24}</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>{contentData.first_host_25}</strong> {result.basic.firstHost}
                      </p>
                      <p>
                        <strong>{contentData.last_host_26}</strong> {result.basic.lastHost}
                      </p>
                      <p>
                        <strong>{contentData.total_addresses_27}</strong> {result.basic.totalAddresses.toLocaleString()}
                      </p>
                      <p>
                        <strong>{contentData.usable_hosts_28}</strong> {result.basic.usableHosts.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.ip_classification_29}</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>{contentData.ip_class_30}</strong> {result.basic.ipClass}
                      </p>
                      <p>
                        <strong>{contentData.ip_type_31}</strong> {result.basic.ipType}
                      </p>
                      <p>
                        <strong>{contentData.input_ip_32}</strong> {result.input.ipAddress}
                      </p>
                      <p>
                        <strong>{contentData.mask_format_33}</strong> {result.input.maskFormat.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advanced Results */}
                {showAdvanced && <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center">
                    <Binary className="w-5 h-5 mr-2" />{contentData.advanced_details_34}</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-700 mb-3">{contentData.binary_representation_35}</h4>
                      <div className="space-y-2 text-xs font-mono text-gray-700">
                        <p>
                          <strong>{contentData.ip_address_36}</strong>
                          <br />
                          {result.advanced.ipBinary}
                        </p>
                        <p>
                          <strong>{contentData.subnet_mask_37}</strong>
                          <br />
                          {result.advanced.maskBinary}
                        </p>
                        <p>
                          <strong>{contentData.network_38}</strong>
                          <br />
                          {result.advanced.networkBinary}
                        </p>
                        <p>
                          <strong>{contentData.broadcast_39}</strong>
                          <br />
                          {result.advanced.broadcastBinary}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-3">{contentData.additional_formats_40}</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>
                          <strong>{contentData.wildcard_mask_41}</strong> {result.advanced.wildcardMask}
                        </p>
                        <p>
                          <strong>{contentData.ip_as_integer_42}</strong> {result.advanced.ipInteger.toLocaleString()}
                        </p>
                        <p>
                          <strong>{contentData.ip_as_hex_43}</strong> {result.advanced.ipHex}
                        </p>
                        <p>
                          <strong>{contentData.reverse_dns_44}</strong> {result.advanced.reverseDns}
                        </p>
                        <p>
                          <strong>{contentData.ipv4mapped_ipv6_45}</strong> {result.advanced.ipv4Mapped}
                        </p>
                        <p>
                          <strong>{contentData.k_6to4_prefix_46}</strong> {result.advanced.sixToFour}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>}

                {/* Calculation Steps */}
                <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-2">{contentData.calculation_steps_47}</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>{contentData.k_1_convert_ip_and_mask_to_binary_48}{result.input.ipAddress} & {result.input.subnetMask}
                    </p>
                    <p>{contentData.k_2_perform_bitwise_and_network_49}{result.basic.networkAddress}</p>
                    <p>{contentData.k_3_calculate_mask_50}{result.advanced?.wildcardMask || "N/A"}</p>
                    <p>{contentData.k_4_broadcast_network_or_wildcard_51}{result.basic.broadcastAddress}</p>
                    <p>{contentData.k_5_host_range_52}{result.basic.firstHost} - {result.basic.lastHost}
                    </p>
                    <p>{contentData.k_6_total_hosts_232_53}{result.input.cidr}) = {result.basic.totalAddresses.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Enterprise SEO ROI Calculator",
            calculatorHref: "/enterprise-seo-roi-calculator",
            calculatorDescription: "Calculate the return on investment (ROI) for enterprise SEO"
          }, {
            calculatorName: "Piecewise Function Calculator",
            calculatorHref: "/piecewise-function-calculator-grapher",
            calculatorDescription: "Define each piece of your piecewise function with expressions and domains"
          },
          ]}
            color="gray"
            title="Related Other Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-gray-100 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-600 to-gray-700 flex items-center justify-center mr-3 shadow-lg">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-700 tracking-tight">{contentData.understanding_ipv4_subnetting_54}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.key_concepts_55}</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>
                          <strong>{contentData.network_address_56}</strong>{contentData.first_address_in_subnet_all_host_bits_0_57}</li>
                        <li>
                          <strong>{contentData.broadcast_address_58}</strong>{contentData.last_address_in_subnet_all_host_bits_1_59}</li>
                        <li>
                          <strong>{contentData.host_range_60}</strong>{contentData.usable_addresses_between_network_and_broadcast_61}</li>
                        <li>
                          <strong>{contentData.cidr_notation_62}</strong>{contentData.k_24_means_first_24_bits_are_network_portion_63}</li>
                      </ul>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.ip_classes_legacy_64}</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>
                          <strong>{contentData.class_a_65}</strong>{contentData.k_0127_8bit_network_24bit_host_66}</li>
                        <li>
                          <strong>{contentData.class_b_67}</strong>{contentData.k_128191_16bit_network_16bit_host_68}</li>
                        <li>
                          <strong>{contentData.class_c_69}</strong>{contentData.k_192223_24bit_network_8bit_host_70}</li>
                        <li>
                          <strong>{contentData.class_d_71}</strong>{contentData.k_224239_multicast_72}</li>
                        <li>
                          <strong>{contentData.class_e_73}</strong>{contentData.k_240255_experimental_74}</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.example_calculation_75}</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.ip_192168113024_76}</strong>
                      </p>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>{contentData.subnet_mask_2552552550_77}</p>
                        <p>{contentData.network_19216810_78}</p>
                        <p>{contentData.broadcast_1921681255_79}</p>
                        <p>{contentData.host_range_19216811_1921681254_80}</p>
                        <p>{contentData.total_addresses_23224_256_81}</p>
                        <p>{contentData.usable_hosts_256_2_254_82}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.private_ip_ranges_83}</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>
                          <strong>{contentData.k_100008_84}</strong>{contentData.k_10000_10255255255_85}</li>
                        <li>
                          <strong>{contentData.k_172160012_86}</strong>{contentData.k_1721600_17231255255_87}</li>
                        <li>
                          <strong>{contentData.k_1921680016_88}</strong>{contentData.k_19216800_192168255255_89}</li>
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
  </>;
}