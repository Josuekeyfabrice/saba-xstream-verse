
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const WithdrawalForm = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState("USD");
  
  const availableBalance = 1250.75;
  const minWithdrawal = 50;

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWithdrawalMethod(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };
  
  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    // Traitement du retrait (serait connecté à une API dans une application réelle)
    alert(`Demande de retrait de ${amount} ${currency} en cours de traitement`);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Retrait de Fonds</h2>
        <p className="text-gray-400 mb-4">
          Retirez vos gains sur votre compte bancaire ou portefeuille numérique
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-stream-darker p-6 rounded-lg border border-gray-700">
          <form onSubmit={handleWithdrawal}>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="withdrawal-amount" className="text-gray-300">Montant du retrait</Label>
                  <span className="text-sm text-gray-400">
                    Min: {minWithdrawal} {currency}
                  </span>
                </div>
                <div className="flex">
                  <Input
                    id="withdrawal-amount"
                    type="number"
                    min={minWithdrawal}
                    max={availableBalance}
                    value={amount}
                    onChange={handleAmountChange}
                    className="rounded-r-none bg-stream-dark border-gray-700 text-white"
                  />
                  <select
                    value={currency}
                    onChange={handleCurrencyChange}
                    className="rounded-l-none bg-stream-dark border-gray-700 border-l-0 text-white px-3"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CDF">CDF</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="withdrawal-method" className="text-gray-300 mb-2 block">
                  Méthode de retrait
                </Label>
                <select
                  id="withdrawal-method"
                  value={withdrawalMethod}
                  onChange={handleMethodChange}
                  className="w-full h-10 px-3 py-2 rounded-md bg-stream-dark border border-gray-700 text-white"
                >
                  <option value="bank">Compte Bancaire</option>
                  <option value="mobile">Mobile Money</option>
                  <option value="paypal">PayPal</option>
                  <option value="crypto">Cryptomonnaie</option>
                </select>
              </div>
              
              {withdrawalMethod === "bank" && (
                <>
                  <div>
                    <Label htmlFor="bank-name" className="text-gray-300 mb-2 block">
                      Nom de la banque
                    </Label>
                    <Input
                      id="bank-name"
                      placeholder="Ex: Rawbank, Ecobank..."
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-number" className="text-gray-300 mb-2 block">
                      Numéro de compte
                    </Label>
                    <Input
                      id="account-number"
                      placeholder="Votre numéro de compte"
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-name" className="text-gray-300 mb-2 block">
                      Nom du titulaire
                    </Label>
                    <Input
                      id="account-name"
                      placeholder="Nom complet"
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                </>
              )}
              
              {withdrawalMethod === "mobile" && (
                <>
                  <div>
                    <Label htmlFor="mobile-operator" className="text-gray-300 mb-2 block">
                      Opérateur
                    </Label>
                    <select
                      id="mobile-operator"
                      className="w-full h-10 px-3 py-2 rounded-md bg-stream-dark border border-gray-700 text-white"
                    >
                      <option value="">Sélectionnez un opérateur</option>
                      <option value="airtel">Airtel Money</option>
                      <option value="orange">Orange Money</option>
                      <option value="mpesa">M-Pesa</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="phone-number" className="text-gray-300 mb-2 block">
                      Numéro de téléphone
                    </Label>
                    <Input
                      id="phone-number"
                      placeholder="+243 xxxxxxxxx"
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                </>
              )}
              
              {withdrawalMethod === "paypal" && (
                <div>
                  <Label htmlFor="paypal-email" className="text-gray-300 mb-2 block">
                    Email PayPal
                  </Label>
                  <Input
                    id="paypal-email"
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-stream-dark border-gray-700 text-white"
                  />
                </div>
              )}
              
              {withdrawalMethod === "crypto" && (
                <>
                  <div>
                    <Label htmlFor="crypto-type" className="text-gray-300 mb-2 block">
                      Type de cryptomonnaie
                    </Label>
                    <select
                      id="crypto-type"
                      className="w-full h-10 px-3 py-2 rounded-md bg-stream-dark border border-gray-700 text-white"
                    >
                      <option value="btc">Bitcoin (BTC)</option>
                      <option value="eth">Ethereum (ETH)</option>
                      <option value="usdt">Tether (USDT)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="wallet-address" className="text-gray-300 mb-2 block">
                      Adresse du portefeuille
                    </Label>
                    <Input
                      id="wallet-address"
                      placeholder="0x..."
                      className="bg-stream-dark border-gray-700 text-white"
                    />
                  </div>
                </>
              )}
              
              <div className="pt-4">
                <Button type="submit" className="w-full bg-stream-purple hover:bg-stream-purple/90">
                  Demander le retrait
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="bg-stream-darker p-6 rounded-lg border border-gray-700">
            <h3 className="font-medium text-white mb-4">Votre solde</h3>
            <div className="flex items-center justify-between bg-stream-dark p-4 rounded-lg mb-4">
              <span className="text-gray-400">Solde disponible</span>
              <span className="font-bold text-2xl text-stream-purple">${availableBalance.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between bg-stream-dark p-4 rounded-lg">
              <span className="text-gray-400">En attente de validation</span>
              <span className="font-medium text-xl text-gray-300">$350.00</span>
            </div>
          </div>
          
          <div className="bg-stream-darker p-6 rounded-lg border border-gray-700">
            <h3 className="font-medium text-white mb-4">Délais de traitement</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Compte bancaire</span>
                <span className="text-white">3-5 jours ouvrables</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Mobile Money</span>
                <span className="text-white">Instantané à 24h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">PayPal</span>
                <span className="text-white">1-2 jours ouvrables</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Cryptomonnaie</span>
                <span className="text-white">15-60 minutes</span>
              </div>
            </div>
          </div>
          
          <div className="bg-stream-darker p-6 rounded-lg border border-gray-700">
            <h3 className="font-medium text-white mb-4">Retraits récents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div>
                  <div className="flex items-center">
                    <ArrowDown className="h-4 w-4 text-red-400 mr-2" />
                    <span className="text-white">Retrait PayPal</span>
                  </div>
                  <p className="text-xs text-gray-500">12/05/2025</p>
                </div>
                <span className="font-medium text-red-400">-$200.00</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <div>
                  <div className="flex items-center">
                    <ArrowDown className="h-4 w-4 text-red-400 mr-2" />
                    <span className="text-white">Retrait M-Pesa</span>
                  </div>
                  <p className="text-xs text-gray-500">28/04/2025</p>
                </div>
                <span className="font-medium text-red-400">-$150.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="flex items-center">
                    <ArrowDown className="h-4 w-4 text-red-400 mr-2" />
                    <span className="text-white">Retrait Bancaire</span>
                  </div>
                  <p className="text-xs text-gray-500">15/04/2025</p>
                </div>
                <span className="font-medium text-red-400">-$500.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
