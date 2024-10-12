import axios from 'axios';

import { generateCityUrl, getCities } from './cities';

jest.mock('axios');

describe('City API functions', () => {
  describe('generateCityUrl', () => {
    it('should generate the correct URL with query and limit', () => {
      const query = 'London';
      const limit = 5;
      const expectedUrl = `${process.env.NEXT_PUBLIC_CITY_BASE_URL}?q=${query}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;

      const url = generateCityUrl(query, limit);

      expect(url).toBe(expectedUrl);
    });
  });

  describe('getCities', () => {
    it('should call axios.get with the correct URL and return data', async () => {
      const query = 'London';
      const limit = 5;
      const mockResponse = {
        data: [{ name: 'London', country: 'UK' }],
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const cities = await getCities(query, limit);

      const expectedUrl = generateCityUrl(query, limit);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);

      expect(cities).toEqual(mockResponse.data);
    });

    it('should handle the default limit of 5 when no limit is provided', async () => {
      const query = 'Paris';
      const mockResponse = {
        data: [{ name: 'Paris', country: 'France' }],
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const cities = await getCities(query);

      const expectedUrl = generateCityUrl(query, 5);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
      expect(cities).toEqual(mockResponse.data);
    });
  });
});
