import React from 'react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';

export interface UserCardProps {
  /** User's name */
  name: string;
  /** User's role or position */
  role?: string;
  /** User's avatar image URL */
  avatarUrl?: string;
  /** User's initials (fallback for avatar) */
  initials?: string;
  /** User's online status */
  status?: 'online' | 'away' | 'busy' | 'offline';
  /** Additional user metadata */
  metadata?: {
    label: string;
    value: string;
  }[];
  /** Action buttons */
  actions?: React.ReactNode;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the card is selected */
  isSelected?: boolean;
  /** Whether the card is disabled */
  isDisabled?: boolean;
  /** Badges to display */
  badges?: {
    label: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info';
  }[];
  /** Click handler */
  onClick?: () => void;
  /** Hover effect */
  hoverEffect?: boolean;
  /** Additional classes */
  className?: string;
}

/**
 * UserCard component for displaying user information
 */
const UserCard = ({
  name,
  role,
  avatarUrl,
  initials,
  status,
  metadata,
  actions,
  size = 'md',
  isSelected = false,
  isDisabled = false,
  badges = [],
  onClick,
  hoverEffect = true,
  className,
}: UserCardProps) => {
  // Determine sizes based on card size
  const sizes = {
    sm: {
      avatar: 'sm' as const,
      nameSize: 'sm' as const,
      roleSize: 'xs' as const,
      padding: 'p-2',
      gap: 'gap-2',
    },
    md: {
      avatar: 'md' as const,
      nameSize: 'md' as const,
      roleSize: 'sm' as const,
      padding: 'p-3',
      gap: 'gap-3',
    },
    lg: {
      avatar: 'lg' as const,
      nameSize: 'lg' as const,
      roleSize: 'md' as const,
      padding: 'p-4',
      gap: 'gap-4',
    },
  };
  
  const currentSize = sizes[size];
  
  return (
    <div
      className={cn(
        "flex items-center rounded-md border border-white/10 bg-white/5",
        currentSize.padding,
        isSelected && "bg-primary/10 border-primary/20",
        isDisabled && "opacity-50 cursor-not-allowed",
        onClick && !isDisabled && "cursor-pointer",
        hoverEffect && !isDisabled && "hover:bg-white/10",
        hoverEffect && isSelected && "hover:bg-primary/15",
        className
      )}
      onClick={isDisabled ? undefined : onClick}
    >
      {/* Avatar */}
      <Avatar
        src={avatarUrl}
        initials={initials || name.charAt(0)}
        alt={name}
        size={currentSize.avatar}
        status={status}
      />
      
      {/* User info */}
      <div className={cn("flex-1 min-w-0", currentSize.gap)}>
        <div className="flex items-center justify-between gap-2">
          <Text 
            size={currentSize.nameSize} 
            weight="medium" 
            truncate
          >
            {name}
          </Text>
          
          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  size="sm" 
                  variant={badge.variant || 'primary'}
                  rounded
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {role && (
          <Text 
            size={currentSize.roleSize} 
            color="muted" 
            truncate
          >
            {role}
          </Text>
        )}
        
        {/* Metadata */}
        {metadata && metadata.length > 0 && (
          <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1">
            {metadata.map((item, index) => (
              <div key={index} className="overflow-hidden">
                <Text size="xs" color="muted">
                  {item.label}:
                </Text>
                <Text size="xs" truncate>
                  {item.value}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Actions */}
      {actions && (
        <div className="flex items-center ml-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default UserCard;