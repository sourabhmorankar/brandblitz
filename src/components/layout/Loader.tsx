'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';

interface LoaderProps {
  onLoadComplete?: () => void;
}

const Loader = ({ onLoadComplete }: LoaderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div 
      className="loader" 
      id="loader"
      style={{ 
        height: loading ? '100%' : '12%',
        transition: 'all 1s'
      }}
    >
      <div className="bgdark"></div>
      <div className="grade1"></div>
      <div className="grade2"></div>
      <div 
        className="bbsicon"
        style={{ 
          marginLeft: loading ? '0' : '-40%',
          transition: 'all 1s'
        }}
      >
        <Logo type="icon" />
      </div>
      <div className="speed line1"></div>
      <div className="speed line2"></div>
      <div className="speed line3"></div>
      <div className="speed line4"></div>
      <div className="speed line5"></div>
      <div id="bbsname">
        <Logo type="text" />
      </div>
    </div>
  );
};

export default Loader;