
import { useState } from "react";
import { Search, Download, ArrowUp, ArrowDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Données des transactions (mock data)
const transactions = [
  {
    id: "TX-287652",
    date: "2025-05-15",
    description: "Paiement d'abonnement premium",
    amount: 15.99,
    type: "debit",
    status: "completed",
    method: "Carte Visa •••• 4512",
  },
  {
    id: "TX-287643",
    date: "2025-05-12",
    description: "Revenu de vues (312,456 vues)",
    amount: 624.91,
    type: "credit",
    status: "completed",
    method: "System",
  },
  {
    id: "TX-287592",
    date: "2025-05-10",
    description: "Retrait vers PayPal",
    amount: 500.00,
    type: "debit",
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TX-287534",
    date: "2025-05-05",
    description: "Revenus des abonnés (1,240 abonnés)",
    amount: 310.00,
    type: "credit",
    status: "completed",
    method: "System",
  },
  {
    id: "TX-287480",
    date: "2025-05-02",
    description: "Achat de film 'Inception'",
    amount: 4.99,
    type: "debit",
    status: "completed",
    method: "Mobile Money",
  },
  {
    id: "TX-287423",
    date: "2025-04-28",
    description: "Revenu de likes (45,230 likes)",
    amount: 452.30,
    type: "credit",
    status: "completed",
    method: "System",
  },
  {
    id: "TX-287410",
    date: "2025-04-25",
    description: "Retrait vers Compte bancaire",
    amount: 1000.00,
    type: "debit",
    status: "pending",
    method: "Compte bancaire",
  },
];

export const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredTransactions = transactions
    .filter(transaction => 
      (filter === "all" || 
       (filter === "credit" && transaction.type === "credit") ||
       (filter === "debit" && transaction.type === "debit") ||
       (filter === "pending" && transaction.status === "pending"))
    )
    .filter(transaction => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Historique des Transactions</h2>
        <p className="text-gray-400 mb-4">
          Suivez vos revenus, dépenses et paiements
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher dans l'historique..."
            className="pl-9 bg-stream-dark border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="h-10 rounded-md bg-stream-dark border border-gray-700 text-white px-3"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Toutes les transactions</option>
            <option value="credit">Revenus</option>
            <option value="debit">Dépenses</option>
            <option value="pending">En attente</option>
          </select>
          
          <Button variant="outline" size="icon" className="border-gray-700 text-gray-300">
            <Download className="h-4 w-4" />
            <span className="sr-only">Télécharger</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-stream-dark">
            <TableRow className="border-gray-700 hover:bg-stream-darker">
              <TableHead className="text-gray-300">ID</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Description</TableHead>
              <TableHead className="text-gray-300">Méthode</TableHead>
              <TableHead className="text-gray-300">Statut</TableHead>
              <TableHead className="text-right text-gray-300">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-gray-700 hover:bg-stream-dark">
                <TableCell className="font-medium text-white">{transaction.id}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${transaction.status === 'completed' 
                        ? 'bg-green-500 bg-opacity-20 text-green-400' 
                        : 'bg-yellow-500 bg-opacity-20 text-yellow-400'}`
                    }
                  >
                    {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                  </span>
                </TableCell>
                <TableCell className={`text-right font-semibold ${transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                  <span className="flex items-center justify-end">
                    {transaction.type === 'credit' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {formatCurrency(transaction.amount)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Affichage de {filteredTransactions.length} transactions sur {transactions.length}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled className="border-gray-700 text-gray-300 hover:bg-stream-dark">
            Précédent
          </Button>
          <Button variant="outline" size="sm" disabled className="border-gray-700 text-gray-300 hover:bg-stream-dark">
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};
