
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Index = () => {
  // In a real app, we would check authentication here
  // For now, we'll redirect to login, which would normally only happen if not authenticated
  
  // Comment this line and uncomment the Layout section below when authentication is implemented
  return <Navigate to="/login" replace />;
  
  /* When authentication is implemented, use this:
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Kilometer Tracker</h1>
        <p className="text-muted-foreground mb-6">
          Track your kilometers, manage locations, and view detailed reports
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          <NavigationCard 
            title="Dashboard" 
            description="View summary and punch in/out"
            icon="layout-dashboard"
            to="/dashboard"
          />
          <NavigationCard 
            title="Reports" 
            description="View detailed reports"
            icon="file-text"
            to="/reports"
          />
          <NavigationCard 
            title="Geo Fencing" 
            description="Manage location boundaries"
            icon="map-pin"
            to="/geofencing"
          />
          <NavigationCard 
            title="Manual Entry" 
            description="Add kilometers manually"
            icon="pencil"
            to="/manual-entry"
          />
        </div>
      </div>
    </Layout>
  );
  */
};

/* Uncomment when implementing the full index page
const NavigationCard = ({ 
  title, 
  description, 
  icon, 
  to 
}: { 
  title: string; 
  description: string; 
  icon: string; 
  to: string;
}) => {
  return (
    <Link to={to} className="glass-card p-4 flex items-center space-x-4 hover:scale-105 transition-transform">
      <div className="bg-primary/10 p-3 rounded-full">
        <Icon name={icon} className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};
*/

export default Index;
