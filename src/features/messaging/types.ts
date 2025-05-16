
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  isOwn?: boolean;
}

export interface Conversation {
  id: string;
  contactId: string;
  messages: Message[];
  lastMessage?: Message;
}
