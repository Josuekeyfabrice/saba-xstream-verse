
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "./ContentCard";

export type ContentItem = {
  id: string;
  title: string;
  imageUrl: string;
  type: "film" | "series" | "music" | "tv";
  year?: string;
  rating?: string;
};

type ContentCarouselProps = {
  title: string;
  items: ContentItem[];
};

export const ContentCarousel = ({ title, items }: ContentCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;
        
      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      // Check initial state
      handleScroll();
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="relative mt-8 mb-12">
      <h2 className="text-2xl font-bold mb-4 px-4 sm:px-6 lg:px-8">{title}</h2>
      <div className="relative group">
        {showLeftArrow && (
          <Button
            onClick={() => scroll("left")}
            variant="ghost"
            size="icon"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 bg-stream-dark/80 hover:bg-stream-dark rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}
        
        <div
          ref={carouselRef}
          className="flex gap-2 md:gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scrollbar-none snap-x"
          onScroll={handleScroll}
        >
          {items.map((item) => (
            <div key={item.id} className="flex-none w-[180px] md:w-[240px] snap-start">
              <ContentCard item={item} />
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <Button
            onClick={() => scroll("right")}
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 bg-stream-dark/80 hover:bg-stream-dark rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}
      </div>
    </div>
  );
};
