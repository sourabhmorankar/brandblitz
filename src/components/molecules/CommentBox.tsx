'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import { PaperclipIcon, Send, Smile, X } from 'lucide-react';
import Image from 'next/image';

export interface CommentBoxProps {
  /** User avatar URL */
  userAvatarUrl?: string;
  /** User initials (fallback for avatar) */
  userInitials?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Function to handle comment submission */
  onSubmit: (text: string, attachments?: File[]) => void;
  /** Is currently submitting */
  isSubmitting?: boolean;
  /** Allow file attachments */
  allowAttachments?: boolean;
  /** Maximum number of attachments */
  maxAttachments?: number;
  /** Maximum attachment size in MB */
  maxAttachmentSize?: number;
  /** Allowed file types */
  allowedFileTypes?: string;
  /** Show emoji picker */
  showEmojiPicker?: boolean;
  /** Minimum rows for textarea */
  minRows?: number;
  /** Maximum rows before scrolling */
  maxRows?: number;
  /** Additional class name */
  className?: string;
  /** Allow mentions */
  allowMentions?: boolean;
  /** Mention suggestions */
  mentionSuggestions?: { id: string; name: string; avatarUrl?: string }[];
}

/**
 * CommentBox component for entering and submitting comments
 */
const CommentBox = ({
  userAvatarUrl,
  userInitials = '?',
  placeholder = 'Add a comment...',
  onSubmit,
  isSubmitting = false,
  allowAttachments = true,
  maxAttachments = 3,
  maxAttachmentSize = 5, // 5MB
  allowedFileTypes = 'image/*,.pdf,.doc,.docx',
  showEmojiPicker = true,
  minRows = 2,
  maxRows = 6,
  className,
  allowMentions = false,
  mentionSuggestions = [],
}: CommentBoxProps) => {
  const [comment, setComment] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  const [mentionPosition, setMentionPosition] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle comment change and track mentions
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    
    if (allowMentions) {
      const lastAtSymbol = value.lastIndexOf('@');
      if (lastAtSymbol >= 0 && (lastAtSymbol === 0 || value[lastAtSymbol - 1] === ' ')) {
        const mentionText = value.slice(lastAtSymbol + 1);
        const spaceAfterMention = mentionText.indexOf(' ');
        const filterText = spaceAfterMention >= 0 ? mentionText.slice(0, spaceAfterMention) : mentionText;
        
        setMentionFilter(filterText);
        setMentionPosition(lastAtSymbol);
        setShowMentions(true);
      } else {
        setShowMentions(false);
      }
    }
  };
  
  // Handle submit
  const handleSubmit = () => {
    if (comment.trim() || attachments.length > 0) {
      onSubmit(comment.trim(), attachments.length > 0 ? attachments : undefined);
      setComment('');
      setAttachments([]);
    }
  };
  
  // Handle attachment selection
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    
    // Check file sizes
    const oversizedFiles = fileArray.filter(file => file.size > maxAttachmentSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Files exceeding ${maxAttachmentSize}MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    // Check if adding these would exceed max attachments
    if (attachments.length + fileArray.length > maxAttachments) {
      alert(`Maximum of ${maxAttachments} attachments allowed`);
      return;
    }
    
    setAttachments(prev => [...prev, ...fileArray]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle mention selection
  const handleSelectMention = (mention: { id: string; name: string }) => {
    const beforeMention = comment.slice(0, mentionPosition);
    const afterMention = comment.slice(mentionPosition + mentionFilter.length + 1);
    setComment(`${beforeMention}@${mention.name} ${afterMention}`);
    setShowMentions(false);
    
    // Focus textarea and move cursor to end
    if (textareaRef.current) {
      textareaRef.current.focus();
      const newPos = (beforeMention + '@' + mention.name + ' ').length;
      textareaRef.current.selectionStart = newPos;
      textareaRef.current.selectionEnd = newPos;
    }
  };
  
  // Filter mentions based on input
  const filteredMentions = mentionSuggestions.filter(mention => 
    mention.name.toLowerCase().includes(mentionFilter.toLowerCase())
  );
  
  // Remove attachment
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className={cn(
      "bg-white/5 border border-white/10 rounded-md overflow-hidden",
      className
    )}>
      <div className="flex p-2 pb-0">
        <div className="pr-2 pt-1">
          <Avatar
            src={userAvatarUrl}
            initials={userInitials}
            size="sm"
          />
        </div>
        
        <div className="flex-1">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={handleCommentChange}
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent border-0 focus:ring-0 focus:outline-none resize-none",
              "text-white placeholder-white/40 p-2"
            )}
            style={{
              minHeight: `${minRows * 1.5}em`,
              maxHeight: `${maxRows * 1.5}em`
            }}
            rows={minRows}
          />
          
          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {attachments.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type.startsWith('image/') ? (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-white/10">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center bg-white/10 p-2 rounded-md">
                      <PaperclipIcon size={16} className="mr-2" />
                      <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => removeAttachment(index)}
                    className="absolute -top-2 -right-2 bg-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Mention suggestions */}
          {showMentions && filteredMentions.length > 0 && (
            <div className="absolute z-10 bg-background border border-white/10 rounded-md shadow-lg max-h-[200px] overflow-y-auto w-[200px]">
              {filteredMentions.map(mention => (
                <button
                  key={mention.id}
                  className="flex items-center w-full p-2 hover:bg-white/10 text-left"
                  onClick={() => handleSelectMention(mention)}
                >
                  <Avatar
                    src={mention.avatarUrl}
                    initials={mention.name.charAt(0)}
                    size="xs"
                    className="mr-2"
                  />
                  <span className="text-sm">{mention.name}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex justify-between items-center p-2 border-t border-white/10">
            <div className="flex items-center space-x-2">
              {allowAttachments && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-white/60 hover:text-white"
                    disabled={isSubmitting}
                    aria-label="Attach files"
                  >
                    <PaperclipIcon size={18} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAttachmentChange}
                    className="hidden"
                    multiple
                    accept={allowedFileTypes}
                  />
                </>
              )}
              
              {showEmojiPicker && (
                <button
                  type="button"
                  className="text-white/60 hover:text-white"
                  disabled={isSubmitting}
                  aria-label="Add emoji"
                >
                  <Smile size={18} />
                </button>
              )}
            </div>
            
            <Button
              variant={comment.trim() || attachments.length > 0 ? 'primary' : 'ghost'}
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting || (!comment.trim() && attachments.length === 0)}
              isLoading={isSubmitting}
              rightIcon={<Send size={14} />}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;