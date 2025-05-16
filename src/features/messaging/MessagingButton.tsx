
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useMessaging } from './MessagingContext';
import { cn } from '@/lib/utils';

export const MessagingButton: React.FC = () => {
  const { toggleMessaging, isMessagingOpen, contacts } = useMessaging();
  
  const totalUnread = contacts.reduce((acc, contact) => acc + (contact.unreadCount || 0), 0);
  
  return (
    <button
      onClick={toggleMessaging}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110",
        isMessagingOpen ? "bg-red-500 hover:bg-red-600" : "bg-stream-purple hover:bg-stream-purple/90"
      )}
    >
      <MessageCircle size={24} className="text-white" />
      
      {totalUnread > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-red-500">
          {totalUnread}
        </Badge>
      )}
    </button>
  );
};
