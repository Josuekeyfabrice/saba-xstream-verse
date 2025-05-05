
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { FeaturedMovie } from "@/components/featured/FeaturedMovie";
import { FeaturedSeries } from "@/components/featured/FeaturedSeries";
import { ContentCategories } from "@/components/featured/ContentCategories";
import { 
  heroData, 
  bestMovie, 
  bestSeries, 
  contentCategories 
} from "@/data/featuredContent";

const Index = () => {
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
        
        {/* Featured Best Movie Section */}
        <FeaturedMovie movie={bestMovie} />
        
        {/* Featured Best Series Section */}
        <FeaturedSeries series={bestSeries} />
        
        {/* Content Categories */}
        <ContentCategories categories={contentCategories} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
