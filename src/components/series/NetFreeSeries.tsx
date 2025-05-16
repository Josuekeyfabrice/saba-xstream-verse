
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface NetFreeSeriesVideo {
  id: string;
  title: string;
  imageUrl: string;
  duration?: string;
  episodes?: number;
  seasons?: number;
}

interface NetFreeSeriesProps {
  series: NetFreeSeriesVideo[];
}

export const NetFreeSeries = ({ series }: NetFreeSeriesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoList, setVideoList] = useState(series);
  const [selectedVideo, setSelectedVideo] = useState<NetFreeSeriesVideo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API call to refresh videos
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Séries TV mises à jour",
        description: "Les séries TV les plus récentes ont été importées avec succès."
      });
    }, 1500);
  };

  const handlePlayVideo = (video: NetFreeSeriesVideo) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  };

  return (
    <section className="py-8 px-4 bg-[#0A0A0A]/90 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-white">Séries TV NetFree2</h2>
            <span className="ml-2 text-xs bg-stream-purple px-2 py-1 rounded-full">Populaire</span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
            className="border-stream-purple hover:bg-stream-purple/20"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {videoList.map((video) => (
            <Card key={video.id} className="bg-stream-gray/50 border-stream-gray hover:border-stream-purple transition-colors overflow-hidden">
              <div className="relative cursor-pointer" onClick={() => handlePlayVideo(video)}>
                <AspectRatio ratio={16/9}>
                  <img
                    src={video.imageUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="rounded-full bg-stream-purple/80 hover:bg-stream-purple w-12 h-12">
                    <Play className="h-6 w-6 fill-current" />
                  </Button>
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </span>
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 text-white mb-1">{video.title}</h3>
                {(video.seasons || video.episodes) && (
                  <div className="text-xs text-gray-300">
                    {video.seasons && `${video.seasons} saison${video.seasons > 1 ? 's' : ''}`}
                    {video.seasons && video.episodes && ' • '}
                    {video.episodes && `${video.episodes} épisode${video.episodes > 1 ? 's' : ''}`}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] bg-stream-darker text-white border-stream-gray">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black/50 flex items-center justify-center rounded-md overflow-hidden">
            {selectedVideo && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto text-stream-purple" />
                  <p className="mt-4 text-gray-400">Lecture de contenu non disponible en prévisualisation</p>
                </div>
              </div>
            )}
          </div>
          {selectedVideo && (selectedVideo.seasons || selectedVideo.episodes) && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Informations</h3>
              <ScrollArea className="h-[100px]">
                <div className="space-y-2">
                  {selectedVideo.seasons && (
                    <div className="flex justify-between">
                      <span>Saisons:</span>
                      <span>{selectedVideo.seasons}</span>
                    </div>
                  )}
                  {selectedVideo.episodes && (
                    <div className="flex justify-between">
                      <span>Épisodes:</span>
                      <span>{selectedVideo.episodes}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Source:</span>
                    <span>NetFree2</span>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
