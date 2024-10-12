import { render } from '@testing-library/react';

import TemperatureRange from '../TemperatureRange';

describe('TemperatureRange Component', () => {
  const defaultProps = {
    dataTestId: 'temperature-range',
    minTemp: 10,
    maxTemp: 30,
  };

  const renderComponent = (props = {}) =>
    render(<TemperatureRange {...defaultProps} {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the max and min temperatures correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText(`${defaultProps.maxTemp}°C`)).toBeInTheDocument();
    expect(getByText(`${defaultProps.minTemp}°C`)).toBeInTheDocument();
  });

  it('should apply the correct data-testid attribute', () => {
    const { getByTestId } = renderComponent();
    const container = getByTestId(defaultProps.dataTestId);

    expect(container).toBeInTheDocument();
  });
});
