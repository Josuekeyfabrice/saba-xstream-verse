
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentItem } from "./ContentCarousel";

type ContentCardProps = {
  item: ContentItem;
};

export const ContentCard = ({ item }: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group rounded-md overflow-hidden transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={item.imageUrl} 
        alt={item.title}
        className="w-full aspect-[3/4] object-cover rounded-md" 
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-3 transform transition-transform duration-300">
          <h3 className="text-sm font-medium truncate text-white">{item.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            {item.year && (
              <span className="text-xs text-gray-300">{item.year}</span>
            )}
            {item.rating && (
              <span className="text-xs bg-stream-purple/80 px-1.5 py-0.5 rounded">{item.rating}</span>
            )}
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" className="rounded-full bg-stream-purple/90 hover:bg-stream-purple w-12 h-12 flex items-center justify-center">
            <Play className="h-5 w-5 fill-current" />
            <span className="sr-only">Play {item.title}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
