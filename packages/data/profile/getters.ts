import { getServerSession } from 'next-auth';
import prisma from '../prisma';

// Gets the Profile ID from the server session
// Server session doesn't hold profileID for some reason
// Session on the client-side does
export const getProfileBySession = async () => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const profile = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
    select: {
      profile: {
        select: {
          id: true,
        },
      },
    },
  });

  return profile?.profile;
};

// HOF of the getProfileBySession
// Passes the Profile with profile_id to the callback function
export const withProfile = async <T>(
  func: (profile: Awaited<ReturnType<typeof getProfileBySession>>) => T
) => {
  const profile = await getProfileBySession();
  return func(profile);
};
