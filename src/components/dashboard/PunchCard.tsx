
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import MapView from '@/components/ui/MapView';
import { useToast } from '@/hooks/use-toast';

type PunchType = 'in' | 'mid' | 'out';

interface PunchCardProps {
  onPunch: (type: PunchType) => void;
  currentStatus: 'not-started' | 'in-progress' | 'complete';
}

const PunchCard = ({ onPunch, currentStatus }: PunchCardProps) => {
  const [punchType, setPunchType] = useState<PunchType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();

  const getPunchOptions = () => {
    switch (currentStatus) {
      case 'not-started':
        return [{ type: 'in', label: 'Punch In', color: 'bg-emerald-500' }];
      case 'in-progress':
        return [
          { type: 'mid', label: 'Mid Punch', color: 'bg-amber-500' },
          { type: 'out', label: 'Punch Out', color: 'bg-rose-500' }
        ];
      case 'complete':
        return [];
      default:
        return [];
    }
  };

  const handlePunchClick = (type: PunchType) => {
    setPunchType(type);
    
    // Check if geolocation is supported
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation([longitude, latitude]);
          setDialogOpen(true);
        },
        (error) => {
          toast({
            variant: 'destructive',
            title: 'Location error',
            description: 'Could not get your current location. Please enable location services.'
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Location not supported',
        description: 'Your browser does not support location services.'
      });
    }
  };

  const handleConfirmPunch = () => {
    setIsConfirming(true);
    
    // Simulate API call
    setTimeout(() => {
      if (punchType) {
        onPunch(punchType);
        setDialogOpen(false);
        setIsConfirming(false);
        
        toast({
          title: `${punchType === 'in' ? 'Punched in' : punchType === 'mid' ? 'Mid punch recorded' : 'Punched out'} successfully`,
          description: 'Your location has been recorded'
        });
      }
    }, 1000);
  };

  const options = getPunchOptions();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Punch Actions</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-1" />
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        {currentStatus === 'complete' ? (
          <div className="text-center py-4">
            <Check size={48} className="mx-auto mb-2 text-emerald-500" />
            <p className="text-muted-foreground">All punches completed for today</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <Button
                key={option.type}
                onClick={() => handlePunchClick(option.type as PunchType)}
                className={`h-14 transition-all duration-300 ${
                  option.type === 'in' 
                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : option.type === 'mid'
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : 'bg-rose-500 hover:bg-rose-600'
                }`}
              >
                <span className="mr-2">{option.label}</span>
                <MapPin size={14} />
              </Button>
            ))}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Confirm Your Location</DialogTitle>
              <DialogDescription>
                Please verify your current location is correct before confirming.
              </DialogDescription>
            </DialogHeader>
            
            <div className="h-64 my-4 rounded-lg overflow-hidden">
              {location && (
                <MapView 
                  center={location}
                  zoom={14}
                  markers={[{ id: 'current', longitude: location[0], latitude: location[1] }]}
                  interactive={true}
                  className="h-full"
                />
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmPunch}
                disabled={isConfirming}
                className={
                  punchType === 'in' 
                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : punchType === 'mid'
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : 'bg-rose-500 hover:bg-rose-600'
                }
              >
                {isConfirming ? (
                  <>
                    <span className="mr-2">Processing</span>
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                  </>
                ) : (
                  <>
                    <span>Confirm Location</span>
                    <Check size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </>
  );
};

export default PunchCard;
