
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { NetFreeVideos } from "@/components/films/NetFreeVideos";
import { FeaturedActionFilms } from "@/components/films/FeaturedActionFilms";
import { 
  heroData, 
  actionFilms, 
  scifiFilms, 
  comedyFilms, 
  featuredActionFilms, 
  netfreeRecentVideos 
} from "@/data/filmsData";

const Films = () => {
  // Simulation of loading NetFree2 videos
  useEffect(() => {
    const timer = setTimeout(() => {
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
        <NetFreeVideos videos={netfreeRecentVideos} />
        
        {/* Section films d'action en vedette avec possibilité de visionnage */}
        <FeaturedActionFilms films={featuredActionFilms} />
        
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
