import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'white';
  /** Speed of animation (in seconds) */
  speed?: number;
  /** Track color */
  trackColor?: string;
  /** Show label text with the spinner */
  label?: string;
  /** Label position relative to spinner */
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Additional class name */
  className?: string;
}

/**
 * Spinner component for loading states
 */
const Spinner = ({
  size = 'md',
  variant = 'primary',
  speed = 0.75,
  trackColor,
  label,
  labelPosition = 'right',
  className,
}: SpinnerProps) => {
  const sizeStyles = {
    xs: 'w-4 h-4 border-[2px]',
    sm: 'w-5 h-5 border-[2px]',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-10 h-10 border-[3px]',
    xl: 'w-12 h-12 border-[4px]',
  };
  
  const variantStyles = {
    primary: 'border-t-primary',
    secondary: 'border-t-secondary',
    tertiary: 'border-t-tertiary',
    white: 'border-t-white',
  };
  
  const fontSizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };
  
  const trackStyles = trackColor 
    ? `border-${trackColor}` 
    : 'border-white/10';
  
  const containerStyles = {
    top: 'flex-col items-center space-y-2',
    right: 'flex-row items-center space-x-2',
    bottom: 'flex-col-reverse items-center space-y-reverse space-y-2',
    left: 'flex-row-reverse items-center space-x-reverse space-x-2',
  };
  
  return (
    <div className={cn(
      "flex",
      containerStyles[labelPosition],
      className
    )}>
      <div
        className={cn(
          "rounded-full border-solid animate-spin",
          sizeStyles[size],
          variantStyles[variant],
          trackStyles
        )}
        style={{ animationDuration: `${speed}s` }}
        role="status"
        aria-label="Loading"
      />
      
      {label && (
        <span className={cn(
          "text-white",
          fontSizes[size]
        )}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Spinner;