import db from '@cms/db';
import { getServerSession } from 'next-auth';

export const getUserBySession = async () => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
  });

  return profile;
};

export const withUser = async <T>(
  func: (profile: Awaited<ReturnType<typeof getUserBySession>>) => T
) => {
  const profile = await getUserBySession();
  return func(profile);
};
