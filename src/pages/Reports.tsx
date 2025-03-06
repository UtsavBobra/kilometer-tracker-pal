
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BottomNavigation from '@/components/layout/BottomNavigation';

// Import refactored components
import ReportOptions from '@/components/reports/ReportOptions';
import ReportSummary from '@/components/reports/ReportSummary';
import ReportResults from '@/components/reports/ReportResults';

// Import report data
import { 
  reportsData, 
  geoFencingLocations, 
  weeklyData, 
  monthlyData, 
  yearlyData,
  createLocationMap
} from '@/components/reports/ReportData';

const Reports = () => {
  const [reportCategory, setReportCategory] = useState<'kilometer' | 'location'>('kilometer');
  const [reportType, setReportType] = useState('self');
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Create location map for easy lookup
  const locationMap = createLocationMap();

  useEffect(() => {
    document.title = 'Reports | KilometerTracker';
    
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
        >
          <ReportOptions 
            reportCategory={reportCategory}
            setReportCategory={setReportCategory}
            reportType={reportType}
            setReportType={setReportType}
            period={period}
            setPeriod={setPeriod}
          />
        </motion.div>
        
        {reportCategory === 'kilometer' && (
          <ReportSummary 
            period={period}
            weeklyData={weeklyData}
            monthlyData={monthlyData}
            yearlyData={yearlyData}
          />
        )}
        
        <ReportResults 
          loading={loading}
          reportCategory={reportCategory}
          reports={sortedReports}
          locationMap={locationMap}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Reports;
