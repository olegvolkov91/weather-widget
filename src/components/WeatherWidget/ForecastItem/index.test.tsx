import { render } from '@testing-library/react';
import { format } from 'date-fns';

import { WeatherForecast } from '@/types/weatherWidget';

import ForecastItem from '../ForecastItem';

describe('ForecastItem Component', () => {
  const defaultProps = {
    dataTestId: 'forecast-block',
    forecast: {
      date: '2024-10-11',
      weather: {
        icon: 'http://example.com/icon.png',
        temp: 20,
        feelsLike: 18,
        windSpeed: 10,
        minTemp: 15,
        maxTemp: 25,
      },
    } as WeatherForecast,
  };

  const renderComponent = (props = {}) =>
    render(<ForecastItem {...defaultProps} {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass dataTestId and render correctly', () => {
    const { getByTestId } = renderComponent();
    const container = getByTestId(`${defaultProps.dataTestId}-container`);

    expect(container).toBeInTheDocument();
  });

  it('should render forecast-day-name correctly', () => {
    const { getByTestId } = renderComponent();
    const dayName = getByTestId('forecast-day-name');

    expect(dayName).toBeInTheDocument();
    expect(dayName).toHaveTextContent(
      format(defaultProps.forecast.date, 'EEEE')
    );
  });

  it('should render forecast-weather-icon correctly', () => {
    const { getByTestId } = renderComponent();
    const weatherIcon = getByTestId('forecast-weather-icon');

    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      'src',
      defaultProps.forecast.weather.icon
    );
    expect(weatherIcon).toHaveAttribute('alt', 'weather icon');
  });

  it.each([
    { showDetails: false, shouldRenderDetails: false },
    { showDetails: true, shouldRenderDetails: true },
  ])(
    'should %s the forecast-block-details based on showDetails prop',
    ({ showDetails, shouldRenderDetails }) => {
      const { queryByTestId, getByTestId } = renderComponent({ showDetails });

      if (shouldRenderDetails) {
        const details = getByTestId(`${defaultProps.dataTestId}-details`);
        expect(details).toBeInTheDocument();
        expect(getByTestId('approximate-temperature-info')).toBeInTheDocument();
        expect(getByTestId('wind-info')).toBeInTheDocument();
      } else {
        expect(
          queryByTestId(`${defaultProps.dataTestId}-details`)
        ).not.toBeInTheDocument();
      }
    }
  );

  it('should render temperature-range correctly', () => {
    const { getByTestId } = renderComponent();
    const temperatureRange = getByTestId('temperature-range');

    expect(temperatureRange).toBeInTheDocument();
    expect(temperatureRange).toHaveTextContent(
      `${defaultProps.forecast.weather.maxTemp}°C`
    );
    expect(temperatureRange).toHaveTextContent(
      `${defaultProps.forecast.weather.minTemp}°C`
    );
  });
});
