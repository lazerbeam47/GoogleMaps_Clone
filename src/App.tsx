import { useState } from 'react';
import Map from './components/Map';
import CoordinatesForm from './components/CoordinatesForm';
import RouteInfo from './components/RouteInfo';
import { Navigation } from 'lucide-react';
import { findRoadRoutes } from './services/routing';
import { Route } from './types/route';

function App() {
  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [isSettingOrigin, setIsSettingOrigin] = useState(true);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMapClick = (coords: [number, number]) => {
    if (isSettingOrigin) {
      setOrigin(coords);
      setIsSettingOrigin(false);
    } else {
      setDestination(coords);
      setIsSettingOrigin(true);
    }
    setRoutes([]);
    setError(null);
  };

  const handleFindRoute = async () => {
    if (!origin || !destination) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const routeInfo = await findRoadRoutes(origin, destination);
      setRoutes([routeInfo.mainRoute, ...routeInfo.alternatives]);
      setSelectedRouteIndex(0);
    } catch (err) {
      setError('Failed to find routes. Please try again.');
      setRoutes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-[1000] flex items-center gap-2">
        <Navigation className="text-blue-500" />
        <h1 className="text-lg font-bold">Maps Clone</h1>
      </div>
      
      <CoordinatesForm
        origin={origin}
        destination={destination}
        onOriginChange={setOrigin}
        onDestinationChange={setDestination}
        onRouteFind={handleFindRoute}
        isSettingOrigin={isSettingOrigin}
        isLoading={isLoading}
        error={error}
      />
      
      <Map
        origin={origin}
        destination={destination}
        onMapClick={handleMapClick}
        routes={routes}
        selectedRouteIndex={selectedRouteIndex}
      />

      {routes.length > 0 && (
        <RouteInfo
          routes={routes}
          onRouteSelect={setSelectedRouteIndex}
          selectedRouteIndex={selectedRouteIndex}
        />
      )}
    </div>
  );
}

export default App;