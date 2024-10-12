export interface LocalNames {
  [key: string]: string;
}

export interface Location {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export type LocationsList = Location[];
