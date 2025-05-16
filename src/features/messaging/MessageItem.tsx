
import React from 'react';
import { Message } from './types';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div 
      className={cn(
        "max-w-[70%] mb-2 group",
        message.isOwn ? "ml-auto" : "mr-auto"
      )}
    >
      <div 
        className={cn(
          "p-3 rounded-lg relative",
          message.isOwn 
            ? "bg-stream-purple text-white rounded-br-none" 
            : "bg-stream-darker text-white rounded-bl-none"
        )}
      >
        <p className="break-words">{message.content}</p>
        <div className="flex justify-end items-center mt-1 gap-1 text-xs opacity-80">
          <span>{message.timestamp}</span>
          {message.isOwn && (
            <span>
              {message.status === "sent" && <Check size={14} />}
              {message.status === "delivered" && (
                <div className="flex">
                  <Check size={14} className="-mr-1" />
                  <Check size={14} />
                </div>
              )}
              {message.status === "read" && (
                <div className="flex text-blue-400">
                  <Check size={14} className="-mr-1" />
                  <Check size={14} />
                </div>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
