import { ToastPosition, toast } from 'react-toastify';

const NotificationBar = () => {
  const toastPosition = 'top-right' as ToastPosition;
  const toastConfig = {
    position: toastPosition,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
  };
  const showError = (message: string) => {
    toast.error(message, toastConfig);
  };

  return {
    showError,
  };
};

export default NotificationBar();
