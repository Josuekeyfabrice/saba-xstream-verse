
import React, { useState } from 'react';
import { Contact, Conversation } from './types';
import { ContactItem } from './ContactItem';
import { Search } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectContact: (conversationId: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  conversations,
  activeConversationId,
  onSelectContact
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-stream-dark border-r border-gray-700">
      <div className="p-3 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un contact..."
            className="w-full pl-10 pr-3 py-2 bg-stream-darker text-white rounded-md focus:outline-none focus:ring-1 focus:ring-stream-purple"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map(contact => {
          const conversation = conversations.find(c => c.contactId === contact.id);
          const lastMessage = conversation?.lastMessage?.content;
          const lastMessageTime = conversation?.lastMessage?.timestamp;
          
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              isActive={activeConversationId === conversation?.id}
              onClick={() => conversation && onSelectContact(conversation.id)}
              lastMessage={lastMessage}
              lastMessageTime={lastMessageTime}
            />
          );
        })}
      </div>
    </div>
  );
};
