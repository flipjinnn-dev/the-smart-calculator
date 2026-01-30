'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createPost } from '@/lib/actions/post-actions';
import { toast } from 'sonner';

export function CreatePostModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    images.forEach((image) => {
      formData.append('images', image);
    });

    const result = await createPost(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Post submitted for review!');
      setOpen(false);
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} key="create-post-modal-v2">
      <DialogTrigger asChild>
        <Button size="lg" className="text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <PlusCircle className="w-5 h-5" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-2 border-gray-200 shadow-2xl sm:rounded-3xl">
        <DialogHeader className="space-y-3 pb-4 border-b border-gray-100">
          <DialogTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create a New Post
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Share your knowledge, ask questions, or start a discussion. Your post will be reviewed by our team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2 group">
            <Label htmlFor="title" className="text-sm font-bold text-gray-700 group-focus-within:text-blue-600 transition-colors">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Write a clear, descriptive title..."
              required
              minLength={10}
              maxLength={200}
              className="h-14 text-lg border-2 border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl placeholder:text-gray-400"
            />
            <div className="flex justify-between items-center text-xs text-gray-500 px-1">
              <span>Minimum 10 characters</span>
              <span className="font-medium">Make it catchy!</span>
            </div>
          </div>
          
          <div className="space-y-2 group">
            <Label htmlFor="content" className="text-sm font-bold text-gray-700 group-focus-within:text-blue-600 transition-colors">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Share your thoughts in detail..."
              required
              rows={8}
              className="resize-none text-base border-2 border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl placeholder:text-gray-400 p-4 leading-relaxed"
            />
          </div>

          <div className="space-y-4 p-4 bg-blue-50/50 rounded-2xl border-2 border-blue-100/50 hover:border-blue-200 transition-colors">
            <Label htmlFor="images" className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span>Add Images</span>
              <span className="text-xs font-normal text-gray-500 ml-auto bg-white px-2 py-1 rounded-full border border-blue-100">Max 5 images (5MB each)</span>
            </Label>
            
            <div className="relative">
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <label 
                htmlFor="images" 
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer bg-white hover:bg-blue-50/50 hover:border-blue-400 transition-all group"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <PlusCircle className="w-10 h-10 text-blue-300 group-hover:text-blue-500 mb-2 transition-colors" />
                  <p className="text-sm text-gray-600 font-medium group-hover:text-blue-600">Click to upload images</p>
                </div>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4 animate-in fade-in duration-300">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl border-2 border-white shadow-md group-hover:shadow-lg transition-all"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              disabled={isLoading} 
              className="px-6 h-12 rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="px-8 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                'Submit Post'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
