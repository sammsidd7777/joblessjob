import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationToasty = ({ message, type = "info" }) => {

  useEffect(() => {
    if (message) {
      toast[type](message);   // dynamic: success, error, warning, info
    }
  }, [message, type]);

  return <ToastContainer />;
};

export default NotificationToasty;