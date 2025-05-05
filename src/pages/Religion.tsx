
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Church, Book, Users, BookOpen, Music, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for preachers
const preachers = [
  {
    id: 1,
    name: "Pasteur Emmanuel Kalala",
    title: "Fondateur, Église de la Nouvelle Alliance",
    bio: "Le Pasteur Emmanuel Kalala est né à Kinshasa en 1975. Après des études de théologie, il a fondé l'Église de la Nouvelle Alliance en 2005. Son ministère se concentre sur la réconciliation et la guérison spirituelle.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800",
    sermons: 156,
    followers: "120K+",
    highlighted: true,
  },
  {
    id: 2,
    name: "Évangéliste Marie Tshisekedi",
    title: "Directrice, Ministère des Femmes",
    bio: "Marie Tshisekedi est connue pour son travail auprès des femmes dans les communautés défavorisées. Depuis 2010, elle parcourt le pays pour apporter un message d'espoir et d'autonomisation.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800",
    sermons: 98,
    followers: "85K+",
    highlighted: false,
  },
  {
    id: 3,
    name: "Apôtre Joseph Mukendi",
    title: "Missionnaire International",
    bio: "L'Apôtre Joseph Mukendi a visité plus de 40 pays pour répandre son message de foi et d'unité. Son ministère se caractérise par une approche interculturelle et œcuménique du christianisme.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800",
    sermons: 213,
    followers: "200K+",
    highlighted: true,
  },
];

// Mock data for teachings
const teachings = [
  {
    id: 1,
    title: "Les Fondements de la Foi",
    description: "Une série d'enseignements sur les principes fondamentaux de la foi chrétienne, explorés à travers les Écritures.",
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800",
    author: "Pasteur Emmanuel Kalala",
    duration: "8 semaines",
    lessons: 16,
    level: "Débutant"
  },
  {
    id: 2,
    title: "Croissance Spirituelle",
    description: "Comment développer une vie de prière efficace et une relation plus profonde avec Dieu au quotidien.",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800",
    author: "Évangéliste Marie Tshisekedi",
    duration: "6 semaines",
    lessons: 12,
    level: "Intermédiaire"
  },
  {
    id: 3,
    title: "Leadership Biblique",
    description: "Principes de leadership tirés de la Bible et applicables dans l'église et la vie professionnelle.",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=800",
    author: "Apôtre Joseph Mukendi",
    duration: "10 semaines",
    lessons: 20,
    level: "Avancé"
  }
];

// Mock data for gospel music
const gospelMusic = [
  {
    id: 1,
    title: "Gloire à Dieu",
    artist: "Chorale La Voix du Ciel",
    album: "Célébration Divine",
    duration: "5:24",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800",
    audioUrl: "#",
    releaseDate: "2025-01-15",
  },
  {
    id: 2,
    title: "Mon Sauveur",
    artist: "Jean-Claude Mulamba",
    album: "Grâce Infinie",
    duration: "4:38",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800",
    audioUrl: "#",
    releaseDate: "2024-11-20",
  },
  {
    id: 3,
    title: "L'Amour Divin",
    artist: "Grâce Céleste",
    album: "Lumière Éternelle",
    duration: "6:12",
    image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&w=800",
    audioUrl: "#",
    releaseDate: "2025-03-05",
  },
  {
    id: 4,
    title: "Saint Est Son Nom",
    artist: "Les Adorateurs de Kinshasa",
    album: "Adoration Pure",
    duration: "7:02",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800",
    audioUrl: "#",
    releaseDate: "2024-09-30",
  },
];

