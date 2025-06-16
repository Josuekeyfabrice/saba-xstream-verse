
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validatePhoneNumber } from "@/lib/utils";

export const useRegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();

  const validateForm = () => {
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Nom requis",
        description: "Veuillez entrer votre nom complet",
      });
      return false;
    }

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur de mot de passe",
        description: "Les mots de passe ne correspondent pas",
      });
      return false;
    }

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

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    setIsVerifying(true);

    const { error } = await signUp(email, password, {
      name,
      phone_number: phoneNumber,
    });

    setIsVerifying(false);

    if (!error) {
      setStep(2);
      toast({
        title: "Inscription en cours",
        description: "Un email de confirmation a été envoyé à votre adresse",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleVerifySuccess = () => {
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
    otpCode,
    setOtpCode,
    handleSendOTP,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleVerifySuccess
  };
};
