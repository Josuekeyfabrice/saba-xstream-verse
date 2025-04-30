
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sample comments data
const sampleComments = [
  {
    id: "c1",
    username: "marie_du_web",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content: "Super publication ! J'adore ce contenu.",
    likes: 5,
    isLiked: false,
    timestamp: "Il y a 45 min",
  },
  {
    id: "c2",
    username: "tech_expert",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    content: "Merci pour le partage !",
    likes: 2,
    isLiked: false,
    timestamp: "Il y a 1 heure",
  }
];

interface CommentSectionProps {
  postId: string;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState(sampleComments);

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const wasLiked = comment.isLiked;
        return {
          ...comment,
          isLiked: !wasLiked,
          likes: wasLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  return (
    <div className="mt-4 space-y-4">
      <h4 className="text-sm font-medium text-gray-400">Commentaires</h4>
      
      {comments.map(comment => (
        <div key={comment.id} className="flex gap-3 py-3 border-t border-gray-700">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.userImage} alt={comment.username} />
            <AvatarFallback>{comment.username[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">{comment.username}</p>
                <p className="text-xs text-gray-400">{comment.timestamp}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-gray-400 text-xs"
                onClick={() => handleLikeComment(comment.id)}
              >
                <Heart 
                  className={`h-3 w-3 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`} 
                />
                <span>{comment.likes}</span>
              </Button>
            </div>
            <p className="mt-1 text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
