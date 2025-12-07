
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata: { name: string; phone_number: string }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message,
      });
      return { error };
    }

    toast({
      title: "Inscription réussie",
      description: "Veuillez vérifier votre email pour confirmer votre compte.",
    });

    return { data, error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      let errorMessage = error.message;
      
      // Améliorer les messages d'erreur en français
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Email ou mot de passe incorrect. Si vous venez de vous inscrire, veuillez d'abord confirmer votre email.";
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = "Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte de réception.";
      }
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
      return { error };
    }

    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur notre plateforme !",
    });

    return { data, error: null };
  };

  const resendConfirmationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      }
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de renvoyer l'email de confirmation.",
      });
      return { error };
    }

    toast({
      title: "Email envoyé",
      description: "Un nouvel email de confirmation a été envoyé. Vérifiez votre boîte de réception.",
    });

    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message,
      });
      return { error };
    }

    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });

    return { error: null };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
      return { error };
    }

    toast({
      title: "Email envoyé",
      description: "Instructions de réinitialisation envoyées à votre adresse email",
    });

    return { error: null };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    resendConfirmationEmail,
  };
};
