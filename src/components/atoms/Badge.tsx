import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Badge variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the badge is rounded pill */
  rounded?: boolean;
  /** Additional class name */
  className?: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether to show leading icon (true) or trailing icon (false) */
  iconLeading?: boolean;
  /** Makes badge take full width of container */
  fullWidth?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Badge component for displaying status, tags, or counts
 */
const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className,
  icon,
  iconLeading = true,
  fullWidth = false,
  onClick,
}: BadgeProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium";
  
  const variantStyles = {
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    tertiary: "bg-tertiary/10 text-tertiary border border-tertiary/20",
    success: "bg-green-500/10 text-green-500 border border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    outline: "bg-transparent text-white border border-white/20",
  };
  
  const sizeStyles = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-2.5 py-1.5",
  };
  
  const roundedStyles = rounded ? "rounded-full" : "rounded-md";
  const widthStyles = fullWidth ? "w-full" : "";
  const cursorStyles = onClick ? "cursor-pointer hover:opacity-80" : "";
  
  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        roundedStyles,
        widthStyles,
        cursorStyles,
        className
      )}
      onClick={onClick}
    >
      {icon && iconLeading && <span className="mr-1">{icon}</span>}
      {children}
      {icon && !iconLeading && <span className="ml-1">{icon}</span>}
    </span>
  );
};

export default Badge;