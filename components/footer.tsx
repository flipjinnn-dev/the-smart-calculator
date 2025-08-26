import React from 'react'
import Logo from './logo'
import Link from 'next/link'
import { Instagram, TwitterIcon, LinkedinIcon } from 'lucide-react'
import { FaPinterestP } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
export const Footer = () => {
  return (
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <Logo />
                  <span className="text-2xl font-bold">Smart Calculator</span>
                </div>
                <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                  Your go-to destination for free, accurate, and easy-to-use online calculators. Trusted by millions of
                  users worldwide.
                </p>
                <div className="flex space-x-4">
                  <Link href="https://www.pinterest.com/thesmartcalculators/">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <span className="text-white font-bold"><FaPinterestP /></span>
                    </div>
                  </Link>
                  <Link href="https://x.com/SmartCalculat0r">
                    <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                      <span className="text-white font-bold"><TwitterIcon /></span>
                    </div>
                  </Link>
                  <Link href="https://www.instagram.com/thesmartcalculators/">
                    <div className="w-10 h-10 bg-pink-700 rounded-lg flex items-center justify-center hover:bg-pink-800 transition-colors cursor-pointer">
                      <span className="text-white font-bold"><Instagram /></span>
                    </div>
                  </Link>
                  <Link href="https://www.youtube.com/@TheSmartCalculators">
                    <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-800 transition-colors cursor-pointer">
                      <span className="text-white font-extrabold font-xl"><AiOutlineYoutube /></span>
                    </div>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Most Used Categories</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link
                      href="/financial"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Financial Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/health"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Health & Fitness
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/math"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Math Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/physics"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Physics Calculators
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Company</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Smart Calculator. All rights reserved.</p>
                <div className="flex space-x-6 text-gray-400">
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
  )
}
