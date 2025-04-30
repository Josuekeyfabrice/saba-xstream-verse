
import React from 'react';
import { ContentCard } from './ContentCard';

export interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  year: string;
  rating?: string;
}

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  emptyMessage?: string;
}

export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, items, emptyMessage = "Aucun contenu disponible" }) => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
        
        {items.length > 0 ? (
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {items.map((item) => (
              <div key={item.id} className="snap-start">
                <ContentCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-stream-darker/50 p-8 rounded-lg text-center">
            <p className="text-lg text-gray-400">{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
};

