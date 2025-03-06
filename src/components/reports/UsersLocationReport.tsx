
import { useState } from 'react';
import { User, MapPin, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MapView from '@/components/ui/MapView';
import { User as UserType, Location } from '@/types';

// Mock user data for demonstration
const mockUsers = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'user' as const,
    lastLocation: { 
      latitude: 40.7128, 
      longitude: -74.0060, 
      timestamp: '2023-06-20T15:30:00Z',
      name: 'New York Office'
    }
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'user' as const,
    lastLocation: { 
      latitude: 40.6782, 
      longitude: -73.9442, 
      timestamp: '2023-06-20T16:45:00Z',
      name: 'Brooklyn HQ'
    }
  },
  { 
    id: '3', 
    name: 'Robert Johnson', 
    email: 'robert@example.com', 
    role: 'user' as const,
    lastLocation: { 
      latitude: 40.7831, 
      longitude: -73.9712, 
      timestamp: '2023-06-20T14:20:00Z',
      name: 'Manhattan Site'
    }
  },
  { 
    id: '4', 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    role: 'user' as const,
    lastLocation: { 
      latitude: 40.7282, 
      longitude: -73.7949, 
      timestamp: '2023-06-20T17:10:00Z',
      name: 'Queens Site'
    }
  }
];

interface UsersLocationReportProps {
  loading?: boolean;
}

const UsersLocationReport = ({ loading = false }: UsersLocationReportProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-64 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUserData = selectedUser 
    ? mockUsers.find(user => user.id === selectedUser)
    : null;

  const markers = selectedUserData 
    ? [{ 
        id: selectedUserData.id, 
        longitude: selectedUserData.lastLocation.longitude, 
        latitude: selectedUserData.lastLocation.latitude 
      }]
    : filteredUsers.map(user => ({ 
        id: user.id, 
        longitude: user.lastLocation.longitude, 
        latitude: user.lastLocation.latitude 
      }));

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }) + ' - ' + date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="h-64 rounded-lg overflow-hidden border">
        <MapView 
          markers={markers}
          onMarkerClick={(id) => setSelectedUser(id === selectedUser ? null : id)}
          zoom={12}
          interactive={true}
        />
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                selectedUser === user.id 
                  ? 'border-primary/30 bg-primary/5' 
                  : 'border-border hover:bg-secondary/50'
              }`}
              onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <User size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="text-xs flex items-center text-muted-foreground">
                  <Clock size={12} className="mr-1" />
                  {formatTime(user.lastLocation.timestamp)}
                </div>
              </div>
              
              <div className="ml-11 flex items-center text-xs">
                <MapPin size={12} className="mr-1 text-primary" />
                <span>{user.lastLocation.name}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <User size={40} className="mx-auto mb-2 opacity-20" />
            <p>No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersLocationReport;
