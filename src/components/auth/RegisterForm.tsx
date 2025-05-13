
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { validateEmail, validatePhoneNumber } from "@/lib/utils";
import { OTPVerification } from "./OTPVerification";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { LoginLink } from "./LoginLink";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1); // Step 1: Basic info, Step 2: OTP verification
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

    // Vérification de la validité de l'email
    if (!validateEmail(email)) {
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

    // Validation du numéro de téléphone
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleVerifySuccess = () => {
    // Enregistrer l'utilisateur dans le localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Vérifier l'utilisateur existant dans le localStorage
    const userExists = users.some((user: { email: string }) => user.email === email);
    
    if (userExists) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Un compte avec cette adresse email existe déjà",
      });
      return;
    }

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
  };

  return (
    <>
      {step === 1 ? (
        // Étape 1: Formulaire d'information de base
        <div className="space-y-4">
          <InputField
            id="name"
            label="Nom complet"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            icon={<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />}
          />
          
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            icon={<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />}
          />
          
          <InputField
            id="phoneNumber"
            label="Numéro de téléphone par pays"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+243XXXXXXXXX"
            icon={<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />}
            helpText="Format: +243 suivi de 9 chiffres"
          />
          
          <PasswordField
            id="password"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleVisibility={togglePasswordVisibility}
          />
          
          <PasswordField
            id="confirmPassword"
            label="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={showConfirmPassword}
            toggleVisibility={toggleConfirmPasswordVisibility}
          />
          
          <Button 
            onClick={handleSendOTP}
            disabled={isVerifying}
            className="w-full h-12 text-lg transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/90 active:scale-95 animate-fade-in"
          >
            {isVerifying ? "Envoi en cours..." : "Continuer"}
          </Button>
          
          <LoginLink />
        </div>
      ) : (
        <OTPVerification 
          phoneNumber={phoneNumber}
          onBack={() => setStep(1)}
          onVerifySuccess={handleVerifySuccess}
          onResendOTP={handleSendOTP}
        />
      )}
    </>
  );
};

export default RegisterForm;
