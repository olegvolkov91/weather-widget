import { render } from '@testing-library/react';
import { format } from 'date-fns';

import NotificationBar from '@/common/NotificationBar';
import { DEFAULT_DATE } from '@/constants';

import DayName from '../DayName';

jest.mock('@/common/NotificationBar', () => ({
  showError: jest.fn(),
}));

describe('DayName', () => {
  const defaultProps = {
    dataTestId: 'day-name',
  };

  const renderComponent = (overrideProps = {}) =>
    render(<DayName {...defaultProps} {...overrideProps} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders element correctly', () => {
    const { getByTestId } = renderComponent();

    const dayText = getByTestId(defaultProps.dataTestId);
    expect(dayText).toBeInTheDocument();
  });

  it('renders with the default date and format', () => {
    const dateFormat = 'EEEE';
    const formattedDate = format(new Date(DEFAULT_DATE), dateFormat);

    const { getByTestId } = renderComponent();

    const dayText = getByTestId(defaultProps.dataTestId);
    expect(dayText).toBeInTheDocument();
    expect(dayText).toHaveTextContent(formattedDate);
  });

  it('renders with a custom date format', () => {
    const dateFormat = 'EEEE, MMM d';
    const customDate = '2024-10-10';
    const formattedDate = format(new Date(customDate), dateFormat);

    const { getByTestId } = renderComponent({
      date: customDate,
      dateFormat,
    });

    const dayText = getByTestId(defaultProps.dataTestId);
    expect(dayText).toBeInTheDocument();
    expect(dayText).toHaveTextContent(formattedDate);
  });

  it('renders custom styles correctly', () => {
    const customDate = '2024-10-10';
    const dateFormat = 'EEEE';
    const customStyles = { color: 'red', fontSize: '16px' };

    const { getByTestId } = renderComponent({
      date: customDate,
      dateFormat,
      styles: customStyles,
    });

    const dayText = getByTestId(defaultProps.dataTestId);
    expect(dayText).toHaveStyle('color: red');
    expect(dayText).toHaveStyle('font-size: 16px');
  });

  it('shows error notification for invalid date format', () => {
    const dateFormat = 'MMMM yyyy';
    const invalidDate = 'invalid-date';

    const { queryByTestId } = renderComponent({
      date: invalidDate,
      dateFormat,
    });

    expect(NotificationBar.showError).toHaveBeenCalledWith(
      'Invalid format pattern or date value'
    );
    expect(queryByTestId(defaultProps.dataTestId)).toBeNull();
  });
});
