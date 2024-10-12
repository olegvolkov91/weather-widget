import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getWeatherForecast } from '@/api/weather';
import NotificationBar from '@/common/NotificationBar';
import type { Coordinates } from '@/types/weatherResponse';
import type { WeatherForecast } from '@/types/weatherWidget';
import { formatWeatherResponse } from '@/utils/weatherHelper';

type WeatherContextT = {
  isLoading: boolean;
  weather: {
    todayForecast: WeatherForecast;
    nextForecast: WeatherForecast[];
  };
  setCityCoordinates: (city: Coordinates) => void;
};

const WeatherContext = createContext({} as WeatherContextT);

export const useWeatherInfo = () => useContext(WeatherContext);

export const useWeatherInfoProvider = (): WeatherContextT => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [cityCoordinates, setCityCoordinates] = useState<Coordinates | null>(
    null
  );

  const [weather, setWeather] = useState<WeatherForecast[] | null>(null);

  const startLoading = () => setLoading(true);
  // IMMITATE HAEVY LOADED API CALLS
  const finishLoading = () => setTimeout(() => setLoading(false), 2000);

  const getCurrentLocation = useCallback(() => {
    startLoading();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCityCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          finishLoading();
        },
        () => {
          NotificationBar.showError(
            'Error appears while fetching your current position.'
          );
        }
      );
    } else {
      NotificationBar.showError(
        'Unfortunately your browser does not support navigator.'
      );
      finishLoading();
    }
  }, []);

  const fetchWeathByCoordinates = useCallback(
    async (lat: number, lon: number) => {
      try {
        startLoading();
        const response = await getWeatherForecast(lat, lon);
        setWeather(formatWeatherResponse(response));
      } catch {
        NotificationBar.showError('Error while fetching weather forecast.');
        getCurrentLocation();
      } finally {
        finishLoading();
      }
    },
    [getCurrentLocation]
  );

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    if (!cityCoordinates) return;
    fetchWeathByCoordinates(cityCoordinates.lat, cityCoordinates.lon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityCoordinates?.lat, cityCoordinates?.lon]);

  const [todayForecast, ...nextForecast] = Array.isArray(weather)
    ? weather
    : [];

  return {
    isLoading,
    weather: {
      todayForecast,
      nextForecast,
    },
    setCityCoordinates,
  };
};

export interface IWeatherContextProvider {
  children: React.ReactNode;
}

export const WeatherProvider: React.FC<IWeatherContextProvider> = (props) => {
  const providerValue = useWeatherInfoProvider();

  return (
    <WeatherContext.Provider value={providerValue}>
      {props.children}
    </WeatherContext.Provider>
  );
};
