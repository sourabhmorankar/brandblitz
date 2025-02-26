import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Thickness of the divider */
  thickness?: 'thin' | 'medium' | 'thick';
  /** Color variant of the divider */
  variant?: 'default' | 'subtle' | 'primary' | 'secondary' | 'tertiary';
  /** Whether to add margin */
  withMargin?: boolean;
  /** Text label to display in the middle of the divider */
  label?: string;
  /** Label position */
  labelPosition?: 'start' | 'center' | 'end';
  /** Additional class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

/**
 * Divider component for visual separation
 */
const Divider = ({
  orientation = 'horizontal',
  thickness = 'thin',
  variant = 'default',
  withMargin = true,
  label,
  labelPosition = 'center',
  className,
  style,
}: DividerProps) => {
  const thicknessStyles = {
    horizontal: {
      thin: 'h-px',
      medium: 'h-0.5',
      thick: 'h-1',
    },
    vertical: {
      thin: 'w-px',
      medium: 'w-0.5',
      thick: 'w-1',
    },
  };
  
  const variantStyles = {
    default: 'bg-white/10',
    subtle: 'bg-white/5',
    primary: 'bg-primary/20',
    secondary: 'bg-secondary/20',
    tertiary: 'bg-tertiary/20',
  };
  
  const marginStyles = {
    horizontal: withMargin ? 'my-4' : '',
    vertical: withMargin ? 'mx-4' : '',
  };
  
  const labelPositionStyles = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };
  
  if (label && orientation === 'horizontal') {
    return (
      <div 
        className={cn(
          "flex items-center w-full",
          marginStyles[orientation],
          labelPositionStyles[labelPosition],
          className
        )}
        style={style}
      >
        <div className={cn(
          "flex-grow",
          thicknessStyles[orientation][thickness],
          variantStyles[variant]
        )} />
        
        <span className="px-2 text-sm text-white/60">
          {label}
        </span>
        
        <div className={cn(
          "flex-grow",
          thicknessStyles[orientation][thickness],
          variantStyles[variant]
        )} />
      </div>
    );
  }
  
  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'w-full' : 'h-full',
        thicknessStyles[orientation][thickness],
        variantStyles[variant],
        marginStyles[orientation],
        className
      )}
      style={style}
    />
  );
};

export default Divider;