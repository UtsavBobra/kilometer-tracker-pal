
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Clock, BarChart, Settings, Users } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Map size={20} />, label: 'Dashboard', path: '/' },
    { icon: <BarChart size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Clock size={20} />, label: 'Geo-Fencing', path: '/geofencing' },
    { icon: <Users size={20} />, label: 'Users', path: '/users' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
  ];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-border shadow-sm px-2 py-2"
    >
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors relative"
            >
              <div className={`mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.icon}
              </div>
              <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
