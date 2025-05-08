
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentFormProps } from "./types";

export const CommentForm: React.FC<CommentFormProps> = ({
  newComment,
  setNewComment,
  handleAddComment,
  handleTyping
}) => {
  return (
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
  );
};
