import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Optional label */
  label?: string;
  /** Switch size */
  size?: 'sm' | 'md' | 'lg';
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Container class name */
  containerClassName?: string;
  /** Switch class name */
  switchClassName?: string;
  /** Label class name */
  labelClassName?: string;
  /** Helper text */
  helperText?: string;
}

/**
 * Switch component for toggling between two states
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  size = 'md',
  variant = 'primary',
  labelPosition = 'right',
  checked = false,
  disabled = false,
  containerClassName,
  switchClassName,
  labelClassName,
  helperText,
  ...props
}, ref) => {
  
  // Switch track and thumb sizes
  const sizeStyles = {
    sm: {
      track: "w-8 h-4",
      thumb: "w-3 h-3",
      shift: "translate-x-4",
      label: "text-xs"
    },
    md: {
      track: "w-10 h-5",
      thumb: "w-4 h-4",
      shift: "translate-x-5",
      label: "text-sm"
    },
    lg: {
      track: "w-12 h-6",
      thumb: "w-5 h-5",
      shift: "translate-x-6",
      label: "text-base"
    }
  };
  
  // Variant colors
  const variantStyles = {
    primary: "peer-checked:bg-primary peer-focus:ring-primary/20",
    secondary: "peer-checked:bg-secondary peer-focus:ring-secondary/20",
    tertiary: "peer-checked:bg-tertiary peer-focus:ring-tertiary/20"
  };
  
  return (
    <div className={cn(
      "flex items-center",
      labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
      containerClassName
    )}>
      {/* The actual checkbox input (visually hidden) */}
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        
        {/* Track */}
        <div className={cn(
          "rounded-full transition-colors",
          sizeStyles[size].track,
          "bg-white/10 peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-offset-background",
          variantStyles[variant],
          disabled && "opacity-50 cursor-not-allowed",
          switchClassName
        )} />
        
        {/* Thumb */}
        <div className={cn(
          "absolute top-1/2 left-1 -translate-y-1/2 rounded-full bg-white transition-transform",
          sizeStyles[size].thumb,
          "peer-checked:" + sizeStyles[size].shift,
          disabled && "opacity-50"
        )} />
      </div>
      
      {/* Label */}
      {label && (
        <label className={cn(
          sizeStyles[size].label,
          "text-white",
          labelPosition === 'left' ? 'mr-2' : 'ml-2',
          disabled && "opacity-50 cursor-not-allowed",
          labelClassName
        )}>
          {label}
        </label>
      )}
      
      {/* Helper text */}
      {helperText && (
        <span className="text-xs text-white/60 ml-2">
          {helperText}
        </span>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

export default Switch;