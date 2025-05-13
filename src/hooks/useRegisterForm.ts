
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validatePhoneNumber } from "@/lib/utils";

export const useRegisterForm = () => {
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

  const validateForm = () => {
    // Validation du formulaire avant d'envoyer le code
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Nom requis",
        description: "Veuillez entrer votre nom complet",
      });
      return false;
    }

    // Vérification de la validité de l'email
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
      });
      return false;
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur de mot de passe",
        description: "Les mots de passe ne correspondent pas",
      });
      return false;
    }

    // Validation du numéro de téléphone
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        variant: "destructive",
        title: "Numéro de téléphone invalide",
        description: "Veuillez entrer un numéro de téléphone RDC valide commençant par +243 suivi de 9 chiffres",
      });
      return false;
    }

    return true;
  };

  const handleSendOTP = () => {
    if (!validateForm()) return;

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

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    phoneNumber,
    setPhoneNumber,
    step,
    setStep,
    isVerifying,
    showPassword,
    showConfirmPassword,
    handleSendOTP,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleVerifySuccess
  };
};
