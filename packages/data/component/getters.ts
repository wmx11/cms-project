import prisma from '../prisma';

export const getComponentsByTemplateId = async (template_id: string) => {
  if (!template_id) {
    return null;
  }

  return await prisma.component.findMany({
    where: {
      template_id: template_id,
    },
  });
};
