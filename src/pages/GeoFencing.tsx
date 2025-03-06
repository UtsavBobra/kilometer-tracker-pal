
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Search, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import MapView from '@/components/ui/MapView';
import { GeoFence } from '@/types';

// Mock data
const mockGeoFences: GeoFence[] = [
  { id: '1', name: 'New York Office', latitude: 40.7128, longitude: -74.0060, radius: 100 },
  { id: '2', name: 'Queens Site', latitude: 40.7282, longitude: -73.7949, radius: 150 },
  { id: '3', name: 'Brooklyn HQ', latitude: 40.7061, longitude: -73.9969, radius: 200 },
];

const mockUnnamedLocations = [
  { id: '4', latitude: 40.6782, longitude: -73.9442, visits: 5 },
  { id: '5', latitude: 40.7831, longitude: -73.9712, visits: 3 },
];

const GeoFencing = () => {
  const [geoFences, setGeoFences] = useState<GeoFence[]>(mockGeoFences);
  const [unnamedLocations, setUnnamedLocations] = useState(mockUnnamedLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGeoFence, setCurrentGeoFence] = useState<GeoFence | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    document.title = 'Geo-Fencing | KilometerTracker';
    
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddNew = () => {
    setCurrentGeoFence({
      id: '',
      name: '',
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 100
    });
    setNewName('');
    setDialogOpen(true);
  };

  const handleEditGeoFence = (geoFence: GeoFence) => {
    setCurrentGeoFence(geoFence);
    setNewName(geoFence.name);
    setDialogOpen(true);
  };

  const handleSaveGeoFence = () => {
    if (!currentGeoFence || !newName.trim()) return;
    
    if (currentGeoFence.id) {
      // Update existing
      setGeoFences(geoFences.map(gf => 
        gf.id === currentGeoFence.id ? { ...gf, name: newName } : gf
      ));
    } else {
      // Add new
      const newGeoFence: GeoFence = {
        ...currentGeoFence,
        id: `new-${Date.now()}`,
        name: newName
      };
      setGeoFences([...geoFences, newGeoFence]);
    }
    
    setDialogOpen(false);
  };

  const handleDeleteGeoFence = (id: string) => {
    setGeoFences(geoFences.filter(gf => gf.id !== id));
  };

  const handleNameUnnamedLocation = (location: typeof mockUnnamedLocations[0]) => {
    setCurrentGeoFence({
      id: '',
      name: '',
      latitude: location.latitude,
      longitude: location.longitude,
      radius: 100
    });
    setNewName('');
    setDialogOpen(true);
  };

  const filteredGeoFences = searchTerm 
    ? geoFences.filter(gf => gf.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : geoFences;

  return (
    <div className="container max-w-lg px-4 pt-4 pb-8">
      <div className="space-y-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Geo Fencing</h3>
            <Button onClick={handleAddNew} size="sm" className="h-8">
              <Plus size={14} className="mr-2" />
              Add New
            </Button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search locations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Tabs defaultValue="named">
            <TabsList className="mb-4 grid grid-cols-2 w-full">
              <TabsTrigger value="named">Named Locations</TabsTrigger>
              <TabsTrigger value="unnamed">Unnamed Locations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="named">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 border rounded-lg animate-pulse">
                      <div className="flex justify-between">
                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="flex space-x-2">
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {filteredGeoFences.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin size={32} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No locations found</p>
                    </div>
                  ) : (
                    filteredGeoFences.map((geoFence) => (
                      <motion.div 
                        key={geoFence.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 border rounded-lg hover:border-primary/20 hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">{geoFence.name}</h4>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => handleEditGeoFence(geoFence)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteGeoFence(geoFence.id)}
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {geoFence.latitude.toFixed(4)}, {geoFence.longitude.toFixed(4)}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unnamed">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-3 border rounded-lg animate-pulse">
                      <div className="flex justify-between">
                        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {unnamedLocations.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin size={32} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">No unnamed locations</p>
                    </div>
                  ) : (
                    unnamedLocations.map((location) => (
                      <motion.div 
                        key={location.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 border rounded-lg hover:border-primary/20 hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-muted-foreground">Unnamed Location</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 text-primary"
                            onClick={() => handleNameUnnamedLocation(location)}
                          >
                            <Plus size={14} className="mr-1.5" />
                            Name It
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Visited {location.visits} {location.visits === 1 ? 'time' : 'times'}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentGeoFence?.id ? 'Edit Location' : 'Add New Location'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location Name</label>
              <Input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Office, Warehouse, Client Site"
              />
            </div>
            
            {currentGeoFence && (
              <div className="h-44 rounded-lg overflow-hidden">
                <MapView 
                  center={[currentGeoFence.longitude, currentGeoFence.latitude]}
                  zoom={14}
                  markers={[{
                    id: 'location',
                    longitude: currentGeoFence.longitude,
                    latitude: currentGeoFence.latitude
                  }]}
                  className="h-full"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveGeoFence} disabled={!newName.trim()}>
              Save Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GeoFencing;
