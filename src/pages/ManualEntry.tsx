
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Clock, MapPin, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockedUsers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Robert Johnson' },
];

const ManualEntry = () => {
  const [entryType, setEntryType] = useState('self');
  const [date, setDate] = useState<Date>(new Date());
  const [distance, setDistance] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Manual Entry | KilometerTracker';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!distance || !startLocation || !endLocation || (entryType === 'all' && !selectedUser)) {
      toast({
        variant: 'destructive',
        title: 'Validation error',
        description: 'Please fill in all required fields'
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Entry added successfully',
        description: `${distance} km added for ${entryType === 'self' ? 'yourself' : mockedUsers.find(u => u.id === selectedUser)?.name}`
      });
      
      // Reset form
      setDistance('');
      setStartLocation('');
      setEndLocation('');
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container max-w-lg px-4 pt-4 pb-8">
      <div className="space-y-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Manual Kilometer Entry</h3>
          </div>
          
          <Tabs defaultValue="self" value={entryType} onValueChange={setEntryType} className="w-full mb-5">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="self">
                <User size={16} className="mr-2" />
                Self Entry
              </TabsTrigger>
              <TabsTrigger value="all">
                <Users size={16} className="mr-2" />
                For Other User
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {entryType === 'all' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select User</label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <SelectValue placeholder="Select user" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {mockedUsers.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between font-normal"
                  >
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {format(date, 'PPP')}
                    </div>
                    <span>▼</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Distance (km)</label>
              <div className="relative">
                <Input 
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  km
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Starting point"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">End Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Ending point"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2">Processing</span>
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-2" />
                  Add Kilometer Entry
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ManualEntry;
