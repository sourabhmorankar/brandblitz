'use client';

import React from 'react';
import Button from '@/components/ui/Button';

interface SubMenuProps {
  isActive: boolean;
  items: {
    text: string;
    sectionId: string;
  }[];
  onItemClick: (sectionId: string) => void;
}

const SubMenu = ({ isActive, items, onItemClick }: SubMenuProps) => {
  return (
    <div id="submenu" className={`lexend-body lexend-bold ${isActive ? 'active' : ''}`}>
      {items.map((item, index) => (
        <Button
          key={index}
          onClick={() => onItemClick(item.sectionId)}
          aria-label={`Navigate to ${item.text}`}
        >
          {item.text}
        </Button>
      ))}
    </div>
  );
};

export default SubMenu;