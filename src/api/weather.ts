import axios from 'axios';

import { ForecastItem, WeatherForecastResponse } from '@/types/weatherResponse';

const WEATHER_BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const WEATHER_ICON_URL = process.env.NEXT_PUBLIC_WEATHER_ICON_URL;

const MID_DAY = '12:00:00';

export const generateWeatherUrl = (lat: number, lon: number): string =>
  `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

export const generateWeatherIconUrl = (code: string): string =>
  `${WEATHER_ICON_URL}/wn/${code}@2x.png`;

export const getWeatherForecast = async (lat: number, lon: number) => {
  const response = await axios.get<WeatherForecastResponse>(
    generateWeatherUrl(lat, lon)
  );

  //  because daily point forecast for several days is an option for subscribers.
  //  I'll add a simple workaround
  const dailyForecasts = response.data.list.filter((forecast: ForecastItem) =>
    forecast.dt_txt.includes(MID_DAY)
  );

  return { city: response.data.city, dailyForecasts };
};
