import { withUser } from '@cms/lib/auth';
import { NoAdminRights, SiteMissingID } from '@cms/lib/errors';
import { getSiteById } from '@cms/models/site';
import {
  deleteTemplateById,
  getTemplates,
  saveTemplate,
} from '@cms/models/template';
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
  templateId?: string;
  saveNew?: boolean;
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

  return await withUser(async (user) => {
    if (!user?.is_admin) {
      throw new NoAdminRights();
    }

    const existingSite = await getSiteById(data.siteId);

    if (!existingSite) {
      return null;
    }

    const templateId = data.saveNew
      ? undefined
      : existingSite.template_id || undefined;

    return await saveTemplate({
      ...data,
      templateId: templateId,
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
  return await withUser(async () => {
    return await getTemplates();
  });
};

export interface DeleteTemplateData {
  templateId?: string;
}

export const deleteTemplateController = async (data: DeleteTemplateData) => {
  return await withUser(async (user) => {
    if (!user?.is_admin) {
      throw new NoAdminRights();
    }

    if (!data.templateId) {
      return null;
    }

    return await deleteTemplateById(data.templateId);
  });
};
