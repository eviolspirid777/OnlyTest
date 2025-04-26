import { useState, useEffect } from 'react';

import { DesktopLayout } from './layouts/Desktop/DesktopLayout';
import { MobileLayout } from './layouts/Mobile/MobileLayout';

export const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 320);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 376);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout />;
};