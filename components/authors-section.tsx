"use client"

import Link from "next/link"
import Image from "next/image"
import { User, Mail, Linkedin, Twitter, Instagram, Globe, Calculator, FileText } from "lucide-react"
import type { Author } from "@/lib/sanity/client"

interface AuthorsSectionProps {
  authors: Author[]
}

export default function AuthorsSection({ authors }: AuthorsSectionProps) {
  if (!authors || authors.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-50/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-100 text-purple-600 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <User className="w-3 h-3" />
            Meet Our Experts
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Our <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Expert Authors</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the talented minds behind our calculators and content
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {authors.map((author, index) => {
            const gradients = [
              "from-blue-500 to-purple-600",
              "from-purple-500 to-pink-600",
              "from-pink-500 to-rose-600",
              "from-green-500 to-teal-600",
              "from-orange-500 to-red-600",
              "from-cyan-500 to-blue-600",
              "from-indigo-500 to-purple-600",
              "from-amber-500 to-orange-600",
            ]
            const gradient = gradients[index % gradients.length]

            const bgColors = [
              "bg-blue-50",
              "bg-purple-50",
              "bg-pink-50",
              "bg-green-50",
              "bg-orange-50",
              "bg-cyan-50",
              "bg-indigo-50",
              "bg-amber-50",
            ]
            const bgColor = bgColors[index % bgColors.length]

            return (
              <Link
                key={author._id}
                href={`/creator/${author.slug}`}
                className="group"
              >
                <div className={`h-full ${bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:-translate-y-2 relative overflow-hidden`}>
                  {/* Decorative gradient blob */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  
                  {/* Author Image */}
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${gradient} p-1.5 shadow-xl group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300`}>
                      {author.image ? (
                        <div className="w-full h-full rounded-3xl overflow-hidden bg-white">
                          <Image
                            src={author.image}
                            alt={author.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                          <User className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="text-center space-y-4 relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {author.name}
                    </h3>
                    
                    {author.tagline && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[44px] px-2">
                        {author.tagline}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
                      {(author.calculatorCount ?? 0) > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Calculator className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-bold">{author.calculatorCount}</span>
                        </div>
                      )}
                      {(author.postCount ?? 0) > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-bold">{author.postCount}</span>
                        </div>
                      )}
                    </div>

                    {/* Social Links */}
                    {author.social && (
                      <div className="flex items-center justify-center gap-2.5 pt-3">
                        {author.social.email && (
                          <a
                            href={`mailto:${author.social.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-purple-50 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
                            aria-label="Email"
                          >
                            <Mail className="w-4 h-4 text-gray-600 hover:text-purple-600" />
                          </a>
                        )}
                        {author.social.linkedin && (
                          <a
                            href={author.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-blue-50 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                          </a>
                        )}
                        {author.social.twitter && (
                          <a
                            href={author.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-sky-50 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
                            aria-label="Twitter"
                          >
                            <Twitter className="w-4 h-4 text-gray-600 hover:text-sky-600" />
                          </a>
                        )}
                        {author.social.instagram && (
                          <a
                            href={author.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-pink-50 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
                            aria-label="Instagram"
                          >
                            <Instagram className="w-4 h-4 text-gray-600 hover:text-pink-600" />
                          </a>
                        )}
                        {author.social.website && (
                          <a
                            href={author.social.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-green-50 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
                            aria-label="Website"
                          >
                            <Globe className="w-4 h-4 text-gray-600 hover:text-green-600" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
