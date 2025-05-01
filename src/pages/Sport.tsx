
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types pour les matchs et événements sportifs
type Match = {
  id: number;
  tournament: string;
  teamHome: string;
  teamAway: string;
  scoreHome?: number;
  scoreAway?: number;
  date: Date;
  stadium: string;
  category: string;
  status: 'upcoming' | 'live' | 'finished';
};

type NewsArticle = {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  date: Date;
  source: string;
  category: string;
};

const generateSampleMatches = (): Match[] => {
  return [
    {
      id: 1,
      tournament: 'Ligue 1',
      teamHome: 'PSG',
      teamAway: 'Marseille',
      date: new Date(2025, 4, 15, 21, 0),
      stadium: 'Parc des Princes',
      category: 'football',
      status: 'upcoming'
    },
    {
      id: 2,
      tournament: 'Premier League',
      teamHome: 'Manchester United',
      teamAway: 'Liverpool',
      date: new Date(2025, 4, 14, 17, 30),
      stadium: 'Old Trafford',
      category: 'football',
      status: 'upcoming'
    },
    {
      id: 3,
      tournament: 'NBA',
      teamHome: 'LA Lakers',
      teamAway: 'Golden State Warriors',
      scoreHome: 105,
      scoreAway: 98,
      date: new Date(2025, 4, 1, 21, 0),
      stadium: 'Staples Center',
      category: 'basketball',
      status: 'finished'
    },
    {
      id: 4,
      tournament: 'Roland-Garros',
      teamHome: 'Nadal R.',
      teamAway: 'Djokovic N.',
      date: new Date(2025, 5, 5, 15, 0),
      stadium: 'Court Philippe-Chatrier',
      category: 'tennis',
      status: 'upcoming'
    },
    {
      id: 5,
      tournament: 'Ligue des Champions',
      teamHome: 'Real Madrid',
      teamAway: 'Bayern Munich',
      date: new Date(2025, 4, 3, 21, 0),
      stadium: 'Santiago Bernabéu',
      category: 'football',
      status: 'live'
    },
  ];
};

const generateSampleNews = (): NewsArticle[] => {
  return [
    {
      id: 1,
      title: 'Le PSG se qualifie pour les demi-finales de la Ligue des Champions',
      summary: 'Après une victoire éclatante contre le Borussia Dortmund, le Paris Saint-Germain accède aux demi-finales de la compétition européenne.',
      imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=735&auto=format&fit=crop',
      date: new Date(2025, 4, 10),
      source: 'L\'Équipe',
      category: 'football'
    },
    {
      id: 2,
      title: 'Nouveau record du monde pour le 100m',
      summary: 'Un athlète américain pulvérise le record du monde du 100 mètres avec un temps de 9.58 secondes lors des championnats du monde.',
      imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=870&auto=format&fit=crop',
      date: new Date(2025, 4, 5),
      source: 'World Athletics',
      category: 'athlétisme'
    },
    {
      id: 3,
      title: 'Les Lakers remportent le titre NBA 2025',
      summary: 'Les Los Angeles Lakers ont été couronnés champions NBA pour la 18e fois de leur histoire après une finale palpitante.',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?q=80&w=890&auto=format&fit=crop',
      date: new Date(2025, 3, 25),
      source: 'NBA.com',
      category: 'basketball'
    },
  ];
};

const Sport = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [matches, setMatches] = useState<Match[]>(generateSampleMatches());
  const [news, setNews] = useState<NewsArticle[]>(generateSampleNews());

  // Fonction pour filtrer les matchs
  const filterMatches = () => {
    return matches.filter(match => {
      const categoryMatch = selectedCategory === 'all' || match.category === selectedCategory;
      
      if (selectedDay === 'all') {
        return categoryMatch;
      } else if (selectedDay === 'today') {
        const today = new Date();
        return categoryMatch && 
          match.date.getDate() === today.getDate() && 
          match.date.getMonth() === today.getMonth() && 
          match.date.getFullYear() === today.getFullYear();
      } else if (selectedDay === 'tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return categoryMatch && 
          match.date.getDate() === tomorrow.getDate() && 
          match.date.getMonth() === tomorrow.getMonth() && 
          match.date.getFullYear() === tomorrow.getFullYear();
      } else if (selectedDay === 'week') {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        return categoryMatch && match.date >= today && match.date <= nextWeek;
      }
      return false;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Fonction pour formater la date des matchs
  const formatMatchDate = (date: Date) => {
    return format(date, 'EEEE d MMMM yyyy à HH:mm', { locale: fr });
  };

  // Fonction pour obtenir le statut du match
  const getMatchStatusBadge = (status: 'upcoming' | 'live' | 'finished') => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500">En direct</Badge>;
      case 'finished':
        return <Badge className="bg-gray-500">Terminé</Badge>;
      default:
        return <Badge className="bg-blue-500">À venir</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-stream-dark flex flex-col">
      <Navbar />
      <div className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-gradient">Actualités Sportives</h1>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">À la Une</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map(article => (
                <Card key={article.id} className="glass-card overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <Badge>{article.category}</Badge>
                      <span className="text-sm text-gray-400">
                        {format(article.date, 'dd/MM/yyyy')}
                      </span>
                    </div>
                    <CardTitle className="text-lg mt-2">{article.title}</CardTitle>
                    <CardDescription className="text-gray-300">{article.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Source: {article.source}</span>
                      <Badge variant="outline" className="cursor-pointer hover:bg-stream-purple">
                        Lire plus
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Calendrier des Matchs</h2>
            <Tabs defaultValue="all" className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Filtrer par sport:</h3>
                  <TabsList className="bg-stream-gray">
                    <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
                      Tous
                    </TabsTrigger>
                    <TabsTrigger value="football" onClick={() => setSelectedCategory('football')}>
                      Football
                    </TabsTrigger>
                    <TabsTrigger value="basketball" onClick={() => setSelectedCategory('basketball')}>
                      Basketball
                    </TabsTrigger>
                    <TabsTrigger value="tennis" onClick={() => setSelectedCategory('tennis')}>
                      Tennis
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Filtrer par jour:</h3>
                  <TabsList className="bg-stream-gray">
                    <TabsTrigger value="all" onClick={() => setSelectedDay('all')}>
                      Tous
                    </TabsTrigger>
                    <TabsTrigger value="today" onClick={() => setSelectedDay('today')}>
                      Aujourd'hui
                    </TabsTrigger>
                    <TabsTrigger value="tomorrow" onClick={() => setSelectedDay('tomorrow')}>
                      Demain
                    </TabsTrigger>
                    <TabsTrigger value="week" onClick={() => setSelectedDay('week')}>
                      Cette semaine
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {filterMatches().map(match => (
                  <Card key={match.id} className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span>{match.teamHome}</span>
                          {match.scoreHome !== undefined ? <span>{match.scoreHome}</span> : null}
                          <span className="text-gray-400 mx-2">vs</span>
                          {match.scoreAway !== undefined ? <span>{match.scoreAway}</span> : null}
                          <span>{match.teamAway}</span>
                        </CardTitle>
                        <CardDescription>
                          {match.tournament} - {match.stadium}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        {getMatchStatusBadge(match.status)}
                        <span className="text-sm text-gray-400 mt-2">
                          {formatMatchDate(match.date)}
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
                
                {filterMatches().length === 0 && (
                  <div className="text-center py-10 text-gray-400">
                    Aucun match ne correspond à vos critères de filtrage.
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sport;
