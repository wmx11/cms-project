import TemplateSchema from '@cms/packages/templates/landing-page/schema.json';
import { Metadata } from 'next';
import prisma from '@cms/packages/data/prisma';
import { IconURL } from 'next/dist/lib/metadata/types/metadata-types';

const getPageData = async () => {
  const pageData = await prisma.page.findFirst({
    where: {
      id: 'cln4fb2120004uq909huoc0rz',
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
  const page = await import(
    `@cms/packages/templates/${TemplateSchema.metadata.id}/${TemplateSchema.metadata.component}`
  );
  return page.default({
    context: TemplateSchema,
  });
}
