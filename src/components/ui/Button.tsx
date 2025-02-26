import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'special';
  className?: string;
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'default', 
  className, 
  children, 
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={cn(
        'btn1',
        variant === 'special' && 'btnspecial2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;