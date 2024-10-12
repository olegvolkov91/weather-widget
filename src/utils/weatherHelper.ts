import { generateWeatherIconUrl } from '@/api/weather';
import type {
  ForecastItem,
  FormatWeatherResponseDTO,
} from '@/types/weatherResponse';
import type { WeatherForecast } from '@/types/weatherWidget';

export const formatWeatherResponse = ({
  city,
  dailyForecasts,
}: FormatWeatherResponseDTO): WeatherForecast[] =>
  dailyForecasts.map((forecast: ForecastItem) => ({
    date: forecast.dt_txt,
    name: city.name,
    country: city.country,
    weather: {
      temp: Math.round(forecast.main.temp),
      icon: generateWeatherIconUrl(forecast.weather[0].icon),
      feelsLike: Math.round(forecast.main.feels_like),
      minTemp: Math.floor(forecast.main.temp_min),
      maxTemp: Math.ceil(forecast.main.temp_max),
      humidity: Math.round(forecast.main.humidity),
      windSpeed: forecast.wind.speed,
    },
  }));
