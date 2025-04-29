
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    // Vérification de la validité de l'email avec une regex simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Veuillez entrer une adresse email valide",
      });
      return;
    }

    // Vérifier si l'utilisateur existe déjà dans le localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user: { email: string }) => user.email === email);
    
    if (userExists) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Un compte avec cette adresse email existe déjà",
      });
      return;
    }
    
    // Enregistrer l'utilisateur dans le localStorage
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès",
    });
    
    // Redirection vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ea384c]">
      <div className="glass-card p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-white text-center hover:text-stream-purple transition-colors">Créer un compte Saba</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="transform transition-all duration-300 hover:-translate-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                required
                className="w-full pl-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
              />
            </div>
          </div>
          
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
              />
            </div>
          </div>
          
          <div className="transform transition-all duration-300 hover:-translate-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/90 active:scale-95 animate-fade-in"
          >
            S'inscrire
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-white">
              Vous avez déjà un compte?{" "}
              <Link to="/login" className="text-blue-300 hover:text-blue-200 underline">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
