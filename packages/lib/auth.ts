import db from '@cms/db';
import { getServerSession } from 'next-auth';

export class AuthError extends Error {
  constructor() {
    super('You must be authenticated to perform this action');
  }
}

export const getUserBySession = async () => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
  });

  return user;
};

export const withUser = async <T>(
  func: (user: Awaited<ReturnType<typeof getUserBySession>>) => T
) => {

  const user = await getUserBySession();

  if (!user) {
    throw new AuthError();
  }

  return func(user);
};


