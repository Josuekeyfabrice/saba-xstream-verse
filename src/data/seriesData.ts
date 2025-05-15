
import { ContentItem } from "@/components/ContentCarousel";

// Hero data for Series page
export const heroData = {
  title: "Stranger Things",
  description: "Une série captivante mêlant surnaturel, horreur et aventure dans les années 80. Quand un jeune garçon disparaît, tout un village découvre les mystères et les expériences secrètes qui se cachent derrière.",
  backgroundImage: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  buttonText: "Regarder",
  buttonLink: "/series",
  type: "series",
};

// Recent NetFree2 TV series
export const netfreeRecentSeries = [
  { 
    id: "s1", 
    title: "La Maison du Dragon", 
    imageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2cb0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", 
    episodes: 10, 
    seasons: 1 
  },
  { 
    id: "s2", 
    title: "Le Seigneur des Anneaux : Les Anneaux de Pouvoir", 
    imageUrl: "https://images.unsplash.com/photo-1518709594023-6ebd591c217f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", 
    episodes: 8, 
    seasons: 1 
  },
  { 
    id: "s3", 
    title: "Mercredi", 
    imageUrl: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", 
    episodes: 8, 
    seasons: 1 
  },
  { 
    id: "s4", 
    title: "Breaking Bad", 
    imageUrl: "https://images.unsplash.com/photo-1633942304314-a79f4d060123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", 
    episodes: 62, 
    seasons: 5 
  },
  { 
    id: "s5", 
    title: "The Last of Us", 
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", 
    episodes: 9, 
    seasons: 1 
  },
  { 
    id: "s6", 
    title: "Peaky Blinders", 
    imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", 
    episodes: 36, 
    seasons: 6 
  },
  { 
    id: "s7", 
    title: "Black Mirror", 
    imageUrl: "https://images.unsplash.com/photo-1512136146408-dab5f2ba8711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", 
    episodes: 22, 
    seasons: 5 
  },
  { 
    id: "s8", 
    title: "Stranger Things", 
    imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", 
    episodes: 34, 
    seasons: 4 
  },
  { 
    id: "s9", 
    title: "The Crown", 
    imageUrl: "https://images.unsplash.com/photo-1604975701446-4e926f394f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", 
    episodes: 50, 
    seasons: 5 
  },
  { 
    id: "s10", 
    title: "The Witcher", 
    imageUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", 
    episodes: 16, 
    seasons: 2 
  },
  { 
    id: "s11", 
    title: "Dark", 
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", 
    episodes: 26, 
    seasons: 3 
  },
  { 
    id: "s12", 
    title: "The Boys", 
    imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", 
    episodes: 24, 
    seasons: 3 
  },
];

// Featured Series data
export const featuredSeries = {
  id: "fs1",
  title: "Stranger Things",
  description: "Quand un jeune garçon disparaît, une petite ville découvre des mystères impliquant des expériences secrètes, des forces surnaturelles terrifiantes et une étrange petite fille. Une série Netflix qui a captivé le monde entier avec son ambiance nostalgique des années 80.",
  imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
  rating: "16+",
  year: "2016"
};

// Mock content for carousels
export const dramaSeries: ContentItem[] = [
  { id: "1", title: "The Crown", imageUrl: "https://images.unsplash.com/photo-1604975701446-4e926f394f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2016", rating: "16+" },
  { id: "2", title: "Succession", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2018", rating: "18+" },
  { id: "3", title: "Better Call Saul", imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "series", year: "2015", rating: "18+" },
  { id: "4", title: "Ozark", imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "series", year: "2017", rating: "18+" },
  { id: "5", title: "Breaking Bad", imageUrl: "https://images.unsplash.com/photo-1633942304314-a79f4d060123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2008", rating: "18+" },
  { id: "6", title: "The Queen's Gambit", imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "series", year: "2020", rating: "16+" },
];

export const fantasySeries: ContentItem[] = [
  { id: "7", title: "House of the Dragon", imageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2cb0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "series", year: "2022", rating: "18+" },
  { id: "8", title: "The Witcher", imageUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2019", rating: "18+" },
  { id: "9", title: "Stranger Things", imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "series", year: "2016", rating: "16+" },
  { id: "10", title: "Shadow and Bone", imageUrl: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2021", rating: "16+" },
  { id: "11", title: "The Sandman", imageUrl: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2022", rating: "18+" },
  { id: "12", title: "Rings of Power", imageUrl: "https://images.unsplash.com/photo-1518709594023-6ebd591c217f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "series", year: "2022", rating: "13+" },
];

export const thrillerSeries: ContentItem[] = [
  { id: "13", title: "Dark", imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2017", rating: "16+" },
  { id: "14", title: "Mindhunter", imageUrl: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2017", rating: "18+" },
  { id: "15", title: "True Detective", imageUrl: "https://images.unsplash.com/photo-1507499739999-097f9693b970?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1892&q=80", type: "series", year: "2014", rating: "18+" },
  { id: "16", title: "Black Mirror", imageUrl: "https://images.unsplash.com/photo-1512136146408-dab5f2ba8711?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "series", year: "2011", rating: "18+" },
  { id: "17", title: "Severance", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "series", year: "2022", rating: "16+" },
  { id: "18", title: "Westworld", imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "series", year: "2016", rating: "18+" },
];
