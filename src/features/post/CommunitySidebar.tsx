
import React from "react";
import { Button } from "@/components/ui/button";
import { usePostContext } from "./PostContext";

export const CommunitySidebar = () => {
  const { isConnected, onlineUsers } = usePostContext();

  return (
    <div className="hidden md:block">
      <div className="bg-stream-darker rounded-lg p-6 sticky top-24">
        <h3 className="text-xl font-bold mb-4">Communauté</h3>
        
        {/* Indicateur de connexion en temps réel */}
        <div className="mb-4 p-3 rounded-lg bg-stream-dark/50">
          <div className="flex items-center gap-2 mb-2">
            <span className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{isConnected ? "Connecté" : "Déconnecté"}</span>
          </div>
          {isConnected && (
            <p className="text-sm text-gray-400">{onlineUsers} utilisateurs en ligne</p>
          )}
        </div>
        
        <ul className="space-y-3">
          <li>
            <Button variant="ghost" className="w-full justify-start">
              Pour vous
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              Tendances
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              Abonnements
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
