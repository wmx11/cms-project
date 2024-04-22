import React, { FC } from 'react';

export interface ErrorMessageProps {
  errorMessage: string | string[] | undefined;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
  return errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>;
};

export default ErrorMessage;
