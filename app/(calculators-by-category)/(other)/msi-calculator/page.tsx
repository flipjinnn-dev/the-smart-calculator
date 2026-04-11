import { Metadata } from "next"
import MSICalculatorClient from "./msi-calculator-client"

export const metadata: Metadata = {
  title: "MSI Calculator – Power Supply, Wattage & PC Build Calculator",
  description: "An MSI calculator helps you estimate your PC's power consumption, PSU wattage requirements, and component compatibility. It analyzes CPU, GPU, RAM, storage, and other hardware to calculate total wattage and recommend the ideal power supply for stable performance.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/msi-calculator"
  }
}

export default function MSICalculatorPage() {
  return <MSICalculatorClient />
}
