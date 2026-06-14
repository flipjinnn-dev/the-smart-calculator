"use client"

import React from 'react';
import Logo from './logo'
import Link from 'next/link'
import { Instagram, TwitterIcon, Mail, Youtube, Linkedin } from 'lucide-react'
import enFooter from '@/app/content/footer/en.json'
import brFooter from '@/app/content/footer/br.json'
import plFooter from '@/app/content/footer/pl.json'
import deFooter from '@/app/content/footer/de.json'
import esFooter from '@/app/content/footer/es.json'

const footerContentByLanguage: Record<string, typeof enFooter> = {
  en: enFooter,
  br: brFooter,
  pl: plFooter,
  de: deFooter,
  es: esFooter,
}

interface FooterProps {
  language?: string
}

interface FooterItem {
  name: string
  href: string
}

const LOCALE_HOMEPAGES = [
  { code: "en", href: "/", label: "English" },
  { code: "de", href: "/de", label: "Deutsch" },
  { code: "pl", href: "/pl", label: "Polski" },
  { code: "br", href: "/br", label: "Português" },
  { code: "es", href: "/es", label: "Español" },
] as const

const FooterClient: React.FC<FooterProps> = ({ language = 'en' }) => {
  const footerContent = footerContentByLanguage[language] ?? enFooter
  const homepageHref = language === "en" ? "/" : `/${language}`

  const categoryItems = footerContent.categories.items

  const companyItems = footerContent.companyLinks.items.map((item: FooterItem) => {
    if (item.href === "/" && language !== "en") {
      return { ...item, href: `/${language}` };
    }
    return item;
  });

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link href={homepageHref} className="flex items-center space-x-3 mb-6 group w-fit">
              <Logo />
              <span className="text-2xl font-bold group-hover:text-blue-300 transition-colors">
                {footerContent.company.name}
              </span>
            </Link>
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
                  <span className="text-white font-bold text-sm">P</span>
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
                  <Youtube className="w-5 h-5 text-white" />
                </div>
              </Link>
              <Link href={"https://www.linkedin.com/company/smart-calculator/"} aria-label="Visit our LinkedIn page">
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                  <Linkedin className="w-5 h-5 text-white" />
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
            <nav aria-label="Site languages" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-400">
              {LOCALE_HOMEPAGES.map((locale) => (
                <Link
                  key={locale.code}
                  href={locale.href}
                  className={`hover:text-white transition-colors ${language === locale.code ? "text-white font-medium" : ""}`}
                >
                  {locale.label}
                </Link>
              ))}
            </nav>
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
