
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CommentType } from "../types";

export interface UseCommentActionsProps {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  postId: string;
  socket?: any;
}

export const useCommentActions = ({ 
  comments, 
  setComments, 
  postId, 
  socket 
}: UseCommentActionsProps) => {
  const { toast } = useToast();

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const wasLiked = comment.isLiked;
        
        // Émettre l'événement de like de commentaire via WebSocket
        if (socket) {
          socket.emit('likeComment', { 
            postId, 
            commentId, 
            liked: !wasLiked 
          });
        }
        
        return {
          ...comment,
          isLiked: !wasLiked,
          likes: wasLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            const wasLiked = reply.isLiked;
            
            // Émettre l'événement de like de réponse via WebSocket
            if (socket) {
              socket.emit('likeReply', { 
                postId, 
                commentId,
                replyId,
                liked: !wasLiked 
              });
            }
            
            return {
              ...reply,
              isLiked: !wasLiked,
              likes: wasLiked ? reply.likes - 1 : reply.likes + 1
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    }));
  };

  const handleShareComment = (commentId: string) => {
    // Simuler le partage d'un commentaire
    navigator.clipboard.writeText(`https://votre-app.com/posts/${postId}/comments/${commentId}`);
    
    toast({
      title: "Lien copié",
      description: "Le lien du commentaire a été copié dans le presse-papier",
    });
  };

  const handleReportComment = (commentId: string) => {
    // Simuler le signalement d'un commentaire
    toast({
      title: "Commentaire signalé",
      description: "Merci d'avoir signalé ce commentaire. Nous allons l'examiner.",
    });
  };
  
  return {
    handleLikeComment,
    handleLikeReply,
    handleShareComment,
    handleReportComment
  };
};
