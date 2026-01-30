import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { User, Calendar, MessageSquare, Heart, FileText, ArrowLeft } from 'lucide-react';
import { getUserByName, getUserPosts, getUserStats } from '@/lib/actions/user-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { urlFor } from '@/lib/sanity/config';
import { normalizeUsername } from '@/lib/utils/username-slug';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username: rawUsername } = await params;
  const username = normalizeUsername(rawUsername);
  const user = await getUserByName(username);
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Card className="bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
              <p className="text-gray-600 mb-6">The user &quot;{username}&quot; does not exist.</p>
              <Button asChild>
                <Link href="/community">Back to Community</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const [posts, stats] = await Promise.all([
    getUserPosts(user._id),
    getUserStats(user._id)
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/community" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Link>
        </Button>

        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-200 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg ring-4 ring-blue-100">
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Member since {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                  </span>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-600">{stats.totalPosts}</span>
                    </div>
                    <p className="text-xs text-gray-600">Posts</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span className="text-2xl font-bold text-purple-600">{stats.totalComments}</span>
                    </div>
                    <p className="text-xs text-gray-600">Comments</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Heart className="w-4 h-4 text-pink-600" />
                      <span className="text-2xl font-bold text-pink-600">{stats.totalReactions}</span>
                    </div>
                    <p className="text-xs text-gray-600">Reactions</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts by {user.name}</h2>
          
          {posts.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-200 shadow-xl">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No posts yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {posts.map((post: any) => (
                <Link key={post._id} href={`/community/post/${post.slug.current}`}>
                  <Card className="bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-200 shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="p-6">
                      <div className="flex gap-4">
                        {post.featuredImage && post.featuredImage.asset && (
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={urlFor(post.featuredImage).width(200).height(200).url()}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {post.content?.[0]?.children?.[0]?.text || ''}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {post.commentCount} comments
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {post.reactionCount} reactions
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
