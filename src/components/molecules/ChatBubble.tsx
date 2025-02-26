import React from 'react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import { formatDistanceToNow } from 'date-fns';

export interface ChatBubbleProps {
  /** Message content */
  content: string;
  /** Message sender (current user or others) */
  sender: 'user' | 'other' | 'ai';
  /** Avatar source URL */
  avatarSrc?: string;
  /** Sender username */
  username?: string;
  /** Sender initials for avatar fallback */
  initials?: string;
  /** Timestamp of the message */
  timestamp?: Date;
  /** Whether the message is a system message */
  isSystemMessage?: boolean;
  /** Whether to show the timestamp */
  showTimestamp?: boolean;
  /** Whether to show user details (avatar, username) */
  showUserDetails?: boolean;
  /** Function to handle message actions (reply, delete, etc.) */
  onAction?: (action: 'reply' | 'delete' | 'edit', messageId?: string) => void;
  /** Message ID for action handlers */
  messageId?: string;
  /** Whether the message has been read */
  isRead?: boolean;
  /** Whether the message has been edited */
  isEdited?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * ChatBubble component displays a single message in a chat conversation
 */
const ChatBubble = ({
  content,
  sender,
  avatarSrc,
  username,
  initials = '?',
  timestamp,
  isSystemMessage = false,
  showTimestamp = true,
  showUserDetails = true,
  onAction,
  messageId,
  isRead = true,
  isEdited = false,
  className,
}: ChatBubbleProps) => {
  const isCurrentUser = sender === 'user';
  const isAI = sender === 'ai';
  
  const bubbleStyles = cn(
    'p-3 max-w-[80%] rounded-md shadow-sm',
    isSystemMessage 
      ? 'bg-background/60 border border-white/10 text-center mx-auto w-full max-w-md text-white/70 text-xs'
      : isCurrentUser
        ? 'bg-primary text-white ml-auto rounded-tr-none'
        : isAI
          ? 'bg-secondary text-background rounded-tl-none'
          : 'bg-white/10 text-white rounded-tl-none',
    className
  );
  
  return (
    <div className={cn(
      'mb-4',
      isSystemMessage ? 'px-4' : 'px-2',
    )}>
      {/* Message with avatar */}
      <div className={cn(
        'flex',
        isCurrentUser ? 'flex-row-reverse' : 'flex-row',
        isSystemMessage && 'justify-center'
      )}>
        {/* Avatar section */}
        {showUserDetails && !isSystemMessage && (
          <div className={cn(
            'flex flex-col items-center',
            isCurrentUser ? 'ml-2' : 'mr-2'
          )}>
            <Avatar 
              src={avatarSrc} 
              initials={initials} 
              size="sm" 
              status={isAI ? 'online' : undefined}
            />
          </div>
        )}
        
        {/* Message content */}
        <div className="flex flex-col">
          {/* Username */}
          {showUserDetails && username && !isSystemMessage && (
            <Text 
              size="xs" 
              weight="medium" 
              color="muted" 
              className={cn(
                'mb-1',
                isCurrentUser ? 'text-right' : 'text-left'
              )}
            >
              {username}
            </Text>
          )}
          
          {/* Message bubble */}
          <div className={bubbleStyles}>
            <div className="break-words whitespace-pre-wrap">{content}</div>
          </div>
          
          {/* Timestamp and status */}
          {showTimestamp && timestamp && (
            <div className={cn(
              'flex mt-1 text-xs text-white/50',
              isCurrentUser ? 'justify-end' : 'justify-start'
            )}>
              {timestamp && (
                <span className="text-xs">
                  {formatDistanceToNow(timestamp, { addSuffix: true })}
                </span>
              )}
              
              {isEdited && (
                <span className="ml-1">(edited)</span>
              )}
              
              {isCurrentUser && (
                <span className="ml-1">
                  {isRead ? '✓✓' : '✓'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons (reply, edit, delete) */}
      {onAction && !isSystemMessage && (
        <div className={cn(
          'flex gap-2 mt-1 opacity-0 hover:opacity-100 transition-opacity',
          isCurrentUser ? 'justify-end' : 'justify-start'
        )}>
          <button 
            onClick={() => onAction('reply', messageId)}
            className="text-xs text-white/50 hover:text-white/80"
          >
            Reply
          </button>
          
          {isCurrentUser && (
            <>
              <button 
                onClick={() => onAction('edit', messageId)}
                className="text-xs text-white/50 hover:text-white/80"
              >
                Edit
              </button>
              <button 
                onClick={() => onAction('delete', messageId)}
                className="text-xs text-white/50 hover:text-red-400"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;