
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ProfileEditor } from "@/components/profile/ProfileEditor";
import { UserProfileCard } from "@/components/celebrities/UserProfileCard";
import { PeriodSelector } from "@/components/celebrities/PeriodSelector";
import { StatsCards } from "@/components/celebrities/StatsCards";
import { PopularCelebrities } from "@/components/celebrities/PopularCelebrities";
import { StatisticsCharts } from "@/components/celebrities/StatisticsCharts";
import { pageViewsData, trendingContentData, popularCelebritiesData } from "@/components/celebrities/ChartData";

const Celebrities = () => {
  const [currentPeriod, setCurrentPeriod] = useState("today");
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Utilisateur",
    firstName: "",
    lastName: "",
    imageUrl: "https://api.dicebear.com/7.x/initials/svg?seed=U",
    followers: 125,
    likes: 430,
    hearts: 78
  });
  const { toast } = useToast();
  
  useEffect(() => {
    // Charger les données du profil depuis localStorage si elles existent
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setUserProfile(prev => ({...prev, ...parsedProfile}));
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
      }
    }
  }, []);

  const handlePeriodChange = (period) => {
    if (period !== "today") {
      toast({
        title: "Période non disponible",
        description: `Vous n'avez pas encore atteint la totalité de ces jours sur Saba-StreamX.`,
        variant: "destructive",
      });
    }
    setCurrentPeriod(period);
  };

  const handleProfileUpdate = (updatedProfile) => {
    const newProfile = {...userProfile, ...updatedProfile};
    setUserProfile(newProfile);
    localStorage.setItem("userProfile", JSON.stringify(newProfile));
    setIsProfileEditorOpen(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };
  
  return (
    <div className="min-h-screen bg-stream-dark flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Célébrités & Statistiques</h1>
            <p className="text-gray-400">Découvrez les célébrités populaires et les tendances de la plateforme</p>
          </div>

          {/* User Profile Card */}
          <UserProfileCard 
            userProfile={userProfile} 
            onEdit={() => setIsProfileEditorOpen(true)}
          />

          {/* Period Selector */}
          <PeriodSelector 
            currentPeriod={currentPeriod} 
            onPeriodChange={handlePeriodChange} 
          />

          {/* Stats Cards */}
          <StatsCards />

          {/* Popular Celebrities */}
          <PopularCelebrities celebritiesData={popularCelebritiesData} />

          {/* Charts */}
          <StatisticsCharts 
            pageViewsData={pageViewsData} 
            trendingContentData={trendingContentData}
          />
        </div>
      </main>
      <Footer />
      
      {/* Profile Editor Dialog */}
      {isProfileEditorOpen && (
        <ProfileEditor 
          profile={userProfile}
          onSave={handleProfileUpdate}
          onCancel={() => setIsProfileEditorOpen(false)}
        />
      )}
    </div>
  );
};

export default Celebrities;
