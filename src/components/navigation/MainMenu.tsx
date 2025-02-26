'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { Bell, LayoutGrid, LogOut, LogIn, UserPlus } from 'lucide-react';

interface MainMenuProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  style?: React.CSSProperties;
}

const MainMenu = ({ isAuthenticated, onLogout, style }: MainMenuProps) => {
  const handleNotificationClick = () => {
    console.log('Notifications clicked');
    // Implement notification handling
  };

  const handleDesignboardsClick = () => {
    console.log('Designboards clicked');
    // Implement designboards navigation
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
    // Implement login navigation
  };

  const handleRegisterClick = () => {
    console.log('Register clicked');
    // Implement register navigation
  };

  return (
    <div id="mainMenu" className="lexend-body lexend-bold" style={style}>
      {isAuthenticated ? (
        // Authenticated user menu options
        <>
          <Button
            variant="special"
            onClick={handleNotificationClick}
            aria-label="Notifications"
            className="flex items-center"
          >
            <Bell size={18} className="mr-2" />
            NOTIFICATIONS
          </Button>
          <Button
            variant="special"
            onClick={handleDesignboardsClick}
            aria-label="Design Boards"
            className="flex items-center"
          >
            <LayoutGrid size={18} className="mr-2" />
            DESIGNBOARDS
          </Button>
          <Button
            variant="special"
            onClick={onLogout}
            aria-label="Logout"
            className="flex items-center"
          >
            <LogOut size={18} className="mr-2" />
            LOGOUT
          </Button>
        </>
      ) : (
        // Unauthenticated user menu options
        <>
          <Button
            variant="special"
            onClick={handleLoginClick}
            aria-label="Login"
            className="flex items-center"
          >
            <LogIn size={18} className="mr-2" />
            LOGIN
          </Button>
          <Button
            variant="special"
            onClick={handleRegisterClick}
            aria-label="Register"
            className="flex items-center"
          >
            <UserPlus size={18} className="mr-2" />
            REGISTER
          </Button>
        </>
      )}
    </div>
  );
};

export default MainMenu;