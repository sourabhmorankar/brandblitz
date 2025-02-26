'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface TagProps {
  /** Tag label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  /** Size of the tag */
  size?: 'sm' | 'md' | 'lg';
  /** Makes tag rounded pill style */
  rounded?: boolean;
  /** Allow tag to be removed */
  removable?: boolean;
  /** Handler for remove click */
  onRemove?: () => void;
  /** Handler for tag click */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Whether the tag is disabled */
  disabled?: boolean;
}

/**
 * Tag component for displaying categories, statuses, or labels
 */
const Tag = ({
  label,
  icon,
  variant = 'default',
  size = 'md',
  rounded = false,
  removable = false,
  onRemove,
  onClick,
  className,
  disabled = false,
}: TagProps) => {
  const baseStyles = "inline-flex items-center font-medium";
  
  const variantStyles = {
    default: "bg-white/10 text-white",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    tertiary: "bg-tertiary/10 text-tertiary",
    success: "bg-green-500/10 text-green-500",
    warning: "bg-yellow-500/10 text-yellow-500",
    danger: "bg-red-500/10 text-red-500", 
    info: "bg-blue-500/10 text-blue-500",
  };
  
  const sizeStyles = {
    sm: "text-xs px-1.5 py-0.5 gap-1",
    md: "text-xs px-2 py-1 gap-1.5",
    lg: "text-sm px-2.5 py-1 gap-2",
  };
  
  const roundedStyles = rounded ? "rounded-full" : "rounded-md";
  const clickableStyles = onClick && !disabled ? "cursor-pointer hover:opacity-80" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  // Handle tag click
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };
  
  // Handle remove button click
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove && !disabled) {
      onRemove();
    }
  };
  
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        roundedStyles,
        clickableStyles,
        disabledStyles,
        "border border-current border-opacity-20",
        className
      )}
      onClick={handleClick}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          className={cn(
            "flex-shrink-0 hover:bg-white/10 rounded-full",
            size === 'sm' ? 'p-0.5' : 'p-1',
            disabled && "pointer-events-none"
          )}
          disabled={disabled}
          aria-label={`Remove ${label}`}
        >
          <X size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
        </button>
      )}
    </div>
  );
};

export default Tag;