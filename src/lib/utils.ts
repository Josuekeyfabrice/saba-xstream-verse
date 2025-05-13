
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction de validation du numéro de téléphone (RDC +243)
export const validatePhoneNumber = (phone: string) => {
  const congolesePhoneRegex = /^\+243[0-9]{9}$/;
  return congolesePhoneRegex.test(phone);
};

// Validation de l'email avec une regex simple
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
