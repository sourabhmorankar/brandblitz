'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SubMenuItem {
  text: string;
  sectionId: string;
}

interface UserPage {
  title: string;
  submenu: SubMenuItem[];
}

interface SubMenuProps {
  isActive: boolean;
  items: SubMenuItem[];
  onItemClick: (sectionId: string) => void;
  userPages: Record<string, UserPage>;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const SubMenu = ({ 
  isActive, 
  // items parameter kept for API compatibility 
  onItemClick,
  userPages,
  currentPage,
  onPageChange
}: SubMenuProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    [currentPage]: true
  });

  const toggleGroup = (pageKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [pageKey]: !prev[pageKey]
    }));
  };

  // Used in button clicks below to update page and expand group
  const handlePageSelect = (pageKey: string) => {
    onPageChange(pageKey);
    setExpandedGroups(prev => ({
      ...prev,
      [pageKey]: true
    }));
  };

  return (
    <div id="submenu" className={`lexend-body lexend-bold ${isActive ? 'active' : ''}`}>
      <div className="p-4 bg-background/90 text-white rounded-md max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-primary">Navigation</h3>
        
        {/* Display Pages as collapsible groups */}
        <div className="space-y-2">
          {Object.entries(userPages).map(([pageKey, page]) => (
            <div key={pageKey} className="border border-white/10 rounded-md overflow-hidden">
                              <button 
                className={`w-full flex justify-between items-center p-2 hover:bg-white/10 ${pageKey === currentPage ? 'bg-white/10' : ''}`}
                onClick={() => {
                  toggleGroup(pageKey);
                  if (pageKey !== currentPage) {
                    handlePageSelect(pageKey);
                  }
                }}
              >
                <span className="font-medium">
                  {page.title}
                </span>
                {expandedGroups[pageKey] ? 
                  <ChevronDown size={18} /> : 
                  <ChevronRight size={18} />
                }
              </button>
              
              {expandedGroups[pageKey] && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-white/5">
                  {page.submenu.map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => onItemClick(item.sectionId)}
                      className="w-full text-left justify-start mb-1"
                      variant={pageKey === currentPage ? 'default' : 'special'}
                    >
                      {item.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;