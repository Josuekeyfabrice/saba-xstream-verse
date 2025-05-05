
import React from 'react';
import { ContentCarousel, ContentItem } from '@/components/ContentCarousel';

interface ContentCategoriesProps {
  categories: {
    title: string;
    items: ContentItem[];
  }[];
}

export const ContentCategories = ({ categories }: ContentCategoriesProps) => {
  return (
    <div className="content-container">
      {categories.map((category, index) => (
        <ContentCarousel 
          key={index} 
          title={category.title} 
          items={category.items} 
        />
      ))}
    </div>
  );
};
