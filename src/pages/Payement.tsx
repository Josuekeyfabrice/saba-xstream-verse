
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CreatorList } from "@/components/payment/CreatorList";
import { PaymentMethods } from "@/components/payment/PaymentMethods";
import { TransactionHistory } from "@/components/payment/TransactionHistory";
import { EarningsCalculator } from "@/components/payment/EarningsCalculator";
import { WithdrawalForm } from "@/components/payment/WithdrawalForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payement = () => {
  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stream-purple mb-2">Centre de Paiement</h1>
          <p className="text-gray-400">
            Gérez vos revenus, suivez vos créateurs préférés et effectuez des transactions en toute sécurité
          </p>
        </div>

        <Tabs defaultValue="creators" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="creators">Créateurs</TabsTrigger>
            <TabsTrigger value="earnings">Revenus</TabsTrigger>
            <TabsTrigger value="withdraw">Retrait</TabsTrigger>
            <TabsTrigger value="payment">Méthodes de Paiement</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          
          <div className="bg-stream-darker p-6 rounded-lg border border-gray-800">
            <TabsContent value="creators" className="mt-0">
              <CreatorList />
            </TabsContent>
            
            <TabsContent value="earnings" className="mt-0">
              <EarningsCalculator />
            </TabsContent>
            
            <TabsContent value="withdraw" className="mt-0">
              <WithdrawalForm />
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0">
              <PaymentMethods />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <TransactionHistory />
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payement;
