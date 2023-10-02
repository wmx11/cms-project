import prisma from '../prisma';

export const getWebsitesByProfileId = async (profile_id: string) => {
  return await prisma.website.findMany({
    where: {
      profile_id: profile_id,
    },
    select: {
      id: true,
      image: true,
      title: true,
    },
  });
};
