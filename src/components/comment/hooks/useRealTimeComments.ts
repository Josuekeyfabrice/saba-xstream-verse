
import { useState, useEffect, useRef } from "react";
import { CommentType } from "../types";

export interface UseRealTimeCommentsProps {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  postId: string;
  socket?: any;
}

export const useRealTimeComments = ({
  comments,
  setComments,
  postId,
  socket
}: UseRealTimeCommentsProps) => {
  const [realtimeIndicator, setRealtimeIndicator] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const commentEndRef = useRef<HTMLDivElement>(null);

  // Pour défiler vers le bas après l'ajout d'un commentaire
  const scrollToBottom = () => {
    commentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = () => {
    if (socket && !isTyping) {
      socket.emit('typing', {
        postId,
        username: 'vous', // Dans une application réelle, ce serait l'utilisateur connecté
      });
      
      setIsTyping(true);
      
      // Réinitialiser l'état de frappe après 2 secondes
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  // Écouter les nouveaux commentaires
  useEffect(() => {
    if (socket) {
      // Simuler la réception de nouveaux commentaires
      const handleNewComment = (data: any) => {
        if (data.postId === postId) {
          setComments(prev => [data.comment, ...prev]);
          
          // Afficher l'indicateur de temps réel
          setRealtimeIndicator(`${data.comment.username} vient de commenter`);
          setTimeout(() => setRealtimeIndicator(null), 3000);
          
          // Défiler vers le nouveau commentaire
          scrollToBottom();
        }
      };
      
      const handleNewReply = (data: any) => {
        if (data.postId === postId) {
          setComments(prev => prev.map(comment => {
            if (comment.id === data.commentId) {
              return {
                ...comment,
                replies: [data.reply, ...comment.replies]
              };
            }
            return comment;
          }));
          
          setRealtimeIndicator(`${data.reply.username} vient de répondre à un commentaire`);
          setTimeout(() => setRealtimeIndicator(null), 3000);
        }
      };
      
      // Écouter les événements de frappe
      const handleTyping = (data: any) => {
        if (data.postId === postId) {
          setTypingUsers(prev => {
            if (!prev.includes(data.username)) {
              return [...prev, data.username];
            }
            return prev;
          });
          
          // Nettoyer après 3 secondes
          setTimeout(() => {
            setTypingUsers(prev => prev.filter(user => user !== data.username));
          }, 3000);
        }
      };
      
      socket.on('newComment', handleNewComment);
      socket.on('newReply', handleNewReply);
      socket.on('typing', handleTyping);
      
      return () => {
        socket.off('newComment', handleNewComment);
        socket.off('newReply', handleNewReply);
        socket.off('typing', handleTyping);
      };
    }
  }, [postId, socket, setComments]);

  return {
    realtimeIndicator,
    typingUsers,
    commentEndRef,
    handleTyping,
    scrollToBottom
  };
};
