import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PostNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/community" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Link>
        </Button>

        <Card className="bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-gray-200 shadow-xl">
          <CardContent className="p-12 text-center">
            <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Not Found</h1>
            <p className="text-gray-600 mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/community">Browse Community Posts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
