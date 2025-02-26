'use client';

import React, { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import MainMenu from '@/components/navigation/MainMenu';
import SubMenu from '@/components/navigation/SubMenu';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const defaultPages = {
  home: {
    title: 'Home',
    submenu: [
      { text: 'Overview', sectionId: 'overview' },
      { text: 'Features', sectionId: 'features' },
      { text: 'How It Works', sectionId: 'how-it-works' },
      { text: 'Pricing', sectionId: 'pricing' }
    ]
  },
  portfolio: {
    title: 'Portfolio',
    submenu: [
      { text: 'Logos', sectionId: 'logos' },
      { text: 'Web Design', sectionId: 'web-design' },
      { text: 'Brand Identity', sectionId: 'brand-identity' },
      { text: 'Print', sectionId: 'print' }
    ]
  },
  blog: {
    title: 'Blog',
    submenu: [
      { text: 'Design Tips', sectionId: 'design-tips' },
      { text: 'Branding', sectionId: 'branding' },
      { text: 'Marketing', sectionId: 'marketing' }
    ]
  }
};

// Add additional pages for authenticated users
const authenticatedPages = {
  ...defaultPages,
  dashboard: {
    title: 'Dashboard',
    submenu: [
      { text: 'Projects', sectionId: 'projects' },
      { text: 'Messages', sectionId: 'messages' },
      { text: 'Settings', sectionId: 'settings' }
    ]
  },
  designRequests: {
    title: 'Design Requests',
    submenu: [
      { text: 'New Request', sectionId: 'new-request' },
      { text: 'Active Requests', sectionId: 'active-requests' },
      { text: 'Completed', sectionId: 'completed' }
    ]
  }
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [submenuActive, setSubmenuActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [elementsVisible, setElementsVisible] = useState(false);
  const speedLinesRef = useRef<NodeListOf<Element> | null>(null);
  
  // Determine which pages to show based on authentication status
  const pages = user ? authenticatedPages : defaultPages;

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
      
      <div 
        id="menubtn" 
        className="lexend-body lexend-bold" 
        style={{ 
          opacity: elementsVisible ? 1 : 0, 
          transition: 'opacity 0.5s',
          display: 'block'
        }}
      >
        <Button 
          variant="special" 
          onClick={toggleSubmenu} 
          aria-label="Open Navigation Menu"
        >
          OPEN
        </Button>
      </div>
      
      <MainMenu 
        isAuthenticated={!!user}
        onLogout={async () => {
          try {
            await logout();
            // No need to redirect as the useEffect in protected pages will handle that
            setCurrentPage('home'); // Reset to home page after logout
          } catch (error) {
            console.error('Error logging out:', error);
          }
        }}
        style={{ opacity: elementsVisible ? 1 : 0, transition: 'opacity 0.5s' }}
      />
      
      <SubMenu 
        isActive={submenuActive} 
        items={pages[currentPage as keyof typeof pages].submenu} 
        onItemClick={handleSubMenuItemClick}
        userPages={pages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
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