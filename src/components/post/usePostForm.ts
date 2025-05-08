
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const usePostForm = (onAddPost: (post: any) => void, socket?: any) => {
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

  // Current user state
  const [currentUser, setCurrentUser] = useState({ 
    name: "votre_nom", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" 
  });

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

  const handleSubmit = (e: React.FormEvent) => {
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
          resetForm();
          
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
      resetForm();
      
      toast({
        title: "Post publié !",
        description: "Votre post a été publié avec succès.",
      });
    }
  };

  const resetForm = () => {
    setContent("");
    setSelectedImage(null);
    setSelectedVideo(null);
    setLocation("");
    setTaggedFriends([]);
    setIsPrivate(false);
    setIsSubmitting(false);
  };

  return {
    content,
    setContent,
    currentUser,
    selectedImage,
    selectedVideo,
    location,
    isSubmitting,
    isAddingLocation,
    taggedFriends,
    showTagInput,
    tagInput,
    setTagInput,
    handleSubmit,
    handleImageSelect,
    handleVideoSelect,
    handleAddEmoji,
    handleTagFriend,
    removeTaggedFriend,
    handleGetLocation,
    removeLocation,
    removeImage,
    removeVideo,
    takePicture,
    setShowTagInput,
    fileInputRef,
    videoInputRef,
  };
};
