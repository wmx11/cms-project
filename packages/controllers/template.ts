import { withUser } from '@cms/lib/auth';
import { SiteMissingID } from '@cms/lib/errors';
import { getSiteById } from '@cms/models/site';
import { getTemplates, saveTemplate } from '@cms/models/template';
import { MAX_STRING_LENGTH } from '@cms/tiglee-engine/constants';
import { StylesObjectWithBreakpoints } from '@cms/tiglee-engine/styles/jssStyles';
import { Schema } from '@cms/tiglee-engine/types';
import { z } from 'zod';

export interface SaveTemplateData {
  siteId: string;
  name: string;
  image?: string;
  description?: string;
  componentId: string;
  templateId?: string | null;
  schema: Schema[];
  stylesSchema: StylesObjectWithBreakpoints;
}

const validationSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Template name must be at least 3 characters long.',
    })
    .max(MAX_STRING_LENGTH),
  description: z
    .string()
    .min(3, {
      message: 'Site description must be at least 3 characters long.',
    })
    .max(MAX_STRING_LENGTH)
    .optional(),
});

export const saveTemplateController = async (
  data: Omit<SaveTemplateData, 'componentId'>
) => {
  if (!data.siteId) {
    throw new SiteMissingID();
  }

  validationSchema.parse(data);

  return await withUser(async () => {
    const existingSite = await getSiteById(data.siteId);

    if (!existingSite) {
      return null;
    }

    return await saveTemplate({
      ...data,
      templateId: existingSite?.template_id,
      componentId: existingSite.component_id,
    });
  });
};

export const getTemplateController = async () => {
  return await withUser(async (user) => {
    if (!user) {
      return null;
    }
  });
};

export const getTemplatesController = async () => {
  return await withUser(async (user) => {
    return await getTemplates();
  });
};

export const deleteTemplateController = async () => {
  return await withUser(async (user) => {
    if (!user) {
      return null;
    }
  });
};
