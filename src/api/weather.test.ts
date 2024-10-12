// weatherApi.test.ts

import axios from 'axios';

import { DynamicObject } from '@/types/weatherWidget';

import {
  generateWeatherIconUrl,
  generateWeatherUrl,
  getWeatherForecast,
} from './weather';

jest.mock('axios');

describe('Weather API', () => {
  it('should generate the correct weather URL', () => {
    const lat = 51.5074;
    const lon = -0.1278;
    const expectedUrl = `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;

    const url = generateWeatherUrl(lat, lon);
    expect(url).toBe(expectedUrl);
  });

  it('should generate the correct weather icon URL', () => {
    const code = '10d';
    const expectedIconUrl = 'https://openweathermap.org/img/wn/10d@2x.png';

    const iconUrl = generateWeatherIconUrl(code);
    expect(iconUrl).toBe(expectedIconUrl);
  });

  it('should fetch weather forecast', async () => {
    const lat = 51.5074;
    const lon = -0.1278;
    const mockResponse: DynamicObject = {
      city: { name: 'London', country: 'UK' },
      list: [
        {
          dt_txt: '2024-10-12 12:00:00',
          main: { temp: 15 },
          weather: [{ id: 800, description: 'clear sky' }],
        },
        {
          dt_txt: '2024-10-13 12:00:00',
          main: { temp: 16 },
          weather: [{ id: 500, description: 'light rain' }],
        },
        {
          dt_txt: '2024-10-12 06:00:00',
          main: { temp: 14 },
          weather: [{ id: 800, description: 'clear sky' }],
        },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const { city, dailyForecasts } = await getWeatherForecast(lat, lon);

    expect(city).toEqual(mockResponse.city);
    expect(dailyForecasts.length).toBe(2); // Only the forecasts at MID_DAY
    expect(dailyForecasts).toEqual([
      {
        dt_txt: '2024-10-12 12:00:00',
        main: { temp: 15 },
        weather: [{ id: 800, description: 'clear sky' }],
      },
      {
        dt_txt: '2024-10-13 12:00:00',
        main: { temp: 16 },
        weather: [{ id: 500, description: 'light rain' }],
      },
    ]);
    const expectedUrl = `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
});
