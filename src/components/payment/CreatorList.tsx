
import { useState } from "react";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Données des créateurs (mock data)
const creators = [
  {
    id: 1,
    name: "Sophie Martin",
    type: "Musique",
    subscribers: 120500,
    views: 3500000,
    likes: 850000,
    publications: 87,
    earnings: 12500,
  },
  {
    id: 2,
    name: "Jean Dupont",
    type: "Films",
    subscribers: 250000,
    views: 5200000,
    likes: 1200000,
    publications: 45,
    earnings: 28000,
  },
  {
    id: 3,
    name: "Marie Dubois",
    type: "Séries",
    subscribers: 180000,
    views: 4100000,
    likes: 950000,
    publications: 62,
    earnings: 18500,
  },
  {
    id: 4,
    name: "Thomas Leroy",
    type: "Musique",
    subscribers: 320000,
    views: 7800000,
    likes: 1500000,
    publications: 124,
    earnings: 32000,
  },
  {
    id: 5,
    name: "Emma Richard",
    type: "Films",
    subscribers: 210000,
    views: 4800000,
    likes: 1100000,
    publications: 38,
    earnings: 24000,
  },
];

export const CreatorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCreators = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number) => {
    return num.toLocaleString('fr-FR');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Liste des Créateurs</h2>
        <p className="text-gray-400 mb-4">
          Retrouvez tous les créateurs de contenu présents sur la plateforme et leurs statistiques
        </p>
        
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un créateur ou un type de contenu..."
            className="pl-9 bg-stream-dark border-gray-700 focus:border-stream-purple"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-stream-dark">
            <TableRow className="border-gray-700 hover:bg-stream-darker">
              <TableHead className="text-gray-300">Nom</TableHead>
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-right text-gray-300">Abonnés</TableHead>
              <TableHead className="text-right text-gray-300">Vues</TableHead>
              <TableHead className="text-right text-gray-300">J'aime</TableHead>
              <TableHead className="text-right text-gray-300">Publications</TableHead>
              <TableHead className="text-right text-gray-300">Revenus (USD)</TableHead>
              <TableHead className="text-right text-gray-300">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCreators.map((creator) => (
              <TableRow key={creator.id} className="border-gray-700 hover:bg-stream-dark">
                <TableCell className="font-medium text-white">{creator.name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stream-purple bg-opacity-20 text-stream-purple">
                    {creator.type}
                  </span>
                </TableCell>
                <TableCell className="text-right text-gray-300">{formatNumber(creator.subscribers)}</TableCell>
                <TableCell className="text-right text-gray-300">{formatNumber(creator.views)}</TableCell>
                <TableCell className="text-right text-gray-300">{formatNumber(creator.likes)}</TableCell>
                <TableCell className="text-right text-gray-300">{formatNumber(creator.publications)}</TableCell>
                <TableCell className="text-right font-semibold text-stream-purple">${formatNumber(creator.earnings)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-stream-purple hover:text-white">
                    Voir détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
