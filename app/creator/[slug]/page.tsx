import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorBySlug } from '@/lib/sanity/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, User, Star, MapPin, Calendar, ArrowLeft, Linkedin, Mail, Twitter, Instagram, Globe } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div className="flex justify-start">
          <Link href="/">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        {/* Profile Header Card */}
        <Card className="border-0 shadow-xl overflow-hidden bg-white">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <CardContent className="relative pt-0 px-6 sm:px-10 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-6 gap-6">
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-white shadow-lg">
                <AvatarImage src={author.image} alt={author.name} className="object-cover" />
                <AvatarFallback className="text-4xl bg-slate-200">
                  {author.name?.charAt(0) || <User />}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left space-y-2 pb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{author.name}</h1>
                <p className="text-gray-600 text-lg">{author.tagline}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-gray-500 mt-2">
                  <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                    <Calculator className="w-3 h-3 mr-1" /> {totalCalculators} Calculators
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100">
                    <FileText className="w-3 h-3 mr-1" /> {totalPosts} Articles
                  </Badge>
                  {totalReviews > 0 && (
                    <Badge variant="secondary" className="px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100">
                      <Star className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" /> {totalReviews} Reviews
                    </Badge>
                  )}
                </div>

                {/* Social Links */}
                {author.social && (
                  <div className="flex justify-center sm:justify-start gap-2 mt-4">
                    {author.social.email && (
                      <a href={`mailto:${author.social.email}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Email">
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.linkedin && (
                      <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors" title="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.twitter && (
                      <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors" title="Twitter/X">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.instagram && (
                      <a href={author.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors" title="Instagram">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {author.social.website && (
                      <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="Website">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="max-w-3xl">
              <h2 className="text-lg font-semibold mb-2 text-gray-900">About</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                {Array.isArray(author.bio) ? (
                  <PortableText value={author.bio} />
                ) : (
                  <p>{author.bio || author.tagline || "No bio available."}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Calculators Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Calculators</h2>
            </div>
            
            {author.calculators && author.calculators.length > 0 ? (
              <div className="space-y-4">
                {author.calculators.map((calc: any, idx: number) => (
                  <Link href={`/${calc.calculatorId}`} key={calc.calculatorId || idx} className="block group">
                    <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {calc.title || calc.calculatorId}
                          </h3>
                          {calc.ratingCount > 0 && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="font-medium text-gray-700">
                                {(calc.ratingTotal / calc.ratingCount).toFixed(1)}
                              </span>
                              <span>({calc.ratingCount} reviews)</span>
                            </div>
                          )}
                        </div>
                        <div className="text-gray-300 group-hover:text-blue-500">
                          <ArrowLeft className="w-5 h-5 rotate-180" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No calculators published yet.</p>
            )}
          </div>

          {/* Articles Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Articles</h2>
            </div>

            {author.posts && author.posts.length > 0 ? (
              <div className="space-y-4">
                {author.posts.map((post: any, idx: number) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug || idx} className="block group">
                    <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-transparent hover:border-l-purple-500 overflow-hidden">
                      <div className="flex">
                        {post.image && (
                          <div className="w-24 h-auto relative hidden sm:block">
                            <Image 
                              src={post.image} 
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="p-4 flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                            {post.title}
                          </h3>
                          {post.publishedAt && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3" />
                              <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString()}
                              </time>
                            </div>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No articles published yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
