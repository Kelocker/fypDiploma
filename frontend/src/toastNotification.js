// toastNotifications.js
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastNotifications = (status, message) => {
  const commonOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  if (status === "success") {
    toast.success(message, commonOptions);
  } else if (status === "error") {
    toast.error(message, commonOptions);
  }
};

export default toastNotifications;
