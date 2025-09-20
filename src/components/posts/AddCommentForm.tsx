import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AddCommentFormProps {
  onAddComment: (content: string) => void;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ onAddComment }) => {
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddComment(content);
      setContent('');
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.email || ''} />
        <AvatarFallback>{user.email?.[0] || 'U'}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <Textarea
          placeholder="Écrivez un commentaire..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-10 resize-none"
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="sm"
            disabled={!content.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-3 w-3 mr-1" />
            Commenter
          </Button>
        </div>
      </div>
    </form>
  );
};