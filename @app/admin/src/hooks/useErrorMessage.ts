'use client';
import { ErrorMessageType } from '@cms/data/handleErrorMessages';
import { useState } from 'react';

const useErrorMessage = <T>(initialErrorState: ErrorMessageType<T>) => {
  const [error, setError] = useState(initialErrorState);

  const clearErrors = () => setError(initialErrorState);

  return { error, setError, clearErrors };
};

export default useErrorMessage;
