
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Flag, Globe, AlertCircle, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for politics news
const congoPoliticsNews = [
  {
    id: 1,
    title: "Réforme électorale en RDC: Les nouvelles dispositions adoptées",
    summary: "L'Assemblée nationale a adopté une série de réformes électorales visant à renforcer la transparence du processus démocratique.",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800",
    date: "2025-05-03",
    source: "Agence Congolaise de Presse",
    category: "national",
    important: true,
  },
  {
    id: 2,
    title: "Dialogue politique: Vers une solution pour la stabilité dans l'Est",
    summary: "Les pourparlers entre le gouvernement et les groupes armés progressent avec de nouvelles avancées significatives.",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?auto=format&fit=crop&w=800",
    date: "2025-05-02",
    source: "Radio Okapi",
    category: "national",
    important: false,
  },
  {
    id: 3,
    title: "Investissements miniers: Le gouvernement annonce de nouvelles régulations",
    summary: "Le ministère des Mines a présenté un nouveau cadre réglementaire visant à augmenter les retombées économiques des ressources naturelles.",
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800",
    date: "2025-05-01",
    source: "Économie RDC",
    category: "économie",
    important: true,
  },
  {
    id: 4,
    title: "Relations diplomatiques: La RDC renforce ses partenariats régionaux",
    summary: "Une série d'accords bilatéraux ont été signés avec plusieurs pays voisins pour améliorer la coopération régionale.",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800",
    date: "2025-04-28",
    source: "Diplomatie Info",
    category: "international",
    important: false,
  },
];

const worldPoliticsNews = [
  {
    id: 5,
    title: "Sommet du G20: Engagements pour le climat et l'économie mondiale",
    summary: "Les dirigeants du G20 ont adopté une déclaration commune sur les défis économiques et environnementaux.",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=800",
    date: "2025-05-04",
    source: "Agence Internationale de Presse",
    region: "mondial",
    important: true,
  },
  {
    id: 6,
    title: "Élections américaines: Les primaires entrent dans leur phase décisive",
    summary: "Les candidats multiplient les meetings dans les États clés avant le Super Tuesday.",
    image: "https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?auto=format&fit=crop&w=800",
    date: "2025-05-03",
    source: "World Politics Today",
    region: "amérique",
    important: false,
  },
  {
    id: 7,
    title: "Union Européenne: Nouvelles directives sur la transition énergétique",
    summary: "La Commission européenne a présenté un plan ambitieux pour accélérer la transition vers les énergies renouvelables.",
    image: "https://images.unsplash.com/photo-1519834089823-2a5eeceb7603?auto=format&fit=crop&w=800",
    date: "2025-05-02",
    source: "Euro News",
    region: "europe",
    important: true,
  },
  {
    id: 8,
    title: "Conflit au Moyen-Orient: Reprise des négociations de paix",
    summary: "Les médiateurs internationaux ont annoncé une nouvelle initiative pour rétablir le dialogue entre les parties.",
    image: "https://images.unsplash.com/photo-1541777001269-1f7a22a363d8?auto=format&fit=crop&w=800",
    date: "2025-04-30",
    source: "Middle East Monitor",
    region: "moyen-orient",
    important: true,
  },
];

const Politique = () => {
  const [activeTab, setActiveTab] = useState("rdc");

  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-10 space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stream-purple to-blue-400">
              Actualités Politiques
            </h1>
            <p className="text-lg text-gray-300">
              Les dernières informations politiques de la RDC et du monde entier
            </p>
          </div>
          
          <Tabs defaultValue="rdc" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-stream-darker">
                <TabsTrigger value="rdc" className="flex items-center gap-2">
                  <Flag className="h-4 w-4" /> RDC
                </TabsTrigger>
                <TabsTrigger value="monde" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Monde
                </TabsTrigger>
                <TabsTrigger value="analyses" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Analyses
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:block">
                <Badge variant="outline" className="bg-stream-purple/20 border-stream-purple text-white">
                  Dernière mise à jour: 05 Mai 2025
                </Badge>
              </div>
            </div>
            
            <TabsContent value="rdc" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {congoPoliticsNews.map((news) => (
                  <div 
                    key={news.id}
                    className={`bg-stream-darker rounded-lg overflow-hidden border ${
                      news.important ? 'border-stream-purple' : 'border-gray-800'
                    } transition-all duration-300 hover:shadow-lg hover:shadow-stream-purple/20 hover:-translate-y-1`}
                  >
                    <div className="relative">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-48 object-cover"
                      />
                      {news.important && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-stream-purple">
                            <AlertCircle className="h-3 w-3 mr-1" /> Important
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <Badge variant="outline" className="mb-2 bg-black/40 backdrop-blur-sm">
                          {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                        </Badge>
                        <h3 className="text-lg font-bold line-clamp-2">{news.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <p className="text-gray-300 line-clamp-3">{news.summary}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{news.source}</span>
                        <span>{news.date}</span>
                      </div>
                      <Button className="w-full bg-stream-darker hover:bg-stream-purple border border-stream-purple/50">
                        Lire l'article complet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="border-stream-purple text-stream-purple hover:bg-stream-purple/20">
                  Voir plus d'actualités
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="monde" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worldPoliticsNews.map((news) => (
                  <div 
                    key={news.id}
                    className={`bg-stream-darker rounded-lg overflow-hidden border ${
                      news.important ? 'border-stream-purple' : 'border-gray-800'
                    } transition-all duration-300 hover:shadow-lg hover:shadow-stream-purple/20 hover:-translate-y-1`}
                  >
                    <div className="relative">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-48 object-cover"
                      />
                      {news.important && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-stream-purple">
                            <AlertCircle className="h-3 w-3 mr-1" /> Important
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <Badge variant="outline" className="mb-2 bg-black/40 backdrop-blur-sm">
                          {news.region.charAt(0).toUpperCase() + news.region.slice(1)}
                        </Badge>
                        <h3 className="text-lg font-bold line-clamp-2">{news.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <p className="text-gray-300 line-clamp-3">{news.summary}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{news.source}</span>
                        <span>{news.date}</span>
                      </div>
                      <Button className="w-full bg-stream-darker hover:bg-stream-purple border border-stream-purple/50">
                        Lire l'article complet
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="border-stream-purple text-stream-purple hover:bg-stream-purple/20">
                  Voir plus d'actualités internationales
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="analyses" className="space-y-8">
              <div className="bg-stream-darker rounded-lg p-8 border border-gray-800 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-stream-purple" />
                <h3 className="text-xl font-bold mb-2">Analyses Politiques</h3>
                <p className="text-gray-300 mb-6">
                  Les analyses approfondies de nos experts seront bientôt disponibles.
                  Revenez prochainement pour découvrir nos décryptages des événements politiques.
                </p>
                <Button className="bg-stream-purple hover:bg-stream-purple/80">
                  S'inscrire aux notifications
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Politique;
