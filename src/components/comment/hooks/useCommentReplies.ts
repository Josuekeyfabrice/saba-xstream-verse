
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CommentType } from "../types";

export interface UseCommentRepliesProps {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  postId: string;
  socket?: any;
}

export const useCommentReplies = ({
  comments,
  setComments,
  postId,
  socket
}: UseCommentRepliesProps) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const { toast } = useToast();

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    const newReply = {
      id: `r${Date.now()}`,
      username: "votre_nom", // Dans une application réelle, ce serait l'utilisateur connecté
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      content: replyContent,
      likes: 0,
      isLiked: false,
      timestamp: "À l'instant"
    };
    
    if (socket) {
      socket.emit('newReply', {
        postId,
        commentId,
        reply: newReply
      });
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [newReply, ...comment.replies]
        };
      }
      return comment;
    }));
    
    setReplyContent("");
    setReplyingTo(null);
    
    toast({
      title: "Réponse ajoutée",
      description: "Votre réponse a été publiée avec succès",
    });
  };

  return {
    replyingTo,
    setReplyingTo,
    replyContent,
    setReplyContent,
    handleAddReply
  };
};
