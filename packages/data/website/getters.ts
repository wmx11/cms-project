import db from '@cms/packages/db';

export const getWebsiteDraftSchemaByWebsiteId = async (websiteId: string) => {
  try {
    const website = await db.website.findUnique({
      where: {
        id: websiteId,
      },
      select: {
        styles_schema: true,
        draft_schema: true,
        template: {
          select: {
            slug: true,
          },
        },
      },
    });

    const parsedSchema = JSON.parse((website?.draft_schema as string) || '[]');
    const parsedStyles = JSON.parse((website?.styles_schema as string) || '{}');

    return {
      ...website,
      styles_schema: parsedStyles,
      draft_schema: parsedSchema,
    };
  } catch (error) {
    console.error('getWebsiteSchemaByWebsiteId', error);
    return null;
  }
};
