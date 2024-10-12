import { render } from '@testing-library/react';

import WeatherInfo from '../WeatherInfo';

describe('WeatherInfo Component', () => {
  const defaultProps = {
    dataTestId: 'weather-info',
    value: 10,
    label: '',
    unit: '°C',
  };

  const renderComponent = (props = {}) =>
    render(<WeatherInfo {...defaultProps} {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    { value: 20, label: 'Temperature', expectedText: '20 °C' },
    { value: 30, label: 'Humidity', expectedText: '30 °C' },
    { value: 'N/A', label: 'Status', expectedText: 'N/A' },
  ])(
    'should render $label correctly with value $value',
    ({ value, label, expectedText }) => {
      const { getByTestId } = renderComponent({ value, label });
      expect(getByTestId(defaultProps.dataTestId)).toHaveTextContent(
        expectedText
      );
    }
  );

  it('should not render the label if not provided', () => {
    const { queryByText } = renderComponent({ label: undefined });
    expect(queryByText('Temperature')).toBeNull();
  });

  it('should apply custom styles correctly', () => {
    const customStyles = { color: 'red' };
    const { getByTestId } = renderComponent({ styles: customStyles });
    const valueElement = getByTestId(defaultProps.dataTestId).firstChild;
    expect(valueElement).toHaveStyle('color: red');
  });
});
