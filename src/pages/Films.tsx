import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel, ContentItem } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";
import { Play, Video, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

// Mock data
const heroData = {
  title: "Dune",
  description: "Une adaptation épique du roman de Frank Herbert. Paul Atreides, un jeune homme brillant destiné à connaître un destin hors du commun, doit se rendre sur la planète la plus dangereuse de l'univers pour assurer l'avenir de sa famille et de son peuple.",
  backgroundImage: "https://images.unsplash.com/photo-1547700055-b61cacebece9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  buttonText: "Regarder",
  buttonLink: "/films",
  type: "films",
};

// Mock content for carousels
const actionFilms: ContentItem[] = [
  { id: "1", title: "Chasse à l'Homme", imageUrl: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "film", year: "2023", rating: "PG-13" },
  { id: "2", title: "Commando", imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80", type: "film", year: "2021", rating: "PG-13" },
  { id: "3", title: "Opération Secrète", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1756&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "4", title: "Mercenaires", imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", type: "film", year: "2023", rating: "R" },
  { id: "5", title: "Extraction", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80", type: "film", year: "2020", rating: "R" },
  { id: "6", title: "The Gray Man", imageUrl: "https://images.unsplash.com/photo-1614854262340-ab1ca7fb56c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2022", rating: "PG-13" },
];

const scifiFilms: ContentItem[] = [
  { id: "7", title: "Dune", imageUrl: "https://images.unsplash.com/photo-1547700055-b61cacebece9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2021", rating: "PG-13" },
  { id: "8", title: "Interstellar", imageUrl: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2014", rating: "PG-13" },
  { id: "9", title: "Avatar", imageUrl: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "10", title: "Blade Runner", imageUrl: "https://images.unsplash.com/photo-1515940390214-5524e67786f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80", type: "film", year: "2049", rating: "R" },
  { id: "11", title: "Inception", imageUrl: "https://images.unsplash.com/photo-1661458596299-3750fefe0c4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2010", rating: "PG-13" },
  { id: "12", title: "Tenet", imageUrl: "https://images.unsplash.com/photo-1626788628193-6e7b31945bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2020", rating: "PG-13" },
];

const comedyFilms: ContentItem[] = [
  { id: "13", title: "Free Guy", imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "film", year: "2021", rating: "PG-13" },
  { id: "14", title: "Barbie", imageUrl: "https://images.unsplash.com/photo-1490553020219-d513aaa0a9e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80", type: "film", year: "2023", rating: "PG-13" },
  { id: "15", title: "The Menu", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2022", rating: "R" },
  { id: "16", title: "Bullet Train", imageUrl: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80", type: "film", year: "2022", rating: "R" },
  { id: "17", title: "The Lost City", imageUrl: "https://images.unsplash.com/photo-1518141532615-4305c9f914c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "18", title: "Thor: Love & Thunder", imageUrl: "https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2022", rating: "PG-13" },
];

// Détails pour les films d'action en vedette
const featuredActionFilms = [
  {
    id: "action-1",
    title: "Chasse à l'Homme",
    description: "Un ex-agent des forces spéciales est traqué par son ancien mentor dans une chasse à l'homme impitoyable à travers les montagnes isolées. Suspense et action garantis dans ce thriller haletant.",
    imageUrl: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "David Reynolds",
    duration: "1h 58min",
    year: "2023",
    rating: "PG-13"
  },
  {
    id: "action-2",
    title: "Commando",
    description: "Un soldat d'élite sort de sa retraite pour sauver sa fille kidnappée par un cartel dangereux. Il devra utiliser toutes ses compétences pour infiltrer une forteresse imprenable.",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Sarah Mitchell",
    duration: "2h 12min",
    year: "2021",
    rating: "PG-13"
  },
  {
    id: "action-3",
    title: "Opération Secrète",
    description: "Une équipe d'agents secrets internationaux est rassemblée pour déjouer une attaque terroriste mondiale. Une course contre la montre commence à travers plusieurs capitales.",
    imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1756&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Michael Chen",
    duration: "2h 05min",
    year: "2022",
    rating: "PG-13"
  },
  {
    id: "action-4",
    title: "Mercenaires",
    description: "Un groupe de mercenaires est embauché pour renverser un dictateur dans un pays déchiré par la guerre. Les loyautés sont mises à l'épreuve quand ils découvrent une conspiration plus vaste.",
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Elena Rodriguez",
    duration: "2h 18min",
    year: "2023",
    rating: "R"
  }
];

// Vidéos récentes depuis NetFree2
const netfreeRecentVideos = [
  { 
    id: "nf-1", 
    title: "Black Widow", 
    imageUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2h 14min",
    year: "2023",
    description: "Natasha Romanoff confronte les parties les plus sombres de son grand livre lorsqu'une conspiration dangereuse liée à son passé surgit.",
    source: "NetFree2"
  },
  { 
    id: "nf-2", 
    title: "The Batman", 
    imageUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2h 56min",
    year: "2022",
    description: "Lorsqu'un tueur prend pour cible l'élite de Gotham avec une série de machinations sadiques, Batman est contraint de nouvelles pistes dans le monde souterrain.",
    source: "NetFree2"
  },
  { 
    id: "nf-3", 
    title: "No Time To Die", 
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2h 43min",
    year: "2021",
    description: "James Bond a quitté les services secrets et coule des jours heureux en Jamaïque. Mais sa tranquillité est de courte durée car son vieil ami Felix Leiter de la CIA débarque pour solliciter son aide.",
    source: "NetFree2"
  },
  { 
    id: "nf-4", 
    title: "Avatar: La Voie de l'eau", 
    imageUrl: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3h 12min",
    year: "2022",
    description: "Jake Sully et Ney'tiri ont formé une famille et font tout pour rester aussi soudés que possible. Ils sont cependant contraints de quitter leur foyer et d'explorer les différentes régions de Pandora.",
    source: "NetFree2"
  },
  { 
    id: "nf-5", 
    title: "Top Gun: Maverick", 
    imageUrl: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2h 11min",
    year: "2022",
    description: "Après plus de 30 ans de service en tant que l'un des meilleurs aviateurs de la Marine, Pete Mitchell est à sa place, repoussant les limites en tant que courageux pilote d'essai.",
    source: "NetFree2"
  },
  { 
    id: "nf-6", 
    title: "Shang-Chi", 
    imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "2h 12min",
    year: "2021",
    description: "Shang-Chi doit faire face à son passé qu'il pensait avoir laissé derrière lui lorsqu'il est entraîné dans la toile de la mystérieuse organisation des Dix Anneaux.",
    source: "NetFree2"
  },
];

const Films = () => {
  const [selectedFilm, setSelectedFilm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulation de chargement des vidéos NetFree2
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Vidéos NetFree2 chargées",
        description: "Les vidéos les plus récentes ont été importées avec succès."
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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

        {/* Section des vidéos NetFree2 */}
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
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  toast({
                    title: "Mise à jour effectuée",
                    description: "Les vidéos NetFree2 ont été actualisées."
                  });
                }, 1500);
              }}
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Actualiser"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {netfreeRecentVideos.map((video) => (
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
                          onClick={() => setSelectedFilm(video)}
                        >
                          <Play className="h-8 w-8" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>{video.title} ({video.year})</DialogTitle>
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
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-gray-200">{video.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                            <div><span className="font-medium text-white">Source:</span> {video.source}</div>
                            <div><span className="font-medium text-white">Durée:</span> {video.duration}</div>
                            <div><span className="font-medium text-white">Année:</span> {video.year}</div>
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
        
        {/* Section films d'action en vedette avec possibilité de visionnage */}
        <div className="content-container my-10">
          <h2 className="text-2xl font-bold mb-6">Films d'Action en Vedette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredActionFilms.map((film) => (
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
                      <Button className="w-full flex items-center justify-center gap-2" onClick={() => setSelectedFilm(film)}>
                        <Play className="h-4 w-4" /> Regarder
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{film.title} ({film.year})</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video">
                        <iframe 
                          src={`${film.videoUrl}?autoplay=1`}
                          title={film.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-200">{film.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                          <div><span className="font-medium text-white">Réalisateur:</span> {film.director}</div>
                          <div><span className="font-medium text-white">Durée:</span> {film.duration}</span>
                          <div><span className="font-medium text-white">Classification:</span> {film.rating}</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sections de films existantes */}
        <div className="content-container">
          <ContentCarousel title="Films d'Action" items={actionFilms} />
          <ContentCarousel title="Science Fiction" items={scifiFilms} />
          <ContentCarousel title="Comédies" items={comedyFilms} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Films;
