
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReplyFormProps } from "./types";

export const ReplyForm: React.FC<ReplyFormProps> = ({
  replyContent,
  setReplyContent,
  handleAddReply,
  handleTyping,
  cancelReply,
  username
}) => {
  return (
    <div className="mt-3 flex gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" alt="Votre profil" />
        <AvatarFallback>VP</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea
          placeholder={`Répondre à ${username}...`}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          onKeyDown={handleTyping}
          className="min-h-10 py-1 text-sm resize-none"
        />
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={cancelReply}
          >
            Annuler
          </Button>
          <Button
            size="sm"
            className="bg-stream-purple hover:bg-stream-purple/90"
            onClick={handleAddReply}
            disabled={!replyContent.trim()}
          >
            Répondre
          </Button>
        </div>
      </div>
    </div>
  );
};
