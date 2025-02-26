import React from 'react';
import { cn } from '@/lib/utils';
import Icon, { IconName } from '@/components/atoms/Icon';
import Tooltip from '@/components/atoms/Tooltip';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon name from Lucide icons */
  icon: IconName | React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button shape */
  shape?: 'circle' | 'square';
  /** Whether button is currently active */
  isActive?: boolean;
  /** Tooltip text */
  tooltip?: string;
  /** Tooltip position */
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
  /** Badge value (number or dot) */
  badge?: number | 'dot';
  /** Badge color */
  badgeColor?: 'primary' | 'secondary' | 'tertiary' | 'red' | 'green' | 'blue' | 'yellow';
  /** Additional class name */
  className?: string;
  /** onClick handler */
  onClick?: () => void;
}

/**
 * IconButton component for icon-only actions
 */
const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  shape = 'circle',
  isActive = false,
  tooltip,
  tooltipPosition = 'top',
  badge,
  badgeColor = 'red',
  className,
  onClick,
  disabled,
  ...props
}: IconButtonProps) => {
  // Base styles for the button
  const baseStyles = "inline-flex items-center justify-center transition-colors";
  
  // Variant styles
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-background hover:bg-secondary/90",
    tertiary: "bg-tertiary text-white hover:bg-tertiary/90",
    ghost: "bg-transparent text-white hover:bg-white/10",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/10",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  
  // Size styles determine width, height, and icon size
  const sizeStyles = {
    sm: {
      button: "h-8 w-8",
      icon: 16
    },
    md: {
      button: "h-10 w-10",
      icon: 20
    },
    lg: {
      button: "h-12 w-12",
      icon: 24
    }
  };
  
  // Shape styles
  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-md"
  };
  
  // Active state styles
  const activeStyles = isActive 
    ? variant === 'ghost' || variant === 'outline'
      ? "bg-white/20" 
      : "ring-2 ring-white/20"
    : "";
  
  // Badge styles
  const badgeStyles = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-background",
    tertiary: "bg-tertiary text-white",
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-black",
  };
  
  // Render the icon component
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return (
        <Icon 
          name={icon as IconName} 
          size={sizeStyles[size].icon} 
        />
      );
    }
    return icon;
  };
  
  // Button component
  const button = (
    <button
      type="button"
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size].button,
        shapeStyles[shape],
        activeStyles,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {renderIcon()}
      
      {/* Badge */}
      {badge && (
        <span className={cn(
          "absolute",
          shape === 'circle' ? '-top-1 -right-1' : 'top-0 right-0 -mt-1 -mr-1',
          badgeStyles[badgeColor],
          badge === 'dot' 
            ? 'h-2.5 w-2.5 rounded-full' 
            : 'min-w-[1.25rem] h-5 text-xs flex items-center justify-center rounded-full px-1'
        )}>
          {badge !== 'dot' && (badge > 99 ? '99+' : badge)}
        </span>
      )}
    </button>
  );
  
  // Wrap with tooltip if specified
  if (tooltip) {
    return (
      <Tooltip content={tooltip} position={tooltipPosition}>
        {button}
      </Tooltip>
    );
  }
  
  return button;
};

export default IconButton;