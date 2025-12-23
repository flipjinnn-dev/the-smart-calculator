import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorBySlug } from '@/lib/sanity/client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, User, Star, ArrowLeft, Linkedin, Mail, Twitter, Instagram, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortableText } from '@/components/portable-text';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidate every hour

export default async function CreatorPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch real data from Sanity
  let author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const totalCalculators = author.calculators?.length || 0;
  const totalPosts = author.posts?.length || 0;
  
  // Calculate total reviews across all content (if available)
  const totalReviews = author.calculators?.reduce((acc: number, curr: any) => acc + (curr.ratingCount || 0), 0) || 0;
  const averageRating = totalReviews > 0 
    ? (author.calculators?.reduce((acc: number, curr: any) => acc + (curr.ratingTotal || 0), 0) / totalReviews).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="container mx-auto px-4 h-full relative">
          <Link href="/">
            <Button variant="ghost" className="mt-6 text-white hover:bg-white/20 hover:text-white transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl overflow-hidden bg-white sticky top-24">
              <CardContent className="pt-0 px-6 pb-8 text-center">
                <div className="relative -mt-16 mb-4 inline-block">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-50 transform scale-105"></div>
                  <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-xl relative">
                    <AvatarImage src={author.image} alt={author.name} className="object-cover" />
                    <AvatarFallback className="text-4xl bg-slate-100 text-slate-400">
                      {author.name?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-2 right-2 bg-green-500 border-2 border-white rounded-full p-1.5" title="Verified Creator">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{author.name}</h1>
                <p className="text-blue-600 font-medium mb-4">{author.tagline}</p>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-4 mb-6">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{totalCalculators}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Tools</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{totalPosts}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Articles</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg flex items-center justify-center gap-1">
                      {averageRating || '-'} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Rating</div>
                  </div>
                </div>

                {/* Bio */}
                <div className="text-gray-600 text-sm leading-relaxed mb-6 text-left">
                  {Array.isArray(author.bio) ? (
                    <PortableText value={author.bio} />
                  ) : (
                    <p>{author.bio || "Expert contributor creating high-quality calculators and content."}</p>
                  )}
                </div>

                {/* Social Links */}
                {author.social && (
                  <div className="flex justify-center gap-3">
                    {author.social.email && (
                      <a href={`mailto:${author.social.email}`} className="p-2.5 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all duration-300 hover:scale-110 shadow-sm" title="Email">
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.linkedin && (
                      <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-full transition-all duration-300 hover:scale-110 shadow-sm" title="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.twitter && (
                      <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black rounded-full transition-all duration-300 hover:scale-110 shadow-sm" title="Twitter/X">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.instagram && (
                      <a href={author.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600 rounded-full transition-all duration-300 hover:scale-110 shadow-sm" title="Instagram">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.website && (
                      <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all duration-300 hover:scale-110 shadow-sm" title="Website">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Calculators Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Calculators</h2>
                    <p className="text-gray-500 text-sm">Tools developed by {author.name}</p>
                  </div>
                </div>
                <Badge variant="outline" className="hidden sm:flex bg-white">{totalCalculators} Total</Badge>
              </div>
              
              {author.calculators && author.calculators.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {author.calculators.map((calc: any, idx: number) => (
                    <Link href={`/${calc.calculatorId}`} key={calc.calculatorId || idx} className="group h-full">
                      <Card className="h-full border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform group-hover:-translate-y-1">
                        <CardContent className="p-5 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-blue-50 rounded-md text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Calculator className="w-5 h-5" />
                            </div>
                            {calc.ratingCount > 0 && (
                              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="font-semibold text-xs text-amber-700">
                                  {(calc.ratingTotal / calc.ratingCount).toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {calc.title || calc.calculatorId.replace(/-/g, ' ')}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                            {calc.description || "Calculate efficiently with this specialized tool designed for precision and ease of use."}
                          </p>
                          <div className="flex items-center text-xs font-medium text-blue-600 mt-auto">
                            Use Calculator <ArrowLeft className="w-3 h-3 ml-1 rotate-180 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No calculators published yet.</p>
                </div>
              )}
            </section>

            {/* Articles Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
                    <p className="text-gray-500 text-sm">Insights and guides</p>
                  </div>
                </div>
                <Badge variant="outline" className="hidden sm:flex bg-white">{totalPosts} Total</Badge>
              </div>

              {author.posts && author.posts.length > 0 ? (
                <div className="space-y-4">
                  {author.posts.map((post: any, idx: number) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug || idx} className="block group">
                      <Card className="border-gray-200 hover:shadow-md hover:border-purple-200 transition-all duration-300 overflow-hidden">
                        <div className="flex flex-col sm:flex-row h-full">
                          {post.image && (
                            <div className="w-full sm:w-48 h-48 sm:h-auto relative flex-shrink-0">
                              <Image 
                                src={post.image} 
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <CardContent className="p-5 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 text-[10px]">
                                Article
                              </Badge>
                              {post.publishedAt && (
                                <span className="text-xs text-gray-400">
                                  {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                              {post.excerpt || "Read this insightful article to learn more about this topic."}
                            </p>
                            <span className="text-xs font-semibold text-purple-600 flex items-center mt-auto">
                              Read Article <ArrowLeft className="w-3 h-3 ml-1 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No articles published yet.</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

