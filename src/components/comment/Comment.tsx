
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { CommentProps } from "./types";
import { CommentReply } from "./CommentReply";
import { ReplyForm } from "./ReplyForm";
import { SocialShareMenu } from "./SocialShareMenu";

export const Comment: React.FC<CommentProps> = ({
  comment,
  handleLikeComment,
  handleLikeReply,
  handleShareComment,
  handleReportComment,
  setReplyingTo,
  replyingTo,
  replyContent,
  setReplyContent,
  handleAddReply,
  handleTyping
}) => {
  return (
    <div key={comment.id} className="space-y-4">
      <div className="flex gap-3 py-3 border-t border-gray-700">
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShareComment(comment.id)}>
                  Partager
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                  Signaler
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="mt-1 text-sm">{comment.content}</p>
          
          <div className="flex items-center gap-4 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-gray-400 text-xs h-8 px-2"
              onClick={() => handleLikeComment(comment.id)}
            >
              <Heart 
                className={`h-3 w-3 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`} 
              />
              <span>{comment.likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-gray-400 text-xs h-8 px-2"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <MessageSquare className="h-3 w-3" />
              <span>Répondre</span>
            </Button>
            
            {/* Remplacer le bouton de partage simple par le menu de partage social */}
            <SocialShareMenu commentId={comment.id} commentText={comment.content} />
          </div>
          
          {/* Interface de réponse */}
          {replyingTo === comment.id && (
            <ReplyForm 
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleAddReply={() => handleAddReply(comment.id)}
              handleTyping={handleTyping}
              cancelReply={() => setReplyingTo(null)}
              username={comment.username}
            />
          )}
          
          {/* Affichage des réponses */}
          {comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l border-gray-700 space-y-3">
              {comment.replies.map(reply => (
                <CommentReply 
                  key={reply.id}
                  reply={reply}
                  commentId={comment.id}
                  handleLikeReply={handleLikeReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
