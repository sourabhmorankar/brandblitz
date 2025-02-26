'use client';

import React from 'react';
import Button from '@/components/ui/Button';

interface PageInfo {
  title: string;
  submenu: {
    text: string;
    sectionId: string;
  }[];
}

interface MainMenuProps {
  pages: Record<string, PageInfo>;
  currentPage: string;
  onPageChange: (page: string) => void;
  style?: React.CSSProperties;
}

const MainMenu = ({ pages, currentPage, onPageChange, style }: MainMenuProps) => {
  return (
    <div id="mainMenu" className="lexend-body lexend-bold" style={style}>
      {Object.keys(pages).map((pageKey) => {
        if (pageKey !== currentPage) {
          return (
            <Button
              key={pageKey}
              variant="special"
              onClick={() => onPageChange(pageKey)}
              aria-label={`Go to ${pages[pageKey].title}`}
            >
              {pages[pageKey].title.toUpperCase()}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MainMenu;