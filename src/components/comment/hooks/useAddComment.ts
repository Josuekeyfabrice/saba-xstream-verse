
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CommentType } from "../types";

export interface UseAddCommentProps {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  postId: string;
  socket?: any;
  scrollToBottom: () => void;
}

export const useAddComment = ({
  comments,
  setComments,
  postId,
  socket,
  scrollToBottom
}: UseAddCommentProps) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: `c${Date.now()}`,
      username: "votre_nom", // Dans une application réelle, ce serait l'utilisateur connecté
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      content: newComment,
      likes: 0,
      isLiked: false,
      timestamp: "À l'instant",
      replies: []
    };
    
    if (socket) {
      socket.emit('newComment', {
        postId,
        comment: newCommentObj
      });
    }
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été publié avec succès",
    });
    
    scrollToBottom();
  };

  return {
    newComment,
    setNewComment,
    handleAddComment
  };
};
