
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2 } from 'lucide-react';

// Note: In production, this should be securely managed
// This is just a placeholder token - you'll need to replace it with your own
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xleWx5cG9vMDB3NjN4bnN3bjU2d2RoYyJ9.ykDI6A6h6UdHbn-xw1-gLQ';

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    longitude: number;
    latitude: number;
    color?: string;
  }>;
  onMarkerClick?: (id: string) => void;
  interactive?: boolean;
  showUserLocation?: boolean;
  className?: string;
}

const MapView = ({
  center = [-74.5, 40],
  zoom = 9,
  markers = [],
  onMarkerClick,
  interactive = true,
  showUserLocation = false,
  className = '',
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get user's location if requested
    if (showUserLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }

    // Initialize map
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: userLocation || center,
        zoom: zoom,
        interactive: interactive,
      });

      map.current.on('load', () => {
        setLoading(false);
        
        if (showUserLocation && userLocation) {
          // Add user location marker
          new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat(userLocation)
            .addTo(map.current!);
            
          // Center map on user location
          map.current!.flyTo({
            center: userLocation,
            zoom: 14,
            essential: true
          });
        }
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false,
        }),
        'top-right'
      );
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [userLocation]);

  // Update markers when they change
  useEffect(() => {
    if (!map.current || loading) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    markers.forEach(marker => {
      const el = document.createElement('div');
      el.className = 'w-4 h-4 rounded-full bg-primary border-2 border-white shadow-md';
      
      if (marker.color) {
        el.style.backgroundColor = marker.color;
      }

      const mapMarker = new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(map.current!);
        
      if (onMarkerClick) {
        el.addEventListener('click', () => onMarkerClick(marker.id));
      }
      
      markersRef.current[marker.id] = mapMarker;
    });

    // If we have user location and it's different from the center, include it in the bounds
    if (userLocation && (userLocation[0] !== center[0] || userLocation[1] !== center[1])) {
      const userMarker = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat(userLocation)
        .addTo(map.current);
      
      markersRef.current['user'] = userMarker;
    }

    // Fit bounds if we have more than one marker
    if ((markers.length + (userLocation ? 1 : 0)) > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      
      markers.forEach(marker => {
        bounds.extend([marker.longitude, marker.latitude]);
      });
      
      if (userLocation) {
        bounds.extend(userLocation);
      }
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [markers, userLocation, loading]);

  // Update center when it changes
  useEffect(() => {
    if (map.current && !loading && !userLocation) {
      map.current.flyTo({
        center: center,
        zoom: zoom,
        essential: true
      });
    }
  }, [center, zoom]);

  return (
    <div className="relative rounded-xl overflow-hidden h-full w-full">
      <div ref={mapContainer} className={`w-full h-full ${className}`} />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
        Note: Add your Mapbox token for maps to display
      </div>
    </div>
  );
};

export default MapView;
