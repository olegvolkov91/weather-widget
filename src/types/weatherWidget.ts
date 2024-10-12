export interface WeatherDetails {
  icon: string;
  temp: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherForecast {
  date: string;
  name: string;
  country: string;
  weather: WeatherDetails;
}

export interface WidgetProps {
  weather: {
    todayForecast: WeatherForecast;
    nextForecast: WeatherForecast[];
  };
}

export enum WidgetSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DynamicObject = { [key: string]: any };
