import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { Route } from '../types/route';

interface MapRouteProps {
  routes: Route[];
  selectedRouteIndex: number;
}

export default function MapRoute({ routes, selectedRouteIndex }: MapRouteProps) {
  const map = useMap();

  useEffect(() => {
    const polylines: L.Polyline[] = [];

    routes.forEach((route, index) => {
      const isSelected = index === selectedRouteIndex;
      const polyline = L.polyline(route.coordinates, {
        color: isSelected ? '#3b82f6' : '#94a3b8',
        weight: isSelected ? 4 : 3,
        opacity: isSelected ? 0.8 : 0.6,
        lineJoin: 'round',
        lineCap: 'round',
      });

      polyline.addTo(map);
      polylines.push(polyline);
    });

    if (routes.length > 0) {
      const selectedRoute = routes[selectedRouteIndex];
      map.fitBounds(L.polyline(selectedRoute.coordinates).getBounds(), { padding: [50, 50] });
    }

    return () => {
      polylines.forEach(polyline => map.removeLayer(polyline));
    };
  }, [map, routes, selectedRouteIndex]);

  return null;
}