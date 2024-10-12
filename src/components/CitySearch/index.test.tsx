import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { getCities } from '@/api/cities';
import NotificationBar from '@/common/NotificationBar';
import CitySearch from '@/components/CitySearch';
import { useWeatherInfo } from '@/providers/WeatherProvider';

jest.mock('@/providers/WeatherProvider', () => ({
  useWeatherInfo: jest.fn(),
}));

jest.mock('@/api/cities', () => ({
  getCities: jest.fn(),
}));

jest.mock('@/common/NotificationBar', () => ({
  showError: jest.fn(),
}));

describe('CitySearch Component', () => {
  const mockSetCityCoordinates = jest.fn();
  const dataTestId = 'city-search';

  const mockCities = [
    { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
    { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.006 },
    { name: 'Long Beach', country: 'USA', lat: 33.7669, lon: -118.1916 },
  ];

  const filterCities = (query: string) =>
    mockCities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );

  beforeEach(() => {
    jest.clearAllMocks();
    (useWeatherInfo as jest.Mock).mockReturnValue({
      setCityCoordinates: mockSetCityCoordinates,
    });
  });

  const renderComponent = () => render(<CitySearch dataTestId={dataTestId} />);

  const typeInInput = async (input: HTMLInputElement, value: string) => {
    (getCities as jest.Mock).mockImplementation(filterCities);
    await fireEvent.change(input, { target: { value } });
    expect(getCities).toHaveBeenCalledWith(value);
  };

  const rerenderComponent = (
    rerender: (ui: React.ReactElement) => void
  ): void => {
    rerender(<CitySearch dataTestId={dataTestId} />);
  };

  const getInputElement = (
    getByTestId: (id: string) => HTMLElement | null
  ): HTMLInputElement => {
    return getByTestId(`${dataTestId}-input`)?.querySelector(
      'input'
    ) as HTMLInputElement;
  };

  it('should render the input field and city list', () => {
    const { getByTestId, queryByTestId } = renderComponent();

    expect(getByTestId(`${dataTestId}-input`)).toBeInTheDocument();
    expect(queryByTestId(`${dataTestId}-list`)).not.toBeInTheDocument();
  });

  it.each`
    searchValue | expectedCities
    ${'Lon'}    | ${['London, UK', 'Long Beach, USA']}
  `(
    'should render filtered cities list when user types "$searchValue"',
    async ({ searchValue, expectedCities }) => {
      const { getByTestId, rerender } = renderComponent();
      const input = getInputElement(getByTestId);

      await typeInInput(input, searchValue);
      rerenderComponent(rerender);

      expect(screen.getByTestId(`${dataTestId}-list`)).toBeInTheDocument();
      const renderedCities = screen
        .getAllByTestId(`${dataTestId}-list-item`)
        .map((item) => item.textContent);
      expect(renderedCities).toEqual(expect.arrayContaining(expectedCities));
    }
  );

  it('should fetch weather when city is selected', async () => {
    const searchValue = 'Lon';
    const { getByTestId, rerender } = renderComponent();
    const input = getInputElement(getByTestId);

    await typeInInput(input, searchValue);
    rerenderComponent(rerender);

    expect(screen.getByTestId(`${dataTestId}-list`)).toBeInTheDocument();
    const listItems = screen.getAllByTestId(`${dataTestId}-list-item`);

    fireEvent.click(listItems[0]);
    const { lat, lon } = mockCities[0];
    expect(mockSetCityCoordinates).toHaveBeenCalledWith({
      lat,
      lon,
    });
  });

  it('should clean city list when user starts typing and then clears input', async () => {
    const searchValue = 'Lon';
    const { getByTestId, rerender } = renderComponent();
    const input = getInputElement(getByTestId);

    await typeInInput(input, searchValue);
    rerenderComponent(rerender);

    expect(screen.getByTestId(`${dataTestId}-list`)).toBeInTheDocument();

    await fireEvent.change(input, { target: { value: '' } });
    rerenderComponent(rerender);

    expect(screen.queryByTestId(`${dataTestId}-list`)).not.toBeInTheDocument();
  });

  it('should show notification bar when cities request fails', async () => {
    const { getByTestId } = renderComponent();
    const input = getInputElement(getByTestId);

    (getCities as jest.Mock).mockRejectedValue(Error(''));

    await fireEvent.change(input, { target: { value: 'Lon' } });

    expect(NotificationBar.showError).toHaveBeenCalledWith(
      'Error while fetching cities: Network Error'
    );
    expect(screen.queryByTestId(`${dataTestId}-list`)).not.toBeInTheDocument();
  });
});
