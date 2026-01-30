import { requireAdmin } from '@/lib/auth-utils';
import { getPendingPosts } from '@/lib/actions/post-actions';
import { getPendingComments } from '@/lib/actions/comment-actions';
import { getAllBlogs } from '@/lib/actions/blog-actions';
import { getAllCommunityPosts } from '@/lib/actions/admin-community-actions';
import { PendingPostsTable } from '@/components/admin/pending-posts-table';
import { Shield, FileText, MessageSquare, BookOpen, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PendingCommentsTable } from '@/components/admin/pending-comments-table';
import { BlogManagementTable } from '@/components/admin/blog-management-table';
import { CommunityPostsManagementTable } from '@/components/admin/community-posts-management-table';

export const metadata = {
  title: 'Admin Dashboard - Content Management',
  description: 'Manage all site content including blogs and community posts',
};

export default async function AdminDashboard() {
  await requireAdmin();

  const [pendingPosts, pendingComments, allBlogs, allCommunityPosts] = await Promise.all([
    getPendingPosts(),
    getPendingComments(),
    getAllBlogs(),
    getAllCommunityPosts(),
  ]);

  const approvedPosts = allCommunityPosts.filter((p: any) => p.status === 'approved').length;
  const pendingPostsCount = allCommunityPosts.filter((p: any) => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-base mt-1">
                Manage all site content and moderate community submissions
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Blog Posts</CardTitle>
              <BookOpen className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{allBlogs.length}</div>
              <p className="text-xs text-gray-600 font-medium mt-1">Total published</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Community Posts</CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{approvedPosts}</div>
              <p className="text-xs text-gray-600 font-medium mt-1">Approved posts</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Pending Posts</CardTitle>
              <FileText className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{pendingPostsCount}</div>
              <p className="text-xs text-gray-600 font-medium mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Pending Comments</CardTitle>
              <MessageSquare className="h-5 w-5 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">{pendingComments.length}</div>
              <p className="text-xs text-gray-600 font-medium mt-1">Awaiting review</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 h-12 bg-white border-2 border-gray-200 shadow-md rounded-xl">
            <TabsTrigger value="blogs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-semibold">
              Blogs ({allBlogs.length})
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-semibold">
              Community ({allCommunityPosts.length})
            </TabsTrigger>
            <TabsTrigger value="pending-posts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-semibold">
              Pending Posts ({pendingPostsCount})
            </TabsTrigger>
            <TabsTrigger value="pending-comments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-semibold">
              Pending Comments ({pendingComments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <BlogManagementTable blogs={allBlogs} />
          </TabsContent>

          <TabsContent value="community">
            <CommunityPostsManagementTable posts={allCommunityPosts} />
          </TabsContent>

          <TabsContent value="pending-posts">
            <PendingPostsTable posts={pendingPosts} />
          </TabsContent>

          <TabsContent value="pending-comments">
            <PendingCommentsTable comments={pendingComments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
