
import React from "react";
import { X } from "lucide-react";
import { TaggedFriendsDisplayProps } from "./types";

export const TaggedFriendsDisplay: React.FC<TaggedFriendsDisplayProps> = ({ 
  taggedFriends, 
  removeTaggedFriend 
}) => {
  if (taggedFriends.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      {taggedFriends.map(friend => (
        <div key={friend} className="bg-stream-purple/20 text-stream-purple px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <span>@{friend}</span>
          <button 
            type="button" 
            onClick={() => removeTaggedFriend(friend)}
            className="h-4 w-4 rounded-full hover:bg-stream-purple/30 flex items-center justify-center"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
