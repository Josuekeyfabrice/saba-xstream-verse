
import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Contact } from './types';
import { MessageItem } from './MessageItem';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Smile, Paperclip, Mic } from 'lucide-react';

interface ConversationViewProps {
  conversation: Conversation;
  contact: Contact;
  onSendMessage: (conversationId: string, content: string) => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  contact,
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(conversation.id, message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-stream-darker">
      {/* Header */}
      <div className="px-4 py-3 flex items-center border-b border-gray-700 bg-stream-dark">
        <Avatar>
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="ml-3">
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-xs text-gray-400">
            {contact.status === "online" ? "En ligne" : 
             contact.status === "away" ? "Absent" : 
             `Dernière connexion ${contact.lastSeen}`}
          </p>
        </div>
      </div>
      
      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#0a0a0a] bg-opacity-50"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3')", backgroundSize: "cover", backgroundBlendMode: "overlay"}}
      >
        {conversation.messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-3 bg-stream-dark border-t border-gray-700 flex items-center gap-2">
        <button type="button" className="text-gray-400 hover:text-stream-purple">
          <Smile size={24} />
        </button>
        <button type="button" className="text-gray-400 hover:text-stream-purple">
          <Paperclip size={24} />
        </button>
        
        <input
          type="text"
          className="flex-1 bg-stream-darker py-2 px-4 rounded-full text-white focus:outline-none focus:ring-1 focus:ring-stream-purple"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        {message.trim() ? (
          <button type="submit" className="text-stream-purple hover:text-stream-purple/80">
            <Send size={24} />
          </button>
        ) : (
          <button type="button" className="text-gray-400 hover:text-stream-purple">
            <Mic size={24} />
          </button>
        )}
      </form>
    </div>
  );
};
