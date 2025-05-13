
import { Button } from "@/components/ui/button";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { User, Mail, Phone } from "lucide-react";
import { OTPVerification } from "./OTPVerification";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { LoginLink } from "./LoginLink";

const RegisterForm = () => {
  const {
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
  } = useRegisterForm();

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
