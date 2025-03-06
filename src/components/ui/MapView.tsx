
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loader2 } from 'lucide-react';

// Note: In production, this should be securely managed
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

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
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default MapView;
