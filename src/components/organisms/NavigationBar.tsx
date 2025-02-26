'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import Logo from '@/components/ui/Logo';
import DropdownMenu, { DropdownItem } from '@/components/molecules/DropdownMenu';
import SearchBar from '@/components/molecules/SearchBar';
import { 
  Menu, 
  X, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  HelpCircle,
  Moon,
  Sun,
  Plus,
} from 'lucide-react';

export interface NavigationLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface NavigationBarProps {
  /** App title */
  title?: string;
  /** Navigation links */
  links?: NavigationLink[];
  /** User object */
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
    role?: string;
  };
  /** Action buttons to display */
  actions?: React.ReactNode;
  /** Show search bar */
  showSearch?: boolean;
  /** Search handler */
  onSearch?: (query: string) => void;
  /** Show notifications */
  showNotifications?: boolean;
  /** Notification count */
  notificationCount?: number;
  /** Show theme toggle */
  showThemeToggle?: boolean;
  /** Current theme */
  theme?: 'light' | 'dark';
  /** Theme toggle handler */
  onThemeChange?: (theme: 'light' | 'dark') => void;
  /** Sign out handler */
  onSignOut?: () => void;
  /** Profile click handler */
  onProfileClick?: () => void;
  /** Settings click handler */
  onSettingsClick?: () => void;
  /** Help click handler */
  onHelpClick?: () => void;
  /** Create new item handler */
  onCreateNew?: () => void;
  /** Is mobile */
  isMobile?: boolean;
  /** Additional class */
  className?: string;
}

/**
 * NavigationBar component for application header
 */
const NavigationBar = ({
  title = 'BrandBlitz',
  links = [],
  user,
  actions,
  showSearch = true,
  onSearch,
  showNotifications = true,
  notificationCount = 0,
  showThemeToggle = true,
  theme = 'dark',
  onThemeChange,
  onSignOut,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  onCreateNew,
  isMobile = false,
  className,
}: NavigationBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // User dropdown items
  const userDropdownItems: DropdownItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
      onClick: onProfileClick,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={16} />,
      onClick: onSettingsClick,
    },
    {
      id: 'theme',
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
      onClick: () => onThemeChange && onThemeChange(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: <HelpCircle size={16} />,
      onClick: onHelpClick,
    },
    {
      id: 'signout',
      label: 'Sign Out',
      icon: <LogOut size={16} />,
      onClick: onSignOut,
      danger: true,
    },
  ];
  
  // Filter out theme toggle if not needed
  if (!showThemeToggle) {
    userDropdownItems.splice(2, 1);
  }
  
  return (
    <header
      className={cn(
        "bg-background border-b border-white/10 z-10",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 p-2 text-white hover:bg-white/10 rounded-md"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link href="/" className="flex items-center">
              <Logo type="icon" className="h-8 w-8 mr-2" />
              <span className="text-white font-semibold text-xl">{title}</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                  link.isActive || pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center space-x-2">
                  {link.icon && <span>{link.icon}</span>}
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}
          </nav>
          
          {/* Actions section */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            {showSearch && !isMobile && (
              <div className="hidden md:block w-64">
                <SearchBar
                  placeholder="Search..."
                  onSearch={onSearch}
                  size="sm"
                  variant="filled"
                />
              </div>
            )}
            
            {/* Create New button */}
            {onCreateNew && (
              <Button
                variant="primary"
                size="sm"
                onClick={onCreateNew}
                leftIcon={<Plus size={16} />}
                className="hidden md:flex"
              >
                Create New
              </Button>
            )}
            
            {/* Custom actions */}
            {actions && <div className="hidden md:flex">{actions}</div>}
            
            {/* Notifications */}
            {showNotifications && (
              <button
                className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-md relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            )}
            
            {/* User menu */}
            {user ? (
              <DropdownMenu
                trigger={
                  <div className="flex items-center">
                    <Avatar
                      src={user.avatarUrl}
                      initials={user.name?.charAt(0)}
                      size="sm"
                      className="cursor-pointer"
                    />
                  </div>
                }
                items={userDropdownItems}
                position="bottom-right"
                renderAs="custom"
                width={200}
              />
            ) : (
              <Button
                variant="primary"
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      <div
        className={cn(
          "md:hidden bg-background border-b border-white/10 absolute w-full z-20 transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-screen" : "max-h-0 invisible overflow-hidden border-b-0"
        )}
      >
        <div className="px-4 py-2 space-y-1">
          {/* Mobile search */}
          {showSearch && (
            <div className="py-2">
              <SearchBar
                placeholder="Search..."
                onSearch={(query) => {
                  if (onSearch) onSearch(query);
                  closeMenu();
                }}
                size="sm"
                variant="filled"
                fullWidth
              />
            </div>
          )}
          
          {/* Mobile navigation links */}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block text-sm font-medium px-3 py-2 rounded-md transition-colors",
                link.isActive || pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
              onClick={closeMenu}
            >
              <div className="flex items-center space-x-2">
                {link.icon && <span>{link.icon}</span>}
                <span>{link.label}</span>
              </div>
            </Link>
          ))}
          
          {/* Mobile create button */}
          {onCreateNew && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (onCreateNew) onCreateNew();
                closeMenu();
              }}
              leftIcon={<Plus size={16} />}
              className="w-full mt-2"
            >
              Create New
            </Button>
          )}
          
          {/* User info on mobile */}
          {user && (
            <div className="pt-2 mt-2 border-t border-white/10">
              <div className="flex items-center px-3 py-2">
                <Avatar
                  src={user.avatarUrl}
                  initials={user.name?.charAt(0)}
                  size="sm"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/70">{user.email}</p>
                </div>
              </div>
              
              {/* Mobile menu buttons */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start mt-1"
                leftIcon={<User size={16} />}
                onClick={() => {
                  if (onProfileClick) onProfileClick();
                  closeMenu();
                }}
              >
                Profile
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start mt-1"
                leftIcon={<Settings size={16} />}
                onClick={() => {
                  if (onSettingsClick) onSettingsClick();
                  closeMenu();
                }}
              >
                Settings
              </Button>
              
              {showThemeToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start mt-1"
                  leftIcon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  onClick={() => {
                    if (onThemeChange) onThemeChange(theme === 'dark' ? 'light' : 'dark');
                    closeMenu();
                  }}
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start mt-1"
                leftIcon={<HelpCircle size={16} />}
                onClick={() => {
                  if (onHelpClick) onHelpClick();
                  closeMenu();
                }}
              >
                Help & Support
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start mt-1 text-red-400"
                leftIcon={<LogOut size={16} className="text-red-400" />}
                onClick={() => {
                  if (onSignOut) onSignOut();
                  closeMenu();
                }}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;