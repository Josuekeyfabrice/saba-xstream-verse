
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel, ContentItem } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";

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
  { id: "1", title: "Mission Impossible", imageUrl: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "film", year: "2023", rating: "PG-13" },
  { id: "2", title: "Fast & Furious", imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80", type: "film", year: "2021", rating: "PG-13" },
  { id: "3", title: "The Batman", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1756&q=80", type: "film", year: "2022", rating: "PG-13" },
  { id: "4", title: "John Wick", imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", type: "film", year: "2023", rating: "R" },
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

const Films = () => {
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
