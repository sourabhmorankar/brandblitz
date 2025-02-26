import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Optional label for the checkbox */
  label?: string;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Indeterminate state */
  isIndeterminate?: boolean;
  /** Error state */
  isError?: boolean;
  /** Custom check icon */
  checkIcon?: React.ReactNode;
  /** Container style for wrapping the checkbox and label */
  containerClassName?: string;
  /** Class for the checkbox input */
  checkboxClassName?: string;
  /** Class for the label */
  labelClassName?: string;
}

/**
 * Checkbox component for boolean selections
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  size = 'md',
  isIndeterminate = false,
  isError = false,
  checkIcon,
  checked,
  containerClassName,
  checkboxClassName,
  labelClassName,
  disabled,
  ...props
}, ref) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  
  // Merge our internal ref with the forwarded ref
  React.useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);
  
  // Handle indeterminate state
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);
  
  // Size styles
  const sizeStyles = {
    sm: {
      container: "h-4 w-4",
      icon: "h-3 w-3"
    },
    md: {
      container: "h-5 w-5",
      icon: "h-3.5 w-3.5"
    },
    lg: {
      container: "h-6 w-6",
      icon: "h-4 w-4"
    }
  };
  
  return (
    <div className={cn("flex items-center", containerClassName)}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={checked}
          disabled={disabled}
          className={cn(
            "peer appearance-none",
            sizeStyles[size].container,
            "rounded border border-white/20 bg-transparent",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1 focus:ring-offset-background",
            isError && "border-red-500",
            disabled && "opacity-50 cursor-not-allowed",
            checkboxClassName
          )}
          {...props}
        />
        
        <div className={cn(
          "absolute inset-0 flex items-center justify-center text-white",
          "pointer-events-none opacity-0 peer-checked:opacity-100",
          "transition-opacity duration-200"
        )}>
          {checkIcon || <Check className={sizeStyles[size].icon} />}
        </div>
        
        {/* Indeterminate state dash */}
        {isIndeterminate && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={cn(
              "h-[1px] w-2/3 bg-white",
              disabled && "opacity-50"
            )} />
          </div>
        )}
      </div>
      
      {label && (
        <label
          className={cn(
            "ml-2 text-sm text-white",
            disabled && "opacity-50 cursor-not-allowed",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;