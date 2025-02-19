'use client';

import { ChatMessage } from '@/app/chat/page';

interface MessageProps {
  message: ChatMessage;
  currentUserId: string;
}

const Message = ({ message, currentUserId }: MessageProps) => {
  const isOwnMessage = message.senderId === currentUserId;
  const timestamp = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`mb-4 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isOwnMessage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
        }`}
      >
        <p>{message.text}</p>
        <span className="text-xs text-gray-300">{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;