// Mock data for religious festivals
const festivals = [
  {
    id: 1,
    name: "Festival de Louange de Kinshasa",
    date: "10-12 Juin 2025",
    location: "Stade des Martyrs, Kinshasa",
    description: "Le plus grand rassemblement de louange en RDC, avec des artistes nationaux et internationaux.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800",
    attendees: "50K+",
    featured: true,
  },
  {
    id: 2,
    name: "Conférence de la Renaissance Spirituelle",
    date: "15-18 Juillet 2025",
    location: "Palais du Peuple, Kinshasa",
    description: "Une conférence axée sur le renouveau spirituel avec des orateurs de renom.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800",
    attendees: "20K+",
    featured: false,
  },
  {
    id: 3,
    name: "Symposium Biblique de Lubumbashi",
    date: "5-7 Août 2025",
    location: "Grand Hôtel Karavia, Lubumbashi",
    description: "Un événement d'étude biblique approfondie pour les théologiens et passionnés des Écritures.",
    image: "https://images.unsplash.com/photo-1519834089823-2eecec92b39c?auto=format&fit=crop&w=800",
    attendees: "5K+",
    featured: false,
  },
];

// Mock data for religious walks
const religiousWalks = [
  {
    id: 1,
    name: "Pèlerinage de la Cathédrale Notre-Dame de Kinshasa",
    duration: "1 jour",
    distance: "5 km",
    description: "Un parcours spirituel à travers les sites historiques catholiques de Kinshasa.",
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800",
    difficulty: "Facile",
    upcoming: "14 Mai 2025",
  },
  {
    id: 2,
    name: "Route des Monastères du Bas-Congo",
    duration: "3 jours",
    distance: "45 km",
    description: "Découvrez les monastères historiques de la région du Bas-Congo lors d'une marche méditative.",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800",
    difficulty: "Modéré",
    upcoming: "22-24 Juin 2025",
  },
  {
    id: 3,
    name: "Chemin de Prière de Kisantu",
    duration: "2 jours",
    distance: "25 km",
    description: "Un parcours spirituel à travers les jardins botaniques et les sites religieux de Kisantu.",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=800",
    difficulty: "Modéré",
    upcoming: "8-9 Août 2025",
  },
];

