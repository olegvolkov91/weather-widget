import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import { getWeatherForecast } from '@/api/weather';
import NotificationBar from '@/common/NotificationBar';
import { formatWeatherResponse } from '@/utils/weatherHelper';

import { WeatherProvider, useWeatherInfo } from './WeatherProvider';

jest.mock('@/api/weather', () => ({
  getWeatherForecast: jest.fn(),
}));

jest.mock('@/utils/weatherHelper', () => ({
  formatWeatherResponse: jest.fn(),
}));

jest.mock('@/common/NotificationBar', () => ({
  showError: jest.fn(),
}));

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

describe('WeatherProvider', () => {
  const mockedCoordinates = { lat: 51.5074, lon: -0.1278 };
  const MockComponent = () => {
    const { isLoading, weather, setCityCoordinates } = useWeatherInfo();

    return (
      <div>
        {isLoading && <span data-testid="loading">Loading...</span>}
        {weather?.todayForecast && (
          <div data-testid="today-forecast">{weather.todayForecast.name}</div>
        )}
        <button
          data-testid="change-city"
          onClick={() => setCityCoordinates(mockedCoordinates)}
        >
          Change City
        </button>
      </div>
    );
  };

  const renderWeatherProvider = () =>
    render(
      <WeatherProvider>
        <MockComponent />
      </WeatherProvider>
    );

  const expectNotificationError = async (expectedMessage: string) => {
    await waitFor(() => {
      expect(NotificationBar.showError).toHaveBeenCalledWith(expectedMessage);
    });
  };

  beforeEach(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
    });

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success({
        coords: {
          latitude: 50,
          longitude: 30,
        },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show notification message that browser does not support navigator', async () => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    (getWeatherForecast as jest.Mock).mockRejectedValueOnce(
      new Error('API error')
    );

    const { getByTestId } = renderWeatherProvider();

    expect(getByTestId('loading')).toBeInTheDocument();

    await expectNotificationError(
      'Unfortunately your browser does not support navigator.'
    );
  });

  it('should handle geolocation error and show error notification', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_success, error) => {
        error(new Error('Geolocation error'));
      }
    );

    const { getByTestId } = renderWeatherProvider();

    expect(getByTestId('loading')).toBeInTheDocument();

    await expectNotificationError(
      'Error appears while fetching your current position.'
    );
  });

  it('should handle API fetch error and show error notification', async () => {
    (getWeatherForecast as jest.Mock).mockRejectedValueOnce(
      new Error('API error')
    );

    const { getByTestId } = renderWeatherProvider();

    expect(getByTestId('loading')).toBeInTheDocument();

    await expectNotificationError('Error while fetching weather forecast.');
  });
  it('should get weather api data by coordinates when city coordinates changed and format it', async () => {
    const mockWeatherResponse = {};

    (getWeatherForecast as jest.Mock).mockResolvedValueOnce(
      mockWeatherResponse
    );

    const { getByTestId } = renderWeatherProvider();

    fireEvent.click(getByTestId('change-city'));

    expect(getWeatherForecast).toHaveBeenCalledWith(
      mockedCoordinates.lat,
      mockedCoordinates.lon
    );

    await waitFor(() => {
      expect(formatWeatherResponse).toHaveBeenCalledWith(mockWeatherResponse);
    });
  });
});
