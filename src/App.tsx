import { useState, useEffect } from 'react';

import { DesktopLayout } from './Layouts/Desktop/DesktopLayout';
import { MobileLayout } from './Layouts/Mobile/MobileLayout';

export const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 320);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 320);
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