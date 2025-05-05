
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";

interface ProfileEditorProps {
  profile: {
    name: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  onSave: (updatedProfile: { name: string; firstName: string; lastName: string; imageUrl: string }) => void;
  onCancel: () => void;
}

export const ProfileEditor = ({ profile, onSave, onCancel }: ProfileEditorProps) => {
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    imageUrl: profile.imageUrl || "",
  });
  
  const [imagePreview, setImagePreview] = useState(profile.imageUrl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Si c'est l'URL de l'image qui change, mettre à jour la prévisualisation
    if (name === "imageUrl") {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    onSave({
      name: fullName || "Utilisateur", // Default if empty
      firstName: formData.firstName,
      lastName: formData.lastName,
      imageUrl: formData.imageUrl || "https://api.dicebear.com/7.x/initials/svg?seed=U", // Default avatar if empty
    });
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="bg-stream-darker text-white border border-gray-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white mb-4">Modifier votre profil</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-700 mb-2">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Photo de profil" 
                    className="h-full w-full object-cover"
                    onError={() => setImagePreview("https://api.dicebear.com/7.x/initials/svg?seed=U")}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-stream-purple/20">
                    <UserRound className="h-12 w-12 text-stream-purple" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-white">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl" className="text-white">URL de la photo</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://exemple.com/votre-photo.jpg"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Entrez l'URL d'une image en ligne ou utilisez un générateur comme DiceBear
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onCancel}
              className="text-white hover:bg-gray-700"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-stream-purple hover:bg-stream-purple/90"
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
