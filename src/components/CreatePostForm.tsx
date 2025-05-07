
import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Image, 
  Send, 
  X, 
  Video, 
  UserPlus, 
  MapPin, 
  Smile,
  Camera 
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Émojis populaires pour le sélecteur
const popularEmojis = ["😀", "😂", "😍", "🥰", "😎", "🔥", "👍", "❤️", "✨", "🙌", "🎉", "🤔", "😢", "👏", "🤩"];

interface CreatePostFormProps {
  onAddPost: (post: any) => void;
  socket?: any; // Socket instance
}

export const CreatePostForm = ({ onAddPost, socket }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [taggedFriends, setTaggedFriends] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Récupérer le nom de l'utilisateur connecté
  const [currentUser, setCurrentUser] = useState({ name: "votre_nom", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" });

  useEffect(() => {
    // Récupérer les données de l'utilisateur du localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser({
          name: userData.name || "votre_nom",
          image: userData.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
        });
      } catch (e) {
        console.error("Erreur lors de la récupération des données utilisateur:", e);
      }
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Fichier trop volumineux",
          description: "L'image ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }
      
      // Réinitialiser la vidéo si une image est sélectionnée
      setSelectedVideo(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: "Fichier trop volumineux",
          description: "La vidéo ne doit pas dépasser 50MB",
          variant: "destructive",
        });
        return;
      }
      
      // Réinitialiser l'image si une vidéo est sélectionnée
      setSelectedImage(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedVideo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  const handleTagFriend = () => {
    if (!tagInput.trim()) return;
    
    if (!taggedFriends.includes(tagInput)) {
      setTaggedFriends([...taggedFriends, tagInput]);
    }
    
    setTagInput("");
    setShowTagInput(false);
    
    toast({
      title: "Ami tagué",
      description: `${tagInput} a été tagué dans votre publication`,
    });
  };

  const removeTaggedFriend = (friend: string) => {
    setTaggedFriends(taggedFriends.filter(f => f !== friend));
  };

  const handleGetLocation = () => {
    setIsAddingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Dans un cas réel, vous utiliseriez une API de géocodage inverse
            // Ici, nous simulons la récupération d'une adresse
            setTimeout(() => {
              setLocation("Kinshasa, République Démocratique du Congo");
              setIsAddingLocation(false);
            }, 1000);
          } catch (error) {
            console.error("Erreur de géolocalisation:", error);
            setIsAddingLocation(false);
            toast({
              title: "Erreur de localisation",
              description: "Impossible de récupérer votre position",
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setIsAddingLocation(false);
          toast({
            title: "Erreur de localisation",
            description: "Veuillez autoriser l'accès à votre position",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsAddingLocation(false);
      toast({
        title: "Géolocalisation non supportée",
        description: "Votre navigateur ne supporte pas la géolocalisation",
        variant: "destructive",
      });
    }
  };

  const removeLocation = () => {
    setLocation("");
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeVideo = () => {
    setSelectedVideo(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const takePicture = () => {
    // Dans une application réelle, vous utiliseriez l'API MediaDevices
    toast({
      title: "Fonctionnalité en développement",
      description: "La prise de photo directe sera bientôt disponible",
    });
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !selectedImage && !selectedVideo) return;
    
    setIsSubmitting(true);
    
    const newPost = {
      id: Date.now().toString(),
      username: currentUser.name,
      userImage: currentUser.image,
      imageUrl: selectedImage || undefined,
      videoUrl: selectedVideo || undefined,
      content,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: "À l'instant",
      location: location || undefined,
      taggedFriends: taggedFriends.length > 0 ? taggedFriends : undefined,
      isPrivate,
    };
    
    // Si nous avons un socket, émettons l'événement en temps réel
    if (socket) {
      socket.emit('newPost', newPost, (response: any) => {
        if (response.success) {
          onAddPost(newPost);
          setContent("");
          setSelectedImage(null);
          setSelectedVideo(null);
          setLocation("");
          setTaggedFriends([]);
          setIsPrivate(false);
          setIsSubmitting(false);
          
          toast({
            title: "Message publié !",
            description: "Votre message a été partagé en temps réel avec la communauté.",
          });
        } else {
          setIsSubmitting(false);
          toast({
            title: "Erreur",
            description: "Impossible de publier votre message. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      });
    } else {
      // Fallback si pas de socket
      onAddPost(newPost);
      setContent("");
      setSelectedImage(null);
      setSelectedVideo(null);
      setLocation("");
      setTaggedFriends([]);
      setIsPrivate(false);
      setIsSubmitting(false);
      
      toast({
        title: "Post publié !",
        description: "Votre post a été publié avec succès.",
      });
    }
  }, [content, selectedImage, selectedVideo, location, taggedFriends, isPrivate, socket, onAddPost, toast, currentUser]);

  return (
    <Card className="bg-stream-darker border-gray-700">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar className="hidden sm:flex h-10 w-10">
            <AvatarImage src={currentUser.image} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          
          <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Textarea 
                placeholder={`Qu'avez-vous en tête, ${currentUser.name} ?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none min-h-20"
              />
              
              {/* Affichage des amis tagués */}
              {taggedFriends.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {taggedFriends.map(friend => (
                    <div key={friend} className="bg-stream-purple/20 text-stream-purple px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <span>@{friend}</span>
                      <button 
                        type="button" 
                        onClick={() => removeTaggedFriend(friend)}
                        className="h-4 w-4 rounded-full hover:bg-stream-purple/30 flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Affichage de la localisation */}
              {location && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MapPin className="h-3 w-3" />
                  <span>{location}</span>
                  <button 
                    type="button" 
                    onClick={removeLocation}
                    className="h-4 w-4 rounded-full hover:bg-gray-700 flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Interface de tag d'ami */}
            {showTagInput && (
              <div className="flex gap-2 items-center">
                <UserPlus className="h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Nom de l'ami à taguer"
                  className="flex-1 bg-stream-dark border border-gray-700 rounded px-2 py-1 text-sm"
                />
                <Button 
                  type="button" 
                  size="sm" 
                  onClick={handleTagFriend}
                  disabled={!tagInput.trim()}
                >
                  Taguer
                </Button>
              </div>
            )}
            
            {/* Prévisualisation de l'image sélectionnée */}
            {selectedImage && (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="max-h-64 rounded-md object-cover" 
                />
                <Button 
                  type="button"
                  variant="destructive" 
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Prévisualisation de la vidéo sélectionnée */}
            {selectedVideo && (
              <div className="relative">
                <video 
                  src={selectedVideo} 
                  controls
                  className="max-h-64 w-full rounded-md object-cover" 
                />
                <Button 
                  type="button"
                  variant="destructive" 
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                  onClick={removeVideo}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="border-t border-gray-700 pt-3">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Photo</span>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    <Video className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Vidéo</span>
                  </Button>
                  <input
                    type="file"
                    ref={videoInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleVideoSelect}
                  />
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={takePicture}
                  >
                    <Camera className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Direct</span>
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => setShowTagInput(!showTagInput)}
                  >
                    <UserPlus className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Taguer</span>
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={handleGetLocation}
                    disabled={isAddingLocation}
                  >
                    <MapPin className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">
                      {isAddingLocation ? "..." : "Lieu"}
                    </span>
                  </Button>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs sm:text-sm"
                      >
                        <Smile className="h-4 w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Emoji</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2">
                      <div className="flex flex-wrap gap-2">
                        {popularEmojis.map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => handleAddEmoji(emoji)}
                            className="text-xl hover:bg-stream-purple/10 p-1 rounded"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-stream-purple hover:bg-stream-purple/90"
                  disabled={(!content.trim() && !selectedImage && !selectedVideo) || isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Envoi..." : "Publier"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
