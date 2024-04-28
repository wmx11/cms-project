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
  getSiteByAlias,
  getSiteForBuilder,
  updateSite,
  updateSiteMetadata,
} from '@cms/models/site';
import {
  initialStyles,
  StylesObjectWithBreakpoints,
} from '@cms/tiglee-engine/styles/jssStyles';
import { Schema } from '@cms/tiglee-engine/types';
import slugify from 'slugify';
import { z } from 'zod';

export interface CreateSiteData {
  alias: string;
  title: string;
  description: string;
  componentId: string;
  templateId?: string;
}

const validationSchema = z.object({
  alias: z.string().min(3, {
    message: 'Site alias must be at least 3 characters long.',
  }),
  title: z.string().min(3, {
    message: 'Site title must be at least 3 characters long.',
  }),
  description: z.string().min(3, {
    message: 'Site description must be at least 3 characters long.',
  }),
  componentId: z.string().min(1, { message: 'Please select a component set.' }),
  templateId: z.string().optional(),
});

export const createSiteController = async (data: CreateSiteData) => {
  validationSchema.parse(data);

  const site = await withUser(async (user) => {
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

    return await createSite({
      userId: user.id,
      data: {
        alias,
        componentId: data.componentId,
        sitePageDataId: sitePageData?.id,
      },
    });
  });

  return site;
};

export const deleteSiteController = async (id: string) => {
  if (!id) {
    throw new SiteMissingID();
  }

  const site = await withUser(async (user) => {
    if (!user) {
      return null;
    }

    return await deleteSite({
      id,
      userId: user.id,
    });
  });

  return site;
};

export interface UpdateSiteData {
  schema: Schema[];
  stylesSchema: StylesObjectWithBreakpoints;
}

export const updateSiteController = async (
  id: string,
  data: UpdateSiteData
) => {
  if (!id) {
    throw new SiteMissingID();
  }

  const site = await withUser(async (user) => {
    if (!user) {
      return null;
    }

    return await updateSite({
      id,
      userId: user.id,
      data: {
        schema: data.schema,
        stylesSchema: data.stylesSchema,
      },
    });
  });

  return site;
};

export interface UpdateSiteMetadataData {
  title?: string;
  description?: string;
  icon?: string;
}

export const updateSiteMetadataController = async (
  id: string,
  data: UpdateSiteMetadataData
) => {
  if (!id) {
    throw new SiteMissingID();
  }

  validationSchema.pick({ title: true, description: true }).parse(data);

  const site = await withUser(async (user) => {
    if (!user) {
      return null;
    }

    return await updateSiteMetadata({
      siteId: id,
      userId: user.id,
      data,
    });
  });

  if (!site) {
    return null;
  }

  return site;
};

export const getSiteByAliasController = async (alias: string) => {
  if (!alias) {
    console.error('No site alias was found.');
    return null;
  }

  const site = await getSiteByAlias(alias);

  if (!site) {
    return null;
  }

  return site;
};

export const getSiteForBuilderController = async (id: string) => {
  if (!id) {
    throw new SiteMissingID();
  }

  const site = await withUser(async (user) => {
    if (!user) {
      return null;
    }

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
      site_page_schema: { schema: siteSchema, styles_schema },
    },
  } = site;

  const schema = (siteSchema as Schema[]) || [];

  const styles = (() => {
    if (Array.isArray(styles_schema) && !styles_schema.length) {
      return initialStyles;
    }
    return styles_schema;
  })() as StylesObjectWithBreakpoints;

  const components = (() => {
    try {
      return JSON.parse(componentsSchema as unknown as string);
    } catch (error) {
      console.error(error);
      return [];
    }
  })();

  return {
    icon,
    title,
    schema,
    styles,
    components,
    description,
    componentAlias: alias,
  };
};
