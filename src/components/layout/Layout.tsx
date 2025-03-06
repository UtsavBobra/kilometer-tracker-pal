
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNavigation from './BottomNavigation';
import { pageTransition } from '@/lib/animations';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className="flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <motion.main 
        key={location.pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransition}
        className="flex-1 pb-16 pt-16 overflow-x-hidden"
      >
        {children}
      </motion.main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
