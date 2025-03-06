
import { motion } from 'framer-motion';
import KilometerReportList from './KilometerReportList';
import UsersLocationReport from './UsersLocationReport';
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

interface ReportResultsProps {
  loading: boolean;
  reportCategory: 'kilometer' | 'location';
  reports: Report[];
  locationMap: Record<string, Location>;
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
}

const ReportResults = ({
  loading,
  reportCategory,
  reports,
  locationMap,
  sortOrder,
  onSortChange
}: ReportResultsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5 rounded-xl"
    >
      {reportCategory === 'kilometer' ? (
        <KilometerReportList 
          loading={loading}
          reports={reports}
          locationMap={locationMap}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      ) : (
        <div>
          <h3 className="font-medium mb-4">Results</h3>
          <UsersLocationReport loading={loading} />
        </div>
      )}
    </motion.div>
  );
};

export default ReportResults;
