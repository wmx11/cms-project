import db from '@cms/db';

export const getTemplates = async () => {
  return await db.template.findMany({
    where: {
      is_published: true,
    },
    select: {
      description: true,
      image: true,
      name: true,
      id: true,
    },
  });
};
