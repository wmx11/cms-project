import { ZodError } from 'zod';
import { MaybeWithError } from './types';

const handleErrorMessages = <T>(error: unknown): MaybeWithError<T> => {
  if (error && error.hasOwnProperty('issues')) {
    const zodError = error as ZodError;
    const errorMessage = zodError.issues.map((item) => item.message).join(', ');
    return { error: errorMessage } as MaybeWithError<T>;
  }

  console.log(error as Error);

  return { error: error?.toString() } as MaybeWithError<T>;
};

export default handleErrorMessages;
