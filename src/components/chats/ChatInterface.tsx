'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send, Paperclip, Image as ImageIcon, Smile, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

// Message type
type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'designer';
  timestamp: Date;
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
};

interface ChatInterfaceProps {
  projectId?: string;
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  projectId, // Will be used for data fetching in production
  className 
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock initial message from assistant
  useEffect(() => {
    // Only set initial message if there are no messages yet
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: 'initial-message',
        content: 'Hi there! I\'m Blaze, your AI design assistant. How can I help with your design project today?',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() || attachments.length > 0) {
      // Create user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: inputMessage.trim(),
        sender: 'user',
        timestamp: new Date(),
        attachments: attachments.length > 0 ? attachments.map(file => ({
          type: file.type,
          url: URL.createObjectURL(file),
          name: file.name
        })) : undefined
      };
      
      // Add user message to the chat
      setMessages(prev => [...prev, userMessage]);
      
      // Clear input and attachments
      setInputMessage('');
      setAttachments([]);
      
      // Simulate assistant typing
      setIsTyping(true);
      
      // Simulate response after delay
      setTimeout(() => {
        const responseMessage: Message = {
          id: `assistant-${Date.now()}`,
          content: getAssistantResponse(inputMessage),
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to array and add to attachments
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
      
      // Reset input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove an attachment
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get a simple mock response based on user message
  const getAssistantResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('logo') || lowercaseMessage.includes('brand')) {
      return "I'd be happy to help with your branding project! Could you tell me more about your brand's personality and target audience? This will help us create designs that really resonate with your customers.";
    } else if (lowercaseMessage.includes('website') || lowercaseMessage.includes('web')) {
      return "Website design is one of our specialties! To get started, could you share any websites you like the style of, and tell me about the main purpose of your website?";
    } else if (lowercaseMessage.includes('help') || lowercaseMessage.includes('how')) {
      return "I'm here to help with all your design needs! Just tell me what kind of project you're working on, and I'll guide you through the process. We can create logos, websites, marketing materials, and much more.";
    } else if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('subscription')) {
      return "We offer several subscription tiers starting at $99/month for our Starter plan. Would you like me to explain the different options and what's included in each?";
    } else if (message.trim() === '') {
      return "I notice you've attached some files. Could you provide some context about your project so our designers can better understand what you're looking for?";
    } else {
      return "Thanks for sharing! I'd like to connect you with one of our designers who specializes in this type of project. While we're getting that set up, could you share any specific design preferences or inspiration that would help guide our creative process?";
    }
  };

  // Format timestamp
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex flex-col h-full bg-background/95 border border-white/10 rounded-lg overflow-hidden ${className}`}>
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary/20 via-background to-background">
        <div className="flex items-center">
          <Logo type="icon" className="w-8 h-8 mr-3" />
          <div>
            <h3 className="font-bold text-white">Blaze AI</h3>
            <p className="text-xs text-white/60">Design Assistant</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Online
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender !== 'user' && (
                <div className="flex items-center mb-1 ml-1">
                  <Logo type="icon" className="w-5 h-5 mr-2" />
                  <span className="text-xs text-white/60">
                    {message.sender === 'assistant' ? 'Blaze AI' : 'Designer'}
                  </span>
                </div>
              )}
              
              <div className={`rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : message.sender === 'assistant' 
                    ? 'bg-white/10 text-white rounded-tl-none'
                    : 'bg-secondary/20 text-white rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.attachments.map((attachment, index) => (
                      <div 
                        key={index} 
                        className="relative group"
                      >
                        {attachment.type.startsWith('image/') ? (
                          <div className="w-20 h-20 rounded-md overflow-hidden border border-white/20">
                            <Image 
                              src={attachment.url} 
                              alt={attachment.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center bg-white/10 p-2 rounded-md">
                            <Paperclip size={14} className="mr-1" />
                            <span className="text-xs truncate max-w-[100px]">{attachment.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-xs mt-1 text-white/50 text-right">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
            
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-background font-bold order-1 mr-2">
                {user?.displayName?.charAt(0) || 'U'}
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] order-1">
              <div className="flex items-center mb-1 ml-1">
                <Logo type="icon" className="w-5 h-5 mr-2" />
                <span className="text-xs text-white/60">Blaze AI</span>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 rounded-tl-none inline-flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Scroll anchor */}
        <div ref={messageEndRef} />
      </div>
      
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t border-white/10 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith('image/') ? (
                <div className="relative w-16 h-16 rounded-md overflow-hidden border border-white/20">
                  <Image 
                    src={URL.createObjectURL(file)} 
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeAttachment(index)}
                    className="absolute -top-1 -right-1 bg-background rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center bg-white/10 p-2 rounded-md group-hover:bg-white/20 transition-colors">
                  <Paperclip size={14} className="mr-1" />
                  <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-background">
        <div className="flex items-end space-x-2">
          <div className="flex-1 bg-white/5 rounded-lg border border-white/10 overflow-hidden">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-transparent text-white outline-none resize-none min-h-[40px] max-h-[120px]"
              rows={1}
            />
            
            <div className="flex justify-between items-center px-3 py-2 border-t border-white/10">
              <div className="flex space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-white/60 hover:text-white"
                >
                  <Paperclip size={18} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-white/60 hover:text-white"
                >
                  <ImageIcon size={18} />
                </button>
                
                <button className="text-white/60 hover:text-white">
                  <Smile size={18} />
                </button>
              </div>
              
              <div className="text-xs text-white/40">
                Press Enter to send
              </div>
            </div>
          </div>
          
          <Button
            variant="default"
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              inputMessage.trim() || attachments.length > 0
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-white/10 hover:bg-white/20'
            }`}
            onClick={handleSendMessage}
            aria-label="Send message"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;