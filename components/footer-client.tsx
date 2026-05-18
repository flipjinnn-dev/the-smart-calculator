"use client"

import React, { useState, useEffect } from 'react';
import Logo from './logo'
import Link from 'next/link'
import { Instagram, TwitterIcon, Mail } from 'lucide-react'
import { FaPinterestP } from "react-icons/fa"
import { AiOutlineLinkedin, AiOutlineYoutube } from "react-icons/ai"
import { getLocalizedCategoryUrl } from '@/lib/url-utils'

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

        {footerContent.allCalculators?.showInFooter && (
          <div className="border-t border-gray-800 pt-12 mb-12 text-center">
            <h3 className="font-bold mb-4 text-2xl text-white">{footerContent.allCalculators.title}</h3>
            <Link
              href={companyItems.find((i: FooterItem) => i.href.includes("sitemap") || i.href.includes("mapa"))?.href || "/sitemap"}
              className="inline-block text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold"
            >
              View sitemap
            </Link>
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
