import { getSiteForBuilderController } from '@cms/controllers/site';
import BuilderPage from '../../_components/builder/BuilderPage';

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const site = await getSiteForBuilderController(params.id);

  if (!site) {
    return <div>No site</div>;
  }

  return <BuilderPage {...site} />;
};

export default page;
