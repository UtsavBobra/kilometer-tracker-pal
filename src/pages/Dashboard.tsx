
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PunchCard from '@/components/dashboard/PunchCard';
import KilometerSummary from '@/components/dashboard/KilometerSummary';
import LocationHistory from '@/components/dashboard/LocationHistory';
import { Trip, DailyStats, PunchRecord, Location } from '@/types';

// Mock data for demonstration
const mockLocations: Location[] = [
  { latitude: 40.7128, longitude: -74.0060, timestamp: new Date().toISOString(), name: 'New York Office' },
  { latitude: 40.7282, longitude: -73.7949, timestamp: new Date().toISOString(), name: 'Queens Site' },
  { latitude: 40.7061, longitude: -73.9969, timestamp: new Date().toISOString(), name: 'Brooklyn HQ' },
];

const mockTrips: Trip[] = [
  {
    id: '1',
    userId: 'user1',
    startLocation: mockLocations[0],
    endLocation: mockLocations[1],
    startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    endTime: new Date().toISOString(),
    distance: 12.5,
    isComplete: true,
  }
];

const Dashboard = () => {
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    date: new Date().toISOString().split('T')[0],
    totalDistance: 12.5,
    trips: mockTrips,
    status: 'in-progress',
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Dashboard | KilometerTracker';
    
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePunch = (type: 'in' | 'mid' | 'out') => {
    const now = new Date();
    const location = {
      latitude: 40.7128 + (Math.random() * 0.1),
      longitude: -74.0060 + (Math.random() * 0.1),
      timestamp: now.toISOString(),
    };
    
    // Create punch record
    const punchRecord: PunchRecord = {
      id: `punch-${Date.now()}`,
      userId: 'user1',
      type,
      timestamp: now.toISOString(),
      location,
    };
    
    // Update daily stats based on punch type
    if (type === 'in') {
      // Starting a new trip
      setDailyStats({
        ...dailyStats,
        status: 'in-progress',
        trips: [
          ...dailyStats.trips,
          {
            id: `trip-${Date.now()}`,
            userId: 'user1',
            startLocation: location,
            // Placeholder end location same as start initially
            endLocation: location,
            startTime: now.toISOString(),
            endTime: now.toISOString(),
            distance: 0,
            isComplete: false,
          }
        ]
      });
    } else if (type === 'mid') {
      // Ending current trip and starting a new one
      const updatedTrips = [...dailyStats.trips];
      
      if (updatedTrips.length > 0) {
        // Complete the last trip
        const lastTrip = { ...updatedTrips[updatedTrips.length - 1] };
        lastTrip.endLocation = location;
        lastTrip.endTime = now.toISOString();
        lastTrip.isComplete = true;
        
        // Calculate distance (mock for demo)
        lastTrip.distance = 5 + Math.random() * 10;
        
        updatedTrips[updatedTrips.length - 1] = lastTrip;
        
        // Start a new trip
        updatedTrips.push({
          id: `trip-${Date.now()}`,
          userId: 'user1',
          startLocation: location,
          endLocation: location, // Placeholder end location
          startTime: now.toISOString(),
          endTime: now.toISOString(),
          distance: 0,
          isComplete: false,
        });
        
        // Update total distance
        const totalDistance = updatedTrips.reduce(
          (sum, trip) => sum + (trip.isComplete ? trip.distance : 0), 
          0
        );
        
        setDailyStats({
          ...dailyStats,
          totalDistance,
          trips: updatedTrips,
          status: 'in-progress',
        });
      }
    } else if (type === 'out') {
      // Ending current trip and day
      const updatedTrips = [...dailyStats.trips];
      
      if (updatedTrips.length > 0) {
        // Complete the last trip
        const lastTrip = { ...updatedTrips[updatedTrips.length - 1] };
        lastTrip.endLocation = location;
        lastTrip.endTime = now.toISOString();
        lastTrip.isComplete = true;
        
        // Calculate distance (mock for demo)
        lastTrip.distance = 5 + Math.random() * 10;
        
        updatedTrips[updatedTrips.length - 1] = lastTrip;
        
        // Update total distance
        const totalDistance = updatedTrips.reduce(
          (sum, trip) => sum + (trip.isComplete ? trip.distance : 0), 
          0
        );
        
        setDailyStats({
          ...dailyStats,
          totalDistance,
          trips: updatedTrips,
          status: 'complete',
        });
      }
    }
  };

  return (
    <div className="container max-w-lg px-4 pt-4 pb-8">
      <div className="space-y-5">
        <PunchCard 
          onPunch={handlePunch} 
          currentStatus={dailyStats.status}
        />
        
        <KilometerSummary 
          dailyDistance={dailyStats.totalDistance}
          tripCount={dailyStats.trips.filter(t => t.isComplete).length}
          loading={loading}
        />
        
        <LocationHistory 
          trips={dailyStats.trips.filter(t => t.isComplete)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
