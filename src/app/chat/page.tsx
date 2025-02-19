'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { rtdb, db } from '@/firebase';
import { ref, onValue, push } from 'firebase/database';
import { doc, onSnapshot } from 'firebase/firestore';
import Message from '@/components/Message';
import InputBox from '@/components/InputBox';
import { ChatMessage } from '@/types/chat';
import Link from 'next/link';

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<Record<string, { displayName: string }>>({});
  const requestId = 'request123'; // Simulate; will be dynamic later

  useEffect(() => {
    if (!user) return;

    const messagesRef = ref(rtdb, `chats/${requestId}`);
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
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

    const usersRef = doc(db, 'users', 'allUsers');
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setUsers(data as Record<string, { displayName: string }>);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeUsers();
    };
  }, [user, requestId]);

  const sendMessage = (text: string) => {
    if (!user || !text.trim()) return;

    const messagesRef = ref(rtdb, `chats/${requestId}`);
    push(messagesRef, {
      text,
      senderId: user.uid,
      timestamp: Date.now(),
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="card text-center">
          <p className="text-gray-400 mb-4">Please log in to access the chat.</p>
          <Link href="/auth" className="btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-400">Chat for Request #{requestId}</h1>
          <Link href="/" className="btn-secondary">Back to Home</Link>
        </header>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
          {messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              currentUserId={user.uid}
              senderName={users[msg.senderId]?.displayName || 'Unknown'}
            />
          ))}
        </div>
        <InputBox onSend={sendMessage} />
      </div>
      <aside className="w-80 bg-gray-800 p-6 border-l border-gray-700 hidden md:block">
        <h2 className="text-lg font-semibold text-indigo-400 mb-4">Request Details</h2>
        <div className="space-y-2 text-gray-300">
          <p><strong>ID:</strong> {requestId}</p>
          <p><strong>Status:</strong> In Progress</p>
          <p><strong>Client:</strong> {users[user.uid]?.displayName || user.email}</p>
        </div>
      </aside>
    </div>
  );
};

export default ChatPage;