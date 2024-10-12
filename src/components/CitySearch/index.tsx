import { Box, List, ListItem, TextField } from '@mui/material';
import debounce from 'debounce';
import React, { useState } from 'react';

import { getCities } from '@/api/cities';
import NotificationBar from '@/common/NotificationBar';
import { useWeatherInfo } from '@/providers/WeatherProvider';
import type { LocationsList } from '@/types/cityResponse';
import type { Coordinates } from '@/types/weatherResponse';

type Props = {
  dataTestId: string;
};

const CitySearch: React.FC<Props> = ({ dataTestId }) => {
  const weatherCtx = useWeatherInfo();

  const [query, setQuery] = useState<string>('');
  const [cities, setCities] = useState<LocationsList>([]);

  const fetchCities = async (query: string) => {
    try {
      const citiesData = await getCities(query);
      setCities(citiesData);
    } catch {
      NotificationBar.showError('Error while fetching cities: Network Error');
      setCities([]);
    }
  };

  const debouncedFetchCities = (inputValue: string) => {
    fetchCities(inputValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    if (inputValue) {
      debouncedFetchCities(inputValue);
    } else {
      cleanState();
    }
  };

  const cleanState = () => {
    setQuery('');
    setCities([]);
  };

  const handleCitySelect = (city: Coordinates) => {
    cleanState();
    weatherCtx.setCityCoordinates({ lat: city.lat, lon: city.lon });
  };

  return (
    <Box data-testid={`${dataTestId}-container`}>
      <TextField
        data-testid={`${dataTestId}-input`}
        label="Search for a city"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      {cities.length > 0 && (
        <List data-testid={`${dataTestId}-list`}>
          {cities.map((city) => (
            <ListItem
              data-testid={`${dataTestId}-list-item`}
              key={`${city.lat}-${city.lon}`}
              onClick={() => handleCitySelect(city)}
            >{`${city.name}, ${city.country}`}</ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CitySearch;
