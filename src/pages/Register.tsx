
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    // Enregistrer l'utilisateur dans le localStorage avec le statut non vérifié
    const newUser = { name, email, password, verified: false };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Simuler l'envoi d'un email de vérification
    simulateEmailVerification(email);
    
    toast({
      title: "Inscription réussie",
      description: "Un email de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.",
    });
    
    // Redirection vers la page de confirmation
    navigate('/login');
  };

  const simulateEmailVerification = (userEmail: string) => {
    console.log(`Email de vérification envoyé à: ${userEmail}`);
    
    // Simuler la vérification automatique après 3 secondes
    // Dans un cas réel, l'utilisateur cliquerait sur un lien dans l'email
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((user: any) => {
        if (user.email === userEmail) {
          return { ...user, verified: true };
        }
        return user;
      });
      
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      console.log(`Email vérifié pour: ${userEmail}`);
    }, 3000);
    
    // Ouvrir Gmail dans un nouvel onglet pour simuler le processus
    window.open("https://mail.google.com", "_blank");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          
          <div className="transform transition-all duration-300 hover:-translate-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
              />
              <button 
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-stream-purple"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
