import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BENGALURU_BOUNDS } from '../constants/map';
import MapRoute from './MapRoute';
import { Route } from '../types/route';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  origin: [number, number] | null;
  destination: [number, number] | null;
  onMapClick: (latlng: [number, number]) => void;
  routes: Route[];
  selectedRouteIndex: number;
}

function MapEvents({ onMapClick }: { onMapClick: (latlng: [number, number]) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function Map({ origin, destination, onMapClick, routes, selectedRouteIndex }: MapProps) {
  return (
    <MapContainer
      center={BENGALURU_BOUNDS.center}
      zoom={12}
      className="h-[calc(100vh-4rem)] w-full"
      maxBounds={[
        [BENGALURU_BOUNDS.south, BENGALURU_BOUNDS.west],
        [BENGALURU_BOUNDS.north, BENGALURU_BOUNDS.east],
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents onMapClick={onMapClick} />
      <MapRoute routes={routes} selectedRouteIndex={selectedRouteIndex} />
      
      {origin && (
        <Marker position={origin}>
          <Popup>Origin<br/>({origin[0].toFixed(6)}, {origin[1].toFixed(6)})</Popup>
        </Marker>
      )}
      
      {destination && (
        <Marker position={destination}>
          <Popup>Destination<br/>({destination[0].toFixed(6)}, {destination[1].toFixed(6)})</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}