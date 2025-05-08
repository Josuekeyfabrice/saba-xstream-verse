
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { TagFriendInputProps } from "./types";

export const TagFriendInput: React.FC<TagFriendInputProps> = ({
  tagInput,
  setTagInput,
  handleTagFriend
}) => {
  return (
    <div className="flex gap-2 items-center">
      <UserPlus className="h-4 w-4 text-gray-400" />
      <input 
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        placeholder="Nom de l'ami à taguer"
        className="flex-1 bg-stream-dark border border-gray-700 rounded px-2 py-1 text-sm"
      />
      <Button 
        type="button" 
        size="sm" 
        onClick={handleTagFriend}
        disabled={!tagInput.trim()}
      >
        Taguer
      </Button>
    </div>
  );
};
