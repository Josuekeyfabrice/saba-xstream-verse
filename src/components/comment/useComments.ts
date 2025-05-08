
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { CommentType, UseCommentsProps } from "./types";

// Enhanced sample comments data with nested replies
const sampleComments = [
  {
    id: "c1",
    username: "marie_du_web",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content: "Super publication ! J'adore ce contenu.",
    likes: 5,
    isLiked: false,
    timestamp: "Il y a 45 min",
    replies: [
      {
        id: "r1c1",
        username: "tech_expert",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        content: "Tout à fait d'accord avec toi !",
        likes: 1,
        isLiked: false,
        timestamp: "Il y a 30 min"
      }
    ]
  },
  {
    id: "c2",
    username: "tech_expert",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    content: "Merci pour le partage !",
    likes: 2,
    isLiked: false,
    timestamp: "Il y a 1 heure",
    replies: []
  }
];

export const useComments = ({ postId, socket }: UseCommentsProps) => {
  const [comments, setComments] = useState<CommentType[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [realtimeIndicator, setRealtimeIndicator] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const commentEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Pour suivre qui est en train d'écrire
  const [isTyping, setIsTyping] = useState(false);

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
  }, [postId, socket]);

  // Fonction pour défiler vers le bas après l'ajout d'un commentaire
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
    comments,
    newComment,
    setNewComment,
    replyingTo,
    setReplyingTo,
    replyContent,
    setReplyContent,
    realtimeIndicator,
    typingUsers,
    commentEndRef,
    handleTyping,
    handleLikeComment,
    handleLikeReply,
    handleAddComment,
    handleAddReply,
    handleShareComment,
    handleReportComment
  };
};
