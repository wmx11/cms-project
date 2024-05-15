import TigleeProvider from '@client/components/TigleeProvider';
import { getSiteByAliasController } from '@cms/packages/controllers/site';
import serializeSchema from '@cms/tiglee-engine/modules/serializeSchema';
import { Schema } from '@cms/tiglee-engine/types';
import { Styles } from 'jss';
import { Metadata, ResolvingMetadata } from 'next';
import { IconURL } from 'next/dist/lib/metadata/types/metadata-types';

interface Props {
  params: { alias: string };
}

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const site = await getSiteByAliasController(params.alias);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: site?.site_page_data.title,
    description: site?.site_page_data.description,
    icons: {
      icon: site?.site_page_data.icon as IconURL,
    },
    openGraph: {
      title: site?.site_page_data.title || '',
      description: site?.site_page_data.description || '',
      siteName: site?.site_page_data.title || '',
      images: [
        {
          url: site?.site_page_data.image || '',
        },
        ...previousImages,
      ],
      type: 'website',
      locale: 'en_US',
    },
  };
};

const page = async ({ params }: Props) => {
  const site = await getSiteByAliasController(params.alias);

  if (!site || !site.site_page_data.published_site_page_schema_id) {
    return <>Cannot find site by {params.alias}</>;
  }

  const template = serializeSchema({
    schema: site.site_page_data.published_site_page_schema
      ?.schema as unknown as Schema[],
    componentAlias: site.component.alias,
  });

  return (
    <>
      <TigleeProvider
        stylesSchema={
          site.site_page_data.published_site_page_schema
            ?.styles_schema as Partial<Styles>
        }
      >
        <>{template}</>
      </TigleeProvider>
    </>
  );
};

export default page;
