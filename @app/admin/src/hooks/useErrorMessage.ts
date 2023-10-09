'use client';
import { useState } from 'react';

const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleErrorMessage = (message: string = '') => {
    if (!message) {
      setErrorMessage('');
    } else {
      setErrorMessage(message);
    }
  };

  return { errorMessage, handleErrorMessage };
};

export default useErrorMessage;
