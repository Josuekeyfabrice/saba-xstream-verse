
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, TrendingUp, TrendingDown, ChevronUp } from "lucide-react";

export const StatsCards = () => {
  return (
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
  );
};
