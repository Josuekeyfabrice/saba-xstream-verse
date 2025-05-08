
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MediaPreviewProps } from "./types";

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  selectedImage,
  selectedVideo,
  removeImage,
  removeVideo,
}) => {
  if (selectedImage) {
    return (
      <div className="relative">
        <img 
          src={selectedImage} 
          alt="Selected" 
          className="max-h-64 rounded-md object-cover" 
        />
        <Button 
          type="button"
          variant="destructive" 
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
          onClick={removeImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  if (selectedVideo) {
    return (
      <div className="relative">
        <video 
          src={selectedVideo} 
          controls
          className="max-h-64 w-full rounded-md object-cover" 
        />
        <Button 
          type="button"
          variant="destructive" 
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
          onClick={removeVideo}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return null;
};
