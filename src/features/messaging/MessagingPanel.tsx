
import React from 'react';
import { useMessaging } from './MessagingContext';
import { ContactList } from './ContactList';
import { ConversationView } from './ConversationView';

export const MessagingPanel: React.FC = () => {
  const { 
    contacts, 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    sendMessage
  } = useMessaging();
  
  const activeConversation = conversations.find(
    conv => conv.id === activeConversationId
  );
  
  const activeContact = activeConversation 
    ? contacts.find(contact => contact.id === activeConversation.contactId)
    : null;

  return (
    <div className="flex h-[600px] rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <div className="w-1/3 h-full">
        <ContactList
          contacts={contacts}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectContact={setActiveConversationId}
        />
      </div>
      
      <div className="w-2/3 h-full">
        {activeConversation && activeContact ? (
          <ConversationView
            conversation={activeConversation}
            contact={activeContact}
            onSendMessage={sendMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-stream-darker">
            <div className="text-center text-gray-400">
              <p className="text-xl">Sélectionnez une conversation</p>
              <p className="mt-2">Choisissez un contact pour démarrer ou continuer une conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
