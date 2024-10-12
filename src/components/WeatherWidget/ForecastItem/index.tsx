import { Box } from '@mui/material';

import { WeatherForecast } from '@/types/weatherWidget';

import DayName from '../DayName';
import TemperatureRange from '../TemperatureRange';
import WeatherIcon from '../WeatherIcon';
import WeatherInfo from '../WeatherInfo';
import { StyledContainer } from './styles';

type Props = {
  dataTestId: string;
  forecast: WeatherForecast;
  showDetails?: boolean;
  iconSize?: string;
};

const ForecastBlock: React.FC<Props> = ({
  dataTestId,
  forecast,
  showDetails = false,
  iconSize = '50px',
}) => (
  <StyledContainer data-testid={`${dataTestId}-container`}>
    <DayName dataTestId="forecast-day-name" date={forecast.date} />
    <WeatherIcon
      dataTestId="forecast-weather-icon"
      icon={forecast.weather.icon}
      size={iconSize}
    />
    <WeatherInfo
      dataTestId="temperature-info"
      value={forecast.weather.temp}
      unit="°C"
      styles={{ fontSize: '14px' }}
    />
    {showDetails && (
      <Box data-testid={`${dataTestId}-details`}>
        <WeatherInfo
          dataTestId="approximate-temperature-info"
          label="Feels like"
          value={forecast.weather.feelsLike}
          unit="°C"
          styles={{ fontSize: '10px' }}
        />
        <WeatherInfo
          dataTestId="wind-info"
          label="Wind"
          value={forecast.weather.windSpeed}
          unit="km/h"
          styles={{ fontSize: '10px' }}
        />
      </Box>
    )}
    <TemperatureRange
      dataTestId="temperature-range"
      minTemp={forecast.weather.minTemp}
      maxTemp={forecast.weather.maxTemp}
    />
  </StyledContainer>
);

export default ForecastBlock;
