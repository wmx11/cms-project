import { UpdateSiteData, UpdateSiteMetadataData } from '@cms/controllers/site';
import db from '@cms/db';

interface CreateSiteData {
  userId: string;
  data: {
    alias: string;
    componentId: string;
    sitePageDataId: string;
  };
}

export const createSite = async (data: CreateSiteData) => {
  try {
    return await db.site.create({
      data: {
        user_id: data.userId,
        alias: data.data.alias,
        component_id: data.data.componentId,
        site_page_data_id: data.data.sitePageDataId,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface CreateSitePageData {
  description: string;
  title: string;
}

export const createSitePageData = async (data: CreateSitePageData) => {
  try {
    return await db.sitePageData.create({
      data: {
        description: data.description,
        title: data.title,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSiteByAlias = async (alias: string) => {
  try {
    return await db.site.findUnique({
      where: {
        alias,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSiteForBuilder = async (data: {
  id: string;
  userId: string;
}) => {
  try {
    return await db.site.findUnique({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      select: {
        component: {
          select: {
            alias: true,
            schema: true,
          },
        },
        site_page_data: {
          select: {
            title: true,
            description: true,
            icon: true,
            image: true,
            working_site_page_schema: {
              select: {
                schema: true,
                styles_schema: true,
                is_published: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteSite = async (data: { id: string; userId: string }) => {
  try {
    const site = await db.site.delete({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      select: {
        id: true,
        site_page_data_id: true,
      },
    });

    await db.sitePageData.delete({
      where: {
        id: site.site_page_data_id,
      },
    });

    return site;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface UpdateSiteProps {
  id: string;
  userId: string;
  data: UpdateSiteData;
}

export const updateSite = async (data: UpdateSiteProps) => {
  try {
    const site = await db.site.update({
      where: {
        user_id: data.userId,
        id: data.id,
      },
      data: {
        site_page_data: {
          update: {
            working_site_page_schema: {
              create: {
                schema: data.data.schema,
                styles_schema: data.data.stylesSchema,
              },
            },
          },
        },
      },
      select: {
        site_page_data: {
          select: {
            id: true,
            working_site_page_schema_id: true,
          },
        },
      },
    });

    if (site.site_page_data.working_site_page_schema_id) {
      await db.sitePageSchema.update({
        where: {
          id: site.site_page_data.working_site_page_schema_id,
        },
        data: {
          site_page_data_id: site.site_page_data.id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface UpdateSiteMetadataProps {
  siteId: string;
  userId: string;
  data: UpdateSiteMetadataData;
}

export const updateSiteMetadata = async (data: UpdateSiteMetadataProps) => {
  try {
    const site = await db.site.findUnique({
      where: {
        id: data.siteId,
        user_id: data.userId,
      },
      select: {
        site_page_data_id: true,
      },
    });

    if (!site?.site_page_data_id) {
      return null;
    }

    return await db.sitePageData.update({
      where: {
        id: site?.site_page_data_id,
      },
      data: {
        ...data.data,
      },
      select: {
        id: true,
        title: true,
        description: true,
        icon: true,
        image: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
