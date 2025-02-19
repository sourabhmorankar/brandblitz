'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { rtdb, db } from '@/firebase';
import { ref, onValue, push } from 'firebase/database';
import { doc, onSnapshot } from 'firebase/firestore';
import Message from '@/components/Message';
import InputBox from '@/components/InputBox';
import { ChatMessage } from '@/types/chat';

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<Record<string, { displayName: string }>>({});
  const requestId = 'request123'; // Simulate a request ID; replace with dynamic logic later

  // Fetch messages from Real-Time Database
  useEffect(() => {
    if (!user) return;

    const messagesRef = ref(rtdb, `chats/${requestId}`);
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
  }, [user, requestId]);

  // Fetch user names from Firestore
  useEffect(() => {
    if (!user) return;

    const usersRef = doc(db, 'users', 'allUsers'); // Simplified; in production, fetch specific users
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setUsers(data as Record<string, { displayName: string }>);
      }
    });

    return () => unsubscribe();
  }, [user]);

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
      <div className="p-6 text-center">
        <p className="text-gray-400">Please log in to access the chat.</p>
        <a href="/auth" className="text-blue-400 underline">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-gray-800 border-b border-gray-700">
          <h1 className="text-xl font-bold text-indigo-400">Chat for Request #{requestId}</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
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
      <aside className="w-80 bg-gray-800 p-4 border-l border-gray-700">
        <h2 className="text-lg font-semibold text-indigo-400 mb-4">Request Details</h2>
        <p className="text-gray-300">Request ID: {requestId}</p>
        <p className="text-gray-300">Status: In Progress</p>
        <p className="text-gray-300">Client: {users[user.uid]?.displayName || user.email}</p>
      </aside>
    </div>
  );
};

export default ChatPage;