import { requireAdmin } from '@/lib/auth-utils';
import { getPendingPosts } from '@/lib/actions/post-actions';
import { getPendingComments } from '@/lib/actions/comment-actions';
import { PendingPostsTable } from '@/components/admin/pending-posts-table';
import { Shield, FileText, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PendingCommentsTable } from '@/components/admin/pending-comments-table';

export const metadata = {
  title: 'Admin Dashboard - Community Moderation',
  description: 'Moderate community posts and comments',
};

export default async function AdminDashboard() {
  await requireAdmin();

  const [pendingPosts, pendingComments] = await Promise.all([
    getPendingPosts(),
    getPendingComments(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-3xl p-8 backdrop-blur-sm border border-red-500/20">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Review and moderate community content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingPosts.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingComments.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {pendingPosts.length + pendingComments.length}
              </div>
              <p className="text-xs text-muted-foreground">Items to moderate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="posts">
              Pending Posts ({pendingPosts.length})
            </TabsTrigger>
            <TabsTrigger value="comments">
              Pending Comments ({pendingComments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <PendingPostsTable posts={pendingPosts} />
          </TabsContent>

          <TabsContent value="comments">
            <PendingCommentsTable comments={pendingComments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
