
import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    role: 'Field Agent',
    joinedDate: 'January 2023',
    avatar: '', // empty for fallback
  };
  
  useEffect(() => {
    document.title = 'Profile | KilometerTracker';
    
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    navigate('/login');
  };
  
  if (loading) {
    return (
      <div className="container max-w-md px-4 pt-4 pb-20">
        <div className="space-y-4 animate-pulse">
          <div className="h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-2/3"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-md px-4 pt-4 pb-20">
      <div className="space-y-5 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-xl"
        >
          <div className="flex flex-col items-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.role}</p>
            
            <div className="mt-4 w-full">
              <Button variant="outline" className="w-full">
                <User size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 rounded-xl"
        >
          <h3 className="font-medium mb-4">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail size={16} className="text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone size={16} className="text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin size={16} className="text-muted-foreground mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{user.location}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5 rounded-xl"
        >
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Settings size={16} className="mr-2" />
              Account Settings
            </Button>
            
            <Separator />
            
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
