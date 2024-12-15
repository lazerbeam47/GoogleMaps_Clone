export interface Route {
  coordinates: [number, number][];
  distance: number;
  duration: number;
  isAlternative?: boolean;
}

export interface RouteInfo {
  mainRoute: Route;
  alternatives: Route[];
}