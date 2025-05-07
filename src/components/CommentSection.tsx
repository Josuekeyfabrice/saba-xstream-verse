
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

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

interface ReplyType {
  id: string;
  username: string;
  userImage: string;
  content: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
}

interface CommentType {
  id: string;
  username: string;
  userImage: string;
  content: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  replies: ReplyType[];
}

interface CommentSectionProps {
  postId: string;
  socket?: any; // Socket instance
}

export const CommentSection = ({ postId, socket }: CommentSectionProps) => {
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

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-400">Commentaires</h4>
        
        {realtimeIndicator && (
          <div className="text-xs text-stream-purple bg-stream-purple/10 px-2 py-1 rounded-md animate-pulse">
            {realtimeIndicator}
          </div>
        )}
      </div>
      
      {/* Formulaire d'ajout de commentaire */}
      <form onSubmit={handleAddComment} className="flex gap-2 items-start mb-6">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" alt="Votre profil" />
          <AvatarFallback>VP</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Ajouter un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleTyping}
            className="min-h-10 py-2 resize-none"
          />
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              size="sm" 
              className="bg-stream-purple hover:bg-stream-purple/90"
              disabled={!newComment.trim()}
            >
              Commenter
            </Button>
          </div>
        </div>
      </form>
      
      {typingUsers.length > 0 && (
        <div className="text-xs text-gray-400 italic mb-2 animate-pulse">
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'est en train d\'écrire...' : 'sont en train d\'écrire...'}
        </div>
      )}
      
      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.map(comment => (
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
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 text-gray-400 text-xs h-8 px-2"
                    onClick={() => handleShareComment(comment.id)}
                  >
                    <Share className="h-3 w-3" />
                    <span>Partager</span>
                  </Button>
                </div>
                
                {/* Interface de réponse */}
                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" alt="Votre profil" />
                      <AvatarFallback>VP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Répondre à ${comment.username}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        onKeyDown={handleTyping}
                        className="min-h-10 py-1 text-sm resize-none"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          Annuler
                        </Button>
                        <Button
                          size="sm"
                          className="bg-stream-purple hover:bg-stream-purple/90"
                          onClick={() => handleAddReply(comment.id)}
                          disabled={!replyContent.trim()}
                        >
                          Répondre
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Affichage des réponses */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l border-gray-700 space-y-3">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-2">
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
                              onClick={() => handleLikeReply(comment.id, reply.id)}
                            >
                              <Heart 
                                className={`h-3 w-3 ${reply.isLiked ? "fill-red-500 text-red-500" : ""}`} 
                              />
                              <span>{reply.likes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div ref={commentEndRef} />
    </div>
  );
};
