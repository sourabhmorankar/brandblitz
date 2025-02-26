'use client';

import React, { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import MainMenu from '@/components/navigation/MainMenu';
import SubMenu from '@/components/navigation/SubMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

const pages = {
  home: {
    title: 'Home',
    submenu: [
      { text: 'item1', sectionId: 'itemh1' },
      { text: 'item2', sectionId: 'itemh2' },
      { text: 'item3', sectionId: 'itemh3' },
      { text: 'item4', sectionId: 'itemh4' }
    ]
  },
  portfolio: {
    title: 'Portfolio',
    submenu: [
      { text: 'item1', sectionId: 'itemp1' },
      { text: 'item2', sectionId: 'itemp2' },
      { text: 'item3', sectionId: 'itemp3' },
      { text: 'item4', sectionId: 'itemp4' }
    ]
  },
  blog: {
    title: 'Blog',
    submenu: [
      { text: 'item1', sectionId: 'itemb1' },
      { text: 'item2', sectionId: 'itemb2' },
      { text: 'item3', sectionId: 'itemb3' }
    ]
  },
  login: {
    title: 'Login',
    submenu: [
      { text: 'item1', sectionId: 'iteml1' },
      { text: 'item2', sectionId: 'iteml2' }
    ]
  }
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [submenuActive, setSubmenuActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [elementsVisible, setElementsVisible] = useState(false);
  const speedLinesRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    if (loaded) {
      // Delay the fade-in of UI elements after loader has shrunk
      const timer = setTimeout(() => {
        setElementsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  useEffect(() => {
    // Cache speed lines reference
    speedLinesRef.current = document.querySelectorAll('.speed');
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleSubMenuItemClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    toggleSubmenu();
  };

  const toggleSubmenu = () => {
    // Toggle speed lines color
    if (speedLinesRef.current) {
      speedLinesRef.current.forEach((line) => {
        if (!submenuActive) {
          // Turning menu on - make lines white
          line.classList.add('active');
        } else {
          // Turning menu off - restore original color
          line.classList.remove('active');
        }
      });
    }
    
    setSubmenuActive(!submenuActive);
  };

  const handleLoadComplete = () => {
    setLoaded(true);
  };

  return (
    <div className="relative h-screen">
      <Loader onLoadComplete={handleLoadComplete} />
      
      {/* Menu button hidden for now
      <div 
        id="menubtn" 
        className="lexend-body lexend-bold" 
        style={{ opacity: elementsVisible ? 1 : 0, transition: 'opacity 0.5s', display: 'none' }}
      >
        <Button 
          variant="special" 
          onClick={toggleSubmenu} 
          aria-label="Open Navigation Menu"
        >
          MENU
        </Button>
      </div>
      */}
      
      <MainMenu 
        pages={pages} 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        style={{ opacity: elementsVisible ? 1 : 0, transition: 'opacity 0.5s' }}
      />
      
      <SubMenu 
        isActive={submenuActive} 
        items={pages[currentPage as keyof typeof pages].submenu} 
        onItemClick={handleSubMenuItemClick} 
      />
      
      {/* Social icons removed as requested */}
      
      <div className={`landingcover ${submenuActive ? 'active' : ''}`} onClick={toggleSubmenu}></div>
      
      <div 
        className={`landing ${loaded ? 'active' : ''}`} 
        data-page={currentPage}
        style={{ opacity: elementsVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div className="gulper"></div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;