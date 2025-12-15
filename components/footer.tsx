import React from 'react'
import Logo from './logo'
import Link from 'next/link'
import { Instagram, TwitterIcon } from 'lucide-react'
import { FaPinterestP } from "react-icons/fa";
import { AiOutlineYoutube, } from "react-icons/ai";
import { useFooterContent } from '@/hooks/useFooterContent';
import { getLocalizedCategoryUrl } from '@/lib/url-utils';

interface FooterProps {
  language?: string;
}

interface FooterItem {
  name: string;
  href: string;
}

export const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const { content, loading, error } = useFooterContent(language);
  
  // Show loading state
  if (loading) {
    return <footer className="bg-gray-900 text-white py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">Loading...</div></footer>;
  }
  
  // Show error if content failed to load
  if (error) {
    // Fallback to default English content
    console.error('Error loading footer content:', error);
  }
  
  // Use content or fallback to defaults
  const footerContent = content || {
    company: {
      name: "Smart Calculator",
      description: "Your go-to destination for free, accurate, and easy-to-use online calculators. Trusted by millions of users worldwide.",
      copyright: "2025 Smart Calculator. All rights reserved."
    },
    categories: {
      title: "Most Used Categories",
      items: [
        { name: "Financial Calculators", href: "/financial" },
        { name: "Health & Fitness", href: "/health" },
        { name: "Math Calculators", href: "/maths" },
        { name: "Physics Calculators", href: "/physics" },
        { name: "Other Calculators", href: "/other-calculators" }
      ]
    },
    companyLinks: {
      title: "Company",
      items: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about-us" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms and Conditions", href: "/terms-and-conditions" }
      ]
    },
    popularCalculators: {
      title: "Popular Financial Calculators",
      items: [
        { name: "Mortgage Calculator", href: "https://hypotheken-rechner.net/" },
        { name: "Financing Calculator", href: "https://hypotheken-rechner.net/finanzierungs-rechner" },
        { name: "Construction Financing Calculator", href: "https://hypotheken-rechner.net/baufinanzierungs-rechner" },
        { name: "Budget Calculator", href: "https://hypotheken-rechner.net/budget-rechner" }
      ]
    },
    social: {
      pinterest: "https://www.pinterest.com/thesmartcalculators/",
      twitter: "https://x.com/SmartCalculat0r",
      instagram: "https://www.instagram.com/thesmartcalculators/",
      youtube: "https://www.youtube.com/@TheSmartCalculators"
    }
  };

  // For non-English languages, the footer content already contains localized URLs
  // For English, we need to map the category hrefs to localized URLs
  const categoryItems = language === 'en' 
    ? footerContent.categories.items.map((item: FooterItem) => {
        // Special handling for "Other Calculators" which maps to "other" category
        if (item.name === "Other Calculators") {
          return {
            ...item,
            href: getLocalizedCategoryUrl("other", language)
          };
        }
        
        // For other categories, extract the category from the href and localize it
        const categorySlug = item.href.replace(/^\//, ''); // Remove leading slash
        return {
          ...item,
          href: getLocalizedCategoryUrl(categorySlug, language)
        };
      })
    : footerContent.categories.items; // For non-English, use the already localized URLs from content

  // For company links, they should always use English URLs regardless of language
  // Only the text should be translated, not the URLs
  const companyItems = footerContent.companyLinks.items.map((item: FooterItem) => {
    // For home page, keep as is
    if (item.href === "/") {
      // For non-English languages, the home link should still be prefixed with language code
      if (language !== 'en') {
        return {
          ...item,
          href: `/${language}`
        };
      }
      return item;
    }
    
    // For other company links, always use English URLs regardless of the language
    // Map specific link names to their English URLs
    const nameToEnglishHrefMap: Record<string, string> = {
      // Portuguese
      "Sobre Nós": "/about-us",
      "Contate-Nos": "/contact-us",
      "Política de Privacidade": "/privacy-policy",
      "Termos e Condições": "/terms-and-conditions",
      // Polish
      "O Nas": "/about-us",
      "Kontakt": "/contact-us",
      "Polityka Prywatności": "/privacy-policy",
      "Regulamin": "/terms-and-conditions",
      // German
      "Über Uns": "/about-us",
      "Datenschutz": "/privacy-policy",
      "Allgemeine Geschäftsbedingungen": "/terms-and-conditions"
    };
    
    // Check if we have a mapping for this specific name
    if (nameToEnglishHrefMap[item.name]) {
      return {
        ...item,
        href: nameToEnglishHrefMap[item.name]
      };
    }
    
    // For English or unmapped items, check if it's one of our target pages
    // by looking at the href pattern
    if (item.href === "/about-us" || item.href === "/contact-us" || 
        item.href === "/privacy-policy" || item.href === "/terms-and-conditions") {
      // Already English URLs, keep as is
      return item;
    }
    
    // For any other links, keep as is
    return item;
  });

  return (
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <Logo />
                  <span className="text-2xl font-bold">{footerContent.company.name}</span>
                </div>
                <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                  {footerContent.company.description}
                </p>
                <div className="flex space-x-4">
                  <Link href={footerContent.social.pinterest}>
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <span className="text-white font-bold"><FaPinterestP /></span>
                    </div>
                  </Link>
                  <Link href={footerContent.social.twitter}>
                    <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                      <span className="text-white font-bold"><TwitterIcon /></span>
                    </div>
                  </Link>
                  <Link href={footerContent.social.instagram}>
                    <div className="w-10 h-10 bg-pink-700 rounded-lg flex items-center justify-center hover:bg-pink-800 transition-colors cursor-pointer">
                      <span className="text-white font-bold"><Instagram /></span>
                    </div>
                  </Link>
                  <Link href={footerContent.social.youtube}>
                    <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-800 transition-colors cursor-pointer">
                      <span className="text-white font-extrabold font-xl"><AiOutlineYoutube /></span>
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

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex items-center text-center justify-center">
                <p className="text-gray-400 mb-4 md:mb-0">&copy; {footerContent.company.copyright}</p>
              </div>
            </div>
          </div>
        </footer>
  )
}