import { generateWeatherIconUrl } from '@/api/weather';
import type { FormatWeatherResponseDTO } from '@/types/weatherResponse';
import type { WeatherForecast } from '@/types/weatherWidget';

import { formatWeatherResponse } from './weatherHelper';

jest.mock('@/api/weather', () => ({
  generateWeatherIconUrl: jest.fn(
    (code) => `${process.env.NEXT_PUBLIC_WEATHER_ICON_URL}/wn/${code}@2x.png`
  ),
}));

describe('formatWeatherResponse', () => {
  it('formats weather response correctly for a single forecast', () => {
    const input = {
      city: {
        name: 'London',
        country: 'GB',
      },
      dailyForecasts: [
        {
          dt_txt: '2024-10-10 12:00:00',
          main: {
            temp: 15.3,
            feels_like: 14.2,
            temp_min: 10.0,
            temp_max: 18.5,
            humidity: 72,
          },
          weather: [{ icon: '01d' }],
          wind: { speed: 5.5 },
        },
      ],
    } as unknown as FormatWeatherResponseDTO;

    const expectedOutput: WeatherForecast[] = [
      {
        date: '2024-10-10 12:00:00',
        name: 'London',
        country: 'GB',
        weather: {
          temp: 15,
          icon: generateWeatherIconUrl('01d'),
          feelsLike: 14,
          minTemp: 10,
          maxTemp: 19,
          humidity: 72,
          windSpeed: 5.5,
        },
      },
    ];

    expect(formatWeatherResponse(input)).toEqual(expectedOutput);
  });

  it('returns an empty array if dailyForecasts is empty', () => {
    const input = {
      city: {
        name: 'London',
        country: 'GB',
      },
      dailyForecasts: [],
    } as unknown as FormatWeatherResponseDTO;

    expect(formatWeatherResponse(input)).toEqual([]);
  });
});
