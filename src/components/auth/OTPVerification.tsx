
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OTPVerificationProps {
  phoneNumber: string;
  onBack: () => void;
  onVerifySuccess: () => void;
  onResendOTP: () => void;
}

export const OTPVerification = ({
  phoneNumber,
  onBack,
  onVerifySuccess,
  onResendOTP,
}: OTPVerificationProps) => {
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

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
      onVerifySuccess();
    }, 1500);
  };

  return (
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
          onClick={onBack}
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
            onClick={onResendOTP}
          >
            Renvoyer le code
          </button>
        </div>
      </div>
    </div>
  );
};
