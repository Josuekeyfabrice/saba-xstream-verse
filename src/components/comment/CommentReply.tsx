
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { CommentReplyProps } from "./types";
import { SocialShareMenu } from "./SocialShareMenu";

export const CommentReply: React.FC<CommentReplyProps> = ({
  reply,
  commentId,
  handleLikeReply
}) => {
  return (
    <div className="flex gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={reply.userImage} alt={reply.username} />
        <AvatarFallback>{reply.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium">{reply.username}</p>
            <p className="text-xs text-gray-400">{reply.timestamp}</p>
          </div>
        </div>
        <p className="mt-1 text-sm">{reply.content}</p>
        <div className="flex items-center gap-4 mt-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-gray-400 text-xs h-6 px-2"
            onClick={() => handleLikeReply(commentId, reply.id)}
          >
            <Heart 
              className={`h-3 w-3 ${reply.isLiked ? "fill-red-500 text-red-500" : ""}`} 
            />
            <span>{reply.likes}</span>
          </Button>
          
          {/* Ajouter le menu de partage pour les réponses aussi */}
          <SocialShareMenu commentId={reply.id} commentText={reply.content} />
        </div>
      </div>
    </div>
  );
};
