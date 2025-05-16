
import { Button } from "@/components/ui/button";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { User, Mail, Phone } from "lucide-react";
import { OTPVerification } from "./OTPVerification";
import { InputField } from "./InputField";
import { PasswordField } from "./PasswordField";
import { LoginLink } from "./LoginLink";
import { useState } from "react";

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

  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = () => {
    // Simulate CAPTCHA verification
    setCaptchaVerified(true);
  };

  return (
    <>
      {step === 1 ? (
        // Étape 1: Formulaire d'information de base
        <div className="space-y-3">
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
          
          {/* CAPTCHA vérification */}
          <div className="flex flex-col space-y-2 p-3 bg-white/10 rounded-md">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="captcha"
                checked={captchaVerified}
                onChange={handleCaptchaChange}
                className="w-4 h-4 accent-stream-purple"
              />
              <label htmlFor="captcha" className="text-sm text-white">Je ne suis pas un robot</label>
            </div>
            <div className="text-xs text-gray-300 flex justify-between items-center">
              <span>CAPTCHA vérification</span>
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=40&q=80" alt="CAPTCHA" className="h-8 w-20 object-cover rounded" />
            </div>
          </div>
          
          <Button 
            onClick={handleSendOTP}
            disabled={isVerifying || !captchaVerified}
            className="w-full h-10 text-base transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/90 active:scale-95 animate-fade-in"
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
