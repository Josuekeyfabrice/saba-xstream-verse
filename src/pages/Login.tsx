
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ea384c]">
      <div className="glass-card p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-white text-center hover:text-stream-purple transition-colors">Connexion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="transform transition-all duration-300 hover:-translate-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              required
              className="w-full transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
            />
          </div>
          <div className="transform transition-all duration-300 hover:-translate-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 text-lg transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/90 active:scale-95 animate-fade-in"
          >
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
