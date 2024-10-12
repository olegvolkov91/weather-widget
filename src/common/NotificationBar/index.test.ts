import { toast } from 'react-toastify';

import NotificationBar from '../NotificationBar';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('NotificationBar', () => {
  it('should call toast.error with correct message and options', () => {
    const { showError } = NotificationBar;

    const errorMessage = 'Test error message';

    showError(errorMessage);

    expect(toast.error).toHaveBeenCalledWith(errorMessage, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
    });
  });
});
