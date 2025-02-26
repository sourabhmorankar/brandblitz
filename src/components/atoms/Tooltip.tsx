'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactNode;
  /** Tooltip position */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether tooltip is currently open (controlled) */
  isOpen?: boolean;
  /** Max width of tooltip */
  maxWidth?: number;
  /** Additional class name */
  className?: string;
  /** Use dark theme (default) or light theme */
  theme?: 'dark' | 'light';
  /** Arrow size */
  arrowSize?: number;
  /** Whether to show arrow */
  showArrow?: boolean;
}

/**
 * Tooltip component for displaying additional information on hover
 */
const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 200,
  isOpen: controlledIsOpen,
  maxWidth = 200,
  className,
  theme = 'dark',
  arrowSize = 6,
  showArrow = true,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate tooltip position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    // Calculate coordinates based on position
    let x = 0, y = 0;
    
    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - arrowSize;
        break;
      case 'right':
        x = triggerRect.right + arrowSize;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.bottom + arrowSize;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - arrowSize;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
    }
    
    // Padding from viewport edge
    const padding = 10;
    
    // Horizontal bounds
    if (x < padding) {
      x = padding;
    } else if (x + tooltipRect.width > window.innerWidth - padding) {
      x = window.innerWidth - tooltipRect.width - padding;
    }
    
    // Vertical bounds
    if (y < padding) {
      y = padding;
    } else if (y + tooltipRect.height > window.innerHeight - padding) {
      y = window.innerHeight - tooltipRect.height - padding;
    }
    
    setCoordinates({ x, y });
  }, [position, arrowSize]);
  
  // Handle mouse enter
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      calculatePosition();
    }, delay);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // Use controlled isOpen if provided
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
      if (controlledIsOpen) calculatePosition();
    }
  }, [controlledIsOpen, calculatePosition]);
  
  // Recalculate position when window is resized
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
      
      return () => {
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
      };
    }
  }, [isOpen, calculatePosition]);
  
  // Get arrow styles for current position
  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: -arrowSize,
          left: `calc(50% - ${arrowSize}px)`,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}`,
        };
      case 'right':
        return {
          left: -arrowSize,
          top: `calc(50% - ${arrowSize}px)`,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}`,
        };
      case 'bottom':
        return {
          top: -arrowSize,
          left: `calc(50% - ${arrowSize}px)`,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}`,
        };
      case 'left':
        return {
          right: -arrowSize,
          top: `calc(50% - ${arrowSize}px)`,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid ${theme === 'dark' ? '#1a1a1a' : '#ffffff'}`,
        };
    }
  };
  
  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      
      {isOpen && typeof window !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 px-3 py-2 text-sm font-medium rounded-md",
            theme === 'dark' 
              ? "bg-[#1a1a1a] text-white" 
              : "bg-white text-gray-900 shadow-lg",
            "transition-opacity duration-100",
            isOpen ? "opacity-100" : "opacity-0",
            className
          )}
          style={{
            left: coordinates.x,
            top: coordinates.y,
            maxWidth,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {content}
          
          {showArrow && (
            <div
              className="absolute w-0 h-0"
              style={getArrowStyles()}
            />
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;