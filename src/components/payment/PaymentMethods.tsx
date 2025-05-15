
import { useState } from "react";
import { CreditCard, Bitcoin, Wallet, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const PaymentMethods = () => {
  const [activeTab, setActiveTab] = useState("card");

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Méthodes de Paiement</h2>
        <p className="text-gray-400 mb-6">
          Gérez vos méthodes de paiement pour les achats et les retraits
        </p>
      </div>

      <Tabs 
        defaultValue="card" 
        onValueChange={setActiveTab} 
        className="grid gap-6 md:grid-cols-[200px_1fr]"
      >
        <div className="flex flex-col gap-2">
          <TabsList className="grid grid-cols-1 h-auto bg-stream-dark">
            <TabsTrigger 
              value="card" 
              className="justify-start py-3 data-[state=active]:bg-stream-purple data-[state=active]:text-white"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Cartes bancaires
            </TabsTrigger>
            <TabsTrigger 
              value="mobile" 
              className="justify-start py-3 data-[state=active]:bg-stream-purple data-[state=active]:text-white"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Mobile Money
            </TabsTrigger>
            <TabsTrigger 
              value="crypto" 
              className="justify-start py-3 data-[state=active]:bg-stream-purple data-[state=active]:text-white"
            >
              <Bitcoin className="mr-2 h-4 w-4" />
              Cryptomonnaie
            </TabsTrigger>
            <TabsTrigger 
              value="other" 
              className="justify-start py-3 data-[state=active]:bg-stream-purple data-[state=active]:text-white"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Autres
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-stream-darker p-6 rounded-lg border border-gray-700">
          <TabsContent value="card">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Cartes Bancaires</h3>
                <p className="text-gray-400 mb-4">
                  Ajoutez vos cartes Visa, Mastercard et effectuez vos paiements en toute sécurité
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number" className="text-gray-300">Numéro de carte</Label>
                  <Input 
                    id="card-number" 
                    placeholder="1234 5678 9012 3456" 
                    className="bg-stream-dark border-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry-month" className="text-gray-300">Mois</Label>
                    <Input 
                      id="expiry-month" 
                      placeholder="MM" 
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expiry-year" className="text-gray-300">Année</Label>
                    <Input 
                      id="expiry-year" 
                      placeholder="AA" 
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc" className="text-gray-300">CVC</Label>
                    <Input 
                      id="cvc" 
                      placeholder="123" 
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name-card" className="text-gray-300">Nom sur la carte</Label>
                  <Input 
                    id="name-card" 
                    placeholder="John Doe" 
                    className="bg-stream-dark border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-stream-purple hover:bg-stream-purple/90">
                  Ajouter la carte
                </Button>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Cartes enregistrées</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-stream-dark rounded-lg border border-gray-700">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 mr-3 text-stream-purple" />
                      <div>
                        <p className="font-medium text-white">Visa •••• 4512</p>
                        <p className="text-sm text-gray-400">Expire 12/24</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700 text-red-400 hover:text-red-300">
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Mobile Money</h3>
                <p className="text-gray-400 mb-4">
                  Effectuez des paiements avec Airtel-money, Orange-money ou Vocacom-Mpesa
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="mobile-operator" className="text-gray-300">Opérateur</Label>
                  <select className="flex h-10 w-full rounded-md border border-gray-700 bg-stream-dark px-3 py-2 text-white">
                    <option value="">Sélectionnez un opérateur</option>
                    <option value="airtel">Airtel Money</option>
                    <option value="orange">Orange Money</option>
                    <option value="mpesa">M-Pesa</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone-number" className="text-gray-300">Numéro de téléphone</Label>
                  <Input 
                    id="phone-number" 
                    placeholder="+243 xxxxxxxxx" 
                    className="bg-stream-dark border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-stream-purple hover:bg-stream-purple/90">
                  Lier le compte
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="crypto">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Cryptomonnaie</h3>
                <p className="text-gray-400 mb-4">
                  Payez avec Bitcoin, Ethereum et d'autres cryptomonnaies
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="crypto-type" className="text-gray-300">Type de crypto</Label>
                  <select className="flex h-10 w-full rounded-md border border-gray-700 bg-stream-dark px-3 py-2 text-white">
                    <option value="">Sélectionnez une cryptomonnaie</option>
                    <option value="btc">Bitcoin (BTC)</option>
                    <option value="eth">Ethereum (ETH)</option>
                    <option value="usdt">Tether (USDT)</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wallet-address" className="text-gray-300">Adresse du portefeuille</Label>
                  <Input 
                    id="wallet-address" 
                    placeholder="0x..." 
                    className="bg-stream-dark border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-stream-purple hover:bg-stream-purple/90">
                  Connecter le portefeuille
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="other">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Autres Méthodes</h3>
                <p className="text-gray-400 mb-4">
                  PayPal, Rawbank et autres méthodes de paiement
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="payment-method" className="text-gray-300">Méthode de paiement</Label>
                  <select className="flex h-10 w-full rounded-md border border-gray-700 bg-stream-dark px-3 py-2 text-white">
                    <option value="">Sélectionnez une méthode</option>
                    <option value="paypal">PayPal</option>
                    <option value="rawbank">Rawbank</option>
                    <option value="transfer">Virement bancaire</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-id" className="text-gray-300">Identifiant du compte</Label>
                  <Input 
                    id="account-id" 
                    placeholder="email@exemple.com ou numéro de compte" 
                    className="bg-stream-dark border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-stream-purple hover:bg-stream-purple/90">
                  Connecter le compte
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
