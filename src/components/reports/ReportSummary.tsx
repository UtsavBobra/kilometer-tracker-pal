
import { motion } from 'framer-motion';

// Chart data types
interface DayData {
  day: string;
  distance: number;
  trips: number;
}

interface WeekData {
  week: string;
  distance: number;
  trips: number;
}

interface MonthData {
  month: string;
  distance: number;
}

interface ReportSummaryProps {
  period: string;
  weeklyData: DayData[];
  monthlyData: WeekData[];
  yearlyData: MonthData[];
}

const ReportSummary = ({ period, weeklyData, monthlyData, yearlyData }: ReportSummaryProps) => {
  // For daily period, no chart is shown
  if (period === 'daily') return null;
  
  // For weekly period, show bar chart
  if (period === 'weekly') {
    return (
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
    );
  }
  
  // For monthly period, show week summary
  if (period === 'monthly') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 rounded-xl"
      >
        <h3 className="font-medium mb-4">Monthly Summary</h3>
        <div className="h-48">
          <div className="flex h-full items-end space-x-2">
            {monthlyData.map((week) => (
              <div key={week.week} className="flex flex-col items-center flex-1">
                <div className="w-full bg-gray-200 rounded-t-sm relative" 
                  style={{ height: `${(week.distance / 200) * 100}%`, minHeight: '10px' }}>
                  {week.distance > 0 && (
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                      {week.distance}km
                    </span>
                  )}
                </div>
                <div className="text-xs mt-2 text-muted-foreground">{week.week}</div>
                <div className="text-xs font-medium">{week.trips} trips</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
  
  // For yearly period, show month summary
  if (period === 'yearly') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5 rounded-xl"
      >
        <h3 className="font-medium mb-4">Yearly Summary</h3>
        <div className="h-48">
          <div className="flex h-full items-end space-x-1">
            {yearlyData.map((month) => (
              <div key={month.month} className="flex flex-col items-center flex-1">
                <div className="w-full bg-gray-200 rounded-t-sm relative" 
                  style={{ height: `${(month.distance / 700) * 100}%`, minHeight: '10px' }}>
                  {month.distance > 0 && (
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                      {month.distance}
                    </span>
                  )}
                </div>
                <div className="text-xs mt-2 text-muted-foreground">{month.month}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
  
  return null;
};

export default ReportSummary;
