
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Récupérer les utilisateurs du localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    const user = users.find((user: { email: string, password: string, verified: boolean }) => 
      user.email === email && user.password === password
    );
    
    if (user) {
      // Vérifier si l'utilisateur a confirmé son email
      if (!user.verified) {
        toast({
          variant: "destructive",
          title: "Compte non vérifié",
          description: "Veuillez vérifier votre email pour activer votre compte",
        });
        return;
      }
      
      // Authentification réussie - set localStorage values
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }));
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur notre plateforme !",
      });
      navigate('/');
    } else {
      // Authentification échouée
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
      });
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email requis",
        description: "Veuillez entrer votre email pour réinitialiser votre mot de passe",
      });
      return;
    }
    
    // Vérifier si l'email existe dans la base de données
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user: { email: string }) => user.email === email);
    
    if (!userExists) {
      toast({
        variant: "destructive",
        title: "Email inconnu",
        description: "Aucun compte associé à cet email",
      });
      return;
    }
    
    // Simuler l'envoi d'un email de réinitialisation
    toast({
      title: "Email envoyé",
      description: "Instructions de réinitialisation envoyées à votre adresse email",
    });
    
    // Dans un cas réel, vous enverriez un email avec un lien de réinitialisation
    console.log(`Réinitialisation de mot de passe demandée pour: ${email}`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ea384c]">
      <div className="glass-card p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-white text-center hover:text-stream-purple transition-colors">Saba Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="transform transition-all duration-300 hover:-translate-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full pl-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
              />
            </div>
          </div>
          
          <div className="transform transition-all duration-300 hover:-translate-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-stream-purple"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-300 hover:text-blue-200 hover:underline transition-all"
            >
              Mot de passe oublié?
            </button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/90 active:scale-95 animate-fade-in"
          >
            Se connecter
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-white">
              Vous n'avez pas de compte?{" "}
              <Link to="/register" className="text-blue-300 hover:text-blue-200 underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
