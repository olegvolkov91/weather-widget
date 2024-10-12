// WidgetWrapper.test.tsx

import { render, screen } from '@testing-library/react';
import React from 'react';

import { useWeatherInfo } from '@/providers/WeatherProvider';

import WeatherWidget from '../WeatherWidget';

jest.mock('@/providers/WeatherProvider');

const mockWeather = {
  icon: '01d',
  temp: 12,
  feelsLike: 10,
  minTemp: 10,
  maxTemp: 14,
  humidity: 43,
  windSpeed: 5.6,
};
const mockForecast = {
  todayForecast: {
    date: '2024-12-10 12:00:00',
    name: 'London',
    country: 'UK',
    weather: {},
  },
  nextForecast: [
    {
      date: '2024-13-10 12:00:00',
      name: 'London',
      country: 'UK',
      weather: mockWeather,
    },
    {
      date: '2024-14-10 12:00:00',
      name: 'London',
      country: 'UK',
      weather: mockWeather,
    },
  ],
};

describe('WidgetWrapper', () => {
  it('should render loader when data is not loaded yet', () => {
    (useWeatherInfo as jest.Mock).mockReturnValue({
      weather: null,
      isLoading: true,
    });

    render(<WeatherWidget />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render data correctly when it is loaded', () => {
    (useWeatherInfo as jest.Mock).mockReturnValue({
      weather: mockForecast,
      isLoading: false,
    });

    render(<WeatherWidget />);

    // Check that the weather widget is in the document
    expect(screen.getByTestId('weather-widget')).toBeInTheDocument();
  });
});
