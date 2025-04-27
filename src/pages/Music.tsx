
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel, ContentItem } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";

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

const Music = () => {
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
