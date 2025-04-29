import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ContentCarousel, ContentItem } from "@/components/ContentCarousel";
import { Footer } from "@/components/Footer";

// Mock data
const heroData = {
  title: "Black Panther: Wakanda Forever",
  description: "Le royaume de Wakanda affronte les conséquences de la perte du roi T'Challa, alors que ses dirigeants tentent de protéger leur nation des puissances mondiales qui cherchent à exploiter ses ressources précieuses.",
  backgroundImage: "https://images.unsplash.com/photo-1635805737707-575885c8e407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
  buttonText: "Regarder",
  buttonLink: "/films",
  type: "film",
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

// Films africains
const africanFilms: ContentItem[] = [
  { id: "25", title: "La Nuit des Rois", imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2020", rating: "14+" },
  { id: "26", title: "Atlantique", imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2019", rating: "16+" },
  { id: "27", title: "Rafiki", imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2018", rating: "18+" },
  { id: "28", title: "Timbuktu", imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1676&q=80", type: "film", year: "2014", rating: "16+" },
  { id: "29", title: "Yeelen", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "1987", rating: "12+" },
  { id: "30", title: "Les Saignantes", imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2005", rating: "18+" },
];

// Films américains
const americanFilms: ContentItem[] = [
  { id: "31", title: "Inception", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80", type: "film", year: "2010", rating: "PG-13" },
  { id: "32", title: "The Godfather", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80", type: "film", year: "1972", rating: "R" },
  { id: "33", title: "Pulp Fiction", imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "1994", rating: "R" },
  { id: "34", title: "The Shawshank Redemption", imageUrl: "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "1994", rating: "R" },
  { id: "35", title: "The Dark Knight", imageUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "film", year: "2008", rating: "PG-13" },
  { id: "36", title: "Forrest Gump", imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "film", year: "1994", rating: "PG-13" },
];

// Films mexicains
const mexicanFilms: ContentItem[] = [
  { id: "37", title: "Roma", imageUrl: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "film", year: "2018", rating: "15" },
  { id: "38", title: "Amores Perros", imageUrl: "https://images.unsplash.com/photo-1558124757-166e8d552985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2000", rating: "18" },
  { id: "39", title: "Y Tu Mamá También", imageUrl: "https://images.unsplash.com/photo-1536008758366-72fbc5b16911?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2001", rating: "18" },
  { id: "40", title: "El Laberinto del Fauno", imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80", type: "film", year: "2006", rating: "15" },
  { id: "41", title: "Nosotros los Nobles", imageUrl: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1894&q=80", type: "film", year: "2013", rating: "12" },
  { id: "42", title: "Como Agua Para Chocolate", imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "1992", rating: "15" },
];

// Films français
const frenchFilms: ContentItem[] = [
  { id: "60", title: "Amélie Poulain", imageUrl: "https://images.unsplash.com/photo-1503622549275-16ea8b9c50c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2001", rating: "12+" },
  { id: "61", title: "Les Intouchables", imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2011", rating: "12+" },
  { id: "62", title: "La Haine", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80", type: "film", year: "1995", rating: "16+" },
  { id: "63", title: "Le Fabuleux Destin d'Amélie Poulain", imageUrl: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "film", year: "2001", rating: "12+" },
  { id: "64", title: "Le Dîner de Cons", imageUrl: "https://images.unsplash.com/photo-1558124757-166e8d552985?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "1998", rating: "12+" },
  { id: "65", title: "La Vie en Rose", imageUrl: "https://images.unsplash.com/photo-1536008758366-72fbc5b16911?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2007", rating: "12+" },
];

// Films asiatiques
const asianFilms: ContentItem[] = [
  { id: "66", title: "Parasite", imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "film", year: "2019", rating: "16+" },
  { id: "67", title: "Old Boy", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80", type: "film", year: "2003", rating: "18+" },
  { id: "68", title: "Spirited Away", imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80", type: "film", year: "2001", rating: "Tous" },
  { id: "69", title: "The Raid", imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2011", rating: "18+" },
  { id: "70", title: "Your Name", imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "film", year: "2016", rating: "Tous" },
  { id: "71", title: "The Handmaiden", imageUrl: "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2016", rating: "18+" },
];

// Films bollywoodiens
const bollywoodFilms: ContentItem[] = [
  { id: "72", title: "3 Idiots", imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1834&q=80", type: "film", year: "2009", rating: "12+" },
  { id: "73", title: "Dangal", imageUrl: "https://images.unsplash.com/photo-1504826260979-242151ee45b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "film", year: "2016", rating: "12+" },
  { id: "74", title: "Lagaan", imageUrl: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1894&q=80", type: "film", year: "2001", rating: "12+" },
  { id: "75", title: "Kabhi Khushi Kabhie Gham", imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2001", rating: "12+" },
  { id: "76", title: "PK", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2014", rating: "12+" },
  { id: "77", title: "Bajrangi Bhaijaan", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "film", year: "2015", rating: "12+" },
];

// Films moyen-orientaux
const middleEasternFilms: ContentItem[] = [
  { id: "78", title: "Capernaum", imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "film", year: "2018", rating: "16+" },
  { id: "79", title: "A Separation", imageUrl: "https://images.unsplash.com/photo-1621955964441-c173e01c135b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2011", rating: "12+" },
  { id: "80", title: "Omar", imageUrl: "https://images.unsplash.com/photo-1573055418049-c8e0b7e3403d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2013", rating: "16+" },
  { id: "81", title: "Theeb", imageUrl: "https://images.unsplash.com/photo-1634157703702-3c124b455499?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "film", year: "2014", rating: "12+" },
  { id: "82", title: "Wadjda", imageUrl: "https://images.unsplash.com/photo-1540587639271-7e09e2671906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80", type: "film", year: "2012", rating: "Tous" },
  { id: "83", title: "The Insult", imageUrl: "https://images.unsplash.com/photo-1581004705471-9c5e1b6965fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2017", rating: "16+" },
];

// Films scandinaves
const scandinavianFilms: ContentItem[] = [
  { id: "84", title: "The Hunt", imageUrl: "https://images.unsplash.com/photo-1576506913269-e88732a83fac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "film", year: "2012", rating: "16+" },
  { id: "85", title: "Let the Right One In", imageUrl: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80", type: "film", year: "2008", rating: "16+" },
  { id: "86", title: "The Girl with the Dragon Tattoo", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80", type: "film", year: "2009", rating: "18+" },
  { id: "87", title: "A Man Called Ove", imageUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80", type: "film", year: "2015", rating: "12+" },
  { id: "88", title: "Festen", imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80", type: "film", year: "1998", rating: "18+" },
  { id: "89", title: "The Square", imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80", type: "film", year: "2017", rating: "16+" },
];

// Films populaires
const popularSeries: ContentItem[] = [
  { id: "7", title: "House of the Dragon", imageUrl: "https://images.unsplash.com/photo-1628155930542-3c7a64e2cb0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "series", year: "2022", rating: "18+" },
  { id: "8", title: "The Witcher", imageUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2019", rating: "18+" },
  { id: "9", title: "Stranger Things", imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "series", year: "2016", rating: "16+" },
  { id: "10", title: "The Crown", imageUrl: "https://images.unsplash.com/photo-1604975701446-4e926f394f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2016", rating: "16+" },
  { id: "11", title: "Breaking Bad", imageUrl: "https://images.unsplash.com/photo-1633942304314-a79f4d060123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2008", rating: "18+" },
  { id: "12", title: "Ozark", imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80", type: "series", year: "2017", rating: "18+" },
];

// Nouvelles séries populaires
const newSeries: ContentItem[] = [
  { id: "43", title: "The Last of Us", imageUrl: "https://images.unsplash.com/photo-1621955964441-c173e01c135b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2023", rating: "18+" },
  { id: "44", title: "Mercredi", imageUrl: "https://images.unsplash.com/photo-1573055418049-c8e0b7e3403d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2022", rating: "14+" },
  { id: "45", title: "Squid Game", imageUrl: "https://images.unsplash.com/photo-1634157703702-3c124b455499?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80", type: "series", year: "2021", rating: "18+" },
  { id: "46", title: "Euphoria", imageUrl: "https://images.unsplash.com/photo-1540587639271-7e09e2671906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80", type: "series", year: "2019", rating: "18+" },
  { id: "47", title: "The Queen's Gambit", imageUrl: "https://images.unsplash.com/photo-1581004705471-9c5e1b6965fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2020", rating: "16+" },
  { id: "48", title: "The Bear", imageUrl: "https://images.unsplash.com/photo-1576506913269-e88732a83fac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80", type: "series", year: "2022", rating: "18+" },
];

// Séries documentaires
const documentaries: ContentItem[] = [
  { id: "49", title: "Notre Planète", imageUrl: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80", type: "series", year: "2019", rating: "Tous" },
  { id: "50", title: "The Jinx", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80", type: "series", year: "2015", rating: "18+" },
  { id: "51", title: "Making a Murderer", imageUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80", type: "series", year: "2015", rating: "16+" },
  { id: "52", title: "Tiger King", imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80", type: "series", year: "2020", rating: "18+" },
  { id: "53", title: "F1: Drive to Survive", imageUrl: "https://images.unsplash.com/photo-1504826260979-242151ee45b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", type: "series", year: "2019", rating: "14+" },
  { id: "54", title: "Chef's Table", imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80", type: "series", year: "2015", rating: "12+" },
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
          
          {/* Catégories par région/pays */}
          <ContentCarousel title="Cinéma Africain" items={africanFilms} />
          <ContentCarousel title="Films Américains" items={americanFilms} />
          <ContentCarousel title="Cinéma Mexicain" items={mexicanFilms} />
          <ContentCarousel title="Cinéma Français" items={frenchFilms} />
          <ContentCarousel title="Films Asiatiques" items={asianFilms} />
          <ContentCarousel title="Bollywood" items={bollywoodFilms} />
          <ContentCarousel title="Cinéma Moyen-Oriental" items={middleEasternFilms} />
          <ContentCarousel title="Films Scandinaves" items={scandinavianFilms} />
          
          <ContentCarousel title="Séries Populaires" items={popularSeries} />
          <ContentCarousel title="Nouvelles Séries" items={newSeries} />
          <ContentCarousel title="Documentaires" items={documentaries} />
          
          <ContentCarousel title="Musique du Moment" items={topMusic} />
          <ContentCarousel title="Émissions TV" items={tvShows} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
