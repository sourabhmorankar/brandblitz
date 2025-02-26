import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback initials to display if image fails to load or isn't provided */
  initials?: string;
  /** Size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Status indicator (online, away, offline, etc.) */
  status?: 'online' | 'away' | 'busy' | 'offline' | 'none';
  /** Shape of the avatar */
  shape?: 'circle' | 'square';
  /** Border around the avatar */
  hasBorder?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

// Size mapping for Next.js Image component
const sizeInPixels = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

/**
 * Avatar component for displaying user profile images or initials
 */
const Avatar = ({
  src,
  alt = 'User avatar',
  initials,
  size = 'md',
  status = 'none',
  shape = 'circle',
  hasBorder = false,
  className,
  onClick,
}: AvatarProps) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-[8px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };
  
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };
  
  const borderStyle = hasBorder ? 'border-2 border-white/10' : '';
  
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-500',
    none: 'hidden',
  };
  
  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };
  
  // Generate background color based on initials (if no image)
  const getHashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };
  
  const getHSL = (str?: string) => {
    if (!str) return 'hsl(210, 40%, 20%)';
    const hash = getHashCode(str);
    const h = hash % 360;
    return `hsl(${h}, 40%, 20%)`;
  };
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-background',
          sizeStyles[size],
          shapeStyles[shape],
          borderStyle,
          className,
          onClick && 'cursor-pointer'
        )}
        onClick={onClick}
        style={{ backgroundColor: !src && initials ? getHSL(initials) : undefined }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={sizeInPixels[size]}
            height={sizeInPixels[size]}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, show initials instead
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          initials && <span className="font-medium text-white">{initials}</span>
        )}
      </div>
      
      {status !== 'none' && (
        <span 
          className={cn(
            'absolute block border-2 border-background rounded-full',
            statusColors[status],
            statusSizes[size]
          )}
          style={{ 
            bottom: '3%', 
            right: '3%'
          }}
        />
      )}
    </div>
  );
};

export default Avatar;