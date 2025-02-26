'use client';

import React, { useState, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import ChatInterface from '@/components/chats/ChatInterface';
import DesignWorkspace from '@/components/workspace/DesignWorkspace';

interface DualPanelLayoutProps {
  projectId?: string;
  defaultChatWidth?: number; // Percentage (0-100)
}

const DualPanelLayout: React.FC<DualPanelLayoutProps> = ({ 
  projectId,
  defaultChatWidth = 35 // Default chat panel takes 35% of width
}) => {
  const [chatWidth, setChatWidth] = useState(defaultChatWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Initialize window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Mobile view for small screens
  const isMobile = windowWidth < 768;
  
  // Start resizing
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };
  
  // Handle resize
  const handleResize = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const containerWidth = window.innerWidth;
    const newWidth = (e.clientX / containerWidth) * 100;
    
    // Constrain the resize to reasonable bounds (20% - 80%)
    if (newWidth >= 20 && newWidth <= 80) {
      setChatWidth(newWidth);
    }
  };
  
  // Stop resizing
  const stopResize = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };
  
  // For mobile, we'll use tabs instead of panels
  const [activeTab, setActiveTab] = useState<'chat' | 'design'>('chat');

  if (isMobile) {
    return (
      <div className="h-full bg-background flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'chat' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'design' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => setActiveTab('design')}
          >
            Design
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' ? (
            <ChatInterface projectId={projectId} className="h-full" />
          ) : (
            <DesignWorkspace projectId={projectId} className="h-full" />
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full bg-background flex overflow-hidden">
      {/* Chat Panel */}
      <div 
        className="h-full overflow-hidden"
        style={{ width: `${chatWidth}%` }}
      >
        <ChatInterface projectId={projectId} className="h-full" />
      </div>
      
      {/* Resizer */}
      <div 
        className={`w-1 h-full cursor-col-resize bg-white/10 flex items-center justify-center hover:bg-primary/50 ${isResizing ? 'bg-primary' : ''}`}
        onMouseDown={startResize}
      >
        <GripVertical className="text-white/30" size={16} />
      </div>
      
      {/* Design Workspace Panel */}
      <div
        className="h-full overflow-hidden flex-1"
        style={{ width: `${100 - chatWidth}%` }}
      >
        <DesignWorkspace projectId={projectId} className="h-full" />
      </div>
    </div>
  );
};

export default DualPanelLayout;