
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useMessaging } from './MessagingContext';
import { MessagingPanel } from './MessagingPanel';

export const MessagingModal: React.FC = () => {
  const { isMessagingOpen, toggleMessaging } = useMessaging();
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleMessaging();
      }
    };
    
    if (isMessagingOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMessagingOpen, toggleMessaging]);

  if (!isMessagingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div 
        ref={modalRef}
        className="bg-stream-dark w-full max-w-4xl rounded-lg overflow-hidden shadow-xl transform transition-all animate-fade-in"
      >
        <div className="flex justify-between items-center px-4 py-3 bg-stream-darker border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Messagerie StreamX</h2>
          <button 
            onClick={toggleMessaging}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <MessagingPanel />
      </div>
    </div>
  );
};
