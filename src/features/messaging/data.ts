
import { Contact, Conversation, Message } from "./types";

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Marie Durand",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    status: "online",
    unreadCount: 3
  },
  {
    id: "2",
    name: "Jean Dupont",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
    status: "online",
    lastSeen: "Il y a 5 min"
  },
  {
    id: "3",
    name: "Sophie Martin",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    status: "offline",
    lastSeen: "Il y a 2 heures"
  },
  {
    id: "4",
    name: "Groupe StreamX",
    avatar: "https://images.unsplash.com/photo-1547516508-0c4014b127af?w=400",
    status: "online",
    unreadCount: 5
  },
  {
    id: "5",
    name: "Alain Bernard",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    status: "away",
    lastSeen: "Hier"
  }
];

export const messages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      receiverId: "current-user",
      content: "Salut ! Comment vas-tu aujourd'hui ?",
      timestamp: "10:24",
      status: "read",
      isOwn: false
    },
    {
      id: "m2",
      senderId: "current-user",
      receiverId: "1",
      content: "Très bien, merci ! Et toi ?",
      timestamp: "10:25",
      status: "delivered",
      isOwn: true
    },
    {
      id: "m3",
      senderId: "1",
      receiverId: "current-user",
      content: "Super ! Tu as regardé la nouvelle série sur StreamX ?",
      timestamp: "10:26",
      status: "read",
      isOwn: false
    },
    {
      id: "m4",
      senderId: "current-user",
      receiverId: "1",
      content: "Pas encore, elle est bien ?",
      timestamp: "10:28",
      status: "delivered",
      isOwn: true
    },
    {
      id: "m5",
      senderId: "1",
      receiverId: "current-user",
      content: "Excellente ! Tu devrais vraiment la regarder ce weekend.",
      timestamp: "10:30",
      status: "sent",
      isOwn: false
    }
  ],
  "2": [
    {
      id: "m6",
      senderId: "2",
      receiverId: "current-user",
      content: "Bonjour, as-tu vu les dernières actualités ?",
      timestamp: "Hier",
      status: "read",
      isOwn: false
    },
    {
      id: "m7",
      senderId: "current-user",
      receiverId: "2",
      content: "Pas encore, quoi de neuf ?",
      timestamp: "Hier",
      status: "read",
      isOwn: true
    }
  ],
  "4": [
    {
      id: "m8",
      senderId: "3",
      receiverId: "group",
      content: "Bienvenue tout le monde dans le groupe StreamX !",
      timestamp: "Lun",
      status: "read",
      isOwn: false
    },
    {
      id: "m9",
      senderId: "1",
      receiverId: "group",
      content: "Merci pour l'invitation !",
      timestamp: "Lun",
      status: "read",
      isOwn: false
    },
    {
      id: "m10",
      senderId: "current-user",
      receiverId: "group",
      content: "Super groupe ! Hâte de discuter avec vous tous.",
      timestamp: "Lun",
      status: "read",
      isOwn: true
    },
    {
      id: "m11",
      senderId: "2",
      receiverId: "group",
      content: "Quelqu'un a des recommandations de films pour ce weekend ?",
      timestamp: "Aujourd'hui",
      status: "delivered",
      isOwn: false
    }
  ]
};

export const conversations: Conversation[] = contacts.map(contact => {
  const contactMessages = messages[contact.id] || [];
  return {
    id: `conv-${contact.id}`,
    contactId: contact.id,
    messages: contactMessages,
    lastMessage: contactMessages.length > 0 
      ? contactMessages[contactMessages.length - 1] 
      : undefined
  };
});
