
import React from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share, Facebook, Instagram, Twitter, Linkedin, Whatsapp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareMenuProps {
  commentId: string;
  commentText: string;
}

export const SocialShareMenu: React.FC<SocialShareMenuProps> = ({ commentId, commentText }) => {
  const { toast } = useToast();
  
  // Créer l'URL de partage avec le commentaire
  const getShareUrl = () => {
    // Dans une vraie application, cela serait une URL complète avec l'identifiant du commentaire
    return `${window.location.origin}${window.location.pathname}?comment=${commentId}`;
  };

  // Texte à partager (limité à 100 caractères)
  const shareText = `${commentText.substring(0, 100)}${commentText.length > 100 ? '...' : ''}`;
  
  // Gestionnaires de partage pour chaque plateforme
  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}&quote=${encodeURIComponent(shareText)}`, '_blank');
    notifyShared("Facebook");
  };
  
  const handleInstagramShare = () => {
    // Instagram n'a pas d'API de partage web directe, donc nous copions le lien
    navigator.clipboard.writeText(`${shareText} ${getShareUrl()}`);
    toast({
      title: "Lien copié",
      description: "Collez ce lien dans votre story Instagram ou votre publication",
    });
  };
  
  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(getShareUrl())}`, '_blank');
    notifyShared("Twitter");
  };
  
  const handleLinkedinShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`, '_blank');
    notifyShared("LinkedIn");
  };
  
  const handleWhatsappShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${getShareUrl()}`)}`, '_blank');
    notifyShared("WhatsApp");
  };
  
  const handleSabaOngeya = () => {
    // Placeholder pour Saba-Ongeya (à implémenter selon les spécifications)
    navigator.clipboard.writeText(`${shareText} ${getShareUrl()}`);
    toast({
      title: "Lien copié",
      description: "Lien copié pour partager sur Saba-Ongeya",
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    toast({
      title: "Lien copié",
      description: "Le lien du commentaire a été copié dans le presse-papier",
    });
  };
  
  const notifyShared = (platform: string) => {
    toast({
      title: `Partagé sur ${platform}`,
      description: "Le commentaire a été partagé avec succès",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-gray-400 text-xs h-8 px-2"
        >
          <Share className="h-3 w-3" />
          <span>Partager</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium">
          Partager sur
        </div>
        <DropdownMenuItem onClick={handleFacebookShare} className="cursor-pointer flex items-center gap-2">
          <Facebook className="h-4 w-4 text-blue-600" />
          <span>Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleInstagramShare} className="cursor-pointer flex items-center gap-2">
          <Instagram className="h-4 w-4 text-pink-600" />
          <span>Instagram</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTwitterShare} className="cursor-pointer flex items-center gap-2">
          <Twitter className="h-4 w-4 text-blue-400" />
          <span>Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLinkedinShare} className="cursor-pointer flex items-center gap-2">
          <Linkedin className="h-4 w-4 text-blue-700" />
          <span>LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWhatsappShare} className="cursor-pointer flex items-center gap-2">
          <Whatsapp className="h-4 w-4 text-green-600" />
          <span>WhatsApp</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSabaOngeya} className="cursor-pointer flex items-center gap-2">
          <Share className="h-4 w-4" />
          <span>Saba-Ongeya</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer flex items-center gap-2">
          <Share className="h-4 w-4" />
          <span>Copier le lien</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
