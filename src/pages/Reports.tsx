
import { useState, useEffect } from 'react';
import { Calendar, ListFilter, Users, User, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reportsData = [
  {
    id: '1',
    user: 'John Doe',
    date: '2023-06-20',
    distance: 32.5,
    locations: ['New York Office', 'Queens Site', 'Brooklyn HQ'],
    trips: 3
  },
  {
    id: '2',
    user: 'Jane Smith',
    date: '2023-06-20',
    distance: 28.7,
    locations: ['Brooklyn HQ', 'Manhattan Site', 'Long Island Office'],
    trips: 2
  },
  {
    id: '3',
    user: 'Robert Johnson',
    date: '2023-06-20',
    distance: 45.2,
    locations: ['New York Office', 'Jersey City Site', 'Newark Office'],
    trips: 4
  }
];

const Reports = () => {
  const [reportType, setReportType] = useState('self');
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Reports | KilometerTracker';
    
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container max-w-lg px-4 pt-4 pb-8">
      <div className="space-y-5">
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
            
            <Button className="w-full">
              <BarChart size={16} className="mr-2" />
              Generate Report
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Results</h3>
            <Button variant="outline" size="sm" className="h-8">
              <ListFilter size={14} className="mr-2" />
              Filter
            </Button>
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
              {reportsData.map((report) => (
                <motion.div 
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg hover:border-primary/20 hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{report.user}</h4>
                    <span className="text-sm text-muted-foreground">{report.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">
                      {report.trips} trips • {report.locations.length} locations
                    </span>
                    <span className="font-bold">{report.distance} km</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground flex flex-wrap">
                    {report.locations.map((location, idx) => (
                      <span key={idx} className="mr-1">
                        {location}{idx < report.locations.length - 1 ? ' → ' : ''}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
