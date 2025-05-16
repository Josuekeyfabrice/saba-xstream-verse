
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Contact, Conversation, Message } from './types';
import { contacts, conversations as initialConversations } from './data';
import { useToast } from "@/hooks/use-toast";

interface MessagingContextType {
  contacts: Contact[];
  conversations: Conversation[];
  activeConversationId: string | null;
  isMessagingOpen: boolean;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, content: string) => void;
  toggleMessaging: () => void;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const { toast } = useToast();

  // Simuler la réception de nouveaux messages
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance de recevoir un message
      if (Math.random() > 0.9 && activeConversationId) {
        const randomContactId = contacts[Math.floor(Math.random() * contacts.length)].id;
        const newMessage: Message = {
          id: `m-${Date.now()}`,
          senderId: randomContactId,
          receiverId: 'current-user',
          content: `Message automatique ${Math.floor(Math.random() * 1000)}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered',
          isOwn: false
        };
        
        handleNewMessage(newMessage);
        
        toast({
          title: "Nouveau message",
          description: `Message reçu de ${contacts.find(c => c.id === randomContactId)?.name}`,
        });
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [activeConversationId]);

  const handleNewMessage = (message: Message) => {
    setConversations(prevConversations => {
      return prevConversations.map(conv => {
        if (conv.contactId === message.senderId) {
          return {
            ...conv,
            messages: [...conv.messages, message],
            lastMessage: message
          };
        }
        return conv;
      });
    });
  };

  const sendMessage = (conversationId: string, content: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      senderId: 'current-user',
      receiverId: conversation.contactId,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      isOwn: true
    };
    
    setConversations(prevConversations => {
      return prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage
          };
        }
        return conv;
      });
    });
    
    // Simuler l'envoi réussi après 1 seconde
    setTimeout(() => {
      setConversations(prevConversations => {
        return prevConversations.map(conv => {
          if (conv.id === conversationId) {
            const updatedMessages = conv.messages.map(msg => {
              if (msg.id === newMessage.id) {
                return { ...msg, status: 'delivered' };
              }
              return msg;
            });
            
            return {
              ...conv,
              messages: updatedMessages,
              lastMessage: updatedMessages[updatedMessages.length - 1]
            };
          }
          return conv;
        });
      });
    }, 1000);
  };

  const toggleMessaging = () => {
    setIsMessagingOpen(prev => !prev);
  };

  return (
    <MessagingContext.Provider 
      value={{ 
        contacts, 
        conversations, 
        activeConversationId, 
        setActiveConversationId,
        isMessagingOpen,
        toggleMessaging,
        sendMessage
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};
