import { JWT } from 'next-auth/jwt';
import NextAuth, { DefaultSession } from 'next-auth';
import { ErrorMessageType } from '@cms/lib/handle-error-messages';
import { BuilderStoreState } from './store/useBuilderStore';

declare module 'next-auth' {
  interface Session {
    user: {
      is_admin: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    is_admin: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    is_admin: boolean;
  }
}

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
