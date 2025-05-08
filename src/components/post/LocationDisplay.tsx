
import React from "react";
import { MapPin, X } from "lucide-react";
import { LocationDisplayProps } from "./types";

export const LocationDisplay: React.FC<LocationDisplayProps> = ({ location, removeLocation }) => {
  if (!location) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <MapPin className="h-3 w-3" />
      <span>{location}</span>
      <button 
        type="button" 
        onClick={removeLocation}
        className="h-4 w-4 rounded-full hover:bg-gray-700 flex items-center justify-center"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};
