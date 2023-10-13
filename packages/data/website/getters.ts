import prisma from '../prisma';

export const getWebsiteDraftSchemaByWebsiteId = async (websiteId: string) => {
  try {
    const website = await prisma.website.findUnique({
      where: {
        id: websiteId,
      },
      select: {
        draft_schema: true,
        template: {
          select: {
            slug: true,
          },
        },
      },
    });

    const parsedSchema = JSON.parse((website?.draft_schema as string) || '[]');

    return {
      ...website,
      draft_schema: parsedSchema,
    };
  } catch (error) {
    console.error('getWebsiteSchemaByWebsiteId', error);
    return null;
  }
};
