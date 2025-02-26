import React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Text content of the label */
  children: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field has an error */
  error?: boolean;
  /** Size of the label */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
  /** Help text to display beside or below the label */
  helpText?: string;
  /** For field ID */
  htmlFor?: string;
}

/**
 * Label component for form fields
 */
const Label = ({
  children,
  required = false,
  disabled = false,
  error = false,
  size = 'md',
  className,
  helpText,
  htmlFor,
  ...props
}: LabelProps) => {
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  return (
    <div className="flex flex-col">
      <label
        htmlFor={htmlFor}
        className={cn(
          "font-medium block",
          sizeStyles[size],
          error ? 'text-red-400' : 'text-white',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      {helpText && (
        <p className={cn(
          "text-white/60",
          size === 'sm' ? 'text-xs' : 'text-xs',
          'mt-1'
        )}>
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Label;