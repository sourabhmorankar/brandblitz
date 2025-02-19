'use client';

import { ChatMessage } from '@/types/chat';

interface MessageProps {
  message: ChatMessage;
  currentUserId: string;
  senderName: string;
}

const Message = ({ message, currentUserId, senderName }: MessageProps) => {
  const isOwnMessage = message.senderId === currentUserId;
  const timestamp = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`mb-4 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isOwnMessage ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white'
        }`}
      >
        <p className="text-sm font-medium">{senderName}</p>
        <p>{message.text}</p>
        <span className="text-xs text-gray-300">{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;