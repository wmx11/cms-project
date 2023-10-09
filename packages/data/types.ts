export interface WithError {
  error?: string | undefined;
}

export type Maybe<T> = T | undefined;

export type MaybeWithError<T> = Maybe<T> & WithError;
