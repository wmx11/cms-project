import {
  UpdateSiteData,
  UpdateSiteMetadataData,
  CreateSiteData,
} from '@cms/controllers/site';
import db from '@cms/db';
import { WithUser } from '@cms/types';

interface CreateSiteDataModel
  extends Omit<CreateSiteData, 'title' | 'description'>,
    WithUser {
  sitePageDataId: string;
}

export const createSite = async (data: CreateSiteDataModel) => {
  try {
    return await db.site.create({
      data: {
        user_id: data.userId,
        alias: data.alias,
        component_id: data.componentId,
        site_page_data_id: data.sitePageDataId,
        template_id: data?.templateId,
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
      include: {
        component: {
          select: {
            alias: true,
          },
        },
        site_page_data: {
          include: {
            published_site_page_schema: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSiteById = async (id: string) => {
  try {
    return await db.site.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface GetSiteForBuilderData extends WithUser {
  id: string;
}

export const getSiteForBuilder = async (data: GetSiteForBuilderData) => {
  try {
    return await db.site.findUnique({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      select: {
        alias: true,
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
        template: {
          select: {
            name: true,
            description: true,
            image: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface DeleteSiteData extends WithUser {
  id: string;
}

export const deleteSite = async (data: DeleteSiteData) => {
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

interface UpdateSiteProps extends UpdateSiteData, WithUser {}

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
                schema: data.schema,
                styles_schema: data.stylesSchema,
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

    return site;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface UpdateSiteMetadataProps extends UpdateSiteMetadataData, WithUser {}

export const updateSiteMetadata = async (data: UpdateSiteMetadataProps) => {
  try {
    const site = await db.site.findUnique({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      select: {
        site_page_data_id: true,
      },
    });

    if (!site?.site_page_data_id) {
      return null;
    }

    const { userId, ..._data } = data;

    return await db.sitePageData.update({
      where: {
        id: site?.site_page_data_id,
      },
      data: {
        ..._data,
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

interface GetPublishedSiteData extends WithUser {
  id: string;
}

export const getPublishedSite = async (data: GetPublishedSiteData) => {
  try {
    const site = await db.site.findUnique({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      select: {
        site_page_data: {
          select: {
            published_site_page_schema_id: true,
          },
        },
      },
    });

    return site;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface UnpublishSiteData extends WithUser {
  id: string;
}

export const unpublishSite = async (data: UnpublishSiteData) => {
  try {
    const site = await db.site.update({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      data: {
        site_page_data: {
          update: {
            published_site_page_schema_id: undefined,
            published_site_page_schema: {
              update: {
                is_published: false,
              },
            },
          },
        },
      },
    });

    return site;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface PublishSiteData extends WithUser {
  id: string;
  publishedSitePageSchemaId: string;
}

export const publishSite = async (data: PublishSiteData) => {
  try {
    const site = await db.site.update({
      where: {
        id: data.id,
        user_id: data.userId,
      },
      data: {
        site_page_data: {
          update: {
            data: {
              published_site_page_schema_id: data.publishedSitePageSchemaId,
              site_page_schema: {
                update: {
                  where: {
                    id: data.publishedSitePageSchemaId,
                  },
                  data: {
                    is_published: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return site;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserSites = async (userId: string) => {
  try {
    return db.site.findMany({
      where: {
        user_id: userId,
      },
      select: {
        alias: true,
        id: true,
        site_page_data: {
          select: {
            date_updated: true,
            title: true,
            description: true,
            image: true,
          },
        },
      },
      orderBy: {
        site_page_data: {
          date_updated: 'desc',
        },
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
