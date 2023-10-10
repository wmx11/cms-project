import prisma from '@cms/data/prisma';
import { withProfile } from '@cms/data/profile/getters';

const page = async () => {
  const websites = await withProfile(async (profile) => {
    return await prisma.website.findMany({
      where: {
        profile_id: profile?.profile?.id,
      },
      select: {
        alias: true,
        title: true,
        id: true,
      },
    });
  });

  return (
    <div>
      {websites.map((item, index) => {
        return (
          <div key={`website_${index}`}>
            <div>{item.title}</div>
            <div>{item.alias}</div>
            <div>{item.id}</div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
