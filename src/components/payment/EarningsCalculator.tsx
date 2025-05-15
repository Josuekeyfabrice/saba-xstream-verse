
import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export const EarningsCalculator = () => {
  const [metrics, setMetrics] = useState({
    subscribers: 1000,
    views: 10000,
    likes: 2000,
    hours: 500
  });
  
  const [timeframe, setTimeframe] = useState('monthly');

  // Taux de rémunération (fictifs)
  const rates = {
    subscriberRate: 0.50, // $0.50 par abonné par mois
    viewRate: 0.002, // $0.002 par vue
    likeRate: 0.01, // $0.01 par like
    hourRate: 0.25 // $0.25 par heure de visionnage
  };

  const calculateEarnings = () => {
    const subscriberEarning = metrics.subscribers * rates.subscriberRate;
    const viewEarning = metrics.views * rates.viewRate;
    const likeEarning = metrics.likes * rates.likeRate;
    const hourEarning = metrics.hours * rates.hourRate;
    
    const totalMonthly = subscriberEarning + viewEarning + likeEarning + hourEarning;
    
    if (timeframe === 'monthly') return totalMonthly;
    if (timeframe === 'yearly') return totalMonthly * 12;
    if (timeframe === 'daily') return totalMonthly / 30;
    
    return totalMonthly;
  };

  const handleInputChange = (field: keyof typeof metrics, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMetrics({...metrics, [field]: numValue});
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Calculateur de Revenus</h2>
        <p className="text-gray-400 mb-4">
          Estimez vos gains potentiels en fonction de vos statistiques
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-stream-darker border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Vos Métriques</CardTitle>
            <CardDescription className="text-gray-400">
              Ajustez les valeurs pour calculer vos revenus potentiels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="subscribers" className="text-sm font-medium text-gray-300 mb-1 block">
                  Nombre d'abonnés
                </label>
                <Input
                  id="subscribers"
                  type="number"
                  value={metrics.subscribers}
                  onChange={(e) => handleInputChange('subscribers', e.target.value)}
                  className="bg-stream-dark border-gray-700 text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Taux: {formatCurrency(rates.subscriberRate)} par abonné par mois
                </p>
              </div>
              
              <div>
                <label htmlFor="views" className="text-sm font-medium text-gray-300 mb-1 block">
                  Nombre de vues
                </label>
                <Input
                  id="views"
                  type="number"
                  value={metrics.views}
                  onChange={(e) => handleInputChange('views', e.target.value)}
                  className="bg-stream-dark border-gray-700 text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Taux: {formatCurrency(rates.viewRate)} par vue
                </p>
              </div>
              
              <div>
                <label htmlFor="likes" className="text-sm font-medium text-gray-300 mb-1 block">
                  Nombre de j'aime
                </label>
                <Input
                  id="likes"
                  type="number"
                  value={metrics.likes}
                  onChange={(e) => handleInputChange('likes', e.target.value)}
                  className="bg-stream-dark border-gray-700 text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Taux: {formatCurrency(rates.likeRate)} par j'aime
                </p>
              </div>
              
              <div>
                <label htmlFor="hours" className="text-sm font-medium text-gray-300 mb-1 block">
                  Heures de visionnage
                </label>
                <Input
                  id="hours"
                  type="number"
                  value={metrics.hours}
                  onChange={(e) => handleInputChange('hours', e.target.value)}
                  className="bg-stream-dark border-gray-700 text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Taux: {formatCurrency(rates.hourRate)} par heure de visionnage
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-stream-darker border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Vos Revenus Estimés</CardTitle>
            <CardDescription className="text-gray-400">
              Basés sur vos métriques actuelles
            </CardDescription>
            <Tabs value={timeframe} onValueChange={setTimeframe} className="mt-4">
              <TabsList className="bg-stream-dark">
                <TabsTrigger value="daily" className="data-[state=active]:bg-stream-purple">Quotidien</TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:bg-stream-purple">Mensuel</TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-stream-purple">Annuel</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="mt-6 bg-stream-dark p-8 rounded-lg flex flex-col items-center justify-center">
              <p className="text-gray-400 text-lg mb-2">Vos gains {timeframe === 'daily' ? 'quotidiens' : timeframe === 'monthly' ? 'mensuels' : 'annuels'}</p>
              <p className="text-4xl font-bold text-stream-purple">{formatCurrency(calculateEarnings())}</p>
              <div className="mt-4 flex items-center text-green-500">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>+12% par rapport à la période précédente</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-stream-dark p-4 rounded-lg">
                <p className="text-xs text-gray-400">Revenus par abonnés</p>
                <p className="text-lg font-medium text-white mt-1">
                  {formatCurrency(metrics.subscribers * rates.subscriberRate)}
                </p>
                <div className="mt-1 flex items-center text-green-500 text-xs">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  <span>+8%</span>
                </div>
              </div>
              
              <div className="bg-stream-dark p-4 rounded-lg">
                <p className="text-xs text-gray-400">Revenus par vues</p>
                <p className="text-lg font-medium text-white mt-1">
                  {formatCurrency(metrics.views * rates.viewRate)}
                </p>
                <div className="mt-1 flex items-center text-red-500 text-xs">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  <span>-3%</span>
                </div>
              </div>
              
              <div className="bg-stream-dark p-4 rounded-lg">
                <p className="text-xs text-gray-400">Revenus par j'aime</p>
                <p className="text-lg font-medium text-white mt-1">
                  {formatCurrency(metrics.likes * rates.likeRate)}
                </p>
                <div className="mt-1 flex items-center text-green-500 text-xs">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  <span>+15%</span>
                </div>
              </div>
              
              <div className="bg-stream-dark p-4 rounded-lg">
                <p className="text-xs text-gray-400">Revenus par heures</p>
                <p className="text-lg font-medium text-white mt-1">
                  {formatCurrency(metrics.hours * rates.hourRate)}
                </p>
                <div className="mt-1 flex items-center text-green-500 text-xs">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  <span>+22%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
