
import { useState, useEffect } from 'react';
import { Calendar, ListFilter, Users, User, BarChart, MapPin, Download, Clock, ArrowUpDown, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/layout/BottomNavigation';
import ReportLocationHistory from '@/components/reports/ReportLocationHistory';

// Mocked location data
const geoFencingLocations = [
  { id: '1', name: 'New York Office', latitude: 40.7128, longitude: -74.0060 },
  { id: '2', name: 'Brooklyn HQ', latitude: 40.6782, longitude: -73.9442 },
  { id: '3', name: 'Queens Site', latitude: 40.7282, longitude: -73.7949 },
  { id: '4', name: 'Manhattan Site', latitude: 40.7831, longitude: -73.9712 },
  { id: '5', name: 'Jersey City Site', latitude: 40.7178, longitude: -74.0431 },
  { id: '6', name: 'Newark Office', latitude: 40.7357, longitude: -74.1724 },
  { id: '7', name: 'Long Island Office', latitude: 40.7891, longitude: -73.1350 },
];

const reportsData = [
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
const weeklyData = [
  { day: 'Mon', distance: 32.5, trips: 3 },
  { day: 'Tue', distance: 28.7, trips: 2 },
  { day: 'Wed', distance: 45.2, trips: 4 },
  { day: 'Thu', distance: 38.1, trips: 3 },
  { day: 'Fri', distance: 22.6, trips: 2 },
  { day: 'Sat', distance: 5.3, trips: 1 },
  { day: 'Sun', distance: 0, trips: 0 },
];

const Reports = () => {
  const [reportType, setReportType] = useState('self');
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Reports | KilometerTracker';
    
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "Your report has been exported to CSV successfully."
    });
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Function to get location name by ID
  const getLocationName = (locationId: string) => {
    const location = geoFencingLocations.find(loc => loc.id === locationId);
    return location ? location.name : 'Unknown Location';
  };

  // Sort reports based on current sort order
  const sortedReports = [...reportsData].sort((a, b) => {
    return sortOrder === 'asc' 
      ? a.distance - b.distance 
      : b.distance - a.distance;
  });

  return (
    <div className="container max-w-3xl px-4 pt-4 pb-20">
      <div className="space-y-5 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-xl"
        >
          <h3 className="font-medium mb-4">Report Options</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Report Type</label>
              <Tabs defaultValue="self" value={reportType} onValueChange={setReportType} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="self">
                    <User size={16} className="mr-2" />
                    Self Report
                  </TabsTrigger>
                  <TabsTrigger value="all">
                    <Users size={16} className="mr-2" />
                    All Users
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Time Period</label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <SelectValue placeholder="Select period" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button className="flex-1">
                <BarChart size={16} className="mr-2" />
                Generate Report
              </Button>
              
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download size={16} />
              </Button>
            </div>
          </div>
        </motion.div>
        
        {period === 'weekly' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5 rounded-xl"
          >
            <h3 className="font-medium mb-4">Weekly Summary</h3>
            <div className="h-48">
              <div className="flex h-full items-end space-x-2">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-gray-200 rounded-t-sm relative" 
                      style={{ height: `${(day.distance / 50) * 100}%`, minHeight: '10px' }}>
                      {day.distance > 0 && (
                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                          {day.distance}km
                        </span>
                      )}
                    </div>
                    <div className="text-xs mt-2 text-muted-foreground">{day.day}</div>
                    <div className="text-xs font-medium">{day.trips} trips</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Results</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8" onClick={handleSortChange}>
                <ArrowUpDown size={14} className="mr-2" />
                {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <ListFilter size={14} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-lg animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {sortedReports.map((report) => (
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
                        locations={report.locations.map(id => {
                          const loc = geoFencingLocations.find(l => l.id === id);
                          return loc || geoFencingLocations[0]; // Fallback to first location if not found
                        })}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Reports;
