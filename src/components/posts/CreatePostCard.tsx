import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Image, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CreatePostCardProps {
  onCreatePost: (content: string, imageFile?: File) => void;
  loading?: boolean;
}

export const CreatePostCard: React.FC<CreatePostCardProps> = ({ onCreatePost, loading }) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useAuth();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content, imageFile || undefined);
      setContent('');
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  if (!user) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.email || ''} />
            <AvatarFallback>{user.email?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.email}</p>
            <p className="text-sm text-muted-foreground">Que se passe-t-il ?</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Écrivez quelque chose..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-20 resize-none"
          />
          
          {imagePreview && (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-64 w-full object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                ✕
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Image className="h-4 w-4 mr-2" />
                Image
              </Button>
            </div>

            <Button 
              type="submit" 
              disabled={!content.trim() || loading}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4 mr-2" />
              Publier
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};