
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Basic info, Step 2: OTP verification
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fonction de validation du numéro de téléphone (RDC +243)
  const validatePhoneNumber = (phone: string) => {
    const congolesePhoneRegex = /^\+243[0-9]{9}$/;
    return congolesePhoneRegex.test(phone);
  };

  const handleSendOTP = () => {
    // Validation du formulaire avant d'envoyer le code
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Nom requis",
        description: "Veuillez entrer votre nom complet",
      });
      return;
    }

    // Vérification de la validité de l'email avec une regex simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
      });
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur de mot de passe",
        description: "Les mots de passe ne correspondent pas",
      });
      return;
    }

    // Validation du numéro de téléphone RDC
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        variant: "destructive",
        title: "Numéro de téléphone invalide",
        description: "Veuillez entrer un numéro de téléphone RDC valide commençant par +243 suivi de 9 chiffres",
      });
      return;
    }

    // Simulation de l'envoi du code OTP
    setIsVerifying(true);

    // Délai simulé pour l'envoi du code
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2); // Passer à l'étape de vérification OTP
      
      toast({
        title: "Code envoyé",
        description: "Un code de vérification a été envoyé à votre numéro de téléphone",
      });
      
      // Dans un cas réel, le code serait envoyé au téléphone de l'utilisateur
      console.log(`Code OTP envoyé au numéro: ${phoneNumber}`);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    // Vérifier si le code OTP est complet (6 chiffres)
    if (otpValue.length !== 6) {
      toast({
        variant: "destructive",
        title: "Code incomplet",
        description: "Veuillez entrer le code complet à 6 chiffres",
      });
      return;
    }

    setIsVerifying(true);

    // Simulation de la vérification du code (Dans un cas réel, ce serait une vérification côté serveur)
    setTimeout(() => {
      setIsVerifying(false);
      
      // Vérifier l'utilisateur existant dans le localStorage
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
      const newUser = { 
        name, 
        email, 
        password, 
        phoneNumber,
        verified: true,  // L'utilisateur est vérifié car il a passé l'étape OTP
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
      
      navigate('/login');
    }, 1500);
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
        
        {step === 1 ? (
          // Étape 1: Formulaire d'information de base
          <div className="space-y-4">
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
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
                Numéro de téléphone (RDC)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+243XXXXXXXXX"
                  required
                  className="w-full pl-10 transition-all duration-300 hover:border-stream-purple focus:ring-stream-purple"
                />
              </div>
              <p className="text-xs text-blue-300 mt-1">Format: +243 suivi de 9 chiffres</p>
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
              onClick={handleSendOTP}
              disabled={isVerifying}
              className="w-full h-12 text-lg transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/90 active:scale-95 animate-fade-in"
            >
              {isVerifying ? "Envoi en cours..." : "Continuer"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-white">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="text-blue-300 hover:text-blue-200 underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        ) : (
          // Étape 2: Vérification OTP
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-white mb-2">Veuillez entrer le code à 6 chiffres envoyé au</p>
              <p className="text-blue-300 font-medium">{phoneNumber}</p>
            </div>
            
            <div className="flex justify-center py-4">
              <InputOTP 
                maxLength={6} 
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleVerifyOTP}
                disabled={isVerifying || otpValue.length !== 6}
                className="w-full h-12 text-lg transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/90 active:scale-95"
              >
                {isVerifying ? "Vérification..." : "Vérifier"}
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="w-full text-white hover:text-blue-200"
                disabled={isVerifying}
              >
                Retour
              </Button>
              
              <div className="text-center text-sm">
                <button
                  type="button"
                  className="text-blue-300 hover:text-blue-200 hover:underline"
                  disabled={isVerifying}
                  onClick={handleSendOTP}
                >
                  Renvoyer le code
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
