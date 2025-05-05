
import React from 'react';
import { FilmIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeaturedMovieProps {
  movie: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    rating: string;
    year: string;
  };
}

export const FeaturedMovie = ({ movie }: FeaturedMovieProps) => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-stream-darker to-stream-dark">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <FilmIcon className="w-6 h-6 text-stream-purple mr-2" />
          <h2 className="text-2xl font-bold text-white">Meilleur Film</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="relative rounded-lg overflow-hidden h-[400px]">
              <img 
                src={movie.imageUrl} 
                alt={movie.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-stream-purple px-2 py-1 rounded text-sm font-medium">
                {movie.rating}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-2">{movie.title}</h3>
            <div className="flex items-center mb-4">
              <span className="text-stream-purple font-medium mr-3">{movie.year}</span>
              <span className="text-gray-400">Film à succès mondial</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">{movie.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-stream-purple hover:bg-stream-purple/90"
              >
                <Link to="/films">Regarder maintenant</Link>
              </Button>
              <Button variant="outline" size="lg">Ajouter à ma liste</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
