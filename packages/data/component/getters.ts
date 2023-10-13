import prisma from '../prisma';

export const getComponentsByTemplateId = async (templateId: string) => {
  if (!templateId) {
    return [];
  }

  return await prisma.component.findMany({
    where: {
      template_id: templateId,
      template: {
        is_published: true,
      },
    },
  });
};

export const getComponentsByWebsiteId = async (websiteId: string) => {
  if (!websiteId) {
    return [];
  }

  const website = await prisma.website.findUnique({
    where: {
      id: websiteId,
    },
    select: {
      template_id: true,
    },
  });

  if (!website) {
    return [];
  }

  return await getComponentsByTemplateId(website.template_id);
};
