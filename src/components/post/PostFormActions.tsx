
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Image, 
  Video, 
  UserPlus, 
  MapPin, 
  Smile,
  Camera,
  Send
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { PostFormActionsProps } from "./types";

// Émojis populaires pour le sélecteur
const popularEmojis = ["😀", "😂", "😍", "🥰", "😎", "🔥", "👍", "❤️", "✨", "🙌", "🎉", "🤔", "😢", "👏", "🤩"];

export const PostFormActions: React.FC<PostFormActionsProps> = ({
  fileInputRef,
  videoInputRef,
  handleImageSelect,
  handleVideoSelect,
  takePicture,
  setShowTagInput,
  showTagInput,
  handleGetLocation,
  isAddingLocation,
  handleAddEmoji,
  isSubmitting,
  content,
  selectedImage,
  selectedVideo
}) => {
  return (
    <div className="border-t border-gray-700 pt-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-1 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Photo</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={() => videoInputRef.current?.click()}
          >
            <Video className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Vidéo</span>
          </Button>
          <input
            type="file"
            ref={videoInputRef}
            className="hidden"
            accept="video/*"
            onChange={handleVideoSelect}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={takePicture}
          >
            <Camera className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Direct</span>
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={() => setShowTagInput(!showTagInput)}
          >
            <UserPlus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Taguer</span>
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs sm:text-sm"
            onClick={handleGetLocation}
            disabled={isAddingLocation}
          >
            <MapPin className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">
              {isAddingLocation ? "..." : "Lieu"}
            </span>
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs sm:text-sm"
              >
                <Smile className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Emoji</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex flex-wrap gap-2">
                {popularEmojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleAddEmoji(emoji)}
                    className="text-xl hover:bg-stream-purple/10 p-1 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <Button 
          type="submit" 
          className="bg-stream-purple hover:bg-stream-purple/90"
          disabled={(!content.trim() && !selectedImage && !selectedVideo) || isSubmitting}
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? "Envoi..." : "Publier"}
        </Button>
      </div>
    </div>
  );
};
