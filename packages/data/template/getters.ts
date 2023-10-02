import prisma from '../prisma';

export const getTemplates = async () => {
  return await prisma.template.findMany({
    where: {
      is_published: true,
    },
    select: {
      description: true,
      image: true,
      name: true,
      slug: true,
      id: true,
    },
  });
};
