import {
  DeleteTemplateData,
  SaveTemplateData,
} from '@cms/controllers/template';
import db from '@cms/db';

export const saveTemplate = async (data: SaveTemplateData) => {
  try {
    const template = await db.template.upsert({
      where: {
        id: data?.templateId || 'undefined',
      },
      create: {
        name: data.name,
        component_id: data.componentId,
        description: data.description,
        schema: data.schema,
        styles_schema: data.stylesSchema,
        image: data.image,
        site: {
          connect: {
            id: data.siteId,
          },
        },
      },
      update: {
        name: data.name,
        component_id: data.componentId,
        description: data.description,
        schema: data.schema,
        styles_schema: data.stylesSchema,
        image: data.image,
      },
    });
    return template;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTemplate = async (id: string) => {
  try {
    const template = await db.template.findUnique({
      where: {
        id,
      },
    });
    return template;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTemplates = async () => {
  try {
    const template = await db.template.findMany();
    return template;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTemplateBySideId = async (id: string) => {
  try {
    return await db.template.deleteMany({
      where: {
        site: {
          every: {
            id,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTemplateById = async (id: string) => {
  try {
    return await db.template.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
