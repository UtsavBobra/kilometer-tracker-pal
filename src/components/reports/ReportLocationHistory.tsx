
import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import MapView from '@/components/ui/MapView';
import { Location } from '@/types';

interface ReportLocationHistoryProps {
  locations: Location[];
}

const ReportLocationHistory = ({ locations }: ReportLocationHistoryProps) => {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0);
  
  const markers = locations.map((location, index) => ({
    id: `loc-${index}`,
    longitude: location.longitude,
    latitude: location.latitude,
    color: index === selectedLocationIndex ? '#10b981' : '#6b7280'
  }));

  // Calculate the center of the map based on all locations
  const getMapCenter = (): [number, number] => {
    if (locations.length === 0) return [-74.5, 40]; // Default
    
    if (locations.length === 1) {
      return [locations[0].longitude, locations[0].latitude];
    }
    
    // Set center to the currently selected location
    return [locations[selectedLocationIndex].longitude, locations[selectedLocationIndex].latitude];
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Location History</h4>
      
      <div className="h-44 mb-2 overflow-hidden rounded-lg border">
        <MapView 
          center={getMapCenter()}
          markers={markers}
          className="h-full"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => setSelectedLocationIndex(index)}
            className={`p-2 rounded-md text-xs flex flex-col items-center justify-center text-center transition-colors ${
              selectedLocationIndex === index 
                ? 'bg-primary/10 border border-primary/30 text-primary' 
                : 'bg-secondary border border-border text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            <MapPin size={14} className="mb-1" />
            <span className="line-clamp-2">{location.name || `Location ${index + 1}`}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportLocationHistory;
