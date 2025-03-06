
import { Location } from '@/types';

// Mocked location data
export const geoFencingLocations = [
  { id: '1', name: 'New York Office', latitude: 40.7128, longitude: -74.0060, timestamp: '2023-06-20T09:00:00Z' },
  { id: '2', name: 'Brooklyn HQ', latitude: 40.6782, longitude: -73.9442, timestamp: '2023-06-20T10:30:00Z' },
  { id: '3', name: 'Queens Site', latitude: 40.7282, longitude: -73.7949, timestamp: '2023-06-20T12:15:00Z' },
  { id: '4', name: 'Manhattan Site', latitude: 40.7831, longitude: -73.9712, timestamp: '2023-06-20T14:00:00Z' },
  { id: '5', name: 'Jersey City Site', latitude: 40.7178, longitude: -74.0431, timestamp: '2023-06-20T15:30:00Z' },
  { id: '6', name: 'Newark Office', latitude: 40.7357, longitude: -74.1724, timestamp: '2023-06-20T16:45:00Z' },
  { id: '7', name: 'Long Island Office', latitude: 40.7891, longitude: -73.1350, timestamp: '2023-06-20T18:00:00Z' },
];

export const reportsData = [
  {
    id: '1',
    user: 'John Doe',
    date: '2023-06-20',
    distance: 32.5,
    locations: ['1', '3', '2'], // References to geoFencingLocations
    trips: 3,
    startTime: '08:30',
    endTime: '17:45'
  },
  {
    id: '2',
    user: 'Jane Smith',
    date: '2023-06-20',
    distance: 28.7,
    locations: ['2', '4', '7'], // References to geoFencingLocations
    trips: 2,
    startTime: '09:15',
    endTime: '16:30'
  },
  {
    id: '3',
    user: 'Robert Johnson',
    date: '2023-06-20',
    distance: 45.2,
    locations: ['1', '5', '6'], // References to geoFencingLocations
    trips: 4,
    startTime: '07:45',
    endTime: '18:20'
  }
];

// Create weekly summary data
export const weeklyData = [
  { day: 'Mon', distance: 32.5, trips: 3 },
  { day: 'Tue', distance: 28.7, trips: 2 },
  { day: 'Wed', distance: 45.2, trips: 4 },
  { day: 'Thu', distance: 38.1, trips: 3 },
  { day: 'Fri', distance: 22.6, trips: 2 },
  { day: 'Sat', distance: 5.3, trips: 1 },
  { day: 'Sun', distance: 0, trips: 0 },
];

// Create monthly summary data
export const monthlyData = [
  { week: 'Week 1', distance: 172.4, trips: 14 },
  { week: 'Week 2', distance: 185.7, trips: 16 },
  { week: 'Week 3', distance: 145.2, trips: 12 },
  { week: 'Week 4', distance: 98.6, trips: 8 }
];

// Create yearly summary data
export const yearlyData = [
  { month: 'Jan', distance: 420.5 },
  { month: 'Feb', distance: 380.2 },
  { month: 'Mar', distance: 450.8 },
  { month: 'Apr', distance: 510.3 },
  { month: 'May', distance: 580.1 },
  { month: 'Jun', distance: 602.4 },
  { month: 'Jul', distance: 0 },
  { month: 'Aug', distance: 0 },
  { month: 'Sep', distance: 0 },
  { month: 'Oct', distance: 0 },
  { month: 'Nov', distance: 0 },
  { month: 'Dec', distance: 0 }
];

// Helper function to transform location IDs to location map for easy lookup
export const createLocationMap = (): Record<string, Location> => {
  return geoFencingLocations.reduce<Record<string, Location>>((acc, location) => {
    acc[location.id] = location;
    return acc;
  }, {});
};
