'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ChatBubble from '@/components/molecules/ChatBubble';
import Text from '@/components/atoms/Text';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other' | 'ai';
  username?: string;
  avatarUrl?: string;
  timestamp: Date;
  isRead?: boolean;
  isEdited?: boolean;
  isSystem?: boolean;
}

export interface ChatHistoryProps {
  /** Array of messages */
  messages: Message[];
  /** Whether more messages are being loaded */
  isLoadingMore?: boolean;
  /** Whether all messages have been loaded */
  hasMoreMessages?: boolean;
  /** Function to load more messages */
  onLoadMore?: () => void;
  /** Function to handle message actions */
  onMessageAction?: (action: 'reply' | 'delete' | 'edit', messageId: string) => void;
  /** Group messages by sender */
  groupBySender?: boolean;
  /** Show timestamps for every message */
  alwaysShowTimestamp?: boolean;
  /** Show date separators */
  showDateSeparators?: boolean;
  /** Auto scroll to latest message */
  autoScroll?: boolean;
  /** Additional class name */
  className?: string;
  /** Maximum height before scrolling */
  maxHeight?: string | number;
  /** Empty state content */
  emptyState?: React.ReactNode;
}

/**
 * ChatHistory component for displaying a list of chat messages
 */
const ChatHistory = ({
  messages,
  isLoadingMore = false,
  hasMoreMessages = false,
  onLoadMore,
  onMessageAction,
  groupBySender = true,
  alwaysShowTimestamp = false,
  showDateSeparators = true,
  autoScroll = true,
  className,
  maxHeight = '500px',
  emptyState,
}: ChatHistoryProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);
  
  // Load more messages when scrolling to top
  const handleScroll = () => {
    if (!containerRef.current || !onLoadMore || isLoadingMore || !hasMoreMessages) return;
    
    const { scrollTop } = containerRef.current;
    if (scrollTop === 0) {
      // We're at the top, load more messages
      onLoadMore();
    }
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    
    messages.forEach(message => {
      const messageDate = format(message.timestamp, 'yyyy-MM-dd');
      const existingGroup = groups.find(group => group.date === messageDate);
      
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({ date: messageDate, messages: [message] });
      }
    });
    
    return groups;
  };
  
  // Format date for separator
  const formatDateSeparator = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return 'Today';
    } else if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };
  
  // Should show user details (avatar, name) for this message?
  const shouldShowUserDetails = (message: Message, index: number, messages: Message[]) => {
    if (!groupBySender) return true;
    if (index === 0) return true;
    
    const prevMessage = messages[index - 1];
    
    // Show if previous message is from a different sender
    if (prevMessage.sender !== message.sender) return true;
    
    // Show if previous message is from the same sender but a system message
    if (prevMessage.isSystem) return true;
    
    // Show if this message is a system message
    if (message.isSystem) return true;
    
    // Show if messages are more than 5 minutes apart
    const timeDiff = message.timestamp.getTime() - prevMessage.timestamp.getTime();
    if (timeDiff > 5 * 60 * 1000) return true;
    
    return false;
  };
  
  // Should show timestamp for this message?
  const shouldShowTimestamp = (message: Message, index: number, messages: Message[]) => {
    if (alwaysShowTimestamp) return true;
    if (index === messages.length - 1) return true; // Always show for the last message
    
    const nextMessage = messages[index + 1];
    
    // Show if next message is from a different sender
    if (nextMessage.sender !== message.sender) return true;
    
    // Show if messages are more than 5 minutes apart
    const timeDiff = nextMessage.timestamp.getTime() - message.timestamp.getTime();
    if (timeDiff > 5 * 60 * 1000) return true;
    
    return false;
  };
  
  // Render message groups
  const renderMessageGroups = () => {
    if (showDateSeparators) {
      const groups = groupMessagesByDate();
      
      return groups.map(group => (
        <div key={group.date}>
          <div className="flex items-center justify-center my-4">
            <div className="bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full">
              {formatDateSeparator(group.date)}
            </div>
          </div>
          
          {group.messages.map((message, index, messagesArr) => (
            <ChatBubble
              key={message.id}
              content={message.content}
              sender={message.sender}
              avatarSrc={message.avatarUrl}
              username={message.username}
              initials={message.username ? message.username.charAt(0) : undefined}
              timestamp={message.timestamp}
              isSystemMessage={message.isSystem}
              showTimestamp={shouldShowTimestamp(message, index, messagesArr)}
              showUserDetails={shouldShowUserDetails(message, index, messagesArr)}
              onAction={onMessageAction ? (action) => onMessageAction(action, message.id) : undefined}
              messageId={message.id}
              isRead={message.isRead}
              isEdited={message.isEdited}
            />
          ))}
        </div>
      ));
    } else {
      return messages.map((message, index) => (
        <ChatBubble
          key={message.id}
          content={message.content}
          sender={message.sender}
          avatarSrc={message.avatarUrl}
          username={message.username}
          initials={message.username ? message.username.charAt(0) : undefined}
          timestamp={message.timestamp}
          isSystemMessage={message.isSystem}
          showTimestamp={shouldShowTimestamp(message, index, messages)}
          showUserDetails={shouldShowUserDetails(message, index, messages)}
          onAction={onMessageAction ? (action) => onMessageAction(action, message.id) : undefined}
          messageId={message.id}
          isRead={message.isRead}
          isEdited={message.isEdited}
        />
      ));
    }
  };
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col overflow-y-auto px-2",
        className
      )}
      style={{ maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }}
      onScroll={handleScroll}
    >
      {/* Loading more messages indicator */}
      {isLoadingMore && (
        <div className="flex justify-center py-3">
          <Loader2 className="animate-spin text-white/50" />
        </div>
      )}
      
      {/* Empty state */}
      {messages.length === 0 && !isLoadingMore && emptyState ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          {emptyState}
        </div>
      ) : messages.length === 0 && !isLoadingMore ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <Text color="muted">No messages yet</Text>
          <Text size="sm" color="muted">Start a conversation!</Text>
        </div>
      ) : null}
      
      {/* Message list */}
      {messages.length > 0 && renderMessageGroups()}
      
      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatHistory;