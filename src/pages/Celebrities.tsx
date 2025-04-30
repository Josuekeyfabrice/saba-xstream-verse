
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChevronUp, Users, Activity, TrendingUp, TrendingDown } from "lucide-react";

const pageViewsData = [
  { name: "Films", views: 4000, visits: 2400 },
  { name: "Séries", views: 3200, visits: 1398 },
  { name: "Music", views: 2800, visits: 9800 },
  { name: "TV", views: 2780, visits: 3908 },
  { name: "Célébrités", views: 1890, visits: 4800 },
];

const popularCelebritiesData = [
  {
    id: "cel1",
    name: "Jean Dujardin",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    viewCount: 12500,
    trending: "+15%"
  },
  {
    id: "cel2",
    name: "Léa Seydoux",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    viewCount: 10200,
    trending: "+8%"
  },
  {
    id: "cel3",
    name: "Omar Sy",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    viewCount: 9800,
    trending: "+23%"
  },
  {
    id: "cel4",
    name: "Marion Cotillard",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    viewCount: 8700,
    trending: "-3%"
  },
];

const trendingContentData = [
  { date: 'Lundi', films: 4000, series: 2400, music: 1800 },
  { date: 'Mardi', films: 3000, series: 2900, music: 2200 },
  { date: 'Mercredi', films: 2000, series: 3200, music: 2500 },
  { date: 'Jeudi', films: 2780, series: 3908, music: 2000 },
  { date: 'Vendredi', films: 1890, series: 4800, music: 2500 },
  { date: 'Samedi', films: 2390, series: 3800, music: 3500 },
  { date: 'Dimanche', films: 3490, series: 4300, music: 2800 },
];

const Celebrities = () => {
  const [currentPeriod, setCurrentPeriod] = useState("today");
  
  return (
    <div className="min-h-screen bg-stream-dark flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Célébrités & Statistiques</h1>
            <p className="text-gray-400">Découvrez les célébrités populaires et les tendances de la plateforme</p>
          </div>

          <div className="mb-8 flex items-center">
            <div className="flex space-x-2">
              {["today", "week", "month"].map((period) => (
                <button
                  key={period}
                  onClick={() => setCurrentPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentPeriod === period
                      ? "bg-stream-purple text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {period === "today" && "Aujourd'hui"}
                  {period === "week" && "Cette semaine"}
                  {period === "month" && "Ce mois"}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-stream-darker text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Visiteurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">24,532</div>
                  <div className="rounded-full p-2 bg-green-500/20 text-green-500">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs text-green-500">
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span>+12.5% depuis hier</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-stream-darker text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Visites Célébrités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">8,942</div>
                  <div className="rounded-full p-2 bg-purple-500/20 text-purple-500">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs text-green-500">
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span>+18.2% depuis hier</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-stream-darker text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Page plus visitée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">Films</div>
                  <div className="rounded-full p-2 bg-blue-500/20 text-blue-500">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs text-green-500">
                  <ChevronUp className="h-4 w-4 mr-1" />
                  <span>+5.3% depuis hier</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-stream-darker text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Page moins visitée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">Musique</div>
                  <div className="rounded-full p-2 bg-red-500/20 text-red-500">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-xs text-red-500">
                  <ChevronUp className="h-4 w-4 mr-1 rotate-180" />
                  <span>-2.1% depuis hier</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Celebrities */}
          <h2 className="text-2xl font-bold text-white mb-6">Célébrités Populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {popularCelebritiesData.map((celebrity) => (
              <Card key={celebrity.id} className="bg-stream-darker text-white overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={celebrity.imageUrl} 
                    alt={celebrity.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg">{celebrity.name}</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      <span>{celebrity.viewCount.toLocaleString()} vues</span>
                    </div>
                    <div className={`text-sm ${celebrity.trending.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {celebrity.trending}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-stream-darker text-white">
              <CardHeader>
                <CardTitle>Vues par page</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    views: {
                      label: "Vues",
                      theme: {
                        light: "#7c3aed",
                        dark: "#8b5cf6",
                      },
                    },
                    visits: {
                      label: "Visites",
                      theme: {
                        light: "#10b981",
                        dark: "#34d399",
                      },
                    },
                  }}
                >
                  <BarChart
                    data={pageViewsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="views" name="Vues" fill="var(--color-views)" />
                    <Bar dataKey="visits" name="Visites" fill="var(--color-visits)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-stream-darker text-white">
              <CardHeader>
                <CardTitle>Tendances Hebdomadaires</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    films: {
                      label: "Films",
                      theme: {
                        light: "#7c3aed",
                        dark: "#8b5cf6",
                      },
                    },
                    series: {
                      label: "Séries",
                      theme: {
                        light: "#10b981",
                        dark: "#34d399",
                      },
                    },
                    music: {
                      label: "Musique",
                      theme: {
                        light: "#f59e0b",
                        dark: "#fbbf24",
                      },
                    },
                  }}
                >
                  <LineChart
                    data={trendingContentData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="films"
                      name="Films"
                      stroke="var(--color-films)"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="series" name="Séries" stroke="var(--color-series)" />
                    <Line type="monotone" dataKey="music" name="Musique" stroke="var(--color-music)" />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Celebrities;
