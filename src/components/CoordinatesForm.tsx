import React from 'react';
import { MapPin } from 'lucide-react';
import { BENGALURU_BOUNDS } from '../constants/map';

interface CoordinatesFormProps {
  origin: [number, number] | null;
  destination: [number, number] | null;
  onOriginChange: (coords: [number, number]) => void;
  onDestinationChange: (coords: [number, number]) => void;
  onRouteFind: () => void;
  isSettingOrigin: boolean;
  isLoading: boolean;
  error: string | null;
}

export default function CoordinatesForm({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onRouteFind,
  isSettingOrigin,
  isLoading,
  error,
}: CoordinatesFormProps) {
  const handleOriginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lat = parseFloat(formData.get('originLat') as string);
    const lng = parseFloat(formData.get('originLng') as string);
    
    if (!isNaN(lat) && !isNaN(lng) && 
        lat >= BENGALURU_BOUNDS.south && lat <= BENGALURU_BOUNDS.north &&
        lng >= BENGALURU_BOUNDS.west && lng <= BENGALURU_BOUNDS.east) {
      onOriginChange([lat, lng]);
    } else {
      alert('Please enter valid coordinates within Bengaluru bounds');
    }
  };

  const handleDestinationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lat = parseFloat(formData.get('destLat') as string);
    const lng = parseFloat(formData.get('destLng') as string);
    
    if (!isNaN(lat) && !isNaN(lng) &&
        lat >= BENGALURU_BOUNDS.south && lat <= BENGALURU_BOUNDS.north &&
        lng >= BENGALURU_BOUNDS.west && lng <= BENGALURU_BOUNDS.east) {
      onDestinationChange([lat, lng]);
    } else {
      alert('Please enter valid coordinates within Bengaluru bounds');
    }
  };

  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-md z-[1000]">
      <h2 className="text-xl font-bold mb-4">Find Route</h2>
      
      <div className="text-sm mb-4 text-gray-600">
        {isSettingOrigin ? 'Click on the map to set origin point' : 'Click on the map to set destination point'}
      </div>
      
      <form onSubmit={handleOriginSubmit} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="text-blue-500" />
          <h3 className="font-semibold">Origin</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="number"
              name="originLat"
              placeholder="Latitude"
              step="any"
              value={origin?.[0] || ''}
              onChange={(e) => {
                const lat = parseFloat(e.target.value);
                const lng = origin?.[1] || 0;
                if (!isNaN(lat)) {
                  onOriginChange([lat, lng]);
                }
              }}
              className="border p-2 rounded w-full"
            />
            <span className="text-xs text-gray-500">Lat: {BENGALURU_BOUNDS.south} to {BENGALURU_BOUNDS.north}</span>
          </div>
          <div>
            <input
              type="number"
              name="originLng"
              placeholder="Longitude"
              step="any"
              value={origin?.[1] || ''}
              onChange={(e) => {
                const lng = parseFloat(e.target.value);
                const lat = origin?.[0] || 0;
                if (!isNaN(lng)) {
                  onOriginChange([lat, lng]);
                }
              }}
              className="border p-2 rounded w-full"
            />
            <span className="text-xs text-gray-500">Lng: {BENGALURU_BOUNDS.west} to {BENGALURU_BOUNDS.east}</span>
          </div>
        </div>
      </form>

      <form onSubmit={handleDestinationSubmit} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="text-red-500" />
          <h3 className="font-semibold">Destination</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="number"
              name="destLat"
              placeholder="Latitude"
              step="any"
              value={destination?.[0] || ''}
              onChange={(e) => {
                const lat = parseFloat(e.target.value);
                const lng = destination?.[1] || 0;
                if (!isNaN(lat)) {
                  onDestinationChange([lat, lng]);
                }
              }}
              className="border p-2 rounded w-full"
            />
            <span className="text-xs text-gray-500">Lat: {BENGALURU_BOUNDS.south} to {BENGALURU_BOUNDS.north}</span>
          </div>
          <div>
            <input
              type="number"
              name="destLng"
              placeholder="Longitude"
              step="any"
              value={destination?.[1] || ''}
              onChange={(e) => {
                const lng = parseFloat(e.target.value);
                const lat = destination?.[0] || 0;
                if (!isNaN(lng)) {
                  onDestinationChange([lat, lng]);
                }
              }}
              className="border p-2 rounded w-full"
            />
            <span className="text-xs text-gray-500">Lng: {BENGALURU_BOUNDS.west} to {BENGALURU_BOUNDS.east}</span>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={onRouteFind}
        disabled={!origin || !destination || isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <span className="inline-block animate-spin mr-2">⏳</span>
        ) : null}
        {isLoading ? 'Finding Route...' : 'Find Route'}
      </button>
    </div>
  );
}