import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { 
  X, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle
} from 'lucide-react';

export interface NotificationProps {
  /** Title of the notification */
  title: string;
  /** Description text */
  description?: string;
  /** Type of notification */
  type?: 'info' | 'success' | 'warning' | 'error' | 'custom';
  /** Custom icon for the notification */
  icon?: React.ReactNode;
  /** Whether the notification can be dismissed */
  dismissible?: boolean;
  /** Auto dismiss after certain milliseconds */
  autoDismiss?: boolean;
  /** Duration before auto dismiss (ms) */
  duration?: number;
  /** On close callback */
  onClose?: () => void;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional class name */
  className?: string;
}

/**
 * Notification component for displaying alerts and messages
 */
const Notification = ({
  title,
  description,
  type = 'info',
  icon,
  dismissible = true,
  autoDismiss = false,
  duration = 5000,
  onClose,
  action,
  className,
}: NotificationProps) => {
  const [visible, setVisible] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);
  
  // Close notification with animation
  const closeNotification = useCallback(() => {
    setAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 300); // Animation duration
  }, [onClose]);
  
  // Handle auto dismiss
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoDismiss && duration > 0) {
      timer = setTimeout(() => {
        closeNotification();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoDismiss, duration, closeNotification]);
  
  // Get icon based on type
  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
      case 'error':
        return <AlertCircle className="text-red-500" />;
      case 'info':
      default:
        return <Info className="text-blue-500" />;
    }
  };
  
  // Get border color based on type
  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500';
      case 'warning':
        return 'border-yellow-500';
      case 'error':
        return 'border-red-500';
      case 'info':
        return 'border-blue-500';
      default:
        return 'border-white/10';
    }
  };
  
  if (!visible) return null;
  
  return (
    <div
      className={cn(
        "max-w-sm w-full bg-background border-l-4 shadow-lg rounded-md overflow-hidden transition-all duration-300",
        getBorderColor(),
        animatingOut && "opacity-0 translate-x-2",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        <div className="flex items-start">
          {/* Icon */}
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          
          {/* Content */}
          <div className="ml-3 flex-1">
            <div className="text-sm font-medium text-white">{title}</div>
            {description && (
              <div className="mt-1 text-sm text-white/70">{description}</div>
            )}
            
            {/* Action button */}
            {action && (
              <div className="mt-2">
                <button
                  className="text-sm font-medium text-primary hover:text-primary/90"
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
          
          {/* Close button */}
          {dismissible && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="text-white/50 hover:text-white"
                onClick={closeNotification}
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Progress bar for auto dismiss */}
      {autoDismiss && (
        <div className="h-1 bg-white/10">
          <div 
            className="h-full bg-white/20 transition-all" 
            style={{ 
              width: '100%', 
              animationName: 'progress', 
              animationDuration: `${duration}ms`, 
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards'
            }} 
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Notification;