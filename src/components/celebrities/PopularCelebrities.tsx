
import { Card, CardContent } from "@/components/ui/card";

interface Celebrity {
  id: string;
  name: string;
  imageUrl: string;
  viewCount: number;
  trending: string;
}

interface PopularCelebritiesProps {
  celebritiesData: Celebrity[];
}

export const PopularCelebrities = ({ celebritiesData }: PopularCelebritiesProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Célébrités Populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {celebritiesData.map((celebrity) => (
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
    </>
  );
};
