
import { useState } from "react";
import { Play, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface NetFreeVideo {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  duration: string;
  year: string;
  description: string;
  source: string;
}

interface NetFreeVideosProps {
  videos: NetFreeVideo[];
}

export const NetFreeVideos = ({ videos }: NetFreeVideosProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<NetFreeVideo | null>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Mise à jour effectuée",
        description: "Les vidéos NetFree2 ont été actualisées."
      });
    }, 1500);
  };

  return (
    <div className="content-container my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Vidéos Récentes NetFree2</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Contenu importé depuis <a href="https://netfree2.cc/home" target="_blank" rel="noopener noreferrer" className="text-stream-purple hover:underline">NetFree2.cc</a>
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Actualiser"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="relative group overflow-hidden rounded-lg bg-stream-darker">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.imageUrl} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full w-16 h-16 bg-stream-purple/80 hover:bg-stream-purple"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{selectedVideo?.title} ({selectedVideo?.year})</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video">
                      {selectedVideo && (
                        <iframe 
                          src={`${selectedVideo.videoUrl}?autoplay=1`}
                          title={selectedVideo.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-200">{selectedVideo?.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <div><span className="font-medium text-white">Source:</span> {selectedVideo?.source}</div>
                        <div><span className="font-medium text-white">Durée:</span> {selectedVideo?.duration}</div>
                        <div><span className="font-medium text-white">Année:</span> {selectedVideo?.year}</div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="absolute bottom-2 right-2 bg-stream-purple px-2 py-1 rounded text-xs font-medium">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1">{video.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-300">{video.year}</span>
                <span className="flex items-center text-xs text-gray-300">
                  <Tv className="h-3 w-3 mr-1" />
                  {video.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
