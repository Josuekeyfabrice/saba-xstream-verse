import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { Post, Comment } from '@/hooks/usePosts';
import { CommentsList } from './CommentsList';
import { AddCommentForm } from './AddCommentForm';

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
  onFetchComments: (postId: string) => Promise<Comment[]>;
  onAddComment: (postId: string, content: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onToggleLike, 
  onFetchComments, 
  onAddComment 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const handleToggleComments = async () => {
    if (!showComments) {
      setLoadingComments(true);
      const fetchedComments = await onFetchComments(post.id);
      setComments(fetchedComments);
      setLoadingComments(false);
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (content: string) => {
    await onAddComment(post.id, content);
    // Refresh comments
    const fetchedComments = await onFetchComments(post.id);
    setComments(fetchedComments);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${post.user_id}`} alt={post.profiles?.name || 'User'} />
            <AvatarFallback>{post.profiles?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{post.profiles?.name || 'Utilisateur'}</p>
            <p className="text-sm text-muted-foreground">{formatDate(post.created_at)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed">{post.content}</p>
        
        {post.image_url && (
          <div className="rounded-md overflow-hidden">
            <img 
              src={post.image_url} 
              alt="Post image" 
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-6 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleLike(post.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-red-500"
          >
            <Heart className="h-4 w-4" />
            <span>{post.likes_count}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleComments}
            className="flex items-center gap-2 text-muted-foreground hover:text-blue-500"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments_count}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-green-500"
          >
            <Share className="h-4 w-4" />
            Partager
          </Button>
        </div>

        {showComments && (
          <div className="pt-4 border-t space-y-4">
            <AddCommentForm onAddComment={handleAddComment} />
            
            {loadingComments ? (
              <p className="text-sm text-muted-foreground">Chargement des commentaires...</p>
            ) : (
              <CommentsList comments={comments} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};