import { Route } from '../types/route';
import { Clock, Navigation } from 'lucide-react';

interface RouteInfoProps {
  routes: Route[];
  onRouteSelect: (index: number) => void;
  selectedRouteIndex: number;
}

export default function RouteInfo({ routes, onRouteSelect, selectedRouteIndex }: RouteInfoProps) {
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 
      ? `${hours} hr ${minutes} min`
      : `${minutes} min`;
  };

  const formatDistance = (meters: number): string => {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  };

  return (
    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-md z-[1000]">
      <h3 className="text-lg font-bold mb-3">Available Routes</h3>
      <div className="space-y-3">
        {routes.map((route, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedRouteIndex === index
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => onRouteSelect(index)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">
                {index === 0 ? 'Fastest Route' : `Alternative ${index}`}
              </span>
              {selectedRouteIndex === index && (
                <span className="text-blue-500 text-sm">Selected</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDuration(route.duration)}
              </div>
              <div className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                {formatDistance(route.distance)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}