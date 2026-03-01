"use client"

import React, { useState, useEffect } from 'react';
import Logo from './logo'
import Link from 'next/link'
import { Instagram, TwitterIcon, Mail } from 'lucide-react'
import { FaPinterestP } from "react-icons/fa"
import { AiOutlineLinkedin, AiOutlineYoutube } from "react-icons/ai"
import { getLocalizedCategoryUrl } from '@/lib/url-utils'
import { getAllCalculatorsByCategory } from '@/lib/calculator-data'
import { getLocalizedCalculatorData, getLocalizedCalculatorHref } from '@/lib/language-utils'
import { getCalculatorFileName } from '@/lib/calculator-data'
import { getAllGames } from '@/lib/games-data'

interface FooterProps {
  language?: string
}

interface FooterItem {
  name: string
  href: string
}

const FooterClient: React.FC<FooterProps> = ({ language = 'en' }) => {
  const [footerContent, setFooterContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await import(`@/app/content/footer/${language}.json`);
        setFooterContent(content.default || content);
      } catch (error) {
        console.error('Error loading footer content:', error);
        const fallback = await import(`@/app/content/footer/en.json`);
        setFooterContent(fallback.default || fallback);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [language]);

  if (loading || !footerContent) {
    return <footer className="bg-gray-900 text-white py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">Loading...</div></footer>;
  }

  // Get all calculators organized by category
  const calculatorsByCategory = getAllCalculatorsByCategory()
  
  // Add games category dynamically from games-data.ts
  const allGames = getAllGames()
  const gamesWithCategory = allGames.map(game => ({
    ...game,
    category: 'games'
  }))
  
  calculatorsByCategory['games'] = gamesWithCategory
  
  // Localize calculator names and hrefs
  const localizedCalculatorsByCategory: Record<string, any[]> = {}
  Object.keys(calculatorsByCategory).forEach(category => {
    if (category === 'games') {
      // Games are only in English, keep as is
      localizedCalculatorsByCategory[category] = calculatorsByCategory[category]
    } else {
      localizedCalculatorsByCategory[category] = calculatorsByCategory[category].map(calc => {
        const fileName = getCalculatorFileName(calc.id)
        const localizedData = getLocalizedCalculatorData(fileName, language)
        return {
          ...calc,
          name: localizedData.name,
          href: getLocalizedCalculatorHref(fileName, language)
        }
      })
    }
  })

  // Category name mappings for different languages
  const categoryNames: Record<string, Record<string, string>> = {
    en: {
      financial: "Financial Calculators",
      health: "Health & Fitness Calculators",
      maths: "Math Calculators",
      physics: "Physics Calculators",
      construction: "Construction Calculators",
      food: "Food & Nutrition Calculators",
      sports: "Sports Calculators",
      "other-calculators": "Other Calculators",
      software: "Software Calculators",
      business: "Business Calculators",
      games: "Games & Fun"
    },
    br: {
      financial: "Calculadoras Financeiras",
      health: "Calculadoras de Saúde e Fitness",
      maths: "Calculadoras Matemáticas",
      physics: "Calculadoras de Física",
      construction: "Calculadoras de Construção",
      food: "Calculadoras de Alimentação e Nutrição",
      sports: "Calculadoras Esportivas",
      "other-calculators": "Outras Calculadoras",
      software: "Calculadoras de Software",
      business: "Calculadoras de Negócios",
      games: "Jogos e Diversão"
    },
    pl: {
      financial: "Kalkulatory Finansowe",
      health: "Kalkulatory Zdrowia i Fitness",
      maths: "Kalkulatory Matematyczne",
      physics: "Kalkulatory Fizyczne",
      construction: "Kalkulatory Budowlane",
      food: "Kalkulatory Żywności i Odżywiania",
      sports: "Kalkulatory Sportowe",
      "other-calculators": "Inne Kalkulatory",
      software: "Kalkulatory Oprogramowania",
      business: "Kalkulatory Biznesowe",
      games: "Gry i Zabawa"
    },
    de: {
      financial: "Finanzrechner",
      health: "Gesundheits- und Fitnessrechner",
      maths: "Mathematikrechner",
      physics: "Physikrechner",
      construction: "Baurechner",
      food: "Ernährungs- und Lebensmittelrechner",
      sports: "Sportrechner",
      "other-calculators": "Andere Rechner",
      software: "Softwarerechner",
      business: "Geschäftsrechner",
      games: "Spiele & Spaß"
    },
    es: {
      financial: "Calculadoras Financieras",
      health: "Calculadoras de Salud y Fitness",
      maths: "Calculadoras Matemáticas",
      physics: "Calculadoras de Física",
      construction: "Calculadoras de Construcción",
      food: "Calculadoras de Alimentación y Nutrición",
      sports: "Calculadoras Deportivas",
      "other-calculators": "Otras Calculadoras",
      software: "Calculadoras de Software",
      business: "Calculadoras de Negocios",
      games: "Juegos y Diversión"
    }
  }

  const categoryItems = language === 'en' 
    ? footerContent.categories.items.map((item: FooterItem) => {
        if (item.name === "Other Calculators") {
          return {
            ...item,
            href: getLocalizedCategoryUrl("other", language)
          }
        }
        const categorySlug = item.href.replace(/^\//, '')
        return {
          ...item,
          href: getLocalizedCategoryUrl(categorySlug, language)
        }
      })
    : footerContent.categories.items

  const companyItems = footerContent.companyLinks.items.map((item: FooterItem) => {
    if (item.href === "/") {
      if (language !== 'en') {
        return {
          ...item,
          href: `/${language}`
        }
      }
      return item
    }
    
    const nameToEnglishHrefMap: Record<string, string> = {
      "Sobre Nós": "/about-us",
      "Contate-Nos": "/contact-us",
      "Política de Privacidade": "/privacy-policy",
      "Termos e Condições": "/terms-and-conditions",
      "Mapa do Site": "/sitemap",
      "Política Editorial": "/editorial-policy-mission-statement",
      "O Nas": "/about-us",
      "Kontakt": "/contact-us",
      "Polityka Prywatności": "/privacy-policy",
      "Regulamin": "/terms-and-conditions",
      "Mapa Strony": "/sitemap",
      "Polityka Redakcyjna": "/editorial-policy-mission-statement",
      "Über Uns": "/about-us",
      "Datenschutz": "/privacy-policy",
      "Allgemeine Geschäftsbedingungen": "/terms-and-conditions",
      "Redaktionelle Richtlinien": "/editorial-policy-mission-statement",
      "Sobre Nosotros": "/about-us",
      "Contáctenos": "/contact-us",
      "Política de Privacidad": "/privacy-policy",
      "Términos y Condiciones": "/terms-and-conditions",
      "Mapa del Sitio": "/sitemap",
      "Política Editorial (ES)": "/editorial-policy-mission-statement"
    }
    
    if (nameToEnglishHrefMap[item.name]) {
      return {
        ...item,
        href: nameToEnglishHrefMap[item.name]
      }
    }
    
    if (item.href === "/about-us" || item.href === "/contact-us" || 
        item.href === "/privacy-policy" || item.href === "/terms-and-conditions" ||
        item.href === "/sitemap" || item.href === "/editorial-policy-mission-statement") {
      return item
    }
    
    return item
  })

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Logo />
              <span className="text-2xl font-bold">{footerContent.company.name}</span>
            </div>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              {footerContent.company.description}
            </p>
            {footerContent.company.email && (
              <div className="mb-6">
                <Link 
                  href={`mailto:${footerContent.company.email}`}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>{footerContent.company.email}</span>
                </Link>
              </div>
            )}
            <div className="flex space-x-4">
              <Link href={footerContent.social.pinterest} aria-label="Visit our Pinterest page">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <span className="text-white font-bold"><FaPinterestP /></span>
                </div>
              </Link>
              <Link href={footerContent.social.twitter} aria-label="Visit our Twitter page">
                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-white font-bold"><TwitterIcon /></span>
                </div>
              </Link>
              <Link href={footerContent.social.instagram} aria-label="Visit our Instagram page">
                <div className="w-10 h-10 bg-pink-700 rounded-lg flex items-center justify-center hover:bg-pink-800 transition-colors cursor-pointer">
                  <span className="text-white font-bold"><Instagram /></span>
                </div>
              </Link>
              <Link href={footerContent.social.youtube} aria-label="Visit our YouTube channel">
                <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-800 transition-colors cursor-pointer">
                  <span className="text-white font-extrabold font-xl"><AiOutlineYoutube /></span>
                </div>
              </Link>
              <Link href={"https://www.linkedin.com/company/smart-calculator/"} aria-label="Visit our LinkedIn page">
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                  <span className="text-white font-extrabold font-3xl"><AiOutlineLinkedin /></span>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">{footerContent.categories.title}</h3>
            <ul className="space-y-3 text-gray-400">
              {categoryItems.map((item: FooterItem, index: number) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">{footerContent.popularCalculators.title}</h3>
            <ul className="space-y-3 text-gray-400">
              {footerContent.popularCalculators.items.map((item: FooterItem, index: number) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">{footerContent.companyLinks.title}</h3>
            <ul className="space-y-3 text-gray-400">
              {companyItems.map((item: FooterItem, index: number) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All Calculators Section */}
        {footerContent.allCalculators?.showInFooter && (
          <div className="border-t border-gray-800 pt-12 mb-12">
            <h3 className="font-bold mb-8 text-2xl text-center">{footerContent.allCalculators.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.keys(localizedCalculatorsByCategory).map((category) => {
                const categoryName = categoryNames[language]?.[category] || category
                const calcs = localizedCalculatorsByCategory[category]
                
                return (
                  <div key={category}>
                    <h4 className="font-semibold text-lg mb-4 text-blue-400">{categoryName}</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      {calcs.map((calc: any) => (
                        <li key={calc.id}>
                          <Link
                            href={calc.href}
                            className="hover:text-white transition-colors duration-200"
                          >
                            {calc.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center text-center justify-center space-y-4">
            <p className="text-gray-400">&copy; {footerContent.company.copyright}</p>
            
            {/* DMCA Protection Badge */}
            <a 
              href="//www.dmca.com/Protection/Status.aspx?ID=675e8f05-64e3-408f-bd2a-c9f92818a42f" 
              title="DMCA.com Protection Status" 
              className="dmca-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://images.dmca.com/Badges/dmca_protected_sml_120l.png?ID=675e8f05-64e3-408f-bd2a-c9f92818a42f" 
                alt="DMCA.com Protection Status"
                width="120"
                height="24"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterClient;
