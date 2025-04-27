
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel, ContentItem } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";

// Mock data
const heroData = {
  title: "Stranger Things",
  description: "Une série captivante mêlant surnaturel, horreur et aventure dans les années 80. Quand un jeune garçon disparaît, tout un village découvre les mystères et les expériences secrètes qui se cachent derrière.",
  backgroundImage: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  buttonText: "Regarder",
  buttonLink: "/series",
  type: "series",
};

// Mock content for carousels
const trendingFilms: ContentItem[] = [
  { id: "1", title: "Dune", imageUrl: "https://images.unsplash.com/photo-1547700055-b61cacebece9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2021", rating: "PG-13" },
  { id: "2", title: "The Batman", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1756&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "3", title: "Top Gun: Maverick", imageUrl: "https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "4", title: "Avatar 2", imageUrl: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "5", title: "Black Panther 2", imageUrl: "https://images.unsplash.com/photo-1635805737707-575885c8e407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "6", title: "Nope", imageUrl: "https://images.unsplash.com/photo-1655023128625-a399db70e315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2022", rating: "R" },
];

const popularSeries: ContentItem[] = [
  { id: "7", title: "House of the Dragon", imageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2cb0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "series", year: "2022", rating: "18+" },
  { id: "8", title: "The Witcher", imageUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2019", rating: "18+" },
  { id: "9", title: "Stranger Things", imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "series", year: "2016", rating: "16+" },
  { id: "10", title: "The Crown", imageUrl: "https://images.unsplash.com/photo-1604975701446-4e926f394f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2016", rating: "16+" },
  { id: "11", title: "Breaking Bad", imageUrl: "https://images.unsplash.com/photo-1633942304314-a79f4d060123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2008", rating: "18+" },
  { id: "12", title: "Ozark", imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "series", year: "2017", rating: "18+" },
];

const topMusic: ContentItem[] = [
  { id: "13", title: "Midnight Sessions", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2023" },
  { id: "14", title: "Electronic Vibes", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "music", year: "2022" },
  { id: "15", title: "Acoustic Dreams", imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2021" },
  { id: "16", title: "Jazz Ensemble", imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2020" },
  { id: "17", title: "Hip Hop Classics", imageUrl: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2019" },
  { id: "18", title: "Rock Anthems", imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "music", year: "2018" },
];

const tvShows: ContentItem[] = [
  { id: "19", title: "Morning News", imageUrl: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80", type: "tv", year: "2023" },
  { id: "20", title: "Cooking Masters", imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80", type: "tv", year: "2022" },
  { id: "21", title: "World Explorers", imageUrl: "https://images.unsplash.com/photo-1546979348-1e1b5f9e6e18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "tv", year: "2021" },
  { id: "22", title: "Science Today", imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80", type: "tv", year: "2022" },
  { id: "23", title: "Nature Unveiled", imageUrl: "https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "tv", year: "2020" },
  { id: "24", title: "Talk with Stars", imageUrl: "https://images.unsplash.com/photo-1518374361665-f5171864e4a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80", type: "tv", year: "2023" },
];

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
        
        <div className="content-container">
          <ContentCarousel title="Films Tendance" items={trendingFilms} />
          <ContentCarousel title="Séries Populaires" items={popularSeries} />
          <ContentCarousel title="Musique du Moment" items={topMusic} />
          <ContentCarousel title="Émissions TV" items={tvShows} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
