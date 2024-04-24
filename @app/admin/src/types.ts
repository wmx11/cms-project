import { ErrorMessageType } from '@cms/data/handleErrorMessages';
import { BuilderStoreState } from './store/useBuilderStore';

export type BuilderState = { state: BuilderStoreState };

export type ActionReturnTypeWithError<T> = {
  data: never;
  error: ErrorMessageType<T>;
};

export type ActionReturnTypeWithoutError<T> = {
  data: T;
  error: never;
};

export type ActionReturnType<T> = ActionReturnTypeWithError<T> &
  ActionReturnTypeWithoutError<T>;
