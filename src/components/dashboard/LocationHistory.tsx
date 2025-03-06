
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import MapView from '@/components/ui/MapView';
import { Location, Trip } from '@/types';

interface LocationHistoryProps {
  trips: Trip[];
  loading?: boolean;
}

const LocationHistory = ({ trips = [], loading = false }: LocationHistoryProps) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 rounded-xl animate-pulse"
      >
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-40 w-full bg-gray-200 rounded mb-4"></div>
        <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-full bg-gray-200 rounded"></div>
      </motion.div>
    );
  }

  const hasTrips = trips.length > 0;
  
  // Extract markers from trips
  const getMarkers = () => {
    if (!selectedTrip) return [];
    
    return [
      { 
        id: 'start', 
        longitude: selectedTrip.startLocation.longitude, 
        latitude: selectedTrip.startLocation.latitude,
        color: '#10b981' // emerald-500
      },
      { 
        id: 'end', 
        longitude: selectedTrip.endLocation.longitude, 
        latitude: selectedTrip.endLocation.latitude,
        color: '#ef4444' // red-500
      }
    ];
  };
  
  // Get center point for map
  const getMapCenter = (): [number, number] => {
    if (!selectedTrip) return [-74.5, 40]; // Default
    
    // Center between start and end
    const lon = (selectedTrip.startLocation.longitude + selectedTrip.endLocation.longitude) / 2;
    const lat = (selectedTrip.startLocation.latitude + selectedTrip.endLocation.latitude) / 2;
    
    return [lon, lat];
  };
  
  // Format time for display
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Calculate trip duration in minutes
  const getTripDuration = (trip: Trip) => {
    const start = new Date(trip.startTime);
    const end = new Date(trip.endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    return diffMins;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Location History</h3>
      </div>
      
      {hasTrips ? (
        <>
          <div className="h-44 mb-4 overflow-hidden rounded-lg">
            <MapView 
              center={getMapCenter()}
              markers={getMarkers()}
              className="h-full"
            />
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar pr-2">
            {trips.map((trip) => (
              <div 
                key={trip.id}
                onClick={() => setSelectedTrip(trip)}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  selectedTrip?.id === trip.id 
                    ? 'border-primary/30 bg-primary/5' 
                    : 'border-border hover:bg-secondary/50'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm font-medium">
                    <Clock size={14} className="mr-1.5 text-muted-foreground" />
                    <span>{formatTime(trip.startTime)}</span>
                    <ArrowRight size={14} className="mx-1.5 text-muted-foreground" />
                    <span>{formatTime(trip.endTime)}</span>
                  </div>
                  <div className="text-xs font-medium bg-secondary px-2 py-0.5 rounded-full">
                    {getTripDuration(trip)} min
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1.5 text-emerald-500" />
                      <span className="text-sm truncate">{trip.startLocation.name || 'Start location'}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin size={14} className="mr-1.5 text-rose-500" />
                      <span className="text-sm truncate">{trip.endLocation.name || 'End location'}</span>
                    </div>
                  </div>
                  
                  <div className="text-lg font-semibold">
                    {trip.distance.toFixed(1)} <span className="text-sm text-muted-foreground">km</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <MapPin size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">No trips recorded today</p>
          <p className="text-sm text-muted-foreground/70">Punch in to start tracking your location</p>
        </div>
      )}
    </motion.div>
  );
};

export default LocationHistory;
