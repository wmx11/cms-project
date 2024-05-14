import { withUser } from '@cms/lib/auth';
import {
  SiteMissingID,
  SitePageDataCreationFailed,
  SiteWithAliasExists,
} from '@cms/lib/errors';
import {
  createSite,
  createSitePageData,
  deleteSite,
  getPublishedSite,
  getSiteByAlias,
  getSiteForBuilder,
  publishSite,
  unpublishSite,
  updateSite,
  updateSiteMetadata,
} from '@cms/models/site';
import { getTemplate } from '@cms/models/template';
import { MAX_STRING_LENGTH } from '@cms/tiglee-engine/constants';
import {
  initialStyles,
  StylesObjectWithBreakpoints,
} from '@cms/tiglee-engine/styles/jssStyles';
import { Schema } from '@cms/tiglee-engine/types';
import slugify from 'slugify';
import { z } from 'zod';
import { authenticatedController } from './_controller';

export interface CreateSiteData {
  alias: string;
  title: string;
  description: string;
  componentId: string;
  templateId?: string;
}

const validationSchema = z.object({
  alias: z
    .string()
    .min(3, {
      message: 'Site alias must be at least 3 characters long.',
    })
    .max(MAX_STRING_LENGTH),
  title: z
    .string()
    .min(3, {
      message: 'Site title must be at least 3 characters long.',
    })
    .max(MAX_STRING_LENGTH),
  description: z
    .string()
    .min(3, {
      message: 'Site description must be at least 3 characters long.',
    })
    .max(MAX_STRING_LENGTH),
  componentId: z.string().min(1, { message: 'Please select a component set.' }),
  templateId: z.string().optional(),
});

export const createSiteController = async (data: CreateSiteData) => {
  validationSchema.parse(data);

  return await withUser(async (user) => {
    if (!user) {
      return null;
    }

    const alias = slugify(data.alias).toLowerCase();

    const existingSite = await getSiteByAlias(alias);

    if (existingSite) {
      throw new SiteWithAliasExists();
    }

    const sitePageData = await createSitePageData({
      description: data.description,
      title: data.title,
    });

    if (!sitePageData) {
      throw new SitePageDataCreationFailed();
    }

    const site = await createSite({
      alias,
      userId: user.id,
      componentId: data.componentId,
      sitePageDataId: sitePageData?.id,
      templateId: data?.templateId,
    });

    if (!site) {
      return null;
    }

    if (data.templateId) {
      const template = await getTemplate(data.templateId);

      await updateSite({
        id: site?.id,
        userId: user.id,
        schema: template?.schema as unknown as Schema[],
        stylesSchema:
          template?.styles_schema as unknown as StylesObjectWithBreakpoints,
      });
    }

    return site;
  });
};

export const deleteSiteController = (id: string) =>
  authenticatedController(async (user) => {
    return await deleteSite({
      id,
      userId: user.id,
    });
  });

export interface UpdateSiteData {
  id: string;
  schema: Schema[];
  stylesSchema: StylesObjectWithBreakpoints;
}

export const updateSiteController = (data: UpdateSiteData) =>
  authenticatedController(async (user) => {
    return await updateSite({
      id: data.id,
      schema: data.schema,
      stylesSchema: data.stylesSchema,
      userId: user.id,
    });
  });

export interface UpdateSiteMetadataData {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
}

export const updateSiteMetadataController = async (
  data: UpdateSiteMetadataData
) =>
  authenticatedController(async (user) => {
    if (!data.id) {
      throw new SiteMissingID();
    }

    validationSchema.pick({ title: true, description: true }).parse(data);

    return await updateSiteMetadata({
      userId: user.id,
      ...data,
    });
  });

export const getSiteByAliasController = async (alias: string) => {
  if (!alias) {
    console.error('No site alias was found.');
    return null;
  }

  return await getSiteByAlias(alias);
};

export const getSiteForBuilderController = async (id: string) => {
  if (!id) {
    throw new SiteMissingID();
  }

  const site = await withUser(async (user) => {
    return await getSiteForBuilder({ id, userId: user?.id });
  });

  if (!site) {
    return null;
  }

  const {
    component: { alias, schema: componentsSchema },
    site_page_data: {
      title,
      description,
      icon,
      image,
      working_site_page_schema,
    },
    template,
  } = site;

  const schema = (working_site_page_schema?.schema as Schema[]) || [];

  const styles = (() => {
    if (
      Array.isArray(working_site_page_schema?.styles_schema) &&
      !working_site_page_schema?.styles_schema.length
    ) {
      return initialStyles;
    }
    return working_site_page_schema?.styles_schema;
  })() as StylesObjectWithBreakpoints;

  const components = (() => {
    try {
      const parsedSchema = JSON.parse(componentsSchema as unknown as string);
      Object.freeze(parsedSchema);
      return parsedSchema;
    } catch (error) {
      console.error(error);
      return [];
    }
  })();

  return {
    icon,
    image,
    title,
    schema,
    styles,
    template,
    components,
    description,
    isPublished: working_site_page_schema?.is_published || false,
    componentAlias: alias,
  };
};

export interface PublishSiteData extends UpdateSiteData {}

export const publishSiteController = async (data: PublishSiteData) => {
  if (!data.id) {
    throw new SiteMissingID();
  }

  const site = await withUser(async (user) => {
    if (!user) {
      return null;
    }

    const updatedSite = await updateSite({
      id: data.id,
      userId: user.id,
      schema: data.schema,
      stylesSchema: data.stylesSchema,
    });

    if (!updatedSite?.site_page_data.working_site_page_schema_id) {
      return null;
    }

    const existingPublishedSite = await getPublishedSite({
      id: data.id,
      userId: user.id,
    });

    if (existingPublishedSite) {
      await unpublishSite({
        id: data.id,
        userId: user.id,
      });
    }

    const publishedSite = await publishSite({
      id: data.id,
      userId: user.id,
      publishedSitePageSchemaId:
        updatedSite.site_page_data.working_site_page_schema_id,
    });

    return publishedSite;
  });

  return site;
};
