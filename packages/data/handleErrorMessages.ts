import { ZodError } from 'zod';

export type ErrorMessageType<T> = {
  general: string[] | string | undefined;
  [x: string]: string[] | string | undefined;
} & T;

const handleErrorMessages = <T>(error: unknown) => {
  if (error && error.hasOwnProperty('issues')) {
    const zodError = (error as ZodError)?.formErrors?.fieldErrors;
    console.error(zodError);
    return { error: zodError } as unknown as ErrorMessageType<T>;
  }
  console.error(error as Error);
  return {
    error: { general: error?.toString() } as ErrorMessageType<any>,
  };
};

export default handleErrorMessages;
