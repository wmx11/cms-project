import { getSiteForBuilderController } from '@cms/controllers/site';
import BuilderPage from '../../_components/builder/BuilderPage';
import { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const site = await getSiteForBuilderController(params.id);

  return {
    title: site?.title,
  };
};

const page = async ({ params }: Props) => {
  const site = await getSiteForBuilderController(params.id);

  if (!site) {
    return <div>No site</div>;
  }

  return <BuilderPage {...site} />;
};

export default page;
