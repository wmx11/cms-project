import { StylesProvider } from '@/components/Providers';
import db from '@cms/packages/db';
import serializeSchema from '@cms/packages/template-engine/modules/serializeSchema';
import { Metadata } from 'next';
import { IconURL } from 'next/dist/lib/metadata/types/metadata-types';

const getPageData = async () => {
  const pageData = await db.website.findFirst({
    where: {
      id: 'clnpzzk540001uqpsl6m1d5la',
    },
    include: {
      template: {
        select: {
          slug: true,
        },
      },
    },
  });

  return pageData;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const pageData = await getPageData();

  return {
    title: pageData?.title,
    description: pageData?.description,
    icons: {
      icon: pageData?.icon as IconURL,
    },
  };
};

export default async function Home() {
  const pageData = await getPageData();

  if (!pageData?.draft_schema || !pageData.template.slug) {
    return null;
  }

  const templateJson = JSON.parse(pageData.draft_schema as string);
  const stylesJson = JSON.parse((pageData.styles_schema as string) || '{}');

  const template = serializeSchema({
    schema: templateJson,
    templateId: pageData?.template.slug,
  });

  return (
    <StylesProvider styles={stylesJson}>
      <>{template}</>
    </StylesProvider>
  );
}
