'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, X, Loader2 } from 'lucide-react';
import Input from '@/components/atoms/Input';

export interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Initial value */
  initialValue?: string;
  /** Search handler */
  onSearch?: (value: string) => void;
  /** Search handler triggered on each change */
  onSearchChange?: (value: string) => void;
  /** Minimum characters before triggering search */
  minChars?: number;
  /** Delay in ms before triggering search */
  debounceTime?: number;
  /** Show clear button */
  showClear?: boolean;
  /** Additional classes */
  className?: string;
  /** Is currently loading results */
  isLoading?: boolean;
  /** Size of search bar */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'filled' | 'outlined';
  /** Full width */
  fullWidth?: boolean;
}

/**
 * SearchBar component for search functionality
 */
const SearchBar = ({
  placeholder = 'Search...',
  initialValue = '',
  onSearch,
  onSearchChange,
  minChars = 2,
  debounceTime = 300,
  showClear = true,
  className,
  isLoading = false,
  size = 'md',
  variant = 'filled',
  fullWidth = false,
}: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // If search on change is enabled, trigger immediately
    if (onSearchChange && newValue.length >= minChars) {
      onSearchChange(newValue);
    }
    
    // Debounce the main search handler
    if (onSearch) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      if (newValue.length >= minChars) {
        timerRef.current = setTimeout(() => {
          onSearch(newValue);
        }, debounceTime);
      }
    }
  };
  
  // Handle clear button
  const handleClear = () => {
    setValue('');
    if (onSearch) onSearch('');
    if (onSearchChange) onSearchChange('');
  };
  
  // Handle key press (Enter)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && value.length >= minChars) {
      if (timerRef.current) clearTimeout(timerRef.current);
      onSearch(value);
    }
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  
  return (
    <div
      className={cn(
        "relative",
        fullWidth && "w-full",
        className
      )}
    >
      <Input
        inputSize={size}
        variant={variant}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isFullWidth={fullWidth}
        leftIcon={
          isLoading ? (
            <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="animate-spin text-white/50" />
          ) : (
            <Search size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="text-white/50" />
          )
        }
        rightIcon={
          showClear && value ? (
            <X
              size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
              className="cursor-pointer text-white/50 hover:text-white"
              onClick={handleClear}
            />
          ) : null
        }
        containerClassName={cn(
          "transition-all",
          isFocused && "shadow-sm shadow-primary/20"
        )}
      />
    </div>
  );
};

export default SearchBar;