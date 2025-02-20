'use client';

import { ChatMessage } from '@/types/index';

interface MessageProps {
  message: ChatMessage;
  currentUserId: string;
  senderName: string;
}

const Message = ({ message, currentUserId, senderName }: MessageProps) => {
  const isOwnMessage = message.senderId === currentUserId;
  const timestamp = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md p-4 rounded-lg ${
          isOwnMessage ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-200'
        }`}
      >
        <p className="text-sm font-medium">{senderName}</p>
        <p>{message.text}</p>
        <span className="text-xs text-gray-400 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;