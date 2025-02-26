import React from 'react';
import { cn } from '@/lib/utils';

export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'tertiary' | 'white';
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Text component for displaying text content with consistent styling
 */
const Text = ({
  as: Component = 'p',
  size = 'md',
  weight = 'normal',
  align = 'left',
  color = 'default',
  truncate = false,
  className,
  children,
  ...props
}: TextProps & React.HTMLAttributes<HTMLElement>) => {
  
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };
  
  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const colorStyles = {
    default: 'text-white',
    muted: 'text-white/70',
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    white: 'text-white',
  };
  
  const truncateStyle = truncate ? 'truncate' : '';
  
  return (
    <Component
      className={cn(
        sizeStyles[size],
        weightStyles[weight],
        alignStyles[align],
        colorStyles[color],
        truncateStyle,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;