const Religion = () => {
  const [activeTab, setActiveTab] = useState("predication");

  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-10 space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stream-purple to-blue-400">
              Espace Religieux
            </h1>
            <p className="text-lg text-gray-300">
              Explorez notre contenu spirituel et religieux
            </p>
          </div>
          
          <Tabs defaultValue="predication" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-stream-darker mb-8 flex flex-wrap justify-start overflow-x-auto">
              <TabsTrigger value="predication" className="flex items-center gap-2">
                <Book className="h-4 w-4" /> Prédication
              </TabsTrigger>
              <TabsTrigger value="biographie" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Biographies
              </TabsTrigger>
              <TabsTrigger value="enseignement" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Enseignements
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2">
                <Music className="h-4 w-4" /> Musique Gospel
              </TabsTrigger>
              <TabsTrigger value="festival" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Festivals Religieux
              </TabsTrigger>
              <TabsTrigger value="promenade" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Promenades Religieuses
              </TabsTrigger>
            </TabsList>
            
            {/* Prédicaticon Tab Content */}
            <TabsContent value="predication" className="space-y-8">
              <div className="bg-stream-darker rounded-2xl overflow-hidden border border-gray-800">
                <div className="bg-gradient-to-r from-stream-purple/20 to-blue-500/20 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-stream-purple shadow-xl shadow-stream-purple/30">
                      <img 
                        src={preachers[0].image} 
                        alt={preachers[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-stream-purple text-white p-1 rounded-full">
                      <Church className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2">{preachers[0].name}</h2>
                    <p className="text-gray-300 mb-4">{preachers[0].title}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <Badge className="bg-stream-purple">
                        {preachers[0].sermons} Sermons
                      </Badge>
                      <Badge variant="outline" className="border-stream-purple">
                        {preachers[0].followers} Fidèles
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-10">
                  <h3 className="text-xl font-semibold mb-4">Dernière prédication</h3>
                  <div className="bg-black/30 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-medium mb-3">Le Pouvoir de la Foi</h4>
                    <p className="text-gray-300 mb-4">
                      Dans ce message inspirant, nous explorons comment la foi peut surmonter les obstacles et transformer nos vies quotidiennes. Basé sur l'Hébreux 11:1.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">01 Mai 2025 • 45 minutes</span>
                      <Button className="bg-stream-purple hover:bg-stream-purple/80">
                        Écouter
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <Button variant="outline" className="border-stream-purple text-stream-purple hover:bg-stream-purple/20">
                      Voir toutes les prédications
                    </Button>
                    <Button variant="outline" className="border-stream-purple text-stream-purple hover:bg-stream-purple/20">
                      Programme des prochains services
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Biographies Tab Content */}
            <TabsContent value="biographie" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preachers.map((preacher) => (
                  <Card key={preacher.id} className={`bg-stream-darker border ${
                    preacher.highlighted ? 'border-stream-purple' : 'border-gray-800'
                  } overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-stream-purple/20`}>
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <Avatar className="h-16 w-16 border-2 border-stream-purple">
                          <img src={preacher.image} alt={preacher.name} />
                        </Avatar>
                        {preacher.highlighted && (
                          <Badge className="bg-stream-purple">Leader Spirituel</Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4">{preacher.name}</CardTitle>
                      <CardDescription className="text-gray-400">{preacher.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 line-clamp-4">{preacher.bio}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm">
                        <span className="text-stream-purple font-medium">{preacher.sermons}</span> sermons
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="border-stream-purple text-stream-purple hover:bg-stream-purple/20">
                            Biographie complète
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-stream-darker border-gray-800">
                          <DialogHeader>
                            <DialogTitle className="text-white">{preacher.name}</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col md:flex-row gap-6">
                            <img 
                              src={preacher.image} 
                              alt={preacher.name} 
                              className="w-full md:w-1/3 rounded-lg object-cover h-auto"
                            />
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-stream-purple">{preacher.title}</h3>
                              <p className="text-gray-300">{preacher.bio}</p>
                              <p className="text-gray-300">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                              </p>
                              <div className="flex flex-wrap gap-4 pt-2">
                                <div>
                                  <span className="text-stream-purple font-medium">{preacher.sermons}</span>
                                  <span className="text-gray-400 ml-1">sermons</span>
                                </div>
                                <div>
                                  <span className="text-stream-purple font-medium">{preacher.followers}</span>
                                  <span className="text-gray-400 ml-1">fidèles</span>
                                </div>
                              </div>
                              <Button className="w-full bg-stream-purple hover:bg-stream-purple/80">
                                Voir les sermons
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Enseignements Tab Content */}
            <TabsContent value="enseignement" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teachings.map((teaching) => (
                  <Card key={teaching.id} className="bg-stream-darker border border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-stream-purple/20">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={teaching.image} 
                        alt={teaching.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="border-stream-purple text-white">
                          {teaching.level}
                        </Badge>
                        <span className="text-sm text-gray-400">{teaching.duration}</span>
                      </div>
                      <CardTitle>{teaching.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Par {teaching.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 line-clamp-3">{teaching.description}</p>
                      <div className="mt-4 flex items-center text-sm text-gray-400">
                        <BookOpen className="h-4 w-4 mr-2 text-stream-purple" />
                        <span>{teaching.lessons} leçons</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-stream-purple hover:bg-stream-purple/80">
                        Commencer l'étude
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Musique Gospel Tab Content */}
            <TabsContent value="music" className="space-y-8">
              <div className="bg-stream-darker rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Music className="h-6 w-6 mr-3 text-stream-purple" /> 
                    Musique Gospel
                  </h2>
                  
                  <div className="space-y-4">
                    {gospelMusic.map((song) => (
                      <div key={song.id} className="flex items-center bg-black/20 rounded-lg p-3 transition-all duration-300 hover:bg-stream-purple/20">
                        <img 
                          src={song.image} 
                          alt={song.title} 
                          className="w-16 h-16 rounded object-cover mr-4"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium">{song.title}</h3>
                          <p className="text-sm text-gray-300">{song.artist} • {song.album}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm hidden sm:inline-block">{song.duration}</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-stream-purple hover:bg-stream-purple/80">
                                Écouter
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-stream-darker border-gray-800">
                              <DialogHeader>
                                <DialogTitle className="text-white">{song.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <img 
                                  src={song.image} 
                                  alt={song.title} 
                                  className="w-full rounded-lg object-cover aspect-video"
                                />
                                <div>
                                  <h3 className="text-xl font-semibold">{song.title}</h3>
                                  <p className="text-gray-300">{song.artist}</p>
                                  <p className="text-gray-400 text-sm">Album: {song.album}</p>
                                </div>
                                <div className="w-full bg-black/40 rounded-full h-2">
                                  <div className="bg-stream-purple h-2 rounded-full" style={{ width: "30%" }}></div>
                                </div>
                                <div className="flex justify-between text-gray-300 text-sm">
                                  <span>1:38</span>
                                  <span>{song.duration}</span>
                                </div>
                                <div className="flex justify-center gap-4 pt-4">
                                  <Button variant="outline" className="rounded-full h-12 w-12 p-0 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M19 20L9 12L19 4V20Z" fill="currentColor"/>
                                      <rect x="7" y="4" width="2" height="16" fill="currentColor"/>
                                    </svg>
                                  </Button>
                                  <Button className="rounded-full h-12 w-12 p-0 flex items-center justify-center bg-stream-purple hover:bg-stream-purple/80">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                    </svg>
                                  </Button>
                                  <Button variant="outline" className="rounded-full h-12 w-12 p-0 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 4L15 12L5 20V4Z" fill="currentColor"/>
                                      <rect x="17" y="4" width="2" height="16" fill="currentColor"/>
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/20 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-300 text-center md:text-left">Découvrez notre collection complète de musique gospel avec plus de 500 titres.</p>
                  <Button className="bg-stream-purple hover:bg-stream-purple/80">
                    Voir toute la collection
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Festivals Religieux Tab Content */}
            <TabsContent value="festival" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {festivals.map((festival) => (
                  <Card key={festival.id} className={`bg-stream-darker border ${
                    festival.featured ? 'border-stream-purple' : 'border-gray-800'
                  } overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-stream-purple/20`}>
                    <div className="relative">
                      <img 
                        src={festival.image} 
                        alt={festival.name} 
                        className="w-full h-48 object-cover"
                      />
                      {festival.featured && (
                        <Badge className="absolute top-3 right-3 bg-stream-purple">
                          Événement principal
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-stream-purple" />
                        <span className="text-gray-300">{festival.date}</span>
                      </div>
                      <CardTitle>{festival.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {festival.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 line-clamp-3">{festival.description}</p>
                      <div className="mt-4 bg-black/20 rounded p-2 flex items-center justify-center">
                        <span className="text-stream-purple font-semibold">{festival.attendees}</span>
                        <span className="text-gray-400 ml-1">participants attendus</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-stream-purple hover:bg-stream-purple/80">
                        S'inscrire à l'événement
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Promenades Religieuses Tab Content */}
            <TabsContent value="promenade" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {religiousWalks.map((walk) => (
                  <Card key={walk.id} className="bg-stream-darker border border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-stream-purple/20">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={walk.image} 
                        alt={walk.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className={`${
                          walk.difficulty === "Facile" ? "border-green-500 text-green-500" :
                          walk.difficulty === "Modéré" ? "border-yellow-500 text-yellow-500" :
                          "border-red-500 text-red-500"
                        }`}>
                          {walk.difficulty}
                        </Badge>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {walk.distance}
                        </div>
                      </div>
                      <CardTitle>{walk.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        Durée: {walk.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 line-clamp-3">{walk.description}</p>
                      <div className="mt-4 flex items-center text-sm text-stream-purple">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Prochain départ: {walk.upcoming}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-4">
                      <Button variant="outline" className="flex-1 border-stream-purple text-stream-purple hover:bg-stream-purple/20">
                        Plus d'infos
                      </Button>
                      <Button className="flex-1 bg-stream-purple hover:bg-stream-purple/80">
                        Réserver
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Religion;
