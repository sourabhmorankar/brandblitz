'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { rtdb } from '@/firebase';
import { ref, onValue, push } from 'firebase/database';
import Message from '@/components/Message';
import InputBox from '@/components/InputBox';
import { ChatMessage } from '@/types/chat';

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!user) return;

    const messagesRef = ref(rtdb, 'chats/general');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, msg]) => ({
          id,
          text: (msg as ChatMessage).text,
          senderId: (msg as ChatMessage).senderId,
          timestamp: (msg as ChatMessage).timestamp,
        }));
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const sendMessage = (text: string) => {
    if (!user || !text.trim()) return;

    const messagesRef = ref(rtdb, 'chats/general');
    push(messagesRef, {
      text,
      senderId: user.uid,
      timestamp: Date.now(),
    });
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>Please log in to access the chat.</p>
        <a href="/auth" className="text-blue-400 underline">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="p-4 bg-gray-800">
        <h1 className="text-xl font-bold">BrandBlitz Chat</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} currentUserId={user.uid} />
        ))}
      </div>
      <InputBox onSend={sendMessage} />
    </div>
  );
};

export default ChatPage;