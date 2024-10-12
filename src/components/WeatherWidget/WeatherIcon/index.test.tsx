import { render } from '@testing-library/react';

import WeatherIcon from '../WeatherIcon';

describe('WeatherIcon Component', () => {
  const defaultProps = {
    dataTestId: 'weather-icon',
    icon: 'http://example.com/icon.png',
    size: '50px',
  };

  const renderComponent = (props = {}) =>
    render(<WeatherIcon {...defaultProps} {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the icon with the correct attributes', () => {
    const { getByTestId } = renderComponent();
    const imgElement = getByTestId(defaultProps.dataTestId);

    expect(imgElement).toHaveAttribute('src', defaultProps.icon);
    expect(imgElement).toHaveAttribute('alt', 'weather icon');
    expect(imgElement).toHaveStyle(`width: ${defaultProps.size}`);
    expect(imgElement).toHaveStyle(`height: ${defaultProps.size}`);
  });

  it.each([
    { size: '50px', expectedStyle: 'width: 50px; height: 50px;' },
    { size: '100px', expectedStyle: 'width: 100px; height: 100px;' },
  ])('should render with size $size', ({ size, expectedStyle }) => {
    const { getByTestId } = renderComponent({ size });
    const imgElement = getByTestId(defaultProps.dataTestId);

    expect(imgElement).toHaveStyle(expectedStyle);
  });

  it('should apply custom styles correctly', () => {
    const customStyles = { border: '1px solid red' };
    const { getByTestId } = renderComponent({ styles: customStyles });
    const imgElement = getByTestId(defaultProps.dataTestId);

    expect(imgElement).toHaveStyle('border: 1px solid red');
  });
});
