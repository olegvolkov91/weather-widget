import { Box } from '@mui/material';

import {
  WeatherForecast,
  WidgetProps,
  WidgetSize,
} from '../../../types/weatherWidget';
import ForecastItem from '../ForecastItem';
import WeatherHeader from '../WeatherHeader';
import WeatherIcon from '../WeatherIcon';
import WeatherInfo from '../WeatherInfo';
import {
  StyledAdditionalWeatherInfo,
  StyledForecastSection,
  StyledWeatherInfoContainer,
  StyledWidgetContainer,
} from './styles';

type Props = WidgetProps & { size: WidgetSize };

const Widget: React.FC<Props> = ({ weather, size }) => {
  const { todayForecast, nextForecast } = weather;

  const isSmall = size === WidgetSize.Small;
  const isMedium = size === WidgetSize.Medium;
  const isLarge = size === WidgetSize.Large;

  return (
    <StyledWidgetContainer size={size}>
      <WeatherHeader
        dataTestId="weather-header"
        name={todayForecast?.name}
        country={todayForecast?.country}
        date={todayForecast?.date}
      />

      <StyledWeatherInfoContainer>
        <Box ml={2}>
          <WeatherInfo
            dataTestId="temperature-info"
            value={todayForecast?.weather.temp}
            unit="°C"
            styles={{ fontSize: '24px' }}
          />
          <WeatherInfo
            dataTestId="approximate-temperature-info"
            label="Feels like"
            value={todayForecast?.weather.feelsLike}
            unit="°C"
            styles={{ fontSize: '12px' }}
          />
        </Box>
        <WeatherIcon
          dataTestId="weather-icon"
          icon={todayForecast?.weather.icon}
          size="70px"
          styles={{ padding: '0 12px' }}
        />
        {!isSmall && (
          <StyledAdditionalWeatherInfo data-testid="weather-additional-section">
            <WeatherInfo
              dataTestId="humidity-info"
              label="Humidity"
              value={todayForecast?.weather.humidity}
              unit="%"
              styles={{ fontSize: '12px' }}
            />
            <WeatherInfo
              dataTestId="wind-info"
              label="Wind Speed"
              value={todayForecast?.weather.windSpeed}
              unit="km/h"
              styles={{ fontSize: '12px' }}
            />
          </StyledAdditionalWeatherInfo>
        )}
      </StyledWeatherInfoContainer>

      {!isSmall && (
        <StyledForecastSection size={size} data-testid="forecast-section">
          {nextForecast
            .slice(0, isMedium ? 2 : nextForecast.length)
            .map((forecast: WeatherForecast, idx: number) => (
              <ForecastItem
                dataTestId={`forecast-item-${idx}`}
                key={forecast.date}
                forecast={forecast}
                showDetails={isLarge}
              />
            ))}
        </StyledForecastSection>
      )}
    </StyledWidgetContainer>
  );
};

export default Widget;
