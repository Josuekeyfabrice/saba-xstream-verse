
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel, ContentItem } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";
import { Play, Pause, Video, Upload, Plus } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

// Mock data
const heroData = {
  title: "Nouveautés Musicales",
  description: "Découvrez les dernières sorties et les meilleures playlists pour tous vos moments musicaux. Des artistes les plus populaires aux talents émergents, trouvez la bande sonore parfaite pour votre journée.",
  backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  buttonText: "Écouter",
  buttonLink: "/music",
  type: "music",
};

// Mock content for carousels
const newReleases: ContentItem[] = [
  { id: "1", title: "Midnight Sessions", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "2", title: "Electronic Vibes", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "music", year: "2022" },
  { id: "3", title: "Summer Beats", imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "4", title: "Urban Classics", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "5", title: "Future Pop", imageUrl: "https://images.unsplash.com/photo-1571101628768-6bae350b1a5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "music", year: "2023" },
  { id: "6", title: "R&B Revival", imageUrl: "https://images.unsplash.com/photo-1493225458583-94cbf1f92f3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
];

const popularPlaylists: ContentItem[] = [
  { id: "7", title: "Workout Hits", imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "8", title: "Chill Lofi", imageUrl: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "9", title: "Road Trip", imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1721&q=80", type: "music", year: "2023" },
  { id: "10", title: "Party Starters", imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "11", title: "Deep Focus", imageUrl: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80", type: "music", year: "2023" },
  { id: "12", title: "Sleep & Relaxation", imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80", type: "music", year: "2023" },
];

const genres: ContentItem[] = [
  { id: "13", title: "Hip Hop", imageUrl: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "14", title: "Rock", imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "15", title: "Jazz", imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "16", title: "Électronique", imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "17", title: "Pop", imageUrl: "https://images.unsplash.com/photo-1549417229-7686ac5595fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "18", title: "Classique", imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
];

// Données pour les vidéos musicales
const musicVideos = [
  {
    id: "1",
    title: "Summer Vibes - Live Session",
    description: "Performance live exclusive avec des artistes émergents de la scène électronique",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    artist: "DJ ElectroGroove",
    duration: "4:32"
  },
  {
    id: "2",
    title: "Urban Beats - Official Video",
    description: "Le dernier clip officiel qui fait sensation dans le monde du hip-hop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    artist: "MC UrbanFlow",
    duration: "3:45"
  },
  {
    id: "3",
    title: "Acoustic Melodies - Unplugged",
    description: "Une session acoustique intime qui vous touchera droit au cœur",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    artist: "Melody Makers",
    duration: "5:18"
  },
];

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  artist: string;
  duration: string;
}

const Music = () => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    artist: ""
  });
  const [userVideos, setUserVideos] = useState<any[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [videoFormData, setVideoFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    artist: "",
    duration: ""
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handlePlayVideo = (video: any) => {
    setCurrentVideo(video.videoUrl);
    setVideoDetails({
      title: video.title,
      description: video.description,
      artist: video.artist
    });
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
      // Créer une URL temporaire pour l'aperçu
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setVideoFormData(prev => ({
        ...prev,
        thumbnailUrl: previewUrl
      }));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      // Dans un environnement réel, on uploadera la vidéo et récupérera l'URL
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dans un cas réel, on enverrait les fichiers à un serveur et on récupérerait les URLs
    // Ici, on simule l'ajout d'une nouvelle vidéo
    const newVideo = {
      id: `user-${userVideos.length + 1}`,
      ...videoFormData,
      videoUrl: videoFormData.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ", // URL par défaut si pas fournie
    };
    
    setUserVideos(prev => [...prev, newVideo]);
    setIsUploadDialogOpen(false);
    toast.success("Vidéo ajoutée avec succès!");
    
    // Reset form
    setVideoFormData({
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      artist: "",
      duration: ""
    });
    setThumbnailFile(null);
    setVideoFile(null);
  };

  // Combiner les vidéos existantes avec celles uploadées par l'utilisateur
  const allVideos = [...musicVideos, ...userVideos];

  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <Navbar />
      
      <main className="pt-16">
        <Hero 
          title={heroData.title}
          description={heroData.description}
          backgroundImage={heroData.backgroundImage}
          buttonText={heroData.buttonText}
          buttonLink={heroData.buttonLink}
          type={heroData.type}
        />
        
        {/* Section de lecteur vidéo avec bouton d'upload */}
        <div className="content-container mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Vidéos Musicales</h2>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Upload size={16} />
                  Uploader une vidéo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Partager votre vidéo musicale</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input 
                      id="title"
                      name="title"
                      placeholder="Titre de votre vidéo" 
                      value={videoFormData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="artist">Artiste</Label>
                    <Input 
                      id="artist"
                      name="artist" 
                      placeholder="Nom de l'artiste"
                      value={videoFormData.artist}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      placeholder="Décrivez votre vidéo"
                      value={videoFormData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée</Label>
                    <Input 
                      id="duration"
                      name="duration"
                      placeholder="Ex: 3:45"
                      value={videoFormData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Miniature</Label>
                      <Input 
                        id="thumbnail" 
                        type="file" 
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="cursor-pointer"
                        required
                      />
                      {videoFormData.thumbnailUrl && (
                        <div className="mt-2">
                          <img 
                            src={videoFormData.thumbnailUrl} 
                            alt="Aperçu de la miniature" 
                            className="w-full h-24 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="video">Vidéo</Label>
                      <Input 
                        id="video" 
                        type="file" 
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Ou utilisez un lien YouTube:
                      </p>
                      <Input 
                        id="videoUrl"
                        name="videoUrl" 
                        placeholder="https://www.youtube.com/embed/..."
                        value={videoFormData.videoUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit">Publier la vidéo</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {allVideos.map((video) => (
              <Card key={video.id} className="glass-card overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                          onClick={() => handlePlayVideo(video)}
                        >
                          <Play className="h-8 w-8 text-white fill-white" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{video.title}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video">
                          <iframe 
                            src={`${video.videoUrl}?autoplay=1`}
                            title={video.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <p className="text-sm text-gray-300 mt-2">{video.description}</p>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription className="text-white/70">{video.artist}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-gray-300 line-clamp-2">{video.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => handlePlayVideo(video)}
                  >
                    <Video className="mr-2 h-4 w-4" /> Voir la vidéo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Sections de playlists existantes */}
        <div className="content-container">
          <ContentCarousel title="Nouvelles Sorties" items={newReleases} />
          <ContentCarousel title="Playlists Populaires" items={popularPlaylists} />
          <ContentCarousel title="Par Genre" items={genres} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Music;
