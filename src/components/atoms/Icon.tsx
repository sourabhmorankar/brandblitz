import React from 'react';
import * as LucideIcons from 'lucide-react';

// Type for all available Lucide icon names
export type IconName = keyof typeof LucideIcons;

export interface IconProps {
  /** Name of the icon from Lucide icons */
  name: IconName;
  /** Size of the icon in pixels */
  size?: number;
  /** Icon color */
  color?: string;
  /** Stroke width for the icon */
  strokeWidth?: number;
  /** Additional class name */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
  /** onClick handler */
  onClick?: () => void;
}

/**
 * Icon component that renders Lucide icons
 */
const Icon = ({
  name,
  size = 24,
  color,
  strokeWidth = 2,
  className,
  ariaLabel,
  onClick,
}: IconProps) => {
  // Check if the name is a valid Lucide icon
  if (!(name in LucideIcons)) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }
  
  // Get the icon component dynamically
  const IconComponent = LucideIcons[name] as React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
    'aria-label'?: string;
    onClick?: () => void;
  }>;
  
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    />
  );
};

export default Icon;