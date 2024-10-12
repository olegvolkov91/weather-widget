import { render } from '@testing-library/react';

import { WidgetSize } from '@/types/weatherWidget';

import WeatherWidget from '../Widget';

const mockedWeather = {
  temp: 18,
  feelsLike: 16,
  icon: 'cloudy',
  humidity: 65,
  windSpeed: 12,
  minTemp: 15,
  maxTemp: 20,
};

const mockedProps = {
  weather: {
    todayForecast: {
      name: 'London',
      country: 'UK',
      date: '2024-10-11',
      weather: mockedWeather,
    },
    nextForecast: [
      {
        date: '2024-10-12',
        name: 'London',
        country: 'UK',
        weather: mockedWeather,
      },
      {
        date: '2024-10-13',
        name: 'London',
        country: 'UK',
        weather: mockedWeather,
      },
      {
        date: '2024-10-14',
        name: 'London',
        country: 'UK',
        weather: mockedWeather,
      },
      {
        date: '2024-10-15',
        name: 'London',
        country: 'UK',
        weather: mockedWeather,
      },
    ],
  },
};

describe('WeatherWidget Component', () => {
  const renderComponent = (size = WidgetSize.Small) =>
    render(<WeatherWidget {...mockedProps} size={size} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['weather-header', 'should render weather header correctly'],
    ['temperature-info', 'should render temperature info correctly'],
    [
      'approximate-temperature-info',
      'should render approximate temperature info correctly',
    ],
    ['weather-icon', 'should render weather icon correctly'],
  ])('%s: %s', (testId) => {
    const { getByTestId } = renderComponent();
    const section = getByTestId(testId);
    expect(section).toBeInTheDocument();
  });

  it('should not render additional weather section if widget small size', () => {
    const { queryByTestId } = renderComponent();
    const section = queryByTestId('weather-additional-section');
    expect(section).toBeNull();
  });

  it('should not render forecast section if widget small size', () => {
    const { queryByTestId } = renderComponent();
    const section = queryByTestId('forecast-section');
    expect(section).toBeNull();
  });

  it.each([
    [
      WidgetSize.Medium,
      'weather-additional-section',
      'should render additional weather section if widget not small',
    ],
    [
      WidgetSize.Medium,
      'forecast-section',
      'should render forecast section if widget not small size',
    ],
  ])('%s: %s', (size, testId) => {
    const { getByTestId } = renderComponent(size);
    const section = getByTestId(testId);
    expect(section).toBeInTheDocument();
  });

  it('should render partial forecast section only if widget medium size', () => {
    const { getAllByTestId } = renderComponent(WidgetSize.Medium);
    const forecastSections = getAllByTestId(/^forecast-item-/);
    expect(forecastSections.length).toBe(2);
  });

  it('should render full forecast section only if widget large size', () => {
    const { getAllByTestId } = renderComponent(WidgetSize.Large);
    const forecastSections = getAllByTestId(/^forecast-item-\d+-container$/);
    expect(forecastSections.length).toBe(
      mockedProps.weather.nextForecast.length
    );
  });
});
