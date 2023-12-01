import { getServerSession } from 'next-auth';

export class AuthError extends Error {
  constructor() {
    super('You must be authenticated to perform this action');
  }
}

export type User = {
  userId: string;
};

export type GetUser = () => User | undefined;

export const auth = async () => {
  const session = await getServerSession();

  const getUser = () => {};

  return {
    getUser,
  };
};
