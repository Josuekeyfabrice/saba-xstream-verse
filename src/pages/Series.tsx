
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";
import { FeaturedSeries } from "@/components/featured/FeaturedSeries";
import { NetFreeSeries } from "@/components/series/NetFreeSeries";
import { toast } from "@/hooks/use-toast";
import { 
  heroData, 
  dramaSeries, 
  fantasySeries, 
  thrillerSeries, 
  netfreeRecentSeries,
  featuredSeries
} from "@/data/seriesData";

const Series = () => {
  // Simulation of loading NetFree2 series
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Séries NetFree2 chargées",
        description: "Les séries télévisées les plus récentes ont été importées avec succès."
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white bg-gradient-to-b from-stream-dark to-stream-darker">
      <Navbar />
      
      <main className="pt-16">
        <Hero 
          title={heroData.title}
          description={heroData.description}
          backgroundImage="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
          buttonText={heroData.buttonText}
          buttonLink={heroData.buttonLink}
          type={heroData.type}
        />
        
        {/* Section des séries NetFree2 */}
        <NetFreeSeries series={netfreeRecentSeries} />
        
        {/* Section série en vedette */}
        <FeaturedSeries series={featuredSeries} />
        
        <div className="content-container">
          <ContentCarousel title="Drames" items={dramaSeries} />
          <ContentCarousel title="Fantasy & Science Fiction" items={fantasySeries} />
          <ContentCarousel title="Thrillers" items={thrillerSeries} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Series;
