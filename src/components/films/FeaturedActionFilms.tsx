
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FeaturedFilm {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  director: string;
  duration: string;
  year: string;
  rating: string;
}

interface FeaturedActionFilmsProps {
  films: FeaturedFilm[];
}

export const FeaturedActionFilms = ({ films }: FeaturedActionFilmsProps) => {
  const [selectedFilm, setSelectedFilm] = useState<FeaturedFilm | null>(null);

  return (
    <div className="content-container my-10">
      <h2 className="text-2xl font-bold mb-6">Films d'Action en Vedette</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <div key={film.id} className="relative group overflow-hidden rounded-lg">
            <img 
              src={film.imageUrl} 
              alt={film.title} 
              className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 transition-opacity flex flex-col justify-end p-4">
              <h3 className="text-xl font-bold mb-1">{film.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
                <span>{film.year}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span>{film.duration}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span className="bg-stream-purple/80 px-1.5 py-0.5 rounded">{film.rating}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2 mb-3">{film.description}</p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full flex items-center justify-center gap-2" 
                    onClick={() => setSelectedFilm(film)}
                  >
                    <Play className="h-4 w-4" /> Regarder
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{film.title} ({film.year})</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video">
                    {selectedFilm && (
                      <iframe 
                        src={`${selectedFilm.videoUrl}?autoplay=1`}
                        title={selectedFilm.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-200">{selectedFilm?.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <div><span className="font-medium text-white">Réalisateur:</span> {selectedFilm?.director}</div>
                      <div><span className="font-medium text-white">Durée:</span> {selectedFilm?.duration}</div>
                      <div><span className="font-medium text-white">Classification:</span> {selectedFilm?.rating}</div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
