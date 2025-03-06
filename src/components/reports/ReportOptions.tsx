
import { Calendar, BarChart, Users, User, MapPin, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ReportOptionsProps {
  reportCategory: 'kilometer' | 'location';
  setReportCategory: (value: 'kilometer' | 'location') => void;
  reportType: string;
  setReportType: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
}

const ReportOptions = ({
  reportCategory,
  setReportCategory,
  reportType,
  setReportType,
  period,
  setPeriod
}: ReportOptionsProps) => {
  const { toast } = useToast();

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "Your report has been exported to CSV successfully."
    });
  };

  return (
    <div className="glass-card p-5 rounded-xl">
      <h3 className="font-medium mb-4">Report Options</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Report Category</label>
          <Tabs 
            defaultValue="kilometer" 
            value={reportCategory} 
            onValueChange={(value) => setReportCategory(value as 'kilometer' | 'location')} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="kilometer">
                <BarChart size={16} className="mr-2" />
                Kilometer Report
              </TabsTrigger>
              <TabsTrigger value="location">
                <MapPin size={16} className="mr-2" />
                Location Report
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {reportCategory === 'kilometer' && (
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
        )}
        
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
    </div>
  );
};

export default ReportOptions;
