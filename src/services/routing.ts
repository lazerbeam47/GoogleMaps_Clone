import axios from 'axios';
import { Route, RouteInfo } from '../types/route';

interface OSRMResponse {
  code: string;
  routes: Array<{
    geometry: {
      coordinates: Array<[number, number]>;
    };
    distance: number;
    duration: number;
  }>;
}

export async function findRoadRoutes(origin: [number, number], destination: [number, number]): Promise<RouteInfo> {
  try {
    const response = await axios.get<OSRMResponse>(
      `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson&alternatives=true`
    );

    if (response.data.code !== 'Ok' || !response.data.routes.length) {
      throw new Error('No route found');
    }

    const [mainRoute, ...alternativeRoutes] = response.data.routes;

    const formatRoute = (route: typeof mainRoute, isAlternative = false): Route => ({
      coordinates: route.geometry.coordinates.map(coord => [coord[1], coord[0]]),
      distance: route.distance,
      duration: route.duration,
      isAlternative
    });

    return {
      mainRoute: formatRoute(mainRoute),
      alternatives: alternativeRoutes.map(route => formatRoute(route, true))
    };
  } catch (error) {
    console.error('Error finding routes:', error);
    throw new Error('Failed to find routes');
  }
}