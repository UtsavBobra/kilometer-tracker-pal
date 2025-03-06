
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, Menu, X, Map, BarChart, Settings, Users } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: <Map size={18} />, path: '/' },
    { title: 'Reports', icon: <BarChart size={18} />, path: '/reports' },
    { title: 'Geo-Fencing', icon: <Map size={18} />, path: '/geofencing' },
    { title: 'Manual Entry', icon: <Map size={18} />, path: '/manual-entry' },
    { title: 'Users', icon: <Users size={18} />, path: '/users' },
    { title: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const getTitle = () => {
    const currentPath = location.pathname;
    const currentMenu = menuItems.find((item) => item.path === currentPath);
    return currentMenu ? currentMenu.title : 'Dashboard';
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm px-4 h-16 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-6 border-b border-border">
              <SheetTitle className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>KilometerTracker</span>
              </SheetTitle>
            </SheetHeader>
            <div className="py-4">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-6 py-3 space-x-3 hover:bg-muted transition-colors ${
                    location.pathname === item.path ? 'text-primary font-medium bg-primary/5' : 'text-foreground'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {location.pathname === item.path && (
                    <div className="ml-auto w-1 h-6 bg-primary rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <h1 className="font-medium">KilometerTracker</h1>
        </div>
        <div className="h-5 border-r border-border hidden lg:block"></div>
        <h2 className="text-lg font-medium">{getTitle()}</h2>
      </div>

      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground"
        >
          <LogOut size={18} />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
        </Avatar>
      </div>
    </motion.header>
  );
};

export default Navbar;
