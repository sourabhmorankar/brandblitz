'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  /** Dropdown trigger button content */
  trigger: React.ReactNode;
  /** Menu items */
  items: DropdownItem[];
  /** Dropdown position */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Whether the dropdown is controlled */
  isOpen?: boolean;
  /** Setting dropdown open state when controlled */
  setIsOpen?: (isOpen: boolean) => void;
  /** Render as button or custom element */
  renderAs?: 'button' | 'custom';
  /** Width of dropdown menu */
  width?: number | string;
  /** Maximum height of dropdown before scrolling */
  maxHeight?: number | string;
  /** Show dropdown arrow on trigger button */
  showArrow?: boolean;
  /** Dropdown trigger button class name */
  triggerClassName?: string;
  /** Dropdown menu class name */
  menuClassName?: string;
  /** Dropdown menu item class name */
  itemClassName?: string;
  /** Additional Props */
  triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Divider indexes */
  dividerAfterIds?: string[];
  /** Group headers */
  groupHeaders?: {id: string, label: string}[];
}

/**
 * DropdownMenu component for displaying a list of options
 */
const DropdownMenu = ({
  trigger,
  items,
  position = 'bottom-left',
  isOpen: controlledIsOpen,
  setIsOpen: setControlledIsOpen,
  renderAs = 'button',
  width = 200,
  maxHeight = 300,
  showArrow = true,
  triggerClassName,
  menuClassName,
  itemClassName,
  triggerProps,
  dividerAfterIds = [],
  groupHeaders = [],
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (setControlledIsOpen) setControlledIsOpen(newState);
  };
  
  // Close dropdown
  const closeDropdown = React.useCallback(() => {
    setIsOpen(false);
    if (setControlledIsOpen) setControlledIsOpen(false);
  }, [setControlledIsOpen]);
  
  // Handle item click
  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    if (item.onClick) item.onClick();
    closeDropdown();
  };
  
  // Position styles
  const positionStyles = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1',
  };
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDropdown]);
  
  // Handle controlled state
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);
  
  return (
    <div ref={dropdownRef} className="relative inline-block">
      {renderAs === 'button' ? (
        <button
          type="button"
          className={cn(
            "flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-md",
            triggerClassName
          )}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          {...triggerProps}
        >
          <span>{trigger}</span>
          {showArrow && <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
        </button>
      ) : (
        <div onClick={toggleDropdown} className="cursor-pointer">
          {trigger}
        </div>
      )}
      
      {isOpen && (
        <div
          className={cn(
            "absolute z-10 bg-background border border-white/10 rounded-md shadow-lg py-1",
            positionStyles[position],
            menuClassName
          )}
          style={{ 
            width: typeof width === 'number' ? `${width}px` : width,
            maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
            overflowY: 'auto'
          }}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item) => {
            // Check if this item has a group header
            const header = groupHeaders.find(h => h.id === item.id);
            
            return (
              <React.Fragment key={item.id}>
                {header && (
                  <div className="px-3 py-1 text-xs font-semibold text-white/50 uppercase">
                    {header.label}
                  </div>
                )}
                <button
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm flex items-center",
                    item.disabled 
                      ? "opacity-50 cursor-not-allowed" 
                      : item.danger
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-white hover:bg-white/10",
                    itemClassName
                  )}
                  role="menuitem"
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </button>
                {dividerAfterIds.includes(item.id) && (
                  <div className="h-px bg-white/10 my-1" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;