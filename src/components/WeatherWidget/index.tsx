import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

import CitySearch from '@/components/CitySearch';
import { useWeatherInfo } from '@/providers/WeatherProvider';
import { WidgetSize } from '@/types/weatherWidget';

import { StyledContentContainer, StyledLoadingContainer } from './styles';
import WeatherWidget from './Widget';

const WidgetWrapper = () => {
  const weatherCtx = useWeatherInfo();

  const isContentLoading = !weatherCtx.weather || weatherCtx.isLoading;

  return isContentLoading ? (
    <StyledLoadingContainer>
      <CircularProgress data-testid="loader" />
    </StyledLoadingContainer>
  ) : (
    <StyledContentContainer data-testid="weather-widget">
      <Box display="flex">
        <Box m="12px">
          <WeatherWidget weather={weatherCtx.weather} size={WidgetSize.Small} />
        </Box>
        <Box m="12px">
          <WeatherWidget
            weather={weatherCtx.weather}
            size={WidgetSize.Medium}
          />
        </Box>
        <Box m="12px">
          <WeatherWidget weather={weatherCtx.weather} size={WidgetSize.Large} />
        </Box>
      </Box>
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        Weather Forecast
      </Typography>
      <Box width="250px">
        <CitySearch dataTestId="city-search" />
      </Box>
    </StyledContentContainer>
  );
};

export default WidgetWrapper;
