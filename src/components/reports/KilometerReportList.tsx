
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpDown, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportLocationHistory from '@/components/reports/ReportLocationHistory';
import { Location } from '@/types';

interface Report {
  id: string;
  user: string;
  date: string;
  distance: number;
  locations: string[];
  trips: number;
  startTime: string;
  endTime: string;
}

interface KilometerReportListProps {
  loading: boolean;
  reports: Report[];
  locationMap: Record<string, Location>;
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
}

const KilometerReportList = ({ 
  loading, 
  reports, 
  locationMap, 
  sortOrder, 
  onSortChange 
}: KilometerReportListProps) => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Helper function to get location name by ID
  const getLocationName = (locationId: string): string => {
    const location = locationMap[locationId];
    return location ? location.name || 'Unknown Location' : 'Unknown Location';
  };

  // Get location object by ID
  const getLocationById = (locationId: string): Location => {
    return locationMap[locationId] || {
      latitude: 0,
      longitude: 0,
      timestamp: new Date().toISOString(),
      name: 'Unknown Location'
    };
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Results</h3>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8" onClick={onSortChange}>
            <ArrowUpDown size={14} className="mr-2" />
            {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <ListFilter size={14} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
        {reports.map((report) => (
          <motion.div 
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 border rounded-lg hover:border-primary/20 hover:bg-primary/5 transition-colors cursor-pointer ${
              selectedReport === report.id ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{report.user}</h4>
              <span className="text-sm text-muted-foreground">{report.date}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock size={14} className="mr-1" />
                {report.startTime} - {report.endTime}
              </span>
              <span className="font-bold">{report.distance} km</span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <MapPin size={12} className="mr-1" />
              <span>{report.trips} trips • {report.locations.length} locations</span>
            </div>
            
            <div className="text-xs text-muted-foreground flex flex-wrap">
              {report.locations.map((locationId, idx) => (
                <span key={idx} className="mr-1">
                  {getLocationName(locationId)}{idx < report.locations.length - 1 ? ' → ' : ''}
                </span>
              ))}
            </div>
            
            {selectedReport === report.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t"
              >
                <ReportLocationHistory 
                  locations={report.locations.map(id => getLocationById(id))}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KilometerReportList;
