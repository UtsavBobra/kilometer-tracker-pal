
export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: string;
  name?: string;
}

export interface PunchRecord {
  id: string;
  userId: string;
  type: 'in' | 'mid' | 'out';
  timestamp: string;
  location: Location;
}

export interface Trip {
  id: string;
  userId: string;
  startLocation: Location;
  endLocation: Location;
  startTime: string;
  endTime: string;
  distance: number; // in kilometers
  isComplete: boolean;
}

export interface DailyStats {
  date: string;
  totalDistance: number;
  trips: Trip[];
  status: 'complete' | 'in-progress' | 'not-started';
}

export interface GeoFence {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
}

export interface Report {
  id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  period: string;
  totalDistance: number;
  tripCount: number;
  locations: Location[];
  generatedAt: string;
}
