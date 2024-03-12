import db from '@cms/db';
import prisma from '../prisma';

export const getComponents = async () => {
  const components = await db.component.findMany({
    select: {
      name: true,
      alias: true,
      description: true,
      id: true,
      image: true,
    },
  });

  return components;
};

export const getComponentsByTemplateId = async (templateId: string) => {
  if (!templateId) {
    return [];
  }

  return await db.component.findMany({
    where: {
      template_id: templateId,
      template: {
        is_published: true,
      },
    },
  });
};

export const getComponentsBySiteId = async (siteId: string) => {
  if (!siteId) {
    return [];
  }

  const site = await db.site.findUnique({
    where: {
      id: siteId,
    },
    select: {
      componentId: true,
    },
  });

  if (!site) {
    return [];
  }

  return await getComponentsByTemplateId(website.template_id);
};
