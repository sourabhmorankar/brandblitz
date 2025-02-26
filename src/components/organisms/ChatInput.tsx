'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button';
import { 
  PaperclipIcon, 
  Send, 
  SmileIcon, 
  MicIcon, 
  ImageIcon,
  FileIcon,
  XIcon
} from 'lucide-react';

export interface ChatInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Function to send message */
  onSendMessage: (content: string, attachments?: File[]) => void;
  /** Is the message currently sending */
  isSending?: boolean;
  /** Enable file attachments */
  enableAttachments?: boolean;
  /** Max number of attachments */
  maxAttachments?: number;
  /** Allowed file types */
  allowedFileTypes?: string;
  /** Max file size in MB */
  maxFileSize?: number;
  /** Additional CSS class */
  className?: string;
  /** Show AI assistant typing indicator */
  showAITyping?: boolean;
}

/**
 * Chat input component with attachments and emoji support
 */
const ChatInput = ({
  placeholder = 'Type a message...',
  onSendMessage,
  isSending = false,
  enableAttachments = true,
  maxAttachments = 5,
  allowedFileTypes = 'image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
  maxFileSize = 10, // 10MB
  className,
  showAITyping = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message]);
  
  // Handle send message
  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage('');
      setAttachments([]);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'inherit';
      }
    }
  };
  
  // Handle key press (Enter to send, Shift+Enter for new line)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Convert FileList to array
    const fileArray = Array.from(files);
    
    // Check file size
    const oversizedFiles = fileArray.filter(file => file.size > maxFileSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Files exceeding ${maxFileSize}MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    // Check max attachments
    if (attachments.length + fileArray.length > maxAttachments) {
      alert(`You can attach a maximum of ${maxAttachments} files`);
      return;
    }
    
    // Add files to attachments
    setAttachments(prev => [...prev, ...fileArray]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Remove an attachment
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  // Get file icon
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon size={16} />;
    return <FileIcon size={16} />;
  };
  
  // Get file preview
  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      return (
        <div className="relative">
          <div className="w-16 h-16 relative rounded-md overflow-hidden">
            <Image 
              src={url} 
              alt={file.name} 
              className="object-cover" 
              fill
              sizes="64px"
              onLoadingComplete={() => URL.revokeObjectURL(url)}
            />
          </div>
          <button
            onClick={() => removeAttachment(attachments.indexOf(file))}
            className="absolute -top-2 -right-2 bg-background rounded-full p-1"
            aria-label="Remove attachment"
          >
            <XIcon size={14} />
          </button>
        </div>
      );
    }
    
    return (
      <div className="relative flex items-center bg-white/5 p-2 rounded-md">
        {getFileIcon(file)}
        <span className="ml-2 text-xs truncate max-w-[80px]">{file.name}</span>
        <button
          onClick={() => removeAttachment(attachments.indexOf(file))}
          className="ml-2 bg-background rounded-full p-1"
          aria-label="Remove attachment"
        >
          <XIcon size={14} />
        </button>
      </div>
    );
  };
  
  return (
    <div className={cn(
      'bg-background/80 border-t border-white/10 p-4',
      className
    )}>
      {/* AI Typing Indicator */}
      {showAITyping && (
        <div className="mb-2 flex items-center text-white/70 text-sm">
          <div className="flex space-x-1 mr-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0ms]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
          Blaze AI is typing...
        </div>
      )}
      
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 pb-2 border-b border-white/10">
          {attachments.map((file, index) => (
            <div key={`${file.name}-${index}`}>
              {getFilePreview(file)}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        {enableAttachments && (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full"
              onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
              aria-label="Add attachment"
            >
              <PaperclipIcon size={20} />
            </Button>
            
            {/* Attachment Menu */}
            {isAttachmentMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 bg-background border border-white/10 rounded-md p-2 shadow-lg">
                <div className="flex flex-col gap-2">
                  <button
                    className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-md"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setIsAttachmentMenuOpen(false);
                    }}
                  >
                    <ImageIcon size={16} />
                    <span className="text-sm">Upload Image</span>
                  </button>
                  <button
                    className="flex items-center gap-2 hover:bg-white/5 p-2 rounded-md"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setIsAttachmentMenuOpen(false);
                    }}
                  >
                    <FileIcon size={16} />
                    <span className="text-sm">Upload File</span>
                  </button>
                </div>
              </div>
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept={allowedFileTypes}
              className="hidden"
              aria-label="File upload"
            />
          </div>
        )}
        
        {/* Emoji Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 rounded-full"
          aria-label="Add emoji"
        >
          <SmileIcon size={20} />
        </Button>
        
        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            className="w-full bg-white/5 text-white rounded-md border border-white/10 p-2 pr-10 min-h-[40px] max-h-[200px] resize-none focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-white/30"
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          
          {/* Voice Input */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 bottom-2 h-6 w-6 p-0 rounded-full opacity-70 hover:opacity-100"
            aria-label="Voice input"
          >
            <MicIcon size={16} />
          </Button>
        </div>
        
        {/* Send Button */}
        <Button
          variant={message.trim() || attachments.length > 0 ? 'primary' : 'ghost'}
          size="sm"
          className="h-9 w-9 p-0 rounded-full"
          onClick={handleSendMessage}
          disabled={isSending || (!message.trim() && attachments.length === 0)}
          aria-label="Send message"
        >
          <Send size={20} />
        </Button>
      </div>
      
      {/* Helper text */}
      <div className="mt-2 text-xs text-white/40 text-center">
        Press <kbd className="px-1 py-0.5 bg-white/10 rounded-md mx-1">Shift</kbd> + <kbd className="px-1 py-0.5 bg-white/10 rounded-md mx-1">Enter</kbd> for a new line
      </div>
    </div>
  );
};

export default ChatInput;