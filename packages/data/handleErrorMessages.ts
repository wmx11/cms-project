import { ZodError } from 'zod';

export interface ErrorMessageType {
  [x: string]: string[] | undefined;
}

const handleErrorMessages = (error: unknown) => {
  if (error && error.hasOwnProperty('issues')) {
    const zodError = (error as ZodError)?.formErrors?.fieldErrors;
    console.error(zodError);
    return { error: zodError };
  }
  console.error(error as Error);
  return {
    error: { general: error?.toString() } as ErrorMessageType,
  };
};

export default handleErrorMessages;
