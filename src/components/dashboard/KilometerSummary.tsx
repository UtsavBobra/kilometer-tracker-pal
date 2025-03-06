
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, ArrowUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface KilometerSummaryProps {
  dailyDistance: number;
  dailyTarget?: number;
  tripCount: number;
  loading?: boolean;
}

const KilometerSummary = ({
  dailyDistance = 0,
  dailyTarget = 50,
  tripCount = 0,
  loading = false
}: KilometerSummaryProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const percentage = Math.min((dailyDistance / dailyTarget) * 100, 100);
      setProgress(percentage);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [dailyDistance, dailyTarget]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 rounded-xl animate-pulse"
      >
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 rounded-xl"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium">Today's Distance</h3>
        <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full flex items-center">
          <Clock size={12} className="mr-1" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="flex items-baseline mb-3">
        <span className="text-3xl font-bold mr-1">{dailyDistance.toFixed(1)}</span>
        <span className="text-lg text-muted-foreground">km</span>
        <div className="ml-2 text-xs text-emerald-500 flex items-center font-medium">
          <ArrowUp size={12} className="mr-0.5" />
          <span>3.2%</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="text-muted-foreground">
            {Math.round(progress)}% of daily target
          </span>
          <span className="font-medium">{dailyDistance.toFixed(1)} / {dailyTarget} km</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-primary/5 rounded-lg p-3 flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Car size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Trips</p>
            <p className="font-semibold">{tripCount}</p>
          </div>
        </div>
        <div className="bg-primary/5 rounded-lg p-3 flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Clock size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Speed</p>
            <p className="font-semibold">{tripCount > 0 ? '42 km/h' : '0 km/h'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KilometerSummary;
