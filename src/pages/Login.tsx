
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
    <div className="min-h-screen bg-stream-dark flex items-center justify-center">
      <div className="glass-card p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Connexion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full h-12 text-lg">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
