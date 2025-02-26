'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input variant */
  variant?: 'default' | 'filled' | 'outlined';
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Left side icon */
  leftIcon?: React.ReactNode;
  /** Right side icon */
  rightIcon?: React.ReactNode;
  /** Is the input in error state */
  isError?: boolean;
  /** Is the input disabled */
  isDisabled?: boolean;
  /** Full width of parent container */
  isFullWidth?: boolean;
  /** Container class name */
  containerClassName?: string;
}

/**
 * Input component for collecting user data
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  inputSize = 'md',
  leftIcon,
  rightIcon,
  isError = false,
  isDisabled = false,
  isFullWidth = false,
  className,
  containerClassName,
  type = 'text',
  ...props
}, ref) => {
  const baseStyles = "flex bg-background text-white focus:ring-2 focus:outline-none placeholder:text-white/30";
  
  const variantStyles = {
    default: "border border-white/20 focus:border-primary focus:ring-primary/20",
    filled: "bg-white/10 border-transparent focus:bg-white/15 focus:border-transparent focus:ring-primary/20",
    outlined: "bg-transparent border border-white/20 focus:border-primary focus:ring-primary/20",
  };
  
  const sizeStyles = {
    sm: "h-8 text-xs rounded-md",
    md: "h-10 text-sm rounded-md",
    lg: "h-12 text-base rounded-md",
  };
  
  const paddingStyles = {
    sm: leftIcon ? "pl-8" : "px-3", 
    md: leftIcon ? "pl-10" : "px-4",
    lg: leftIcon ? "pl-12" : "px-5",
  };
  
  const errorStyles = isError 
    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
    : "";
  
  const disabledStyles = isDisabled 
    ? "opacity-50 cursor-not-allowed bg-white/5" 
    : "";
  
  const widthStyle = isFullWidth ? "w-full" : "";
  
  return (
    <div className={cn("relative inline-block", widthStyle, containerClassName)}>
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/50">
          {leftIcon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[inputSize],
          paddingStyles[inputSize],
          errorStyles,
          disabledStyles,
          widthStyle,
          rightIcon && "pr-10",
          className
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white/50">
          {rightIcon}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;