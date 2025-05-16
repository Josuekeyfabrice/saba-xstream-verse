
import React from 'react';
import { Contact } from './types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface ContactItemProps {
  contact: Contact;
  isActive: boolean;
  onClick: () => void;
  lastMessage?: string;
  lastMessageTime?: string;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  isActive,
  onClick,
  lastMessage,
  lastMessageTime
}) => {
  return (
    <div 
      className={cn(
        "flex items-center p-3 cursor-pointer border-b border-gray-700 hover:bg-stream-darker/60 transition-colors",
        isActive && "bg-stream-darker"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span 
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 border-2 border-stream-dark rounded-full",
            contact.status === "online" ? "bg-green-500" : 
            contact.status === "away" ? "bg-yellow-500" : "bg-gray-500"
          )}
        />
      </div>
      
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">{contact.name}</h3>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {lastMessageTime || contact.lastSeen}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400 truncate">
            {lastMessage || "Démarrer une conversation..."}
          </p>
          
          {contact.unreadCount && contact.unreadCount > 0 ? (
            <span className="bg-stream-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {contact.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
