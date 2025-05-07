
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
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

// Configuration du serveur WebSocket simulé 
const SOCKET_URL = "https://websocket-simulation.lovable.dev";

// Define types for our context
export interface Post {
  id: string;
  username: string;
  userImage: string;
  imageUrl?: string;
  content: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
}

interface PostContextType {
  posts: Post[];
  socket: any;
  onlineUsers: number;
  isConnected: boolean;
  handleAddPost: (newPost: any) => void;
  handleLike: (postId: string) => void;
  handleComment: (postId: string, comment: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  // Connexion au socket.io
  useEffect(() => {
    console.log("Tentative de connexion au WebSocket...");
    
    // Mock socket implementation
    const mockSocket = {
      on: (event, callback) => {
        if (event === 'connect') {
          setTimeout(() => callback(), 1000);
        }
        if (event === 'userCount') {
          setTimeout(() => callback(Math.floor(Math.random() * 50) + 10), 1500);
        }
      },
      emit: (event, data, callback) => {
        console.log(`Émission de l'événement "${event}" avec données:`, data);
        if (callback) callback({ success: true, id: Date.now().toString() });
      },
      connected: true,
      disconnect: () => console.log("Déconnexion WebSocket"),
      off: (event) => {},
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
    <PostContext.Provider 
      value={{ 
        posts, 
        socket, 
        onlineUsers, 
        isConnected, 
        handleAddPost, 
        handleLike, 
        handleComment 
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
