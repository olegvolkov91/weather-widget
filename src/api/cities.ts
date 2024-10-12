import axios from 'axios';

const CITY_BASE_URL = process.env.NEXT_PUBLIC_CITY_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const generateCityUrl = (query: string, limit: number): string => {
  return `${CITY_BASE_URL}?q=${query}&limit=${limit}&appid=${API_KEY}`;
};

export const getCities = async (query: string, limit: number = 5) => {
  const response = await axios.get(generateCityUrl(query, limit));
  return response.data;
};
