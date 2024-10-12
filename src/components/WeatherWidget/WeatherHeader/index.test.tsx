import { render } from '@testing-library/react';
import { format } from 'date-fns';

import { DEFAULT_DATE } from '@/constants';

import WeatherHeader from '../WeatherHeader';

describe('WeatherHeader Component', () => {
  const defaultProps = {
    dataTestId: 'weather-header',
    name: 'London',
    country: 'UK',
  };

  const renderComponent = (props = {}) =>
    render(<WeatherHeader {...defaultProps} {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the header with name and country correctly', () => {
    const { getByTestId } = renderComponent();
    const headerElement = getByTestId(defaultProps.dataTestId);

    expect(headerElement).toHaveTextContent(
      `${defaultProps.name}, ${defaultProps.country}`
    );
  });

  it('should render the DayName component with the correct date', () => {
    const { getByTestId } = renderComponent();
    const dayNameElement = getByTestId('weather-header-day');

    expect(dayNameElement).toBeInTheDocument();
    expect(dayNameElement).toHaveTextContent(
      format(DEFAULT_DATE, 'EEEE, MMM d')
    );
  });

  it.each([
    { name: 'New York', country: 'USA' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Berlin', country: 'Germany' },
  ])(
    'should render correctly for different locations: $name, $country',
    ({ name, country }) => {
      const { getByTestId } = renderComponent({ name, country });
      const headerElement = getByTestId(defaultProps.dataTestId);

      expect(headerElement).toHaveTextContent(`${name}, ${country}`);
    }
  );
});
