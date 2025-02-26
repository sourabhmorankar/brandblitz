'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Input, { InputProps } from '@/components/atoms/Input';

export interface FormFieldProps extends Omit<InputProps, 'size'> {
  /** Label text for the input */
  label?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Whether to show success state */
  isSuccess?: boolean;
  /** Whether to make the field required */
  isRequired?: boolean;
  /** Label and helper text positioning */
  labelPosition?: 'top' | 'left';
  /** Container className */
  groupClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Helper text className */
  helperClassName?: string;
  /** Error text className */
  errorClassName?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * FormField component combines a label, input, and helper/error text
 */
const FormField = ({
  label,
  helperText,
  errorMessage,
  isSuccess = false,
  isRequired = false,
  isError = false,
  labelPosition = 'top',
  groupClassName,
  labelClassName,
  helperClassName,
  errorClassName,
  id,
  size = 'md',
  ...props
}: FormFieldProps) => {
  // Generate a random id if none is provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Override isError if there's an error message
  const hasError = isError || !!errorMessage;
  
  const labelStyles = cn(
    'block text-sm font-medium',
    hasError ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-white/80',
    labelClassName
  );
  
  const helperStyles = cn(
    'text-xs mt-1',
    hasError ? 'text-red-400' : isSuccess ? 'text-green-400' : 'text-white/60',
    helperClassName
  );
  
  return (
    <div
      className={cn(
        'w-full',
        labelPosition === 'left' ? 'flex items-center gap-4' : '',
        groupClassName
      )}
    >
      {label && (
        <div className={labelPosition === 'left' ? 'w-1/3' : 'mb-1'}>
          <label htmlFor={inputId} className={labelStyles}>
            {label}
            {isRequired && <span className="text-red-400 ml-1">*</span>}
          </label>
        </div>
      )}
      
      <div className={labelPosition === 'left' ? 'flex-1' : 'w-full'}>
        <Input
          id={inputId}
          inputSize={size}
          isError={hasError}
          isFullWidth
          aria-invalid={hasError}
          aria-describedby={
            helperText ? `${inputId}-helper` : 
            errorMessage ? `${inputId}-error` : undefined
          }
          {...props}
        />
        
        {helperText && !errorMessage && (
          <p id={`${inputId}-helper`} className={helperStyles}>
            {helperText}
          </p>
        )}
        
        {errorMessage && (
          <p
            id={`${inputId}-error`}
            className={cn('text-xs mt-1 text-red-400', errorClassName)}
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormField;