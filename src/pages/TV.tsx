import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel, ContentItem } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";

// Mock data
const heroData = {
  title: "Émissions TV en Direct",
  description: "Regardez vos émissions télévisées préférées en direct et à la demande. Des actualités aux documentaires en passant par les talk-shows et émissions de cuisine, toute la télévision est à portée de main.",
  backgroundImage: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
  buttonText: "Regarder en Direct",
  buttonLink: "https://french-tv.lol/",
  type: "external",
};

// Mock content for carousels
const liveNow: ContentItem[] = [
  { id: "1", title: "Morning News", imageUrl: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80", type: "tv", year: "2023" },
  { id: "2", title: "Talk Show Live", imageUrl: "https://images.unsplash.com/photo-1518374361665-f5171864e4a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80", type: "tv", year: "2023" },
  { id: "3", title: "Sports Center", imageUrl: "https://images.unsplash.com/photo-1580692475446-7fdb197cabce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2023" },
  { id: "4", title: "Cooking Live", imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80", type: "tv", year: "2023" },
  { id: "5", title: "Finance Report", imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2023" },
  { id: "6", title: "Entertainment Tonight", imageUrl: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2023" },
];

const documentaries: ContentItem[] = [
  { id: "7", title: "Planet Earth", imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "tv", year: "2022" },
  { id: "8", title: "The Human Body", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80", type: "tv", year: "2021" },
  { id: "9", title: "World War II", imageUrl: "https://images.unsplash.com/photo-1580130601254-05fa3618e400?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2020" },
  { id: "10", title: "Deep Ocean", imageUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2021" },
  { id: "11", title: "Great Artists", imageUrl: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1195&q=80", type: "tv", year: "2022" },
  { id: "12", title: "Space Exploration", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80", type: "tv", year: "2022" },
];

const reality: ContentItem[] = [
  { id: "13", title: "Chef Competition", imageUrl: "https://images.unsplash.com/photo-1611599654856-9840959108a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2023" },
  { id: "14", title: "Survivor Island", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80", type: "tv", year: "2023" },
  { id: "15", title: "House Makeover", imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2022" },
  { id: "16", title: "Celebrity Ranch", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80", type: "tv", year: "2023" },
  { id: "17", title: "Dating Show", imageUrl: "https://images.unsplash.com/photo-1596473537045-453196250468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2022" },
  { id: "18", title: "Talent Search", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "tv", year: "2023" },
];

const TV = () => {
  const handleWatchLive = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(heroData.buttonLink, '_blank', 'noopener,noreferrer');
  };

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
          onButtonClick={handleWatchLive}
        />
        
        <div className="content-container">
          <ContentCarousel title="En Direct Maintenant" items={liveNow} />
          <ContentCarousel title="Documentaires" items={documentaries} />
          <ContentCarousel title="Télé-Réalité" items={reality} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TV;
