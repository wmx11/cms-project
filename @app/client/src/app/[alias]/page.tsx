import prisma from '@cms/data/prisma';
import { Metadata } from 'next';
import { IconURL } from 'next/dist/lib/metadata/types/metadata-types';
import React, { cache } from 'react';

type Props = {
  params: { alias: string };
};

export const revalidate = 10;

const getPageData = cache(async (alias: string) => {
  const pageData = await prisma.page.findFirst({
    where: {
      alias,
    },
  });

  return pageData;
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  console.time('cache');
  const pageData = await getPageData(params.alias);
  console.timeEnd('cache');

  return {
    title: pageData?.title,
    description: pageData?.description,
    icons: {
      icon: pageData?.icon as IconURL,
    },
  };
};

const page = async ({ params }: Props) => {
  const pageData = await getPageData(params.alias);

  if (!pageData) {
    return <>Cannot find a page by {params.alias}</>;
  }

  return <div>page</div>;
};

export default page;
