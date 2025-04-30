
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Send, Bookmark } from "lucide-react";
import { CommentSection } from "./CommentSection";

interface PostProps {
  post: {
    id: string;
    username: string;
    userImage: string;
    imageUrl?: string;
    content: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    timestamp: string;
  };
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export const PostCard = ({ post, onLike, onComment }: PostProps) => {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    onComment(post.id, comment);
    setComment("");
    setShowComments(true);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <Card className="bg-stream-darker border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={post.userImage} alt={post.username} />
              <AvatarFallback>{post.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.username}</p>
              <p className="text-xs text-gray-400">{post.timestamp}</p>
            </div>
          </div>
          <Button 
            variant={isSubscribed ? "default" : "outline"} 
            onClick={handleSubscribe} 
            size="sm" 
            className={isSubscribed ? "bg-stream-purple hover:bg-stream-purple/90" : "border-stream-purple text-stream-purple hover:bg-stream-purple/10"}
          >
            {isSubscribed ? "Abonné" : "S'abonner"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
          <div className="rounded-md overflow-hidden mb-4">
            <img 
              src={post.imageUrl} 
              alt="Post content" 
              className="w-full object-cover max-h-96" 
            />
          </div>
        )}
        <div className="flex items-center gap-4 mt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-gray-300"
            onClick={handleLike}
          >
            <Heart 
              className={`h-5 w-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} 
            />
            <span>{post.likes}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-gray-300"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-5 w-5" />
            <span>{post.comments}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-1 text-gray-300 ml-auto"
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch pt-0">
        <form onSubmit={handleSubmitComment} className="flex gap-2 w-full">
          <Textarea 
            placeholder="Ajouter un commentaire..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-10 py-2"
          />
          <Button 
            type="submit" 
            size="sm" 
            variant="ghost"
            disabled={!comment.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Envoyer</span>
          </Button>
        </form>
        
        {showComments && (
          <CommentSection postId={post.id} />
        )}
      </CardFooter>
    </Card>
  );
};
