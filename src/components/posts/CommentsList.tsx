import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Comment } from '@/hooks/usePosts';

interface CommentsListProps {
  comments: Comment[];
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (comments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Aucun commentaire pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${comment.user_id}`} alt={comment.profiles?.name || 'User'} />
            <AvatarFallback>{comment.profiles?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1">
            <div className="bg-muted rounded-lg px-3 py-2">
              <p className="font-medium text-sm">{comment.profiles?.name || 'Utilisateur'}</p>
              <p className="text-sm">{comment.content}</p>
            </div>
            <p className="text-xs text-muted-foreground ml-3">
              {formatDate(comment.created_at)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};