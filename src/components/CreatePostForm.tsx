
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostFormProps {
  onAddPost: (post: any) => void;
}

export const CreatePostForm = ({ onAddPost }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Fichier trop volumineux",
          description: "L'image ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !selectedImage) return;
    
    const newPost = {
      id: Date.now().toString(),
      username: "votre_nom",
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      imageUrl: selectedImage || undefined,
      content,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: "À l'instant",
    };
    
    onAddPost(newPost);
    setContent("");
    setSelectedImage(null);
    
    toast({
      title: "Post publié !",
      description: "Votre post a été publié avec succès.",
    });
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="bg-stream-darker border-gray-700">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar className="hidden sm:flex h-10 w-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          
          <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
            <Textarea 
              placeholder="Partagez vos pensées ou vos découvertes..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none min-h-20"
            />
            
            {selectedImage && (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="max-h-64 rounded-md object-cover" 
                />
                <Button 
                  type="button"
                  variant="destructive" 
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-5 w-5 mr-2" />
                  <span>Photo</span>
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-stream-purple hover:bg-stream-purple/90"
                disabled={!content.trim() && !selectedImage}
              >
                <Send className="mr-2 h-4 w-4" />
                Publier
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
