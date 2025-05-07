
import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { CreatePostForm } from "@/components/CreatePostForm";
import { PostCard } from "@/components/PostCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { useToast } from "@/hooks/use-toast";

// Sample post data
const initialPosts = [
  {
    id: "1",
    username: "sarah_doe",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800",
    content: "Travailler sur un nouveau projet passionnant aujourd'hui !",
    likes: 24,
    comments: 5,
    isLiked: false,
    timestamp: "Il y a 2 heures",
  },
  {
    id: "2",
    username: "john_smith",
    userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    content: "Partage de mes découvertes sur les dernières technologies de streaming !",
    likes: 15,
    comments: 3,
    isLiked: true,
    timestamp: "Il y a 5 heures",
  }
];

// Configuration du serveur WebSocket simulé (dans un environnement réel, ce serait l'URL du serveur)
const SOCKET_URL = "https://websocket-simulation.lovable.dev";

const Post = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Connexion au socket.io
  useEffect(() => {
    // Simulation de connexion WebSocket
    console.log("Tentative de connexion au WebSocket...");
    
    // Dans une implémentation réelle, nous nous connecterions à un serveur socket.io
    // const newSocket = io(SOCKET_URL);
    
    // Pour la démonstration, nous allons utiliser un mock
    const mockSocket = {
      on: (event, callback) => {
        // Simuler des événements de socket
        if (event === 'connect') {
          setTimeout(() => callback(), 1000);
        }
        if (event === 'userCount') {
          setTimeout(() => callback(Math.floor(Math.random() * 50) + 10), 1500);
        }
        if (event === 'newPost') {
          // Nous simulerons l'envoi de nouveaux messages ailleurs
        }
      },
      emit: (event, data, callback) => {
        console.log(`Émission de l'événement "${event}" avec données:`, data);
        if (callback) callback({ success: true, id: Date.now().toString() });
      },
      connected: true,
      disconnect: () => console.log("Déconnexion WebSocket")
    };

    setSocket(mockSocket);
    
    // Simuler l'événement de connexion
    mockSocket.on('connect', () => {
      setIsConnected(true);
      toast({
        title: "Connexion établie",
        description: "Vous êtes maintenant connecté à la communauté en temps réel",
      });
    });

    // Simuler la réception du nombre d'utilisateurs en ligne
    mockSocket.on('userCount', (count) => {
      setOnlineUsers(count);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Écouter les nouveaux posts
  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      toast({
        title: "Nouveau message",
        description: `${newPost.username} vient de publier un message`,
      });
    };

    socket.on('newPost', handleNewPost);

    return () => {
      socket.off('newPost', handleNewPost);
    };
  }, [socket]);

  const handleAddPost = useCallback((newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    
    // Émettre l'événement de nouveau post via WebSocket
    if (socket) {
      socket.emit('newPost', newPost, (response) => {
        if (response.success) {
          console.log("Message envoyé à tous les utilisateurs");
        }
      });
    }
  }, [socket]);

  const handleLike = useCallback((postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const wasLiked = post.isLiked;
          const updatedPost = {
            ...post,
            isLiked: !wasLiked,
            likes: wasLiked ? post.likes - 1 : post.likes + 1,
          };
          
          // Émettre l'événement de like via WebSocket
          if (socket) {
            socket.emit('likePost', { postId, liked: !wasLiked });
          }
          
          return updatedPost;
        }
        return post;
      })
    );
  }, [socket]);

  const handleComment = useCallback((postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedPost = {
            ...post,
            comments: post.comments + 1,
          };
          
          // Émettre l'événement de commentaire via WebSocket
          if (socket) {
            socket.emit('commentPost', { postId, comment });
          }
          
          return updatedPost;
        }
        return post;
      })
    );
  }, [socket]);

  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar left */}
            <div className="hidden md:block">
              <div className="bg-stream-darker rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Communauté</h3>
                
                {/* Indicateur de connexion en temps réel */}
                <div className="mb-4 p-3 rounded-lg bg-stream-dark/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span>{isConnected ? "Connecté" : "Déconnecté"}</span>
                  </div>
                  {isConnected && (
                    <p className="text-sm text-gray-400">{onlineUsers} utilisateurs en ligne</p>
                  )}
                </div>
                
                <ul className="space-y-3">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      Pour vous
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      Tendances
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      Abonnements
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <CreatePostForm onAddPost={handleAddPost} socket={socket} />
              
              <div className="space-y-6 mt-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    socket={socket}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
