'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import { ChevronDown, ChevronRight, Plus, Hash, Users, Settings, MessageSquare } from 'lucide-react';

// Types
type Channel = {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'special';
  unreadCount?: number;
  isActive?: boolean;
};

type ChannelGroup = {
  id: string;
  name: string;
  channels: Channel[];
  collapsed?: boolean;
};

interface DiscordSidebarProps {
  /** Groups of channels */
  channelGroups: ChannelGroup[];
  /** Current active channel ID */
  activeChannelId?: string;
  /** User information */
  user?: {
    name: string;
    avatarUrl?: string;
    status?: 'online' | 'away' | 'busy' | 'offline';
  };
  /** Theme - light or dark */
  theme?: 'light' | 'dark';
  /** Function called when a channel is selected */
  onChannelSelect?: (channelId: string) => void;
  /** Function called when a new channel is added */
  onAddChannel?: (groupId: string) => void;
  /** Function called when sidebar collapse state changes */
  onCollapseChange?: (groupId: string, collapsed: boolean) => void;
  /** Class name for root container */
  className?: string;
  /** Whether the sidebar is in mobile (collapsed) mode */
  isMobile?: boolean;
}

/**
 * Discord/Slack-inspired sidebar component for navigation
 */
const DiscordSidebar = ({
  channelGroups,
  activeChannelId,
  user,
  theme = 'dark',
  onChannelSelect,
  onAddChannel,
  onCollapseChange,
  className,
  isMobile = false,
}: DiscordSidebarProps) => {
  // State for locally managed groups (collapsed state)
  const [groups, setGroups] = useState(channelGroups);
  
  // Toggle group collapse
  const toggleGroupCollapse = (groupId: string) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        const newCollapsedState = !group.collapsed;
        
        // Call the callback if provided
        if (onCollapseChange) {
          onCollapseChange(groupId, newCollapsedState);
        }
        
        return { ...group, collapsed: newCollapsedState };
      }
      return group;
    });
    
    setGroups(updatedGroups);
  };
  
  // Handle channel selection
  const handleChannelSelect = (channelId: string) => {
    if (onChannelSelect) {
      onChannelSelect(channelId);
    }
  };
  
  // Handle adding a new channel
  const handleAddChannel = (groupId: string) => {
    if (onAddChannel) {
      onAddChannel(groupId);
    }
  };
  
  // Get icon for channel type
  const getChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'voice':
        return <Users size={16} />;
      case 'special':
        return <MessageSquare size={16} />;
      case 'text':
      default:
        return <Hash size={16} />;
    }
  };
  
  return (
    <div 
      className={cn(
        'flex flex-col h-full',
        theme === 'dark' ? 'bg-background text-white' : 'bg-gray-100 text-gray-900',
        isMobile ? 'w-16' : 'w-60',
        className
      )}
    >
      {/* Header/Server Name */}
      <div className={cn(
        'px-4 h-12 flex items-center border-b',
        theme === 'dark' ? 'border-white/10' : 'border-gray-300'
      )}>
        <Text weight="bold" size="lg" className="flex-1">
          {isMobile ? 'BB' : 'BrandBlitz'}
        </Text>
        
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="sm"
            className="p-1"
            aria-label="Settings"
          >
            <Settings size={16} />
          </Button>
        )}
      </div>
      
      {/* Channel Groups */}
      <div className="flex-1 overflow-y-auto py-2">
        {groups.map((group) => (
          <div key={group.id} className="mb-2">
            {/* Group Header */}
            <button
              className={cn(
                'flex items-center w-full px-3 py-1 text-xs font-semibold uppercase',
                theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-200',
                !isMobile && 'justify-between'
              )}
              onClick={() => toggleGroupCollapse(group.id)}
            >
              <div className="flex items-center">
                {isMobile ? (
                  <Text size="xs" weight="bold" color="muted" className="opacity-70">
                    {group.name.charAt(0)}
                  </Text>
                ) : (
                  <>
                    {group.collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                    <Text size="xs" weight="bold" color="muted" className="ml-1 opacity-70">
                      {group.name}
                    </Text>
                  </>
                )}
              </div>
              
              {!isMobile && !group.collapsed && (
                <button
                  className={cn(
                    'p-1 rounded-sm opacity-0 group-hover:opacity-100',
                    theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-300'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddChannel(group.id);
                  }}
                  aria-label={`Add channel to ${group.name}`}
                >
                  <Plus size={12} />
                </button>
              )}
            </button>
            
            {/* Channels in Group */}
            {!group.collapsed && (
              <div className="mt-1">
                {group.channels.map((channel) => (
                  <button
                    key={channel.id}
                    className={cn(
                      'flex items-center w-full px-3 py-1 mb-1 rounded-md',
                      channel.id === activeChannelId
                        ? theme === 'dark' 
                          ? 'bg-white/10 text-white' 
                          : 'bg-gray-300 text-gray-900'
                        : 'text-white/70',
                      (channel.id !== activeChannelId) && (
                        theme === 'dark'
                          ? 'hover:bg-white/5 hover:text-white'
                          : 'hover:bg-gray-200 hover:text-gray-900'
                      ),
                      isMobile ? 'justify-center' : 'justify-between'
                    )}
                    onClick={() => handleChannelSelect(channel.id)}
                  >
                    <div className="flex items-center">
                      {getChannelIcon(channel.type)}
                      
                      {!isMobile && (
                        <Text size="sm" className="ml-2 truncate">
                          {channel.name}
                        </Text>
                      )}
                    </div>
                    
                    {!isMobile && channel.unreadCount && channel.unreadCount > 0 && (
                      <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {channel.unreadCount > 99 ? '99+' : channel.unreadCount}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* User Bar */}
      {user && (
        <div className={cn(
          'h-14 px-2 flex items-center border-t',
          theme === 'dark' ? 'border-white/10 bg-background/80' : 'border-gray-300 bg-gray-200'
        )}>
          <Avatar 
            src={user.avatarUrl} 
            initials={user.name.charAt(0)} 
            status={user.status}
            size="sm"
          />
          
          {!isMobile && (
            <div className="ml-2 flex-1 truncate">
              <Text size="sm" weight="medium" className="truncate">
                {user.name}
              </Text>
              <Text size="xs" color="muted" className="truncate">
                {user.status === 'online' ? 'Online' : 
                  user.status === 'away' ? 'Away' : 
                  user.status === 'busy' ? 'Do not disturb' : 'Offline'}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscordSidebar;