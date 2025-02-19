'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { rtdb, db } from '@/firebase';
import { ref, onValue, push } from 'firebase/database';
import { doc, onSnapshot, collection, QuerySnapshot, DocumentSnapshot } from 'firebase/firestore';
import { ChatMessage, DesignRequest } from '@/types/index';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import InputBox from '@/components/InputBox';
import Message from '@/components/Message';

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<Record<string, { displayName: string }>>({});
  const [request, setRequest] = useState<DesignRequest | null>(null);
  const params = useParams();
  const requestId = typeof params?.requestId === 'string' ? params.requestId : 'default';

  useEffect(() => {
    if (!user || !requestId) return;

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

    const requestRef = doc(db, 'requests', requestId);
    const unsubscribeRequest = onSnapshot(requestRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setRequest({ id: snapshot.id, ...data } as DesignRequest);
      }
    });

    const usersRef = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot: QuerySnapshot) => {
      const userMap: Record<string, { displayName: string }> = {};
      snapshot.forEach((doc: DocumentSnapshot) => {
        userMap[doc.id] = { displayName: doc.data()?.displayName || 'Unknown' };
      });
      setUsers(userMap);
    });

    return () => {
      unsubscribeMessages();
      unsubscribeRequest();
      unsubscribeUsers();
    };
  }, [user, requestId]);

  const sendMessage = (text: string) => {
    if (!user || !text.trim() || !requestId) return;

    const messagesRef = ref(rtdb, `chats/${requestId}`);
    push(messagesRef, {
      text,
      senderId: user.uid,
      timestamp: Date.now(),
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="card text-center">
          <p className="text-gray-400 mb-4">Please log in to access the chat.</p>
          <Link href="/auth" className="btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex">
        <section className="flex-1 flex flex-col">
          <header className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
            <h1 className="text-xl font-medium text-white">Chat for Request #{requestId.slice(0, 8)}...</h1>
            <Link href="/" className="btn-secondary text-sm px-3 py-1">Back to Home</Link>
          </header>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-950">
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
        </section>
        <aside className="w-80 bg-gray-900 p-6 border-l border-gray-800 hidden md:block">
          <h2 className="text-lg font-medium text-gray-200 mb-4">Request Details</h2>
          {request ? (
            <div className="space-y-2 text-gray-400">
              <p><strong>ID:</strong> {request.id}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Client:</strong> {users[user.uid]?.displayName || user.email}</p>
              <p><strong>Brief:</strong> {request.brief}</p>
            </div>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ChatPage;